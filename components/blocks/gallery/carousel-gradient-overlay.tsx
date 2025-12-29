"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import type { CarouselApi } from "../../ui/carousel";
import { Carousel, CarouselContent, CarouselItem } from "../../ui/carousel";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";

/**
 * Item configuration for carousel gradient overlay cards.
 */
export interface CarouselGradientOverlayItem {
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

export interface CarouselGradientOverlayProps {
  /**
   * Main title content
   */
  title?: React.ReactNode;
  /**
   * Description text below title
   */
  description?: React.ReactNode;
  /**
   * Array of card items to display
   */
  items?: CarouselGradientOverlayItem[];
  /**
   * Custom slot for rendering items (overrides items array)
   */
  itemsSlot?: React.ReactNode;
  /**
   * Text for the "Read more" link
   * @default "Read more"
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

const defaultItems: CarouselGradientOverlayItem[] = [
  {
    id: "shadcn-ui",
    title: "Building a Modern Component Library",
    description:
      "Explore how modern component libraries revolutionized React development by providing a unique approach to component distribution and customization.",
    href: "#",
    image:
      "https://toastability-production.s3.amazonaws.com/xlp46pzk3a4d73jgjx4s7xdafwpn",
  },
  {
    id: "tailwind",
    title: "The Utility-First Revolution",
    description:
      "Discover how utility-first CSS transformed the way developers style their applications, offering a new approach that speeds up development.",
    href: "#",
    image:
      "https://toastability-production.s3.amazonaws.com/g1iuifb3yzoofo9c7a00koyn6q1t",
  },
  {
    id: "astro",
    title: "The All-in-One Web Framework",
    description:
      "Learn how innovative architecture and zero-JS-by-default approach is helping developers build faster websites while maintaining rich interactivity.",
    href: "#",
    image:
      "https://toastability-production.s3.amazonaws.com/z9u4sdrj2oq3eds0qyui0nxsus3j",
  },
  {
    id: "react",
    title: "Pioneering Component-Based UI",
    description:
      "See how React continues to shape modern web development with its component-based architecture, enabling developers to build complex user interfaces.",
    href: "#",
    image:
      "https://toastability-production.s3.amazonaws.com/63aotyt2pb4gqpccej2kkw8reson",
  },
  {
    id: "nextjs",
    title: "The React Framework for Production",
    description:
      "Explore how Next.js has become the go-to framework for building full-stack React applications, offering features like server components and file-based routing.",
    href: "#",
    image:
      "https://toastability-production.s3.amazonaws.com/pjgb223h1bjywdk15i3zi7pjhutg",
  },
];

/**
 * CarouselGradientOverlay displays cards with gradient overlay and dot indicators.
 *
 * Each card features a full-bleed background image with a gradient overlay from
 * primary color, title, description, and "Read more" link. Includes dot navigation
 * indicators at the bottom and arrow buttons in the header. Ideal for showcasing
 * case studies, portfolio items, or featured content with strong visual impact.
 *
 * @example
 * ```tsx
 * <CarouselGradientOverlay
 *   title="Case Studies"
 *   description="Discover how leading companies leverage modern web technologies."
 *   items={[
 *     {
 *       id: "1",
 *       title: "E-commerce Platform",
 *       description: "A complete redesign of the shopping experience",
 *       href: "/case-studies/ecommerce",
 *       image: "/images/case-1.jpg"
 *     }
 *   ]}
 * />
 * ```
 */
export function CarouselGradientOverlay({
  title = "Case Studies",
  description = "Discover how leading companies and developers are leveraging modern web technologies to build exceptional digital experiences.",
  items = defaultItems,
  itemsSlot,
  readMoreText = "Read more",
  className,
  headerClassName,
  titleClassName,
  descriptionClassName,
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
}: CarouselGradientOverlayProps): React.JSX.Element {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  const renderItems = () => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return items.map((item) => (
      <CarouselItem
        key={item.id}
        className={cn("max-w-[320px] pl-5 lg:max-w-[360px]", itemClassName)}
      >
        <Pressable href={item.href} className={cn("group rounded-xl", item.className, cardClassName)}>
          <div className="group relative h-full min-h-108 max-w-full overflow-hidden rounded-xl md:aspect-5/4 lg:aspect-video">
            <Img
              src={item.image}
              alt={typeof item.title === "string" ? item.title : (item.imageAlt || "Card image")}
              className={cn("absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105", imageClassName)}
              loading="lazy"
              optixFlowConfig={optixFlowConfig}
            />
            <div className={cn("absolute inset-0 h-full bg-linear-to-t from-primary from-20% to-transparent mix-blend-multiply", gradientClassName)} />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-primary-foreground md:p-8">
              <div className="mb-2 pt-4 text-xl font-semibold md:mb-3 md:pt-4 lg:pt-4">
                {item.title}
              </div>
              <div className="mb-8 line-clamp-2 md:mb-12 lg:mb-9">
                {item.description}
              </div>
              <div className="flex items-center text-sm">
                {readMoreText}{" "}
                <DynamicIcon
                  name="lucide/arrow-right"
                  size={20}
                  className="ml-2 transition-transform group-hover:translate-x-1"
                />
              </div>
            </div>
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
      className={className}
    >
      <div className={cn("mb-8 flex items-end justify-between md:mb-14 lg:mb-16", headerClassName)}>
        <div className="flex flex-col gap-4">
          {title && (
            typeof title === "string" ? (
              <h2 className={cn("text-3xl font-medium md:text-4xl lg:text-5xl", titleClassName)}>
                {title}
              </h2>
            ) : (
              <div className={titleClassName}>{title}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("max-w-lg text-muted-foreground", descriptionClassName)}>{description}</p>
            ) : (
              <div className={cn("max-w-lg text-muted-foreground", descriptionClassName)}>{description}</div>
            )
          )}
        </div>
        <div className={cn("hidden shrink-0 gap-2 md:flex", controlsClassName)}>
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
          <CarouselContent className={cn("ml-0 2xl:mr-[max(0rem,calc(50vw-700px))] 2xl:ml-[max(8rem,calc(50vw-700px))]", carouselContentClassName)}>
            {renderItems()}
          </CarouselContent>
        </Carousel>
        <div className={cn("mt-8 flex justify-center gap-2", indicatorsClassName)}>
          {items.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                currentSlide === index ? "bg-primary" : "bg-primary/20"
              )}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
