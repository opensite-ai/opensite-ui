"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";

/**
 * A milestone in the company timeline
 */
export interface Milestone {
  /**
   * Unique identifier for the milestone
   */
  id: string;
  /**
   * Year of the milestone
   */
  year: string;
  /**
   * Title of the milestone
   */
  title: string;
  /**
   * Description of the milestone
   */
  description: string;
  /**
   * Metric associated with the milestone
   */
  metric: {
    value: string;
    label: string;
  };
  /**
   * Icon name in format: prefix/name (e.g., "lucide/calendar-days")
   */
  icon: string;
}

/**
 * Current stat for the "Where We Are Today" section
 */
export interface CurrentStat {
  /**
   * The stat value
   */
  value: string;
  /**
   * The stat label
   */
  label: string;
}

/**
 * Props for the StatsGrowthTimeline component
 */
export interface StatsGrowthTimelineProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Badge text above the heading
   */
  badge?: string;
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Description text below the heading
   */
  description?: string;
  /**
   * Array of milestones to display
   */
  milestones?: Milestone[];
  /**
   * Current stats for the "Where We Are Today" section
   */
  currentStats?: CurrentStat[];
  /**
   * Future section heading
   */
  futureHeading?: string;
  /**
   * Future section description
   */
  futureDescription?: string;
  /**
   * Roadmap link text
   */
  roadmapLinkText?: string;
  /**
   * Roadmap link URL
   */
  roadmapLinkUrl?: string;
}

const defaultMilestones: Milestone[] = [
  {
    id: "launch",
    year: "2018",
    title: "Company Founded",
    description: "Started with a small team of 5 passionate individuals",
    metric: { value: "5", label: "Team Members" },
    icon: "lucide/calendar-days",
  },
  {
    id: "first-customers",
    year: "2019",
    title: "First 100 Customers",
    description: "Achieved product-market fit and began scaling operations",
    metric: { value: "100+", label: "Early Adopters" },
    icon: "lucide/users",
  },
  {
    id: "series-a",
    year: "2020",
    title: "Series A Funding",
    description: "Secured $8M in funding to accelerate growth and development",
    metric: { value: "$8M", label: "Raised" },
    icon: "lucide/bar-chart",
  },
  {
    id: "expansion",
    year: "2021",
    title: "International Expansion",
    description: "Expanded to 12 countries across Europe, Asia, and Australia",
    metric: { value: "12", label: "Countries" },
    icon: "lucide/activity",
  },
  {
    id: "acquisition",
    year: "2022",
    title: "Strategic Acquisition",
    description: "Acquired leading analytics provider to enhance our platform",
    metric: { value: "2x", label: "Product Growth" },
    icon: "lucide/award",
  },
  {
    id: "unicorn",
    year: "2023",
    title: "Unicorn Status",
    description: "Reached $1B valuation with 10,000+ enterprise customers worldwide",
    metric: { value: "10K+", label: "Enterprise Clients" },
    icon: "lucide/award",
  },
];

const defaultCurrentStats: CurrentStat[] = [
  { value: "$1B+", label: "Company Valuation" },
  { value: "180+", label: "Team Members" },
  { value: "24", label: "Countries" },
  { value: "12K+", label: "Global Customers" },
];

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
  className,
  badge = "Our Journey",
  heading = "Growing From Startup to Industry Leader",
  description = "Track our exponential growth journey from a small startup to becoming the market leader.",
  milestones = defaultMilestones,
  currentStats = defaultCurrentStats,
  futureHeading = "The Future Is Even Brighter",
  futureDescription = "We're just getting started. Our roadmap includes expansion to new markets, enhanced product offerings, and continued innovation to serve our growing customer base.",
  roadmapLinkText = "View our roadmap",
  roadmapLinkUrl = "#",
}: StatsGrowthTimelineProps) {
  return (
    <div
      className={cn(
        "container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]",
        className
      )}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <Badge className="mb-4">{badge}</Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">{heading}</h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            {description}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-24">
          {/* Timeline line */}
          <div className="absolute bottom-0 left-0 top-0 w-px transform bg-border md:left-1/2 md:-translate-x-1/2" />

          {/* Timeline items */}
          <div className="relative space-y-12 md:space-y-24">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.id}
                className={cn(
                  "flex flex-col gap-8 md:flex-row md:gap-0",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Content */}
                <div className="ml-6 flex flex-col items-start md:ml-0 md:w-1/2 md:px-8">
                  <div className="mb-4 inline-flex h-9 w-20 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                    {milestone.year}
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{milestone.title}</h3>
                  <p className="mb-4 text-muted-foreground">
                    {milestone.description}
                  </p>

                  <div className="flex items-center gap-4 rounded-lg border bg-background p-4 shadow-sm">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <DynamicIcon
                        name={milestone.icon}
                        size={32}
                        className="text-primary"
                      />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary">
                        {milestone.metric.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {milestone.metric.label}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline point */}
                <div className="absolute left-0 flex -translate-x-1/2 transform items-center justify-center md:left-1/2">
                  <div className="h-5 w-5 rounded-full border-4 border-background bg-primary" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current stats */}
        <div className="mt-24 rounded-lg bg-muted p-8">
          <h3 className="mb-6 text-center text-2xl font-bold">
            Where We Are Today
          </h3>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {currentStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 text-3xl font-bold text-primary md:text-4xl">
                  {stat.value}
                </div>
                <p className="font-medium text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Future */}
        <div className="mt-16 text-center">
          <h3 className="mb-4 text-2xl font-bold">{futureHeading}</h3>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            {futureDescription}
          </p>
          <Pressable
            href={roadmapLinkUrl}
            className="inline-flex items-center font-medium text-primary hover:underline"
          >
            {roadmapLinkText}
            <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
          </Pressable>
        </div>
      </div>
    </div>
  );
}
