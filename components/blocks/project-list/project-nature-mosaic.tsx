"use client";

import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectNatureMosaicProps {
  className?: string;
  heading?: string;
  description?: string;
  linkText?: string;
  linkHref?: string;
  images?: string[];
  optixFlowConfig?: OptixFlowConfig;
}

const defaultImages = [
  imagePlaceholders[87],
  imagePlaceholders[88],
  imagePlaceholders[89],
  imagePlaceholders[90],
];

/**
 * ProjectNatureMosaic - Asymmetric 2-column mosaic with alternating image sizes.
 *
 * Features a poetic multi-line heading followed by a 2-column grid where images
 * alternate between 4:3 and 4:5 aspect ratios, creating visual rhythm. The left
 * column starts with landscape orientation while the right starts with portrait,
 * then they swap. Includes a descriptive paragraph and link button below the grid.
 * Perfect for nature photography, travel portfolios, or any showcase where varied
 * image compositions create an organic, editorial feel.
 */
export function ProjectNatureMosaic({
  className,
  heading = "Exploring the wonders of nature,\ncapturing moments of serenity and\nbeauty from forests to mountains.",
  description = "Nature's beauty is ever-changing and endlessly inspiring. From the gentle rustle of leaves to the grandeur of mountain vistas, each day brings a new story to capture and cherish.",
  linkText = "Discover More →",
  linkHref = "#",
  images = defaultImages,
  optixFlowConfig,
}: ProjectNatureMosaicProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h1 className="mb-12 text-xl leading-tight font-medium md:text-3xl whitespace-pre-line">
          {heading}
        </h1>

        <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <Img
              src={images[0]}
              alt="Nature scene 1"
              className="aspect-4/3 w-full rounded-lg object-cover"
              optixFlowConfig={optixFlowConfig}
            />
            <Img
              src={images[2]}
              alt="Nature scene 3"
              className="aspect-4/5 w-full rounded-lg object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>

          <div className="space-y-4">
            <Img
              src={images[1]}
              alt="Nature scene 2"
              className="aspect-4/5 w-full rounded-lg object-cover"
              optixFlowConfig={optixFlowConfig}
            />
            <Img
              src={images[3]}
              alt="Nature scene 4"
              className="aspect-4/3 w-full rounded-lg object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </div>

        <div className="max-w-md">
          <p className="mb-4 text-muted-foreground">{description}</p>
          <Pressable
            href={linkHref}
            variant="link"
            className="h-auto px-0 text-sm font-medium"
          >
            {linkText}
          </Pressable>
        </div>
      </div>
    </section>
  );
}
