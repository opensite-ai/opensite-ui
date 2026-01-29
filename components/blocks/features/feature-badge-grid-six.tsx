"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn, getTextColor } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { ActionConfig, SectionBackground, SectionSpacing } from "../../../src/types";

export interface FeatureBadgeGridSixItem {
  /**
   * Icon element (overrides iconName)
   */
  icon?: React.ReactNode;
  /**
   * Icon name in format: prefix/name (e.g., "lucide/git-pull-request")
   */
  iconName?: string;
  /**
   * Feature heading content
   */
  heading?: React.ReactNode;
  /**
   * Feature description content
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the item
   */
  className?: string;
  /**
   * Additional CSS classes for the icon
   */
  iconClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
}

export interface FeatureBadgeGridSixProps {
  /**
   * Badge label content
   */
  label?: React.ReactNode;
  /**
   * Custom badge slot (overrides label)
   */
  badgeSlot?: React.ReactNode;
  /**
   * Main heading content
   */
  title?: React.ReactNode;
  /**
   * Array of feature items
   */
  features?: FeatureBadgeGridSixItem[];
  /**
   * Custom slot for rendering features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
  /**
   * Button action configuration
   */
  action?: ActionConfig;
  /**
   * Custom slot for action button (overrides action)
   */
  actionSlot?: React.ReactNode;
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
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each card
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the action container
   */
  actionContainerClassName?: string;
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
}

/**
 * Feature Badge Grid Six - Six-feature grid with badge header and centered CTA button.
 *
 * Layout: Badge header, two-column grid of six features, centered CTA button.
 * Key features: Badge label, icon badges in accent circles, large heading, CTA button.
 * Best for: Feature overviews, capability lists, product highlights.
 *
 * @example
 * ```tsx
 * <FeatureBadgeGridSix
 *   label="Features"
 *   title="Fully featured components"
 *   features={[
 *     { iconName: "lucide/git-pull-request", heading: "Quality", description: "Built with care" },
 *   ]}
 *   action={{ label: "More Features", href: "/features" }}
 * />
 * ```
 */
export function FeatureBadgeGridSix({
  label,
  badgeSlot,
  title,
  features,
  featuresSlot,
  action,
  actionSlot,
  className,
  containerClassName,
  headerClassName,
  badgeClassName,
  titleClassName,
  gridClassName,
  cardClassName,
  actionContainerClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
}: FeatureBadgeGridSixProps): React.JSX.Element {
  const badgeContent = useMemo(() => {
    if (badgeSlot) return badgeSlot;
    if (!label) return null;
    return <Badge variant="secondary" className={badgeClassName}>{label}</Badge>;
  }, [badgeSlot, label, badgeClassName]);

  const renderFeatureIcon = useCallback((feature: FeatureBadgeGridSixItem) => {
    if (feature.icon) return feature.icon;
    if (feature.iconName) {
      return (
        <DynamicIcon
          name={feature.iconName}
          size={16}
          className={cn("md:size-6", feature.iconClassName)}
        />
      );
    }
    return null;
  }, []);

  const featuresContent = useMemo(() => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return features.map((feature, index) => {
      const iconContent = renderFeatureIcon(feature);

      return (
        <div
          key={index}
          className={cn("flex gap-6 space-y-4 rounded-lg md:block", cardClassName, feature.className)}
        >
          {iconContent && (
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground md:size-12">
              {iconContent}
            </span>
          )}
          <div>
            {feature.heading && (
              typeof feature.heading === "string" ? (
                <h3 className={cn("font-medium md:mb-2 md:text-xl", feature.headingClassName)}>
                  {feature.heading}
                </h3>
              ) : (
                <div className={cn("font-medium md:mb-2 md:text-xl", feature.headingClassName)}>
                  {feature.heading}
                </div>
              )
            )}
            {feature.description && (
              typeof feature.description === "string" ? (
                <p className={cn("text-sm md:text-base", getTextColor(background, 'muted'), feature.descriptionClassName)}>
                  {feature.description}
                </p>
              ) : (
                <div className={cn("text-sm md:text-base", getTextColor(background, 'muted'), feature.descriptionClassName)}>
                  {feature.description}
                </div>
              )
            )}
          </div>
        </div>
      );
    });
  }, [featuresSlot, features, cardClassName, renderFeatureIcon]);

  const actionContent = useMemo(() => {
    if (actionSlot) return actionSlot;
    if (!action) return null;

    if (action.children) {
      return (
        <Pressable
          href={action.href}
          onClick={action.onClick}
          size="lg"
          variant={action.variant || "default"}
          asButton
          className={action.className}
          aria-label={action["aria-label"]}
        >
          {action.children}
        </Pressable>
      );
    }

    return (
      <Pressable
        href={action.href}
        onClick={action.onClick}
        size="lg"
        variant={action.variant || "default"}
        asButton
        className={action.className}
        aria-label={action["aria-label"]}
      >
        {action.icon}
        {action.label}
        {action.iconAfter}
      </Pressable>
    );
  }, [actionSlot, action]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName={containerClassName}
    >
      {(label || badgeSlot || title) && (
        <div className={cn("mb-12 flex max-w-3xl flex-col gap-4", headerClassName)}>
          {badgeContent}
          {title && (
            typeof title === "string" ? (
              <h2 className={cn("text-3xl font-medium md:text-4xl lg:text-5xl", titleClassName)}>
                {title}
              </h2>
            ) : (
              <div className={cn("text-3xl font-medium md:text-4xl lg:text-5xl", titleClassName)}>
                {title}
              </div>
            )
          )}
        </div>
      )}
      <div className={cn("grid gap-12 md:grid-cols-2", gridClassName)}>
        {featuresContent}
      </div>
      {(action || actionSlot) && (
        <div className={cn("mt-16 flex justify-center", actionContainerClassName)}>
          {actionContent}
        </div>
      )}
    </Section>
  );
}
