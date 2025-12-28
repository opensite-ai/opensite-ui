"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Switch } from "../../ui/switch";

interface ComparisonFeature {
  name: string;
  category: string;
  free: boolean | string;
  startup: boolean | string;
  team: boolean | string;
  enterprise: boolean | string;
}

interface PricingPlan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description?: string;
  buttonText: string;
  buttonHref?: string;
  isPopular?: boolean;
}

export interface PricingFullComparisonProps {
  className?: string;
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
  features?: ComparisonFeature[];
}

const defaultPlans: PricingPlan[] = [
  {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "For individuals",
    buttonText: "Get Started",
    buttonHref: "#",
  },
  {
    name: "Startup",
    monthlyPrice: 19,
    yearlyPrice: 190,
    description: "For small teams",
    buttonText: "Start Trial",
    buttonHref: "#",
  },
  {
    name: "Team",
    monthlyPrice: 49,
    yearlyPrice: 490,
    description: "For growing teams",
    buttonText: "Start Trial",
    buttonHref: "#",
    isPopular: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: 99,
    yearlyPrice: 990,
    description: "For organizations",
    buttonText: "Contact Sales",
    buttonHref: "#",
  },
];

const defaultFeatures: ComparisonFeature[] = [
  { name: "Projects", category: "Usage", free: "3", startup: "10", team: "Unlimited", enterprise: "Unlimited" },
  { name: "Team members", category: "Usage", free: "1", startup: "5", team: "20", enterprise: "Unlimited" },
  { name: "Storage", category: "Usage", free: "1GB", startup: "10GB", team: "100GB", enterprise: "Unlimited" },
  { name: "API requests", category: "Usage", free: "1,000/mo", startup: "10,000/mo", team: "100,000/mo", enterprise: "Unlimited" },
  { name: "Basic analytics", category: "Features", free: true, startup: true, team: true, enterprise: true },
  { name: "Advanced analytics", category: "Features", free: false, startup: true, team: true, enterprise: true },
  { name: "Custom reports", category: "Features", free: false, startup: false, team: true, enterprise: true },
  { name: "API access", category: "Features", free: false, startup: true, team: true, enterprise: true },
  { name: "Webhooks", category: "Features", free: false, startup: false, team: true, enterprise: true },
  { name: "Email support", category: "Support", free: true, startup: true, team: true, enterprise: true },
  { name: "Priority support", category: "Support", free: false, startup: false, team: true, enterprise: true },
  { name: "Dedicated support", category: "Support", free: false, startup: false, team: false, enterprise: true },
  { name: "SSO", category: "Security", free: false, startup: false, team: false, enterprise: true },
  { name: "Audit logs", category: "Security", free: false, startup: false, team: true, enterprise: true },
  { name: "Custom security", category: "Security", free: false, startup: false, team: false, enterprise: true },
];

/**
 * PricingFullComparison displays a comprehensive 4-tier pricing comparison with full feature matrix.
 * Features plan cards at the top followed by a detailed comparison table organized by category.
 * Includes monthly/yearly toggle and responsive design for all screen sizes.
 *
 * Ideal for products with extensive feature sets across multiple pricing tiers.
 *
 * @example
 * ```tsx
 * <PricingFullComparison
 *   title="Compare All Plans"
 *   plans={[{ name: "Free", monthlyPrice: 0, yearlyPrice: 0, buttonText: "Get Started" }]}
 *   features={[{ name: "Projects", category: "Usage", free: "3", startup: "10", team: "Unlimited", enterprise: "Unlimited" }]}
 * />
 * ```
 */
export function PricingFullComparison({
  className,
  title = "Compare All Plans",
  subtitle = "Find the perfect plan for your needs",
  plans = defaultPlans,
  features = defaultFeatures,
}: PricingFullComparisonProps) {
  const [isYearly, setIsYearly] = useState(false);

  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <DynamicIcon name="lucide/check" size={18} className="text-primary" />
      ) : (
        <DynamicIcon name="lucide/x" size={18} className="text-muted-foreground" />
      );
    }
    return <span className="text-sm font-medium">{value}</span>;
  };

  const categories = [...new Set(features.map((f) => f.category))];

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

        {/* Plan Cards */}
        <div className="mb-12 grid gap-4 md:grid-cols-4">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "rounded-lg border p-4 text-center",
                plan.isPopular ? "border-primary bg-primary/5" : "border-border"
              )}
            >
              {plan.isPopular && (
                <span className="mb-2 inline-block rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                  Popular
                </span>
              )}
              <h3 className="font-semibold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {plan.description}
              </p>
              <div className="mt-3">
                <span className="text-2xl font-bold">
                  ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="text-sm text-muted-foreground">
                  /{isYearly ? "yr" : "mo"}
                </span>
              </div>
              <Pressable
                href={plan.buttonHref}
                variant={plan.isPopular ? "default" : "outline"}
                size="sm"
                asButton
                className="mt-4 w-full justify-center"
              >
                {plan.buttonText}
              </Pressable>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left font-medium">Features</th>
                {plans.map((plan, index) => (
                  <th key={index} className="p-4 text-center font-medium">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <React.Fragment key={category}>
                  <tr className="bg-muted/50">
                    <td
                      colSpan={plans.length + 1}
                      className="p-3 text-sm font-semibold"
                    >
                      {category}
                    </td>
                  </tr>
                  {features
                    .filter((f) => f.category === category)
                    .map((feature, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-4 text-sm">{feature.name}</td>
                        <td className="p-4 text-center">
                          {renderFeatureValue(feature.free)}
                        </td>
                        <td className="p-4 text-center">
                          {renderFeatureValue(feature.startup)}
                        </td>
                        <td className="p-4 text-center">
                          {renderFeatureValue(feature.team)}
                        </td>
                        <td className="p-4 text-center">
                          {renderFeatureValue(feature.enterprise)}
                        </td>
                      </tr>
                    ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
