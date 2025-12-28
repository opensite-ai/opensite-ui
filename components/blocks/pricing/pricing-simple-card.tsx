"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Card } from "../../ui/card";

export interface PricingSimpleCardProps {
  className?: string;
  title?: string;
  description?: string;
  price?: string;
  priceInterval?: string;
  features?: string[];
  buttonText?: string;
  buttonHref?: string;
}

const defaultFeatures = [
  "Unlimited projects",
  "Advanced analytics",
  "Priority support",
  "API access",
  "Custom integrations",
  "Team collaboration",
];

/**
 * PricingSimpleCard displays a single, minimal pricing card with a feature list.
 * Clean and focused design with a prominent price display and CTA button.
 * Ideal for products with a single pricing tier or as a featured plan highlight.
 *
 * Perfect for landing pages or simple pricing sections.
 *
 * @example
 * ```tsx
 * <PricingSimpleCard
 *   title="Pro Plan"
 *   description="Everything you need"
 *   price="$49"
 *   priceInterval="/month"
 *   features={["Feature 1", "Feature 2"]}
 *   buttonText="Get Started"
 * />
 * ```
 */
export function PricingSimpleCard({
  className,
  title = "Pro Plan",
  description = "Everything you need to grow your business",
  price = "$49",
  priceInterval = "/month",
  features = defaultFeatures,
  buttonText = "Get Started",
  buttonHref = "#",
}: PricingSimpleCardProps) {
  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="mx-auto max-w-md">
          <Card className="p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className="mt-2 text-muted-foreground">{description}</p>

              <div className="mt-6">
                <span className="text-5xl font-bold">{price}</span>
                <span className="text-muted-foreground">{priceInterval}</span>
              </div>
            </div>

            <ul className="mt-8 space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <DynamicIcon
                    name="lucide/check"
                    size={18}
                    className="mt-0.5 shrink-0 text-primary"
                  />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Pressable
              href={buttonHref}
              variant="default"
              size="lg"
              asButton
              className="mt-8 w-full justify-center"
            >
              {buttonText}
            </Pressable>
          </Card>
        </div>
      </div>
    </section>
  );
}
