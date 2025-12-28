"use client";

import * as React from "react";
import { useState } from "react";
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
  isPopular?: boolean;
}

export interface PricingCollapsiblePlansProps {
  className?: string;
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
}

const defaultPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "$9",
    priceDescription: "/month",
    description: "For individuals",
    features: [
      "5 projects",
      "Basic analytics",
      "Email support",
      "1GB storage",
    ],
    buttonText: "Get Started",
    buttonHref: "#",
  },
  {
    name: "Professional",
    price: "$29",
    priceDescription: "/month",
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
  },
  {
    name: "Enterprise",
    price: "Custom",
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
 * PricingCollapsiblePlans displays pricing plans with a collapsible mobile menu and desktop comparison.
 * Features a dropdown plan selector on mobile and expanded cards on desktop.
 * Ideal for responsive pricing pages that need to work well on all screen sizes.
 *
 * Perfect for mobile-first pricing experiences.
 *
 * @example
 * ```tsx
 * <PricingCollapsiblePlans
 *   title="Choose Your Plan"
 *   plans={[
 *     { name: "Starter", price: "$9", features: ["Feature 1"] }
 *   ]}
 * />
 * ```
 */
export function PricingCollapsiblePlans({
  className,
  title = "Pricing Plans",
  subtitle = "Choose the perfect plan for your needs",
  plans = defaultPlans,
}: PricingCollapsiblePlansProps) {
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        {/* Mobile Plan Selector */}
        <div className="mb-8 md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex w-full items-center justify-between rounded-lg border p-4"
          >
            <div>
              <span className="font-semibold">{plans[selectedPlan].name}</span>
              <span className="ml-2 text-muted-foreground">
                {plans[selectedPlan].price}
                {plans[selectedPlan].priceDescription}
              </span>
            </div>
            <DynamicIcon
              name={isMenuOpen ? "lucide/chevron-up" : "lucide/chevron-down"}
              size={20}
              className="text-muted-foreground"
            />
          </button>

          {isMenuOpen && (
            <div className="mt-2 rounded-lg border bg-card shadow-lg">
              {plans.map((plan, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedPlan(index);
                    setIsMenuOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between p-4 text-left hover:bg-muted/50",
                    index !== plans.length - 1 && "border-b",
                    selectedPlan === index && "bg-muted/50"
                  )}
                >
                  <div>
                    <span className="font-semibold">{plan.name}</span>
                    {plan.isPopular && (
                      <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                        Popular
                      </span>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </div>
                  <span className="font-semibold">
                    {plan.price}
                    {plan.priceDescription}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Selected Plan Details (Mobile) */}
          <div className="mt-6 rounded-lg border p-6">
            <div className="mb-4">
              <span className="text-3xl font-bold">
                {plans[selectedPlan].price}
              </span>
              {plans[selectedPlan].priceDescription && (
                <span className="text-muted-foreground">
                  {plans[selectedPlan].priceDescription}
                </span>
              )}
            </div>

            <ul className="mb-6 space-y-3">
              {plans[selectedPlan].features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
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
              href={plans[selectedPlan].buttonHref}
              variant="default"
              size="default"
              asButton
              className="w-full justify-center"
            >
              {plans[selectedPlan].buttonText}
            </Pressable>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden gap-6 md:grid md:grid-cols-3">
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
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.priceDescription && (
                  <span className="text-muted-foreground">
                    {plan.priceDescription}
                  </span>
                )}
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
