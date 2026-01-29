# Color Class Decision Matrix for Block Refactoring

## Executive Summary

This matrix provides systematic rules for evaluating and refactoring CSS color classes in `@opensite/ui` blocks to ensure dynamic color compatibility with Section background variants.

## Core Principle

**The Section component manages color adaptation.** Blocks should trust Section's color intelligence and avoid hardcoded colors that conflict with dynamic theming.

---

## Section Background Color Mapping

The Section component applies these color combinations:

| Background | Container Classes | Text Color | Use Case |
|-----------|------------------|------------|----------|
| `default` | `bg-background text-foreground` | Inherits theme foreground | Standard sections |
| `white` | `bg-white text-dark` | Dark text | Light backgrounds |
| `gray` | `bg-muted/30 text-foreground` | Inherits theme foreground | Subtle contrast |
| `dark` | `bg-foreground text-background` | Light text (inverted) | Dark sections |
| `transparent` | `bg-transparent text-foreground` | Inherits theme foreground | Overlay sections |
| `gradient` | `bg-linear-to-br from-primary via-primary/90 to-foreground text-primary-foreground` | Primary foreground | Hero sections |
| `primary` | `bg-primary text-primary-foreground` | Primary foreground | Branded sections |
| `secondary` | `bg-secondary text-secondary-foreground` | Secondary foreground | Alternative branding |
| `muted` | `bg-muted text-muted-foreground` | Muted foreground | Subdued sections |

---

## Decision Rules

### ❌ ALWAYS REMOVE (Absolute Colors)

These classes **block dynamic color adaptation** and must be removed:

- `text-black` / `bg-black`
- `text-white` / `bg-white`  
- `text-gray-*` / `bg-gray-*` (specific gray shades)
- `text-slate-*` / `bg-slate-*`
- Any hardcoded color that doesn't adapt to Section background

**Exception**: Overlay elements that need specific opacity (e.g., `bg-black/60` for image overlays) - but prefer semantic alternatives.

### ⚠️ EVALUATE CAREFULLY (Semantic Tokens)

These classes are semantic but may conflict with Section color management:

| Class | Keep If... | Remove If... | Alternative |
|-------|-----------|-------------|-------------|
| `text-foreground` | Element needs explicit theme color AND won't conflict with Section | Inside Section that manages text color | Remove, let inherit |
| `text-background` | Inverted text on colored element | Standard text in Section | Remove, let inherit |
| `text-muted-foreground` | Secondary/subdued text hierarchy needed | Standard body text | Keep for hierarchy |
| `text-primary` | Accent/brand color needed | Standard text | Keep for emphasis |
| `text-primary-foreground` | Text on primary-colored background | Standard text | Keep for contrast |
| `bg-muted` | Card/container needs subtle background | Section already provides background | Remove if redundant |
| `bg-card` | Elevated card surface needed | Flat content | Keep for elevation |
| `border-border` | Standard border needed | No border needed | Keep |

### ✅ ALWAYS KEEP (Functional Colors)

These classes serve specific purposes and should be preserved:

- `text-destructive` / `bg-destructive` - Error states
- `text-primary` - Brand accent/emphasis (when intentional)
- `text-muted-foreground` - Secondary text hierarchy
- `border-*` - Border colors (usually semantic)
- `ring-*` - Focus rings
- Opacity modifiers on semantic colors (e.g., `bg-primary/10`)

---

## Common Refactoring Patterns

### Pattern 1: Remove Redundant Text Colors

**Before:**
```tsx
<h2 className="text-3xl font-medium text-foreground">
  {heading}
</h2>
```

**After:**
```tsx
<h2 className="text-3xl font-medium">
  {heading}
</h2>
```

**Reason**: Section already sets appropriate text color via `text-foreground`, `text-background`, etc.

### Pattern 2: Remove Absolute Background Colors

**Before:**
```tsx
<motion.div className="absolute inset-0 z-10 bg-black">
```

**After:**
```tsx
<motion.div className="absolute inset-0 z-10 bg-foreground">
```

**Reason**: `bg-foreground` adapts to theme (dark in light mode, light in dark mode).

### Pattern 3: Keep Hierarchy Colors

**Before & After (NO CHANGE):**
```tsx
<p className="text-sm text-muted-foreground">
  {subtitle}
</p>
```

**Reason**: `text-muted-foreground` creates intentional hierarchy and adapts to theme.

### Pattern 4: Remove Hardcoded Overlay Colors

**Before:**
```tsx
<div className="absolute inset-0 bg-black/60" />
```

**After:**
```tsx
<div className="absolute inset-0 bg-foreground/60" />
```

**Reason**: Semantic color adapts to theme while maintaining opacity.

### Pattern 5: Keep Accent Colors

**Before & After (NO CHANGE):**
```tsx
<span className="text-primary font-semibold">
  {label}
</span>
```

**Reason**: `text-primary` is intentional brand accent.

---

## Testing Checklist

After refactoring a block, test with ALL Section backgrounds:

```tsx
// Test each background variant
<Section background="default"><YourBlock /></Section>
<Section background="white"><YourBlock /></Section>
<Section background="gray"><YourBlock /></Section>
<Section background="dark"><YourBlock /></Section>
<Section background="transparent"><YourBlock /></Section>
<Section background="gradient"><YourBlock /></Section>
<Section background="primary"><YourBlock /></Section>
<Section background="secondary"><YourBlock /></Section>
<Section background="muted"><YourBlock /></Section>
```

**Verify:**
- ✅ All text is readable (sufficient contrast)
- ✅ No black text on dark backgrounds
- ✅ No white text on light backgrounds
- ✅ Hierarchy is maintained (headings vs body text)
- ✅ Accent colors still provide emphasis

---

## Priority Targets

Blocks with these patterns need immediate refactoring:

1. **Absolute colors**: `text-black`, `bg-black`, `text-white`, `bg-white`
2. **Redundant semantic colors**: `text-foreground` on elements inside Section
3. **Hardcoded grays**: `text-gray-700`, `bg-gray-100`, etc.
4. **Fixed overlays**: `bg-black` on hover/overlay elements

---

## Implementation Notes

- **Batch by category**: Refactor all blocks in a category together for consistency
- **Test incrementally**: Verify each block works with all backgrounds before moving on
- **Document exceptions**: If a block legitimately needs hardcoded colors, document why
- **Preserve intent**: Keep hierarchy and emphasis colors that serve a purpose

