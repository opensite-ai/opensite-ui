"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Lightbox, type LightboxItem } from "@page-speed/lightbox";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";

/**
 * Image configuration for interior carousel.
 */
export interface InteriorCarouselImage {
  /**
   * Image source URL
   */
  src: string;
  /**
   * Alt text for the image
   */
  alt?: string;
  /**
   * Additional CSS classes for the image
   */
  className?: string;
}

export interface InteriorCarouselProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text (supports newlines for multi-line display)
   */
  description?: React.ReactNode;
  /**
   * Array of images to display (can be strings or objects)
   */
  images?: (string | InteriorCarouselImage)[];
  /**
   * Custom slot for rendering images (overrides images array)
   */
  imagesSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the carousel wrapper
   */
  carouselClassName?: string;
  /**
   * Additional CSS classes for the carousel content
   */
  carouselContentClassName?: string;
  /**
   * Additional CSS classes for each carousel item
   */
  itemClassName?: string;
  /**
   * Additional CSS classes for each image
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for the navigation controls
   */
  controlsClassName?: string;
  /**
   * Whether to loop the carousel
   * @default true
   */
  loop?: boolean;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | string;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultImages = [
  "https://toastability-production.s3.amazonaws.com/xlp46pzk3a4d73jgjx4s7xdafwpn",
  "https://toastability-production.s3.amazonaws.com/g1iuifb3yzoofo9c7a00koyn6q1t",
  "https://toastability-production.s3.amazonaws.com/z9u4sdrj2oq3eds0qyui0nxsus3j",
  "https://toastability-production.s3.amazonaws.com/63aotyt2pb4gqpccej2kkw8reson",
  "https://toastability-production.s3.amazonaws.com/pjgb223h1bjywdk15i3zi7pjhutg",
  "https://toastability-production.s3.amazonaws.com/xlp46pzk3a4d73jgjx4s7xdafwpn",
  "https://toastability-production.s3.amazonaws.com/g1iuifb3yzoofo9c7a00koyn6q1t",
];

/**
 * InteriorCarousel displays images in a looping two-up carousel layout.
 *
 * Features a centered header with title and multi-line description, followed
 * by a carousel showing two portrait images side-by-side. Navigation arrows
 * are overlaid on the carousel with semi-transparent dark backgrounds. The
 * carousel loops infinitely and uses a tall aspect ratio (3.8:5) for images.
 * Ideal for interior design portfolios, real estate galleries, or any visual
 * content showcasing spaces and environments.
 *
 * @example
 * ```tsx
 * <InteriorCarousel
 *   heading="Beautiful Interiors."
 *   description="Explore our curated collection of stunning interior designs."
 *   images={["/images/interior-1.jpg", "/images/interior-2.jpg"]}
 * />
 * ```
 */
export function InteriorCarousel({
  heading = "Beautiful Interiors.",
  description = "Explore our curated collection of stunning interior designs.\nEach space tells a unique story through thoughtful design and attention to detail.",
  images = defaultImages,
  imagesSlot,
  className,
  headingClassName,
  descriptionClassName,
  carouselClassName,
  carouselContentClassName,
  itemClassName,
  imageClassName,
  controlsClassName,
  loop = true,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  optixFlowConfig,
}: InteriorCarouselProps): React.JSX.Element {
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);

  // Convert images to lightbox items
  const lightboxItems: LightboxItem[] = React.useMemo(() => {
    if (!images || images.length === 0) return [];
    return images.map((image, index) => {
      const src = typeof image === "string" ? image : image.src;
      const alt = typeof image === "string" ? "Interior design" : (image.alt || "Interior design");
      return {
        id: `interior-carousel-${index}-${src.slice(-8)}`,
        src,
        alt,
        type: "image" as const
      };
    });
  }, [images]);

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const renderDescription = () => {
    if (typeof description === "string") {
      const descriptionLines = description.split("\n");
      return descriptionLines.map((line, index) => (
        <span key={index}>
          {line}
          {index < descriptionLines.length - 1 && <br />}
        </span>
      ));
    }
    return description;
  };

  const renderImages = () => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return images.map((image, index) => {
      const src = typeof image === "string" ? image : image.src;
      const alt = typeof image === "string" ? "Interior design" : (image.alt || "Interior design");
      const itemClass = typeof image === "string" ? undefined : image.className;

      return (
        <CarouselItem key={index} className={cn("basis-1/2", itemClassName)}>
          <Img
            src={src}
            alt={alt}
            className={cn("aspect-[3.8/5] w-full rounded-xl object-cover cursor-pointer transition-opacity hover:opacity-90", imageClassName, itemClass)}
            loading="lazy"
            optixFlowConfig={optixFlowConfig}
            onClick={() => handleImageClick(index)}
          />
        </CarouselItem>
      );
    });
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
    >
      <h2 className={cn("mb-4 text-center text-4xl font-semibold", headingClassName)}>
        {heading}
      </h2>
      <p className={cn("text-center text-sm text-muted-foreground", descriptionClassName)}>
        {renderDescription()}
      </p>
      <div className="mt-10">
        <Carousel
          opts={{
            align: "start",
            loop,
          }}
          className={cn("mx-auto w-full max-w-6xl", carouselClassName)}
        >
          <CarouselContent
            style={{
              backfaceVisibility: "hidden",
            }}
            className={carouselContentClassName}
          >
            {renderImages()}
          </CarouselContent>
          <CarouselPrevious className={cn("left-5 scale-120 border-none bg-black/30 text-white hover:bg-black/50 hover:text-white dark:bg-black/30 dark:hover:bg-black/50", controlsClassName)} />
          <CarouselNext className={cn("right-5 scale-120 border-none bg-black/30 text-white hover:bg-black/50 hover:text-white dark:bg-black/30 dark:hover:bg-black/50", controlsClassName)} />
        </Carousel>
      </div>
      {lightboxOpen && (
        <Lightbox
          items={lightboxItems}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          layout="horizontal"
          controls={{
            navigation: true,
            counter: true,
            closeButton: true,
            captions: true,
          }}
        />
      )}
    </Section>
  );
}
