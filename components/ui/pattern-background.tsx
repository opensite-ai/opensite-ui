"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { patternSvgs } from "../../lib/patternSvgs";

const maskTop =
  "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)";
const maskBottom =
  "radial-gradient(ellipse 100% 80% at 50% 100%, #000 50%, transparent 90%)";
const maskCenter =
  "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)";
const maskTopLeft =
  "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)";
const maskTopRight =
  "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)";
const maskBottomLeft =
  "radial-gradient(ellipse 80% 80% at 0% 100%, #000 50%, transparent 90%)";
const maskBottomRight =
  "radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%)";

const circuitBoardPattern = (id: string, mask?: string) => (
  <svg
    className="h-full w-full"
    xmlns="http://www.w3.org/2000/svg"
    style={
      mask
        ? {
            maskImage: mask,
            WebkitMaskImage: mask,
          }
        : undefined
    }
  >
    <defs>
      <pattern
        id={id}
        x="0"
        y="0"
        width="100"
        height="100"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M0 50h40M60 50h40M50 0v40M50 60v40"
          stroke="hsl(var(--muted))"
          strokeWidth="1"
          fill="none"
        />
        <circle cx="50" cy="50" r="3" fill="hsl(var(--muted))" />
        <circle cx="0" cy="50" r="2" fill="hsl(var(--muted))" />
        <circle cx="100" cy="50" r="2" fill="hsl(var(--muted))" />
        <circle cx="50" cy="0" r="2" fill="hsl(var(--muted))" />
        <circle cx="50" cy="100" r="2" fill="hsl(var(--muted))" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
);

const gridDotsPattern = (id: string, mask?: string) => (
  <svg
    className="h-full w-full"
    xmlns="http://www.w3.org/2000/svg"
    style={
      mask
        ? {
            maskImage: mask,
            WebkitMaskImage: mask,
          }
        : undefined
    }
  >
    <defs>
      <pattern
        id={id}
        x="0"
        y="0"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M0 20h40M20 0v40"
          stroke="hsl(var(--muted))"
          strokeWidth="0.5"
          fill="none"
        />
        <circle cx="20" cy="20" r="2" fill="hsl(var(--muted))" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
);

const gridPattern = (size: number, mask?: string) => (
  <div
    className="h-full w-full bg-[linear-gradient(to_right,_hsl(var(--muted))_1px,_transparent_1px),linear-gradient(to_bottom,_hsl(var(--muted))_1px,_transparent_1px)]"
    style={{
      backgroundSize: `${size}px ${size}px`,
      ...(mask
        ? {
            maskImage: mask,
            WebkitMaskImage: mask,
          }
        : {}),
    }}
  />
);

const diagonalCrossPattern = (mask?: string) => (
  <div
    className="h-full w-full"
    style={{
      backgroundImage:
        "repeating-linear-gradient(45deg, transparent, transparent 32px, hsl(var(--muted)) 32px, hsl(var(--muted)) 33px), repeating-linear-gradient(135deg, transparent, transparent 32px, hsl(var(--muted)) 32px, hsl(var(--muted)) 33px)",
      ...(mask
        ? {
            maskImage: mask,
            WebkitMaskImage: mask,
          }
        : {}),
    }}
  />
);

const dashedGridMaskBase =
  "repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px), repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)";

const dashedGridPattern = (fadeMask?: string) => {
  const mask = fadeMask
    ? `${dashedGridMaskBase}, ${fadeMask}`
    : dashedGridMaskBase;

  return (
    <div
      className="h-full w-full"
      style={{
        backgroundImage:
          "linear-gradient(to right, hsl(var(--muted)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--muted)) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 0",
        maskImage: mask,
        WebkitMaskImage: mask,
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    />
  );
};

const gradientGlow = (position: "top" | "bottom") => (
  <div
    className={cn(
      "pointer-events-none absolute left-1/2 z-0 aspect-square w-3/4 -translate-x-1/2 rounded-full opacity-50 blur-3xl",
      position === "top" ? "-top-1/4" : "-bottom-1/4",
    )}
    style={{
      background:
        "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
    }}
  />
);

const spotlight = (position: "left" | "right") => (
  <div
    className={cn(
      "pointer-events-none absolute top-1/2 z-0 aspect-square w-3/4 -translate-y-1/2 rounded-full opacity-40 blur-3xl",
      position === "left" ? "-left-1/4" : "-right-1/4",
    )}
    style={{
      background:
        "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
    }}
  />
);

const patternOverlays = {
  circuitBoardBasic: () => circuitBoardPattern("circuit-board-basic"),
  circuitBoardFadeTop: () =>
    circuitBoardPattern("circuit-board-fade-top", maskTop),
  circuitBoardFadeBottom: () =>
    circuitBoardPattern("circuit-board-fade-bottom", maskBottom),
  circuitBoardFadeCenter: () =>
    circuitBoardPattern("circuit-board-fade-center", maskCenter),
  circuitBoardFadeTopLeft: () =>
    circuitBoardPattern("circuit-board-fade-top-left", maskTopLeft),
  circuitBoardFadeTopRight: () =>
    circuitBoardPattern("circuit-board-fade-top-right", maskTopRight),
  circuitBoardFadeBottomLeft: () =>
    circuitBoardPattern("circuit-board-fade-bottom-left", maskBottomLeft),
  circuitBoardFadeBottomRight: () =>
    circuitBoardPattern("circuit-board-fade-bottom-right", maskBottomRight),
  dashedGridBasic: () => dashedGridPattern(),
  dashedGridFadeTop: () => dashedGridPattern(maskTop),
  dashedGridFadeBottom: () => dashedGridPattern(maskBottom),
  dashedGridFadeCenter: () => dashedGridPattern(maskCenter),
  dashedGridFadeTopLeft: () => dashedGridPattern(maskTopLeft),
  dashedGridFadeTopRight: () => dashedGridPattern(maskTopRight),
  dashedGridFadeBottomLeft: () => dashedGridPattern(maskBottomLeft),
  dashedGridFadeBottomRight: () => dashedGridPattern(maskBottomRight),
  diagonalCrossBasic: () => diagonalCrossPattern(),
  diagonalCrossFadeTop: () => diagonalCrossPattern(maskTop),
  diagonalCrossFadeBottom: () => diagonalCrossPattern(maskBottom),
  diagonalCrossFadeCenter: () => diagonalCrossPattern(maskCenter),
  diagonalCrossFadeTopLeft: () => diagonalCrossPattern(maskTopLeft),
  diagonalCrossFadeTopRight: () => diagonalCrossPattern(maskTopRight),
  diagonalCrossFadeBottomLeft: () => diagonalCrossPattern(maskBottomLeft),
  diagonalCrossFadeBottomRight: () => diagonalCrossPattern(maskBottomRight),
  gridBasic: () => gridPattern(40),
  gridFadeTop: () => gridPattern(32, maskTop),
  gridFadeBottom: () => gridPattern(32, maskBottom),
  gridFadeCenter: () => gridPattern(40, maskCenter),
  gridFadeTopLeft: () => gridPattern(32, maskTopLeft),
  gridFadeTopRight: () => gridPattern(32, maskTopRight),
  gridFadeBottomLeft: () => gridPattern(32, maskBottomLeft),
  gridFadeBottomRight: () => gridPattern(32, maskBottomRight),
  gridDotsBasic: () => gridDotsPattern("grid-dots-basic"),
  gridDotsFadeCenter: () =>
    gridDotsPattern("grid-dots-fade-center", maskCenter),
  gradientGlowTop: () => gradientGlow("top"),
  gradientGlowBottom: () => gradientGlow("bottom"),
  spotlightLeft: () => spotlight("left"),
  spotlightRight: () => spotlight("right"),
};

const inlinePatternStyles = {
  radialGradientTop: {
    background:
      "radial-gradient(125% 125% at 50% 10%, hsl(var(--background)) 40%, hsl(var(--primary)) 100%)",
  },
  radialGradientBottom: {
    background:
      "radial-gradient(125% 125% at 50% 90%, hsl(var(--background)) 40%, hsl(var(--primary)) 100%)",
  },
};

/**
 * Specific type for pattern overlay names
 * Use this type for components that want to restrict patterns to the predefined overlay options
 */
export type PatternOverlayName = keyof typeof patternOverlays;

/**
 * General pattern name type that includes all pattern types
 * Includes pattern overlays, SVG patterns, and inline pattern styles
 */
export type PatternName =
  | keyof typeof patternSvgs
  | keyof typeof patternOverlays
  | keyof typeof inlinePatternStyles;

interface PatternBackgroundProps {
  pattern?: PatternName | undefined;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function PatternBackground({
  pattern,
  opacity = 0.08,
  className,
  style,
}: PatternBackgroundProps) {
  if (!pattern) {
    return null;
  }

  if (pattern in inlinePatternStyles) {
    const inlineStyle =
      inlinePatternStyles[pattern as keyof typeof inlinePatternStyles];
    return (
      <div
        className={cn("pointer-events-none absolute inset-0 z-0", className)}
        style={{ ...inlineStyle, opacity, ...style }}
        aria-hidden="true"
      />
    );
  }

  if (pattern in patternOverlays) {
    const Overlay = patternOverlays[pattern as keyof typeof patternOverlays];
    return (
      <div
        className={cn("pointer-events-none absolute inset-0 z-0", className)}
        style={{ opacity, ...style }}
        aria-hidden="true"
      >
        {Overlay()}
      </div>
    );
  }

  const patternUrl =
    pattern in patternSvgs
      ? patternSvgs[pattern as keyof typeof patternSvgs]
      : pattern;

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-0", className)}
      style={{
        backgroundImage: `url(${patternUrl})`,
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
        opacity,
        ...style,
      }}
      aria-hidden="true"
    />
  );
}
