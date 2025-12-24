"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../../../lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";

export interface FeatureShowcaseItem {
  content: ReactNode;
  mediaComponent: ReactNode;
}

export interface FeatureShowcaseProps {
  items: FeatureShowcaseItem[];
  children?: ReactNode;
  className?: string;
  carouselClassName?: string;
  slideClassName?: string;
  contentClassName?: string;
  mediaClassName?: string;
  arrowClassName?: string;
  equalizeOnMobile?: boolean;
  stretchMediaOnMobile?: boolean;
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
  arrowClassName,
  equalizeOnMobile = true,
  stretchMediaOnMobile = true,
}: FeatureShowcaseProps) {
  const baseArrowClassName =
    "bottom-4 top-auto size-12 translate-y-0 rounded-full border border-current bg-transparent text-current shadow-sm focus:ring-current focus:ring-offset-2 focus:ring-offset-transparent hover:bg-current/10 md:bottom-6";
  const [mobileSlideHeight, setMobileSlideHeight] = useState<number | null>(
    null
  );
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mediaWrapperClassName =
    equalizeOnMobile && stretchMediaOnMobile
      ? "flex-1 min-h-0 md:flex-none"
      : "";

  useEffect(() => {
    if (!equalizeOnMobile) {
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
        setMobileSlideHeight((prev) =>
          prev === maxHeight ? prev : maxHeight
        );
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
  }, [equalizeOnMobile, items.length]);

  return (
    <div className={className}>
      {children}
      <Carousel className={carouselClassName}>
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
                    "flex flex-col gap-8 md:gap-14 md:flex-row md:items-center md:justify-between",
                    slideClassName
                  )}
                >
                  <div className={cn("w-full", contentClassName)}>
                    {item.content}
                  </div>
                  <div
                    className={cn(
                      "w-full",
                      mediaWrapperClassName,
                      mediaClassName
                    )}
                  >
                    {item.mediaComponent}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
        <CarouselPrevious
          className={cn(baseArrowClassName, "left-4 md:left-6", arrowClassName)}
        />
        <CarouselNext
          className={cn(baseArrowClassName, "right-4 md:right-6", arrowClassName)}
        />
      </Carousel>
    </div>
  );
}
