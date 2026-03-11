"use client";

import * as React from "react";
import { useMemo } from "react";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import { PatternName } from "@/components/ui/pattern-background";

export interface ProjectTableListItem {
  id: number;
  title: string;
  description: string;
  launchDate: string;
  image: string;
}

export interface ProjectTableListProps {
  /**
   * Array of project configurations
   */
  projects?: ProjectTableListItem[];
  /**
   * Custom slot for rendering projects (overrides projects array)
   */
  projectsSlot?: React.ReactNode;
  /**
   * Label for "PROJECTS" header column
   */
  projectsHeaderLabel?: React.ReactNode;
  /**
   * Label for "DESCRIPTION" header column
   */
  descriptionHeaderLabel?: React.ReactNode;
  /**
   * Label for "GALLERY" header column
   */
  galleryHeaderLabel?: React.ReactNode;
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
   * Additional CSS classes for the list
   */
  listClassName?: string;
  /**
   * Additional CSS classes for the header row
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for each row
   */
  rowClassName?: string;
  /**
   * Additional CSS classes for the project info column
   */
  infoColumnClassName?: string;
  /**
   * Additional CSS classes for the description column
   */
  descriptionColumnClassName?: string;
  /**
   * Additional CSS classes for the gallery column
   */
  galleryColumnClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * ProjectTableList - Table-style project list with numbered rows and gallery thumbnails.
 *
 * Presents projects in a structured table format with three columns: project info
 * (number, title, date), description, and gallery thumbnail. Features a header row
 * visible on larger screens. Each row is separated by borders with generous padding.
 * The numbered format (01, 02, etc.) adds a professional, organized feel. Ideal for
 * case studies, portfolio items, or any project listing where detailed descriptions
 * and chronological ordering are important. Responsive layout stacks columns on mobile.
 */
export function ProjectTableList({
  sectionId = "project-table-list",
  projects,
  projectsSlot,
  projectsHeaderLabel,
  descriptionHeaderLabel,
  galleryHeaderLabel,
  optixFlowConfig,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  listClassName,
  headerClassName,
  rowClassName,
  infoColumnClassName,
  descriptionColumnClassName,
  galleryColumnClassName,
}: ProjectTableListProps) {
  const renderedProjects = useMemo(() => {
    if (projectsSlot) return projectsSlot;
    if (!projects || projects.length === 0) return null;

    return projects.map((project, index) => (
      <li
        key={project.id}
        className={cn(
          "flex w-full flex-col justify-between gap-10 border-b py-10 lg:flex-row lg:py-15",
          rowClassName,
        )}
      >
        <div
          className={cn(
            "flex gap-4 text-xl font-medium tracking-tighter uppercase lg:w-1/4",
            infoColumnClassName,
          )}
        >
          <p className="">0{index + 1}</p>
          <div className="flex flex-col gap-1">
            <p>{project.title}</p>
            <p>({project.launchDate})</p>
          </div>
        </div>
        <div
          className={cn(
            "text-2xl lg:w-2/4 lg:text-3xl",
            descriptionColumnClassName,
          )}
        >
          {project.description}
        </div>
        <div
          className={cn(
            "w-full text-right text-sm text-foreground/50 uppercase lg:h-30 lg:w-1/4 lg:pl-20 lg:text-base",
            galleryColumnClassName,
          )}
        >
          <Img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
            optixFlowConfig={optixFlowConfig}
          />
        </div>
      </li>
    ));
  }, [projectsSlot, projects, rowClassName, infoColumnClassName, descriptionColumnClassName, galleryColumnClassName, optixFlowConfig]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <div className={cn("container", containerClassName)}>
        <ul className={cn("relative w-full", listClassName)}>
          <li
            className={cn(
              "hidden justify-between gap-10 border-b pt-15 pb-2 text-sm tracking-tight text-foreground/40 uppercase lg:flex lg:text-base",
              headerClassName,
            )}
          >
            <p className="w-1/4">{projectsHeaderLabel ?? "PROJECTS"}</p>
            <p className="w-2/4">{descriptionHeaderLabel ?? "DESCRIPTION"}</p>
            <p className="w-1/4 text-right">{galleryHeaderLabel ?? "GALLERY"}</p>
          </li>
          {renderedProjects}
        </ul>
      </div>
    </Section>
  );
}
