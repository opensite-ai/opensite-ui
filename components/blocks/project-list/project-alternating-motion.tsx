"use client";

import { motion } from "framer-motion";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectAlternatingMotionItem {
  title: string;
  description: string;
  image: string;
  tag: string;
}

export interface ProjectAlternatingMotionProps {
  className?: string;
  heading?: string;
  projects?: ProjectAlternatingMotionItem[];
  optixFlowConfig?: OptixFlowConfig;
}

const defaultProjects: ProjectAlternatingMotionItem[] = [
  {
    title: "Skyline Room",
    description:
      "Designing cutting-edge architectural visualizations for modern cityscapes and towers.",
    image: imagePlaceholders[0],
    tag: "Architecture",
  },
  {
    title: "Interior Bloom",
    description:
      "Crafting serene and elegant interior layouts that balance functionality with aesthetic harmony.",
    image: imagePlaceholders[1],
    tag: "Interior Design",
  },
  {
    title: "Modular Nest",
    description:
      "Exploring compact and modular housing concepts for sustainable living.",
    image: imagePlaceholders[2],
    tag: "Design Concept",
  },
  {
    title: "Urban Visions",
    description:
      "Shaping urban identity through 3D exterior models and concept layouts for public spaces.",
    image: imagePlaceholders[3],
    tag: "Urban Planning",
  },
  {
    title: "Form + Flow",
    description:
      "Redefining open floor plans for residential interiors with seamless transitions and space utility.",
    image: imagePlaceholders[4],
    tag: "Interior Architecture",
  },
];

/**
 * ProjectAlternatingMotion - Alternating layout project showcase with scroll-triggered motion animations.
 *
 * Features a two-column alternating layout where each project displays an image on one side
 * and text content (title, description, tag badge) on the other. Images animate in from above
 * while content fades in from below as they enter the viewport. Includes a header section
 * with a bordered title. Ideal for architecture portfolios, design showcases, or any project
 * listing that benefits from dramatic reveal animations and clean alternating presentation.
 */
export function ProjectAlternatingMotion({
  className,
  heading = "Architectural Highlights",
  projects = defaultProjects,
  optixFlowConfig,
}: ProjectAlternatingMotionProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-10 flex items-center justify-between border-b border-border pb-4">
          <h2 className="text-2xl font-semibold sm:text-lg">{heading}</h2>
        </div>
        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col-reverse gap-6 md:grid md:grid-cols-2 md:pt-10"
            >
              <div className="flex flex-col justify-between">
                <h3 className="mb-2 text-lg font-medium sm:text-4xl">
                  {project.title}
                </h3>
                <div>
                  <p className="mb-3 max-w-sm text-sm font-medium text-foreground">
                    {project.description}
                  </p>
                  <Badge variant="outline" className="px-3 py-2">
                    {project.tag}
                  </Badge>
                </div>
              </div>

              <motion.div
                className="aspect-3/2 w-full overflow-hidden rounded-sm"
                initial={{ y: -80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <Img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full rounded-sm object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
