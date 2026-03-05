"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

/**
 * Gradient direction presets.
 * Linear directions map to CSS gradient angles.
 * "radial-center" produces a centered radial gradient.
 */
export type GradientDirection =
  | "bottom-to-top"
  | "top-to-bottom"
  | "left-to-right"
  | "right-to-left"
  | "bottom-left-to-top-right"
  | "bottom-right-to-top-left"
  | "top-left-to-bottom-right"
  | "top-right-to-bottom-left"
  | "radial-center";

/**
 * Intensity presets controlling the opacity stops of the dark overlay.
 */
export type GradientIntensity = "low" | "default" | "high" | "very-high";

export interface GradientOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Direction of the gradient.
   * @default "bottom-to-top"
   */
  direction?: GradientDirection;
  /**
   * Intensity of the dark overlay.
   * @default "default"
   */
  intensity?: GradientIntensity;
}

const DIRECTION_STYLES: Record<
  Exclude<GradientDirection, "radial-center">,
  string
> = {
  "bottom-to-top": "bg-linear-to-t",
  "top-to-bottom": "bg-linear-to-b",
  "left-to-right": "bg-linear-to-r",
  "right-to-left": "bg-linear-to-l",
  "bottom-left-to-top-right": "bg-linear-to-tr",
  "bottom-right-to-top-left": "bg-linear-to-tl",
  "top-left-to-bottom-right": "bg-linear-to-br",
  "top-right-to-bottom-left": "bg-linear-to-bl",
};

const INTENSITY_STOPS: Record<GradientIntensity, string> = {
  low: "from-black/40 via-black/20 to-transparent",
  default: "from-black/70 via-black/35 to-transparent",
  high: "from-black/85 via-black/50 to-transparent",
  "very-high": "from-black/95 via-black/60 to-black/20",
};

const RADIAL_INTENSITY: Record<GradientIntensity, React.CSSProperties> = {
  low: {
    background:
      "radial-gradient(ellipse at center, rgba(0,0,0,0.40) 0%, rgba(0,0,0,0.20) 50%, transparent 100%)",
  },
  default: {
    background:
      "radial-gradient(ellipse at center, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)",
  },
  high: {
    background:
      "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.50) 50%, transparent 100%)",
  },
  "very-high": {
    background:
      "radial-gradient(ellipse at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.60) 50%, rgba(0,0,0,0.20) 100%)",
  },
};

/**
 * GradientOverlay - A theme-safe dark gradient overlay that uses hardcoded
 * black opacity stops instead of CSS variable-based colors. This avoids
 * issues with the dynamic color engine where `from-foreground/70` could
 * resolve to unexpected colors depending on the client theme.
 *
 * Drop-in replacement for patterns like:
 * `<div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/40 to-transparent" />`
 *
 * Also replaces brightness filter hacks on images/videos by overlaying
 * a gradient on top of the media instead of dimming the entire image.
 *
 * @example
 * ```tsx
 * // Basic bottom-to-top dark overlay (default)
 * <div className="relative">
 *   <img src="/hero.jpg" className="w-full" />
 *   <GradientOverlay />
 * </div>
 *
 * // High intensity, top-to-bottom
 * <GradientOverlay direction="top-to-bottom" intensity="high" />
 *
 * // With extra classes
 * <GradientOverlay className="rounded-2xl" intensity="low" />
 * ```
 */
export function GradientOverlay({
  direction = "bottom-to-top",
  intensity = "default",
  className,
  style,
  ...props
}: GradientOverlayProps): React.JSX.Element {
  if (direction === "radial-center") {
    return (
      <div
        className={cn("absolute inset-0", className)}
        style={{ ...RADIAL_INTENSITY[intensity], ...style }}
        {...props}
      />
    );
  }

  return (
    <div
      className={cn(
        "absolute inset-0",
        DIRECTION_STYLES[direction],
        INTENSITY_STOPS[intensity],
        className,
      )}
      style={style}
      {...props}
    />
  );
}
