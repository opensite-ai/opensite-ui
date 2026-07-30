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

export interface PricingPopularHighlightFeature {
  /**
   * Feature text
   */
  text?: React.ReactNode;
  /**
   * Optional icon element
   */
  icon?: React.ReactNode | string;
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

export interface PricingPopularHighlightPlan {
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
  features?: PricingPopularHighlightFeature[];
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

export interface PricingPopularHighlightProps {
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
  plans?: PricingPopularHighlightPlan[];
  /**
   * Custom slot for rendering plans (overrides plans array)
   */
  plansSlot?: React.ReactNode;
  /**
   * Default icon used for features
   */
  featureIcon?: React.ReactNode | string;
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
   * Additional CSS classes for feature item
   */
  featureItemClassName?: string;
  /**
   * Additional CSS classes for feature icon
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
 * PricingPopularHighlight displays a 3-column pricing grid with the popular plan visually elevated.
 * The popular plan is scaled up and has enhanced styling to draw attention.
 * Features a Switch toggle for annual billing and clean card design.
 *
 * Ideal for products that want to strongly emphasize their recommended tier.
 *
 * @example
 * ```tsx
 * <PricingPopularHighlight
 *   heading="Choose Your Plan"
 *   plans={[
 *     { name: "Basic", monthlyPrice: "$15", yearlyPrice: "$150", features: [{ text: "Feature 1" }] },
 *     { name: "Pro", monthlyPrice: "$39", yearlyPrice: "$390", features: [{ text: "Feature 1" }], isPopular: true }
 *   ]}
 * />
 * ```
 */
export function PricingPopularHighlight({
  sectionId = "pricing-popular-highlight",
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
}: PricingPopularHighlightProps): React.JSX.Element {
  const [isAnnual, setIsAnnual] = useState(false);

  const renderFeatures = useMemo(() => {
    return (plan: PricingPopularHighlightPlan) => {
      if (plan.featuresSlot) return plan.featuresSlot;
      if (!plan.features || plan.features.length === 0) return null;

      return (
        <ul className={cn("mb-6 flex-1 space-y-3", featuresClassName)}>
          {plan.features.map((feature, featureIndex) => {
            const resolvedIcon =
              feature.icon ??
              featureIcon ??
              (feature.iconName || featureIconName);

            return (
              <li
                key={featureIndex}
                className={cn(
                  "flex items-start gap-3",
                  featureItemClassName,
                  feature.className,
                )}
              >
                {resolvedIcon === "" ? null : (
                  <DynamicIcon
                    name={resolvedIcon}
                    size={18}
                    className={cn(
                      "mt-0.5 shrink-0 text-primary",
                      featureIconClassName,
                      feature.iconClassName,
                    )}
                  />
                )}
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
    return (plan: PricingPopularHighlightPlan) => {
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
              {icon === "" ? null : <DynamicIcon name={icon} />}
              {label}
              {iconAfter === "" ? null : <DynamicIcon name={iconAfter} />}
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
        className={cn("grid items-center gap-6 md:grid-cols-3", gridClassName)}
      >
        {plans.map((plan, index) => {
          const badgeContent =
            plan.badge ?? (plan.isPopular ? popularBadge : null);

          return (
            <div
              key={index}
              className={cn(
                "relative flex flex-col rounded-2xl border p-6 transition-all",
                plan.isPopular
                  ? cn("z-10 border-primary shadow-xl md:-my-4 md:scale-105 md:p-8", getNestedCardBg(background, "card"), getNestedCardTextColor(background))
                  : "border-border",
                cardClassName,
                plan.isPopular ? popularCardClassName : null,
                plan.className,
              )}
            >
              {badgeContent && (
                <span
                  className={cn(
                    "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground",
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
                        "font-semibold",
                        plan.isPopular ? "text-xl" : "text-lg",
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
                <span
                  className={cn(
                    "font-bold",
                    plan.isPopular ? "text-5xl" : "text-4xl",
                    priceClassName,
                  )}
                >
                  {isAnnual ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span
                  className={cn(
                    "text-muted-foreground",
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
  }, [plansSlot, plans, gridClassName, popularBadge, badgeClassName, cardClassName, popularCardClassName, planTitleClassName, planDescriptionClassName, priceClassName, priceIntervalClassName, isAnnual, yearlyInterval, monthlyInterval, renderFeatures, renderAction]);

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
                  isAnnual ? "text-muted-foreground" : "",
                  toggleLabelClassName,
                )}
              >
                {monthlyLabel}
              </span>
            )}
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
            {yearlyLabel && (
              <span
                className={cn(
                  "text-sm font-medium",
                  !isAnnual ? "text-muted-foreground" : "",
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
            )}
          </div>
        </div>

        {renderPlans}
      </div>
    </Section>
  );
}
