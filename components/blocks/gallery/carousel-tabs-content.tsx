"use client";

import * as React from "react";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Lightbox, type LightboxItem } from "@page-speed/lightbox";
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
   * Main title content
   */
  title?: React.ReactNode;
  /**
   * Description text below title
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
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
  pattern?: PatternName | undefined;
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
  /** Optional Section ID */
  sectionId?: string;
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
  sectionId = "carousel-tabs-content",
  title,
  description,
  titleClassName,
  descriptionClassName,
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
  background,
  spacing,
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const currentIndex =
      items?.findIndex((item) => item.category === current) ?? -1;
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

    const currentIndex =
      items?.findIndex((item) => item.category === current) ?? -1;
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

  const lightboxItems: LightboxItem[] = useMemo(() => {
    if (!items || items.length === 0) return [];
    return items.map((item, idx) => ({
      id: `tabs-content-${idx}`,
      type: "image" as const,
      src: item.image,
      alt: item.imageAlt || "Content image",
      download: true,
      share: true,
    }));
  }, [items]);

  const handleImageClick = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const handleLightboxClose = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const tabsContent = useMemo(() => {
    if (tabsSlot) return tabsSlot;

    return (
      <div
        className={cn(
          "relative flex min-w-0 flex-1 overflow-x-auto scrollbar-hide",
          tabsClassName,
        )}
      >
        <div className="relative flex h-auto flex-nowrap gap-2 md:gap-4">
          {items?.map((item, idx) => (
            <button
              key={idx}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              onClick={() => setCurrent(item.category)}
              className={cn(
                "text-base transition-all duration-700 ease-out px-3 py-1.5 rounded-sm whitespace-nowrap flex-shrink-0",
                current === item.category
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
                tabClassName,
              )}
            >
              {item.category}
            </button>
          ))}
          <div
            className={cn(
              "absolute bottom-0 h-0.5 bg-primary transition-all duration-700 ease-out",
              indicatorClassName,
            )}
            style={{
              width: `${indicatorStyle.width}px`,
              left: `${indicatorStyle.left}px`,
            }}
          />
        </div>
      </div>
    );
  }, [
    tabsSlot,
    tabsClassName,
    items,
    current,
    tabClassName,
    indicatorClassName,
    indicatorStyle,
  ]);

  const itemsContent = useMemo(() => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return items.map((item, idx) => (
      <CarouselItem
        key={idx}
        className={cn("w-fit max-w-4xl", item.className, itemClassName)}
      >
        <div
          className={cn(
            "grid h-full max-w-4xl gap-6 bg-background rounded-xl border border-border p-4 md:p-6 shadow-sm select-none sm:p-10 md:max-h-[450px] md:grid-cols-2 md:gap-20",
            cardClassName,
          )}
        >
          <div className="flex flex-col justify-between gap-4">
            <div>
              <h3 className="text-xl font-medium md:text-4xl">{item.title}</h3>
              {item.description && (
                <div className="mt-2 text-sm text-muted-foreground md:mt-6">
                  {item.description}
                </div>
              )}
            </div>
            {!item.note ? null : typeof item.note === "string" &&
              item.note?.length > 0 ? (
              <p className="mt-0 text-xs text-muted-foreground md:mt-6">
                {item.note}
              </p>
            ) : (
              <div className="mt-0 text-xs text-muted-foreground md:mt-6">
                {item.note}
              </div>
            )}
          </div>
          <div
            className="rounded-xl border border-border p-2 cursor-pointer"
            onClick={() => handleImageClick(idx)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleImageClick(idx);
              }
            }}
          >
            <Img
              src={item.image}
              alt={item.imageAlt || "Content image"}
              className={cn(
                "h-full w-full rounded-xl object-cover",
                imageClassName,
              )}
              loading="lazy"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </div>
      </CarouselItem>
    ));
  }, [
    itemsSlot,
    items,
    itemClassName,
    cardClassName,
    imageClassName,
    optixFlowConfig,
    handleImageClick,
  ]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={cn("overflow-hidden", className)}
      containerClassName="px-4"
    >
      {title || description ? (
        <div className="flex flex-col gap-4 mb-10 md:mb-16">
          {title &&
            (typeof title === "string" ? (
              <h2
                className={cn(
                  "text-xl font-medium tracking-tight md:text-2xl lg:text-3xl text-balance",
                  titleClassName,
                )}
              >
                {title}
              </h2>
            ) : (
              <div className={titleClassName}>{title}</div>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p className={cn("max-w-lg text-balance", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div
                className={cn("max-w-lg text-balance", descriptionClassName)}
              >
                {description}
              </div>
            ))}
        </div>
      ) : null}

      <Carousel
        setApi={setApi}
        className={cn(
          "[&>div[data-slot=carousel-content]]:overflow-visible",
          carouselClassName,
        )}
      >
        <div className="flex mb-8 items-center justify-between">
          {tabsContent}
          <div
            className={cn(
              "hidden items-center gap-4 sm:flex",
              controlsClassName,
            )}
          >
            <CarouselPrevious className="static size-10 translate-x-0 translate-y-0" />
            <CarouselNext className="static size-10 translate-x-0 translate-y-0" />
          </div>
        </div>
        <CarouselContent className={cn("max-w-4xl", carouselContentClassName)}>
          {itemsContent}
        </CarouselContent>
      </Carousel>
      {lightboxOpen && (
        <Lightbox
          items={lightboxItems}
          initialIndex={lightboxIndex}
          layout="horizontal"
          controls={{
            navigation: true,
            thumbnails: true,
            download: true,
            share: true,
            fullscreen: true,
            captions: true,
            counter: true,
          }}
          onClose={handleLightboxClose}
          enableKeyboardShortcuts={true}
          closeOnEscape={true}
          closeOnBackdropClick={true}
        />
      )}
    </Section>
  );
}
