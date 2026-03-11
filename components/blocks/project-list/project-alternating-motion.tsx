"use client";

import * as React from "react";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import { PatternName } from "@/components/ui/pattern-background";

export interface ProjectAlternatingMotionItem {
  title: string;
  description: string;
  image: string;
  tag: string;
}

export interface ProjectAlternatingMotionProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Array of project configurations
   */
  projects?: ProjectAlternatingMotionItem[];
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
   * Additional CSS classes for the header
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the projects list
   */
  listClassName?: string;
  /**
   * Additional CSS classes for each project card
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the content area
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the image container
   */
  imageContainerClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * ProjectAlternatingMotion - Alternating layout project showcase with scroll-triggered motion animations.
 *
 * Features a two-column alternating layout where each project displays an image on one side
 * and text content (title, description, tag badge) on the other. Images animate in from above
 * while content fades in from below as they enter the viewport. Includes a header section
 * with a bordered title. Ideal for architecture portfolios, design showcases, or any project
 * listing that benefits from dramatic reveal animations and clean alternating presentation.
 */
export function ProjectAlternatingMotion({
  sectionId = "project-alternating-motion",
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
  headerClassName,
  headingClassName,
  listClassName,
  cardClassName,
  contentClassName,
  imageContainerClassName,
}: ProjectAlternatingMotionProps) {
  const renderedProjects = useMemo(() => {
    if (projectsSlot) return projectsSlot;
    if (!projects || projects.length === 0) return null;

    return projects.map((project, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "flex flex-col-reverse gap-6 md:grid md:grid-cols-2 md:pt-10",
          cardClassName,
        )}
      >
        <div className={cn("flex flex-col justify-between", contentClassName)}>
          <h3 className="mb-2 text-lg font-medium sm:text-4xl">
            {project.title}
          </h3>
          <div>
            <p className="mb-3 max-w-sm text-sm font-medium">
              {project.description}
            </p>
            <Badge variant="outline" className="px-3 py-2">
              {project.tag}
            </Badge>
          </div>
        </div>

        <motion.div
          className={cn(
            "aspect-3/2 w-full overflow-hidden rounded-sm",
            imageContainerClassName,
          )}
          initial={{ y: -80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Img
            src={project.image}
            alt={project.title}
            className="h-full w-full rounded-sm object-cover"
            optixFlowConfig={optixFlowConfig}
          />
        </motion.div>
      </motion.div>
    ));
  }, [projectsSlot, projects, cardClassName, contentClassName, imageContainerClassName, optixFlowConfig]);

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
        <div
          className={cn(
            "mb-10 flex items-center justify-between border-b border-border pb-4",
            headerClassName,
          )}
        >
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "text-2xl font-semibold sm:text-lg",
                  headingClassName,
                )}
              >
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            ))}
        </div>
        <div className={cn("space-y-12", listClassName)}>
          {renderedProjects}
        </div>
      </div>
    </Section>
  );
}
