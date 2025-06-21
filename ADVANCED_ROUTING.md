# Advanced Next.js Routing Features

This document covers the advanced routing features implemented in this demo project that go beyond the basic routing concepts.

## 🚀 Implemented Advanced Features

### 1. Parallel Routes with Route Groups

**Location:** `app/dashboard/`

**Files:**

- `app/dashboard/layout.tsx` - Main layout with parallel route slots
- `app/dashboard/(overview)/page.tsx` - Default dashboard page (route group)
- `app/dashboard/@analytics/page.tsx` - Analytics parallel route
- `app/dashboard/@user/page.tsx` - User info parallel route
- `app/dashboard/(settings)/settings/page.tsx` - Settings page (route group)

**Key Concepts:**

- **Parallel Routes (`@folder`)**: Allow rendering multiple pages simultaneously in the same layout
- **Route Groups (`(folder)`)**: Organize routes without affecting URL structure
- **Independent Loading**: Each parallel route can have its own loading states and error boundaries
- **Slot-based Architecture**: Layout receives named slots as props

**Example Usage:**
```tsx
// layout.tsx
export default function DashboardLayout({
  children,
  analytics, // @analytics slot
  user,      // @user slot
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  user: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        {children}
        {analytics}
      </div>
      <div>{user}</div>
    </div>
  )
}
```

**Benefits:**

- Better performance through independent loading
- Improved user experience with granular loading states
- Cleaner code organization
- Flexible layout compositions

### 2. Optional Catch-All Routes

**Location:** `app/docs/[[...slug]]/page.tsx`

**Key Concepts:**

- **Double Brackets (`[[...slug]]`)**: Makes catch-all routes optional
- **Flexible URL Matching**: Handles both `/docs` and `/docs/any/nested/path`
- **Dynamic Content**: Renders different content based on URL segments

**Route Matching Examples:**

- `/docs` → `slug` is `undefined`
- `/docs/getting-started` → `slug` is `['getting-started']`
- `/docs/api/authentication` → `slug` is `['api', 'authentication']`
- `/docs/guides/routing/advanced` → `slug` is `['guides', 'routing', 'advanced']`

**Implementation Highlights:**
```tsx
export default function DocsPage({ 
  params 
}: { 
  params: { slug?: string[] } 
}) {
  const content = getContentBySlug(params.slug)
  
  if (!content) {
    notFound()
  }

  // Handle both index page and nested content
  return content.isIndex ? <IndexPage /> : <ContentPage content={content} />
}
```

**Use Cases:**

- Documentation sites
- Blog systems
- Content management systems
- Flexible navigation structures

### 3. Intercepting Routes

**Location:** `app/products/(.)modal/[id]/page.tsx`

**Key Concepts:**

- **Route Interception (`(.)`)**: Intercepts navigation to show content in current layout
- **Modal Patterns**: Perfect for modal overlays without losing context
- **Conditional Rendering**: Different behavior for navigation vs. direct access

**Interception Patterns:**

- `(.)` - Same level
- `(..)` - One level up
- `(..)(..)` - Two levels up
- `(...)` - Root level

**Implementation:**
```tsx
// This file intercepts /products/[id] when navigated from products page
// app/products/(.)modal/[id]/page.tsx
export default function ProductModalPage({ params }: { params: { id: string } }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        {/* Modal content */}
      </div>
    </div>
  )
}
```

**Benefits:**

- Improved UX with modal interactions
- Maintains navigation context
- SEO-friendly (direct URLs still work)
- Progressive enhancement

## 🎯 Testing the Features

### Dashboard (Parallel Routes + Route Groups)

1. Visit `/dashboard` to see parallel routes in action
2. Notice how analytics and user sections load independently
3. Visit `/dashboard/settings` to see route groups (URL doesn't include `(settings)`)

### Documentation (Optional Catch-All)

1. Visit `/docs` for the index page
2. Try `/docs/getting-started` for single segment
3. Try `/docs/api/authentication` for nested segments
4. Try `/docs/guides/routing/advanced` for deep nesting

### Product Modal (Intercepting Routes)

1. Go to `/products`
2. Click "Modal View" to see intercepted route
3. Click "Full Page" or refresh to see normal route
4. Notice URL stays the same but rendering differs

## 🔧 Technical Implementation Details

### File Structure
```
app/
├── dashboard/
│   ├── layout.tsx              # Parallel routes layout
│   ├── (overview)/             # Route group
│   │   └── page.tsx
│   ├── (settings)/             # Route group
│   │   └── settings/
│   │       └── page.tsx
│   ├── @analytics/             # Parallel route
│   │   └── page.tsx
│   └── @user/                  # Parallel route
│       └── page.tsx
├── docs/
│   └── [[...slug]]/            # Optional catch-all
│       └── page.tsx
└── products/
    ├── (.)modal/               # Intercepting route
    │   └── [id]/
    │       └── page.tsx
    └── [id]/                   # Regular dynamic route
        └── page.tsx
```

### Performance Considerations

- **Parallel Routes**: Enable independent loading and error boundaries
- **Route Groups**: Organize code without URL overhead
- **Optional Catch-All**: Flexible routing with single file
- **Intercepting Routes**: Maintain context while providing modal UX

### Best Practices

1. **Use Suspense**: Wrap parallel routes with Suspense for better loading UX
2. **Error Boundaries**: Implement error.tsx for each parallel route
3. **Loading States**: Create loading.tsx for better perceived performance
4. **Type Safety**: Use proper TypeScript types for route parameters
5. **SEO Friendly**: Ensure intercepted routes work with direct navigation

## 📚 Additional Resources

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Parallel Routes Guide](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)
- [Intercepting Routes Guide](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes)
- [Route Groups Guide](https://nextjs.org/docs/app/building-your-application/routing/route-groups)

---

*This documentation covers the advanced routing features implemented in addition to the basic routing concepts outlined in the main README.md file.*