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

export interface PricingIconHeadersFeature {
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

export interface PricingIconHeadersPlan {
  /**
   * Plan name
   */
  name?: React.ReactNode;
  /**
   * Plan price
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
  features?: PricingIconHeadersFeature[];
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
   * Icon element
   */
  icon?: React.ReactNode;
  /**
   * Icon name for DynamicIcon
   */
  iconName?: string;
  /**
   * Icon background class
   */
  iconBgClassName?: string;
  /**
   * Additional CSS classes for the plan card
   */
  className?: string;
}

export interface PricingIconHeadersProps {
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
  plans?: PricingIconHeadersPlan[];
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
   * Additional CSS classes for icon wrapper
   */
  iconWrapperClassName?: string;
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
 * PricingIconHeaders displays a 3-column pricing grid with icon-based plan headers.
 * Each plan features a colored icon badge, feature list, and CTA button.
 * Clean bordered design with visual differentiation through icon colors.
 *
 * Ideal for products that want to visually distinguish plans with icons and colors.
 *
 * @example
 * ```tsx
 * <PricingIconHeaders
 *   heading="Choose Your Plan"
 *   plans={[
 *     { name: "Starter", price: "$9", features: [{ text: "Feature 1" }], iconName: "lucide/rocket" }
 *   ]}
 * />
 * ```
 */
export function PricingIconHeaders({
  heading,
  subtitle,
  plans,
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
  headingClassName,
  subtitleClassName,
  gridClassName,
  cardClassName,
  iconWrapperClassName,
  planTitleClassName,
  planDescriptionClassName,
  priceClassName,
  priceDescriptionClassName,
  featuresClassName,
  featureItemClassName,
  featureIconClassName,
  featureTextClassName,
  actionClassName,
}: PricingIconHeadersProps): React.JSX.Element {
  const renderFeatures = (plan: PricingIconHeadersPlan) => {
    if (plan.featuresSlot) return plan.featuresSlot;
    if (!plan.features || plan.features.length === 0) return null;

    return (
      <ul className={cn("mb-6 flex-1 space-y-3", featuresClassName)}>
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

  const renderAction = (plan: PricingIconHeadersPlan) => {
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
      <div className={cn("grid gap-6 md:grid-cols-3", gridClassName)}>
        {plans.map((plan, index) => {
          const resolvedIcon =
            plan.icon ??
            (plan.iconName ? (
              <DynamicIcon name={plan.iconName} size={24} />
            ) : null);

          return (
            <div
              key={index}
              className={cn(
                "flex flex-col rounded-2xl border p-6",
                cardClassName,
                plan.className,
              )}
            >
              <div className="mb-6 flex items-start gap-4">
                {resolvedIcon && (
                  <div
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                      plan.iconBgClassName || "bg-primary/10 text-primary",
                      iconWrapperClassName,
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

        {renderPlans()}
      </div>
    </Section>
  );
}
