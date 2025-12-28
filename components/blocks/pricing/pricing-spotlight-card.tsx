"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";

export interface PricingSpotlightCardProps {
  className?: string;
  title?: string;
  subtitle?: string;
  price?: string;
  priceDescription?: string;
  description?: string;
  features?: string[];
  buttonText?: string;
  buttonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

const defaultFeatures = [
  "Unlimited projects and workspaces",
  "Advanced analytics and reporting",
  "Priority customer support",
  "API access and integrations",
  "Team collaboration tools",
  "Custom branding options",
  "99.9% uptime SLA",
];

/**
 * PricingSpotlightCard displays a single premium pricing card with a spotlight/glow effect.
 * Features a gradient border, prominent pricing display, and dual CTA buttons.
 * Ideal for highlighting a single premium offering or featured plan.
 *
 * Perfect for landing pages showcasing a flagship product or service.
 *
 * @example
 * ```tsx
 * <PricingSpotlightCard
 *   title="Premium Plan"
 *   subtitle="Everything you need"
 *   price="$99"
 *   features={["Feature 1", "Feature 2"]}
 *   buttonText="Get Started"
 * />
 * ```
 */
export function PricingSpotlightCard({
  className,
  title = "Premium Plan",
  subtitle = "The ultimate solution for your business",
  price = "$99",
  priceDescription = "/month",
  description = "Get access to all premium features and priority support",
  features = defaultFeatures,
  buttonText = "Get Started",
  buttonHref = "#",
  secondaryButtonText = "Learn More",
  secondaryButtonHref = "#",
}: PricingSpotlightCardProps) {
  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="mx-auto max-w-lg">
          {/* Spotlight effect wrapper */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-1 rounded-3xl bg-linear-to-r from-primary/50 via-primary to-primary/50 opacity-75 blur-lg" />

            {/* Card */}
            <div className="relative rounded-2xl border bg-card p-8 shadow-2xl md:p-10">
              <div className="text-center">
                <p className="text-sm font-medium uppercase tracking-wide text-primary">
                  {subtitle}
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight">
                  {title}
                </h2>
                <p className="mt-2 text-muted-foreground">{description}</p>

                <div className="mt-8">
                  <span className="text-6xl font-bold">{price}</span>
                  <span className="text-xl text-muted-foreground">
                    {priceDescription}
                  </span>
                </div>
              </div>

              <ul className="mt-8 space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <DynamicIcon
                        name="lucide/check"
                        size={14}
                        className="text-primary"
                      />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 space-y-3">
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

              <p className="mt-6 text-center text-sm text-muted-foreground">
                14-day free trial. No credit card required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
