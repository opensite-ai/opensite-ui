"use client";

/**
 * CarouselPortfolioHero
 *
 * A fullscreen portfolio hero section with auto-advancing image slider,
 * gradient overlay, category tags, and navigation controls. Features smooth
 * opacity transitions between slides with slide counter display.
 *
 * Use cases:
 * - Creative portfolio landing pages
 * - Agency showcase hero sections
 * - Photography portfolio introductions
 * - Design studio homepages
 */

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface PortfolioSlide {
  id: number | string;
  image: string;
  title: string;
  description: string;
  tag: string;
}

export interface CarouselPortfolioHeroProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
  slides?: PortfolioSlide[];
  ctaText?: string;
  ctaHref?: string;
  autoPlayInterval?: number;
}

export function CarouselPortfolioHero({
  className,
  optixFlowConfig,
  slides,
  ctaText = "View Projects",
  ctaHref = "#",
  autoPlayInterval = 5000,
}: CarouselPortfolioHeroProps): React.JSX.Element {
  const defaultSlides: PortfolioSlide[] = React.useMemo(
    () => [
      {
        id: 1,
        image: imagePlaceholders[0],
        title: "Web Design Portfolio",
        description:
          "Clean, modern interfaces that prioritize user experience and functionality",
        tag: "UI/UX Design",
      },
      {
        id: 2,
        image: imagePlaceholders[1],
        title: "Branding & Identity",
        description:
          "Crafting memorable brand identities that tell your unique story",
        tag: "Brand Design",
      },
      {
        id: 3,
        image: imagePlaceholders[2],
        title: "Photography Projects",
        description: "Capturing moments and emotions through a creative lens",
        tag: "Photography",
      },
    ],
    []
  );

  const portfolioSlides = slides || defaultSlides;
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const goToNext = React.useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % portfolioSlides.length);
  }, [portfolioSlides.length]);

  const goToPrev = React.useCallback(() => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + portfolioSlides.length) % portfolioSlides.length
    );
  }, [portfolioSlides.length]);

  React.useEffect(() => {
    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [goToNext, autoPlayInterval]);

  return (
    <section
      className={cn("relative h-screen w-full overflow-hidden", className)}
    >
      {/* Slide images with animation */}
      {portfolioSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 h-full w-full transition-opacity duration-1000",
            index === currentIndex ? "opacity-100" : "opacity-0"
          )}
        >
          <Img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover"
            optixFlowConfig={optixFlowConfig}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col justify-end p-4 pb-16 text-white sm:p-8 md:p-12">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            <div className="mb-4">
              <span className="inline-block rounded-full bg-primary px-3 py-1 text-sm font-medium">
                {portfolioSlides[currentIndex].tag}
              </span>
            </div>

            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              {portfolioSlides[currentIndex].title}
            </h1>

            <p className="mt-4 text-lg text-white/80 sm:text-xl md:max-w-2xl">
              {portfolioSlides[currentIndex].description}
            </p>

            <div className="mt-8 flex items-center gap-4">
              <Pressable
                href={ctaHref}
                asButton
                size="lg"
                className="min-w-[150px]"
              >
                {ctaText}
              </Pressable>

              <div className="ml-auto flex items-center gap-2">
                <Pressable
                  variant="outline"
                  size="icon"
                  className="rounded-full border-white/40 bg-black/30 text-white hover:bg-black/50 hover:text-white"
                  onClick={goToPrev}
                  asButton
                >
                  <DynamicIcon name="lucide/chevron-left" size={20} />
                </Pressable>

                <Pressable
                  variant="outline"
                  size="icon"
                  className="rounded-full border-white/40 bg-black/30 text-white hover:bg-black/50 hover:text-white"
                  onClick={goToNext}
                  asButton
                >
                  <DynamicIcon name="lucide/chevron-right" size={20} />
                </Pressable>

                <div className="ml-3 text-sm text-white/80">
                  {currentIndex + 1} / {portfolioSlides.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

