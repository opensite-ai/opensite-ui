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

  return {
    // Section wrapper classes
    sectionClasses: cn(
      "inset-x-0 z-20",
      isFloatingBar ? "sticky top-4" : "top-0",
      customClasses?.className
    ),

    // Outer container wrapper (only for floating bar)
    containerWrapperClasses: cn(
      isFloatingBar && "mx-auto w-full px-2 sm:px-4 lg:px-8 max-w-7xl relative z-10"
    ),

    // Inner container classes
    innerContainerClasses: cn(
      !isFloatingBar && !isFullWidthLinks && "container",
      isFullWidthLinks && "mx-auto w-full px-2 sm:px-4 lg:px-8",
      customClasses?.containerClassName
    ),

    // Navigation wrapper classes (for border and shadow)
    navWrapperClasses: cn(
      isFloatingBar
        ? "border border-border/50 shadow-sm rounded-full"
        : "border-b border-border/50 shadow-sm"
    ),

    // Spacing adjustment for Section component
    spacingOverride: isFloatingBar ? "none" as const : undefined,
  };
}

