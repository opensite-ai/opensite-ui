"use client";

import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectBackgroundRevealItem {
  heading: string;
  subheading: string;
  description: string;
  image: string;
  url: string;
}

export interface ProjectBackgroundRevealProps {
  className?: string;
  heading?: string;
  subheading?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  projects?: ProjectBackgroundRevealItem[];
  optixFlowConfig?: OptixFlowConfig;
}

const defaultProjects: ProjectBackgroundRevealItem[] = [
  {
    heading: "Modern Living Space",
    subheading: "Residential design",
    description:
      "This project involves the complete transformation of a contemporary apartment, focusing on creating an open, minimalist aesthetic with warm accents. The goal is to maximize natural light, optimize space flow.",
    image: imagePlaceholders[115],
    url: "#",
  },
  {
    heading: "Creative Workspace",
    subheading: "Office interior",
    description:
      "In this project, we designed a dynamic office environment that fosters creativity and collaboration. This includes creating flexible work zones, incorporating biophilic design elements, comfortable breakout areas.",
    image: imagePlaceholders[116],
    url: "#",
  },
  {
    heading: "Cozy Bistro Interior",
    subheading: "Restaurant design",
    description:
      "In this project, we crafted an intimate dining atmosphere for a local bistro. This includes designing custom seating arrangements, selecting warm lighting fixtures, creating feature walls.",
    image: imagePlaceholders[117],
    url: "#",
  },
  {
    heading: "Boutique Showroom",
    subheading: "Retail space",
    description:
      "The objective here is to create an immersive retail environment that enhances the customer shopping experience. The focus is on strategic product placement, ambient lighting.",
    image: imagePlaceholders[118],
    url: "#",
  },
];

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
  className,
  heading = "Projects",
  subheading = "Transform Ideas Into Reality",
  description = "Where creativity, craftsmanship, and vision unite to create stunning interior spaces. Discover our comprehensive portfolio of projects, each thoughtfully designed to transform spaces and enhance the lives of our clients worldwide.",
  buttonText = "View All Projects",
  buttonHref = "#",
  projects = defaultProjects,
}: ProjectBackgroundRevealProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div>
          <p className="mb-1 text-muted-foreground uppercase md:text-lg">
            {subheading}
          </p>
          <h1 className="text-3xl font-bold uppercase md:text-7xl">{heading}</h1>
          <p className="mt-7 max-w-2xl text-muted-foreground">{description}</p>
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
        <div className="mt-24 flex flex-col gap-5 md:mt-36">
          {projects.map((project, idx) => (
            <Pressable
              key={idx}
              href={project.url}
              className="group relative isolate min-h-72 bg-cover bg-center px-5 py-14 lg:px-12 lg:py-24"
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
          ))}
        </div>
      </div>
    </section>
  );
}
