"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
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

export interface TestimonialsLargeQuoteProps {
  /**
   * Testimonial data using shared TestimonialItem type
   */
  testimonial?: TestimonialItem;
  /**
   * Custom slot for rendering testimonial (overrides testimonial prop)
   */
  testimonialSlot?: React.ReactNode;
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
   * Additional CSS classes for the avatar
   */
  avatarClassName?: string;
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
}

/**
 * TestimonialsLargeQuote - A centered, single testimonial section featuring an oversized
 * quote with decorative quote icons. The large typography creates visual impact while
 * the centered layout draws focus to the testimonial content. Includes author avatar,
 * name, role, and company. Perfect for hero sections, about pages, or anywhere a single
 * powerful testimonial needs to make a statement.
 *
 * @example
 * ```tsx
 * <TestimonialsLargeQuote
 *   testimonial={{
 *     quote: "This service transformed our business...",
 *     author: "Jane D.",
 *     role: "CEO",
 *     company: "TechCo",
 *     avatarSrc: "/avatars/jane.jpg"
 *   }}
 *   background="gray"
 *   spacing="lg"
 * />
 * ```
 */
export function TestimonialsLargeQuote({
  testimonial,
  testimonialSlot,
  className,
  contentClassName,
  quoteIconClassName,
  quoteClassName,
  authorClassName,
  avatarClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
}: TestimonialsLargeQuoteProps): React.JSX.Element {
  const getAuthorName = useCallback((): string => {
    if (typeof testimonial?.author === "string") return testimonial.author;
    return "";
  }, [testimonial?.author]);

  const getAvatarSrc = useCallback((): string | undefined => {
    return testimonial?.avatarSrc || testimonial?.avatar?.src;
  }, [testimonial?.avatarSrc, testimonial?.avatar?.src]);

  const getInitials = useCallback((name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  }, []);

  const renderedTestimonial = useMemo(() => {
    if (testimonialSlot) return testimonialSlot;
    if (!testimonial) return null;

    const authorName = getAuthorName();
    const avatarSrc = getAvatarSrc();

    return (
      <div className={cn("mx-auto max-w-4xl text-center", contentClassName)}>
        <DynamicIcon
          name="lucide/quote"
          size={64}
          className={cn("mx-auto mb-8 text-primary/20", quoteIconClassName)}
        />

        {testimonial.quote &&
          (typeof testimonial.quote === "string" ? (
            <blockquote
              className={cn(
                "text-2xl font-medium leading-relaxed md:text-3xl lg:text-4xl",
                quoteClassName,
              )}
            >
              {testimonial.quote}
            </blockquote>
          ) : (
            <div className={quoteClassName}>{testimonial.quote}</div>
          ))}

        <div
          className={cn(
            "mt-10 flex flex-col items-center gap-4",
            authorClassName,
          )}
        >
          <Avatar className={cn("size-16", avatarClassName)}>
            <AvatarImage src={avatarSrc} alt={authorName} />
            <AvatarFallback className="text-lg">
              {getInitials(authorName)}
            </AvatarFallback>
          </Avatar>
          <div>
            {testimonial.author &&
              (typeof testimonial.author === "string" ? (
                <p className="text-lg font-semibold">{testimonial.author}</p>
              ) : (
                testimonial.author
              ))}
            {(testimonial.role || testimonial.company) && (
              <p className="text-muted-foreground">
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
      </div>
    );
  }, [testimonialSlot, contentClassName, quoteIconClassName, testimonial, quoteClassName, authorClassName, avatarClassName, getAuthorName, getAvatarSrc, getInitials]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      {renderedTestimonial}
    </Section>
  );
}
