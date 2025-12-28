"use client";

import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectGridGalleryItem {
  src: string;
  alt: string;
  title: string;
  description: string;
}

export interface ProjectGridGalleryProps {
  className?: string;
  images?: ProjectGridGalleryItem[];
  optixFlowConfig?: OptixFlowConfig;
}

const defaultImages: ProjectGridGalleryItem[] = [
  {
    src: imagePlaceholders[5],
    alt: "Woman reading in a sunlit meadow",
    title: "Morning Reflections",
    description: "A peaceful start as sunlight filters through the grass.",
  },
  {
    src: imagePlaceholders[6],
    alt: "Majestic sandstone cliffs at dusk",
    title: "Twilight Cliffs",
    description: "Golden hour paints the rocks in warm hues.",
  },
  {
    src: imagePlaceholders[7],
    alt: "Rolling hills under a cloudy sky",
    title: "Misty Highlands",
    description: "Clouds drift lazily over emerald slopes.",
  },
  {
    src: imagePlaceholders[8],
    alt: "Smiling woman with a bouquet",
    title: "Joyful Gathering",
    description: "Laughter and flowers fill the afternoon air.",
  },
  {
    src: imagePlaceholders[9],
    alt: "Portrait with a cold stare",
    title: "Cold Stare",
    description: "Water carves its story through ancient stone.",
  },
  {
    src: imagePlaceholders[10],
    alt: "Portrait turned to the side",
    title: "Turned to the Side",
    description: "First light awakens the silent mountains.",
  },
  {
    src: imagePlaceholders[11],
    alt: "Vibrant torii gates in a forest path",
    title: "Path of Vermilion",
    description: "A journey marked by tradition and color.",
  },
  {
    src: imagePlaceholders[12],
    alt: "Serene Japanese rock garden",
    title: "Zen Harmony",
    description: "Stones and sand arranged for mindful balance.",
  },
  {
    src: imagePlaceholders[13],
    alt: "Crackling campfire under stars",
    title: "Starlit Stories",
    description: "Tales and warmth shared by the firelight.",
  },
];

/**
 * ProjectGridGallery - Three-column responsive grid gallery with hover effects.
 *
 * Displays projects in a uniform 3-column grid layout with square aspect ratio images.
 * On hover, images scale up slightly with a subtle overlay, and title/description
 * text slides up from the bottom. Perfect for photography portfolios, art galleries,
 * or any visual-first project showcase where uniform presentation is desired.
 * Responsive design collapses to single column on mobile.
 */
export function ProjectGridGallery({
  className,
  images = defaultImages,
  optixFlowConfig,
}: ProjectGridGalleryProps) {
  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3">
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
