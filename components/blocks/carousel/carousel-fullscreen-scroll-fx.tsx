"use client";

/**
 * CarouselFullscreenScrollFx
 *
 * A fullscreen carousel driven by the document scroll position. A sticky
 * viewport keeps the block in place while the page advances through immersive
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
import { DynamicIcon } from "../../ui/dynamic-icon";
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
   * Custom slot for rendering slides (overrides slides array). Each direct
   * child is treated as one full-viewport slide.
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
  /** Optional Section ID */
  sectionId?: string;
}

interface SlideActionsProps {
  actions?: ActionConfig[];
}

function SlideActions({ actions }: SlideActionsProps): React.JSX.Element | null {
  if (!actions || actions.length === 0) return null;

  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
      {actions.map((action, actionIndex) => {
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
                {icon !== "" && <DynamicIcon name={icon} />}
                {label}
                {iconAfter !== "" && <DynamicIcon name={iconAfter} />}
              </>
            )}
          </Pressable>
        );
      })}
    </div>
  );
}

export function CarouselFullscreenScrollFx({
  sectionId = "carousel-fullscreen-scroll-fx",
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
  const trackRef = React.useRef<HTMLDivElement>(null);
  const viewportRef = React.useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const hasSlidesSlot = slidesSlot !== undefined && slidesSlot !== null;
  const slotSlides = React.useMemo(
    () => React.Children.toArray(slidesSlot),
    [slidesSlot],
  );
  const slideCount = hasSlidesSlot ? slotSlides.length : (slides?.length ?? 0);
  const trackSlideCount = Math.max(slideCount, 1);
  const safeActiveIndex =
    slideCount > 0 ? Math.min(activeIndex, slideCount - 1) : 0;

  // Keep slide state aligned to this block's position in the document. The
  // browser owns the only scroll surface; this component never traps wheel or
  // touch input in a nested scroll container.
  React.useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;

    if (!track || !viewport || slideCount === 0) {
      setActiveIndex(0);
      return;
    }

    let animationFrame: number | null = null;

    const updateActiveIndex = () => {
      animationFrame = null;

      const trackRect = track.getBoundingClientRect();
      const viewportHeight =
        viewport.getBoundingClientRect().height ||
        window.visualViewport?.height ||
        window.innerHeight;
      const scrollDistance = Math.max(trackRect.height - viewportHeight, 0);
      const progress =
        scrollDistance > 0
          ? Math.min(1, Math.max(0, -trackRect.top / scrollDistance))
          : 0;
      const nextIndex = Math.min(
        slideCount - 1,
        Math.max(0, Math.round(progress * (slideCount - 1))),
      );

      setActiveIndex((currentIndex) =>
        currentIndex === nextIndex ? currentIndex : nextIndex,
      );
    };

    const scheduleUpdate = () => {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(updateActiveIndex);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.visualViewport?.addEventListener("resize", scheduleUpdate);

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(scheduleUpdate)
        : null;
    resizeObserver?.observe(track);
    resizeObserver?.observe(viewport);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.visualViewport?.removeEventListener("resize", scheduleUpdate);
      resizeObserver?.disconnect();

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [slideCount]);

  // Navigation moves the document to the requested point in this block's
  // scroll track, so it works whether the carousel is first, middle, or last.
  const scrollToSlide = React.useCallback(
    (index: number) => {
      const track = trackRef.current;
      const viewport = viewportRef.current;

      if (!track || !viewport || slideCount === 0) return;

      const safeIndex = Math.min(slideCount - 1, Math.max(0, index));
      const trackRect = track.getBoundingClientRect();
      const viewportHeight =
        viewport.getBoundingClientRect().height ||
        window.visualViewport?.height ||
        window.innerHeight;
      const scrollDistance = Math.max(trackRect.height - viewportHeight, 0);
      const trackTop = window.scrollY + trackRect.top;
      const targetTop =
        trackTop +
        (slideCount > 1
          ? (safeIndex / (slideCount - 1)) * scrollDistance
          : 0);
      const prefersReducedMotion =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      window.scrollTo({
        top: targetTop,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    },
    [slideCount],
  );

  return (
    <div
      ref={trackRef}
      className="relative"
      data-carousel-scroll-track="true"
      data-carousel-slide-count={slideCount}
    >
      <Section
        id={sectionId}
        ref={viewportRef}
        background={background}
        spacing={spacing}
        className={cn(
          "sticky top-0 h-screen overflow-hidden supports-[height:100dvh]:h-dvh",
          className,
        )}
        pattern={pattern}
        patternOpacity={patternOpacity}
        containerMaxWidth={containerMaxWidth}
        containerClassName={cn(containerClassName, "h-full")}
        data-carousel-sticky-viewport="true"
      >
        {/* Navigation dots */}
        {slideCount > 1 && (
          <nav
            aria-label="Carousel navigation"
            className={cn(
              "absolute right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 lg:flex",
              navigationClassName,
            )}
          >
            {Array.from({ length: slideCount }, (_, index) => {
              const slide = slides?.[index];
              const isActive = safeActiveIndex === index;

              return (
                <button
                  key={slide?.id ?? index}
                  type="button"
                  onClick={() => scrollToSlide(index)}
                  className={cn(
                    "h-3 w-3 cursor-pointer rounded-full border-2 transition-all motion-reduce:transition-none",
                    isActive
                      ? "scale-125 border-white bg-white"
                      : "border-white bg-transparent hover:bg-white",
                  )}
                  aria-current={isActive ? "step" : undefined}
                  aria-label={`Go to ${typeof slide?.title === "string" ? slide.title : `Slide ${index + 1}`}`}
                />
              );
            })}
          </nav>
        )}

        {/* Scroll indicator */}
        {slideCount > 1 && safeActiveIndex < slideCount - 1 && (
          <button
            type="button"
            onClick={() => scrollToSlide(safeActiveIndex + 1)}
            className={cn(
              "absolute bottom-8 left-1/2 z-50 -translate-x-1/2 cursor-pointer rounded-lg p-2 transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              scrollIndicatorClassName,
            )}
            aria-label="Scroll to next slide"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs uppercase tracking-widest opacity-50">
                Scroll
              </span>
              <div className="h-12 w-px animate-pulse bg-linear-to-b from-foreground/50 to-transparent motion-reduce:animate-none" />
            </div>
          </button>
        )}

        {/* Slide counter */}
        {slideCount > 0 && (
          <div
            className={cn(
              "absolute bottom-8 right-8 z-50 text-sm opacity-50",
              counterClassName,
            )}
            aria-label={`Slide ${safeActiveIndex + 1} of ${slideCount}`}
          >
            {String(safeActiveIndex + 1).padStart(2, "0")} /{" "}
            {String(slideCount).padStart(2, "0")}
          </div>
        )}

        {/* Slides move inside the sticky viewport while the document scrolls. */}
        <div
          className={cn(
            "absolute inset-0 flex h-full flex-col transition-transform duration-700 ease-out will-change-transform motion-reduce:transition-none",
          )}
          style={{
            transform: `translate3d(0, -${safeActiveIndex * 100}%, 0)`,
          }}
          data-carousel-slides="true"
        >
          {hasSlidesSlot
            ? slotSlides.map((slide, index) => {
                const isActive = safeActiveIndex === index;

                return (
                  <div
                    key={React.isValidElement(slide) ? slide.key : index}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`Slide ${index + 1} of ${slideCount}`}
                    aria-hidden={!isActive}
                    {...(!isActive ? { inert: "" } : {})}
                    className="relative h-full min-h-full w-full shrink-0 overflow-hidden"
                  >
                    {slide}
                  </div>
                );
              })
            : slides?.map((slide, index) => {
                const isActive = safeActiveIndex === index;

                return (
                  <div
                    key={slide.id}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`Slide ${index + 1} of ${slideCount}`}
                    aria-hidden={!isActive}
                    {...(!isActive ? { inert: "" } : {})}
                    className={cn(
                      "relative flex h-full min-h-full w-full shrink-0 items-center justify-center overflow-hidden",
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
                        "relative z-10 mx-auto max-w-full md:max-w-md px-6 text-center text-shadow-lg text-white",
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
                      <SlideActions actions={slide.actions} />
                    </div>
                  </div>
                );
              })}
        </div>
      </Section>
      {Array.from({ length: trackSlideCount - 1 }, (_, index) => (
        <div
          key={index}
          className="h-screen supports-[height:100dvh]:h-dvh"
          aria-hidden="true"
          data-carousel-scroll-step="true"
        />
      ))}
    </div>
  );
}
