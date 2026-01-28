"use client";

import * as React from "react";
import { useMemo } from "react";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import { PatternName } from "@/components/ui/pattern-background";

export interface ProjectShowcaseAlternatingItem {
  title: string;
  description: string;
  imagePath: string;
  imageAlt: string;
}

export interface ProjectShowcaseAlternatingProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Array of project configurations
   */
  projects?: ProjectShowcaseAlternatingItem[];
  /**
   * Custom slot for rendering projects (overrides projects array)
   */
  projectsSlot?: React.ReactNode;
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
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the projects list
   */
  listClassName?: string;
  /**
   * Additional CSS classes for each card
   */
  cardClassName?: string;
}

/**
 * ProjectShowcaseAlternating - Elegant alternating layout with large images and descriptive text.
 *
 * Features a serif-styled main heading followed by project cards in a 4:8 column split.
 * Each card displays the project title in bold uppercase, a detailed description, and a
 * large 4:3 aspect ratio image. The layout maintains consistent left-text, right-image
 * arrangement with generous vertical spacing between projects. Ideal for creative agencies,
 * design portfolios, or any showcase where storytelling and visual impact are equally
 * important.
 */
export function ProjectShowcaseAlternating({
  heading,
  projects,
  projectsSlot,
  optixFlowConfig,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  headingClassName,
  listClassName,
  cardClassName,
}: ProjectShowcaseAlternatingProps) {
  const renderedProjects = useMemo(() => {
    if (projectsSlot) return projectsSlot;
    if (!projects || projects.length === 0) return null;

    return projects.map((project, index) => (
      <div
        key={index}
        className={cn(
          "grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12",
          cardClassName,
        )}
      >
        <div className="order-2 lg:order-1 lg:col-span-4">
          <h2 className="mb-4 font-sans text-base font-bold tracking-wider text-foreground uppercase md:text-base">
            {project.title}
          </h2>
          <p className="max-w-sm font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
            {project.description}
          </p>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-8">
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg border border-border">
            <Img
              src={project.imagePath}
              alt={project.imageAlt}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </div>
      </div>
    ));
  }, [projectsSlot, projects, cardClassName, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <div className={cn("container", containerClassName)}>
        {heading &&
          (typeof heading === "string" ? (
            <h1
              className={cn(
                "mb-16 font-serif text-4xl font-normal tracking-wide text-foreground md:mb-24 md:text-6xl lg:text-7xl",
                headingClassName,
              )}
            >
              {heading}
            </h1>
          ) : (
            <div className={headingClassName}>{heading}</div>
          ))}

        <div
          className={cn(
            "space-y-16 md:space-y-24 lg:space-y-32",
            listClassName,
          )}
        >
          {renderedProjects}
        </div>
      </div>
    </Section>
  );
}
