# Parts Page Optimization Guide

## Overview

The `/parts` page is currently the **largest route** at 37.4 kB (identified in `CODE_QUALITY_REPORT.md`). This guide provides strategies to optimize bundle size, improve load times, and enhance performance.

---

## 📊 Current State

**From Lighthouse Build Analysis**:
- **Route**: `/parts`
- **Size**: 37.4 kB
- **First Load JS**: 180 kB
- **Status**: ⚠️ Largest page in the application

**Target**:
- **Bundle Size**: < 25 kB (reduce by 33%)
- **First Load JS**: < 150 kB (reduce by 17%)
- **Performance Score**: 90+

---

## 🎯 Optimization Strategies

### 1. Code Splitting & Lazy Loading

**Problem**: All components load immediately, even if not visible

**Solution**: Lazy load components that aren't immediately needed

**Implementation**:

**Before** (`src/app/parts/page.tsx`):
```typescript
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// ... 20+ imports
```

**After** (lazy loaded):
```typescript
'use client';

import { Suspense, lazy } from 'react';
import dynamic from 'next/dynamic';

// Critical components (load immediately)
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Non-critical components (lazy load)
const VehicleSelector = dynamic(() => import('@/components/vehicle-selector'), {
  loading: () => <div className="h-32 bg-gray-100 animate-pulse rounded-md" />,
  ssr: false, // Client-side only if needed
});

const PartsResults = dynamic(() => import('@/components/parts-results'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-md" />,
});

const AdvancedFilters = dynamic(() => import('@/components/advanced-filters'), {
  loading: () => <div className="h-20 bg-gray-100 animate-pulse rounded-md" />,
});

export default function PartsPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Parts Database</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading...</div>}>
            <VehicleSelector />
          </Suspense>

          <Suspense fallback={<div>Loading filters...</div>}>
            <AdvancedFilters />
          </Suspense>

          <Suspense fallback={<div>Loading results...</div>}>
            <PartsResults />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
```

**Expected Impact**: Reduce initial bundle by ~10-15 kB

---

### 2. Extract Large Components

**Problem**: All parts logic is in one large page component

**Solution**: Extract into smaller, focused components

**Create** (`src/components/parts/VehiclePartsSelector.tsx`):
```typescript
'use client';

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function VehiclePartsSelector() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  return (
    <div className="space-y-4">
      {/* Vehicle selection logic */}
    </div>
  );
}
```

**Create** (`src/components/parts/PartsSearchResults.tsx`):
```typescript
'use client';

import { useMemo } from 'react';

export function PartsSearchResults({ parts }: { parts: any[] }) {
  const filteredParts = useMemo(() => {
    // Expensive filtering logic
    return parts.filter(/* ... */);
  }, [parts]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredParts.map((part) => (
        <PartCard key={part.id} part={part} />
      ))}
    </div>
  );
}
```

**Create** (`src/components/parts/PartCard.tsx`):
```typescript
import { memo } from 'react';

export const PartCard = memo(function PartCard({ part }: { part: any }) {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold">{part.name}</h3>
      <p className="text-sm text-gray-600">{part.description}</p>
      <p className="text-lg font-bold">${part.price}</p>
    </div>
  );
});
```

**Expected Impact**: Better tree shaking, easier code splitting

---

### 3. Optimize Images

**Problem**: Using `<img>` instead of Next.js `<Image />`

**ESLint Warning** (from CODE_QUALITY_REPORT.md):
```
src/app/parts/page.tsx:220 - Using <img> instead of <Image />
```

**Solution**: Replace with optimized `<Image />` component

**Before**:
```typescript
<img src="/images/part-placeholder.png" alt="Part" />
```

**After**:
```typescript
import Image from 'next/image';

<Image
  src="/images/part-placeholder.png"
  alt="Part"
  width={300}
  height={200}
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
/>
```

**Expected Impact**:
- Automatic image optimization
- Lazy loading by default
- Better LCP (Largest Contentful Paint)

---

### 4. Implement Virtual Scrolling

**Problem**: Rendering 1000+ parts at once causes performance issues

**Solution**: Use virtual scrolling to render only visible items

**Install**:
```bash
npm install react-window
```

**Implementation** (`src/components/parts/VirtualizedPartsList.tsx`):
```typescript
'use client';

import { FixedSizeList as List } from 'react-window';

interface Part {
  id: string;
  name: string;
  price: number;
}

interface VirtualizedPartsListProps {
  parts: Part[];
}

export function VirtualizedPartsList({ parts }: VirtualizedPartsListProps) {
  const Row = ({ index, style }: any) => {
    const part = parts[index];

    return (
      <div style={style} className="p-4 border-b">
        <h3 className="font-semibold">{part.name}</h3>
        <p className="text-lg font-bold">${part.price}</p>
      </div>
    );
  };

  return (
    <List
      height={600}
      itemCount={parts.length}
      itemSize={80}
      width="100%"
    >
      {Row}
    </List>
  );
}
```

**Expected Impact**:
- Only render visible items (~10-20 instead of 1000+)
- Massive performance improvement with large datasets
- Faster initial render

---

### 5. Memoization & Performance Hooks

**Problem**: Unnecessary re-renders and expensive calculations

**Solution**: Use React performance hooks

**useMemo for Expensive Calculations**:
```typescript
'use client';

import { useMemo } from 'react';

export function PartsPage() {
  const [filters, setFilters] = useState({});
  const [parts, setParts] = useState([]);

  // Memoize expensive filtering
  const filteredParts = useMemo(() => {
    console.log('Filtering parts...');
    return parts.filter(part => {
      // Complex filtering logic
      return matchesFilters(part, filters);
    });
  }, [parts, filters]); // Only recalculate when these change

  return <div>{/* ... */}</div>;
}
```

**useCallback for Event Handlers**:
```typescript
import { useCallback } from 'react';

export function PartsPage() {
  const handleSearch = useCallback((query: string) => {
    // Search logic
  }, []); // Stable function reference

  return <SearchBar onSearch={handleSearch} />;
}
```

**React.memo for Components**:
```typescript
import { memo } from 'react';

export const PartCard = memo(function PartCard({ part }: { part: Part }) {
  console.log('Rendering PartCard:', part.id);
  return <div>{part.name}</div>;
}); // Only re-renders if part prop changes
```

**Expected Impact**:
- Reduce unnecessary re-renders
- Faster updates and interactions

---

### 6. API Response Optimization

**Problem**: Fetching all part data at once

**Solution**: Implement pagination and incremental loading

**Before**:
```typescript
// Fetches all 10,000 parts
const parts = await fetch('/api/parts').then(res => res.json());
```

**After**:
```typescript
// Fetch 50 parts at a time
const [page, setPage] = useState(1);
const PARTS_PER_PAGE = 50;

const { data: parts, isLoading } = useSWR(
  `/api/parts?page=${page}&limit=${PARTS_PER_PAGE}`,
  fetcher
);

// Infinite scroll implementation
const loadMore = () => setPage(prev => prev + 1);
```

**API Route** (`src/app/api/parts/route.ts`):
```typescript
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '50');
  const offset = (page - 1) * limit;

  const parts = await db
    .select()
    .from(partsTable)
    .limit(limit)
    .offset(offset);

  return Response.json({
    parts,
    page,
    hasMore: parts.length === limit,
  });
}
```

**Expected Impact**:
- 95% smaller initial API response
- Faster page load
- Better perceived performance

---

### 7. Bundle Analysis & Tree Shaking

**Install Bundle Analyzer**:
```bash
npm install --save-dev @next/bundle-analyzer
```

**Configure** (`next.config.js`):
```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // ... your existing config
});
```

**Run Analysis**:
```bash
ANALYZE=true npm run build
```

**Analyze Output**:
1. Open `http://localhost:3000` after build
2. View interactive treemap of bundle
3. Identify large dependencies:
   - Lucide icons (use specific imports)
   - UI libraries (import only needed components)
   - Utilities (ensure tree-shaking works)

**Optimize Imports**:

**Before**:
```typescript
import * as Icons from 'lucide-react'; // Imports entire library
```

**After**:
```typescript
import { Search, Filter, ChevronDown } from 'lucide-react'; // Only needed icons
```

**Expected Impact**:
- Remove unused code from bundle
- 10-20% bundle size reduction

---

### 8. Font Optimization

**Problem**: Custom fonts blocking render

**Solution**: Use Next.js font optimization

**Before**:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**After** (`src/app/layout.tsx`):
```typescript
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      {children}
    </html>
  );
}
```

**Expected Impact**:
- Fonts self-hosted
- No layout shift (CLS)
- Faster font loading

---

### 9. Reduce Client-Side JavaScript

**Problem**: Too much client-side logic

**Solution**: Move data fetching to Server Components

**Before** (Client Component):
```typescript
'use client';

import { useEffect, useState } from 'react';

export default function PartsPage() {
  const [parts, setParts] = useState([]);

  useEffect(() => {
    fetch('/api/parts')
      .then(res => res.json())
      .then(setParts);
  }, []);

  return <div>{/* ... */}</div>;
}
```

**After** (Server Component):
```typescript
// No 'use client' directive = Server Component

import { db } from '@/lib/db';

export default async function PartsPage() {
  // Fetch on server
  const parts = await db.select().from(partsTable).limit(50);

  return (
    <div>
      <PartsClientComponent initialParts={parts} />
    </div>
  );
}
```

**Client Component** (`src/components/parts-client.tsx`):
```typescript
'use client';

export function PartsClientComponent({ initialParts }: { initialParts: any[] }) {
  const [parts, setParts] = useState(initialParts); // Hydrate with server data

  // Client-only interactivity
  return <div>{/* ... */}</div>;
}
```

**Expected Impact**:
- Less JavaScript shipped to client
- Faster initial page load
- Better SEO

---

### 10. Caching Strategy

**Implement SWR for Client-Side Caching**:
```bash
npm install swr
```

**Setup** (`src/app/parts/page.tsx`):
```typescript
'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function PartsPage() {
  const { data: parts, error, isLoading } = useSWR('/api/parts', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 60000, // Refresh every minute
    dedupingInterval: 5000, // Dedupe requests within 5 seconds
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading parts</div>;

  return <div>{/* Render parts */}</div>;
}
```

**Expected Impact**:
- Fewer API requests
- Instant navigation (cached data)
- Better offline experience

---

## 📋 Optimization Checklist

### High Priority (Immediate Impact)

- [ ] **Replace `<img>` with `<Image />`** (line 220)
  - Expected: -5 kB, better LCP
  - Effort: 10 minutes

- [ ] **Implement code splitting** (lazy load components)
  - Expected: -10-15 kB
  - Effort: 30 minutes

- [ ] **Fix React Hook dependency warnings** (15 warnings)
  - Expected: Better performance, no re-renders
  - Effort: 20 minutes

- [ ] **Optimize icon imports** (import only used icons)
  - Expected: -3-5 kB
  - Effort: 15 minutes

### Medium Priority (Significant Improvement)

- [ ] **Implement pagination/infinite scroll**
  - Expected: 95% smaller API responses
  - Effort: 1-2 hours

- [ ] **Extract components** (VehicleSelector, PartsResults, Filters)
  - Expected: Better tree-shaking
  - Effort: 1 hour

- [ ] **Add memoization** (useMemo, useCallback, React.memo)
  - Expected: Fewer re-renders
  - Effort: 30-45 minutes

- [ ] **Implement SWR caching**
  - Expected: Faster navigation
  - Effort: 30 minutes

### Low Priority (Nice to Have)

- [ ] **Virtual scrolling** (if >100 parts displayed)
  - Expected: Much faster with large lists
  - Effort: 1 hour

- [ ] **Bundle analysis** (identify large dependencies)
  - Expected: Insights for further optimization
  - Effort: 30 minutes

- [ ] **Server Components** (move data fetching to server)
  - Expected: Less client JS
  - Effort: 2-3 hours

---

## 🎯 Expected Results

### Before Optimization
- Bundle Size: **37.4 kB**
- First Load JS: **180 kB**
- Performance Score: **~85**

### After Optimization
- Bundle Size: **< 25 kB** (33% reduction)
- First Load JS: **< 150 kB** (17% reduction)
- Performance Score: **90+** (6% improvement)

### Lighthouse Metrics
- **FCP (First Contentful Paint)**: < 1.5s (from ~2s)
- **LCP (Largest Contentful Paint)**: < 2.5s (from ~3.5s)
- **TBT (Total Blocking Time)**: < 200ms (from ~400ms)
- **CLS (Cumulative Layout Shift)**: < 0.1 (from ~0.2)

---

## 🔧 Implementation Order

1. **Quick Wins** (1 hour total):
   - Replace `<img>` with `<Image />`
   - Optimize icon imports
   - Fix React Hook warnings

2. **Code Splitting** (30-45 minutes):
   - Lazy load VehicleSelector
   - Lazy load PartsResults
   - Lazy load AdvancedFilters

3. **Performance Hooks** (30-45 minutes):
   - Add useMemo to filtering logic
   - Add useCallback to event handlers
   - Wrap PartCard in React.memo

4. **API Optimization** (1-2 hours):
   - Implement pagination
   - Add infinite scroll
   - Setup SWR caching

5. **Advanced** (2-3 hours - optional):
   - Virtual scrolling
   - Server Components migration
   - Bundle analysis and tree shaking

---

## 📊 Testing Performance

**Before Making Changes**:
```bash
# Run Lighthouse audit
npm run build
npm run start
# Open Chrome DevTools → Lighthouse → Run audit
```

**After Each Optimization**:
```bash
# Re-run audit and compare scores
npm run build
npm run start
# Check:
# - Performance score
# - Bundle size (in build output)
# - FCP, LCP, TBT metrics
```

**Tools**:
- **Lighthouse**: Built into Chrome DevTools
- **Web Vitals**: https://web.dev/vitals/
- **Bundle Analyzer**: `ANALYZE=true npm run build`

---

## 🔗 Resources

- **Next.js Performance**: https://nextjs.org/docs/pages/building-your-application/optimizing
- **React Performance**: https://react.dev/learn/render-and-commit
- **Web Vitals**: https://web.dev/vitals/
- **Bundle Analysis**: https://www.npmjs.com/package/@next/bundle-analyzer

---

**Last Updated**: 2025-01-16
**Status**: Ready for implementation
**Priority**: High (largest page in app)
