"use client";

/**
 * CarouselImageHero
 *
 * A full-width hero section with an auto-advancing background image carousel,
 * overlay content with headline, description, and call-to-action button.
 * Includes navigation arrows and dot indicators for manual slide control.
 *
 * Use cases:
 * - Landing page hero sections with rotating imagery
 * - Product launch pages with visual storytelling
 * - Portfolio showcases with featured work
 * - Marketing campaigns with dynamic backgrounds
 */

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface CarouselImageHeroProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
  badgeText?: string;
  heading?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  images?: Array<{
    src: string;
    alt: string;
  }>;
  autoPlayInterval?: number;
}

export function CarouselImageHero({
  className,
  optixFlowConfig,
  badgeText = "Launching Soon",
  heading = "Build exceptional digital experiences",
  description = "Our platform helps you create stunning websites and applications with ease, designed to engage your audience and drive results.",
  ctaText = "Get Started",
  ctaHref = "#",
  images,
  autoPlayInterval = 5000,
}: CarouselImageHeroProps): React.JSX.Element {
  const defaultImages = React.useMemo(
    () =>
      Array.from({ length: 3 }).map((_, index) => ({
        src: imagePlaceholders[index % imagePlaceholders.length],
        alt: `Hero image ${index + 1}`,
      })),
    []
  );

  const heroImages = images || defaultImages;
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [heroImages.length, autoPlayInterval]);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + heroImages.length) % heroImages.length
    );
  };

  return (
    <section className={cn("relative min-h-[600px] overflow-hidden", className)}>
      {/* Image Carousel */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            )}
          >
            <Img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}

        {/* Navigation Arrows */}
        <Pressable
          onClick={goToPreviousImage}
          asButton
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-background/30 p-2 backdrop-blur-sm transition-colors hover:bg-background/50 md:block"
          aria-label="Previous image"
        >
          <DynamicIcon name="lucide/chevron-left" size={24} className="text-white" />
        </Pressable>

        <Pressable
          onClick={goToNextImage}
          asButton
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-background/30 p-2 backdrop-blur-sm transition-colors hover:bg-background/50 md:block"
          aria-label="Next image"
        >
          <DynamicIcon name="lucide/chevron-right" size={24} className="text-white" />
        </Pressable>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-colors",
                index === currentImageIndex
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white/80"
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto flex min-h-[600px] flex-col items-center justify-center px-4 py-24 text-center md:px-6 md:py-32 2xl:max-w-[1400px]">
        <div className="max-w-3xl space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
              <span>{badgeText}</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-primary-foreground dark:text-primary sm:text-5xl md:text-6xl">
              {heading}
            </h1>
            <p className="text-xl text-primary-foreground dark:text-primary">
              {description}
            </p>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Pressable
              href={ctaHref}
              asButton
              size="lg"
              variant="secondary"
              className="bg-primary-foreground text-primary dark:bg-primary dark:text-primary-foreground"
            >
              {ctaText}
              <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
            </Pressable>
          </div>
        </div>
      </div>
    </section>
  );
}

