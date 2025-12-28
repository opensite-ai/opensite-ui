"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Label } from "../../ui/label";
import { Separator } from "../../ui/separator";

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

export interface PricingRadioToggleProps {
  className?: string;
  title?: string;
  description?: string;
  plans?: PricingPlan[];
}

const defaultPlans: PricingPlan[] = [
  {
    name: "Starter",
    monthlyPrice: 19,
    yearlyPrice: 190,
    description: "For individuals and small projects",
    features: [
      "Up to 5 team members",
      "Basic reporting",
      "Email support",
      "5GB storage",
    ],
    buttonText: "Get Started",
    buttonHref: "#",
  },
  {
    name: "Professional",
    monthlyPrice: 49,
    yearlyPrice: 490,
    description: "For growing teams and businesses",
    features: [
      "Up to 20 team members",
      "Advanced reporting",
      "Priority support",
      "50GB storage",
      "Custom integrations",
    ],
    buttonText: "Start Free Trial",
    buttonHref: "#",
    badge: "Popular",
  },
  {
    name: "Enterprise",
    monthlyPrice: 99,
    yearlyPrice: 990,
    description: "For large organizations",
    features: [
      "Unlimited team members",
      "Custom reporting",
      "24/7 dedicated support",
      "Unlimited storage",
      "SSO & advanced security",
      "Custom contracts",
    ],
    buttonText: "Contact Sales",
    buttonHref: "#",
  },
];

/**
 * PricingRadioToggle displays pricing plans with a radio button style monthly/yearly toggle.
 * Features a clean design with badges for popular plans, feature lists, and responsive layout.
 * The radio toggle provides a clear visual indication of the selected billing period.
 *
 * Ideal for SaaS products that want a distinctive toggle style for billing period selection.
 *
 * @example
 * ```tsx
 * <PricingRadioToggle
 *   title="Choose Your Plan"
 *   description="Select the plan that works best for you"
 *   plans={[
 *     { name: "Basic", monthlyPrice: 19, yearlyPrice: 190, features: ["Feature 1"] }
 *   ]}
 * />
 * ```
 */
export function PricingRadioToggle({
  className,
  title = "Flexible Pricing",
  description = "Choose the plan that fits your needs. All plans include a 14-day free trial.",
  plans = defaultPlans,
}: PricingRadioToggleProps) {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>

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
                <Badge variant="secondary" className="ml-2">
                  -17%
                </Badge>
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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

              <Separator className="mb-6" />

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
