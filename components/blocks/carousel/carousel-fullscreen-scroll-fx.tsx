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
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
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
  /**
   * Array of action configurations
   */
  actions?: ActionConfig[];
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
   * Additional CSS classes for the container
   */
  containerClassName?: string;
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
  containerClassName = "mx-auto w-full p-0 px-0 sm:px-0 lg:px-0 max-w-full relative z-10 h-full flex flex-col justify-center",
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
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Handle scroll to update active index (vertical)
  React.useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || !slides?.length) return;

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      const slideHeight = scrollContainer.clientHeight;
      const newIndex = Math.round(scrollTop / slideHeight);
      setActiveIndex(newIndex);
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [slides]);

  // Handle navigation dot clicks (vertical)
  const scrollToSlide = React.useCallback((index: number) => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const slideHeight = scrollContainer.clientHeight;
    // Check if scrollTo is available (not available in some test environments)
    if (typeof scrollContainer.scrollTo === "function") {
      scrollContainer.scrollTo({
        top: slideHeight * index,
        behavior: "smooth",
      });
    } else {
      // Fallback for test environments
      scrollContainer.scrollTop = slideHeight * index;
    }
  }, []);

  return (
    <Section
      ref={containerRef}
      background={background}
      spacing={spacing}
      className={cn("relative overflow-hidden", className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
      containerMaxWidth={containerMaxWidth}
      containerClassName={containerClassName}
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
            onClick={() => scrollToSlide(index)}
            className={cn(
              "h-3 w-3 rounded-full border-2 transition-all",
              activeIndex === index
                ? "scale-125 border-foreground bg-foreground"
                : "border-foreground/50 bg-transparent hover:border-foreground",
            )}
            aria-label={`Go to ${typeof slide.title === "string" ? slide.title : `Slide ${index + 1}`}`}
          />
        ))}
      </div>

      {/* Fixed scroll indicator - outside slides container */}
      {slides && slides.length > 1 && activeIndex < slides.length - 1 && (
        <button
          onClick={() => scrollToSlide(activeIndex + 1)}
          className={cn(
            "fixed bottom-8 left-1/2 z-50 -translate-x-1/2 cursor-pointer transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg p-2",
            scrollIndicatorClassName,
          )}
          aria-label="Scroll to next slide"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest opacity-50">
              Scroll
            </span>
            <div className="h-12 w-px animate-pulse bg-linear-to-b from-foreground/50 to-transparent" />
          </div>
        </button>
      )}

      {/* Fixed slide counter - outside slides container */}
      {slides && slides.length > 0 && (
        <div
          className={cn(
            "fixed bottom-8 right-8 z-50 text-sm opacity-50",
            counterClassName,
          )}
        >
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </div>
      )}

      {/* Vertical scroll container */}
      <div
        ref={scrollContainerRef}
        className="flex h-screen flex-col snap-y snap-mandatory overflow-x-hidden overflow-y-auto scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Slides */}
        {slidesSlot
          ? slidesSlot
          : slides?.map((slide, index) => {
              // Render actions for this slide
              const renderActions = React.useMemo(() => {
                if (!slide.actions || slide.actions.length === 0) return null;

                return slide.actions.map((action, actionIndex) => {
                  const {
                    label,
                    icon,
                    iconAfter,
                    children,
                    className: actionClassName,
                    asButton,
                    ...pressableProps
                  } = action;

                  return (
                    <Pressable
                      key={actionIndex}
                      asButton={asButton ?? true}
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
              }, [slide.actions]);

              return (
                <div
                  key={slide.id}
                  id={`fullscreen-${slide.id}`}
                  className={cn(
                    "relative flex h-screen min-h-screen w-full snap-start items-center justify-center overflow-hidden",
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
                        backgroundColor:
                          slide.overlayColor || "rgba(0, 0, 0, 0.5)",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div
                    className={cn(
                      "relative z-10 mx-auto max-w-4xl md:max-w-xl px-6 text-center text-shadow",
                      contentClassName,
                    )}
                  >
                    {slide.subtitle &&
                      (typeof slide.subtitle === "string" ? (
                        <p
                          className={cn(
                            "mb-4 text-sm font-medium uppercase tracking-widest opacity-70",
                            subtitleClassName,
                          )}
                        >
                          {slide.subtitle}
                        </p>
                      ) : (
                        <div className={subtitleClassName}>
                          {slide.subtitle}
                        </div>
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
                            "mx-auto text-lg opacity-80 md:text-xl text-balance",
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

                    {/* Actions */}
                    {renderActions && (
                      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        {renderActions}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
      </div>
    </Section>
  );
}
