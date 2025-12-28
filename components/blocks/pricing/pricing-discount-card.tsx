"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";

export interface PricingDiscountCardProps {
  className?: string;
  title?: string;
  description?: string;
  originalPrice?: string;
  discountedPrice?: string;
  discountBadge?: string;
  priceDescription?: string;
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
  "99.9% uptime SLA",
];

/**
 * PricingDiscountCard displays a single pricing card with a discount badge and strikethrough original price.
 * Features a prominent discount indicator, feature list, and CTA button.
 * Ideal for promotional pricing, limited-time offers, or special deals.
 *
 * Perfect for landing pages highlighting a special offer or discount.
 *
 * @example
 * ```tsx
 * <PricingDiscountCard
 *   title="Pro Plan"
 *   description="Everything you need"
 *   originalPrice="$99"
 *   discountedPrice="$79"
 *   discountBadge="20% OFF"
 *   features={["Feature 1", "Feature 2"]}
 *   buttonText="Get Started"
 * />
 * ```
 */
export function PricingDiscountCard({
  className,
  title = "Pro Plan",
  description = "Everything you need to grow your business",
  originalPrice = "$99",
  discountedPrice = "$79",
  discountBadge = "20% OFF",
  priceDescription = "/month, billed annually",
  features = defaultFeatures,
  buttonText = "Get Started Now",
  buttonHref = "#",
}: PricingDiscountCardProps) {
  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="mx-auto max-w-md">
          <div className="relative rounded-2xl border bg-card p-8 shadow-lg">
            {discountBadge && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 hover:bg-green-600">
                {discountBadge}
              </Badge>
            )}

            <div className="text-center">
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className="mt-2 text-muted-foreground">{description}</p>

              <div className="mt-6">
                {originalPrice && (
                  <span className="mr-2 text-2xl text-muted-foreground line-through">
                    {originalPrice}
                  </span>
                )}
                <span className="text-5xl font-bold">{discountedPrice}</span>
                <p className="mt-2 text-sm text-muted-foreground">
                  {priceDescription}
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            <ul className="space-y-3">
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
          </div>
        </div>
      </div>
    </section>
  );
}
