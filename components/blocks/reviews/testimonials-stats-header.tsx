"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
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
 * Stat item interface for displaying metrics
 */
export interface StatItem {
  /**
   * The stat value (e.g., "10K+", "4.9")
   */
  value: React.ReactNode;
  /**
   * The stat label (e.g., "Happy Customers")
   */
  label: React.ReactNode;
}

export interface TestimonialsStatsHeaderProps {
  /**
   * Array of stats to display in the header
   */
  stats?: StatItem[];
  /**
   * Custom slot for rendering stats (overrides stats array)
   */
  statsSlot?: React.ReactNode;
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
   * Additional CSS classes for the stats grid
   */
  statsGridClassName?: string;
  /**
   * Additional CSS classes for each stat item
   */
  statItemClassName?: string;
  /**
   * Additional CSS classes for the testimonials grid
   */
  testimonialsGridClassName?: string;
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
 * TestimonialsStatsHeader - A testimonial section featuring a prominent statistics
 * header followed by testimonial cards. The stats section displays key metrics in
 * a horizontal row, providing social proof through numbers. Below, testimonial cards
 * show customer quotes with author information. Perfect for landing pages requiring
 * both quantitative and qualitative social proof.
 *
 * @example
 * ```tsx
 * <TestimonialsStatsHeader
 *   heading="Trusted by Thousands"
 *   description="See what our customers have to say"
 *   stats={[
 *     { value: "10K+", label: "Users" },
 *     { value: "4.9", label: "Rating" }
 *   ]}
 *   testimonials={[
 *     {
 *       quote: "Amazing platform...",
 *       author: "Jane D.",
 *       role: "CEO",
 *       avatarSrc: "/avatars/jane.jpg"
 *     }
 *   ]}
 *   background="gray"
 *   spacing="lg"
 * />
 * ```
 */
export function TestimonialsStatsHeader({
  stats,
  statsSlot,
  testimonials,
  testimonialsSlot,
  heading,
  description,
  className,
  headerClassName,
  headingClassName,
  descriptionClassName,
  statsGridClassName,
  statItemClassName,
  testimonialsGridClassName,
  cardClassName,
  quoteClassName,
  authorClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
}: TestimonialsStatsHeaderProps): React.JSX.Element {
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

  const renderedStats = useMemo(() => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return (
      <div
        className={cn(
          "mb-12 grid grid-cols-2 gap-4 md:grid-cols-4",
          statsGridClassName,
        )}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className={cn(
              "rounded-lg bg-muted/50 p-6 text-center",
              statItemClassName,
            )}
          >
            {typeof stat.value === "string" ? (
              <p className="text-3xl font-bold text-primary md:text-4xl">
                {stat.value}
              </p>
            ) : (
              stat.value
            )}
            {typeof stat.label === "string" ? (
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            ) : (
              stat.label
            )}
          </div>
        ))}
      </div>
    );
  }, [statsSlot, stats, statsGridClassName, statItemClassName]);

  const renderedTestimonials = useMemo(() => {
    if (testimonialsSlot) return testimonialsSlot;
    if (!testimonials || testimonials.length === 0) return null;

    return (
      <div
        className={cn("grid gap-6 md:grid-cols-3", testimonialsGridClassName)}
      >
        {testimonials.map((testimonial, index) => {
          const authorName = getAuthorName(testimonial);
          const avatarSrc = getAvatarSrc(testimonial);
          return (
            <Card key={index} className={cardClassName}>
              <CardContent className="p-6">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <DynamicIcon
                      key={i}
                      name="lucide/star"
                      size={16}
                      className="fill-primary text-primary"
                    />
                  ))}
                </div>
                {testimonial.quote &&
                  (typeof testimonial.quote === "string" ? (
                    <p
                      className={cn(
                        "mb-6 text-sm leading-relaxed",
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
  }, [testimonialsSlot, testimonialsGridClassName, testimonials, cardClassName, quoteClassName, authorClassName, getAuthorName, getAvatarSrc, getInitials]);

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

      {renderedStats}
      {renderedTestimonials}
    </Section>
  );
}
