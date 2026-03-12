# @opensite/ui

## Foundational UI component library for the [OpenSite Semantic Site Builder](https://opensite.ai) ecosystem. Provides tree-shakable, performance-optimized components with abstract styling support.

![Opensite Semantic UI](https://octane.cdn.ing/api/v1/images/transform?url=https://cdn.ing/assets/i/r/285962/rjrtx8dtbh6y34ae0h9li9v0xfw9/banner-short.png&f=webp)

<br />

[![npm version](https://img.shields.io/npm/v/@opensite/ui?style=for-the-badge)](https://www.npmjs.com/package/@opensite/ui)
[![npm downloads](https://img.shields.io/npm/dm/@opensite/ui?style=for-the-badge)](https://www.npmjs.com/package/@opensite/ui)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge)](./tsconfig.json)
[![Tree-Shakeable](https://img.shields.io/badge/Tree%20Shakeable-Yes-brightgreen?style=for-the-badge)](#tree-shaking)


## Features

- 🎨 **Abstract Styling**: Components use CSS variables for full theme customization
- 📦 **Tree-Shakable**: Granular imports for optimal bundle sizes
- ⚡ **Performance First**: Optimized for Core Web Vitals (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1)
- 🎯 **TypeScript**: Full type safety with strict mode
- 🧩 **shadcn/ui Compatible**: Built on shadcn/ui foundations with Tailwind CSS v4
- 🔧 **Flexible**: Support for both default Tailwind styles and custom semantic builder styles


## OpenSite Component UI Showcase

> Below you can see the wide range of layouts that are available automatically, enabling a modern UI experience for users. And since the component was specifically engineered for our Semantic UI engine, in addition to the default layout and style variants.

<p>
  <br />
  <div align="center">
    <img src="https://github.com/user-attachments/assets/ea33b462-1970-4485-908a-e7ac9a7aa1b8" alt="ShadCN and Tailwind Lightbox Library" width="100%">
  </div>
  <br />
</p>
<br />
<p></p>


## Installation

```bash
pnpm add @opensite/ui
# or
npm install @opensite/ui
```

### Peer Dependencies

This library requires React 16.8.0 or higher:

```bash
pnpm add react react-dom
```

## Setup Requirements

### 1. Tailwind CSS Configuration

**CRITICAL**: Add both `@opensite/ui` and `@page-speed/pressable` to your Tailwind content paths:

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Add these lines to scan component classes:
    "./node_modules/@opensite/ui/dist/**/*.{js,mjs}",
    "./node_modules/@page-speed/pressable/dist/**/*.{js,mjs}",
  ],
  // ...rest of config
};
```

Without this, button styles from Pressable and other components won't be applied.

### 2. Router Setup (For Pressable Navigation)

The `Pressable` component (used for links/buttons) requires `RouterProvider` from `@page-speed/router`.

**For Next.js App Router** (requires client component wrapper):

```tsx
// components/providers/RouterWrapper.tsx
"use client";

import { RouterProvider } from "@page-speed/router";
import { ReactNode } from "react";

export function RouterWrapper({ children }: { children: ReactNode }) {
  return <RouterProvider>{children}</RouterProvider>;
}
```

```tsx
// app/layout.tsx
import { RouterWrapper } from "@/components/providers/RouterWrapper";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <RouterWrapper>
          {children}
        </RouterWrapper>
      </body>
    </html>
  );
}
```

**For standard React apps** (Create React App, Vite, etc.):

```tsx
// App.tsx
import { RouterProvider } from "@page-speed/router";

function App() {
  return (
    <RouterProvider>
      {/* your app */}
    </RouterProvider>
  );
}
```

Install the router package:

```bash
pnpm add @page-speed/router
```

## Usage

### Tree-Shakable Imports (Recommended)

For optimal bundle sizes, import components individually:

```tsx
// Import specific components
import { Container } from "@opensite/ui/components/container";
import { Section } from "@opensite/ui/components/section";

// Or import multiple from grouped export
import { Container, Section, Button } from "@opensite/ui/components";
```

### Full Import (Not Recommended)

```tsx
// Import all (larger bundle)
import * as UI from "@opensite/ui";
```

## Components

### Container

Layout container for consistent content width and centering.

```tsx
import { Container } from "@opensite/ui/components/container";

<Container maxWidth="xl">
  <h1>Page Content</h1>
</Container>
```

**Props:**

- `maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "full"` - Maximum width (default: "xl")
- `as?: keyof JSX.IntrinsicElements` - HTML element to render (default: "div")
- `className?: string` - Additional CSS classes
- All standard HTML attributes

### Section

Section wrapper with optional title, subtitle, and background variants.

```tsx
import { Section } from "@opensite/ui/components/section";

<Section
  id="features"
  title="Our Features"
  subtitle="What we offer"
  background="gradient"
  spacing="lg"
>
  <p>Section content here</p>
</Section>
```

**Props:**

- `id?: string` - Section ID for anchor links
- `title?: string` - Section title (renders as h2)
- `subtitle?: string` - Section subtitle/eyebrow
- `background?: "white" | "gray" | "dark" | "gradient" | "primary" | "secondary" | "muted"` (default: "white")
- `spacing?: "sm" | "md" | "lg" | "xl"` (default: "lg")
- `className?: string` - Additional CSS classes
- All standard HTML attributes

### AnimatedDialog

Animated modal dialog component using framer-motion with polished default styles.

```tsx
import { AnimatedDialog } from "@opensite/ui/components/animated-dialog";
import { useState } from "react";

function MyComponent() {
  const [open, setOpen] = useState(false);

  return (
    <AnimatedDialog
      open={open}
      onOpenChange={setOpen}
      title="Welcome"
      eyebrow="Hello"
      description="This is a modal dialog"
      size="lg"
      footer={
        <button onClick={() => setOpen(false)}>Close</button>
      }
    >
      <p>Dialog content here</p>
    </AnimatedDialog>
  );
}
```

**Props:**

- `open: boolean` - Whether the dialog is open (required)
- `onOpenChange: (open: boolean) => void` - Callback when dialog state changes (required)
- `title?: string` - Dialog title
- `eyebrow?: string` - Eyebrow text above title
- `description?: string` - Dialog description
- `header?: ReactNode` - Custom header (overrides title/eyebrow/description)
- `footer?: ReactNode` - Footer content
- `size?: "sm" | "md" | "lg" | "xl" | "full"` (default: "lg")
- `className?: string` - Additional CSS classes for container
- `contentClassName?: string` - Additional CSS classes for content area

**Default Styles:**

- Background uses theme background color for proper contrast
- Generous padding (p-6 on mobile, p-12 on desktop) for spacious feel
- Proper viewport spacing (my-12 on mobile, my-20 on desktop)
- Close button with circular background that maintains shape on all screen sizes
- Smooth framer-motion animations with backdrop blur

### PageHeroBanner

Hero banner component with image or video background support.

```tsx
import { PageHeroBanner } from "@opensite/ui/components/page-hero-banner";

<PageHeroBanner
  imageUrl="https://example.com/hero.jpg"
  alt="Hero banner"
  minHeight="600px"
  showOverlay={true}
  overlayOpacity={0.6}
  contentMaxWidth="4xl"
>
  <h1>Welcome to Our Site</h1>
  <p>Discover amazing content</p>
</PageHeroBanner>
```

**Props:**

- `imageUrl?: string` - Image URL or Media ID (either imageUrl or videoUrl required)
- `videoUrl?: string` - Video URL or Media ID (either imageUrl or videoUrl required)
- `alt?: string` - Alt text for image (default: "Hero banner")
- `loading?: "eager" | "lazy"` (default: "eager")
- `minHeight?: string` (default: "500px")
- `showOverlay?: boolean` (default: true)
- `overlayOpacity?: number` (default: 0.6)
- `contentMaxWidth?: ContainerMaxWidth` (default: "4xl")
- `className?: string` - Additional CSS classes
- All standard div attributes

### Button

Interactive button component with multiple variants and sizes.

```tsx
import { Button } from "@opensite/ui/components/button";

<Button variant="default" size="md">
  Click Me
</Button>
```

**Props:**

- `variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"` (default: "default")
- `size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"` (default: "default")
- `asChild?: boolean` - Render as child component using Radix Slot (default: false)
- All standard button attributes

### shadcn/ui Components

Additional components from shadcn/ui are available:

```tsx
import { Card, CardHeader, CardContent, CardFooter } from "@opensite/ui/components/card";
import { Badge } from "@opensite/ui/components/badge";
import { Popover, PopoverTrigger, PopoverContent } from "@opensite/ui/components/popover";
```

### Content-Specific Blocks

Pre-configured, reusable UI blocks for common content patterns.

#### AlternatingBlocks

Display content sections with alternating left/right media placement. Uses the Section component for consistent spacing, backgrounds, and optional titles. Located in the `about` category.

```tsx
import { AlternatingBlocks } from "@opensite/ui/blocks/about/alternating-blocks";

<AlternatingBlocks
  title="Our Journey"
  subtitle="About Us"
  background="gray"
  spacing="xl"
  sections={[
    {
      content: (
        <div>
          <h3 className="mb-3 text-2xl font-semibold">Our Story</h3>
          <p className="text-muted-foreground">Started in 2018...</p>
        </div>
      ),
      media: <img src="story.jpg" alt="Our story" />,
      mediaLeft: false
    },
    {
      content: <div>...</div>,
      media: <img src="mission.jpg" alt="Our mission" />,
      mediaLeft: true
    }
  ]}
/>
```

**Props:**

- `sections: AlternatingBlockSection[]` - Array of content sections (required)
  - `content: ReactNode` - Content to display (text, headings, etc.)
  - `media: ReactNode` - Media to display (image, video, icon, etc.)
  - `mediaLeft?: boolean` - Place media on left side (default: false)
- `title?: string` - Section title (optional)
- `subtitle?: string` - Section subtitle/eyebrow (optional)
- `background?: SectionBackground` - Background variant ("white" | "gray" | "accent", default: "white")
- `spacing?: SectionSpacing` - Vertical spacing ("none" | "sm" | "md" | "lg" | "xl", default: "lg")
- `className?: string` - Additional CSS classes for Section wrapper
- `contentClassName?: string` - Additional CSS classes for content container

**Note:** Blocks are now organized by category. Import path includes category: `@opensite/ui/blocks/[category]/[block-name]`

#### MediaHoverCtas

Two-column CTA grid that reveals background imagery or color on hover. Located in the `cta` category.

```tsx
import { MediaHoverCtas } from "@opensite/ui/blocks/cta/media-hover-ctas";

<MediaHoverCtas
  items={[
    {
      content: (
        <div>
          <h3 className="mb-3 text-xl font-semibold">Our Mission</h3>
          <p className="text-muted-foreground">Deliver remarkable experiences.</p>
        </div>
      ),
      onHoverImgSrc: "/images/mission.jpg",
      altText: "Our Mission"
    },
    {
      content: (
        <div>
          <h3 className="mb-3 text-xl font-semibold">Our Vision</h3>
          <p className="text-muted-foreground">Build the future of our industry.</p>
        </div>
      ),
      initialBackgroundColor: "var(--brand-100)",
      onHoverBackgroundColor: "var(--brand-900)"
    }
  ]}
/>
```

**Props:**

- `items?: MediaHoverCtaItem[]` - Array of CTA items (default: [])
  - `content?: ReactNode` - Content to render inside the card
  - `onHoverImgSrc?: string` - Image URL to reveal on hover
  - `imgHoverClassName?: string` - Additional classes for hover image
  - `altText?: string` - Alt text for hover image (leave empty for decorative)
  - `cardHref?: string` - Optional href to make the card a link
  - `initialBackgroundColor?: string` - CSS color value or variable for base background
  - `onHoverBackgroundColor?: string` - CSS color value or variable for hover background (ignored when hover image is used)
- `sectionClassName?: string` - Additional classes for section wrapper
- `gridClassName?: string` - Additional classes for grid container
- `optixFlowConfig?: { apiKey: string; compression?: number }` - Optional Optix Flow config for `@page-speed/img`

### Block Registry

Semantic registry for AI-driven component selection. Maps semantic concepts to available UI blocks.

```tsx
import {
  BLOCK_REGISTRY,
  getBlocksBySemanticTag,
  getBlocksByCategory,
  searchBlocks
} from "@opensite/ui/registry";

// Get blocks by semantic tag
const aboutBlocks = getBlocksBySemanticTag("about");

// Get blocks by category
const featureBlocks = getBlocksByCategory("features");

// Search blocks
const results = searchBlocks("alternating");
```

**Available Functions:**

- `getBlocksBySemanticTag(tag: string)` - Find blocks matching semantic tag
- `getBlocksByCategory(category: BlockCategory)` - Find blocks in category
- `getBlockById(id: string)` - Get specific block by ID
- `getAllBlocks()` - Get all registered blocks
- `getAllCategories()` - Get all available categories
- `searchBlocks(query: string)` - Search blocks by name/description/tags

**Block Categories:**

- about, features, cta, testimonials, services, hero, footer, header, pricing, team, stats, faq, contact, gallery, timeline, process, benefits, comparison

## Styling

For comprehensive styling documentation including all CSS variables, theming guides, and customization examples, see [STYLES.md](./docs/STYLES.md).

### CSS Variables

Components use CSS variables for theming. Define these in your global CSS:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  /* ... more variables */
}
```

### Tailwind CSS Configuration

Ensure your `tailwind.config.js` includes the library components:

```js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@opensite/ui/dist/**/*.{js,mjs}",
  ],
  theme: {
    extend: {
      // Your custom theme
    },
  },
};
```

### Custom Styling

Override component styles using the `className` prop:

```tsx
<Container className="bg-blue-500 text-white px-8">
  Custom styled container
</Container>
```

## TypeScript

Full TypeScript support with exported types:

```tsx
import type {
  ContainerProps,
  ContainerMaxWidth,
  SectionProps,
  SectionBackground,
  SectionSpacing,
  AnimatedDialogProps,
  PageHeroBannerProps,
  AlternatingBlocksProps,
  AlternatingBlockSection,
  BlockRegistryEntry,
  BlockCategory,
} from "@opensite/ui/types";
```

## Performance

### Bundle Sizes

- **Core Components**: ≤50KB gzipped
- **Individual Components**: Container (~1KB), Section (~2.5KB), AnimatedDialog (~5KB), PageHeroBanner (~3KB)

### Core Web Vitals

All components are optimized for:

- **LCP** (Largest Contentful Paint): ≤2.5s
- **INP** (Interaction to Next Paint): ≤200ms
- **CLS** (Cumulative Layout Shift): ≤0.1

### Tree-Shaking

The library is fully tree-shakable. Import only what you need:

```tsx
// ✅ Good - Only imports Container (~1KB)
import { Container } from "@opensite/ui/components/container";

// ❌ Avoid - Imports everything (~50KB)
import * as UI from "@opensite/ui";
```

## Development

### Building

```bash
pnpm build
```

`pnpm build` also regenerates:

- `package.json` export maps (via `generate:exports`)
- `registry-export.json` (via `scripts/export-registry.js`)

If you change a block's design/intent, update its registry metadata in
`src/registry/blocks.ts` before building so the exported JSON stays accurate.

### Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test -- --coverage
```

### Type Checking

```bash
pnpm type-check
```

## Requirements

- **Node.js**: >=18.0.0
- **pnpm**: >=9.0.0
- **React**: >=16.8.0

## License

BSD 3-Clause

## Related Packages

- [@opensite/blocks](https://github.com/opensite-ai/opensite-blocks) - Ultra-lightweight React rendering runtime
- [@opensite/img](https://github.com/opensite-ai/opensite-img) - Performance-optimized image component
- [@opensite/video](https://github.com/opensite-ai/opensite-video) - Performance-optimized video component
- [@opensite/hooks](https://github.com/opensite-ai/opensite-hooks) - Custom React hooks library
