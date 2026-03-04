"use client";

import * as React from "react";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { BlockActions } from "@/components/ui/block-actions";

export interface AboutStoryExpertiseArea {
  /**
   * Icon element or icon name
   */
  icon?: React.ReactNode;
  /**
   * Expertise title
   */
  title?: React.ReactNode;
  /**
   * Supporting description
   */
  description?: React.ReactNode;
}

export interface AboutStoryExpertiseProps {
  /**
   * Eyebrow label for the story section
   */
  eyebrow?: React.ReactNode;
  /**
   * Additional CSS classes for the eyebrow
   */
  eyebrowClassName?: string;
  /**
   * Main heading for the story section
   */
  heading?: React.ReactNode;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Story paragraphs displayed in order
   */
  storyParagraphs?: React.ReactNode[];
  /**
   * Custom slot for rendering story content (overrides storyParagraphs)
   */
  storySlot?: React.ReactNode;
  /**
   * Additional CSS classes for the story content
   */
  storyClassName?: string;
  /**
   * Array of action configurations for CTAs
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Feature image configuration
   */
  image?: {
    src: string;
    alt: string;
  };
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
  /**
   * Highlight badge content overlaid on the image
   */
  highlight?: {
    icon?: React.ReactNode;
    label?: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
  };
  /**
   * Custom slot for rendering highlight (overrides highlight object)
   */
  highlightSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the highlight
   */
  highlightClassName?: string;
  /**
   * Expertise section heading
   */
  expertiseHeading?: React.ReactNode;
  /**
   * Additional CSS classes for the expertise heading
   */
  expertiseHeadingClassName?: string;
  /**
   * Expertise section description
   */
  expertiseDescription?: React.ReactNode;
  /**
   * Additional CSS classes for the expertise description
   */
  expertiseDescriptionClassName?: string;
  /**
   * Expertise area cards
   */
  expertiseAreas?: AboutStoryExpertiseArea[];
  /**
   * Custom slot for rendering expertise areas (overrides expertiseAreas array)
   */
  expertiseAreasSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the expertise areas container
   */
  expertiseAreasClassName?: string;
  /**
   * Additional CSS classes for the expertise section
   */
  expertiseSectionClassName?: string;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
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
 * AboutStoryExpertise - A two-part about section featuring a founder-style story
 * with image overlay, followed by a grid of expertise highlights. Ideal for
 * trust-building pages that need narrative plus proof points.
 */
export function AboutStoryExpertise({
  eyebrow,
  eyebrowClassName,
  heading,
  headingClassName,
  storyParagraphs,
  storySlot,
  storyClassName,
  actions,
  actionsSlot,
  actionsClassName,
  image,
  imageClassName,
  highlight,
  highlightSlot,
  highlightClassName,
  expertiseHeading,
  expertiseHeadingClassName,
  expertiseDescription,
  expertiseDescriptionClassName,
  expertiseAreas,
  expertiseAreasSlot,
  expertiseAreasClassName,
  expertiseSectionClassName,
  className,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "hero",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: AboutStoryExpertiseProps): React.JSX.Element {
  const storyContent = useMemo(() => {
    if (storySlot) return storySlot;
    if (!storyParagraphs || storyParagraphs.length === 0) return null;

    return (
      <div className={cn("space-y-4", storyClassName)}>
        {storyParagraphs.map((paragraph, idx) =>
          typeof paragraph === "string" ? (
            <p key={idx}>{paragraph}</p>
          ) : (
            <div key={idx}>{paragraph}</div>
          ),
        )}
      </div>
    );
  }, [storySlot, storyParagraphs, storyClassName]);

  const highlightContent = useMemo(() => {
    if (highlightSlot) return highlightSlot;
    if (!highlight) return null;

    return (
      <div
        className={cn(
          "bg-card text-card-foreground",
          "rounded-2xl border p-5 shadow-xl",
          highlightClassName,
        )}
      >
        <div className="mb-3 flex items-center gap-3 md:gap-4">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shrink-0">
            {highlight.icon}
          </div>
          <div>
            {highlight.label &&
              (typeof highlight.label === "string" ? (
                <p
                  className={cn(
                    "text-xs font-semibold uppercase tracking-[0.2em]",
                  )}
                >
                  {highlight.label}
                </p>
              ) : (
                highlight.label
              ))}
            {highlight.title &&
              (typeof highlight.title === "string" ? (
                <div className="text-lg font-bold leading-tight">
                  {highlight.title}
                </div>
              ) : (
                highlight.title
              ))}
          </div>
        </div>
        {highlight.description &&
          (typeof highlight.description === "string" ? (
            <p className={cn("text-sm")}>{highlight.description}</p>
          ) : (
            highlight.description
          ))}
      </div>
    );
  }, [highlightSlot, highlight, highlightClassName]);

  const expertiseAreasContent = useMemo(() => {
    if (expertiseAreasSlot) return expertiseAreasSlot;
    if (!expertiseAreas || expertiseAreas.length === 0) return null;

    return (
      <div
        className={cn(
          "mt-10 grid grid-cols-1 gap-6 md:grid-cols-2",
          expertiseAreasClassName,
        )}
      >
        {expertiseAreas.map((area, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="flex items-start gap-4 rounded-2xl bg-card text-card-foreground p-6 shadow-md transition-all duration-300 hover:shadow-xl"
          >
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl",
              )}
            >
              {area.icon}
            </div>
            <div>
              {area.title &&
                (typeof area.title === "string" ? (
                  <div className="text-lg font-bold">{area.title}</div>
                ) : (
                  area.title
                ))}
              {area.description &&
                (typeof area.description === "string" ? (
                  <p className={cn("mt-1 text-sm")}>{area.description}</p>
                ) : (
                  <div className="mt-1">{area.description}</div>
                ))}
            </div>
          </motion.div>
        ))}
      </div>
    );
  }, [expertiseAreasSlot, expertiseAreas, expertiseAreasClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
      containerClassName={containerClassName}
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="order-2 space-y-8 lg:order-1"
        >
          <div className="space-y-6">
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
                    "mt-2 text-3xl font-bold md:text-4xl",
                    headingClassName,
                  )}
                >
                  {heading}
                </h2>
              ) : (
                heading
              ))}
          </div>
          {storyContent}

          <BlockActions
            actions={actions}
            actionsClassName={actionsClassName}
            actionsSlot={actionsSlot}
          />
        </motion.div>

        {image && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-2"
          >
            <div
              className={cn(
                "relative overflow-hidden rounded-3xl",
                "shadow-2xl aspect-square",
                imageClassName,
              )}
            >
              <Img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover"
                optixFlowConfig={optixFlowConfig}
              />
              <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
                {highlightContent}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className={cn("mt-20 rounded-3xl", expertiseSectionClassName)}>
        <div className="text-center">
          {expertiseHeading &&
            (typeof expertiseHeading === "string" ? (
              <h3
                className={cn(
                  "mt-2 text-2xl font-bold md:text-3xl",
                  expertiseHeadingClassName,
                )}
              >
                {expertiseHeading}
              </h3>
            ) : (
              expertiseHeading
            ))}
          {expertiseDescription &&
            (typeof expertiseDescription === "string" ? (
              <p
                className={cn(
                  "mx-auto mt-3 max-w-2xl",
                  expertiseDescriptionClassName,
                )}
              >
                {expertiseDescription}
              </p>
            ) : (
              expertiseDescription
            ))}
        </div>
        {expertiseAreasContent}
      </div>
    </Section>
  );
}
