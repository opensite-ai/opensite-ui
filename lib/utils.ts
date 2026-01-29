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
    parentBg === "dark" ||
    parentBg === "secondary" ||
    parentBg === "primary";

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
    parentBg === "dark" ||
    parentBg === "secondary" ||
    parentBg === "primary";

  // When using inverted background on dark parent, ensure text is visible
  return isDark ? "text-foreground" : "";
}
