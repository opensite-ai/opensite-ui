"use client";

/**
 * CarouselHorizontalCards
 *
 * A horizontal scrolling card carousel with animated entrance effects,
 * navigation buttons, and stat displays. Features smooth scroll behavior
 * with dynamic button visibility based on scroll position.
 *
 * Use cases:
 * - Feature showcases with multiple cards
 * - Product category browsing
 * - Team member or testimonial displays
 * - Content discovery sections
 */

import * as React from "react";
import { motion } from "framer-motion";
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

export interface CardItem {
  /**
   * Unique identifier for the card
   */
  id: string | number;
  /**
   * Image source URL
   */
  imageSrc: string;
  /**
   * Card title
   */
  title?: React.ReactNode;
  /**
   * Stat count value
   */
  count?: React.ReactNode;
  /**
   * Label for the count
   */
  countLabel?: React.ReactNode;
  /**
   * Additional CSS classes for the card
   */
  className?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
}

export interface CarouselHorizontalCardsProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Subtitle/description text
   */
  subtitle?: React.ReactNode;
  /**
   * URL for the heading link
   */
  headingHref?: string;
  /**
   * Array of card items
   */
  items?: CardItem[];
  /**
   * Custom slot for rendering items (overrides items array)
   */
  itemsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the subtitle
   */
  subtitleClassName?: string;
  /**
   * Additional CSS classes for the carousel container
   */
  carouselClassName?: string;
  /**
   * Additional CSS classes for the navigation buttons
   */
  navigationClassName?: string;
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

export function CarouselHorizontalCards({
  heading,
  subtitle,
  headingHref = "#",
  items,
  itemsSlot,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  subtitleClassName,
  carouselClassName,
  navigationClassName,
  optixFlowConfig,
  background = "white",
  spacing = "xl",
  pattern,
  patternOpacity,
}: CarouselHorizontalCardsProps): React.JSX.Element {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = React.useState(true);
  const [isAtEnd, setIsAtEnd] = React.useState(false);

  const getCardWidth = React.useCallback(() => {
    // Match the responsive card widths from the component
    if (typeof window === "undefined") return 320;
    if (window.innerWidth >= 1024) return 400; // lg breakpoint
    if (window.innerWidth >= 640) return 360; // sm breakpoint
    return 320;
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft } = carouselRef.current;
      const cardWidth = getCardWidth();
      const gap = 16; // space-x-4 = 1rem = 16px
      const scrollAmount = cardWidth + gap;
      const newScrollLeft =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;

      carouselRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    }
  };

  React.useEffect(() => {
    const checkScrollPosition = () => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        setIsAtStart(scrollLeft < 10);
        setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
      }
    };

    const currentRef = carouselRef.current;
    if (currentRef) {
      checkScrollPosition();
      currentRef.addEventListener("scroll", checkScrollPosition);
    }

    window.addEventListener("resize", checkScrollPosition);

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", checkScrollPosition);
      }
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [items]);

  const renderItems = () => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return items.map((item, index) => (
      <motion.div
        key={item.id}
        className={cn(
          "group w-[320px] shrink-0 snap-start sm:w-[360px] lg:w-[400px]",
          item.className
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md">
          <Img
            alt={typeof item.title === "string" ? item.title : `Card ${index + 1}`}
            className={cn("aspect-video w-full object-cover transition-transform group-hover:scale-105", item.imageClassName)}
            src={item.imageSrc}
            optixFlowConfig={optixFlowConfig}
          />
          <div className="p-4">
            {item.title && (
              typeof item.title === "string" ? (
                <h3 className="text-md font-semibold leading-tight text-card-foreground">
                  {item.title}
                </h3>
              ) : (
                <div>{item.title}</div>
              )
            )}
            {(item.count !== undefined || item.countLabel) && (
              <div className="mt-4">
                {item.count !== undefined && (
                  <p className="text-xl font-bold">{item.count}</p>
                )}
                {item.countLabel && (
                  typeof item.countLabel === "string" ? (
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {item.countLabel}
                    </p>
                  ) : (
                    <div>{item.countLabel}</div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    ));
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
      aria-labelledby="carousel-title"
    >
      <div className={cn("container mx-auto px-4 md:px-6", containerClassName)}>
        {/* Header Section */}
        <div className={cn("mb-8 flex items-center justify-between gap-4", headerClassName)}>
          <div>
                        {heading && (
                          <a href={headingHref} className="group inline-flex items-center">
                            {typeof heading === "string" ? (
                              <h2
                                id="carousel-title"
                                className={cn("text-2xl font-bold tracking-tight text-card-foreground md:text-3xl", headingClassName)}
                              >
                                {heading}
                              </h2>
                            ) : (
                              <div className={headingClassName}>{heading}</div>
                            )}
                            <DynamicIcon
                              name="lucide/chevron-right"
                              size={24}
                              className="ml-2 flex-shrink-0 self-center transition-transform group-hover:translate-x-1"
                            />
                          </a>
                        )}
            {subtitle && (
              typeof subtitle === "string" ? (
                <p className={cn("mt-1 text-muted-foreground", subtitleClassName)}>{subtitle}</p>
              ) : (
                <div className={subtitleClassName}>{subtitle}</div>
              )
            )}
          </div>
        </div>

        {/* Carousel Section */}
        <div className="relative">
          <div
            ref={carouselRef}
            className={cn(
              "scrollbar-hide flex w-full space-x-4 overflow-x-auto pb-4",
              "snap-x snap-mandatory scroll-pl-0",
              carouselClassName
            )}
          >
            {renderItems()}
          </div>

          {/* Navigation Buttons */}
          {!isAtStart && (
            <Pressable
              onClick={() => scroll("left")}
              className={cn(
                "absolute left-4 top-1/2 z-10 -translate-y-1/2",
                "flex h-12 w-12 items-center justify-center",
                "rounded-full border border-border/50 bg-background shadow-lg",
                "text-foreground transition-all duration-200",
                "hover:bg-accent hover:shadow-xl hover:scale-105",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                navigationClassName
              )}
              aria-label="Scroll left"
              asButton
            >
              <DynamicIcon name="lucide/chevron-left" size={24} />
            </Pressable>
          )}
          {!isAtEnd && (
            <Pressable
              onClick={() => scroll("right")}
              className={cn(
                "absolute right-4 top-1/2 z-10 -translate-y-1/2",
                "flex h-12 w-12 items-center justify-center",
                "rounded-full border border-border/50 bg-background shadow-lg",
                "text-foreground transition-all duration-200",
                "hover:bg-accent hover:shadow-xl hover:scale-105",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                navigationClassName
              )}
              aria-label="Scroll right"
              asButton
            >
              <DynamicIcon name="lucide/chevron-right" size={24} />
            </Pressable>
          )}
        </div>
      </div>
    </Section>
  );
}

