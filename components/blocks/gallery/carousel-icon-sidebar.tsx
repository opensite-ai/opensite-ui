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
  spacing,
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
          "flex h-full flex-col gap-8 rounded-lg p-8",
          getNestedCardBg(background),
          getNestedCardTextColor(background),
          sidebarClassName,
        )}
      >
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-lg shadow-lg ring-1 ring-border",
            getNestedCardBg(background, "card"),
            iconClassName,
          )}
        >
          <DynamicIcon name={activeItem.icon} size={24} />
        </div>
        <div className="flex flex-col gap-4">
          {typeof activeItem.title === "string" ? (
            <h2 className={cn("text-3xl font-medium", titleClassName)}>
              {activeItem.title}
            </h2>
          ) : (
            <div className={cn("text-3xl font-medium", titleClassName)}>
              {activeItem.title}
            </div>
          )}
          {typeof activeItem.description === "string" ? (
            <p
              className={cn(
                "mb-4 text-base text-muted-foreground",
                descriptionClassName,
              )}
            >
              {activeItem.description}
            </p>
          ) : (
            <div
              className={cn(
                "mb-4 text-base text-muted-foreground",
                descriptionClassName,
              )}
            >
              {activeItem.description}
            </div>
          )}
          <div className={cn("flex items-center gap-4", controlsClassName)}>
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
              "h-full w-full rounded-lg object-cover cursor-pointer",
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
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
    >
      {title || description ? (
        <div className="flex flex-col gap-4 mb-6 md:mb-16">
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
              <div className={sectionTitleClassName}>{title}</div>
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
              <div
                className={cn(
                  "max-w-lg text-balance",
                  sectionDescriptionClassName,
                )}
              >
                {description}
              </div>
            ))}
        </div>
      ) : null}

      <Carousel setApi={setApi} className={cn("w-full", carouselClassName)}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
          <div className="hidden md:visible md:col-span-2">
            {sidebarContent}
          </div>

          <div className="h-full md:col-span-3">
            <CarouselContent className={carouselContentClassName}>
              {itemsContent}
            </CarouselContent>
          </div>

          <div className="visible md:hidden md:col-span-2">
            {sidebarContent}
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
