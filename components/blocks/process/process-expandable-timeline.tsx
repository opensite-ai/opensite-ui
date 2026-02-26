"use client";

import * as React from "react";
import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
 * Step item configuration for ProcessExpandableTimeline
 */
export interface ProcessExpandableTimelineItem {
  /**
   * Step title
   */
  title?: React.ReactNode;
  /**
   * Step description (shown in collapsed state)
   */
  description?: React.ReactNode;
  /**
   * Expanded content (shown when step is expanded)
   */
  expandedContent?: React.ReactNode;
  /**
   * Additional CSS classes for the step item
   */
  className?: string;
}

export interface ProcessExpandableTimelineProps {
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
  steps?: ProcessExpandableTimelineItem[];
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
   * Additional CSS classes for each step item
   */
  stepItemClassName?: string;
  /**
   * Additional CSS classes for the step number badge
   */
  stepBadgeClassName?: string;
  /**
   * Additional CSS classes for the expanded content
   */
  expandedContentClassName?: string;
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
}

const CornerConnector = ({ className }: { className?: string }) => (
  <svg
    width="22"
    height="20"
    viewBox="0 0 22 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <line
      x1="0.607422"
      y1="2.57422"
      x2="21.5762"
      y2="2.57422"
      stroke="currentColor"
      strokeWidth="4"
    />
    <line
      x1="19.5762"
      y1="19.624"
      x2="19.5762"
      y2="4.57422"
      stroke="currentColor"
      strokeWidth="4"
    />
  </svg>
);

/**
 * ProcessExpandableTimeline - A process section with expandable timeline steps.
 */
export function ProcessExpandableTimeline({
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
  stepItemClassName,
  stepBadgeClassName,
  expandedContentClassName,
  background,
  pattern,
  patternOpacity,
  spacing = "xl",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
}: ProcessExpandableTimelineProps): React.JSX.Element {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const renderSteps = useMemo(() => {
    if (stepsSlot) return stepsSlot;
    if (!steps?.length) return null;

    return (
      <div className="space-y-0">
        {steps.map((step, index) => (
          <div key={index} className={cn("relative", step.className)}>
            <button
              onClick={() => toggleExpand(index)}
              className={cn(
                "group relative flex w-full items-start gap-6 border-b p-6 text-left transition-colors",
                `hover:bg-card hover:text-card-foreground`,
                stepItemClassName,
              )}
            >
              <CornerConnector
                className={cn("absolute right-4 top-4", "opacity-30")}
              />

              <div
                className={cn(
                  "shrink-0 flex size-12 items-center justify-center rounded-full border-2 transition-colors",
                  expandedIndex === index
                    ? cn("bg-primary text-primary-foreground")
                    : cn(
                        `group-hover:bg-primary group-hover:text-primary-foreground`,
                      ),
                  stepBadgeClassName,
                )}
              >
                <span className="text-sm font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex-1 pr-8 md:pr-12">
                <div className="flex items-center gap-2">
                  {step.title &&
                    (typeof step.title === "string" ? (
                      <h3
                        className={cn(
                          "text-xl font-semibold tracking-tight transition-colors",
                        )}
                      >
                        {step.title}
                      </h3>
                    ) : (
                      step.title
                    ))}
                  <DynamicIcon
                    name={
                      expandedIndex === index
                        ? "lucide/chevron-up"
                        : "lucide/chevron-down"
                    }
                    size={20}
                  />
                </div>
                {step.description &&
                  (typeof step.description === "string" ? (
                    <p className="text-lg">{step.description}</p>
                  ) : (
                    step.description
                  ))}
              </div>
            </button>

            <AnimatePresence>
              {expandedIndex === index && step.expandedContent && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div
                    className={cn(
                      "border-b p-6",
                      "bg-card text-bg-foreground",
                      expandedContentClassName,
                    )}
                  >
                    {typeof step.expandedContent === "string" ? (
                      <p className="text-lg">{step.expandedContent}</p>
                    ) : (
                      step.expandedContent
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    );
  }, [
    stepsSlot,
    steps,
    background,
    stepItemClassName,
    stepBadgeClassName,
    expandedContentClassName,
    expandedIndex,
    toggleExpand,
  ]);

  return (
    <Section
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
      containerClassName={containerClassName}
    >
      <div className={contentClassName}>
        <div className={cn("mb-16 max-w-2xl space-y-2", headerClassName)}>
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "text-4xl font-semibold tracking-tight lg:text-5xl text-balance",
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
                className={cn(
                  "text-lg opacity-75 text-balance",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              description
            ))}
        </div>

        <div className={cn("relative", timelineClassName)}>
          <div
            className={cn(
              "absolute left-6 top-0 bottom-0 w-px",
              "border-2 border-dashed",
              timelineLineClassName,
            )}
          />
          {renderSteps}
        </div>
      </div>
    </Section>
  );
}
