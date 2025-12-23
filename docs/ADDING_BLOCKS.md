# Adding Content-Specific Blocks to @opensite/ui

This guide explains how to add new content-specific blocks (like shadcn blocks, backgrounds, text blocks, etc.) to the @opensite/ui library. The AlternatingBlocks component serves as a reference implementation.

## Overview

Content-specific blocks are pre-configured, reusable UI components that represent common design patterns (hero sections, feature grids, testimonials, CTAs, etc.). They differ from foundational components (Container, Section) by being more opinionated and content-focused.

## Quick Reference: AlternatingBlocks Implementation

The AlternatingBlocks component demonstrates the complete pattern:

1. **Component File**: `components/blocks/about/alternating-blocks.tsx`
2. **Individual Export**: `src/alternating-blocks.ts`
3. **Registry Entry**: `src/registry/blocks.ts`
4. **Types**: `src/types/index.ts`
5. **Tests**: `components/blocks/about/__tests__/alternating-blocks.test.tsx`
6. **Package Exports**: `package.json` exports map
7. **Build Config**: `tsup.config.ts` entry
8. **Grouped Export**: `src/components.ts`
9. **Documentation**: `README.md` component section

**Note:** Blocks are now organized by category to support hundreds of blocks and improve AI-driven component selection.

## Step-by-Step Guide

### Step 1: Create the Component

**First, choose the appropriate category** from the available options (see Category Guidelines below):
- `about`, `features`, `cta`, `testimonials`, `services`, `hero`, `footer`, `header`, `pricing`, `team`, `stats`, `faq`, `contact`, `gallery`, `timeline`, `process`, `benefits`, `comparison`

Create your component file in `components/blocks/[category]/[component-name].tsx`:

```tsx
import * as React from "react";
import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface YourBlockProps {
  // Define your props
  children?: React.ReactNode;
  /**
   * Section title (optional)
   */
  title?: string;
  /**
   * Section subtitle/eyebrow (optional)
   */
  subtitle?: string;
  /**
   * Background style variant
   * @default "white"
   */
  background?: SectionBackground;
  /**
   * Vertical spacing variant
   * @default "lg"
   */
  spacing?: SectionSpacing;
  /**
   * Additional CSS classes for the Section wrapper
   */
  className?: string;
}

/**
 * YourBlock component description
 *
 * @example
 * ```tsx
 * <YourBlock
 *   title="Section Title"
 *   subtitle="Eyebrow Text"
 *   background="gray"
 *   spacing="xl"
 * >
 *   Content
 * </YourBlock>
 * ```
 */
export function YourBlock({
  children,
  title,
  subtitle,
  background = "white",
  spacing = "lg",
  className
}: YourBlockProps) {
  return (
    <Section
      title={title}
      subtitle={subtitle}
      background={background}
      spacing={spacing}
      className={className}
    >
      <div className="your-content-wrapper-classes">
        {children}
      </div>
    </Section>
  );
}
```

**Key Principles:**
- **Use the Section component** - Wrap content in Section for consistent spacing, backgrounds, and titles
- **Organize by category** - Place components in the appropriate category directory
- Make components **fully reusable** - accept props instead of hard-coding data
- Use **ReactNode** for flexible content slots (content, media, headers, footers)
- Accept **className** prop for customization
- Use **cn()** utility for class merging
- Add **JSDoc comments** with examples
- Export both component and props interface

### Step 2: Add TypeScript Types

Add your component's types to `src/types/index.ts`:

```tsx
/**
 * Props for YourBlock component
 */
export interface YourBlockProps {
  /**
   * Description of the prop
   */
  children?: ReactNode;
  className?: string;
}
```

### Step 3: Create Individual Export File

Create `src/[component-name].ts` for tree-shakable imports:

```tsx
/**
 * YourBlock - Individual export for tree-shaking
 *
 * @example
 * ```ts
 * import { YourBlock } from "@opensite/ui/blocks/[category]/your-block";
 * ```
 */

export { YourBlock } from "../components/blocks/[category]/your-block";
export type { YourBlockProps } from "../components/blocks/[category]/your-block";
```

Replace `[category]` with your chosen category (e.g., `features`, `about`, `cta`).

### Step 4: Register in Block Registry

Add your block to `src/registry/blocks.ts`:

```tsx
import { YourBlock } from "../../components/blocks/[category]/your-block";
import type { YourBlockProps } from "../../components/blocks/[category]/your-block";

export const BLOCK_REGISTRY: Record<string, BlockRegistryEntry> = {
  // ... existing blocks

  "your-block": {
    id: "your-block",
    name: "Your Block Display Name",
    description: "Clear description of what this block does and when to use it. Include use cases.",
    semanticTags: [
      "tag1",
      "tag2",
      "semantic-concept",
      "layout-type",
    ],
    category: "features", // MUST match the directory category where component is located
    component: YourBlock,
    props: "YourBlockProps",
    exampleUsage: `
<YourBlock
  title="Optional Title"
  subtitle="Optional Eyebrow"
  background="gray"
  spacing="lg"
  prop1="value1"
  prop2="value2"
>
  Content here
</YourBlock>
    `.trim(),
  },
};
```

**Important:** The `category` field must match the directory where your component is located.

**Semantic Tags Best Practices:**
- Include **functional tags** (what it does): "showcase", "grid", "list"
- Include **content tags** (what it contains): "features", "testimonials", "team"
- Include **layout tags** (how it's structured): "two-column", "alternating", "stacked"
- Include **use-case tags** (when to use it): "about", "services", "hero"
- Be generous with tags - they help AI selection

**Category Guidelines:**
- `about` - Company story, mission, history
- `features` - Product/service features, benefits
- `cta` - Call-to-action sections
- `testimonials` - Customer reviews, social proof
- `services` - Service offerings, packages
- `hero` - Hero/banner sections
- `footer` - Footer content
- `header` - Header/navigation content
- `pricing` - Pricing tables, plans
- `team` - Team member profiles
- `stats` - Statistics, metrics
- `faq` - Frequently asked questions
- `contact` - Contact forms, info
- `gallery` - Image/video galleries
- `timeline` - Event timelines
- `process` - Process/workflow steps
- `benefits` - Benefit lists
- `comparison` - Comparison tables

### Step 5: Add to Grouped Export

Add to `src/components.ts` for convenience imports:

```tsx
// Content-specific blocks
export { AlternatingBlocks } from "../components/blocks/about/alternating-blocks";
export { YourBlock } from "../components/blocks/[category]/your-block"; // Add this with your category

// Re-export types for convenience
export type {
  // ... existing types
  AlternatingBlocksProps,
  AlternatingBlockSection,
  YourBlockProps, // Add this
} from "./types/index";
```

### Step 6: Update package.json Exports

Add export path to `package.json` **with category in the path**:

```json
{
  "exports": {
    // ... existing exports
    "./blocks/[category]/your-block": {
      "types": "./dist/your-block.d.ts",
      "import": "./dist/your-block.js",
      "require": "./dist/your-block.cjs"
    }
  }
}
```

This allows consumers to import using:
```ts
import { YourBlock } from "@opensite/ui/blocks/[category]/your-block";
```

### Step 7: Update Build Configuration

Add entry to `tsup.config.ts`:

```ts
export default defineConfig({
  entry: {
    // ... existing entries
    "your-block": "src/your-block.ts",
  },
  // ... rest of config
});
```

### Step 8: Create Tests

Create test file at `components/blocks/[category]/__tests__/your-block.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { YourBlock } from "../your-block";

describe("YourBlock", () => {
  it("renders children correctly", () => {
    render(<YourBlock>Test Content</YourBlock>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies custom className to Section wrapper", () => {
    const { container } = render(<YourBlock className="custom">Test</YourBlock>);
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("custom");
  });

  it("renders with title prop", () => {
    render(<YourBlock title="Test Title">Content</YourBlock>);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders with subtitle prop", () => {
    render(<YourBlock subtitle="Test Subtitle">Content</YourBlock>);
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
  });

  it("applies custom background variant", () => {
    const { container } = render(<YourBlock background="gray">Content</YourBlock>);
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("bg-muted/30");
  });

  it("applies custom spacing variant", () => {
    const { container } = render(<YourBlock spacing="xl">Content</YourBlock>);
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("py-20");
  });

  // Add more tests for specific functionality
});
```

**Note:** Tests should be placed in the `__tests__/` subdirectory within the category folder.

### Step 9: Update Documentation

Add component documentation to `README.md`:

```markdown
#### YourBlock

Brief description of what the block does. Located in the `[category]` category.

\`\`\`tsx
import { YourBlock } from "@opensite/ui/blocks/[category]/your-block";

<YourBlock
  title="Optional Title"
  subtitle="Optional Eyebrow"
  background="gray"
  spacing="lg"
  prop1="value"
>
  Content here
</YourBlock>
\`\`\`

**Props:**
- `title?: string` - Section title (optional)
- `subtitle?: string` - Section subtitle/eyebrow (optional)
- `background?: SectionBackground` - Background variant ("white" | "gray" | "accent", default: "white")
- `spacing?: SectionSpacing` - Vertical spacing ("none" | "sm" | "md" | "lg" | "xl", default: "lg")
- `prop1: string` - Description of your custom prop
- `className?: string` - Additional CSS classes for Section wrapper
```

### Step 10: Build and Test

```bash
# Build the library
pnpm build

# Run tests
pnpm test

# Type check
pnpm type-check

# Validate exports (if validation script exists)
node validate-exports.mjs
```

## Converting shadcn Blocks

When converting blocks from shadcn.io or similar libraries:

### 1. Identify Hard-Coded Data

**Before (shadcn example):**
```tsx
const SECTIONS = [
  {
    label: "The Origin",
    title: "It started with frustration",
    description: "We spent years...",
    icon: Lightbulb,
  },
];

export default function AboutAlternating() {
  return (
    <section>
      {SECTIONS.map((section) => (
        <div key={section.label}>
          <h3>{section.title}</h3>
          <p>{section.description}</p>
        </div>
      ))}
    </section>
  );
}
```

### 2. Abstract to Props

**After (reusable):**
```tsx
export interface AboutAlternatingProps {
  sections: {
    content: React.ReactNode;
    media: React.ReactNode;
    mediaLeft?: boolean;
  }[];
}

export function AboutAlternating({ sections }: AboutAlternatingProps) {
  return (
    <section>
      {sections.map((section, index) => (
        <div key={index}>
          {section.content}
          {section.media}
        </div>
      ))}
    </section>
  );
}
```

### 3. Use ReactNode for Maximum Flexibility

Instead of specific types like `string`, `IconType`, or `ImageProps`, use `ReactNode`:

```tsx
// ❌ Too specific
interface Props {
  title: string;
  image: { src: string; alt: string };
  icon: IconType;
}

// ✅ Flexible
interface Props {
  content: ReactNode;  // Can be text, headings, buttons, etc.
  media: ReactNode;    // Can be images, videos, icons, etc.
}
```

### 4. Preserve Layout Logic

Keep the visual structure and styling from the original, just make the content dynamic:

```tsx
// Keep the grid, spacing, and responsive behavior
<div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
  <div className={mediaLeft ? "md:order-2" : ""}>
    {content} {/* Dynamic content */}
  </div>
  <div className={mediaLeft ? "md:order-1" : ""}>
    {media} {/* Dynamic media */}
  </div>
</div>
```

## Semantic Tagging Strategy

Good semantic tags help the AI select appropriate blocks. Use this hierarchy:

### Primary Tags (Required)
- **Category**: Main classification (features, testimonials, hero, etc.)
- **Content Type**: What content it displays (text, images, stats, etc.)

### Secondary Tags (Recommended)
- **Layout**: How it's arranged (grid, list, alternating, stacked)
- **Functionality**: What it does (showcase, compare, highlight)

### Contextual Tags (Optional)
- **Use Cases**: When to use it (landing-page, about-page, product-page)
- **Industry**: Specific verticals (saas, ecommerce, services)
- **Style**: Visual approach (minimal, bold, elegant)

### Example Tag Sets

**Feature Grid Block:**
```typescript
semanticTags: [
  // Primary
  "features", "benefits",
  // Secondary
  "grid", "three-column", "icon-based",
  // Contextual
  "landing-page", "saas", "product-showcase"
]
```

**Testimonial Carousel:**
```typescript
semanticTags: [
  // Primary
  "testimonials", "reviews", "social-proof",
  // Secondary
  "carousel", "slider", "cards",
  // Contextual
  "trust-building", "conversion-optimization"
]
```

## File Naming Conventions

- **Component files**: `components/blocks/[category]/kebab-case.tsx` (e.g., `components/blocks/about/alternating-blocks.tsx`)
- **Test files**: `components/blocks/[category]/__tests__/[component-name].test.tsx` (e.g., `components/blocks/about/__tests__/alternating-blocks.test.tsx`)
- **Export files**: `src/kebab-case.ts` (e.g., `src/alternating-blocks.ts`)
- **Package exports**: Include category in path (e.g., `./blocks/about/alternating-blocks`)

**Category Directory Structure:**
```
components/blocks/
├── about/
│   ├── __tests__/
│   │   └── alternating-blocks.test.tsx
│   └── alternating-blocks.tsx
├── features/
│   ├── __tests__/
│   │   └── feature-grid.test.tsx
│   └── feature-grid.tsx
├── cta/
├── testimonials/
... (and 14 more categories)
```

## Common Patterns

### Pattern 1: Content + Media Layout

```tsx
interface Props {
  content: ReactNode;
  media: ReactNode;
  layout?: "left" | "right" | "top" | "bottom";
}
```

### Pattern 2: Grid of Items

```tsx
interface Props {
  items: Array<{
    content: ReactNode;
    icon?: ReactNode;
  }>;
  columns?: 2 | 3 | 4;
}
```

### Pattern 3: Header + Body + Footer

```tsx
interface Props {
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}
```

### Pattern 4: Sections Array

```tsx
interface Props {
  sections: Array<{
    content: ReactNode;
    // Additional section-specific props
  }>;
}
```

## Checklist

Use this checklist for each new block:

- [ ] **Category selected** from the 18 available categories
- [ ] Component created in `components/blocks/[category]/[name].tsx`
- [ ] **Component uses Section wrapper** for consistent spacing and backgrounds
- [ ] Props interface exposes Section props (title, subtitle, background, spacing)
- [ ] Props interface uses ReactNode for content slots
- [ ] Component has JSDoc comments with examples
- [ ] Types added to `src/types/index.ts`
- [ ] Individual export created in `src/[name].ts` with category path
- [ ] Registry entry added with semantic tags (**category must match directory**)
- [ ] Added to grouped export in `src/components.ts` with category path
- [ ] Package.json export added **with category in path**
- [ ] tsup.config.ts entry added
- [ ] Tests created in `components/blocks/[category]/__tests__/[name].test.tsx`
- [ ] Tests include Section prop validations
- [ ] README.md updated with documentation and category-based import path
- [ ] Build passes (`pnpm build`)
- [ ] Tests pass (`pnpm test`)
- [ ] Types valid (`pnpm type-check`)

## Tips for Large-Scale Block Addition

When adding hundreds of blocks:

1. **Work in batches** - Group similar blocks (all hero variants, all feature grids, etc.)
2. **Create templates** - Use the AlternatingBlocks implementation as a template
3. **Automate where possible** - Consider scripts for repetitive tasks (exports, tests)
4. **Test incrementally** - Build and test after each batch
5. **Document as you go** - Update README for each batch
6. **Use semantic versioning** - Increment version for each batch of blocks added

## Example: Adding a Feature Grid Block

Here's a complete example of adding a feature grid block in the `features` category:

### 1. Component (`components/blocks/features/feature-grid.tsx`)

```tsx
import * as React from "react";
import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface FeatureGridItem {
  icon?: React.ReactNode;
  content: React.ReactNode;
}

export interface FeatureGridProps {
  items: FeatureGridItem[];
  columns?: 2 | 3 | 4;
  /**
   * Section title (optional)
   */
  title?: string;
  /**
   * Section subtitle/eyebrow (optional)
   */
  subtitle?: string;
  /**
   * Background style variant
   * @default "white"
   */
  background?: SectionBackground;
  /**
   * Vertical spacing variant
   * @default "lg"
   */
  spacing?: SectionSpacing;
  /**
   * Additional CSS classes for Section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for grid container
   */
  contentClassName?: string;
}

/**
 * FeatureGrid displays a grid of features with optional icons
 *
 * @example
 * ```tsx
 * <FeatureGrid
 *   title="Our Features"
 *   subtitle="What We Offer"
 *   background="gray"
 *   columns={3}
 *   items={[
 *     {
 *       icon: <Icon />,
 *       content: <div><h3>Feature</h3><p>Description</p></div>
 *     }
 *   ]}
 * />
 * ```
 */
export function FeatureGrid({
  items,
  columns = 3,
  title,
  subtitle,
  background = "white",
  spacing = "lg",
  className,
  contentClassName,
}: FeatureGridProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  };

  return (
    <Section
      title={title}
      subtitle={subtitle}
      background={background}
      spacing={spacing}
      className={className}
    >
      <div className={cn("grid gap-8", gridCols[columns], contentClassName)}>
        {items.map((item, index) => (
          <div key={index} className="flex flex-col gap-3">
            {item.icon && <div className="shrink-0">{item.icon}</div>}
            <div>{item.content}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
```

### 2. Types (`src/types/index.ts`)

```tsx
export interface FeatureGridItem {
  icon?: ReactNode;
  content: ReactNode;
}

export interface FeatureGridProps {
  items: FeatureGridItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}
```

### 3. Individual Export (`src/feature-grid.ts`)

```tsx
export { FeatureGrid } from "../components/blocks/features/feature-grid";
export type { FeatureGridProps, FeatureGridItem } from "../components/blocks/features/feature-grid";
```

### 4. Registry Entry (`src/registry/blocks.ts`)

```tsx
import { FeatureGrid } from "../../components/blocks/features/feature-grid";
import type { FeatureGridProps } from "../../components/blocks/features/feature-grid";

"feature-grid": {
  id: "feature-grid",
  name: "Feature Grid",
  description: "Display features in a responsive grid layout with optional icons. Perfect for showcasing product features, service offerings, or key benefits.",
  semanticTags: [
    "features",
    "benefits",
    "services",
    "grid",
    "three-column",
    "icon-based",
    "landing-page",
  ],
  category: "features", // Matches directory location
  component: FeatureGrid,
  props: "FeatureGridProps",
  exampleUsage: `
<FeatureGrid
  title="Our Features"
  subtitle="What We Offer"
  background="white"
  spacing="lg"
  columns={3}
  items={[
    {
      icon: <CheckIcon className="h-6 w-6 text-primary" />,
      content: (
        <div>
          <h3 className="font-semibold mb-2">Fast Performance</h3>
          <p className="text-muted-foreground">Lightning-fast load times</p>
        </div>
      )
    }
  ]}
/>
  `.trim(),
},
```

### 5. Tests (`components/blocks/features/__tests__/feature-grid.test.tsx`)

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureGrid } from "../feature-grid";

describe("FeatureGrid", () => {
  it("renders all items", () => {
    const items = [
      { content: <div>Feature 1</div> },
      { content: <div>Feature 2</div> },
    ];
    render(<FeatureGrid items={items} />);
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
    expect(screen.getByText("Feature 2")).toBeInTheDocument();
  });

  it("applies correct column classes", () => {
    const items = [{ content: <div>Test</div> }];
    const { container } = render(<FeatureGrid items={items} columns={3} />);
    const grid = container.querySelector(".grid");
    expect(grid?.className).toContain("md:grid-cols-3");
  });

  it("renders with title prop", () => {
    const items = [{ content: <div>Test</div> }];
    render(<FeatureGrid items={items} title="Features" />);
    expect(screen.getByText("Features")).toBeInTheDocument();
  });

  it("applies custom background", () => {
    const items = [{ content: <div>Test</div> }];
    const { container } = render(<FeatureGrid items={items} background="gray" />);
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("bg-muted/30");
  });
});
```

Then complete steps 6-10 from the main guide (package.json export, tsup config, documentation, build & test).

## Questions?

See the AlternatingBlocks implementation as the reference:
- Component: `components/blocks/about/alternating-blocks.tsx`
- Tests: `components/blocks/about/__tests__/alternating-blocks.test.tsx`
- Registry: `src/registry/blocks.ts`
- Export: `src/alternating-blocks.ts`
