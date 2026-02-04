"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Pressable } from "../../lib/Pressable";
import { DynamicIcon } from "./dynamic-icon";

/**
 * Button size configuration for CarouselPagination
 * Each size defines the button dimensions and corresponding icon size
 */
const BUTTON_SIZES = {
  sm: { buttonSize: "size-8", iconSize: 16 },
  md: { buttonSize: "size-10", iconSize: 20 },
  lg: { buttonSize: "size-12", iconSize: 24 },
  xl: { buttonSize: "size-14", iconSize: 28 },
} as const;

export type CarouselPaginationSize = keyof typeof BUTTON_SIZES;

export interface CarouselPaginationProps {
  /**
   * Handler for scrolling to the previous item
   */
  onPrevious: () => void;
  /**
   * Handler for scrolling to the next item
   */
  onNext: () => void;
  /**
   * Whether the previous button should be disabled
   */
  canScrollPrevious?: boolean;
  /**
   * Whether the next button should be disabled
   */
  canScrollNext?: boolean;
  /**
   * Predefined button size - controls both button dimensions and icon size
   * @default "md"
   */
  size?: CarouselPaginationSize;
  /**
   * Responsive size - mobile size (optional, uses `size` if not provided)
   * Use this for different sizes on mobile vs desktop
   * @example size="lg" mobileSize="md" -> md on mobile, lg on desktop
   */
  mobileSize?: CarouselPaginationSize;
  /**
   * Custom icon size in pixels (overrides the size-based default)
   * @deprecated Use `size` prop instead for consistent sizing
   */
  iconSize?: number;
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  /**
   * Additional CSS classes for the buttons
   * Note: Size-related classes (size-*, h-*, w-*) will be overridden by the `size` prop
   * to ensure perfect circles. Use `size` prop to control button dimensions.
   */
  buttonClassName?: string;
  /**
   * Icon name for the previous button
   * @default "lucide/arrow-left"
   */
  previousIcon?: string;
  /**
   * Icon name for the next button
   * @default "lucide/arrow-right"
   */
  nextIcon?: string;
  /**
   * Aria label for the previous button
   * @default "Previous"
   */
  previousAriaLabel?: string;
  /**
   * Aria label for the next button
   * @default "Next"
   */
  nextAriaLabel?: string;
}

/**
 * CarouselPagination - Reusable carousel navigation buttons based on AppleCarousel design.
 *
 * Features:
 * - **Perfect circles** - Uses aspect-square and explicit sizing to guarantee circular buttons
 * - **Consistent sizing** - Use the `size` prop for uniform appearance across devices
 * - **Responsive sizing** - Use `mobileSize` + `size` for different sizes on mobile/desktop
 * - **Disabled state** - Reduced opacity when at scroll boundaries
 * - **Flexible placement** - Container uses flexbox for easy positioning
 *
 * @example Basic usage
 * ```tsx
 * <CarouselPagination
 *   onPrevious={() => scroll("left")}
 *   onNext={() => scroll("right")}
 *   canScrollPrevious={!isAtStart}
 *   canScrollNext={!isAtEnd}
 * />
 * ```
 *
 * @example Responsive sizing (smaller on mobile, larger on desktop)
 * ```tsx
 * <CarouselPagination
 *   size="lg"
 *   mobileSize="md"
 *   onPrevious={scrollPrev}
 *   onNext={scrollNext}
 * />
 * ```
 *
 * @example Custom styling
 * ```tsx
 * <CarouselPagination
 *   size="xl"
 *   buttonClassName="bg-primary text-primary-foreground hover:bg-primary/90"
 *   onPrevious={scrollPrev}
 *   onNext={scrollNext}
 * />
 * ```
 */
export function CarouselPagination({
  onPrevious,
  onNext,
  canScrollPrevious = true,
  canScrollNext = true,
  size = "md",
  mobileSize,
  iconSize: customIconSize,
  className,
  buttonClassName,
  previousIcon = "lucide/arrow-left",
  nextIcon = "lucide/arrow-right",
  previousAriaLabel = "Previous",
  nextAriaLabel = "Next",
}: CarouselPaginationProps): React.JSX.Element {
  // Get size configurations
  const desktopConfig = BUTTON_SIZES[size];
  const mobileConfig = mobileSize ? BUTTON_SIZES[mobileSize] : desktopConfig;

  // Build responsive size classes
  // If mobileSize is different from size, use responsive prefixes
  const sizeClasses =
    mobileSize && mobileSize !== size
      ? `${mobileConfig.buttonSize} md:${desktopConfig.buttonSize}`
      : desktopConfig.buttonSize;

  // Use custom icon size if provided, otherwise use size-based default
  // For responsive sizing, we use the desktop icon size (icons scale better at larger sizes)
  const effectiveIconSize = customIconSize ?? desktopConfig.iconSize;

  // Base button styles that ensure perfect circles:
  // - aspect-square: Forces equal width/height ratio
  // - !p-0: Overrides any padding from buttonVariants that would stretch the button
  // - rounded-full: Perfect circle border-radius
  // - flex items-center justify-center: Centers the icon
  const baseButtonStyles = cn(
    "relative z-40 flex items-center justify-center",
    "aspect-square !p-0 rounded-full", // Force perfect circle
    sizeClasses,
    "disabled:opacity-50",
    buttonClassName
  );

  return (
    <div className={cn("flex justify-end gap-2", className)}>
      <Pressable
        onClick={onPrevious}
        disabled={!canScrollPrevious}
        aria-label={previousAriaLabel}
        asButton
        className={baseButtonStyles}
      >
        <DynamicIcon name={previousIcon} size={effectiveIconSize} />
      </Pressable>
      <Pressable
        onClick={onNext}
        disabled={!canScrollNext}
        aria-label={nextAriaLabel}
        asButton
        className={baseButtonStyles}
      >
        <DynamicIcon name={nextIcon} size={effectiveIconSize} />
      </Pressable>
    </div>
  );
}

// Export the size constants for external use if needed
export { BUTTON_SIZES as CAROUSEL_PAGINATION_SIZES };

