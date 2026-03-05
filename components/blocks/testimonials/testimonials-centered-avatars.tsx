"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  TestimonialItem,
} from "../../../src/types";

export interface TestimonialsCenteredAvatarsProps {
  /**
   * Array of testimonials to display
   */
  testimonials?: TestimonialItem[];
  /**
   * Custom slot for rendering testimonials (overrides testimonials array)
   */
  testimonialsSlot?: React.ReactNode;
  /**
   * Badge/eyebrow content above title
   */
  badge?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the content container
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the avatars container
   */
  avatarsClassName?: string;
  /**
   * Additional CSS classes for the testimonials list
   */
  testimonialsClassName?: string;
  /**
   * Additional CSS classes for each testimonial item
   */
  testimonialItemClassName?: string;
  /**
   * Additional CSS classes for the quote text
   */
  quoteClassName?: string;
  /**
   * Additional CSS classes for the author info
   */
  authorClassName?: string;
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
 * TestimonialsCenteredAvatars - A centered testimonial section featuring a badge,
 * title, and a row of large overlapping avatars. Displays multiple testimonials
 * in a clean, centered layout with prominent author photos creating visual interest
 * through the overlapping avatar stack. Ideal for trust-building sections on landing
 * pages where social proof from recognizable faces is important.
 *
 * @example
 * ```tsx
 * <TestimonialsCenteredAvatars
 *   badge="Testimonials"
 *   heading="Trusted by Industry Leaders"
 *   testimonials={[
 *     {
 *       quote: "This platform changed everything...",
 *       author: "Jane D.",
 *       role: "CEO",
 *       company: "TechCo",
 *       avatarSrc: "/avatars/jane.jpg"
 *     }
 *   ]}
 *   background="gray"
 *   spacing="lg"
 * />
 * ```
 */
export function TestimonialsCenteredAvatars({
  testimonials,
  testimonialsSlot,
  badge,
  heading,
  className,
  contentClassName,
  badgeClassName,
  headingClassName,
  avatarsClassName,
  testimonialsClassName,
  testimonialItemClassName,
  quoteClassName,
  authorClassName,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  pattern,
  patternOpacity,
}: TestimonialsCenteredAvatarsProps): React.JSX.Element {
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

  const renderedTestimonials = useMemo(() => {
    if (testimonialsSlot) return testimonialsSlot;
    if (!testimonials || testimonials.length === 0) return null;

    return (
      <div
        className={cn("mt-12 space-y-8 md:space-y-12", testimonialsClassName)}
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={cn("space-y-4", testimonialItemClassName)}
          >
            {testimonial.quote &&
              (typeof testimonial.quote === "string" ? (
                <blockquote
                  className={cn(
                    "text-lg leading-relaxed md:text-xl text-balance",
                    quoteClassName,
                  )}
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
              ) : (
                <div className={quoteClassName}>{testimonial.quote}</div>
              ))}
            <div className={authorClassName}>
              {testimonial.author &&
                (typeof testimonial.author === "string" ? (
                  <p className="font-semibold">{testimonial.author}</p>
                ) : (
                  testimonial.author
                ))}
              {(testimonial.role || testimonial.company) && (
                <p className="text-sm opacity-75">
                  {testimonial.role &&
                    (typeof testimonial.role === "string"
                      ? testimonial.role
                      : testimonial.role)}
                  {testimonial.company &&
                    (typeof testimonial.company === "string"
                      ? ` at ${testimonial.company}`
                      : testimonial.company)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }, [
    testimonialsSlot,
    testimonialsClassName,
    testimonials,
    testimonialItemClassName,
    quoteClassName,
    authorClassName,
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
      <div
        className={cn(
          "mx-auto max-w-full md:max-w-md text-center flex flex-col items-center gap-6",
          contentClassName,
        )}
      >
        {badge &&
          (typeof badge === "string" ? (
            <Badge className={badgeClassName}>{badge}</Badge>
          ) : (
            badge
          ))}
        {heading &&
          (typeof heading === "string" ? (
            <h2
              className={cn(
                "text-2xl font-semibold tracking-tight md:text-4xl lg:text-6xl text-balance",
                headingClassName,
              )}
            >
              {heading}
            </h2>
          ) : (
            <div className={headingClassName}>{heading}</div>
          ))}

        {testimonials && testimonials.length > 0 && (
          <div className={cn("mt-8 flex justify-center", avatarsClassName)}>
            <div className="flex -space-x-4">
              {testimonials.map((testimonial, index) => {
                const authorName = getAuthorName(testimonial);
                const avatarSrc = getAvatarSrc(testimonial);
                return (
                  <Avatar
                    key={index}
                    className="relative flex shrink-0 overflow-hidden rounded-full size-16 ring-4 ring-primary md:size-20 shadow-xl"
                  >
                    <AvatarImage src={avatarSrc} alt={authorName} />
                    <AvatarFallback className="text-lg">
                      {getInitials(authorName)}
                    </AvatarFallback>
                  </Avatar>
                );
              })}
            </div>
          </div>
        )}

        {renderedTestimonials}
      </div>
    </Section>
  );
}
