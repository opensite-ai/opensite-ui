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

/**
 * Extended testimonial item with rating for mini dividers display
 */
export interface MiniTestimonialItem extends TestimonialItem {
  /**
   * Star rating (1-5)
   */
  rating?: number;
}

export interface TestimonialsMiniDividersProps {
  /**
   * Array of testimonials to display
   */
  testimonials?: MiniTestimonialItem[];
  /**
   * Custom slot for rendering testimonials (overrides testimonials array)
   */
  testimonialsSlot?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the section wrapper
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
   * Additional CSS classes for the grid container
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each testimonial item
   */
  itemClassName?: string;
  /**
   * Additional CSS classes for the quote text
   */
  quoteClassName?: string;
  /**
   * Additional CSS classes for the author section
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
}

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <DynamicIcon
          key={star}
          name="lucide/star"
          size={size}
          className={cn(
            star <= rating
              ? "fill-primary text-primary"
              : "fill-muted text-muted",
          )}
        />
      ))}
    </div>
  );
}

/**
 * TestimonialsMiniDividers - A grid of compact testimonial cards separated by subtle
 * dividers. Each card displays a short quote, star rating, author avatar, name, and
 * role. The divider pattern creates visual separation while maintaining a cohesive
 * layout. Ideal for displaying multiple brief testimonials in a structured, scannable
 * format.
 *
 * @example
 * ```tsx
 * <TestimonialsMiniDividers
 *   heading="What People Say"
 *   description="Feedback from our customers"
 *   testimonials={[
 *     {
 *       quote: "Great product!",
 *       author: "John D.",
 *       role: "CEO",
 *       avatarSrc: "/avatars/john.jpg",
 *       rating: 5
 *     }
 *   ]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function TestimonialsMiniDividers({
  testimonials,
  testimonialsSlot,
  heading,
  description,
  className,
  headerClassName,
  headingClassName,
  descriptionClassName,
  gridClassName,
  itemClassName,
  quoteClassName,
  authorClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
}: TestimonialsMiniDividersProps): React.JSX.Element {
  const getAuthorName = useCallback((testimonial: MiniTestimonialItem): string => {
    if (typeof testimonial.author === "string") return testimonial.author;
    return "";
  }, []);

  const getAvatarSrc = useCallback((
    testimonial: MiniTestimonialItem,
  ): string | undefined => {
    return testimonial.avatarSrc || testimonial.avatar?.src;
  }, []);

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
        className={cn(
          "grid divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-3 lg:divide-x",
          gridClassName,
        )}
      >
        {testimonials.map((testimonial, index) => {
          const authorName = getAuthorName(testimonial);
          const avatarSrc = getAvatarSrc(testimonial);
          return (
            <div
              key={index}
              className={cn(
                "p-6",
                index >= 2 && "lg:border-t-0",
                index >= 3 && "sm:border-t lg:border-t-0",
                itemClassName,
              )}
            >
              {testimonial.rating && <StarRating rating={testimonial.rating} />}
              {testimonial.quote &&
                (typeof testimonial.quote === "string" ? (
                  <p
                    className={cn(
                      "mt-3 text-sm leading-relaxed",
                      quoteClassName,
                    )}
                  >
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                ) : (
                  <div className={cn("mt-3", quoteClassName)}>
                    {testimonial.quote}
                  </div>
                ))}
              <div
                className={cn("mt-4 flex items-center gap-3", authorClassName)}
              >
                <Avatar className="size-8">
                  <AvatarImage src={avatarSrc} alt={authorName} />
                  <AvatarFallback className="text-xs">
                    {getInitials(authorName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  {testimonial.author &&
                    (typeof testimonial.author === "string" ? (
                      <p className="text-sm font-medium">
                        {testimonial.author}
                      </p>
                    ) : (
                      testimonial.author
                    ))}
                  {testimonial.role &&
                    (typeof testimonial.role === "string" ? (
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                    ) : (
                      testimonial.role
                    ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [testimonialsSlot, gridClassName, testimonials, itemClassName, quoteClassName, authorClassName, getAuthorName, getAvatarSrc, getInitials]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <div
        className={cn("mx-auto mb-12 max-w-2xl text-center", headerClassName)}
      >
        {heading &&
          (typeof heading === "string" ? (
            <h2
              className={cn(
                "text-3xl font-semibold tracking-tight md:text-4xl",
                headingClassName,
              )}
            >
              {heading}
            </h2>
          ) : (
            <div className={headingClassName}>{heading}</div>
          ))}
        {description &&
          (typeof description === "string" ? (
            <p
              className={cn(
                "mt-4 text-lg text-muted-foreground",
                descriptionClassName,
              )}
            >
              {description}
            </p>
          ) : (
            <div className={cn("mt-4", descriptionClassName)}>
              {description}
            </div>
          ))}
      </div>

      {renderedTestimonials}
    </Section>
  );
}
