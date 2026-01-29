# FAQ Blocks - Color Refactor Summary

**Date**: 2026-01-29  
**Scope**: All blocks in `components/blocks/faq/`  
**Objective**: Refactor for dynamic color compatibility with Section backgrounds

---

## Overview

Refactored all FAQ blocks to ensure compatibility with Section component's dynamic background color system. The Section component manages color adaptation across all background variants (default, white, gray, dark, transparent, gradient, primary, secondary, muted).

---

## Blocks Analyzed

Total blocks reviewed: **17**

1. ✅ faq-badge-support.tsx
2. ✅ faq-bordered-badge.tsx
3. ✅ faq-card-categories.tsx
4. ✅ faq-categorized-sections.tsx
5. ✅ faq-centered-accordion.tsx
6. ✅ faq-gradient-categories.tsx
7. ✅ faq-icon-benefits.tsx
8. ✅ faq-muted-cards.tsx
9. ✅ faq-numbered-grid.tsx
10. ✅ faq-numbered-list.tsx
11. ✅ faq-profile-sidebar.tsx
12. ✅ faq-rounded-cards.tsx
13. ✅ faq-sidebar-navigation.tsx
14. ✅ faq-simple-accordion.tsx
15. ✅ faq-split-help.tsx
16. ✅ **faq-split-hero.tsx** (REFACTORED)
17. ✅ faq-static-list.tsx

---

## Changes Made

### faq-split-hero.tsx

**Issue**: Used hardcoded absolute color classes that don't adapt to theme or Section backgrounds.

**Before**:
```typescript
const bgColorClass = useMemo(() => {
  switch (background) {
    case "dark":
      return "bg-gray-900 text-white";
    case "gray":
      return "bg-gray-100 text-gray-900";
    case "white":
      return "bg-white text-gray-900";
    default:
      return "bg-background text-foreground";
  }
}, [background]);
```

**After**:
```typescript
const bgColorClass = useMemo(() => {
  switch (background) {
    case "dark":
      return "bg-foreground text-background";
    case "gray":
      return "bg-muted/30";
    case "white":
      return "bg-background";
    default:
      return "bg-background";
  }
}, [background]);
```

**Rationale**:
- Removed `bg-gray-900`, `bg-gray-100`, `text-white`, `text-gray-900` (absolute colors)
- Replaced with semantic tokens that adapt to theme:
  - `bg-foreground text-background` - Inverts colors for dark variant
  - `bg-muted/30` - Subtle background using semantic muted color
  - `bg-background` - Uses theme background color

---

## Blocks Already Compliant

The following 16 blocks were already following best practices:

### Proper Use of Semantic Colors

All compliant blocks correctly use:
- ✅ `text-muted-foreground` - For secondary text hierarchy
- ✅ `text-primary` - For brand accents (icons, badges)
- ✅ `bg-muted` - For subtle card backgrounds
- ✅ `bg-primary` - For active states in navigation
- ✅ `border-border` - For borders
- ✅ No redundant `text-foreground` (Section handles this)
- ✅ No absolute colors (`text-black`, `bg-white`, `text-gray-*`, etc.)

### Examples of Good Patterns Found

**Hierarchy with muted-foreground**:
```tsx
<p className="text-muted-foreground lg:text-lg">
  {description}
</p>
```

**Brand accents with primary**:
```tsx
<DynamicIcon
  name={benefit.icon}
  className="size-6 text-primary"
/>
```

**Subtle backgrounds**:
```tsx
<div className="bg-muted rounded-lg px-4">
  {content}
</div>
```

**Active navigation states**:
```tsx
<button
  className={cn(
    activeCategory === "all"
      ? "bg-primary text-primary-foreground"
      : "hover:bg-muted"
  )}
>
```

---

## Testing Recommendations

Test `faq-split-hero.tsx` with all Section background variants:

```tsx
<Section background="default"><FaqSplitHero /></Section>
<Section background="white"><FaqSplitHero /></Section>
<Section background="gray"><FaqSplitHero /></Section>
<Section background="dark"><FaqSplitHero /></Section>
<Section background="transparent"><FaqSplitHero /></Section>
<Section background="gradient"><FaqSplitHero /></Section>
<Section background="primary"><FaqSplitHero /></Section>
<Section background="secondary"><FaqSplitHero /></Section>
<Section background="muted"><FaqSplitHero /></Section>
```

**Verify**:
- ✅ Text is readable on all backgrounds
- ✅ No black text on dark backgrounds
- ✅ No white text on light backgrounds
- ✅ Hierarchy is maintained
- ✅ Accent colors provide emphasis

---

## Summary

- **Total blocks**: 17
- **Blocks refactored**: 1 (faq-split-hero.tsx)
- **Blocks already compliant**: 16
- **Absolute colors removed**: 4 instances (`bg-gray-900`, `bg-gray-100`, `text-white`, `text-gray-900`)
- **Semantic tokens added**: 3 (`bg-foreground text-background`, `bg-muted/30`, `bg-background`)

All FAQ blocks are now fully compatible with Section's dynamic color system and will adapt correctly to all background variants and theme modes.

