"use client";

import * as React from "react";
import { startTransition, useEffect, useState } from "react";
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
   * @default "Start with our templates, customize to your needs."
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

const defaultItems: CarouselGradientTextItem[] = [
  {
    image:
      "https://toastability-production.s3.amazonaws.com/xlp46pzk3a4d73jgjx4s7xdafwpn",
    title: "Responsive",
    description:
      "Our templates are built with a mobile-first approach, ensuring your website looks stunning on all devices and screen sizes.",
  },
  {
    image:
      "https://toastability-production.s3.amazonaws.com/g1iuifb3yzoofo9c7a00koyn6q1t",
    title: "Clean Code",
    description:
      "Each template is crafted with clean, well-structured code following best practices to make customization and maintenance simple.",
  },
  {
    image:
      "https://toastability-production.s3.amazonaws.com/z9u4sdrj2oq3eds0qyui0nxsus3j",
    title: "Copy & Paste",
    description:
      "Our templates are designed for easy copy and paste functionality, allowing you to quickly implement components and features into your projects.",
  },
  {
    image:
      "https://toastability-production.s3.amazonaws.com/63aotyt2pb4gqpccej2kkw8reson",
    title: "Easy Updates",
    description:
      "Regular updates and maintenance ensure your template stays current with the latest web standards and security practices.",
  },
  {
    image:
      "https://toastability-production.s3.amazonaws.com/pjgb223h1bjywdk15i3zi7pjhutg",
    title: "Modern Stack",
    description:
      "Built with the latest technologies including React, Tailwind CSS and shadcn/ui for a modern development experience.",
  },
];

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
  heading = "Code less.",
  subheading = "Build faster.",
  tagline = "Start with our templates, customize to your needs.",
  items = defaultItems,
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
  background = "white",
  spacing = "lg",
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

  const renderItems = () => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return items.map((item, idx) => (
      <CarouselItem className={cn("w-fit", itemClassName)} key={idx}>
        <div className={cn("relative aspect-4/5 max-h-[500px] rounded-2xl", item.className, cardClassName)}>
          <div className={cn("absolute inset-0 rounded-2xl bg-linear-to-b from-primary to-transparent to-40% dark:from-background", gradientClassName)} />
          <Img
            src={item.image}
            alt={typeof item.title === "string" ? item.title : (item.imageAlt || "Card image")}
            className={cn("size-full rounded-2xl bg-cover object-cover", imageClassName)}
            loading="lazy"
            optixFlowConfig={optixFlowConfig}
          />
          <div className="absolute inset-0 p-8">
            <p className="text-sm font-semibold text-background/50 dark:text-foreground/50">
              <span className="mr-1 text-background dark:text-foreground">
                {item.title}.
              </span>
              {item.description}
            </p>
          </div>
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
      className={cn("overflow-hidden", className)}
    >
      <Carousel setApi={setApi} className={carouselClassName}>
        <div className={cn("grid gap-8 md:gap-4 lg:grid-cols-2 [&>div[data-slot=carousel-content]]:overflow-visible [&>div[data-slot=carousel-content]]:[clip-path:inset(-100vw_-100vw_-100vw_0)]", headerClassName)}>
          <div>
            {(heading || subheading) && (
              <h2 className={cn("text-4xl font-semibold md:text-6xl", headingClassName)}>
                {heading} <br />{" "}
                <span className={cn("text-primary/40", subheadingClassName)}>{subheading}</span>
              </h2>
            )}
            {tagline && (
              typeof tagline === "string" ? (
                <p className={cn("mt-8 text-xl text-primary", taglineClassName)}>
                  {tagline}
                </p>
              ) : (
                <div className={cn("mt-8 text-xl text-primary", taglineClassName)}>{tagline}</div>
              )
            )}
            <div className={cn("mt-8 hidden items-center gap-4 md:flex", controlsClassName)}>
              <CarouselPrevious className="static size-12 translate-x-0 translate-y-0" />
              <CarouselNext className="static size-12 translate-x-0 translate-y-0" />
            </div>
          </div>

          <CarouselContent className={cn("max-w-[400px] select-none", carouselContentClassName)}>
            {renderItems()}
          </CarouselContent>
        </div>
      </Carousel>
      <div className={cn("mt-8 flex items-center lg:ml-[50%]", indicatorsClassName)}>
        {Array.from({ length: items.length }).map((_, index) => (
          <span
            key={index}
            className={cn(
              "flex h-8 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-muted-foreground/15 text-xs font-semibold whitespace-nowrap transition-all duration-300",
              index + 1 === current ? "w-32" : "m-4 size-4"
            )}
            onClick={() => api && api.scrollTo(index)}
          >
            <span
              className={cn(
                "inline-block transition-all duration-300",
                index + 1 === current
                  ? "translate-x-0 opacity-100"
                  : "translate-x-6 opacity-0"
              )}
            >
              {items[index].title}
            </span>
          </span>
        ))}
      </div>
    </Section>
  );
}
