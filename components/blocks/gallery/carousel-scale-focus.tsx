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
 * Image configuration for carousel scale focus.
 */
export interface CarouselScaleFocusImage {
  /**
   * Image source URL
   */
  src: string;
  /**
   * Alt text for the image
   */
  alt: string;
  /**
   * Additional CSS classes for the image container
   */
  className?: string;
}

export interface CarouselScaleFocusProps {
  /**
   * Main title content
   */
  title?: React.ReactNode;
  /**
   * Description text below title
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Array of images to display
   */
  images?: CarouselScaleFocusImage[];
  /**
   * Custom slot for rendering images (overrides images array)
   */
  imagesSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
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
   * Additional CSS classes for the navigation controls container
   */
  controlsClassName?: string;
  /**
   * Additional CSS classes for the indicators container
   */
  indicatorsClassName?: string;
  /**
   * Additional CSS classes for each indicator dot
   */
  indicatorClassName?: string;
  /**
   * Starting index for the carousel
   * @default 1
   */
  startIndex?: number;
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
 * CarouselScaleFocus displays images with a scale and opacity focus effect.
 *
 * Features a centered carousel where the active slide is displayed at full
 * scale and opacity, while adjacent slides are scaled down to 70% and faded
 * to 40% opacity. Large navigation arrows are positioned outside the carousel
 * area, and dot indicators below allow direct slide selection. Ideal for
 * hero image galleries, product showcases, or any content requiring visual
 * emphasis on the current selection.
 *
 * @example
 * ```tsx
 * <CarouselScaleFocus
 *   images={[
 *     { src: "/images/hero-1.jpg", alt: "Hero image 1" },
 *     { src: "/images/hero-2.jpg", alt: "Hero image 2" }
 *   ]}
 * />
 * ```
 */
export function CarouselScaleFocus({
  title,
  description,
  titleClassName,
  descriptionClassName,
  images,
  imagesSlot,
  className,
  carouselClassName,
  carouselContentClassName,
  itemClassName,
  imageClassName,
  controlsClassName,
  indicatorsClassName,
  indicatorClassName,
  startIndex = 1,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
  optixFlowConfig,
}: CarouselScaleFocusProps): React.JSX.Element {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    startTransition(() => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
    });

    api.on("select", () => {
      startTransition(() => {
        setCurrent(api.selectedScrollSnap() + 1);
      });
    });
  }, [api]);

  const lightboxItems: LightboxItem[] = useMemo(() => {
    if (!images || images.length === 0) return [];
    return images.map((img, idx) => ({
      id: `carousel-scale-${idx}`,
      type: "image" as const,
      src: img.src,
      alt: img.alt,
      download: true,
      share: true,
    }));
  }, [images]);

  const handleImageClick = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const handleLightboxClose = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const imagesContent = useMemo(() => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return images.map((img, index) => (
      <CarouselItem key={`carousel-img-${index}`} className={itemClassName}>
        <div
          className={cn(
            "aspect-4/3 max-w-200 overflow-hidden rounded-[0.75rem] transition-all duration-300 cursor-pointer",
            current === index + 1
              ? "scale-100 opacity-100"
              : "scale-70 opacity-40",
            img.className,
          )}
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
            className={cn(
              "block size-full object-cover object-center",
              imageClassName,
            )}
            src={img.src}
            alt={img.alt}
            loading="lazy"
            optixFlowConfig={optixFlowConfig}
          />
        </div>
      </CarouselItem>
    ));
  }, [
    imagesSlot,
    images,
    itemClassName,
    current,
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
      className={cn("overflow-hidden", className)}
      containerClassName="px-6 sm:px-6 md:px-8 lg:px-8"
    >
      <div className="md:px-45">
        {title || description ? (
          <div className="flex flex-col gap-4 mb-6 md:mb-16 text-center">
            {title &&
              (typeof title === "string" ? (
                <h2
                  className={cn(
                    "text-xl font-medium tracking-tight md:text-2xl lg:text-3xl text-balance",
                    titleClassName,
                  )}
                >
                  {title}
                </h2>
              ) : (
                <div className={titleClassName}>{title}</div>
              ))}
            {description &&
              (typeof description === "string" ? (
                <p
                  className={cn("max-w-lg text-balance", descriptionClassName)}
                >
                  {description}
                </p>
              ) : (
                <div
                  className={cn("max-w-lg text-balance", descriptionClassName)}
                >
                  {description}
                </div>
              ))}
          </div>
        ) : null}

        <Carousel
          className={cn(
            "mx-auto w-full max-w-200 [&>div:nth-child(1)]:md:overflow-visible",
            carouselClassName,
          )}
          setApi={setApi}
          opts={{
            startIndex,
          }}
        >
          <CarouselContent className={carouselContentClassName}>
            {imagesContent}
          </CarouselContent>
          <div className={cn("mt-4 hidden md:block", controlsClassName)}>
            <CarouselPrevious
              className="size-10 max-[767px]:static max-[767px]:translate-y-0 md:-left-25 md:size-14 lg:-left-39.75 lg:size-14 [&>svg]:size-6!"
              variant="default"
            />
            <CarouselNext
              className="size-10 max-[767px]:static max-[767px]:translate-y-0 md:-right-25 md:size-14 lg:-right-39.75 lg:size-14 [&>svg]:size-6!"
              variant="default"
            />
          </div>
        </Carousel>
        <div
          className={cn(
            "mx-auto mt-10 flex w-full max-w-135.75 items-center justify-center",
            indicatorsClassName,
          )}
        >
          {Array.from({ length: count }).map((_, index) => (
            <button
              aria-label={`Go to slide ${index + 1}`}
              key={`carousel-dot-btn-${index}`}
              className="p-2"
              onClick={() => {
                api?.scrollTo(index);
              }}
            >
              <div
                className={cn(
                  "size-3 rounded-full",
                  current === index + 1 ? "bg-primary" : "bg-primary/10",
                  indicatorClassName,
                )}
              />
            </button>
          ))}
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
