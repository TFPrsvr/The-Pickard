# Security Implementation Guide (6-Layer Architecture)

## Overview

This guide implements military-grade security for The Pickard application using a comprehensive 6-layer defense architecture as specified in `CLAUDE.md`.

---

## 🛡️ Security Architecture Overview

```
Layer 1: Network Security (Rate Limiting, DDoS Protection)
    ↓
Layer 2: Input Validation (SQL Injection, XSS Prevention)
    ↓
Layer 3: Authentication (Clerk, MFA, Session Management)
    ↓
Layer 4: Authorization (RBAC, Route Protection)
    ↓
Layer 5: Data Security (Encryption, Secure Storage)
    ↓
Layer 6: Real-Time Monitoring (Threat Detection, Alerting)
```

---

## Layer 1: Network Security

### Rate Limiting Implementation

**Purpose**: Prevent brute force attacks, DDoS, and API abuse

**Installation**:
```bash
npm install @upstash/ratelimit @upstash/redis
```

**Create Rate Limiter** (`src/lib/security/rate-limiter.ts`):
```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize Redis connection
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Rate limiters for different endpoints
export const apiRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 requests per minute
  analytics: true,
  prefix: '@ratelimit/api',
});

export const authRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '15 m'), // 5 login attempts per 15 minutes
  analytics: true,
  prefix: '@ratelimit/auth',
});

export const searchRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(50, '1 m'), // 50 searches per minute
  analytics: true,
  prefix: '@ratelimit/search',
});

// Get client IP address
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  return 'unknown';
}

// Rate limit middleware wrapper
export async function withRateLimit(
  request: Request,
  limiter: Ratelimit,
  identifier?: string
) {
  const ip = identifier || getClientIP(request);
  const { success, limit, reset, remaining } = await limiter.limit(ip);

  return {
    success,
    headers: {
      'X-RateLimit-Limit': limit.toString(),
      'X-RateLimit-Remaining': remaining.toString(),
      'X-RateLimit-Reset': reset.toString(),
    },
  };
}
```

**Environment Variables** (`.env.local`):
```bash
# Upstash Redis (free tier: https://upstash.com/)
UPSTASH_REDIS_REST_URL=your_redis_url_here
UPSTASH_REDIS_REST_TOKEN=your_redis_token_here
```

**Apply to API Routes** (`src/app/api/search/route.ts`):
```typescript
import { searchRateLimiter, withRateLimit } from '@/lib/security/rate-limiter';

export async function GET(request: Request) {
  // Apply rate limiting
  const rateLimitResult = await withRateLimit(request, searchRateLimiter);

  if (!rateLimitResult.success) {
    return new Response('Too many requests. Please try again later.', {
      status: 429,
      headers: rateLimitResult.headers,
    });
  }

  // Continue with normal request handling
  // ... your search logic here

  return new Response(JSON.stringify(results), {
    headers: {
      'Content-Type': 'application/json',
      ...rateLimitResult.headers,
    },
  });
}
```

### DDoS Protection

**Next.js Security Headers** (`next.config.js`):
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://clerk.com https://*.clerk.accounts.dev; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.clerk.accounts.dev https://api.clerk.com;"
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
```

---

## Layer 2: Input Validation

### SQL Injection Prevention

**Using Drizzle ORM** (already implemented - verify):
```typescript
// ✅ SAFE - Drizzle ORM parameterizes queries automatically
import { db } from '@/lib/db';
import { vehicles } from '@/lib/schema';
import { eq } from 'drizzle-orm';

const vehicle = await db
  .select()
  .from(vehicles)
  .where(eq(vehicles.make, userInput)); // Automatically sanitized

// ❌ UNSAFE - Never use raw SQL with user input
const results = await db.execute(`SELECT * FROM vehicles WHERE make = '${userInput}'`);
```

### XSS Attack Prevention

**Create Input Sanitizer** (`src/lib/security/input-validation.ts`):
```typescript
import DOMPurify from 'isomorphic-dompurify';

export interface ValidationResult {
  isValid: boolean;
  sanitized: string;
  errors: string[];
}

/**
 * Sanitize HTML to prevent XSS attacks
 */
export function sanitizeHTML(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // No HTML allowed
    ALLOWED_ATTR: [],
  });
}

/**
 * Validate and sanitize search input
 */
export function validateSearchInput(input: string): ValidationResult {
  const errors: string[] = [];

  // Remove leading/trailing whitespace
  let sanitized = input.trim();

  // Check length
  if (sanitized.length === 0) {
    errors.push('Search input cannot be empty');
    return { isValid: false, sanitized: '', errors };
  }

  if (sanitized.length > 100) {
    errors.push('Search input too long (max 100 characters)');
    sanitized = sanitized.substring(0, 100);
  }

  // Remove HTML and script tags
  sanitized = sanitizeHTML(sanitized);

  // Remove SQL injection patterns
  const sqlPatterns = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/gi;
  if (sqlPatterns.test(sanitized)) {
    errors.push('Invalid characters detected');
    sanitized = sanitized.replace(sqlPatterns, '');
  }

  // Remove path traversal attempts
  sanitized = sanitized.replace(/\.\./g, '');

  return {
    isValid: errors.length === 0,
    sanitized,
    errors,
  };
}

/**
 * Validate vehicle data input
 */
export function validateVehicleInput(data: any): ValidationResult {
  const errors: string[] = [];
  const sanitized: any = {};

  // Validate year
  if (data.year) {
    const year = parseInt(data.year);
    if (isNaN(year) || year < 1900 || year > new Date().getFullYear() + 2) {
      errors.push('Invalid year');
    } else {
      sanitized.year = year;
    }
  }

  // Validate make (alphanumeric and spaces only)
  if (data.make) {
    const make = sanitizeHTML(data.make.trim());
    if (!/^[a-zA-Z0-9\s-]+$/.test(make)) {
      errors.push('Invalid make (alphanumeric only)');
    } else {
      sanitized.make = make;
    }
  }

  // Validate model
  if (data.model) {
    sanitized.model = sanitizeHTML(data.model.trim());
  }

  return {
    isValid: errors.length === 0,
    sanitized,
    errors,
  };
}

/**
 * Validate email
 */
export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];
  const sanitized = email.trim().toLowerCase();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(sanitized)) {
    errors.push('Invalid email format');
  }

  return {
    isValid: errors.length === 0,
    sanitized,
    errors,
  };
}
```

**Install Dependencies**:
```bash
npm install isomorphic-dompurify
```

**Apply Validation** (in API routes):
```typescript
import { validateSearchInput } from '@/lib/security/input-validation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';

  // Validate and sanitize input
  const validation = validateSearchInput(query);

  if (!validation.isValid) {
    return new Response(JSON.stringify({ error: validation.errors }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Use sanitized input
  const results = await searchDatabase(validation.sanitized);

  return new Response(JSON.stringify(results), {
    headers: { 'Content-Type': 'application/json' },
  });
}
```

---

## Layer 3: Authentication

### Clerk Authentication (Already Implemented)

**Verify Implementation** (`src/app/layout.tsx`):
```typescript
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      {/* ... */}
    </ClerkProvider>
  );
}
```

### Multi-Factor Authentication (MFA)

**Enable in Clerk Dashboard**:
1. Go to https://dashboard.clerk.com/
2. Select your application
3. Navigate to **User & Authentication** → **Multi-factor**
4. Enable **SMS** and/or **Authenticator app (TOTP)**
5. Configure backup codes

**Enforce MFA for Sensitive Actions**:
```typescript
import { auth } from '@clerk/nextjs';

export async function DELETE(request: Request) {
  const { userId, sessionClaims } = auth();

  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Check if user has MFA enabled
  const mfaEnabled = sessionClaims?.metadata?.mfaEnabled;

  if (!mfaEnabled) {
    return new Response('MFA required for this action', { status: 403 });
  }

  // Continue with delete operation
}
```

### Session Security

**Configure Session Settings** (Clerk Dashboard):
- **Session lifetime**: 7 days (default)
- **Inactivity timeout**: 30 minutes
- **Multi-session handling**: Allow (or restrict to 1 active session)

---

## Layer 4: Authorization

### Role-Based Access Control (RBAC)

**Define Roles** (`src/types/roles.ts`):
```typescript
export enum UserRole {
  ADMIN = 'admin',
  MECHANIC = 'mechanic',
  USER = 'user',
}

export interface UserMetadata {
  role: UserRole;
  permissions: string[];
}
```

**Set User Roles** (Clerk Dashboard → Users → Select User → Metadata):
```json
{
  "publicMetadata": {
    "role": "mechanic",
    "permissions": ["read:parts", "write:diagnostics"]
  }
}
```

**Create Authorization Middleware** (`src/lib/security/authorization.ts`):
```typescript
import { auth } from '@clerk/nextjs';
import { UserRole } from '@/types/roles';

export function requireRole(allowedRoles: UserRole[]) {
  return async (request: Request) => {
    const { userId, sessionClaims } = auth();

    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const userRole = sessionClaims?.metadata?.role as UserRole;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return new Response('Forbidden - Insufficient permissions', { status: 403 });
    }

    return null; // Authorization passed
  };
}

export function requirePermission(permission: string) {
  return async (request: Request) => {
    const { userId, sessionClaims } = auth();

    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const permissions = sessionClaims?.metadata?.permissions as string[] || [];

    if (!permissions.includes(permission)) {
      return new Response('Forbidden - Missing permission', { status: 403 });
    }

    return null;
  };
}
```

**Protect Routes** (`src/app/api/admin/route.ts`):
```typescript
import { requireRole } from '@/lib/security/authorization';
import { UserRole } from '@/types/roles';

export async function GET(request: Request) {
  // Check authorization
  const authError = await requireRole([UserRole.ADMIN])(request);
  if (authError) return authError;

  // Admin-only logic here
  return new Response(JSON.stringify({ message: 'Admin data' }));
}
```

**Client-Side Route Protection** (`src/middleware.ts`):
```typescript
import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/', '/about', '/contact', '/privacy', '/terms'],
  ignoredRoutes: ['/api/public'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
```

---

## Layer 5: Data Security

### Environment Variable Validation

**Create Validator** (`src/lib/security/env-validator.ts`):
```typescript
import { z } from 'zod';

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),

  // Authentication
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  CLERK_SECRET_KEY: z.string().min(1),

  // Redis (Rate Limiting)
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

  // Google Custom Search
  GOOGLE_CUSTOM_SEARCH_API_KEY: z.string().min(1).optional(),
  GOOGLE_CUSTOM_SEARCH_ENGINE_ID: z.string().min(1).optional(),
});

export function validateEnv() {
  try {
    envSchema.parse(process.env);
    console.log('✅ Environment variables validated');
  } catch (error) {
    console.error('❌ Invalid environment variables:', error);
    throw new Error('Environment validation failed');
  }
}
```

**Call Validator** (`next.config.js`):
```javascript
const { validateEnv } = require('./src/lib/security/env-validator.ts');

validateEnv();

module.exports = {
  // ... your config
};
```

### Sensitive Data Handling

**Never Log Secrets**:
```typescript
// ❌ NEVER DO THIS
console.log('User password:', password);
console.log('API Key:', process.env.CLERK_SECRET_KEY);

// ✅ Safe logging
console.log('User authenticated:', { userId, timestamp: new Date() });
console.log('API key configured:', !!process.env.CLERK_SECRET_KEY);
```

**Mask Sensitive Data**:
```typescript
export function maskEmail(email: string): string {
  const [name, domain] = email.split('@');
  return `${name.substring(0, 2)}***@${domain}`;
}

export function maskCreditCard(cardNumber: string): string {
  return `**** **** **** ${cardNumber.slice(-4)}`;
}
```

---

## Layer 6: Real-Time Monitoring

### Security Event Logging

**Create Logger** (`src/lib/security/security-logger.ts`):
```typescript
export enum SecurityEventType {
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  INVALID_INPUT = 'INVALID_INPUT',
  UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
  AUTHENTICATION_FAILURE = 'AUTHENTICATION_FAILURE',
  SQL_INJECTION_ATTEMPT = 'SQL_INJECTION_ATTEMPT',
  XSS_ATTEMPT = 'XSS_ATTEMPT',
}

export enum SecuritySeverity {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

interface SecurityEvent {
  type: SecurityEventType;
  severity: SecuritySeverity;
  ip: string;
  userId?: string;
  details: string;
  timestamp: Date;
  userAgent?: string;
  url?: string;
}

export class SecurityLogger {
  static async logEvent(event: SecurityEvent) {
    // Log to console (development)
    if (process.env.NODE_ENV === 'development') {
      console.warn(`🚨 [${event.severity}] ${event.type}:`, event.details);
    }

    // Log to database (production)
    // await db.insert(securityEvents).values(event);

    // Send alert for critical events
    if (event.severity === SecuritySeverity.CRITICAL) {
      await this.sendAlert(event);
    }
  }

  static async sendAlert(event: SecurityEvent) {
    // Send email/Slack/PagerDuty alert
    console.error('🚨 CRITICAL SECURITY EVENT:', event);

    // Example: Send to Slack webhook
    // await fetch(process.env.SLACK_WEBHOOK_URL, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     text: `🚨 CRITICAL: ${event.type}\n${event.details}\nIP: ${event.ip}`
    //   })
    // });
  }
}

// Usage in API routes
import { SecurityLogger, SecurityEventType, SecuritySeverity } from '@/lib/security/security-logger';

const validation = validateSearchInput(query);
if (!validation.isValid) {
  await SecurityLogger.logEvent({
    type: SecurityEventType.INVALID_INPUT,
    severity: SecuritySeverity.MEDIUM,
    ip: getClientIP(request),
    details: `Invalid search input: ${validation.errors.join(', ')}`,
    timestamp: new Date(),
    url: request.url,
  });
}
```

### IP Reputation Tracking

**Track Failed Attempts** (`src/lib/security/ip-tracker.ts`):
```typescript
const suspiciousIPs = new Map<string, number>();
const BLOCK_THRESHOLD = 10;
const BLOCK_DURATION = 15 * 60 * 1000; // 15 minutes

export function trackFailedAttempt(ip: string) {
  const attempts = suspiciousIPs.get(ip) || 0;
  suspiciousIPs.set(ip, attempts + 1);

  if (attempts + 1 >= BLOCK_THRESHOLD) {
    blockIP(ip);
  }
}

export function isIPBlocked(ip: string): boolean {
  // Check if IP is in blocklist
  return suspiciousIPs.get(ip) >= BLOCK_THRESHOLD;
}

function blockIP(ip: string) {
  SecurityLogger.logEvent({
    type: SecurityEventType.SUSPICIOUS_ACTIVITY,
    severity: SecuritySeverity.HIGH,
    ip,
    details: `IP blocked due to ${BLOCK_THRESHOLD}+ failed attempts`,
    timestamp: new Date(),
  });

  // Automatically unblock after duration
  setTimeout(() => {
    suspiciousIPs.delete(ip);
  }, BLOCK_DURATION);
}
```

---

## 🔒 Security Checklist

### Before Production Deployment

- [ ] **Layer 1: Network Security**
  - [ ] Rate limiting configured for all API endpoints
  - [ ] DDoS protection headers added to next.config.js
  - [ ] CSP (Content Security Policy) configured
  - [ ] HTTPS enforced (Strict-Transport-Security header)

- [ ] **Layer 2: Input Validation**
  - [ ] All user inputs validated and sanitized
  - [ ] SQL injection prevention verified (Drizzle ORM)
  - [ ] XSS prevention implemented (DOMPurify)
  - [ ] Path traversal prevention in place

- [ ] **Layer 3: Authentication**
  - [ ] Clerk authentication working
  - [ ] MFA enabled and tested
  - [ ] Session management configured
  - [ ] Brute force protection active (rate limiting on auth endpoints)

- [ ] **Layer 4: Authorization**
  - [ ] RBAC roles defined (admin, mechanic, user)
  - [ ] Protected routes have authorization checks
  - [ ] API endpoints verify permissions
  - [ ] Middleware protecting sensitive routes

- [ ] **Layer 5: Data Security**
  - [ ] Environment variables validated
  - [ ] No secrets in code or logs
  - [ ] Sensitive data masked in logs
  - [ ] Database access uses prepared statements (Drizzle ORM)

- [ ] **Layer 6: Monitoring**
  - [ ] Security event logging implemented
  - [ ] Critical event alerting configured
  - [ ] IP reputation tracking active
  - [ ] Failed attempt monitoring in place

### Testing

- [ ] Penetration testing completed
- [ ] OWASP Top 10 vulnerabilities addressed
- [ ] Rate limiting tested (should block after threshold)
- [ ] XSS attempts blocked
- [ ] SQL injection attempts prevented
- [ ] Unauthorized access properly denied

---

## 📚 Resources

- **OWASP Top 10**: https://owasp.org/www-project-top-ten/
- **Next.js Security**: https://nextjs.org/docs/advanced-features/security-headers
- **Clerk Security**: https://clerk.com/docs/security
- **Rate Limiting**: https://github.com/upstash/ratelimit

---

**Last Updated**: 2025-01-16
**Status**: Implementation guide complete - ready for development
