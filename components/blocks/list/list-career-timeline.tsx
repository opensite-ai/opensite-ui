"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Separator } from "../../ui/separator";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface ListExperienceItem {
  /**
   * Time period (e.g., "2019 - PRESENT")
   */
  year?: React.ReactNode;
  /**
   * Job role or position
   */
  role?: React.ReactNode;
  /**
   * Company or organization name
   */
  company?: React.ReactNode;
}

export interface ListAwardItem {
  /**
   * Year of the award
   */
  year?: React.ReactNode;
  /**
   * Title of the award
   */
  title?: React.ReactNode;
  /**
   * Organization that gave the award
   */
  organization?: React.ReactNode;
}

export interface ListCareerTimelineProps {
  /**
   * Section label (e.g., "/ CAREER PATH")
   */
  sectionLabel?: React.ReactNode;
  /**
   * Additional CSS classes for the section label
   */
  sectionLabelClassName?: string;
  /**
   * Main heading text (supports line breaks)
   */
  heading?: React.ReactNode;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Experience section label
   */
  experienceLabel?: React.ReactNode;
  /**
   * Additional CSS classes for the experience label
   */
  experienceLabelClassName?: string;
  /**
   * Array of experience items
   */
  experiences?: ListExperienceItem[];
  /**
   * Custom slot for rendering experiences (overrides experiences array)
   */
  experiencesSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the experiences container
   */
  experiencesClassName?: string;
  /**
   * Additional CSS classes for individual experience rows
   */
  experienceRowClassName?: string;
  /**
   * Achievements section label
   */
  achievementsLabel?: React.ReactNode;
  /**
   * Additional CSS classes for the achievements label
   */
  achievementsLabelClassName?: string;
  /**
   * Array of award/achievement items
   */
  awards?: ListAwardItem[];
  /**
   * Custom slot for rendering awards (overrides awards array)
   */
  awardsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the awards container
   */
  awardsClassName?: string;
  /**
   * Additional CSS classes for individual award rows
   */
  awardRowClassName?: string;
  /**
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
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
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * ListCareerTimeline - A two-section timeline displaying professional experience
 * and achievements/awards. Features a bold heading, experience history with roles
 * and companies, and a comprehensive awards section with organizations.
 *
 * Perfect for portfolio pages, about sections, or resume-style presentations
 * showcasing career progression and professional recognition.
 *
 * @example
 * ```tsx
 * <ListCareerTimeline
 *   sectionLabel="/ CAREER PATH"
 *   heading={<>BUILDING SOLUTIONS,<br /> SHAPING THE FUTURE</>}
 *   experienceLabel="/ EXPERIENCE"
 *   experiences={[
 *     { year: "2019 - PRESENT", role: "SENIOR SOFTWARE ENGINEER", company: "TECH CORP" }
 *   ]}
 *   achievementsLabel="/ ACHIEVEMENTS"
 *   awards={[
 *     { year: "2023", title: "BEST SOFTWARE ENGINEER", organization: "TECH AWARDS" }
 *   ]}
 * />
 * ```
 */
export function ListCareerTimeline({
  sectionId = "list-career-timeline",
  sectionLabel,
  sectionLabelClassName,
  heading,
  headingClassName,
  experienceLabel,
  experienceLabelClassName,
  experiences,
  experiencesSlot,
  experiencesClassName,
  experienceRowClassName,
  achievementsLabel,
  achievementsLabelClassName,
  awards,
  awardsSlot,
  awardsClassName,
  awardRowClassName,
  contentClassName,
  className,
  background,
  spacing,
  pattern,
  patternOpacity,
}: ListCareerTimelineProps): React.JSX.Element {
  const renderExperiences = useMemo(() => {
    if (experiencesSlot) return experiencesSlot;
    if (!experiences || experiences.length === 0) return null;

    return (
      <div className={experiencesClassName}>
        {experiences.map((experience, idx) => (
          <React.Fragment key={idx}>
            <Separator />
            <div
              className={cn(
                "my-2.5 grid gap-2.5 text-sm sm:grid-cols-3",
                experienceRowClassName,
              )}
            >
              {experience.year &&
                (typeof experience.year === "string" ? (
                  <p className="text-muted-foreground">{experience.year}</p>
                ) : (
                  <div className="text-muted-foreground">{experience.year}</div>
                ))}
              {experience.role &&
                (typeof experience.role === "string" ? (
                  <p>{experience.role}</p>
                ) : (
                  <div>{experience.role}</div>
                ))}
              {experience.company &&
                (typeof experience.company === "string" ? (
                  <p className="text-muted-foreground">{experience.company}</p>
                ) : (
                  <div className="text-muted-foreground">
                    {experience.company}
                  </div>
                ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  }, [experiencesSlot, experiences, experiencesClassName, experienceRowClassName]);

  const renderAwards = useMemo(() => {
    if (awardsSlot) return awardsSlot;
    if (!awards || awards.length === 0) return null;

    return (
      <div className={awardsClassName}>
        {awards.map((award, idx) => (
          <React.Fragment key={idx}>
            <Separator />
            <div
              className={cn(
                "my-2.5 grid gap-2.5 text-sm sm:grid-cols-3",
                awardRowClassName,
              )}
            >
              {award.year &&
                (typeof award.year === "string" ? (
                  <p className="text-muted-foreground">{award.year}</p>
                ) : (
                  <div className="text-muted-foreground">{award.year}</div>
                ))}
              {award.title &&
                (typeof award.title === "string" ? (
                  <p>{award.title}</p>
                ) : (
                  <div>{award.title}</div>
                ))}
              {award.organization &&
                (typeof award.organization === "string" ? (
                  <p className="text-muted-foreground">{award.organization}</p>
                ) : (
                  <div className="text-muted-foreground">
                    {award.organization}
                  </div>
                ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  }, [awardsSlot, awards, awardsClassName, awardRowClassName]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("flex flex-col gap-12", contentClassName)}>
        {(sectionLabel || heading) && (
          <div className="flex flex-col gap-5">
            {sectionLabel &&
              (typeof sectionLabel === "string" ? (
                <span
                  className={cn(
                    "text-sm text-muted-foreground",
                    sectionLabelClassName,
                  )}
                >
                  {sectionLabel}
                </span>
              ) : (
                <div className={sectionLabelClassName}>{sectionLabel}</div>
              ))}
            {heading &&
              (typeof heading === "string" ? (
                <h1 className={cn("text-4xl md:text-6xl", headingClassName)}>
                  {heading}
                </h1>
              ) : (
                <div className={cn("text-4xl md:text-6xl", headingClassName)}>
                  {heading}
                </div>
              ))}
          </div>
        )}
        {(experienceLabel || experiencesSlot || experiences) && (
          <div className="flex flex-col gap-7">
            {experienceLabel &&
              (typeof experienceLabel === "string" ? (
                <h2 className={cn("text-xl", experienceLabelClassName)}>
                  {experienceLabel}
                </h2>
              ) : (
                <div className={experienceLabelClassName}>{experienceLabel}</div>
              ))}
            {renderExperiences}
          </div>
        )}
        {(achievementsLabel || awardsSlot || awards) && (
          <div className="flex flex-col gap-7">
            {achievementsLabel &&
              (typeof achievementsLabel === "string" ? (
                <h2 className={cn("text-xl", achievementsLabelClassName)}>
                  {achievementsLabel}
                </h2>
              ) : (
                <div className={achievementsLabelClassName}>
                  {achievementsLabel}
                </div>
              ))}
            {renderAwards}
          </div>
        )}
      </div>
    </Section>
  );
}
