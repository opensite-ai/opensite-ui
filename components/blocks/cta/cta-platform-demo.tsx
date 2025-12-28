"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface CtaPlatformDemoProps {
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
   * Decorative image URL
   */
  decorativeImage?: string;
  /**
   * Main product image URL
   */
  productImage?: string;
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
 * CtaPlatformDemo - A CTA section promoting platform exploration with content
 * on one side and decorative product images on the other. Includes demo and
 * video watch buttons. Perfect for SaaS product pages.
 *
 * @example
 * ```tsx
 * <CtaPlatformDemo
 *   heading="Explore Our Platform"
 *   description="Discover the full potential of our platform."
 *   primaryButtonText="Try Demo"
 *   primaryButtonUrl="/demo"
 *   secondaryButtonText="Watch Video"
 *   secondaryButtonUrl="/video"
 * />
 * ```
 */
export function CtaPlatformDemo({
  heading = "Explore Our Platform",
  description = "Discover the full potential of our platform. Try our interactive demo or watch a comprehensive walkthrough today.",
  primaryButtonText = "Try Demo",
  primaryButtonUrl = "#",
  secondaryButtonText = "Watch Video",
  secondaryButtonUrl = "#",
  decorativeImage = blockBrandedIconsAndPlaceholders.placeholder1,
  productImage = imagePlaceholders[6],
  className,
  optixFlowConfig,
}: CtaPlatformDemoProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container overflow-hidden">
        <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-6 overflow-hidden rounded-xl border bg-muted/50 md:flex-row">
          <div className="max-w-xl self-center p-6 md:p-12">
            <h2 className="text-3xl font-semibold md:text-4xl">{heading}</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">{description}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Pressable href={primaryButtonUrl} variant="default" asButton>
                {primaryButtonText}
              </Pressable>
              <Pressable href={secondaryButtonUrl} variant="outline" asButton>
                {secondaryButtonText}
                <DynamicIcon name="lucide/play" size={16} className="ml-2" />
              </Pressable>
            </div>
          </div>
          <div className="relative ml-6 max-h-96 md:mt-8 md:ml-0">
            <Img
              src={decorativeImage}
              alt=""
              className="absolute -bottom-12 left-4 h-48 -translate-x-1/2 -rotate-[120deg]"
              optixFlowConfig={optixFlowConfig}
            />
            <Img
              src={productImage}
              alt="Platform preview"
              className="z-10 aspect-video h-full w-full rounded-tl-xl border-t border-l object-cover pt-3.5 pl-3.5 backdrop-blur-sm"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
