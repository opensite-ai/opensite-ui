"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card, CardContent } from "../../ui/card";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

/**
 * Twitter/X testimonial item interface
 */
export interface TwitterTestimonialItem {
  /**
   * Tweet/post content
   */
  content: React.ReactNode;
  /**
   * Author name
   */
  author?: React.ReactNode;
  /**
   * Twitter/X handle (e.g., "@username")
   */
  handle?: string;
  /**
   * Author avatar image URL
   */
  avatarSrc?: string;
  /**
   * Link to the original tweet/post
   */
  twitterUrl?: string;
}

export interface TestimonialsTwitterCardsProps {
  /**
   * Array of Twitter testimonials to display
   */
  testimonials?: TwitterTestimonialItem[];
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
   * Additional CSS classes for the card content
   */
  cardContentClassName?: string;
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
 * TestimonialsTwitterCards - A grid of Twitter/X-style testimonial cards featuring
 * user content, profile avatars, handles, and links to original tweets. Each card
 * displays the Twitter/X logo and links to the author's profile. Ideal for showcasing
 * social proof from real social media posts and building credibility through authentic
 * user endorsements.
 *
 * @example
 * ```tsx
 * <TestimonialsTwitterCards
 *   heading="What People Are Saying"
 *   description="Real tweets from real users"
 *   testimonials={[
 *     {
 *       content: "This product is amazing!",
 *       author: "John Doe",
 *       handle: "@johndoe",
 *       avatarSrc: "/avatars/john.jpg",
 *       twitterUrl: "https://twitter.com/johndoe/status/123"
 *     }
 *   ]}
 *   background="gray"
 *   spacing="lg"
 * />
 * ```
 */
export function TestimonialsTwitterCards({
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
  cardContentClassName,
  authorClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
}: TestimonialsTwitterCardsProps): React.JSX.Element {
  const getAuthorName = useCallback((testimonial: TwitterTestimonialItem): string => {
    if (typeof testimonial.author === "string") return testimonial.author;
    return "";
  }, []);

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
          "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
          gridClassName,
        )}
      >
        {testimonials.map((testimonial, index) => {
          const authorName = getAuthorName(testimonial);
          return (
            <Card key={index} className={cn("group", cardClassName)}>
              <CardContent className={cn("p-6", cardContentClassName)}>
                <div
                  className={cn(
                    "mb-4 flex items-start justify-between",
                    authorClassName,
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10">
                      <AvatarImage
                        src={testimonial.avatarSrc}
                        alt={authorName}
                      />
                      <AvatarFallback>{getInitials(authorName)}</AvatarFallback>
                    </Avatar>
                    <div>
                      {testimonial.author &&
                        (typeof testimonial.author === "string" ? (
                          <p className="font-medium leading-none">
                            {testimonial.author}
                          </p>
                        ) : (
                          testimonial.author
                        ))}
                      {testimonial.handle && (
                        <p className="text-sm text-muted-foreground">
                          {testimonial.handle}
                        </p>
                      )}
                    </div>
                  </div>
                  {testimonial.twitterUrl && (
                    <Pressable
                      href={testimonial.twitterUrl}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                      aria-label="View on Twitter"
                    >
                      <DynamicIcon name="simple-icons/x" size={18} />
                    </Pressable>
                  )}
                </div>
                {testimonial.content &&
                  (typeof testimonial.content === "string" ? (
                    <p className="text-sm leading-relaxed">
                      {testimonial.content}
                    </p>
                  ) : (
                    testimonial.content
                  ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }, [testimonialsSlot, gridClassName, testimonials, cardClassName, cardContentClassName, authorClassName, getAuthorName, getInitials]);

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
