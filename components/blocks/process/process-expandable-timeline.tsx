"use client";

import * as React from "react";
import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, getNestedCardBg, getNestedCardTextColor, getTextColor, getAccentColor, getBorderColor } from "../../../lib/utils";
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
   * @deprecated Use `heading` instead
   */
  title?: string;
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
  spacing,
  pattern,
  patternOpacity,
  // Backwards compatibility
  title,
}: ProcessExpandableTimelineProps): React.JSX.Element {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

  // Handle backwards compatibility
  const resolvedHeading = title ?? heading;

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
                "group relative flex w-full items-start gap-6 border-b py-6 pl-16 text-left transition-colors",
                `hover:${getNestedCardBg(background, 'muted')}/30`,
                stepItemClassName,
              )}
            >
              <div
                className={cn(
                  "absolute left-0 flex size-12 items-center justify-center rounded-full border-2 transition-colors",
                  getNestedCardBg(background, 'card'),
                  expandedIndex === index
                    ? cn(getBorderColor(background, 'accent'), "bg-primary text-primary-foreground")
                    : cn(getBorderColor(background, 'default'), getTextColor(background, 'muted'), `group-hover:${getBorderColor(background, 'accent')}`),
                  stepBadgeClassName,
                )}
              >
                <span className="text-sm font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <CornerConnector className={cn("absolute right-4 top-4", getTextColor(background, 'muted'), "opacity-30")} />

              <div className="flex-1 pr-12">
                <div className="flex items-center gap-2">
                  {step.title &&
                    (typeof step.title === "string" ? (
                      <h3 className={cn("text-xl font-semibold tracking-tight transition-colors", `group-hover:${getAccentColor(background)}`)}>
                        {step.title}
                      </h3>
                    ) : (
                      <div className={cn("text-xl font-semibold tracking-tight transition-colors", `group-hover:${getAccentColor(background)}`)}>
                        {step.title}
                      </div>
                    ))}
                  <DynamicIcon
                    name={
                      expandedIndex === index
                        ? "lucide/chevron-up"
                        : "lucide/chevron-down"
                    }
                    size={20}
                    className={getTextColor(background, 'muted')}
                  />
                </div>
                {step.description &&
                  (typeof step.description === "string" ? (
                    <p className={cn("mt-1", getTextColor(background, 'muted'))}>
                      {step.description}
                    </p>
                  ) : (
                    <div className={cn("mt-1", getTextColor(background, 'muted'))}>
                      {step.description}
                    </div>
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
                      "border-b py-6 pl-16 pr-6",
                      getNestedCardBg(background, 'muted'),
                      getNestedCardTextColor(background),
                      expandedContentClassName,
                    )}
                  >
                    {typeof step.expandedContent === "string" ? (
                      <p className={getTextColor(background, 'muted')}>
                        {step.expandedContent}
                      </p>
                    ) : (
                      <div className={getTextColor(background, 'muted')}>
                        {step.expandedContent}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    );
  }, [stepsSlot, steps, background, stepItemClassName, stepBadgeClassName, expandedContentClassName, expandedIndex, toggleExpand]);

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
                  "text-lg",
                  getTextColor(background, 'muted'),
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}
        </div>

        <div className={cn("relative", timelineClassName)}>
          <div
            className={cn(
              "absolute left-6 top-0 bottom-0 w-px",
              getBorderColor(background, 'default'),
              timelineLineClassName,
            )}
          />
          {renderSteps}
        </div>
      </div>
    </Section>
  );
}
