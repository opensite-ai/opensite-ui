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

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      "The platform exceeded all our expectations. Implementation was smooth and the results were immediate.",
    author: "Sarah Chen",
    role: "Product Manager",
    company: "TechCorp",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar1,
  },
  {
    quote:
      "Outstanding customer support and a product that actually delivers on its promises. Rare combination!",
    author: "Michael Torres",
    role: "CEO",
    company: "StartupXYZ",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar2,
  },
  {
    quote:
      "We've seen a 50% increase in efficiency since switching. The ROI speaks for itself.",
    author: "Emily Watson",
    role: "Operations Director",
    company: "GrowthCo",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar3,
  },
  {
    quote:
      "Clean interface, powerful features, and excellent documentation. Everything a developer could ask for.",
    author: "David Kim",
    role: "Senior Developer",
    company: "DevStudio",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar4,
  },
  {
    quote:
      "The best decision we made this quarter. Our team adopted it instantly and loves using it daily.",
    author: "Lisa Park",
    role: "Team Lead",
    company: "InnovateLabs",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar5,
  },
  {
    quote:
      "Intuitive design that requires minimal training. Our onboarding time dropped significantly.",
    author: "Alex Rivera",
    role: "HR Manager",
    company: "PeopleCo",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar6,
  },
];

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
  testimonials = DEFAULT_TESTIMONIALS,
  testimonialsSlot,
  heading,
  description,
  columns = 3,
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
}: TestimonialsSimpleGridProps): React.JSX.Element {
  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

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
      <div className={cn("grid gap-6", gridCols[columns], gridClassName)}>
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
