"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

export interface PricingServicesCardsFeature {
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

export interface PricingServicesCardPlan {
  /**
   * Service name
   */
  name?: React.ReactNode;
  /**
   * Service price
   */
  price?: React.ReactNode;
  /**
   * Price description/interval
   */
  priceDescription?: React.ReactNode;
  /**
   * Service description
   */
  description?: React.ReactNode;
  /**
   * Features list
   */
  features?: PricingServicesCardsFeature[];
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
   * Icon element
   */
  icon?: React.ReactNode;
  /**
   * Icon name for DynamicIcon
   */
  iconName?: string;
  /**
   * Additional CSS classes for the plan card
   */
  className?: string;
  /**
   * Additional CSS classes for the icon wrapper
   */
  iconWrapperClassName?: string;
  /**
   * Additional CSS classes for the icon
   */
  iconClassName?: string;
}

export interface PricingServicesCardsProps {
  /**
   * Section heading
   */
  heading?: React.ReactNode;
  /**
   * Supporting subtitle
   */
  subtitle?: React.ReactNode;
  /**
   * Service plans
   */
  plans?: PricingServicesCardPlan[];
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
   * Additional CSS classes for icon wrapper
   */
  planIconWrapperClassName?: string;
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
   * Additional CSS classes for price description
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
}

/**
 * PricingServicesCards displays a two-card layout for service-based pricing.
 * Features icon headers, feature lists, and distinct styling for the primary service.
 * Ideal for agencies, consultants, or service-based businesses.
 *
 * Perfect for showcasing different service tiers or packages.
 *
 * @example
 * ```tsx
 * <PricingServicesCards
 *   heading="Our Services"
 *   plans={[
 *     { name: "Consultation", price: "$199", features: [{ text: "Feature 1" }], iconName: "lucide/users" }
 *   ]}
 * />
 * ```
 */
export function PricingServicesCards({
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
  planIconWrapperClassName,
  planTitleClassName,
  planDescriptionClassName,
  priceClassName,
  priceDescriptionClassName,
  featuresClassName,
  featureItemClassName,
  featureIconClassName,
  featureTextClassName,
  actionClassName,
}: PricingServicesCardsProps): React.JSX.Element {
  const renderFeatures = useMemo(() => {
    return (plan: PricingServicesCardPlan) => {
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
  }, [featuresClassName, featureIcon, featureIconName, featureIconClassName, featureItemClassName, featureTextClassName]);

  const renderAction = useMemo(() => {
    return (plan: PricingServicesCardPlan) => {
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
          "mx-auto grid max-w-4xl gap-8 md:grid-cols-2",
          gridClassName,
        )}
      >
        {plans.map((plan, index) => {
          const resolvedIcon =
            plan.icon ??
            (plan.iconName ? (
              <DynamicIcon
                name={plan.iconName}
                size={24}
                className={plan.iconClassName}
              />
            ) : null);

          return (
            <div
              key={index}
              className={cn(
                "flex flex-col rounded-2xl border p-8",
                plan.isHighlighted
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "border-border",
                cardClassName,
                plan.isHighlighted ? highlightedCardClassName : null,
                plan.className,
              )}
            >
              <div className="mb-6 flex items-start gap-4">
                {resolvedIcon && (
                  <div
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                      plan.isHighlighted
                        ? "bg-primary text-primary-foreground"
                        : cn(getNestedCardBg(background), "text-muted-foreground"),
                      planIconWrapperClassName,
                      plan.iconWrapperClassName,
                    )}
                  >
                    {resolvedIcon}
                  </div>
                )}
                <div>
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
              </div>

              <div className="mb-6">
                {plan.price && (
                  <span className={cn("text-4xl font-bold", priceClassName)}>
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
          );
        })}
      </div>
    );
  }, [plansSlot, plans, gridClassName, cardClassName, highlightedCardClassName, planIconWrapperClassName, planTitleClassName, planDescriptionClassName, priceClassName, priceDescriptionClassName, renderFeatures, renderAction]);

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
