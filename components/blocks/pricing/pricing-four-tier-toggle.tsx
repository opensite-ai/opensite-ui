"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Switch } from "../../ui/switch";
import { Label } from "../../ui/label";
import { Section } from "../../ui/section";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

export interface PricingFourTierFeature {
  /**
   * Feature label
   */
  name?: React.ReactNode;
  /**
   * Whether the feature is included
   */
  included?: boolean;
  /**
   * Optional icon element
   */
  icon?: React.ReactNode;
  /**
   * Optional icon name for DynamicIcon
   */
  iconName?: string;
  /**
   * Additional CSS classes for the feature item
   */
  className?: string;
  /**
   * Additional CSS classes for the feature icon
   */
  iconClassName?: string;
  /**
   * Additional CSS classes for the feature text
   */
  textClassName?: string;
}

export interface PricingFourTierPlan {
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
   * Feature list
   */
  features?: PricingFourTierFeature[];
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

export interface PricingFourTierToggleProps {
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
   * Toggle label for annual billing
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
  plans?: PricingFourTierPlan[];
  /**
   * Custom slot for rendering plans (overrides plans array)
   */
  plansSlot?: React.ReactNode;
  /**
   * Icon used when feature is included
   */
  includedIcon?: React.ReactNode;
  /**
   * Icon used when feature is excluded
   */
  excludedIcon?: React.ReactNode;
  /**
   * Icon name used when feature is included
   */
  includedIconName?: string;
  /**
   * Icon name used when feature is excluded
   */
  excludedIconName?: string;
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
 * PricingFourTierToggle displays a 4-column pricing grid with annual billing toggle.
 * Features check/X icons for feature availability, popular plan highlighting, and responsive layout.
 * Switch toggle allows users to compare monthly vs annual pricing with savings indicator.
 *
 * Ideal for SaaS products with multiple tiers from free to enterprise.
 *
 * @example
 * ```tsx
 * <PricingFourTierToggle
 *   title="Choose Your Plan"
 *   plans={[
 *     { name: "Free", monthlyPrice: "$0", yearlyPrice: "$0", features: [{ name: "Feature", included: true }] }
 *   ]}
 * />
 * ```
 */
export function PricingFourTierToggle({
  title,
  subtitle,
  monthlyLabel,
  yearlyLabel,
  yearlyBadge,
  monthlyInterval,
  yearlyInterval,
  plans,
  plansSlot,
  includedIcon,
  excludedIcon,
  includedIconName,
  excludedIconName,
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
}: PricingFourTierToggleProps): React.JSX.Element {
  const [isAnnual, setIsAnnual] = useState(false);

  const renderFeatures = useMemo(() => {
    return (plan: PricingFourTierPlan) => {
      if (plan.featuresSlot) return plan.featuresSlot;
      if (!plan.features || plan.features.length === 0) return null;

      return (
        <ul className={cn("mb-6 flex-1 space-y-3", featuresClassName)}>
          {plan.features.map((feature, featureIndex) => {
            const isIncluded = feature.included !== false;
            const fallbackIconName = isIncluded
              ? includedIconName
              : excludedIconName;
            const resolvedIcon =
              feature.icon ??
              (isIncluded ? includedIcon : excludedIcon) ??
              (feature.iconName || fallbackIconName ? (
                <DynamicIcon
                  name={feature.iconName || fallbackIconName}
                  size={16}
                  className={cn(
                    "mt-0.5 shrink-0",
                    isIncluded ? "text-primary" : "text-muted-foreground",
                    featureIconClassName,
                    feature.iconClassName,
                  )}
                />
              ) : null);

            return (
              <li
                key={featureIndex}
                className={cn(
                  "flex items-start gap-2",
                  featureItemClassName,
                  feature.className,
                )}
              >
                {resolvedIcon}
                {feature.name &&
                  (typeof feature.name === "string" ? (
                    <span
                      className={cn(
                        "text-sm",
                        isIncluded ? "text-foreground" : "text-muted-foreground",
                        featureTextClassName,
                        feature.textClassName,
                      )}
                    >
                      {feature.name}
                    </span>
                  ) : (
                    <div
                      className={cn(
                        "text-sm",
                        isIncluded ? "text-foreground" : "text-muted-foreground",
                        featureTextClassName,
                        feature.textClassName,
                      )}
                    >
                      {feature.name}
                    </div>
                  ))}
              </li>
            );
          })}
        </ul>
      );
    };
  }, [featuresClassName, includedIconName, excludedIconName, includedIcon, excludedIcon, featureIconClassName, featureItemClassName, featureTextClassName]);

  const renderAction = useMemo(() => {
    return (plan: PricingFourTierPlan) => {
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
          "grid gap-6 md:grid-cols-2 lg:grid-cols-4",
          gridClassName,
        )}
      >
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
                <div
                  className={cn(
                    "absolute -top-3 left-1/2 -translate-x-1/2",
                    badgeClassName,
                  )}
                >
                  {typeof badgeContent === "string" ? (
                    <Badge>{badgeContent}</Badge>
                  ) : (
                    badgeContent
                  )}
                </div>
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
                <span className={cn("text-3xl font-bold", priceClassName)}>
                  {isAnnual ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span
                  className={cn(
                    "text-sm text-muted-foreground",
                    priceIntervalClassName,
                  )}
                >
                  {isAnnual ? yearlyInterval : monthlyInterval}
                </span>
              </div>

              {renderFeatures(plan)}
              {renderAction(plan)}
            </div>
          );
        })}
      </div>
    );
  }, [plansSlot, plans, gridClassName, popularBadge, cardClassName, popularCardClassName, badgeClassName, planTitleClassName, planDescriptionClassName, priceClassName, priceIntervalClassName, isAnnual, yearlyInterval, monthlyInterval, renderFeatures, renderAction]);

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
            <Label
              htmlFor="billing-toggle"
              className={cn(
                "text-sm font-medium",
                !isAnnual ? "text-foreground" : "text-muted-foreground",
                toggleLabelClassName,
              )}
            >
              {monthlyLabel}
            </Label>
            <Switch
              id="billing-toggle"
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <Label
              htmlFor="billing-toggle"
              className={cn(
                "text-sm font-medium",
                isAnnual ? "text-foreground" : "text-muted-foreground",
                toggleLabelClassName,
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
            </Label>
          </div>
        </div>

        {renderPlans}
      </div>
    </Section>
  );
}
