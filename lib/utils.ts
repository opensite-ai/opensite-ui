import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { SectionBackground } from "../src/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Maps brightness prop values to Tailwind classes
 * Values 10-40 use arbitrary values for finer control on bright images
 */
export const BRIGHTNESS_CLASS_MAP: Record<string, string> = {
  "10": "brightness-[.1]",
  "20": "brightness-[.2]",
  "25": "brightness-[.25]",
  "30": "brightness-[.3]",
  "40": "brightness-[.4]",
  "50": "brightness-50",
  "75": "brightness-75",
  "100": "brightness-100",
};

/**
 * Variant types for nested card backgrounds
 */
export type NestedCardVariant = "muted" | "card" | "accent" | "subtle";

/**
 * Options for customizing nested card background behavior
 */
export interface NestedCardBgOptions {
  /**
   * Manual override - bypasses all automatic logic and uses this class directly.
   * Use this for client-specific customizations or edge cases.
   *
   * @example
   * // Client wants white cards regardless of parent background
   * getNestedCardBg(background, 'muted', { override: 'bg-white' })
   */
  override?: string;

  /**
   * Disable smart inversion logic - always use the variant as-is.
   * Use this when you want consistent backgrounds regardless of parent.
   *
   * @example
   * // Always use bg-muted, even on dark backgrounds
   * getNestedCardBg(background, 'muted', { disableInversion: true })
   */
  disableInversion?: boolean;
}

/**
 * Get the appropriate background class for nested cards/callouts based on parent Section background.
 *
 * This utility implements **context-aware background inversion** to ensure nested elements
 * maintain proper contrast and visibility across all Section background variants.
 *
 * **How it works:**
 * - On **dark backgrounds** (dark, secondary, primary): Uses lighter backgrounds for contrast
 * - On **light backgrounds** (default, white, gray, muted): Uses darker backgrounds for elevation
 *
 * **Variants:**
 * - `muted`: Standard card background with subtle contrast
 * - `card`: Semantic card background (similar to muted)
 * - `accent`: Accent-colored background for emphasis
 * - `subtle`: Semi-transparent background for layering
 *
 * @param parentBg - The parent Section's background variant
 * @param variant - The type of nested card background to use (default: 'muted')
 * @param options - Optional configuration for overrides or disabling inversion
 * @returns Tailwind background class string
 *
 * @example
 * // Standard usage - auto-inverts based on parent
 * <div className={cn(getNestedCardBg(background), "p-6 rounded-lg")}>
 *
 * @example
 * // Accent variant
 * <div className={cn(getNestedCardBg(background, 'accent'), "p-6 rounded-lg")}>
 *
 * @example
 * // Client override - always white
 * <div className={cn(getNestedCardBg(background, 'muted', { override: 'bg-white' }), "p-6")}>
 *
 * @example
 * // Disable inversion - always use bg-muted
 * <div className={cn(getNestedCardBg(background, 'muted', { disableInversion: true }), "p-6")}>
 */
export function getNestedCardBg(
  parentBg?: SectionBackground,
  variant: NestedCardVariant = "muted",
  options?: NestedCardBgOptions,
): string {
  // Priority 1: Manual override
  if (options?.override) return options.override;

  // Priority 2: Disabled inversion - use variant as-is
  if (options?.disableInversion) {
    return `bg-${variant}`;
  }

  // Priority 3: Smart inversion based on parent background
  const isDark =
    parentBg === "dark" || parentBg === "secondary" || parentBg === "primary";

  if (isDark) {
    // For dark backgrounds, use lighter backgrounds for contrast
    switch (variant) {
      case "muted":
        return "bg-background";
      case "card":
        return "bg-card";
      case "accent":
        return "bg-accent";
      case "subtle":
        return "bg-background/50";
    }
  } else {
    // For light backgrounds, use darker backgrounds for elevation
    switch (variant) {
      case "muted":
        return "bg-muted";
      case "card":
        return "bg-card";
      case "accent":
        return "bg-accent";
      case "subtle":
        return "bg-muted/50";
    }
  }
}

/**
 * Get the appropriate text color class for nested cards/callouts based on parent Section background.
 *
 * This companion function to `getNestedCardBg` ensures text remains visible when using
 * inverted backgrounds on dark parent Sections.
 *
 * **How it works:**
 * - On **dark backgrounds**: Returns 'text-foreground' to ensure text is visible on the lighter card
 * - On **light backgrounds**: Returns empty string (text inherits from parent)
 *
 * @param parentBg - The parent Section's background variant
 * @param options - Optional configuration for manual override
 * @returns Tailwind text color class string (or empty string)
 *
 * @example
 * // Standard usage with background helper
 * <div className={cn(
 *   getNestedCardBg(background),
 *   getNestedCardTextColor(background),
 *   "p-6 rounded-lg"
 * )}>
 *
 * @example
 * // Custom text color override
 * <div className={cn(
 *   getNestedCardBg(background),
 *   getNestedCardTextColor(background, { override: 'text-blue-900' }),
 *   "p-6"
 * )}>
 */
export function getNestedCardTextColor(
  parentBg?: SectionBackground,
  options?: { override?: string },
): string {
  if (options?.override) return options.override;

  const isDark =
    parentBg === "dark" || parentBg === "secondary" || parentBg === "primary";

  // When using inverted background on dark parent, ensure text is visible
  return isDark ? "text-foreground" : "";
}

/**
 * Text color variant types for dynamic theming
 */
export type TextColorVariant = "default" | "muted" | "subtle" | "accent";

/**
 * Get the appropriate text color class based on parent Section background.
 *
 * This utility provides **context-aware text coloring** that adapts to the parent
 * Section's background to ensure optimal readability and visual hierarchy.
 *
 * **How it works:**
 * - On **dark backgrounds** (dark, secondary, primary): Uses lighter text colors
 * - On **light backgrounds** (default, white, gray, muted): Uses darker text colors
 *
 * **Variants:**
 * - `default`: Primary text color (highest contrast)
 * - `muted`: Secondary text color (medium contrast) - for descriptions, labels
 * - `subtle`: Tertiary text color (lower contrast) - for captions, metadata
 * - `accent`: Accent color - for emphasis, links, highlights
 *
 * @param parentBg - The parent Section's background variant
 * @param variant - The type of text color to use (default: 'default')
 * @param options - Optional configuration for manual override
 * @returns Tailwind text color class string
 *
 * @example
 * // Muted text for descriptions
 * <p className={getTextColor(background, 'muted')}>
 *   This is a description with reduced emphasis
 * </p>
 *
 * @example
 * // Accent text for links
 * <a className={getTextColor(background, 'accent')}>
 *   Learn more
 * </a>
 *
 * @example
 * // Manual override
 * <span className={getTextColor(background, 'default', { override: 'text-blue-600' })}>
 *   Custom color
 * </span>
 */
export function getTextColor(
  parentBg?: SectionBackground,
  variant: TextColorVariant = "default",
  options?: { override?: string },
): string {
  if (options?.override) return options.override;

  const isDark =
    parentBg === "dark" || parentBg === "secondary" || parentBg === "primary";

  if (isDark) {
    // For dark backgrounds, use lighter text colors
    switch (variant) {
      case "default":
        return "text-foreground";
      case "muted":
        return "text-foreground/80";
      case "subtle":
        return "text-foreground/60";
      case "accent":
        return "text-accent-foreground";
    }
  } else {
    // For light backgrounds, use darker text colors
    switch (variant) {
      case "default":
        return "text-foreground";
      case "muted":
        return "text-muted-foreground";
      case "subtle":
        return "text-muted-foreground/70";
      case "accent":
        return "text-primary";
    }
  }
}

/**
 * Get the appropriate accent color class based on parent Section background.
 *
 * This utility provides **context-aware accent coloring** for icons, decorations,
 * and emphasis elements that need to stand out from the background.
 *
 * **How it works:**
 * - On **dark backgrounds**: Uses lighter accent colors for visibility
 * - On **light backgrounds**: Uses primary brand color for emphasis
 *
 * @param parentBg - The parent Section's background variant
 * @param options - Optional configuration for manual override
 * @returns Tailwind text color class string (for icons/SVGs)
 *
 * @example
 * // Icon with dynamic accent color
 * <DynamicIcon className={getAccentColor(background)} />
 *
 * @example
 * // Decorative element
 * <div className={cn(getAccentColor(background), "absolute top-0 right-0")}>
 *   <CornerIllustration />
 * </div>
 */
export function getAccentColor(
  parentBg?: SectionBackground,
  options?: { override?: string },
): string {
  if (options?.override) return options.override;

  const isDark =
    parentBg === "dark" || parentBg === "secondary" || parentBg === "primary";

  // On dark backgrounds, use lighter accent; on light backgrounds, use primary
  return isDark ? "text-accent-foreground" : "text-primary";
}

/**
 * Determines if a Section background variant is "dark" (requires light text).
 *
 * This utility identifies backgrounds that use light-colored text (text-background,
 * text-primary-foreground, etc.) where nested content may need inverted styling.
 *
 * **Dark backgrounds:**
 * - `dark`: Uses `bg-foreground text-background`
 * - `gradient`: Uses `text-primary-foreground`
 * - `primary`: Uses `text-primary-foreground`
 * - `secondary`: Uses `text-secondary-foreground` (typically light on dark secondary)
 *
 * @param bg - The Section's background variant
 * @returns true if the background is dark and requires light text
 *
 * @example
 * if (isDarkBackground(background)) {
 *   // Apply inverted styling
 * }
 */
export function isDarkBackground(bg?: SectionBackground): boolean {
  return (
    bg === "dark" || bg === "gradient" || bg === "primary" || bg === "secondary"
  );
}

/**
 * Get the appropriate prose classes based on parent Section background.
 *
 * This utility provides **context-aware prose styling** that ensures typography
 * content remains readable regardless of the Section's background color.
 *
 * **How it works:**
 * - On **dark backgrounds** (dark, gradient, primary, secondary): Uses `prose-invert`
 *   directly to ensure light text on dark backgrounds
 * - On **light backgrounds**: Uses `dark:prose-invert` so prose inverts only in
 *   system/page dark mode
 *
 * **Required:** The `@tailwindcss/typography` plugin must be installed.
 *
 * **Mobile width containment:** every returned class string includes `min-w-0`.
 * Prose columns are almost always CSS grid or flex items, and a grid/flex item's
 * default `min-width: auto` resolves to its **min-content** width. Article bodies
 * routinely contain descendants whose min-content width is far wider than a phone
 * viewport - a GFM table, a `<pre>` with a long line, an embed with a hard-coded
 * `width` - and without `min-w-0` that min-content width becomes the track's base
 * size. The column then grows past the viewport and drags the *entire* layout with
 * it (clipped headline, floating navbar wider than the screen, horizontal page
 * scroll). `min-w-0` lets the column stay at the track width so the wide child is
 * handled locally (the markdown renderer scrolls tables and code blocks inside
 * their own boxes) instead of deforming the page.
 *
 * `min-w-0` is present in the production Tailwind safelist, so this adds no new
 * class to the safelist-compiled customer-site stylesheet.
 *
 * @param parentBg - The parent Section's background variant
 * @param additionalClasses - Additional prose modifier classes (e.g., "prose-sm", "max-w-none")
 * @returns Tailwind prose class string
 *
 * @example
 * // Basic usage in a block component
 * <div className={cn(getProseClassName(background), "mx-auto max-w-3xl")}>
 *   {children}
 * </div>
 *
 * @example
 * // With additional prose modifiers
 * <div className={cn(getProseClassName(background, "prose-sm max-w-none"))}>
 *   {children}
 * </div>
 *
 * @example
 * // In ArticleHeroProse
 * <div className={cn(getProseClassName(background), proseClassName)}>
 *   {children}
 * </div>
 */
export function getProseClassName(
  parentBg?: SectionBackground,
  additionalClasses?: string,
): string {
  const baseClasses = isDarkBackground(parentBg)
    ? "prose prose-invert min-w-0"
    : "prose dark:prose-invert min-w-0";

  return additionalClasses
    ? `${baseClasses} ${additionalClasses}`
    : baseClasses;
}

/**
 * Border color variant types for dynamic theming
 */
export type BorderColorVariant = "default" | "muted" | "accent";

/**
 * Get the appropriate border color class based on parent Section background.
 *
 * This utility provides **context-aware border coloring** that adapts to the parent
 * Section's background to ensure borders remain visible and aesthetically pleasing.
 *
 * **How it works:**
 * - On **dark backgrounds**: Uses lighter border colors for visibility
 * - On **light backgrounds**: Uses subtle border colors for elegance
 *
 * **Variants:**
 * - `default`: Standard border color (subtle, elegant)
 * - `muted`: Very subtle border (minimal contrast)
 * - `accent`: Accent-colored border (for emphasis)
 *
 * @param parentBg - The parent Section's background variant
 * @param variant - The type of border color to use (default: 'default')
 * @param options - Optional configuration for manual override
 * @returns Tailwind border color class string
 *
 * @example
 * // Card with dynamic border
 * <div className={cn(getBorderColor(background), "border rounded-lg p-6")}>
 *   Content
 * </div>
 *
 * @example
 * // Accent border for emphasis
 * <div className={cn(getBorderColor(background, 'accent'), "border-2 rounded-lg")}>
 *   Featured content
 * </div>
 */
export function getBorderColor(
  parentBg?: SectionBackground,
  variant: BorderColorVariant = "default",
  options?: { override?: string },
): string {
  if (options?.override) return options.override;

  const isDark =
    parentBg === "dark" || parentBg === "secondary" || parentBg === "primary";

  if (isDark) {
    // For dark backgrounds, use lighter borders
    switch (variant) {
      case "default":
        return "border-foreground/20";
      case "muted":
        return "border-foreground/10";
      case "accent":
        return "border-accent-foreground";
    }
  } else {
    // For light backgrounds, use subtle borders
    switch (variant) {
      case "default":
        return "border-border";
      case "muted":
        return "border-muted";
      case "accent":
        return "border-primary";
    }
  }
}
