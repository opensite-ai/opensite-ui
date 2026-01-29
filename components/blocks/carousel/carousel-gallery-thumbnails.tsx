"use client";

/**
 * CarouselGalleryThumbnails
 *
 * A gallery carousel with main image display, thumbnail navigation strip,
 * keyboard navigation support, and auto-play functionality. Features smooth
 * slide transitions with caption overlay and responsive thumbnail grid.
 *
 * Use cases:
 * - Product image galleries with multiple views
 * - Portfolio showcases with detailed image browsing
 * - Real estate property photo galleries
 * - Event photography collections
 */

import * as React from "react";
import { BRIGHTNESS_CLASS_MAP, cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface GalleryImage {
  /**
   * Image source URL
   */
  src: string;
  /**
   * Image alt text/caption
   */
  alt?: React.ReactNode;
  /**
   * Image width
   */
  width?: number;
  /**
   * Image height
   */
  height?: number;
  /**
   * Additional CSS classes for the image
   */
  className?: string;
  /**
   * Additional CSS classes for the image element
   */
  imageClassName?: string;
}

export interface CarouselGalleryThumbnailsProps {
  /**
   * Array of gallery images
   */
  images?: GalleryImage[];
  /**
   * Custom slot for rendering images (overrides images array)
   */
  imagesSlot?: React.ReactNode;
  /**
   * Enable auto-play
   */
  autoPlay?: boolean;
  /**
   * Auto-play interval in milliseconds
   */
  autoPlayInterval?: number;
  /**
   * Show thumbnail navigation
   */
  showThumbnails?: boolean;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the main carousel container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the slide area
   */
  slideClassName?: string;
  /**
   * Additional CSS classes for the navigation buttons
   */
  navigationClassName?: string;
  /**
   * Additional CSS classes for the caption
   */
  captionClassName?: string;
  /**
   * Additional CSS classes for the thumbnails container
   */
  thumbnailsClassName?: string;
  /**
   * Additional CSS classes for individual thumbnails
   */
  thumbnailClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
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
   * Brightness level for slide images (controls overlay visibility)
   */
  slideMediaBrightness?: "10" | "20" | "25" | "30" | "40" | "50" | "75" | "100";
}

export function CarouselGalleryThumbnails({
  images,
  imagesSlot,
  autoPlay = true,
  autoPlayInterval = 5000,
  showThumbnails = true,
  className,
  containerClassName = "mx-auto w-full px-4 md:px-10 lg:px-16 max-w-full relative z-10",
  slideClassName,
  navigationClassName,
  captionClassName,
  thumbnailsClassName,
  thumbnailClassName,
  optixFlowConfig,
  background,
  spacing = "sm",
  pattern,
  patternOpacity,
  slideMediaBrightness = "100",
}: CarouselGalleryThumbnailsProps): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const prevSlide = React.useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? (images?.length ?? 0) - 1 : prev - 1,
    );
  }, [images?.length]);

  const nextSlide = React.useCallback(() => {
    setCurrentIndex((prev) =>
      prev === (images?.length ?? 0) - 1 ? 0 : prev + 1,
    );
  }, [images?.length]);

  // Auto play functionality
  React.useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, autoPlay, autoPlayInterval, nextSlide]);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
      containerClassName={containerClassName}
    >
      {/* Main carousel */}
      <div className={cn("relative overflow-hidden rounded-2xl")}>
        <div
          className={cn(
            "relative aspect-video w-full overflow-hidden",
            slideClassName,
          )}
        >
          {imagesSlot
            ? imagesSlot
            : images?.map((image, index) => (
                <div
                  key={`slide-${index}`}
                  className={cn(
                    "absolute inset-0 transform transition-all duration-500 ease-in-out",
                    index === currentIndex
                      ? "translate-x-0 opacity-100"
                      : index < currentIndex
                        ? "-translate-x-full opacity-0"
                        : "translate-x-full opacity-0",
                    image.className,
                  )}
                >
                  <Img
                    src={image.src}
                    alt={
                      typeof image.alt === "string"
                        ? image.alt
                        : `Image ${index + 1}`
                    }
                    className={cn(
                      "h-full w-full object-cover",
                      BRIGHTNESS_CLASS_MAP[slideMediaBrightness],
                      image.imageClassName,
                    )}
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              ))}
        </div>

        {/* Navigation buttons */}
        <Pressable
          size="icon"
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2",
            navigationClassName,
          )}
          onClick={prevSlide}
          asButton
        >
          <DynamicIcon name="lucide/chevron-left" size={24} />
        </Pressable>

        <Pressable
          size="icon"
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2",
            navigationClassName,
          )}
          onClick={nextSlide}
          asButton
        >
          <DynamicIcon name="lucide/chevron-right" size={24} />
        </Pressable>

        {/* Caption */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 bg-linear-to-t from-foreground/90 to-transparent pt-12 md:pt-24 p-4 md:p-10 font-semibold text-sm text-background text-shadow",
            captionClassName,
          )}
        >
          {images?.[currentIndex].alt &&
            (typeof images?.[currentIndex].alt === "string" ? (
              images?.[currentIndex].alt
            ) : (
              <div>{images?.[currentIndex].alt}</div>
            ))}
        </div>
      </div>

      {/* Thumbnails */}
      {showThumbnails && (
        <div
          className={cn(
            "mt-4 flex justify-center gap-2 overflow-x-auto px-2 py-2",
            thumbnailsClassName,
          )}
        >
          {images?.map((image, index) => (
            <button
              key={`thumb-${index}`}
              className={cn(
                "relative h-20 w-20 shrink-0 transition-all duration-200",
                index === currentIndex
                  ? "ring-2 ring-primary ring-offset-2"
                  : "opacity-70 hover:opacity-100",
                thumbnailClassName,
              )}
              onClick={() => setCurrentIndex(index)}
            >
              <Img
                src={image.src}
                alt={`Thumbnail ${index + 1}`}
                className="h-full w-full rounded-sm object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            </button>
          ))}
        </div>
      )}
    </Section>
  );
}
