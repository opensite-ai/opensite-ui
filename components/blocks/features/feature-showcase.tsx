"use client";

import * as React from "react";
import { useEffect, useRef, useState, useMemo, type ReactNode } from "react";
import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "../../ui/carousel";
import { CarouselPagination } from "../../ui/carousel-pagination";

export interface FeatureShowcaseItem {
  /**
   * Content to display (text, headings, etc.)
   */
  content?: ReactNode;
  /**
   * Media component to display (images, videos, etc.)
   */
  mediaComponent?: ReactNode;
}

export interface FeatureShowcaseProps {
  /**
   * Array of feature items to display in the carousel
   */
  items?: FeatureShowcaseItem[];
  /**
   * Optional header content above the carousel
   */
  children?: ReactNode;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the carousel
   */
  carouselClassName?: string;
  /**
   * Additional CSS classes for each slide
   */
  slideClassName?: string;
  /**
   * Additional CSS classes for the content area
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the media area
   */
  mediaClassName?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Whether to equalize slide heights on mobile
   */
  equalizeOnMobile?: boolean;
  /**
   * Whether to stretch media to fill available space on mobile
   */
  stretchMediaOnMobile?: boolean;
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
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
}

/**
 * Feature Showcase component with carousel navigation
 *
 * Displays feature content with media in a carousel format. Each slide shows
 * content (text, headings) alongside media (images, videos). Features mobile
 * height equalization for consistent slide heights and customizable styling.
 *
 * @example
 * ```tsx
 * <FeatureShowcase
 *   items={[
 *     {
 *       content: <div><h3>Feature 1</h3><p>Description</p></div>,
 *       mediaComponent: <img src="/feature1.jpg" alt="Feature 1" />
 *     },
 *     {
 *       content: <div><h3>Feature 2</h3><p>Description</p></div>,
 *       mediaComponent: <img src="/feature2.jpg" alt="Feature 2" />
 *     }
 *   ]}
 * />
 * ```
 */
export function FeatureShowcase({
  items,
  children,
  className,
  carouselClassName,
  slideClassName,
  contentClassName,
  mediaClassName,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  equalizeOnMobile,
  stretchMediaOnMobile,
  background,
  spacing = "py-12 md:py-32",
  pattern,
  patternOpacity,
  patternClassName,
}: FeatureShowcaseProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [canScrollPrevious, setCanScrollPrevious] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;

    const updateScrollState = () => {
      setCanScrollPrevious(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    updateScrollState();
    api.on("select", updateScrollState);

    return () => {
      api.off("select", updateScrollState);
    };
  }, [api]);

  const [mobileSlideHeight, setMobileSlideHeight] = useState<number | null>(
    null,
  );
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);

  const mediaWrapperClassName = useMemo(
    () =>
      equalizeOnMobile && stretchMediaOnMobile
        ? "flex-1 min-h-0 md:flex-none"
        : "",
    [equalizeOnMobile, stretchMediaOnMobile],
  );

  useEffect(() => {
    if (!equalizeOnMobile || !items || items.length === 0) {
      setMobileSlideHeight(null);
      return;
    }

    const updateHeights = () => {
      if (typeof window === "undefined") return;
      const isMobile = window.innerWidth < 768;

      if (!isMobile) {
        setMobileSlideHeight(null);
        return;
      }

      const heights = slideRefs.current
        .slice(0, items.length)
        .map((node) => node?.offsetHeight ?? 0);
      const maxHeight = Math.max(...heights, 0);

      if (maxHeight > 0) {
        setMobileSlideHeight((prev) => (prev === maxHeight ? prev : maxHeight));
      }
    };

    updateHeights();
    window.addEventListener("resize", updateHeights);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(updateHeights);
      slideRefs.current.slice(0, items.length).forEach((node) => {
        if (node) resizeObserver?.observe(node);
      });
    }

    return () => {
      window.removeEventListener("resize", updateHeights);
      resizeObserver?.disconnect();
    };
  }, [equalizeOnMobile, items]);

  const carouselContent = useMemo(() => {
    if (!items || items.length === 0) return null;

    return (
      <Carousel className={carouselClassName} setApi={setApi}>
        <div className="pb-18 md:pb-24">
          <CarouselContent className="ease-in">
            {items.map((item, itemIndex) => (
              <CarouselItem key={`slide-${itemIndex}`}>
                <div
                  ref={(node) => {
                    slideRefs.current[itemIndex] = node;
                  }}
                  style={
                    equalizeOnMobile && mobileSlideHeight
                      ? { minHeight: mobileSlideHeight }
                      : undefined
                  }
                  className={cn(
                    "flex flex-col-reverse gap-8 md:gap-14 md:flex-row md:items-center md:justify-between",
                    slideClassName,
                  )}
                >
                  {item.content && (
                    <div className={cn("w-full", contentClassName)}>
                      {item.content}
                    </div>
                  )}
                  {item.mediaComponent && (
                    <div
                      className={cn(
                        "relative w-full min-h-[25dvh] h-[25dvh] max-h-[35dvh] md:min-h-[300px] md:h-[400px] md:max-h-[500px] [&>*]:h-full [&>*]:object-cover",
                        mediaWrapperClassName,
                        mediaClassName,
                      )}
                    >
                      {item.mediaComponent}
                      {/* Mobile-only pagination - positioned relative to the image */}
                      <CarouselPagination
                        onPrevious={() => api?.scrollPrev()}
                        onNext={() => api?.scrollNext()}
                        canScrollPrevious={canScrollPrevious}
                        canScrollNext={canScrollNext}
                        className="absolute bottom-2 right-2 md:hidden"
                      />
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
        {/* Desktop-only pagination - positioned at bottom of carousel */}
        <CarouselPagination
          onPrevious={() => api?.scrollPrev()}
          onNext={() => api?.scrollNext()}
          canScrollPrevious={canScrollPrevious}
          canScrollNext={canScrollNext}
          className="absolute bottom-6 right-0 hidden md:flex"
        />
      </Carousel>
    );
  }, [
    items,
    carouselClassName,
    equalizeOnMobile,
    mobileSlideHeight,
    slideClassName,
    contentClassName,
    mediaWrapperClassName,
    mediaClassName,
    api,
    canScrollPrevious,
    canScrollNext,
  ]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName={containerClassName}
    >
      {children}
      {carouselContent}
    </Section>
  );
}
