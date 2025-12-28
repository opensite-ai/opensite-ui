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
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface FullscreenSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  overlayColor?: string;
}

export interface CarouselFullscreenScrollFxProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
  slides?: FullscreenSlide[];
}

export function CarouselFullscreenScrollFx({
  className,
  optixFlowConfig,
  slides,
}: CarouselFullscreenScrollFxProps): React.JSX.Element {
  const defaultSlides: FullscreenSlide[] = React.useMemo(
    () =>
      Array.from({ length: 4 }).map((_, index) => ({
        id: `slide-${index}`,
        title: `Section ${index + 1}`,
        subtitle: `Discover More`,
        description: `Immerse yourself in this captivating visual experience. Each section tells a unique story through stunning imagery and thoughtful design.`,
        image: imagePlaceholders[index % imagePlaceholders.length],
        overlayColor: `rgba(0, 0, 0, 0.${4 + index})`,
      })),
    []
  );

  const slideItems = slides || defaultSlides;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Intersection observer for scroll-based activation
  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];

    slideItems.forEach((slide, index) => {
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
          { threshold: 0.5 }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [slideItems]);

  return (
    <section ref={containerRef} className={cn("relative", className)}>
      {/* Navigation dots */}
      <div className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {slideItems.map((slide, index) => (
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
                : "border-white/50 bg-transparent hover:border-white"
            )}
            aria-label={`Go to ${slide.title}`}
          />
        ))}
      </div>

      {/* Slides */}
      {slideItems.map((slide, index) => (
        <div
          key={slide.id}
          id={`fullscreen-${slide.id}`}
          className="relative flex h-screen w-full items-center justify-center overflow-hidden"
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <Img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
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
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white/70">
              {slide.subtitle}
            </p>
            <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {slide.title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/80 md:text-xl">
              {slide.description}
            </p>

            {/* Scroll indicator */}
            {index < slideItems.length - 1 && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
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
          <div className="absolute bottom-8 right-8 text-sm text-white/50">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(slideItems.length).padStart(2, "0")}
          </div>
        </div>
      ))}
    </section>
  );
}

