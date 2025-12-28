"use client";

import { useState } from "react";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectInteractiveHoverRevealItem {
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
}

export interface ProjectInteractiveHoverRevealProps {
  className?: string;
  heading?: string;
  subheading?: string;
  projects?: ProjectInteractiveHoverRevealItem[];
  optixFlowConfig?: OptixFlowConfig;
}

const defaultProjects: ProjectInteractiveHoverRevealItem[] = [
  {
    title: "Photography Portfolio Website",
    category: "Web Design",
    description:
      "A minimalist website designed to showcase a professional photographer's work with advanced filtering and gallery features.",
    image: imagePlaceholders[8],
    link: "#",
  },
  {
    title: "Health & Fitness App",
    category: "Mobile App Design",
    description:
      "A comprehensive fitness tracking application designed to help users maintain their health goals with personalized recommendations.",
    image: imagePlaceholders[9],
    link: "#",
  },
  {
    title: "Eco-Friendly Product Packaging",
    category: "Brand Design",
    description:
      "Sustainable packaging design for an eco-conscious beauty brand, focusing on recyclable materials and minimal waste.",
    image: imagePlaceholders[10],
    link: "#",
  },
  {
    title: "Smart Home Dashboard",
    category: "UI/UX Design",
    description:
      "An intuitive interface for controlling smart home devices with emphasis on accessibility and ease of use.",
    image: imagePlaceholders[11],
    link: "#",
  },
  {
    title: "Restaurant Ordering System",
    category: "Web Application",
    description:
      "A comprehensive online ordering system for restaurants that streamlines the takeout and delivery process.",
    image: imagePlaceholders[12],
    link: "#",
  },
  {
    title: "Travel Experience Platform",
    category: "Web Design",
    description:
      "A platform connecting travelers with local experiences and hidden gems, featuring interactive maps and booking features.",
    image: imagePlaceholders[13],
    link: "#",
  },
];

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
  className,
  heading = "Portfolio Highlights",
  subheading = "Explore a selection of my featured work across various disciplines and industries.",
  projects = defaultProjects,
  optixFlowConfig,
}: ProjectInteractiveHoverRevealProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {heading}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            {subheading}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Pressable
              href={project.link}
              key={index}
              className="group relative block h-80 overflow-hidden rounded-xl"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
              </div>

              <div
                className={`absolute bottom-0 left-0 p-6 transition-all duration-300 ease-in-out ${
                  hoveredIndex === index ? "opacity-0" : "opacity-100"
                }`}
              >
                <div className="text-sm font-medium tracking-wider text-white uppercase">
                  {project.category}
                </div>
                <h3 className="text-xl font-bold text-white drop-shadow-md">
                  {project.title}
                </h3>
              </div>

              <div
                className={`absolute inset-0 flex flex-col justify-end p-6 transition-all duration-300 ease-in-out ${
                  hoveredIndex === index
                    ? "opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                <div className="text-sm font-medium tracking-wider text-white uppercase">
                  {project.category}
                </div>
                <h3 className="mb-2 text-xl font-bold text-white drop-shadow-md">
                  {project.title}
                </h3>
                <p className="mb-3 text-sm font-medium text-white drop-shadow">
                  {project.description}
                </p>
                <span className="inline-flex items-center text-sm font-medium text-white drop-shadow">
                  View Project{" "}
                  <DynamicIcon
                    name="lucide/arrow-right"
                    size={14}
                    className="ml-1"
                  />
                </span>
              </div>
            </Pressable>
          ))}
        </div>
      </div>
    </section>
  );
}
