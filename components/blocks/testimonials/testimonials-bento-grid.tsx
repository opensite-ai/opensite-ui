"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card, CardContent } from "../../ui/card";
import { Section } from "../../ui/section";
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
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
}

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
  testimonials,
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
  pattern,
  patternOpacity,
  spacing = "lg",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
}: TestimonialsBentoGridProps): React.JSX.Element {
  const featured = testimonials?.find((t) => t.featured) || testimonials?.[0];
  const others = testimonials?.filter((t) => t !== featured) ?? [];

  const getAuthorName = useCallback(
    (testimonial: BentoTestimonialItem): string => {
      if (typeof testimonial.author === "string") return testimonial.author;
      return "";
    },
    [],
  );

  const getAvatarSrc = useCallback(
    (testimonial: BentoTestimonialItem): string | undefined => {
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
    if (!featured) return null;

    const featuredAuthorName = getAuthorName(featured);
    const featuredAvatarSrc = getAvatarSrc(featured);

    return (
      <div
        className={cn(
          "grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto]",
          gridClassName,
        )}
      >
        <div
          className={cn(
            "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm md:col-span-2 lg:row-span-2",
            featuredCardClassName,
          )}
        >
          <div className="flex h-full flex-col justify-between p-6 md:p-8 gap-8 md:gap-12">
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
                      "text-xl font-medium leading-relaxed md:text-2xl line-clamp-5",
                      quoteClassName,
                    )}
                  >
                    &ldquo;{featured.quote}&rdquo;
                  </blockquote>
                ) : (
                  <div className={cn("line-clamp-5", quoteClassName)}>
                    {featured.quote}
                  </div>
                ))}
            </div>
            <div
              className={cn("mt-6 flex items-center gap-4", authorClassName)}
            >
              <Avatar className="relative flex shrink-0 overflow-hidden rounded-full size-12 ring-4 ring-primary shadow-lg">
                <AvatarImage src={featuredAvatarSrc} alt={featuredAuthorName} />
                <AvatarFallback>
                  {getInitials(featuredAuthorName)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-0 leading-tight">
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
                {featured.linkConfig?.href && (
                  <Pressable
                    href={featured.linkConfig.href}
                    className={cn(
                      "text-sm  transition-all duration-300",
                      "underline underline-offset-4",
                      featured.linkConfig.className,
                    )}
                  >
                    {featured.linkConfig.label}
                  </Pressable>
                )}
              </div>
            </div>
          </div>
        </div>

        {others.slice(0, 5).map((testimonial, index) => {
          const authorName = getAuthorName(testimonial);
          const avatarSrc = getAvatarSrc(testimonial);
          return (
            <div
              key={index}
              className={cn(
                cardClassName,
                "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm",
              )}
            >
              <div className="flex h-full flex-col justify-between p-6 gap-8">
                {testimonial.quote &&
                  (typeof testimonial.quote === "string" ? (
                    <blockquote className="text-sm leading-relaxed line-clamp-3">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                  ) : (
                    <div className="line-clamp-3">{testimonial.quote}</div>
                  ))}
                <div className="mt-4 flex items-center gap-3">
                  <Avatar className="relative flex shrink-0 overflow-hidden rounded-full size-12 ring-4 ring-primary shadow-lg">
                    <AvatarImage src={avatarSrc} alt={authorName} />
                    <AvatarFallback className="text-xs">
                      {getInitials(authorName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-0 leading-tight">
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
                        <p className="text-xs">{testimonial.role}</p>
                      ) : (
                        testimonial.role
                      ))}
                    {testimonial.linkConfig?.href && (
                      <Pressable
                        href={testimonial.linkConfig.href}
                        className={cn(
                          "text-sm  transition-all duration-300",
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
            </div>
          );
        })}
      </div>
    );
  }, [
    testimonialsSlot,
    gridClassName,
    featuredCardClassName,
    quoteClassName,
    authorClassName,
    cardClassName,
    featured,
    others,
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
