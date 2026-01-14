"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import type { CarouselApi } from "../../ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";

/**
 * Item configuration for carousel tabs content.
 */
export interface CarouselTabsContentItem {
  /**
   * Title content (supports ReactNode for gradient text effects)
   */
  title: React.ReactNode;
  /**
   * Description content (supports ReactNode for lists, paragraphs)
   */
  description: React.ReactNode;
  /**
   * Note text displayed at the bottom
   */
  note: React.ReactNode;
  /**
   * Image source URL
   */
  image: string;
  /**
   * Alt text for the image
   */
  imageAlt?: string;
  /**
   * Category label used for tab navigation
   */
  category: string;
  /**
   * Additional CSS classes for the item
   */
  className?: string;
}

export interface CarouselTabsContentProps {
  /**
   * Array of content items to display
   */
  items?: CarouselTabsContentItem[];
  /**
   * Custom slot for rendering items (overrides items array)
   */
  itemsSlot?: React.ReactNode;
  /**
   * Custom slot for rendering the tabs
   */
  tabsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the tabs container
   */
  tabsClassName?: string;
  /**
   * Additional CSS classes for each tab button
   */
  tabClassName?: string;
  /**
   * Additional CSS classes for the tab indicator
   */
  indicatorClassName?: string;
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
 * CarouselTabsContent displays content cards with animated tab navigation.
 *
 * Features a tab bar with animated underline indicator that syncs with the
 * carousel position. Each slide shows a two-column layout with rich content
 * (title with gradient text, description with lists, and note) alongside an
 * image. Navigation arrows are positioned next to the tabs. Ideal for showcasing
 * product features, solutions, or roadmap items with detailed descriptions.
 *
 * @example
 * ```tsx
 * <CarouselTabsContent
 *   items={[
 *     {
 *       title: <>Core <br />Features</>,
 *       description: <>Detailed feature description...</>,
 *       note: "Additional context",
 *       image: "/images/features.jpg",
 *       category: "Features"
 *     }
 *   ]}
 * />
 * ```
 */
export function CarouselTabsContent({
  items,
  itemsSlot,
  tabsSlot,
  className,
  tabsClassName,
  tabClassName,
  indicatorClassName,
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
}: CarouselTabsContentProps): React.JSX.Element {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(items?.[0]?.category || "");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    left: 0,
  });

  useEffect(() => {
    const currentIndex = items?.findIndex((item) => item.category === current) ?? -1;
    const activeTab = tabRefs.current[currentIndex];

    if (activeTab) {
      const { offsetWidth, offsetLeft } = activeTab;
      setIndicatorStyle({
        width: offsetWidth,
        left: offsetLeft,
      });
    }
  }, [current, items]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const currentIndex = items?.findIndex((item) => item.category === current) ?? -1;
    api.scrollTo(currentIndex);

    const onSelect = () => {
      const idx = api.selectedScrollSnap();
      setCurrent(items?.[idx]?.category ?? "");
    };
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, current, items]);

  const renderTabs = () => {
    if (tabsSlot) return tabsSlot;

    return (
      <div className={cn("relative mb-8 flex justify-center", tabsClassName)}>
        <div className="relative flex h-auto gap-6 bg-background">
          {items?.map((item, idx) => (
            <button
              key={idx}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              onClick={() => setCurrent(item.category)}
              className={cn(
                "text-base transition-all duration-700 ease-out px-3 py-1.5 rounded-sm",
                current === item.category
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
                tabClassName
              )}
            >
              {item.category}
            </button>
          ))}
          <div
            className={cn("absolute bottom-0 h-0.5 bg-primary transition-all duration-700 ease-out", indicatorClassName)}
            style={{
              width: `${indicatorStyle.width}px`,
              left: `${indicatorStyle.left}px`,
            }}
          />
        </div>
      </div>
    );
  };

  const renderItems = () => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return items.map((item, idx) => (
      <CarouselItem key={idx} className={cn("w-fit max-w-4xl", item.className, itemClassName)}>
        <div className={cn("grid h-full max-w-4xl gap-10 rounded-xl border border-border p-6 shadow-sm select-none sm:p-10 md:max-h-[450px] md:grid-cols-2 lg:gap-20", cardClassName)}>
          <div className="flex flex-col justify-between gap-4">
            <div>
              <h2 className="text-2xl font-medium sm:text-4xl">
                {item.title}
              </h2>
              <div className="mt-4 text-sm text-muted-foreground sm:mt-6">
                {item.description}
              </div>
            </div>
            {typeof item.note === "string" ? (
              <p className="mt-4 text-xs text-muted-foreground sm:mt-6">
                {item.note}
              </p>
            ) : (
              <div className="mt-4 text-xs text-muted-foreground sm:mt-6">
                {item.note}
              </div>
            )}
          </div>
          <div className="rounded-xl border border-border p-2">
            <Img
              src={item.image}
              alt={item.imageAlt || "Content image"}
              className={cn("h-full w-full rounded-xl object-cover", imageClassName)}
              loading="lazy"
              optixFlowConfig={optixFlowConfig}
            />
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
      className={cn("overflow-hidden", className)}
    >
      <Carousel
        setApi={setApi}
        className={cn("[&>div[data-slot=carousel-content]]:overflow-visible", carouselClassName)}
      >
        <div className="flex items-center justify-between">
          {renderTabs()}
          <div className={cn("hidden items-center gap-4 sm:flex", controlsClassName)}>
            <CarouselPrevious className="static size-10 translate-x-0 translate-y-0" />
            <CarouselNext className="static size-10 translate-x-0 translate-y-0" />
          </div>
        </div>
        <CarouselContent className={cn("max-w-4xl", carouselContentClassName)}>
          {renderItems()}
        </CarouselContent>
      </Carousel>
    </Section>
  );
}
