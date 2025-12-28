"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { patternSvgs } from "../../../lib/patternSvgs";

export interface CtaPatternBackgroundProps {
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
   * Background pattern URL
   */
  backgroundPattern?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
}

/**
 * CtaPatternBackground - A CTA section with a subtle pattern background,
 * centered heading, description, and action buttons. Clean and professional
 * appearance ideal for corporate or business websites.
 *
 * @example
 * ```tsx
 * <CtaPatternBackground
 *   heading="Start building your websites faster"
 *   description="Try our tools and services to build your website faster."
 *   primaryButtonText="Get Started"
 *   primaryButtonUrl="/signup"
 *   backgroundPattern="/pattern.svg"
 * />
 * ```
 */
export function CtaPatternBackground({
  heading = "Start building your websites faster",
  description = "Try our tools and services to build your website faster. Start with a 14-day free trial. No credit card required. No setup fees. Cancel anytime.",
  primaryButtonText = "Get Started",
  primaryButtonUrl = "#",
  secondaryButtonText = "Learn More",
  secondaryButtonUrl = "#",
  backgroundPattern = patternSvgs.grid1,
  className,
}: CtaPatternBackgroundProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div
        className="flex items-center justify-center border bg-cover bg-center py-20 text-center md:p-20"
        style={{ backgroundImage: `url('${backgroundPattern}')` }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-4 text-3xl font-semibold text-balance md:text-5xl">
              {heading}
            </h1>
            <p className="md:text-lg">{description}</p>
            <div className="mt-11 flex flex-col justify-center gap-2 sm:flex-row">
              <Pressable href={primaryButtonUrl} variant="default" size="lg" asButton>
                {primaryButtonText}
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
