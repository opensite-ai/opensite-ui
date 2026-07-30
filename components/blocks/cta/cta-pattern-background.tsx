"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface CtaPatternBackgroundProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description content below the heading
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
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the inner wrapper with pattern
   */
  innerClassName?: string;
  /**
   * Additional CSS classes for the content wrapper
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
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * CtaPatternBackground - A CTA section with a subtle pattern background,
 * centered heading, description, and action buttons. Clean and professional
 * appearance ideal for corporate or business websites.
 *
 * @example
 * ```tsx
 * <CtaPatternBackground
 *   heading="Start building your websites faster"
 *   description="Try our tools and services to build your website faster."
 *   actions={[
 *     { label: "Get Started", href: "/signup", variant: "default", size: "lg" },
 *     { label: "Learn More", href: "/learn", variant: "outline", size: "lg" }
 *   ]}
 * />
 * ```
 */
export function CtaPatternBackground({
  sectionId = "cta-pattern-background",
  heading,
  description,
  actions,
  actionsSlot,
  className,
  containerClassName,
  innerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
}: CtaPatternBackgroundProps): React.JSX.Element {
  const actionsContent = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div
        className={cn(
          "mt-11 flex flex-col justify-center gap-2 sm:flex-row",
          actionsClassName,
        )}
      >
        {actions.map((action, index) => (
          <Pressable
            key={index}
            href={action.href}
            onClick={action.onClick}
            variant={action.variant}
            size={action.size}
            className={action.className}
            aria-label={action["aria-label"]}
            asButton
          >
            {action.children ?? (
              <>
                {action.icon === "" ? null : (
                  <DynamicIcon name={action.icon} />
                )}
                {action.label}
                {action.iconAfter === "" ? null : (
                  <DynamicIcon name={action.iconAfter} />
                )}
              </>
            )}
          </Pressable>
        ))}
      </div>
    );
  }, [actionsSlot, actions, actionsClassName]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div
        className={cn(
          "flex items-center justify-center border bg-cover bg-center py-20 text-center md:p-20",
          innerClassName,
        )}
      >
        <div className={cn("container", containerClassName)}>
          <div className={cn("mx-auto max-w-3xl", contentClassName)}>
            {heading && (
              typeof heading === "string" ? (
                <h1
                  className={cn(
                    "mb-4 text-3xl font-semibold text-balance md:text-5xl",
                    headingClassName,
                  )}
                >
                  {heading}
                </h1>
              ) : (
                <div className={cn("mb-4", headingClassName)}>{heading}</div>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("md:text-lg", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )
            )}
            {actionsContent}
          </div>
        </div>
      </div>
    </Section>
  );
}
