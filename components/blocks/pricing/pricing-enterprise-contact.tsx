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

export interface PricingEnterpriseContactFeature {
  /**
   * Feature title
   */
  name?: React.ReactNode;
  /**
   * Feature description
   */
  description?: React.ReactNode;
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
   * Additional CSS classes for the icon wrapper
   */
  iconWrapperClassName?: string;
  /**
   * Additional CSS classes for the icon
   */
  iconClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
}

export interface PricingEnterpriseContactProps {
  /**
   * Main title
   */
  title?: React.ReactNode;
  /**
   * Eyebrow/subtitle
   */
  subtitle?: React.ReactNode;
  /**
   * Supporting description
   */
  description?: React.ReactNode;
  /**
   * Feature list
   */
  features?: PricingEnterpriseContactFeature[];
  /**
   * Custom slot for rendering features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
  /**
   * Default icon used for features
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
   * Additional CSS classes for the content grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for the content column
   */
  contentClassName?: string;
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
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the action buttons
   */
  actionClassName?: string;
  /**
   * Additional CSS classes for the features column
   */
  featuresClassName?: string;
}

/**
 * PricingEnterpriseContact displays an enterprise-focused pricing section with contact CTA.
 * Features a list of enterprise benefits with descriptions and prominent contact buttons.
 * No specific pricing shown - designed for custom enterprise quotes.
 *
 * Ideal for enterprise sales pages or as a complement to standard pricing tiers.
 *
 * @example
 * ```tsx
 * <PricingEnterpriseContact
 *   title="Enterprise"
 *   subtitle="For large organizations"
 *   features={[
 *     { name: "Unlimited everything", description: "No limits" }
 *   ]}
 *   actions={[{ label: "Contact Sales", href: "#" }]}
 * />
 * ```
 */
export function PricingEnterpriseContact({
  title,
  subtitle,
  description,
  features,
  featuresSlot,
  featureIcon,
  featureIconName,
  actions,
  actionsSlot,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName,
  cardClassName,
  gridClassName,
  contentClassName,
  subtitleClassName,
  titleClassName,
  descriptionClassName,
  actionsClassName,
  actionClassName,
  featuresClassName,
}: PricingEnterpriseContactProps): React.JSX.Element {
  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
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
          key={index}
          asButton
          className={cn(actionClassName, actionItemClassName)}
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
  }, [actionsSlot, actions, actionClassName]);

  const renderFeatures = useMemo(() => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return features.map((feature, index) => {
      const resolvedIcon =
        feature.icon ??
        featureIcon ??
        (feature.iconName || featureIconName ? (
          <DynamicIcon
            name={feature.iconName || featureIconName}
            size={16}
            className={cn("text-primary", feature.iconClassName)}
          />
        ) : null);

      return (
        <div key={index} className={cn("flex gap-4", feature.className)}>
          {resolvedIcon && (
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10",
                feature.iconWrapperClassName,
              )}
            >
              {resolvedIcon}
            </div>
          )}
          <div>
            {feature.name &&
              (typeof feature.name === "string" ? (
                <h3 className={cn("font-medium", feature.titleClassName)}>
                  {feature.name}
                </h3>
              ) : (
                <div className={feature.titleClassName}>{feature.name}</div>
              ))}
            {feature.description &&
              (typeof feature.description === "string" ? (
                <p
                  className={cn(
                    "text-sm text-muted-foreground",
                    feature.descriptionClassName,
                  )}
                >
                  {feature.description}
                </p>
              ) : (
                <div className={feature.descriptionClassName}>
                  {feature.description}
                </div>
              ))}
          </div>
        </div>
      );
    });
  }, [featuresSlot, features, featureIcon, featureIconName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
    >
      <div className={cn("mx-auto max-w-4xl", containerClassName)}>
        <div
          className={cn(
            "rounded-2xl border bg-linear-to-br from-muted/50 to-muted p-8 md:p-12",
            cardClassName,
          )}
        >
          <div className={cn("grid gap-8 md:grid-cols-2", gridClassName)}>
            <div className={contentClassName}>
              {subtitle &&
                (typeof subtitle === "string" ? (
                  <p
                    className={cn(
                      "text-sm font-medium uppercase tracking-wide text-primary",
                      subtitleClassName,
                    )}
                  >
                    {subtitle}
                  </p>
                ) : (
                  <div className={subtitleClassName}>{subtitle}</div>
                ))}
              {title &&
                (typeof title === "string" ? (
                  <h2
                    className={cn(
                      "mt-2 text-3xl font-bold tracking-tight",
                      titleClassName,
                    )}
                  >
                    {title}
                  </h2>
                ) : (
                  <div className={titleClassName}>{title}</div>
                ))}
              {description &&
                (typeof description === "string" ? (
                  <p
                    className={cn(
                      "mt-4 text-muted-foreground",
                      descriptionClassName,
                    )}
                  >
                    {description}
                  </p>
                ) : (
                  <div className={descriptionClassName}>{description}</div>
                ))}

              {(actionsSlot || (actions && actions.length > 0)) && (
                <div
                  className={cn(
                    "mt-8 flex flex-col gap-3 sm:flex-row",
                    actionsClassName,
                  )}
                >
                  {renderActions}
                </div>
              )}
            </div>

            <div className={cn("space-y-4", featuresClassName)}>
              {renderFeatures}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
