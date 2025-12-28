"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";

interface PricingPlan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description?: string;
  features: string[];
  buttonText?: string;
  buttonHref?: string;
  badge?: string;
}

export interface PricingTwoColumnBasicProps {
  className?: string;
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
}

const defaultPlans: PricingPlan[] = [
  {
    name: "Basic",
    monthlyPrice: 19,
    yearlyPrice: 190,
    description: "Essential features for individuals",
    features: [
      "5 projects",
      "Basic analytics",
      "Email support",
      "2GB storage",
      "API access",
    ],
    buttonText: "Get Started",
    buttonHref: "#",
  },
  {
    name: "Pro",
    monthlyPrice: 49,
    yearlyPrice: 490,
    description: "Advanced features for teams",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "50GB storage",
      "API access",
      "Custom integrations",
      "Team collaboration",
    ],
    buttonText: "Start Free Trial",
    buttonHref: "#",
    badge: "Most Popular",
  },
];

/**
 * PricingTwoColumnBasic displays two pricing plans in a clean two-column layout with radio toggle.
 * Features a monthly/yearly toggle with badge highlighting for the recommended plan.
 * Simple and focused design ideal for products with two main pricing tiers.
 *
 * Perfect for startups and SaaS products with a basic/pro tier structure.
 *
 * @example
 * ```tsx
 * <PricingTwoColumnBasic
 *   title="Simple Pricing"
 *   subtitle="Choose the plan that works for you"
 *   plans={[
 *     { name: "Basic", monthlyPrice: 19, yearlyPrice: 190, features: ["Feature 1"] },
 *     { name: "Pro", monthlyPrice: 49, yearlyPrice: 490, features: ["Feature 1", "Feature 2"] }
 *   ]}
 * />
 * ```
 */
export function PricingTwoColumnBasic({
  className,
  title = "Simple, Transparent Pricing",
  subtitle = "No hidden fees. Cancel anytime.",
  plans = defaultPlans,
}: PricingTwoColumnBasicProps) {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="inline-flex rounded-lg border p-1">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  billingPeriod === "monthly"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod("yearly")}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  billingPeriod === "yearly"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "relative flex flex-col rounded-2xl border p-8",
                plan.badge ? "border-primary shadow-lg" : "border-border"
              )}
            >
              {plan.badge && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  {plan.badge}
                </Badge>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                {plan.description && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold">
                  ${billingPeriod === "yearly" ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="text-muted-foreground">
                  /{billingPeriod === "yearly" ? "year" : "month"}
                </span>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
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
                variant={plan.badge ? "default" : "outline"}
                size="lg"
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
