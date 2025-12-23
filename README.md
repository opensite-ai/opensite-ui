![Opensite Semantic UI](https://octane.cdn.ing/api/v1/images/transform?url=https://cdn.ing/assets/i/r/285961/d0ywv2g2scl7x3nnuho5nk7hwb8v/banner-short.png&q=90)

# @opensite/ui

Foundational UI component library for the OpenSite Semantic Site Builder ecosystem. Provides tree-shakable, performance-optimized components with abstract styling support.

## Features

- 🎨 **Abstract Styling**: Components use CSS variables for full theme customization
- 📦 **Tree-Shakable**: Granular imports for optimal bundle sizes
- ⚡ **Performance First**: Optimized for Core Web Vitals (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1)
- 🎯 **TypeScript**: Full type safety with strict mode
- 🧩 **shadcn/ui Compatible**: Built on shadcn/ui foundations with Tailwind CSS v4
- 🔧 **Flexible**: Support for both default Tailwind styles and custom semantic builder styles

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

Animated modal dialog component using framer-motion.

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

### shadcn/ui Components

Additional components from shadcn/ui are available:

```tsx
import { Button } from "@opensite/ui/components/button";
import { Card, CardHeader, CardContent, CardFooter } from "@opensite/ui/components/card";
import { Badge } from "@opensite/ui/components/badge";
import { Popover, PopoverTrigger, PopoverContent } from "@opensite/ui/components/popover";
```

## Styling

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

MIT

## Related Packages

- [@opensite/blocks](https://github.com/opensite-ai/opensite-blocks) - Ultra-lightweight React rendering runtime
- [@opensite/img](https://github.com/opensite-ai/opensite-img) - Performance-optimized image component
- [@opensite/video](https://github.com/opensite-ai/opensite-video) - Performance-optimized video component
- [@opensite/hooks](https://github.com/opensite-ai/opensite-hooks) - Custom React hooks library
