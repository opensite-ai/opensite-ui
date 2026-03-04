"use client";

import * as React from "react";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { BlockActions } from "@/components/ui/block-actions";

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
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
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
  image,
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
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-32 md:py-32",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: AboutNetworkSpotlightProps): React.JSX.Element {
  const highlightsContent = useMemo(() => {
    if (highlightsSlot) return highlightsSlot;
    if (!highlights || highlights.length === 0) return null;

    return (
      <ul className={cn("mt-6 space-y-6 md:space-y-3", highlightsClassName)}>
        {highlights.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <span
              className={cn(
                "flex items-center justify-center shrink-0",
                "bg-primary text-primary-foreground",
                "size-fit p-2 rounded-full",
              )}
            >
              <DynamicIcon name="lucide/check" size={14} />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }, [highlightsSlot, highlights, highlightsClassName]);

  const spotlightCardContent = useMemo(() => {
    if (spotlightCardSlot) return spotlightCardSlot;
    if (!spotlightCard) return null;

    return (
      <div
        className={cn(
          "bg-card text-card-foreground",
          "rounded-2xl border p-5 shadow-xl",
          spotlightCardClassName,
        )}
      >
        <div className="mb-2 flex items-center gap-3">
          {spotlightCard.icon && (
            <div
              className={cn(
                "flex items-center justify-center shrink-0",
                "bg-primary text-primary-foreground",
                "size-fit p-2 rounded-full",
              )}
            >
              {spotlightCard.icon}
            </div>
          )}
          <div>
            {typeof spotlightCard.label === "string" ? (
              <p className={cn("text-xs font-bold uppercase tracking-[0.2em]")}>
                {spotlightCard.label}
              </p>
            ) : (
              spotlightCard.label
            )}
            {typeof spotlightCard.title === "string" ? (
              <div className="text-lg font-bold">{spotlightCard.title}</div>
            ) : (
              spotlightCard.title
            )}
          </div>
        </div>
        {typeof spotlightCard.description === "string" ? (
          <p className="text-sm">{spotlightCard.description}</p>
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
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div
        className={cn(
          "grid grid-cols-1 items-center gap-12 lg:grid-cols-2",
          contentClassName,
        )}
      >
        {image && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl aspect-square">
              <Img
                src={image.src}
                alt={image.alt}
                className={cn("h-full w-full object-cover", imageClassName)}
                optixFlowConfig={optixFlowConfig}
              />
              <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
                {spotlightCardContent}
              </div>
            </div>
          </motion.div>
        )}

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
                  "text-sm font-semibold uppercase tracking-[0.2em]",
                  eyebrowClassName,
                )}
              >
                {eyebrow}
              </p>
            ) : (
              eyebrow
            ))}
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "mt-2 text-3xl font-bold md:text-4xl text-pretty",
                  headingClassName,
                )}
              >
                {heading}
              </h2>
            ) : (
              heading
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn("mt-4 text-lg text-pretty", descriptionClassName)}
              >
                {description}
              </p>
            ) : (
              description
            ))}
          {(highlightsSlot || (highlights && highlights.length > 0)) &&
            highlightsContent}

          <BlockActions
            actions={actions}
            actionsSlot={actionsSlot}
            actionsClassName={actionsClassName}
          />
        </motion.div>
      </div>
    </Section>
  );
}
