"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface CtaStackedCardsProps {
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
   * Additional CSS classes for the inner wrapper
   */
  innerClassName?: string;
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
   * Additional CSS classes for the cards wrapper
   */
  cardsClassName?: string;
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
 * CtaStackedCards - A CTA section with content on the left and decorative stacked
 * card elements on the right. Features an accent background with border styling.
 * Creates a modern, dynamic appearance ideal for app or product promotions.
 *
 * @example
 * ```tsx
 * <CtaStackedCards
 *   heading="Launch Your App"
 *   description="Build and deploy your application in minutes."
 *   actions={[{ label: "Get Started", href: "/signup", variant: "default" }]}
 * />
 * ```
 */
export function CtaStackedCards({
  heading,
  description,
  actions,
  actionsSlot,
  className,
  innerClassName,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  cardsClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
}: CtaStackedCardsProps): React.JSX.Element {
  const actionsContent = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className={actionsClassName}>
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
            {action.icon}
            {action.children ?? action.label}
            {action.iconAfter}
          </Pressable>
        ))}
      </div>
    );
  }, [actionsSlot, actions, actionsClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div
        className={cn(
          "max-w-full overflow-hidden border-y border-border pt-10 md:pt-16 lg:pt-20",
          getNestedCardBg(background, "accent"),
          getNestedCardTextColor(background),
          innerClassName,
        )}
      >
        <div
          className={cn(
            "relative container flex flex-col md:flex-row md:space-x-12",
            containerClassName,
          )}
        >
          <div
            className={cn(
              "mb-72 md:mb-28 md:w-2/3 lg:shrink-0 xl:mb-20 xl:w-1/2",
              contentClassName,
            )}
          >
            {heading && (
              typeof heading === "string" ? (
                <h3
                  className={cn(
                    "mb-3 text-4xl font-semibold md:mb-4 md:text-5xl lg:mb-6",
                    headingClassName,
                  )}
                >
                  {heading}
                </h3>
              ) : (
                <div className={cn("mb-3 md:mb-4 lg:mb-6", headingClassName)}>
                  {heading}
                </div>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p
                  className={cn(
                    "mb-8 text-muted-foreground lg:text-lg",
                    descriptionClassName,
                  )}
                >
                  {description}
                </p>
              ) : (
                <div className={cn("mb-8", descriptionClassName)}>
                  {description}
                </div>
              )
            )}
            {actionsContent}
          </div>
          <div
            className={cn(
              "absolute right-1/2 bottom-0 mr-6 h-min w-[110%] max-w-md translate-x-1/2 md:-right-36 md:mr-0 md:w-3/4 md:max-w-xl md:translate-x-0 lg:mt-auto xl:relative xl:right-0 xl:h-full xl:w-full xl:max-w-full",
              cardsClassName,
            )}
          >
            <div className="relative aspect-8/5 h-full min-h-64 w-full">
              <div className="absolute top-0 right-0 z-40 flex aspect-3/5 w-3/5 -translate-x-[24%] translate-y-[24%] -rotate-30 justify-center overflow-clip rounded-3xl bg-background shadow-lg shadow-foreground/20 md:max-xl:-translate-x-[8%] md:max-xl:translate-y-[16%]"></div>
              <div className="absolute top-0 right-0 z-40 flex aspect-3/5 w-3/5 -translate-x-[16%] translate-y-[8%] -rotate-15 justify-center overflow-clip rounded-3xl bg-background shadow-xl shadow-foreground/20 md:max-xl:-translate-x-[6%] md:max-xl:translate-y-[6%]"></div>
              <div className="absolute top-0 right-0 z-40 flex aspect-3/5 w-3/5 items-center justify-center overflow-clip rounded-3xl bg-background shadow-2xl shadow-foreground/20"></div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
