---
name: react-best-practices
description: React and Next.js performance optimization guidelines from Vercel Engineering. This skill should be used when writing, reviewing, or refactoring React/Next.js code to ensure optimal performance patterns. Triggers on tasks involving React components, Next.js pages, data fetching, bundle optimization, or performance improvements.
---

# React Best Practices

## Overview

Comprehensive performance optimization guide for React and Next.js applications, containing 40+ rules across 8 categories. Rules are prioritized by impact to guide automated refactoring and code generation.

## When to Apply

Reference these guidelines when:
- Writing new React components or Next.js pages
- Implementing data fetching (client or server-side)
- Reviewing code for performance issues
- Refactoring existing React/Next.js code
- Optimizing bundle size or load times

## Priority-Ordered Guidelines

Rules are prioritized by impact:

| Priority | Category | Impact |
|----------|----------|--------|
| 1 | Eliminating Waterfalls | CRITICAL |
| 2 | Bundle Size Optimization | CRITICAL |
| 3 | Server-Side Performance | HIGH |
| 4 | Client-Side Data Fetching | MEDIUM-HIGH |
| 5 | Re-render Optimization | MEDIUM |
| 6 | Rendering Performance | MEDIUM |
| 7 | JavaScript Performance | LOW-MEDIUM |
| 8 | Advanced Patterns | LOW |

## Quick Reference

### Critical Patterns (Apply First)

**Eliminate Waterfalls:**
- Defer await until needed (move into branches)
- Use `Promise.all()` for independent async operations
- Start promises early, await late
- Use `better-all` for partial dependencies
- Use Suspense boundaries to stream content

**Reduce Bundle Size:**
- Avoid barrel file imports (import directly from source)
- Use `next/dynamic` for heavy components
- Defer non-critical third-party libraries
- Preload based on user intent

### High-Impact Server Patterns

- Use `React.cache()` for per-request deduplication
- Use LRU cache for cross-request caching
- Minimize serialization at RSC boundaries
- Parallelize data fetching with component composition

### Medium-Impact Client Patterns

- Use SWR for automatic request deduplication
- Defer state reads to usage point
- Use lazy state initialization for expensive values
- Use derived state subscriptions
- Apply `startTransition` for non-urgent updates

### Rendering Patterns

- Animate SVG wrappers, not SVG elements directly
- Use `content-visibility: auto` for long lists
- Prevent hydration mismatch with inline scripts
- Use explicit conditional rendering (`? :` not `&&`)

### JavaScript Patterns

- Batch DOM CSS changes via classes
- Build index maps for repeated lookups
- Cache repeated function calls
- Use `toSorted()` instead of `sort()` for immutability
- Early length check for array comparisons

## Detailed Rules

### Category 1: Eliminating Waterfalls (CRITICAL)

#### Rule 1.1: Defer Await Until Needed
```typescript
// ❌ Bad: Awaiting immediately creates waterfall
async function getData() {
  const user = await fetchUser();
  const posts = await fetchPosts(user.id);
  return { user, posts };
}

// ✅ Good: Start both, await when needed
async function getData() {
  const userPromise = fetchUser();
  const user = await userPromise;
  const posts = await fetchPosts(user.id);
  return { user, posts };
}
```

#### Rule 1.2: Use Promise.all for Independent Operations
```typescript
// ❌ Bad: Sequential fetching
const user = await fetchUser();
const settings = await fetchSettings();
const notifications = await fetchNotifications();

// ✅ Good: Parallel fetching
const [user, settings, notifications] = await Promise.all([
  fetchUser(),
  fetchSettings(),
  fetchNotifications()
]);
```

#### Rule 1.3: Use Suspense Boundaries for Streaming
```tsx
// ✅ Good: Stream content as it becomes available
<Suspense fallback={<LoadingSkeleton />}>
  <UserProfile />
</Suspense>
<Suspense fallback={<LoadingSkeleton />}>
  <UserPosts />
</Suspense>
```

### Category 2: Bundle Size Optimization (CRITICAL)

#### Rule 2.1: Avoid Barrel File Imports
```typescript
// ❌ Bad: Imports entire barrel file
import { Button } from '@/components';

// ✅ Good: Direct import
import { Button } from '@/components/Button';
```

#### Rule 2.2: Use Dynamic Imports for Heavy Components
```typescript
// ❌ Bad: Static import of heavy component
import HeavyChart from '@/components/HeavyChart';

// ✅ Good: Dynamic import
const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false
});
```

#### Rule 2.3: Defer Third-Party Libraries
```typescript
// ❌ Bad: Load library immediately
import analytics from 'heavy-analytics-lib';

// ✅ Good: Load on interaction
const loadAnalytics = async () => {
  const { analytics } = await import('heavy-analytics-lib');
  return analytics;
};
```

### Category 3: Server-Side Performance (HIGH)

#### Rule 3.1: Use React.cache() for Request Deduplication
```typescript
// ✅ Good: Deduplicate requests within same render
import { cache } from 'react';

export const getUser = cache(async (id: string) => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
});
```

#### Rule 3.2: Minimize RSC Serialization
```typescript
// ❌ Bad: Passing entire object to client
<ClientComponent data={fullUserObject} />

// ✅ Good: Pass only needed data
<ClientComponent 
  userName={user.name} 
  userAvatar={user.avatar} 
/>
```

### Category 4: Client-Side Data Fetching (MEDIUM-HIGH)

#### Rule 4.1: Use SWR for Deduplication
```typescript
// ✅ Good: Automatic deduplication and caching
import useSWR from 'swr';

function useUser(id: string) {
  const { data, error, isLoading } = useSWR(
    `/api/users/${id}`,
    fetcher
  );
  return { user: data, error, isLoading };
}
```

#### Rule 4.2: Use React Query for Complex State
```typescript
// ✅ Good: With React Query
const { data, isLoading } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

### Category 5: Re-render Optimization (MEDIUM)

#### Rule 5.1: Defer State Reads
```typescript
// ❌ Bad: Reading state in parent
function Parent() {
  const [items, setItems] = useState([]);
  return <Child items={items} />;
}

// ✅ Good: Subscribe to state in child
function Parent() {
  return <Child />;
}

function Child() {
  const items = useStore((state) => state.items);
  return <List items={items} />;
}
```

#### Rule 5.2: Use startTransition for Non-Urgent Updates
```typescript
// ✅ Good: Mark as non-urgent
import { startTransition } from 'react';

function handleSearch(query: string) {
  startTransition(() => {
    setSearchResults(filterResults(query));
  });
}
```

### Category 6: Rendering Performance (MEDIUM)

#### Rule 6.1: Use content-visibility for Long Lists
```css
/* ✅ Good: Skip rendering off-screen content */
.list-item {
  content-visibility: auto;
  contain-intrinsic-size: 0 50px;
}
```

#### Rule 6.2: Explicit Conditional Rendering
```tsx
// ❌ Bad: Can render 0 or empty string
{items.length && <List items={items} />}

// ✅ Good: Explicit ternary
{items.length > 0 ? <List items={items} /> : null}
```

## Alex's Project Integration

When working on **Alex's Projects**, combine this skill with the required stack:

| Stack Component | Best Practice Integration |
|-----------------|---------------------------|
| React SPA | Use all client-side patterns |
| Zustand | Apply Rule 5.1 (defer state reads) |
| React Query | Apply Rule 4.2 (complex state) |
| Tailwind v4 | Use CSS `content-visibility` |
| Dynamic Imports | Apply Rule 2.2 for code splitting |

## References

- `references/react-performance-guidelines.md` - Complete guide
- `references/rules/` - Individual rule files by category

## Rule Categories

- `async-*` - Waterfall elimination patterns
- `bundle-*` - Bundle size optimization
- `server-*` - Server-side performance
- `client-*` - Client-side data fetching
- `rerender-*` - Re-render optimization
- `rendering-*` - DOM rendering performance
- `js-*` - JavaScript micro-optimizations
- `advanced-*` - Advanced patterns
