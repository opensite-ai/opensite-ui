"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { ImageItem, OptixFlowConfig } from "../../../src/types";

export interface HeroFloatingImagesItem extends ImageItem {
  /**
   * Tailwind classes for positioning and sizing (required for floating images)
   */
  className: string;
}

export interface HeroFloatingImagesProps {
  /**
   * Main heading text
   */
  heading?: React.ReactNode;
  /**
   * Supporting description
   */
  description?: React.ReactNode;
  /**
   * Floating images to render
   */
  images?: HeroFloatingImagesItem[];
  /**
   * Custom slot for images (overrides images array)
   */
  imagesSlot?: React.ReactNode;
  /**
   * Whether to show decorative swirl backgrounds
   */
  showSwirls?: boolean;
  /**
   * Custom slot for background decorations (overrides showSwirls)
   */
  backgroundSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the content area
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the images container
   */
  imagesClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
}

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
  heading = "Moments curated with OpenSite AI care",
  description = "Pair a warm headline with floating imagery to create a playful, immersive hero that feels human and welcoming.",
  images,
  imagesSlot,
  showSwirls = true,
  backgroundSlot,
  className,
  contentClassName,
  headingClassName,
  descriptionClassName,
  imagesClassName,
  optixFlowConfig,
}: HeroFloatingImagesProps): React.JSX.Element {
  const renderBackground = () => {
    if (backgroundSlot) return backgroundSlot;
    if (!showSwirls) return null;

    return (
      <div className="absolute inset-0 z-0">
        <Swirls />
      </div>
    );
  };

  const renderImages = () => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return (
      <div className={cn("absolute inset-0 z-10", imagesClassName)}>
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
    );
  };

  return (
    <section
      className={cn(
        "relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-background py-20 md:min-h-[80vh] md:py-32",
        className,
      )}
    >
      {renderBackground()}
      {renderImages()}

      <div className={cn("relative z-20 mx-auto max-w-2xl px-4 text-center", contentClassName)}>
        {heading && (
          typeof heading === "string" ? (
            <h1 className={cn("text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl", headingClassName)}>
              {heading}
            </h1>
          ) : (
            <h1 className={cn("text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl", headingClassName)}>
              {heading}
            </h1>
          )
        )}
        {description && (
          typeof description === "string" ? (
            <p className={cn("mt-6 text-lg leading-8 text-muted-foreground", descriptionClassName)}>
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          )
        )}
      </div>
    </section>
  );
}
