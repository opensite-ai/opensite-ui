"use client";

import * as React from "react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  TestimonialItem,
  SectionBackground,
  SectionSpacing,
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
   * Additional CSS classes for the company logo
   */
  logoClassName?: string;
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
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Auto-play interval in milliseconds (0 to disable)
   */
  autoPlayInterval?: number;
  /** Optional Section ID */
  sectionId?: string;
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
  sectionId = "testimonials-carousel-image",
  testimonials,
  testimonialsSlot,
  autoPlayInterval,
  height = "h-70dvh lg:h-60dvh",
  overlayOpacity = 0.6,
  previousButtonAriaLabel,
  nextButtonAriaLabel,
  className,
  contentClassName,
  quoteIconClassName,
  logoClassName,
  quoteClassName,
  authorClassName,
  navigationClassName,
  navButtonClassName,
  dotsClassName,
  optixFlowConfig,
  background,
  containerClassName = "mx-0 w-screen px-0 sm:px-0 lg:px-0 max-w-screen relative z-10 h-full",
  spacing = "none",
  pattern,
  patternOpacity,
}: TestimonialsCarouselImageProps): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalTestimonials = testimonials?.length ?? 0;
  const autoPlayTimerRef = React.useRef<ReturnType<typeof setInterval> | null>(
    null,
  );

  const resetAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
    if (!autoPlayInterval || autoPlayInterval <= 0 || totalTestimonials === 0)
      return;
    autoPlayTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalTestimonials);
    }, autoPlayInterval);
  }, [autoPlayInterval, totalTestimonials]);

  const goToNext = useCallback(() => {
    if (totalTestimonials === 0) return;
    setCurrentIndex((prev) => (prev === totalTestimonials - 1 ? 0 : prev + 1));
    resetAutoPlay();
  }, [totalTestimonials, resetAutoPlay]);

  const goToPrevious = useCallback(() => {
    if (totalTestimonials === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? totalTestimonials - 1 : prev - 1));
    resetAutoPlay();
  }, [totalTestimonials, resetAutoPlay]);

  const goToIndex = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      resetAutoPlay();
    },
    [resetAutoPlay],
  );

  useEffect(() => {
    resetAutoPlay();
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [resetAutoPlay]);

  const current = testimonials?.[currentIndex];

  const renderedTestimonialContent = useMemo(() => {
    if (testimonialsSlot) return testimonialsSlot;
    if (!current) return null;

    return (
      <div
        className={cn(
          "mx-auto max-w-full md:max-w-md text-center text-shadow-lg text-white pb-32 pt-20",
          contentClassName,
        )}
      >
        {current?.logoSrc ? (
          <Img
            src={current.logoSrc}
            alt={
              typeof current.company === "string"
                ? `${current.company} logo`
                : typeof current.author === "string"
                  ? `${current.author} company logo`
                  : "Company logo"
            }
            className={cn(
              "mx-auto mb-6 max-h-12 max-w-32 object-contain md:max-h-16 md:max-w-48",
              logoClassName,
            )}
            optixFlowConfig={optixFlowConfig}
          />
        ) : (
          <DynamicIcon
            name="mdi/comment-quote-outline"
            size={48}
            className={cn("mx-auto mb-6 opacity-50", quoteIconClassName)}
          />
        )}
        {current.quote &&
          (typeof current.quote === "string" ? (
            <blockquote
              className={cn(
                "text-xl font-light leading-relaxed md:text-2xl text-balance",
                quoteClassName,
              )}
            >
              &ldquo;{current.quote}&rdquo;
            </blockquote>
          ) : (
            <div className={quoteClassName}>{current.quote}</div>
          ))}
        <div
          className={cn(
            "mt-8 text-balance flex flex-col items-center",
            authorClassName,
          )}
        >
          {current.author &&
            (typeof current.author === "string" ? (
              <p className="text-lg font-semibold">{current.author}</p>
            ) : (
              current.author
            ))}
          {(current.role || current.company) && (
            <p className="text-sm opacity-80">
              {current.role &&
                (typeof current.role === "string"
                  ? current.role
                  : current.role)}
              {current.company &&
                (typeof current.company === "string"
                  ? `, ${current.company}`
                  : current.company)}
            </p>
          )}
          {current.linkConfig?.href && (
            <Pressable
              href={current.linkConfig.href}
              className={cn(
                "transition-all duration-500",
                "hover:underline hover:underline-offset-4",
                "text-sm",
                current.linkConfig.className,
              )}
            >
              {current.linkConfig.label}
            </Pressable>
          )}
        </div>
      </div>
    );
  }, [
    testimonialsSlot,
    contentClassName,
    quoteIconClassName,
    logoClassName,
    optixFlowConfig,
    current,
    quoteClassName,
    authorClassName,
  ]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("relative", height, className)}
      containerClassName={containerClassName}
    >
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          {current?.backgroundImage && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Img
                src={current.backgroundImage}
                alt="Testimonial background image"
                className="size-full object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {renderedTestimonialContent}
          </motion.div>
        </AnimatePresence>

        <div
          className={cn(
            "absolute bottom-8 left-0 right-0 flex items-center justify-center gap-4",
            navigationClassName,
          )}
        >
          <Pressable
            asButton
            variant="default"
            size="icon"
            className={cn("size-10 rounded-full", navButtonClassName)}
            onClick={goToPrevious}
            aria-label={previousButtonAriaLabel ?? "Previous testimonial"}
          >
            <DynamicIcon name="lucide/chevron-left" size={24} />
          </Pressable>

          <div className={cn("flex gap-2", dotsClassName)}>
            {testimonials?.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={cn(
                  "size-2 rounded-full transition-all",
                  index === currentIndex
                    ? "w-6 bg-primary"
                    : "bg-white/40 hover:bg-white/60",
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Pressable
            asButton
            variant="default"
            size="icon"
            className={cn("size-10 rounded-full", navButtonClassName)}
            onClick={goToNext}
            aria-label={nextButtonAriaLabel ?? "Next testimonial"}
          >
            <DynamicIcon name="lucide/chevron-right" size={24} />
          </Pressable>
        </div>
      </div>
    </Section>
  );
}
