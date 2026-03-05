import * as React from "react";
import { cn } from "../../lib/utils";
import { DynamicIcon } from "./dynamic-icon";

export interface StarRatingProps {
  /**
   * Star rating value (1-5)
   */
  rating: number;
  /**
   * Icon size in pixels
   */
  size?: number;
  /**
   * Additional CSS classes for the container
   */
  className?: string;
}

/**
 * StarRating - Displays a 1-5 star rating using filled/muted star icons.
 * Uses CSS variable-based colors (primary/muted) for theme compatibility.
 *
 * @example
 * ```tsx
 * <StarRating rating={4} size={18} />
 * ```
 */
export function StarRating({
  rating,
  size = 18,
  className,
}: StarRatingProps): React.JSX.Element {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <DynamicIcon
          key={star}
          name="icon-park-solid/star"
          size={size}
          className={cn(
            star <= rating
              ? "fill-primary text-primary"
              : "fill-muted text-muted",
          )}
        />
      ))}
    </div>
  );
}
