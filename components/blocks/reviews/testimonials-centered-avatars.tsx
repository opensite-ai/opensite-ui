"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Section } from "../../ui/section";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  TestimonialItem,
} from "../../../src/types";

export interface TestimonialsCenteredAvatarsProps {
  /**
   * Array of testimonials to display
   */
  testimonials?: TestimonialItem[];
  /**
   * Custom slot for rendering testimonials (overrides testimonials array)
   */
  testimonialsSlot?: React.ReactNode;
  /**
   * Badge/eyebrow content above title
   */
  badge?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the content container
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the avatars container
   */
  avatarsClassName?: string;
  /**
   * Additional CSS classes for the testimonials list
   */
  testimonialsClassName?: string;
  /**
   * Additional CSS classes for each testimonial item
   */
  testimonialItemClassName?: string;
  /**
   * Additional CSS classes for the quote text
   */
  quoteClassName?: string;
  /**
   * Additional CSS classes for the author info
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
      "The platform has revolutionized how we handle our daily operations. It's intuitive, powerful, and the support team is always there when we need them.",
    author: "Sarah Chen",
    role: "Product Manager",
    company: "TechCorp",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar1,
  },
  {
    quote:
      "We've seen a 40% increase in productivity since implementing this solution. It's become an essential part of our workflow.",
    author: "Michael Torres",
    role: "Operations Director",
    company: "GrowthCo",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar2,
  },
  {
    quote:
      "The best investment we've made this year. The ROI was visible within the first month of implementation.",
    author: "Emily Watson",
    role: "CEO",
    company: "StartupXYZ",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar3,
  },
];

/**
 * TestimonialsCenteredAvatars - A centered testimonial section featuring a badge,
 * title, and a row of large overlapping avatars. Displays multiple testimonials
 * in a clean, centered layout with prominent author photos creating visual interest
 * through the overlapping avatar stack. Ideal for trust-building sections on landing
 * pages where social proof from recognizable faces is important.
 *
 * @example
 * ```tsx
 * <TestimonialsCenteredAvatars
 *   badge="Testimonials"
 *   heading="Trusted by Industry Leaders"
 *   testimonials={[
 *     {
 *       quote: "This platform changed everything...",
 *       author: "Jane D.",
 *       role: "CEO",
 *       company: "TechCo",
 *       avatarSrc: "/avatars/jane.jpg"
 *     }
 *   ]}
 *   background="gray"
 *   spacing="lg"
 * />
 * ```
 */
export function TestimonialsCenteredAvatars({
  testimonials = DEFAULT_TESTIMONIALS,
  testimonialsSlot,
  badge,
  heading,
  className,
  contentClassName,
  badgeClassName,
  headingClassName,
  avatarsClassName,
  testimonialsClassName,
  testimonialItemClassName,
  quoteClassName,
  authorClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
}: TestimonialsCenteredAvatarsProps): React.JSX.Element {
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
      <div className={cn("mt-12 space-y-8", testimonialsClassName)}>
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={cn("space-y-4", testimonialItemClassName)}
          >
            {testimonial.quote &&
              (typeof testimonial.quote === "string" ? (
                <blockquote
                  className={cn(
                    "text-lg leading-relaxed text-muted-foreground md:text-xl",
                    quoteClassName,
                  )}
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
              ) : (
                <div className={quoteClassName}>{testimonial.quote}</div>
              ))}
            <div className={authorClassName}>
              {testimonial.author &&
                (typeof testimonial.author === "string" ? (
                  <p className="font-semibold">{testimonial.author}</p>
                ) : (
                  testimonial.author
                ))}
              {(testimonial.role || testimonial.company) && (
                <p className="text-sm text-muted-foreground">
                  {testimonial.role &&
                    (typeof testimonial.role === "string"
                      ? testimonial.role
                      : testimonial.role)}
                  {testimonial.company &&
                    (typeof testimonial.company === "string"
                      ? ` at ${testimonial.company}`
                      : testimonial.company)}
                </p>
              )}
            </div>
          </div>
        ))}
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
      <div className={cn("mx-auto max-w-3xl text-center", contentClassName)}>
        {badge &&
          (typeof badge === "string" ? (
            <Badge variant="secondary" className={cn("mb-4", badgeClassName)}>
              {badge}
            </Badge>
          ) : (
            <div className={cn("mb-4", badgeClassName)}>{badge}</div>
          ))}
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

        <div className={cn("mt-8 flex justify-center", avatarsClassName)}>
          <div className="flex -space-x-4">
            {testimonials.map((testimonial, index) => {
              const authorName = getAuthorName(testimonial);
              const avatarSrc = getAvatarSrc(testimonial);
              return (
                <Avatar
                  key={index}
                  className="size-16 border-4 border-background ring-2 ring-border md:size-20"
                >
                  <AvatarImage src={avatarSrc} alt={authorName} />
                  <AvatarFallback className="text-lg">
                    {getInitials(authorName)}
                  </AvatarFallback>
                </Avatar>
              );
            })}
          </div>
        </div>

        {renderTestimonials()}
      </div>
    </Section>
  );
}
