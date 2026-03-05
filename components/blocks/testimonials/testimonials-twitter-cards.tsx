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
import { SocialLinkIcon } from "@/components/ui/social-link-icon";

export interface TwitterTestimonialItem extends SocialTestimonialItem {}
export interface SocialTestimonialItem {
  /**
   * post content
   */
  content: React.ReactNode;
  /**
   * Author name
   */
  author?: React.ReactNode;
  /**
   * social handle (e.g., "@username")
   */
  handle?: string;
  /**
   * Author avatar image URL
   */
  avatarSrc?: string;
  /**
   * Link to the original post
   */
  linkConfig?: {
    label: React.ReactNode;
    href: string;
    className?: string;
  };
}

export interface TestimonialsTwitterCardsProps {
  /**
   * Array of social testimonials to display
   */
  testimonials?: SocialTestimonialItem[];
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
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
}

/**
 * TestimonialsTwitterCards - A grid of social testimonial cards featuring
 * user content, profile avatars, handles, and links to original posts. Each card
 * displays the social platforms logo and links to the author's profile. Ideal for showcasing
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
 *       linkConfig: {
 *         label: "Read on Twitter",
 *         href: "https://twitter.com/johndoe/status/123",
 *       }
 *     },
 *     {
 *       content: "So Good!!",
 *       author: "Jon Snow",
 *       handle: "@jonsnow",
 *       avatarSrc: "/avatars/jon.jpg",
 *       linkConfig: {
 *         label: "See on Instagram",
 *         href: "https://instagram.com/jonsnow/status/123",
 *       }
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
  spacing = "lg",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  pattern,
  patternOpacity,
}: TestimonialsTwitterCardsProps): React.JSX.Element {
  const getAuthorName = useCallback(
    (testimonial: SocialTestimonialItem): string => {
      if (typeof testimonial.author === "string") return testimonial.author;
      return "";
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
          "grid gap-4 md:gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3",
          gridClassName,
        )}
      >
        {testimonials.map((testimonial, index) => {
          const authorName = getAuthorName(testimonial);
          return (
            <Pressable
              key={index}
              href={testimonial.linkConfig?.href}
              className={cn(
                testimonial.linkConfig?.href
                  ? "cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all duration-500"
                  : "",
                "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-xl group ",
                cardClassName,
              )}
            >
              <CardContent
                className={cn(
                  "px-6 h-full flex flex-col-reverse items-stretch justify-between gap-12",
                  cardContentClassName,
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-between",
                    authorClassName,
                  )}
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="relative flex shrink-0 overflow-hidden rounded-full size-12 ring-4 ring-primary shadow-lg">
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
                      {testimonial.handle ? testimonial.handle : null}
                    </div>
                  </div>

                  {testimonial.linkConfig?.href && (
                    <SocialLinkIcon
                      href={testimonial.linkConfig.href}
                      iconSize={24}
                    />
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
            </Pressable>
          );
        })}
      </div>
    );
  }, [
    testimonialsSlot,
    gridClassName,
    testimonials,
    cardClassName,
    cardContentClassName,
    authorClassName,
    getAuthorName,
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
                "text-pretty text-3xl md:text-4xl lg:text-6xl",
                "font-semibold tracking-tight",
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
