"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface ProjectGridMotionItem {
  title: string;
  img: string;
  year: string;
  type: string;
}

export interface ProjectGridMotionProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Array of project configurations
   */
  projects?: ProjectGridMotionItem[];
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
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each project card
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the card image container
   */
  imageContainerClassName?: string;
  /**
   * Additional CSS classes for the card footer
   */
  cardFooterClassName?: string;
}

const defaultProjects: ProjectGridMotionItem[] = [
  {
    title: "Modern Concrete Pavilion",
    img: imagePlaceholders[65],
    year: "2025",
    type: "Architecture",
  },
  {
    title: "Colorful Urban Living",
    img: imagePlaceholders[66],
    year: "2025",
    type: "Urban Design",
  },
  {
    title: "Minimalist Home Retreat",
    img: imagePlaceholders[67],
    year: "2025",
    type: "Interior",
  },
  {
    title: "Urban Concrete House",
    img: imagePlaceholders[68],
    year: "2025",
    type: "Product Design",
  },
  {
    title: "Luxury Concrete Box",
    img: imagePlaceholders[69],
    year: "2025",
    type: "Residential",
  },
  {
    title: "Glasshouse in Nature",
    img: imagePlaceholders[70],
    year: "2025",
    type: "Sustainable Design",
  },
];

/**
 * ProjectGridMotion - Two-column grid with staggered motion animations and metadata cards.
 *
 * Displays projects in a responsive 2-column grid with each card featuring a tall image,
 * title, type label, and year badge. Cards animate in with fade and slide effects staggered
 * by index. On hover, images scale up smoothly. Each card has a footer section with project
 * metadata and a pill-shaped year badge. Features a bold uppercase heading. Ideal for
 * architecture firms, design studios, or any portfolio where project metadata and clean
 * card presentation are important.
 */
export function ProjectGridMotion({
  heading = "Our Work",
  projects = defaultProjects,
  projectsSlot,
  optixFlowConfig,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  headingClassName,
  gridClassName,
  cardClassName,
  imageContainerClassName,
  cardFooterClassName,
}: ProjectGridMotionProps) {
  const renderProjects = () => {
    if (projectsSlot) return projectsSlot;
    if (!projects || projects.length === 0) return null;

    return projects.map((project, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        className={cn(
          "group overflow-hidden rounded-lg border border-border bg-background",
          cardClassName
        )}
      >
        <div className={cn("overflow-hidden", imageContainerClassName)}>
          <Img
            src={project.img}
            alt={project.title}
            className="h-96 w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            optixFlowConfig={optixFlowConfig}
          />
        </div>
        <div className={cn("flex items-center justify-between px-5 py-4", cardFooterClassName)}>
          <div>
            <h2 className="text-lg font-semibold">{project.title}</h2>
            <p className="text-muted-foreground">{project.type}</p>
          </div>
          <div className="rounded-2xl border border-border px-5 py-2 text-sm font-semibold">
            {project.year}
          </div>
        </div>
      </motion.div>
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
        {heading && (
          typeof heading === "string" ? (
            <h1 className={cn("text-7xl leading-tight font-bold uppercase", headingClassName)}>
              {heading}
            </h1>
          ) : (
            <div className={headingClassName}>{heading}</div>
          )
        )}

        <div className={cn("mt-10 grid grid-cols-1 gap-6 md:grid-cols-2", gridClassName)}>
          {renderProjects()}
        </div>
      </div>
    </Section>
  );
}
