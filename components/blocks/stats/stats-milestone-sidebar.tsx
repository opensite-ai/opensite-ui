"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

/**
 * A milestone item with year and description
 */
export interface MilestoneItem {
  /**
   * The year of the milestone
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
   * Additional CSS classes for the milestone
   */
  className?: string;
}

/**
 * Props for the StatsMilestoneSidebar component
 */
export interface StatsMilestoneSidebarProps {
  /**
   * Main heading content for the sidebar
   */
  heading?: React.ReactNode;
  /**
   * Description content for the sidebar
   */
  description?: React.ReactNode;
  /**
   * Custom slot for sidebar content (overrides heading/description)
   */
  sidebarSlot?: React.ReactNode;
  /**
   * Array of milestones to display
   */
  milestones?: MilestoneItem[];
  /**
   * Custom slot for milestones (overrides milestones array)
   */
  milestonesSlot?: React.ReactNode;
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
   * Additional CSS classes for the sidebar
   */
  sidebarClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the milestones container
   */
  milestonesClassName?: string;
  /**
   * Additional CSS classes for individual milestone items
   */
  milestoneItemClassName?: string;
  /**
   * Additional CSS classes for milestone year badges
   */
  milestoneYearClassName?: string;
  /**
   * Additional CSS classes for milestone titles
   */
  milestoneTitleClassName?: string;
  /**
   * Additional CSS classes for milestone descriptions
   */
  milestoneDescriptionClassName?: string;
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
  heading = "Our Journey",
  description = "From a small startup to an industry leader, here are the key moments that shaped our company.",
  sidebarSlot,
  milestones = defaultMilestones,
  milestonesSlot,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName,
  sidebarClassName,
  headingClassName,
  descriptionClassName,
  milestonesClassName,
  milestoneItemClassName,
  milestoneYearClassName,
  milestoneTitleClassName,
  milestoneDescriptionClassName,
}: StatsMilestoneSidebarProps) {
  const renderSidebar = () => {
    if (sidebarSlot) return sidebarSlot;

    return (
      <div className="lg:sticky lg:top-24">
        {heading && (
          typeof heading === "string" ? (
            <h2 className={cn("mb-4 text-3xl font-bold md:text-4xl", headingClassName)}>
              {heading}
            </h2>
          ) : (
            <div className={cn("mb-4", headingClassName)}>{heading}</div>
          )
        )}
        {description && (
          typeof description === "string" ? (
            <p className={cn("text-lg text-muted-foreground", descriptionClassName)}>
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          )
        )}
      </div>
    );
  };

  const renderMilestones = () => {
    if (milestonesSlot) return milestonesSlot;
    if (!milestones || milestones.length === 0) return null;

    return (
      <div className={cn("space-y-8", milestonesClassName)}>
        {milestones.map((milestone, index) => (
          <div
            key={index}
            className={cn(
              "relative border-l-2 border-border pl-8 pb-8 last:pb-0",
              milestone.className,
              milestoneItemClassName
            )}
          >
            {/* Timeline dot */}
            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-primary bg-background" />

            {/* Year badge */}
            <div className={cn("mb-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary", milestoneYearClassName)}>
              {milestone.year}
            </div>

            {/* Content */}
            {milestone.title && (
              typeof milestone.title === "string" ? (
                <h3 className={cn("mb-2 text-xl font-bold", milestoneTitleClassName)}>{milestone.title}</h3>
              ) : (
                <div className={cn("mb-2", milestoneTitleClassName)}>{milestone.title}</div>
              )
            )}
            {milestone.description && (
              typeof milestone.description === "string" ? (
                <p className={cn("text-muted-foreground", milestoneDescriptionClassName)}>{milestone.description}</p>
              ) : (
                <div className={milestoneDescriptionClassName}>{milestone.description}</div>
              )
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
    >
      <div className={cn("mx-auto max-w-6xl", containerClassName)}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky Sidebar */}
          <div className={cn("lg:col-span-4", sidebarClassName)}>
            {renderSidebar()}
          </div>

          {/* Milestones List */}
          <div className="lg:col-span-8">
            {renderMilestones()}
          </div>
        </div>
      </div>
    </Section>
  );
}
