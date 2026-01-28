"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";

interface FeatureCategory {
  name: string;
  features: {
    name: string;
    tooltip?: string;
    starter: boolean | string;
    professional: boolean | string;
    enterprise: boolean | string;
  }[];
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

export interface PricingFeatureMatrixProps {
  className?: string;
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
  featureCategories?: FeatureCategory[];
}

/**
 * PricingFeatureMatrix displays a comprehensive pricing comparison with collapsible feature categories.
 * Features a tabs-based monthly/yearly toggle, tooltips for feature explanations, and organized feature groups.
 * Each category can be expanded/collapsed to show detailed feature comparisons.
 *
 * Ideal for products with extensive feature sets that need organized, detailed comparison.
 *
 * @example
 * ```tsx
 * <PricingFeatureMatrix
 *   title="Compare Plans"
 *   plans={[{ name: "Starter", monthlyPrice: 19, yearlyPrice: 190, buttonText: "Get Started" }]}
 *   featureCategories={[
 *     { name: "Core", features: [{ name: "Projects", starter: "5", professional: "Unlimited", enterprise: "Unlimited" }] }
 *   ]}
 * />
 * ```
 */
export function PricingFeatureMatrix({
  className,
  title,
  subtitle,
  plans,
  featureCategories,
}: PricingFeatureMatrixProps) {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(featureCategories.map((c) => c.name))
  );

  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };

  const renderFeatureValue = useMemo(() => {
    return (value: boolean | string) => {
      if (typeof value === "boolean") {
        return value ? (
          <DynamicIcon name="lucide/check" size={18} className="text-primary" />
        ) : (
          <DynamicIcon name="lucide/x" size={18} className="text-muted-foreground" />
        );
      }
      return <span className="text-sm font-medium">{value}</span>;
    };
  }, []);

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
                  -17%
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Plan Headers */}
        <div className="mb-8 grid grid-cols-4 gap-4">
          <div className="hidden md:block" />
          {plans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "rounded-lg border p-4 text-center",
                plan.isPopular ? "border-primary bg-primary/5" : "border-border"
              )}
            >
              {plan.isPopular && (
                <Badge className="mb-2">Most Popular</Badge>
              )}
              <h3 className="font-semibold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {plan.description}
              </p>
              <div className="mt-3">
                <span className="text-2xl font-bold">
                  ${billingPeriod === "yearly" ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="text-sm text-muted-foreground">
                  /{billingPeriod === "yearly" ? "yr" : "mo"}
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

        {/* Feature Categories */}
        <TooltipProvider>
          <div className="space-y-4">
            {featureCategories.map((category) => (
              <div key={category.name} className="rounded-lg border">
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="flex w-full items-center justify-between p-4 text-left font-semibold hover:bg-muted/50"
                >
                  <span>{category.name}</span>
                  <DynamicIcon
                    name={expandedCategories.has(category.name) ? "lucide/chevron-up" : "lucide/chevron-down"}
                    size={18}
                    className="text-muted-foreground"
                  />
                </button>

                {expandedCategories.has(category.name) && (
                  <div className="border-t">
                    {category.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="grid grid-cols-4 gap-4 border-b p-4 last:border-b-0"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{feature.name}</span>
                          {feature.tooltip && (
                            <Tooltip>
                              <TooltipTrigger>
                                <DynamicIcon
                                  name="lucide/info"
                                  size={14}
                                  className="text-muted-foreground"
                                />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{feature.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                        <div className="flex items-center justify-center">
                          {renderFeatureValue(feature.starter)}
                        </div>
                        <div className="flex items-center justify-center">
                          {renderFeatureValue(feature.professional)}
                        </div>
                        <div className="flex items-center justify-center">
                          {renderFeatureValue(feature.enterprise)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
}
