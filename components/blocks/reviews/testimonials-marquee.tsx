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
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      "This platform has completely transformed how we work. The efficiency gains have been remarkable.",
    author: "Sarah Chen",
    role: "Product Manager",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar1,
  },
  {
    quote:
      "The best investment we've made this year. Our team loves it and productivity is through the roof.",
    author: "Michael Torres",
    role: "CEO",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar2,
  },
  {
    quote:
      "Incredible support team and an even better product. Highly recommend to anyone looking to scale.",
    author: "Emily Watson",
    role: "Operations Lead",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar3,
  },
  {
    quote:
      "Simple, elegant, and powerful. Everything we needed in one package. A game-changer for our workflow.",
    author: "David Kim",
    role: "CTO",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar4,
  },
  {
    quote:
      "We've tried many solutions, but this one stands out for its reliability and ease of use.",
    author: "Lisa Park",
    role: "Engineering Manager",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar5,
  },
  {
    quote:
      "The attention to detail is impressive. Every feature feels thoughtfully designed.",
    author: "Alex Rivera",
    role: "Design Director",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar6,
  },
];

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
  testimonials = DEFAULT_TESTIMONIALS,
  testimonialsSlot,
  heading,
  description,
  speed = "normal",
  pauseOnHover = true,
  className,
  headerClassName,
  headingClassName,
  descriptionClassName,
  marqueeClassName,
  cardClassName,
  quoteClassName,
  authorClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
}: TestimonialsMarqueeProps): React.JSX.Element {
  const duplicatedTestimonials = [...testimonials, ...testimonials];

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
      <div className={cn("relative", marqueeClassName)}>
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

        <div
          className={cn(
            "flex gap-4",
            pauseOnHover && "[&:hover_.marquee-content]:pause",
          )}
        >
          <div
            className="marquee-content flex shrink-0 animate-marquee gap-4"
            style={{
              animationDuration: speedMap[speed],
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => {
              const authorName = getAuthorName(testimonial);
              const avatarSrc = getAvatarSrc(testimonial);
              return (
                <Card
                  key={index}
                  className={cn("w-80 shrink-0", cardClassName)}
                >
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
        </div>
      </div>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("overflow-hidden", className)}
    >
      <div className={cn("mb-12", headerClassName)}>
        <div className="mx-auto max-w-2xl text-center">
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
      </div>

      {renderTestimonials()}

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
        .pause {
          animation-play-state: paused;
        }
      `}</style>
    </Section>
  );
}
