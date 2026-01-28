"use client";

import * as React from "react";
import { useMemo } from "react";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Card, CardContent } from "../../ui/card";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import { PatternName } from "@/components/ui/pattern-background";

export interface ProjectWorkShowcaseProject {
  title: string;
  image: string;
  description: string;
  link: string;
}

export interface ProjectWorkShowcaseItem {
  role: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
  projects: ProjectWorkShowcaseProject[];
}

export interface ProjectWorkShowcaseProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Subheading/description content
   */
  subheading?: React.ReactNode;
  /**
   * Array of experience configurations
   */
  experiences?: ProjectWorkShowcaseItem[];
  /**
   * Custom slot for rendering experiences (overrides experiences array)
   */
  experiencesSlot?: React.ReactNode;
  /**
   * Label for the projects section heading (defaults to "Key Projects")
   */
  projectsSectionLabel?: React.ReactNode;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
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
   * Additional CSS classes for the experiences list
   */
  listClassName?: string;
  /**
   * Additional CSS classes for each experience card
   */
  cardClassName?: string;
}

/**
 * ProjectWorkShowcase - Work experience cards with embedded project galleries.
 *
 * Displays professional experience in stacked full-width cards, each containing a header
 * section with role, company, duration, description, and technology badges. Below the
 * header, a "Key Projects" section shows 2-column grid of project cards with images,
 * titles, descriptions, and "View Project" links. Perfect for developer portfolios or
 * any professional showcase where work history needs to be tied to specific deliverables
 * and project outcomes.
 */
export function ProjectWorkShowcase({
  heading,
  subheading,
  experiences,
  experiencesSlot,
  projectsSectionLabel,
  optixFlowConfig,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  subheadingClassName,
  listClassName,
  cardClassName,
}: ProjectWorkShowcaseProps) {
  const renderedExperiences = useMemo(() => {
    if (experiencesSlot) return experiencesSlot;
    if (!experiences || experiences.length === 0) return null;

    return experiences.map((experience, index) => (
      <Card key={index} className={cn("overflow-hidden p-0", cardClassName)}>
        <CardContent className="p-0">
          <div className="bg-muted/50 p-6 md:p-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <h3 className="text-2xl font-bold">{experience.role}</h3>
                <div className="text-muted-foreground my-1 flex items-center gap-2">
                  <span className="font-medium">{experience.company}</span>
                  <span>•</span>
                  <span>{experience.duration}</span>
                </div>
                <p className="text-muted-foreground mt-2 max-w-3xl">
                  {experience.description}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {experience.technologies.map((tech, techIndex) => (
                <Badge key={techIndex} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="p-6 md:p-8">
            <h4 className="mb-4 font-semibold">{projectsSectionLabel ?? "Key Projects"}</h4>

            <div className="grid gap-6 sm:grid-cols-2">
              {experience.projects.map((project, projectIndex) => (
                <div
                  key={projectIndex}
                  className="group overflow-hidden rounded-lg border"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Img
                      src={project.image}
                      alt={project.title}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                  <div className="p-4">
                    <h5 className="font-bold">{project.title}</h5>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {project.description}
                    </p>
                    <Pressable
                      href={project.link}
                      size="sm"
                      variant="ghost"
                      className="mt-2 px-0"
                    >
                      View Project
                      <DynamicIcon
                        name="lucide/external-link"
                        size={14}
                        className="ml-1"
                      />
                    </Pressable>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    ));
  }, [experiencesSlot, experiences, cardClassName]);

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

        <div className={cn("space-y-10", listClassName)}>
          {renderedExperiences}
        </div>
      </div>
    </Section>
  );
}
