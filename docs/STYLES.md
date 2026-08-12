# OpenSite UI - Comprehensive Styling Guide (Tailwind CSS 4)

This document provides a complete reference for customizing all @opensite/ui components using CSS variables and Tailwind CSS 4 configuration.

> **⚠️ Tailwind CSS 4 Required**: This library is designed exclusively for Tailwind CSS v4.0+. The styling system uses Tailwind 4's new `@theme` directive for optimal performance and flexibility.

## Table of Contents

1. [Quick Start (Tailwind 4)](#quick-start-tailwind-4)
2. [Typography (Prose) Styling](#typography-prose-styling)
3. [Complete CSS Template](#complete-css-template)
4. [Font Loading & @font-face](#font-loading--font-face)
5. [Tailwind Config Template](#tailwind-config-template)
6. [CSS Variables Reference](#css-variables-reference)
7. [Component-Specific Styling](#component-specific-styling)
8. [Custom Theme Examples](#custom-theme-examples)
9. [Server-Side Style Synchronization](#server-side-style-synchronization)

---

## Quick Start (Tailwind 4)

### Step 1: Install Dependencies

```bash
npm install tailwindcss@^4.0.0 @tailwindcss/postcss
npm install @opensite/ui
```

### Step 2: Copy Complete CSS Template

Copy the [Complete CSS Template](#complete-css-template) to your `globals.css` or `app.css` file.

### Step 3: Copy Tailwind Config

Copy the [Tailwind Config Template](#tailwind-config-template) to your `tailwind.config.ts` file.

### Step 4: Customize Your Theme

Modify the CSS variables in `:root` to match your brand colors and design system.

---

## Typography (Prose) Styling

Several @opensite/ui blocks use the `prose` class from `@tailwindcss/typography` to style rich content like articles, case studies, and service detail pages. **This plugin is required for blocks that display long-form content.**

### Blocks That Require Typography Plugin

The following blocks use `prose` classes and require the typography plugin:
- `ArticleHeroProse`
- `ArticleBreadcrumbSocial`
- `CaseStudyProseSidebar`
- `CaseStudyStatsMetrics`
- `CaseStudyTocSocialSidebar`
- `ServiceDetailProseMinimal`
- `ServiceDetailCenteredExpertise`
- `ServiceDetailCompactCards`
- `ResourceDetailArticleHero`

### Installation (Tailwind CSS v4)

1. **Install the typography plugin:**

```bash
npm install @tailwindcss/typography
```

2. **Add the plugin import to your CSS file:**

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
@custom-variant dark (&:is(.dark *));
```

> **Note:** In Tailwind CSS v4, plugins are imported via `@plugin` in your CSS file instead of the `tailwind.config.js` plugins array.

### Prose Customization

The prose styles can be customized using Tailwind's prose modifiers. Common customizations include:

```css
/* Custom prose colors using CSS variables */
.prose {
  --tw-prose-body: var(--foreground);
  --tw-prose-headings: var(--foreground);
  --tw-prose-links: var(--primary);
  --tw-prose-bold: var(--foreground);
  --tw-prose-quotes: var(--muted-foreground);
  --tw-prose-quote-borders: var(--primary);
  --tw-prose-bullets: var(--muted-foreground);
  --tw-prose-counters: var(--muted-foreground);
}
```

Or use Tailwind's prose modifier classes in your JSX:

```tsx
<div className="prose prose-headings:text-foreground prose-p:text-muted-foreground prose-blockquote:border-l-primary dark:prose-invert">
  {/* Your content */}
</div>
```

---

## Complete CSS Template

This template uses Tailwind CSS 4's `@theme inline` directive to map CSS variables to Tailwind utility classes. **Copy this entire template to your `globals.css` file:**

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
@custom-variant dark (&:is(.dark *));
@config "../tailwind.config.ts";

@layer base {
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
  --warning: 38 92% 50%;             /* Warning/attention color */
  --warning-foreground: 0 0% 10%;    /* Text on warning color */

  /* Border & Input */
  --border: 214.3 31.8% 91.4%;       /* Default border color */
  --input: 214.3 31.8% 91.4%;        /* Input field border */
  --ring: 222.2 84% 4.9%;            /* Focus ring color */

  /* Card & Popover */
  --card: 0 0% 100%;                 /* Card background */
  --card-foreground: 222.2 84% 4.9%; /* Card text color */

  --popover: 0 0% 100%;              /* Popover background */
  --popover-foreground: 222.2 84% 4.9%; /* Popover text color */

  /* Derived Utility Colors (used by decorative blocks/patterns) */
  --color-accent: hsl(var(--accent));
  --color-border: hsl(var(--border));
  --color-muted: hsl(var(--muted));
  --color-gray-200: hsl(var(--muted));

  /* ============================================
     TYPOGRAPHY
     ============================================ */

  /* Font Families (family stacks only — see "Font Loading & @font-face").
     Quote any family name containing spaces or digits: "Source Sans 3". */
  --font-sans: ui-sans-serif, system-ui, sans-serif;
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
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
     BUTTONS - COMPREHENSIVE CUSTOMIZATION
     ============================================ */

  /* -----------------------------------------
     MASTER BUTTON STYLES (apply to all variants)
     ----------------------------------------- */

  /* Typography */
  --button-font-family: inherit;           /* Font family */
  --button-font-weight: 500;               /* Font weight (medium) */
  --button-letter-spacing: 0;              /* Letter spacing */
  --button-line-height: 1.25;              /* Line height */
  --button-text-transform: none;           /* Text transform (none, uppercase, lowercase, capitalize) */

  /* Layout & Sizing */
  --button-radius: var(--radius-md);       /* Border radius */

  /* Transitions - smooth and slower for better UX */
  --button-transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);

  /* Box Shadow (master level - applies to all variants unless overridden) */
  --button-shadow: none;                   /* Default box shadow */
  --button-shadow-hover: none;             /* Hover box shadow */

  /* -----------------------------------------
     SIZE VARIANTS
     ----------------------------------------- */

  /* Small Size */
  --button-height-sm: 2rem;                /* 32px */
  --button-padding-x-sm: 0.75rem;          /* 12px horizontal */
  --button-padding-y-sm: 0.25rem;          /* 4px vertical */

  /* Medium Size (default) */
  --button-height-md: 2.25rem;             /* 36px */
  --button-padding-x-md: 1rem;             /* 16px horizontal */
  --button-padding-y-md: 0.5rem;           /* 8px vertical */

  /* Large Size */
  --button-height-lg: 2.5rem;              /* 40px */
  --button-padding-x-lg: 1.5rem;           /* 24px horizontal */
  --button-padding-y-lg: 0.5rem;           /* 8px vertical */

  /* -----------------------------------------
     DEFAULT (PRIMARY) VARIANT
     ----------------------------------------- */
  --button-default-bg: var(--primary);
  --button-default-fg: var(--primary-foreground);
  --button-default-border: transparent;
  --button-default-border-width: 0px;
  --button-default-shadow: var(--button-shadow);
  --button-default-hover-bg: color-mix(in oklch, var(--primary), transparent 10%);
  --button-default-hover-fg: var(--primary-foreground);
  --button-default-hover-border: transparent;
  --button-default-shadow-hover: var(--button-shadow-hover);

  /* -----------------------------------------
     DESTRUCTIVE VARIANT
     ----------------------------------------- */
  --button-destructive-bg: var(--destructive);
  --button-destructive-fg: white;
  --button-destructive-border: transparent;
  --button-destructive-border-width: 0px;
  --button-destructive-shadow: var(--button-shadow);
  --button-destructive-hover-bg: color-mix(in oklch, var(--destructive), transparent 10%);
  --button-destructive-hover-fg: white;
  --button-destructive-hover-border: transparent;
  --button-destructive-shadow-hover: var(--button-shadow-hover);

  /* -----------------------------------------
     OUTLINE VARIANT
     ----------------------------------------- */
  --button-outline-bg: white;
  --button-outline-fg: var(--primary);
  --button-outline-border: var(--primary);
  --button-outline-border-width: 1px;
  --button-outline-shadow: var(--button-shadow);
  --button-outline-hover-bg: var(--primary);
  --button-outline-hover-fg: var(--primary-foreground);
  --button-outline-hover-border: white;
  --button-outline-shadow-hover: var(--button-shadow-hover);

  /* -----------------------------------------
     SECONDARY VARIANT
     ----------------------------------------- */
  --button-secondary-bg: var(--secondary);
  --button-secondary-fg: var(--secondary-foreground);
  --button-secondary-border: transparent;
  --button-secondary-border-width: 0px;
  --button-secondary-shadow: var(--button-shadow);
  --button-secondary-hover-bg: color-mix(in oklch, var(--secondary), transparent 20%);
  --button-secondary-hover-fg: var(--secondary-foreground);
  --button-secondary-hover-border: transparent;
  --button-secondary-shadow-hover: var(--button-shadow-hover);

  /* -----------------------------------------
     GHOST VARIANT
     ----------------------------------------- */
  --button-ghost-bg: transparent;
  --button-ghost-fg: inherit;
  --button-ghost-border: transparent;
  --button-ghost-border-width: 0px;
  --button-ghost-shadow: var(--button-shadow);
  --button-ghost-hover-bg: var(--accent);
  --button-ghost-hover-fg: var(--accent-foreground);
  --button-ghost-hover-border: transparent;
  --button-ghost-shadow-hover: var(--button-shadow-hover);

  /* -----------------------------------------
     LINK VARIANT
     ----------------------------------------- */
  --button-link-bg: transparent;
  --button-link-fg: var(--primary);
  --button-link-border: transparent;
  --button-link-border-width: 0px;
  --button-link-shadow: var(--button-shadow);
  --button-link-hover-bg: transparent;
  --button-link-hover-fg: var(--primary);
  --button-link-shadow-hover: var(--button-shadow-hover);

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

  --warning: 45 96% 60%;
  --warning-foreground: 0 0% 10%;

  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 212.7 26.8% 83.9%;

  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;

  --popover: 222.2 84% 4.9%;
  --popover-foreground: 210 40% 98%;
}

/* ============================================
   TAILWIND 4 THEME MAPPING (@theme inline)
   ============================================

   This section maps CSS variables to Tailwind utility classes.
   This is the KEY difference in Tailwind CSS 4 - we use @theme inline
   instead of extending the theme in tailwind.config.js
   ============================================ */

@theme inline {
  /* Color Utilities */
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-warning: hsl(var(--warning));
  --color-warning-foreground: hsl(var(--warning-foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));

  /* Font Family Utilities (font-sans / font-serif / font-mono) */
  --font-sans: var(--font-sans);
  --font-serif: var(--font-serif);
  --font-mono: var(--font-mono);

  /* Border Radius Utilities */
  --radius-sm: var(--radius-sm);
  --radius-md: var(--radius-md);
  --radius-lg: var(--radius-lg);
  --radius-xl: var(--radius-xl);
  --radius-2xl: var(--radius-2xl);
  --radius-full: var(--radius-full);

  /* Animation Keyframes */
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes accordion-down {
    from {
      height: 0;
    }
    to {
      height: var(--radix-accordion-content-height);
    }
  }

  @keyframes accordion-up {
    from {
      height: var(--radix-accordion-content-height);
    }
    to {
      height: 0;
    }
  }

  /* Animation Utilities */
  --animate-fade-in: fade-in 0.6s ease-in-out;
  --animate-slide-up: slide-up 0.6s ease-out;
  --animate-slide-down: slide-down 0.6s ease-out;
  --animate-accordion-down: accordion-down 0.2s ease-out;
  --animate-accordion-up: accordion-up 0.2s ease-out;
}
}
```

---

## Font Loading & @font-face

The template above only *names* the families (`--font-sans` / `--font-serif` / `--font-mono`).
Nothing in `@opensite/ui` downloads a font — the host page (or the DashTrack Tailwind
generator) is responsible for making the faces available. This section is the contract for
how those faces get loaded.

### How `font-sans` / `font-serif` / `font-mono` utilities actually resolve

Read this before copying the `@theme inline` font mappings anywhere new — the pattern is
subtle and it is **not** the mechanism that makes the utilities work.

Tailwind v4's DEFAULT theme tokens are *already* named `--font-sans`, `--font-serif`, and
`--font-mono`. Tailwind emits its defaults inside `@layer theme`, and an **unlayered**
`:root` declaration beats anything in a layer. So a site that simply declares

```css
:root {
  --font-sans: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;
}
```

already drives the `font-sans` utility — automatically, with no mapping of any kind. The
same is true for `font-serif` and `font-mono`.

The `@theme inline { --font-sans: var(--font-sans); … }` block in the Complete CSS Template
is therefore a no-op for utility resolution. It is kept as the conventional shadcn-style
idiom, and it is **safe there only because the adjacent `:root` block in the same template
always defines all three variables.**

⚠️ **Do not add that mapping to a stylesheet where one of the three variables may be
undefined.** In the theme layer, `--font-serif: var(--font-serif)` with no unlayered
`--font-serif` to resolve against becomes the winning declaration and refers to itself: a
CSS custom-property **cycle**. A cycle is *invalid at computed-value time*, so the token
resolves to nothing and the `font-serif` utility applies **no `font-family` at all** — a
visible regression, not a silent fallback.

This is why the DashTrack compiled-site generator (`lib/tailwind/generate.mjs`) deliberately
does **NOT** emit the font mappings: many production style guides ship a partial or blank
variable prelude, and the mapping would break font utilities on exactly those sites. The
mapping lives only in the hand-authored templates whose `:root` is guaranteed complete
(this document's fence, `opensite-ui/src/styles/globals.css`, the Rails `default_configs`
template, and the dt-cms preview runtime). See the "Post-review amendment" under §D2 of
`docs/shared-components/font-family-restructure-DESIGN.md`.

Rule of thumb: **declare the variables; the mapping is optional garnish, and only when the
variables are guaranteed present.**

### Rule 1 — Families load as FULL families, not single faces

`@opensite/ui` blocks style with the whole Tailwind weight/style axis (`font-medium`,
`font-semibold`, `font-bold`, `italic`, …). If only one physical face is loaded, the browser
*synthesizes* the rest — faux bold and faux oblique — which is why a design can look
subtly wrong even though every utility class compiled correctly.

So: **load every weight and style of the family you selected.** Browsers download only the
faces that rendered text actually matches, so declaring the full family costs CSS bytes
(a few KB pre-gzip), not font bytes.

### Rule 2 — Quote family names with spaces or digits

```css
/* ✅ correct */
--font-sans: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;
--font-serif: "Source Sans 3", Georgia, serif;

/* ❌ invalid CSS — a bare token starting with a digit is not a valid identifier.
   The whole declaration is dropped and the browser silently falls back. */
--font-serif: Source Sans 3, Georgia, serif;
```

Generic keywords (`ui-sans-serif`, `system-ui`, `sans-serif`, `serif`, `monospace`) must
NOT be quoted — quoting turns them into family-name lookups that will never match.
The stock defaults in the template need no quoting.

Always keep a generic fallback as the last entry in every stack.

### Rule 3 — Google-hosted families: one dual-axis `css2` import

One import per family, requesting the full weight axis in both styles, with
`display=swap`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
>
```

Equivalent `@import` form (must be the first rule in the stylesheet):

```css
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap");
```

Notes:
- Use the `ital,wght@` **dual-axis** syntax (`0,` = normal, `1,` = italic). A single-axis
  `wght@` import loads no italics at all.
- For variable fonts a range (`wght@300..800`) is valid and preferred.
- Do **not** emit one import per weight — that is N round trips for one family.
- Google's `css2` response already contains the `@font-face` blocks with correct
  `font-weight` / `font-style` / `unicode-range` descriptors, so nothing else is needed.

### Rule 4 — Self-hosted / uploaded families: one `@font-face` per face

Emit one `@font-face` rule **per physical face**, each with real `font-weight` and
`font-style` descriptors and `font-display: swap`. Serve the file through the DashTrack
font transform so it is normalized/compressed to `woff2`:

```css
@font-face {
  font-family: "Acme Grotesk";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("https://octane.cdn.ing/api/v1/fonts/transform?url=https://cdn.ing/assets/fonts/8412/file/a3f9c1d27b5e4a80.woff2") format("woff2");
}

@font-face {
  font-family: "Acme Grotesk";
  font-style: italic;
  font-weight: 700;
  font-display: swap;
  src: url("https://octane.cdn.ing/api/v1/fonts/transform?url=https://cdn.ing/assets/fonts/8419/file/6b21e5f0c9a7d413.woff2") format("woff2");
}
```

Descriptor rules:
- `font-weight` is the face's REAL weight (100–900). Never collapse everything to `400` —
  that re-creates the faux-bold problem inside a self-hosted family.
- `font-style` is `normal` or `italic` per face.
- `font-display: swap` on every face. Text must never be invisible waiting on a font.
- One `font-family` string shared by all faces of the family, matching the quoted name used
  in `--font-sans` / `--font-serif` / `--font-mono` exactly.
- **`format("woff2")` — ALWAYS, for ANY src that goes through the transform**, no matter what
  the uploaded source file was. The transform converts every input format (`ttf`, `otf`,
  `woff`, `woff2`) to woff2, so the response is always woff2 even when the `url` parameter
  ends in `.ttf`. `format()` is a *promise about the response*, and browsers use it to
  pre-filter `src` candidates without fetching them: advertising the source format
  (e.g. `format("truetype")` for a `.ttf` source) makes the browser skip the src entirely on
  the assumption it can't use it — the face never loads. Only put the real source format in
  `format()` when the file is served directly, bypassing the transform.

### Rule 5 — The transform `src` URL must be STABLE

The transform endpoint caches by `sha256` of the **`url` query parameter**, so the source
URL is the cache key. It must be byte-stable forever:

```
https://octane.cdn.ing/api/v1/fonts/transform?url=https://cdn.ing/assets/fonts/<font_record_id>/file/<blob_key>.<ext>
```

- `<font_record_id>` — the font record's id (one record == one weight + style).
- `<blob_key>` — the stable public file token for that record.
- `<ext>` — the source extension (`woff2`, `woff`, `ttf`, `otf`).

**Never** pass a signed/expiring ActiveStorage URL as the `url` parameter. Those URLs expire
(≈1 week) and are regenerated on every read, so every render produces a new cache key: a
guaranteed cache miss on every request, and dead `src` URLs baked into cached CSS once the
signature expires.

Each face needs its own DISTINCT stable URL — the cache key has no weight/style/subset
dimension, so two faces sharing a source URL would collapse into one cached artifact.

### Rule 6 — Preload sparingly (≤ 2 above-the-fold faces)

Preload only the one or two faces that actually paint above the fold — in practice the sans
family's regular and bold normal faces:

```html
<link rel="preload" as="font" type="font/woff2" crossorigin
      href="https://octane.cdn.ing/api/v1/fonts/transform?url=https://cdn.ing/assets/fonts/8412/file/a3f9c1d27b5e4a80.woff2">
```

- `crossorigin` is REQUIRED on font preloads. Without it the browser fetches the file twice.
- Preloading a face the page never uses is a pure waste of bandwidth *and* delays the faces
  it does use.
- Do not preload Google `css2` faces: the import indirects through per-`unicode-range`
  files whose URLs are not stable, so a preload will miss and double-fetch.
- Do not fan out preloads across a whole family. The transform endpoint is a public
  URL-fetching proxy with no per-face concurrency budget; dozens of parallel cold preloads
  per page view is an availability hazard.

### Deprecated: `--font-*-weight` / `--font-*-style`

Earlier revisions of this template paired each family with a pinned face:

```css
/* DEPRECATED — do not add these to new templates */
--font-sans-weight: 400;
--font-sans-style: normal;
--font-serif-weight: 400;
--font-serif-style: normal;
--font-mono-weight: 400;
--font-mono-style: normal;
```

These six variables are **removed from the active template** and are **no longer read by
anything**: `body` and `code, kbd, pre, samp` now set `font-family` only, and weights come
from block-level Tailwind utilities.

They remain **tolerated, not rejected**: downstream generators and theme schemas still
ACCEPT them as optional keys so previously saved themes keep validating and rendering.
If they appear in a `theme_config` they are simply **ignored**. Do not emit them in new
themes, and do not depend on them in component CSS.

### DashTrack rollout: `FONT_FULL_FAMILY_EMISSION`

On the DashTrack platform, full-family emission is behind the env flag
**`FONT_FULL_FAMILY_EMISSION`** (default OFF → byte-identical legacy output).

It must be enabled on **BOTH Heroku apps**, because they gate independent halves of the
delivery path:

| App | What the flag gates |
|---|---|
| `toastability-service` | Generator-side emission — resolving the selected families and emitting the full css2 import / the full set of `@font-face` blocks |
| `customer-sites` | Delivery-side rendering — the real `font-weight`/`font-style` descriptors, the stable transform URLs, and the above-the-fold `<link rel="preload">` tags |

Enabling only one leaves the other half on the legacy single-face path, so the site still
renders faux bold/italic (or loses the preloads) even though the other app is emitting the
full family. Flip both, and expect one deliberate CSS cache-tag rotation at flip time.

---

## Tailwind Config Template

**Copy this minimal Tailwind 4 configuration to your `tailwind.config.ts` file:**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@opensite/ui/dist/**/*.{js,mjs}",

    // Include @page-speed/pressable for button/link styles
    "./node_modules/@page-speed/pressable/dist/**/*.{js,cjs}",

    // For pnpm monorepos:
    "./node_modules/.pnpm/@page-speed+pressable*/node_modules/@page-speed/pressable/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Optional: Add custom animations or other theme extensions here
      // Most theming is done via CSS variables and @theme inline
    },
  },
  plugins: [],
};

export default config;
```

### Key Differences from Tailwind 3

**Tailwind 4 uses a CSS-first approach:**

1. **No `@tailwind` directives** - Use `@import "tailwindcss"` instead
2. **No extensive `tailwind.config.js` theme** - Most configuration is in CSS via `@theme inline`
3. **CSS variables directly mapped to utilities** - The `@theme inline` section handles the mapping
4. **Simpler config file** - Only needs content paths and optional extensions

### What Goes Where?

| Configuration Type | Tailwind 3 | Tailwind 4 |
|--------------------|------------|------------|
| Colors | `tailwind.config.js` theme.colors | CSS `@theme inline` |
| Spacing | `tailwind.config.js` theme.spacing | CSS `@theme inline` |
| Typography | `tailwind.config.js` theme.fontSize | CSS `@theme inline` |
| Border Radius | `tailwind.config.js` theme.borderRadius | CSS `@theme inline` |
| Animations | `tailwind.config.js` theme.animation | CSS `@theme inline` @keyframes |
| Dark Mode | `darkMode: 'class'` in config | `@custom-variant dark (&:is(.dark *))` in CSS |

---

## Component-Specific Styling

### Button & Pressable Components

Both the `Button` and `Pressable` components share the same comprehensive styling system through CSS variables. This allows for complete control over appearance across your entire application.

**Important:** The `Pressable` component is now provided by the `@page-speed/pressable` package, which is a dependency of `@opensite/ui`. Make sure to include its path in your Tailwind content configuration (see [Tailwind CSS Integration](#tailwind-css-integration) section).

```tsx
import { Button } from "@opensite/ui/components/button";
import { Pressable } from "@opensite/ui/lib/pressable"; // Re-exported from @page-speed/pressable

// Using variant and size props (works identically for both components)
<Button variant="default" size="default">Default Button</Button>
<Pressable href="/about" variant="outline" size="lg" asButton>Link as Button</Pressable>
```

#### Master Button Variables (Apply to All Variants)

These variables control the base styling for all button variants:

| Variable | Default | Description |
|----------|---------|-------------|

| `--button-font-family` | `inherit` | Font family for button text |
| `--button-font-weight` | `500` | Font weight (medium) |
| `--button-font-style` | `normal` | Font style (normal, italic, oblique) |
| `--button-letter-spacing` | `0` | Letter spacing |
| `--button-line-height` | `1.25` | Line height |
| `--button-text-transform` | `none` | Text transform (none, uppercase, lowercase, capitalize) |
| `--button-radius` | `var(--radius-md)` | Border radius |
| `--button-transition` | `all 250ms cubic-bezier(0.4, 0, 0.2, 1)` | Transition timing (smooth and slower) |
| `--button-shadow` | `none` | Default box shadow for all buttons |
| `--button-shadow-hover` | `none` | Hover box shadow for all buttons |

#### Size Variables

| Variable | Default | Description |
|----------|---------|-------------|

| `--button-height-sm` | `2rem` (32px) | Small button height |
| `--button-height-md` | `2.25rem` (36px) | Medium button height |
| `--button-height-lg` | `2.5rem` (40px) | Large button height |
| `--button-padding-x-sm` | `0.75rem` (12px) | Small horizontal padding |
| `--button-padding-x-md` | `1rem` (16px) | Medium horizontal padding |
| `--button-padding-x-lg` | `1.5rem` (24px) | Large horizontal padding |
| `--button-padding-y-sm` | `0.25rem` (4px) | Small vertical padding |
| `--button-padding-y-md` | `0.5rem` (8px) | Medium vertical padding |
| `--button-padding-y-lg` | `0.5rem` (8px) | Large vertical padding |

**Available Sizes:** `sm`, `md`, `default` (same as md), `lg`, `icon`, `icon-sm`, `icon-lg`

#### Per-Variant Variables

Each variant has a complete, consistent set of customization variables:

**Default (Primary) Variant:**

| Variable | Default | Description |
|----------|---------|-------------|

| `--button-default-bg` | `hsl(var(--primary))` | Background color |
| `--button-default-fg` | `hsl(var(--primary-foreground))` | Text color |
| `--button-default-border` | `transparent` | Border color |
| `--button-default-border-width` | `0px` | Border width |
| `--button-default-shadow` | `var(--button-shadow)` | Box shadow (inherits master) |
| `--button-default-hover-bg` | `hsl(var(--primary) / 0.9)` | Hover background |
| `--button-default-hover-fg` | `hsl(var(--primary-foreground))` | Hover text color |
| `--button-default-hover-border` | `transparent` | Hover border color |
| `--button-default-shadow-hover` | `var(--button-shadow-hover)` | Hover box shadow (inherits master) |

**Destructive Variant:**

| Variable | Default | Description |
|----------|---------|-------------|

| `--button-destructive-bg` | `hsl(var(--destructive))` | Background color |
| `--button-destructive-fg` | `white` | Text color |
| `--button-destructive-border` | `transparent` | Border color |
| `--button-destructive-border-width` | `0px` | Border width |
| `--button-destructive-shadow` | `var(--button-shadow)` | Box shadow (inherits master) |
| `--button-destructive-hover-bg` | `hsl(var(--destructive) / 0.9)` | Hover background |
| `--button-destructive-hover-fg` | `white` | Hover text color |
| `--button-destructive-hover-border` | `transparent` | Hover border color |
| `--button-destructive-shadow-hover` | `var(--button-shadow-hover)` | Hover box shadow (inherits master) |

**Outline Variant:**

| Variable | Default | Description |
|----------|---------|-------------|

| `--button-outline-bg` | `white` | Background color |
| `--button-outline-fg` | `hsl(var(--primary))` | Text color |
| `--button-outline-border` | `hsl(var(--primary))` | Border color |
| `--button-outline-border-width` | `1px` | Border width |
| `--button-outline-shadow` | `var(--button-shadow)` | Box shadow (inherits master) |
| `--button-outline-hover-bg` | `hsl(var(--primary))` | Hover background |
| `--button-outline-hover-fg` | `hsl(var(--primary-foreground))` | Hover text color |
| `--button-outline-hover-border` | `white` | Hover border color |
| `--button-outline-shadow-hover` | `var(--button-shadow-hover)` | Hover box shadow (inherits master) |

**Secondary Variant:**

| Variable | Default | Description |
|----------|---------|-------------|

| `--button-secondary-bg` | `hsl(var(--secondary))` | Background color |
| `--button-secondary-fg` | `hsl(var(--secondary-foreground))` | Text color |
| `--button-secondary-border` | `transparent` | Border color |
| `--button-secondary-border-width` | `0px` | Border width |
| `--button-secondary-shadow` | `var(--button-shadow)` | Box shadow (inherits master) |
| `--button-secondary-hover-bg` | `hsl(var(--secondary) / 0.8)` | Hover background |
| `--button-secondary-hover-fg` | `hsl(var(--secondary-foreground))` | Hover text color |
| `--button-secondary-hover-border` | `transparent` | Hover border color |
| `--button-secondary-shadow-hover` | `var(--button-shadow-hover)` | Hover box shadow (inherits master) |

**Ghost Variant:**

| Variable | Default | Description |
|----------|---------|-------------|

| `--button-ghost-bg` | `transparent` | Background color |
| `--button-ghost-fg` | `inherit` | Text color |
| `--button-ghost-border` | `transparent` | Border color |
| `--button-ghost-border-width` | `0px` | Border width |
| `--button-ghost-shadow` | `var(--button-shadow)` | Box shadow (inherits master) |
| `--button-ghost-hover-bg` | `hsl(var(--accent))` | Hover background |
| `--button-ghost-hover-fg` | `hsl(var(--accent-foreground))` | Hover text color |
| `--button-ghost-hover-border` | `transparent` | Hover border color |
| `--button-ghost-shadow-hover` | `var(--button-shadow-hover)` | Hover box shadow (inherits master) |

**Link Variant:**

| Variable | Default | Description |
|----------|---------|-------------|

| `--button-link-bg` | `transparent` | Background color |
| `--button-link-fg` | `hsl(var(--primary))` | Text color |
| `--button-link-border` | `transparent` | Border color |
| `--button-link-border-width` | `0px` | Border width |
| `--button-link-shadow` | `var(--button-shadow)` | Box shadow (inherits master) |
| `--button-link-hover-bg` | `transparent` | Hover background |
| `--button-link-hover-fg` | `hsl(var(--primary))` | Hover text color |
| `--button-link-shadow-hover` | `var(--button-shadow-hover)` | Hover box shadow (inherits master) |

#### Example: Complete Button Customization

```css
:root {
  /* Master button typography */
  --button-font-family: 'Inter', sans-serif;
  --button-font-weight: 600;
  --button-letter-spacing: 0.025em;
  --button-text-transform: uppercase;

  /* Smooth, slower transitions */
  --button-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);

  /* Global hover shadow effect */
  --button-shadow-hover: 0 4px 12px rgb(0 0 0 / 0.15);

  /* Custom outline button with primary border and lift effect */
  --button-outline-border: hsl(var(--primary));
  --button-outline-border-width: 2px;
  --button-outline-hover-bg: hsl(var(--primary));
  --button-outline-hover-fg: white;
  --button-outline-hover-border: hsl(var(--primary));
  --button-outline-shadow-hover: 0 6px 20px hsl(var(--primary) / 0.3);

  /* Custom default button with shadow */
  --button-default-shadow: 0 2px 4px rgb(0 0 0 / 0.1);
  --button-default-shadow-hover: 0 8px 24px hsl(var(--primary) / 0.4);
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

### Step 1: Include @opensite/ui and @page-speed/pressable in Tailwind Content

```js
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@opensite/ui/dist/**/*.{js,mjs}",

    // IMPORTANT: Include @page-speed/pressable for button/link styles
    // For standard npm/yarn installations:
    "./node_modules/@page-speed/pressable/dist/**/*.{js,cjs}",

    // For pnpm monorepos (use both if unsure):
    "./node_modules/.pnpm/@page-speed+pressable*/node_modules/@page-speed/pressable/**/*.{js,jsx,ts,tsx}",
  ],
  // ... rest of config
}
```

> **Note:** Since the `Pressable` component has been extracted to `@page-speed/pressable`, you must include its paths in your Tailwind content configuration for button and link styles to work properly.

### Step 2: Use Tailwind Classes with Components

All @opensite/ui components accept `className` prop for Tailwind utilities:

```tsx
<Container className="bg-linear-to-b from-blue-500 to-purple-600">
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

## Server-Side Style Synchronization

### Overview

When managing styles for multiple client sites from a central server/database, it's critical to maintain synchronization between:

1. **CSS Variables** (`:root` declarations in `globals.css`)
2. **Tailwind Config** (`tailwind.config.ts` theme extensions)
3. **Database/Server Records** (stored style values)

### Recommended Strategy: CSS Variables as Source of Truth

The most intuitive and maintainable approach is to use **CSS variables as the single source of truth**, then generate Tailwind config dynamically.

#### Architecture

```
┌─────────────────────────┐
│  Database/Server        │
│  (Style Records)        │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  CSS Variables          │
│  (:root declarations)   │  ◄── SOURCE OF TRUTH
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  @theme inline          │
│  (Tailwind Mapping)     │  ◄── AUTOMATIC MAPPING
└─────────────────────────┘
```

#### Why This Works

**Tailwind 4's `@theme inline` automatically reads CSS variables**, so you only need to maintain CSS variables and the mapping happens automatically. This eliminates the sync problem entirely.

### Implementation Steps

#### Step 1: Store Styles in Database

```sql
-- Example schema for storing client styles
CREATE TABLE site_styles (
  site_id INTEGER PRIMARY KEY,
  primary_color VARCHAR(20),        -- "220 90% 56%"
  primary_foreground VARCHAR(20),   -- "0 0% 100%"
  border_radius VARCHAR(10),        -- "0.5rem"
  button_radius VARCHAR(10),        -- "9999px"
  -- ... other style properties
  updated_at TIMESTAMP
);
```

#### Step 2: Generate CSS Variables Server-Side

```typescript
// Example: Generate CSS from database values
async function generateClientCSS(siteId: number): Promise<string> {
  const styles = await db.siteStyles.findOne({ siteId });

  return `
@import "tailwindcss";
@custom-variant dark (&:is(.dark *));
@config "../tailwind.config.ts";

@layer base {
  :root {
    --primary: ${styles.primary_color};
    --primary-foreground: ${styles.primary_foreground};
    --radius: ${styles.border_radius};
    --button-radius: ${styles.button_radius};
    /* ... other variables ... */
  }
}

@theme inline {
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  /* ... mappings are consistent across all sites ... */
  /* NOTE: no --font-* mappings here — see the warning below. */
}
`;
}
```

> ⚠️ **Do not add `--font-sans/-serif/-mono` mappings to a server-generated `@theme inline`.**
> Tailwind v4 already names its default font tokens `--font-sans/-serif/-mono`, and the
> unlayered `:root` prelude above beats `@layer theme`, so font utilities track the site's
> variables *without* any mapping. If a generated prelude is ever missing one of the three
> variables, the layered `--font-serif: var(--font-serif)` self-reference becomes the winning
> declaration — a custom-property cycle, invalid at computed-value time — and the
> `font-serif` utility then applies no `font-family` at all. Colors are different: they are
> mapped from differently-named source variables (`--primary` → `--color-primary`), so there
> is no self-reference and no cycle. See
> [Font Loading & @font-face](#font-loading--font-face).

#### Step 3: Serve or Write CSS File

**Option A: Dynamic CSS Endpoint**

```typescript
// Serve CSS dynamically per client
app.get("/styles/:siteId.css", async (req, res) => {
  const css = await generateClientCSS(req.params.siteId);
  res.setHeader("Content-Type", "text/css");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.send(css);
});
```

**Option B: Build-Time Generation**

```typescript
// Generate CSS file during build process
async function buildClientSite(siteId: number) {
  const css = await generateClientCSS(siteId);
  await fs.writeFile(`./sites/${siteId}/globals.css`, css);

  // Run build
  await exec(`cd ./sites/${siteId} && npm run build`);
}
```

### Handling Style Updates

#### Real-Time Updates

```typescript
// When user updates styles in admin panel
async function updateSiteStyles(siteId: number, updates: StyleUpdates) {
  // 1. Update database
  await db.siteStyles.update(siteId, updates);

  // 2. Regenerate CSS
  const newCSS = await generateClientCSS(siteId);

  // 3a. If using dynamic endpoint: invalidate cache
  cache.delete(`styles:${siteId}`);

  // 3b. If using build-time: trigger rebuild
  await buildClientSite(siteId);

  // 4. Notify client to reload styles
  websocket.emit(`site:${siteId}:styles-updated`);
}
```

#### Preview vs Production

```typescript
// Allow preview before publishing
interface SiteStyles {
  siteId: number;
  published: StyleValues;      // Live on site
  draft: StyleValues | null;   // Preview in editor
}

async function getClientCSS(siteId: number, mode: 'preview' | 'production') {
  const styles = await db.siteStyles.findOne({ siteId });
  const values = mode === 'preview' && styles.draft
    ? styles.draft
    : styles.published;

  return generateCSS(values);
}
```

### CSS Variable Validation

```typescript
// Validate HSL color format
function validateHSLColor(value: string): boolean {
  return /^\d+\s+\d+%\s+\d+%$/.test(value);
}

// Validate size/spacing format
function validateSize(value: string): boolean {
  return /^\d+(\.\d+)?(px|rem|em|%)$/.test(value);
}

// Example usage in update handler
async function updatePrimaryColor(siteId: number, newColor: string) {
  if (!validateHSLColor(newColor)) {
    throw new Error("Invalid HSL format. Expected: '220 90% 56%'");
  }

  await db.siteStyles.update(siteId, { primary_color: newColor });
  await regenerateStyles(siteId);
}
```

### Style Inheritance & Defaults

```typescript
// Define default theme that all sites inherit from
const DEFAULT_THEME = {
  primary: "222.2 47.4% 11.2%",
  primaryForeground: "210 40% 98%",
  radius: "0.5rem",
  buttonRadius: "0.5rem",
  // ... full default set
};

// Merge site-specific overrides with defaults
function mergeWithDefaults(siteStyles: Partial<StyleValues>): StyleValues {
  return {
    ...DEFAULT_THEME,
    ...siteStyles,
  };
}

async function generateClientCSS(siteId: number): Promise<string> {
  const siteStyles = await db.siteStyles.findOne({ siteId });
  const finalStyles = mergeWithDefaults(siteStyles);

  return generateCSSTemplate(finalStyles);
}
```

### Best Practices

1. **Use CSS variables as source of truth** - Let `@theme inline` handle the Tailwind mapping automatically
2. **Validate on write** - Ensure correct formats before saving to database
3. **Cache generated CSS** - Avoid regenerating on every request
4. **Version style changes** - Track history for rollback capability
5. **Provide preview mode** - Let users see changes before publishing
6. **Use sensible defaults** - Inherit from base theme, override selectively
7. **Document HSL format** - Make it clear that colors use "H S% L%" format without `hsl()`
8. **Batch updates** - When updating multiple values, generate CSS once after all changes

### Common Pitfalls to Avoid

❌ **Don't maintain parallel records** - Storing same values in multiple places creates sync issues

❌ **Don't hardcode Tailwind config** - Use dynamic CSS generation instead

❌ **Don't forget dark mode** - Generate both `:root` and `.dark` sections

❌ **Don't skip validation** - Invalid CSS values will break the entire stylesheet

✅ **Do use single source of truth** - CSS variables

✅ **Do generate dynamically** - Server-side or build-time

✅ **Do cache intelligently** - Balance performance and freshness

✅ **Do validate inputs** - Prevent malformed CSS

---

## Version History

- **0.0.3** - Added Tailwind 4 support with `@theme inline`, server-side sync documentation
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
