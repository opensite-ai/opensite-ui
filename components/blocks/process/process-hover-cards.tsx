"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

/**
 * Step item configuration for ProcessHoverCards
 */
export interface ProcessHoverCardItem {
  /**
   * Step number or label (e.g., "01", "Step 1")
   */
  step?: React.ReactNode;
  /**
   * Step title
   */
  title?: React.ReactNode;
  /**
   * Image URL for hover reveal
   */
  image?: string;
  /**
   * Step description
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the step item
   */
  className?: string;
}

export interface ProcessHoverCardsProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Array of step configurations
   */
  steps?: ProcessHoverCardItem[];
  /**
   * Custom slot for rendering steps (overrides steps array)
   */
  stepsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the header area
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the steps list
   */
  stepsClassName?: string;
  /**
   * Additional CSS classes for each step item
   */
  stepItemClassName?: string;
  /**
   * Additional CSS classes for the hover image container
   */
  hoverImageClassName?: string;
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
  pattern?: PatternName | string;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * @deprecated Use `heading` instead
   */
  title?: string;
}

interface ProcessCardProps {
  step: ProcessHoverCardItem;
  index: number;
  optixFlowConfig?: OptixFlowConfig;
  itemClassName?: string;
  hoverImageClassName?: string;
}

const ProcessCard = ({ step, index, optixFlowConfig, itemClassName, hoverImageClassName }: ProcessCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const titleText = typeof step.title === "string" ? step.title : `Step ${index + 1}`;

  return (
    <li
      className={cn(
        "group relative flex flex-col justify-between gap-12 border-b py-8 lg:py-16",
        itemClassName,
        step.className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && step.image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "pointer-events-none absolute top-1/2 right-10 z-10 hidden h-60 w-80 -translate-y-1/2 overflow-hidden lg:block",
              hoverImageClassName
            )}
          >
            <Img
              src={step.image}
              alt={titleText}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex items-start justify-between gap-8">
        <div className="flex items-center gap-8">
          <div className="flex w-fit items-center justify-center font-mono text-sm tracking-tighter text-muted-foreground">
            {step.step ?? `0${index + 1}`}
          </div>
          <div>
            {step.title && (
              typeof step.title === "string" ? (
                <h3 className="mb-2 text-2xl font-semibold tracking-tighter transition-colors group-hover:text-primary lg:text-3xl">
                  {step.title}
                </h3>
              ) : (
                <div className="mb-2">{step.title}</div>
              )
            )}
            {step.description && (
              typeof step.description === "string" ? (
                <p className="max-w-md text-foreground/50">{step.description}</p>
              ) : (
                <div className="max-w-md text-foreground/50">{step.description}</div>
              )
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

/**
 * ProcessHoverCards - A process section with hover-reveal images for each step.
 */
export function ProcessHoverCards({
  heading,
  description,
  steps,
  stepsSlot,
  className,
  contentClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  stepsClassName,
  stepItemClassName,
  hoverImageClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  optixFlowConfig,
  // Backwards compatibility
  title,
}: ProcessHoverCardsProps): React.JSX.Element {
  // Handle backwards compatibility
  const resolvedHeading = title ?? heading;

  const renderSteps = () => {
    if (stepsSlot) return stepsSlot;
    if (!steps || steps.length === 0) return null;

    return (
      <ul className={cn("relative w-full", stepsClassName)}>
        {steps.map((step, index) => (
          <ProcessCard
            key={index}
            step={step}
            index={index}
            optixFlowConfig={optixFlowConfig}
            itemClassName={stepItemClassName}
            hoverImageClassName={hoverImageClassName}
          />
        ))}
      </ul>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={contentClassName}>
        <div className={cn("mb-16 max-w-2xl", headerClassName)}>
          {resolvedHeading && (
            typeof resolvedHeading === "string" ? (
              <h1 className={cn("mb-4 text-5xl font-semibold tracking-tight lg:text-7xl", headingClassName)}>
                {resolvedHeading}
              </h1>
            ) : (
              <div className={headingClassName}>{resolvedHeading}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("text-lg text-foreground/50", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
        </div>
        {renderSteps()}
      </div>
    </Section>
  );
}
