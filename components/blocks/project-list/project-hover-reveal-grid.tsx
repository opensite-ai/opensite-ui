"use client";

import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectHoverRevealGridItem {
  src: string;
  alt: string;
  title: string;
  description: string;
}

export interface ProjectHoverRevealGridProps {
  className?: string;
  images?: ProjectHoverRevealGridItem[];
  optixFlowConfig?: OptixFlowConfig;
}

const defaultImages: ProjectHoverRevealGridItem[] = [
  {
    src: imagePlaceholders[81],
    alt: "Woman with flowers",
    title: "Spring Blossoms",
    description: "A moment of tranquility captured in nature's embrace",
  },
  {
    src: imagePlaceholders[82],
    alt: "Red rock formations",
    title: "Desert Canyon",
    description: "Ancient stones carved by time and wind",
  },
  {
    src: imagePlaceholders[83],
    alt: "Mountain landscape",
    title: "Highland Vista",
    description: "Where earth meets sky in perfect harmony",
  },
  {
    src: imagePlaceholders[84],
    alt: "Torii gates",
    title: "Sacred Path",
    description: "Traditional gates leading to spiritual awakening",
  },
  {
    src: imagePlaceholders[85],
    alt: "Zen garden",
    title: "Meditation Garden",
    description: "Raked sand patterns creating inner peace",
  },
  {
    src: imagePlaceholders[86],
    alt: "Campfire flames",
    title: "Evening Fire",
    description: "Warmth and light dancing in the darkness",
  },
];

/**
 * ProjectHoverRevealGrid - Two-column grid with slide-up text reveal on hover.
 *
 * Displays projects in a uniform 2-column grid with square aspect ratio images.
 * On hover, images scale up slightly with a subtle overlay, and title/description
 * text slides up from the bottom. Similar to ProjectGridGallery but with 2 columns
 * instead of 3, creating larger image tiles. Perfect for portfolios where larger
 * image presentation is preferred while maintaining the interactive hover reveal.
 */
export function ProjectHoverRevealGrid({
  className,
  images = defaultImages,
  optixFlowConfig,
}: ProjectHoverRevealGridProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden"
            >
              <Img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                optixFlowConfig={optixFlowConfig}
              />
              <div className="absolute inset-0 bg-background/0 transition-all duration-300 group-hover:bg-background/10" />
              <div className="absolute right-0 bottom-0 left-0 translate-y-full transform p-6 transition-transform duration-300 group-hover:translate-y-0">
                <div className="text-center">
                  <h3 className="mb-2 text-xl font-semibold text-muted">
                    {image.title}
                  </h3>
                  <p className="text-sm text-muted">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
