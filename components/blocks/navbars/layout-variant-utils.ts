import { cn } from "../../../lib/utils";

/**
 * Layout variant type for navbar components
 */
export type NavbarLayoutVariant =
  | "fullScreenContainerizedLinks"
  | "fullScreenFullWidthLinks"
  | "floatingBar";

/**
 * Get the appropriate CSS classes for a navbar based on its layout variant
 */
export function getNavbarLayoutClasses(
  layoutVariant: NavbarLayoutVariant = "fullScreenContainerizedLinks",
  customClasses?: {
    className?: string;
    containerClassName?: string;
  }
) {
  const isFloatingBar = layoutVariant === "floatingBar";
  const isFullWidthLinks = layoutVariant === "fullScreenFullWidthLinks";
  const isContainerizedLinks = layoutVariant === "fullScreenContainerizedLinks";

  return {
    // Section wrapper classes - always full width for non-floating variants
    sectionClasses: cn(
      "inset-x-0 z-20",
      isFloatingBar ? "sticky top-4" : "top-0",
      customClasses?.className
    ),

    // Outer container wrapper (only for floating bar - this containerizes the entire navbar)
    containerWrapperClasses: cn(
      "w-full",
      isFloatingBar && "mx-auto w-full px-2 sm:px-4 lg:px-8 max-w-7xl relative z-10"
    ),

    // Inner container classes (only for fullScreenContainerizedLinks - this containerizes the content inside the navbar)
    innerContainerClasses: cn(
      isContainerizedLinks && "container",
      isFullWidthLinks && "mx-auto w-full px-2 sm:px-4 lg:px-8",
      customClasses?.containerClassName
    ),

    // Navigation wrapper classes (for border and shadow)
    navWrapperClasses: cn(
      "w-full",
      isFloatingBar
        ? "border border-border/50 shadow-sm rounded-full"
        : "border-b border-border/50 shadow-sm"
    ),

    // Section container configuration for full-width navbars
    sectionContainerClassName: "px-0 sm:px-0 lg:px-0",
    sectionContainerMaxWidth: "full" as const,

    // Spacing adjustment for Section component
    spacingOverride: isFloatingBar ? "none" as const : undefined,
  };
}
