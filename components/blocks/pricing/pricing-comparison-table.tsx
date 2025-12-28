"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { Separator } from "../../ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

interface ComparisonFeature {
  name: string;
  pro: boolean | string;
  enterprise: boolean | string;
}

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonHref?: string;
  isHighlighted?: boolean;
}

export interface PricingComparisonTableProps {
  className?: string;
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
  comparisonFeatures?: ComparisonFeature[];
}

const defaultPlans: PricingPlan[] = [
  {
    name: "Pro",
    price: "$49",
    description: "For growing teams",
    features: [
      "Up to 10 team members",
      "Advanced analytics",
      "Priority support",
      "API access",
    ],
    buttonText: "Start Free Trial",
    buttonHref: "#",
    isHighlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Unlimited team members",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantee",
    ],
    buttonText: "Contact Sales",
    buttonHref: "#",
  },
];

const defaultComparisonFeatures: ComparisonFeature[] = [
  { name: "Team members", pro: "Up to 10", enterprise: "Unlimited" },
  { name: "Storage", pro: "50GB", enterprise: "Unlimited" },
  { name: "API access", pro: true, enterprise: true },
  { name: "Custom integrations", pro: false, enterprise: true },
  { name: "SSO", pro: false, enterprise: true },
  { name: "Dedicated support", pro: false, enterprise: true },
  { name: "SLA guarantee", pro: false, enterprise: true },
  { name: "Custom contracts", pro: false, enterprise: true },
];

/**
 * PricingComparisonTable displays two pricing plans side-by-side with a detailed feature comparison table.
 * Each plan card includes features, pricing, and CTA button, followed by a comprehensive comparison matrix.
 * Uses check/minus icons to indicate feature availability across plans.
 *
 * Ideal for businesses with two main tiers (Pro/Enterprise) that want to highlight feature differences.
 *
 * @example
 * ```tsx
 * <PricingComparisonTable
 *   title="Compare Plans"
 *   plans={[
 *     { name: "Pro", price: "$49", features: ["Feature 1"], buttonText: "Get Started" },
 *     { name: "Enterprise", price: "Custom", features: ["Feature 1", "Feature 2"], buttonText: "Contact Sales" }
 *   ]}
 *   comparisonFeatures={[
 *     { name: "API access", pro: true, enterprise: true },
 *     { name: "SSO", pro: false, enterprise: true }
 *   ]}
 * />
 * ```
 */
export function PricingComparisonTable({
  className,
  title = "Choose Your Plan",
  subtitle = "Compare features and find the right plan for your team",
  plans = defaultPlans,
  comparisonFeatures = defaultComparisonFeatures,
}: PricingComparisonTableProps) {
  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 md:grid-cols-2">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={cn(
                  "flex flex-col",
                  plan.isHighlighted && "border-primary shadow-lg"
                )}
              >
                <CardHeader>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && (
                      <span className="text-muted-foreground">/month</span>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  <ul className="space-y-3">
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
                </CardContent>

                <CardFooter>
                  <Pressable
                    href={plan.buttonHref}
                    variant={plan.isHighlighted ? "default" : "outline"}
                    size="lg"
                    asButton
                    className="w-full justify-center"
                  >
                    {plan.buttonText}
                  </Pressable>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Separator className="my-12" />

          <div>
            <h3 className="mb-6 text-xl font-semibold">Feature Comparison</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/2">Feature</TableHead>
                  <TableHead className="text-center">Pro</TableHead>
                  <TableHead className="text-center">Enterprise</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonFeatures.map((feature, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{feature.name}</TableCell>
                    <TableCell className="text-center">
                      {typeof feature.pro === "boolean" ? (
                        feature.pro ? (
                          <DynamicIcon
                            name="lucide/check"
                            size={18}
                            className="mx-auto text-primary"
                          />
                        ) : (
                          <DynamicIcon
                            name="lucide/minus"
                            size={18}
                            className="mx-auto text-muted-foreground"
                          />
                        )
                      ) : (
                        <span className="text-sm">{feature.pro}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {typeof feature.enterprise === "boolean" ? (
                        feature.enterprise ? (
                          <DynamicIcon
                            name="lucide/check"
                            size={18}
                            className="mx-auto text-primary"
                          />
                        ) : (
                          <DynamicIcon
                            name="lucide/minus"
                            size={18}
                            className="mx-auto text-muted-foreground"
                          />
                        )
                      ) : (
                        <span className="text-sm">{feature.enterprise}</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
}
