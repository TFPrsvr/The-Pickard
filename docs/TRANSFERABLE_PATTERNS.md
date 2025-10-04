# Transferable Patterns & Best Practices

## Overview

This document contains reusable patterns, checklists, and best practices from The Pickard project that can be applied to **all future projects**. These patterns ensure consistent quality, security, accessibility, and app store readiness across all applications.

---

## 🎯 Table of Contents

1. [PWA Implementation Patterns](#pwa-implementation-patterns)
2. [Accessibility Patterns (WCAG 2.1 AA)](#accessibility-patterns)
3. [Security Architecture (6-Layer)](#security-architecture)
4. [App Store Preparation](#app-store-preparation)
5. [Code Quality Workflows](#code-quality-workflows)
6. [Performance Optimization](#performance-optimization)
7. [Testing Strategies](#testing-strategies)
8. [Documentation Structure](#documentation-structure)

---

## 🌐 PWA Implementation Patterns

### Icon Generation Workflow

**Reusable Script** (`scripts/generate-icons.js`):
```javascript
const sharp = require('sharp');
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

async function generateIcons() {
  for (const size of sizes) {
    const isMaskable = size === 192 || size === 512;
    const padding = isMaskable ? Math.round(size * 0.2) : Math.round(size * 0.1);
    const logoSize = size - (padding * 2);

    await sharp(source)
      .resize(logoSize, logoSize, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .extend({
        top: padding,
        bottom: padding,
        left: padding,
        right: padding,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(`icon-${size}x${size}.png`);
  }
}
```

**Key Principles**:
- **Maskable icons** (192x192, 512x512) require 20% padding (safe area)
- **Regular icons** need 10% padding
- **White background** for solid icons (or transparent for logos)
- **Test at** https://maskable.app/ before submission

### PWA manifest.json Template

```json
{
  "name": "Your App Name",
  "short_name": "AppName",
  "description": "Your app description",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#your-primary-color",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "shortcuts": [
    {
      "name": "Feature Name",
      "short_name": "Feature",
      "description": "Quick access to feature",
      "url": "/feature-path",
      "icons": [{ "src": "/icons/shortcut-96x96.png", "sizes": "96x96" }]
    }
  ]
}
```

### PWA Testing Checklist

**Android (Chrome)**:
- [ ] Install prompt appears
- [ ] Icon displays correctly (not cut off)
- [ ] Splash screen uses 512x512 icon
- [ ] Standalone mode (no browser UI)
- [ ] Offline mode works

**iOS (Safari)**:
- [ ] "Add to Home Screen" option available
- [ ] Icon displays correctly (152x152)
- [ ] Standalone mode works
- [ ] Safe areas respected (notch/Dynamic Island)

---

## ♿ Accessibility Patterns (WCAG 2.1 AA)

### Required CSS Utilities

**Always include in `globals.css`**:
```css
/* Screen Reader Only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.sr-only:focus,
.sr-only:active {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: inherit;
}

/* Skip Links */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  padding: 8px 16px;
  z-index: 1000;
  transition: top 0.2s ease;
}

.skip-link:focus {
  top: 6px;
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}

/* Focus Indicators (WCAG 2.1 AA - 2px minimum) */
button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
a:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
  box-shadow: 0 0 0 4px hsla(var(--ring) / 0.2);
}

/* Touch Targets (44x44px minimum) */
button, a, input[type="checkbox"], input[type="radio"], select {
  min-height: 44px;
  min-width: 44px;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  button, input, select, textarea {
    border: 2px solid currentColor;
  }
}
```

### Layout Pattern with Skip Links

**Every `layout.tsx` should include**:
```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Skip to Main Content - REQUIRED */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <div>
          <nav aria-label="Main navigation">{/* Navigation */}</nav>

          <main id="main-content" className="min-h-screen">
            {children}
          </main>

          <footer>{/* Footer */}</footer>
        </div>
      </body>
    </html>
  );
}
```

### ARIA Label Patterns

**Icon-only buttons**:
```tsx
<button
  onClick={handleClick}
  aria-label="Open navigation menu"
  aria-expanded={isOpen}
  aria-controls="mobile-menu"
>
  <MenuIcon aria-hidden="true" />
</button>
```

**Expandable sections**:
```tsx
<button
  onClick={() => setExpanded(!expanded)}
  aria-expanded={expanded}
  aria-controls="section-content"
  aria-label="Toggle section"
>
  Expand Section
  <ChevronIcon aria-hidden="true" />
</button>

{expanded && (
  <div id="section-content" role="region" aria-label="Section details">
    {/* Content */}
  </div>
)}
```

**Form labels**:
```tsx
<div>
  <label htmlFor="email">Email Address</label>
  <input
    id="email"
    type="email"
    aria-describedby="email-help"
    aria-required="true"
    aria-invalid={!!error}
  />
  <small id="email-help" className="sr-only">
    Enter your email address
  </small>
  {error && (
    <div role="alert" aria-live="assertive">
      {error}
    </div>
  )}
</div>
```

**Dynamic content updates**:
```tsx
<div aria-live="polite" aria-atomic="true">
  {results.length} results found
</div>
```

### Accessibility Testing Checklist

**Before Every Commit**:
- [ ] Run Axe DevTools scan (0 critical/serious issues)
- [ ] Test keyboard navigation (all features accessible via Tab)
- [ ] Verify focus indicators visible (2px minimum)

**Before Release**:
- [ ] Lighthouse accessibility score 95+
- [ ] WAVE scan (0 errors)
- [ ] Screen reader testing (NVDA + VoiceOver)
- [ ] Color contrast check (4.5:1 minimum)
- [ ] Touch targets ≥ 44x44px
- [ ] Zoom test at 200%

---

## 🛡️ Security Architecture (6-Layer)

### Layer 1: Network Security - Rate Limiting

**Pattern** (`src/lib/security/rate-limiter.ts`):
```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const apiRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 req/min
  analytics: true,
  prefix: '@ratelimit/api',
});

export async function withRateLimit(request: Request, limiter: Ratelimit) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
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

**Apply to API routes**:
```typescript
export async function GET(request: Request) {
  const rateLimitResult = await withRateLimit(request, apiRateLimiter);

  if (!rateLimitResult.success) {
    return new Response('Too many requests', {
      status: 429,
      headers: rateLimitResult.headers,
    });
  }

  // Continue with request...
}
```

### Layer 2: Input Validation

**Pattern** (`src/lib/security/input-validation.ts`):
```typescript
import DOMPurify from 'isomorphic-dompurify';

export function sanitizeHTML(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
}

export function validateSearchInput(input: string) {
  const errors: string[] = [];
  let sanitized = input.trim();

  // Length check
  if (sanitized.length > 100) {
    sanitized = sanitized.substring(0, 100);
  }

  // Remove HTML/scripts
  sanitized = sanitizeHTML(sanitized);

  // Remove SQL injection patterns
  const sqlPatterns = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP)\b)/gi;
  if (sqlPatterns.test(sanitized)) {
    errors.push('Invalid characters detected');
    sanitized = sanitized.replace(sqlPatterns, '');
  }

  // Remove path traversal
  sanitized = sanitized.replace(/\.\./g, '');

  return {
    isValid: errors.length === 0,
    sanitized,
    errors,
  };
}
```

### Layer 3: Authentication

**Use Enterprise Providers**:
- Clerk (recommended)
- Auth0
- Supabase Auth
- NextAuth.js

**Never build custom auth from scratch**

### Layer 4: Authorization - RBAC

**Pattern**:
```typescript
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export function requireRole(allowedRoles: UserRole[]) {
  return async (request: Request) => {
    const { userId, sessionClaims } = auth();

    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const userRole = sessionClaims?.metadata?.role as UserRole;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return new Response('Forbidden', { status: 403 });
    }

    return null; // Authorized
  };
}
```

### Layer 5: Data Security

**Environment Variable Validation**:
```typescript
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  CLERK_SECRET_KEY: z.string().min(1),
});

export function validateEnv() {
  envSchema.parse(process.env);
}
```

### Layer 6: Real-Time Monitoring

**Security Event Logger Pattern**:
```typescript
export enum SecurityEventType {
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  INVALID_INPUT = 'INVALID_INPUT',
  UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS',
}

export enum SecuritySeverity {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export class SecurityLogger {
  static async logEvent(event: {
    type: SecurityEventType;
    severity: SecuritySeverity;
    ip: string;
    details: string;
  }) {
    console.warn(`[${event.severity}] ${event.type}:`, event.details);

    if (event.severity === SecuritySeverity.CRITICAL) {
      await this.sendAlert(event);
    }
  }

  static async sendAlert(event: any) {
    // Send to Slack/email/PagerDuty
  }
}
```

---

## 📱 App Store Preparation

### Critical Requirements Checklist

**Every app MUST have**:
- [ ] **PWA icons** (192x192, 512x512 maskable)
- [ ] **Screenshots** (desktop 1280x720, mobile 750x1334)
- [ ] **Privacy Policy** (GDPR/CCPA compliant)
- [ ] **Terms of Service**
- [ ] **Public legal page routes** (`/privacy`, `/terms`)
- [ ] **Manifest.json** with all metadata
- [ ] **Lighthouse PWA score 95+**
- [ ] **Accessibility score 95+**
- [ ] **Performance score 90+**

### Privacy Policy Template Structure

**Always include**:
1. Data collection (what data is collected)
2. Data usage (how data is used)
3. Third-party services (Clerk, Firebase, etc.)
4. User rights (GDPR: access, correction, deletion, portability)
5. CCPA compliance (California users)
6. Data retention policies
7. Contact information (support email)
8. Last updated date

### Terms of Service Template Structure

**Always include**:
1. Acceptable use policy
2. User responsibilities
3. Intellectual property rights
4. Liability limitations
5. Industry-specific disclaimers (automotive, medical, financial)
6. Dispute resolution
7. Termination clause
8. Changes to terms

---

## 🔄 Code Quality Workflows

### 2-Day Maintenance Cycle (From CLAUDE.md)

**Every 2 days, run**:
```bash
# 1. Dependency check
npx depcheck

# 2. TypeScript check
npm run typecheck

# 3. Linting
npm run lint

# 4. Production build
npm run build
```

**Check**:
- [ ] No unused dependencies
- [ ] No TypeScript errors
- [ ] ESLint warnings addressed
- [ ] Production build successful
- [ ] Update `NEXT_STEPS.md`
- [ ] Update quality report

### File Organization Rules

**Always**:
- Use self-explanatory names
- Group by feature/domain, not file type
- No duplicate code
- Fix import/export errors immediately
- Verify files in correct folders

**Folder Structure**:
```
src/
├── app/              # Next.js pages
├── components/       # Reusable components
│   ├── ui/          # Base UI components
│   └── [feature]/   # Feature-specific components
├── lib/             # Utilities, helpers
│   ├── security/    # Security utilities
│   └── validation/  # Input validation
├── types/           # TypeScript types
└── hooks/           # Custom React hooks

docs/
├── developers/      # Developer docs
├── testing/         # Testing guides
├── security/        # Security docs
├── deployment/      # Deployment guides
└── legal/           # Privacy, ToS
```

---

## ⚡ Performance Optimization

### Code Splitting Pattern

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/heavy-component'), {
  loading: () => <div className="h-32 bg-gray-100 animate-pulse" />,
  ssr: false, // Client-only if needed
});

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### Image Optimization Pattern

```typescript
import Image from 'next/image';

<Image
  src="/images/photo.jpg"
  alt="Description"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/png;base64,..."
/>
```

### Memoization Patterns

```typescript
import { useMemo, useCallback, memo } from 'react';

// Expensive calculations
const filteredData = useMemo(() => {
  return data.filter(/* complex logic */);
}, [data]);

// Event handlers
const handleClick = useCallback(() => {
  // Handler logic
}, []);

// Components
export const MyComponent = memo(function MyComponent({ data }) {
  return <div>{data}</div>;
});
```

### Bundle Optimization

```bash
# Analyze bundle
ANALYZE=true npm run build

# Optimize imports (tree-shaking)
# ❌ Bad
import * as Icons from 'lucide-react';

# ✅ Good
import { Search, Menu } from 'lucide-react';
```

---

## 🧪 Testing Strategies

### Accessibility Testing (Every Project)

**Tools**:
1. **Axe DevTools** (Chrome extension) - automated scanning
2. **Lighthouse** (Chrome DevTools) - PWA/accessibility audit
3. **WAVE** (Chrome extension) - visual accessibility checker
4. **NVDA/VoiceOver** - screen reader testing

**Process**:
1. Run Axe DevTools on all pages (target: 0 critical/serious issues)
2. Run Lighthouse audit (target: 95+ accessibility score)
3. Test keyboard navigation (all features via Tab)
4. Test screen reader (NVDA on Windows, VoiceOver on Mac)
5. Check color contrast (4.5:1 minimum)
6. Verify touch targets (44x44px minimum)

### PWA Testing (Every Project)

**Android**:
1. Deploy to production or access via local IP
2. Open in Chrome on Android device
3. Tap "Add to Home Screen"
4. Verify icon, splash screen, standalone mode
5. Test offline mode (airplane mode)

**iOS**:
1. Deploy to production HTTPS (required)
2. Open in Safari on iOS device
3. Share → "Add to Home Screen"
4. Verify icon, splash screen, standalone mode
5. Check safe areas (notch/Dynamic Island)

### Performance Testing

```bash
# Lighthouse audit
npm run build
npm run start
# Chrome DevTools → Lighthouse → Run audit

# Target scores:
# - Performance: 90+
# - Accessibility: 95+
# - Best Practices: 95+
# - SEO: 90+
# - PWA: 95+
```

---

## 📚 Documentation Structure

### Required Documentation (Every Project)

```
docs/
├── developers/
│   ├── CONTRIBUTING.md     # Setup, workflow, PR guidelines
│   ├── API.md              # API documentation
│   ├── NEXT_STEPS.md       # Development roadmap
│   └── ENVIRONMENT.md      # Environment setup
├── testing/
│   ├── PWA_TESTING_GUIDE.md           # PWA testing procedures
│   ├── ACCESSIBILITY_TESTING_GUIDE.md  # WCAG 2.1 AA testing
│   └── E2E_TESTING_GUIDE.md           # End-to-end testing
├── security/
│   └── SECURITY_IMPLEMENTATION_GUIDE.md  # 6-layer architecture
├── deployment/
│   ├── PLAY_STORE_CHECKLIST.md   # App store requirements
│   └── MOBILE-DEPLOYMENT.md      # Mobile deployment
├── legal/
│   ├── PRIVACY_POLICY.md   # GDPR/CCPA compliant
│   └── TERMS_OF_SERVICE.md  # ToS with disclaimers
└── optimization/
    └── PERFORMANCE_OPTIMIZATION_GUIDE.md  # Optimization strategies
```

### CLAUDE.md Pattern

**Every project needs** (`CLAUDE.md`):
- Project overview
- Branching strategy
- Development commands
- UI design standards
- Project status & priorities
- 2-day cleanup schedule
- Testing procedures

### README.md Structure

```markdown
# Project Name

## Overview
Brief description

## Features
- Feature 1
- Feature 2

## Tech Stack
- Framework
- Database
- Authentication

## Quick Start
\`\`\`bash
npm install
npm run dev
\`\`\`

## Documentation
- [Contributing](docs/developers/CONTRIBUTING.md)
- [API Docs](docs/developers/API.md)
- [Testing](docs/testing/)

## License
MIT
```

---

## ✅ Universal Checklist (All Projects)

### Before Starting Development

- [ ] Create `CLAUDE.md` with project guidelines
- [ ] Setup folder structure (app, components, lib, docs)
- [ ] Initialize accessibility utilities in `globals.css`
- [ ] Create PWA manifest.json
- [ ] Setup environment variable validation

### During Development

- [ ] Add skip links to layout
- [ ] Use ARIA labels on all interactive elements
- [ ] Implement rate limiting on API routes
- [ ] Validate and sanitize all user inputs
- [ ] Use semantic HTML (`<nav>`, `<main>`, `<article>`)
- [ ] Optimize images (use `<Image />` component)
- [ ] Implement code splitting for large components

### Before Production

- [ ] Run 2-day maintenance checklist
- [ ] Generate PWA icons (192x192, 512x512)
- [ ] Capture app screenshots
- [ ] Create Privacy Policy and ToS
- [ ] Run full accessibility audit (Axe + Lighthouse + Screen reader)
- [ ] Test PWA installation (Android + iOS)
- [ ] Security audit (check all 6 layers)
- [ ] Performance audit (Lighthouse 90+ scores)

---

## 🎯 Success Metrics (All Projects)

**Quality Standards**:
- TypeScript errors: **0**
- ESLint errors: **0**
- ESLint warnings: **< 10**
- Production build: **Success**

**Performance Standards**:
- Lighthouse Performance: **90+**
- Lighthouse Accessibility: **95+**
- Lighthouse Best Practices: **95+**
- Lighthouse PWA: **95+**

**Security Standards**:
- All 6 layers implemented
- Rate limiting: **Active**
- Input validation: **100% of user inputs**
- Authentication: **Enterprise provider**
- HTTPS: **Enforced**

**Accessibility Standards**:
- Axe DevTools: **0 critical/serious issues**
- Keyboard navigation: **100% functional**
- Screen reader: **All content accessible**
- Color contrast: **4.5:1+ minimum**
- Touch targets: **44x44px minimum**

---

## 📞 Resources & Tools

### Development
- **Clerk**: https://clerk.com/ (Authentication)
- **Upstash**: https://upstash.com/ (Rate limiting)
- **Vercel**: https://vercel.com/ (Deployment)

### Testing
- **Axe DevTools**: https://www.deque.com/axe/devtools/
- **WAVE**: https://wave.webaim.org/extension/
- **Lighthouse**: Built into Chrome
- **NVDA**: https://www.nvaccess.org/

### PWA
- **PWA Builder**: https://www.pwabuilder.com/
- **Maskable App**: https://maskable.app/

### Security
- **OWASP**: https://owasp.org/
- **Web.dev Security**: https://web.dev/secure/

---

**Last Updated**: 2025-01-16
**Purpose**: Ensure consistent quality across all projects
**Status**: Complete - ready for use in all future projects

---

## 🔄 Version History

- **v1.0** (2025-01-16): Initial comprehensive patterns document
  - PWA implementation
  - Accessibility (WCAG 2.1 AA)
  - Security (6-layer)
  - App store preparation
  - Code quality workflows
  - Performance optimization
  - Testing strategies
  - Documentation structure
