"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

/**
 * Step item configuration for ProcessStepsGrid
 */
export interface ProcessStepsGridItem {
  /**
   * Icon name for the step (e.g., "lucide/search")
   */
  icon?: string;
  /**
   * Custom icon element (overrides icon name)
   */
  iconSlot?: React.ReactNode;
  /**
   * Step title
   */
  title?: React.ReactNode;
  /**
   * Step description
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the step item
   */
  className?: string;
}

export interface ProcessStepsGridProps {
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
  steps?: ProcessStepsGridItem[];
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
   * Additional CSS classes for the steps grid
   */
  stepsGridClassName?: string;
  /**
   * Additional CSS classes for each step card
   */
  stepCardClassName?: string;
  /**
   * Additional CSS classes for the step icon container
   */
  stepIconClassName?: string;
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
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * @deprecated Use `heading` instead
   */
  title?: string;
}

/**
 * ProcessStepsGrid - A grid-based process section with numbered step cards.
 */
export function ProcessStepsGrid({
  heading,
  description,
  steps,
  stepsSlot,
  className,
  contentClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  stepsGridClassName,
  stepCardClassName,
  stepIconClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  // Backwards compatibility
  title,
}: ProcessStepsGridProps): React.JSX.Element {
  // Handle backwards compatibility
  const resolvedHeading = title ?? heading;

  const renderSteps = () => {
    if (stepsSlot) return stepsSlot;
    if (!steps || steps.length === 0) return null;

    return (
      <div
        className={cn(
          "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
          stepsGridClassName,
        )}
      >
        {steps.map((step, index) => (
          <div
            key={index}
            className={cn(
              "group relative overflow-hidden rounded-lg border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-lg",
              stepCardClassName,
              step.className,
            )}
          >
            <span className="absolute -right-4 -top-4 text-[120px] font-bold leading-none text-muted/20 transition-colors group-hover:text-primary/10">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="relative z-10">
              {(step.iconSlot || step.icon) && (
                <div
                  className={cn(
                    "mb-6 flex size-14 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground",
                    stepIconClassName,
                  )}
                >
                  {step.iconSlot ??
                    (step.icon && <DynamicIcon name={step.icon} size={28} />)}
                </div>
              )}
              {step.title &&
                (typeof step.title === "string" ? (
                  <h3 className="mb-3 text-xl font-semibold tracking-tight">
                    {step.title}
                  </h3>
                ) : (
                  <div className="mb-3 text-xl font-semibold tracking-tight">
                    {step.title}
                  </div>
                ))}
              {step.description &&
                (typeof step.description === "string" ? (
                  <p className="text-foreground/50 leading-relaxed">
                    {step.description}
                  </p>
                ) : (
                  <div className="text-foreground/50 leading-relaxed">
                    {step.description}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
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
        <div className={cn("mb-16 text-center", headerClassName)}>
          {resolvedHeading &&
            (typeof resolvedHeading === "string" ? (
              <h1
                className={cn(
                  "mb-4 text-4xl font-semibold tracking-tight lg:text-5xl",
                  headingClassName,
                )}
              >
                {resolvedHeading}
              </h1>
            ) : (
              <div className={headingClassName}>{resolvedHeading}</div>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "mx-auto max-w-2xl text-lg text-foreground/50",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}
        </div>
        {renderSteps()}
      </div>
    </Section>
  );
}
