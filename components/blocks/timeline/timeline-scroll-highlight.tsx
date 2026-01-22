"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface TimelineScrollItem {
  title: React.ReactNode;
  description: React.ReactNode;
  date: string;
  image: string;
  imageAlt?: string;
}

export interface TimelineScrollHighlightProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Array of timeline items
   */
  items?: TimelineScrollItem[];
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the content container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the sticky header
   */
  stickyHeaderClassName?: string;
  /**
   * Additional CSS classes for the items container
   */
  itemsClassName?: string;
  /**
   * Additional CSS classes for individual item wrappers
   */
  itemClassName?: string;
  /**
   * Additional CSS classes for item images
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for item titles
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for item descriptions
   */
  descriptionClassName?: string;
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
   * Additional CSS classes for the pattern background
   */
  patternClassName?: string;
  /**
   * Section ID for anchor links
   */
  id?: string;
  /**
   * Inline styles for the section
   */
  style?: React.CSSProperties;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function TimelineScrollHighlight({
  heading,
  items,
  className,
  containerClassName,
  headingClassName,
  stickyHeaderClassName,
  itemsClassName,
  itemClassName,
  imageClassName,
  titleClassName,
  descriptionClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  id,
  style,
  optixFlowConfig,
}: TimelineScrollHighlightProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const safeActiveIndex =
    (items?.length ?? 0) > 0
      ? Math.max(0, Math.min(activeIndex, (items?.length ?? 1) - 1))
      : 0;

  useEffect(() => {
    if (!items || items.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = itemRefs.current.findIndex(
            (ref) => ref === entry.target,
          );
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    itemRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [items?.length]);

  if (!items || items.length === 0) {
    return (
      <Section
        id={id}
        background={background}
        spacing={spacing}
        className={className}
        pattern={pattern}
        patternOpacity={patternOpacity}
        patternClassName={patternClassName}
        style={style}
      >
        <div className={containerClassName}>
          {heading && (
            <h1
              className={cn(
                "max-w-4xl text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl",
                headingClassName,
              )}
            >
              {heading}
            </h1>
          )}
        </div>
      </Section>
    );
  }

  return (
    <Section
      id={id}
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      style={style}
    >
      <div className={containerClassName}>
        {heading && (
          <h1
            className={cn(
              "max-w-4xl text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl",
              headingClassName,
            )}
          >
            {heading}
          </h1>
        )}
      </div>
      <div className="relative mt-16 lg:mt-28">
        <div
          className={cn(
            "sticky top-0 z-10 border-y bg-background py-3.5",
            stickyHeaderClassName,
          )}
        >
          <div className="mx-auto w-full px-2 sm:px-4 lg:px-8 max-w-7xl">
            <div className="flex justify-between gap-4 text-2xl md:text-4xl">
              <p className="font-mono text-muted-foreground">
                {String(safeActiveIndex + 1).padStart(2, "0")}
              </p>
              <p className="font-mono">{items[safeActiveIndex]?.date}</p>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full px-2 sm:px-4 lg:px-8 max-w-7xl">
          <div className={cn("flex flex-col", itemsClassName)}>
            {items.map((item, index) => (
              <div
                key={index}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className={cn(
                  "flex flex-col items-center gap-7 py-14 opacity-50 transition-opacity duration-300 md:flex-row md:gap-10 md:py-20",
                  index === safeActiveIndex && "opacity-100",
                  itemClassName,
                )}
              >
                <Img
                  src={item.image}
                  alt={
                    item.imageAlt ||
                    (typeof item.title === "string"
                      ? item.title
                      : `Item ${index + 1}`)
                  }
                  className={cn(
                    "aspect-16/12 rounded-lg border object-cover md:w-1/3 md:max-w-[440px]",
                    imageClassName,
                  )}
                  optixFlowConfig={optixFlowConfig}
                />
                <div>
                  <h2
                    className={cn(
                      "mb-3 text-2xl font-medium md:mb-4 md:text-4xl",
                      titleClassName,
                    )}
                  >
                    {item.title}
                  </h2>
                  <p
                    className={cn(
                      "text-muted-foreground md:text-balance",
                      descriptionClassName,
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
