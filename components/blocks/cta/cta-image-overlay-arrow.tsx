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

export interface CtaImageOverlayArrowProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
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
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the card wrapper
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
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
 * CtaImageOverlayArrow - A CTA section with a background image, centered heading,
 * and a prominent button with arrow icon. Creates visual impact with minimal content.
 * Perfect for impactful hero-style CTAs.
 *
 * @example
 * ```tsx
 * <CtaImageOverlayArrow
 *   heading="Start Your Journey"
 *   actions={[
 *     { label: "Get Started", href: "/signup", variant: "secondary", size: "lg" }
 *   ]}
 *   backgroundImage="/hero-bg.jpg"
 * />
 * ```
 */
export function CtaImageOverlayArrow({
  sectionId = "cta-image-overlay-arrow",
  heading,
  actions,
  actionsSlot,
  backgroundImage,
  className,
  containerClassName,
  cardClassName,
  contentClassName,
  headingClassName,
  actionsClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
}: CtaImageOverlayArrowProps): React.JSX.Element {
  const actionsContent = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
      const trailingIcon = action.iconAfter ?? (
        <DynamicIcon
          name="lucide/arrow-right"
          size={20}
          className="ml-2 transition-transform group-hover:translate-x-1"
        />
      );

      return (
        <Pressable
          key={index}
          href={action.href}
          onClick={action.onClick}
          variant={action.variant}
          size={action.size}
          className={cn("group", action.className)}
          aria-label={action["aria-label"]}
          asButton
        >
          {action.children ?? (
            <>
              {action.icon === "" ? null : (
                <DynamicIcon name={action.icon} />
              )}
              {action.label}
              {trailingIcon === "" ? null : (
                <DynamicIcon name={trailingIcon} />
              )}
            </>
          )}
        </Pressable>
      );
    });
  }, [actionsSlot, actions]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("container", containerClassName)}>
        <div
          className={cn(
            "flex h-[500px] items-center justify-center overflow-hidden rounded-2xl bg-cover bg-center",
            cardClassName,
          )}
          style={backgroundImage ? {
            backgroundImage: `linear-gradient(hsl(var(--foreground) / 0.5), hsl(var(--foreground) / 0.5)), url('${backgroundImage}')`,
          } : undefined}
        >
          <div
            className={cn(
              "flex flex-col items-center gap-8 p-4 text-center",
              contentClassName,
            )}
          >
            {heading && (
              typeof heading === "string" ? (
                <h2
                  className={cn(
                    "max-w-3xl text-4xl font-bold text-primary-foreground md:text-6xl",
                    headingClassName,
                  )}
                >
                  {heading}
                </h2>
              ) : (
                <div className={cn("max-w-3xl", headingClassName)}>{heading}</div>
              )
            )}
            {actionsContent && (
              <div className={actionsClassName}>{actionsContent}</div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
