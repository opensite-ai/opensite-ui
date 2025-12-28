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
  gradientClass?: string;
}

export interface PricingGradientCardsProps {
  className?: string;
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
}

const defaultPlans: PricingPlan[] = [
  {
    name: "Starter",
    monthlyPrice: 15,
    yearlyPrice: 150,
    description: "For individuals",
    features: ["5 projects", "Basic analytics", "Email support", "2GB storage"],
    buttonText: "Get Started",
    buttonHref: "#",
    gradientClass: "from-blue-500/10 to-cyan-500/10",
  },
  {
    name: "Professional",
    monthlyPrice: 39,
    yearlyPrice: 390,
    description: "For growing teams",
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
    gradientClass: "from-purple-500/10 to-pink-500/10",
  },
  {
    name: "Enterprise",
    monthlyPrice: 99,
    yearlyPrice: 990,
    description: "For organizations",
    features: [
      "Everything in Pro",
      "Custom integrations",
      "Dedicated support",
      "Unlimited storage",
      "SLA guarantee",
    ],
    buttonText: "Contact Sales",
    buttonHref: "#",
    gradientClass: "from-orange-500/10 to-red-500/10",
  },
];

/**
 * PricingGradientCards displays pricing plans with subtle gradient backgrounds.
 * Each card features a unique gradient color scheme for visual differentiation.
 * Includes monthly/yearly toggle and popular plan highlighting.
 *
 * Ideal for modern, visually appealing pricing pages.
 *
 * @example
 * ```tsx
 * <PricingGradientCards
 *   title="Choose Your Plan"
 *   plans={[
 *     { name: "Starter", monthlyPrice: 15, yearlyPrice: 150, features: ["Feature 1"], gradientClass: "from-blue-500/10 to-cyan-500/10" }
 *   ]}
 * />
 * ```
 */
export function PricingGradientCards({
  className,
  title = "Pricing Plans",
  subtitle = "Choose the perfect plan for your needs",
  plans = defaultPlans,
}: PricingGradientCardsProps) {
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
              <span className="ml-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
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
                plan.isPopular ? "border-primary shadow-lg" : "border-border",
                plan.gradientClass && `bg-linear-to-br ${plan.gradientClass}`
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
