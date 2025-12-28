"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Switch } from "../../ui/switch";

interface ComparisonFeature {
  name: string;
  category?: string;
  free: boolean | string;
  pro: boolean | string;
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

export interface PricingComparisonHeadersProps {
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
    name: "Pro",
    monthlyPrice: 29,
    yearlyPrice: 290,
    description: "For teams",
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
  { name: "Projects", category: "Usage", free: "3", pro: "Unlimited", enterprise: "Unlimited" },
  { name: "Team members", category: "Usage", free: "1", pro: "10", enterprise: "Unlimited" },
  { name: "Storage", category: "Usage", free: "1GB", pro: "100GB", enterprise: "Unlimited" },
  { name: "API access", category: "Features", free: false, pro: true, enterprise: true },
  { name: "Priority support", category: "Support", free: false, pro: true, enterprise: true },
  { name: "Custom integrations", category: "Features", free: false, pro: false, enterprise: true },
  { name: "SSO", category: "Security", free: false, pro: false, enterprise: true },
  { name: "Dedicated support", category: "Support", free: false, pro: false, enterprise: true },
];

/**
 * PricingComparisonHeaders displays a comparison table with plan headers and monthly/yearly toggle.
 * Features sticky plan headers, feature rows with check/X indicators, and responsive design.
 * Ideal for detailed feature comparisons across multiple pricing tiers.
 *
 * Perfect for products with many features that need clear tier differentiation.
 *
 * @example
 * ```tsx
 * <PricingComparisonHeaders
 *   title="Compare Plans"
 *   plans={[{ name: "Free", monthlyPrice: 0, yearlyPrice: 0, buttonText: "Get Started" }]}
 *   features={[{ name: "Projects", free: "3", pro: "Unlimited", enterprise: "Unlimited" }]}
 * />
 * ```
 */
export function PricingComparisonHeaders({
  className,
  title = "Compare Plans",
  subtitle = "Find the perfect plan for your needs",
  plans = defaultPlans,
  features = defaultFeatures,
}: PricingComparisonHeadersProps) {
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

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th className="p-4 text-left" />
                {plans.map((plan, index) => (
                  <th key={index} className="p-4 text-center">
                    <div
                      className={cn(
                        "rounded-lg border p-4",
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
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4 text-sm font-medium">{feature.name}</td>
                  <td className="p-4 text-center">
                    {renderFeatureValue(feature.free)}
                  </td>
                  <td className="p-4 text-center">
                    {renderFeatureValue(feature.pro)}
                  </td>
                  <td className="p-4 text-center">
                    {renderFeatureValue(feature.enterprise)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
