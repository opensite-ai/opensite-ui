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

export interface PricingAddonsCardsFeature {
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

export interface PricingAddonsCard {
  /**
   * Add-on name
   */
  name?: React.ReactNode;
  /**
   * Add-on description
   */
  description?: React.ReactNode;
  /**
   * Price display
   */
  price?: React.ReactNode;
  /**
   * Price description/interval
   */
  priceDescription?: React.ReactNode;
  /**
   * Feature list
   */
  features?: PricingAddonsCardsFeature[];
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
   * Additional CSS classes for the card
   */
  className?: string;
}

export interface PricingAddonsCardsProps {
  /**
   * Section heading
   */
  heading?: React.ReactNode;
  /**
   * Supporting subtitle
   */
  subtitle?: React.ReactNode;
  /**
   * Add-on cards
   */
  addons?: PricingAddonsCard[];
  /**
   * Custom slot for rendering add-ons (overrides addons array)
   */
  addonsSlot?: React.ReactNode;
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
   * Additional CSS classes for addon cards
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for addon titles
   */
  addonTitleClassName?: string;
  /**
   * Additional CSS classes for addon description
   */
  addonDescriptionClassName?: string;
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
 * PricingAddonsCards displays a row of 3 add-on cards with feature lists.
 * Each card includes a name, description, price, feature checklist, and CTA button.
 * Simpler version of PricingAddonsFeatured without the additional add-ons list.
 *
 * Ideal for showcasing optional upgrades or premium features.
 *
 * @example
 * ```tsx
 * <PricingAddonsCards
 *   heading="Power-ups"
 *   subtitle="Enhance your experience"
 *   addons={[
 *     { name: "Analytics", description: "Deep insights", price: "$19", features: [{ text: "Feature 1" }] }
 *   ]}
 * />
 * ```
 */
export function PricingAddonsCards({
  heading,
  subtitle,
  addons,
  addonsSlot,
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
  addonTitleClassName,
  addonDescriptionClassName,
  priceClassName,
  priceDescriptionClassName,
  featuresClassName,
  featureItemClassName,
  featureIconClassName,
  featureTextClassName,
  actionClassName,
}: PricingAddonsCardsProps): React.JSX.Element {
  const renderFeatures = useMemo(() => {
    return (addon: PricingAddonsCard) => {
      if (addon.featuresSlot) return addon.featuresSlot;
      if (!addon.features || addon.features.length === 0) return null;

      return (
        <ul className={cn("mb-6 flex-1 space-y-3", featuresClassName)}>
          {addon.features.map((feature, featureIndex) => {
            const iconName = feature.iconName || featureIconName;
            const resolvedIcon =
              feature.icon ??
              featureIcon ??
              (iconName ? (
                <DynamicIcon
                  name={iconName}
                  size={16}
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
    return (addon: PricingAddonsCard) => {
      if (addon.actionSlot) return addon.actionSlot;
      if (!addon.action) return null;

      const {
        label,
        icon,
        iconAfter,
        children,
        className: actionItemClassName,
        ...pressableProps
      } = addon.action;

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

  const renderAddons = useMemo(() => {
    if (addonsSlot) return addonsSlot;
    if (!addons || addons.length === 0) return null;

    return (
      <div className={cn("grid gap-6 md:grid-cols-3", gridClassName)}>
        {addons.map((addon, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-col rounded-2xl border p-6",
              cardClassName,
              addon.className,
            )}
          >
            <div className="mb-4">
              {addon.name &&
                (typeof addon.name === "string" ? (
                  <h3
                    className={cn("text-lg font-semibold", addonTitleClassName)}
                  >
                    {addon.name}
                  </h3>
                ) : (
                  <div className={addonTitleClassName}>{addon.name}</div>
                ))}
              {addon.description &&
                (typeof addon.description === "string" ? (
                  <p
                    className={cn(
                      "mt-2 text-sm text-muted-foreground",
                      addonDescriptionClassName,
                    )}
                  >
                    {addon.description}
                  </p>
                ) : (
                  <div className={addonDescriptionClassName}>
                    {addon.description}
                  </div>
                ))}
            </div>

            <div className="mb-6">
              {addon.price && (
                <span className={cn("text-3xl font-bold", priceClassName)}>
                  {addon.price}
                </span>
              )}
              {addon.priceDescription && (
                <span
                  className={cn(
                    "text-muted-foreground",
                    priceDescriptionClassName,
                  )}
                >
                  {addon.priceDescription}
                </span>
              )}
            </div>

            {renderFeatures(addon)}
            {renderAction(addon)}
          </div>
        ))}
      </div>
    );
  }, [addonsSlot, addons, gridClassName, cardClassName, addonTitleClassName, addonDescriptionClassName, priceClassName, priceDescriptionClassName, renderFeatures, renderAction]);

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

        {renderAddons}
      </div>
    </Section>
  );
}
