"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
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

export interface PricingSwitchCardsFeature {
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

export interface PricingSwitchCardsPlan {
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
  features?: PricingSwitchCardsFeature[];
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
   * Badge content for popular plan
   */
  badge?: React.ReactNode;
  /**
   * Additional CSS classes for the plan card
   */
  className?: string;
}

export interface PricingSwitchCardsProps {
  /**
   * Section heading
   */
  heading?: React.ReactNode;
  /**
   * Supporting subtitle
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
   * Pricing plans
   */
  plans?: PricingSwitchCardsPlan[];
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
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the subtitle
   */
  subtitleClassName?: string;
  /**
   * Additional CSS classes for the toggle wrapper
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
   * Additional CSS classes for badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for plan title
   */
  planTitleClassName?: string;
  /**
   * Additional CSS classes for plan description
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
   * Additional CSS classes for the action
   */
  actionClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * PricingSwitchCards displays a 3-card pricing layout with a Switch toggle for billing period.
 * Features clean card design with popular plan highlighting and feature lists.
 * The Switch component provides a familiar toggle pattern for monthly/yearly selection.
 *
 * Ideal for SaaS products with three main pricing tiers.
 *
 * @example
 * ```tsx
 * <PricingSwitchCards
 *   heading="Pricing Plans"
 *   plans={[
 *     { name: "Free", monthlyPrice: "$0", yearlyPrice: "$0", features: [{ text: "Feature 1" }] }
 *   ]}
 * />
 * ```
 */
export function PricingSwitchCards({
  sectionId = "pricing-switch-cards",
  heading,
  subtitle,
  monthlyLabel,
  yearlyLabel,
  yearlyBadge,
  monthlyInterval,
  yearlyInterval,
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
  headingClassName,
  subtitleClassName,
  toggleClassName,
  toggleLabelClassName,
  yearlyBadgeClassName,
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
}: PricingSwitchCardsProps): React.JSX.Element {
  const [isYearly, setIsYearly] = useState(false);

  const renderFeatures = useMemo(() => {
    return (plan: PricingSwitchCardsPlan) => {
      if (plan.featuresSlot) return plan.featuresSlot;
      if (!plan.features || plan.features.length === 0) return null;

      return (
        <ul className={cn("mb-6 flex-1 space-y-3", featuresClassName)}>
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
    return (plan: PricingSwitchCardsPlan) => {
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
      <div className={cn("grid gap-6 md:grid-cols-3", gridClassName)}>
        {plans.map((plan, index) => {
          const badgeContent =
            plan.badge ?? (plan.isPopular ? popularBadge : null);

          return (
            <div
              key={index}
              className={cn(
                "relative flex flex-col rounded-2xl border p-6",
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
                        "text-lg font-semibold",
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
                  {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span
                  className={cn(
                    "text-muted-foreground",
                    priceIntervalClassName,
                  )}
                >
                  {isYearly ? yearlyInterval : monthlyInterval}
                </span>
              </div>

              {renderFeatures(plan)}
              {renderAction(plan)}
            </div>
          );
        })}
      </div>
    );
  }, [plansSlot, plans, gridClassName, popularBadge, badgeClassName, cardClassName, popularCardClassName, planTitleClassName, planDescriptionClassName, priceClassName, priceIntervalClassName, isYearly, yearlyInterval, monthlyInterval, renderFeatures, renderAction]);

  return (
    <Section
      id={sectionId}
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
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "text-3xl font-bold tracking-tight sm:text-4xl",
                  headingClassName,
                )}
              >
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
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
            {monthlyLabel && (
              <span
                className={cn(
                  "text-sm font-medium",
                  !isYearly ? "" : "text-muted-foreground",
                  toggleLabelClassName,
                )}
              >
                {monthlyLabel}
              </span>
            )}
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            {yearlyLabel && (
              <span
                className={cn(
                  "text-sm font-medium",
                  isYearly ? "" : "text-muted-foreground",
                  toggleLabelClassName,
                )}
              >
                {yearlyLabel}
                {yearlyBadge && (
                  <span
                    className={cn(
                      "ml-1.5 rounded-full px-2 py-0.5 text-xs",
                      getNestedCardBg(background, "accent"),
                      "text-accent-foreground",
                      yearlyBadgeClassName,
                    )}
                  >
                    {yearlyBadge}
                  </span>
                )}
              </span>
            )}
          </div>
        </div>

        {renderPlans}
      </div>
    </Section>
  );
}
