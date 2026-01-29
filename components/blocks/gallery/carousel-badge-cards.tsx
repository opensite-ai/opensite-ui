"use client";

import * as React from "react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import type { CarouselApi } from "../../ui/carousel";
import { Carousel, CarouselContent, CarouselItem } from "../../ui/carousel";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import { Lightbox, type LightboxItem } from "@page-speed/lightbox";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";

/**
 * Item configuration for carousel badge cards.
 */
export interface CarouselBadgeCardItem {
  /**
   * Unique identifier for the item
   */
  id: string;
  /**
   * Title of the card
   */
  title: React.ReactNode;
  /**
   * Description text
   */
  description: React.ReactNode;
  /**
   * Badge label text
   */
  label: React.ReactNode;
  /**
   * Link URL for the card
   */
  href: string;
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

export interface CarouselBadgeCardsProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Array of card items to display
   */
  items?: CarouselBadgeCardItem[];
  /**
   * Custom slot for rendering items (overrides items array)
   */
  itemsSlot?: React.ReactNode;
  /**
   * Text for the "Read more" link
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
   * Additional CSS classes for each badge
   */
  badgeClassName?: string;
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
 * CarouselBadgeCards displays feature cards in a horizontal carousel with badge labels.
 *
 * Each card features an image with hover zoom effect, a category badge, title,
 * description, and a "Read more" link with arrow. Navigation is controlled via
 * arrow buttons in the header. Ideal for showcasing case studies, features,
 * blog posts, or any content that benefits from categorized card presentation.
 *
 * @example
 * ```tsx
 * <CarouselBadgeCards
 *   heading="Our Features"
 *   items={[
 *     {
 *       id: "1",
 *       title: "AI-Powered Analytics",
 *       description: "Transform your data into insights",
 *       label: "Analytics",
 *       href: "/features/analytics",
 *       image: "/images/analytics.jpg"
 *     }
 *   ]}
 * />
 * ```
 */
export function CarouselBadgeCards({
  heading,
  items,
  itemsSlot,
  readMoreText,
  className,
  headerClassName,
  headingClassName,
  controlsClassName,
  carouselClassName,
  carouselContentClassName,
  itemClassName,
  cardClassName,
  imageClassName,
  badgeClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
  optixFlowConfig,
}: CarouselBadgeCardsProps): React.JSX.Element {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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

  const lightboxItems: LightboxItem[] = useMemo(
    () =>
      (items ?? []).map((item, index) => ({
        id: `badge-card-${index}`,
        type: "image" as const,
        src: item.image,
        alt: typeof item.title === "string" ? item.title : item.imageAlt || "Card image",
        download: true,
        share: true,
      })),
    [items],
  );

  const handleImageClick = useCallback((index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const handleLightboxClose = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const itemsContent = useMemo(() => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return items.map((item, index) => (
      <CarouselItem
        key={item.id}
        className={cn("max-w-[320px] pl-5 lg:max-w-[360px]", itemClassName)}
      >
        <a
          href={item.href}
          className={cn(
            "group flex flex-col justify-between rounded-xl p-6",
            getNestedCardBg(background),
            getNestedCardTextColor(background),
            item.className,
            cardClassName,
          )}
        >
          <div>
            <div className="flex aspect-3/2 overflow-clip rounded-xl">
              <div className="flex-1">
                <div
                  className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={(e) => handleImageClick(index, e)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleImageClick(index, e as any);
                    }
                  }}
                  aria-label={`View ${typeof item.title === "string" ? item.title : "image"} in lightbox`}
                >
                  <Img
                    src={item.image}
                    alt={
                      typeof item.title === "string"
                        ? item.title
                        : item.imageAlt || "Card image"
                    }
                    className={cn(
                      "h-full w-full object-cover object-center",
                      imageClassName,
                    )}
                    loading="lazy"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Badge className={badgeClassName}>{item.label}</Badge>
          </div>
          <div className="mb-2 line-clamp-3 pt-4 text-lg font-medium wrap-break-word md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
            {item.title}
          </div>
          <div className="mb-8 line-clamp-2 text-sm text-muted-foreground md:mb-12 md:text-base lg:mb-9">
            {item.description}
          </div>
          {readMoreText && (
            <div className="flex items-center text-sm">
              {readMoreText}{" "}
              <DynamicIcon
                name="lucide/arrow-right"
                size={20}
                className="ml-2 transition-transform group-hover:translate-x-1"
              />
            </div>
          )}
        </a>
      </CarouselItem>
    ));
  }, [
    itemsSlot,
    items,
    itemClassName,
    cardClassName,
    badgeClassName,
    imageClassName,
    optixFlowConfig,
    readMoreText,
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
      <div
        className={cn(
          "mb-8 flex items-end justify-between md:mb-14 lg:mb-16",
          headerClassName,
        )}
      >
        {heading &&
          (typeof heading === "string" ? (
            <h2
              className={cn(
                "text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl",
                headingClassName,
              )}
            >
              {heading}
            </h2>
          ) : (
            <div className={headingClassName}>{heading}</div>
          ))}
        <div className={cn("shrink-0 gap-2 md:flex", controlsClassName)}>
          <Pressable
            size="icon"
            variant="ghost"
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
            variant="ghost"
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
      <div className="w-full -mx-4 sm:-mx-6 lg:-mx-8">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
          className={carouselClassName}
        >
          <CarouselContent
            className={cn(
              "mr-5 ml-5 2xl:mr-[calc(50vw-700px+20px)] 2xl:ml-[calc(50vw-700px+20px)]",
              carouselContentClassName,
            )}
          >
            {itemsContent}
          </CarouselContent>
        </Carousel>
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
