"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Separator } from "../../ui/separator";
import { Section } from "../../ui/section";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

export interface PricingSingleCardFeature {
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
   * Additional CSS classes for the feature icon
   */
  iconClassName?: string;
  /**
   * Additional CSS classes for the feature text
   */
  textClassName?: string;
}

export interface PricingSingleCardFeatureGroup {
  /**
   * Group title
   */
  title?: React.ReactNode;
  /**
   * Group features
   */
  features?: PricingSingleCardFeature[];
  /**
   * Custom slot for rendering group features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the group
   */
  className?: string;
}

export interface PricingSingleCardProps {
  /**
   * Main heading
   */
  heading?: React.ReactNode;
  /**
   * Supporting description
   */
  description?: React.ReactNode;
  /**
   * Price display
   */
  price?: React.ReactNode;
  /**
   * Price description/subtext
   */
  priceDescription?: React.ReactNode;
  /**
   * Grouped feature sections
   */
  featureGroups?: PricingSingleCardFeatureGroup[];
  /**
   * Custom slot for rendering feature groups (overrides featureGroups array)
   */
  featureGroupsSlot?: React.ReactNode;
  /**
   * Default icon used for features
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
   * Additional CSS classes for the price
   */
  priceClassName?: string;
  /**
   * Additional CSS classes for the price description
   */
  priceDescriptionClassName?: string;
  /**
   * Additional CSS classes for the action
   */
  actionClassName?: string;
  /**
   * Additional CSS classes for the separator
   */
  separatorClassName?: string;
  /**
   * Additional CSS classes for the groups grid
   */
  groupsClassName?: string;
  /**
   * Additional CSS classes for group titles
   */
  groupTitleClassName?: string;
  /**
   * Additional CSS classes for group feature list
   */
  groupFeaturesClassName?: string;
  /**
   * Additional CSS classes for group feature items
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
}

/**
 * PricingSingleCard displays a single comprehensive pricing card with grouped features.
 * Features are organized into sections with titles, making it easy to understand what's included.
 * Ideal for products with a single pricing tier or for highlighting a featured plan.
 *
 * Perfect for simple pricing pages or as a standalone pricing component within a larger page.
 *
 * @example
 * ```tsx
 * <PricingSingleCard
 *   heading="Professional Plan"
 *   description="Everything you need to grow your business"
 *   price="$99"
 *   featureGroups={[
 *     { title: "Core Features", features: [{ text: "Feature 1" }, { text: "Feature 2" }] }
 *   ]}
 *   action={{ label: "Get Started", href: "#" }}
 * />
 * ```
 */
export function PricingSingleCard({
  heading,
  description,
  price,
  priceDescription,
  featureGroups,
  featureGroupsSlot,
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
  headingClassName,
  descriptionClassName,
  priceClassName,
  priceDescriptionClassName,
  actionClassName,
  separatorClassName,
  groupsClassName,
  groupTitleClassName,
  groupFeaturesClassName,
  featureItemClassName,
  featureIconClassName,
  featureTextClassName,
}: PricingSingleCardProps): React.JSX.Element {
  const renderGroupFeatures = useMemo(() => {
    return (group: PricingSingleCardFeatureGroup) => {
      if (group.featuresSlot) return group.featuresSlot;
      if (!group.features || group.features.length === 0) return null;

      return (
        <ul className={cn("space-y-3", groupFeaturesClassName)}>
          {group.features.map((feature, featureIndex) => {
            const resolvedIcon =
              feature.icon ??
              featureIcon ??
              (feature.iconName || featureIconName ? (
                <DynamicIcon
                  name={feature.iconName || featureIconName}
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
  }, [groupFeaturesClassName, featureIcon, featureIconName, featureIconClassName, featureItemClassName, featureTextClassName]);

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
          "mt-8 w-full justify-center sm:w-auto sm:px-12",
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
  }, [actionSlot, action, actionClassName]);

  const renderGroups = useMemo(() => {
    if (featureGroupsSlot) return featureGroupsSlot;
    if (!featureGroups || featureGroups.length === 0) return null;

    return (
      <div className={cn("grid gap-8 md:grid-cols-3", groupsClassName)}>
        {featureGroups.map((group, groupIndex) => (
          <div key={groupIndex} className={group.className}>
            {group.title &&
              (typeof group.title === "string" ? (
                <h3 className={cn("mb-4 font-semibold", groupTitleClassName)}>
                  {group.title}
                </h3>
              ) : (
                <div className={groupTitleClassName}>{group.title}</div>
              ))}
            {renderGroupFeatures(group)}
          </div>
        ))}
      </div>
    );
  }, [featureGroupsSlot, featureGroups, groupsClassName, groupTitleClassName, renderGroupFeatures]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
    >
      <div className={cn("mx-auto max-w-2xl", containerClassName)}>
        <div
          className={cn(
            "rounded-2xl border p-8 shadow-lg md:p-12",
            getNestedCardBg(background, "card"),
            getNestedCardTextColor(background),
            cardClassName,
          )}
        >
          <div className={cn("text-center", headerClassName)}>
            {heading &&
              (typeof heading === "string" ? (
                <h2
                  className={cn(
                    "text-2xl font-bold tracking-tight sm:text-3xl",
                    headingClassName,
                  )}
                >
                  {heading}
                </h2>
              ) : (
                <div className={headingClassName}>{heading}</div>
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

            <div className="mt-8">
              {price && (
                <span className={cn("text-5xl font-bold", priceClassName)}>
                  {price}
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

            {renderAction}
          </div>

          <Separator className={cn("my-8", separatorClassName)} />
          {renderGroups}
        </div>
      </div>
    </Section>
  );
}
