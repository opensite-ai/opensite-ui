"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card, CardContent } from "../../ui/card";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import { Pressable } from "../../../lib/Pressable";
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
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for each card
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the card content
   */
  cardContentClassName?: string;
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
  cardContentClassName,
  gridClassName,
  cardClassName,
  quoteClassName,
  authorClassName,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
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
        className={cn(
          "grid gap-4 md:gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3",
          gridClassName,
        )}
      >
        {testimonials.map((testimonial, index) => {
          const authorName = getAuthorName(testimonial);
          return (
            <Pressable
              key={index}
              href={testimonial.linkConfig?.href}
              className={cn(
                "bg-card text-card-foreground",
                "flex flex-col gap-6",
                testimonial.linkConfig?.href
                  ? "cursor-pointer hover:bg-black hover:text-white transition-all duration-500"
                  : "",
                "rounded-2xl py-0 shadow-xl group",
                "ring-4 ring-ring",
                cardClassName,
              )}
            >
              <CardContent
                className={cn(
                  "px-0 h-full flex flex-col-reverse items-stretch justify-between gap-12",
                  cardContentClassName,
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-between",
                    authorClassName,
                  )}
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="relative flex shrink-0 size-24 border-t-4 border-r-4 border-primary rounded-tr-xl rounded-tl-none rounded-br-none rounded-bl-none shadow-xl">
                      <AvatarImage
                        src={testimonial.avatarSrc}
                        alt={authorName}
                      />
                      <AvatarFallback>{getInitials(authorName)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 pt-2 pr-6 pb-2">
                      <div className="space-y-0">
                        {testimonial.author &&
                          (typeof testimonial.author === "string" ? (
                            <p className="text-lg font-semibold leading-relaxed">
                              {testimonial.author}
                            </p>
                          ) : (
                            testimonial.author
                          ))}

                        {testimonial.role &&
                          (typeof testimonial.role === "string" ? (
                            <p className="text-base">{testimonial.role}</p>
                          ) : (
                            testimonial.role
                          ))}
                      </div>

                      {testimonial.linkConfig?.href && (
                        <Pressable
                          href={testimonial.linkConfig.href}
                          className={cn(
                            "text-base  transition-all duration-300",
                            "underline underline-offset-4",
                            testimonial.linkConfig.className,
                          )}
                        >
                          {testimonial.linkConfig.label}
                        </Pressable>
                      )}
                    </div>
                  </div>
                </div>
                <div className="pt-6 md: pt-8 px-6 md:px-8">
                  {testimonial.quote &&
                    (typeof testimonial.quote === "string" ? (
                      <p className="text-sm leading-relaxed">
                        {testimonial.quote}
                      </p>
                    ) : (
                      testimonial.quote
                    ))}
                </div>
              </CardContent>
            </Pressable>
          );
        })}
      </div>
    );
  }, [
    testimonialsSlot,
    gridClassName,
    testimonials,
    cardClassName,
    cardContentClassName,
    authorClassName,
    getAuthorName,
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
      <div
        className={cn(
          "mx-auto mb-12 max-w-full md:max-w-2xl text-center",
          headerClassName,
        )}
      >
        {heading &&
          (typeof heading === "string" ? (
            <h2
              className={cn(
                "text-pretty text-3xl md:text-4xl lg:text-6xl",
                "font-semibold tracking-tight",
                headingClassName,
              )}
            >
              {heading}
            </h2>
          ) : (
            heading
          ))}
        {description &&
          (typeof description === "string" ? (
            <p
              className={cn("mt-4 text-lg text-balance", descriptionClassName)}
            >
              {description}
            </p>
          ) : (
            description
          ))}
      </div>

      {renderedTestimonials}
    </Section>
  );
}
