"use client";

import * as React from "react";
import { useState, useMemo } from "react";
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

export interface PricingComparisonHeadersFeature {
  /**
   * Feature label
   */
  name?: React.ReactNode;
  /**
   * Values per plan id
   */
  values?: Record<string, boolean | React.ReactNode>;
  /**
   * Additional CSS classes for row
   */
  className?: string;
}

export interface PricingComparisonHeadersPlan {
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
   * Badge content for popular plan
   */
  badge?: React.ReactNode;
  /**
   * Additional CSS classes for plan header
   */
  className?: string;
}

export interface PricingComparisonHeadersProps {
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
   * Plan definitions
   */
  plans?: PricingComparisonHeadersPlan[];
  /**
   * Custom slot for rendering plans (overrides plans array)
   */
  plansSlot?: React.ReactNode;
  /**
   * Feature rows
   */
  features?: PricingComparisonHeadersFeature[];
  /**
   * Custom slot for rendering features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
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
  pattern?: PatternName | undefined;
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
   * Additional CSS classes for the table wrapper
   */
  tableWrapperClassName?: string;
  /**
   * Additional CSS classes for plan header cells
   */
  planHeaderClassName?: string;
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
   * Additional CSS classes for feature rows
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
 *   plans={[{ id: "free", name: "Free", monthlyPrice: "$0", yearlyPrice: "$0" }]}
 *   features={[{ name: "Projects", values: { free: "3", pro: "Unlimited", enterprise: "Unlimited" } }]}
 * />
 * ```
 */
export function PricingComparisonHeaders({
  title,
  subtitle,
  monthlyLabel,
  yearlyLabel,
  yearlyBadge,
  monthlyInterval,
  yearlyInterval,
  plans = [],
  plansSlot,
  features,
  featuresSlot,
  featureColumnLabel,
  availableIcon,
  unavailableIcon,
  availableIconName = "Check",
  unavailableIconName = "X",
  background,
  spacing,
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
  tableWrapperClassName,
  planHeaderClassName,
  planBadgeClassName,
  planTitleClassName,
  planDescriptionClassName,
  planPriceClassName,
  planPriceIntervalClassName,
  actionClassName,
  featureRowClassName,
  featureNameClassName,
  featureValueClassName,
}: PricingComparisonHeadersProps): React.JSX.Element {
  const [isYearly, setIsYearly] = useState(false);
  const resolvedPlanIds = plans?.map(
    (plan, index) => plan.id ?? `plan-${index}`,
  ) ?? [];

  const renderFeatureValue = useMemo(() => {
    return (value: boolean | React.ReactNode | undefined) => {
    if (typeof value === "boolean") {
      return value
        ? (availableIcon ?? (
            <DynamicIcon
              name={availableIconName}
              size={18}
              className="text-primary"
            />
          ))
        : (unavailableIcon ?? (
            <DynamicIcon
              name={unavailableIconName}
              size={18}
              className="text-muted-foreground"
            />
          ));
    }
    return value ? <span className="text-sm font-medium">{value}</span> : null;
    };
  }, [availableIcon, availableIconName, unavailableIcon, unavailableIconName]);

  const renderAction = useMemo(() => {
    return (plan: PricingComparisonHeadersPlan) => {
    if (plan.actionSlot) return plan.actionSlot;
    if (!plan.action) return null;

    const {
      label,
      icon,
      iconAfter,
      children,
      className: actionItemClassName,
      ...pressableProps
    } = plan.action;

    return (
      <Pressable
        asButton
        className={cn(
          "mt-4 w-full justify-center",
          actionClassName,
          actionItemClassName,
        )}
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
  }, [actionClassName]);

  const renderPlans = useMemo(() => {
    if (plansSlot) return plansSlot;

    return plans.map((plan, index) => {
      const badgeContent = plan.badge ?? (plan.isPopular ? "Popular" : null);
      return (
        <th
          key={resolvedPlanIds[index]}
          className={cn("p-4 text-center", planHeaderClassName, plan.className)}
        >
          <div
            className={cn(
              "rounded-lg border p-4",
              plan.isPopular ? "border-primary bg-primary/5" : "border-border",
            )}
          >
            {badgeContent && (
              <span
                className={cn(
                  "mb-2 inline-block rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground",
                  planBadgeClassName,
                )}
              >
                {badgeContent}
              </span>
            )}
            {plan.name &&
              (typeof plan.name === "string" ? (
                <h3 className={cn("font-semibold", planTitleClassName)}>
                  {plan.name}
                </h3>
              ) : (
                <div className={planTitleClassName}>{plan.name}</div>
              ))}
            {plan.description &&
              (typeof plan.description === "string" ? (
                <p
                  className={cn(
                    "mt-1 text-sm text-muted-foreground",
                    planDescriptionClassName,
                  )}
                >
                  {plan.description}
                </p>
              ) : (
                <div className={planDescriptionClassName}>
                  {plan.description}
                </div>
              ))}
            <div className="mt-3">
              <span className={cn("text-2xl font-bold", planPriceClassName)}>
                {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
              </span>
              <span
                className={cn(
                  "text-sm text-muted-foreground",
                  planPriceIntervalClassName,
                )}
              >
                {isYearly ? yearlyInterval : monthlyInterval}
              </span>
            </div>
            {renderAction(plan)}
          </div>
        </th>
      );
    });
  }, [plansSlot, plans, resolvedPlanIds, planHeaderClassName, planBadgeClassName, planTitleClassName, planDescriptionClassName, planPriceClassName, planPriceIntervalClassName, isYearly, yearlyInterval, monthlyInterval, renderAction]);

  const renderFeatureRows = useMemo(() => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return features.map((feature, index) => (
      <tr
        key={index}
        className={cn("border-b", featureRowClassName, feature.className)}
      >
        <td className={cn("p-4 text-sm font-medium", featureNameClassName)}>
          {feature.name}
        </td>
        {resolvedPlanIds.map((planId) => (
          <td
            key={planId}
            className={cn("p-4 text-center", featureValueClassName)}
          >
            {renderFeatureValue(feature.values?.[planId])}
          </td>
        ))}
      </tr>
    ));
  }, [featuresSlot, features, featureRowClassName, featureNameClassName, resolvedPlanIds, featureValueClassName, renderFeatureValue]);

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
        <div
          className={cn("mx-auto mb-12 max-w-2xl text-center", headerClassName)}
        >
          {title &&
            (typeof title === "string" ? (
              <h2
                className={cn(
                  "text-3xl font-bold tracking-tight sm:text-4xl",
                  titleClassName,
                )}
              >
                {title}
              </h2>
            ) : (
              <div className={titleClassName}>{title}</div>
            ))}
          {subtitle &&
            (typeof subtitle === "string" ? (
              <p
                className={cn(
                  "mt-4 text-lg text-muted-foreground",
                  subtitleClassName,
                )}
              >
                {subtitle}
              </p>
            ) : (
              <div className={subtitleClassName}>{subtitle}</div>
            ))}

          <div
            className={cn(
              "mt-8 flex items-center justify-center gap-3",
              toggleClassName,
            )}
          >
            <span
              className={cn(
                "text-sm font-medium",
                isYearly ? "text-muted-foreground" : "",
                toggleLabelClassName,
              )}
            >
              {monthlyLabel}
            </span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span
              className={cn(
                "text-sm font-medium",
                !isYearly ? "text-muted-foreground" : "",
                toggleLabelClassName,
              )}
            >
              {yearlyLabel}
              {yearlyBadge && (
                <span
                  className={cn(
                    "ml-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary",
                    yearlyBadgeClassName,
                  )}
                >
                  {yearlyBadge}
                </span>
              )}
            </span>
          </div>
        </div>

        <div className={cn("overflow-x-auto", tableWrapperClassName)}>
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th className="p-4 text-left">{featureColumnLabel}</th>
                {renderPlans}
              </tr>
            </thead>
            <tbody>{renderFeatureRows}</tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}
