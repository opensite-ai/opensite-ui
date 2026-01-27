"use client";

import * as React from "react";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
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
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: AboutStoryExpertiseProps): React.JSX.Element {
  const storyContent = useMemo(() => {
    if (storySlot) return storySlot;
    if (!storyParagraphs || storyParagraphs.length === 0) return null;

    return (
      <div className={cn("space-y-4 text-muted-foreground", storyClassName)}>
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

  const actionsContent = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className={cn("flex flex-wrap gap-4", actionsClassName)}>
        {actions.map((action, idx) => (
          <Pressable
            key={idx}
            href={action.href}
            onClick={action.onClick}
            size={action.size || "lg"}
            variant={action.variant || "default"}
          >
            {action.label}
          </Pressable>
        ))}
      </div>
    );
  }, [actionsSlot, actions, actionsClassName]);

  const highlightContent = useMemo(() => {
    if (highlightSlot) return highlightSlot;
    if (!highlight) return null;

    return (
      <div
        className={cn(
          "rounded-2xl border border-border/60 bg-background/90 p-6 shadow-xl",
          highlightClassName,
        )}
      >
        <div className="mb-3 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            {highlight.icon}
          </div>
          <div>
            {highlight.label &&
              (typeof highlight.label === "string" ? (
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {highlight.label}
                </p>
              ) : (
                highlight.label
              ))}
            {highlight.title &&
              (typeof highlight.title === "string" ? (
                <h3 className="text-lg font-bold text-foreground">
                  {highlight.title}
                </h3>
              ) : (
                highlight.title
              ))}
          </div>
        </div>
        {highlight.description &&
          (typeof highlight.description === "string" ? (
            <p className="text-sm text-muted-foreground">
              {highlight.description}
            </p>
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
            className="flex items-start gap-4 rounded-2xl bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              {area.icon}
            </div>
            <div>
              {area.title &&
                (typeof area.title === "string" ? (
                  <h4 className="text-lg font-bold text-foreground">
                    {area.title}
                  </h4>
                ) : (
                  area.title
                ))}
              {area.description &&
                (typeof area.description === "string" ? (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {area.description}
                  </p>
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
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="order-2 space-y-6 lg:order-1"
        >
          <div>
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
                    "mt-2 text-3xl font-bold text-foreground md:text-4xl",
                    headingClassName,
                  )}
                >
                  {heading}
                </h2>
              ) : (
                <div className={cn("mt-2", headingClassName)}>{heading}</div>
              ))}
          </div>
          {storyContent}
          {actionsContent}
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
                "relative overflow-hidden rounded-3xl border border-border shadow-2xl",
                imageClassName,
              )}
            >
              <Img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover"
                optixFlowConfig={optixFlowConfig}
              />
              <div className="absolute inset-0 bg-linear-to-tr from-foreground/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                {highlightContent}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div
        className={cn(
          "mt-20 rounded-3xl bg-muted/30 p-8 md:p-12",
          expertiseSectionClassName,
        )}
      >
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Our Expertise
          </p>
          {expertiseHeading &&
            (typeof expertiseHeading === "string" ? (
              <h3
                className={cn(
                  "mt-2 text-2xl font-bold text-foreground md:text-3xl",
                  expertiseHeadingClassName,
                )}
              >
                {expertiseHeading}
              </h3>
            ) : (
              <div className={cn("mt-2", expertiseHeadingClassName)}>
                {expertiseHeading}
              </div>
            ))}
          {expertiseDescription &&
            (typeof expertiseDescription === "string" ? (
              <p
                className={cn(
                  "mx-auto mt-3 max-w-2xl text-muted-foreground",
                  expertiseDescriptionClassName,
                )}
              >
                {expertiseDescription}
              </p>
            ) : (
              <div
                className={cn(
                  "mx-auto mt-3 max-w-2xl",
                  expertiseDescriptionClassName,
                )}
              >
                {expertiseDescription}
              </div>
            ))}
        </div>
        {expertiseAreasContent}
      </div>
    </Section>
  );
}
