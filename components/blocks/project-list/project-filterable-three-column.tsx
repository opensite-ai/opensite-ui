"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

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

const defaultProjects: ProjectFilterableThreeColumnItem[] = [
  {
    id: 1,
    title: "Kinetic Flow",
    category: "MOONLIGHT VISIONS",
    description:
      "A minimal line illustration capturing the dynamic movement of human posture in motion.",
    image: imagePlaceholders[109],
    tags: ["line-art", "artwork"],
  },
  {
    id: 2,
    title: "Echoes of the Canyon",
    category: "PIXEL PARADE",
    description:
      "Breathtaking photo series highlighting the textures and tones of majestic canyon walls.",
    image: imagePlaceholders[110],
    tags: ["photos", "nature"],
  },
  {
    id: 3,
    title: "Serenity in the Highlands",
    category: "WANDER SKETCHES",
    description:
      "A tranquil landscape painting inspired by the rolling hills and cloudy skies of northern Scotland.",
    image: imagePlaceholders[111],
    tags: ["paintings", "landscape"],
  },
  {
    id: 4,
    title: "Visual Tales",
    category: "ECHO FIELDS",
    description:
      "A bold exploration of modern storytelling through layered textures and abstract elements.",
    image: imagePlaceholders[112],
    tags: ["artwork", "digital"],
  },
  {
    id: 5,
    title: "Quiet Garden",
    category: "NEON TAPESTRY",
    description:
      "A meditative pencil sketch inspired by the harmony and simplicity of Japanese zen gardens.",
    image: imagePlaceholders[113],
    tags: ["sketches", "traditional"],
  },
  {
    id: 6,
    title: "Stardust Stories",
    category: "VIDEOS",
    description:
      "A short cinematic video capturing the interplay of sunlight through crystal at golden hour.",
    image: imagePlaceholders[114],
    tags: ["videos", "cinematic"],
  },
];

const defaultCategories = [
  "ALL",
  "MOONLIGHT VISIONS",
  "PIXEL PARADE",
  "WANDER SKETCHES",
  "ECHO FIELDS",
  "NEON TAPESTRY",
];

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
  projects = defaultProjects,
  projectsSlot,
  categories = defaultCategories,
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
      const filtered = projects.filter(
        (item) =>
          item.category === category ||
          item.tags.includes(category.toLowerCase().replace(" ", "-"))
      );
      setFilteredItems(filtered);
    }
  };

  const renderProjects = () => {
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
        className={cn("group relative cursor-pointer overflow-hidden rounded-lg", cardClassName)}
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
        <div className="mx-auto max-w-7xl">
          <div className={cn("mb-16 flex flex-wrap justify-center gap-8", filterClassName)}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={cn(
                  "text-sm font-medium tracking-wider transition-colors duration-300 hover:text-foreground",
                  activeFilter === category
                    ? "border-b-2 border-border pb-1 text-foreground"
                    : "text-gray-500",
                  filterButtonClassName
                )}
              >
                {category}
              </button>
            ))}
          </div>

          <motion.div layout className={cn("grid grid-cols-1 gap-8 md:grid-cols-3", gridClassName)}>
            <AnimatePresence mode="wait">
              {renderProjects()}
            </AnimatePresence>
          </motion.div>

          {filteredItems.length === 0 && (
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
