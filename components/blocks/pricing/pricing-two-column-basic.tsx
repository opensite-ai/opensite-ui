"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Section } from "../../ui/section";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

export interface PricingTwoColumnBasicFeature {
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

export interface PricingTwoColumnBasicPlan {
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
  features?: PricingTwoColumnBasicFeature[];
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
   * Badge content (e.g., "Most Popular")
   */
  badge?: React.ReactNode;
  /**
   * Additional CSS classes for the plan card
   */
  className?: string;
}

export interface PricingTwoColumnBasicProps {
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
  plans?: PricingTwoColumnBasicPlan[];
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
   * Additional CSS classes for cards with badges
   */
  badgedCardClassName?: string;
  /**
   * Additional CSS classes for the badge
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
   * Additional CSS classes for the price interval
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

const defaultPlans: PricingTwoColumnBasicPlan[] = [
  {
    name: "Basic",
    monthlyPrice: "$19",
    yearlyPrice: "$190",
    description: "Essential features for individuals",
    features: [
      { text: "5 projects" },
      { text: "Basic analytics" },
      { text: "Email support" },
      { text: "2GB storage" },
      { text: "API access" },
    ],
    action: { label: "Get Started", href: "#", variant: "outline", size: "lg" },
  },
  {
    name: "Pro",
    monthlyPrice: "$49",
    yearlyPrice: "$490",
    description: "Advanced features for teams",
    features: [
      { text: "Unlimited projects" },
      { text: "Advanced analytics" },
      { text: "Priority support" },
      { text: "50GB storage" },
      { text: "API access" },
      { text: "Custom integrations" },
      { text: "Team collaboration" },
    ],
    action: { label: "Start Free Trial", href: "#", variant: "default", size: "lg" },
    badge: "Most Popular",
  },
];

/**
 * PricingTwoColumnBasic displays two pricing plans in a clean two-column layout with radio toggle.
 * Features a monthly/yearly toggle with badge highlighting for the recommended plan.
 * Simple and focused design ideal for products with two main pricing tiers.
 *
 * Perfect for startups and SaaS products with a basic/pro tier structure.
 *
 * @example
 * ```tsx
 * <PricingTwoColumnBasic
 *   title="Simple Pricing"
 *   subtitle="Choose the plan that works for you"
 *   plans={[
 *     { name: "Basic", monthlyPrice: "$19", yearlyPrice: "$190", features: [{ text: "Feature 1" }] },
 *     { name: "Pro", monthlyPrice: "$49", yearlyPrice: "$490", features: [{ text: "Feature 1" }, { text: "Feature 2" }] }
 *   ]}
 * />
 * ```
 */
export function PricingTwoColumnBasic({
  title = "Simple, Transparent Pricing",
  subtitle = "No hidden fees. Cancel anytime.",
  monthlyLabel = "Monthly",
  yearlyLabel = "Yearly",
  monthlyInterval = "/month",
  yearlyInterval = "/year",
  plans = defaultPlans,
  plansSlot,
  featureIcon,
  featureIconName = "lucide/check",
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
  toggleButtonClassName,
  toggleButtonActiveClassName,
  gridClassName,
  cardClassName,
  badgedCardClassName,
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
}: PricingTwoColumnBasicProps): React.JSX.Element {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  const renderFeatures = (plan: PricingTwoColumnBasicPlan) => {
    if (plan.featuresSlot) return plan.featuresSlot;
    if (!plan.features || plan.features.length === 0) return null;

    return (
      <ul className={cn("mb-8 flex-1 space-y-3", featuresClassName)}>
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
            <li key={featureIndex} className={cn("flex items-start gap-3", featureItemClassName, feature.className)}>
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

  const renderAction = (plan: PricingTwoColumnBasicPlan) => {
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
      <div className={cn("mx-auto grid max-w-4xl gap-8 md:grid-cols-2", gridClassName)}>
        {plans.map((plan, index) => (
          <div
            key={index}
            className={cn(
              "relative flex flex-col rounded-2xl border p-8",
              plan.badge ? "border-primary shadow-lg" : "border-border",
              cardClassName,
              plan.badge ? badgedCardClassName : null,
              plan.className
            )}
          >
            {plan.badge && (
              <div className={cn("absolute -top-3 left-1/2 -translate-x-1/2", badgeClassName)}>
                {typeof plan.badge === "string" ? (
                  <Badge>{plan.badge}</Badge>
                ) : (
                  plan.badge
                )}
              </div>
            )}

            <div className="mb-6">
              {plan.name && (
                typeof plan.name === "string" ? (
                  <h3 className={cn("text-xl font-semibold", planTitleClassName)}>{plan.name}</h3>
                ) : (
                  <div className={planTitleClassName}>{plan.name}</div>
                )
              )}
              {plan.description && (
                typeof plan.description === "string" ? (
                  <p className={cn("mt-2 text-sm text-muted-foreground", planDescriptionClassName)}>
                    {plan.description}
                  </p>
                ) : (
                  <div className={planDescriptionClassName}>{plan.description}</div>
                )
              )}
            </div>

            <div className="mb-6">
              <span className={cn("text-4xl font-bold", priceClassName)}>
                {billingPeriod === "yearly" ? plan.yearlyPrice : plan.monthlyPrice}
              </span>
              <span className={cn("text-muted-foreground", priceIntervalClassName)}>
                {billingPeriod === "yearly" ? yearlyInterval : monthlyInterval}
              </span>
            </div>

            {renderFeatures(plan)}
            {renderAction(plan)}
          </div>
        ))}
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

          <div className={cn("mt-8 flex items-center justify-center gap-4", toggleClassName)}>
            <div className="inline-flex rounded-lg border p-1">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  billingPeriod === "monthly"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                  toggleButtonClassName,
                  billingPeriod === "monthly" ? toggleButtonActiveClassName : null
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
                    : "text-muted-foreground hover:text-foreground",
                  toggleButtonClassName,
                  billingPeriod === "yearly" ? toggleButtonActiveClassName : null
                )}
              >
                {yearlyLabel}
              </button>
            </div>
          </div>
        </div>

        {renderPlans()}
      </div>
    </Section>
  );
}
