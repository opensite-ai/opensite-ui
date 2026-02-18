"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  FeatureItem,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Badge } from "@/src";
import { BlockActions } from "@/components/ui/block-actions";

export interface HeroCenteredGradientCtaProps {
  /**
   * Badge/announcement content
   */
  badge?: React.ReactNode;
  /**
   * Badge icon
   */
  badgeIcon?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Highlighted text within heading (gradient styled)
   */
  headingHighlight?: string;
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
   * Array of feature/benefit items
   */
  features?: FeatureItem[];
  /**
   * Custom slot for rendering features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
  /**
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
   * Additional CSS classes for the gradient background
   */
  gradientClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
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

export function HeroCenteredGradientCta({
  badge,
  badgeIcon,
  heading,
  headingHighlight,
  description,
  actions,
  actionsSlot,
  features,
  featuresSlot,
  background,
  spacing = "pt-28 pb-8 md:pt-32 md:pb-32",
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  badgeClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  featuresClassName,
}: HeroCenteredGradientCtaProps): React.JSX.Element {
  const renderFeatures = useMemo(() => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return features.map((feature, index) => (
      <Pressable
        href={feature.href}
        key={index}
        className={cn("flex items-center gap-2", feature.className)}
      >
        {feature.icon}
        <span>{feature.title}</span>
      </Pressable>
    ));
  }, [featuresSlot, features]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="relative gap-6 z-10 flex flex-col items-center text-center">
        {badge && (
          <Badge variant="outline" className={cn("px-3", badgeClassName)}>
            {badgeIcon}
            {typeof badge === "string" ? <span>{badge}</span> : badge}
          </Badge>
        )}
        {(heading || headingHighlight) &&
          (typeof heading === "string" ? (
            <h1
              className={cn(
                "max-w-full md:max-w-md text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl text-balance",
                headingClassName,
              )}
            >
              {heading}
            </h1>
          ) : heading ? (
            <div className={headingClassName}>{heading}</div>
          ) : headingHighlight ? (
            <h1
              className={cn(
                "max-w-full md:max-w-md text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl text-balance",
                headingClassName,
              )}
            >
              <span className="bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {headingHighlight}
              </span>
            </h1>
          ) : null)}
        {description &&
          (typeof description === "string" ? (
            <p
              className={cn(
                "max-w-full md:max-w-md text-md md:text-xl text-balance",
                descriptionClassName,
              )}
            >
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          ))}
        <BlockActions
          actions={actions}
          actionsSlot={actionsSlot}
          actionsClassName={actionsClassName}
        />
        {(featuresSlot || (features && features.length > 0)) && (
          <div
            className={cn(
              "mt-4 md:mt-6 flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm",
              featuresClassName,
            )}
          >
            {renderFeatures}
          </div>
        )}
      </div>
    </Section>
  );
}
