"use client";

import * as React from "react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Lightbox, type LightboxItem } from "@page-speed/lightbox";
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
 * Item configuration for service hover carousel.
 */
export interface ServiceHoverCarouselItem {
  /**
   * Unique identifier for the item
   */
  id: string;
  /**
   * Title of the service
   */
  title: React.ReactNode;
  /**
   * Price display text
   */
  price: React.ReactNode;
  /**
   * Primary image source URL
   */
  image: string;
  /**
   * Alt text for the primary image
   */
  imageAlt?: string;
  /**
   * Hover image source URL
   */
  hoverImage: string;
  /**
   * Alt text for the hover image
   */
  hoverImageAlt?: string;
  /**
   * Tag/badge text
   */
  tag: React.ReactNode;
  /**
   * Link URL for the item
   */
  href?: string;
  /**
   * Additional CSS classes for the item
   */
  className?: string;
}

export interface ServiceHoverCarouselProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Array of service items to display
   */
  items?: ServiceHoverCarouselItem[];
  /**
   * Custom slot for rendering items (overrides items array)
   */
  itemsSlot?: React.ReactNode;
  /**
   * Custom slot for rendering the header
   */
  headerSlot?: React.ReactNode;
  /**
   * Text displayed before the price
   */
  pricePrefix?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
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
}

/**
 * ServiceHoverCarousel displays service cards with hover image swap effect.
 *
 * Features a header with title and navigation buttons, followed by a carousel
 * of portrait cards. Each card shows a primary image that swaps to a secondary
 * image on hover, with a badge tag overlay and title/price below. Includes a
 * progress bar indicator at the bottom. Ideal for showcasing services, products,
 * or portfolio items with before/after or alternate view imagery.
 *
 * @example
 * ```tsx
 * <ServiceHoverCarousel
 *   heading="Our Services"
 *   items={[
 *     {
 *       id: "1",
 *       title: "Web Development",
 *       price: "$1,500",
 *       image: "/images/service-1.jpg",
 *       hoverImage: "/images/service-1-hover.jpg",
 *       tag: "Custom Solutions"
 *     }
 *   ]}
 * />
 * ```
 */
export function ServiceHoverCarousel({
  heading,
  items,
  itemsSlot,
  headerSlot,
  pricePrefix,
  className,
  headingClassName,
  controlsClassName,
  carouselClassName,
  carouselContentClassName,
  itemClassName,
  imageClassName,
  badgeClassName,
  progressClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
  optixFlowConfig,
}: ServiceHoverCarouselProps): React.JSX.Element {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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

  const lightboxItems: LightboxItem[] = useMemo(() => {
    if (!items) return [];
    return items.flatMap((item) => [
      {
        id: `image-${item.id}`,
        type: "image" as const,
        src: item.image,
        alt:
          typeof item.title === "string"
            ? item.title
            : item.imageAlt || "Service image",
        download: true,
        share: true,
      },
      {
        id: `hover-${item.id}`,
        type: "image" as const,
        src: item.hoverImage,
        alt:
          typeof item.title === "string"
            ? item.title
            : item.hoverImageAlt || "Service hover image",
        download: true,
        share: true,
      },
    ]);
  }, [items]);

  const handleImageClick = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const handleLightboxClose = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const headerContent = useMemo(() => {
    if (headerSlot) return headerSlot;

    return (
      <div className="px-4 lg:px-10">
        <div className="mb-6 flex flex-col justify-between md:flex-row md:items-end">
          <div>
            <h2
              className={cn(
                "text-3xl font-semibold md:text-4xl",
                headingClassName,
              )}
            >
              {heading}
            </h2>
          </div>
          <div
            className={cn(
              "mt-8 flex shrink-0 items-center justify-start gap-2",
              controlsClassName,
            )}
          >
            <Pressable
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="rounded-full"
              asButton
            >
              <DynamicIcon name="lucide/arrow-left" size={20} />
            </Pressable>
            <Pressable
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="rounded-full"
              asButton
            >
              <DynamicIcon name="lucide/arrow-right" size={20} />
            </Pressable>
          </div>
        </div>
      </div>
    );
  }, [headerSlot, heading, headingClassName, controlsClassName, carouselApi, canScrollPrev, canScrollNext]);

  const itemsContent = useMemo(() => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return items.map((product, productIndex) => (
      <CarouselItem
        key={product.id}
        className={cn("min-w-[334px] flex-1", itemClassName, product.className)}
      >
        <a
          href={product.href || `/services/${product.id}`}
          className="group relative flex h-full flex-col items-start justify-start gap-2"
        >
          <div className="w-full">
            <div
              className="group relative z-10 overflow-hidden rounded-2xl cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                handleImageClick(productIndex * 2);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleImageClick(productIndex * 2);
                }
              }}
            >
              <Img
                src={product.image}
                alt={
                  typeof product.title === "string"
                    ? product.title
                    : product.imageAlt || "Service image"
                }
                className={cn(
                  "h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0",
                  imageClassName,
                )}
                style={{ aspectRatio: "3/4" }}
                loading="lazy"
                optixFlowConfig={optixFlowConfig}
              />
              <Img
                src={product.hoverImage}
                alt={
                  typeof product.title === "string"
                    ? product.title
                    : product.hoverImageAlt || "Service hover image"
                }
                className={cn(
                  "absolute top-0 left-0 z-10 h-full w-full rounded-2xl object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                  imageClassName,
                )}
                style={{ aspectRatio: "3/4" }}
                loading="lazy"
                optixFlowConfig={optixFlowConfig}
              />

              <Badge
                className={cn(
                  "absolute top-4 left-4 bg-background px-4 py-2",
                  badgeClassName,
                )}
                variant="outline"
              >
                {product.tag}
              </Badge>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h3>{product.title}</h3>
            {pricePrefix && (
              <span>
                {pricePrefix} <span>{product.price}</span>
              </span>
            )}
            {!pricePrefix && <span>{product.price}</span>}
          </div>
        </a>
      </CarouselItem>
    ));
  }, [
    itemsSlot,
    items,
    itemClassName,
    imageClassName,
    badgeClassName,
    pricePrefix,
    optixFlowConfig,
    handleImageClick,
  ]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
    >
      {headerContent}

      <div className="relative w-full overflow-hidden">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: "start",
          }}
          className={carouselClassName}
        >
          <CarouselContent
            className={cn("px-4 pb-10 lg:px-10", carouselContentClassName)}
          >
            {itemsContent}
          </CarouselContent>
        </Carousel>

        <div
          className={cn(
            "absolute bottom-0 left-1/2 h-0.5 w-60 -translate-x-1/2 rounded bg-gray-200",
            progressClassName,
          )}
        >
          <div
            className="h-0.5 rounded bg-black transition-transform duration-300 ease-out"
            style={{
              width: `${progressIndicatorWidth}px`,
              transform: `translateX(${progressOffset}px)`,
            }}
          />
        </div>
      </div>

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
