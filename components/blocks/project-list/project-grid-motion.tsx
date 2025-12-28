"use client";

import { motion } from "framer-motion";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectGridMotionItem {
  title: string;
  img: string;
  year: string;
  type: string;
}

export interface ProjectGridMotionProps {
  className?: string;
  heading?: string;
  projects?: ProjectGridMotionItem[];
  optixFlowConfig?: OptixFlowConfig;
}

const defaultProjects: ProjectGridMotionItem[] = [
  {
    title: "Modern Concrete Pavilion",
    img: imagePlaceholders[65],
    year: "2025",
    type: "Architecture",
  },
  {
    title: "Colorful Urban Living",
    img: imagePlaceholders[66],
    year: "2025",
    type: "Urban Design",
  },
  {
    title: "Minimalist Home Retreat",
    img: imagePlaceholders[67],
    year: "2025",
    type: "Interior",
  },
  {
    title: "Urban Concrete House",
    img: imagePlaceholders[68],
    year: "2025",
    type: "Product Design",
  },
  {
    title: "Luxury Concrete Box",
    img: imagePlaceholders[69],
    year: "2025",
    type: "Residential",
  },
  {
    title: "Glasshouse in Nature",
    img: imagePlaceholders[70],
    year: "2025",
    type: "Sustainable Design",
  },
];

/**
 * ProjectGridMotion - Two-column grid with staggered motion animations and metadata cards.
 *
 * Displays projects in a responsive 2-column grid with each card featuring a tall image,
 * title, type label, and year badge. Cards animate in with fade and slide effects staggered
 * by index. On hover, images scale up smoothly. Each card has a footer section with project
 * metadata and a pill-shaped year badge. Features a bold uppercase heading. Ideal for
 * architecture firms, design studios, or any portfolio where project metadata and clean
 * card presentation are important.
 */
export function ProjectGridMotion({
  className,
  heading = "Our Work",
  projects = defaultProjects,
  optixFlowConfig,
}: ProjectGridMotionProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h1 className="text-7xl leading-tight font-bold uppercase">{heading}</h1>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group overflow-hidden rounded-lg border border-border bg-background"
            >
              <div className="overflow-hidden">
                <Img
                  src={project.img}
                  alt={project.title}
                  className="h-96 w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <h2 className="text-lg font-semibold">{project.title}</h2>
                  <p className="text-muted-foreground">{project.type}</p>
                </div>
                <div className="rounded-2xl border border-border px-5 py-2 text-sm font-semibold">
                  {project.year}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
