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
 * Milestone status type
 */
export type MilestoneStatus = "completed" | "in-progress" | "upcoming";

/**
 * Milestone item configuration for ProcessRoadmapTimeline
 */
export interface ProcessRoadmapMilestoneItem {
  /**
   * Milestone title
   */
  title?: React.ReactNode;
  /**
   * Milestone description
   */
  description?: React.ReactNode;
  /**
   * Date or time period (e.g., "Q1 2024")
   */
  date?: React.ReactNode;
  /**
   * Milestone status
   */
  status: MilestoneStatus;
  /**
   * List of features or deliverables
   */
  features?: React.ReactNode[];
  /**
   * Additional CSS classes for the milestone item
   */
  className?: string;
}

export interface ProcessRoadmapTimelineProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Array of milestone configurations
   */
  milestones?: ProcessRoadmapMilestoneItem[];
  /**
   * Custom slot for rendering milestones (overrides milestones array)
   */
  milestonesSlot?: React.ReactNode;
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
   * Additional CSS classes for each milestone card
   */
  milestoneCardClassName?: string;
  /**
   * Additional CSS classes for the milestone node
   */
  milestoneNodeClassName?: string;
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

const StatusBadge = ({
  status,
  className,
}: {
  status: MilestoneStatus;
  className?: string;
}) => {
  const config = {
    completed: {
      label: "Completed",
      badgeClassName:
        "bg-success/10 text-success dark:bg-success/10 dark:text-success",
      icon: "lucide/check-circle-2",
    },
    "in-progress": {
      label: "In Progress",
      badgeClassName:
        "bg-primary/10 text-primary dark:bg-primary/10 dark:text-primary",
      icon: "lucide/loader-2",
    },
    upcoming: {
      label: "Upcoming",
      badgeClassName:
        "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
      icon: "lucide/clock",
    },
  };

  const { label, badgeClassName, icon } = config[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        badgeClassName,
        className,
      )}
    >
      <DynamicIcon name={icon} size={14} />
      {label}
    </span>
  );
};

/**
 * ProcessRoadmapTimeline - A roadmap timeline showing project milestones with status indicators.
 */
export function ProcessRoadmapTimeline({
  heading,
  description,
  milestones,
  milestonesSlot,
  className,
  contentClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  timelineClassName,
  timelineLineClassName,
  milestoneCardClassName,
  milestoneNodeClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  // Backwards compatibility
  title,
}: ProcessRoadmapTimelineProps): React.JSX.Element {
  // Handle backwards compatibility
  const resolvedHeading = title ?? heading;

  const renderMilestones = () => {
    if (milestonesSlot) return milestonesSlot;
    if (!milestones || milestones.length === 0) return null;

    return (
      <div className="space-y-12">
        {milestones.map((milestone, index) => (
          <div
            key={index}
            className={cn(
              "relative flex items-start gap-8",
              index % 2 === 0 ? "flex-row" : "flex-row-reverse",
              milestone.className,
            )}
          >
            <div
              className={cn(
                "flex-1",
                index % 2 === 0 ? "text-right pr-8" : "text-left pl-8",
              )}
            >
              <div
                className={cn(
                  "rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md",
                  milestone.status === "in-progress" && "border-primary/50",
                  milestoneCardClassName,
                )}
              >
                <div
                  className={cn(
                    "mb-3 flex items-center gap-3",
                    index % 2 === 0 ? "justify-end" : "justify-start",
                  )}
                >
                  {milestone.date &&
                    (typeof milestone.date === "string" ? (
                      <span className="text-sm font-medium text-muted-foreground">
                        {milestone.date}
                      </span>
                    ) : (
                      <div className="text-sm font-medium text-muted-foreground">
                        {milestone.date}
                      </div>
                    ))}
                  <StatusBadge status={milestone.status} />
                </div>
                {milestone.title &&
                  (typeof milestone.title === "string" ? (
                    <h3 className="mb-2 text-xl font-semibold tracking-tight">
                      {milestone.title}
                    </h3>
                  ) : (
                    <div className="mb-2 text-xl font-semibold tracking-tight">
                      {milestone.title}
                    </div>
                  ))}
                {milestone.description &&
                  (typeof milestone.description === "string" ? (
                    <p className="mb-4 text-foreground/50">
                      {milestone.description}
                    </p>
                  ) : (
                    <div className="mb-4 text-foreground/50">
                      {milestone.description}
                    </div>
                  ))}
                {milestone.features && milestone.features.length > 0 && (
                  <div
                    className={cn(
                      "flex flex-wrap gap-2",
                      index % 2 === 0 ? "justify-end" : "justify-start",
                    )}
                  >
                    {milestone.features.map((feature, fIndex) => (
                      <span
                        key={fIndex}
                        className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div
              className={cn(
                "absolute left-1/2 flex size-10 -translate-x-1/2 items-center justify-center rounded-full border-2 bg-background",
                milestone.status === "completed"
                  ? "border-success bg-success text-white"
                  : milestone.status === "in-progress"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground",
                milestoneNodeClassName,
              )}
            >
              {milestone.status === "completed" ? (
                <DynamicIcon name="lucide/check" size={20} />
              ) : (
                <span className="text-sm font-semibold">{index + 1}</span>
              )}
            </div>

            <div className="flex-1" />
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

        <div className={cn("relative mx-auto max-w-4xl", timelineClassName)}>
          <div
            className={cn(
              "absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-border",
              timelineLineClassName,
            )}
          />
          {renderMilestones()}
        </div>
      </div>
    </Section>
  );
}
