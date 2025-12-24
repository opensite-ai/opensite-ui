# Pressable Component Usage Examples

## Installation

The `Pressable` component and `useNavigation` hook are part of `@opensite/ui` v0.0.8+.

```tsx
// Import from components
import { Pressable } from "@opensite/ui/components";
import { Pressable } from "@opensite/ui/components/pressable";

// Import hook separately
import { useNavigation } from "@opensite/ui/hooks";
import { useNavigation } from "@opensite/ui/hooks/use-navigation";
```

## Basic Examples

### Simple Link

```tsx
<Pressable href="/about">About Us</Pressable>
```

Renders:
```html
<a href="/about" target="_self">About Us</a>
```

### External Link

```tsx
<Pressable href="https://google.com">Visit Google</Pressable>
```

Renders:
```html
<a href="https://google.com" target="_blank" rel="noopener noreferrer">Visit Google</a>
```

### Phone Link (Auto-normalized)

```tsx
<Pressable href="(432) 238-6131">Call Us</Pressable>
<Pressable href="512-232-2212x123">Call Support</Pressable>
<Pressable href="+14322386131">Direct Call</Pressable>
```

All render properly formatted tel: links:
```html
<a href="tel:+14322386131">Call Us</a>
<a href="tel:+15122322212;ext=123">Call Support</a>
<a href="tel:+14322386131">Direct Call</a>
```

### Email Link (Auto-normalized)

```tsx
<Pressable href="hello@example.com">Email Us</Pressable>
<Pressable href="mailto:hello@example.com">Email Us</Pressable>
```

Both render:
```html
<a href="mailto:hello@example.com">Email Us</a>
```

## Button-Styled Links

### With Icon

```tsx
import { DynamicIcon } from "@opensite/ui/components";

<Pressable href="/quotes" variant="default" size="lg" asButton>
  <DynamicIcon name="lucide/calculator" size={20} />
  Get a Free Quote
</Pressable>
```

Renders as an `<a>` tag styled like a ShadCN button with proper flex layout for icon+label.

### Different Variants

```tsx
<Pressable href="/contact" variant="default" size="md" asButton>
  Contact Us
</Pressable>

<Pressable href="/pricing" variant="outline" size="lg" asButton>
  View Pricing
</Pressable>

<Pressable href="/docs" variant="ghost" size="sm" asButton>
  Documentation
</Pressable>
```

## Custom Layouts

### Card-Style Link

```tsx
<Pressable
  href="/services"
  className="flex flex-col items-start text-left gap-1 px-5 py-6 border-2 bg-dark-charcoal/50 hover:bg-primary-red transition-colors"
>
  <DynamicIcon name="service-icon" size={30} className="pb-3 pt-1" />
  <p className="text-xs font-semibold uppercase tracking-wide">Services</p>
  <p className="font-bold text-lg leading-snug">Explore Our Offerings</p>
</Pressable>
```

### Navigation Menu Item

```tsx
<Pressable
  href="/features"
  className="flex items-start gap-3 rounded-xl border border-neutral-lightgray/70 px-4 py-3 hover:border-primary-red hover:bg-primary-red/5 transition-colors"
>
  <DynamicIcon name="lucide/star" size={20} color="#6b7280" />
  <div>
    <p className="font-semibold text-dark-charcoal">Features</p>
    <p className="text-sm text-neutral-gray">Discover what we offer</p>
  </div>
</Pressable>
```

## Button (No Link)

```tsx
<Pressable
  onClick={() => alert("Clicked")}
  variant="default"
  size="md"
  asButton
>
  Click Me
</Pressable>
```

Renders:
```html
<button type="button" class="...button-classes">Click Me</button>
```

## Internal URL Normalization

The component automatically converts full URLs matching the current origin to relative paths:

```tsx
// All of these render as <a href="/blog-123">
<Pressable href="/blog-123">Blog Post</Pressable>
<Pressable href="https://jordansite.com/blog-123">Blog Post</Pressable>
<Pressable href="https://www.jordansite.com/blog-123">Blog Post</Pressable>
```

This ensures proper React Router integration and SEO.

## SEO-Friendly Behavior

**Important:** Internal links ALWAYS render as `<a>` tags for SEO, even when styled as buttons:

```tsx
// This renders an <a> tag, NOT a <button>
<Pressable
  href="/about"
  componentType="button"  // Ignored for internal links
  variant="default"
  asButton
>
  About Us
</Pressable>
```

Output:
```html
<a href="/about" target="_self" class="...button-classes">About Us</a>
```

## Fallback Components

When there's no `href` or `onClick`, the component renders a fallback (default: `<span>`):

```tsx
<Pressable fallbackComponentType="div">
  Static Content
</Pressable>
```

Renders:
```html
<div>Static Content</div>
```

## Using the Hook Directly

For custom implementations:

```tsx
import { useNavigation } from "@opensite/ui/hooks";

function CustomLink({ href, children }) {
  const nav = useNavigation({ href });

  return (
    <a
      href={nav.normalizedHref}
      target={nav.target}
      rel={nav.rel}
      onClick={nav.handleClick}
    >
      {children}
    </a>
  );
}
```

Hook returns:
- `linkType`: "internal" | "external" | "mailto" | "tel" | "none"
- `normalizedHref`: Cleaned and formatted href
- `target`: "_blank" | "_self" | undefined
- `rel`: "noopener noreferrer" | undefined
- `isExternal`: boolean
- `isInternal`: boolean
- `shouldUseRouter`: boolean
- `handleClick`: Click handler with navigation logic

## Props Reference

```tsx
interface PressableProps {
  // Content
  children: React.ReactNode;

  // Navigation
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;

  // Styling (from ShadCN Button)
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "md" | "lg" | "icon" | "icon-sm" | "icon-lg";
  asButton?: boolean; // Apply button styles to links

  // Component rendering
  componentType?: "a" | "button" | "span" | "div";
  fallbackComponentType?: "span" | "div" | "button"; // Default: "span"

  // Standard props
  className?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  id?: string;

  // Plus all standard <a> and <button> props
}
```

## Migration from Standard Components

### Before (manual target/rel management)

```tsx
<a
  href={item.href}
  target={item.href.startsWith("http") ? "_blank" : "_self"}
  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
>
  {item.label}
</a>
```

### After (automatic)

```tsx
<Pressable href={item.href}>
  {item.label}
</Pressable>
```

The component automatically handles:
- External link detection
- Phone number normalization
- Email normalization
- Internal URL normalization
- Target and rel attributes
- React Router integration
