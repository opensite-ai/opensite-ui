# @opensite/ui Version 0.0.3 - Implementation Summary

## Overview

Version 0.0.3 introduces **breaking changes** to support hundreds of content-specific blocks through category-based directory organization, refactors all blocks to use the Section component for consistency, and fixes critical issues with PageHeroBanner and Section components.

## Breaking Changes ⚠️

### 1. Category-Based Directory Structure

**Impact:** Import paths have changed for all blocks

**Before (0.0.2):**
```tsx
import { AlternatingBlocks } from "@opensite/ui/blocks/alternating-blocks";
```

**After (0.0.3):**
```tsx
import { AlternatingBlocks } from "@opensite/ui/blocks/about/alternating-blocks";
```

**Rationale:**
- Prevent naming collisions when scaling to hundreds of blocks
- Enable category-driven filtering for AI semantic engine
- Improve developer navigation and organization
- Match 1:1 with semantic registry categories

**Directory Structure:**
```
components/blocks/
├── about/          # Company story, mission, history
│   ├── __tests__/
│   └── alternating-blocks.tsx
├── features/       # Product/service features
├── cta/           # Call-to-action sections
├── testimonials/  # Customer reviews, social proof
├── services/      # Service offerings
├── hero/          # Hero/banner sections
├── footer/        # Footer content
├── header/        # Header/navigation
├── pricing/       # Pricing tables
├── team/          # Team member profiles
├── stats/         # Statistics, metrics
├── faq/           # Frequently asked questions
├── contact/       # Contact forms
├── gallery/       # Image/video galleries
├── timeline/      # Event timelines
├── process/       # Process/workflow steps
├── benefits/      # Benefit lists
└── comparison/    # Comparison tables
```

### 2. AlternatingBlocks Now Uses Section Component

**Impact:** New props added, component structure changed

**New Props:**
- `title?: string` - Section title (optional)
- `subtitle?: string` - Section subtitle/eyebrow (optional)
- `background?: SectionBackground` - Background variant (default: "white")
- `spacing?: SectionSpacing` - Vertical spacing (default: "lg")
- `contentClassName?: string` - Additional CSS classes for content container

**Before (0.0.2):**
```tsx
<AlternatingBlocks
  className="custom-class"
  sections={[...]}
/>
```

**After (0.0.3):**
```tsx
<AlternatingBlocks
  title="Our Journey"
  subtitle="About Us"
  background="gray"
  spacing="xl"
  className="custom-class"        // Applied to Section wrapper
  contentClassName="content-class" // Applied to content container
  sections={[...]}
/>
```

**Benefits:**
- Consistent spacing and backgrounds across all blocks
- Built-in support for section titles and subtitles
- Leverages Section's background variants
- More flexible styling options

## Enhancements

### 1. AnimatedDialog Default Styles

**Issue:** AnimatedDialog lacked sufficient default styling, requiring extensive customization for each use

**Changes:**
- Changed background from `bg-card` to `bg-background` for better theme integration
- Increased padding from `p-4 md:p-10` to `p-6 md:p-12` for more spacious feel
- Increased viewport margins from `my-10 md:my-16` to `my-12 md:my-20` for better mobile/desktop spacing
- Updated close button sizing from `h-9 w-9` to `h-10 w-10 md:h-11 md:w-11` for better tap targets
- Added `flex-shrink-0` to close button to prevent "scrunching" on mobile
- Increased gap between header and close button from `gap-6` to `gap-8`
- Increased content/footer spacing from `mt-6` to `mt-8 md:mt-10`
- Changed title color from `text-card-foreground` to `text-foreground` for consistency

**Impact:** AnimatedDialog now has polished default styles while remaining fully customizable via className and contentClassName props

## Bug Fixes

### 1. PageHeroBanner Overlay Not Working

**Issue:** `showOverlay` prop had no visible effect due to double opacity bug

**Root Cause:**
- Overlay gradient used alpha values in Tailwind classes (`from-foreground/70 via-foreground/50 to-foreground/80`)
- PLUS inline `style={{ opacity: overlayOpacity }}`
- Effective opacity was too weak (0.42, 0.3, 0.48)
- Wrong color variable (`foreground` for text, not overlays)

**Fix:**
```tsx
// Before
<div
  className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80"
  style={{ opacity: overlayOpacity }}
/>

// After
<div
  className="absolute inset-0 bg-gradient-to-b from-black via-black to-black"
  style={{ opacity: overlayOpacity }}
/>
```

**Result:** Overlay now properly darkens at the specified opacity level (default: 0.6)

### 2. Section Missing Explicit Style Prop

**Issue:** `style` prop support wasn't explicit in the interface, causing TypeScript confusion

**Fix:**
- Made `style?: React.CSSProperties` explicit in SectionProps interface
- Destructured and explicitly passed to `<section>` element
- Updated documentation

**Before:**
```tsx
export interface SectionProps extends HTMLAttributes<HTMLElement> {
  // style inherited from HTMLAttributes but not explicit
}
```

**After:**
```tsx
export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /**
   * Inline styles (React.CSSProperties)
   */
  style?: React.CSSProperties;
}
```

## File Structure Changes

### Updated Files

1. **Component Files:**
   - `components/blocks/about/alternating-blocks.tsx` - Moved and refactored
   - `components/ui/page-hero-banner.tsx` - Fixed overlay
   - `components/ui/section.tsx` - Added explicit style prop

2. **Export Files:**
   - `src/alternating-blocks.ts` - Updated import path
   - `src/components.ts` - Updated import path

3. **Configuration:**
   - `package.json` - Updated export path from `./blocks/alternating-blocks` to `./blocks/about/alternating-blocks`

4. **Registry:**
   - `src/registry/blocks.ts` - Updated import path

5. **Types:**
   - `src/types/index.ts` - Added explicit style prop to SectionProps

6. **Tests:**
   - `components/blocks/about/__tests__/alternating-blocks.test.tsx` - Moved and updated with 8 new tests

7. **Documentation:**
   - `docs/ADDING_BLOCKS.md` - Complete rewrite with category structure
   - `README.md` - Updated AlternatingBlocks documentation
   - `docs/VERSION_0.0.3_SUMMARY.md` - This file

### New Directories

Created 18 category directories under `components/blocks/`:
- Each with `__tests__/` subdirectory for organization
- Ready for hundreds of blocks to be added

## Testing Updates

### AlternatingBlocks Tests

**Total tests:** 20 (12 existing + 8 new)

**New test coverage:**
- Section title rendering
- Section subtitle rendering
- Background variant application
- Spacing variant application (xl, sm)
- contentClassName application
- Combined props validation

**Updated tests:**
- Changed spacing expectation from `py-12` to `py-20` (Section's default "lg" spacing)
- Corrected all spacing test values to match actual Section component implementation

## Documentation Updates

### ADDING_BLOCKS.md

Complete rewrite covering:
- Category selection as first step
- Updated file paths with `[category]` placeholders
- Section component usage patterns
- Import path updates for all examples
- Registry category matching requirement
- Enhanced checklist with Section-related items
- Updated FeatureGrid example with Section wrapper
- Category directory structure visualization

**Key additions:**
- Category selection guidance
- Section component integration patterns
- Updated all 10 steps with category paths
- Enhanced test examples with Section prop validations

### README.md

**Updated AlternatingBlocks documentation:**
- New import path with category
- New props documentation
- Updated example showing Section features
- Note about category-based organization

## Migration Guide

### For Consumers of @opensite/ui

1. **Update imports** - Add category to block import paths:
   ```tsx
   // Old
   import { AlternatingBlocks } from "@opensite/ui/blocks/alternating-blocks";

   // New
   import { AlternatingBlocks } from "@opensite/ui/blocks/about/alternating-blocks";
   ```

2. **Review AlternatingBlocks usage** - Consider using new Section props:
   ```tsx
   <AlternatingBlocks
     title="Optional Title"      // NEW
     subtitle="Optional Eyebrow" // NEW
     background="gray"           // NEW
     spacing="xl"                // NEW
     sections={[...]}
   />
   ```

3. **Test PageHeroBanner overlays** - Verify overlay appearance if using `showOverlay`

### For Block Developers

1. **Choose category** - Select appropriate category from 18 options
2. **Create in category directory** - `components/blocks/[category]/[name].tsx`
3. **Use Section wrapper** - Wrap content in Section component
4. **Expose Section props** - Include title, subtitle, background, spacing
5. **Update import paths** - Use category in all imports and exports
6. **Match registry category** - Ensure category field matches directory
7. **Update tests** - Place in `__tests__/` within category directory
8. **Test Section props** - Add validation for new Section-based props

## Technical Details

### Import Path Pattern

**Individual imports:**
```tsx
import { BlockName } from "@opensite/ui/blocks/[category]/[block-name]";
```

**Grouped imports:**
```tsx
import { AlternatingBlocks, /* other components */ } from "@opensite/ui/components";
```

### Section Component Pattern

All blocks should follow this pattern:

```tsx
export function YourBlock({
  // Your block-specific props
  items,
  columns,

  // Section props (standard across all blocks)
  title,
  subtitle,
  background = "white",
  spacing = "lg",
  className,
  contentClassName,
}: YourBlockProps) {
  return (
    <Section
      title={title}
      subtitle={subtitle}
      background={background}
      spacing={spacing}
      className={className}
    >
      <div className={cn("your-content-classes", contentClassName)}>
        {/* Your block content */}
      </div>
    </Section>
  );
}
```

### Category Guidelines

**Category → Use Case Mapping:**
- `about` - Company story, mission, values, history, culture
- `features` - Product/service features, capabilities, benefits
- `cta` - Call-to-action sections, sign-up prompts
- `testimonials` - Customer reviews, quotes, social proof
- `services` - Service offerings, packages, what you provide
- `hero` - Large banner sections, page headers
- `footer` - Footer content, sitemap, legal links
- `header` - Header/navigation content
- `pricing` - Pricing tables, plans, package comparisons
- `team` - Team member profiles, bios, org charts
- `stats` - Statistics, metrics, numbers, achievements
- `faq` - Frequently asked questions, help content
- `contact` - Contact forms, maps, contact information
- `gallery` - Image galleries, video galleries, media grids
- `timeline` - Event timelines, history, milestones
- `process` - Process steps, workflows, how it works
- `benefits` - Benefit lists, value propositions
- `comparison` - Comparison tables, feature matrices

## Performance Impact

**Bundle Size:**
- No change - category structure doesn't affect tree-shaking
- Section wrapper adds ~2KB (already imported by most blocks)

**Runtime Performance:**
- Section component is optimized and lightweight
- No performance degradation from category organization

## Next Steps

### For Future Blocks

1. Always select appropriate category first
2. Use Section component wrapper
3. Follow the pattern established by AlternatingBlocks
4. Add comprehensive tests including Section props
5. Update registry with matching category
6. Document in README with category path

### Planned Improvements

1. Add more blocks in each category
2. Create category-specific utilities
3. Enhance registry with category-based filtering
4. Add visual category browser for docs
5. Create block templates for each category

## Questions?

See the updated guides:
- `docs/ADDING_BLOCKS.md` - Complete guide for adding blocks
- `README.md` - Component documentation
- Reference implementation: `components/blocks/about/alternating-blocks.tsx`

## Version Bump Reasoning

**0.0.2 → 0.0.3** (Minor version, patch increment)

Breaking changes warrant a version bump. While still in 0.0.x (unstable), we increment the patch version for breaking changes. Once we reach 1.0.0, breaking changes will require major version bump.

**Breaking changes:**
- Import path changes (all blocks)
- AlternatingBlocks prop additions (non-breaking but significant)

**Non-breaking changes:**
- Bug fixes (PageHeroBanner, Section)
- Documentation updates
- Test improvements
