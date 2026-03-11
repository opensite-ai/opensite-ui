"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import { PatternName } from "@/components/ui/pattern-background";

export interface ProjectInteractiveHoverRevealItem {
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
}

export interface ProjectInteractiveHoverRevealProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Subheading/description content
   */
  subheading?: React.ReactNode;
  /**
   * Array of project configurations
   */
  projects?: ProjectInteractiveHoverRevealItem[];
  /**
   * Custom slot for rendering projects (overrides projects array)
   */
  projectsSlot?: React.ReactNode;
  /**
   * Label for project link
   */
  projectLinkLabel?: React.ReactNode;
  /**
   * Custom icon element for project link
   */
  projectLinkIcon?: React.ReactNode;
  /**
   * Icon name for project link (e.g., "lucide/arrow-right")
   */
  projectLinkIconName?: string;
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
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each project card
   */
  cardClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * ProjectInteractiveHoverReveal - Three-column grid with expanded content on hover.
 *
 * Displays projects in a 3-column grid of tall cards with full-bleed images and gradient
 * overlays. In the default state, only category and title are visible at the bottom.
 * On hover, the card expands to show the full description and a "View Project" link with
 * arrow icon. The image scales up and the overlay darkens for emphasis. Perfect for
 * design portfolios, creative showcases, or any gallery where visual impact is primary
 * but detailed information should be accessible on demand.
 */
export function ProjectInteractiveHoverReveal({
  sectionId = "project-interactive-hover-reveal",
  heading,
  subheading,
  projects,
  projectsSlot,
  projectLinkLabel,
  projectLinkIcon,
  projectLinkIconName,
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
  gridClassName,
  cardClassName,
}: ProjectInteractiveHoverRevealProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const renderedProjects = useMemo(() => {
    if (projectsSlot) return projectsSlot;
    if (!projects || projects.length === 0) return null;

    return projects.map((project, index) => (
      <Pressable
        href={project.link}
        key={index}
        className={cn(
          "group relative block h-80 overflow-hidden rounded-xl",
          cardClassName,
        )}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div className="absolute inset-0 h-full w-full">
          <Img
            src={project.image}
            alt={project.title}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            optixFlowConfig={optixFlowConfig}
          />
          <div className="absolute inset-0 bg-linear-to-t from-foreground/90 via-foreground/60 to-foreground/30 opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
        </div>

        <div
          className={`absolute bottom-0 left-0 p-6 transition-all duration-300 ease-in-out ${
            hoveredIndex === index ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="text-sm font-medium tracking-wider text-background uppercase">
            {project.category}
          </div>
          <h3 className="text-xl font-bold text-background drop-shadow-md">
            {project.title}
          </h3>
        </div>

        <div
          className={`absolute inset-0 flex flex-col justify-end p-6 transition-all duration-300 ease-in-out ${
            hoveredIndex === index ? "opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="text-sm font-medium tracking-wider text-background uppercase">
            {project.category}
          </div>
          <h3 className="mb-2 text-xl font-bold text-background drop-shadow-md">
            {project.title}
          </h3>
          <p className="mb-3 text-sm font-medium text-background drop-shadow">
            {project.description}
          </p>
          <span className="inline-flex items-center text-sm font-medium text-background drop-shadow">
            {projectLinkLabel ?? "View Project"}{" "}
            {projectLinkIcon ?? (projectLinkIconName ? (
              <DynamicIcon name={projectLinkIconName} size={14} className="ml-1" />
            ) : (
              <DynamicIcon name="lucide/arrow-right" size={14} className="ml-1" />
            ))}
          </span>
        </div>
      </Pressable>
    ));
  }, [projectsSlot, projects, cardClassName, optixFlowConfig, projectLinkLabel, projectLinkIcon, projectLinkIconName, hoveredIndex]);

  return (
    <Section
      id={sectionId}
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
            "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
            gridClassName,
          )}
        >
          {renderedProjects}
        </div>
      </div>
    </Section>
  );
}
