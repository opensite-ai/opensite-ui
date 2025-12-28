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
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface GalleryImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface CarouselGalleryThumbnailsProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
  images?: GalleryImage[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showThumbnails?: boolean;
}

export function CarouselGalleryThumbnails({
  className,
  optixFlowConfig,
  images,
  autoPlay = true,
  autoPlayInterval = 5000,
  showThumbnails = true,
}: CarouselGalleryThumbnailsProps): React.JSX.Element {
  const defaultImages: GalleryImage[] = React.useMemo(
    () =>
      Array.from({ length: 5 }).map((_, index) => ({
        src: imagePlaceholders[index % imagePlaceholders.length],
        alt: `Gallery image ${index + 1}`,
        width: 1470,
        height: 980,
      })),
    []
  );

  const galleryImages = images || defaultImages;
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const prevSlide = React.useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  }, [galleryImages.length]);

  const nextSlide = React.useCallback(() => {
    setCurrentIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  }, [galleryImages.length]);

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
    <section className={cn("w-full p-4 md:p-6", className)}>
      {/* Main carousel */}
      <div className="relative overflow-hidden rounded-lg">
        <div className="relative aspect-video w-full overflow-hidden">
          {galleryImages.map((image, index) => (
            <div
              key={`slide-${index}`}
              className={cn(
                "absolute inset-0 transform transition-all duration-500 ease-in-out",
                index === currentIndex
                  ? "translate-x-0 opacity-100"
                  : index < currentIndex
                    ? "-translate-x-full opacity-0"
                    : "translate-x-full opacity-0"
              )}
            >
              <Img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <Pressable
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2"
          onClick={prevSlide}
          asButton
        >
          <DynamicIcon name="lucide/chevron-left" size={24} />
        </Pressable>

        <Pressable
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2"
          onClick={nextSlide}
          asButton
        >
          <DynamicIcon name="lucide/chevron-right" size={24} />
        </Pressable>

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-sm text-white">
          {galleryImages[currentIndex].alt}
        </div>
      </div>

      {/* Thumbnails */}
      {showThumbnails && (
        <div className="mt-4 flex gap-2 overflow-x-auto px-2 py-2">
          {galleryImages.map((image, index) => (
            <button
              key={`thumb-${index}`}
              className={cn(
                "relative h-20 w-20 shrink-0 transition-all duration-200",
                index === currentIndex
                  ? "ring-2 ring-primary ring-offset-2"
                  : "opacity-70 hover:opacity-100"
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
    </section>
  );
}

