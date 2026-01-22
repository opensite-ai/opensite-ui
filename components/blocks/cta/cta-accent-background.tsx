"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
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
  heading,
  description,
  actions,
  actionsSlot,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  cardClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
}: CtaAccentBackgroundProps): React.JSX.Element {
  const renderActions = () => {
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
            {action.icon}
            {action.children ?? action.label}
            {action.iconAfter}
          </Pressable>
        ))}
      </div>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("container", containerClassName)}>
        <div
          className={cn(
            "rounded-lg bg-accent p-8 md:rounded-xl lg:p-12",
            cardClassName,
          )}
        >
          <div className={cn("max-w-4xl", contentClassName)}>
            <h3
              className={cn(
                "mb-4 text-3xl font-semibold md:text-5xl lg:mb-6 lg:text-6xl",
                headingClassName,
              )}
            >
              {heading}
            </h3>
            <p
              className={cn(
                "mb-8 text-lg font-medium text-muted-foreground lg:text-xl",
                descriptionClassName,
              )}
            >
              {description}
            </p>
            {renderActions()}
          </div>
        </div>
      </div>
    </Section>
  );
}
