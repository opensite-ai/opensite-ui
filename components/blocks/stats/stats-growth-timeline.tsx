"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing, ActionConfig } from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

/**
 * A milestone in a timeline.
 * Used to display key events or achievements along a timeline.
 */
export interface Milestone {
  /**
   * Unique identifier for the milestone
   */
  id: string;
  /**
   * Year of the milestone
   */
  year: React.ReactNode;
  /**
   * Title of the milestone
   */
  title: React.ReactNode;
  /**
   * Description of the milestone
   */
  description: React.ReactNode;
  /**
   * Metric associated with the milestone
   */
  metric: {
    value: React.ReactNode;
    label: React.ReactNode;
  };
  /**
   * Icon name in format: prefix/name (e.g., "lucide/calendar-days")
   */
  icon?: string;
  /**
   * Custom icon element (overrides icon name)
   */
  iconSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the milestone
   */
  className?: string;
}

/**
 * A current stat for summary sections.
 * Used to display current metrics in a summary section.
 */
export interface CurrentStat {
  /**
   * The stat value
   */
  value: React.ReactNode;
  /**
   * The stat label
   */
  label: React.ReactNode;
  /**
   * Additional CSS classes for the stat
   */
  className?: string;
}

/**
 * Props for the StatsGrowthTimeline component.
 * A vertical timeline showcasing milestones and growth journey.
 */
export interface StatsGrowthTimelineProps {
  /**
   * Badge content above the heading
   */
  badge?: React.ReactNode;
  /**
   * Custom badge slot (overrides badge)
   */
  badgeSlot?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description content below the heading
   */
  description?: React.ReactNode;
  /**
   * Array of milestones to display
   */
  milestones?: Milestone[];
  /**
   * Custom slot for rendering milestones (overrides milestones array)
   */
  milestonesSlot?: React.ReactNode;
  /**
   * Current stats for the "Where We Are Today" section
   */
  currentStats?: CurrentStat[];
  /**
   * Custom slot for rendering current stats (overrides currentStats array)
   */
  currentStatsSlot?: React.ReactNode;
  /**
   * Current stats section heading
   */
  currentStatsHeading?: React.ReactNode;
  /**
   * Future section heading
   */
  futureHeading?: React.ReactNode;
  /**
   * Future section description
   */
  futureDescription?: React.ReactNode;
  /**
   * Custom slot for the future section (overrides futureHeading/futureDescription/actions)
   */
  futureSlot?: React.ReactNode;
  /**
   * Actions for the future section (replaces roadmapLinkText/roadmapLinkUrl)
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Background pattern
   */
  pattern?: PatternName;
  /**
   * Pattern opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the pattern
   */
  patternClassName?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the timeline
   */
  timelineClassName?: string;
  /**
   * Additional CSS classes for milestone cards
   */
  milestoneClassName?: string;
  /**
   * Additional CSS classes for the current stats section
   */
  currentStatsClassName?: string;
  /**
   * Additional CSS classes for the future section
   */
  futureClassName?: string;
}

/**
 * StatsGrowthTimeline - A vertical timeline showcasing company milestones and growth
 * journey. Features alternating left/right content placement, year badges, milestone
 * cards with icons and metrics, a "Where We Are Today" summary section, and a future
 * roadmap CTA. Ideal for about pages, investor presentations, or company history sections.
 *
 * @example
 * ```tsx
 * <StatsGrowthTimeline
 *   badge="Our Journey"
 *   heading="Growing From Startup to Industry Leader"
 *   milestones={[
 *     { id: "launch", year: "2018", title: "Company Founded", ... },
 *   ]}
 * />
 * ```
 */
export function StatsGrowthTimeline({
  badge,
  badgeSlot,
  heading,
  description,
  milestones,
  milestonesSlot,
  currentStats,
  currentStatsSlot,
  currentStatsHeading,
  futureHeading,
  futureDescription,
  futureSlot,
  actions,
  actionsSlot,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName,
  headerClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  timelineClassName,
  milestoneClassName,
  currentStatsClassName,
  futureClassName,
}: StatsGrowthTimelineProps) {
  // Memoized badge rendering
  const badgeContent = useMemo(() => {
    if (badgeSlot) return badgeSlot;
    if (!badge) return null;
    return <Badge className={cn("mb-4", badgeClassName)}>{badge}</Badge>;
  }, [badgeSlot, badge, badgeClassName]);

  // Memoized milestone icon rendering
  const renderMilestoneIcon = useCallback((milestone: Milestone) => {
    if (milestone.iconSlot) return milestone.iconSlot;
    if (!milestone.icon) return null;
    return (
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <DynamicIcon
          name={milestone.icon}
          size={32}
          className="text-primary"
        />
      </div>
    );
  }, []);

  // Memoized milestones rendering
  const milestonesContent = useMemo(() => {
    if (milestonesSlot) return milestonesSlot;
    if (!milestones || milestones.length === 0) return null;

    return (
      <div className={cn("relative mt-24", timelineClassName)}>
        {/* Timeline line */}
        <div className="absolute bottom-0 left-0 top-0 w-px transform bg-border md:left-1/2 md:-translate-x-1/2" />

        {/* Timeline items */}
        <div className="relative space-y-12 md:space-y-24">
          {milestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className={cn(
                "flex flex-col gap-8 md:flex-row md:gap-0",
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse",
                milestone.className,
                milestoneClassName
              )}
            >
              {/* Content */}
              <div className="ml-6 flex flex-col items-start md:ml-0 md:w-1/2 md:px-8">
                {milestone.year && (
                  <div className="mb-4 inline-flex h-9 w-20 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                    {milestone.year}
                  </div>
                )}
                {milestone.title && (
                  typeof milestone.title === "string" ? (
                    <h3 className="mb-2 text-xl font-bold">{milestone.title}</h3>
                  ) : (
                    <div className="mb-2">{milestone.title}</div>
                  )
                )}
                {milestone.description && (
                  typeof milestone.description === "string" ? (
                    <p className="mb-4 text-muted-foreground">{milestone.description}</p>
                  ) : (
                    <div className="mb-4">{milestone.description}</div>
                  )
                )}

                {milestone.metric && (
                  <div className="flex items-center gap-4 rounded-lg border bg-background p-4 shadow-sm">
                    {renderMilestoneIcon(milestone)}
                    <div>
                      <div className="text-3xl font-bold text-primary">
                        {milestone.metric.value}
                      </div>
                      {milestone.metric.label && (
                        <div className="text-sm text-muted-foreground">
                          {milestone.metric.label}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Timeline point */}
              <div className="absolute left-0 flex -translate-x-1/2 transform items-center justify-center md:left-1/2">
                <div className="h-5 w-5 rounded-full border-4 border-background bg-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }, [milestonesSlot, milestones, timelineClassName, milestoneClassName, renderMilestoneIcon]);

  // Memoized current stats rendering
  const currentStatsContent = useMemo(() => {
    if (currentStatsSlot) return currentStatsSlot;
    if (!currentStats || currentStats.length === 0) return null;

    return (
      <div className={cn("mt-24 rounded-lg bg-muted p-8", currentStatsClassName)}>
        {currentStatsHeading && (
          typeof currentStatsHeading === "string" ? (
            <h3 className="mb-6 text-center text-2xl font-bold">{currentStatsHeading}</h3>
          ) : (
            <div className="mb-6 text-center">{currentStatsHeading}</div>
          )
        )}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {currentStats.map((stat, index) => (
            <div key={index} className={cn("text-center", stat.className)}>
              <div className="mb-2 text-3xl font-bold text-primary md:text-4xl">
                {stat.value}
              </div>
              {stat.label && (
                <p className="font-medium text-muted-foreground">{stat.label}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }, [currentStatsSlot, currentStats, currentStatsHeading, currentStatsClassName]);

  // Memoized actions rendering
  const actionsContent = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => (
      <Pressable
        key={index}
        href={action.href}
        onClick={action.onClick}
        variant={action.variant}
        className="inline-flex items-center font-medium text-primary hover:underline"
      >
        {action.label}
        <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
      </Pressable>
    ));
  }, [actionsSlot, actions]);

  // Memoized future section rendering
  const futureContent = useMemo(() => {
    if (futureSlot) return futureSlot;
    if (!futureHeading && !futureDescription && (!actions || actions.length === 0)) return null;

    return (
      <div className={cn("mt-16 text-center", futureClassName)}>
        {futureHeading && (
          typeof futureHeading === "string" ? (
            <h3 className="mb-4 text-2xl font-bold">{futureHeading}</h3>
          ) : (
            <div className="mb-4">{futureHeading}</div>
          )
        )}
        {futureDescription && (
          typeof futureDescription === "string" ? (
            <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">{futureDescription}</p>
          ) : (
            <div className="mx-auto mb-8 max-w-2xl">{futureDescription}</div>
          )
        )}
        {actionsContent}
      </div>
    );
  }, [futureSlot, futureHeading, futureDescription, futureClassName, actionsContent, actions]);

  // Check if header has any content
  const hasHeaderContent = !!(badge || badgeSlot || heading || description);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
    >
      <div className={cn("mx-auto max-w-5xl", containerClassName)}>
        {hasHeaderContent && (
          <div className={cn("mb-16 text-center", headerClassName)}>
            {badgeContent}
            {heading && (
              typeof heading === "string" ? (
                <h2 className={cn("mb-4 text-3xl font-bold md:text-5xl", headingClassName)}>
                  {heading}
                </h2>
              ) : (
                <div className={cn("mb-4", headingClassName)}>{heading}</div>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("mx-auto max-w-3xl text-lg text-muted-foreground", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={cn("mx-auto max-w-3xl", descriptionClassName)}>{description}</div>
              )
            )}
          </div>
        )}

        {milestonesContent}
        {currentStatsContent}
        {futureContent}
      </div>
    </Section>
  );
}
