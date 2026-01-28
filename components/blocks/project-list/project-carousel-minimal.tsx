"use client";

import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { CarouselApi } from "../../ui/carousel";
import { Carousel, CarouselContent, CarouselItem } from "../../ui/carousel";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import { PatternName } from "@/components/ui/pattern-background";

export interface ProjectCarouselMinimalItem {
  id: number;
  title: string;
  location: string;
  year: string;
  category: string;
  description: string;
  image: string;
}

export interface ProjectCarouselMinimalProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Array of project configurations
   */
  projects?: ProjectCarouselMinimalItem[];
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
   * Additional CSS classes for the carousel
   */
  carouselClassName?: string;
  /**
   * Additional CSS classes for each card
   */
  cardClassName?: string;
}

/**
 * ProjectCarouselMinimal - Clean horizontal carousel with location metadata and view button.
 *
 * Features a simple heading followed by a horizontally scrolling carousel of project cards.
 * Each card displays a 4:3 aspect ratio image, title, location, and a "View Project" button.
 * Navigation arrows appear overlaid on the carousel with scroll state awareness (disabled
 * when at start/end). Supports touch/drag on mobile with breakpoint-specific drag behavior.
 * Perfect for travel photography, location-based portfolios, or any project showcase where
 * geographic context is important.
 */
export function ProjectCarouselMinimal({
  heading,
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
  carouselClassName,
  cardClassName,
}: ProjectCarouselMinimalProps) {
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
        <div className={cn("w-[500px] space-y-6", cardClassName)}>
          <div className="aspect-4/3 overflow-hidden rounded-md">
            <Img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl tracking-tight">{project.title}</h2>
              <p className="text-sm text-muted-foreground">
                {project.location}
              </p>
            </div>

            <Pressable variant="secondary">View Project</Pressable>
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
          <div className="pointer-events-none absolute inset-y-0 top-40 right-4 left-4 z-10 flex justify-between">
            <Pressable
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="pointer-events-auto ml-4 h-10 w-10 rounded-full border-gray-200 bg-white/90 hover:bg-white"
            >
              <DynamicIcon name="lucide/arrow-left" size={16} />
            </Pressable>
            <Pressable
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="pointer-events-auto mr-4 h-10 w-10 rounded-full border-gray-200 bg-white/90 hover:bg-white"
            >
              <DynamicIcon name="lucide/arrow-right" size={16} />
            </Pressable>
          </div>
        </div>
      </div>
    </Section>
  );
}
