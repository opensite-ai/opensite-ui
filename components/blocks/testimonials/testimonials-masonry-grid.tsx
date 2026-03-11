"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  TestimonialItem,
} from "../../../src/types";
import { Pressable } from "@/src";
import { ActionConfig } from "@page-speed/maps/components/geo-map";
import { BlockActions } from "@/components/ui/block-actions";

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
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

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
  sectionId = "testimonials-masonry-grid",
  testimonials,
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
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "lg",
  pattern,
  patternOpacity,
  actions,
  actionsSlot,
  actionsClassName,
}: TestimonialsMasonryGridProps): React.JSX.Element {
  const columns = testimonials
    ? [
        testimonials.filter((_, i) => i % 3 === 0),
        testimonials.filter((_, i) => i % 3 === 1),
        testimonials.filter((_, i) => i % 3 === 2),
      ]
    : [];

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
                        <blockquote className="text-lg leading-relaxed line-clamp-6 md:line-clamp-3 font-thin">
                          &ldquo;{testimonial.quote}&rdquo;
                        </blockquote>
                      ) : (
                        testimonial.quote
                      ))}
                    <div className="mt-4 flex items-center gap-4">
                      <Avatar className="relative flex shrink-0 overflow-hidden rounded-full size-14 ring-4 ring-primary shadow-lg">
                        <AvatarImage src={avatarSrc} alt={authorName} />
                        <AvatarFallback className="text-xs">
                          {getInitials(authorName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-0 leading-tight">
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
                            <p className="text-base font-thin opacity-75">
                              {testimonial.role}
                            </p>
                          ) : (
                            testimonial.role
                          ))}
                        {testimonial.linkConfig?.href && (
                          <Pressable
                            href={testimonial.linkConfig.href}
                            className={cn(
                              "text-base transition-all duration-500",
                              "hover:underline hover:underline-offset-4",
                              testimonial.linkConfig.className,
                            )}
                          >
                            {testimonial.linkConfig.label || "Full Review"}
                          </Pressable>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }, [
    testimonialsSlot,
    gridClassName,
    columns,
    cardClassName,
    quoteClassName,
    authorClassName,
    testimonials,
    getAuthorName,
    getAvatarSrc,
    getInitials,
  ]);

  return (
    <Section
      id={sectionId}
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
                "text-3xl font-semibold tracking-tight md:text-4xl lg:text-6xl text-balance",
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
      <BlockActions
        actions={actions}
        actionsSlot={actionsSlot}
        actionsClassName={cn("mt-8 md:mt-12 justify-center", actionsClassName)}
        mobileConfig={{ width: "full", position: "center" }}
      />
    </Section>
  );
}
