"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";

interface PricingPlan {
  name: string;
  price: string;
  priceDescription?: string;
  description?: string;
  features: string[];
  buttonText?: string;
  buttonHref?: string;
  isHighlighted?: boolean;
}

export interface PricingMinimalCardsProps {
  className?: string;
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
}

const defaultPlans: PricingPlan[] = [
  {
    name: "Basic",
    price: "$9",
    priceDescription: "/month",
    description: "For individuals",
    features: [
      "5 projects",
      "Basic analytics",
      "Email support",
    ],
    buttonText: "Get Started",
    buttonHref: "#",
  },
  {
    name: "Pro",
    price: "$29",
    priceDescription: "/month",
    description: "For teams",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "API access",
    ],
    buttonText: "Start Trial",
    buttonHref: "#",
    isHighlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations",
    features: [
      "Everything in Pro",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantee",
    ],
    buttonText: "Contact Sales",
    buttonHref: "#",
  },
];

/**
 * PricingMinimalCards displays a clean, minimal 3-column pricing layout.
 * Features simple card design with essential information and feature lists.
 * No toggle or complex interactions - just straightforward pricing display.
 *
 * Ideal for simple pricing pages that don't need billing period toggles.
 *
 * @example
 * ```tsx
 * <PricingMinimalCards
 *   title="Simple Pricing"
 *   plans={[
 *     { name: "Basic", price: "$9", features: ["Feature 1"] }
 *   ]}
 * />
 * ```
 */
export function PricingMinimalCards({
  className,
  title = "Simple Pricing",
  subtitle = "No hidden fees. No surprises.",
  plans = defaultPlans,
}: PricingMinimalCardsProps) {
  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col rounded-xl border p-6",
                plan.isHighlighted
                  ? "border-primary shadow-lg"
                  : "border-border"
              )}
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                {plan.description && (
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.priceDescription && (
                  <span className="text-muted-foreground">
                    {plan.priceDescription}
                  </span>
                )}
              </div>

              <ul className="mb-6 flex-1 space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    <DynamicIcon
                      name="lucide/check"
                      size={16}
                      className="shrink-0 text-primary"
                    />
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Pressable
                href={plan.buttonHref}
                variant={plan.isHighlighted ? "default" : "outline"}
                size="default"
                asButton
                className="w-full justify-center"
              >
                {plan.buttonText}
              </Pressable>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
