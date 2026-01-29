"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Switch } from "../../ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { Section } from "../../ui/section";
import type { SectionBackground } from "../../../src/types";

interface PlanFeature {
  name: string;
  tooltip?: string;
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

export interface PricingResponsiveTableProps {
  className?: string;
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
  features?: PlanFeature[];
  background?: SectionBackground;
}

/**
 * PricingResponsiveTable displays a comprehensive pricing comparison with mobile and desktop views.
 * Features a monthly/yearly toggle, tooltips for feature explanations, and responsive card/table layouts.
 * Mobile view shows individual plan cards, while desktop shows a full comparison table.
 *
 * Ideal for products with multiple tiers that need detailed feature comparison.
 *
 * @example
 * ```tsx
 * <PricingResponsiveTable
 *   title="Compare Plans"
 *   plans={[
 *     { name: "Free", monthlyPrice: 0, yearlyPrice: 0, buttonText: "Get Started" }
 *   ]}
 *   features={[
 *     { name: "Projects", free: "3", pro: "Unlimited", enterprise: "Unlimited" }
 *   ]}
 * />
 * ```
 */
export function PricingResponsiveTable({
  className,
  title,
  subtitle,
  plans = [],
  features,
  background = "default",
}: PricingResponsiveTableProps) {
  const [isYearly, setIsYearly] = useState(false);

  const renderFeatureValue = useMemo(() => {
    return (value: boolean | string) => {
      if (typeof value === "boolean") {
        return value ? (
          <DynamicIcon name="lucide/check" size={18} className="text-primary" />
        ) : (
          <DynamicIcon name="lucide/minus" size={18} className="text-muted-foreground" />
        );
      }
      return <span className="text-sm font-medium">{value}</span>;
    };
  }, []);

  return (
    <Section background={background} className={className}>
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <span
            className={cn(
              "text-sm font-medium",
              !isYearly ? "" : "text-muted-foreground"
            )}
          >
            Monthly
          </span>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} />
          <span
            className={cn(
              "text-sm font-medium",
              isYearly ? "" : "text-muted-foreground"
            )}
          >
            Yearly
            <span className="ml-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
              Save 17%
            </span>
          </span>
        </div>
      </div>

        {/* Mobile View - Cards */}
        <div className="grid gap-6 md:hidden">
          {plans.map((plan, planIndex) => (
            <Card
              key={planIndex}
              className={cn(plan.isPopular && "border-primary shadow-lg")}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{plan.name}</span>
                  {plan.isPopular && (
                    <span className="rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
                      Popular
                    </span>
                  )}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-3xl font-bold">
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground">
                    /{isYearly ? "year" : "month"}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {features.map((feature, featureIndex) => {
                    const value =
                      planIndex === 0
                        ? feature.free
                        : planIndex === 1
                          ? feature.pro
                          : feature.enterprise;
                    return (
                      <li key={featureIndex} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {feature.name}
                        </span>
                        {renderFeatureValue(value)}
                      </li>
                    );
                  })}
                </ul>
                <Pressable
                  href={plan.buttonHref}
                  variant={plan.isPopular ? "default" : "outline"}
                  size="default"
                  asButton
                  className="mt-6 w-full justify-center"
                >
                  {plan.buttonText}
                </Pressable>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Desktop View - Table */}
        <div className="hidden md:block">
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full">
              <thead>
                <tr className={cn("border-b", getNestedCardBg(background), getNestedCardTextColor(background))}>
                  <th className="p-4 text-left font-medium">Features</th>
                  {plans.map((plan, index) => (
                    <th key={index} className="p-4 text-center">
                      <div className="flex flex-col items-center">
                        <span className="font-semibold">{plan.name}</span>
                        {plan.isPopular && (
                          <span className="mt-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                            Popular
                          </span>
                        )}
                        <div className="mt-2">
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
                          className="mt-3"
                        >
                          {plan.buttonText}
                        </Pressable>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <TooltipProvider>
                  {features.map((feature, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="p-4">
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
                      </td>
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
                </TooltipProvider>
              </tbody>
            </table>
          </div>
        </div>
    </Section>
  );
}
