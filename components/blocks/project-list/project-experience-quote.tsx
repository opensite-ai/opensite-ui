"use client";

import * as React from "react";

import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Card, CardContent } from "../../ui/card";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import { PatternName } from "@/components/ui/pattern-background";

export interface ProjectExperienceQuoteItem {
  role: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  achievements: string[];
  quote: {
    text: string;
    author: string;
    position: string;
  };
  link: string;
}

export interface ProjectExperienceQuoteProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Subheading content
   */
  subheading?: React.ReactNode;
  /**
   * Array of experience configurations
   */
  experiences?: ProjectExperienceQuoteItem[];
  /**
   * Custom slot for rendering experiences (overrides experiences array)
   */
  experiencesSlot?: React.ReactNode;
  /**
   * Section background style
   */
  background?: SectionBackground;
  /**
   * Section spacing
   */
  spacing?: SectionSpacing;
  /**
   * Background pattern
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header area
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the subheading
   */
  subheadingClassName?: string;
  /**
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each card
   */
  cardClassName?: string;
}

/**
 * ProjectExperienceQuote - Professional experience cards with testimonial quotes.
 *
 * Displays work experience in a 3-column grid of cards, each featuring a colored header
 * with role and company, followed by location/duration metadata with icons, description,
 * bulleted achievements list, and a testimonial quote section. Each card includes a
 * "View Full Details" button. The testimonial section has a quote icon and attribution.
 * Perfect for professional portfolios, resume websites, or career pages where work
 * history needs to be presented alongside endorsements.
 */
export function ProjectExperienceQuote({
  heading,
  subheading,
  experiences,
  experiencesSlot,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  subheadingClassName,
  gridClassName,
  cardClassName,
}: ProjectExperienceQuoteProps) {
  const renderExperiences = () => {
    if (experiencesSlot) return experiencesSlot;
    if (!experiences || experiences.length === 0) return null;

    return experiences.map((experience, index) => (
      <Card
        key={index}
        className={cn(
          "flex h-full flex-col overflow-hidden p-0 shadow-sm transition-all hover:shadow-md",
          cardClassName,
        )}
      >
        <CardContent className="flex h-full flex-col p-0">
          <div className="bg-primary text-primary-foreground p-6">
            <h3 className="mb-1 text-xl font-bold">{experience.role}</h3>
            <p className="text-primary-foreground/90 font-medium">
              {experience.company}
            </p>
          </div>

          <div className="flex flex-1 flex-col p-6">
            <div className="mb-4 flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <DynamicIcon
                  name="lucide/calendar-days"
                  size={16}
                  className="text-muted-foreground/70"
                />
                <span className="text-muted-foreground">
                  {experience.duration}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <DynamicIcon
                  name="lucide/map-pin"
                  size={16}
                  className="text-muted-foreground/70"
                />
                <span className="text-muted-foreground">
                  {experience.location}
                </span>
              </div>
            </div>

            <p className="text-muted-foreground mb-4 text-sm">
              {experience.description}
            </p>

            <div className="mb-6">
              <h4 className="mb-2 text-sm font-semibold">Key Achievements</h4>
              <ul className="text-muted-foreground space-y-1 text-sm">
                {experience.achievements.map(
                  (achievement, achievementIndex) => (
                    <li key={achievementIndex} className="flex items-start">
                      <span className="bg-primary/10 text-primary mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs">
                        •
                      </span>
                      <span>{achievement}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className="bg-muted/50 mt-auto rounded-lg p-4">
              <div className="mb-2 flex items-center gap-2">
                <DynamicIcon
                  name="lucide/quote"
                  size={16}
                  className="text-primary"
                />
                <span className="text-sm font-medium">Testimonial</span>
              </div>
              <p className="text-muted-foreground mb-3 text-sm italic">
                &quot;{experience.quote.text}&quot;
              </p>
              <div className="text-sm">
                <p className="font-medium">{experience.quote.author}</p>
                <p className="text-muted-foreground text-xs">
                  {experience.quote.position}
                </p>
              </div>
            </div>

            <Pressable href={experience.link} className="mt-6 w-full">
              View Full Details
            </Pressable>
          </div>
        </CardContent>
      </Card>
    ));
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <div
        className={cn(
          "container mx-auto px-4 md:px-6 2xl:max-w-[1400px]",
          containerClassName,
        )}
      >
        <div className={cn("mb-12 text-center md:mb-16", headerClassName)}>
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl",
                  headingClassName,
                )}
              >
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            ))}
          {subheading &&
            (typeof subheading === "string" ? (
              <p
                className={cn(
                  "text-muted-foreground mx-auto max-w-3xl text-lg",
                  subheadingClassName,
                )}
              >
                {subheading}
              </p>
            ) : (
              <div className={subheadingClassName}>{subheading}</div>
            ))}
        </div>

        <div
          className={cn(
            "grid gap-8 md:grid-cols-2 lg:grid-cols-3",
            gridClassName,
          )}
        >
          {renderExperiences()}
        </div>
      </div>
    </Section>
  );
}
