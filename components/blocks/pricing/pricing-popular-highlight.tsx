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

export interface PricingPopularHighlightProps {
  className?: string;
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
}

const defaultPlans: PricingPlan[] = [
  {
    name: "Basic",
    monthlyPrice: 15,
    yearlyPrice: 150,
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
    monthlyPrice: 39,
    yearlyPrice: 390,
    description: "For growing teams",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "50GB storage",
      "API access",
      "Team collaboration",
    ],
    buttonText: "Start Free Trial",
    buttonHref: "#",
    isPopular: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: 99,
    yearlyPrice: 990,
    description: "For large organizations",
    features: [
      "Everything in Pro",
      "Custom integrations",
      "Dedicated support",
      "Unlimited storage",
      "SLA guarantee",
    ],
    buttonText: "Contact Sales",
    buttonHref: "#",
  },
];

/**
 * PricingPopularHighlight displays a 3-column pricing grid with the popular plan visually elevated.
 * The popular plan is scaled up and has enhanced styling to draw attention.
 * Features a Switch toggle for annual billing and clean card design.
 *
 * Ideal for products that want to strongly emphasize their recommended tier.
 *
 * @example
 * ```tsx
 * <PricingPopularHighlight
 *   title="Choose Your Plan"
 *   plans={[
 *     { name: "Basic", monthlyPrice: 15, yearlyPrice: 150, features: ["Feature 1"] },
 *     { name: "Pro", monthlyPrice: 39, yearlyPrice: 390, features: ["Feature 1"], isPopular: true }
 *   ]}
 * />
 * ```
 */
export function PricingPopularHighlight({
  className,
  title = "Pricing Plans",
  subtitle = "Choose the perfect plan for your needs",
  plans = defaultPlans,
}: PricingPopularHighlightProps) {
  const [isAnnual, setIsAnnual] = useState(false);

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
                !isAnnual ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Monthly
            </span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
            <span
              className={cn(
                "text-sm font-medium",
                isAnnual ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Annual
              <span className="ml-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                Save 17%
              </span>
            </span>
          </div>
        </div>

        <div className="grid items-center gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "relative flex flex-col rounded-2xl border p-6 transition-all",
                plan.isPopular
                  ? "z-10 border-primary bg-card shadow-xl md:-my-4 md:scale-105 md:p-8"
                  : "border-border"
              )}
            >
              {plan.isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                  Most Popular
                </span>
              )}

              <div className="mb-4">
                <h3 className={cn("font-semibold", plan.isPopular ? "text-xl" : "text-lg")}>
                  {plan.name}
                </h3>
                {plan.description && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <span className={cn("font-bold", plan.isPopular ? "text-5xl" : "text-4xl")}>
                  ${isAnnual ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="text-muted-foreground">
                  /{isAnnual ? "year" : "month"}
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
                size={plan.isPopular ? "lg" : "default"}
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
