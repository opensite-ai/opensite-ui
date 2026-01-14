"use client";

import * as React from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Carousel, CarouselContent, CarouselItem } from "../../ui/carousel";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
  ActionConfig,
} from "../../../src/types";

/**
 * Image item configuration for the auto-scroll carousel.
 */
export interface AutoScrollCarouselImage {
  /**
   * Image source URL
   */
  src: string;
  /**
   * Alt text for accessibility
   */
  alt?: string;
  /**
   * Additional CSS classes for the image
   */
  className?: string;
}

export interface AutoScrollCarouselProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Link/action configuration for the CTA
   */
  action?: ActionConfig;
  /**
   * Custom slot for rendering the action (overrides action prop)
   */
  actionSlot?: React.ReactNode;
  /**
   * Array of images to display in the carousel
   */
  images?: AutoScrollCarouselImage[];
  /**
   * Custom slot for rendering images (overrides images array)
   */
  imagesSlot?: React.ReactNode;
  /**
   * Auto-scroll speed
   * @default 0.9
   */
  autoScrollSpeed?: number;
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
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the action link
   */
  actionClassName?: string;
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
 * AutoScrollCarousel displays images in a continuously auto-scrolling carousel.
 *
 * Features a header section with heading, description, and a link, followed by
 * an infinite-loop carousel that auto-scrolls horizontally. Images are displayed
 * in a staggered pattern with alternating vertical offsets for visual interest.
 * Ideal for showcasing team photos, product images, or portfolio work in an
 * engaging, hands-free presentation.
 *
 * @example
 * ```tsx
 * <AutoScrollCarousel
 *   heading="Bringing your data to life with AI"
 *   description="Our team transforms complex data into actionable insights."
 *   action={{ label: "Explore our solutions", href: "/solutions" }}
 *   images={[
 *     { src: "/images/team-1.jpg", alt: "Team photo 1" },
 *     { src: "/images/team-2.jpg", alt: "Team photo 2" }
 *   ]}
 * />
 * ```
 */
export function AutoScrollCarousel({
  heading,
  description,
  action,
  actionSlot,
  images,
  imagesSlot,
  autoScrollSpeed = 0.9,
  className,
  headerClassName,
  headingClassName,
  descriptionClassName,
  actionClassName,
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
}: AutoScrollCarouselProps): React.JSX.Element {
  const renderAction = () => {
    if (actionSlot) return actionSlot;
    if (!action) return null;

    const { label, icon, iconAfter, children, className: actionClass, ...pressableProps } = action;
    return (
      <Pressable
        className={cn("font-medium hover:underline", actionClass, actionClassName)}
        {...pressableProps}
      >
        {children ?? (
          <>
            {icon}
            {label}
            {iconAfter ?? (
              <DynamicIcon
                name="lucide/move-right"
                size={20}
                className="ml-2 inline"
              />
            )}
          </>
        )}
      </Pressable>
    );
  };

  const renderImages = () => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return images.map((image, index) => (
      <CarouselItem key={index} className={cn("basis-auto", itemClassName)}>
        <div className="max-h-80 max-w-60">
          <Img
            src={image.src}
            alt={image.alt || "Gallery image"}
            className={cn(
              "mt-7 h-full w-full rounded-md object-cover",
              index % 2 === 0 && "mt-16",
              image.className,
              imageClassName
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
      <div className={cn("mb-12 grid grid-cols-1 gap-x-12 gap-y-6 md:mb-16 md:grid-cols-2 md:gap-x-24", headerClassName)}>
        <div className="flex flex-col gap-8 md:gap-12">
          {heading && (
            typeof heading === "string" ? (
              <h1 className={cn("text-3xl font-bold md:text-4xl", headingClassName)}>
                {heading}
              </h1>
            ) : (
              <div className={headingClassName}>{heading}</div>
            )
          )}
        </div>
        {description && (
          typeof description === "string" ? (
            <p className={descriptionClassName}>{description}</p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          )
        )}
        {renderAction()}
      </div>
      <div className="w-full -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="max-w-screen overflow-x-hidden">
          <Carousel
            opts={{
              loop: true,
            }}
            plugins={[
              AutoScroll({
                speed: autoScrollSpeed,
              }),
            ]}
            className={cn("pointer-events-none", carouselClassName)}
          >
            <CarouselContent className={carouselContentClassName}>
              {renderImages()}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </Section>
  );
}
