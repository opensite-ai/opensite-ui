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

export interface ProjectCarouselCinematicItem {
  id: number;
  title: string;
  location: string;
  year: string;
  category: string;
  description: string;
  image: string;
}

export interface ProjectCarouselCinematicProps {
  className?: string;
  heading?: string;
  subheading?: string;
  projects?: ProjectCarouselCinematicItem[];
  optixFlowConfig?: OptixFlowConfig;
}

const defaultProjects: ProjectCarouselCinematicItem[] = [
  {
    id: 1,
    title: "Crystal Clear Tropical Waters",
    location: "Maldives",
    year: "2023",
    category: "Seascape",
    description:
      "Aerial view of pristine turquoise waters revealing the intricate patterns of coral formations and sandy ocean floor through crystal clear tropical seas.",
    image: imagePlaceholders[97],
  },
  {
    id: 2,
    title: "Aerial View of Rice Terraces",
    location: "Southeast Asia",
    year: "2023",
    category: "Agriculture",
    description:
      "Stunning aerial perspective of terraced rice fields showcasing intricate geometric patterns and vibrant green landscapes carved into the hillsides.",
    image: imagePlaceholders[98],
  },
  {
    id: 3,
    title: "Desert Canyon Formations",
    location: "Southwestern United States",
    year: "2022",
    category: "Landscape",
    description:
      "Dramatic aerial view of layered sandstone formations revealing millions of years of geological history through deep canyons and weathered rock strata.",
    image: imagePlaceholders[99],
  },
  {
    id: 4,
    title: "Golden Terraced Fields",
    location: "Yunnan, China",
    year: "2022",
    category: "Agriculture",
    description:
      "Mesmerizing aerial view of golden terraced agricultural fields displaying intricate contour patterns carved into the mountainous landscape during harvest season.",
    image: imagePlaceholders[100],
  },
  {
    id: 5,
    title: "Tidal Sand Patterns",
    location: "Iceland",
    year: "2023",
    category: "Landscape",
    description:
      "Mesmerizing aerial view of flowing water patterns carved into dark volcanic sand, creating organic sculptural forms shaped by tidal forces.",
    image: imagePlaceholders[101],
  },
  {
    id: 6,
    title: "Red Rock Canyon Labyrinth",
    location: "Utah, United States",
    year: "2022",
    category: "Landscape",
    description:
      "Breathtaking aerial view of red sandstone canyon formations displaying deep gorges, weathered rock layers, and intricate geological patterns carved over millennia.",
    image: imagePlaceholders[102],
  },
];

/**
 * ProjectCarouselCinematic - Wide carousel with 16:9 cinematic aspect ratio and category badges.
 *
 * Features larger cards (700px wide) with video-style 16:9 aspect ratio images for a cinematic
 * feel. Each card displays the title with a category badge pill on the right. Includes a
 * subheading below the main title describing the showcase style. Navigation arrows are larger
 * (48px) for better visibility. Perfect for film portfolios, video production showcases, or
 * any project collection where widescreen presentation enhances the visual impact.
 */
export function ProjectCarouselCinematic({
  className,
  heading = "Projects",
  subheading = "Minimal showcase with cinematic aspect ratio",
  projects = defaultProjects,
  optixFlowConfig,
}: ProjectCarouselCinematicProps) {
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
          <p className="mt-4 text-lg text-muted-foreground">{subheading}</p>
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
                  <div className="w-[700px] space-y-4">
                    <div className="aspect-video overflow-hidden rounded-xl">
                      <Img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover"
                        optixFlowConfig={optixFlowConfig}
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-normal tracking-tight">
                          {project.title}
                        </h2>
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="pointer-events-none absolute inset-y-0 top-52 right-4 left-4 z-10 flex justify-between">
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
    </section>
  );
}
