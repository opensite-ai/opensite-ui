"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface CtaSplitGradientImageProps {
  /**
   * Label text above the heading
   */
  label?: string;
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Description text below the heading
   */
  description?: string;
  /**
   * Primary button text
   */
  primaryButtonText?: string;
  /**
   * Primary button URL
   */
  primaryButtonUrl?: string;
  /**
   * Secondary button text
   */
  secondaryButtonText?: string;
  /**
   * Secondary button URL
   */
  secondaryButtonUrl?: string;
  /**
   * Featured image URL
   */
  imageSrc?: string;
  /**
   * Featured image alt text
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
 * CtaSplitGradientImage - A split-layout CTA with content and buttons on one side,
 * a featured image on the other, and a subtle radial gradient background.
 * Modern and visually appealing design for product launches.
 *
 * @example
 * ```tsx
 * <CtaSplitGradientImage
 *   label="Ready to get started?"
 *   heading="Start your free trial today"
 *   description="No credit card required. Cancel anytime."
 *   primaryButtonText="Get Started"
 *   primaryButtonUrl="/signup"
 *   imageSrc="/product-image.jpg"
 * />
 * ```
 */
export function CtaSplitGradientImage({
  label = "Ready to get started?",
  heading = "Start your free trial today.",
  description = "Start with a 14-day free trial. No credit card required. No setup fees. Cancel anytime.",
  primaryButtonText = "Get Started",
  primaryButtonUrl = "#",
  secondaryButtonText = "Learn More",
  secondaryButtonUrl = "#",
  imageSrc = imagePlaceholders[4],
  imageAlt = "Featured image",
  className,
  optixFlowConfig,
}: CtaSplitGradientImageProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-20 overflow-hidden rounded-2xl border bg-[radial-gradient(ellipse_30%_60%_at_100%_80%,var(--color-gray-200),transparent)] pt-20 sm:pl-16 lg:flex-row lg:bg-[radial-gradient(ellipse_50%_80%_at_40%_120%,var(--color-gray-200),transparent)] lg:pl-20">
          <div className="lg:texlf mx-auto max-w-md px-4 text-center md:px-0 lg:mx-0 lg:pb-20 lg:text-left">
            <p className="mb-6 font-medium">{label}</p>
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">{heading}</h2>
            <p className="text-lg text-muted-foreground">{description}</p>
            <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Pressable href={primaryButtonUrl} variant="default" asButton>
                {primaryButtonText}
              </Pressable>
              <Pressable href={secondaryButtonUrl} variant="outline" asButton>
                {secondaryButtonText}
              </Pressable>
            </div>
          </div>
          <div className="relative w-full pl-4 sm:pl-0">
            <div className="absolute -bottom-8 -left-8 -z-10 h-4/5 w-4/5 rounded-tl-2xl rounded-br-2xl bg-stone-900/20 blur-2xl"></div>
            <Img
              src={imageSrc}
              alt={imageAlt}
              className="relative z-10 h-full max-h-[400px] w-full rounded-tl-2xl rounded-br-2xl object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
