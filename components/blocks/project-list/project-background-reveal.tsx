"use client";

import * as React from "react";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface ProjectBackgroundRevealItem {
  heading: string;
  subheading: string;
  description: string;
  image: string;
  url: string;
}

export interface ProjectBackgroundRevealProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Subheading/eyebrow content
   */
  subheading?: React.ReactNode;
  /**
   * Description text
   */
  description?: React.ReactNode;
  /**
   * CTA button text
   */
  buttonText?: React.ReactNode;
  /**
   * CTA button href
   */
  buttonHref?: string;
  /**
   * Array of project configurations
   */
  projects?: ProjectBackgroundRevealItem[];
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
  pattern?: string;
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
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the projects list
   */
  listClassName?: string;
  /**
   * Additional CSS classes for each project card
   */
  cardClassName?: string;
}

/**
 * ProjectBackgroundReveal - Full-width cards with background image reveal on hover.
 *
 * Features a header section with title, description, and CTA button, followed by stacked
 * full-width project cards. Each card uses the project image as a background with a dark
 * blur overlay that fades on hover to reveal the image. Cards display a numbered index,
 * title, subtitle, and description. On hover, a "View project" button slides in. The
 * overlay transitions from heavy blur to clear, creating a dramatic reveal effect. Perfect
 * for interior design portfolios, architecture showcases, or any project listing where
 * immersive imagery and detailed descriptions work together.
 */
export function ProjectBackgroundReveal({
  heading,
  subheading,
  description,
  buttonText,
  buttonHref,
  projects,
  projectsSlot,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  subheadingClassName,
  descriptionClassName,
  listClassName,
  cardClassName,
}: ProjectBackgroundRevealProps) {
  const renderProjects = () => {
    if (projectsSlot) return projectsSlot;
    if (!projects || projects.length === 0) return null;

    return projects.map((project, idx) => (
      <Pressable
        key={idx}
        href={project.url}
        className={cn(
          "group relative isolate min-h-72 bg-cover bg-center px-5 py-14 lg:px-12 lg:py-24",
          cardClassName
        )}
        style={{
          backgroundImage: `url(${project.image})`,
        }}
      >
        <div className="relative z-10 flex flex-col gap-7 text-white/80 transition-colors duration-300 ease-out group-hover:text-white lg:flex-row">
          <div className="flex gap-1 text-2xl font-bold">
            <span>/</span>
            <span>{String(idx + 1).padStart(2, "0")}</span>
          </div>
          <div className="flex flex-1 flex-col gap-2.5">
            <h3 className="text-2xl font-bold lg:text-4xl">
              {project.heading}
            </h3>
            <p className="text-sm font-medium uppercase">
              {project.subheading}
            </p>
          </div>
          <div className="flex-1">
            <div className="flex flex-col">
              <p>{project.description}</p>
              <div className="mt-2.5 h-0 overflow-hidden transition-all duration-300 ease-out group-hover:h-10">
                <div>
                  <Pressable
                    variant="outline"
                    size="lg"
                    className="dark w-fit opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
                  >
                    View project
                    <DynamicIcon name="lucide/arrow-up-right" size={16} />
                  </Pressable>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-0 bg-black/80 backdrop-blur-sm transition-all duration-300 ease-out group-hover:bg-black/50 group-hover:backdrop-blur-none" />
      </Pressable>
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
      <div className={cn("container", containerClassName)}>
        <div className={headerClassName}>
          {subheading && (
            typeof subheading === "string" ? (
              <p className={cn("mb-1 text-muted-foreground uppercase md:text-lg", subheadingClassName)}>
                {subheading}
              </p>
            ) : (
              <div className={subheadingClassName}>{subheading}</div>
            )
          )}
          {heading && (
            typeof heading === "string" ? (
              <h1 className={cn("text-3xl font-bold uppercase md:text-7xl", headingClassName)}>{heading}</h1>
            ) : (
              <div className={headingClassName}>{heading}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("mt-7 max-w-2xl text-muted-foreground", descriptionClassName)}>{description}</p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
          <Pressable
            href={buttonHref}
            variant="outline"
            size="lg"
            className="mt-7"
          >
            {buttonText}
            <DynamicIcon name="lucide/arrow-down-right" size={16} />
          </Pressable>
        </div>
        <div className={cn("mt-24 flex flex-col gap-5 md:mt-36", listClassName)}>
          {renderProjects()}
        </div>
      </div>
    </Section>
  );
}
