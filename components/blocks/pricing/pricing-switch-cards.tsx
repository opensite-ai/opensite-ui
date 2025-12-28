"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Switch } from "../../ui/switch";

interface PricingPlan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description?: string;
  features: string[];
  buttonText?: string;
  buttonHref?: string;
  isPopular?: boolean;
}

export interface PricingSwitchCardsProps {
  className?: string;
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
}

const defaultPlans: PricingPlan[] = [
  {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "For individuals getting started",
    features: [
      "Up to 3 projects",
      "Basic analytics",
      "Community support",
      "1GB storage",
    ],
    buttonText: "Get Started",
    buttonHref: "#",
  },
  {
    name: "Startup",
    monthlyPrice: 29,
    yearlyPrice: 290,
    description: "For small teams",
    features: [
      "Up to 10 projects",
      "Advanced analytics",
      "Email support",
      "10GB storage",
      "API access",
    ],
    buttonText: "Start Trial",
    buttonHref: "#",
    isPopular: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: 99,
    yearlyPrice: 990,
    description: "For large organizations",
    features: [
      "Unlimited projects",
      "Custom analytics",
      "24/7 support",
      "Unlimited storage",
      "Full API access",
      "Custom integrations",
    ],
    buttonText: "Contact Sales",
    buttonHref: "#",
  },
];

/**
 * PricingSwitchCards displays a 3-card pricing layout with a Switch toggle for billing period.
 * Features clean card design with popular plan highlighting and feature lists.
 * The Switch component provides a familiar toggle pattern for monthly/yearly selection.
 *
 * Ideal for SaaS products with three main pricing tiers.
 *
 * @example
 * ```tsx
 * <PricingSwitchCards
 *   title="Pricing Plans"
 *   plans={[
 *     { name: "Free", monthlyPrice: 0, yearlyPrice: 0, features: ["Feature 1"] }
 *   ]}
 * />
 * ```
 */
export function PricingSwitchCards({
  className,
  title = "Simple Pricing",
  subtitle = "Choose the plan that works best for you",
  plans = defaultPlans,
}: PricingSwitchCardsProps) {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <span
              className={cn(
                "text-sm font-medium",
                !isYearly ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Monthly
            </span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span
              className={cn(
                "text-sm font-medium",
                isYearly ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Yearly
              <span className="ml-1.5 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                Save 17%
              </span>
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "relative flex flex-col rounded-2xl border p-6",
                plan.isPopular
                  ? "border-primary shadow-lg"
                  : "border-border"
              )}
            >
              {plan.isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most Popular
                </span>
              )}

              <div className="mb-4">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                {plan.description && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold">
                  ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="text-muted-foreground">
                  /{isYearly ? "year" : "month"}
                </span>
              </div>

              <ul className="mb-6 flex-1 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <DynamicIcon
                      name="lucide/check"
                      size={18}
                      className="mt-0.5 shrink-0 text-primary"
                    />
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Pressable
                href={plan.buttonHref}
                variant={plan.isPopular ? "default" : "outline"}
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
