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
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

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
}

export function CarouselPortfolioHero({
  slides,
  slidesSlot,
  actions,
  actionsSlot,
  autoPlayInterval = 5000,
  className,
  containerClassName,
  contentClassName,
  tagClassName,
  titleClassName,
  descriptionClassName,
  actionsClassName,
  navigationClassName,
  counterClassName,
  optixFlowConfig,
  background = "white",
  spacing = "xl",
  pattern,
  patternOpacity,
}: CarouselPortfolioHeroProps): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const goToNext = React.useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (slides?.length ?? 1));
  }, [slides?.length]);

  const goToPrev = React.useCallback(() => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + (slides?.length ?? 1)) % (slides?.length ?? 1)
    );
  }, [slides?.length]);

  React.useEffect(() => {
    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [goToNext, autoPlayInterval]);

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
      const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
      return (
        <Pressable
          key={index}
          asButton
          className={actionClassName}
          {...pressableProps}
        >
          {children ?? (
            <>
              {icon}
              {label}
              {iconAfter}
            </>
          )}
        </Pressable>
      );
    });
  };

  const currentSlide = slides?.[currentIndex];

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn("relative h-screen w-full overflow-hidden", className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      {/* Slide images with animation */}
      {slidesSlot ? (
        slidesSlot
      ) : (
        slides?.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 h-full w-full transition-opacity duration-1000",
              index === currentIndex ? "opacity-100" : "opacity-0",
              slide.className
            )}
          >
            <Img
              src={slide.image}
              alt={typeof slide.title === "string" ? slide.title : `Slide ${index + 1}`}
              className={cn("h-full w-full object-cover", slide.imageClassName)}
              optixFlowConfig={optixFlowConfig}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
        ))
      )}

      {/* Content */}
      <div className={cn("relative z-10 flex h-full w-full flex-col justify-end p-4 pb-16 text-white sm:p-8 md:p-12", containerClassName)}>
        <div className="container mx-auto">
          <div className={cn("max-w-3xl", contentClassName)}>
            {currentSlide?.tag && (
              <div className="mb-4">
                {typeof currentSlide.tag === "string" ? (
                  <span className={cn("inline-block rounded-full bg-primary px-3 py-1 text-sm font-medium", tagClassName)}>
                    {currentSlide.tag}
                  </span>
                ) : (
                  <div className={tagClassName}>{currentSlide.tag}</div>
                )}
              </div>
            )}

            {currentSlide?.title && (
              typeof currentSlide.title === "string" ? (
                <h1 className={cn("text-4xl font-bold sm:text-5xl md:text-6xl", titleClassName)}>
                  {currentSlide.title}
                </h1>
              ) : (
                <div className={titleClassName}>{currentSlide.title}</div>
              )
            )}

            {currentSlide?.description && (
              typeof currentSlide.description === "string" ? (
                <p className={cn("mt-4 text-lg text-white/80 sm:text-xl md:max-w-2xl", descriptionClassName)}>
                  {currentSlide.description}
                </p>
              ) : (
                <div className={descriptionClassName}>{currentSlide.description}</div>
              )
            )}

            <div className={cn("mt-8 flex items-center gap-4", actionsClassName)}>
              {renderActions()}

              <div className={cn("ml-auto flex items-center gap-2", navigationClassName)}>
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

                <div className={cn("ml-3 text-sm text-white/80", counterClassName)}>
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

