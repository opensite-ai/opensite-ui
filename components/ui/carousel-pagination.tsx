"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Pressable } from "../../lib/Pressable";
import { DynamicIcon } from "./dynamic-icon";

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
   * Size of the icon in pixels
   * @default 24
   */
  iconSize?: number;
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  /**
   * Additional CSS classes for the buttons
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
 * - Circular buttons with consistent sizing
 * - Disabled state with reduced opacity
 * - Positioned with flexbox for flexible placement
 * - Works with any carousel implementation
 * 
 * @example
 * ```tsx
 * <CarouselPagination
 *   onPrevious={() => scroll("left")}
 *   onNext={() => scroll("right")}
 *   canScrollPrevious={!isAtStart}
 *   canScrollNext={!isAtEnd}
 * />
 * ```
 */
export function CarouselPagination({
  onPrevious,
  onNext,
  canScrollPrevious = true,
  canScrollNext = true,
  iconSize = 24,
  className,
  buttonClassName,
  previousIcon = "lucide/arrow-left",
  nextIcon = "lucide/arrow-right",
  previousAriaLabel = "Previous",
  nextAriaLabel = "Next",
}: CarouselPaginationProps): React.JSX.Element {
  return (
    <div className={cn("flex justify-end gap-2", className)}>
      <Pressable
        onClick={onPrevious}
        disabled={!canScrollPrevious}
        aria-label={previousAriaLabel}
        asButton
        className={cn(
          "relative z-40 flex h-10 w-10 items-center justify-center rounded-full disabled:opacity-50",
          buttonClassName,
        )}
      >
        <DynamicIcon name={previousIcon} size={iconSize} />
      </Pressable>
      <Pressable
        onClick={onNext}
        disabled={!canScrollNext}
        aria-label={nextAriaLabel}
        asButton
        className={cn(
          "relative z-40 flex h-10 w-10 items-center justify-center rounded-full disabled:opacity-50",
          buttonClassName,
        )}
      >
        <DynamicIcon name={nextIcon} size={iconSize} />
      </Pressable>
    </div>
  );
}

