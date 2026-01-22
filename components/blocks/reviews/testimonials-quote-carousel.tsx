"use client";

import * as React from "react";
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
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
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
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      "Their collaborative approach and deep understanding of our industry resulted in a design that not only looks exceptional but performs brilliantly.",
    author: "Daniel Ramirez",
    role: "Product Director, NexGen",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar1,
  },
  {
    quote:
      "The team's ability to translate complex requirements into clean, intuitive interfaces is remarkable. They're truly masters of their craft.",
    author: "Sophia Chen",
    role: "UX Director, Innovate AI",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar2,
  },
  {
    quote:
      "Working with them was effortless. They brought fresh perspectives to challenges we'd been struggling with for months.",
    author: "Marcus Johnson",
    role: "CEO, Horizon Media",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar3,
  },
  {
    quote:
      "They didn't just meet our expectations - they redefined what we thought was possible. I cannot recommend them highly enough.",
    author: "Olivia Thompson",
    role: "Brand Manager, Elevate",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar4,
  },
  {
    quote:
      "The strategic thinking behind their design decisions transformed our product. We saw immediate improvements in user engagement.",
    author: "James Wilson",
    role: "CTO, TechSphere",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar5,
  },
];

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
  testimonials = DEFAULT_TESTIMONIALS,
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
  background = "gray",
  spacing = "lg",
  pattern,
  patternOpacity,
}: TestimonialsQuoteCarouselProps): React.JSX.Element {
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

  const renderHeading = () => {
    if (typeof heading === "string") {
      return heading.split(" ").map((word, i) =>
        i === 1 ? (
          <span key={i} className="text-primary">
            {word}{" "}
          </span>
        ) : (
          <span key={i}>{word} </span>
        ),
      );
    }
    return heading;
  };

  const renderTestimonials = () => {
    if (testimonialsSlot) return testimonialsSlot;

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
                      "flex h-full flex-col rounded-xl border bg-background p-6 shadow-sm transition-all hover:shadow-md",
                      cardClassName,
                    )}
                  >
                    <div className="mb-4 font-serif text-4xl text-primary">
                      &ldquo;
                    </div>
                    <blockquote className="mb-6 flex-1">
                      {testimonial.quote &&
                        (typeof testimonial.quote === "string" ? (
                          <p
                            className={cn(
                              "text-sm leading-relaxed",
                              quoteClassName,
                            )}
                          >
                            {testimonial.quote}
                          </p>
                        ) : (
                          <div className={quoteClassName}>
                            {testimonial.quote}
                          </div>
                        ))}
                    </blockquote>
                    <div
                      className={cn(
                        "mt-auto flex items-center gap-3",
                        authorClassName,
                      )}
                    >
                      <Avatar className="size-10">
                        <AvatarImage src={avatarSrc} alt={authorName} />
                        <AvatarFallback>
                          {getInitials(authorName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left">
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
  };

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
              {renderHeading()}
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

      {renderTestimonials()}
    </Section>
  );
}
