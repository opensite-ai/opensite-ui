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
import { Pressable, StarRating } from "@/src";

/**
 * Stat item interface for displaying metrics
 */
export interface StatItem {
  /**
   * Unique identifier for the stat
   */
  id: string;
  /**
   * The stat value (e.g., "437", "2.4", "89")
   */
  value: React.ReactNode;
  /**
   * Prefix for the value (e.g., "$", "€", "£")
   */
  prefix?: React.ReactNode;
  /**
   * Suffix for the value (e.g., "%", "B+", "x", "K")
   */
  suffix?: React.ReactNode;
  /**
   * The label for the stat
   */
  label: React.ReactNode;
  /**
   * Description or context for the stat
   */
  description?: React.ReactNode;
  /**
   * Icon name in format: prefix/name (e.g., "lucide/line-chart")
   */
  icon?: string;
  /**
   * Custom slot for icon (overrides icon prop)
   */
  iconSlot?: React.ReactNode;
  /**
   * Icon color class (e.g., "text-primary", "text-emerald-500")
   */
  iconColor?: string;
  /**
   * Additional CSS classes for the stat card
   */
  className?: string;
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
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for stat cards
   */
  statCardClassName?: string;
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
  statCardClassName,
  quoteClassName,
  authorClassName,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  pattern,
  patternOpacity,
}: TestimonialsStatsHeaderProps): React.JSX.Element {
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

  // Callback for rendering stat icons - takes argument (stat)
  const renderStatIcon = useCallback((stat: StatItem) => {
    if (stat.iconSlot) return stat.iconSlot;
    if (!stat.icon) return null;
    return (
      <div className="mb-6">
        <DynamicIcon name={stat.icon} size={32} className={stat.iconColor} />
      </div>
    );
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
          "mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3",
          statsGridClassName,
        )}
      >
        {stats.map((stat) => (
          <Card
            key={stat.id}
            className={cn(
              "overflow-hidden border p-0",
              stat.className,
              statCardClassName,
            )}
          >
            <CardContent className="p-6 md:p-8">
              {renderStatIcon(stat)}

              <div className="mb-2 flex items-end">
                {stat.prefix && (
                  <span className="mb-1 mr-1 text-2xl font-bold">
                    {stat.prefix}
                  </span>
                )}
                <h3 className="text-4xl font-bold tracking-tight leading-tight md:text-5xl">
                  {stat.value}
                </h3>
                {stat.suffix && (
                  <span className="mb-1 ml-1 text-2xl font-bold">
                    {stat.suffix}
                  </span>
                )}
              </div>

              {stat.label && (
                <div className="mb-4 text-xl font-semibold">{stat.label}</div>
              )}
              {stat.description &&
                (typeof stat.description === "string" ? (
                  <p className="opacity-75">{stat.description}</p>
                ) : (
                  stat.description
                ))}
            </CardContent>
          </Card>
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
            <div
              key={index}
              className={cn(
                "bg-card text-card-foreground flex flex-col gap-6 rounded-2xl border py-0 shadow-xl",
                cardClassName,
              )}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-start gap-12 justify-between">
                  <div className="flex flex-col items-start gap-4">
                    <StarRating rating={5} size={20} />

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
                  </div>

                  <div
                    className={cn("flex items-center gap-3", authorClassName)}
                  >
                    <Avatar className="size-10">
                      <AvatarImage src={avatarSrc} alt={authorName} />
                      <AvatarFallback>{getInitials(authorName)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <div>
                        {testimonial.author &&
                          (typeof testimonial.author === "string" ? (
                            <p className="text-base font-medium">
                              {testimonial.author}
                            </p>
                          ) : (
                            testimonial.author
                          ))}
                        {testimonial.role &&
                          (typeof testimonial.role === "string" ? (
                            <p className="text-sm opacity-75">
                              {testimonial.role}
                            </p>
                          ) : (
                            testimonial.role
                          ))}
                      </div>

                      {testimonial.linkConfig?.href && (
                        <Pressable
                          href={testimonial.linkConfig.href}
                          className={cn(
                            "text-sm  transition-all duration-300",
                            "hover:underline hover:underline-offset-4",
                            testimonial.linkConfig.className,
                          )}
                        >
                          {testimonial.linkConfig.label}
                        </Pressable>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          );
        })}
      </div>
    );
  }, [
    testimonialsSlot,
    testimonialsGridClassName,
    testimonials,
    cardClassName,
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

      {renderedStats}
      {renderedTestimonials}
    </Section>
  );
}
