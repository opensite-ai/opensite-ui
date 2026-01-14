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

export interface PricingSpotlightCardFeature {
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

export interface PricingSpotlightCardProps {
  /**
   * Card title
   */
  title?: React.ReactNode;
  /**
   * Eyebrow/subtitle text
   */
  subtitle?: React.ReactNode;
  /**
   * Price display
   */
  price?: React.ReactNode;
  /**
   * Price description or interval
   */
  priceDescription?: React.ReactNode;
  /**
   * Supporting description
   */
  description?: React.ReactNode;
  /**
   * Feature list
   */
  features?: PricingSpotlightCardFeature[];
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
   * Call-to-action buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Fine print text below actions
   */
  finePrint?: React.ReactNode;
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
   * Additional CSS classes for the spotlight wrapper
   */
  spotlightClassName?: string;
  /**
   * Additional CSS classes for the glow layer
   */
  glowClassName?: string;
  /**
   * Additional CSS classes for the card
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the header area
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the subtitle
   */
  subtitleClassName?: string;
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
   * Additional CSS classes for the feature icon wrapper
   */
  featureIconWrapperClassName?: string;
  /**
   * Additional CSS classes for feature icons
   */
  featureIconClassName?: string;
  /**
   * Additional CSS classes for feature text
   */
  featureTextClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the action buttons
   */
  actionClassName?: string;
  /**
   * Additional CSS classes for the fine print
   */
  finePrintClassName?: string;
}

/**
 * PricingSpotlightCard displays a single premium pricing card with a spotlight/glow effect.
 * Features a gradient border, prominent pricing display, and dual CTA buttons.
 * Ideal for highlighting a single premium offering or featured plan.
 *
 * Perfect for landing pages showcasing a flagship product or service.
 *
 * @example
 * ```tsx
 * <PricingSpotlightCard
 *   title="Premium Plan"
 *   subtitle="Everything you need"
 *   price="$99"
 *   features={[{ text: "Feature 1" }, { text: "Feature 2" }]}
 *   actions={[{ label: "Get Started", href: "#" }]}
 * />
 * ```
 */
export function PricingSpotlightCard({
  title,
  subtitle,
  price,
  priceDescription,
  description,
  features,
  featuresSlot,
  featureIcon,
  featureIconName = "lucide/check",
  actions,
  actionsSlot,
  finePrint,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName,
  spotlightClassName,
  glowClassName,
  cardClassName,
  headerClassName,
  subtitleClassName,
  titleClassName,
  descriptionClassName,
  priceClassName,
  priceDescriptionClassName,
  featuresClassName,
  featureItemClassName,
  featureIconWrapperClassName,
  featureIconClassName,
  featureTextClassName,
  actionsClassName,
  actionClassName,
  finePrintClassName,
}: PricingSpotlightCardProps): React.JSX.Element {
  const renderFeatures = () => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return (
      <ul className={cn("mt-8 space-y-4", featuresClassName)}>
        {features.map((feature, index) => {
          const resolvedIcon = feature.icon
            ?? featureIcon
            ?? (feature.iconName || featureIconName ? (
              <DynamicIcon
                name={feature.iconName || featureIconName}
                size={14}
                className={cn("text-primary", featureIconClassName, feature.iconClassName)}
              />
            ) : null);

          return (
            <li key={index} className={cn("flex items-start gap-3", featureItemClassName, feature.className)}>
              {resolvedIcon && (
                <div className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10", featureIconWrapperClassName)}>
                  {resolvedIcon}
                </div>
              )}
              {feature.text && (
                typeof feature.text === "string" ? (
                  <span className={cn("text-muted-foreground", featureTextClassName, feature.textClassName)}>
                    {feature.text}
                  </span>
                ) : (
                  <div className={cn("text-muted-foreground", featureTextClassName, feature.textClassName)}>
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

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
      const { label, icon, iconAfter, children, className: actionItemClassName, ...pressableProps } = action;

      return (
        <Pressable
          key={index}
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
    });
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
      <div className={cn("mx-auto max-w-lg", containerClassName)}>
        <div className={cn("relative", spotlightClassName)}>
          <div
            className={cn(
              "absolute -inset-1 rounded-3xl bg-linear-to-r from-primary/50 via-primary to-primary/50 opacity-75 blur-lg",
              glowClassName
            )}
          />

          <div className={cn("relative rounded-2xl border bg-card p-8 shadow-2xl md:p-10", cardClassName)}>
            <div className={cn("text-center", headerClassName)}>
              {subtitle && (
                typeof subtitle === "string" ? (
                  <p className={cn("text-sm font-medium uppercase tracking-wide text-primary", subtitleClassName)}>
                    {subtitle}
                  </p>
                ) : (
                  <div className={subtitleClassName}>{subtitle}</div>
                )
              )}
              {title && (
                typeof title === "string" ? (
                  <h2 className={cn("mt-2 text-3xl font-bold tracking-tight", titleClassName)}>
                    {title}
                  </h2>
                ) : (
                  <div className={titleClassName}>{title}</div>
                )
              )}
              {description && (
                typeof description === "string" ? (
                  <p className={cn("mt-2 text-muted-foreground", descriptionClassName)}>{description}</p>
                ) : (
                  <div className={descriptionClassName}>{description}</div>
                )
              )}

              {(price || priceDescription) && (
                <div className="mt-8">
                  {price && (
                    <span className={cn("text-6xl font-bold", priceClassName)}>{price}</span>
                  )}
                  {priceDescription && (
                    <span className={cn("text-xl text-muted-foreground", priceDescriptionClassName)}>
                      {priceDescription}
                    </span>
                  )}
                </div>
              )}
            </div>

            {renderFeatures()}

            {(actionsSlot || (actions && actions.length > 0)) && (
              <div className={cn("mt-10 space-y-3", actionsClassName)}>
                {renderActions()}
              </div>
            )}

            {finePrint && (
              typeof finePrint === "string" ? (
                <p className={cn("mt-6 text-center text-sm text-muted-foreground", finePrintClassName)}>
                  {finePrint}
                </p>
              ) : (
                <div className={finePrintClassName}>{finePrint}</div>
              )
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
