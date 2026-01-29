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
import { DynamicIcon } from "../../ui/dynamic-icon";
import { CarouselPagination } from "../../ui/carousel-pagination";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
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
   * Array of action configurations for buttons/links on the card
   */
  actions?: ActionConfig[];
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

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
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
        <div
          className={cn(
            "mb-8 flex items-center justify-between gap-4",
            headerClassName,
          )}
        >
          <div>
            {heading && (
              <a href={headingHref} className="group inline-flex items-center">
                {typeof heading === "string" ? (
                  <h2
                    id="carousel-title"
                    className={cn(
                      "text-2xl font-bold tracking-tight md:text-3xl",
                      headingClassName,
                    )}
                  >
                    {heading}
                  </h2>
                ) : (
                  <div className={headingClassName}>{heading}</div>
                )}
                <DynamicIcon
                  name="lucide/chevron-right"
                  size={24}
                  className="ml-2 shrink-0 self-center transition-transform group-hover:translate-x-1"
                />
              </a>
            )}
            {subtitle &&
              (typeof subtitle === "string" ? (
                <p
                  className={cn(
                    "mt-1 text-muted-foreground",
                    subtitleClassName,
                  )}
                >
                  {subtitle}
                </p>
              ) : (
                <div className={subtitleClassName}>{subtitle}</div>
              ))}
          </div>
        </div>

        {/* Carousel Section */}
        <div className="relative w-full">
          <div
            className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-4 [scrollbar-width:none] md:py-6"
            ref={carouselRef}
          >
            <div
              className={cn(
                "flex flex-row justify-start gap-2",
                carouselClassName,
              )}
            >
              {items?.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={cn("rounded-lg last:pr-[5%] md:last:pr-[33%]")}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                  }}
                >
                  <div
                    className={cn(
                      "group w-56 shrink-0 md:w-96",
                      item.className,
                    )}
                  >
                    <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md">
                      <Img
                        alt={
                          typeof item.title === "string"
                            ? item.title
                            : `Card ${index + 1}`
                        }
                        className={cn(
                          "aspect-video w-full object-cover transition-transform group-hover:scale-105",
                          item.imageClassName,
                        )}
                        src={item.imageSrc}
                        optixFlowConfig={optixFlowConfig}
                      />
                      <div className="p-4">
                        {item.title &&
                          (typeof item.title === "string" ? (
                            <h3 className="text-md font-semibold leading-tight text-card-foreground">
                              {item.title}
                            </h3>
                          ) : (
                            <div>{item.title}</div>
                          ))}
                        {(item.count !== undefined || item.countLabel) && (
                          <div className="mt-4">
                            {item.count !== undefined && (
                              <p className="text-xl font-bold">{item.count}</p>
                            )}
                            {item.countLabel &&
                              (typeof item.countLabel === "string" ? (
                                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                  {item.countLabel}
                                </p>
                              ) : (
                                <div>{item.countLabel}</div>
                              ))}
                          </div>
                        )}
                        {/* Actions */}
                        {item.actions && item.actions.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.actions.map((action, actionIndex) => {
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
                                  asButton={asButton}
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
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {itemsSlot}
            </div>
          </div>
          {/* Navigation Buttons */}
          <CarouselPagination
            onPrevious={scrollLeft}
            onNext={scrollRight}
            canScrollPrevious={!isAtStart}
            canScrollNext={!isAtEnd}
            className={cn("mr-0", navigationClassName)}
          />
        </div>
      </div>
    </Section>
  );
}
