# OpenSite UI - Comprehensive Styling Guide

This document provides a complete reference for customizing all @opensite/ui components using CSS variables and theme configuration.

## Table of Contents

1. [CSS Variables Reference](#css-variables-reference)
2. [Theme Configuration](#theme-configuration)
3. [Component-Specific Styling](#component-specific-styling)
4. [Custom Theme Examples](#custom-theme-examples)
5. [Tailwind CSS Integration](#tailwind-css-integration)

---

## CSS Variables Reference

All @opensite/ui components use CSS custom properties (variables) for theming. Define these variables in your global CSS file to customize the appearance of all components.

### Complete CSS Variables Template

```css
:root {
  /* ============================================
     COLOR SYSTEM
     ============================================ */

  /* Base Colors (HSL format: hue saturation lightness) */
  --background: 0 0% 100%;           /* Primary background color */
  --foreground: 222.2 84% 4.9%;      /* Primary text color */

  /* Brand Colors */
  --primary: 222.2 47.4% 11.2%;      /* Primary brand color (buttons, links) */
  --primary-foreground: 210 40% 98%; /* Text on primary color */

  --secondary: 210 40% 96.1%;        /* Secondary brand color */
  --secondary-foreground: 222.2 47.4% 11.2%; /* Text on secondary color */

  /* UI Element Colors */
  --muted: 210 40% 96.1%;            /* Muted backgrounds (cards, badges) */
  --muted-foreground: 215.4 16.3% 46.9%; /* Muted text */

  --accent: 210 40% 96.1%;           /* Accent color (hover states) */
  --accent-foreground: 222.2 47.4% 11.2%; /* Text on accent color */

  /* Semantic Colors */
  --destructive: 0 84.2% 60.2%;      /* Error/danger color */
  --destructive-foreground: 210 40% 98%; /* Text on destructive color */

  /* Border & Input */
  --border: 214.3 31.8% 91.4%;       /* Default border color */
  --input: 214.3 31.8% 91.4%;        /* Input field border */
  --ring: 222.2 84% 4.9%;            /* Focus ring color */

  /* Card & Popover */
  --card: 0 0% 100%;                 /* Card background */
  --card-foreground: 222.2 84% 4.9%; /* Card text color */

  --popover: 0 0% 100%;              /* Popover background */
  --popover-foreground: 222.2 84% 4.9%; /* Popover text color */

  /* ============================================
     TYPOGRAPHY
     ============================================ */

  /* Font Families */
  --font-sans: ui-sans-serif, system-ui, sans-serif;
  --font-mono: ui-monospace, monospace;

  /* Font Sizes (rem units) */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */

  /* Line Heights */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;

  /* ============================================
     SPACING & LAYOUT
     ============================================ */

  /* Container Max Widths */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;
  --container-4xl: 1536px;

  /* Section Spacing */
  --section-spacing-sm: 2rem;   /* 32px */
  --section-spacing-md: 4rem;   /* 64px */
  --section-spacing-lg: 6rem;   /* 96px */
  --section-spacing-xl: 8rem;   /* 128px */

  /* Component Padding */
  --padding-xs: 0.5rem;   /* 8px */
  --padding-sm: 0.75rem;  /* 12px */
  --padding-md: 1rem;     /* 16px */
  --padding-lg: 1.5rem;   /* 24px */
  --padding-xl: 2rem;     /* 32px */

  /* ============================================
     BORDERS & RADIUS
     ============================================ */

  /* Border Radius */
  --radius-none: 0;
  --radius-sm: 0.125rem;    /* 2px */
  --radius-md: 0.375rem;    /* 6px */
  --radius-lg: 0.5rem;      /* 8px */
  --radius-xl: 0.75rem;     /* 12px */
  --radius-2xl: 1rem;       /* 16px */
  --radius-full: 9999px;    /* Fully rounded */

  /* Default radius used by components */
  --radius: 0.5rem;

  /* Border Widths */
  --border-width: 1px;
  --border-width-2: 2px;
  --border-width-4: 4px;

  /* ============================================
     SHADOWS
     ============================================ */

  /* Shadow Definitions */
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

  /* ============================================
     BUTTONS
     ============================================ */

  /* Button Heights */
  --button-height-sm: 2rem;     /* 32px */
  --button-height-md: 2.25rem;  /* 36px */
  --button-height-lg: 2.5rem;   /* 40px */

  /* Button Padding */
  --button-padding-x-sm: 0.75rem;  /* 12px */
  --button-padding-x-md: 1rem;     /* 16px */
  --button-padding-x-lg: 1.5rem;   /* 24px */

  /* Button Border Radius (inherits from --radius by default) */
  --button-radius: var(--radius-md);

  /* Button Variant Colors - Default */
  --button-default-bg: hsl(var(--primary));
  --button-default-fg: hsl(var(--primary-foreground));
  --button-default-hover-bg: hsl(var(--primary) / 0.9);

  /* Button Variant Colors - Destructive */
  --button-destructive-bg: hsl(var(--destructive));
  --button-destructive-fg: white;
  --button-destructive-hover-bg: hsl(var(--destructive) / 0.9);

  /* Button Variant Colors - Outline */
  --button-outline-bg: hsl(var(--background));
  --button-outline-fg: inherit;
  --button-outline-border: hsl(var(--border));
  --button-outline-border-width: 1px;
  --button-outline-hover-bg: hsl(var(--accent));
  --button-outline-hover-fg: hsl(var(--accent-foreground));

  /* Button Variant Colors - Secondary */
  --button-secondary-bg: hsl(var(--secondary));
  --button-secondary-fg: hsl(var(--secondary-foreground));
  --button-secondary-hover-bg: hsl(var(--secondary) / 0.8);

  /* Button Variant Colors - Ghost */
  --button-ghost-bg: transparent;
  --button-ghost-fg: inherit;
  --button-ghost-hover-bg: hsl(var(--accent));
  --button-ghost-hover-fg: hsl(var(--accent-foreground));

  /* Button Variant Colors - Link */
  --button-link-fg: hsl(var(--primary));

  /* ============================================
     ANIMATIONS & TRANSITIONS
     ============================================ */

  /* Transition Durations */
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;

  /* Easing Functions */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

  /* ============================================
     OVERLAYS & MODALS
     ============================================ */

  /* Overlay opacity */
  --overlay-opacity: 0.6;

  /* Dialog/Modal sizes */
  --dialog-sm: 24rem;   /* 384px */
  --dialog-md: 32rem;   /* 512px */
  --dialog-lg: 48rem;   /* 768px */
  --dialog-xl: 64rem;   /* 1024px */

  /* ============================================
     Z-INDEX LAYERS
     ============================================ */

  --z-base: 0;
  --z-dropdown: 1000;
  --z-sticky: 1100;
  --z-fixed: 1200;
  --z-modal-backdrop: 1300;
  --z-modal: 1400;
  --z-popover: 1500;
  --z-tooltip: 1600;
}

/* ============================================
   DARK MODE COLORS
   ============================================ */

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;

  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;

  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;

  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;

  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;

  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;

  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 212.7 26.8% 83.9%;

  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;

  --popover: 222.2 84% 4.9%;
  --popover-foreground: 210 40% 98%;
}
```

---

## Theme Configuration

### Method 1: Global CSS File

Add the CSS variables to your global stylesheet:

```css
/* globals.css or app.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Paste CSS variables here */
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* ... rest of variables */
  }

  .dark {
    /* Dark mode overrides */
  }
}
```

### Method 2: Tailwind Configuration

Extend Tailwind's theme in `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./node_modules/@opensite/ui/dist/**/*.{js,mjs}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        button: "var(--button-radius)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

---

## Component-Specific Styling

### Button Component

The Button component supports extensive customization through CSS variables for complete control over appearance:

```tsx
import { Button } from "@opensite/ui/components/button";

// Using variant and size props
<Button variant="default" size="default">Default Button</Button>
<Button variant="destructive" size="lg">Large Destructive</Button>
<Button variant="outline" size="sm">Small Outline</Button>
<Button variant="outline" size="md">Medium Outline</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="link">Link Button</Button>
```

**Available Sizes:**
- `sm` - Small button (32px height, 12px padding)
- `md` - Medium button (36px height, 16px padding)
- `default` - Default button (same as md)
- `lg` - Large button (40px height, 24px padding)
- `icon`, `icon-sm`, `icon-lg` - Square icon buttons

**Size Customization Variables:**
- `--button-height-sm` - Small button height (default: 2rem)
- `--button-height-md` - Medium button height (default: 2.25rem)
- `--button-height-lg` - Large button height (default: 2.5rem)
- `--button-padding-x-sm` - Small button horizontal padding (default: 0.75rem)
- `--button-padding-x-md` - Medium button horizontal padding (default: 1rem)
- `--button-padding-x-lg` - Large button horizontal padding (default: 1.5rem)
- `--button-radius` - Button border radius (default: var(--radius-md))

**Default Variant Color Variables:**
- `--button-default-bg` - Background color (default: hsl(var(--primary)))
- `--button-default-fg` - Text color (default: hsl(var(--primary-foreground)))
- `--button-default-hover-bg` - Hover background (default: hsl(var(--primary) / 0.9))

**Destructive Variant Color Variables:**
- `--button-destructive-bg` - Background color (default: hsl(var(--destructive)))
- `--button-destructive-fg` - Text color (default: white)
- `--button-destructive-hover-bg` - Hover background (default: hsl(var(--destructive) / 0.9))

**Outline Variant Color Variables:**
- `--button-outline-bg` - Background color (default: hsl(var(--background)))
- `--button-outline-fg` - Text color (default: inherit)
- `--button-outline-border` - Border color (default: hsl(var(--border)))
- `--button-outline-border-width` - Border width (default: 1px)
- `--button-outline-hover-bg` - Hover background (default: hsl(var(--accent)))
- `--button-outline-hover-fg` - Hover text color (default: hsl(var(--accent-foreground)))

**Secondary Variant Color Variables:**
- `--button-secondary-bg` - Background color (default: hsl(var(--secondary)))
- `--button-secondary-fg` - Text color (default: hsl(var(--secondary-foreground)))
- `--button-secondary-hover-bg` - Hover background (default: hsl(var(--secondary) / 0.8))

**Ghost Variant Color Variables:**
- `--button-ghost-bg` - Background color (default: transparent)
- `--button-ghost-fg` - Text color (default: inherit)
- `--button-ghost-hover-bg` - Hover background (default: hsl(var(--accent)))
- `--button-ghost-hover-fg` - Hover text color (default: hsl(var(--accent-foreground)))

**Link Variant Color Variables:**
- `--button-link-fg` - Text color (default: hsl(var(--primary)))

**Example: Customizing Outline Button**
```css
:root {
  /* Custom outline button with primary border and hover */
  --button-outline-border: hsl(var(--primary));
  --button-outline-border-width: 2px;
  --button-outline-hover-bg: hsl(var(--primary) / 0.1);
  --button-outline-hover-fg: hsl(var(--primary));
}
```

### Container Component

```tsx
import { Container } from "@opensite/ui/components/container";

<Container maxWidth="xl">
  {/* Content */}
</Container>
```

**Affected CSS Variables:**
- `--container-sm` through `--container-4xl`
- `--padding-md` - Default horizontal padding

### Section Component

```tsx
import { Section } from "@opensite/ui/components/section";

<Section
  background="gradient"
  spacing="lg"
  title="Section Title"
  subtitle="Section Subtitle"
>
  {/* Content */}
</Section>
```

**Affected CSS Variables:**
- `--background` - White background variant
- `--foreground` - Dark background variant
- `--primary` - Primary background variant
- `--secondary` - Secondary background variant
- `--muted` - Muted background variant
- `--section-spacing-sm` through `--section-spacing-xl`

### AnimatedDialog Component

```tsx
import { AnimatedDialog } from "@opensite/ui/components/animated-dialog";

<AnimatedDialog
  open={open}
  onOpenChange={setOpen}
  size="lg"
  title="Dialog Title"
>
  {/* Content */}
</AnimatedDialog>
```

**Affected CSS Variables:**
- `--card` - Dialog background
- `--card-foreground` - Dialog text
- `--border` - Dialog border
- `--shadow-xl` - Dialog shadow
- `--dialog-sm` through `--dialog-xl` - Dialog widths
- `--overlay-opacity` - Backdrop opacity
- `--z-modal-backdrop`, `--z-modal` - Z-index layers

### PageHeroBanner Component

```tsx
import { PageHeroBanner } from "@opensite/ui/components/page-hero-banner";

<PageHeroBanner
  imageUrl="/hero.jpg"
  minHeight="600px"
  overlayOpacity={0.6}
  contentMaxWidth="4xl"
>
  {/* Content */}
</PageHeroBanner>
```

**Affected CSS Variables:**
- `--foreground` - Overlay gradient color
- `--background` - Text color on overlay
- `--container-4xl` - Content max width

---

## Custom Theme Examples

### Example 1: Brand-Specific Theme (Blue & Orange)

```css
:root {
  /* Brand Colors - Blue primary, Orange accent */
  --primary: 220 90% 56%;           /* Bright blue */
  --primary-foreground: 0 0% 100%;  /* White */

  --secondary: 30 100% 50%;         /* Orange */
  --secondary-foreground: 0 0% 100%; /* White */

  --accent: 30 100% 95%;            /* Light orange */
  --accent-foreground: 30 100% 20%; /* Dark orange */

  /* Rounded corners everywhere */
  --radius: 1rem;
  --button-radius: 9999px;          /* Fully rounded buttons */

  /* Larger spacing */
  --section-spacing-lg: 8rem;
}
```

### Example 2: Minimal/Clean Theme

```css
:root {
  /* Monochrome palette */
  --primary: 0 0% 9%;               /* Almost black */
  --primary-foreground: 0 0% 98%;   /* Almost white */

  --secondary: 0 0% 96%;            /* Light gray */
  --secondary-foreground: 0 0% 9%;  /* Dark gray */

  /* Sharp corners */
  --radius: 0;
  --button-radius: 0;

  /* Minimal shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 2px 4px 0 rgb(0 0 0 / 0.05);
}
```

### Example 3: Vibrant/Playful Theme

```css
:root {
  /* Vibrant colors */
  --primary: 280 100% 70%;          /* Purple */
  --primary-foreground: 0 0% 100%;

  --secondary: 340 100% 70%;        /* Pink */
  --secondary-foreground: 0 0% 100%;

  --accent: 160 100% 70%;           /* Teal */
  --accent-foreground: 0 0% 100%;

  /* Extra rounded */
  --radius: 1.5rem;
  --button-radius: 9999px;

  /* Prominent shadows */
  --shadow-md: 0 8px 16px 0 rgb(0 0 0 / 0.1);
  --shadow-lg: 0 16px 32px 0 rgb(0 0 0 / 0.15);
}
```

---

## Tailwind CSS Integration

### Step 1: Include @opensite/ui in Tailwind Content

```js
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@opensite/ui/dist/**/*.{js,mjs}",
  ],
  // ... rest of config
}
```

### Step 2: Use Tailwind Classes with Components

All @opensite/ui components accept `className` prop for Tailwind utilities:

```tsx
<Container className="bg-gradient-to-b from-blue-500 to-purple-600">
  <Section className="my-8 text-center">
    <Button className="shadow-2xl hover:scale-105 transition-transform">
      Custom Styled Button
    </Button>
  </Section>
</Container>
```

### Step 3: Override with Inline Styles When Needed

```tsx
<PageHeroBanner
  imageUrl="/hero.jpg"
  style={{ minHeight: "80vh" }}
  overlayOpacity={0.7}
>
  <h1 className="text-6xl font-bold">Custom Hero</h1>
</PageHeroBanner>
```

---

## Dynamic Theme Switching

### Runtime Theme Changes with JavaScript

```typescript
// Theme switcher utility
export function setTheme(theme: 'light' | 'dark' | 'custom') {
  const root = document.documentElement;

  if (theme === 'dark') {
    root.classList.add('dark');
  } else if (theme === 'custom') {
    root.style.setProperty('--primary', '220 90% 56%');
    root.style.setProperty('--radius', '1rem');
    // ... set other variables
  } else {
    root.classList.remove('dark');
  }
}

// Usage in component
<Button onClick={() => setTheme('dark')}>
  Switch to Dark Mode
</Button>
```

### Per-Component Theme Overrides

```tsx
<div style={{
  '--primary': '280 100% 70%',
  '--radius': '1.5rem',
} as React.CSSProperties}>
  <Button>This button uses custom theme</Button>
</div>
```

---

## Best Practices

### 1. Start with Default Theme

Use the complete CSS variables template as your starting point, then modify only what you need.

### 2. Maintain Contrast Ratios

Ensure sufficient contrast between text and backgrounds for accessibility (WCAG AA: 4.5:1 for normal text).

### 3. Test Dark Mode

Always test your custom colors in both light and dark modes.

### 4. Use HSL Format

CSS variables use HSL format without `hsl()` wrapper for flexibility:
```css
/* ✅ Correct */
--primary: 220 90% 56%;

/* ❌ Incorrect */
--primary: hsl(220, 90%, 56%);
```

### 5. Consistent Spacing Scale

Stick to the spacing scale (sm/md/lg/xl) for visual consistency across components.

---

## Troubleshooting

### Colors Not Applying

**Problem**: Custom colors aren't showing up
**Solution**: Make sure you're using HSL format without the `hsl()` wrapper, and include the CSS in a global stylesheet.

### Dark Mode Not Working

**Problem**: Dark mode colors not switching
**Solution**: Ensure `.dark` class is applied to `<html>` or `<body>` element and dark mode variables are defined.

### Tailwind Classes Not Working

**Problem**: Tailwind utilities not applying to @opensite/ui components
**Solution**: Add `./node_modules/@opensite/ui/dist/**/*.{js,mjs}` to your Tailwind config content array.

### Border Radius Not Changing

**Problem**: `--radius` changes don't affect buttons
**Solution**: Buttons use `--button-radius` specifically. Update both variables or set `--button-radius: var(--radius)`.

---

## Version History

- **0.0.2** - Added comprehensive Button styling, complete CSS variables reference
- **0.0.1** - Initial release with Container, Section, AnimatedDialog, PageHeroBanner

---

## Contributing

When adding new components to @opensite/ui:

1. Use existing CSS variables where possible
2. Add new variables to this document if needed
3. Follow HSL color format for consistency
4. Provide examples in this guide
5. Test with multiple theme configurations

---

## Support

For issues or questions:
- GitHub Issues: https://github.com/dashtrack/opensite-ui/issues
- Documentation: See README.md for component API reference
