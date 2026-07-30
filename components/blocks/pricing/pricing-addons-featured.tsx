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

export interface PricingAddonsFeaturedFeature {
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

export interface PricingAddonsFeaturedCard {
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
  features?: PricingAddonsFeaturedFeature[];
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
   * Highlight this add-on
   */
  isHighlighted?: boolean;
  /**
   * Additional CSS classes for the card
   */
  className?: string;
}

export interface PricingAddonsFeaturedAdditional {
  /**
   * Add-on name
   */
  name?: React.ReactNode;
  /**
   * Add-on description
   */
  description?: React.ReactNode;
  /**
   * Add-on price
   */
  price?: React.ReactNode;
  /**
   * Additional CSS classes for the item
   */
  className?: string;
}

export interface PricingAddonsFeaturedProps {
  /**
   * Section heading
   */
  heading?: React.ReactNode;
  /**
   * Supporting subtitle
   */
  subtitle?: React.ReactNode;
  /**
   * Featured add-on cards
   */
  featuredAddons?: PricingAddonsFeaturedCard[];
  /**
   * Custom slot for rendering featured add-ons (overrides featuredAddons array)
   */
  featuredAddonsSlot?: React.ReactNode;
  /**
   * Additional add-ons list
   */
  additionalAddons?: PricingAddonsFeaturedAdditional[];
  /**
   * Custom slot for rendering additional add-ons (overrides additionalAddons array)
   */
  additionalAddonsSlot?: React.ReactNode;
  /**
   * Additional add-ons heading
   */
  additionalHeading?: React.ReactNode;
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
   * Additional CSS classes for the featured grid
   */
  featuredGridClassName?: string;
  /**
   * Additional CSS classes for featured cards
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for highlighted cards
   */
  highlightedCardClassName?: string;
  /**
   * Additional CSS classes for card titles
   */
  cardTitleClassName?: string;
  /**
   * Additional CSS classes for card descriptions
   */
  cardDescriptionClassName?: string;
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
   * Additional CSS classes for action button
   */
  actionClassName?: string;
  /**
   * Additional CSS classes for additional add-ons section
   */
  additionalSectionClassName?: string;
  /**
   * Additional CSS classes for additional heading
   */
  additionalHeadingClassName?: string;
  /**
   * Additional CSS classes for additional grid
   */
  additionalGridClassName?: string;
  /**
   * Additional CSS classes for additional item
   */
  additionalItemClassName?: string;
  /**
   * Additional CSS classes for additional item title
   */
  additionalItemTitleClassName?: string;
  /**
   * Additional CSS classes for additional item description
   */
  additionalItemDescriptionClassName?: string;
  /**
   * Additional CSS classes for additional item price
   */
  additionalItemPriceClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * PricingAddonsFeatured displays featured add-on options with a secondary list of additional add-ons.
 * Features 3 highlighted add-on cards with feature lists, plus a compact list of smaller add-ons below.
 * Ideal for upselling additional features or services to existing customers.
 *
 * Perfect for pricing pages that want to showcase optional upgrades and add-ons.
 *
 * @example
 * ```tsx
 * <PricingAddonsFeatured
 *   heading="Enhance Your Plan"
 *   featuredAddons={[
 *     { name: "Analytics", description: "Deep insights", price: "$29", features: [{ text: "Feature 1" }] }
 *   ]}
 *   additionalAddons={[
 *     { name: "Extra Storage", description: "100GB more", price: "$10/month" }
 *   ]}
 * />
 * ```
 */
export function PricingAddonsFeatured({
  sectionId = "pricing-addons-featured",
  heading,
  subtitle,
  featuredAddons,
  featuredAddonsSlot,
  additionalAddons,
  additionalAddonsSlot,
  additionalHeading,
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
  featuredGridClassName,
  cardClassName,
  highlightedCardClassName,
  cardTitleClassName,
  cardDescriptionClassName,
  priceClassName,
  priceDescriptionClassName,
  featuresClassName,
  featureItemClassName,
  featureIconClassName,
  featureTextClassName,
  actionClassName,
  additionalSectionClassName,
  additionalHeadingClassName,
  additionalGridClassName,
  additionalItemClassName,
  additionalItemTitleClassName,
  additionalItemDescriptionClassName,
  additionalItemPriceClassName,
}: PricingAddonsFeaturedProps): React.JSX.Element {
  const renderFeatures = useMemo(() => {
    return (addon: PricingAddonsFeaturedCard) => {
    if (addon.featuresSlot) return addon.featuresSlot;
    if (!addon.features || addon.features.length === 0) return null;

    return (
      <ul className={cn("mb-6 flex-1 space-y-3", featuresClassName)}>
        {addon.features.map((feature, featureIndex) => {
          const resolvedIcon =
            feature.icon ??
            featureIcon ??
            (feature.iconName || featureIconName);

          return (
            <li
              key={featureIndex}
              className={cn(
                "flex items-start gap-3",
                featureItemClassName,
                feature.className,
              )}
            >
              {resolvedIcon === "" ? null : (
                <DynamicIcon
                  name={resolvedIcon}
                  size={16}
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
    };
  }, [featuresClassName, featureIcon, featureIconName, featureIconClassName, featureItemClassName, featureTextClassName]);

  const renderAction = useMemo(() => {
    return (addon: PricingAddonsFeaturedCard) => {
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
            {icon === "" ? null : <DynamicIcon name={icon} />}
            {label}
            {iconAfter === "" ? null : (
              <DynamicIcon name={iconAfter} />
            )}
          </>
        )}
      </Pressable>
    );
    };
  }, [actionClassName]);

  const renderFeatured = useMemo(() => {
    if (featuredAddonsSlot) return featuredAddonsSlot;
    if (!featuredAddons || featuredAddons.length === 0) return null;

    return (
      <div className={cn("grid gap-6 md:grid-cols-3", featuredGridClassName)}>
        {featuredAddons.map((addon, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-col rounded-2xl border p-6",
              addon.isHighlighted
                ? "border-primary bg-primary/5 shadow-lg"
                : "border-border",
              cardClassName,
              addon.isHighlighted ? highlightedCardClassName : null,
              addon.className,
            )}
          >
            <div className="mb-4">
              {addon.name &&
                (typeof addon.name === "string" ? (
                  <h3
                    className={cn("text-lg font-semibold", cardTitleClassName)}
                  >
                    {addon.name}
                  </h3>
                ) : (
                  <div className={cardTitleClassName}>{addon.name}</div>
                ))}
              {addon.description &&
                (typeof addon.description === "string" ? (
                  <p
                    className={cn(
                      "mt-2 text-sm text-muted-foreground",
                      cardDescriptionClassName,
                    )}
                  >
                    {addon.description}
                  </p>
                ) : (
                  <div className={cardDescriptionClassName}>
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
  }, [featuredAddonsSlot, featuredAddons, featuredGridClassName, cardClassName, highlightedCardClassName, cardTitleClassName, cardDescriptionClassName, priceClassName, priceDescriptionClassName, renderFeatures, renderAction]);

  const renderAdditional = useMemo(() => {
    if (additionalAddonsSlot) return additionalAddonsSlot;
    if (!additionalAddons || additionalAddons.length === 0) return null;

    return (
      <div className={cn("mt-16", additionalSectionClassName)}>
        {additionalHeading &&
          (typeof additionalHeading === "string" ? (
            <h3
              className={cn(
                "mb-6 text-xl font-semibold",
                additionalHeadingClassName,
              )}
            >
              {additionalHeading}
            </h3>
          ) : (
            <div className={additionalHeadingClassName}>
              {additionalHeading}
            </div>
          ))}
        <div
          className={cn("grid gap-4 md:grid-cols-2", additionalGridClassName)}
        >
          {additionalAddons.map((addon, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center justify-between rounded-lg border p-4",
                additionalItemClassName,
                addon.className,
              )}
            >
              <div>
                {addon.name &&
                  (typeof addon.name === "string" ? (
                    <h4
                      className={cn(
                        "font-medium",
                        additionalItemTitleClassName,
                      )}
                    >
                      {addon.name}
                    </h4>
                  ) : (
                    <div className={additionalItemTitleClassName}>
                      {addon.name}
                    </div>
                  ))}
                {addon.description &&
                  (typeof addon.description === "string" ? (
                    <p
                      className={cn(
                        "text-sm text-muted-foreground",
                        additionalItemDescriptionClassName,
                      )}
                    >
                      {addon.description}
                    </p>
                  ) : (
                    <div className={additionalItemDescriptionClassName}>
                      {addon.description}
                    </div>
                  ))}
              </div>
              {addon.price && (
                <div
                  className={cn(
                    "ml-4 text-right",
                    additionalItemPriceClassName,
                  )}
                >
                  <span className="font-semibold">{addon.price}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }, [additionalAddonsSlot, additionalAddons, additionalSectionClassName, additionalHeading, additionalHeadingClassName, additionalGridClassName, additionalItemClassName, additionalItemTitleClassName, additionalItemDescriptionClassName, additionalItemPriceClassName]);

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

        {renderFeatured}
        {renderAdditional}
      </div>
    </Section>
  );
}
