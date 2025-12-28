"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface CtaSimpleCenteredProps {
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
   * Additional CSS classes for the section
   */
  className?: string;
}

/**
 * CtaSimpleCentered - A minimal centered CTA section with heading, description,
 * and primary/secondary action buttons. Perfect for straightforward conversion-focused
 * sections.
 *
 * @example
 * ```tsx
 * <CtaSimpleCentered
 *   heading="Ready to get started?"
 *   description="Join thousands of satisfied customers today."
 *   primaryButtonText="Get Started"
 *   primaryButtonUrl="/signup"
 *   secondaryButtonText="Learn More"
 *   secondaryButtonUrl="/about"
 * />
 * ```
 */
export function CtaSimpleCentered({
  heading = "Ready to get started?",
  description = "Join thousands of satisfied customers and start building amazing products today. No credit card required.",
  primaryButtonText = "Get Started",
  primaryButtonUrl = "#",
  secondaryButtonText = "Learn More",
  secondaryButtonUrl = "#",
  className,
}: CtaSimpleCenteredProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            {heading}
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
    </section>
  );
}
