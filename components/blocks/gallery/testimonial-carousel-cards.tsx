"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import type { CarouselApi } from "../../ui/carousel";
import { Carousel, CarouselContent, CarouselItem } from "../../ui/carousel";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";

/**
 * Item configuration for testimonial carousel cards.
 */
export interface TestimonialCarouselItem {
  /**
   * Unique identifier for the item
   */
  id: string;
  /**
   * Username/handle to display
   */
  username: React.ReactNode;
  /**
   * Quote/testimonial text
   */
  quote: React.ReactNode;
  /**
   * Author name
   */
  author: React.ReactNode;
  /**
   * Image source URL
   */
  image: string;
  /**
   * Alt text for the image
   */
  imageAlt?: string;
  /**
   * Background color class for the quote panel
   */
  bgColor: string;
  /**
   * Additional CSS classes for the item
   */
  className?: string;
}

export interface TestimonialCarouselCardsProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text
   */
  description?: React.ReactNode;
  /**
   * Array of testimonial items to display
   */
  items?: TestimonialCarouselItem[];
  /**
   * Custom slot for rendering items (overrides items array)
   */
  itemsSlot?: React.ReactNode;
  /**
   * Custom slot for rendering the sidebar
   */
  sidebarSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the sidebar
   */
  sidebarClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the controls container
   */
  controlsClassName?: string;
  /**
   * Additional CSS classes for the carousel wrapper
   */
  carouselClassName?: string;
  /**
   * Additional CSS classes for the carousel content
   */
  carouselContentClassName?: string;
  /**
   * Additional CSS classes for each carousel item
   */
  itemClassName?: string;
  /**
   * Additional CSS classes for each image
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for each quote panel
   */
  quotePanelClassName?: string;
  /**
   * Additional CSS classes for each badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the progress bar
   */
  progressClassName?: string;
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
  pattern?: PatternName | string;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * TestimonialCarouselCards displays testimonials in a two-panel carousel format.
 *
 * Features a left sidebar with heading, description, and navigation buttons,
 * alongside a carousel of testimonial cards. Each card shows an image paired
 * with a colored quote panel containing username badge, quote, and author name.
 * Includes a progress bar indicator at the bottom. Ideal for showcasing client
 * testimonials, reviews, or success stories with visual impact.
 *
 * @example
 * ```tsx
 * <TestimonialCarouselCards
 *   heading="Building the Future, One Line of Code at a Time"
 *   description="From startups to enterprises, we empower businesses with cutting-edge solutions."
 *   items={[
 *     {
 *       id: "1",
 *       username: "@happyclient",
 *       quote: "Amazing service and results!",
 *       author: "John Doe",
 *       image: "/images/client-1.jpg",
 *       bgColor: "bg-blue-300"
 *     }
 *   ]}
 * />
 * ```
 */
export function TestimonialCarouselCards({
  heading,
  description,
  items,
  itemsSlot,
  sidebarSlot,
  className,
  sidebarClassName,
  headingClassName,
  descriptionClassName,
  controlsClassName,
  carouselClassName,
  carouselContentClassName,
  itemClassName,
  imageClassName,
  quotePanelClassName,
  badgeClassName,
  progressClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  optixFlowConfig,
}: TestimonialCarouselCardsProps): React.JSX.Element {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentIndex(carouselApi.selectedScrollSnap());
    };

    updateSelection();
    carouselApi.on("select", updateSelection);

    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  const progressWidth = 240;
  const itemsLength = items?.length ?? 1;
  const progressIndicatorWidth = progressWidth / itemsLength;
  const progressOffset = currentIndex * progressIndicatorWidth;

  const renderSidebar = () => {
    if (sidebarSlot) return sidebarSlot;

    return (
      <div className={cn("flex flex-col justify-between lg:h-[460px] lg:w-[445px] lg:pr-10", sidebarClassName)}>
        <div className="flex flex-col gap-4">
          <h2 className={cn("text-3xl font-semibold lg:text-4xl", headingClassName)}>{heading}</h2>
          <p className={cn("text-lg text-muted-foreground", descriptionClassName)}>{description}</p>
        </div>

        <div className={cn("hidden justify-start gap-4 lg:flex", controlsClassName)}>
          <Pressable
            size="icon"
            className="rounded-full"
            variant="outline"
            onClick={() => carouselApi?.scrollPrev()}
            disabled={!canScrollPrev}
            asButton
          >
            <DynamicIcon name="lucide/arrow-left" size={16} />
          </Pressable>
          <Pressable
            size="icon"
            variant="outline"
            className="rounded-full"
            onClick={() => carouselApi?.scrollNext()}
            disabled={!canScrollNext}
            asButton
          >
            <DynamicIcon name="lucide/arrow-right" size={16} />
          </Pressable>
        </div>
      </div>
    );
  };

  const renderItems = () => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return items.map((testimonial) => (
      <CarouselItem
        key={testimonial.id}
        className={cn("min-w-[800px] flex-1", itemClassName, testimonial.className)}
      >
        <div className="flex gap-2">
          <div className="h-[460px] w-[400px]">
            <Img
              src={testimonial.image}
              alt={typeof testimonial.username === "string" ? testimonial.username : (testimonial.imageAlt || "Testimonial image")}
              className={cn("aspect-square h-full w-full rounded-2xl object-cover", imageClassName)}
              loading="lazy"
              optixFlowConfig={optixFlowConfig}
            />
          </div>

          <div
            className={cn(
              "relative flex h-[460px] w-[400px] flex-col items-start justify-end rounded-2xl p-8",
              testimonial.bgColor,
              quotePanelClassName
            )}
          >
            <Badge className={cn("mb-auto bg-background px-4 py-2 text-black", badgeClassName)}>
              {testimonial.username}
            </Badge>
            <span className="-rotate-[4deg] text-7xl leading-none">
              &quot;
            </span>
            <p className="text-xl font-semibold">
              {testimonial.quote}
            </p>
            <p className="mt-4 text-lg font-medium">
              {testimonial.author}
            </p>
          </div>
        </div>
      </CarouselItem>
    ));
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
    >
      <div className="flex flex-col items-start justify-between gap-6 px-4 lg:flex-row lg:px-10">
        {renderSidebar()}

        <div className="relative w-full overflow-hidden pb-12 lg:flex-1">
          <Carousel
            setApi={setCarouselApi}
            opts={{
              align: "start",
              dragFree: true,
            }}
            className={carouselClassName}
          >
            <CarouselContent className={carouselContentClassName}>
              {renderItems()}
            </CarouselContent>
          </Carousel>

          <div className={cn("absolute bottom-4 left-1/2 h-0.5 w-60 -translate-x-1/2 rounded bg-gray-200", progressClassName)}>
            <div
              className="h-0.5 rounded bg-primary transition-transform duration-300 ease-out"
              style={{
                width: `${progressIndicatorWidth}px`,
                transform: `translateX(${progressOffset}px)`,
              }}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
