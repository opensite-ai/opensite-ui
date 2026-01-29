"use client";

import * as React from "react";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface CtaImageOverlayCenteredProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Supporting description content
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
   * Background image alt text
   */
  backgroundAlt?: string;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the card wrapper
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the overlay
   */
  overlayClassName?: string;
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
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

/**
 * CtaImageOverlayCentered - Full-width CTA banner with background image,
 * dark overlay, and centered text/CTAs. Best for final conversion sections.
 */
export function CtaImageOverlayCentered({
  heading,
  description,
  actions,
  actionsSlot,
  backgroundImage,
  backgroundAlt,
  className,
  cardClassName,
  overlayClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: CtaImageOverlayCenteredProps): React.JSX.Element {
  const actionsContent = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div
        className={cn(
          "mt-8 flex flex-col justify-center gap-4 sm:flex-row",
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
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl border border-border/50",
          cardClassName,
        )}
      >
        {backgroundImage && (
          <Img
            src={backgroundImage}
            alt={backgroundAlt}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            optixFlowConfig={optixFlowConfig}
          />
        )}
        <div
          className={cn(
            "absolute inset-0 bg-linear-to-r from-foreground/90 via-foreground/80 to-foreground/90",
            overlayClassName,
          )}
        />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className={cn(
            "relative px-6 py-16 text-center text-background md:px-10",
            contentClassName,
          )}
        >
          {heading && (
            typeof heading === "string" ? (
              <h2
                className={cn("text-3xl font-bold md:text-5xl", headingClassName)}
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
                  "mx-auto mt-4 max-w-2xl text-lg text-background/80",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={cn("mx-auto mt-4 max-w-2xl", descriptionClassName)}>
                {description}
              </div>
            )
          )}
          {actionsContent}
        </motion.div>
      </div>
    </Section>
  );
}
