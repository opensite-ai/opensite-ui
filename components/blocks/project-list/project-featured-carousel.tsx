"use client";

import * as React from "react";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Section } from "../../ui/section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import { PatternName } from "@/components/ui/pattern-background";

export interface ProjectFeaturedCarouselItem {
  title: string;
  client: string;
  year: string;
  category: string;
  description: string;
  image: string;
  link: string;
}

export interface ProjectFeaturedCarouselProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Subheading/description content
   */
  subheading?: React.ReactNode;
  /**
   * Array of project configurations
   */
  projects?: ProjectFeaturedCarouselItem[];
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
   * Additional CSS classes for the carousel
   */
  carouselClassName?: string;
  /**
   * Additional CSS classes for each card
   */
  cardClassName?: string;
}

/**
 * ProjectFeaturedCarousel - Full-featured carousel with client info, badges, and descriptions.
 *
 * Displays projects in a horizontally scrolling carousel with large cards featuring square
 * images, category badges, titles, client/year metadata, descriptions, and "View Project"
 * buttons. Navigation arrows are positioned at the sides. Cards have hover effects on images
 * and generous padding. Perfect for agency portfolios, freelancer showcases, or any project
 * listing where client relationships and comprehensive project details need to be highlighted.
 */
export function ProjectFeaturedCarousel({
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
  carouselClassName,
  cardClassName,
}: ProjectFeaturedCarouselProps) {
  const renderProjects = () => {
    if (projectsSlot) return projectsSlot;
    if (!projects || projects.length === 0) return null;

    return projects.map((project, index) => (
      <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
        <div
          className={cn(
            "group h-full overflow-hidden rounded-xl border bg-card",
            cardClassName,
          )}
        >
          <div className="relative aspect-square overflow-hidden">
            <Img
              src={project.image}
              alt={project.title}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              optixFlowConfig={optixFlowConfig}
            />
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-white/90">
                {project.category}
              </Badge>
            </div>
          </div>
          <div className="p-6">
            <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
            <div className="text-muted-foreground mb-3 flex items-center gap-2 text-sm">
              <span>{project.client}</span>
              <span>•</span>
              <span>{project.year}</span>
            </div>
            <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
              {project.description}
            </p>
            <Pressable
              href={project.link}
              variant="outline"
              size="sm"
              className="w-full"
            >
              View Project
            </Pressable>
          </div>
        </div>
      </CarouselItem>
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
      <div
        className={cn(
          "container mx-auto px-4 md:px-6 2xl:max-w-[1400px]",
          containerClassName,
        )}
      >
        <div className={cn("mb-12 text-center md:mb-16", headerClassName)}>
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl",
                  headingClassName,
                )}
              >
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            ))}
          {subheading &&
            (typeof subheading === "string" ? (
              <p
                className={cn(
                  "text-muted-foreground mx-auto max-w-3xl text-lg",
                  subheadingClassName,
                )}
              >
                {subheading}
              </p>
            ) : (
              <div className={subheadingClassName}>{subheading}</div>
            ))}
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className={cn("w-full", carouselClassName)}
        >
          <CarouselContent className="-ml-4">
            {renderProjects()}
          </CarouselContent>
          <CarouselPrevious className="-left-4 md:-left-6" />
          <CarouselNext className="-right-4 md:-right-6" />
        </Carousel>
      </div>
    </Section>
  );
}
