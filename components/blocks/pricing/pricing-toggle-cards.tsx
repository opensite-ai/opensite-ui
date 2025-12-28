"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { Switch } from "../../ui/switch";
import { Separator } from "../../ui/separator";

interface PricingPlan {
  name: string;
  description?: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  buttonText?: string;
  buttonHref?: string;
  isPopular?: boolean;
}

export interface PricingToggleCardsProps {
  className?: string;
  heading?: string;
  description?: string;
  plans?: PricingPlan[];
}

const defaultPlans: PricingPlan[] = [
  {
    name: "Starter",
    description: "Perfect for individuals",
    monthlyPrice: 9,
    yearlyPrice: 90,
    features: [
      "Up to 3 projects",
      "Basic analytics",
      "Email support",
      "1GB storage",
    ],
    buttonText: "Get Started",
    buttonHref: "#",
  },
  {
    name: "Professional",
    description: "Best for growing teams",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "10GB storage",
      "Team collaboration",
    ],
    buttonText: "Start Free Trial",
    buttonHref: "#",
    isPopular: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: [
      "Everything in Professional",
      "Custom integrations",
      "Dedicated support",
      "Unlimited storage",
      "SLA guarantee",
      "Custom training",
    ],
    buttonText: "Contact Sales",
    buttonHref: "#",
  },
];

/**
 * PricingToggleCards displays pricing plans with a monthly/yearly toggle switch.
 * Features Card components with feature lists, popular plan highlighting, and responsive grid layout.
 * The toggle allows users to compare monthly vs annual pricing with potential savings.
 *
 * Ideal for subscription-based services that offer both monthly and annual billing options.
 *
 * @example
 * ```tsx
 * <PricingToggleCards
 *   heading="Choose Your Plan"
 *   description="Save 20% with annual billing"
 *   plans={[
 *     { name: "Basic", monthlyPrice: 9, yearlyPrice: 90, features: ["Feature 1"] }
 *   ]}
 * />
 * ```
 */
export function PricingToggleCards({
  className,
  heading = "Pricing Plans",
  description = "Choose the perfect plan for your needs. Switch between monthly and yearly billing.",
  plans = defaultPlans,
}: PricingToggleCardsProps) {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>

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
                Save 20%
              </span>
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={cn(
                "relative flex flex-col",
                plan.isPopular && "border-primary shadow-lg"
              )}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className="pb-4">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                {plan.description && (
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                )}
              </CardHeader>

              <CardContent className="flex-1">
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground">
                    /{isYearly ? "year" : "month"}
                  </span>
                </div>

                <Separator className="mb-6" />

                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <DynamicIcon
                        name="lucide/circle-check"
                        size={18}
                        className="mt-0.5 shrink-0 text-primary"
                      />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Pressable
                  href={plan.buttonHref}
                  variant={plan.isPopular ? "default" : "outline"}
                  size="default"
                  asButton
                  className="w-full justify-center"
                >
                  {plan.buttonText}
                </Pressable>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
