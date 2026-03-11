"use client";

import * as React from "react";
import {
  startTransition,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import {
  cn,
  getNestedCardBg,
  getNestedCardTextColor,
} from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
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
import { Lightbox, type LightboxItem } from "@page-speed/lightbox";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";

/**
 * Item configuration for carousel icon sidebar.
 */
export interface CarouselIconSidebarItem {
  /**
   * Image source URL
   */
  src: string;
  /**
   * Alt text for the image
   */
  alt?: string;
  /**
   * Title of the item
   */
  title: React.ReactNode;
  /**
   * Description text
   */
  description: React.ReactNode;
  /**
   * Icon name for DynamicIcon
   */
  icon: string;
  /**
   * Additional CSS classes for the item
   */
  className?: string;
}

export interface CarouselIconSidebarProps {
  /**
   * Section title (displayed above the carousel)
   */
  title?: React.ReactNode;
  /**
   * Section description (displayed above the carousel)
   */
  description?: React.ReactNode;
  /**
   * Array of items to display
   */
  items?: CarouselIconSidebarItem[];
  /**
   * Custom slot for rendering items (overrides items array)
   */
  itemsSlot?: React.ReactNode;
  /**
   * Custom slot for rendering the sidebar content
   */
  sidebarSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the section title
   */
  sectionTitleClassName?: string;
  /**
   * Additional CSS classes for the section description
   */
  sectionDescriptionClassName?: string;
  /**
   * Additional CSS classes for the sidebar panel
   */
  sidebarClassName?: string;
  /**
   * Additional CSS classes for the icon container
   */
  iconClassName?: string;
  /**
   * Additional CSS classes for the sidebar item title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the sidebar item description
   */
  descriptionClassName?: string;
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
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * CarouselIconSidebar displays a carousel with a dynamic icon sidebar panel.
 *
 * Features a two-column layout with a muted sidebar panel showing the active
 * slide's icon, title, description, and navigation arrows, alongside a larger
 * image carousel. The sidebar content updates dynamically based on the current
 * slide. Ideal for showcasing product features, service offerings, or portfolio
 * items with detailed descriptions.
 *
 * @example
 * ```tsx
 * <CarouselIconSidebar
 *   items={[
 *     {
 *       src: "/images/design.jpg",
 *       title: "Elegant Design",
 *       description: "Beautiful interfaces that users love",
 *       icon: "lucide/palette"
 *     }
 *   ]}
 * />
 * ```
 */
export function CarouselIconSidebar({
  sectionId = "carousel-icon-sidebar",
  title,
  description,
  items,
  itemsSlot,
  sidebarSlot,
  className,
  sectionTitleClassName,
  sectionDescriptionClassName,
  sidebarClassName,
  iconClassName,
  titleClassName,
  descriptionClassName,
  controlsClassName,
  carouselClassName,
  carouselContentClassName,
  itemClassName,
  imageClassName,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  pattern,
  patternOpacity,
  patternClassName,
  optixFlowConfig,
}: CarouselIconSidebarProps): React.JSX.Element {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    startTransition(() => {
      setActiveIndex(api.selectedScrollSnap());
    });
    api.on("select", () => {
      startTransition(() => {
        setActiveIndex(api.selectedScrollSnap());
      });
    });
  }, [api]);

  const activeItem = items?.[activeIndex];

  const lightboxItems: LightboxItem[] = useMemo(
    () =>
      (items ?? []).map((item, idx) => ({
        id: `carousel-sidebar-image-${idx}`,
        type: "image" as const,
        src: item.src,
        alt:
          typeof item.title === "string"
            ? item.title
            : item.alt || "Carousel image",
        download: true,
        share: true,
      })),
    [items],
  );

  const handleImageClick = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const handleLightboxClose = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const sidebarContent = useMemo(() => {
    if (sidebarSlot) return sidebarSlot;
    if (!activeItem) return null;

    return (
      <div
        className={cn(
          "flex h-full flex-row md:flex-col",
          "gap-4 md:gap-8 rounded-2xl p-4 md:p-8",
          "bg-card text-card-foreground shadow-lg",
          "border border-muted/10",
          sidebarClassName,
        )}
      >
        <div
          className={cn(
            "flex h-fit w-fit p-3 items-center justify-center rounded-lg shadow-lg ring-1 ring-border bg-card",
            iconClassName,
          )}
        >
          <DynamicIcon name={activeItem.icon} size={24} />
        </div>
        <div className="flex flex-col justify-between h-full gap-4">
          <div className="flex flex-col gap-2 md:gap-4">
            {typeof activeItem.title === "string" ? (
              <h3
                className={cn(
                  "text-xl md:text-2xl font-medium",
                  titleClassName,
                )}
              >
                {activeItem.title}
              </h3>
            ) : (
              <div
                className={cn(
                  "text-xl md:text-2xl font-medium",
                  titleClassName,
                )}
              >
                {activeItem.title}
              </div>
            )}
            {typeof activeItem.description === "string" ? (
              <p className={cn("mb-4 text-base", descriptionClassName)}>
                {activeItem.description}
              </p>
            ) : (
              <div className={cn("mb-4 text-base", descriptionClassName)}>
                {activeItem.description}
              </div>
            )}
          </div>
          <div className={cn("flex items-center gap-2", controlsClassName)}>
            <CarouselPrevious className="relative top-0 right-0 left-0 translate-x-0 translate-y-0 p-5 transition-all duration-200 hover:bg-foreground hover:text-background" />
            <CarouselNext className="relative top-0 right-0 left-0 translate-x-0 translate-y-0 p-5 transition-all duration-200 hover:bg-foreground hover:text-background" />
          </div>
        </div>
      </div>
    );
  }, [
    sidebarSlot,
    activeItem,
    sidebarClassName,
    iconClassName,
    titleClassName,
    descriptionClassName,
    controlsClassName,
  ]);

  const itemsContent = useMemo(() => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return items.map((image, index) => (
      <CarouselItem key={index} className={cn("h-full", itemClassName)}>
        <div className={cn("h-full w-full", image.className)}>
          <Img
            src={image.src}
            alt={
              typeof image.title === "string"
                ? image.title
                : image.alt || "Carousel image"
            }
            className={cn(
              "aspect-4/3",
              "h-full w-full object-cover cursor-pointer aspect-4/3",
              imageClassName,
            )}
            loading="lazy"
            optixFlowConfig={optixFlowConfig}
            onClick={() => handleImageClick(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleImageClick(index);
              }
            }}
          />
        </div>
      </CarouselItem>
    ));
  }, [
    itemsSlot,
    items,
    itemClassName,
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
      className={className}
      containerClassName={containerClassName}
    >
      {title || description ? (
        <div className="flex flex-col gap-4 mb-6 md:mb-16 px-4 md:px-0">
          {title &&
            (typeof title === "string" ? (
              <h2
                className={cn(
                  "text-xl font-medium tracking-tight md:text-2xl lg:text-3xl text-balance",
                  sectionTitleClassName,
                )}
              >
                {title}
              </h2>
            ) : (
              title
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "max-w-lg text-balance",
                  sectionDescriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              description
            ))}
        </div>
      ) : null}

      <Carousel setApi={setApi} className={cn("w-full", carouselClassName)}>
        <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-5">
          <div className="md:col-span-2">{sidebarContent}</div>

          <div className="h-full md:col-span-3">
            <div
              className={cn(
                "overflow-hidden rounded-2xl shadow-lg",
                carouselContentClassName,
              )}
            >
              <CarouselContent>{itemsContent}</CarouselContent>
            </div>
          </div>
        </div>
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
