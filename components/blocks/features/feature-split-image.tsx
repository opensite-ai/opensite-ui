"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface FeatureSplitImageProps {
  /**
   * Main heading text
   */
  title?: string;
  /**
   * Supporting description text
   */
  description?: string;
  /**
   * Image source URL
   */
  imageSrc?: string;
  /**
   * Image alt text for accessibility
   */
  imageAlt?: string;
  /**
   * Primary button configuration
   */
  buttonPrimary?: {
    text: string;
    href: string;
  };
  /**
   * Secondary button configuration
   */
  buttonSecondary?: {
    text: string;
    href: string;
  };
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
 * Feature Split Image - Two-column feature section with text content on the left
 * and a prominent image on the right.
 *
 * Layout: Split two-column grid with text/CTAs on left, image on right.
 * Key features: Responsive stacking, dual CTA buttons, large heading with description.
 * Best for: Product introductions, feature highlights, hero-style feature sections.
 *
 * @example
 * ```tsx
 * <FeatureSplitImage
 *   title="Build faster with our components"
 *   description="Hundreds of finely crafted components built with React and Tailwind."
 *   imageSrc="/feature-image.jpg"
 *   buttonPrimary={{ text: "Get Started", href: "/signup" }}
 *   buttonSecondary={{ text: "Learn More", href: "/docs" }}
 * />
 * ```
 */
export function FeatureSplitImage({
  title = "Build faster with Opensite AI components",
  description = "Hundreds of finely crafted components built with React, Tailwind and modern best practices. Developers can copy and paste these blocks directly into their project.",
  imageSrc = blockBrandedIconsAndPlaceholders.placeholder1,
  imageAlt = "Feature illustration",
  buttonPrimary = {
    text: "Get Started",
    href: "#",
  },
  buttonSecondary = {
    text: "Learn More",
    href: "#",
  },
  className,
  optixFlowConfig,
}: FeatureSplitImageProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h2 className="my-6 mt-0 text-4xl font-semibold text-balance lg:text-5xl">
              {title}
            </h2>
            {description && (
              <p className="mb-8 max-w-xl text-muted-foreground lg:text-lg">
                {description}
              </p>
            )}
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Pressable href={buttonPrimary.href} variant="default" asButton>
                {buttonPrimary.text}
              </Pressable>
              <Pressable href={buttonSecondary.href} variant="outline" asButton>
                {buttonSecondary.text}
              </Pressable>
            </div>
          </div>
          <Img
            src={imageSrc}
            alt={imageAlt}
            className="max-h-96 w-full rounded-md object-cover"
            loading="lazy"
            optixFlowConfig={optixFlowConfig}
          />
        </div>
      </div>
    </section>
  );
}
