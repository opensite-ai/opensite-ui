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

const defaultSteps: ProcessIconTimelineItem[] = [
  {
    icon: "lucide/lightbulb",
    title: "Discovery & Research",
    description:
      "We start by understanding your business, goals, and target audience through comprehensive research and analysis.",
    highlights: ["Market Analysis", "User Research", "Competitive Review"],
    badgeColor: "bg-blue-500",
  },
  {
    icon: "lucide/pencil-ruler",
    title: "Strategy & Planning",
    description:
      "Based on our findings, we develop a strategic roadmap that outlines the approach, timeline, and key deliverables.",
    highlights: ["Project Roadmap", "Resource Planning", "Risk Assessment"],
    badgeColor: "bg-purple-500",
  },
  {
    icon: "lucide/code",
    title: "Design & Development",
    description:
      "Our team brings the strategy to life through iterative design and development cycles with regular feedback loops.",
    highlights: ["UI/UX Design", "Frontend Development", "Backend Integration"],
    badgeColor: "bg-green-500",
  },
  {
    icon: "lucide/test-tube",
    title: "Testing & QA",
    description:
      "Rigorous testing ensures quality and reliability across all platforms and use cases before launch.",
    highlights: ["Unit Testing", "Integration Testing", "User Acceptance"],
    badgeColor: "bg-orange-500",
  },
  {
    icon: "lucide/rocket",
    title: "Launch & Deploy",
    description:
      "We handle the deployment process with care, ensuring a smooth transition to production environments.",
    highlights: ["Deployment Strategy", "Performance Monitoring", "Go-Live Support"],
    badgeColor: "bg-red-500",
  },
  {
    icon: "lucide/bar-chart-3",
    title: "Monitor & Optimize",
    description:
      "Post-launch, we continuously monitor performance and implement optimizations based on real-world data.",
    highlights: ["Analytics Review", "Performance Tuning", "A/B Testing"],
    badgeColor: "bg-teal-500",
  },
  {
    icon: "lucide/refresh-cw",
    title: "Iterate & Improve",
    description:
      "We believe in continuous improvement, regularly updating and enhancing based on user feedback and market changes.",
    highlights: ["Feature Updates", "User Feedback", "Continuous Delivery"],
    badgeColor: "bg-indigo-500",
  },
];

/**
 * ProcessIconTimeline - A process section with icon-based timeline steps.
 */
export function ProcessIconTimeline({
  heading = "Our Process",
  description = "A proven methodology that delivers exceptional results through careful planning and execution.",
  steps = defaultSteps,
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
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  // Backwards compatibility
  title,
}: ProcessIconTimelineProps): React.JSX.Element {
  // Handle backwards compatibility
  const resolvedHeading = title ?? heading;

  const renderSteps = () => {
    if (stepsSlot) return stepsSlot;
    if (!steps || steps.length === 0) return null;

    return (
      <div className="space-y-12">
        {steps.map((step, index) => (
          <div
            key={index}
            className={cn(
              "relative flex flex-col gap-6 pl-16 lg:flex-row lg:gap-12 lg:pl-0",
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse",
              step.className
            )}
          >
            <div
              className={cn(
                "absolute left-0 flex size-12 items-center justify-center rounded-full text-white lg:left-1/2 lg:-translate-x-1/2",
                step.badgeColor || "bg-primary",
                stepBadgeClassName
              )}
            >
              {step.iconSlot ?? (step.icon && <DynamicIcon name={step.icon} size={24} />)}
            </div>

            <div
              className={cn(
                "flex-1 lg:text-right",
                index % 2 !== 0 && "lg:text-left"
              )}
            >
              <div
                className={cn(
                  "rounded-lg border bg-card p-6 shadow-sm",
                  index % 2 === 0 ? "lg:mr-12" : "lg:ml-12",
                  stepCardClassName
                )}
              >
                {step.title && (
                  typeof step.title === "string" ? (
                    <h3 className="mb-2 text-xl font-semibold tracking-tight">
                      {step.title}
                    </h3>
                  ) : (
                    <div className="mb-2 text-xl font-semibold tracking-tight">
                      {step.title}
                    </div>
                  )
                )}
                {step.description && (
                  typeof step.description === "string" ? (
                    <p className="mb-4 text-foreground/50">{step.description}</p>
                  ) : (
                    <div className="mb-4 text-foreground/50">{step.description}</div>
                  )
                )}
                {step.highlights && step.highlights.length > 0 && (
                  <div
                    className={cn(
                      "flex flex-wrap gap-2",
                      index % 2 === 0 ? "lg:justify-end" : "lg:justify-start"
                    )}
                  >
                    {step.highlights.map((highlight, hIndex) => (
                      <span
                        key={hIndex}
                        className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="hidden flex-1 lg:block" />
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
        <div className={cn("mb-16 max-w-2xl", headerClassName)}>
          {resolvedHeading && (
            typeof resolvedHeading === "string" ? (
              <h1 className={cn("mb-4 text-4xl font-semibold tracking-tight lg:text-5xl", headingClassName)}>
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

        <div className={cn("relative", timelineClassName)}>
          <div className={cn("absolute left-6 top-0 bottom-0 w-px bg-border lg:left-1/2 lg:-translate-x-1/2", timelineLineClassName)} />
          {renderSteps()}
        </div>
      </div>
    </Section>
  );
}
