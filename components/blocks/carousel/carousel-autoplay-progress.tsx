"use client";

/**
 * CarouselAutoplayProgress
 *
 * An Embla-powered carousel with autoplay functionality, animated progress bar,
 * dot navigation, and play/pause controls. Features smooth transitions with
 * visual feedback for autoplay timing.
 *
 * Use cases:
 * - Hero sections with timed content rotation
 * - Product showcases with automatic advancement
 * - Testimonial carousels with progress indication
 * - Feature highlight sections
 */

import * as React from "react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface AutoplaySlide {
  /**
   * Image source URL
   */
  src: string;
  /**
   * Image alt text
   */
  alt?: React.ReactNode;
  /**
   * Additional content below the image
   */
  content?: React.ReactNode;
  /**
   * Additional CSS classes for the slide
   */
  className?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
}

export interface CarouselAutoplayProgressProps {
  /**
   * Array of slides
   */
  slides?: AutoplaySlide[];
  /**
   * Custom slot for rendering slides (overrides slides array)
   */
  slidesSlot?: React.ReactNode;
  /**
   * Embla carousel options
   */
  options?: EmblaOptionsType;
  /**
   * Autoplay delay in milliseconds
   */
  autoplayDelay?: number;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the carousel container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the slides track
   */
  trackClassName?: string;
  /**
   * Additional CSS classes for individual slides
   */
  slideClassName?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for the controls area
   */
  controlsClassName?: string;
  /**
   * Additional CSS classes for the dots navigation
   */
  dotsClassName?: string;
  /**
   * Additional CSS classes for the progress bar
   */
  progressClassName?: string;
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

// Hook for dot button navigation
function useDotButton(emblaApi: EmblaCarouselType | undefined) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onDotButtonClick = React.useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = React.useCallback((api: EmblaCarouselType) => {
    setScrollSnaps(api.scrollSnapList());
  }, []);

  const onSelect = React.useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return { selectedIndex, scrollSnaps, onDotButtonClick };
}

// Hook for autoplay controls
function useAutoplay(emblaApi: EmblaCarouselType | undefined) {
  const [autoplayIsPlaying, setAutoplayIsPlaying] = React.useState(false);

  const onAutoplayButtonClick = React.useCallback(
    (callback: () => void) => {
      const autoplay = emblaApi?.plugins()?.autoplay;
      if (!autoplay) return;

      const resetOrStop =
        autoplay.options.stopOnInteraction === false
          ? autoplay.reset
          : autoplay.stop;

      resetOrStop();
      callback();
    },
    [emblaApi]
  );

  const toggleAutoplay = React.useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play;
    playOrStop();
  }, [emblaApi]);

  React.useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    setAutoplayIsPlaying(autoplay.isPlaying());
    emblaApi
      .on("autoplay:play", () => setAutoplayIsPlaying(true))
      .on("autoplay:stop", () => setAutoplayIsPlaying(false))
      .on("reInit", () => setAutoplayIsPlaying(autoplay.isPlaying()));
  }, [emblaApi]);

  return { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick };
}

// Hook for autoplay progress
function useAutoplayProgress(
  emblaApi: EmblaCarouselType | undefined,
  progressNode: React.RefObject<HTMLElement | null>
) {
  const [showAutoplayProgress, setShowAutoplayProgress] = React.useState(false);
  const animationName = React.useRef("");
  const timeoutId = React.useRef(0);
  const rafId = React.useRef(0);

  const startProgress = React.useCallback(
    (timeUntilNext: number | null) => {
      const node = progressNode.current;
      if (!node || timeUntilNext === null) return;

      if (!animationName.current) {
        const style = window.getComputedStyle(node);
        animationName.current = style.animationName;
      }

      node.style.animationName = "none";
      node.style.transform = "translate3d(0,0,0)";

      rafId.current = window.requestAnimationFrame(() => {
        timeoutId.current = window.setTimeout(() => {
          node.style.animationName = animationName.current;
          node.style.animationDuration = `${timeUntilNext}ms`;
        }, 0);
      });

      setShowAutoplayProgress(true);
    },
    [progressNode]
  );

  React.useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    emblaApi
      .on("autoplay:timerset", () => startProgress(autoplay.timeUntilNext()))
      .on("autoplay:timerstopped", () => setShowAutoplayProgress(false));
  }, [emblaApi, startProgress]);

  React.useEffect(() => {
    return () => {
      cancelAnimationFrame(rafId.current);
      clearTimeout(timeoutId.current);
    };
  }, []);

  return { showAutoplayProgress };
}

export function CarouselAutoplayProgress({
  slides,
  slidesSlot,
  options,
  autoplayDelay = 3000,
  className,
  containerClassName,
  trackClassName,
  slideClassName,
  imageClassName,
  controlsClassName,
  dotsClassName,
  progressClassName,
  optixFlowConfig,
  background = "white",
  spacing = "xl",
  pattern,
  patternOpacity,
}: CarouselAutoplayProgressProps): React.JSX.Element {
  const progressNode = React.useRef<HTMLDivElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: autoplayDelay }),
  ]);

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi);
  const { showAutoplayProgress } = useAutoplayProgress(emblaApi, progressNode);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("overflow-hidden", containerClassName)} ref={emblaRef}>
        <div className={cn("ml-auto mr-3 flex touch-pan-y touch-pinch-zoom", trackClassName)}>
          {slidesSlot ? (
            slidesSlot
          ) : (
            slides.map((slide, index) => (
              <div
                className={cn("flex-[0_0_70%] transform-gpu pl-3", slideClassName, slide.className)}
                key={index}
              >
                <div className="aspect-video overflow-hidden rounded-lg">
                  <Img
                    src={slide.src}
                    alt={typeof slide.alt === "string" ? slide.alt : `Slide ${index + 1}`}
                    className={cn("h-full w-full object-cover", imageClassName, slide.imageClassName)}
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
                {slide.content && (
                  <div className="mt-4">{slide.content}</div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div className={cn("mx-auto mt-7 flex max-w-80 items-center justify-between gap-3", controlsClassName)}>
        <div className={cn("flex justify-center gap-2", dotsClassName)}>
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() =>
                onAutoplayButtonClick(() => onDotButtonClick(index))
              }
              className={cn(
                "h-3 w-3 rounded-full border-2 border-border transition-colors duration-200",
                index === selectedIndex
                  ? "bg-foreground"
                  : "bg-transparent hover:bg-muted"
              )}
            />
          ))}
        </div>

        <div
          className={cn(
            "relative h-2 w-40 max-w-[90%] justify-self-center self-center overflow-hidden rounded-[1.8rem] border-2 border-border bg-background transition-opacity duration-300 ease-in-out",
            showAutoplayProgress ? "opacity-100" : "opacity-0",
            progressClassName
          )}
        >
          <div
            className="absolute bottom-0 top-0 -left-full w-full bg-foreground"
            ref={progressNode}
            style={{
              animation: "autoplay-progress linear 1",
              animationPlayState: showAutoplayProgress ? "running" : "paused",
            }}
          />
        </div>

        <Pressable
          size="icon"
          variant="secondary"
          onClick={toggleAutoplay}
          asButton
        >
          {autoplayIsPlaying ? (
            <DynamicIcon name="lucide/pause" size={16} />
          ) : (
            <DynamicIcon name="lucide/play" size={16} />
          )}
        </Pressable>
      </div>

      <style jsx>{`
        @keyframes autoplay-progress {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(100%);
          }
        }
      `}</style>
    </Section>
  );
}

