"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { StarRating } from "../../ui/star-rating";
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
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
}

/**
 * TestimonialsMiniDividers - A grid of compact testimonial cards with dashed border
 * styling and sparkle decorations. Each card displays a short quote, star rating,
 * author avatar, name, and role inside a structured dashed-border layout inspired
 * by the hero-dashed-border-features pattern. Ideal for displaying multiple brief
 * testimonials in a visually distinctive, scannable format.
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
  spacing = "lg",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  pattern,
  patternOpacity,
}: TestimonialsMiniDividersProps): React.JSX.Element {
  const getAuthorName = useCallback(
    (testimonial: MiniTestimonialItem): string => {
      if (typeof testimonial.author === "string") return testimonial.author;
      return "";
    },
    [],
  );

  const getAvatarSrc = useCallback(
    (testimonial: MiniTestimonialItem): string | undefined => {
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
          "relative grid border-x border-b border-dashed md:grid-cols-3",
          gridClassName,
        )}
      >
        <DynamicIcon
          name="lucide/sparkle"
          size={20}
          className="absolute top-0 right-0 translate-x-2.5 -translate-y-2.5 fill-primary"
        />
        <DynamicIcon
          name="lucide/sparkle"
          size={20}
          className="absolute top-0 left-0 -translate-x-2.5 -translate-y-2.5 fill-primary"
        />
        {testimonials.map((testimonial, index) => {
          const authorName = getAuthorName(testimonial);
          const avatarSrc = getAvatarSrc(testimonial);
          return (
            <div
              key={index}
              className={cn(
                "group flex flex-col gap-4 border-t border-dashed p-4 transition-colors duration-300 hover:bg-muted/50 lg:p-8",
                index % 3 === 1 && "md:border-x md:border-dashed",
                itemClassName,
              )}
            >
              <div className="flex items-center gap-4">
                <Avatar className="size-10 shrink-0 rounded-md bg-card shadow-sm lg:size-12">
                  <AvatarImage src={avatarSrc} alt={authorName} />
                  <AvatarFallback className="rounded-md bg-card text-card-foreground text-sm">
                    {getInitials(authorName)}
                  </AvatarFallback>
                </Avatar>
                <div className={cn("min-w-0", authorClassName)}>
                  {testimonial.author &&
                    (typeof testimonial.author === "string" ? (
                      <p className="truncate font-medium">
                        {testimonial.author}
                      </p>
                    ) : (
                      testimonial.author
                    ))}
                  {testimonial.role &&
                    (typeof testimonial.role === "string" ? (
                      <p className="truncate text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    ) : (
                      testimonial.role
                    ))}
                </div>
              </div>
              {testimonial.rating != null && (
                <StarRating rating={testimonial.rating} />
              )}
              {testimonial.quote &&
                (typeof testimonial.quote === "string" ? (
                  <p
                    className={cn(
                      "text-sm leading-relaxed text-muted-foreground",
                      quoteClassName,
                    )}
                  >
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                ) : (
                  <div className={cn("text-sm", quoteClassName)}>
                    {testimonial.quote}
                  </div>
                ))}
            </div>
          );
        })}
      </div>
    );
  }, [
    testimonialsSlot,
    gridClassName,
    testimonials,
    itemClassName,
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
      className={cn("relative flex items-center justify-center", className)}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div
          className={cn(
            "border-x border-t border-dashed px-4 py-6 md:py-16 md:px-16",
            headerClassName,
          )}
        >
          <div className="mx-auto max-w-3xl">
            {heading &&
              (typeof heading === "string" ? (
                <h2
                  className={cn(
                    "text-center text-3xl font-semibold tracking-tight md:text-4xl",
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
                    "mx-auto mt-4 max-w-2xl text-center text-lg text-balance",
                    descriptionClassName,
                  )}
                >
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              ))}
          </div>
        </div>

        {renderedTestimonials}
      </div>
    </Section>
  );
}
