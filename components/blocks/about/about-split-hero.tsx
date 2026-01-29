"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import {
  PatternBackground,
  type PatternName,
} from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
} from "../../../src/types";

export interface DirectionConfig {
  desktop: "mediaRight" | "mediaLeft";
  mobile: "mediaTop" | "mediaBottom";
}

export interface AboutSplitHeroProps {
  /**
   * Brand/logo text
   */
  brandText?: React.ReactNode;
  /**
   * Additional CSS classes for the brand text
   */
  brandTextClassName?: string;
  /**
   * Highlighted brand text (e.g., "PRO")
   */
  brandHighlight?: React.ReactNode;
  /**
   * Additional CSS classes for the brand highlight
   */
  brandHighlightClassName?: string;
  /**
   * Main heading text
   */
  heading?: React.ReactNode;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Supporting description text
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * CTA action configuration
   */
  ctaAction?: ActionConfig;
  /**
   * Custom slot for rendering CTA (overrides ctaAction)
   */
  ctaSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the CTA
   */
  ctaClassName?: string;
  /**
   * Image source URL
   */
  imageSrc?: string;
  /**
   * Image alt text
   */
  imageAlt?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for the content area
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Section background variant
   */
  background?: SectionBackground;
  /**
   * Pattern background key or URL
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Direction configuration for desktop and mobile layouts
   * @default { desktop: 'mediaRight', mobile: 'mediaTop' }
   */
  directionConfig?: DirectionConfig;
}

/**
 * About Split Hero - A full-width split-screen hero section with edge-to-edge design,
 * featuring text content on one side and a large full-height image on the other.
 *
 * Layout: 50/50 split layout with content and image sections. Fully responsive with
 * configurable media placement for desktop and mobile.
 * Key features: Pattern background support, gradient text highlight, edge-to-edge design.
 * Best for: Premium/pro tier landing pages, product launches, upgrade prompts.
 *
 * @example
 * ```tsx
 * <AboutSplitHero
 *   brandText="Business"
 *   brandHighlight="PRO"
 *   heading="Achieve More with Elite Access Pro"
 *   description="Enhance your career hunt with increased visibility."
 *   ctaAction={{ label: "Upgrade to premium", href: "/upgrade" }}
 *   imageSrc="/hero-image.jpg"
 *   pattern="dots"
 *   background="dark"
 * />
 * ```
 */
export function AboutSplitHero({
  brandText,
  brandTextClassName,
  brandHighlight,
  brandHighlightClassName,
  heading,
  headingClassName,
  description,
  descriptionClassName,
  ctaAction,
  ctaSlot,
  ctaClassName,
  imageSrc,
  imageAlt,
  imageClassName,
  contentClassName,
  className,
  optixFlowConfig,
  background = "dark",
  pattern,
  patternOpacity,
  directionConfig = { desktop: "mediaRight", mobile: "mediaTop" },
}: AboutSplitHeroProps): React.JSX.Element {
  const ctaContent = useMemo(() => {
    if (ctaSlot) return ctaSlot;
    if (!ctaAction) return null;

    return (
      <Pressable
        href={ctaAction.href}
        onClick={ctaAction.onClick}
        variant={ctaAction.variant || "default"}
        size={ctaAction.size || "lg"}
        asButton
        className={cn(
          "inline-flex items-center gap-2.5 font-semibold",
          ctaClassName,
        )}
      >
        <span>{ctaAction.label}</span>
        <DynamicIcon name="lucide/chevron-right" size={20} />
      </Pressable>
    );
  }, [ctaSlot, ctaAction, ctaClassName]);

  // Determine background color based on background variant
  const bgColorClass = useMemo(() => {
    switch (background) {
      case "dark":
        return "bg-foreground text-background";
      case "gray":
        return cn(getNestedCardBg(background), getNestedCardTextColor(background));
      case "white":
        return "bg-background";
      default:
        return "bg-background";
    }
  }, [background]);

  // Determine flex direction based on directionConfig
  const desktopOrder =
    directionConfig.desktop === "mediaRight"
      ? "lg:flex-row"
      : "lg:flex-row-reverse";
  const mobileOrder =
    directionConfig.mobile === "mediaTop" ? "flex-col" : "flex-col-reverse";

  const contentArea = (
    <div
      className={cn(
        "relative flex w-full items-center lg:w-1/2",
        bgColorClass,
        contentClassName,
      )}
    >
      {/* Pattern Background */}
      {pattern && (
        <div className="absolute inset-0 overflow-hidden">
          <PatternBackground pattern={pattern} opacity={patternOpacity} />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full px-8 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24 xl:px-24">
        <div className="mx-auto max-w-xl space-y-8">
          {/* Brand Text */}
          {(brandText || brandHighlight) && (
            <div
              className={cn(
                "text-xl font-semibold uppercase tracking-wider sm:text-2xl",
                brandTextClassName,
              )}
            >
              {brandText}
              {brandText && brandHighlight && " "}
              {brandHighlight && (
                <span
                  className={cn(
                    "bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent",
                    brandHighlightClassName,
                  )}
                >
                  {brandHighlight}
                </span>
              )}
            </div>
          )}

          {/* Heading */}
          {heading &&
            (typeof heading === "string" ? (
              <h1
                className={cn(
                  "text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl",
                  headingClassName,
                )}
              >
                {heading}
              </h1>
            ) : (
              <div className={headingClassName}>{heading}</div>
            ))}

          {/* Description */}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "text-base leading-relaxed opacity-90 sm:text-lg",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}

          {/* CTA */}
          {ctaContent && <div className="pt-4">{ctaContent}</div>}
        </div>
      </div>
    </div>
  );

  const imageArea = imageSrc ? (
    <div className="relative h-64 w-full sm:h-96 lg:h-auto lg:w-1/2">
      <Img
        src={imageSrc}
        alt={imageAlt || ""}
        className={cn("h-full w-full object-cover", imageClassName)}
        optixFlowConfig={optixFlowConfig}
      />
    </div>
  ) : null;

  return (
    <section className={cn("relative w-full overflow-hidden", className)}>
      <div className={cn("flex min-h-screen", mobileOrder, desktopOrder)}>
        {contentArea}
        {imageArea}
      </div>
    </section>
  );
}
