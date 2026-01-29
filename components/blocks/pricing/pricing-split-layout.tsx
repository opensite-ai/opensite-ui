"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { SectionBackground } from "../../../src/types";

export interface PricingSplitLayoutProps {
  className?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  price?: string;
  priceDescription?: string;
  features?: string[];
  buttonText?: string;
  buttonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  background?: SectionBackground;
}

/**
 * PricingSplitLayout displays a split layout with marketing content on the left and pricing card on the right.
 * Features a compelling headline, description, and feature list alongside a prominent pricing display.
 * Ideal for landing pages that want to combine marketing copy with pricing information.
 *
 * Perfect for conversion-focused pricing sections.
 *
 * @example
 * ```tsx
 * <PricingSplitLayout
 *   title="Start Building Today"
 *   subtitle="Simple, transparent pricing"
 *   description="Get access to all features"
 *   price="$49"
 *   features={["Feature 1", "Feature 2"]}
 *   buttonText="Get Started"
 * />
 * ```
 */
export function PricingSplitLayout({
  className,
  title,
  subtitle,
  description,
  price,
  priceDescription,
  features,
  buttonText,
  buttonHref = "#",
  secondaryButtonText,
  secondaryButtonHref = "#",
  background = "default",
}: PricingSplitLayoutProps) {
  return (
    <Section background={background} className={className}>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left - Marketing Content */}
          <div className="flex flex-col justify-center">
            <p className="text-sm font-medium uppercase tracking-wide text-primary">
              {subtitle}
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">{description}</p>

            <ul className="mt-8 space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <DynamicIcon
                    name="lucide/check"
                    size={20}
                    className="mt-0.5 shrink-0 text-primary"
                  />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Pricing Card */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-md rounded-2xl border p-8 shadow-lg">
              <div className="text-center">
                <h3 className="text-xl font-semibold">Pro Plan</h3>
                <div className="mt-4">
                  <span className="text-5xl font-bold">{price}</span>
                  <span className="text-muted-foreground">{priceDescription}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Billed monthly. Cancel anytime.
                </p>
              </div>

              <div className="mt-8 space-y-3">
                <Pressable
                  href={buttonHref}
                  variant="default"
                  size="lg"
                  asButton
                  className="w-full justify-center"
                >
                  {buttonText}
                </Pressable>
                <Pressable
                  href={secondaryButtonHref}
                  variant="outline"
                  size="lg"
                  asButton
                  className="w-full justify-center"
                >
                  {secondaryButtonText}
                </Pressable>
              </div>

              <p className="mt-6 text-center text-xs text-muted-foreground">
                14-day free trial. No credit card required.
              </p>
            </div>
          </div>
      </div>
    </Section>
  );
}
