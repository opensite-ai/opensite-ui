"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import type { ActionConfig, OptixFlowConfig } from "../../../src/types";

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
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * About Split Hero - A split-screen hero section with dark theme styling,
 * featuring text content on the left and a large image on the right.
 *
 * Layout: Two-column split layout with text on left, full-height image on right.
 * Key features: Dark theme, gradient text highlight, prominent CTA button.
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
 * />
 * ```
 */
export function AboutSplitHero({
  brandText = "Business",
  brandTextClassName,
  brandHighlight = "PRO",
  brandHighlightClassName,
  heading,
  headingClassName,
  description,
  descriptionClassName,
  ctaAction,
  ctaSlot,
  ctaClassName,
  imageSrc = blockBrandedIconsAndPlaceholders.placeholderDark1,
  imageAlt = "Hero image",
  imageClassName,
  className,
  containerClassName,
  optixFlowConfig,
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
        className={cn("mt-10 flex h-fit items-center gap-2.5 rounded-xl px-5 py-4 font-bold", ctaClassName)}
      >
        <span>{ctaAction.label}</span>
        <DynamicIcon name="lucide/chevron-right" size={20} />
      </Pressable>
    );
  }, [ctaSlot, ctaAction, ctaClassName]);

  return (
    <section className={cn("dark flex", className)}>
      <div className={cn("flex w-full items-center justify-center bg-background lg:w-1/2", containerClassName)}>
        <div className="container my-10 flex w-[500px] flex-col gap-24">
          <h1 className={cn("text-4xl text-foreground", brandTextClassName)}>
            {brandText}{" "}
            <span className={cn("bg-gradient-to-tr from-foreground to-muted bg-clip-text text-transparent", brandHighlightClassName)}>
              {brandHighlight}
            </span>
          </h1>
          <div>
            {heading && (
              typeof heading === "string" ? (
                <h2 className={cn("text-4xl text-foreground lg:text-6xl", headingClassName)}>{heading}</h2>
              ) : (
                <div className={headingClassName}>{heading}</div>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("mt-2.5 text-foreground lg:text-xl", descriptionClassName)}>{description}</p>
              ) : (
                <div className={cn("mt-2.5", descriptionClassName)}>{description}</div>
              )
            )}
            {ctaContent}
          </div>
        </div>
      </div>
      <Img
        src={imageSrc}
        alt={imageAlt}
        className={cn("hidden h-screen w-1/2 object-cover lg:block", imageClassName)}
        optixFlowConfig={optixFlowConfig}
      />
    </section>
  );
}
