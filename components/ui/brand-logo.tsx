"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Pressable } from "../../lib/Pressable";
import { Img } from "@page-speed/img";
import type { LogoConfig } from "../blocks/navbars/types";
import type { OptixFlowConfig } from "../../src/types";

export type BrandLogoSize = "sm" | "md" | "lg" | "xl";

const SIZE_CLASSES: Record<BrandLogoSize, string> = {
  sm: "max-h-6 sm:max-h-7",
  md: "max-h-8 sm:max-h-9 lg:max-h-10",
  lg: "max-h-10 sm:max-h-12 lg:max-h-14",
  xl: "max-h-12 sm:max-h-14 lg:max-h-16",
};

export interface BrandLogoProps {
  logo?: LogoConfig;
  logoSlot?: React.ReactNode;
  logoClassName?: string;
  size?: BrandLogoSize;
  optixFlowConfig?: OptixFlowConfig;
}

export const BrandLogo = ({
  logo,
  logoSlot,
  logoClassName,
  size = "md",
  optixFlowConfig,
}: BrandLogoProps) => {
  if (logoSlot) return <>{logoSlot}</>;
  if (!logo || !logo.src) return null;

  const imgElement = (
    <Img
      src={logo.src}
      className={cn(
        "w-auto object-contain",
        SIZE_CLASSES[size],
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
