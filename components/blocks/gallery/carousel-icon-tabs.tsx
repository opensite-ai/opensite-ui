"use client";

import * as React from "react";
import { startTransition, useEffect, useState } from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
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
 * Item configuration for carousel icon tabs.
 */
export interface CarouselIconTabItem {
  /**
   * Image source URL
   */
  img: string;
  /**
   * Alt text for the image
   */
  alt?: string;
  /**
   * Title of the tab
   */
  title: React.ReactNode;
  /**
   * Description text
   */
  text: React.ReactNode;
  /**
   * Icon name for DynamicIcon
   */
  icon: string;
  /**
   * Additional CSS classes for the item
   */
  className?: string;
}

export interface CarouselIconTabsProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Badge text content
   */
  badge?: React.ReactNode;
  /**
   * Array of tab sections to display
   */
  sections?: CarouselIconTabItem[];
  /**
   * Custom slot for rendering sections (overrides sections array)
   */
  sectionsSlot?: React.ReactNode;
  /**
   * Custom slot for rendering the header
   */
  headerSlot?: React.ReactNode;
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
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
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
   * Additional CSS classes for the tabs container
   */
  tabsClassName?: string;
  /**
   * Additional CSS classes for each tab
   */
  tabClassName?: string;
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
 * CarouselIconTabs displays a carousel with icon-based tab navigation.
 *
 * Features a centered heading with badge, a full-width image carousel, and
 * clickable tab sections below showing icon, title, and description. The
 * active tab is highlighted with different text opacity. Navigation arrows
 * and slide counter are shown at the bottom. Ideal for showcasing workflow
 * steps, product features, or process stages with visual representation.
 *
 * @example
 * ```tsx
 * <CarouselIconTabs
 *   heading="Cut the time it takes to close your books"
 *   badge="Streamline your workflow"
 *   sections={[
 *     {
 *       img: "/images/design.jpg",
 *       title: "Design",
 *       text: "Create beautiful interfaces",
 *       icon: "lucide/palette"
 *     }
 *   ]}
 * />
 * ```
 */
export function CarouselIconTabs({
  heading = "Cut the time it takes to close your books",
  badge = "Lorem ipsum dolor sit amet consectetur.",
  sections,
  sectionsSlot,
  headerSlot,
  className,
  headerClassName,
  headingClassName,
  badgeClassName,
  carouselClassName,
  carouselContentClassName,
  itemClassName,
  imageClassName,
  tabsClassName,
  tabClassName,
  controlsClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  optixFlowConfig,
}: CarouselIconTabsProps): React.JSX.Element {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateCurrent = () => {
      startTransition(() => {
        setCurrent(api.selectedScrollSnap() + 1);
      });
    };

    startTransition(() => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    api.on("select", updateCurrent);

    return () => {
      api.off("select", updateCurrent);
    };
  }, [api]);

  const renderHeader = () => {
    if (headerSlot) return headerSlot;

    return (
      <div className={cn("mb-20 flex flex-col items-center justify-center gap-8", headerClassName)}>
        {heading && (
          typeof heading === "string" ? (
            <h1 className={cn("text-4xl", headingClassName)}>{heading}</h1>
          ) : (
            <div className={cn("text-4xl", headingClassName)}>{heading}</div>
          )
        )}
        {badge && (
          <Badge
            variant="secondary"
            className={cn("px-5 py-2 text-base font-normal", badgeClassName)}
          >
            {badge}
          </Badge>
        )}
      </div>
    );
  };

  const renderSections = () => {
    if (sectionsSlot) return sectionsSlot;
    if (!sections || sections.length === 0) return null;

    return sections.map((item, index) => (
      <CarouselItem className={cn("h-full w-full", item.className, itemClassName)} key={index}>
        <Img
          src={item.img}
          alt={typeof item.title === "string" ? item.title : (item.alt || "Tab image")}
          className={cn("aspect-square h-full w-full object-cover md:aspect-2/1", imageClassName)}
          loading="lazy"
          optixFlowConfig={optixFlowConfig}
        />
        <div className="mt-8 flex cursor-pointer flex-col gap-2 md:hidden">
          <div>
            <DynamicIcon name={item.icon} size={20} />
          </div>
          <div className="text-lg font-medium">{item.title}</div>
          <div className="text-lg text-muted-foreground">
            {item.text}
          </div>
        </div>
      </CarouselItem>
    ));
  };

  const renderTabs = () => {
    if (!sections || sections.length === 0) return null;

    return (
      <div className={cn("mb-8 hidden justify-between gap-8 md:flex", tabsClassName)}>
        {sections.map((section, index) => (
          <div
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn("flex cursor-pointer flex-col gap-2", tabClassName)}
          >
            <div>
              <DynamicIcon name={section.icon} size={20} />
            </div>
            <div className="text-lg font-medium">{section.title}</div>
            <div
              className={cn(
                "text-lg hover:text-muted-foreground",
                index + 1 === current
                  ? "text-muted-foreground"
                  : "text-muted-foreground/50"
              )}
            >
              {section.text}
            </div>
          </div>
        ))}
      </div>
    );
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
      {renderHeader()}
      <Carousel setApi={setApi} className={cn("flex flex-col gap-10", carouselClassName)}>
        <CarouselContent className={carouselContentClassName}>
          {renderSections()}
        </CarouselContent>
        {renderTabs()}
        <div className={cn("flex items-center gap-8", controlsClassName)}>
          <div>
            {current} / {sections.length}
          </div>
          <div className="flex items-center justify-start gap-2">
            <CarouselPrevious
              className="static translate-y-0"
              disabled={false}
            />
            <CarouselNext className="static translate-y-0" disabled={false} />
          </div>
        </div>
      </Carousel>
    </Section>
  );
}
