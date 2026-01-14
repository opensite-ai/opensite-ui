"use client";

import * as React from "react";
import { Fragment } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
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
 * Resource item configuration for carousel sidebar resources.
 */
export interface CarouselSidebarResource {
  /**
   * Title of the resource
   */
  title: React.ReactNode;
  /**
   * Category label
   */
  category: React.ReactNode;
  /**
   * Link URL for the resource
   */
  link: string;
  /**
   * Image source URL
   */
  image: string;
  /**
   * Alt text for the image
   */
  imageAlt?: string;
  /**
   * Additional CSS classes for the resource item
   */
  className?: string;
}

export interface CarouselSidebarResourcesProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Array of resources to display
   */
  resources?: CarouselSidebarResource[];
  /**
   * Custom slot for rendering resources (overrides resources array)
   */
  resourcesSlot?: React.ReactNode;
  /**
   * Custom slot for rendering the sidebar
   */
  sidebarSlot?: React.ReactNode;
  /**
   * Text for the "View all resources" link
   * @default "View all resources"
   */
  viewAllText?: React.ReactNode;
  /**
   * URL for the "View all resources" link
   */
  viewAllHref?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the sidebar
   */
  sidebarClassName?: string;
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
   * Additional CSS classes for the navigation controls
   */
  controlsClassName?: string;
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
 * CarouselSidebarResources displays a carousel with a sidebar resource list.
 *
 * Features a three-column layout with a sidebar showing the first 3 resources
 * as a categorized list with separators, a main carousel area showing cards
 * with images and titles, and navigation controls. The sidebar includes a
 * "View all resources" link. Ideal for resource centers, documentation hubs,
 * or content libraries with categorized materials.
 *
 * @example
 * ```tsx
 * <CarouselSidebarResources
 *   heading="Start building with our template collection"
 *   resources={[
 *     {
 *       title: "Getting Started Guide",
 *       category: "guide",
 *       link: "/docs/getting-started",
 *       image: "/images/guide.jpg"
 *     }
 *   ]}
 *   viewAllText="View all resources"
 *   viewAllHref="/resources"
 * />
 * ```
 */
export function CarouselSidebarResources({
  heading,
  resources,
  resourcesSlot,
  sidebarSlot,
  viewAllText = "View all resources",
  viewAllHref = "#",
  className,
  headingClassName,
  sidebarClassName,
  carouselClassName,
  carouselContentClassName,
  itemClassName,
  imageClassName,
  controlsClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  optixFlowConfig,
}: CarouselSidebarResourcesProps): React.JSX.Element {
  const renderSidebar = () => {
    if (sidebarSlot) return sidebarSlot;

    return (
      <div className={cn("order-3 flex flex-col gap-6 lg:order-0", sidebarClassName)}>
        {resources?.slice(0, 3).map((resource, idx) => (
          <Fragment key={idx}>
            <div className="flex flex-col gap-1">
              <div className="font-mono text-sm text-muted-foreground uppercase">
                {resource.category}
              </div>
              <Pressable
                href={resource.link}
                className="group flex items-center gap-2 font-semibold"
              >
                {resource.title}
                <DynamicIcon
                  name="lucide/move-right"
                  size={20}
                  className="mt-0.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Pressable>
            </div>
            <div className="h-px w-full bg-border" />
          </Fragment>
        ))}
        {viewAllHref && (
          <Pressable
            href={viewAllHref}
            className="group flex items-center gap-2 font-semibold"
          >
            {viewAllText}
            <DynamicIcon
              name="lucide/move-right"
              size={20}
              className="mt-0.5 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Pressable>
        )}
      </div>
    );
  };

  const renderResources = () => {
    if (resourcesSlot) return resourcesSlot;
    if (!resources || resources.length === 0) return null;

    return resources.map((item, idx) => (
      <CarouselItem
        className={cn(
          "w-fit border-y border-l border-border pl-0 transition-colors duration-300 hover:bg-muted/50",
          idx === resources.length - 1 && "border-r",
          item.className,
          itemClassName
        )}
        key={idx}
      >
        <Pressable href={item.link} className="block h-full">
          <Img
            src={item.image}
            alt={typeof item.title === "string" ? item.title : (item.imageAlt || "Resource image")}
            className={cn("aspect-video object-cover", imageClassName)}
            loading="lazy"
            optixFlowConfig={optixFlowConfig}
          />
          <div className="px-6 py-8">
            <div className="text-sm text-muted-foreground uppercase">
              {item.category}
            </div>
            {typeof item.title === "string" ? (
              <h3 className="mt-2 text-xl font-semibold lg:text-2xl">
                {item.title}
              </h3>
            ) : (
              <div className="mt-2 text-xl font-semibold lg:text-2xl">
                {item.title}
              </div>
            )}
          </div>
        </Pressable>
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
      {heading && (
        typeof heading === "string" ? (
          <h2 className={cn("text-2xl font-bold text-pretty", headingClassName)}>{heading}</h2>
        ) : (
          <div className={cn("text-2xl font-bold text-pretty", headingClassName)}>{heading}</div>
        )
      )}
      <Carousel className={carouselClassName}>
        <div className="mt-6 grid gap-x-14 gap-y-10 lg:mt-16 lg:grid-cols-3">
          {renderSidebar()}
          <div className="order-1 lg:order-0 lg:col-span-2 [&>div[data-slot=carousel-content]]:overflow-visible [&>div[data-slot=carousel-content]]:[clip-path:inset(-100vw_-100vw_-100vw_0)]">
            <CarouselContent className={cn("ml-0 max-w-[min(calc(100vw-4rem),24rem)] select-none sm:max-w-96", carouselContentClassName)}>
              {renderResources()}
            </CarouselContent>
          </div>
          <div className={cn("order-2 flex items-center gap-4 lg:order-0 lg:col-start-2", controlsClassName)}>
            <CarouselPrevious className="static size-12 translate-x-0 translate-y-0" />
            <CarouselNext className="static size-12 translate-x-0 translate-y-0" />
          </div>
        </div>
      </Carousel>
    </Section>
  );
}
