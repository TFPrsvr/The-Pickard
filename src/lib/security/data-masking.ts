/**
 * Data masking utilities for protecting sensitive information in logs and responses
 * Part of Layer 5: Data Security
 */

/**
 * Mask email address - show first 2 characters and domain
 * Example: john.doe@example.com → jo***@example.com
 */
export function maskEmail(email: string): string {
  if (!email || typeof email !== 'string') return '';

  const parts = email.split('@');
  if (parts.length !== 2) return '***';

  const [username, domain] = parts;
  if (username.length <= 2) {
    return `${username[0]}***@${domain}`;
  }

  return `${username.substring(0, 2)}***@${domain}`;
}

/**
 * Mask phone number - show last 4 digits
 * Example: +1-555-123-4567 → ***-***-4567
 */
export function maskPhone(phone: string): string {
  if (!phone || typeof phone !== 'string') return '';

  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');

  if (digits.length < 4) return '***';

  const lastFour = digits.slice(-4);
  return `***-***-${lastFour}`;
}

/**
 * Mask credit card number - show last 4 digits
 * Example: 4532-1234-5678-9010 → ****-****-****-9010
 */
export function maskCreditCard(cardNumber: string): string {
  if (!cardNumber || typeof cardNumber !== 'string') return '';

  // Remove all non-digit characters
  const digits = cardNumber.replace(/\D/g, '');

  if (digits.length < 4) return '****';

  const lastFour = digits.slice(-4);
  return `****-****-****-${lastFour}`;
}

/**
 * Mask IP address - show first octet only
 * Example: 192.168.1.100 → 192.*.*.*
 */
export function maskIPAddress(ip: string): string {
  if (!ip || typeof ip !== 'string') return '';

  // IPv4
  if (ip.includes('.')) {
    const parts = ip.split('.');
    if (parts.length !== 4) return '*.*.*.*';
    return `${parts[0]}.*.*.*`;
  }

  // IPv6
  if (ip.includes(':')) {
    const parts = ip.split(':');
    if (parts.length < 2) return '*:*:*:*';
    return `${parts[0]}:*:*:*`;
  }

  return '*.*.*.*';
}

/**
 * Mask API key or token - show first 4 and last 4 characters
 * Example: sk_test_abc123xyz789 → sk_t***z789
 */
export function maskAPIKey(key: string): string {
  if (!key || typeof key !== 'string') return '';

  if (key.length <= 8) return '****';

  const prefix = key.substring(0, 4);
  const suffix = key.substring(key.length - 4);

  return `${prefix}***${suffix}`;
}

/**
 * Mask password - always return fixed mask
 * Example: MyPassword123! → ********
 */
export function maskPassword(password: string): string {
  if (!password) return '';
  return '********';
}

/**
 * Mask string - show first N and last N characters
 * Example: maskString('sensitive-data', 3) → sen***ata
 */
export function maskString(str: string, visibleChars: number = 3): string {
  if (!str || typeof str !== 'string') return '';

  if (str.length <= visibleChars * 2) return '***';

  const prefix = str.substring(0, visibleChars);
  const suffix = str.substring(str.length - visibleChars);

  return `${prefix}***${suffix}`;
}

/**
 * Mask object - recursively mask sensitive fields in objects
 * Automatically detects and masks common sensitive field names
 */
export function maskSensitiveData(
  obj: any,
  sensitiveFields: string[] = [
    'password',
    'token',
    'secret',
    'apiKey',
    'api_key',
    'creditCard',
    'credit_card',
    'ssn',
    'social_security',
  ]
): any {
  if (!obj || typeof obj !== 'object') return obj;

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map(item => maskSensitiveData(item, sensitiveFields));
  }

  // Handle objects
  const masked: any = {};

  for (const [key, value] of Object.entries(obj)) {
    const lowerKey = key.toLowerCase();

    // Check if this field should be masked
    const shouldMask = sensitiveFields.some(field =>
      lowerKey.includes(field.toLowerCase())
    );

    if (shouldMask && typeof value === 'string') {
      // Determine masking strategy based on field name
      if (lowerKey.includes('email')) {
        masked[key] = maskEmail(value);
      } else if (lowerKey.includes('phone')) {
        masked[key] = maskPhone(value);
      } else if (lowerKey.includes('card') || lowerKey.includes('credit')) {
        masked[key] = maskCreditCard(value);
      } else if (lowerKey.includes('password')) {
        masked[key] = maskPassword(value);
      } else if (lowerKey.includes('token') || lowerKey.includes('key')) {
        masked[key] = maskAPIKey(value);
      } else if (lowerKey.includes('ip')) {
        masked[key] = maskIPAddress(value);
      } else {
        masked[key] = maskString(value);
      }
    } else if (typeof value === 'object' && value !== null) {
      // Recursively mask nested objects
      masked[key] = maskSensitiveData(value, sensitiveFields);
    } else {
      // Keep non-sensitive values as-is
      masked[key] = value;
    }
  }

  return masked;
}

/**
 * Safe logging function that automatically masks sensitive data
 * Use this instead of console.log for user data, API responses, etc.
 */
export function safeLog(label: string, data: any, additionalSensitiveFields?: string[]): void {
  const sensitiveFields = [
    'password',
    'token',
    'secret',
    'apiKey',
    'api_key',
    'creditCard',
    'credit_card',
    'ssn',
    'social_security',
    'email',
    'phone',
    ...(additionalSensitiveFields || []),
  ];

  const masked = maskSensitiveData(data, sensitiveFields);
  console.log(`[SAFE LOG] ${label}:`, masked);
}

/**
 * Redact sensitive information from error messages
 * Prevents leaking sensitive data in error logs
 */
export function sanitizeErrorMessage(error: Error | string): string {
  const message = typeof error === 'string' ? error : error.message;

  let sanitized = message;

  // Redact common patterns
  // Email addresses
  sanitized = sanitized.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '***@***.***');

  // Phone numbers
  sanitized = sanitized.replace(/\+?[\d\s\-()]{10,}/g, '***-***-****');

  // Credit card numbers (4 groups of 4 digits)
  sanitized = sanitized.replace(/\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, '****-****-****-****');

  // API keys/tokens (common patterns)
  sanitized = sanitized.replace(/\b(sk|pk|api)_[a-zA-Z0-9_-]+/gi, '$1_***');

  // IP addresses
  sanitized = sanitized.replace(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g, '*.*.*.*');

  // Database connection strings
  sanitized = sanitized.replace(/postgresql:\/\/[^@]+@[^\s]+/g, 'postgresql://***:***@***');
  sanitized = sanitized.replace(/mysql:\/\/[^@]+@[^\s]+/g, 'mysql://***:***@***');

  return sanitized;
}

/**
 * Validate that environment variables don't contain actual sensitive values
 * Useful in development to prevent accidental exposure
 */
export function validateEnvSecurity(envVars: Record<string, string | undefined>): {
  isSecure: boolean;
  warnings: string[];
} {
  const warnings: string[] = [];

  for (const [key, value] of Object.entries(envVars)) {
    if (!value) continue;

    // Check for example/placeholder values that should be replaced
    const placeholderPatterns = [
      'your_',
      'example',
      'placeholder',
      'changeme',
      'replace',
      'todo',
    ];

    const isPlaceholder = placeholderPatterns.some(pattern =>
      value.toLowerCase().includes(pattern)
    );

    if (isPlaceholder && key.toLowerCase().includes('secret')) {
      warnings.push(`${key} appears to contain a placeholder value`);
    }

    // Check for weak secrets (too short)
    if (key.toLowerCase().includes('secret') || key.toLowerCase().includes('token')) {
      if (value.length < 16) {
        warnings.push(`${key} is too short (minimum 16 characters recommended)`);
      }
    }
  }

  return {
    isSecure: warnings.length === 0,
    warnings,
  };
}

/**
 * Generate a redacted version of environment variables for debugging
 * Safe to include in error reports or logs
 */
export function getRedactedEnv(): Record<string, string> {
  const redacted: Record<string, string> = {};

  const env = process.env;
  const sensitivePatterns = ['key', 'secret', 'token', 'password', 'credentials'];

  for (const [key, value] of Object.entries(env)) {
    if (!value) continue;

    const isSensitive = sensitivePatterns.some(pattern =>
      key.toLowerCase().includes(pattern)
    );

    if (isSensitive) {
      redacted[key] = value.length > 4
        ? `${value.substring(0, 4)}***`
        : '***';
    } else {
      redacted[key] = value;
    }
  }

  return redacted;
}
