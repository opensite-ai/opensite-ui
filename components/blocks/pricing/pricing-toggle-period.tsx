"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";

interface PricingPlan {
  name: string;
  monthlyPrice: number;
  quarterlyPrice: number;
  yearlyPrice: number;
  description?: string;
  features: string[];
  buttonText?: string;
  buttonHref?: string;
  isPopular?: boolean;
}

export interface PricingTogglePeriodProps {
  className?: string;
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
}

const defaultPlans: PricingPlan[] = [
  {
    name: "Starter",
    monthlyPrice: 19,
    quarterlyPrice: 49,
    yearlyPrice: 149,
    description: "For individuals",
    features: [
      "5 projects",
      "Basic analytics",
      "Email support",
      "2GB storage",
    ],
    buttonText: "Get Started",
    buttonHref: "#",
  },
  {
    name: "Professional",
    monthlyPrice: 49,
    quarterlyPrice: 129,
    yearlyPrice: 399,
    description: "For teams",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "50GB storage",
      "API access",
    ],
    buttonText: "Start Trial",
    buttonHref: "#",
    isPopular: true,
  },
];

type BillingPeriod = "monthly" | "quarterly" | "yearly";

/**
 * PricingTogglePeriod displays pricing plans with a toggle group for multiple billing periods.
 * Supports monthly, quarterly, and yearly billing options with visual toggle buttons.
 * Features clean two-column layout with popular plan highlighting.
 *
 * Ideal for products offering flexible billing period options beyond just monthly/yearly.
 *
 * @example
 * ```tsx
 * <PricingTogglePeriod
 *   title="Flexible Pricing"
 *   plans={[
 *     { name: "Starter", monthlyPrice: 19, quarterlyPrice: 49, yearlyPrice: 149, features: ["Feature 1"] }
 *   ]}
 * />
 * ```
 */
export function PricingTogglePeriod({
  className,
  title = "Flexible Pricing",
  subtitle = "Choose your billing period",
  plans = defaultPlans,
}: PricingTogglePeriodProps) {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");

  const getPrice = (plan: PricingPlan) => {
    switch (billingPeriod) {
      case "quarterly":
        return plan.quarterlyPrice;
      case "yearly":
        return plan.yearlyPrice;
      default:
        return plan.monthlyPrice;
    }
  };

  const getPeriodLabel = () => {
    switch (billingPeriod) {
      case "quarterly":
        return "/quarter";
      case "yearly":
        return "/year";
      default:
        return "/month";
    }
  };

  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>

          <div className="mt-8 flex items-center justify-center">
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
                onClick={() => setBillingPeriod("quarterly")}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  billingPeriod === "quarterly"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Quarterly
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
                <span className="ml-1.5 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                  Save 35%
                </span>
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
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                {plan.description && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold">${getPrice(plan)}</span>
                <span className="text-muted-foreground">{getPeriodLabel()}</span>
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
                variant={plan.isPopular ? "default" : "outline"}
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
