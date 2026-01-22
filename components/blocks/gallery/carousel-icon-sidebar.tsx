"use client";

import * as React from "react";
import { startTransition, useEffect, useState } from "react";
import { cn } from "../../../lib/utils";
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
   * Additional CSS classes for the sidebar panel
   */
  sidebarClassName?: string;
  /**
   * Additional CSS classes for the icon container
   */
  iconClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
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
  items,
  itemsSlot,
  sidebarSlot,
  className,
  sidebarClassName,
  iconClassName,
  titleClassName,
  descriptionClassName,
  controlsClassName,
  carouselClassName,
  carouselContentClassName,
  itemClassName,
  imageClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  optixFlowConfig,
}: CarouselIconSidebarProps): React.JSX.Element {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);

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

  const renderSidebar = () => {
    if (sidebarSlot) return sidebarSlot;
    if (!activeItem) return null;

    return (
      <div
        className={cn(
          "flex h-full flex-col gap-8 rounded-lg bg-muted px-8 py-16",
          sidebarClassName,
        )}
      >
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-lg bg-background shadow-lg ring-1 ring-gray-200",
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
            <CarouselPrevious className="relative top-0 right-0 left-0 translate-x-0 translate-y-0 p-5 transition-all duration-200 hover:bg-black hover:text-white" />
            <CarouselNext className="relative top-0 right-0 left-0 translate-x-0 translate-y-0 p-5 transition-all duration-200 hover:bg-black hover:text-white" />
          </div>
        </div>
      </div>
    );
  };

  const renderItems = () => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return items.map((image, index) => (
      <CarouselItem key={index} className={cn("h-full", itemClassName)}>
        <div className={cn("aspect-2/1 h-full w-full", image.className)}>
          <Img
            src={image.src}
            alt={
              typeof image.title === "string"
                ? image.title
                : image.alt || "Carousel image"
            }
            className={cn(
              "h-full w-full rounded-lg object-cover",
              imageClassName,
            )}
            loading="lazy"
            optixFlowConfig={optixFlowConfig}
          />
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
      <Carousel setApi={setApi} className={cn("w-full", carouselClassName)}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
          <div className="md:col-span-2">{renderSidebar()}</div>

          <div className="h-full md:col-span-3">
            <CarouselContent className={carouselContentClassName}>
              {renderItems()}
            </CarouselContent>
          </div>
        </div>
      </Carousel>
    </Section>
  );
}
