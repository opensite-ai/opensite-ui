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
import type { OptixFlowConfig } from "../../../src/types";

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
}

const defaultItems: CardItem[] = [
  { id: 1, imageSrc: imagePlaceholders[0], title: "Featured Item 1", count: 42, countLabel: "Projects" },
  { id: 2, imageSrc: imagePlaceholders[1], title: "Featured Item 2", count: 38, countLabel: "Projects" },
  { id: 3, imageSrc: imagePlaceholders[2], title: "Featured Item 3", count: 56, countLabel: "Projects" },
  { id: 4, imageSrc: imagePlaceholders[3], title: "Featured Item 4", count: 24, countLabel: "Projects" },
  { id: 5, imageSrc: imagePlaceholders[4], title: "Featured Item 5", count: 67, countLabel: "Projects" },
  { id: 6, imageSrc: imagePlaceholders[5], title: "Featured Item 6", count: 31, countLabel: "Projects" },
];

export function CarouselHorizontalCards({
  heading = "Featured Content",
  subtitle = "Discover our latest highlights",
  headingHref = "#",
  items = defaultItems,
  itemsSlot,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  subtitleClassName,
  carouselClassName,
  navigationClassName,
  optixFlowConfig,
}: CarouselHorizontalCardsProps): React.JSX.Element {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = React.useState(true);
  const [isAtEnd, setIsAtEnd] = React.useState(false);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.8;
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
        className={cn("group w-[280px] shrink-0", item.className)}
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
    <section
      className={cn("w-full py-8", className)}
      aria-labelledby="carousel-title"
    >
      <div className={cn("container mx-auto px-4 md:px-6", containerClassName)}>
        {/* Header Section */}
        <div className={cn("mb-6 flex items-center justify-between", headerClassName)}>
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
                  className="ml-2 transition-transform group-hover:translate-x-1"
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
            className={cn("scrollbar-hide flex w-full space-x-4 overflow-x-auto pb-4", carouselClassName)}
          >
            {renderItems()}
          </div>

          {/* Navigation Buttons */}
          {!isAtStart && (
            <Pressable
              onClick={() => scroll("left")}
              className={cn("absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border bg-background/60 p-2 text-foreground shadow-md backdrop-blur-sm transition-opacity hover:bg-background/80", navigationClassName)}
              aria-label="Scroll left"
              asButton
            >
              <DynamicIcon name="lucide/chevron-left" size={24} />
            </Pressable>
          )}
          {!isAtEnd && (
            <Pressable
              onClick={() => scroll("right")}
              className={cn("absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border bg-background/60 p-2 text-foreground shadow-md backdrop-blur-sm transition-opacity hover:bg-background/80", navigationClassName)}
              aria-label="Scroll right"
              asButton
            >
              <DynamicIcon name="lucide/chevron-right" size={24} />
            </Pressable>
          )}
        </div>
      </div>
    </section>
  );
}

