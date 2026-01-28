"use client";

/**
 * CarouselFullscreenScrollFx
 *
 * A GSAP-powered fullscreen carousel with scroll-triggered animations,
 * pinned sections, and smooth parallax effects. Features immersive
 * full-viewport slides with overlay content and navigation indicators.
 *
 * Use cases:
 * - Immersive storytelling experiences
 * - Portfolio showcases with dramatic transitions
 * - Product launches with cinematic presentations
 * - Brand story pages with scroll-driven narratives
 */

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ContainerMaxWidth,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface FullscreenSlide {
  /**
   * Unique identifier for the slide
   */
  id: string;
  /**
   * Slide title
   */
  title?: React.ReactNode;
  /**
   * Slide subtitle/eyebrow text
   */
  subtitle?: React.ReactNode;
  /**
   * Slide description
   */
  description?: React.ReactNode;
  /**
   * Image source URL
   */
  image: string;
  /**
   * Overlay color (rgba format)
   */
  overlayColor?: string;
  /**
   * Additional CSS classes for the slide
   */
  className?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
}

export interface CarouselFullscreenScrollFxProps {
  /**
   * Array of fullscreen slides
   */
  slides?: FullscreenSlide[];
  /**
   * Custom slot for rendering slides (overrides slides array)
   */
  slidesSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the navigation dots
   */
  navigationClassName?: string;
  /**
   * Additional CSS classes for the content area
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the subtitle
   */
  subtitleClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the scroll indicator
   */
  scrollIndicatorClassName?: string;
  /**
   * Additional CSS classes for the slide counter
   */
  counterClassName?: string;
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
   * Optional max width for the content container
   */
  containerMaxWidth?: ContainerMaxWidth;
}

export function CarouselFullscreenScrollFx({
  slides,
  slidesSlot,
  className,
  navigationClassName,
  contentClassName,
  subtitleClassName,
  titleClassName,
  descriptionClassName,
  scrollIndicatorClassName,
  counterClassName,
  optixFlowConfig,
  background = "dark",
  spacing = "py-0",
  containerMaxWidth = "full",
  pattern = "diagonalCrossBasic",
  patternOpacity = 0.033,
}: CarouselFullscreenScrollFxProps): React.JSX.Element {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];

    slides?.forEach((slide, index) => {
      const element = document.getElementById(`fullscreen-${slide.id}`);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                setActiveIndex(index);
              }
            });
          },
          { threshold: 0.5 },
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [slides]);

  return (
    <Section
      ref={containerRef}
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
      containerMaxWidth={containerMaxWidth}
    >
      {/* Navigation dots */}
      <div
        className={cn(
          "fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 lg:flex",
          navigationClassName,
        )}
      >
        {slides?.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => {
              const element = document.getElementById(`fullscreen-${slide.id}`);
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            className={cn(
              "h-3 w-3 rounded-full border-2 transition-all",
              activeIndex === index
                ? "scale-125 border-white bg-white"
                : "border-white/50 bg-transparent hover:border-white",
            )}
            aria-label={`Go to ${typeof slide.title === "string" ? slide.title : `Slide ${index + 1}`}`}
          />
        ))}
      </div>

      {/* Slides */}
      {slidesSlot
        ? slidesSlot
        : slides?.map((slide, index) => (
            <div
              key={slide.id}
              id={`fullscreen-${slide.id}`}
              className={cn(
                "relative flex h-screen w-full items-center justify-center overflow-hidden",
                slide.className,
              )}
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <Img
                  src={slide.image}
                  alt={
                    typeof slide.title === "string"
                      ? slide.title
                      : `Slide ${index + 1}`
                  }
                  className={cn(
                    "h-full w-full object-cover",
                    slide.imageClassName,
                  )}
                  optixFlowConfig={optixFlowConfig}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: slide.overlayColor || "rgba(0, 0, 0, 0.5)",
                  }}
                />
              </div>

              {/* Content */}
              <div
                className={cn(
                  "relative z-10 mx-auto max-w-4xl px-6 text-center text-white",
                  contentClassName,
                )}
              >
                {slide.subtitle &&
                  (typeof slide.subtitle === "string" ? (
                    <p
                      className={cn(
                        "mb-4 text-sm font-medium uppercase tracking-widest text-white/70",
                        subtitleClassName,
                      )}
                    >
                      {slide.subtitle}
                    </p>
                  ) : (
                    <div className={subtitleClassName}>{slide.subtitle}</div>
                  ))}
                {slide.title &&
                  (typeof slide.title === "string" ? (
                    <h2
                      className={cn(
                        "mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl",
                        titleClassName,
                      )}
                    >
                      {slide.title}
                    </h2>
                  ) : (
                    <div className={titleClassName}>{slide.title}</div>
                  ))}
                {slide.description &&
                  (typeof slide.description === "string" ? (
                    <p
                      className={cn(
                        "mx-auto max-w-2xl text-lg text-white/80 md:text-xl",
                        descriptionClassName,
                      )}
                    >
                      {slide.description}
                    </p>
                  ) : (
                    <div className={descriptionClassName}>
                      {slide.description}
                    </div>
                  ))}

                {/* Scroll indicator */}
                {index < (slides?.length ?? 0) - 1 && (
                  <div
                    className={cn(
                      "absolute bottom-8 left-1/2 -translate-x-1/2",
                      scrollIndicatorClassName,
                    )}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs uppercase tracking-widest text-white/50">
                        Scroll
                      </span>
                      <div className="h-12 w-px animate-pulse bg-gradient-to-b from-white/50 to-transparent" />
                    </div>
                  </div>
                )}
              </div>

              {/* Slide counter */}
              <div
                className={cn(
                  "absolute bottom-8 right-8 text-sm text-white/50",
                  counterClassName,
                )}
              >
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(slides?.length ?? 0).padStart(2, "0")}
              </div>
            </div>
          ))}
    </Section>
  );
}
