"use client";

import { useEffect, useState } from "react";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import type { CarouselApi } from "../../ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../ui/carousel";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

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
  className?: string;
  heading?: string;
  projects?: ProjectCarouselMinimalItem[];
  optixFlowConfig?: OptixFlowConfig;
}

const defaultProjects: ProjectCarouselMinimalItem[] = [
  {
    id: 1,
    title: "Crystal Clear Tropical Waters",
    location: "Maldives",
    year: "2023",
    category: "Seascape",
    description:
      "Aerial view of pristine turquoise waters revealing the intricate patterns of coral formations and sandy ocean floor through crystal clear tropical seas.",
    image: imagePlaceholders[91],
  },
  {
    id: 2,
    title: "Aerial View of Rice Terraces",
    location: "Southeast Asia",
    year: "2023",
    category: "Agriculture",
    description:
      "Stunning aerial perspective of terraced rice fields showcasing intricate geometric patterns and vibrant green landscapes carved into the hillsides.",
    image: imagePlaceholders[92],
  },
  {
    id: 3,
    title: "Desert Canyon Formations",
    location: "Southwestern United States",
    year: "2022",
    category: "Landscape",
    description:
      "Dramatic aerial view of layered sandstone formations revealing millions of years of geological history through deep canyons and weathered rock strata.",
    image: imagePlaceholders[93],
  },
  {
    id: 4,
    title: "Golden Terraced Fields",
    location: "Yunnan, China",
    year: "2022",
    category: "Agriculture",
    description:
      "Mesmerizing aerial view of golden terraced agricultural fields displaying intricate contour patterns carved into the mountainous landscape during harvest season.",
    image: imagePlaceholders[94],
  },
  {
    id: 5,
    title: "Tidal Sand Patterns",
    location: "Iceland",
    year: "2023",
    category: "Landscape",
    description:
      "Mesmerizing aerial view of flowing water patterns carved into dark volcanic sand, creating organic sculptural forms shaped by tidal forces.",
    image: imagePlaceholders[95],
  },
  {
    id: 6,
    title: "Red Rock Canyon Labyrinth",
    location: "Utah, United States",
    year: "2022",
    category: "Landscape",
    description:
      "Breathtaking aerial view of red sandstone canyon formations displaying deep gorges, weathered rock layers, and intricate geological patterns carved over millennia.",
    image: imagePlaceholders[96],
  },
];

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
  className,
  heading = "Projects",
  projects = defaultProjects,
  optixFlowConfig,
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

  return (
    <section className={cn("py-16", className)}>
      <div className="w-full">
        <div className="mb-16 px-8">
          <h1 className="text-3xl font-medium tracking-tight lg:text-6xl">
            {heading}
          </h1>
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
            className="w-full"
          >
            <CarouselContent>
              {projects.map((project) => (
                <CarouselItem key={project.id} className="basis-auto pl-8">
                  <div className="w-[500px] space-y-6">
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
                        <h2 className="text-2xl tracking-tight">
                          {project.title}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {project.location}
                        </p>
                      </div>

                      <Pressable variant="secondary">View Project</Pressable>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
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
    </section>
  );
}
