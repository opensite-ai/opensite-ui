"use client";

import * as React from "react";
import { useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import { PatternName } from "@/components/ui/pattern-background";

export interface ProjectCardOverlayItem {
  id: number;
  category: string;
  title: string;
  image: string;
  description: string;
}

export interface ProjectCardOverlayProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Subheading/eyebrow content
   */
  subheading?: React.ReactNode;
  /**
   * Array of project configurations
   */
  projects?: ProjectCardOverlayItem[];
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
  /** Optional Section ID */
  sectionId?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

interface ProjectCardProps {
  project: ProjectCardOverlayItem;
  optixFlowConfig?: OptixFlowConfig;
  className?: string;
}

const ProjectCard = ({
  project,
  optixFlowConfig,
  className,
}: ProjectCardProps) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-3xl bg-foreground shadow-2xl",
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden">
        <Img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          optixFlowConfig={optixFlowConfig}
        />

        <div className="absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/20 to-transparent" />

        <div className="absolute top-4 left-4">
          <span className="inline-block rounded-full border border-border/20 bg-foreground/50 px-3 py-1.5 text-xs font-semibold text-background backdrop-blur-sm">
            {project.category}
          </span>
        </div>

        <div className="absolute top-4 right-4 translate-x-2 transform opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border/30 bg-card/20 backdrop-blur-sm">
            <DynamicIcon
              name="lucide/arrow-up-right"
              size={16}
              className="text-background"
            />
          </div>
        </div>

        <div className="absolute right-4 bottom-4 left-4">
          <h3 className="mb-1 text-2xl font-bold tracking-tight text-background md:text-3xl">
            {project.title}
          </h3>
          <p className="text-sm text-background/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {project.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * ProjectCardOverlay - Bold 2-column grid with gradient overlays and animated arrow indicators.
 *
 * Features square aspect ratio cards with full-bleed images, gradient overlays from bottom,
 * and category badges. On hover, cards scale slightly, images zoom, an arrow icon slides in
 * from the right, and description text fades in. Includes a dramatic split-line heading with
 * dot indicator. Perfect for photography portfolios, creative agencies, or any showcase
 * where bold visuals and interactive hover states create impact.
 */
export function ProjectCardOverlay({
  sectionId = "project-card-overlay",
  heading,
  subheading,
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
  subheadingClassName,
  gridClassName,
  cardClassName,
}: ProjectCardOverlayProps) {
  const renderedProjects = useMemo(() => {
    if (projectsSlot) return projectsSlot;
    if (!projects || projects.length === 0) return null;

    return projects.map((project) => (
      <ProjectCard
        key={project.id}
        project={project}
        optixFlowConfig={optixFlowConfig}
        className={cardClassName}
      />
    ));
  }, [projectsSlot, projects, optixFlowConfig, cardClassName]);

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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn("mb-20 text-center", headerClassName)}
        >
          <div className="mb-6">
            {subheading &&
              (typeof subheading === "string" ? (
                <span
                  className={cn(
                    "inline-flex items-center gap-2 text-sm font-medium tracking-wide text-muted-foreground",
                    subheadingClassName,
                  )}
                >
                  <div className="h-2 w-2 rounded-full bg-foreground"></div>
                  {subheading}
                </span>
              ) : (
                <div className={subheadingClassName}>{subheading}</div>
              ))}
          </div>
          {heading &&
            (typeof heading === "string" ? (
              <h1
                className={cn(
                  "text-6xl leading-none font-black tracking-tight md:text-8xl lg:text-9xl",
                  headingClassName,
                )}
              >
                {heading.split(" ").map((word, index) => (
                  <span key={index} className="block">
                    {word}
                  </span>
                ))}
              </h1>
            ) : (
              <div className={headingClassName}>{heading}</div>
            ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={cn(
            "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2",
            gridClassName,
          )}
        >
          {renderedProjects}
        </motion.div>
      </div>
    </Section>
  );
}
