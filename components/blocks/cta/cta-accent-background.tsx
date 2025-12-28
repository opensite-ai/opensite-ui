"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";

export interface CtaAccentBackgroundButton {
  /**
   * Button text
   */
  text?: string;
  /**
   * Button URL
   */
  url?: string;
  /**
   * Additional CSS classes for the button
   */
  className?: string;
}

export interface CtaAccentBackgroundProps {
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Description text below the heading
   */
  description?: string;
  /**
   * Primary and secondary button configuration
   */
  buttons?: {
    primary?: CtaAccentBackgroundButton;
    secondary?: CtaAccentBackgroundButton;
  };
  /**
   * Additional CSS classes for the section
   */
  className?: string;
}

/**
 * CtaAccentBackground - A CTA section with an accent-colored background,
 * large heading, description, and dual action buttons. Creates visual
 * distinction for important calls to action.
 *
 * @example
 * ```tsx
 * <CtaAccentBackground
 *   heading="Ready to get started?"
 *   description="Join thousands of satisfied customers today."
 *   buttons={{
 *     primary: { text: "Buy Now", url: "/pricing" },
 *     secondary: { text: "Contact Us", url: "/contact" }
 *   }}
 * />
 * ```
 */
export function CtaAccentBackground({
  heading = "Call to Action",
  description = "Build faster with our collection of pre-built blocks. Speed up your development and ship features in record time.",
  buttons = {
    primary: {
      text: "Buy Now",
      url: "#",
    },
    secondary: {
      text: "Contact Us",
      url: "#",
    },
  },
  className,
}: CtaAccentBackgroundProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="rounded-lg bg-accent p-8 md:rounded-xl lg:p-12">
          <div className="max-w-4xl">
            <h3 className="mb-4 text-3xl font-semibold md:text-5xl lg:mb-6 lg:text-6xl">
              {heading}
            </h3>
            <p className="mb-8 text-lg font-medium text-muted-foreground lg:text-xl">
              {description}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              {buttons?.primary && (
                <Pressable
                  href={buttons.primary.url}
                  variant="default"
                  size="lg"
                  className={cn("w-full sm:w-auto", buttons.primary.className)}
                  asButton
                >
                  {buttons.primary.text}
                </Pressable>
              )}
              {buttons?.secondary && (
                <Pressable
                  href={buttons.secondary.url}
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  asButton
                >
                  {buttons.secondary.text}
                </Pressable>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
