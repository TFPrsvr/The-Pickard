import { NextRequest, NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { withRateLimit } from '@/lib/security/rate-limiter'
import { validateSearchInput } from '@/lib/security/input-validation'
import { SecurityLogger } from '@/lib/security/security-logger'
import { maskEmail } from '@/lib/security/data-masking'

function getClientIP(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0] ||
         request.headers.get('x-real-ip') ||
         'unknown';
}

// Stricter rate limiting for contact form (5 submissions per hour per IP)
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

const contactRateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '1 h'),
      analytics: true,
      prefix: '@ratelimit/contact',
    })
  : null;

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResult = await withRateLimit(request, contactRateLimiter);

    if (!rateLimitResult.success) {
      const ip = getClientIP(request);
      await SecurityLogger.logRateLimitExceeded(ip, '/api/contact');

      return NextResponse.json(
        { error: 'Too many contact form submissions. Please try again later.' },
        {
          status: 429,
          headers: rateLimitResult.headers
        }
      );
    }

    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400, headers: rateLimitResult.headers }
      )
    }

    // Validate inputs for malicious content
    const nameValidation = validateSearchInput(name);
    const subjectValidation = validateSearchInput(subject);
    const messageValidation = validateSearchInput(message);

    const errors: string[] = [];
    if (!nameValidation.isValid) errors.push(`Name: ${nameValidation.errors[0]}`);
    if (!subjectValidation.isValid) errors.push(`Subject: ${subjectValidation.errors[0]}`);
    if (!messageValidation.isValid) errors.push(`Message: ${messageValidation.errors[0]}`);

    if (errors.length > 0) {
      const ip = getClientIP(request);
      await SecurityLogger.logInvalidInput(
        ip,
        '/api/contact',
        JSON.stringify({ name, subject, message }),
        errors
      );

      return NextResponse.json(
        { error: 'Invalid input detected. Please check your submission.' },
        { status: 400, headers: rateLimitResult.headers }
      );
    }

    // Here you would typically send the email using a service like:
    // - Nodemailer with SMTP
    // - SendGrid
    // - Resend
    // - AWS SES
    // 
    // For now, we'll just log the data (with masked email) and return success
    console.log('Contact form submission:', {
      name,
      email: maskEmail(email),
      phone: phone ? '***-***-****' : undefined,
      subject,
      message: message.substring(0, 50) + '...',
      timestamp: new Date().toISOString()
    })

    // Example with nodemailer (commented out - you'd need to install and configure):
    /*
    const nodemailer = require('nodemailer')
    
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: 'contact@thepickard.com',
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>Submitted: ${new Date().toLocaleString()}</small></p>
      `,
    })
    */

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 200, headers: rateLimitResult.headers }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}