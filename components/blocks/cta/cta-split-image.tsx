"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface CtaSplitImageProps {
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Description text below the heading
   */
  description?: string;
  /**
   * Button text
   */
  buttonText?: string;
  /**
   * Button URL
   */
  buttonUrl?: string;
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
 * CtaSplitImage - A split-layout CTA section with content and button on one side
 * and a featured image on the other. The image appears on the left on larger screens.
 * Perfect for showcasing products or services alongside a call to action.
 *
 * @example
 * ```tsx
 * <CtaSplitImage
 *   heading="Transform Your Workflow"
 *   description="Streamline your processes with our powerful tools."
 *   buttonText="Get Started"
 *   buttonUrl="/signup"
 *   imageSrc="/hero-image.jpg"
 *   imageAlt="Product screenshot"
 * />
 * ```
 */
export function CtaSplitImage({
  heading = "Call to Action",
  description = "Build faster with our collection of pre-built components. Speed up your development and ship features in record time.",
  buttonText = "Get Started",
  buttonUrl = "#",
  imageSrc = imagePlaceholders[0],
  imageAlt = "Featured image",
  className,
  optixFlowConfig,
}: CtaSplitImageProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex w-full flex-col overflow-hidden rounded-lg bg-muted md:rounded-xl lg:flex-row lg:items-center">
          <div className="w-full shrink-0 self-stretch lg:w-1/2">
            <Img
              src={imageSrc}
              alt={imageAlt}
              className="aspect-3/2 w-full rounded-t-md object-cover md:rounded-t-none md:rounded-l-md"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
          <div className="w-full shrink-0 px-4 py-6 md:p-8 lg:w-1/2 lg:px-16">
            <h3 className="mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
              {heading}
            </h3>
            <p className="mb-8 text-muted-foreground lg:text-lg">{description}</p>
            <Pressable href={buttonUrl} variant="default" asButton>
              {buttonText}
            </Pressable>
          </div>
        </div>
      </div>
    </section>
  );
}
