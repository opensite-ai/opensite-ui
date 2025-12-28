"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectFilterableThreeColumnItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

export interface ProjectFilterableThreeColumnProps {
  className?: string;
  projects?: ProjectFilterableThreeColumnItem[];
  categories?: string[];
  optixFlowConfig?: OptixFlowConfig;
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
  className,
  projects = defaultProjects,
  categories = defaultCategories,
  optixFlowConfig,
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

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-wrap justify-center gap-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`text-sm font-medium tracking-wider transition-colors duration-300 hover:text-foreground ${
                  activeFilter === category
                    ? "border-b-2 border-border pb-1 text-foreground"
                    : "text-gray-500"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <AnimatePresence mode="wait">
              {filteredItems.map((item) => (
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
                  className="group relative cursor-pointer overflow-hidden rounded-lg"
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
              ))}
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
    </section>
  );
}
