import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize Redis connection
// Note: Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in .env.local
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

// Rate limiters for different endpoints
export const apiRateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 requests per minute
      analytics: true,
      prefix: '@ratelimit/api',
    })
  : null;

export const authRateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '15 m'), // 5 login attempts per 15 minutes
      analytics: true,
      prefix: '@ratelimit/auth',
    })
  : null;

export const searchRateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(50, '1 m'), // 50 searches per minute
      analytics: true,
      prefix: '@ratelimit/search',
    })
  : null;

/**
 * Get client IP address from request headers
 */
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

/**
 * Rate limit middleware wrapper
 * Returns success status and headers to include in response
 */
export async function withRateLimit(
  request: Request,
  limiter: Ratelimit | null,
  identifier?: string
): Promise<{
  success: boolean;
  headers: Record<string, string>;
}> {
  // If rate limiter not configured, allow request
  if (!limiter) {
    console.warn('Rate limiter not configured. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN');
    return {
      success: true,
      headers: {},
    };
  }

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
