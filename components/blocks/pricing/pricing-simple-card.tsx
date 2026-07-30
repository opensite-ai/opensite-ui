"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Card } from "../../ui/card";
import { Section } from "../../ui/section";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

export interface PricingSimpleCardFeature {
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

export interface PricingSimpleCardProps {
  /**
   * Plan title
   */
  title?: React.ReactNode;
  /**
   * Supporting description
   */
  description?: React.ReactNode;
  /**
   * Main price display
   */
  price?: React.ReactNode;
  /**
   * Price interval text (e.g., /month)
   */
  priceInterval?: React.ReactNode;
  /**
   * Feature list
   */
  features?: PricingSimpleCardFeature[];
  /**
   * Custom slot for rendering features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
  /**
   * Default icon used for features if none provided
   */
  featureIcon?: React.ReactNode | string;
  /**
   * Default icon name used for features if none provided
   */
  featureIconName?: string;
  /**
   * Primary action configuration
   */
  action?: ActionConfig;
  /**
   * Custom slot for rendering the action (overrides action)
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
   * Additional CSS classes for the header area
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
   * Additional CSS classes for the price
   */
  priceClassName?: string;
  /**
   * Additional CSS classes for the price interval
   */
  priceIntervalClassName?: string;
  /**
   * Additional CSS classes for the price wrapper
   */
  priceWrapperClassName?: string;
  /**
   * Additional CSS classes for the features list
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
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * PricingSimpleCard displays a single, minimal pricing card with a feature list.
 * Clean and focused design with a prominent price display and CTA button.
 * Ideal for products with a single pricing tier or as a featured plan highlight.
 *
 * Perfect for landing pages or simple pricing sections.
 *
 * @example
 * ```tsx
 * <PricingSimpleCard
 *   title="Pro Plan"
 *   description="Everything you need"
 *   price="$49"
 *   priceInterval="/month"
 *   features={[{ text: "Feature 1" }, { text: "Feature 2" }]}
 *   action={{ label: "Get Started", href: "#" }}
 * />
 * ```
 */
export function PricingSimpleCard({
  sectionId = "pricing-simple-card",
  title,
  description,
  price,
  priceInterval,
  features,
  featuresSlot,
  featureIcon,
  featureIconName,
  action,
  actionSlot,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName,
  cardClassName,
  headerClassName,
  titleClassName,
  descriptionClassName,
  priceClassName,
  priceIntervalClassName,
  priceWrapperClassName,
  featuresClassName,
  featureItemClassName,
  featureIconClassName,
  featureTextClassName,
  actionClassName,
}: PricingSimpleCardProps): React.JSX.Element {
  const renderFeatures = useMemo(() => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return (
      <ul className={cn("mt-8 space-y-3", featuresClassName)}>
        {features.map((feature, index) => {
          const resolvedIcon =
            feature.icon ??
            featureIcon ??
            (feature.iconName || featureIconName);

          return (
            <li
              key={index}
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
  }, [featuresSlot, features, featuresClassName, featureIcon, featureIconName, featureIconClassName, featureItemClassName, featureTextClassName]);

  const renderAction = useMemo(() => {
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
            {icon === "" ? null : <DynamicIcon name={icon} />}
            {label}
            {iconAfter === "" ? null : <DynamicIcon name={iconAfter} />}
          </>
        )}
      </Pressable>
    );
  }, [actionSlot, action, actionClassName]);

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
      <div className={cn("mx-auto max-w-md", containerClassName)}>
        <Card className={cn("p-8", cardClassName)}>
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

            {(price || priceInterval) && (
              <div className={cn("mt-6", priceWrapperClassName)}>
                {price && (
                  <span className={cn("text-5xl font-bold", priceClassName)}>
                    {price}
                  </span>
                )}
                {priceInterval && (
                  <span
                    className={cn(
                      "text-muted-foreground",
                      priceIntervalClassName,
                    )}
                  >
                    {priceInterval}
                  </span>
                )}
              </div>
            )}
          </div>

          {renderFeatures}
          {renderAction}
        </Card>
      </div>
    </Section>
  );
}
