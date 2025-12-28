"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";

interface ServicePlan {
  name: string;
  price: string;
  priceDescription?: string;
  description?: string;
  features: string[];
  buttonText?: string;
  buttonHref?: string;
  isHighlighted?: boolean;
  icon?: string;
}

export interface PricingServicesCardsProps {
  className?: string;
  title?: string;
  subtitle?: string;
  plans?: ServicePlan[];
}

const defaultPlans: ServicePlan[] = [
  {
    name: "Consultation",
    price: "$199",
    priceDescription: "/session",
    description: "One-on-one expert consultation",
    features: [
      "60-minute session",
      "Personalized advice",
      "Action plan",
      "Follow-up email",
    ],
    buttonText: "Book Now",
    buttonHref: "#",
    icon: "lucide/users",
    isHighlighted: true,
  },
  {
    name: "Implementation",
    price: "$999",
    priceDescription: "/project",
    description: "Full implementation service",
    features: [
      "Project scoping",
      "Custom development",
      "Testing & QA",
      "Deployment",
      "30-day support",
    ],
    buttonText: "Get Quote",
    buttonHref: "#",
    icon: "lucide/code",
  },
];

/**
 * PricingServicesCards displays a two-card layout for service-based pricing.
 * Features icon headers, feature lists, and distinct styling for the primary service.
 * Ideal for agencies, consultants, or service-based businesses.
 *
 * Perfect for showcasing different service tiers or packages.
 *
 * @example
 * ```tsx
 * <PricingServicesCards
 *   title="Our Services"
 *   plans={[
 *     { name: "Consultation", price: "$199", features: ["Feature 1"], icon: "lucide/users" }
 *   ]}
 * />
 * ```
 */
export function PricingServicesCards({
  className,
  title = "Our Services",
  subtitle = "Choose the service that fits your needs",
  plans = defaultPlans,
}: PricingServicesCardsProps) {
  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
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
              <div className="mb-6 flex items-start gap-4">
                {plan.icon && (
                  <div
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                      plan.isHighlighted
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <DynamicIcon name={plan.icon} size={24} />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  {plan.description && (
                    <p className="mt-1 text-sm text-muted-foreground">
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
