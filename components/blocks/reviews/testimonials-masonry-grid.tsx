"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card, CardContent } from "../../ui/card";
import { Section } from "../../ui/section";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  TestimonialItem,
} from "../../../src/types";

export interface TestimonialsMasonryGridProps {
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

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      "This platform has completely transformed how we approach our daily operations. The intuitive design and powerful features have made our team significantly more productive. I can't imagine going back to our old workflow.",
    author: "Sarah Chen",
    role: "Product Manager",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar1,
  },
  {
    quote: "Outstanding support and an exceptional product. Highly recommend!",
    author: "Michael Torres",
    role: "CEO",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar2,
  },
  {
    quote:
      "The best investment we've made this year. Our team adopted it instantly and the results speak for themselves.",
    author: "Emily Watson",
    role: "Operations Director",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar3,
  },
  {
    quote:
      "Clean interface, powerful features, and excellent documentation. Everything a developer could ask for. The API is well-designed and the SDK makes integration a breeze.",
    author: "David Kim",
    role: "Senior Developer",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar4,
  },
  {
    quote: "Simple, elegant, and powerful. A game-changer for our workflow.",
    author: "Lisa Park",
    role: "Engineering Manager",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar5,
  },
  {
    quote:
      "We've tried many solutions, but this one stands out for its reliability and ease of use. The customer support team is also incredibly responsive.",
    author: "Alex Rivera",
    role: "Design Director",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar6,
  },
  {
    quote:
      "Intuitive design that requires minimal training. Our onboarding time dropped significantly since we started using this platform.",
    author: "Jordan Lee",
    role: "HR Manager",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar7,
  },
  {
    quote:
      "The attention to detail is impressive. Every feature feels thoughtfully designed.",
    author: "Maya Patel",
    role: "UX Designer",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar8,
  },
];

/**
 * TestimonialsMasonryGrid - A masonry-style grid layout for testimonials with varying
 * card heights based on content length. Cards are distributed across columns creating
 * an organic, Pinterest-like layout. Each card displays a quote with author avatar,
 * name, and role. The masonry effect creates visual interest while efficiently using
 * space. Ideal for showcasing testimonials of varying lengths.
 *
 * @example
 * ```tsx
 * <TestimonialsMasonryGrid
 *   heading="What People Say"
 *   description="Feedback from our community"
 *   testimonials={[
 *     {
 *       quote: "Amazing product that changed our workflow...",
 *       author: "John D.",
 *       role: "CEO",
 *       avatarSrc: "/avatars/john.jpg"
 *     }
 *   ]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function TestimonialsMasonryGrid({
  testimonials = DEFAULT_TESTIMONIALS,
  testimonialsSlot,
  heading,
  description,
  className,
  headerClassName,
  headingClassName,
  descriptionClassName,
  gridClassName,
  cardClassName,
  quoteClassName,
  authorClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
}: TestimonialsMasonryGridProps): React.JSX.Element {
  const columns = [
    testimonials.filter((_, i) => i % 3 === 0),
    testimonials.filter((_, i) => i % 3 === 1),
    testimonials.filter((_, i) => i % 3 === 2),
  ];

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

  const renderTestimonials = () => {
    if (testimonialsSlot) return testimonialsSlot;

    return (
      <div
        className={cn(
          "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
          gridClassName,
        )}
      >
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-4">
            {column.map((testimonial, index) => {
              const authorName = getAuthorName(testimonial);
              const avatarSrc = getAvatarSrc(testimonial);
              return (
                <Card key={index} className={cardClassName}>
                  <CardContent className="p-6">
                    {testimonial.quote &&
                      (typeof testimonial.quote === "string" ? (
                        <p
                          className={cn(
                            "mb-4 text-sm leading-relaxed",
                            quoteClassName,
                          )}
                        >
                          &ldquo;{testimonial.quote}&rdquo;
                        </p>
                      ) : (
                        <div className={cn("mb-4", quoteClassName)}>
                          {testimonial.quote}
                        </div>
                      ))}
                    <div
                      className={cn("flex items-center gap-3", authorClassName)}
                    >
                      <Avatar className="size-9">
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
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ))}
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

      {renderTestimonials()}
    </Section>
  );
}
