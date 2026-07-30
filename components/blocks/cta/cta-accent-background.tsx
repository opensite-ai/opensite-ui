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

export interface CtaAccentBackgroundProps {
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
   * Additional CSS classes for the card wrapper
   */
  cardClassName?: string;
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
 * CtaAccentBackground - A CTA section with an accent-colored background,
 * large heading, description, and dual action buttons. Creates visual
 * distinction for important calls to action.
 *
 * @example
 * ```tsx
 * <CtaAccentBackground
 *   heading="Ready to get started?"
 *   description="Join thousands of satisfied customers today."
 *   actions={[
 *     { label: "Buy Now", href: "/pricing", variant: "default" },
 *     { label: "Contact Us", href: "/contact", variant: "outline" }
 *   ]}
 * />
 * ```
 */
export function CtaAccentBackground({
  sectionId = "cta-accent-background",
  heading,
  description,
  actions,
  actionsSlot,
  className,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  cardClassName,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "lg",
  pattern,
  patternOpacity,
}: CtaAccentBackgroundProps): React.JSX.Element {
  const actionsContent = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div
        className={cn(
          "flex flex-col gap-3 sm:flex-row sm:gap-4",
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
            className={cn("w-full sm:w-auto", action.className)}
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
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div
          className={cn("rounded-lg p-8 md:rounded-xl lg:p-12", cardClassName)}
        >
          <div className={cn("max-w-4xl", contentClassName)}>
            {heading &&
              (typeof heading === "string" ? (
                <h3
                  className={cn(
                    "mb-4 text-3xl font-semibold md:text-5xl lg:mb-6 lg:text-6xl",
                    headingClassName,
                  )}
                >
                  {heading}
                </h3>
              ) : (
                heading
              ))}
            {description &&
              (typeof description === "string" ? (
                <p
                  className={cn(
                    "mb-8 text-lg font-medium lg:text-xl",
                    descriptionClassName,
                  )}
                >
                  {description}
                </p>
              ) : (
                description
              ))}
            {actionsContent}
          </div>
        </div>
      </div>
    </Section>
  );
}
