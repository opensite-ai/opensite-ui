"use client";

import * as React from "react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  TestimonialItem,
} from "../../../src/types";

export interface TestimonialsMinimalNumberedProps {
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
   * Additional CSS classes for the number indicator
   */
  numberClassName?: string;
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
   * Additional CSS classes for the container
   */
  containerClassName?: string;
}

/**
 * TestimonialsMinimalNumbered - A minimal testimonial slider featuring large numbered
 * indicators (01, 02, 03) that transition with the content. Displays one testimonial
 * at a time with smooth fade transitions, author information with avatar, and navigation
 * controls. The oversized numbers create a distinctive visual element. Includes auto-play
 * and manual navigation via line indicators and arrow buttons.
 *
 * @example
 * ```tsx
 * <TestimonialsMinimalNumbered
 *   testimonials={[
 *     {
 *       quote: "Amazing product that changed our workflow...",
 *       author: "Jane D.",
 *       role: "CEO",
 *       company: "TechCo",
 *       avatarSrc: "/avatars/jane.jpg"
 *     }
 *   ]}
 *   autoPlayInterval={5000}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function TestimonialsMinimalNumbered({
  testimonials,
  testimonialsSlot,
  autoPlayInterval,
  className,
  contentClassName,
  numberClassName,
  quoteClassName,
  authorClassName,
  navigationClassName,
  background,
  spacing = "py-8 md:py-12",
  containerClassName = "w-full px-6 sm:px-6 md:px-8 lg:px-0 max-w-full md:max-w-lg min-h-70dvh h-70dvh flex flex-col items-center justify-center",
  pattern,
  patternOpacity,
}: TestimonialsMinimalNumberedProps): React.JSX.Element {
  const [active, setActive] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalTestimonials = testimonials?.length ?? 0;
  const effectiveAutoPlayInterval = autoPlayInterval ?? 5000;

  const handleChange = useCallback(
    (index: number) => {
      if (index === active || isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setActive(index);
        setIsTransitioning(false);
      }, 300);
    },
    [active, isTransitioning],
  );

  const handlePrev = useCallback(() => {
    if (totalTestimonials === 0) return;
    const newIndex = (active - 1 + totalTestimonials) % totalTestimonials;
    handleChange(newIndex);
  }, [active, totalTestimonials, handleChange]);

  const handleNext = useCallback(() => {
    if (totalTestimonials === 0) return;
    const newIndex = (active + 1) % totalTestimonials;
    handleChange(newIndex);
  }, [active, totalTestimonials, handleChange]);

  useEffect(() => {
    if (effectiveAutoPlayInterval <= 0 || totalTestimonials === 0) return;

    const interval = setInterval(handleNext, effectiveAutoPlayInterval);
    return () => clearInterval(interval);
  }, [effectiveAutoPlayInterval, handleNext, totalTestimonials]);

  const current = testimonials?.[active];

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
      <div className={cn("flex items-start gap-4 md:gap-8", contentClassName)}>
        <span
          className={cn(
            "text-4xl md:text-8xl font-light leading-none select-none transition-all duration-500",
            numberClassName,
          )}
          style={{ fontFeatureSettings: '"tnum"' }}
        >
          {String(active + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 pt-0 md:pt-6">
          {current.quote &&
            (typeof current.quote === "string" ? (
              <blockquote
                className={cn(
                  "text-xl font-light leading-relaxed tracking-tight transition-all duration-300 md:text-2xl lg:text-3xl",
                  isTransitioning
                    ? "opacity-0 translate-x-4"
                    : "opacity-100 translate-x-0",
                  quoteClassName,
                )}
              >
                {current.quote}
              </blockquote>
            ) : (
              <div
                className={cn(
                  "transition-all duration-300",
                  isTransitioning
                    ? "opacity-0 translate-x-4"
                    : "opacity-100 translate-x-0",
                  quoteClassName,
                )}
              >
                {current.quote}
              </div>
            ))}

          <div
            className={cn(
              "mt-10 transition-all duration-300 delay-100",
              isTransitioning ? "opacity-0" : "opacity-100",
              authorClassName,
            )}
          >
            <div className="flex items-center gap-4">
              <Avatar className="size-12 ring-2">
                <AvatarImage src={avatarSrc} alt={authorName} />
                <AvatarFallback>{getInitials(authorName)}</AvatarFallback>
              </Avatar>
              <div>
                {current.author &&
                  (typeof current.author === "string" ? (
                    <p className="font-medium">{current.author}</p>
                  ) : (
                    current.author
                  ))}
                <p className="text-sm">
                  {current.role &&
                    (typeof current.role === "string" ? current.role : null)}
                  {current.company &&
                    (typeof current.company === "string" ? (
                      <>
                        <span className="mx-2 ">/</span>
                        <span>{current.company}</span>
                      </>
                    ) : null)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }, [
    testimonialsSlot,
    contentClassName,
    numberClassName,
    active,
    current,
    isTransitioning,
    quoteClassName,
    authorClassName,
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
      <div className="max-w-4xl mx-auto">
        {renderedTestimonial}

        <div
          className={cn(
            "mt-16 flex items-center justify-between",
            navigationClassName,
          )}
        >
          <div className="flex items-center gap-6">
            {testimonials && testimonials.length > 0 && (
              <>
                <div className="flex items-center gap-3">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleChange(index)}
                      className="group relative py-4"
                    >
                      <span
                        className={cn(
                          "block h-px transition-all duration-500 ease-out",
                          index === active ? "w-12 " : "w-6  group-hover:w-8 ",
                        )}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-xs tracking-widest  uppercase">
                  {String(active + 1).padStart(2, "0")} /{" "}
                  {String(testimonials.length).padStart(2, "0")}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="rounded-full p-2 transition-all duration-300 "
            >
              <DynamicIcon name="lucide/chevron-left" size={24} />
            </button>
            <button
              onClick={handleNext}
              className="rounded-full p-2  transition-all duration-300 "
            >
              <DynamicIcon name="lucide/chevron-right" size={24} />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
