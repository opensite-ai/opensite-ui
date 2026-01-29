"use client";

import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Card, CardContent } from "../../ui/card";

export interface ProjectZigzagLayoutItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
}

export interface ProjectZigzagLayoutProps {
  className?: string;
  heading?: string;
  subheading?: string;
  projects?: ProjectZigzagLayoutItem[];
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * ProjectZigzagLayout - Alternating image-content layout with technology badges.
 *
 * Displays projects in a zigzag pattern where odd-indexed items show image on left
 * and content on right, while even-indexed items reverse this order. Each project
 * features a large image with category badge overlay, title, description, technology
 * badges, and a "View Project Details" button. The alternating layout creates visual
 * interest and guides the eye down the page. Perfect for technical portfolios, case
 * studies, or any showcase where detailed project information needs prominent display.
 */
export function ProjectZigzagLayout({
  className,
  heading,
  subheading,
  projects,
  optixFlowConfig,
}: ProjectZigzagLayoutProps) {
  return (
    <div className={cn("bg-background py-16 md:py-24", className)}>
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        <div className="mb-16 text-center md:mb-24">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {heading}
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
            {subheading}
          </p>
        </div>

        <div className="space-y-24 md:space-y-32">
          {projects?.map((project, index) => (
            <div
              key={project.id}
              className={cn(
                "group relative",
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse",
                "flex flex-col gap-8 lg:items-center lg:gap-12",
              )}
            >
              <div className="relative w-full overflow-hidden rounded-lg lg:w-1/2">
                <div className="border-muted/30 relative aspect-video overflow-hidden rounded-lg border">
                  <Img
                    src={project.image}
                    alt={project.title}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>

                <div className="absolute top-4 right-4">
                  <Badge
                    variant="secondary"
                    className="bg-foreground/60 text-background backdrop-blur-sm"
                  >
                    {project.category}
                  </Badge>
                </div>
              </div>

              <Card className="w-full border-none shadow-none lg:w-1/2">
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold md:text-3xl">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mt-4">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-muted-foreground text-sm font-medium">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="rounded-md"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Pressable href={project.link} className="mt-2 gap-2">
                    View Project Details
                    <DynamicIcon name="lucide/arrow-right" size={16} />
                  </Pressable>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
