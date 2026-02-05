"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Pressable } from "../../lib/Pressable";
import { Img } from "@page-speed/img";
import type { OptixFlowConfig } from "../../src/types";

/**
 * Standard footer logo configuration with single image source
 */
export interface FooterLogoStandard {
  /** Logo link URL */
  url?: string;
  /** Logo image source */
  src?: string;
  /** Logo alt text */
  alt?: string;
  /** Logo title/brand name (fallback when no image) */
  title?: string;
}

/**
 * Footer logo configuration with light/dark mode variants
 */
export interface FooterLogoThemed {
  /** Logo link URL */
  url?: string;
  /** Light mode logo image source */
  light?: string;
  /** Dark mode logo image source */
  dark?: string;
  /** Logo alt text */
  alt?: string;
  /** Logo title/brand name (fallback when no image) */
  title?: string;
}

/**
 * Union type for all footer logo configurations
 */
export type FooterLogoConfig = FooterLogoStandard | FooterLogoThemed;

/**
 * Props for the FooterLogo component
 */
export interface FooterLogoProps {
  /**
   * Logo configuration object (standard or themed)
   */
  logo?: FooterLogoConfig;
  /**
   * Custom slot for logo (overrides logo object)
   */
  logoSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logo container/link
   */
  logoClassName?: string;
  /**
   * Additional CSS classes for the logo image
   */
  logoImageClassName?: string;
  /**
   * Additional CSS classes for the logo title text
   */
  logoTitleClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * Type guard to check if logo config has themed (light/dark) sources
 */
function isThemedLogo(logo: FooterLogoConfig): logo is FooterLogoThemed {
  return "light" in logo || "dark" in logo;
}

/**
 * FooterLogo - A shared, reusable logo component for all footer blocks.
 *
 * Renders a logo with consistent styling across all footer components.
 * Supports:
 * - Image logos via `logo.src` (standard) or `logo.light`/`logo.dark` (themed)
 * - Text logos via `logo.title` as fallback when no image is provided
 * - Custom logo slots via `logoSlot`
 * - Light/dark mode responsive logos
 *
 * Note: Renders image OR title, never both. Image takes priority.
 */
export const FooterLogo = ({
  logo,
  logoSlot,
  logoClassName,
  logoImageClassName,
  logoTitleClassName,
  optixFlowConfig,
}: FooterLogoProps) => {
  if (logoSlot) return <>{logoSlot}</>;
  if (!logo) return null;

  const hasThemedSources = isThemedLogo(logo) && (logo.light || logo.dark);
  const hasStandardSource = !isThemedLogo(logo) && logo.src;
  const hasImage = hasThemedSources || hasStandardSource;

  const logoContent = hasThemedSources ? (
    // Themed logo with light/dark mode sources
    <>
      {(logo as FooterLogoThemed).light && (
        <Img
          src={(logo as FooterLogoThemed).light!}
          alt={logo.alt || "Logo"}
          className={cn(
            "h-8 w-auto object-contain dark:hidden md:h-10",
            logoImageClassName,
          )}
          optixFlowConfig={optixFlowConfig}
        />
      )}
      {(logo as FooterLogoThemed).dark && (
        <Img
          src={(logo as FooterLogoThemed).dark!}
          alt={logo.alt || "Logo"}
          className={cn(
            "hidden h-8 w-auto object-contain dark:block md:h-10",
            logoImageClassName,
          )}
          optixFlowConfig={optixFlowConfig}
        />
      )}
    </>
  ) : hasStandardSource ? (
    // Standard single logo image
    <Img
      src={(logo as FooterLogoStandard).src!}
      alt={logo.alt || "Logo"}
      className={cn("h-8 w-auto object-contain md:h-10", logoImageClassName)}
      optixFlowConfig={optixFlowConfig}
    />
  ) : logo.title ? (
    // Text-based logo fallback
    <span className={cn("text-lg font-semibold md:text-xl", logoTitleClassName)}>
      {logo.title}
    </span>
  ) : null;

  if (!logoContent) return null;

  // If there's a URL, wrap in Pressable link
  if (logo.url) {
    return (
      <Pressable
        href={logo.url}
        className={cn("inline-flex items-center", logoClassName)}
      >
        {logoContent}
      </Pressable>
    );
  }

  // No URL, just render the content with optional wrapper
  return <div className={cn("inline-flex items-center", logoClassName)}>{logoContent}</div>;
};

export default FooterLogo;

