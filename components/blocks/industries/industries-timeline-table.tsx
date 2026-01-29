"use client";

import * as React from "react";
import { useMemo } from "react";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";

export interface IndustryProject {
  /**
   * Year/date for the project
   */
  year: React.ReactNode;
  /**
   * Project/industry name
   */
  name: React.ReactNode;
  /**
   * Project description
   */
  description: React.ReactNode;
  /**
   * Image source URL
   */
  imageSrc: string;
  /**
   * Alt text for the image
   */
  imageAlt: string;
  /**
   * URL for the project link
   */
  url: string;
  /**
   * Additional CSS classes for the project row
   */
  className?: string;
}

export interface IndustriesTimelineTableProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Custom slot for heading (overrides heading prop)
   */
  headingSlot?: React.ReactNode;
  /**
   * Column labels for the table header
   */
  labels?: React.ReactNode[];
  /**
   * Custom slot for labels (overrides labels array)
   */
  labelsSlot?: React.ReactNode;
  /**
   * Array of industry projects to display
   */
  projects?: IndustryProject[];
  /**
   * Custom slot for projects (overrides projects array)
   */
  projectsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section wrapper
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
   * Additional CSS classes for the header row
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the projects container
   */
  projectsClassName?: string;
  /**
   * Additional CSS classes for individual project rows
   */
  itemClassName?: string;
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
  /**
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * IndustriesTimelineTable displays industry projects in a timeline-style table layout.
 *
 * Features a header row with customizable labels followed by project rows that reveal
 * background images on hover. Each row displays year, industry name, and description
 * with an arrow button that animates into view. The layout uses a responsive grid
 * that adapts column visibility on different screen sizes. Ideal for showcasing
 * project portfolios, industry timelines, or case study listings.
 *
 * @example
 * ```tsx
 * <IndustriesTimelineTable
 *   labels={["Year", "Industry", "Description"]}
 *   projects={[
 *     {
 *       year: "/2024",
 *       name: "/Consumer Tech",
 *       description: "Innovative consumer electronics solutions",
 *       imageSrc: "/project-image.jpg",
 *       imageAlt: "Project preview",
 *       url: "/projects/consumer-tech"
 *     }
 *   ]}
 * />
 * ```
 */
export function IndustriesTimelineTable({
  heading,
  headingSlot,
  labels,
  labelsSlot,
  projects,
  projectsSlot,
  className,
  containerClassName,
  headingClassName,
  headerClassName,
  projectsClassName,
  itemClassName,
  background,
  spacing = "py-6 md:py-32",
  pattern,
  patternOpacity,
  patternClassName,
  optixFlowConfig,
}: IndustriesTimelineTableProps): React.JSX.Element {
  const renderHeading = useMemo(() => {
    if (headingSlot) return headingSlot;
    if (!heading) return null;

    return typeof heading === "string" ? (
      <h2
        className={cn(
          "mb-8 text-3xl font-bold lg:text-4xl",
          headingClassName,
        )}
      >
        {heading}
      </h2>
    ) : (
      <div className={cn("mb-8", headingClassName)}>{heading}</div>
    );
  }, [headingSlot, heading, headingClassName]);

  const renderLabels = useMemo(() => {
    if (labelsSlot) return labelsSlot;
    if (!labels || labels.length === 0) return null;

    return (
      <div
        className={cn(
          "grid grid-cols-2 gap-8 font-medium text-muted-foreground md:grid-cols-3",
          headerClassName,
        )}
      >
        <div className="order-2 pl-10 text-sm md:order-1 lg:pl-10">
          {labels[0]}
        </div>
        <div className="order-1 pl-5 text-sm md:order-2 md:pl-0">
          {labels[1]}
        </div>
        <div className="hidden text-sm md:order-3 lg:block">{labels[2]}</div>
      </div>
    );
  }, [labelsSlot, labels, headerClassName]);

  const renderProjects = useMemo(() => {
    if (projectsSlot) return projectsSlot;
    if (!projects || projects.length === 0) return null;

    return (
      <div className={cn("space-y-0", projectsClassName)}>
        {projects.map((project, index) => (
          <Pressable
            href={project.url}
            key={index}
            className={cn("block", itemClassName, project.className)}
          >
            <div className="group relative mb-2 flex min-h-[100px] flex-col justify-center md:min-h-0 lg:mb-0">
              <div className="relative z-3 grid grid-cols-2 gap-8 transition-all duration-300 md:grid-cols-3 lg:hover:rounded-lg lg:hover:font-medium lg:hover:text-secondary lg:hover:shadow-lg">
                <div className="order-2 flex items-center md:order-1">
                  <span className="pl-10 text-xs font-medium text-secondary opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
                    {project.year}
                  </span>
                </div>
                <div className="order-1 col-span-1 grid grid-cols-2 gap-8 border-b border-muted-foreground/20 p-5 transition-all duration-300 md:order-2 md:col-span-2 md:p-10 md:pr-0 md:pl-0 lg:group-hover:border-transparent">
                  <div className="flex items-center">
                    <span className="ml-0 pl-0 text-xl font-medium text-secondary transition-all duration-300 md:text-2xl lg:group-hover:pl-2 lg:group-hover:text-secondary">
                      {project.name}
                    </span>
                  </div>
                  <div className="hidden items-center justify-between gap-4 lg:flex lg:pr-10">
                    <span className="text-sm text-secondary/80 opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
                      {project.description}
                    </span>
                    <span className="flex translate-x-full items-center justify-center rounded-full bg-primary p-1 text-secondary opacity-100 shadow-md transition-all duration-300 ease-out lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:opacity-100">
                      <DynamicIcon name="lucide/arrow-up-right" size={24} />
                    </span>
                  </div>
                </div>
              </div>
              <Img
                src={project.imageSrc}
                alt={project.imageAlt}
                className="absolute inset-0 z-1 h-full w-full object-cover opacity-100 transition-all duration-300 lg:opacity-0 lg:group-hover:opacity-100"
                loading="lazy"
                optixFlowConfig={optixFlowConfig}
              />
              <div className="absolute inset-0 z-2 bg-foreground/20 opacity-100 transition-all duration-300 lg:opacity-0 lg:group-hover:opacity-100" />
            </div>
          </Pressable>
        ))}
      </div>
    );
  }, [
    projectsSlot,
    projects,
    projectsClassName,
    itemClassName,
    optixFlowConfig,
  ]);

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn("min-h-screen", className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
    >
      <div className={cn("flex flex-col gap-8", containerClassName)}>
        {renderHeading}
        {renderLabels}
        {renderProjects}
      </div>
    </Section>
  );
}
