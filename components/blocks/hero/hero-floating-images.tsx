"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroFloatingImagesItem {
  /**
   * Image source URL
   */
  src: string;
  /**
   * Alt text for the image
   */
  alt: string;
  /**
   * Tailwind classes for positioning and sizing
   */
  className: string;
}

export interface HeroFloatingImagesProps {
  /**
   * Main heading text
   */
  title?: string;
  /**
   * Supporting description
   */
  description?: string;
  /**
   * Floating images to render
   */
  images?: HeroFloatingImagesItem[];
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultImages: HeroFloatingImagesItem[] = [
  {
    src: imagePlaceholders[2],
    alt: "OpenSite AI coverage review",
    className: "left-4 top-6 w-24 md:left-16 md:top-10 md:w-32",
  },
  {
    src: imagePlaceholders[3],
    alt: "OpenSite AI advisor workflow",
    className: "right-6 top-16 w-28 md:right-20 md:top-10 md:w-36",
  },
  {
    src: imagePlaceholders[4],
    alt: "OpenSite AI team collaboration",
    className: "left-10 bottom-10 w-28 md:left-24 md:bottom-20 md:w-40",
  },
  {
    src: imagePlaceholders[5],
    alt: "OpenSite AI service center",
    className: "right-10 bottom-8 w-24 md:right-28 md:bottom-16 md:w-32",
  },
];

const Swirls = () => (
  <>
    <svg
      className="absolute left-0 top-0 -translate-x-1/3 -translate-y-1/3 text-primary/10"
      width="600"
      height="600"
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M515.266 181.33C377.943 51.564 128.537 136.256 50.8123 293.565C-26.9127 450.874 125.728 600 125.728 600"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
    <svg
      className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 text-primary/10"
      width="700"
      height="700"
      viewBox="0 0 700 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M26.8838 528.274C193.934 689.816 480.051 637.218 594.397 451.983C708.742 266.748 543.953 2.22235 543.953 2.22235"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </>
);

/**
 * HeroFloatingImages - A centered hero with floating imagery and decorative
 * swirl backgrounds. Great for playful, lifestyle, or hospitality landing pages.
 */
export function HeroFloatingImages({
  title = "Moments curated with OpenSite AI care",
  description = "Pair a warm headline with floating imagery to create a playful, immersive hero that feels human and welcoming.",
  images = defaultImages,
  className,
  optixFlowConfig,
}: HeroFloatingImagesProps): React.JSX.Element {
  return (
    <section
      className={cn(
        "relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-background py-20 md:min-h-[80vh] md:py-32",
        className,
      )}
    >
      <div className="absolute inset-0 z-0">
        <Swirls />
      </div>

      <div className="absolute inset-0 z-10">
        {images.map((image, index) => (
          <Img
            key={`${image.alt}-${index}`}
            src={image.src}
            alt={image.alt}
            className={cn("absolute object-contain", image.className)}
            style={{ animationDelay: `${index * 300}ms` }}
            optixFlowConfig={optixFlowConfig}
          />
        ))}
      </div>

      <div className="relative z-20 mx-auto max-w-2xl px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          {description}
        </p>
      </div>
    </section>
  );
}
