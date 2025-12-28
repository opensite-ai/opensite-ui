"use client";

import { motion } from "framer-motion";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectMasonryColumnsItem {
  src: string;
  alt: string;
}

export interface ProjectMasonryColumnsProps {
  className?: string;
  images?: ProjectMasonryColumnsItem[];
  optixFlowConfig?: OptixFlowConfig;
}

const defaultImages: ProjectMasonryColumnsItem[] = [
  { src: imagePlaceholders[14], alt: "Image 1" },
  { src: imagePlaceholders[15], alt: "Image 2" },
  { src: imagePlaceholders[16], alt: "Image 3" },
  { src: imagePlaceholders[17], alt: "Image 4" },
  { src: imagePlaceholders[18], alt: "Image 5" },
  { src: imagePlaceholders[19], alt: "Image 6" },
  { src: imagePlaceholders[20], alt: "Image 7" },
  { src: imagePlaceholders[21], alt: "Image 8" },
  { src: imagePlaceholders[22], alt: "Image 9" },
  { src: imagePlaceholders[23], alt: "Image 10" },
  { src: imagePlaceholders[24], alt: "Image 11" },
  { src: imagePlaceholders[25], alt: "Image 12" },
];

/**
 * ProjectMasonryColumns - CSS columns-based masonry layout with staggered motion animations.
 *
 * Uses CSS multi-column layout to create a Pinterest-style masonry grid that automatically
 * distributes images across 1-3 columns based on viewport width. Each image animates in
 * with a fade and slide effect, staggered by index for a cascading reveal. On hover,
 * images scale up with increased brightness and a subtle dark overlay. Ideal for
 * photography portfolios, mood boards, or any collection where varying image heights
 * create visual interest.
 */
export function ProjectMasonryColumns({
  className,
  images = defaultImages,
  optixFlowConfig,
}: ProjectMasonryColumnsProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="columns-1 gap-4 space-y-4 md:columns-2 md:gap-6 md:space-y-6 lg:columns-3">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="mb-4 break-inside-avoid md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <div className="group relative overflow-hidden border-border transition-all duration-300">
                <Img
                  src={image.src}
                  alt={image.alt}
                  className="h-auto w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-105"
                  optixFlowConfig={optixFlowConfig}
                />
                <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
