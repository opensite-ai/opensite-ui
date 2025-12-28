"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import {
  imagePlaceholders,
  logoPlaceholders,
} from "../../../lib/mediaPlaceholders";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface CtaSplitImageLogosProps {
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
   * Array of trusted company logo URLs
   */
  logos?: string[];
  /**
   * Text above the logos
   */
  logosLabel?: string;
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

const defaultLogos = [
  blockBrandedIconsAndPlaceholders.fictionalCompanyLogo1,
  blockBrandedIconsAndPlaceholders.fictionalCompanyLogo2,
  blockBrandedIconsAndPlaceholders.fictionalCompanyLogo3,
  blockBrandedIconsAndPlaceholders.fictionalCompanyLogo4,
  blockBrandedIconsAndPlaceholders.fictionalCompanyLogo5,
];

/**
 * CtaSplitImageLogos - A split-layout CTA with content and buttons on one side,
 * a featured image on the other, and trusted company logos below. Great for
 * establishing credibility while driving conversions.
 *
 * @example
 * ```tsx
 * <CtaSplitImageLogos
 *   heading="Transform Your Business"
 *   description="Join thousands of companies already using our platform."
 *   primaryButtonText="Get Started"
 *   primaryButtonUrl="/signup"
 *   imageSrc="/hero-image.jpg"
 *   logos={["/logo1.png", "/logo2.png", "/logo3.png"]}
 * />
 * ```
 */
export function CtaSplitImageLogos({
  heading = "Build your website faster",
  description = "Build faster with our collection of pre-built components. Speed up your development and ship features in record time.",
  primaryButtonText = "Get Started",
  primaryButtonUrl = "#",
  secondaryButtonText = "Learn More",
  secondaryButtonUrl = "#",
  imageSrc = imagePlaceholders[2],
  imageAlt = "Featured image",
  logos = defaultLogos,
  logosLabel = "Trusted by leading companies",
  className,
  optixFlowConfig,
}: CtaSplitImageLogosProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              {heading}
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              {description}
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Pressable
                href={primaryButtonUrl}
                variant="default"
                size="lg"
                className="w-full sm:w-auto"
                asButton
              >
                {primaryButtonText}
                <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
              </Pressable>
              <Pressable
                href={secondaryButtonUrl}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                asButton
              >
                {secondaryButtonText}
              </Pressable>
            </div>
            {logos.length > 0 && (
              <div className="mt-10 w-full">
                <p className="mb-4 text-sm text-muted-foreground">{logosLabel}</p>
                <div className="flex flex-wrap items-center justify-center gap-6 lg:justify-start">
                  {logos.map((logo, index) => (
                    <Img
                      key={index}
                      src={logo}
                      alt={`Company logo ${index + 1}`}
                      className="h-8 w-auto opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                      optixFlowConfig={optixFlowConfig}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <Img
              src={imageSrc}
              alt={imageAlt}
              className="max-h-96 w-full rounded-md object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
