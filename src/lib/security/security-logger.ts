/**
 * Security event types for monitoring and alerting
 */
export enum SecurityEventType {
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  INVALID_INPUT = 'INVALID_INPUT',
  UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS',
  FORBIDDEN_ACCESS = 'FORBIDDEN_ACCESS',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
  AUTHENTICATION_FAILURE = 'AUTHENTICATION_FAILURE',
  SQL_INJECTION_ATTEMPT = 'SQL_INJECTION_ATTEMPT',
  XSS_ATTEMPT = 'XSS_ATTEMPT',
  PATH_TRAVERSAL_ATTEMPT = 'PATH_TRAVERSAL_ATTEMPT',
}

/**
 * Security severity levels for prioritization
 */
export enum SecuritySeverity {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

/**
 * Security event data structure
 */
export interface SecurityEvent {
  type: SecurityEventType;
  severity: SecuritySeverity;
  ip: string;
  userId?: string;
  details: string;
  timestamp: Date;
  userAgent?: string;
  url?: string;
  method?: string;
}

/**
 * Security event logger with severity-based alerting
 */
export class SecurityLogger {
  /**
   * Log a security event
   */
  static async logEvent(event: SecurityEvent): Promise<void> {
    // Format log message
    const logMessage = this.formatLogMessage(event);

    // Log based on severity
    switch (event.severity) {
      case SecuritySeverity.CRITICAL:
        console.error(`🚨 [${event.severity}] ${logMessage}`);
        await this.sendAlert(event);
        break;
      case SecuritySeverity.HIGH:
        console.warn(`⚠️  [${event.severity}] ${logMessage}`);
        await this.sendAlert(event);
        break;
      case SecuritySeverity.MEDIUM:
        console.warn(`⚠️  [${event.severity}] ${logMessage}`);
        break;
      case SecuritySeverity.LOW:
        console.log(`ℹ️  [${event.severity}] ${logMessage}`);
        break;
    }

    // In production, you would also:
    // - Save to database for analysis
    // - Send to monitoring service (Sentry, DataDog, etc.)
    // - Update IP reputation tracking
  }

  /**
   * Format log message for readability
   */
  private static formatLogMessage(event: SecurityEvent): string {
    const parts = [
      event.type,
      `IP: ${event.ip}`,
      event.userId ? `User: ${event.userId}` : null,
      event.url ? `URL: ${event.url}` : null,
      event.details,
    ].filter(Boolean);

    return parts.join(' | ');
  }

  /**
   * Send alert for critical/high severity events
   */
  private static async sendAlert(event: SecurityEvent): Promise<void> {
    // In production, implement actual alerting:
    // - Send email to security team
    // - Post to Slack webhook
    // - Trigger PagerDuty incident
    // - SMS to on-call engineer

    console.error('🚨 SECURITY ALERT:', {
      type: event.type,
      severity: event.severity,
      ip: event.ip,
      userId: event.userId,
      url: event.url,
      details: event.details,
      timestamp: event.timestamp.toISOString(),
    });

    // Example Slack webhook (uncomment and configure in production):
    // if (process.env.SLACK_SECURITY_WEBHOOK) {
    //   await fetch(process.env.SLACK_SECURITY_WEBHOOK, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       text: `🚨 Security Alert: ${event.type}`,
    //       attachments: [{
    //         color: 'danger',
    //         fields: [
    //           { title: 'Severity', value: event.severity, short: true },
    //           { title: 'IP Address', value: event.ip, short: true },
    //           { title: 'Details', value: event.details, short: false },
    //         ]
    //       }]
    //     })
    //   });
    // }
  }

  /**
   * Log rate limit exceeded event
   */
  static async logRateLimitExceeded(ip: string, url: string): Promise<void> {
    await this.logEvent({
      type: SecurityEventType.RATE_LIMIT_EXCEEDED,
      severity: SecuritySeverity.MEDIUM,
      ip,
      url,
      details: 'Rate limit exceeded',
      timestamp: new Date(),
    });
  }

  /**
   * Log invalid input event
   */
  static async logInvalidInput(
    ip: string,
    url: string,
    input: string,
    errors: string[]
  ): Promise<void> {
    await this.logEvent({
      type: SecurityEventType.INVALID_INPUT,
      severity: SecuritySeverity.MEDIUM,
      ip,
      url,
      details: `Invalid input detected: ${errors.join(', ')}`,
      timestamp: new Date(),
    });
  }

  /**
   * Log SQL injection attempt
   */
  static async logSQLInjectionAttempt(
    ip: string,
    url: string,
    input: string
  ): Promise<void> {
    await this.logEvent({
      type: SecurityEventType.SQL_INJECTION_ATTEMPT,
      severity: SecuritySeverity.CRITICAL,
      ip,
      url,
      details: `SQL injection attempt detected in input: ${input.substring(0, 100)}`,
      timestamp: new Date(),
    });
  }

  /**
   * Log XSS attempt
   */
  static async logXSSAttempt(
    ip: string,
    url: string,
    input: string
  ): Promise<void> {
    await this.logEvent({
      type: SecurityEventType.XSS_ATTEMPT,
      severity: SecuritySeverity.HIGH,
      ip,
      url,
      details: `XSS attempt detected in input: ${input.substring(0, 100)}`,
      timestamp: new Date(),
    });
  }

  /**
   * Log unauthorized access attempt
   */
  static async logUnauthorizedAccess(
    ip: string,
    url: string,
    userId?: string
  ): Promise<void> {
    await this.logEvent({
      type: SecurityEventType.UNAUTHORIZED_ACCESS,
      severity: SecuritySeverity.HIGH,
      ip,
      url,
      userId,
      details: 'Unauthorized access attempt',
      timestamp: new Date(),
    });
  }

  /**
   * Log forbidden access attempt
   */
  static async logForbiddenAccess(
    ip: string,
    url: string,
    userId: string,
    requiredRole: string
  ): Promise<void> {
    await this.logEvent({
      type: SecurityEventType.FORBIDDEN_ACCESS,
      severity: SecuritySeverity.HIGH,
      ip,
      url,
      userId,
      details: `Access denied - required role: ${requiredRole}`,
      timestamp: new Date(),
    });
  }
}

/**
 * IP reputation tracking (simple in-memory implementation)
 * In production, use Redis or database
 */
class IPReputationTracker {
  private static suspiciousIPs = new Map<string, number>();
  private static blockedIPs = new Set<string>();
  private static BLOCK_THRESHOLD = 10;
  private static BLOCK_DURATION = 15 * 60 * 1000; // 15 minutes

  /**
   * Track failed attempt from IP
   */
  static trackFailedAttempt(ip: string): void {
    const attempts = this.suspiciousIPs.get(ip) || 0;
    this.suspiciousIPs.set(ip, attempts + 1);

    if (attempts + 1 >= this.BLOCK_THRESHOLD) {
      this.blockIP(ip);
    }
  }

  /**
   * Check if IP is blocked
   */
  static isBlocked(ip: string): boolean {
    return this.blockedIPs.has(ip);
  }

  /**
   * Block an IP address
   */
  private static blockIP(ip: string): void {
    this.blockedIPs.add(ip);

    SecurityLogger.logEvent({
      type: SecurityEventType.SUSPICIOUS_ACTIVITY,
      severity: SecuritySeverity.HIGH,
      ip,
      details: `IP blocked due to ${this.BLOCK_THRESHOLD}+ failed attempts`,
      timestamp: new Date(),
    });

    // Automatically unblock after duration
    setTimeout(() => {
      this.blockedIPs.delete(ip);
      this.suspiciousIPs.delete(ip);
    }, this.BLOCK_DURATION);
  }

  /**
   * Clear IP reputation (for testing or after manual review)
   */
  static clearReputation(ip: string): void {
    this.suspiciousIPs.delete(ip);
    this.blockedIPs.delete(ip);
  }
}

export { IPReputationTracker };
