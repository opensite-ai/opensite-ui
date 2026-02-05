"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";
import { Section } from "../../ui/section";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

export interface PricingRadioToggleFeature {
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

export interface PricingRadioTogglePlan {
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
   * Plan features
   */
  features?: PricingRadioToggleFeature[];
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
   * Badge label
   */
  badge?: React.ReactNode;
  /**
   * Additional CSS classes for the plan card
   */
  className?: string;
}

export interface PricingRadioToggleProps {
  /**
   * Section title
   */
  title?: React.ReactNode;
  /**
   * Section description
   */
  description?: React.ReactNode;
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
   * Pricing plans
   */
  plans?: PricingRadioTogglePlan[];
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
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
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
   * Additional CSS classes for the yearly badge
   */
  yearlyBadgeClassName?: string;
  /**
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for plan cards
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for badge
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
   * Additional CSS classes for price
   */
  priceClassName?: string;
  /**
   * Additional CSS classes for price interval
   */
  priceIntervalClassName?: string;
  /**
   * Additional CSS classes for the separator
   */
  separatorClassName?: string;
  /**
   * Additional CSS classes for features list
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
   * Additional CSS classes for action
   */
  actionClassName?: string;
}

/**
 * PricingRadioToggle displays pricing plans with a radio button style monthly/yearly toggle.
 * Features a clean design with badges for popular plans, feature lists, and responsive layout.
 * The radio toggle provides a clear visual indication of the selected billing period.
 *
 * Ideal for SaaS products that want a distinctive toggle style for billing period selection.
 *
 * @example
 * ```tsx
 * <PricingRadioToggle
 *   title="Choose Your Plan"
 *   description="Select the plan that works best for you"
 *   plans={[
 *     { name: "Basic", monthlyPrice: "$19", yearlyPrice: "$190", features: [{ text: "Feature 1" }] }
 *   ]}
 * />
 * ```
 */
export function PricingRadioToggle({
  title,
  description,
  monthlyLabel,
  yearlyLabel,
  yearlyBadge,
  monthlyInterval,
  yearlyInterval,
  plans,
  plansSlot,
  featureIcon,
  featureIconName,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName,
  headerClassName,
  titleClassName,
  descriptionClassName,
  toggleClassName,
  toggleButtonClassName,
  toggleButtonActiveClassName,
  yearlyBadgeClassName,
  gridClassName,
  cardClassName,
  badgeClassName,
  planTitleClassName,
  planDescriptionClassName,
  priceClassName,
  priceIntervalClassName,
  separatorClassName,
  featuresClassName,
  featureItemClassName,
  featureIconClassName,
  featureTextClassName,
  actionClassName,
}: PricingRadioToggleProps): React.JSX.Element {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly",
  );

  const renderFeatures = useMemo(() => {
    return (plan: PricingRadioTogglePlan) => {
      if (plan.featuresSlot) return plan.featuresSlot;
      if (!plan.features || plan.features.length === 0) return null;

      return (
        <ul className={cn("mb-8 flex-1 space-y-3", featuresClassName)}>
          {plan.features.map((feature, featureIndex) => {
            const iconName = feature.iconName || featureIconName;
          const resolvedIcon =
              feature.icon ??
              featureIcon ??
              (iconName ? (
                <DynamicIcon
                  name={iconName}
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
  }, [featuresClassName, featureIcon, featureIconName, featureIconClassName, featureItemClassName, featureTextClassName]);

  const renderAction = useMemo(() => {
    return (plan: PricingRadioTogglePlan) => {
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
  }, [actionClassName]);

  const renderPlans = useMemo(() => {
    if (plansSlot) return plansSlot;
    if (!plans || plans.length === 0) return null;

    return (
      <div
        className={cn(
          "grid gap-8 md:grid-cols-2 lg:grid-cols-3",
          gridClassName,
        )}
      >
        {plans.map((plan, index) => (
          <div
            key={index}
            className={cn(
              "relative flex flex-col rounded-2xl border p-8",
              plan.badge ? "border-primary shadow-lg" : "border-border",
              cardClassName,
              plan.className,
            )}
          >
            {plan.badge && (
              <div
                className={cn(
                  "absolute -top-3 left-1/2 -translate-x-1/2",
                  badgeClassName,
                )}
              >
                {typeof plan.badge === "string" ? (
                  <Badge>{plan.badge}</Badge>
                ) : (
                  plan.badge
                )}
              </div>
            )}

            <div className="mb-6">
              {plan.name &&
                (typeof plan.name === "string" ? (
                  <h3
                    className={cn("text-xl font-semibold", planTitleClassName)}
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
                      "mt-2 text-sm text-muted-foreground",
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
                {billingPeriod === "yearly"
                  ? plan.yearlyPrice
                  : plan.monthlyPrice}
              </span>
              <span
                className={cn("text-muted-foreground", priceIntervalClassName)}
              >
                {billingPeriod === "yearly" ? yearlyInterval : monthlyInterval}
              </span>
            </div>

            <Separator className={cn("mb-6", separatorClassName)} />
            {renderFeatures(plan)}
            {renderAction(plan)}
          </div>
        ))}
      </div>
    );
  }, [plansSlot, plans, gridClassName, badgeClassName, cardClassName, planTitleClassName, planDescriptionClassName, priceClassName, priceIntervalClassName, separatorClassName, billingPeriod, yearlyInterval, monthlyInterval, renderFeatures, renderAction]);

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
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "mt-4 text-lg text-muted-foreground",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}

          <div
            className={cn(
              "mt-8 flex items-center justify-center gap-4",
              toggleClassName,
            )}
          >
            <div className="inline-flex rounded-lg border p-1">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  billingPeriod === "monthly"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground",
                  toggleButtonClassName,
                  billingPeriod === "monthly"
                    ? toggleButtonActiveClassName
                    : null,
                )}
              >
                {monthlyLabel}
              </button>
              <button
                onClick={() => setBillingPeriod("yearly")}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  billingPeriod === "yearly"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground",
                  toggleButtonClassName,
                  billingPeriod === "yearly"
                    ? toggleButtonActiveClassName
                    : null,
                )}
              >
                {yearlyLabel}
                {yearlyBadge &&
                  (typeof yearlyBadge === "string" ? (
                    <Badge
                      variant="secondary"
                      className={cn("ml-2", yearlyBadgeClassName)}
                    >
                      {yearlyBadge}
                    </Badge>
                  ) : (
                    <span className={yearlyBadgeClassName}>{yearlyBadge}</span>
                  ))}
              </button>
            </div>
          </div>
        </div>

        {renderPlans}
      </div>
    </Section>
  );
}
