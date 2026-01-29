"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { ActionConfig, FeatureItem, SectionBackground, SectionSpacing } from "../../../src/types";

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
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  gradientClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  featuresClassName,
}: HeroCenteredGradientCtaProps): React.JSX.Element {
  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
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
    });
  }, [actionsSlot, actions]);

  const renderFeatures = useMemo(() => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return features.map((feature, index) => (
      <div key={index} className={cn("flex items-center gap-2", feature.className)}>
        {feature.icon}
        <span>{feature.title}</span>
      </div>
    ));
  }, [featuresSlot, features]);

  return (
    <Section
      className={cn(
        "relative min-h-screen overflow-hidden bg-background py-32",
        className
      )}
    >
      <div className={cn("pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.3),transparent)]", gradientClassName)} />
      <div className={cn("container relative z-10 flex flex-col items-center text-center", containerClassName)}>
        {badge && (
          <div className={cn(
            "inline-flex items-center gap-2 rounded-full border border-border/50 px-4 py-2 text-sm",
            getNestedCardBg(background, 'muted'),
            getNestedCardTextColor(background),
            badgeClassName
          )}>
            {badgeIcon}
            {typeof badge === "string" ? <span>{badge}</span> : badge}
          </div>
        )}
        {(heading || headingHighlight) && (
          typeof heading === "string" ? (
            <h1 className={cn("mt-8 max-w-4xl text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl", headingClassName)}>
              {heading}
            </h1>
          ) : heading ? (
            <div className={headingClassName}>{heading}</div>
          ) : headingHighlight ? (
            <h1 className={cn("mt-8 max-w-4xl text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl", headingClassName)}>
              Build something{" "}
              <span className="bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {headingHighlight}
              </span>
            </h1>
          ) : null
        )}
        {description && (
          typeof description === "string" ? (
            <p className={cn("mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl", descriptionClassName)}>
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          )
        )}
        {(actionsSlot || (actions && actions.length > 0)) && (
          <div className={cn("mt-10 flex flex-col gap-4 sm:flex-row", actionsClassName)}>
            {renderActions}
          </div>
        )}
        {(featuresSlot || (features && features.length > 0)) && (
          <div className={cn("mt-16 flex items-center gap-8 text-sm text-muted-foreground", featuresClassName)}>
            {renderFeatures}
          </div>
        )}
      </div>
    </Section>
  );
}
