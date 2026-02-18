"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";

export interface HeroGridPatternEfficiencyProps {
  /**
   * Main heading content (can include highlighted text)
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Action configuration for CTA button
   */
  action?: ActionConfig;
  /**
   * Custom slot for action (overrides action prop)
   */
  actionSlot?: React.ReactNode;
  /**
   * Subtext below the action button
   */
  actionSubtext?: React.ReactNode;
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
   * Additional CSS classes for the action container
   */
  actionClassName?: string;
}

export function HeroGridPatternEfficiency({
  heading,
  description,
  action,
  actionSlot,
  actionSubtext,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  pattern,
  patternOpacity,
  className,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionClassName,
}: HeroGridPatternEfficiencyProps): React.JSX.Element {
  const renderAction = useMemo(() => {
    if (actionSlot) return actionSlot;
    if (!action) return null;

    const {
      label,
      icon,
      iconAfter,
      children,
      className: btnClassName,
      ...pressableProps
    } = action;
    return (
      <Pressable asButton className={btnClassName} {...pressableProps}>
        {children ?? (
          <>
            {icon}
            {label}
            {iconAfter}
          </>
        )}
      </Pressable>
    );
  }, [actionSlot, action]);

  const renderHeading = useMemo(() => {
    if (heading) {
      return typeof heading === "string" ? (
        <h1
          className={cn(
            "text-5xl leading-tight font-extrabold lg:text-8xl lg:leading-snug text-balance",
            headingClassName,
          )}
        >
          {heading}
        </h1>
      ) : (
        <h1
          className={cn(
            "text-5xl leading-tight font-extrabold lg:text-8xl lg:leading-snug text-balance",
            headingClassName,
          )}
        >
          {heading}
        </h1>
      );
    } else {
      return null;
    }
  }, [heading, headingClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div className={cn("relative max-w-5xl", contentClassName)}>
          {renderHeading}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "mt-7 text-xl font-light lg:text-3xl text-balance",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}
          <div
            className={cn(
              "mt-12 flex w-fit flex-col gap-2.5 text-center",
              actionClassName,
            )}
          >
            {renderAction}
            {actionSubtext &&
              (typeof actionSubtext === "string" ? (
                <p className="text-sm">{actionSubtext}</p>
              ) : (
                actionSubtext
              ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
