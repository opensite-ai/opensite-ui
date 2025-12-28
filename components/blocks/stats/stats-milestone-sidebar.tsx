"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

/**
 * A milestone item with year and description
 */
export interface MilestoneItem {
  /**
   * The year of the milestone
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
}

/**
 * Props for the StatsMilestoneSidebar component
 */
export interface StatsMilestoneSidebarProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Main heading text for the sidebar
   */
  heading?: string;
  /**
   * Description text for the sidebar
   */
  description?: string;
  /**
   * Array of milestones to display
   */
  milestones?: MilestoneItem[];
}

const defaultMilestones: MilestoneItem[] = [
  {
    year: "2018",
    title: "Company Founded",
    description: "Started with a vision to transform how businesses operate online.",
  },
  {
    year: "2019",
    title: "First Major Client",
    description: "Secured our first enterprise client, validating our product-market fit.",
  },
  {
    year: "2020",
    title: "Series A Funding",
    description: "Raised $10M to accelerate product development and team growth.",
  },
  {
    year: "2021",
    title: "Global Expansion",
    description: "Expanded operations to Europe and Asia-Pacific regions.",
  },
  {
    year: "2022",
    title: "1 Million Users",
    description: "Reached the milestone of serving over 1 million active users.",
  },
  {
    year: "2023",
    title: "Industry Recognition",
    description: "Named as a leader in our category by major industry analysts.",
  },
];

/**
 * StatsMilestoneSidebar - A two-column layout featuring a sticky sidebar with
 * heading and description, alongside a scrollable list of company milestones.
 * Each milestone displays a year badge, title, and description. The sidebar
 * remains fixed while users scroll through the timeline. Ideal for company
 * history pages, about sections, or investor presentations.
 *
 * @example
 * ```tsx
 * <StatsMilestoneSidebar
 *   heading="Our Journey"
 *   description="Key moments that shaped who we are today"
 *   milestones={[
 *     { year: "2018", title: "Company Founded", description: "..." },
 *   ]}
 * />
 * ```
 */
export function StatsMilestoneSidebar({
  className,
  heading = "Our Journey",
  description = "From a small startup to an industry leader, here are the key moments that shaped our company.",
  milestones = defaultMilestones,
}: StatsMilestoneSidebarProps) {
  return (
    <div
      className={cn(
        "container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]",
        className
      )}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky Sidebar */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">{heading}</h2>
              <p className="text-lg text-muted-foreground">{description}</p>
            </div>
          </div>

          {/* Milestones List */}
          <div className="lg:col-span-8">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="relative border-l-2 border-border pl-8 pb-8 last:pb-0"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-primary bg-background" />

                  {/* Year badge */}
                  <div className="mb-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    {milestone.year}
                  </div>

                  {/* Content */}
                  <h3 className="mb-2 text-xl font-bold">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
