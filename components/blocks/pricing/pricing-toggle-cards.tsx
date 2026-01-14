"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Switch } from "../../ui/switch";
import { Separator } from "../../ui/separator";
import { Section } from "../../ui/section";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

export interface PricingToggleCardsFeature {
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
   * Additional CSS classes for the feature item
   */
  className?: string;
  /**
   * Additional CSS classes for the icon
   */
  iconClassName?: string;
  /**
   * Additional CSS classes for the feature text
   */
  textClassName?: string;
}

export interface PricingToggleCardsPlan {
  /**
   * Plan name
   */
  name?: React.ReactNode;
  /**
   * Plan description
   */
  description?: React.ReactNode;
  /**
   * Monthly price display
   */
  monthlyPrice?: React.ReactNode;
  /**
   * Yearly price display
   */
  yearlyPrice?: React.ReactNode;
  /**
   * Plan features
   */
  features?: PricingToggleCardsFeature[];
  /**
   * Custom slot for rendering features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
  /**
   * Call-to-action configuration
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
   * Optional badge content (e.g. Most Popular)
   */
  badge?: React.ReactNode;
  /**
   * Additional CSS classes for the plan card
   */
  className?: string;
}

export interface PricingToggleCardsProps {
  /**
   * Section heading
   */
  heading?: React.ReactNode;
  /**
   * Supporting description
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
  plans?: PricingToggleCardsPlan[];
  /**
   * Custom slot for rendering plans (overrides plans array)
   */
  plansSlot?: React.ReactNode;
  /**
   * Default icon used for feature items
   */
  featureIcon?: React.ReactNode;
  /**
   * Default icon name used for feature items
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
   * Additional CSS classes for the header area
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the toggle wrapper
   */
  toggleClassName?: string;
  /**
   * Additional CSS classes for the toggle labels
   */
  toggleLabelClassName?: string;
  /**
   * Additional CSS classes for the yearly badge
   */
  yearlyBadgeClassName?: string;
  /**
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each card
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for highlighted cards
   */
  popularCardClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for card headers
   */
  cardHeaderClassName?: string;
  /**
   * Additional CSS classes for card titles
   */
  cardTitleClassName?: string;
  /**
   * Additional CSS classes for card descriptions
   */
  cardDescriptionClassName?: string;
  /**
   * Additional CSS classes for the price
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
   * Additional CSS classes for the card footer
   */
  cardFooterClassName?: string;
  /**
   * Additional CSS classes for the action
   */
  actionClassName?: string;
}

/**
 * PricingToggleCards displays pricing plans with a monthly/yearly toggle switch.
 * Features Card components with feature lists, popular plan highlighting, and responsive grid layout.
 * The toggle allows users to compare monthly vs annual pricing with potential savings.
 *
 * Ideal for subscription-based services that offer both monthly and annual billing options.
 *
 * @example
 * ```tsx
 * <PricingToggleCards
 *   heading="Choose Your Plan"
 *   description="Save 20% with annual billing"
 *   plans={[
 *     { name: "Basic", monthlyPrice: "$9", yearlyPrice: "$90", features: [{ text: "Feature 1" }] }
 *   ]}
 * />
 * ```
 */
export function PricingToggleCards({
  heading,
  description,
  monthlyLabel,
  yearlyLabel,
  yearlyBadge,
  monthlyInterval,
  yearlyInterval,
  plans,
  plansSlot,
  featureIcon,
  featureIconName = "lucide/circle-check",
  popularBadge,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  toggleClassName,
  toggleLabelClassName,
  yearlyBadgeClassName,
  gridClassName,
  cardClassName,
  popularCardClassName,
  badgeClassName,
  cardHeaderClassName,
  cardTitleClassName,
  cardDescriptionClassName,
  priceClassName,
  priceIntervalClassName,
  separatorClassName,
  featuresClassName,
  featureItemClassName,
  featureIconClassName,
  featureTextClassName,
  cardFooterClassName,
  actionClassName,
}: PricingToggleCardsProps): React.JSX.Element {
  const [isYearly, setIsYearly] = useState(false);

  const renderFeatures = (plan: PricingToggleCardsPlan) => {
    if (plan.featuresSlot) return plan.featuresSlot;
    if (!plan.features || plan.features.length === 0) return null;

    return (
      <ul className={cn("space-y-3", featuresClassName)}>
        {plan.features.map((feature, featureIndex) => {
          const resolvedIcon = feature.icon
            ?? featureIcon
            ?? (feature.iconName || featureIconName ? (
              <DynamicIcon
                name={feature.iconName || featureIconName}
                size={18}
                className={cn("mt-0.5 shrink-0 text-primary", featureIconClassName, feature.iconClassName)}
              />
            ) : null);

          return (
            <li
              key={featureIndex}
              className={cn("flex items-start gap-3", featureItemClassName, feature.className)}
            >
              {resolvedIcon}
              {feature.text && (
                typeof feature.text === "string" ? (
                  <span className={cn("text-sm text-muted-foreground", featureTextClassName, feature.textClassName)}>
                    {feature.text}
                  </span>
                ) : (
                  <div className={cn("text-sm text-muted-foreground", featureTextClassName, feature.textClassName)}>
                    {feature.text}
                  </div>
                )
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  const renderAction = (plan: PricingToggleCardsPlan) => {
    if (plan.actionSlot) return plan.actionSlot;
    if (!plan.action) return null;

    const { label, icon, iconAfter, children, className: actionItemClassName, ...pressableProps } = plan.action;

    return (
      <Pressable
        asButton
        className={cn("w-full justify-center", actionClassName, actionItemClassName)}
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
      <div className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", gridClassName)}>
        {plans.map((plan, index) => {
          const badgeContent = plan.badge ?? (plan.isPopular ? popularBadge : null);

          return (
            <Card
              key={index}
              className={cn(
                "relative flex flex-col",
                plan.isPopular ? "border-primary shadow-lg" : null,
                cardClassName,
                plan.isPopular ? popularCardClassName : null,
                plan.className
              )}
            >
              {badgeContent && (
                <div className={cn("absolute -top-3 left-1/2 -translate-x-1/2", badgeClassName)}>
                  {typeof badgeContent === "string" ? (
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      {badgeContent}
                    </span>
                  ) : (
                    badgeContent
                  )}
                </div>
              )}

              <CardHeader className={cn("pb-4", cardHeaderClassName)}>
                {plan.name && (
                  typeof plan.name === "string" ? (
                    <CardTitle className={cn("text-xl", cardTitleClassName)}>{plan.name}</CardTitle>
                  ) : (
                    <div className={cardTitleClassName}>{plan.name}</div>
                  )
                )}
                {plan.description && (
                  typeof plan.description === "string" ? (
                    <p className={cn("text-sm text-muted-foreground", cardDescriptionClassName)}>
                      {plan.description}
                    </p>
                  ) : (
                    <div className={cardDescriptionClassName}>{plan.description}</div>
                  )
                )}
              </CardHeader>

              <CardContent className="flex-1">
                {(plan.monthlyPrice || plan.yearlyPrice) && (
                  <div className="mb-6">
                    <span className={cn("text-4xl font-bold", priceClassName)}>
                      {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className={cn("text-muted-foreground", priceIntervalClassName)}>
                      {isYearly ? yearlyInterval : monthlyInterval}
                    </span>
                  </div>
                )}

                <Separator className={cn("mb-6", separatorClassName)} />
                {renderFeatures(plan)}
              </CardContent>

              <CardFooter className={cardFooterClassName}>
                {renderAction(plan)}
              </CardFooter>
            </Card>
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
        <div className={cn("mx-auto mb-12 max-w-2xl text-center", headerClassName)}>
          {heading && (
            typeof heading === "string" ? (
              <h2 className={cn("text-3xl font-bold tracking-tight sm:text-4xl", headingClassName)}>
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("mt-4 text-lg text-muted-foreground", descriptionClassName)}>{description}</p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}

          <div className={cn("mt-8 flex items-center justify-center gap-3", toggleClassName)}>
            {monthlyLabel && (
              <span
                className={cn(
                  "text-sm font-medium",
                  !isYearly ? "text-foreground" : "text-muted-foreground",
                  toggleLabelClassName
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
            )}
          </div>
        </div>

        {renderPlans()}
      </div>
    </Section>
  );
}
