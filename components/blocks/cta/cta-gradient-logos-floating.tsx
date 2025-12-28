"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface CtaGradientLogosFloatingProps {
  /**
   * Main heading text (supports gradient styling)
   */
  heading?: string;
  /**
   * Gradient portion of the heading
   */
  headingGradient?: string;
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
   * Array of logo URLs for floating circles on the left
   */
  leftLogos?: string[];
  /**
   * Array of logo URLs for floating circles on the right
   */
  rightLogos?: string[];
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

const defaultLeftLogos = [
  blockBrandedIconsAndPlaceholders.fictionalCompanyLogo1,
  blockBrandedIconsAndPlaceholders.fictionalCompanyLogo2,
  blockBrandedIconsAndPlaceholders.fictionalCompanyLogo3,
];

const defaultRightLogos = [
  blockBrandedIconsAndPlaceholders.fictionalCompanyLogo4,
  blockBrandedIconsAndPlaceholders.fictionalCompanyLogo5,
  blockBrandedIconsAndPlaceholders.fictionalCompanyLogo6,
];

/**
 * CtaGradientLogosFloating - A CTA section with gradient text heading, centered
 * content, and floating logo circles on both sides. Creates a dynamic, modern
 * appearance.
 *
 * @example
 * ```tsx
 * <CtaGradientLogosFloating
 *   heading="Build faster with"
 *   headingGradient="modern tools"
 *   description="Join thousands of developers building amazing products."
 *   primaryButtonText="Get Started"
 *   primaryButtonUrl="/signup"
 *   leftLogos={["/logo1.png", "/logo2.png"]}
 *   rightLogos={["/logo3.png", "/logo4.png"]}
 * />
 * ```
 */
export function CtaGradientLogosFloating({
  heading = "Build faster with",
  headingGradient = "modern tools",
  description = "Join thousands of developers building amazing products. Get started today and ship faster than ever.",
  primaryButtonText = "Get Started",
  primaryButtonUrl = "#",
  secondaryButtonText = "Learn More",
  secondaryButtonUrl = "#",
  leftLogos = defaultLeftLogos,
  rightLogos = defaultRightLogos,
  className,
  optixFlowConfig,
}: CtaGradientLogosFloatingProps): React.JSX.Element {
  return (
    <section className={cn("py-32 overflow-hidden", className)}>
      <div className="container">
        <div className="relative">
          <div className="absolute left-0 top-1/2 hidden -translate-y-1/2 flex-col gap-4 lg:flex">
            {leftLogos.map((logo, index) => (
              <div
                key={index}
                className="flex h-16 w-16 items-center justify-center rounded-full border bg-background p-3 shadow-lg"
                style={{
                  transform: `translateX(${index % 2 === 0 ? "0" : "2rem"})`,
                }}
              >
                <Img
                  src={logo}
                  alt=""
                  className="h-full w-full object-contain"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            ))}
          </div>

          <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 flex-col gap-4 lg:flex">
            {rightLogos.map((logo, index) => (
              <div
                key={index}
                className="flex h-16 w-16 items-center justify-center rounded-full border bg-background p-3 shadow-lg"
                style={{
                  transform: `translateX(${index % 2 === 0 ? "0" : "-2rem"})`,
                }}
              >
                <Img
                  src={logo}
                  alt=""
                  className="h-full w-full object-contain"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            ))}
          </div>

          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
              {heading}{" "}
              <span className="bg-linear-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {headingGradient}
              </span>
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">{description}</p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Pressable
                href={primaryButtonUrl}
                variant="default"
                size="lg"
                asButton
              >
                {primaryButtonText}
                <DynamicIcon
                  name="lucide/arrow-right"
                  size={16}
                  className="ml-2"
                />
              </Pressable>
              <Pressable
                href={secondaryButtonUrl}
                variant="outline"
                size="lg"
                asButton
              >
                {secondaryButtonText}
              </Pressable>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
