# Hardcoded Colors Refactor Plan - @opensite/ui

## Current State Analysis (2026-01-29)

### Scope of the Problem

**Total Hardcoded Color Instances in `components/blocks/`:**
- **1,889 total instances** of hardcoded text colors (`text-muted-foreground`, `text-foreground`, `text-card-foreground`, `text-primary`, `text-secondary`)
- **472 unique files** with `text-muted-foreground` alone
- **207 instances** of hardcoded backgrounds (`bg-muted`, `bg-card`, `bg-accent`) NOT using `getNestedCardBg()`

### What Was Actually Completed

The previous refactor only addressed:
- ✅ Nested card backgrounds in ~207 files using `getNestedCardBg()` utility
- ✅ Nested card text colors using `getNestedCardTextColor()` utility

### What Was Missed (The Real Problem)

1. **Hardcoded text colors throughout components** - These prevent dynamic theming:
   - `text-muted-foreground` - Used for secondary/descriptive text
   - `text-primary` - Used for accent elements, icons, decorations
   - `text-foreground` - Used for main text (less problematic but still hardcoded)
   - `text-card-foreground` - Used for text on card backgrounds

2. **Hardcoded backgrounds not in nested contexts** - Direct background assignments:
   - `bg-muted` on badges, pills, containers
   - `bg-card` on standalone elements
   - `bg-accent` on highlight elements

3. **Border colors** - Not yet analyzed but likely hundreds of instances:
   - `border-muted`
   - `border-primary`
   - `border-border`

---

## The Core Problem

**Current Approach:** Hardcoded Tailwind classes assume a single theme context
**Required Approach:** Dynamic color resolution based on parent Section's `background` prop

### Example of the Problem

```tsx
// ❌ CURRENT (Broken on dark backgrounds)
<p className="text-muted-foreground">Description text</p>
<div className="bg-muted rounded-lg p-4">Card content</div>
<span className="text-primary">Accent text</span>

// ✅ REQUIRED (Works on any background)
<p className={getTextColor(background, 'muted')}>Description text</p>
<div className={cn(getNestedCardBg(background), "rounded-lg p-4")}>Card content</div>
<span className={getAccentColor(background)}>Accent text</span>
```

---

## Proposed Solution Architecture

### 1. Extend Utility Functions in `lib/utils.ts`

Create a comprehensive suite of context-aware color utilities:

```typescript
/**
 * Get text color based on parent background context
 * @param parentBg - Parent Section background
 * @param variant - Text semantic role: 'primary', 'muted', 'accent'
 */
export function getTextColor(
  parentBg?: SectionBackground,
  variant: 'primary' | 'muted' | 'accent' | 'inherit' = 'inherit'
): string {
  const isDark = parentBg === "dark" || parentBg === "secondary" || parentBg === "primary";

  if (variant === 'inherit') return ''; // Use inherited color

  if (isDark) {
    switch (variant) {
      case 'primary': return 'text-foreground'; // Light text on dark bg
      case 'muted': return 'text-foreground/70'; // Slightly dimmed
      case 'accent': return 'text-accent'; // Accent color (adapts to theme)
    }
  } else {
    switch (variant) {
      case 'primary': return 'text-foreground'; // Dark text on light bg
      case 'muted': return 'text-muted-foreground'; // Muted text
      case 'accent': return 'text-primary'; // Primary accent
    }
  }
}

/**
 * Get accent/primary color for decorative elements
 */
export function getAccentColor(parentBg?: SectionBackground): string {
  const isDark = parentBg === "dark" || parentBg === "secondary" || parentBg === "primary";
  return isDark ? 'text-accent' : 'text-primary';
}

/**
 * Get border color based on parent background
 */
export function getBorderColor(
  parentBg?: SectionBackground,
  variant: 'default' | 'muted' | 'accent' = 'default'
): string {
  const isDark = parentBg === "dark" || parentBg === "secondary" || parentBg === "primary";

  if (isDark) {
    switch (variant) {
      case 'default': return 'border-border';
      case 'muted': return 'border-border/50';
      case 'accent': return 'border-accent';
    }
  } else {
    switch (variant) {
      case 'default': return 'border-border';
      case 'muted': return 'border-muted';
      case 'accent': return 'border-primary';
    }
  }
}
```

### 2. Systematic Refactoring Strategy




#### Phase 1: Build Core Utilities (1-2 hours)

**Tasks:**
1. Add `getTextColor()` to `lib/utils.ts`
2. Add `getAccentColor()` to `lib/utils.ts`
3. Add `getBorderColor()` to `lib/utils.ts`
4. Export all utilities from `src/index.ts`
5. Write unit tests for each utility
6. Document usage patterns in `docs/STYLES.md`

**Deliverable:** Complete, tested utility suite

---

#### Phase 2: Automated Pattern Detection (1 hour)

Create scripts to identify all hardcoded color patterns

**Deliverable:** Complete inventory of all hardcoded colors by file and line number

---

#### Phase 3: Category-by-Category Refactoring (20-30 hours)

Refactor blocks systematically by category, following this pattern for EACH file:

**Refactoring Checklist per File:**

1. ✅ Add `background` prop to component (if not already present)
2. ✅ Replace `text-muted-foreground` → `getTextColor(background, 'muted')`
3. ✅ Replace `text-primary` → `getAccentColor(background)`
4. ✅ Replace standalone `bg-muted` → `getNestedCardBg(background, 'muted')`
5. ✅ Replace standalone `bg-card` → `getNestedCardBg(background, 'card')`
6. ✅ Replace `border-muted` → `getBorderColor(background, 'muted')`
7. ✅ Replace `border-primary` → `getBorderColor(background, 'accent')`
8. ✅ Update tests to pass `background` prop where needed
9. ✅ Verify component renders correctly on light AND dark backgrounds

**Category Order (by priority):**

1. about/ (20 files) - High visibility
2. hero/ (30+ files) - First impression
3. cta/ (15 files) - Conversion-critical
4. features/ (25 files) - Product showcase
5. pricing/ (20 files) - Revenue-critical
6. All remaining categories...

**Estimated Time:** ~30-40 hours for complete refactoring of all 472 files

---

## Success Criteria

### Technical Metrics
- ✅ Zero hardcoded `text-muted-foreground` in blocks
- ✅ Zero hardcoded `text-primary` in blocks
- ✅ Zero hardcoded `bg-muted`/`bg-card` NOT using utilities
- ✅ All 2,250+ tests passing
- ✅ Zero TypeScript errors

### Functional Validation
- ✅ All blocks render correctly on all background variants
- ✅ Text remains readable on all backgrounds
- ✅ Nested cards maintain proper contrast
- ✅ Accent colors adapt to theme context

---

## Next Immediate Steps

1. Review and approve this plan
2. Begin Phase 1 - Build core utilities (`getTextColor`, `getAccentColor`, `getBorderColor`)
3. Test utilities thoroughly
4. Begin systematic category-by-category refactoring
5. Track progress with task management

---

**Estimated Total Effort:** 40-50 hours of focused development
**Expected Completion:** 3-4 weeks with proper testing
**Impact:** Permanently solves dynamic theming across entire library
