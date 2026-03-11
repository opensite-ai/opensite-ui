"use client";

import * as React from "react";
import {
  startTransition,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Lightbox, type LightboxItem } from "@page-speed/lightbox";
import type { CarouselApi } from "../../ui/carousel";
import { Carousel, CarouselContent, CarouselItem } from "../../ui/carousel";
import { CarouselPagination } from "../../ui/carousel-pagination";
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
  /** Optional Section ID */
  sectionId?: string;
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
  sectionId = "interior-carousel",
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
  const [api, setApi] = useState<CarouselApi>();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;

    const updateState = () => {
      startTransition(() => {
        setCanScrollPrevious(api.canScrollPrev());
        setCanScrollNext(api.canScrollNext());
      });
    };

    updateState();
    api.on("select", updateState);
    api.on("reInit", updateState);

    return () => {
      api.off("select", updateState);
      api.off("reInit", updateState);
    };
  }, [api]);

  const scrollPrevious = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

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
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
    >
      {heading || description ? (
        <div className="flex flex-col gap-2 mb-6 md:mb-16 px-6 md:px-8 max-w-full md:max-w-md">
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "text-2xl font-semibold tracking-tight md:text-4xl lg:text-6xl text-pretty",
                  headingClassName,
                )}
              >
                {heading}
              </h2>
            ) : (
              heading
            ))}
          {descriptionContent &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "text-lg text-balance opacity-75",
                  descriptionClassName,
                )}
              >
                {descriptionContent}
              </p>
            ) : (
              descriptionContent
            ))}
        </div>
      ) : null}

      <div className="px-6 md:px-0">
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop,
            }}
            setApi={setApi}
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
          </Carousel>
          <CarouselPagination
            onPrevious={scrollPrevious}
            onNext={scrollNext}
            canScrollPrevious={canScrollPrevious}
            canScrollNext={canScrollNext}
            size="lg"
            mobileSize="md"
            className={cn(
              "mt-4 justify-end md:mt-0 md:absolute md:inset-x-0 md:top-1/2 md:-translate-y-1/2 md:justify-between md:pointer-events-none",
              controlsClassName,
            )}
            buttonClassName="bg-foreground text-background hover:bg-foreground/80 pointer-events-auto md:mx-5"
          />
        </div>
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
