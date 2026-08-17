"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Pressable } from "../../lib/Pressable";
import { Img } from "@page-speed/img";
import type { LogoConfig } from "../blocks/navbars/types";
import type { OptixFlowConfig } from "../../src/types";

export type BrandLogoSize = "sm" | "md" | "lg" | "xl";

/**
 * Intrinsic shape of the logo asset. "horizontal" (default) keeps the legacy
 * wide-lockup bar height; "square" and "vertical" widen the height ceiling so a
 * 1:1 mark or stacked/portrait lockup renders prominently instead of shrinking
 * to the horizontal bar height.
 */
export type BrandLogoAspect = "horizontal" | "square" | "vertical";

/**
 * Height ceilings crossed by aspect and size. Every value is a FULL literal
 * class string (never interpolated) so the toastability safelist extractor can
 * harvest it from the compiled dist, and every entry supplies the complete
 * responsive set — twMerge does not clear other variant groups, so a partial
 * override would snap back to the previous breakpoint value.
 *
 * The `horizontal` column is byte-identical to the pre-aspect `SIZE_CLASSES`
 * table: with `aspect` unset the emitted className is unchanged for the ~76
 * hero/navbar blocks that render BrandLogo without an aspect.
 */
const ASPECT_SIZE_CLASSES: Record<
  BrandLogoAspect,
  Record<BrandLogoSize, string>
> = {
  horizontal: {
    sm: "max-h-6 sm:max-h-7",
    md: "max-h-8 sm:max-h-9 lg:max-h-10",
    lg: "max-h-10 sm:max-h-12 lg:max-h-14",
    xl: "max-h-12 sm:max-h-14 lg:max-h-16",
  },
  square: {
    sm: "max-h-10 max-w-full sm:max-h-12",
    md: "max-h-14 max-w-full sm:max-h-16 lg:max-h-20",
    lg: "max-h-24 max-w-full sm:max-h-28 lg:max-h-32",
    xl: "max-h-40 max-w-full sm:max-h-44 lg:max-h-48",
  },
  vertical: {
    sm: "max-h-12 max-w-full sm:max-h-14",
    md: "max-h-16 max-w-full sm:max-h-20 lg:max-h-24",
    lg: "max-h-28 max-w-full sm:max-h-32 lg:max-h-36",
    xl: "max-h-48 max-w-full sm:max-h-56 lg:max-h-64",
  },
};

export interface BrandLogoProps {
  logo?: LogoConfig;
  logoSlot?: React.ReactNode;
  logoClassName?: string;
  size?: BrandLogoSize;
  /**
   * Intrinsic shape of the logo asset. "horizontal" (default) keeps the legacy
   * wide-lockup bar height; "square" and "vertical" widen the height ceiling so a
   * 1:1 mark or stacked/portrait lockup renders prominently instead of shrinking
   * to the horizontal bar height.
   * @default "horizontal"
   */
  aspect?: BrandLogoAspect;
  optixFlowConfig?: OptixFlowConfig;
}

export const BrandLogo = ({
  logo,
  logoSlot,
  logoClassName,
  size = "md",
  aspect = "horizontal",
  optixFlowConfig,
}: BrandLogoProps) => {
  if (logoSlot) return <>{logoSlot}</>;
  if (!logo || !logo.src) return null;

  // Stored payloads are untyped JSON, so an unknown aspect/size value can reach
  // this shared component (76+ blocks render it). Fall back to the legacy
  // horizontal/md entry instead of throwing on an undefined table row.
  const sizeClasses =
    ASPECT_SIZE_CLASSES[aspect] ?? ASPECT_SIZE_CLASSES.horizontal;

  const imgElement = (
    <Img
      src={logo.src}
      className={cn(
        "w-auto object-contain",
        sizeClasses[size] ?? sizeClasses.md,
        logo.className,
      )}
      alt={logo.alt || "Logo"}
      optixFlowConfig={optixFlowConfig}
      loading="eager"
    />
  );

  if (logo.url) {
    return (
      <Pressable
        href={logo.url}
        className={cn("flex items-center", logoClassName)}
      >
        {imgElement}
      </Pressable>
    );
  }

  return (
    <div className={cn("flex items-center", logoClassName)}>{imgElement}</div>
  );
};

export default BrandLogo;
