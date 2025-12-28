"use client";

import * as React from "react";
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
  icon?: string;
  iconBgClass?: string;
}

export interface PricingIconHeadersProps {
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
    description: "Perfect for individuals",
    features: [
      "5 projects",
      "Basic analytics",
      "Email support",
      "1GB storage",
    ],
    buttonText: "Get Started",
    buttonHref: "#",
    icon: "lucide/rocket",
    iconBgClass: "bg-blue-100 text-blue-600",
  },
  {
    name: "Professional",
    price: "$29",
    priceDescription: "/month",
    description: "Best for growing teams",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "50GB storage",
      "API access",
    ],
    buttonText: "Start Free Trial",
    buttonHref: "#",
    icon: "lucide/briefcase",
    iconBgClass: "bg-purple-100 text-purple-600",
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
    icon: "lucide/building",
    iconBgClass: "bg-green-100 text-green-600",
  },
];

/**
 * PricingIconHeaders displays a 3-column pricing grid with icon-based plan headers.
 * Each plan features a colored icon badge, feature list, and CTA button.
 * Clean bordered design with visual differentiation through icon colors.
 *
 * Ideal for products that want to visually distinguish plans with icons and colors.
 *
 * @example
 * ```tsx
 * <PricingIconHeaders
 *   title="Choose Your Plan"
 *   plans={[
 *     { name: "Starter", price: "$9", features: ["Feature 1"], icon: "lucide/rocket" }
 *   ]}
 * />
 * ```
 */
export function PricingIconHeaders({
  className,
  title = "Pricing Plans",
  subtitle = "Choose the perfect plan for your needs",
  plans = defaultPlans,
}: PricingIconHeadersProps) {
  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="flex flex-col rounded-2xl border p-6"
            >
              <div className="mb-6 flex items-start gap-4">
                {plan.icon && (
                  <div
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                      plan.iconBgClass || "bg-primary/10 text-primary"
                    )}
                  >
                    <DynamicIcon name={plan.icon} size={24} />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  {plan.description && (
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  )}
                </div>
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
                variant="outline"
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
