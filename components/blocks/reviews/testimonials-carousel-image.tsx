"use client";

import * as React from "react";
import { useState, useCallback, useMemo } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type {
  OptixFlowConfig,
  TestimonialItem,
  SectionBackground,
} from "../../../src/types";

/**
 * Extended testimonial item with background image for carousel
 */
export interface CarouselTestimonialItem extends TestimonialItem {
  /**
   * Background image URL for the slide
   */
  backgroundImage?: string;
}

export interface TestimonialsCarouselImageProps {
  /**
   * Array of testimonials to display in the carousel
   */
  testimonials?: CarouselTestimonialItem[];
  /**
   * Custom slot for rendering testimonials (overrides testimonials array)
   */
  testimonialsSlot?: React.ReactNode;
  /**
   * Height of the carousel section
   */
  height?: string;
  /**
   * Overlay opacity (0-1)
   */
  overlayOpacity?: number;
  /**
   * Aria label for the previous button
   */
  previousButtonAriaLabel?: string;
  /**
   * Aria label for the next button
   */
  nextButtonAriaLabel?: string;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the content container
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the quote icon
   */
  quoteIconClassName?: string;
  /**
   * Additional CSS classes for the quote text
   */
  quoteClassName?: string;
  /**
   * Additional CSS classes for the author section
   */
  authorClassName?: string;
  /**
   * Additional CSS classes for the navigation container
   */
  navigationClassName?: string;
  /**
   * Additional CSS classes for the navigation buttons
   */
  navButtonClassName?: string;
  /**
   * Additional CSS classes for the dot indicators
   */
  dotsClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
}

/**
 * TestimonialsCarouselImage - A full-width image carousel testimonial section with
 * large background images, overlay gradients, and navigation controls. Each slide
 * displays a prominent quote with author information over a visually striking image.
 * Features previous/next navigation buttons and dot indicators. Perfect for hero
 * sections or impactful testimonial showcases requiring visual storytelling.
 *
 * @example
 * ```tsx
 * <TestimonialsCarouselImage
 *   testimonials={[
 *     {
 *       quote: "This service transformed our business...",
 *       author: "Jane D.",
 *       role: "CEO",
 *       company: "TechCo",
 *       backgroundImage: "/images/testimonial-bg-1.jpg"
 *     }
 *   ]}
 *   height="h-[600px] md:h-[700px]"
 *   overlayOpacity={0.6}
 * />
 * ```
 */
export function TestimonialsCarouselImage({
  testimonials,
  testimonialsSlot,
  height,
  overlayOpacity,
  previousButtonAriaLabel,
  nextButtonAriaLabel,
  className,
  contentClassName,
  quoteIconClassName,
  quoteClassName,
  authorClassName,
  navigationClassName,
  navButtonClassName,
  dotsClassName,
  optixFlowConfig,
}: TestimonialsCarouselImageProps): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalTestimonials = testimonials?.length ?? 0;

  const goToPrevious = useCallback(() => {
    if (totalTestimonials === 0) return;
    setCurrentIndex((prev) =>
      prev === 0 ? totalTestimonials - 1 : prev - 1
    );
  }, [totalTestimonials]);

  const goToNext = useCallback(() => {
    if (totalTestimonials === 0) return;
    setCurrentIndex((prev) =>
      prev === totalTestimonials - 1 ? 0 : prev + 1
    );
  }, [totalTestimonials]);

  const current = testimonials?.[currentIndex];

  const renderedTestimonialContent = useMemo(() => {
    if (testimonialsSlot) return testimonialsSlot;
    if (!current) return null;

    return (
      <div className={cn("mx-auto max-w-4xl text-center text-background", contentClassName)}>
        <DynamicIcon
          name="lucide/quote"
          size={48}
          className={cn("mx-auto mb-6 opacity-50", quoteIconClassName)}
        />
        {current.quote && (
          typeof current.quote === "string" ? (
            <blockquote className={cn("text-2xl font-light leading-relaxed md:text-4xl", quoteClassName)}>
              &ldquo;{current.quote}&rdquo;
            </blockquote>
          ) : (
            <div className={quoteClassName}>{current.quote}</div>
          )
        )}
        <div className={cn("mt-8", authorClassName)}>
          {current.author && (
            typeof current.author === "string" ? (
              <p className="text-lg font-semibold">{current.author}</p>
            ) : (
              current.author
            )
          )}
          {(current.role || current.company) && (
            <p className="text-sm opacity-80">
              {current.role && (
                typeof current.role === "string" ? current.role : current.role
              )}
              {current.company && (
                typeof current.company === "string"
                  ? `, ${current.company}`
                  : current.company
              )}
            </p>
          )}
        </div>
      </div>
    );
  }, [testimonialsSlot, contentClassName, quoteIconClassName, current, quoteClassName, authorClassName]);

  return (
    <section className={cn("relative", height, className)}>
      <div className="absolute inset-0">
        {current?.backgroundImage && (
          <Img
            src={current.backgroundImage}
            alt=""
            className="size-full object-cover"
            optixFlowConfig={optixFlowConfig}
          />
        )}
        <div
          className="absolute inset-0 bg-foreground"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        {renderedTestimonialContent}

        <div className={cn("absolute bottom-8 left-0 right-0 flex items-center justify-center gap-4", navigationClassName)}>
          <Pressable
            asButton
            variant="ghost"
            size="icon"
            className={cn("size-10 rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20", navButtonClassName)}
            onClick={goToPrevious}
            aria-label={previousButtonAriaLabel ?? "Previous testimonial"}
          >
            <DynamicIcon name="lucide/chevron-left" size={24} />
          </Pressable>

          <div className={cn("flex gap-2", dotsClassName)}>
            {testimonials?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "size-2 rounded-full transition-all",
                  index === currentIndex
                    ? "w-6 bg-white"
                    : "bg-white/40 hover:bg-white/60"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Pressable
            asButton
            variant="ghost"
            size="icon"
            className={cn("size-10 rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20", navButtonClassName)}
            onClick={goToNext}
            aria-label={nextButtonAriaLabel ?? "Next testimonial"}
          >
            <DynamicIcon name="lucide/chevron-right" size={24} />
          </Pressable>
        </div>
      </div>
    </section>
  );
}
