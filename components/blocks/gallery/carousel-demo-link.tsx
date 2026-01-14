"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import type { CarouselApi } from "../../ui/carousel";
import { Carousel, CarouselContent, CarouselItem } from "../../ui/carousel";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
  ActionConfig,
} from "../../../src/types";

/**
 * Item configuration for carousel demo link cards.
 */
export interface CarouselDemoLinkItem {
  /**
   * Unique identifier for the item
   */
  id: string;
  /**
   * Title of the card
   */
  title: React.ReactNode;
  /**
   * Summary/description text
   */
  summary: React.ReactNode;
  /**
   * Link URL for the card
   */
  url: string;
  /**
   * Image source URL
   */
  image: string;
  /**
   * Alt text for the image
   */
  imageAlt?: string;
  /**
   * Additional CSS classes for the card
   */
  className?: string;
}

export interface CarouselDemoLinkProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Demo action configuration
   */
  demoAction?: ActionConfig;
  /**
   * Custom slot for rendering the demo action (overrides demoAction prop)
   */
  demoActionSlot?: React.ReactNode;
  /**
   * Array of card items to display
   */
  items?: CarouselDemoLinkItem[];
  /**
   * Custom slot for rendering items (overrides items array)
   */
  itemsSlot?: React.ReactNode;
  /**
   * Text for the "Read more" link
   * @default "Read more"
   */
  readMoreText?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the header container
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the demo link
   */
  demoLinkClassName?: string;
  /**
   * Additional CSS classes for the navigation controls
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
   * Additional CSS classes for each card
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for each image
   */
  imageClassName?: string;
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
 * CarouselDemoLink displays feature cards with a prominent demo link in the header.
 *
 * Features a heading with an external demo link (with arrow icon), navigation
 * buttons, and a carousel of cards. Each card shows an image with hover zoom,
 * title, summary, and "Read more" link. Ideal for showcasing products, features,
 * or services with a call-to-action to book a demo or learn more.
 *
 * @example
 * ```tsx
 * <CarouselDemoLink
 *   heading="Our Solutions"
 *   demoAction={{ label: "Book a demo", href: "https://calendly.com/demo" }}
 *   items={[
 *     {
 *       id: "1",
 *       title: "AI Analytics",
 *       summary: "Transform your data into actionable insights",
 *       url: "/solutions/analytics",
 *       image: "/images/analytics.jpg"
 *     }
 *   ]}
 * />
 * ```
 */
export function CarouselDemoLink({
  heading = "Gallery",
  demoAction,
  demoActionSlot,
  items,
  itemsSlot,
  readMoreText = "Read more",
  className,
  headerClassName,
  headingClassName,
  demoLinkClassName,
  controlsClassName,
  carouselClassName,
  carouselContentClassName,
  itemClassName,
  cardClassName,
  imageClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  optixFlowConfig,
}: CarouselDemoLinkProps): React.JSX.Element {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  const renderDemoAction = () => {
    if (demoActionSlot) return demoActionSlot;
    if (!demoAction) return null;

    const { label, icon, iconAfter, children, className: actionClass, ...pressableProps } = demoAction;
    return (
      <Pressable
        className={cn("group flex items-center gap-1 text-sm font-medium md:text-base lg:text-lg", actionClass, demoLinkClassName)}
        {...pressableProps}
      >
        {children ?? (
          <>
            {icon}
            {label}
            {iconAfter ?? (
              <DynamicIcon
                name="lucide/arrow-up-right"
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            )}
          </>
        )}
      </Pressable>
    );
  };

  const renderItems = () => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return items.map((item) => (
      <CarouselItem key={item.id} className={cn("ml-8 md:max-w-[452px]", itemClassName)}>
        <a
          href={item.url}
          className={cn("group flex flex-col justify-between", item.className, cardClassName)}
        >
          <div>
            <div className="flex aspect-3/2 overflow-clip rounded-xl">
              <div className="flex-1">
                <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                  <Img
                    src={item.image}
                    alt={typeof item.title === "string" ? item.title : (item.imageAlt || "Card image")}
                    className={cn("h-full w-full object-cover object-center", imageClassName)}
                    loading="lazy"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-2 line-clamp-3 pt-4 text-lg font-medium wrap-break-word md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
            {item.title}
          </div>
          <div className="mb-8 line-clamp-2 text-sm text-muted-foreground md:mb-12 md:text-base lg:mb-9">
            {item.summary}
          </div>
          <div className="flex items-center text-sm">
            {readMoreText}{" "}
            <DynamicIcon
              name="lucide/arrow-right"
              size={20}
              className="ml-2 transition-transform group-hover:translate-x-1"
            />
          </div>
        </a>
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
      <div className={cn("mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16", headerClassName)}>
        <div>
          {heading && (
            typeof heading === "string" ? (
              <h2 className={cn("mb-3 text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6", headingClassName)}>
                {heading}
              </h2>
            ) : (
              <div className={cn("mb-3 md:mb-4 lg:mb-6", headingClassName)}>{heading}</div>
            )
          )}
          {renderDemoAction()}
        </div>
        <div className={cn("mt-8 flex shrink-0 items-center justify-start gap-2", controlsClassName)}>
          <Pressable
            size="icon"
            variant="outline"
            onClick={() => {
              carouselApi?.scrollPrev();
            }}
            disabled={!canScrollPrev}
            className="disabled:pointer-events-auto"
          >
            <DynamicIcon name="lucide/arrow-left" size={20} />
          </Pressable>
          <Pressable
            size="icon"
            variant="outline"
            onClick={() => {
              carouselApi?.scrollNext();
            }}
            disabled={!canScrollNext}
            className="disabled:pointer-events-auto"
          >
            <DynamicIcon name="lucide/arrow-right" size={20} />
          </Pressable>
        </div>
      </div>
      <div className="w-full max-w-full -mx-4 sm:-mx-6 lg:-mx-8">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
          className={cn("relative w-full max-w-full md:-left-4", carouselClassName)}
        >
          <CarouselContent className={cn("hide-scrollbar w-full max-w-full md:-mr-4 md:ml-8 2xl:mr-[max(0rem,calc(50vw-700px-1rem))] 2xl:ml-[max(8rem,calc(50vw-700px+1rem))]", carouselContentClassName)}>
            {renderItems()}
          </CarouselContent>
        </Carousel>
      </div>
    </Section>
  );
}
