# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.4] - 2025-12-23

### Fixed

#### PageHeroBanner Overlay Rendering

Fixed critical bug where overlay was not rendering at all due to typo in Tailwind class name.

**Root Cause:**
- Line 82 had `bg-linear-to-b` instead of `bg-gradient-to-b`
- Invalid Tailwind class prevented gradient overlay from rendering
- Affected all PageHeroBanner components with `showOverlay={true}` (default)

**Fix:**
```tsx
// Before (broken)
<div className="absolute inset-0 bg-linear-to-b from-black via-black to-black" />

// After (working)
<div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />
```

**Impact:**
- PageHeroBanner overlays now render correctly
- Default `overlayOpacity={0.6}` provides proper darkening for text readability
- Gradient overlay properly covers image/video backgrounds

**Test Updates:**
- Updated test expectation from `.bg-linear-to-b` to `.bg-gradient-to-b`
- All 69 tests passing

### Documentation

Added guidance on required Tailwind configuration for consuming applications in `docs/STYLES.md`:
- Color mappings (`hsl(var(--primary))` pattern)
- Border radius mappings
- Content path including `@opensite/ui` distribution files
- Dark mode configuration

## [0.0.3] - 2025-12-23

### Category-Based Directory Structure

Import paths have changed for all blocks to support hundreds of content-specific blocks through category-based organization.

**Before:**

```tsx
import { AlternatingBlocks } from "@opensite/ui/blocks/alternating-blocks";
```

**After:**

```tsx
import { AlternatingBlocks } from "@opensite/ui/blocks/about/alternating-blocks";
```

**New Directory Structure:**

- `components/blocks/about/` - Company story, mission, history
- `components/blocks/features/` - Product/service features
- `components/blocks/cta/` - Call-to-action sections
- `components/blocks/testimonials/` - Customer reviews, social proof
- `components/blocks/services/` - Service offerings
- `components/blocks/hero/` - Hero/banner sections
- `components/blocks/footer/` - Footer content
- `components/blocks/header/` - Header/navigation
- `components/blocks/pricing/` - Pricing tables
- `components/blocks/team/` - Team member profiles
- `components/blocks/stats/` - Statistics, metrics
- `components/blocks/faq/` - Frequently asked questions
- `components/blocks/contact/` - Contact forms
- `components/blocks/gallery/` - Image/video galleries
- `components/blocks/timeline/` - Event timelines
- `components/blocks/process/` - Process/workflow steps
- `components/blocks/benefits/` - Benefit lists
- `components/blocks/comparison/` - Comparison tables

#### AlternatingBlocks Now Uses Section Component

The AlternatingBlocks component has been refactored to use the Section component for consistency.

**New Props:**

- `title?: string` - Section title (optional)
- `subtitle?: string` - Section subtitle/eyebrow (optional)
- `background?: SectionBackground` - Background variant (default: "white")
- `spacing?: SectionSpacing` - Vertical spacing (default: "lg")
- `contentClassName?: string` - Additional CSS classes for content container

**Before:**

```tsx
<AlternatingBlocks
  className="custom-class"
  sections={[...]}
/>
```

**After:**

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

### Enhanced

#### AnimatedDialog Default Styles

AnimatedDialog now includes polished default styles while remaining fully customizable.

**Changes:**

- Changed background from `bg-card` to `bg-background` for better theme integration
- Increased padding from `p-4 md:p-10` to `p-6 md:p-12` for more spacious feel
- Increased viewport margins from `my-10 md:my-16` to `my-12 md:my-20` for better mobile/desktop spacing
- Updated close button sizing from `h-9 w-9` to `h-10 w-10 md:h-11 md:w-11` for better tap targets
- Added `flex-shrink-0` to close button to prevent "scrunching" on mobile
- Increased gap between header and close button from `gap-6` to `gap-8`
- Increased content/footer spacing from `mt-6` to `mt-8 md:mt-10`
- Changed title color from `text-card-foreground` to `text-foreground` for consistency

**Default Styles:**

- Background uses theme background color for proper contrast
- Generous padding (p-6 on mobile, p-12 on desktop) for spacious feel
- Proper viewport spacing (my-12 on mobile, my-20 on desktop)
- Close button with circular background that maintains shape on all screen sizes
- Smooth framer-motion animations with backdrop blur

### Fixed

#### PageHeroBanner Overlay Not Working

Fixed `showOverlay` prop having no visible effect due to double opacity bug.

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

#### Section Missing Explicit Style Prop

Fixed `style` prop support not being explicit in the interface.

**Changes:**

- Made `style?: React.CSSProperties` explicit in SectionProps interface
- Destructured and explicitly passed to `<section>` element
- Updated documentation

### Added

#### Documentation

- Complete rewrite of `docs/ADDING_BLOCKS.md` with category structure guidance
- New `docs/VERSION_0.0.3_SUMMARY.md` with comprehensive migration guide
- Enhanced README.md with updated import paths and examples
- Category selection guidelines and use case mapping
- Section component integration patterns
- Updated all code examples with category paths

#### Tests

- Added 8 new tests for AlternatingBlocks Section props
- Added 3 new tests for AnimatedDialog default styles
- Total test count: 70 (all passing)
- Updated test expectations to match new spacing values

### Migration Guide

#### For Consumers

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

#### For Block Developers

1. **Choose category** - Select appropriate category from 18 options
2. **Create in category directory** - `components/blocks/[category]/[name].tsx`
3. **Use Section wrapper** - Wrap content in Section component
4. **Expose Section props** - Include title, subtitle, background, spacing
5. **Update import paths** - Use category in all imports and exports
6. **Match registry category** - Ensure category field matches directory
7. **Update tests** - Place in `__tests__/` within category directory
8. **Test Section props** - Add validation for new Section-based props

## [0.0.2] - 2025-12-22

### Added

- Initial release of @opensite/ui component library
- Core UI components: Container, Section, Button, Card, Badge
- AnimatedDialog component with framer-motion animations
- PageHeroBanner component with image/video background support
- AlternatingBlocks component for content sections
- Block registry for AI-driven component selection
- Comprehensive TypeScript types
- Full test coverage with Vitest
- Tailwind CSS v4 support
- Tree-shakable exports

## [0.0.1] - 2025-12-23

### Added

- Initial project setup
- Basic component structure
- TypeScript configuration
- Build system with tsup
- Testing framework setup
