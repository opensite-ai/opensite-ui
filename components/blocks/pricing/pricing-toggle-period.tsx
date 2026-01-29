"use client";

import * as React from "react";
import { useMemo, useState } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

export interface PricingTogglePeriodOption {
  /**
   * Unique period identifier
   */
  id: string;
  /**
   * Display label for the period
   */
  label?: React.ReactNode;
  /**
   * Optional badge (e.g., Save 35%)
   */
  badge?: React.ReactNode;
  /**
   * Price suffix (e.g., /month)
   */
  priceSuffix?: React.ReactNode;
  /**
   * Additional CSS classes for the toggle button
   */
  className?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
}

export interface PricingTogglePeriodFeature {
  /**
   * Feature text
   */
  text?: React.ReactNode;
  /**
   * Optional icon element
   */
  icon?: React.ReactNode;
  /**
   * Optional icon name for DynamicIcon
   */
  iconName?: string;
  /**
   * Additional CSS classes for feature item
   */
  className?: string;
  /**
   * Additional CSS classes for feature icon
   */
  iconClassName?: string;
  /**
   * Additional CSS classes for feature text
   */
  textClassName?: string;
}

export interface PricingTogglePeriodPlan {
  /**
   * Plan name
   */
  name?: React.ReactNode;
  /**
   * Plan description
   */
  description?: React.ReactNode;
  /**
   * Map of period id to price
   */
  prices?: Record<string, React.ReactNode>;
  /**
   * Plan features
   */
  features?: PricingTogglePeriodFeature[];
  /**
   * Custom slot for rendering features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
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
   * Optional badge content
   */
  badge?: React.ReactNode;
  /**
   * Additional CSS classes for the plan card
   */
  className?: string;
}

export interface PricingTogglePeriodProps {
  /**
   * Section title
   */
  title?: React.ReactNode;
  /**
   * Section subtitle
   */
  subtitle?: React.ReactNode;
  /**
   * Billing period toggle options
   */
  periods?: PricingTogglePeriodOption[];
  /**
   * Default period id
   */
  defaultPeriodId?: string;
  /**
   * Pricing plans
   */
  plans?: PricingTogglePeriodPlan[];
  /**
   * Custom slot for rendering plans (overrides plans array)
   */
  plansSlot?: React.ReactNode;
  /**
   * Default icon used for features
   */
  featureIcon?: React.ReactNode;
  /**
   * Default icon name for features
   */
  featureIconName?: string;
  /**
   * Badge content for popular plans
   */
  popularBadge?: React.ReactNode;
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
   * Additional CSS classes for the toggle wrapper
   */
  toggleClassName?: string;
  /**
   * Additional CSS classes for toggle buttons
   */
  toggleButtonClassName?: string;
  /**
   * Additional CSS classes for active toggle buttons
   */
  toggleButtonActiveClassName?: string;
  /**
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for plan cards
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for popular cards
   */
  popularCardClassName?: string;
  /**
   * Additional CSS classes for plan badges
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for plan titles
   */
  planTitleClassName?: string;
  /**
   * Additional CSS classes for plan descriptions
   */
  planDescriptionClassName?: string;
  /**
   * Additional CSS classes for the price
   */
  priceClassName?: string;
  /**
   * Additional CSS classes for price interval
   */
  priceIntervalClassName?: string;
  /**
   * Additional CSS classes for the features list
   */
  featuresClassName?: string;
  /**
   * Additional CSS classes for feature items
   */
  featureItemClassName?: string;
  /**
   * Additional CSS classes for feature icons
   */
  featureIconClassName?: string;
  /**
   * Additional CSS classes for feature text
   */
  featureTextClassName?: string;
  /**
   * Additional CSS classes for the action
   */
  actionClassName?: string;
}

/**
 * PricingTogglePeriod displays pricing plans with a toggle group for multiple billing periods.
 * Supports monthly, quarterly, and yearly billing options with visual toggle buttons.
 * Features clean two-column layout with popular plan highlighting.
 *
 * Ideal for products offering flexible billing period options beyond just monthly/yearly.
 *
 * @example
 * ```tsx
 * <PricingTogglePeriod
 *   title="Flexible Pricing"
 *   periods={[{ id: "monthly", label: "Monthly", priceSuffix: "/month" }]}
 *   plans={[
 *     { name: "Starter", prices: { monthly: "$19" }, features: [{ text: "Feature 1" }] }
 *   ]}
 * />
 * ```
 */
export function PricingTogglePeriod({
  title,
  subtitle,
  periods,
  defaultPeriodId,
  plans,
  plansSlot,
  featureIcon,
  featureIconName,
  popularBadge,
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
  toggleButtonClassName,
  toggleButtonActiveClassName,
  gridClassName,
  cardClassName,
  popularCardClassName,
  badgeClassName,
  planTitleClassName,
  planDescriptionClassName,
  priceClassName,
  priceIntervalClassName,
  featuresClassName,
  featureItemClassName,
  featureIconClassName,
  featureTextClassName,
  actionClassName,
}: PricingTogglePeriodProps): React.JSX.Element {
  const fallbackPeriodId = useMemo(() => {
    if (defaultPeriodId) return defaultPeriodId;
    return periods[0]?.id;
  }, [defaultPeriodId, periods]);

  const [billingPeriod, setBillingPeriod] = useState<string | undefined>(
    fallbackPeriodId,
  );

  const activePeriod =
    periods.find((period) => period.id === billingPeriod) ?? periods[0];

  const renderFeatures = (plan: PricingTogglePeriodPlan) => {
    if (plan.featuresSlot) return plan.featuresSlot;
    if (!plan.features || plan.features.length === 0) return null;

    return (
      <ul className={cn("mb-8 flex-1 space-y-3", featuresClassName)}>
        {plan.features.map((feature, featureIndex) => {
          const resolvedIcon =
            feature.icon ??
            featureIcon ??
            (feature.iconName || featureIconName ? (
              <DynamicIcon
                name={feature.iconName || featureIconName}
                size={18}
                className={cn(
                  "mt-0.5 shrink-0 text-primary",
                  featureIconClassName,
                  feature.iconClassName,
                )}
              />
            ) : null);

          return (
            <li
              key={featureIndex}
              className={cn(
                "flex items-start gap-3",
                featureItemClassName,
                feature.className,
              )}
            >
              {resolvedIcon}
              {feature.text &&
                (typeof feature.text === "string" ? (
                  <span
                    className={cn(
                      "text-sm text-muted-foreground",
                      featureTextClassName,
                      feature.textClassName,
                    )}
                  >
                    {feature.text}
                  </span>
                ) : (
                  <div
                    className={cn(
                      "text-sm text-muted-foreground",
                      featureTextClassName,
                      feature.textClassName,
                    )}
                  >
                    {feature.text}
                  </div>
                ))}
            </li>
          );
        })}
      </ul>
    );
  };

  const renderAction = (plan: PricingTogglePeriodPlan) => {
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
          "w-full justify-center",
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

  const renderPlans = () => {
    if (plansSlot) return plansSlot;
    if (!plans || plans.length === 0) return null;

    return (
      <div
        className={cn(
          "mx-auto grid max-w-4xl gap-8 md:grid-cols-2",
          gridClassName,
        )}
      >
        {plans.map((plan, index) => {
          const badgeContent =
            plan.badge ?? (plan.isPopular ? popularBadge : null);
          const resolvedPrice = billingPeriod
            ? plan.prices?.[billingPeriod]
            : undefined;
          const fallbackPrice = plan.prices?.[periods[0]?.id ?? ""];

          return (
            <div
              key={index}
              className={cn(
                "relative flex flex-col rounded-2xl border p-8",
                plan.isPopular ? "border-primary shadow-lg" : "border-border",
                cardClassName,
                plan.isPopular ? popularCardClassName : null,
                plan.className,
              )}
            >
              {badgeContent && (
                <span
                  className={cn(
                    "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground",
                    badgeClassName,
                  )}
                >
                  {badgeContent}
                </span>
              )}

              <div className="mb-4">
                {plan.name &&
                  (typeof plan.name === "string" ? (
                    <h3
                      className={cn(
                        "text-xl font-semibold",
                        planTitleClassName,
                      )}
                    >
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
              </div>

              <div className="mb-6">
                <span className={cn("text-4xl font-bold", priceClassName)}>
                  {resolvedPrice ?? fallbackPrice}
                </span>
                {activePeriod?.priceSuffix && (
                  <span
                    className={cn(
                      "text-muted-foreground",
                      priceIntervalClassName,
                    )}
                  >
                    {activePeriod.priceSuffix}
                  </span>
                )}
              </div>

              {renderFeatures(plan)}
              {renderAction(plan)}
            </div>
          );
        })}
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

          {periods.length > 0 && (
            <div
              className={cn(
                "mt-8 flex items-center justify-center",
                toggleClassName,
              )}
            >
              <div className="inline-flex rounded-lg border p-1">
                {periods.map((period) => {
                  const isActive = period.id === billingPeriod;
                  return (
                    <button
                      key={period.id}
                      onClick={() => setBillingPeriod(period.id)}
                      className={cn(
                        "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:",
                        toggleButtonClassName,
                        isActive ? toggleButtonActiveClassName : null,
                        period.className,
                      )}
                    >
                      {period.label}
                      {period.badge && (
                        <span
                          className={cn(
                            "ml-1.5 rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground",
                            period.badgeClassName,
                          )}
                        >
                          {period.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {renderPlans()}
      </div>
    </Section>
  );
}
