"use client";

import * as React from "react";
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

export interface PricingTierGridFeature {
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
   * Additional CSS classes for the text
   */
  textClassName?: string;
}

export interface PricingTierGridTier {
  /**
   * Tier name
   */
  name?: React.ReactNode;
  /**
   * Tier description
   */
  description?: React.ReactNode;
  /**
   * Price display
   */
  price?: React.ReactNode;
  /**
   * Price interval
   */
  interval?: React.ReactNode;
  /**
   * Action configuration
   */
  action?: ActionConfig;
  /**
   * Custom slot for rendering action (overrides action)
   */
  actionSlot?: React.ReactNode;
  /**
   * Feature list
   */
  features?: PricingTierGridFeature[];
  /**
   * Custom slot for rendering features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
  /**
   * Comparison/eyebrow text
   */
  comparison?: React.ReactNode;
  /**
   * Highlight this tier
   */
  isFeatured?: boolean;
  /**
   * Card background utility classes
   */
  backgroundClassName?: string;
  /**
   * Additional CSS classes for the card
   */
  className?: string;
}

export interface PricingTierGridProps {
  /**
   * Section title
   */
  title?: React.ReactNode;
  /**
   * Section subtitle
   */
  subtitle?: React.ReactNode;
  /**
   * Pricing tiers
   */
  tiers?: PricingTierGridTier[];
  /**
   * Custom slot for rendering tiers (overrides tiers array)
   */
  tiersSlot?: React.ReactNode;
  /**
   * Default icon for features
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
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for cards
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for featured cards
   */
  featuredCardClassName?: string;
  /**
   * Additional CSS classes for comparison text
   */
  comparisonClassName?: string;
  /**
   * Additional CSS classes for tier name
   */
  tierNameClassName?: string;
  /**
   * Additional CSS classes for tier description
   */
  tierDescriptionClassName?: string;
  /**
   * Additional CSS classes for price
   */
  priceClassName?: string;
  /**
   * Additional CSS classes for interval
   */
  intervalClassName?: string;
  /**
   * Additional CSS classes for action
   */
  actionClassName?: string;
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
}

/**
 * PricingTierGrid displays a 4-column grid of pricing tiers with feature lists.
 * Each tier card includes a name, description, price, CTA button, and feature checklist.
 * Supports highlighting a primary/featured tier with distinct styling.
 *
 * Ideal for SaaS products, subscription services, or any business with tiered pricing.
 *
 * @example
 * ```tsx
 * <PricingTierGrid
 *   title="Choose Your Plan"
 *   subtitle="Start free and scale as you grow"
 *   tiers={[
 *     { name: "Free", price: "$0", features: [{ text: "Feature 1" }], action: { label: "Get Started" } },
 *     { name: "Pro", price: "$29", features: [{ text: "Feature 1" }, { text: "Feature 2" }], action: { label: "Start Trial" } }
 *   ]}
 * />
 * ```
 */
export function PricingTierGrid({
  title = "Simple, transparent pricing",
  subtitle = "Choose the plan that's right for you",
  tiers,
  tiersSlot,
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
  gridClassName,
  cardClassName,
  featuredCardClassName,
  comparisonClassName,
  tierNameClassName,
  tierDescriptionClassName,
  priceClassName,
  intervalClassName,
  actionClassName,
  featuresClassName,
  featureItemClassName,
  featureIconClassName,
  featureTextClassName,
}: PricingTierGridProps): React.JSX.Element {
  const renderFeatures = (tier: PricingTierGridTier, isFeatured: boolean) => {
    if (tier.featuresSlot) return tier.featuresSlot;
    if (!tier.features || tier.features.length === 0) return null;

    return (
      <ul className={cn("mt-6 space-y-3", featuresClassName)}>
        {tier.features.map((feature, index) => {
          const resolvedIcon = feature.icon
            ?? featureIcon
            ?? (feature.iconName || featureIconName ? (
              <DynamicIcon
                name={feature.iconName || featureIconName}
                size={16}
                className={cn(
                  "mt-0.5 shrink-0",
                  isFeatured ? "text-primary-foreground" : "text-primary",
                  featureIconClassName,
                  feature.iconClassName
                )}
              />
            ) : null);

          return (
            <li key={index} className={cn("flex items-start gap-3", featureItemClassName, feature.className)}>
              {resolvedIcon}
              {feature.text && (
                typeof feature.text === "string" ? (
                  <span
                    className={cn(
                      "text-sm",
                      isFeatured ? "text-primary-foreground/90" : "text-muted-foreground",
                      featureTextClassName,
                      feature.textClassName
                    )}
                  >
                    {feature.text}
                  </span>
                ) : (
                  <div
                    className={cn(
                      "text-sm",
                      isFeatured ? "text-primary-foreground/90" : "text-muted-foreground",
                      featureTextClassName,
                      feature.textClassName
                    )}
                  >
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

  const renderAction = (tier: PricingTierGridTier, isFeatured: boolean) => {
    if (tier.actionSlot) return tier.actionSlot;
    if (!tier.action) return null;

    const { label, icon, iconAfter, children, className: actionItemClassName, ...pressableProps } = tier.action;

    return (
      <Pressable
        asButton
        className={cn(
          "w-full justify-center",
          isFeatured && tier.action.variant === "outline"
            ? "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            : null,
          actionClassName,
          actionItemClassName
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

  const renderTiers = () => {
    if (tiersSlot) return tiersSlot;
    if (!tiers || tiers.length === 0) return null;

    return (
      <div className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-4", gridClassName)}>
        {tiers.map((tier, index) => {
          const isFeatured = Boolean(tier.isFeatured);

          return (
            <div
              key={index}
              className={cn(
                "flex flex-col rounded-xl border p-6 shadow-sm",
                tier.backgroundClassName,
                cardClassName,
                isFeatured ? featuredCardClassName : null,
                tier.className
              )}
            >
              <div className="mb-4">
                {tier.comparison && (
                  typeof tier.comparison === "string" ? (
                    <span
                      className={cn(
                        "text-xs font-medium uppercase tracking-wide",
                        isFeatured ? "text-primary-foreground/70" : "text-muted-foreground",
                        comparisonClassName
                      )}
                    >
                      {tier.comparison}
                    </span>
                  ) : (
                    <div className={comparisonClassName}>{tier.comparison}</div>
                  )
                )}
                {tier.name && (
                  typeof tier.name === "string" ? (
                    <h3
                      className={cn(
                        "mt-2 text-xl font-semibold",
                        isFeatured ? "text-primary-foreground" : "text-foreground",
                        tierNameClassName
                      )}
                    >
                      {tier.name}
                    </h3>
                  ) : (
                    <div className={tierNameClassName}>{tier.name}</div>
                  )
                )}
                {tier.description && (
                  typeof tier.description === "string" ? (
                    <p
                      className={cn(
                        "mt-1 text-sm",
                        isFeatured ? "text-primary-foreground/80" : "text-muted-foreground",
                        tierDescriptionClassName
                      )}
                    >
                      {tier.description}
                    </p>
                  ) : (
                    <div className={tierDescriptionClassName}>{tier.description}</div>
                  )
                )}
              </div>

              <div className="mb-6">
                {tier.price && (
                  <span
                    className={cn(
                      "text-4xl font-bold",
                      isFeatured ? "text-primary-foreground" : "text-foreground",
                      priceClassName
                    )}
                  >
                    {tier.price}
                  </span>
                )}
                {tier.interval && (
                  <span
                    className={cn(
                      "text-sm",
                      isFeatured ? "text-primary-foreground/70" : "text-muted-foreground",
                      intervalClassName
                    )}
                  >
                    {tier.interval}
                  </span>
                )}
              </div>

              {renderAction(tier, isFeatured)}
              {renderFeatures(tier, isFeatured)}
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
        </div>

        {renderTiers()}
      </div>
    </Section>
  );
}
