# Performance Optimization Action Plan

**Date**: 2025-01-17
**Current Performance Score**: 51% (dev server)
**Target**: 90%+
**Status**: Action plan ready for implementation

---

## 📊 Current Performance Issues

### Identified by Lighthouse:

| Issue | Savings | Priority | Impact |
|-------|---------|----------|--------|
| **Unused JavaScript** | 510 KiB | 🔴 CRITICAL | High |
| **Unused CSS** | 10 KiB | 🟡 Medium | Low |
| **Slow LCP** | 10.0s → 2.5s | 🔴 CRITICAL | High |
| **High TBT** | 530ms → 200ms | 🔴 CRITICAL | High |
| **Slow FCP** | 4.0s → 1.8s | 🔴 CRITICAL | High |

### Root Causes:

1. **Development Server Overhead**
   - Turbopack adds significant overhead
   - No optimization applied
   - Expected 20-30% improvement in production

2. **Large JavaScript Bundles**
   - 510 KiB unused JavaScript detected
   - No code splitting implemented
   - Heavy pages: `/parts` (37.4 kB)

3. **No Lazy Loading**
   - All components loaded upfront
   - Heavy components block initial render
   - Below-the-fold content loads immediately

---

## 🎯 Optimization Strategy

### Phase 1: Production Build (30 minutes)
**Goal**: Establish baseline production performance

**Tasks**:
1. Clean build directory
2. Run production build successfully
3. Start production server
4. Run Lighthouse on production build
5. Compare dev vs prod scores

**Expected Improvement**: 51% → 70-80%

**Commands**:
```bash
# Clean and build
rm -rf .next
npm run build

# Start production server
npm start

# Run Lighthouse
npx lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-prod-report.json
```

---

### Phase 2: Code Splitting (1-2 hours)
**Goal**: Reduce initial bundle size by 40%+

#### 2.1 Route-Based Code Splitting ✅
**Status**: Already implemented (Next.js default)
- Each page is a separate chunk
- Automatic code splitting by route

#### 2.2 Component-Level Code Splitting
**Target Pages**:

**1. `/parts` Page (37.4 kB - PRIORITY)**
```tsx
// Before: Direct import
import PartsInterchange from "@/components/parts-interchange"

// After: Dynamic import with loading state
const PartsInterchange = dynamic(
  () => import('@/components/parts-interchange'),
  { loading: () => <div>Loading...</div> }
)
```

**Heavy Components to Split**:
- `PartsInterchange` (parts page)
- `AutomotiveWebSearch` (search page)
- `ExternalPartsSearch` (search page)
- `MechanicsVideoPlayer` (home page)
- `PinterestReferenceSection` (home page)

**Implementation**:
```tsx
import dynamic from 'next/dynamic'

// Lazy load heavy components
const HeavyComponent = dynamic(
  () => import('@/components/heavy-component'),
  {
    loading: () => <ComponentSkeleton />,
    ssr: false // Optional: disable SSR if not needed
  }
)
```

**Expected Savings**: 200-300 KiB reduction

---

#### 2.3 Third-Party Library Optimization

**Large Libraries to Review**:
1. `lucide-react` - Consider importing specific icons
2. `@clerk/nextjs` - Already optimized
3. Chart libraries (if any)
4. Date libraries (if any)

**Before**:
```tsx
import * as Icons from 'lucide-react'
```

**After**:
```tsx
import { Search, Car, Wrench } from 'lucide-react'
```

**Expected Savings**: 50-100 KiB

---

### Phase 3: Lazy Loading (30 minutes)
**Goal**: Defer below-the-fold content

**Strategy**: Load content as user scrolls

**Implementation**:
```tsx
'use client'
import { useEffect, useState } from 'react'

export function LazySection({ children }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    })

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return isVisible ? children : <Skeleton />
}
```

**Pages to Optimize**:
- Home page: Video player section
- Home page: Pinterest reference section
- Parts page: Tabs (maintenance, diagnostics)
- Search page: Web search tab

**Expected Improvement**: FCP 4.0s → 2.5s

---

### Phase 4: Image Optimization (15 minutes)
**Status**: Mostly optimized ✅

**Verify**:
- ✅ All images use Next.js `<Image />` component
- ✅ Proper `priority` flag on hero images
- ✅ Correct `sizes` attribute for responsive images

**Additional Optimization**:
```tsx
<Image
  src="/images/banner.png"
  alt="Banner"
  width={1200}
  height={400}
  sizes="(max-width: 768px) 100vw, 1200px"
  priority={isAboveFold}
  quality={85} // Slightly reduce for smaller files
/>
```

**Expected Savings**: 10-20 KiB

---

### Phase 5: CSS Optimization (15 minutes)
**Goal**: Remove unused Tailwind CSS

**Current Issue**: 10 KiB unused CSS detected

**Solution**: Verify Tailwind purge configuration

**Check `tailwind.config.ts`**:
```ts
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // ... rest of config
}
```

**Expected Savings**: 10 KiB

---

### Phase 6: Bundle Analysis (15 minutes)
**Goal**: Identify optimization opportunities

**Install Bundle Analyzer**:
```bash
npm install --save-dev @next/bundle-analyzer
```

**Configure `next.config.js`**:
```js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // ... existing config
})
```

**Run Analysis**:
```bash
ANALYZE=true npm run build
```

**Review**:
- Identify largest chunks
- Find duplicate dependencies
- Spot optimization opportunities

---

## 🚀 Quick Wins (30 minutes total)

### 1. Enable Compression (5 minutes)
Next.js automatically compresses with gzip/brotli in production ✅

### 2. Preload Critical Resources (10 minutes)
```tsx
// src/app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link
          rel="preload"
          href="/fonts/inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### 3. Add Loading States (15 minutes)
```tsx
// src/app/loading.tsx
export default function Loading() {
  return <div>Loading...</div>
}
```

---

## 📈 Expected Score Improvements

| Optimization | Current | After | Improvement |
|--------------|---------|-------|-------------|
| **Production Build** | 51% | 70-75% | +20-25% |
| **+ Code Splitting** | 70-75% | 80-85% | +10% |
| **+ Lazy Loading** | 80-85% | 85-90% | +5% |
| **+ Image/CSS Opt** | 85-90% | 90-95% | +5% |
| **TARGET** | 51% | **90%+** | **+40%** |

---

## ⏱️ Time Estimates

| Phase | Task | Time | Priority |
|-------|------|------|----------|
| 1 | Production build test | 30 min | 🔴 Critical |
| 2 | Code splitting (/parts) | 1 hr | 🔴 Critical |
| 3 | Lazy loading (home) | 30 min | 🟡 High |
| 4 | Image optimization | 15 min | 🟢 Medium |
| 5 | CSS optimization | 15 min | 🟢 Medium |
| 6 | Bundle analysis | 15 min | 🟢 Medium |
| **TOTAL** | | **2h 45min** | |

---

## 🎯 Implementation Order

### Day 1 (Critical):
1. ✅ Production build test (30 min)
2. ✅ Code split `/parts` page (1 hr)
3. ✅ Run Lighthouse - verify 80%+ (15 min)

### Day 2 (High Priority):
4. Lazy load home page sections (30 min)
5. Optimize remaining heavy components (30 min)
6. Run final Lighthouse - target 90%+ (15 min)

### Day 3 (Polish):
7. Bundle analysis and fine-tuning (30 min)
8. Image/CSS optimization (30 min)
9. Final verification (15 min)

---

## 📝 Specific File Changes

### 1. `/parts` Page Optimization
**File**: `src/app/parts/page.tsx`

**Before** (Line 12):
```tsx
import PartsInterchange from "@/components/parts-interchange"
```

**After**:
```tsx
import dynamic from 'next/dynamic'

const PartsInterchange = dynamic(
  () => import('@/components/parts-interchange'),
  { loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded"></div> }
)
```

### 2. Home Page Optimization
**File**: `src/app/page.tsx`

**Before** (Lines 8-9):
```tsx
import PinterestReferenceSection from '@/components/pinterest-reference-section'
import MechanicsVideoPlayer from '@/components/mechanics-video-player'
```

**After**:
```tsx
import dynamic from 'next/dynamic'

const PinterestReferenceSection = dynamic(
  () => import('@/components/pinterest-reference-section'),
  { ssr: false }
)

const MechanicsVideoPlayer = dynamic(
  () => import('@/components/mechanics-video-player')
)
```

### 3. Search Page Optimization
**File**: `src/app/search/page.tsx`

**Before** (Lines 7-8):
```tsx
import { AutomotiveWebSearch } from '@/components/automotive-web-search'
import { ExternalPartsSearch } from '@/components/external-parts-search'
```

**After**:
```tsx
import dynamic from 'next/dynamic'

const AutomotiveWebSearch = dynamic(
  () => import('@/components/automotive-web-search').then(mod => ({ default: mod.AutomotiveWebSearch })),
  { ssr: false }
)

const ExternalPartsSearch = dynamic(
  () => import('@/components/external-parts-search').then(mod => ({ default: mod.ExternalPartsSearch })),
  { ssr: false }
)
```

---

## ✅ Success Criteria

**Before Optimization**:
- Performance: 51%
- LCP: 10.0s
- FCP: 4.0s
- TBT: 530ms

**Target After Optimization**:
- Performance: **90%+** ✅
- LCP: **< 2.5s** ✅
- FCP: **< 1.8s** ✅
- TBT: **< 200ms** ✅

**App Store Ready**: All scores 90%+ on production build

---

## 📚 Resources

- [Next.js Dynamic Imports](https://nextjs.org/docs/advanced-features/dynamic-import)
- [Next.js Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- [Web.dev Performance](https://web.dev/performance)
- [Lighthouse Performance Scoring](https://web.dev/performance-scoring/)

---

**Created**: 2025-01-17
**Status**: Ready for implementation
**Estimated Completion**: 2-3 hours
**Expected Result**: 90%+ performance score
