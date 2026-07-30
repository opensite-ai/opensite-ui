"use client";

import * as React from "react";
import { useMemo } from "react";
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

export interface PricingMinimalCardsFeature {
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

export interface PricingMinimalCardsPlan {
  /**
   * Plan name
   */
  name?: React.ReactNode;
  /**
   * Plan price display
   */
  price?: React.ReactNode;
  /**
   * Price description/interval
   */
  priceDescription?: React.ReactNode;
  /**
   * Plan description
   */
  description?: React.ReactNode;
  /**
   * Plan features
   */
  features?: PricingMinimalCardsFeature[];
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
  isHighlighted?: boolean;
  /**
   * Additional CSS classes for the plan card
   */
  className?: string;
}

export interface PricingMinimalCardsProps {
  /**
   * Section heading
   */
  heading?: React.ReactNode;
  /**
   * Supporting subtitle
   */
  subtitle?: React.ReactNode;
  /**
   * Pricing plans
   */
  plans?: PricingMinimalCardsPlan[];
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
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for plan cards
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for highlighted cards
   */
  highlightedCardClassName?: string;
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
   * Additional CSS classes for the price description
   */
  priceDescriptionClassName?: string;
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
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * PricingMinimalCards displays a clean, minimal 3-column pricing layout.
 * Features simple card design with essential information and feature lists.
 * No toggle or complex interactions - just straightforward pricing display.
 *
 * Ideal for simple pricing pages that don't need billing period toggles.
 *
 * @example
 * ```tsx
 * <PricingMinimalCards
 *   heading="Simple Pricing"
 *   plans={[
 *     { name: "Basic", price: "$9", features: [{ text: "Feature 1" }] }
 *   ]}
 * />
 * ```
 */
export function PricingMinimalCards({
  sectionId = "pricing-minimal-cards",
  heading,
  subtitle,
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
  headingClassName,
  subtitleClassName,
  gridClassName,
  cardClassName,
  highlightedCardClassName,
  planTitleClassName,
  planDescriptionClassName,
  priceClassName,
  priceDescriptionClassName,
  featuresClassName,
  featureItemClassName,
  featureIconClassName,
  featureTextClassName,
  actionClassName,
}: PricingMinimalCardsProps): React.JSX.Element {
  const renderFeatures = useMemo(() => {
    return (plan: PricingMinimalCardsPlan) => {
      if (plan.featuresSlot) return plan.featuresSlot;
      if (!plan.features || plan.features.length === 0) return null;

      return (
        <ul className={cn("mb-6 flex-1 space-y-2", featuresClassName)}>
          {plan.features.map((feature, featureIndex) => {
            const iconName = feature.iconName || featureIconName;
            const resolvedIcon =
              feature.icon ??
              featureIcon ??
              (iconName ? (
                <DynamicIcon
                  name={iconName}
                  size={16}
                  className={cn(
                    "shrink-0 text-primary",
                    featureIconClassName,
                    feature.iconClassName,
                  )}
                />
              ) : null);

            return (
              <li
                key={featureIndex}
                className={cn(
                  "flex items-center gap-2",
                  featureItemClassName,
                  feature.className,
                )}
              >
                {resolvedIcon === "" ? null : (
                  <DynamicIcon
                    name={resolvedIcon}
                    size={16}
                    className={cn(
                      "shrink-0 text-primary",
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
    return (plan: PricingMinimalCardsPlan) => {
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
      <div className={cn("grid gap-6 md:grid-cols-3", gridClassName)}>
        {plans.map((plan, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-col rounded-xl border p-6",
              plan.isHighlighted ? "border-primary shadow-lg" : "border-border",
              cardClassName,
              plan.isHighlighted ? highlightedCardClassName : null,
              plan.className,
            )}
          >
            <div className="mb-4">
              {plan.name &&
                (typeof plan.name === "string" ? (
                  <h3
                    className={cn("text-lg font-semibold", planTitleClassName)}
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
                      "text-sm text-muted-foreground",
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
              {plan.price && (
                <span className={cn("text-3xl font-bold", priceClassName)}>
                  {plan.price}
                </span>
              )}
              {plan.priceDescription && (
                <span
                  className={cn(
                    "text-muted-foreground",
                    priceDescriptionClassName,
                  )}
                >
                  {plan.priceDescription}
                </span>
              )}
            </div>

            {renderFeatures(plan)}
            {renderAction(plan)}
          </div>
        ))}
      </div>
    );
  }, [plansSlot, plans, gridClassName, cardClassName, highlightedCardClassName, planTitleClassName, planDescriptionClassName, priceClassName, priceDescriptionClassName, renderFeatures, renderAction]);

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
        </div>

        {renderPlans}
      </div>
    </Section>
  );
}
