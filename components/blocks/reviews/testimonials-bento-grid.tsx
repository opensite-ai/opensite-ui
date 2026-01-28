"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
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

/**
 * Extended testimonial item with featured flag for bento grid
 */
export interface BentoTestimonialItem extends TestimonialItem {
  /**
   * Whether this testimonial should be featured (larger card)
   */
  featured?: boolean;
}

export interface TestimonialsBentoGridProps {
  /**
   * Array of testimonials to display
   */
  testimonials?: BentoTestimonialItem[];
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
   * Additional CSS classes for the featured card
   */
  featuredCardClassName?: string;
  /**
   * Additional CSS classes for regular cards
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

const DEFAULT_TESTIMONIALS: BentoTestimonialItem[] = [
  {
    quote:
      "This platform has completely transformed how we approach our workflow. The intuitive design and powerful features have made our team significantly more productive. I can't imagine going back to our old tools.",
    author: "Sarah Chen",
    role: "Product Manager",
    company: "TechCorp",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar1,
    featured: true,
  },
  {
    quote:
      "The best investment we've made this year. ROI was visible within the first month.",
    author: "Michael Torres",
    role: "CEO",
    company: "StartupXYZ",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar2,
  },
  {
    quote:
      "Customer support is exceptional. They went above and beyond to help us with our specific needs.",
    author: "Emily Watson",
    role: "Operations Lead",
    company: "GrowthCo",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar3,
  },
  {
    quote:
      "Simple, elegant, and powerful. Everything we needed in one package.",
    author: "David Kim",
    role: "CTO",
    company: "InnovateLabs",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar4,
  },
  {
    quote:
      "We've tried many solutions, but this one stands out for its reliability and ease of use.",
    author: "Lisa Park",
    role: "Engineering Manager",
    company: "DevStudio",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar5,
  },
];

/**
 * TestimonialsBentoGrid - A modern bento-style grid layout featuring one large featured
 * testimonial card alongside smaller testimonial cards. The featured card spans multiple
 * rows for visual hierarchy, while remaining cards fill the grid in an asymmetric pattern.
 * Includes quote icons, author avatars, roles, and company names. Perfect for landing pages
 * and marketing sections requiring visual impact.
 *
 * @example
 * ```tsx
 * <TestimonialsBentoGrid
 *   heading="What Our Customers Say"
 *   description="Trusted by thousands of companies worldwide"
 *   testimonials={[
 *     {
 *       quote: "This platform transformed our workflow...",
 *       author: "Jane D.",
 *       role: "CEO",
 *       company: "TechCo",
 *       avatarSrc: "/avatars/jane.jpg",
 *       featured: true
 *     }
 *   ]}
 *   background="gray"
 *   spacing="lg"
 * />
 * ```
 */
export function TestimonialsBentoGrid({
  testimonials = DEFAULT_TESTIMONIALS,
  testimonialsSlot,
  heading,
  description,
  className,
  headerClassName,
  headingClassName,
  descriptionClassName,
  gridClassName,
  featuredCardClassName,
  cardClassName,
  quoteClassName,
  authorClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
}: TestimonialsBentoGridProps): React.JSX.Element {
  const featured = testimonials.find((t) => t.featured) || testimonials[0];
  const others = testimonials.filter((t) => t !== featured);

  const getAuthorName = (testimonial: BentoTestimonialItem): string => {
    if (typeof testimonial.author === "string") return testimonial.author;
    return "";
  };

  const getAvatarSrc = (
    testimonial: BentoTestimonialItem,
  ): string | undefined => {
    return testimonial.avatarSrc || testimonial.avatar?.src;
  };

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  const renderedTestimonials = useMemo(() => {
    if (testimonialsSlot) return testimonialsSlot;

    const featuredAuthorName = getAuthorName(featured);
    const featuredAvatarSrc = getAvatarSrc(featured);

    return (
      <div
        className={cn(
          "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
          gridClassName,
        )}
      >
        <Card
          className={cn("md:col-span-2 lg:row-span-2", featuredCardClassName)}
        >
          <CardContent className="flex h-full flex-col justify-between p-6 md:p-8">
            <div>
              <DynamicIcon
                name="lucide/quote"
                size={40}
                className="mb-4 text-primary/20"
              />
              {featured.quote &&
                (typeof featured.quote === "string" ? (
                  <blockquote
                    className={cn(
                      "text-xl font-medium leading-relaxed md:text-2xl",
                      quoteClassName,
                    )}
                  >
                    &ldquo;{featured.quote}&rdquo;
                  </blockquote>
                ) : (
                  <div className={quoteClassName}>{featured.quote}</div>
                ))}
            </div>
            <div
              className={cn("mt-6 flex items-center gap-4", authorClassName)}
            >
              <Avatar className="size-12">
                <AvatarImage src={featuredAvatarSrc} alt={featuredAuthorName} />
                <AvatarFallback>
                  {getInitials(featuredAuthorName)}
                </AvatarFallback>
              </Avatar>
              <div>
                {featured.author &&
                  (typeof featured.author === "string" ? (
                    <p className="font-semibold">{featured.author}</p>
                  ) : (
                    featured.author
                  ))}
                {(featured.role || featured.company) && (
                  <p className="text-sm text-muted-foreground">
                    {featured.role &&
                      (typeof featured.role === "string"
                        ? featured.role
                        : featured.role)}
                    {featured.company &&
                      (typeof featured.company === "string"
                        ? ` at ${featured.company}`
                        : featured.company)}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {others.slice(0, 4).map((testimonial, index) => {
          const authorName = getAuthorName(testimonial);
          const avatarSrc = getAvatarSrc(testimonial);
          return (
            <Card key={index} className={cardClassName}>
              <CardContent className="flex h-full flex-col justify-between p-6">
                {testimonial.quote &&
                  (typeof testimonial.quote === "string" ? (
                    <blockquote className="text-sm leading-relaxed">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                  ) : (
                    testimonial.quote
                  ))}
                <div className="mt-4 flex items-center gap-3">
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
    );
  }, [testimonialsSlot, gridClassName, featuredCardClassName, quoteClassName, authorClassName, cardClassName, featured, others]);

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
