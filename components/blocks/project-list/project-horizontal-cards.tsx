"use client";

import * as React from "react";
import { useMemo } from "react";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import { PatternName } from "@/components/ui/pattern-background";

export interface ProjectHorizontalCardsItem {
  title: string;
  image: string;
  description: string;
  client: string;
  role: string;
  technologies: string[];
  year: string;
  link: string;
}

export interface ProjectHorizontalCardsProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Subheading content
   */
  subheading?: React.ReactNode;
  /**
   * Array of project configurations
   */
  projects?: ProjectHorizontalCardsItem[];
  /**
   * Custom slot for rendering projects (overrides projects array)
   */
  projectsSlot?: React.ReactNode;
  /**
   * Label for project link button
   */
  projectLinkLabel?: React.ReactNode;
  /**
   * Custom icon element for project link button
   */
  projectLinkIcon?: React.ReactNode;
  /**
   * Icon name for project link button (e.g., "lucide/arrow-right")
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
   * Additional CSS classes for the list container
   */
  listClassName?: string;
  /**
   * Additional CSS classes for each card
   */
  cardClassName?: string;
}

/**
 * ProjectHorizontalCards - Wide horizontal cards with image sidebar and detailed metadata.
 *
 * Displays projects in stacked horizontal cards with a 1:2 image-to-content ratio.
 * Each card features a 16:9 image on the left, with technology badges, title, client/role/year
 * metadata, description, and "View Project" button on the right. Cards have subtle hover
 * effects and rounded corners. Perfect for design portfolios, case study listings, or any
 * showcase where project context (client, role, year) is as important as the visual.
 */
export function ProjectHorizontalCards({
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
  listClassName,
  cardClassName,
}: ProjectHorizontalCardsProps) {
  const renderedProjects = useMemo(() => {
    if (projectsSlot) return projectsSlot;
    if (!projects || projects.length === 0) return null;

    return projects.map((project, index) => (
      <div
        key={index}
        className={cn(
          "overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md",
          getNestedCardBg(background, "card"),
          getNestedCardTextColor(background),
          cardClassName,
        )}
      >
        <div className="grid md:grid-cols-3">
          <div className="relative aspect-video w-full overflow-hidden md:aspect-auto md:h-full">
            <Img
              src={project.image}
              alt={project.title}
              className="object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>

          <div className="p-6 md:col-span-2 md:p-8">
            <div className="mb-2 flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech, techIndex) => (
                <Badge key={techIndex} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>

            <h3 className="mb-2 text-xl font-bold md:text-2xl">
              {project.title}
            </h3>

            <div className="text-muted-foreground mb-4 flex flex-col flex-wrap gap-x-4 text-sm md:flex-row">
              <span>{project.client}</span>
              <span className="hidden md:inline">•</span>
              <span>{project.role}</span>
              <span className="hidden md:inline">•</span>
              <span>{project.year}</span>
            </div>

            <p className="text-muted-foreground mb-6">{project.description}</p>

            <Pressable href={project.link} variant="outline" size="sm">
              {projectLinkLabel ?? "View Project"}{" "}
              {projectLinkIcon ?? (projectLinkIconName ? (
                <DynamicIcon
                  name={projectLinkIconName}
                  size={14}
                  className="ml-1"
                />
              ) : (
                <DynamicIcon
                  name="lucide/arrow-right"
                  size={14}
                  className="ml-1"
                />
              ))}
            </Pressable>
          </div>
        </div>
      </div>
    ));
  }, [projectsSlot, projects, cardClassName, optixFlowConfig, projectLinkLabel, projectLinkIcon, projectLinkIconName]);

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
          {renderedProjects}
        </div>
      </div>
    </Section>
  );
}
