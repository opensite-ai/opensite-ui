"use client";

import * as React from "react";
import { useMemo, useState } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Switch } from "../../ui/switch";
import { Section } from "../../ui/section";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

export interface PricingFullComparisonFeature {
  /**
   * Feature label
   */
  name?: React.ReactNode;
  /**
   * Feature category
   */
  category?: React.ReactNode;
  /**
   * Values per plan id
   */
  values?: Record<string, boolean | React.ReactNode>;
  /**
   * Additional CSS classes for the feature row
   */
  className?: string;
}

export interface PricingFullComparisonPlan {
  /**
   * Unique plan id
   */
  id?: string;
  /**
   * Plan name
   */
  name?: React.ReactNode;
  /**
   * Monthly price display
   */
  monthlyPrice?: React.ReactNode;
  /**
   * Yearly price display
   */
  yearlyPrice?: React.ReactNode;
  /**
   * Plan description
   */
  description?: React.ReactNode;
  /**
   * Action configuration
   */
  action?: ActionConfig;
  /**
   * Custom slot for rendering action (overrides action)
   */
  actionSlot?: React.ReactNode;
  /**
   * Highlight this plan
   */
  isPopular?: boolean;
  /**
   * Badge content
   */
  badge?: React.ReactNode;
  /**
   * Additional CSS classes for the plan card
   */
  className?: string;
}

export interface PricingFullComparisonProps {
  /**
   * Section title
   */
  title?: React.ReactNode;
  /**
   * Section subtitle
   */
  subtitle?: React.ReactNode;
  /**
   * Toggle label for monthly billing
   */
  monthlyLabel?: React.ReactNode;
  /**
   * Toggle label for yearly billing
   */
  yearlyLabel?: React.ReactNode;
  /**
   * Badge displayed on yearly toggle
   */
  yearlyBadge?: React.ReactNode;
  /**
   * Monthly price suffix
   */
  monthlyInterval?: React.ReactNode;
  /**
   * Yearly price suffix
   */
  yearlyInterval?: React.ReactNode;
  /**
   * Plans to compare
   */
  plans?: PricingFullComparisonPlan[];
  /**
   * Custom slot for rendering plan cards (overrides plans array)
   */
  plansSlot?: React.ReactNode;
  /**
   * Feature rows
   */
  features?: PricingFullComparisonFeature[];
  /**
   * Custom slot for rendering comparison table (overrides features array)
   */
  comparisonSlot?: React.ReactNode;
  /**
   * Optional category order
   */
  categoryOrder?: React.ReactNode[];
  /**
   * Feature column label
   */
  featureColumnLabel?: React.ReactNode;
  /**
   * Icon for available features
   */
  availableIcon?: React.ReactNode;
  /**
   * Icon for unavailable features
   */
  unavailableIcon?: React.ReactNode;
  /**
   * Icon name for available features
   */
  availableIconName?: string;
  /**
   * Icon name for unavailable features
   */
  unavailableIconName?: string;
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
  /**
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the subtitle
   */
  subtitleClassName?: string;
  /**
   * Additional CSS classes for toggle wrapper
   */
  toggleClassName?: string;
  /**
   * Additional CSS classes for toggle labels
   */
  toggleLabelClassName?: string;
  /**
   * Additional CSS classes for yearly badge
   */
  yearlyBadgeClassName?: string;
  /**
   * Additional CSS classes for plan grid
   */
  plansGridClassName?: string;
  /**
   * Additional CSS classes for plan cards
   */
  planCardClassName?: string;
  /**
   * Additional CSS classes for popular cards
   */
  popularCardClassName?: string;
  /**
   * Additional CSS classes for plan badge
   */
  planBadgeClassName?: string;
  /**
   * Additional CSS classes for plan title
   */
  planTitleClassName?: string;
  /**
   * Additional CSS classes for plan description
   */
  planDescriptionClassName?: string;
  /**
   * Additional CSS classes for plan price
   */
  planPriceClassName?: string;
  /**
   * Additional CSS classes for plan price interval
   */
  planPriceIntervalClassName?: string;
  /**
   * Additional CSS classes for action
   */
  actionClassName?: string;
  /**
   * Additional CSS classes for table wrapper
   */
  tableWrapperClassName?: string;
  /**
   * Additional CSS classes for category row
   */
  categoryRowClassName?: string;
  /**
   * Additional CSS classes for feature row
   */
  featureRowClassName?: string;
  /**
   * Additional CSS classes for feature name cell
   */
  featureNameClassName?: string;
  /**
   * Additional CSS classes for feature value cell
   */
  featureValueClassName?: string;
}

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
 *   plans={[{ id: "free", name: "Free", monthlyPrice: "$0", yearlyPrice: "$0", action: { label: "Get Started" } }]}
 *   features={[{ name: "Projects", category: "Usage", values: { free: "3", startup: "10", team: "Unlimited", enterprise: "Unlimited" } }]}
 * />
 * ```
 */
export function PricingFullComparison({
  title = "Compare All Plans",
  subtitle = "Find the perfect plan for your needs",
  monthlyLabel = "Monthly",
  yearlyLabel = "Yearly",
  yearlyBadge = "Save 17%",
  monthlyInterval = "/mo",
  yearlyInterval = "/yr",
  plans,
  plansSlot,
  features,
  comparisonSlot,
  categoryOrder,
  featureColumnLabel = "Features",
  availableIcon,
  unavailableIcon,
  availableIconName = "lucide/check",
  unavailableIconName = "lucide/x",
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName,
  headerClassName,
  titleClassName,
  subtitleClassName,
  toggleClassName,
  toggleLabelClassName,
  yearlyBadgeClassName,
  plansGridClassName,
  planCardClassName,
  popularCardClassName,
  planBadgeClassName,
  planTitleClassName,
  planDescriptionClassName,
  planPriceClassName,
  planPriceIntervalClassName,
  actionClassName,
  tableWrapperClassName,
  categoryRowClassName,
  featureRowClassName,
  featureNameClassName,
  featureValueClassName,
}: PricingFullComparisonProps): React.JSX.Element {
  const [isYearly, setIsYearly] = useState(false);
  const resolvedPlanIds = plans.map((plan, index) => plan.id ?? `plan-${index}`);

  const categories = useMemo(() => {
    if (categoryOrder && categoryOrder.length > 0) return categoryOrder;
    const unique = Array.from(new Set(features.map((feature) => feature.category).filter(Boolean)));
    return unique as React.ReactNode[];
  }, [categoryOrder, features]);

  const renderFeatureValue = (value: boolean | React.ReactNode | undefined) => {
    if (typeof value === "boolean") {
      return value
        ? availableIcon ?? (
          <DynamicIcon name={availableIconName} size={18} className="text-primary" />
        )
        : unavailableIcon ?? (
          <DynamicIcon name={unavailableIconName} size={18} className="text-muted-foreground" />
        );
    }
    return value ? <span className="text-sm font-medium">{value}</span> : null;
  };

  const renderPlanAction = (plan: PricingFullComparisonPlan) => {
    if (plan.actionSlot) return plan.actionSlot;
    if (!plan.action) return null;

    const { label, icon, iconAfter, children, className: actionItemClassName, ...pressableProps } = plan.action;

    return (
      <Pressable
        asButton
        className={cn("mt-4 w-full justify-center", actionClassName, actionItemClassName)}
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
  };

  const renderPlans = () => {
    if (plansSlot) return plansSlot;
    if (!plans || plans.length === 0) return null;

    return (
      <div className={cn("mb-12 grid gap-4 md:grid-cols-4", plansGridClassName)}>
        {plans.map((plan, index) => {
          const badgeContent = plan.badge ?? (plan.isPopular ? "Popular" : null);

          return (
            <div
              key={resolvedPlanIds[index]}
              className={cn(
                "rounded-lg border p-4 text-center",
                plan.isPopular ? "border-primary bg-primary/5" : "border-border",
                planCardClassName,
                plan.isPopular ? popularCardClassName : null,
                plan.className
              )}
            >
              {badgeContent && (
                <span className={cn("mb-2 inline-block rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground", planBadgeClassName)}>
                  {badgeContent}
                </span>
              )}
              {plan.name && (
                typeof plan.name === "string" ? (
                  <h3 className={cn("font-semibold", planTitleClassName)}>{plan.name}</h3>
                ) : (
                  <div className={planTitleClassName}>{plan.name}</div>
                )
              )}
              {plan.description && (
                typeof plan.description === "string" ? (
                  <p className={cn("mt-1 text-sm text-muted-foreground", planDescriptionClassName)}>
                    {plan.description}
                  </p>
                ) : (
                  <div className={planDescriptionClassName}>{plan.description}</div>
                )
              )}
              <div className="mt-3">
                <span className={cn("text-2xl font-bold", planPriceClassName)}>
                  {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className={cn("text-sm text-muted-foreground", planPriceIntervalClassName)}>
                  {isYearly ? yearlyInterval : monthlyInterval}
                </span>
              </div>
              {renderPlanAction(plan)}
            </div>
          );
        })}
      </div>
    );
  };

  const renderComparisonTable = () => {
    if (comparisonSlot) return comparisonSlot;
    if (!features || features.length === 0) return null;

    return (
      <div className={cn("overflow-x-auto", tableWrapperClassName)}>
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left font-medium">{featureColumnLabel}</th>
              {plans.map((plan, index) => (
                <th key={resolvedPlanIds[index]} className="p-4 text-center font-medium">
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <React.Fragment key={String(category)}>
                <tr className={cn("bg-muted/50", categoryRowClassName)}>
                  <td
                    colSpan={plans.length + 1}
                    className="p-3 text-sm font-semibold"
                  >
                    {category}
                  </td>
                </tr>
                {features
                  .filter((feature) => feature.category === category)
                  .map((feature, index) => (
                    <tr key={index} className={cn("border-b", featureRowClassName, feature.className)}>
                      <td className={cn("p-4 text-sm", featureNameClassName)}>{feature.name}</td>
                      {resolvedPlanIds.map((planId) => (
                        <td key={planId} className={cn("p-4 text-center", featureValueClassName)}>
                          {renderFeatureValue(feature.values?.[planId])}
                        </td>
                      ))}
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
    >
      <div className={cn("mx-auto", containerClassName)}>
        <div className={cn("mx-auto mb-12 max-w-2xl text-center", headerClassName)}>
          {title && (
            typeof title === "string" ? (
              <h2 className={cn("text-3xl font-bold tracking-tight sm:text-4xl", titleClassName)}>
                {title}
              </h2>
            ) : (
              <div className={titleClassName}>{title}</div>
            )
          )}
          {subtitle && (
            typeof subtitle === "string" ? (
              <p className={cn("mt-4 text-lg text-muted-foreground", subtitleClassName)}>{subtitle}</p>
            ) : (
              <div className={subtitleClassName}>{subtitle}</div>
            )
          )}

          <div className={cn("mt-8 flex items-center justify-center gap-3", toggleClassName)}>
            <span
              className={cn(
                "text-sm font-medium",
                !isYearly ? "text-foreground" : "text-muted-foreground",
                toggleLabelClassName
              )}
            >
              {monthlyLabel}
            </span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span
              className={cn(
                "text-sm font-medium",
                isYearly ? "text-foreground" : "text-muted-foreground",
                toggleLabelClassName
              )}
            >
              {yearlyLabel}
              {yearlyBadge && (
                <span className={cn("ml-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary", yearlyBadgeClassName)}>
                  {yearlyBadge}
                </span>
              )}
            </span>
          </div>
        </div>

        {renderPlans()}
        {renderComparisonTable()}
      </div>
    </Section>
  );
}
