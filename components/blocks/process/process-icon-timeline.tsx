"use client";

import * as React from "react";
import { useMemo } from "react";
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
 * Step item configuration for ProcessIconTimeline
 */
export interface ProcessIconTimelineItem {
  /**
   * Icon name for the step (e.g., "lucide/lightbulb")
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
   * List of highlight tags
   */
  highlights?: React.ReactNode[];
  /**
   * Badge background color class (e.g., "bg-blue-500")
   */
  badgeColor?: string;
  /**
   * Additional CSS classes for the step item
   */
  className?: string;
}

export interface ProcessIconTimelineProps {
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
  steps?: ProcessIconTimelineItem[];
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
   * Additional CSS classes for the timeline container
   */
  timelineClassName?: string;
  /**
   * Additional CSS classes for the timeline line
   */
  timelineLineClassName?: string;
  /**
   * Additional CSS classes for each step card
   */
  stepCardClassName?: string;
  /**
   * Additional CSS classes for the step icon badge
   */
  stepBadgeClassName?: string;
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
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * ProcessIconTimeline - A process section with icon-based timeline steps.
 */
export function ProcessIconTimeline({
  sectionId = "process-icon-timeline",
  heading,
  description,
  steps,
  stepsSlot,
  className,
  contentClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  timelineClassName,
  timelineLineClassName,
  stepCardClassName,
  stepBadgeClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
}: ProcessIconTimelineProps): React.JSX.Element {
  // Handle backwards compatibility
  const resolvedHeading = heading;

  const renderSteps = useMemo(() => {
    if (stepsSlot) return stepsSlot;
    if (!steps?.length) return null;

    return (
      <div className="space-y-12">
        {steps.map((step, index) => (
          <div
            key={index}
            className={cn(
              "relative flex flex-col gap-6 pl-16 lg:flex-row lg:gap-12 lg:pl-0",
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse",
              step.className,
            )}
          >
            <div
              className={cn(
                "absolute left-0 flex size-12 items-center justify-center rounded-full text-primary-foreground lg:left-1/2 lg:-translate-x-1/2",
                step.badgeColor || "bg-primary",
                stepBadgeClassName,
              )}
            >
              {step.iconSlot ??
                (step.icon && <DynamicIcon name={step.icon} size={24} />)}
            </div>

            <div
              className={cn(
                "flex-1 lg:text-right",
                index % 2 !== 0 && "lg:text-left",
              )}
            >
              <div
                className={cn(
                  "rounded-lg border p-6 shadow-sm",
                  "bg-card text-card-foreground",
                  index % 2 === 0 ? "lg:mr-12" : "lg:ml-12",
                  stepCardClassName,
                )}
              >
                {step.title &&
                  (typeof step.title === "string" ? (
                    <h3 className="mb-2 text-xl font-semibold tracking-tight">
                      {step.title}
                    </h3>
                  ) : (
                    <div className="mb-2 text-xl font-semibold tracking-tight">
                      {step.title}
                    </div>
                  ))}
                {step.description &&
                  (typeof step.description === "string" ? (
                    <p className={cn("mb-4")}>{step.description}</p>
                  ) : (
                    <div className={cn("mb-4")}>{step.description}</div>
                  ))}
                {step.highlights?.length ? (
                  <div
                    className={cn(
                      "flex flex-wrap gap-2",
                      index % 2 === 0 ? "lg:justify-end" : "lg:justify-start",
                    )}
                  >
                    {step.highlights.map((highlight, hIndex) => (
                      <span
                        key={hIndex}
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-medium",
                          "bg-primary text-primary-foreground",
                        )}
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="hidden flex-1 lg:block" />
          </div>
        ))}
      </div>
    );
  }, [stepsSlot, steps, background, stepBadgeClassName, stepCardClassName]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
      containerClassName={containerClassName}
    >
      <div className={contentClassName}>
        <div className={cn("mb-16 max-w-2xl", headerClassName)}>
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
              resolvedHeading
            ))}
          {description &&
            (typeof description === "string" ? (
              <p className={cn("text-lg", descriptionClassName)}>
                {description}
              </p>
            ) : (
              description
            ))}
        </div>

        <div className={cn("relative", timelineClassName)}>
          <div
            className={cn(
              "absolute left-6 top-0 bottom-0 w-px lg:left-1/2 lg:-translate-x-1/2",
              "border-border border",
              timelineLineClassName,
            )}
          />
          {renderSteps}
        </div>
      </div>
    </Section>
  );
}
