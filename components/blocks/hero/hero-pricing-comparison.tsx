"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import type {ActionConfig, SectionBackground, SectionSpacing} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";

export interface PricingPlan {
  /**
   * Plan name
   */
  name: string;
  /**
   * Plan description
   */
  description?: string;
  /**
   * Price display (e.g., "$29" or "Custom")
   */
  price: string;
  /**
   * Price period (e.g., "/month")
   */
  pricePeriod?: string;
  /**
   * Action configuration for CTA button
   */
  action?: ActionConfig;
  /**
   * List of features included in the plan
   */
  features?: string[];
  /**
   * Whether this plan is highlighted/featured
   */
  isPopular?: boolean;
  /**
   * Badge text for popular plans
   */
  popularBadge?: string;
}

export interface HeroPricingComparisonProps {
  /**
   * Badge text above heading
   */
  badgeText?: React.ReactNode;
  /**
   * Custom slot for badge (overrides badgeText prop)
   */
  badgeSlot?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Array of pricing plans
   */
  plans?: PricingPlan[];
  /**
   * Custom slot for plans (overrides plans array)
   */
  plansSlot?: React.ReactNode;  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;

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
   * Additional CSS classes for the plans grid
   */
  plansClassName?: string;
}

export function HeroPricingComparison({
  badgeText,
  badgeSlot,
  heading,
  description,
  plans,
  plansSlot,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  plansClassName,
}: HeroPricingComparisonProps): React.JSX.Element {
  const renderBadge = () => {
    if (badgeSlot) return badgeSlot;
    if (!badgeText) return null;

    return (
      <Badge variant="outline" className="mb-4">
        {badgeText}
      </Badge>
    );
  };

  const renderPlans = () => {
    if (plansSlot) return plansSlot;
    if (!plans || plans.length === 0) return null;

    return (
      <div className={cn("mt-16 grid gap-8 md:grid-cols-3", plansClassName)}>
        {plans.map((plan, index) => (
          <div
            key={index}
            className={cn(
              "rounded-2xl bg-card p-8",
              plan.isPopular ? "relative border-2 border-primary" : "border border-border"
            )}
          >
            {plan.isPopular && plan.popularBadge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge>{plan.popularBadge}</Badge>
              </div>
            )}
            <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
            {plan.description && (
              <p className="mt-2 text-sm text-muted-foreground">
                {plan.description}
              </p>
            )}
            <div className="mt-6">
              <span className="text-4xl font-bold text-foreground">{plan.price}</span>
              {plan.pricePeriod && (
                <span className="text-muted-foreground">{plan.pricePeriod}</span>
              )}
            </div>
            {plan.action && (
              <Pressable
                href={plan.action.href}
                asButton
                variant={plan.action.variant}
                className={plan.action.className}
              >
                {plan.action.label}
              </Pressable>
            )}
            {plan.features && plan.features.length > 0 && (
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <DynamicIcon name="lucide/check" size={16} className="text-success" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
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
      className={cn(className)}
    >
      <div className={cn("container", containerClassName)}>
        <div className={cn("mx-auto max-w-4xl text-center", headerClassName)}>
          {renderBadge()}
          {heading && (
            typeof heading === "string" ? (
              <h1 className={cn("text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl", headingClassName)}>
                {heading}
              </h1>
            ) : (
              <h1 className={cn("text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl", headingClassName)}>
                {heading}
              </h1>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("mt-6 text-lg text-muted-foreground md:text-xl", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
        </div>
        {renderPlans()}
      </div>
    </Section>
  );
}
