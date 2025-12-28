"use client";

import { useEffect, useState } from "react";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import type { CarouselApi } from "../../ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../ui/carousel";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

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
  className?: string;
  heading?: string;
  subheading?: string;
  projects?: ProjectCarouselDetailCardsItem[];
  optixFlowConfig?: OptixFlowConfig;
}

const defaultProjects: ProjectCarouselDetailCardsItem[] = [
  {
    id: 1,
    title: "Crystal Clear Tropical Waters",
    location: "Maldives",
    year: "2023",
    category: "Seascape",
    description:
      "Aerial view of pristine turquoise waters revealing the intricate patterns of coral formations and sandy ocean floor through crystal clear tropical seas.",
    image: imagePlaceholders[103],
  },
  {
    id: 2,
    title: "Aerial View of Rice Terraces",
    location: "Southeast Asia",
    year: "2023",
    category: "Agriculture",
    description:
      "Stunning aerial perspective of terraced rice fields showcasing intricate geometric patterns and vibrant green landscapes carved into the hillsides.",
    image: imagePlaceholders[104],
  },
  {
    id: 3,
    title: "Desert Canyon Formations",
    location: "Southwestern United States",
    year: "2022",
    category: "Landscape",
    description:
      "Dramatic aerial view of layered sandstone formations revealing millions of years of geological history through deep canyons and weathered rock strata.",
    image: imagePlaceholders[105],
  },
  {
    id: 4,
    title: "Golden Terraced Fields",
    location: "Yunnan, China",
    year: "2022",
    category: "Agriculture",
    description:
      "Mesmerizing aerial view of golden terraced agricultural fields displaying intricate contour patterns carved into the mountainous landscape during harvest season.",
    image: imagePlaceholders[106],
  },
  {
    id: 5,
    title: "Tidal Sand Patterns",
    location: "Iceland",
    year: "2023",
    category: "Landscape",
    description:
      "Mesmerizing aerial view of flowing water patterns carved into dark volcanic sand, creating organic sculptural forms shaped by tidal forces.",
    image: imagePlaceholders[107],
  },
  {
    id: 6,
    title: "Red Rock Canyon Labyrinth",
    location: "Utah, United States",
    year: "2022",
    category: "Landscape",
    description:
      "Breathtaking aerial view of red sandstone canyon formations displaying deep gorges, weathered rock layers, and intricate geological patterns carved over millennia.",
    image: imagePlaceholders[108],
  },
];

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
  className,
  heading = "Projects",
  subheading = "Detailed showcase with complete metadata",
  projects = defaultProjects,
  optixFlowConfig,
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
                  <div className="w-[600px] space-y-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
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
              ))}
            </CarouselContent>
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
    </section>
  );
}
