"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";

interface PricingTier {
  name: string;
  description: string;
  price: string;
  interval?: string;
  buttonText: string;
  buttonVariant?: "default" | "outline" | "secondary";
  buttonHref?: string;
  features: string[];
  comparison?: string;
  hasPurchaseOption?: boolean;
  bgClass?: string;
}

export interface PricingTierGridProps {
  className?: string;
  title?: string;
  subtitle?: string;
  tiers?: PricingTier[];
}

const defaultTiers: PricingTier[] = [
  {
    name: "Free",
    description: "For individuals and small teams getting started",
    price: "$0",
    interval: "/month",
    buttonText: "Get Started",
    buttonVariant: "outline",
    buttonHref: "#",
    features: [
      "Up to 5 projects",
      "Basic analytics",
      "Community support",
      "1GB storage",
    ],
    comparison: "Free forever",
    hasPurchaseOption: true,
    bgClass: "bg-background",
  },
  {
    name: "Pro",
    description: "For growing teams that need more power",
    price: "$29",
    interval: "/month",
    buttonText: "Start Free Trial",
    buttonVariant: "default",
    buttonHref: "#",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "10GB storage",
      "Custom integrations",
    ],
    comparison: "Most popular",
    hasPurchaseOption: true,
    bgClass: "bg-primary text-primary-foreground",
  },
  {
    name: "Premium",
    description: "For large teams with advanced needs",
    price: "$79",
    interval: "/month",
    buttonText: "Start Free Trial",
    buttonVariant: "outline",
    buttonHref: "#",
    features: [
      "Everything in Pro",
      "Unlimited storage",
      "Advanced security",
      "Custom branding",
      "API access",
      "Dedicated support",
    ],
    comparison: "Best value",
    hasPurchaseOption: true,
    bgClass: "bg-background",
  },
  {
    name: "Enterprise",
    description: "For organizations with custom requirements",
    price: "Custom",
    buttonText: "Contact Sales",
    buttonVariant: "outline",
    buttonHref: "#",
    features: [
      "Everything in Premium",
      "Custom contracts",
      "SLA guarantees",
      "On-premise deployment",
      "Dedicated account manager",
      "Custom training",
    ],
    comparison: "For large teams",
    hasPurchaseOption: false,
    bgClass: "bg-background",
  },
];

function PricingCard({ tier }: { tier: PricingTier }) {
  const isPrimary = tier.bgClass?.includes("bg-primary");

  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border p-6 shadow-sm",
        tier.bgClass
      )}
    >
      <div className="mb-4">
        {tier.comparison && (
          <span
            className={cn(
              "text-xs font-medium uppercase tracking-wide",
              isPrimary ? "text-primary-foreground/70" : "text-muted-foreground"
            )}
          >
            {tier.comparison}
          </span>
        )}
        <h3
          className={cn(
            "mt-2 text-xl font-semibold",
            isPrimary ? "text-primary-foreground" : "text-foreground"
          )}
        >
          {tier.name}
        </h3>
        <p
          className={cn(
            "mt-1 text-sm",
            isPrimary ? "text-primary-foreground/80" : "text-muted-foreground"
          )}
        >
          {tier.description}
        </p>
      </div>

      <div className="mb-6">
        <span
          className={cn(
            "text-4xl font-bold",
            isPrimary ? "text-primary-foreground" : "text-foreground"
          )}
        >
          {tier.price}
        </span>
        {tier.interval && (
          <span
            className={cn(
              "text-sm",
              isPrimary ? "text-primary-foreground/70" : "text-muted-foreground"
            )}
          >
            {tier.interval}
          </span>
        )}
      </div>

      <Pressable
        href={tier.buttonHref}
        variant={tier.buttonVariant}
        size="default"
        asButton
        className={cn(
          "w-full justify-center",
          isPrimary && tier.buttonVariant === "outline"
            ? "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            : ""
        )}
      >
        {tier.buttonText}
      </Pressable>

      <ul className="mt-6 space-y-3">
        {tier.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <DynamicIcon
              name="lucide/check"
              size={16}
              className={cn(
                "mt-0.5 shrink-0",
                isPrimary ? "text-primary-foreground" : "text-primary"
              )}
            />
            <span
              className={cn(
                "text-sm",
                isPrimary ? "text-primary-foreground/90" : "text-muted-foreground"
              )}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * PricingTierGrid displays a 4-column grid of pricing tiers with feature lists.
 * Each tier card includes a name, description, price, CTA button, and feature checklist.
 * Supports highlighting a primary/featured tier with distinct styling.
 *
 * Ideal for SaaS products, subscription services, or any business with tiered pricing.
 *
 * @example
 * ```tsx
 * <PricingTierGrid
 *   title="Choose Your Plan"
 *   subtitle="Start free and scale as you grow"
 *   tiers={[
 *     { name: "Free", price: "$0", features: ["Feature 1"], buttonText: "Get Started" },
 *     { name: "Pro", price: "$29", features: ["Feature 1", "Feature 2"], buttonText: "Start Trial" }
 *   ]}
 * />
 * ```
 */
export function PricingTierGrid({
  className,
  title = "Simple, transparent pricing",
  subtitle = "Choose the plan that's right for you",
  tiers = defaultTiers,
}: PricingTierGridProps) {
  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier, index) => (
            <PricingCard key={index} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  );
}
