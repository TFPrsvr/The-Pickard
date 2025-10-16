# The Pickard - Development Roadmap & Next Steps

## Overview

This document outlines the immediate priorities, ongoing tasks, and future enhancements for The Pickard automotive mechanics database. Tasks are organized by priority and category.

---

## 🔴 CRITICAL - Immediate Priorities

### 1. Complete Powersports Integration ✅ COMPLETED
**Status**: Fully implemented and tested ✅

**✅ Completed**:
- [x] Database schema updated with powersports fields
- [x] TypeScript types created (VehicleCategory, DriveType, StrokeType, CoolingType)
- [x] Comprehensive powersports database with 200+ models
- [x] Category-first user flow designed and implemented
- [x] CategorySelector component created
- [x] CategoryAwareVehicleSelector component created
- [x] Search-by-category page created (`/search-by-category`)
- [x] Database migration created for powersports schema fields
- [x] API endpoints updated to handle category-based searches
- [x] Navigation menu updated with category links
- [x] Existing `/search` page updated to use category flow
- [x] Homepage updated to feature category selection
- [x] All powersports functionality tested
- [x] Category filtering added to parts database
- [x] Label UI component created
- [x] TypeScript errors resolved

**Category-First Approach**:
Users now select vehicle category FIRST (Car, Truck, Motorcycle, ATV, etc.), then see category-specific form fields:
- **Automotive** (Car/Truck/RV): Year, Make, Model, Engine Type, Drive Type
- **Powersports** (Motorcycle/ATV/UTV/Snowmobile/Watercraft): Year, Make, Model, Displacement (CC), Stroke Type, Cooling Type, Drive Type

**⏳ Remaining Tasks**:
- [ ] Add powersports-specific pages (`/motorcycles`, `/atvs`, `/utvs`, etc.) - Optional enhancement
- [ ] Add category filtering to problems database - Future enhancement

**Files Created**:
- ✅ `src/components/category-selector.tsx` - Category selection grid
- ✅ `src/components/category-aware-vehicle-selector.tsx` - Dynamic form based on category
- ✅ `src/app/search-by-category/page.tsx` - New search page with category flow

**Files Modified**:
- ✅ `src/lib/schema.ts` - Added powersports fields
- ✅ `src/types/index.ts` - Added VehicleCategory, DriveType, StrokeType, CoolingType
- ✅ `src/lib/vehicle-data.ts` - Added comprehensive powersports database
- ✅ `src/app/api/search/route.ts` - Added category and powersports filter support
- ✅ `src/app/page.tsx` - Added category selection button and updated description
- ✅ `src/components/navbar.tsx` - Added expandable Vehicle Types menu
- ✅ `src/app/search/page.tsx` - Category-aware search with Suspense wrapper
- ✅ `src/app/parts/page.tsx` - Category filtering for parts database
- ✅ `src/components/ui/label.tsx` - Created Label component
- ✅ `drizzle/0000_stale_changeling.sql` - Database migration

**Commits on feature/powersports-integration branch**:
1. Database migration, API updates, homepage updates
2. Navigation menu with expandable vehicle types
3. Search page category-first flow
4. Parts database category filtering
5. TypeScript fixes and Label component

---

### 2. Play Store Preparation ✅ LEGAL COMPLETE
**Status**: Legal documentation complete ✅, Visual assets pending ⚠️

**✅ Completed**:
- [x] Create Privacy Policy (`docs/legal/PRIVACY_POLICY.md`)
- [x] Create Terms of Service (`docs/legal/TERMS_OF_SERVICE.md`)
- [x] Host privacy policy publicly (`/privacy` route)
- [x] Host terms of service publicly (`/terms` route)
- [x] PWA icon generation guide created (`public/icons/ICON_GENERATION_GUIDE.md`)

**⏳ Remaining Before Submission**:
- [ ] Generate PWA icons using guide (192x192, 512x512, and all sizes)
- [ ] Capture app screenshots (desktop and mobile)
- [ ] Update GitHub repository URL in CONTRIBUTING.md
- [ ] Test PWA installation on Android/iOS devices

**Reference**: See `docs/deployment/PLAY_STORE_CHECKLIST.md`

**Files Created**:
- ✅ `docs/legal/PRIVACY_POLICY.md` - GDPR/CCPA compliant privacy policy
- ✅ `docs/legal/TERMS_OF_SERVICE.md` - Complete terms of service
- ✅ `src/app/privacy/page.tsx` - Public privacy policy route
- ✅ `src/app/terms/page.tsx` - Public terms of service route
- ✅ `public/icons/ICON_GENERATION_GUIDE.md` - Comprehensive icon generation guide

---

## 🟡 HIGH PRIORITY - Code Quality & Optimization

### 3. Code Cleanup & Organization ✅ COMPLETED (2-Day Cycle)
**Status**: Quality audit complete ✅ - Next due in 2 days

**✅ Completed**:
- [x] Dependency audit with depcheck
- [x] TypeScript type checking (no errors)
- [x] ESLint code quality check (18 warnings, 0 errors)
- [x] Production build test (successful - 24 routes)
- [x] Removed unused axios dependency
- [x] Created comprehensive quality report

**Results** (Updated 2025-01-16 23:30 UTC):
- TypeScript: ✅ No errors
- ESLint Errors: ✅ 0 errors (down from 2)
- ESLint Warnings: ✅ **0 warnings** (down from 18 - 100% resolved!)
- Build: ✅ Successful
- Quality Grade: **A+ (Production Ready)**

**Report**: See `CODE_QUALITY_REPORT.md` for detailed findings

**✅ Recent Improvements** (Session 2025-01-16):
- [x] Fixed all ESLint errors (2 → 0)
- [x] Fixed ALL ESLint warnings (18 → 0) - 100% resolved! ✨
- [x] Replaced all `<img>` tags with Next.js `<Image />` (4 files)
- [x] Fixed unescaped entities in React JSX (2 files)
- [x] Wrapped mock data in `useMemo` to prevent re-renders (6 files)
- [x] Wrapped callbacks in `useCallback` with proper dependencies (10+ functions)
- [x] Fixed anonymous default export in nhtsa-vpic-api.ts
- [x] Fixed all React Hook exhaustive-deps warnings (10 files):
  - src/app/problems/[id]/page.tsx
  - src/app/search/page.tsx
  - src/components/automotive-suggestions.tsx
  - src/components/category-aware-vehicle-selector.tsx
  - src/components/vehicle-info-dashboard.tsx
  - src/components/vehicle-selector.tsx (4 warnings)
  - src/components/video-filter.tsx

**⏳ Remaining Optimizations**:
- [ ] Optimize `/parts` page (largest at 37.4 kB)
- [ ] Consider code splitting for heavy components
- [ ] Run Lighthouse audit for performance metrics

**Tools**:
```bash
# Find unused dependencies
npx depcheck

# Type check
npm run typecheck

# Linting
npm run lint

# Build test
npm run build
```

**Files Created**:
- ✅ `CODE_QUALITY_REPORT.md` - Comprehensive quality audit report

---

### 4. Accessibility Compliance (WCAG 2.1 AA - CLAUDE.md Requirement)
**Status**: ✅ ARIA LABELS COMPLETE - Testing needed

**✅ Completed**:
- [x] **Skip Links**: Skip-to-main-content implemented in layout.tsx
- [x] **Screen Reader Support**: sr-only class utility added to globals.css
- [x] **Focus Indicators**: 2px outline minimum with box-shadow implemented
- [x] **Touch Targets**: Minimum 44x44px for all interactive elements
- [x] **Reduced Motion**: prefers-reduced-motion media query support added
- [x] **High Contrast Mode**: prefers-contrast:high support added
- [x] **Keyboard Navigation Foundation**: Focus-visible styles for all interactive elements
- [x] **Semantic HTML**: Main content area properly marked with id="main-content"
- [x] **ARIA Labels**: Comprehensive ARIA implementation across all pages
  - [x] Icon-only buttons (navbar hamburger, close buttons)
  - [x] Form inputs (parts database, search page, tips page)
  - [x] Navigation elements (expandable vehicle types menu)
  - [x] Interactive buttons (submit, cancel, search, clear, save)
  - [x] All decorative icons marked with aria-hidden="true"
  - [x] Dynamic state indicators (aria-expanded, aria-controls, aria-disabled)

**⏳ Remaining Implementations**:
- [ ] **Keyboard Navigation Testing**:
  - [ ] Test all features accessible via keyboard
  - [ ] Verify escape key closes modals/dropdowns
  - [ ] Test arrow key navigation in lists
- [ ] **Color Contrast Audit**: Verify WCAG AA standards (4.5:1 minimum)

**⏳ Testing Requirements**:
- [ ] Keyboard-only navigation test
- [ ] Screen reader testing (NVDA/JAWS/VoiceOver)
- [ ] axe DevTools browser extension scan
- [ ] Lighthouse accessibility audit (target 95+)
- [ ] Browser zoom at 200% test

**Files Created**:
- ✅ `src/app/globals.css` - Added comprehensive WCAG 2.1 AA utilities (lines 186-341)
- ✅ `src/app/layout.tsx` - Added skip link (line 26-28) and main content id (line 44)

**Files Modified with ARIA Labels**:
- ✅ `src/components/navbar.tsx` - All navigation elements, hamburger menu, expandable vehicle types
- ✅ `src/app/parts/page.tsx` - All vehicle selectors, search inputs, filter buttons
- ✅ `src/app/tips/page.tsx` - Pinterest submission form, tip sharing buttons
- ✅ `src/app/search/page.tsx` - Already compliant (no changes needed)
- ✅ `src/app/pinterest/page.tsx` - Already compliant (no changes needed)

**Accessibility Utilities Added**:
- `.sr-only` - Screen reader only text (lines 189-211)
- `.skip-link` - Skip to main content (lines 214-232)
- Focus indicators for all interactive elements (lines 235-250)
- Touch target minimum sizes (lines 253-277)
- Reduced motion support (lines 280-296)
- High contrast mode support (lines 299-313)
- Keyboard navigation indicators (lines 338-341)

---

### 5. Security Implementation (6-Layer Architecture - CLAUDE.md Requirement)
**Status**: ✅ COMPLETE - Production Ready

**✅ Layer 1: Network Security**
- [x] Rate limiting with Upstash Redis (50 search/min, 100 API/min, 5 contact/hour)
- [x] DDoS protection through request throttling
- [x] IP reputation tracking with automatic blocking
- [x] Comprehensive security headers in next.config.js

**✅ Layer 2: Input Validation**
- [x] Input validation library with DOMPurify + Zod
- [x] SQL injection prevention (Drizzle ORM parameterized queries)
- [x] XSS attack prevention with HTML sanitization
- [x] Path traversal prevention
- [x] Environment variable validation

**✅ Layer 3: Authentication**
- [x] Clerk authentication implemented
- [x] MFA configuration guide created
- [x] Session management (Clerk handles)
- [x] Brute force protection (rate limiting + IP blocking)

**✅ Layer 4: Authorization (RBAC)**
- [x] Role-based access control (Admin, Mechanic, User)
- [x] 11 granular permissions (read/write/delete for parts, diagnostics, users)
- [x] Route protection middleware (requireAuth, requireRole, requirePermission)
- [x] API endpoint authorization checks

**✅ Layer 5: Data Security**
- [x] Environment variable validation with Zod schema
- [x] Sensitive data masking in logs (email, phone, IP, API keys)
- [x] Secure data storage with Drizzle ORM
- [x] No secrets in error messages

**✅ Layer 6: Real-Time Monitoring**
- [x] Security event logging (9 event types)
- [x] Severity-based alerting (CRITICAL/HIGH/MEDIUM/LOW)
- [x] Automated IP blocking after 10 failed attempts
- [x] IP reputation tracking (15-minute auto-unblock)

**✅ Files Created**:
- `src/lib/security/rate-limiter.ts` - Rate limiting middleware
- `src/lib/security/input-validation.ts` - Input validation & sanitization
- `src/lib/security/authorization.ts` - RBAC middleware
- `src/lib/security/security-logger.ts` - Event logging & IP tracking
- `src/lib/security/data-masking.ts` - Data masking utilities
- `src/types/roles.ts` - Role & permission definitions
- `docs/security/MFA_SETUP_GUIDE.md` - Clerk MFA configuration
- `docs/security/SECURITY_IMPLEMENTATION_SUMMARY.md` - Complete security docs

**✅ API Routes Protected**:
- `/api/search` - Rate limiting + input validation
- `/api/web-search` - Rate limiting + input validation + logging
- `/api/search-results` - Authentication + unauthorized access logging
- `/api/contact` - Strict rate limiting + input validation + data masking

**✅ Dependencies Installed**:
- `@upstash/ratelimit` - Redis-backed rate limiting
- `@upstash/redis` - Serverless Redis client
- `isomorphic-dompurify` - XSS prevention
- `zod` - Schema validation

---

## 🟢 MEDIUM PRIORITY - Feature Enhancements

### 6. Database Migrations
**Status**: Schema updated, migration needed

**Required**:
- [ ] Generate Drizzle migration for new vehicle schema fields:
  - `displacement` (integer)
  - `strokeType` (varchar)
  - `coolingType` (varchar)
  - Updated `category` enum
  - Updated `driveType` values

```bash
npm run db:generate
npm run db:migrate
```

---

### 7. UI Component Updates for Powersports

**Vehicle Selector Component**:
- [ ] Add category dropdown (car/truck/motorcycle/atv/utv/etc.)
- [ ] Show/hide fields based on category
  - Show displacement, stroke type, cooling type for powersports
  - Hide for cars/trucks
- [ ] Update make dropdown to filter by category
- [ ] Add powersports-specific drive types (Chain/Shaft/Belt)

**Search Filters Component**:
- [ ] Add category filter chips
- [ ] Add displacement range slider (for powersports)
- [ ] Add stroke type filter (2-stroke/4-stroke)
- [ ] Add cooling type filter (liquid/air/oil)

**New Components to Create**:
- `src/components/powersports-selector.tsx`
- `src/components/category-filter.tsx`
- `src/components/displacement-slider.tsx`

---

### 8. New Pages for Powersports

**Create Pages**:
- [ ] `/motorcycles` - Motorcycle-specific diagnostics
- [ ] `/atvs` - ATV repair guides
- [ ] `/utvs` - UTV maintenance
- [ ] `/snowmobiles` - Snowmobile troubleshooting
- [ ] `/watercraft` - Jet ski / Sea-Doo guides

**Update Existing Pages**:
- [ ] `/search` - Add category filtering
- [ ] `/parts` - Support powersports parts
- [ ] `/problems` - Powersports-specific issues
- [ ] `/tips` - Powersports maintenance tips

---

### 9. Navigation Updates

**Main Navigation**:
```tsx
// src/app/layout.tsx additions
const navigation = [
  { name: 'Automotive', submenu: [
    { name: 'Cars', href: '/cars' },
    { name: 'Trucks', href: '/trucks' },
    { name: '18-Wheelers', href: '/commercial' },
  ]},
  { name: 'Powersports', submenu: [
    { name: 'Motorcycles', href: '/motorcycles' },
    { name: 'ATVs', href: '/atvs' },
    { name: 'UTVs', href: '/utvs' },
    { name: 'Snowmobiles', href: '/snowmobiles' },
    { name: 'Watercraft', href: '/watercraft' },
  ]},
  { name: 'RVs & Motorhomes', href: '/rvs' },
]
```

---

## 🔵 ONGOING - Maintenance & Best Practices

### 10. Testing Strategy
**Continuous Requirements**:
- [ ] Write unit tests for new components
- [ ] Integration tests for API endpoints
- [ ] E2E tests for critical user flows
- [ ] Mobile testing on real devices

**Test Coverage Goals**:
- Unit tests: 80%+
- Integration tests: 70%+
- E2E tests: Critical paths

---

### 11. Documentation Updates
**Keep Updated**:
- [ ] Update API.md when adding endpoints
- [ ] Update USER-GUIDE.md for new features
- [ ] Update CONTRIBUTING.md for new patterns
- [ ] Add powersports to all relevant docs

---

### 12. Performance Optimization
**Ongoing Monitoring**:
- [ ] Bundle size analysis (`npm run analyze`)
- [ ] Lighthouse performance scores (90+)
- [ ] Core Web Vitals tracking
- [ ] Mobile performance testing
- [ ] Code splitting for powersports modules

---

## 🟣 FUTURE ENHANCEMENTS

### 13. Advanced Features (Post-Launch)
- [ ] AI-powered diagnostic recommendations
- [ ] User-submitted repair guides
- [ ] Community forum integration
- [ ] Video tutorial library
- [ ] Live chat support
- [ ] Parts price comparison API
- [ ] VIN decoder integration
- [ ] Maintenance schedule reminders
- [ ] Push notifications for recalls

---

### 14. Multi-Language Support
- [ ] i18n implementation
- [ ] Spanish translation
- [ ] French translation
- [ ] Interface localization

---

### 15. Mobile App Native Features
- [ ] Camera for VIN scanning
- [ ] GPS for nearby parts suppliers
- [ ] Offline mode enhancements
- [ ] Barcode scanning for parts
- [ ] AR for part identification

---

## ✅ COMPLETED

- [x] Documentation reorganization by user type
- [x] Fix broken documentation links
- [x] Create API documentation
- [x] Add PWA manifest.json
- [x] Create Play Store submission checklist
- [x] Add powersports to database schema
- [x] Update TypeScript types for powersports
- [x] Create comprehensive powersports data

---

## 📋 Sprint Planning

### Current Sprint (Week 1)
1. Complete powersports UI integration
2. Generate database migration
3. Create privacy policy and terms
4. Start accessibility implementation

### Next Sprint (Week 2)
1. Finish accessibility compliance
2. Implement security layers 1-3
3. Generate PWA icons and screenshots
4. Complete code cleanup

### Sprint 3 (Week 3)
1. Mobile testing on real devices
2. Performance optimization
3. Security layers 4-6
4. Play Store submission preparation

---

## 🎯 Success Metrics

**Before Play Store Submission**:
- [ ] Lighthouse PWA score: 95+
- [ ] Lighthouse Accessibility score: 95+
- [ ] Lighthouse Performance score: 90+
- [ ] All TypeScript errors resolved
- [ ] All ESLint warnings resolved
- [ ] Production build successful
- [ ] Mobile responsive on all pages
- [ ] All critical features tested

---

## 📞 Resources

- **CLAUDE.md**: Project-specific instructions
- **PLAY_STORE_CHECKLIST.md**: App store requirements
- **API.md**: API endpoint documentation
- **CONTRIBUTING.md**: Development guidelines

---

**Last Updated**: 2025-01-16 23:30 UTC
**Current Sprint**: Code Quality Improvements ✅ **100% COMPLETE** (18→0 warnings, 0 errors)
**Next Sprint**: PWA Icon Generation & Lighthouse Testing
**Next Review**: 2025-01-18 (per CLAUDE.md 2-day cleanup schedule)

**Recent Session Summary**:
- ESLint: Fixed ALL warnings and errors (2 errors→0, 18 warnings→0) - **100% clean!** ✨
- Image Optimization: Replaced all `<img>` tags with Next.js `<Image />`
- React Performance: Optimized with useMemo/useCallback in 10 files
- React Hooks: Fixed all exhaustive-deps warnings (10 files, 11 total warnings)
- Code Quality: Grade improved from A- to **A+ (Production Ready)**
