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
import { Badge } from "@/src";

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
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const StatusBadge = ({
  status,
  background,
  className,
}: {
  status: MilestoneStatus;
  background?: SectionBackground;
  className?: string;
}) => {
  const config = {
    completed: {
      label: "Completed",
      icon: "lucide/check-circle-2",
    },
    "in-progress": {
      label: "In Progress",
      icon: "lucide/loader-2",
    },
    upcoming: {
      label: "Upcoming",
      icon: "lucide/clock",
    },
  };

  const { label, icon } = config[status];

  return (
    <Badge className={cn("items-center gap-1.5", className)}>
      <DynamicIcon name={icon} size={14} />
      {label}
    </Badge>
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
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-32 md:py-32",
  pattern,
  patternOpacity,
  patternClassName,
}: ProcessRoadmapTimelineProps): React.JSX.Element {
  // Handle backwards compatibility
  const resolvedHeading = heading;

  const renderMilestones = useMemo(() => {
    if (milestonesSlot) return milestonesSlot;
    if (!milestones || milestones.length === 0) return null;

    return (
      <div className="space-y-12">
        {milestones.map((milestone, index) => (
          <div
            key={index}
            className={cn(
              "relative flex items-start gap-4 md:gap-8",
              "flex-col md:flex-row",
              index % 2 !== 0 && "md:flex-row-reverse",
              milestone.className,
            )}
          >
            <div
              className={cn(
                "w-full md:flex-1",
                "text-left md:pr-0",
                index % 2 === 0
                  ? "md:text-right md:pr-8"
                  : "md:text-left md:pl-8",
              )}
            >
              <div
                className={cn(
                  "bg-card text-card-foreground rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md",
                  milestone.status === "in-progress" && "border-primary/50",
                  milestoneCardClassName,
                )}
              >
                <div
                  className={cn(
                    "mb-3 flex items-center gap-3",
                    "justify-start",
                    index % 2 === 0 ? "md:justify-end" : "md:justify-start",
                  )}
                >
                  {milestone.date &&
                    (typeof milestone.date === "string" ? (
                      <span className={cn("text-sm font-medium")}>
                        {milestone.date}
                      </span>
                    ) : (
                      <div className={cn("text-sm font-medium")}>
                        {milestone.date}
                      </div>
                    ))}
                  <StatusBadge
                    status={milestone.status}
                    background={background}
                  />
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
                    <p className="mb-4">{milestone.description}</p>
                  ) : (
                    <div className="mb-4">{milestone.description}</div>
                  ))}
                {milestone.features?.length ? (
                  <div
                    className={cn(
                      "flex flex-wrap gap-2",
                      "justify-start",
                      index % 2 === 0 ? "md:justify-end" : "md:justify-start",
                    )}
                  >
                    {milestone.features.map((feature, fIndex) => (
                      <span
                        key={fIndex}
                        className={cn(
                          "rounded border text-card-foreground px-2 py-1 text-xs",
                        )}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="hidden md:block md:flex-1" />
          </div>
        ))}
      </div>
    );
  }, [
    milestonesSlot,
    milestones,
    background,
    milestoneCardClassName,
    milestoneNodeClassName,
  ]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName={containerClassName}
    >
      <div className={contentClassName}>
        <div className={cn("mb-16 text-center", headerClassName)}>
          {resolvedHeading &&
            (typeof resolvedHeading === "string" ? (
              <h1
                className={cn(
                  "mb-4 text-4xl font-semibold tracking-tight lg:text-5xl text-balance",
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
                  "mx-auto max-w-2xl text-lg text-balance",
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
              "absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2 bg-border/50",
              timelineLineClassName,
            )}
          />
          {renderMilestones}
        </div>
      </div>
    </Section>
  );
}
