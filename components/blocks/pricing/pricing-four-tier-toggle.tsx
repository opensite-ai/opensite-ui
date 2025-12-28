"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Switch } from "../../ui/switch";
import { Label } from "../../ui/label";

interface PricingPlan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description?: string;
  features: { name: string; included: boolean }[];
  buttonText?: string;
  buttonHref?: string;
  isPopular?: boolean;
}

export interface PricingFourTierToggleProps {
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
      { name: "Up to 3 projects", included: true },
      { name: "Basic analytics", included: true },
      { name: "Community support", included: true },
      { name: "API access", included: false },
      { name: "Custom integrations", included: false },
    ],
    buttonText: "Get Started",
    buttonHref: "#",
  },
  {
    name: "Basic",
    monthlyPrice: 15,
    yearlyPrice: 150,
    description: "For small teams",
    features: [
      { name: "Up to 10 projects", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Email support", included: true },
      { name: "API access", included: true },
      { name: "Custom integrations", included: false },
    ],
    buttonText: "Start Trial",
    buttonHref: "#",
  },
  {
    name: "Team",
    monthlyPrice: 39,
    yearlyPrice: 390,
    description: "For growing teams",
    features: [
      { name: "Unlimited projects", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Priority support", included: true },
      { name: "API access", included: true },
      { name: "Custom integrations", included: true },
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
      { name: "Unlimited everything", included: true },
      { name: "Custom analytics", included: true },
      { name: "24/7 dedicated support", included: true },
      { name: "Full API access", included: true },
      { name: "Custom integrations", included: true },
    ],
    buttonText: "Contact Sales",
    buttonHref: "#",
  },
];

/**
 * PricingFourTierToggle displays a 4-column pricing grid with annual billing toggle.
 * Features check/X icons for feature availability, popular plan highlighting, and responsive layout.
 * Switch toggle allows users to compare monthly vs annual pricing with savings indicator.
 *
 * Ideal for SaaS products with multiple tiers from free to enterprise.
 *
 * @example
 * ```tsx
 * <PricingFourTierToggle
 *   title="Choose Your Plan"
 *   plans={[
 *     { name: "Free", monthlyPrice: 0, yearlyPrice: 0, features: [{ name: "Feature", included: true }] }
 *   ]}
 * />
 * ```
 */
export function PricingFourTierToggle({
  className,
  title = "Pricing Plans",
  subtitle = "Choose the perfect plan for your needs",
  plans = defaultPlans,
}: PricingFourTierToggleProps) {
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
            <Label
              htmlFor="billing-toggle"
              className={cn(
                "text-sm font-medium",
                !isAnnual ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <Label
              htmlFor="billing-toggle"
              className={cn(
                "text-sm font-medium",
                isAnnual ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Annual
              <Badge variant="secondary" className="ml-2">
                Save 17%
              </Badge>
            </Label>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
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
                <span className="text-3xl font-bold">
                  ${isAnnual ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="text-sm text-muted-foreground">
                  /{isAnnual ? "year" : "month"}
                </span>
              </div>

              <ul className="mb-6 flex-1 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    {feature.included ? (
                      <DynamicIcon
                        name="lucide/check"
                        size={16}
                        className="mt-0.5 shrink-0 text-primary"
                      />
                    ) : (
                      <DynamicIcon
                        name="lucide/x"
                        size={16}
                        className="mt-0.5 shrink-0 text-muted-foreground"
                      />
                    )}
                    <span
                      className={cn(
                        "text-sm",
                        feature.included
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {feature.name}
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
