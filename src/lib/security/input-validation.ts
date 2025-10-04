import DOMPurify from 'isomorphic-dompurify';
import { z } from 'zod';

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

  // Validate category
  if (data.category) {
    const validCategories = ['car', 'truck', '18-wheeler', 'motorcycle', 'atv', 'utv', 'snowmobile', 'watercraft', 'rv'];
    if (!validCategories.includes(data.category)) {
      errors.push('Invalid vehicle category');
    } else {
      sanitized.category = data.category;
    }
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

/**
 * Validate numeric input
 */
export function validateNumber(value: string, min?: number, max?: number): ValidationResult {
  const errors: string[] = [];
  const sanitized = value.trim();

  const num = Number(sanitized);

  if (isNaN(num)) {
    errors.push('Invalid number');
    return { isValid: false, sanitized: '', errors };
  }

  if (min !== undefined && num < min) {
    errors.push(`Number must be at least ${min}`);
  }

  if (max !== undefined && num > max) {
    errors.push(`Number must be at most ${max}`);
  }

  return {
    isValid: errors.length === 0,
    sanitized,
    errors,
  };
}

/**
 * Environment variable validation schema
 */
export const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),

  // Authentication
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  CLERK_SECRET_KEY: z.string().min(1),

  // Redis (Rate Limiting) - Optional in development
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

  // Google Custom Search - Optional
  GOOGLE_CUSTOM_SEARCH_API_KEY: z.string().min(1).optional(),
  GOOGLE_CUSTOM_SEARCH_ENGINE_ID: z.string().min(1).optional(),
});

/**
 * Validate environment variables
 */
export function validateEnv() {
  try {
    envSchema.parse(process.env);
    console.log('✅ Environment variables validated');
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:');
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
    }
    throw new Error('Environment validation failed');
  }
}
