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

export interface CardItem {
  id: string | number;
  imageSrc: string;
  title: string;
  count: number;
  countLabel: string;
}

export interface CarouselHorizontalCardsProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
  title?: string;
  subtitle?: string;
  items?: CardItem[];
  titleHref?: string;
}

export function CarouselHorizontalCards({
  className,
  optixFlowConfig,
  title = "Featured Content",
  subtitle = "Discover our latest highlights",
  items,
  titleHref = "#",
}: CarouselHorizontalCardsProps): React.JSX.Element {
  const defaultItems: CardItem[] = React.useMemo(
    () =>
      Array.from({ length: 6 }).map((_, index) => ({
        id: index,
        imageSrc: imagePlaceholders[index % imagePlaceholders.length],
        title: `Featured Item ${index + 1}`,
        count: Math.floor(Math.random() * 100) + 10,
        countLabel: "Projects",
      })),
    []
  );

  const cardItems = items || defaultItems;
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
  }, [cardItems]);

  return (
    <section
      className={cn("w-full py-8", className)}
      aria-labelledby="carousel-title"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <a href={titleHref} className="group inline-flex items-center">
              <h2
                id="carousel-title"
                className="text-2xl font-bold tracking-tight text-card-foreground md:text-3xl"
              >
                {title}
              </h2>
              <DynamicIcon
                name="lucide/chevron-right"
                size={24}
                className="ml-2 transition-transform group-hover:translate-x-1"
              />
            </a>
            <p className="mt-1 text-muted-foreground">{subtitle}</p>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="relative">
          <div
            ref={carouselRef}
            className="scrollbar-hide flex w-full space-x-4 overflow-x-auto pb-4"
          >
            {cardItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="group w-[280px] shrink-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md">
                  <Img
                    alt={item.title}
                    className="aspect-video w-full object-cover transition-transform group-hover:scale-105"
                    src={item.imageSrc}
                    optixFlowConfig={optixFlowConfig}
                  />
                  <div className="p-4">
                    <h3 className="text-md font-semibold leading-tight text-card-foreground">
                      {item.title}
                    </h3>
                    <div className="mt-4">
                      <p className="text-xl font-bold">{item.count}</p>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {item.countLabel}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons */}
          {!isAtStart && (
            <Pressable
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border bg-background/60 p-2 text-foreground shadow-md backdrop-blur-sm transition-opacity hover:bg-background/80"
              aria-label="Scroll left"
              asButton
            >
              <DynamicIcon name="lucide/chevron-left" size={24} />
            </Pressable>
          )}
          {!isAtEnd && (
            <Pressable
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border bg-background/60 p-2 text-foreground shadow-md backdrop-blur-sm transition-opacity hover:bg-background/80"
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

