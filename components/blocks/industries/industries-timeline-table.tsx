"use client";

import * as React from "react";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface IndustryProject {
  year: string;
  name: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  url: string;
}

export interface IndustriesTimelineTableProps {
  /**
   * Column labels for the table header
   * @default ["Year", "Industry", "Description"]
   */
  labels?: string[];
  /**
   * Array of industry projects to display
   */
  projects?: IndustryProject[];
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

/**
 * IndustriesTimelineTable displays industry projects in a timeline-style table layout.
 *
 * Features a header row with customizable labels followed by project rows that reveal
 * background images on hover. Each row displays year, industry name, and description
 * with an arrow button that animates into view. The layout uses a responsive grid
 * that adapts column visibility on different screen sizes. Ideal for showcasing
 * project portfolios, industry timelines, or case study listings.
 *
 * @example
 * ```tsx
 * <IndustriesTimelineTable
 *   labels={["Year", "Industry", "Description"]}
 *   projects={[
 *     {
 *       year: "/2024",
 *       name: "/Consumer Tech",
 *       description: "Innovative consumer electronics solutions",
 *       imageSrc: "/project-image.jpg",
 *       imageAlt: "Project preview",
 *       url: "/projects/consumer-tech"
 *     }
 *   ]}
 * />
 * ```
 */
export function IndustriesTimelineTable({
  className,
  labels = ["Year", "Industry", "Description"],
  projects = [
    {
      year: "/2024",
      name: "/Consumer Tech",
      description: "Innovative consumer electronics and smart device solutions",
      imageSrc: imagePlaceholders[0],
      imageAlt: "Consumer tech project",
      url: "#",
    },
    {
      year: "/2023",
      name: "/Biotech",
      description:
        "Cutting-edge biotechnology research and pharmaceutical development",
      imageSrc: imagePlaceholders[1],
      imageAlt: "Biotech project",
      url: "#",
    },
    {
      year: "/2023",
      name: "/Cybersecurity",
      description: "Enterprise-grade security solution for data protection",
      imageSrc: imagePlaceholders[2],
      imageAlt: "Cybersecurity project",
      url: "#",
    },
    {
      year: "/2022",
      name: "/Healthtech",
      description: "Integrated healthcare management system with telemedicine",
      imageSrc: imagePlaceholders[3],
      imageAlt: "Healthtech project",
      url: "#",
    },
  ],
  optixFlowConfig,
}: IndustriesTimelineTableProps) {
  return (
    <section className={cn("min-h-screen bg-muted py-16", className)}>
      <div className="container mx-auto flex flex-col gap-8 px-8">
        {/* Header Row */}
        <div className="grid grid-cols-2 gap-8 font-medium text-muted-foreground md:grid-cols-3">
          <div className="order-2 pl-10 text-sm md:order-1 lg:pl-10">
            {labels[0]}
          </div>
          <div className="order-1 pl-5 text-sm md:order-2 md:pl-0">
            {labels[1]}
          </div>
          <div className="hidden text-sm md:order-3 lg:block">{labels[2]}</div>
        </div>

        {/* Project Rows */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <Pressable href={project.url} key={index} className="block">
              <div className="group relative mb-2 flex min-h-[100px] flex-col justify-center md:min-h-0 lg:mb-0">
                <div className="relative z-3 grid grid-cols-2 gap-8 transition-all duration-300 md:grid-cols-3 lg:hover:rounded-lg lg:hover:font-medium lg:hover:text-secondary lg:hover:shadow-lg">
                  {/* Year Column */}
                  <div className="order-2 flex items-center md:order-1">
                    <span className="pl-10 text-xs font-medium text-secondary opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
                      {project.year}
                    </span>
                  </div>

                  {/* Project Name and Description Column */}
                  <div className="order-1 col-span-1 grid grid-cols-2 gap-8 border-b border-muted-foreground/20 p-5 transition-all duration-300 md:order-2 md:col-span-2 md:p-10 md:pr-0 md:pl-0 lg:group-hover:border-transparent">
                    {/* Project Name */}
                    <div className="flex items-center">
                      <span className="ml-0 pl-0 text-xl font-medium text-secondary transition-all duration-300 md:text-2xl lg:text-foreground lg:group-hover:pl-2 lg:group-hover:text-secondary">
                        {project.name}
                      </span>
                    </div>

                    {/* Description and Button */}
                    <div className="hidden items-center justify-between gap-4 lg:flex lg:pr-10">
                      <span className="text-sm text-secondary/80 opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
                        {project.description}
                      </span>

                      {/* Action Button */}
                      <span className="flex translate-x-full items-center justify-center rounded-full bg-primary p-1 text-secondary opacity-100 shadow-md transition-all duration-300 ease-out lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:opacity-100">
                        <DynamicIcon name="lucide/arrow-up-right" size={24} />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Background Image */}
                <Img
                  src={project.imageSrc}
                  alt={project.imageAlt}
                  className="absolute inset-0 z-1 h-full w-full object-cover opacity-100 transition-all duration-300 lg:opacity-0 lg:group-hover:opacity-100"
                  loading="lazy"
                  optixFlowConfig={optixFlowConfig}
                />

                {/* Overlay */}
                <div className="absolute inset-0 z-2 bg-black/20 opacity-100 transition-all duration-300 lg:opacity-0 lg:group-hover:opacity-100" />
              </div>
            </Pressable>
          ))}
        </div>
      </div>
    </section>
  );
}
