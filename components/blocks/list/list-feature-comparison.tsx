"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";

export interface ListFeatureComparisonFeature {
  /**
   * Feature name
   */
  name: string;
  /**
   * Whether the feature is available in Basic plan
   */
  basic: boolean;
  /**
   * Whether the feature is available in Pro plan
   */
  pro: boolean;
  /**
   * Whether the feature is available in Enterprise plan (always true)
   */
  enterprise?: boolean;
}

export interface ListFeatureComparisonTrustIndicator {
  /**
   * Icon name for the indicator (e.g., "lucide/users")
   */
  icon?: string;
  /**
   * Title text
   */
  title?: string;
  /**
   * Description text
   */
  description?: string;
}

export interface ListFeatureComparisonProps {
  /**
   * Badge text displayed above the heading
   */
  badgeText?: string;
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Description text below the heading
   */
  description?: string;
  /**
   * Array of features to compare
   */
  features?: ListFeatureComparisonFeature[];
  /**
   * Plan column headers
   */
  planHeaders?: {
    feature?: string;
    basic?: string;
    pro?: string;
    enterprise?: string;
  };
  /**
   * Primary CTA button text
   */
  primaryButtonText?: string;
  /**
   * Primary CTA button URL
   */
  primaryButtonUrl?: string;
  /**
   * Secondary CTA button text
   */
  secondaryButtonText?: string;
  /**
   * Secondary CTA button URL
   */
  secondaryButtonUrl?: string;
  /**
   * Trust indicators displayed below the table
   */
  trustIndicators?: ListFeatureComparisonTrustIndicator[];
  /**
   * Additional CSS classes for the section
   */
  className?: string;
}

const defaultFeatures: ListFeatureComparisonFeature[] = [
  { name: "Unlimited Projects", basic: false, pro: true, enterprise: true },
  { name: "Team Collaboration", basic: false, pro: true, enterprise: true },
  { name: "Advanced Analytics", basic: false, pro: false, enterprise: true },
  { name: "Priority Support", basic: false, pro: true, enterprise: true },
  { name: "Custom Integrations", basic: false, pro: false, enterprise: true },
  { name: "API Access", basic: true, pro: true, enterprise: true },
  { name: "Data Export", basic: true, pro: true, enterprise: true },
  { name: "Mobile App", basic: false, pro: true, enterprise: true },
];

const defaultTrustIndicators: ListFeatureComparisonTrustIndicator[] = [
  {
    icon: "lucide/users",
    title: "50,000+ Users",
    description: "Join our growing community",
  },
  {
    icon: "lucide/check",
    title: "99.9% Uptime",
    description: "Reliable service guaranteed",
  },
  {
    icon: "lucide/shield-check",
    title: "Secure & Compliant",
    description: "GDPR and SOC 2 certified",
  },
];

/**
 * ListFeatureComparison - A hero-style feature comparison table with pricing tiers,
 * trust indicators, and call-to-action buttons. Displays features across Basic, Pro,
 * and Enterprise plans with check/X icons for availability.
 *
 * Perfect for pricing pages, plan comparison sections, or feature matrices
 * that help users choose the right tier for their needs.
 *
 * @example
 * ```tsx
 * <ListFeatureComparison
 *   badgeText="New Enterprise Plan Available"
 *   heading="Choose the perfect plan for your needs"
 *   description="From startups to enterprises, we have a plan that scales with your business."
 *   features={[
 *     { name: "Unlimited Projects", basic: false, pro: true, enterprise: true },
 *     { name: "API Access", basic: true, pro: true, enterprise: true }
 *   ]}
 *   primaryButtonText="Get Started"
 *   primaryButtonUrl="/signup"
 *   trustIndicators={[
 *     { icon: "lucide/users", title: "50,000+ Users", description: "Join our community" }
 *   ]}
 * />
 * ```
 */
export function ListFeatureComparison({
  badgeText = "New Enterprise Plan Available",
  heading = "Choose the perfect plan for your needs",
  description = "From startups to enterprises, we have a plan that scales with your business. Compare features and find your fit.",
  features = defaultFeatures,
  planHeaders = {
    feature: "Feature",
    basic: "Basic",
    pro: "Pro",
    enterprise: "Enterprise",
  },
  primaryButtonText = "Get Started",
  primaryButtonUrl = "#",
  secondaryButtonText = "Compare All Features",
  secondaryButtonUrl = "#",
  trustIndicators = defaultTrustIndicators,
  className,
}: ListFeatureComparisonProps): React.JSX.Element {
  return (
    <div className={cn("container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]", className)}>
      {/* Announcement */}
      <div className="mb-8 flex justify-center">
        <Badge variant="outline" className="text-sm">
          {badgeText}
        </Badge>
      </div>

      {/* Title */}
      <div className="mb-6 text-center">
        <h1 className="text-primary mx-auto mb-4 max-w-4xl text-4xl leading-tight font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter">
          {heading}
        </h1>
        <p className="text-foreground mx-auto max-w-4xl text-base text-balance sm:text-lg">
          {description}
        </p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-lg border">
            <table className="divide-border min-w-full divide-y">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-foreground px-6 py-3 text-left text-sm font-semibold">
                    {planHeaders.feature}
                  </th>
                  <th className="text-foreground px-6 py-3 text-center text-sm font-semibold">
                    {planHeaders.basic}
                  </th>
                  <th className="text-foreground px-6 py-3 text-center text-sm font-semibold">
                    {planHeaders.pro}
                  </th>
                  <th className="text-foreground px-6 py-3 text-center text-sm font-semibold">
                    {planHeaders.enterprise}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-border bg-background divide-y">
                {features.map((feature, index) => (
                  <tr key={index}>
                    <td className="text-foreground px-6 py-4 text-sm whitespace-nowrap">
                      {feature.name}
                    </td>
                    <td className="px-6 py-4 text-center text-sm whitespace-nowrap">
                      {feature.basic ? (
                        <DynamicIcon
                          name="lucide/check"
                          size={20}
                          className="mx-auto text-green-600"
                        />
                      ) : (
                        <DynamicIcon
                          name="lucide/x"
                          size={20}
                          className="mx-auto text-red-600"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center text-sm whitespace-nowrap">
                      {feature.pro ? (
                        <DynamicIcon
                          name="lucide/check"
                          size={20}
                          className="mx-auto text-green-600"
                        />
                      ) : (
                        <DynamicIcon
                          name="lucide/x"
                          size={20}
                          className="mx-auto text-red-600"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center text-sm whitespace-nowrap">
                      <DynamicIcon
                        name="lucide/check"
                        size={20}
                        className="mx-auto text-green-600"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
        <Pressable href={secondaryButtonUrl} size="lg" variant="outline" asButton>
          {secondaryButtonText}
        </Pressable>
        <Pressable href={primaryButtonUrl} size="lg" variant="default" asButton>
          {primaryButtonText}
          <DynamicIcon
            name="lucide/arrow-right"
            size={16}
            className="ml-2"
          />
        </Pressable>
      </div>

      {/* Trust Indicators */}
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {trustIndicators.map((indicator, index) => (
          <div key={index} className="text-center">
            {indicator.icon && (
              <DynamicIcon
                name={indicator.icon}
                size={32}
                className="text-primary mx-auto mb-4"
              />
            )}
            <h3 className="mb-2 text-xl font-semibold">{indicator.title}</h3>
            <p className="text-muted-foreground">{indicator.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
