"use client";

import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Section } from "../../ui/section";
import type { CarouselApi } from "../../ui/carousel";
import { Carousel, CarouselContent, CarouselItem } from "../../ui/carousel";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import { PatternName } from "@/components/ui/pattern-background";

export interface ProjectCarouselDetailCardsItem {
  id: number;
  title: string;
  location: string;
  year: string;
  category: string;
  description: string;
  image: string;
}

export interface ProjectCarouselDetailCardsProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Subheading content
   */
  subheading?: React.ReactNode;
  /**
   * Array of project configurations
   */
  projects?: ProjectCarouselDetailCardsItem[];
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
 * ProjectCarouselDetailCards - Rich carousel with complete metadata, icons, and descriptions.
 *
 * Features the most detailed card layout with 4:3 images, full descriptions, and metadata
 * displayed with icons (calendar for year, map pin for location, tag for category). Each
 * card includes a "View Project" button and uses Badge components for category display.
 * Cards are 600px wide with generous spacing. Perfect for case studies, detailed portfolios,
 * or any showcase where comprehensive project information is important alongside visuals.
 */
export function ProjectCarouselDetailCards({
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
}: ProjectCarouselDetailCardsProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) return;
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  const renderedProjects = useMemo(() => {
    if (projectsSlot) return projectsSlot;
    if (!projects || projects.length === 0) return null;

    return projects.map((project) => (
      <CarouselItem key={project.id} className="basis-auto pl-8">
        <div
          className={cn(
            "w-[600px] space-y-5 rounded-2xl border border-border bg-card p-6 shadow-sm",
            cardClassName,
          )}
        >
          <div className="aspect-4/3 overflow-hidden rounded-lg">
            <Img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl font-semibold tracking-tight">
                {project.title}
              </h2>
              <Badge variant="secondary">{project.category}</Badge>
            </div>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {project.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <DynamicIcon name="lucide/calendar" size={14} />
                {project.year}
              </span>
              <span className="flex items-center gap-1.5">
                <DynamicIcon name="lucide/map-pin" size={14} />
                {project.location}
              </span>
              <span className="flex items-center gap-1.5">
                <DynamicIcon name="lucide/tag" size={14} />
                {project.category}
              </span>
            </div>
            <Pressable variant="outline" className="w-full">
              View Project
            </Pressable>
          </div>
        </div>
      </CarouselItem>
    ));
  }, [projectsSlot, projects, cardClassName, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <div className={cn("w-full", containerClassName)}>
        <div className={cn("mb-16 px-8", headerClassName)}>
          {heading &&
            (typeof heading === "string" ? (
              <h1
                className={cn(
                  "text-3xl font-medium tracking-tight lg:text-6xl",
                  headingClassName,
                )}
              >
                {heading}
              </h1>
            ) : (
              <div className={headingClassName}>{heading}</div>
            ))}
          {subheading &&
            (typeof subheading === "string" ? (
              <p
                className={cn(
                  "mt-4 text-lg text-muted-foreground",
                  subheadingClassName,
                )}
              >
                {subheading}
              </p>
            ) : (
              <div className={subheadingClassName}>{subheading}</div>
            ))}
        </div>
        <div className="relative w-full">
          <Carousel
            setApi={setCarouselApi}
            opts={{
              align: "start",
              loop: false,
              breakpoints: {
                "(max-width: 768px)": {
                  dragFree: true,
                },
              },
            }}
            className={cn("w-full", carouselClassName)}
          >
            <CarouselContent>{renderedProjects}</CarouselContent>
          </Carousel>
          <div className="pointer-events-none absolute inset-y-0 top-64 right-4 left-4 z-10 flex justify-between">
            <Pressable
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="pointer-events-auto ml-4 h-12 w-12 rounded-full border-gray-200 bg-white/90 hover:bg-white"
            >
              <DynamicIcon name="lucide/arrow-left" size={20} />
            </Pressable>
            <Pressable
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="pointer-events-auto mr-4 h-12 w-12 rounded-full border-gray-200 bg-white/90 hover:bg-white"
            >
              <DynamicIcon name="lucide/arrow-right" size={20} />
            </Pressable>
          </div>
        </div>
      </div>
    </Section>
  );
}
