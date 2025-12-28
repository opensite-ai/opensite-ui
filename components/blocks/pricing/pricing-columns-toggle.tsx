"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Separator } from "../../ui/separator";

interface PricingPlan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description?: string;
  features: string[];
  buttonText?: string;
  buttonHref?: string;
  isHighlighted?: boolean;
}

export interface PricingColumnsToggleProps {
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
    description: "Essential features for getting started",
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
    name: "Standard",
    monthlyPrice: 35,
    yearlyPrice: 350,
    description: "Everything you need to grow",
    features: [
      "25 projects",
      "Advanced analytics",
      "Priority support",
      "10GB storage",
      "Team collaboration",
    ],
    buttonText: "Start Free Trial",
    buttonHref: "#",
    isHighlighted: true,
  },
  {
    name: "Premium",
    monthlyPrice: 75,
    yearlyPrice: 750,
    description: "Advanced features for power users",
    features: [
      "Unlimited projects",
      "Custom analytics",
      "24/7 support",
      "Unlimited storage",
      "API access",
      "Custom integrations",
    ],
    buttonText: "Contact Sales",
    buttonHref: "#",
  },
];

/**
 * PricingColumnsToggle displays a 3-column pricing layout with an annual billing toggle.
 * Features clean column design with separator lines, feature lists, and highlighted plan option.
 * Toggle switch allows users to compare monthly vs annual pricing.
 *
 * Ideal for SaaS products with clear tier differentiation and annual discount offerings.
 *
 * @example
 * ```tsx
 * <PricingColumnsToggle
 *   title="Choose Your Plan"
 *   subtitle="Start with a 14-day free trial"
 *   plans={[
 *     { name: "Basic", monthlyPrice: 15, yearlyPrice: 150, features: ["Feature 1"] }
 *   ]}
 * />
 * ```
 */
export function PricingColumnsToggle({
  className,
  title = "Simple, transparent pricing",
  subtitle = "No hidden fees. Cancel anytime.",
  plans = defaultPlans,
}: PricingColumnsToggleProps) {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                !isAnnual ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Monthly billing
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={cn(
                "relative h-6 w-11 rounded-full transition-colors",
                isAnnual ? "bg-primary" : "bg-muted"
              )}
              aria-label="Toggle annual billing"
            >
              <span
                className={cn(
                  "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-background shadow-sm transition-transform",
                  isAnnual && "translate-x-5"
                )}
              />
            </button>
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                isAnnual ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Annual billing
              <span className="ml-1.5 text-xs text-primary">(Save 17%)</span>
            </span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col rounded-2xl border p-8",
                plan.isHighlighted
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "border-border"
              )}
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                {plan.description && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <span className="text-5xl font-bold">
                  ${isAnnual ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="text-muted-foreground">
                  /{isAnnual ? "year" : "month"}
                </span>
              </div>

              <Separator className="mb-6" />

              <ul className="mb-8 flex-1 space-y-4">
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
                variant={plan.isHighlighted ? "default" : "outline"}
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
