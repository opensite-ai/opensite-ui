"use client";

import * as React from "react";
import { useMemo, useState } from "react";
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

export interface PricingCollapsiblePlanFeature {
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

export interface PricingCollapsiblePlan {
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
  features?: PricingCollapsiblePlanFeature[];
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

export interface PricingCollapsiblePlansProps {
  /**
   * Section title
   */
  title?: React.ReactNode;
  /**
   * Section subtitle
   */
  subtitle?: React.ReactNode;
  /**
   * Pricing plans
   */
  plans?: PricingCollapsiblePlan[];
  /**
   * Custom slot for rendering plans (overrides plans array)
   */
  plansSlot?: React.ReactNode;
  /**
   * Default selected plan index
   */
  defaultSelectedIndex?: number;
  /**
   * Controlled selected plan index
   */
  selectedIndex?: number;
  /**
   * Callback when selection changes
   */
  onSelectionChange?: (index: number) => void;
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
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the subtitle
   */
  subtitleClassName?: string;
  /**
   * Additional CSS classes for the mobile selector
   */
  mobileSelectorClassName?: string;
  /**
   * Additional CSS classes for the selector button
   */
  selectorButtonClassName?: string;
  /**
   * Additional CSS classes for the dropdown
   */
  dropdownClassName?: string;
  /**
   * Additional CSS classes for dropdown items
   */
  dropdownItemClassName?: string;
  /**
   * Additional CSS classes for selected dropdown item
   */
  dropdownItemSelectedClassName?: string;
  /**
   * Additional CSS classes for the mobile plan card
   */
  mobileCardClassName?: string;
  /**
   * Additional CSS classes for the desktop grid
   */
  desktopGridClassName?: string;
  /**
   * Additional CSS classes for desktop cards
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for popular cards
   */
  popularCardClassName?: string;
  /**
   * Additional CSS classes for badges
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
   * Additional CSS classes for price description
   */
  priceDescriptionClassName?: string;
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
}

/**
 * PricingCollapsiblePlans displays pricing plans with a collapsible mobile menu and desktop comparison.
 * Features a dropdown plan selector on mobile and expanded cards on desktop.
 * Ideal for responsive pricing pages that need to work well on all screen sizes.
 *
 * Perfect for mobile-first pricing experiences.
 *
 * @example
 * ```tsx
 * <PricingCollapsiblePlans
 *   title="Choose Your Plan"
 *   plans={[
 *     { name: "Starter", price: "$9", features: [{ text: "Feature 1" }] }
 *   ]}
 * />
 * ```
 */
export function PricingCollapsiblePlans({
  title,
  subtitle,
  plans,
  plansSlot,
  defaultSelectedIndex,
  selectedIndex,
  onSelectionChange,
  featureIcon,
  featureIconName = "lucide/check",
  popularBadge,
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
  mobileSelectorClassName,
  selectorButtonClassName,
  dropdownClassName,
  dropdownItemClassName,
  dropdownItemSelectedClassName,
  mobileCardClassName,
  desktopGridClassName,
  cardClassName,
  popularCardClassName,
  badgeClassName,
  planTitleClassName,
  planDescriptionClassName,
  priceClassName,
  priceDescriptionClassName,
  featuresClassName,
  featureItemClassName,
  featureIconClassName,
  featureTextClassName,
  actionClassName,
}: PricingCollapsiblePlansProps): React.JSX.Element {
  const defaultIndex = useMemo(() => {
    if (typeof defaultSelectedIndex === "number") return defaultSelectedIndex;
    const popularIndex = plans.findIndex((plan) => plan.isPopular);
    return popularIndex >= 0 ? popularIndex : 0;
  }, [defaultSelectedIndex, plans]);

  const [internalSelected, setInternalSelected] = useState(defaultIndex);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeIndex =
    typeof selectedIndex === "number" ? selectedIndex : internalSelected;
  const activePlan = plans[activeIndex] ?? plans[0];

  const updateSelection = (index: number) => {
    if (typeof selectedIndex !== "number") {
      setInternalSelected(index);
    }
    onSelectionChange?.(index);
  };

  const renderFeatures = (plan: PricingCollapsiblePlan) => {
    if (plan.featuresSlot) return plan.featuresSlot;
    if (!plan.features || plan.features.length === 0) return null;

    return (
      <ul className={cn("mb-6 space-y-3", featuresClassName)}>
        {plan.features.map((feature, index) => {
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
              key={index}
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

  const renderAction = (
    plan: PricingCollapsiblePlan,
    variant: "default" | "outline" = "default",
  ) => {
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
        variant={plan.action.variant || variant}
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

  const renderPlansDesktop = () => {
    if (plansSlot) return plansSlot;
    if (!plans || plans.length === 0) return null;

    return (
      <div
        className={cn(
          "hidden gap-6 md:grid md:grid-cols-3",
          desktopGridClassName,
        )}
      >
        {plans.map((plan, index) => {
          const badgeContent =
            plan.badge ?? (plan.isPopular ? "Most Popular" : null);

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
              {renderAction(plan, plan.isPopular ? "default" : "outline")}
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
        </div>

        <div className={cn("mb-8 md:hidden", mobileSelectorClassName)}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "flex w-full items-center justify-between rounded-lg border p-4",
              selectorButtonClassName,
            )}
          >
            <div>
              {activePlan?.name && (
                <span className="font-semibold">{activePlan.name}</span>
              )}
              {(activePlan?.price || activePlan?.priceDescription) && (
                <span className="ml-2 text-muted-foreground">
                  {activePlan?.price}
                  {activePlan?.priceDescription}
                </span>
              )}
            </div>
            <DynamicIcon
              name={isMenuOpen ? "lucide/chevron-up" : "lucide/chevron-down"}
              size={20}
              className="text-muted-foreground"
            />
          </button>

          {isMenuOpen && (
            <div
              className={cn(
                "mt-2 rounded-lg border bg-card shadow-lg",
                dropdownClassName,
              )}
            >
              {plans.map((plan, index) => (
                <button
                  key={index}
                  onClick={() => {
                    updateSelection(index);
                    setIsMenuOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between p-4 text-left hover:bg-muted/50",
                    index !== plans.length - 1 && "border-b",
                    activeIndex === index && "bg-muted/50",
                    dropdownItemClassName,
                    activeIndex === index
                      ? dropdownItemSelectedClassName
                      : null,
                  )}
                >
                  <div>
                    {plan.name && (
                      <span className="font-semibold">{plan.name}</span>
                    )}
                    {(plan.badge ?? (plan.isPopular ? popularBadge : null)) && (
                      <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                        {plan.badge ?? popularBadge}
                      </span>
                    )}
                    {plan.description && (
                      <p className="text-sm text-muted-foreground">
                        {plan.description}
                      </p>
                    )}
                  </div>
                  <span className="font-semibold">
                    {plan.price}
                    {plan.priceDescription}
                  </span>
                </button>
              ))}
            </div>
          )}

          {activePlan && (
            <div
              className={cn("mt-6 rounded-lg border p-6", mobileCardClassName)}
            >
              <div className="mb-4">
                {activePlan.price && (
                  <span className={cn("text-3xl font-bold", priceClassName)}>
                    {activePlan.price}
                  </span>
                )}
                {activePlan.priceDescription && (
                  <span
                    className={cn(
                      "text-muted-foreground",
                      priceDescriptionClassName,
                    )}
                  >
                    {activePlan.priceDescription}
                  </span>
                )}
              </div>

              {renderFeatures(activePlan)}
              {renderAction(activePlan, "default")}
            </div>
          )}
        </div>

        {renderPlansDesktop()}
      </div>
    </Section>
  );
}
