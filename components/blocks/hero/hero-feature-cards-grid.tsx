"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn, getTextColor, getAccentColor, getBorderColor, getNestedCardBg } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type {ActionConfig, FeatureItem, SectionBackground, SectionSpacing} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";

export interface HeroFeatureCardsGridProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Array of feature items
   */
  features?: Array<FeatureItem & { iconName?: string }>;
  /**
   * Custom slot for features (overrides features array)
   */
  featuresSlot?: React.ReactNode;  /**
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
   * Additional CSS classes for the content area
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the features container
   */
  featuresClassName?: string;
}

export function HeroFeatureCardsGrid({
  heading,
  description,
  actions,
  actionsSlot,
  features,
  featuresSlot,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  featuresClassName,
}: HeroFeatureCardsGridProps): React.JSX.Element {
  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className={cn("mt-10 flex flex-col justify-center gap-4 sm:flex-row", actionsClassName)}>
        {actions.map((action, index) => {
          const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
          return (
            <Pressable
              key={index}
              asButton
              className={actionClassName}
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
        })}
      </div>
    );
  }, [actionsSlot, actions, actionsClassName]);

  const renderFeatures = useMemo(() => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return (
      <div className={cn("mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4", featuresClassName)}>
        {features.map((feature, index) => (
          <div
            key={index}
            className={cn("group rounded-2xl border border-border p-6 transition-all hover:shadow-lg", getNestedCardBg(background, "card"), `hover:${getBorderColor(background, "accent")}/50`)}
          >
            <div className={cn("mb-4 flex h-12 w-12 items-center justify-center rounded-lg transition-colors", `${getAccentColor(background)}/10 ${getAccentColor(background)}`, `group-hover:${getAccentColor(background)} group-hover:text-primary-foreground`)}>
              {feature.icon ?? <DynamicIcon name={feature.iconName || "lucide/check"} size={24} />}
            </div>
            <h3 className="mb-2 text-lg font-semibold ">
              {feature.title}
            </h3>
            {feature.description && (
              <p className={cn("text-sm", getTextColor(background, "muted"))}>
                {feature.description}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  }, [featuresSlot, features, featuresClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <div className={cn("container", containerClassName)}>
        <div className={cn("mx-auto max-w-3xl text-center", contentClassName)}>
          {heading && (
            typeof heading === "string" ? (
              <h1 className={cn("text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl", headingClassName)}>
                {heading}
              </h1>
            ) : (
              <h1 className={cn("text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl", headingClassName)}>
                {heading}
              </h1>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("mt-6 text-lg", getTextColor(background, "muted"), descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
          {renderActions}
        </div>
        {renderFeatures}
      </div>
    </Section>
  );
}
