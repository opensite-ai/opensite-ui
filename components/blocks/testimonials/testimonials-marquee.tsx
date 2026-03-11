"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card, CardContent } from "../../ui/card";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  TestimonialItem,
} from "../../../src/types";

export interface TestimonialsMarqueeProps {
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
   * Scroll speed
   */
  speed?: "slow" | "normal" | "fast";
  /**
   * Whether to pause on hover
   */
  pauseOnHover?: boolean;
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
   * Additional CSS classes for the marquee container
   */
  marqueeClassName?: string;
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
  /** Optional Section ID */
  sectionId?: string;
}

const speedMap = {
  slow: "60s",
  normal: "40s",
  fast: "20s",
};

/**
 * TestimonialsMarquee - An auto-scrolling horizontal marquee of testimonial cards
 * that creates a continuous, infinite scroll effect. Features configurable scroll
 * speed and optional pause-on-hover functionality. Each card displays a quote with
 * author avatar, name, and role. Perfect for showcasing a large volume of testimonials
 * in an engaging, space-efficient manner.
 *
 * @example
 * ```tsx
 * <TestimonialsMarquee
 *   heading="What Our Customers Say"
 *   description="Join thousands of satisfied users"
 *   testimonials={[
 *     {
 *       quote: "Amazing product!",
 *       author: "John D.",
 *       role: "CEO",
 *       avatarSrc: "/avatars/john.jpg"
 *     }
 *   ]}
 *   speed="normal"
 *   pauseOnHover={true}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function TestimonialsMarquee({
  sectionId = "testimonials-marquee",
  testimonials,
  testimonialsSlot,
  heading,
  description,
  speed,
  pauseOnHover,
  className,
  headerClassName,
  headingClassName,
  descriptionClassName,
  marqueeClassName,
  cardClassName,
  quoteClassName,
  authorClassName,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  pattern,
  patternOpacity,
}: TestimonialsMarqueeProps): React.JSX.Element {
  const duplicatedTestimonials = testimonials
    ? [...testimonials, ...testimonials]
    : [];
  const effectiveSpeed = speed || "normal";

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
          "relative marquee-fade",
          pauseOnHover && "marquee-pause-on-hover",
          marqueeClassName,
        )}
      >
        <div className="flex gap-4">
          <div
            className="marquee-content flex shrink-0 animate-marquee gap-4"
            style={{
              animationDuration: speedMap[effectiveSpeed],
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => {
              const authorName = getAuthorName(testimonial);
              const avatarSrc = getAvatarSrc(testimonial);
              return (
                <Pressable
                  href={testimonial?.linkConfig?.href}
                  key={index}
                  className={cn(
                    "bg-card text-card-foreground",
                    "rounded-2xl border shadow-xl",
                    "cursor-pointer transition-all duration-500",
                    "hover:bg-primary hover:text-primary-foreground",
                    "flex flex-col gap-6 w-80 shrink-0",
                    cardClassName,
                  )}
                >
                  <CardContent className="p-6 h-full flex flex-col justify-between gap-12">
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
                      className={cn("flex items-center gap-4", authorClassName)}
                    >
                      <Avatar className="relative flex shrink-0 overflow-hidden rounded-full size-10 ring-4 ring-primary shadow-lg">
                        <AvatarImage src={avatarSrc} alt={authorName} />
                        <AvatarFallback className="text-xs">
                          {getInitials(authorName)}
                        </AvatarFallback>
                      </Avatar>
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
                            <p className="text-sm">{testimonial.role}</p>
                          ) : (
                            testimonial.role
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Pressable>
              );
            })}
          </div>
        </div>
      </div>
    );
  }, [
    testimonialsSlot,
    marqueeClassName,
    pauseOnHover,
    effectiveSpeed,
    duplicatedTestimonials,
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
      className={cn("overflow-hidden", className)}
      containerClassName={containerClassName}
    >
      <div className={cn("mb-12", headerClassName)}>
        <div className="mx-auto max-w-full md:max-w-2xl text-center space-y-2">
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "text-3xl font-semibold tracking-tight md:text-4xl lg:text-6xl text-pretty",
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
              <p className={cn("text-lg text-balance", descriptionClassName)}>
                {description}
              </p>
            ) : (
              description
            ))}
        </div>
      </div>

      {renderedTestimonials}

      <style>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
        .marquee-pause-on-hover:hover .marquee-content {
          animation-play-state: paused;
        }
        .marquee-fade {
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }
      `}</style>
    </Section>
  );
}
