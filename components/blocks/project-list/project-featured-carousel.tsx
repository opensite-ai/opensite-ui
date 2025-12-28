"use client";

import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

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
  className?: string;
  heading?: string;
  subheading?: string;
  projects?: ProjectFeaturedCarouselItem[];
  optixFlowConfig?: OptixFlowConfig;
}

const defaultProjects: ProjectFeaturedCarouselItem[] = [
  {
    title: "E-commerce Website Redesign",
    client: "Fashion Boutique",
    year: "2023",
    category: "Web Design",
    description:
      "Complete overhaul of an online fashion store, focusing on improved user experience, mobile responsiveness, and conversion optimization.",
    image: imagePlaceholders[14],
    link: "#",
  },
  {
    title: "Mobile Banking App",
    client: "Financial Services Inc.",
    year: "2022",
    category: "App Development",
    description:
      "Streamlined banking application designed with security and ease of use at its core, featuring biometric authentication and personalized insights.",
    image: imagePlaceholders[15],
    link: "#",
  },
  {
    title: "Corporate Identity Refresh",
    client: "Green Technologies",
    year: "2023",
    category: "Branding",
    description:
      "Comprehensive brand refresh including logo redesign, typography system, color palette, and visual guidelines for a renewable energy company.",
    image: imagePlaceholders[16],
    link: "#",
  },
  {
    title: "Interactive Data Dashboard",
    client: "Analytics Solutions",
    year: "2022",
    category: "UI/UX Design",
    description:
      "Real-time analytics dashboard with customizable widgets, data visualization tools, and collaboration features for enterprise teams.",
    image: imagePlaceholders[17],
    link: "#",
  },
  {
    title: "Educational Platform Redesign",
    client: "Learning Hub",
    year: "2023",
    category: "Web Application",
    description:
      "Learning management system with focus on accessibility, engagement, and personalized learning paths for students of all ages.",
    image: imagePlaceholders[18],
    link: "#",
  },
];

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
  className,
  heading = "Featured Projects",
  subheading = "A selection of recent work showcasing design and development expertise.",
  projects = defaultProjects,
  optixFlowConfig,
}: ProjectFeaturedCarouselProps) {
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

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {projects.map((project, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div className="group h-full overflow-hidden rounded-xl border bg-card">
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
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 md:-left-6" />
          <CarouselNext className="-right-4 md:-right-6" />
        </Carousel>
      </div>
    </section>
  );
}
