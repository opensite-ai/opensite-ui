"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Separator } from "../../ui/separator";

export interface ListExperienceItem {
  /**
   * Time period (e.g., "2019 - PRESENT")
   */
  year?: string;
  /**
   * Job role or position
   */
  role?: string;
  /**
   * Company or organization name
   */
  company?: string;
}

export interface ListAwardItem {
  /**
   * Year of the award
   */
  year?: string;
  /**
   * Title of the award
   */
  title?: string;
  /**
   * Organization that gave the award
   */
  organization?: string;
}

export interface ListCareerTimelineProps {
  /**
   * Section label (e.g., "/ CAREER PATH")
   */
  sectionLabel?: string;
  /**
   * Main heading text (supports line breaks)
   */
  heading?: React.ReactNode;
  /**
   * Experience section label
   */
  experienceLabel?: string;
  /**
   * Array of experience items
   */
  experiences?: ListExperienceItem[];
  /**
   * Achievements section label
   */
  achievementsLabel?: string;
  /**
   * Array of award/achievement items
   */
  awards?: ListAwardItem[];
  /**
   * Additional CSS classes for the section
   */
  className?: string;
}

const defaultExperiences: ListExperienceItem[] = [
  {
    year: "2019 - PRESENT",
    role: "SENIOR SOFTWARE ENGINEER",
    company: "TECHNOLOGY INNOVATIONS CORP",
  },
  {
    year: "2018 - 2020",
    role: "FULL-STACK DEVELOPER",
    company: "DIGITAL SOLUTIONS & STARTUP COLLABORATIONS",
  },
  {
    year: "2017 - 2018",
    role: "FRONTEND DEVELOPER",
    company: "WEB CRAFT STUDIO",
  },
  {
    year: "2015 - 2016",
    role: "JUNIOR DEVELOPER",
    company: "CODE FORGE LABS",
  },
  {
    year: "2014 - 2015",
    role: "INTERN DEVELOPER",
    company: "INNOVATION TECH",
  },
];

const defaultAwards: ListAwardItem[] = [
  {
    year: "2015",
    title: "BEST NEWCOMER DEVELOPER",
    organization: "TECH EXCELLENCE AWARDS",
  },
  {
    year: "2015",
    title: "INNOVATION IN WEB DEVELOPMENT",
    organization: "DIGITAL CREATORS UK",
  },
  {
    year: "2016",
    title: "OUTSTANDING CODE QUALITY",
    organization: "BRITISH SOFTWARE ASSOCIATION",
  },
  {
    year: "2017",
    title: "RISING STAR IN TECH",
    organization: "GLOBAL DEVELOPER AWARDS",
  },
  {
    year: "2018",
    title: "DEVELOPER OF THE YEAR",
    organization: "CODE EXCELLENCE AWARDS",
  },
  {
    year: "2019",
    title: "BEST TECH TEAM LEADER",
    organization: "UK SOFTWARE GUILD",
  },
  {
    year: "2020",
    title: "INNOVATION IN SOFTWARE ARCHITECTURE",
    organization: "DIGITAL INNOVATION AWARDS",
  },
  {
    year: "2021",
    title: "EMERGING TECH LEADER",
    organization: "LONDON TECH COUNCIL",
  },
  {
    year: "2022",
    title: "EXCELLENCE IN FULL-STACK DEVELOPMENT",
    organization: "DEVELOPER WEEKLY",
  },
  {
    year: "2023",
    title: "BEST SOFTWARE ENGINEER",
    organization: "EUROPEAN TECH & MEDIA",
  },
];

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
  sectionLabel = "/ CAREER PATH",
  heading = (
    <>
      BUILDING SOLUTIONS,
      <br /> SHAPING THE FUTURE
    </>
  ),
  experienceLabel = "/ EXPERIENCE",
  experiences = defaultExperiences,
  achievementsLabel = "/ ACHIEVEMENTS",
  awards = defaultAwards,
  className,
}: ListCareerTimelineProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-5">
            <span className="text-sm text-muted-foreground">{sectionLabel}</span>
            <h1 className="text-4xl md:text-6xl">{heading}</h1>
          </div>
          <div className="flex flex-col gap-7">
            <h2 className="text-xl">{experienceLabel}</h2>
            <div>
              {experiences.map((experience, idx) => (
                <React.Fragment key={idx}>
                  <Separator />
                  <div className="my-2.5 grid gap-2.5 text-sm sm:grid-cols-3">
                    <p className="text-muted-foreground">{experience.year}</p>
                    <p>{experience.role}</p>
                    <p className="text-muted-foreground">{experience.company}</p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-7">
            <h2 className="text-xl">{achievementsLabel}</h2>
            <div>
              {awards.map((award, idx) => (
                <React.Fragment key={idx}>
                  <Separator />
                  <div className="my-2.5 grid gap-2.5 text-sm sm:grid-cols-3">
                    <p className="text-muted-foreground">{award.year}</p>
                    <p>{award.title}</p>
                    <p className="text-muted-foreground">{award.organization}</p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
