# Example Refactor Analysis: industries-hover-reveal-grid.tsx

## Current Issues

### Line 164: Heading
```tsx
className={cn(
  "mb-8 text-3xl font-medium text-foreground",
  headingClassName,
)}
```
**Issue**: `text-foreground` is redundant - Section already sets text color
**Fix**: Remove `text-foreground`

### Line 193: Card Background
```tsx
className="group relative overflow-hidden bg-muted"
```
**Issue**: `bg-muted` may conflict with Section background
**Fix**: Evaluate - likely keep for card elevation, but test with dark backgrounds

### Line 222: Industry Name
```tsx
<h3 className="absolute bottom-10 text-lg font-medium text-foreground">
```
**Issue**: `text-foreground` redundant
**Fix**: Remove `text-foreground`

### Line 227: Hover Overlay
```tsx
className="absolute inset-0 z-10 bg-black"
```
**Issue**: `bg-black` is absolute color, won't adapt to theme
**Fix**: Change to `bg-foreground` (dark in light mode, light in dark mode)

### Line 241: Hover Text Container
```tsx
className="absolute inset-0 z-20 flex min-h-120 items-center justify-center p-8 text-white lg:min-h-144 xl:min-h-112"
```
**Issue**: `text-white` is absolute color
**Fix**: Change to `text-background` (inverts with theme)

### Line 259: Icon Background
```tsx
<div className="absolute inset-0 rounded-full bg-muted-foreground/20" />
```
**Issue**: Likely OK - uses semantic color with opacity
**Fix**: Keep

### Line 261: Icon Background Hover
```tsx
className="absolute inset-0 rounded-full bg-muted-foreground"
```
**Issue**: Likely OK - semantic color
**Fix**: Keep

---

## Refactored Version

### Changes Summary

1. **Line 164**: Remove `text-foreground` from heading
2. **Line 222**: Remove `text-foreground` from industry name  
3. **Line 227**: Change `bg-black` to `bg-foreground`
4. **Line 241**: Change `text-white` to `text-background`
5. **Line 193**: Keep `bg-muted` for card elevation (test with backgrounds)

### Testing Scenarios

#### Scenario 1: Light Background (default, white, gray)
- Section sets: `text-foreground` (dark text)
- Heading: Inherits dark text ✅
- Card: `bg-muted` provides subtle elevation ✅
- Hover overlay: `bg-foreground` (dark) ✅
- Hover text: `text-background` (light) ✅

#### Scenario 2: Dark Background (dark, primary, gradient)
- Section sets: `text-background` (light text)
- Heading: Inherits light text ✅
- Card: `bg-muted` may need evaluation ⚠️
- Hover overlay: `bg-foreground` (light) ✅
- Hover text: `text-background` (dark) ✅

#### Scenario 3: Muted Background
- Section sets: `text-muted-foreground`
- Heading: Inherits muted foreground ✅
- Card: `bg-muted` may be redundant ⚠️
- Hover overlay: `bg-foreground` ✅
- Hover text: `text-background` ✅

### Potential Issue: Card Background on Dark Sections

The `bg-muted` on line 193 may not provide enough contrast on dark Section backgrounds. 

**Options**:
1. Keep as-is and accept subtle appearance on dark backgrounds
2. Remove `bg-muted` entirely and rely on border for card definition
3. Add conditional logic (NOT RECOMMENDED - adds complexity)

**Recommendation**: Remove `bg-muted` and rely on border. The hover effect provides enough visual interest.

---

## Final Refactored Code

```tsx
// Line 164 - Heading
className={cn(
  "mb-8 text-3xl font-medium",
  headingClassName,
)}

// Line 193 - Card (remove bg-muted)
className="group relative overflow-hidden"

// Line 222 - Industry Name
<h3 className="absolute bottom-10 text-lg font-medium">
  {industry.name}
</h3>

// Line 227 - Hover Overlay
className="absolute inset-0 z-10 bg-foreground"

// Line 241 - Hover Text
className="absolute inset-0 z-20 flex min-h-120 items-center justify-center p-8 text-background lg:min-h-144 xl:min-h-112"
```

---

## Validation Checklist

- ✅ Removed `text-foreground` from heading (line 164)
- ✅ Removed `bg-muted` from card (line 193)
- ✅ Removed `text-foreground` from industry name (line 222)
- ✅ Changed `bg-black` to `bg-foreground` (line 227)
- ✅ Changed `text-white` to `text-background` (line 241)
- ✅ Kept semantic colors with opacity (lines 259, 261)

---

## Expected Behavior After Refactor

### On Light Backgrounds (default, white, gray)
- Heading: Dark text (inherits from Section)
- Card: Transparent with border
- Initial state: Image visible with dark text overlay
- Hover state: Dark overlay with light text

### On Dark Backgrounds (dark, primary, gradient)  
- Heading: Light text (inherits from Section)
- Card: Transparent with border
- Initial state: Image visible with light text overlay
- Hover state: Light overlay with dark text

### On All Backgrounds
- Text is always readable
- Hover effect provides clear visual feedback
- No black-on-black or white-on-white issues
- Maintains visual hierarchy

