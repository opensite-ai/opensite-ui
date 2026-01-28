"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import { PatternName } from "@/components/ui/pattern-background";

export interface ProjectFilterableThreeColumnItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

export interface ProjectFilterableThreeColumnProps {
  /**
   * Array of project configurations
   */
  projects?: ProjectFilterableThreeColumnItem[];
  /**
   * Custom slot for rendering projects (overrides projects array)
   */
  projectsSlot?: React.ReactNode;
  /**
   * Array of category filter options
   */
  categories?: string[];
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
   * Additional CSS classes for the filter buttons container
   */
  filterClassName?: string;
  /**
   * Additional CSS classes for each filter button
   */
  filterButtonClassName?: string;
  /**
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each card
   */
  cardClassName?: string;
}

/**
 * ProjectFilterableThreeColumn - Three-column filterable gallery with category tabs and hover overlays.
 *
 * Similar to ProjectFilterableGallery but displays projects in a 3-column grid instead of 2,
 * creating a denser gallery layout. Features horizontal filter buttons that animate the grid
 * when clicked. On hover, a dark overlay appears with category label, title, and description
 * sliding up. Filter transitions use smooth scale and opacity animations. Ideal for larger
 * portfolios where more items need to be visible at once while maintaining the interactive
 * filtering experience.
 */
export function ProjectFilterableThreeColumn({
  projects,
  projectsSlot,
  categories,
  optixFlowConfig,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  filterClassName,
  filterButtonClassName,
  gridClassName,
  cardClassName,
}: ProjectFilterableThreeColumnProps) {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [filteredItems, setFilteredItems] = useState(projects);

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);

    if (category === "ALL") {
      setFilteredItems(projects);
    } else {
      const filtered = projects?.filter(
        (item) =>
          item.category === category ||
          item.tags.includes(category.toLowerCase().replace(" ", "-")),
      );
      setFilteredItems(filtered);
    }
  };

  const renderedProjects = useMemo(() => {
    if (projectsSlot) return projectsSlot;
    if (!filteredItems || filteredItems.length === 0) return null;

    return filteredItems.map((item) => (
      <motion.div
        key={item.id}
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
        className={cn(
          "group relative cursor-pointer overflow-hidden rounded-lg",
          cardClassName,
        )}
      >
        <div className="relative aspect-4/3 h-96 w-full">
          <Img
            src={item.image}
            alt={item.title}
            className="object-cover transition-transform duration-300"
            optixFlowConfig={optixFlowConfig}
          />

          <motion.div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-8 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <motion.div className="translate-y-5 text-center opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="mb-4 text-xs font-medium tracking-widest text-gray-300">
                {item.category}
              </p>
              <h3 className="mb-4 text-2xl font-light tracking-wide">
                {item.title}
              </h3>
              <p className="max-w-xs text-sm leading-relaxed text-gray-200">
                {item.description}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    ));
  }, [projectsSlot, filteredItems, cardClassName, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <div className={cn("container", containerClassName)}>
        <div className="mx-auto max-w-7xl">
          <div
            className={cn(
              "mb-16 flex flex-wrap justify-center gap-8",
              filterClassName,
            )}
          >
            {categories?.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={cn(
                  "text-sm font-medium tracking-wider transition-colors duration-300 hover:text-foreground",
                  activeFilter === category
                    ? "border-b-2 border-border pb-1 text-foreground"
                    : "text-gray-500",
                  filterButtonClassName,
                )}
              >
                {category}
              </button>
            ))}
          </div>

          <motion.div
            layout
            className={cn(
              "grid grid-cols-1 gap-8 md:grid-cols-3",
              gridClassName,
            )}
          >
            <AnimatePresence mode="wait">{renderedProjects}</AnimatePresence>
          </motion.div>

          {(filteredItems?.length ?? 0) === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center"
            >
              <p className="text-lg text-gray-500">
                No items found for "{activeFilter}" category.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </Section>
  );
}
