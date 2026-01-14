"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface ListFeatureComparisonFeature {
  /**
   * Feature name
   */
  name: React.ReactNode;
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
  title?: React.ReactNode;
  /**
   * Description text
   */
  description?: React.ReactNode;
}

export interface ListFeatureComparisonProps {
  /**
   * Badge content displayed above the heading
   */
  badge?: React.ReactNode;
  /**
   * Custom slot for rendering badge (overrides badge)
   */
  badgeSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Description content below the heading
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Array of features to compare
   */
  features?: ListFeatureComparisonFeature[];
  /**
   * Custom slot for rendering features table (overrides features array)
   */
  featuresSlot?: React.ReactNode;
  /**
   * Plan column headers
   */
  planHeaders?: {
    feature?: React.ReactNode;
    basic?: React.ReactNode;
    pro?: React.ReactNode;
    enterprise?: React.ReactNode;
  };
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Trust indicators displayed below the table
   */
  trustIndicators?: ListFeatureComparisonTrustIndicator[];
  /**
   * Custom slot for rendering trust indicators (overrides trustIndicators array)
   */
  trustIndicatorsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the trust indicators container
   */
  trustIndicatorsClassName?: string;
  /**
   * Additional CSS classes for individual trust indicator items
   */
  trustIndicatorClassName?: string;
  /**
   * Additional CSS classes for the table wrapper
   */
  tableWrapperClassName?: string;
  /**
   * Additional CSS classes for the table
   */
  tableClassName?: string;
  /**
   * Additional CSS classes for the table header
   */
  tableHeaderClassName?: string;
  /**
   * Additional CSS classes for the table body
   */
  tableBodyClassName?: string;
  /**
   * Additional CSS classes for table rows
   */
  tableRowClassName?: string;
  /**
   * Additional CSS classes for the header section
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | string;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
}

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
 *   badge="New Enterprise Plan Available"
 *   heading="Choose the perfect plan for your needs"
 *   description="From startups to enterprises, we have a plan that scales with your business."
 *   features={[
 *     { name: "Unlimited Projects", basic: false, pro: true, enterprise: true },
 *     { name: "API Access", basic: true, pro: true, enterprise: true }
 *   ]}
 *   actions={[
 *     { label: "Get Started", href: "/signup", variant: "default" }
 *   ]}
 *   trustIndicators={[
 *     { icon: "lucide/users", title: "50,000+ Users", description: "Join our community" }
 *   ]}
 * />
 * ```
 */
export function ListFeatureComparison({
  badge,
  badgeSlot,
  badgeClassName,
  heading,
  headingClassName,
  description,
  descriptionClassName,
  features,
  featuresSlot,
  planHeaders = {
    feature: "Feature",
    basic: "Basic",
    pro: "Pro",
    enterprise: "Enterprise",
  },
  actions,
  actionsSlot,
  actionsClassName,
  trustIndicators,
  trustIndicatorsSlot,
  trustIndicatorsClassName,
  trustIndicatorClassName,
  tableWrapperClassName,
  tableClassName,
  tableHeaderClassName,
  tableBodyClassName,
  tableRowClassName,
  headerClassName,
  className,
  background = "white",
  spacing = "md",
  pattern,
  patternOpacity,
}: ListFeatureComparisonProps): React.JSX.Element {
  const renderBadge = () => {
    if (badgeSlot) return badgeSlot;
    if (!badge) return null;

    return typeof badge === "string" ? (
      <Badge variant="outline" className={cn("text-sm", badgeClassName)}>
        {badge}
      </Badge>
    ) : (
      <div className={badgeClassName}>{badge}</div>
    );
  };

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className={cn("mt-12 flex flex-col justify-center gap-4 sm:flex-row", actionsClassName)}>
        {actions.map((action, idx) => {
          const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;

          return (
            <Pressable
              key={idx}
              asButton
              className={actionClassName}
              {...pressableProps}
            >
              {children ?? (
                <>
                  {icon}
                  {label}
                  {iconAfter}
                </>
              )}
            </Pressable>
          );
        })}
      </div>
    );
  };

  const renderFeatures = () => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return (
      <div className={cn("overflow-x-auto", tableWrapperClassName)}>
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-lg border">
            <table className={cn("divide-border min-w-full divide-y", tableClassName)}>
              <thead className={cn("bg-muted/50", tableHeaderClassName)}>
                <tr>
                  <th className="text-foreground px-6 py-3 text-left text-sm font-semibold">
                    {planHeaders?.feature}
                  </th>
                  <th className="text-foreground px-6 py-3 text-center text-sm font-semibold">
                    {planHeaders?.basic}
                  </th>
                  <th className="text-foreground px-6 py-3 text-center text-sm font-semibold">
                    {planHeaders?.pro}
                  </th>
                  <th className="text-foreground px-6 py-3 text-center text-sm font-semibold">
                    {planHeaders?.enterprise}
                  </th>
                </tr>
              </thead>
              <tbody className={cn("divide-border bg-background divide-y", tableBodyClassName)}>
                {features.map((feature, index) => (
                  <tr key={index} className={tableRowClassName}>
                    <td className="text-foreground px-6 py-4 text-sm whitespace-nowrap">
                      {feature.name}
                    </td>
                    <td className="px-6 py-4 text-center text-sm whitespace-nowrap">
                      {feature.basic ? (
                        <DynamicIcon
                          name="lucide/check"
                          size={20}
                          className="mx-auto text-success"
                        />
                      ) : (
                        <DynamicIcon
                          name="lucide/x"
                          size={20}
                          className="mx-auto text-destructive"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center text-sm whitespace-nowrap">
                      {feature.pro ? (
                        <DynamicIcon
                          name="lucide/check"
                          size={20}
                          className="mx-auto text-success"
                        />
                      ) : (
                        <DynamicIcon
                          name="lucide/x"
                          size={20}
                          className="mx-auto text-destructive"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center text-sm whitespace-nowrap">
                      <DynamicIcon
                        name="lucide/check"
                        size={20}
                        className="mx-auto text-success"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderTrustIndicators = () => {
    if (trustIndicatorsSlot) return trustIndicatorsSlot;
    if (!trustIndicators || trustIndicators.length === 0) return null;

    return (
      <div className={cn("mt-16 grid grid-cols-1 gap-8 md:grid-cols-3", trustIndicatorsClassName)}>
        {trustIndicators.map((indicator, index) => (
          <div key={index} className={cn("text-center", trustIndicatorClassName)}>
            {indicator.icon && (
              <DynamicIcon
                name={indicator.icon}
                size={32}
                className="text-primary mx-auto mb-4"
              />
            )}
            {indicator.title && (
              typeof indicator.title === "string" ? (
                <h3 className="mb-2 text-xl font-semibold">{indicator.title}</h3>
              ) : (
                <div className="mb-2">{indicator.title}</div>
              )
            )}
            {indicator.description && (
              typeof indicator.description === "string" ? (
                <p className="text-muted-foreground">{indicator.description}</p>
              ) : (
                <div className="text-muted-foreground">{indicator.description}</div>
              )
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("mb-8 flex justify-center", headerClassName)}>
        {renderBadge()}
      </div>

      <div className="mb-6 text-center">
        {heading && (
          typeof heading === "string" ? (
            <h1 className={cn("text-primary mx-auto mb-4 max-w-4xl text-4xl leading-tight font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter", headingClassName)}>
              {heading}
            </h1>
          ) : (
            <div className={cn("mx-auto mb-4 max-w-4xl", headingClassName)}>{heading}</div>
          )
        )}
        {description && (
          typeof description === "string" ? (
            <p className={cn("text-foreground mx-auto max-w-4xl text-base text-balance sm:text-lg", descriptionClassName)}>
              {description}
            </p>
          ) : (
            <div className={cn("mx-auto max-w-4xl", descriptionClassName)}>{description}</div>
          )
        )}
      </div>

      {renderFeatures()}
      {renderActions()}
      {renderTrustIndicators()}
    </Section>
  );
}
