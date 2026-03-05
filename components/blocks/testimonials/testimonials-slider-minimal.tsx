"use client";

import * as React from "react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  TestimonialItem,
} from "../../../src/types";

export interface TestimonialsSliderMinimalProps {
  /**
   * Array of testimonials to display
   */
  testimonials?: TestimonialItem[];
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
   * Additional CSS classes for the avatar
   */
  avatarClassName?: string;
  /**
   * Additional CSS classes for the dots navigation
   */
  dotsClassName?: string;
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
   * Additional CSS classes for the navigation buttons
   */
  navButtonClassName?: string;
}

/**
 * TestimonialsSliderMinimal - A clean, auto-rotating testimonial slider with minimal
 * design. Features smooth fade transitions between testimonials, centered layout with
 * large quotes, and author information with avatars. Includes dot indicators for manual
 * navigation. The auto-play interval is configurable. Perfect for hero sections or
 * anywhere a focused, single-testimonial display is needed.
 *
 * @example
 * ```tsx
 * <TestimonialsSliderMinimal
 *   testimonials={[
 *     {
 *       quote: "Amazing product that changed our workflow...",
 *       author: "Jane D.",
 *       role: "CEO at TechCo",
 *       avatarSrc: "/avatars/jane.jpg"
 *     }
 *   ]}
 *   autoPlayInterval={5000}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function TestimonialsSliderMinimal({
  testimonials,
  testimonialsSlot,
  autoPlayInterval,
  className,
  contentClassName,
  quoteClassName,
  authorClassName,
  avatarClassName,
  navButtonClassName,
  dotsClassName,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  pattern,
  patternOpacity,
}: TestimonialsSliderMinimalProps): React.JSX.Element {
  const [isTransitioning, setIsTransitioning] = useState(false);
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

  const effectiveAutoPlayInterval = autoPlayInterval ?? 5000;

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentIndex) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsTransitioning(false);
      }, 300);
    },
    [currentIndex],
  );

  useEffect(() => {
    if (effectiveAutoPlayInterval <= 0 || totalTestimonials === 0) return;

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % totalTestimonials;
      goToSlide(nextIndex);
    }, effectiveAutoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, effectiveAutoPlayInterval, totalTestimonials, goToSlide]);

  const current = testimonials?.[currentIndex];

  const getAuthorName = useCallback((testimonial: TestimonialItem): string => {
    if (typeof testimonial.author === "string") return testimonial.author;
    return "";
  }, []);

  const getAvatarSrc = useCallback(
    (testimonial: TestimonialItem): string | undefined => {
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
      <div
        className={cn(
          "transition-opacity duration-500 space-y-12 md:space-y-24",
          isTransitioning ? "opacity-0" : "opacity-100",
        )}
      >
        {current.quote &&
          (typeof current.quote === "string" ? (
            <blockquote
              className={cn(
                "text-xl font-thin leading-relaxed md:text-2xl text-balance",
                quoteClassName,
              )}
            >
              &ldquo;{current.quote}&rdquo;
            </blockquote>
          ) : (
            current.quote
          ))}

        <div
          className={cn(
            "mt-8 flex flex-col items-center gap-6 md:gap-12",
            authorClassName,
          )}
        >
          <Avatar
            className={cn(
              "relative flex shrink-0 overflow-hidden rounded-3xl ring-8 ring-primary shadow-xl size-24",
              avatarClassName,
            )}
          >
            <AvatarImage src={avatarSrc} alt={authorName} />
            <AvatarFallback>{getInitials(authorName)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center gap-0">
            {current.author &&
              (typeof current.author === "string" ? (
                <p className="font-semibold">{current.author}</p>
              ) : (
                current.author
              ))}
            {current.role &&
              (typeof current.role === "string" ? (
                <p className="text-sm ">{current.role}</p>
              ) : (
                current.role
              ))}
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
    );
  }, [
    testimonialsSlot,
    isTransitioning,
    current,
    quoteClassName,
    authorClassName,
    avatarClassName,
    getAuthorName,
    getAvatarSrc,
    getInitials,
  ]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className={cn("mx-auto max-w-3xl text-center", contentClassName)}>
        {renderedTestimonial}

        {testimonials && testimonials.length > 0 && (
          <div className={cn("mt-8 flex justify-center gap-2", dotsClassName)}>
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
        )}
      </div>
    </Section>
  );
}
