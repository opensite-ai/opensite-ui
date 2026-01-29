"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface CtaFullwidthBackgroundProps {
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
   * Background image URL
   */
  backgroundImage?: string;
  /**
   * Background overlay opacity (0-1)
   */
  overlayOpacity?: number;
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
   * Additional CSS classes for the background wrapper
   */
  backgroundClassName?: string;
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
 * CtaFullwidthBackground - A full-width CTA section with a background image,
 * gradient overlay, centered heading, description, and action buttons.
 * Creates visual impact for important conversion moments.
 *
 * @example
 * ```tsx
 * <CtaFullwidthBackground
 *   heading="Start your free trial today"
 *   description="No credit card required. Cancel anytime."
 *   actions={[
 *     { label: "Get Started", href: "/signup", variant: "default" },
 *     { label: "Learn More", href: "/about", variant: "secondary" }
 *   ]}
 *   backgroundImage="/hero-bg.jpg"
 * />
 * ```
 */
export function CtaFullwidthBackground({
  heading,
  description,
  actions,
  actionsSlot,
  backgroundImage,
  overlayOpacity = 0.4,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  backgroundClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
}: CtaFullwidthBackgroundProps): React.JSX.Element {
  const actionsContent = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div
        className={cn(
          "flex flex-col justify-center gap-2 sm:flex-row",
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
      <div className={cn("container", containerClassName)}>
        <div
          className={cn(
            "flex h-[620px] items-center justify-center overflow-hidden rounded-2xl bg-cover bg-center",
            backgroundClassName,
          )}
          style={backgroundImage ? {
            backgroundImage: `linear-gradient(hsl(var(--foreground) / ${overlayOpacity}), hsl(var(--foreground) / 0)), url('${backgroundImage}')`,
          } : undefined}
        >
          <div
            className={cn(
              "flex flex-col gap-8 p-4 text-center",
              contentClassName,
            )}
          >
            {heading && (
              typeof heading === "string" ? (
                <h2
                  className={cn(
                    "text-5xl font-bold text-primary-foreground",
                    headingClassName,
                  )}
                >
                  {heading}
                </h2>
              ) : (
                <div className={headingClassName}>{heading}</div>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p
                  className={cn(
                    "text-lg text-primary-foreground",
                    descriptionClassName,
                  )}
                >
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
