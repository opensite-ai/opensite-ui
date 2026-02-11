"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Img } from "@page-speed/img";
import { AspectRatio } from "../../ui/aspect-ratio";
import { Section } from "../../ui/section";
import type {
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

/**
 * Configuration for the testimonial section
 */
export interface TestimonialConfig {
  /**
   * Testimonial quote text
   */
  quote: string;
  /**
   * Author name
   */
  author: string;
  /**
   * Author role/title
   */
  role: string;
  /**
   * Company name
   */
  company: string;
  /**
   * Avatar images for the testimonial
   */
  avatars: Array<{
    image: string;
    fallback: string;
  }>;
}

/**
 * Configuration for grid images
 */
export interface GridImageConfig {
  /**
   * Image source URL
   */
  src: string;
  /**
   * Alt text for the image
   */
  alt?: string;
}

export interface HeroTestimonialImageGridProps {
  /**
   * Main heading text
   */
  heading?: React.ReactNode;
  /**
   * Supporting description text
   */
  description?: React.ReactNode;
  /**
   * Primary button configuration
   */
  button?: {
    text: string;
    url: string;
  };
  /**
   * Custom slot for button (overrides button prop)
   */
  buttonSlot?: React.ReactNode;
  /**
   * Testimonial configuration
   */
  testimonial?: TestimonialConfig;
  /**
   * Custom slot for testimonial (overrides testimonial prop)
   */
  testimonialSlot?: React.ReactNode;
  /**
   * Grid images configuration (4 images for the grid)
   */
  gridImages?: GridImageConfig[];
  /**
   * Custom slot for images grid (overrides gridImages)
   */
  imagesSlot?: React.ReactNode;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Background pattern
   */
  pattern?: PatternName;
  /**
   * Pattern opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

/**
 * HeroTestimonialImageGrid - A hero layout with heading, description, testimonial,
 * and a creative 2x2 image grid. Ideal for showcasing product features or portfolio work.
 */
export function HeroTestimonialImageGrid({
  heading,
  description,
  button,
  buttonSlot,
  testimonial,
  testimonialSlot,
  gridImages,
  imagesSlot,
  background,
  spacing = "py-32 md:py-32",
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  headingClassName,
  descriptionClassName,
  optixFlowConfig,
}: HeroTestimonialImageGridProps): React.JSX.Element {
  const renderButton = useMemo(() => {
    if (buttonSlot) return buttonSlot;
    if (!button || !button.url) return null;

    return (
      <Pressable href={button.url} asButton size="lg" variant="default">
        {button.text}
      </Pressable>
    );
  }, [buttonSlot, button]);

  const renderTestimonial = useMemo(() => {
    if (testimonialSlot) return testimonialSlot;
    if (!testimonial || !testimonial.avatars) return null;

    return (
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex -space-x-2">
          {testimonial.avatars.map((avatar, index) => (
            <Avatar
              key={index}
              className="size-10 border-2 border-border"
            >
              <AvatarImage src={avatar.image} alt="" />
              <AvatarFallback>{avatar.fallback}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <div>
          <p className="mb-1 text-sm text-foreground/60 italic">
            &quot;{testimonial.quote}&quot;
          </p>
          <p className="text-sm font-medium text-foreground/60">
            {testimonial.author}, {testimonial.role} @
            {testimonial.company}
          </p>
        </div>
      </div>
    );
  }, [testimonialSlot, testimonial]);

  const renderImagesGrid = useMemo(() => {
    if (imagesSlot) return imagesSlot;
    if (!gridImages || gridImages.length < 4) return null;

    const images = gridImages;

    return (
      <div className="w-full flex-1">
        <div className="w-full max-w-200">
          <AspectRatio ratio={1 / 1} className="h-full w-full">
            <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-[3.5%]">
              <div className="overflow-hidden rounded-[5.2%] border border-border bg-card">
                <Img
                  src={images[0].src}
                  alt={images[0].alt || ""}
                  className="object-fit h-full w-full object-center"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
              <div className="relative overflow-hidden rounded-[5.2%] border border-border bg-card">
                <div className="absolute top-1/2 left-[5%] w-[110%] max-w-100 -translate-y-1/2 overflow-hidden rounded-md">
                  <AspectRatio ratio={1.739130435 / 1}>
                    <Img
                      src={images[1].src}
                      alt={images[1].alt || ""}
                      className="size-full object-cover object-center"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </AspectRatio>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-[5.2%] border border-border bg-card">
                <div className="absolute top-[9%] left-[9%] w-[200%] max-w-150 overflow-hidden rounded-md">
                  <AspectRatio ratio={1.6 / 1}>
                    <Img
                      src={images[2].src}
                      alt={images[2].alt || ""}
                      className="size-full object-cover object-center"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </AspectRatio>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-[5.2%] border border-border bg-card">
                <div className="relative top-[12%] left-[50%] w-[70%] max-w-70 -translate-x-[50%]">
                  <AspectRatio ratio={0.52 / 1}>
                    <Img
                      src={images[3].src}
                      alt={images[3].alt || ""}
                      className="absolute z-10 w-full rounded-[16%]"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </AspectRatio>
                </div>
              </div>
            </div>
          </AspectRatio>
        </div>
      </div>
    );
  }, [imagesSlot, gridImages, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("relative flex items-center justify-center py-12 md:py-20", className)}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <div className="flex-1">
            <div className="flex flex-col gap-4 lg:gap-8">
              {heading && (
                typeof heading === "string" ? (
                  <h1 className={cn("leading-tighter max-w-[80%] text-4xl font-semibold tracking-tight lg:text-5xl xl:text-7xl", headingClassName)}>
                    {heading}
                  </h1>
                ) : (
                  <h1 className={cn("leading-tighter max-w-[80%] text-4xl font-semibold tracking-tight lg:text-5xl xl:text-7xl", headingClassName)}>
                    {heading}
                  </h1>
                )
              )}
              {description && (
                typeof description === "string" ? (
                  <p className={cn("text-lg leading-relaxed text-muted-foreground xl:text-2xl", descriptionClassName)}>
                    {description}
                  </p>
                ) : (
                  <div className={cn("text-lg leading-relaxed text-muted-foreground xl:text-2xl", descriptionClassName)}>
                    {description}
                  </div>
                )
              )}
            </div>
            <div className="my-6 lg:my-10">
              {renderButton}
            </div>
            {renderTestimonial}
          </div>
          {renderImagesGrid}
        </div>
      </div>
    </Section>
  );
}
