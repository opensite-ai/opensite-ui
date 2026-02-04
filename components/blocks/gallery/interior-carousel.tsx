"use client";

import * as React from "react";
import { useState, useMemo, useCallback } from "react";
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
  pattern?: PatternName | undefined;
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
  heading,
  description,
  images,
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
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
  optixFlowConfig,
}: InteriorCarouselProps): React.JSX.Element {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const lightboxItems: LightboxItem[] = useMemo(() => {
    if (!images || images.length === 0) return [];
    return images.map((image, index) => {
      const src = typeof image === "string" ? image : image.src;
      const alt =
        typeof image === "string"
          ? "Interior design"
          : image.alt || "Interior design";
      return {
        id: `interior-carousel-${index}-${src.slice(-8)}`,
        src,
        alt,
        type: "image" as const,
      };
    });
  }, [images]);

  const handleImageClick = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const handleLightboxClose = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const descriptionContent = useMemo(() => {
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
  }, [description]);

  const imagesContent = useMemo(() => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return images.map((image, index) => {
      const src = typeof image === "string" ? image : image.src;
      const alt =
        typeof image === "string"
          ? "Interior design"
          : image.alt || "Interior design";
      const itemClass = typeof image === "string" ? undefined : image.className;

      return (
        <CarouselItem
          key={index}
          className={cn(
            "basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4",
            itemClassName,
          )}
        >
          <div
            className="cursor-pointer"
            onClick={() => handleImageClick(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleImageClick(index);
              }
            }}
          >
            <Img
              src={src}
              alt={alt}
              className={cn(
                "aspect-4/5 w-full rounded-xl object-cover transition-opacity hover:opacity-90",
                imageClassName,
                itemClass,
              )}
              loading="lazy"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </CarouselItem>
      );
    });
  }, [
    imagesSlot,
    images,
    itemClassName,
    imageClassName,
    optixFlowConfig,
    handleImageClick,
  ]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
    >
      {heading || descriptionContent ? (
        <div className="mb-10">
          {heading && (
            <h2
              className={cn(
                "mb-4 text-center text-4xl font-semibold",
                headingClassName,
              )}
            >
              {heading}
            </h2>
          )}
          {descriptionContent && (
            <p
              className={cn(
                "text-center text-sm text-muted-foreground",
                descriptionClassName,
              )}
            >
              {descriptionContent}
            </p>
          )}
        </div>
      ) : null}
      <div className="relative">
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
            {imagesContent}
          </CarouselContent>
          <CarouselPrevious
            className={cn(
              "left-5 scale-120 border-none bg-foreground/30 text-background hover:bg-foreground/50",
              controlsClassName,
            )}
          />
          <CarouselNext
            className={cn(
              "right-5 scale-120 border-none bg-foreground/30 text-background hover:bg-foreground/50",
              controlsClassName,
            )}
          />
        </Carousel>
      </div>
      {lightboxOpen && (
        <Lightbox
          items={lightboxItems}
          initialIndex={lightboxIndex}
          layout="horizontal"
          controls={{
            navigation: true,
            thumbnails: true,
            download: true,
            share: true,
            fullscreen: true,
            captions: true,
            counter: true,
          }}
          onClose={handleLightboxClose}
          enableKeyboardShortcuts={true}
          closeOnEscape={true}
          closeOnBackdropClick={true}
        />
      )}
    </Section>
  );
}
