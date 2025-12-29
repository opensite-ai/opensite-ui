"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Section } from "../../ui/section";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
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
  pattern?: PatternName | string;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      "This platform has completely transformed how our team collaborates. The intuitive interface and powerful features have made us significantly more productive.",
    author: "Sarah Chen",
    role: "Product Manager at TechCorp",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar1,
  },
  {
    quote:
      "I've tried dozens of similar tools, but nothing comes close to the elegance and functionality of this solution. It's become indispensable to our workflow.",
    author: "Michael Torres",
    role: "CEO at StartupXYZ",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar2,
  },
  {
    quote:
      "The customer support is exceptional. Any time we've had questions, the team has been incredibly responsive and helpful. Truly a pleasure to work with.",
    author: "Emily Watson",
    role: "Operations Lead at GrowthCo",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar3,
  },
];

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
  testimonials = DEFAULT_TESTIMONIALS,
  testimonialsSlot,
  autoPlayInterval = 5000,
  className,
  contentClassName,
  quoteClassName,
  authorClassName,
  avatarClassName,
  dotsClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
}: TestimonialsSliderMinimalProps): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentIndex) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsTransitioning(false);
      }, 300);
    },
    [currentIndex]
  );

  useEffect(() => {
    if (autoPlayInterval <= 0) return;

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % testimonials.length;
      goToSlide(nextIndex);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, autoPlayInterval, testimonials.length, goToSlide]);

  const current = testimonials[currentIndex];

  const getAuthorName = (testimonial: TestimonialItem): string => {
    if (typeof testimonial.author === "string") return testimonial.author;
    return "";
  };

  const getAvatarSrc = (testimonial: TestimonialItem): string | undefined => {
    return testimonial.avatarSrc || testimonial.avatar?.src;
  };

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  const renderTestimonial = () => {
    if (testimonialsSlot) return testimonialsSlot;

    const authorName = getAuthorName(current);
    const avatarSrc = getAvatarSrc(current);

    return (
      <div
        className={cn(
          "transition-opacity duration-300",
          isTransitioning ? "opacity-0" : "opacity-100"
        )}
      >
        {current.quote && (
          typeof current.quote === "string" ? (
            <blockquote className={cn("text-xl font-medium leading-relaxed md:text-2xl lg:text-3xl", quoteClassName)}>
              &ldquo;{current.quote}&rdquo;
            </blockquote>
          ) : (
            <div className={quoteClassName}>{current.quote}</div>
          )
        )}

        <div className={cn("mt-8 flex flex-col items-center gap-4", authorClassName)}>
          <Avatar className={cn("size-14", avatarClassName)}>
            <AvatarImage
              src={avatarSrc}
              alt={authorName}
            />
            <AvatarFallback>
              {getInitials(authorName)}
            </AvatarFallback>
          </Avatar>
          <div>
            {current.author && (
              typeof current.author === "string" ? (
                <p className="font-semibold">{current.author}</p>
              ) : (
                current.author
              )
            )}
            {current.role && (
              typeof current.role === "string" ? (
                <p className="text-sm text-muted-foreground">
                  {current.role}
                </p>
              ) : (
                current.role
              )
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <div className={cn("mx-auto max-w-3xl text-center", contentClassName)}>
        {renderTestimonial()}

        <div className={cn("mt-8 flex justify-center gap-2", dotsClassName)}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "size-2 rounded-full transition-all",
                index === currentIndex
                  ? "w-6 bg-primary"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
