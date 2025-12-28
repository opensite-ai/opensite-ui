"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface CtaFullwidthBackgroundProps {
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
   * Background image URL
   */
  backgroundImage?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
}

/**
 * CtaFullwidthBackground - A full-width CTA section with a background image,
 * gradient overlay, centered heading, description, and action buttons.
 * Creates visual impact for important conversion moments.
 *
 * @example
 * ```tsx
 * <CtaFullwidthBackground
 *   heading="Start your free trial today"
 *   description="No credit card required. Cancel anytime."
 *   primaryButtonText="Get Started"
 *   primaryButtonUrl="/signup"
 *   backgroundImage="/hero-bg.jpg"
 * />
 * ```
 */
export function CtaFullwidthBackground({
  heading = "Start your free trial today.",
  description = "Start with a 14-day free trial. No credit card required. No setup fees. Cancel anytime.",
  primaryButtonText = "Get Started",
  primaryButtonUrl = "#",
  secondaryButtonText = "Learn More",
  secondaryButtonUrl = "#",
  backgroundImage = imagePlaceholders[3],
  className,
}: CtaFullwidthBackgroundProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div
          className="flex h-[620px] items-center justify-center overflow-hidden rounded-2xl bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0)), url('${backgroundImage}')`,
          }}
        >
          <div className="flex flex-col gap-8 p-4 text-center">
            <h2 className="text-5xl font-bold text-primary-foreground">
              {heading}
            </h2>
            <p className="text-lg text-primary-foreground">{description}</p>
            <div className="flex flex-col justify-center gap-2 sm:flex-row">
              <Pressable
                href={primaryButtonUrl}
                variant="default"
                size="lg"
                asButton
              >
                {primaryButtonText}
              </Pressable>
              <Pressable
                href={secondaryButtonUrl}
                variant="secondary"
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
