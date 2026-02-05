"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card, CardContent } from "../../ui/card";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  TestimonialItem,
} from "../../../src/types";

export interface TestimonialsSimpleGridProps {
  /**
   * Array of testimonials to display
   */
  testimonials?: TestimonialItem[];
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
   * Number of columns in the grid
   */
  columns?: 2 | 3 | 4;
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
   * Additional CSS classes for each card
   */
  cardClassName?: string;
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

/**
 * TestimonialsSimpleGrid - A clean, straightforward grid of testimonial cards with
 * configurable column count. Each card displays a quote, author avatar, name, role,
 * and company. The minimal design focuses on content readability while maintaining
 * visual consistency. Ideal for sections requiring multiple testimonials without
 * complex layouts or animations.
 *
 * @example
 * ```tsx
 * <TestimonialsSimpleGrid
 *   heading="Customer Stories"
 *   description="Hear from our satisfied customers"
 *   columns={3}
 *   testimonials={[
 *     {
 *       quote: "Great product!",
 *       author: "John D.",
 *       role: "CEO",
 *       company: "TechCo",
 *       avatarSrc: "/avatars/john.jpg"
 *     }
 *   ]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function TestimonialsSimpleGrid({
  testimonials,
  testimonialsSlot,
  heading,
  description,
  columns,
  className,
  headerClassName,
  headingClassName,
  descriptionClassName,
  gridClassName,
  cardClassName,
  quoteClassName,
  authorClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
}: TestimonialsSimpleGridProps): React.JSX.Element {
  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };
  const effectiveColumns = columns || 3;

  const getAuthorName = useCallback((testimonial: TestimonialItem): string => {
    if (typeof testimonial.author === "string") return testimonial.author;
    return "";
  }, []);

  const getAvatarSrc = useCallback((testimonial: TestimonialItem): string | undefined => {
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
      <div className={cn("grid gap-6", gridCols[effectiveColumns], gridClassName)}>
        {testimonials.map((testimonial, index) => {
          const authorName = getAuthorName(testimonial);
          const avatarSrc = getAvatarSrc(testimonial);
          return (
            <Card key={index} className={cardClassName}>
              <CardContent className="p-6">
                {testimonial.quote &&
                  (typeof testimonial.quote === "string" ? (
                    <p
                      className={cn(
                        "mb-6 text-sm leading-relaxed text-muted-foreground",
                        quoteClassName,
                      )}
                    >
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  ) : (
                    <div className={cn("mb-6", quoteClassName)}>
                      {testimonial.quote}
                    </div>
                  ))}
                <div className={cn("flex items-center gap-3", authorClassName)}>
                  <Avatar className="size-10">
                    <AvatarImage src={avatarSrc} alt={authorName} />
                    <AvatarFallback>{getInitials(authorName)}</AvatarFallback>
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
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role &&
                        (typeof testimonial.role === "string"
                          ? testimonial.role
                          : null)}
                      {testimonial.company &&
                        (typeof testimonial.company === "string"
                          ? `, ${testimonial.company}`
                          : null)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }, [testimonialsSlot, gridCols, effectiveColumns, gridClassName, testimonials, cardClassName, quoteClassName, authorClassName, getAuthorName, getAvatarSrc, getInitials]);

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
