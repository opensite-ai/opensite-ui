"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";

interface PricingPlan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description?: string;
  features: string[];
  buttonText?: string;
  buttonHref?: string;
  isPopular?: boolean;
  icon?: string;
}

export interface PricingTabsToggleProps {
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
    icon: "lucide/user",
  },
  {
    name: "Starter",
    monthlyPrice: 19,
    yearlyPrice: 190,
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
    icon: "lucide/zap",
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
    icon: "lucide/building-2",
  },
];

/**
 * PricingTabsToggle displays a 3-column pricing grid with a tabs-based monthly/yearly toggle.
 * Features plan icons, popular plan highlighting, and clean card design with feature lists.
 * The tabs toggle provides a clear visual indication of the selected billing period.
 *
 * Ideal for SaaS products with a free tier and paid options.
 *
 * @example
 * ```tsx
 * <PricingTabsToggle
 *   title="Choose Your Plan"
 *   plans={[
 *     { name: "Free", monthlyPrice: 0, yearlyPrice: 0, features: ["Feature 1"], icon: "lucide/user" }
 *   ]}
 * />
 * ```
 */
export function PricingTabsToggle({
  className,
  title = "Simple Pricing",
  subtitle = "Choose the plan that works best for you",
  plans = defaultPlans,
}: PricingTabsToggleProps) {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>

          <Tabs
            value={billingPeriod}
            onValueChange={(v) => setBillingPeriod(v as "monthly" | "yearly")}
            className="mt-8"
          >
            <TabsList className="mx-auto">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">
                Yearly
                <Badge variant="secondary" className="ml-2">
                  Save 17%
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
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
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
              )}

              <div className="mb-4 flex items-center gap-3">
                {plan.icon && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <DynamicIcon
                      name={plan.icon}
                      size={20}
                      className="text-primary"
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold">{plan.name}</h3>
                  {plan.description && (
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  )}
                </div>
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

              <ul className="mb-6 flex-1 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <DynamicIcon
                      name="lucide/check-circle-2"
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
