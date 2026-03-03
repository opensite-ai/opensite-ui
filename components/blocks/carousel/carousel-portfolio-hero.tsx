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
import {
  BRIGHTNESS_CLASS_MAP,
  cn,
  getNestedCardBg,
  getNestedCardTextColor,
} from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { BlockActions } from "@/components/ui/block-actions";
import { Badge } from "@/src";

export interface PortfolioSlide {
  /**
   * Unique identifier for the slide
   */
  id: number | string;
  /**
   * Image source URL
   */
  image: string;
  /**
   * Slide title
   */
  title?: React.ReactNode;
  /**
   * Slide description
   */
  description?: React.ReactNode;
  /**
   * Category tag
   */
  tag?: React.ReactNode;
  /**
   * Additional CSS classes for the slide
   */
  className?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
}

export interface CarouselPortfolioHeroProps {
  /**
   * Array of portfolio slides
   */
  slides?: PortfolioSlide[];
  /**
   * Custom slot for rendering slides (overrides slides array)
   */
  slidesSlot?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Auto-play interval in milliseconds
   */
  autoPlayInterval?: number;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the tag badge
   */
  tagClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the navigation controls
   */
  navigationClassName?: string;
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
   * Brightness level for slide images (controls overlay visibility)
   */
  slideMediaBrightness?: "10" | "20" | "25" | "30" | "40" | "50" | "75" | "100";
}

export function CarouselPortfolioHero({
  slides,
  slidesSlot,
  actions,
  actionsSlot,
  autoPlayInterval = 5000,
  className,
  containerClassName = "mx-auto w-full p-0 px-0 sm:px-0 lg:px-0 max-w-full relative z-10 h-full flex flex-col justify-center",
  contentClassName,
  tagClassName,
  titleClassName,
  descriptionClassName,
  actionsClassName,
  navigationClassName,
  counterClassName,
  optixFlowConfig,
  background,
  spacing = "none",
  pattern,
  patternOpacity,
  slideMediaBrightness = "50",
}: CarouselPortfolioHeroProps): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  // Reset the autoplay interval
  const resetInterval = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (slides?.length ?? 1));
    }, autoPlayInterval);
  }, [autoPlayInterval, slides?.length]);

  const goToNext = React.useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (slides?.length ?? 1));
    resetInterval();
  }, [slides?.length, resetInterval]);

  const goToPrev = React.useCallback(() => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + (slides?.length ?? 1)) % (slides?.length ?? 1),
    );
    resetInterval();
  }, [slides?.length, resetInterval]);

  // Initialize autoplay
  React.useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [resetInterval]);

  const currentSlide = slides?.[currentIndex];

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn("relative h-screen w-full overflow-hidden", className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
      containerClassName={containerClassName}
    >
      {/* Slide images with animation */}
      {slidesSlot
        ? slidesSlot
        : slides?.map((slide, index) => (
            <div
              key={slide.id}
              className={cn(
                "absolute inset-0 h-full w-full transition-opacity duration-1000",
                index === currentIndex ? "opacity-100" : "opacity-0",
                slide.className,
              )}
            >
              <Img
                src={slide.image}
                alt={
                  typeof slide.title === "string"
                    ? slide.title
                    : `Slide ${index + 1}`
                }
                className={cn(
                  "h-full w-full object-cover",
                  BRIGHTNESS_CLASS_MAP[slideMediaBrightness],
                  slide.imageClassName,
                )}
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          ))}

      {/* Content */}
      <div
        className={cn(
          "relative z-10 flex h-full w-full flex-col justify-end px-6 pb-16 md:px-8 lg:px-12",
        )}
      >
        <div className="relative">
          <div className={cn("w-full", contentClassName)}>
            {currentSlide?.tag && (
              <div className="mb-4">
                {typeof currentSlide.tag === "string" ? (
                  <Badge className={cn("px-3 py-1", tagClassName)}>
                    {currentSlide.tag}
                  </Badge>
                ) : (
                  currentSlide.tag
                )}
              </div>
            )}

            {currentSlide?.title &&
              (typeof currentSlide.title === "string" ? (
                <h1
                  className={cn(
                    "text-4xl font-bold sm:text-5xl md:text-6xl text-balance text-shadow-lg text-white",
                    titleClassName,
                  )}
                >
                  {currentSlide.title}
                </h1>
              ) : (
                <div className={titleClassName}>{currentSlide.title}</div>
              ))}

            {currentSlide?.description &&
              (typeof currentSlide.description === "string" ? (
                <p
                  className={cn(
                    "mt-4 text-lg opacity-80 sm:text-xl md:max-w-2xl text-balance text-shadow-lg text-white",
                    descriptionClassName,
                  )}
                >
                  {currentSlide.description}
                </p>
              ) : (
                <div className={descriptionClassName}>
                  {currentSlide.description}
                </div>
              ))}

            <div
              className={cn("mt-2 flex items-center gap-4", actionsClassName)}
            >
              <BlockActions
                actions={actions}
                actionsSlot={actionsSlot}
                actionsClassName={actionsClassName}
              />

              <div
                className={cn(
                  "ml-auto flex items-center gap-2 mt-4 md:mt-8",
                  navigationClassName,
                )}
              >
                <Pressable
                  variant="outline"
                  size="icon"
                  className={cn(
                    "rounded-full border-foreground/40",
                    getNestedCardBg(background),
                    getNestedCardTextColor(background),
                  )}
                  onClick={goToPrev}
                  asButton
                >
                  <DynamicIcon name="lucide/chevron-left" size={20} />
                </Pressable>

                <Pressable
                  variant="outline"
                  size="icon"
                  className="rounded-full border-foreground/40 bg-muted hover:bg-muted/80"
                  onClick={goToNext}
                  asButton
                >
                  <DynamicIcon name="lucide/chevron-right" size={20} />
                </Pressable>

                <div
                  className={cn(
                    "ml-3 text-sm opacity-80 text-white text-shadow-lg",
                    counterClassName,
                  )}
                >
                  {currentIndex + 1} / {slides?.length ?? 0}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
