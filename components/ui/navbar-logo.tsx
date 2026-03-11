"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Pressable } from "../../lib/Pressable";
import { Img } from "@page-speed/img";
import type { LogoConfig } from "../blocks/navbars/types";
import type { OptixFlowConfig } from "../../src/types";

/**
 * Props for the NavbarLogo component
 */
export interface NavbarLogoProps {
  /**
   * Logo configuration object
   */
  logo?: LogoConfig;
  /**
   * Custom slot for logo (overrides logo object)
   */
  logoSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logo container
   */
  logoClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * NavbarLogo - A shared, reusable logo component for all navbar blocks.
 *
 * Renders a logo with consistent styling across all navbar components.
 * Supports:
 * - Image logos via `logo.src`
 * - Text logos via `logo.title` (string or React element)
 * - Custom logo slots via `logoSlot`
 */
export const NavbarLogo = ({
  logo,
  logoSlot,
  logoClassName,
  optixFlowConfig,
}: NavbarLogoProps) => {
  if (logoSlot) return <>{logoSlot}</>;
  if (!logo) return null;

  return (
    <Pressable
      href={logo.url || "/"}
      className={cn("flex items-center", logoClassName)}
    >
      {logo.src ? (
        // Standard single logo image
        <Img
          src={logo.src}
          className={cn("max-h-8 w-auto object-contain", logo.className)}
          alt={logo.alt || "Logo"}
          optixFlowConfig={optixFlowConfig}
          loading="eager"
        />
      ) : (
        // Text-based logo (title as string or React element)
        logo.title &&
        (typeof logo.title === "string" ? (
          <span className="text-xl md:text-2xl font-semibold tracking-tighter">
            {logo.title}
          </span>
        ) : (
          logo.title
        ))
      )}
    </Pressable>
  );
};

export default NavbarLogo;
