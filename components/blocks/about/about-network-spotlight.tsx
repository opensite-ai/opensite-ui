"use client";

import * as React from "react";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface AboutNetworkSpotlightProps {
  /**
   * Eyebrow label above the heading
   */
  eyebrow?: React.ReactNode;
  /**
   * Main heading text
   */
  heading?: React.ReactNode;
  /**
   * Supporting description text
   */
  description?: React.ReactNode;
  /**
   * Highlight bullet list
   */
  highlights?: React.ReactNode[];
  /**
   * Custom slot for rendering highlights (overrides highlights array)
   */
  highlightsSlot?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Spotlight image configuration
   */
  image?: {
    src: string;
    alt: string;
  };
  /**
   * Spotlight card content overlaid on the image
   */
  spotlightCard?: {
    icon: React.ReactNode;
    label: React.ReactNode;
    title: React.ReactNode;
    description: React.ReactNode;
  };
  /**
   * Custom slot for rendering spotlight card (overrides spotlightCard object)
   */
  spotlightCardSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the eyebrow text
   */
  eyebrowClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the highlights list
   */
  highlightsClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for the spotlight card
   */
  spotlightCardClassName?: string;
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
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * AboutNetworkSpotlight - Dark spotlight section with image overlay and CTA.
 * Ideal for partner programs, network invitations, or alliance highlights.
 */
export function AboutNetworkSpotlight({
  eyebrow,
  heading,
  description,
  highlights,
  highlightsSlot,
  actions,
  actionsSlot,
  image = {
    src: imagePlaceholders[24],
    alt: "OpenSite AI partner network spotlight",
  },
  spotlightCard,
  spotlightCardSlot,
  className,
  contentClassName,
  eyebrowClassName,
  headingClassName,
  descriptionClassName,
  highlightsClassName,
  actionsClassName,
  imageClassName,
  spotlightCardClassName,
  background = "dark",
  spacing = "lg",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: AboutNetworkSpotlightProps): React.JSX.Element {
  const highlightsContent = useMemo(() => {
    if (highlightsSlot) return highlightsSlot;
    if (!highlights || highlights.length === 0) return null;

    return (
      <ul className={cn("mt-6 space-y-3", highlightsClassName)}>
        {highlights.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-white/80">
            <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary">
              <DynamicIcon name="lucide/check" size={14} />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }, [highlightsSlot, highlights, highlightsClassName]);

  const actionsContent = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
      const {
        label,
        icon,
        iconAfter,
        children,
        className: actionClassName,
        ...pressableProps
      } = action;
      return (
        <Pressable key={index} className={actionClassName} {...pressableProps}>
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

  const spotlightCardContent = useMemo(() => {
    if (spotlightCardSlot) return spotlightCardSlot;
    if (!spotlightCard) return null;

    return (
      <div
        className={cn(
          "rounded-2xl border border-primary/40 bg-black/80 p-5 backdrop-blur-sm",
          spotlightCardClassName,
        )}
      >
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            {spotlightCard.icon}
          </div>
          <div>
            {typeof spotlightCard.label === "string" ? (
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {spotlightCard.label}
              </p>
            ) : (
              spotlightCard.label
            )}
            {typeof spotlightCard.title === "string" ? (
              <h3 className="text-lg font-bold text-white">
                {spotlightCard.title}
              </h3>
            ) : (
              spotlightCard.title
            )}
          </div>
        </div>
        {typeof spotlightCard.description === "string" ? (
          <p className="text-sm text-white/80">{spotlightCard.description}</p>
        ) : (
          spotlightCard.description
        )}
      </div>
    );
  }, [spotlightCardSlot, spotlightCard, spotlightCardClassName]);

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
          "grid grid-cols-1 items-center gap-12 lg:grid-cols-2",
          contentClassName,
        )}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <Img
              src={image.src}
              alt={image.alt}
              className={cn("h-full w-full object-cover", imageClassName)}
              optixFlowConfig={optixFlowConfig}
            />
            <div className="absolute inset-0 bg-linear-to-tr from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              {spotlightCardContent}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          {eyebrow &&
            (typeof eyebrow === "string" ? (
              <p
                className={cn(
                  "text-sm font-semibold uppercase tracking-[0.2em] text-primary",
                  eyebrowClassName,
                )}
              >
                {eyebrow}
              </p>
            ) : (
              <div className={eyebrowClassName}>{eyebrow}</div>
            ))}
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "mt-2 text-3xl font-bold text-white md:text-4xl",
                  headingClassName,
                )}
              >
                {heading}
              </h2>
            ) : (
              <div className={cn("mt-2", headingClassName)}>{heading}</div>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "mt-4 text-lg text-white/80",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={cn("mt-4", descriptionClassName)}>
                {description}
              </div>
            ))}
          {(highlightsSlot || (highlights && highlights.length > 0)) &&
            highlightsContent}
          {(actionsSlot || (actions && actions.length > 0)) && (
            <div className={cn("mt-8 flex flex-wrap gap-4", actionsClassName)}>
              {actionsContent}
            </div>
          )}
        </motion.div>
      </div>
    </Section>
  );
}
