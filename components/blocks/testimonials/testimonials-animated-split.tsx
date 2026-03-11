"use client";

import * as React from "react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Section } from "../../ui/section";
import { Img } from "@page-speed/img";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  TestimonialItem,
  OptixFlowConfig,
} from "../../../src/types";

/**
 * Extended testimonial item with image for animated split display
 */
export interface AnimatedSplitTestimonialItem extends TestimonialItem {
  /**
   * Image URL for the testimonial
   */
  image?: string;
}

export interface TestimonialsAnimatedSplitProps {
  /**
   * Array of testimonials to display
   */
  testimonials?: AnimatedSplitTestimonialItem[];
  /**
   * Custom slot for rendering testimonials (overrides testimonials array)
   */
  testimonialsSlot?: React.ReactNode;
  /**
   * Auto-play interval in milliseconds (0 to disable)
   */
  autoPlayInterval?: number;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the image container
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for the content container
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the quote text
   */
  quoteClassName?: string;
  /**
   * Additional CSS classes for the author section
   */
  authorClassName?: string;
  /**
   * Additional CSS classes for the navigation controls
   */
  navigationClassName?: string;
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
   * OptixFlow image optimization config
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * TestimonialsAnimatedSplit - An animated split-screen testimonial section with smooth
 * transitions powered by Framer Motion. Features a large image on one side and animated
 * quote content on the other. Includes auto-play functionality, navigation dots, and
 * previous/next buttons. The animations create an engaging, premium feel. Perfect for
 * hero sections or featured testimonial showcases.
 *
 * @example
 * ```tsx
 * <TestimonialsAnimatedSplit
 *   testimonials={[
 *     {
 *       quote: "This service transformed our business...",
 *       author: "Jane D.",
 *       role: "CEO",
 *       company: "TechCo",
 *       avatarSrc: "/avatars/jane.jpg",
 *       image: "/images/testimonial-1.jpg"
 *     }
 *   ]}
 *   autoPlayInterval={6000}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function TestimonialsAnimatedSplit({
  sectionId = "testimonials-animated-split",
  testimonials,
  testimonialsSlot,
  autoPlayInterval,
  className,
  imageClassName,
  contentClassName,
  quoteClassName,
  authorClassName,
  navigationClassName,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: TestimonialsAnimatedSplitProps): React.JSX.Element {
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
    setCurrentIndex((prev) => (prev + 1) % totalTestimonials);
    resetAutoPlay();
  }, [totalTestimonials, resetAutoPlay]);

  const goToPrev = useCallback(() => {
    if (totalTestimonials === 0) return;
    setCurrentIndex(
      (prev) => (prev - 1 + totalTestimonials) % totalTestimonials,
    );
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

  const getAuthorName = useCallback(
    (testimonial: AnimatedSplitTestimonialItem): string => {
      if (typeof testimonial.author === "string") return testimonial.author;
      return "";
    },
    [],
  );

  const getAvatarSrc = useCallback(
    (testimonial: AnimatedSplitTestimonialItem): string | undefined => {
      return testimonial.avatarSrc || testimonial.avatar?.src;
    },
    [],
  );

  const getInitials = useCallback((name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  }, []);

  const renderedTestimonial = useMemo(() => {
    if (testimonialsSlot) return testimonialsSlot;
    if (!current) return null;

    const authorName = getAuthorName(current);
    const avatarSrc = getAvatarSrc(current);

    return (
      <div className="grid items-center gap-12 lg:gap-24 lg:grid-cols-2">
        <div
          className={cn(
            "relative aspect-4/3 overflow-hidden rounded-2xl lg:aspect-square shadow-2xl",
            imageClassName,
          )}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {current.image && (
                <Img
                  src={current.image}
                  alt="Testimonial"
                  className="size-full object-cover "
                  optixFlowConfig={optixFlowConfig}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={cn("space-y-8", contentClassName)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-4 md:space-y-6"
            >
              <DynamicIcon name="mdi/comment-quote-outline" size={48} />

              {current.quote &&
                (typeof current.quote === "string" ? (
                  <blockquote
                    className={cn(
                      "text-base md:text-lg font-thin leading-normal md:leading-relaxed md:text-2xl line-clamp-4",
                      quoteClassName,
                    )}
                  >
                    {current.quote}
                  </blockquote>
                ) : (
                  current.quote
                ))}

              <div className={cn("flex items-center gap-4", authorClassName)}>
                <Avatar className="size-12">
                  <AvatarImage src={avatarSrc} alt={authorName} />
                  <AvatarFallback>{getInitials(authorName)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-1">
                    {current.author &&
                      (typeof current.author === "string" ? (
                        <span className="text-sm md:text-base font-semibold">
                          {current.author}
                        </span>
                      ) : (
                        current.author
                      ))}
                    <span className="text-sm md:text-base font-normal tracking-normal md:tracking-wide">
                      {current.role &&
                        (typeof current.role === "string"
                          ? current.role
                          : null)}
                      {current.company &&
                        (typeof current.company === "string"
                          ? ` at ${current.company}`
                          : null)}
                    </span>
                  </div>
                  {current.linkConfig?.href && (
                    <Pressable
                      href={current.linkConfig.href}
                      className={cn(
                        current.linkConfig.className,
                        "text-sm font-bold tracking-wide uppercase",
                        "hover:underline hover:underline-offset-2",
                      )}
                    >
                      {current.linkConfig.label}
                    </Pressable>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className={cn("flex items-center gap-4", navigationClassName)}>
            <button
              onClick={goToPrev}
              className="flex size-10 items-center justify-center rounded-full border transition-colors"
              aria-label="Previous testimonial"
            >
              <DynamicIcon name="lucide/chevron-left" size={20} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={cn(
                    "size-2 rounded-full transition-all",
                    index === currentIndex
                      ? "w-6 bg-primary text-primary-foreground"
                      : "bg-card text-card-foreground",
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="flex size-10 items-center justify-center rounded-full border transition-colors"
              aria-label="Next testimonial"
            >
              <DynamicIcon name="lucide/chevron-right" size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }, [
    testimonialsSlot,
    imageClassName,
    currentIndex,
    current,
    optixFlowConfig,
    contentClassName,
    quoteClassName,
    authorClassName,
    navigationClassName,
    testimonials,
    goToPrev,
    goToNext,
    goToIndex,
    getAuthorName,
    getAvatarSrc,
    getInitials,
  ]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("overflow-hidden", className)}
      containerClassName={containerClassName}
    >
      {renderedTestimonial}
    </Section>
  );
}
