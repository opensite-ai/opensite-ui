"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface AboutSplitHeroProps {
  /**
   * Brand/logo text
   */
  brandText?: string;
  /**
   * Highlighted brand text (e.g., "PRO")
   */
  brandHighlight?: string;
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Supporting description text
   */
  description?: string;
  /**
   * CTA button text
   */
  ctaText?: string;
  /**
   * CTA button URL
   */
  ctaUrl?: string;
  /**
   * Image source URL
   */
  imageSrc?: string;
  /**
   * Image alt text
   */
  imageAlt?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
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
 *   ctaText="Upgrade to premium"
 *   ctaUrl="/upgrade"
 * />
 * ```
 */
export function AboutSplitHero({
  brandText = "Business",
  brandHighlight = "PRO",
  heading = "Achieve More with Elite Access Pro",
  description = "Enhance your career hunt with increased visibility, first-look opportunities and monetary incentives!",
  ctaText = "Upgrade to premium",
  ctaUrl = "#",
  imageSrc = blockBrandedIconsAndPlaceholders.placeholderDark1,
  imageAlt = "Hero image",
  className,
  optixFlowConfig,
}: AboutSplitHeroProps) {
  return (
    <section className={cn("dark flex", className)}>
      <div className="flex w-full items-center justify-center bg-background lg:w-1/2">
        <div className="container my-10 flex w-[500px] flex-col gap-24">
          <h1 className="text-4xl text-foreground">
            {brandText}{" "}
            <span className="bg-gradient-to-tr from-foreground to-muted bg-clip-text text-transparent">
              {brandHighlight}
            </span>
          </h1>
          <div>
            <h2 className="text-4xl text-foreground lg:text-6xl">{heading}</h2>
            <p className="mt-2.5 text-foreground lg:text-xl">{description}</p>
            <Pressable
              href={ctaUrl}
              variant="default"
              size="lg"
              asButton
              className="mt-10 flex h-fit items-center gap-2.5 rounded-xl px-5 py-4 font-bold"
            >
              <span>{ctaText}</span>
              <DynamicIcon name="lucide/chevron-right" size={20} />
            </Pressable>
          </div>
        </div>
      </div>
      <Img
        src={imageSrc}
        alt={imageAlt}
        className="hidden h-screen w-1/2 object-cover lg:block"
        optixFlowConfig={optixFlowConfig}
      />
    </section>
  );
}
