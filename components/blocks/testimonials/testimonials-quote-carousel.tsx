"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  TestimonialItem,
} from "../../../src/types";

export interface TestimonialsQuoteCarouselProps {
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
   * Additional CSS classes for the carousel container
   */
  carouselClassName?: string;
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
   * Additional CSS classes for the navigation buttons
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
 * TestimonialsQuoteCarousel - A horizontal carousel of testimonial cards with quote
 * styling and navigation controls. Each card displays a large quote mark, testimonial
 * content, and author information with avatar. Features previous/next buttons for
 * manual navigation. Responsive design shows multiple cards on larger screens. Perfect
 * for showcasing multiple testimonials in a swipeable, interactive format.
 *
 * @example
 * ```tsx
 * <TestimonialsQuoteCarousel
 *   heading="Client Testimonials"
 *   description="Swipe through what our clients have to say"
 *   testimonials={[
 *     {
 *       quote: "Amazing experience working with this team...",
 *       author: "Jane D.",
 *       role: "CEO, TechCo",
 *       avatarSrc: "/avatars/jane.jpg"
 *     }
 *   ]}
 *   background="gray"
 *   spacing="lg"
 * />
 * ```
 */
export function TestimonialsQuoteCarousel({
  testimonials,
  testimonialsSlot,
  heading,
  description,
  className,
  headerClassName,
  headingClassName,
  descriptionClassName,
  carouselClassName,
  cardClassName,
  quoteClassName,
  authorClassName,
  navigationClassName,
  background,
  pattern,
  patternOpacity,
  spacing = "lg",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
}: TestimonialsQuoteCarouselProps): React.JSX.Element {
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
      <div className={cn("mx-auto max-w-5xl", carouselClassName)}>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => {
              const authorName = getAuthorName(testimonial);
              const avatarSrc = getAvatarSrc(testimonial);
              return (
                <CarouselItem
                  key={index}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div
                    className={cn(
                      "bg-card text-card-foreground",
                      "flex h-full flex-col rounded-xl border p-6 shadow-sm transition-all hover:shadow-md",
                      cardClassName,
                    )}
                  >
                    <blockquote className="mb-6 flex-1">
                      {testimonial.quote &&
                        (typeof testimonial.quote === "string" ? (
                          <p
                            className={cn(
                              "text-base leading-relaxed",
                              quoteClassName,
                            )}
                          >
                            {testimonial.quote}
                          </p>
                        ) : (
                          testimonial.quote
                        ))}
                    </blockquote>
                    <div
                      className={cn(
                        "mt-auto flex items-center gap-4",
                        authorClassName,
                      )}
                    >
                      <Avatar className="size-10 ring-4 ring-primary">
                        <AvatarImage src={avatarSrc} alt={authorName} />
                        <AvatarFallback>
                          {getInitials(authorName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        {testimonial.author &&
                          (typeof testimonial.author === "string" ? (
                            <p className="text-sm md:text-base font-medium">
                              {testimonial.author}
                            </p>
                          ) : (
                            testimonial.author
                          ))}
                        {testimonial.role &&
                          (typeof testimonial.role === "string" ? (
                            <p className="text-sm opacity-75 font-semibold">
                              {testimonial.role}
                            </p>
                          ) : (
                            testimonial.role
                          ))}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div
            className={cn(
              "mt-8 flex justify-center gap-2",
              navigationClassName,
            )}
          >
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    );
  }, [
    testimonialsSlot,
    carouselClassName,
    testimonials,
    cardClassName,
    quoteClassName,
    authorClassName,
    navigationClassName,
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
                "text-3xl font-semibold tracking-tight md:text-4xl text-balance",
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
