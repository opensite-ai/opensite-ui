"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";
import { Section } from "../../ui/section";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

export interface PricingDiscountCardFeature {
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

export interface PricingDiscountCardProps {
  /**
   * Card title
   */
  title?: React.ReactNode;
  /**
   * Supporting description
   */
  description?: React.ReactNode;
  /**
   * Original price (strikethrough)
   */
  originalPrice?: React.ReactNode;
  /**
   * Discounted price
   */
  discountedPrice?: React.ReactNode;
  /**
   * Discount badge content
   */
  discountBadge?: React.ReactNode;
  /**
   * Price description/subtext
   */
  priceDescription?: React.ReactNode;
  /**
   * Feature list
   */
  features?: PricingDiscountCardFeature[];
  /**
   * Custom slot for rendering features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
  /**
   * Default icon for features
   */
  featureIcon?: React.ReactNode;
  /**
   * Default icon name for features
   */
  featureIconName?: string;
  /**
   * Primary action configuration
   */
  action?: ActionConfig;
  /**
   * Custom slot for rendering action (overrides action)
   */
  actionSlot?: React.ReactNode;
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
   * Additional CSS classes for the card
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the header
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the price wrapper
   */
  priceWrapperClassName?: string;
  /**
   * Additional CSS classes for the original price
   */
  originalPriceClassName?: string;
  /**
   * Additional CSS classes for the discounted price
   */
  discountedPriceClassName?: string;
  /**
   * Additional CSS classes for the price description
   */
  priceDescriptionClassName?: string;
  /**
   * Additional CSS classes for the separator
   */
  separatorClassName?: string;
  /**
   * Additional CSS classes for the feature list
   */
  featuresClassName?: string;
  /**
   * Additional CSS classes for the feature item
   */
  featureItemClassName?: string;
  /**
   * Additional CSS classes for the feature icon
   */
  featureIconClassName?: string;
  /**
   * Additional CSS classes for the feature text
   */
  featureTextClassName?: string;
  /**
   * Additional CSS classes for the action
   */
  actionClassName?: string;
}

/**
 * PricingDiscountCard displays a single pricing card with a discount badge and strikethrough original price.
 * Features a prominent discount indicator, feature list, and CTA button.
 * Ideal for promotional pricing, limited-time offers, or special deals.
 *
 * Perfect for landing pages highlighting a special offer or discount.
 *
 * @example
 * ```tsx
 * <PricingDiscountCard
 *   title="Pro Plan"
 *   description="Everything you need"
 *   originalPrice="$99"
 *   discountedPrice="$79"
 *   discountBadge="20% OFF"
 *   features={[{ text: "Feature 1" }, { text: "Feature 2" }]}
 *   action={{ label: "Get Started", href: "#" }}
 * />
 * ```
 */
export function PricingDiscountCard({
  title,
  description,
  originalPrice,
  discountedPrice,
  discountBadge,
  priceDescription,
  features,
  featuresSlot,
  featureIcon,
  featureIconName = "lucide/check",
  action,
  actionSlot,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName,
  cardClassName,
  badgeClassName,
  headerClassName,
  titleClassName,
  descriptionClassName,
  priceWrapperClassName,
  originalPriceClassName,
  discountedPriceClassName,
  priceDescriptionClassName,
  separatorClassName,
  featuresClassName,
  featureItemClassName,
  featureIconClassName,
  featureTextClassName,
  actionClassName,
}: PricingDiscountCardProps): React.JSX.Element {
  const renderFeatures = () => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return (
      <ul className={cn("space-y-3", featuresClassName)}>
        {features.map((feature, index) => {
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

  const renderAction = () => {
    if (actionSlot) return actionSlot;
    if (!action) return null;

    const {
      label,
      icon,
      iconAfter,
      children,
      className: actionItemClassName,
      ...pressableProps
    } = action;

    return (
      <Pressable
        asButton
        className={cn(
          "mt-8 w-full justify-center",
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

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
    >
      <div className={cn("mx-auto max-w-md", containerClassName)}>
        <div
          className={cn(
            "relative rounded-2xl border bg-card p-8 shadow-lg",
            cardClassName,
          )}
        >
          {discountBadge && (
            <div
              className={cn(
                "absolute -top-3 left-1/2 -translate-x-1/2",
                badgeClassName,
              )}
            >
              {typeof discountBadge === "string" ? (
                <Badge className="bg-primary hover:bg-primary/90">
                  {discountBadge}
                </Badge>
              ) : (
                discountBadge
              )}
            </div>
          )}

          <div className={cn("text-center", headerClassName)}>
            {title &&
              (typeof title === "string" ? (
                <h2 className={cn("text-2xl font-bold", titleClassName)}>
                  {title}
                </h2>
              ) : (
                <div className={titleClassName}>{title}</div>
              ))}
            {description &&
              (typeof description === "string" ? (
                <p
                  className={cn(
                    "mt-2 text-muted-foreground",
                    descriptionClassName,
                  )}
                >
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              ))}

            <div className={cn("mt-6", priceWrapperClassName)}>
              {originalPrice && (
                <span
                  className={cn(
                    "mr-2 text-2xl text-muted-foreground line-through",
                    originalPriceClassName,
                  )}
                >
                  {originalPrice}
                </span>
              )}
              {discountedPrice && (
                <span
                  className={cn("text-5xl font-bold", discountedPriceClassName)}
                >
                  {discountedPrice}
                </span>
              )}
              {priceDescription &&
                (typeof priceDescription === "string" ? (
                  <p
                    className={cn(
                      "mt-2 text-sm text-muted-foreground",
                      priceDescriptionClassName,
                    )}
                  >
                    {priceDescription}
                  </p>
                ) : (
                  <div className={priceDescriptionClassName}>
                    {priceDescription}
                  </div>
                ))}
            </div>
          </div>

          <Separator className={cn("my-6", separatorClassName)} />
          {renderFeatures()}
          {renderAction()}
        </div>
      </div>
    </Section>
  );
}
