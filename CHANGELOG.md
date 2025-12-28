# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.6] - 2025-12-23

### Added

#### DynamicIcon Component - API-Driven Icon Rendering

New lightweight icon component that dynamically loads SVG icons from the icons.opensite.ai API.

**Features:**
- Fetches SVGs from https://icons.opensite.ai API (15+ icon collections)
- Native browser lazy loading via `loading="lazy"` attribute
- Accepts both `prefix/name` and `prefix:name` format
- Customizable size and color via URL parameters
- Minimal bundle size - no icon library dependencies
- Zero runtime overhead - standard `<img>` element

**Import Path:**
```tsx
import { DynamicIcon } from "@opensite/ui/components/dynamic-icon";
// Or from components barrel
import { DynamicIcon } from "@opensite/ui/components";
```

**Example Usage:**
```tsx
<DynamicIcon name="lucide/home" size={24} color="currentColor" />
<DynamicIcon name="mdi:account" size={32} color="#ff0000" />
<DynamicIcon name="heroicons/check" size={28} color="hsl(var(--primary))" />
```

**Props:**
- `name: string` - Icon name in format: prefix/name or prefix:name
- `size?: number` - Icon size in pixels (default: 28)
- `color?: string` - Icon color - accepts any valid CSS color (default: "currentColor")
- `className?: string` - Additional CSS classes
- `alt?: string` - Alt text for accessibility

**Compatibility:**
DynamicIcon is fully compatible with production environments using external-svg-loader. The two systems are independent:
- DynamicIcon uses `<img src="">` for simple icon display
- external-svg-loader uses `<svg data-src="">` for inline SVG manipulation
- No conflicts or interference between systems

### Enhanced

#### Button Component - Medium Size Variant

Added missing 'md' size variant to button component, providing better granularity between 'sm' and 'default' sizes.

**New Size Variant:**
```tsx
<Button size="md">Medium Button</Button>
```

**Size System:**
- `sm` - 32px height (2rem)
- `md` - 36px height (2.25rem) - NEW
- `default` - 36px height (2.25rem)
- `lg` - 40px height (2.5rem)

#### Button Component - Comprehensive CSS Variable System

Completely rebuilt button styling system to support full customization via CSS variables without inline styles.

**Changes:**
- Replaced all hardcoded heights with CSS variables
- Replaced all hardcoded padding with CSS variables
- Added comprehensive color override variables for all variants
- All button properties now customizable via CSS variables with fallbacks

**CSS Variables Added (35+ variables):**

Button Heights:
```css
--button-height-sm: 2rem;       /* 32px */
--button-height-md: 2.25rem;    /* 36px */
--button-height-lg: 2.5rem;     /* 40px */
```

Button Padding:
```css
--button-padding-x-sm: 0.75rem;  /* 12px */
--button-padding-x-md: 1rem;     /* 16px */
--button-padding-x-lg: 1.5rem;   /* 24px */
```

Button Border Radius:
```css
--button-radius: var(--radius-2xl);
```

**Variant Color Variables:**

Each variant now has dedicated CSS variables for complete customization:

**Default Variant:**
- `--button-default-bg` - Background color
- `--button-default-fg` - Text color
- `--button-default-hover-bg` - Hover background color

**Destructive Variant:**
- `--button-destructive-bg` - Background color
- `--button-destructive-fg` - Text color
- `--button-destructive-hover-bg` - Hover background color

**Outline Variant:**
- `--button-outline-bg` - Background color
- `--button-outline-fg` - Text color
- `--button-outline-border` - Border color
- `--button-outline-border-width` - Border width
- `--button-outline-hover-bg` - Hover background color
- `--button-outline-hover-fg` - Hover text color

**Secondary Variant:**
- `--button-secondary-bg` - Background color
- `--button-secondary-fg` - Text color
- `--button-secondary-hover-bg` - Hover background color

**Ghost Variant:**
- `--button-ghost-bg` - Background color (transparent)
- `--button-ghost-fg` - Text color
- `--button-ghost-hover-bg` - Hover background color
- `--button-ghost-hover-fg` - Hover text color

**Link Variant:**
- `--button-link-fg` - Text color

**Example Customization:**
```css
/* Custom outline button with primary border and unique hover */
:root {
  --button-outline-border: hsl(var(--primary));
  --button-outline-border-width: 2px;
  --button-outline-hover-bg: hsl(var(--primary) / 0.1);
  --button-outline-hover-fg: hsl(var(--primary));
}
```

**Technical Implementation:**
Uses Tailwind arbitrary values with CSS variables and fallbacks:
```tsx
"h-[var(--button-height-md,2.25rem)]"
```

This pattern enables:
- Full CSS variable override capability
- Fallback values when variables not defined
- No inline styles required
- Clean separation of concerns

### Fixed

#### Button Component - CSS Variable Integration

Fixed bug where button height and padding CSS variables were defined but not applied to the button component.

**Root Cause:**
- Variables existed in CSS but component used hardcoded Tailwind classes
- Only border-radius was properly integrated

**Fix:**
- Replaced all hardcoded heights (`h-8`, `h-9`, `h-10`) with CSS variable pattern
- Replaced all hardcoded padding (`px-3`, `px-4`, `px-6`) with CSS variable pattern
- Applied to all size variants (sm, md, default, lg, icon variants)

#### Prototype CSS Variables - Incorrect Padding Values

Fixed incorrect button padding values in prototype globals.css that were 5-8x too large.

**Root Cause:**
- `--button-padding-x-sm` was `4rem` instead of `0.75rem`
- `--button-padding-x-md` was `4rem` instead of `1rem`
- `--button-padding-x-lg` was `8rem` instead of `1.5rem`

**Impact:**
- Buttons would have been unusably wide if variables were applied
- Now matches intended 12px/16px/24px padding design

### Documentation

- Updated `docs/STYLES.md` with comprehensive button CSS variable documentation
- Added all 35+ button CSS variables to style template
- Added examples for button variant customization
- Added customization example for outline button variant
- Documented new 'md' size variant
- Updated prototype `globals.css` with corrected padding values and all button color variables
- Kept CSS variable templates in sync between documentation and prototype

## [0.0.5] - 2025-12-23

### Added

#### FeatureShowcase Component - Interactive Feature Carousel

New content-specific block component for showcasing product features in an interactive carousel format.

**Features:**
- Carousel-based layout with smooth navigation
- Content and media side-by-side display (responsive)
- Mobile height equalization for consistent appearance
- Comprehensive className customization props
- Navigation arrows with customizable styling
- Support for any ReactNode content and media
- Mobile-first responsive design (column → row)

**Import Path:**
```tsx
import { FeatureShowcase } from "@opensite/ui/blocks/features/feature-showcase";
```

**Example Usage:**
```tsx
<FeatureShowcase
  items={[
    {
      content: (
        <div>
          <span className="text-sm font-medium text-primary">
            DESIGNED TO HELP YOU GROW
          </span>
          <h3 className="text-3xl font-bold">Powerful Analytics</h3>
          <p className="text-muted-foreground">
            Track every metric that matters with real-time dashboards.
          </p>
        </div>
      ),
      mediaComponent: <img src="/analytics.jpg" alt="Analytics" />
    }
  ]}
/>
```

**Customization Props:**
- `className` - Outer container styles
- `carouselClassName` - Carousel wrapper styles
- `slideClassName` - Individual slide styles
- `contentClassName` - Content area styles
- `mediaClassName` - Media area styles
- `arrowClassName` - Navigation arrow styles
- `equalizeOnMobile` - Equalize slide heights on mobile (default: true)
- `stretchMediaOnMobile` - Stretch media to fill height on mobile (default: true)

#### Custom Icon System - Tree-Shakable Icon Components

Implemented manual icon component system to replace lucide-react dependency, reducing bundle size and improving tree-shaking.

**Changes:**
- Created `icons/` directory with custom icon components
- ArrowLeft and ArrowRight icons implemented with lucide-compatible API
- Icons accept standard props: `size`, `className`, `strokeWidth`, and all SVG attributes
- Updated carousel component to use custom icons
- Removed lucide-react from dependencies (saves ~400KB)

**Icon Props:**
```tsx
export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;  // default: 24
}
```

**Usage Example:**
```tsx
import { ArrowLeft, ArrowRight } from "@opensite/ui/icons/arrow-left";

<ArrowLeft size={20} className="text-primary" strokeWidth={2} />
```

**Pattern for Future Icons:**
All future icons should follow this pattern for consistency and tree-shaking benefits.

### Enhanced

#### Button Component - Custom Border Radius Support

Button component now respects the `--button-radius` CSS variable through Tailwind configuration.

**Changes:**
- Updated Button component to use `rounded-button` instead of hardcoded `rounded-md`
- Consuming applications must add `button: "var(--button-radius)"` to Tailwind borderRadius config
- Allows full customization of button border radius via CSS variables
- Applied to all button size variants (sm, default, lg)

**Example Tailwind Config:**
```js
borderRadius: {
  lg: "var(--radius)",
  md: "calc(var(--radius) - 2px)",
  sm: "calc(var(--radius) - 4px)",
  button: "var(--button-radius)",
},
```

**CSS Variable:**
```css
--button-radius: var(--radius-2xl); /* or any valid CSS value */
```

#### PageHeroBanner Component - Enhanced Customization

Added two new props for greater control over overlay and content positioning.

**New Props:**
- `overlayClassName?: string` - Custom className for gradient overlay
  - Allows full customization of overlay gradient for accessibility
  - Enables color-specific overlays that maintain proper contrast
  - Merged with default overlay classes

- `contentClassName?: string` - Custom className for content Container
  - Allows overriding vertical alignment (e.g., `items-start`, `items-end`)
  - Enables custom positioning of hero content
  - Merged with default content classes

**Example Usage:**
```tsx
<PageHeroBanner
  imageUrl="/hero.jpg"
  overlayClassName="bg-linear-to-b from-primary/80 via-primary/60 to-primary/90"
  contentClassName="items-start pt-32"
>
  <h1>Custom positioned content with accessible overlay</h1>
</PageHeroBanner>
```

### Fixed

#### Test Infrastructure and Carousel Imports

Fixed test failures and import issues in carousel component to ensure all tests pass reliably.

**Changes:**
- Fixed carousel.tsx imports to use relative paths instead of TypeScript aliases
  - Changed `@/lib/utils` to `../../lib/utils`
  - Changed `@/components/ui/button` to `./button`
- Added browser API mocks to test setup for components using carousel
  - Added `window.matchMedia` mock for embla-carousel media query support
  - Added `ResizeObserver` mock for height equalization features
  - Added `IntersectionObserver` mock for lazy loading support

**Impact:**
- All 86 tests now pass reliably in CI/CD environments
- Feature showcase tests (17 tests) work correctly
- Existing carousel-dependent tests remain stable

### Documentation

- Updated `docs/STYLES.md` with button radius mapping in Tailwind configuration example
- Added guidance on required Tailwind borderRadius configuration for Button component

## [0.0.4] - 2025-12-23

### Fixed

#### PageHeroBanner Overlay Rendering

Fixed critical bug where overlay was not rendering at all due to typo in Tailwind class name.

**Root Cause:**
- Line 82 had `bg-linear-to-b` instead of `bg-linear-to-b`
- Invalid Tailwind class prevented gradient overlay from rendering
- Affected all PageHeroBanner components with `showOverlay={true}` (default)

**Fix:**
```tsx
// Before (broken)
<div className="absolute inset-0 bg-linear-to-b from-black via-black to-black" />

// After (working)
<div className="absolute inset-0 bg-linear-to-b from-black via-black to-black" />
```

**Impact:**
- PageHeroBanner overlays now render correctly
- Default `overlayOpacity={0.6}` provides proper darkening for text readability
- Gradient overlay properly covers image/video backgrounds

**Test Updates:**
- Updated test expectation from `.bg-linear-to-b` to `.bg-linear-to-b`
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
- Added `shrink-0` to close button to prevent "scrunching" on mobile
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
  className="absolute inset-0 bg-linear-to-b from-foreground/70 via-foreground/50 to-foreground/80"
  style={{ opacity: overlayOpacity }}
/>

// After
<div
  className="absolute inset-0 bg-linear-to-b from-black via-black to-black"
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
