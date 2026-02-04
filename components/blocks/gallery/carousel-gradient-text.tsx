"use client";

import * as React from "react";
import { startTransition, useEffect, useState, useMemo } from "react";
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
import { Pressable } from "@/src";

/**
 * Item configuration for carousel gradient text cards.
 */
export interface CarouselGradientTextItem {
  /**
   * Image source URL
   */
  image: string;
  /**
   * Alt text for the image
   */
  imageAlt?: string;
  /**
   * Title of the card
   */
  title: React.ReactNode;
  /**
   * Description text
   */
  description: React.ReactNode;
  /**
   * Additional CSS classes for the card
   */
  className?: string;
  /**
   * href for the card
   */
  href?: string;
}

export interface CarouselGradientTextProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Subheading content (displayed with reduced opacity)
   */
  subheading?: React.ReactNode;
  /**
   * Tagline text below heading
   */
  tagline?: React.ReactNode;
  /**
   * Array of card items to display
   */
  items?: CarouselGradientTextItem[];
  /**
   * Custom slot for rendering items (overrides items array)
   */
  itemsSlot?: React.ReactNode;
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
   * Additional CSS classes for the subheading
   */
  subheadingClassName?: string;
  /**
   * Additional CSS classes for the tagline
   */
  taglineClassName?: string;
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
   * Additional CSS classes for the gradient overlay
   */
  gradientClassName?: string;
  /**
   * Additional CSS classes for the indicators
   */
  indicatorsClassName?: string;
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
 * CarouselGradientText displays cards with gradient overlay text and expanding indicators.
 *
 * Features a two-column layout with heading/subheading and navigation on the left,
 * and a carousel of portrait cards on the right. Each card has a gradient overlay
 * from primary color with title and description text. Below the carousel are
 * expanding pill indicators that show the active slide title. Ideal for showcasing
 * features, benefits, or product highlights with strong visual hierarchy.
 *
 * @example
 * ```tsx
 * <CarouselGradientText
 *   heading="Code less."
 *   subheading="Build faster."
 *   items={[
 *     {
 *       image: "/images/feature-1.jpg",
 *       title: "Responsive",
 *       description: "Mobile-first design approach"
 *     }
 *   ]}
 * />
 * ```
 */
export function CarouselGradientText({
  heading,
  subheading,
  tagline,
  items,
  itemsSlot,
  className,
  headerClassName,
  headingClassName,
  subheadingClassName,
  taglineClassName,
  controlsClassName,
  carouselClassName,
  carouselContentClassName,
  itemClassName,
  cardClassName,
  imageClassName,
  gradientClassName,
  indicatorsClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
  optixFlowConfig,
}: CarouselGradientTextProps): React.JSX.Element {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    startTransition(() => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    api.on("select", () => {
      startTransition(() => {
        setCurrent(api.selectedScrollSnap() + 1);
      });
    });
  }, [api]);

  const itemsContent = useMemo(() => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return items.map((item, idx) => (
      <CarouselItem className={cn("w-fit", itemClassName)} key={idx}>
        <Pressable
          href={item.href}
          className={cn(
            "relative flex aspect-4/5 max-h-[500px] rounded-2xl",
            item.className,
            cardClassName,
          )}
        >
          <div
            className={cn(
              "absolute inset-0 rounded-2xl bg-linear-to-b from-black to-transparent to-50% dark:from-background",
              gradientClassName,
            )}
          />
          <Img
            src={item.image}
            alt={
              typeof item.title === "string"
                ? item.title
                : item.imageAlt || "Card image"
            }
            className={cn(
              "size-full rounded-2xl bg-cover object-cover",
              imageClassName,
            )}
            loading="lazy"
            optixFlowConfig={optixFlowConfig}
          />
          <div className="absolute inset-0 p-8">
            <div className="text-sm font-semibold text-white/70">
              <div className="mr-1 text-white">{item.title}.</div>
              <div>{item.description}</div>
            </div>
          </div>
        </Pressable>
      </CarouselItem>
    ));
  }, [
    itemsSlot,
    items,
    itemClassName,
    cardClassName,
    gradientClassName,
    imageClassName,
    optixFlowConfig,
  ]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={cn("overflow-hidden", className)}
      containerClassName="px-4"
    >
      <Carousel setApi={setApi} className={carouselClassName}>
        <div
          className={cn(
            "grid gap-4 lg:grid-cols-2 [&>div[data-slot=carousel-content]]:overflow-visible [&>div[data-slot=carousel-content]]:[clip-path:inset(-100vw_-100vw_-100vw_0)]",
            headerClassName,
          )}
        >
          <div>
            {(heading || subheading) && (
              <h2
                className={cn(
                  "text-4xl font-semibold md:text-6xl",
                  headingClassName,
                )}
              >
                {heading} <br />{" "}
                <span className={cn("text-primary", subheadingClassName)}>
                  {subheading}
                </span>
              </h2>
            )}
            {tagline ? (
              typeof tagline === "string" ? (
                <p className={cn("mt-2 md:mt-8 text-xl", taglineClassName)}>
                  {tagline}
                </p>
              ) : (
                <div className={cn("mt-2 md:mt-8 text-xl", taglineClassName)}>
                  {tagline}
                </div>
              )
            ) : null}
            <div
              className={cn("mt-8 items-center gap-2 flex", controlsClassName)}
            >
              <CarouselPrevious className="static size-12 translate-x-0 translate-y-0" />
              <CarouselNext className="static size-12 translate-x-0 translate-y-0" />
            </div>
          </div>

          <CarouselContent
            className={cn(
              "max-w-[400px] select-none",
              carouselContentClassName,
            )}
          >
            {itemsContent}
          </CarouselContent>
        </div>
      </Carousel>
      <div
        className={cn(
          "mt-4 md:mt-8 flex items-center lg:ml-[50%] max-w-full overflow-x-auto scrollbar-hide",
          indicatorsClassName,
        )}
      >
        {Array.from({ length: items?.length ?? 0 }).map((_, index) => (
          <span
            key={index}
            className={cn(
              "flex h-8 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-muted-foreground/15 text-xs font-semibold whitespace-nowrap transition-all duration-300",
              index + 1 === current ? "w-fit px-4" : "my-4 mx-2 md:mx-4 size-4",
            )}
            onClick={() => api && api.scrollTo(index)}
          >
            <span
              className={cn(
                "inline-block transition-all duration-300",
                index + 1 === current
                  ? "translate-x-0 opacity-100"
                  : "translate-x-6 opacity-0",
              )}
            >
              {items?.[index]?.title}
            </span>
          </span>
        ))}
      </div>
    </Section>
  );
}
