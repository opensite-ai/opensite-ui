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

/**
 * Extended testimonial item with handle and badge for wall display
 */
export interface WallTestimonialItem extends TestimonialItem {
  /**
   * Social media handle (e.g., "@username")
   */
  handle?: string;
  /**
   * Badge text to display (e.g., "Featured", "Verified")
   */
  badge?: React.ReactNode;
}

export interface TestimonialsWallCompactProps {
  /**
   * Array of testimonials to display
   */
  testimonials?: WallTestimonialItem[];
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
   * Additional CSS classes for the author section
   */
  authorClassName?: string;
  /**
   * Additional CSS classes for the quote text
   */
  quoteClassName?: string;
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
  pattern?: PatternName | string;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
}

const DEFAULT_TESTIMONIALS: WallTestimonialItem[] = [
  {
    quote: "Game-changer for our team. Productivity up 50%!",
    author: "Sarah Chen",
    handle: "@sarahchen",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar1,
    badge: "Featured",
  },
  {
    quote: "Best tool I've used in years. Highly recommend.",
    author: "Michael Torres",
    handle: "@mtorres",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar2,
  },
  {
    quote: "Support team is incredible. Always there when needed.",
    author: "Emily Watson",
    handle: "@emilyw",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar3,
  },
  {
    quote: "Clean UI, powerful features. Perfect combo.",
    author: "David Kim",
    handle: "@davidkim",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar4,
    badge: "Verified",
  },
  {
    quote: "Switched from competitors. Never looking back.",
    author: "Lisa Park",
    handle: "@lisapark",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar5,
  },
  {
    quote: "ROI was visible in the first week. Amazing!",
    author: "Alex Rivera",
    handle: "@alexr",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar6,
  },
  {
    quote: "Documentation is top-notch. Easy to get started.",
    author: "Jordan Lee",
    handle: "@jordanlee",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar7,
  },
  {
    quote: "Our whole team adopted it instantly. Love it!",
    author: "Maya Patel",
    handle: "@mayap",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar8,
    badge: "Power User",
  },
  {
    quote: "Finally, a tool that just works. No fuss.",
    author: "Chris Wong",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar1,
  },
  {
    quote: "Customer service responded in minutes. Impressed!",
    author: "Emma Davis",
    handle: "@emmad",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar2,
  },
  {
    quote: "Worth every penny. Quality is unmatched.",
    author: "Ryan Miller",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar3,
  },
  {
    quote: "Integrations work flawlessly. Saved us hours.",
    author: "Sophie Brown",
    handle: "@sophieb",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar4,
  },
];

/**
 * TestimonialsWallCompact - A dense wall of compact testimonial cards arranged in
 * a multi-column grid. Each card displays a short quote, author avatar, name, and
 * optional handle and badge. The compact design allows displaying many testimonials
 * in a small space, creating a powerful visual of social proof. Ideal for showcasing
 * volume of positive feedback.
 *
 * @example
 * ```tsx
 * <TestimonialsWallCompact
 *   heading="Wall of Love"
 *   description="What our community is saying"
 *   testimonials={[
 *     {
 *       quote: "Amazing product!",
 *       author: "John D.",
 *       handle: "@johnd",
 *       avatarSrc: "/avatars/john.jpg",
 *       badge: "Featured"
 *     }
 *   ]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function TestimonialsWallCompact({
  testimonials = DEFAULT_TESTIMONIALS,
  testimonialsSlot,
  heading = "Wall of Love",
  description = "What our community is saying",
  className,
  headerClassName,
  headingClassName,
  descriptionClassName,
  gridClassName,
  cardClassName,
  authorClassName,
  quoteClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
}: TestimonialsWallCompactProps): React.JSX.Element {
  const getAuthorName = (testimonial: WallTestimonialItem): string => {
    if (typeof testimonial.author === "string") return testimonial.author;
    return "";
  };

  const getAvatarSrc = (testimonial: WallTestimonialItem): string | undefined => {
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
      <div className={cn("grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4", gridClassName)}>
        {testimonials.map((testimonial, index) => {
          const authorName = getAuthorName(testimonial);
          const avatarSrc = getAvatarSrc(testimonial);
          return (
            <div
              key={index}
              className={cn("rounded-lg border bg-card p-4 transition-shadow hover:shadow-md", cardClassName)}
            >
              <div className={cn("mb-3 flex items-start justify-between gap-2", authorClassName)}>
                <div className="flex items-center gap-2">
                  <Avatar className="size-8">
                    <AvatarImage
                      src={avatarSrc}
                      alt={authorName}
                    />
                    <AvatarFallback className="text-xs">
                      {getInitials(authorName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    {testimonial.author && (
                      typeof testimonial.author === "string" ? (
                        <p className="truncate text-sm font-medium">
                          {testimonial.author}
                        </p>
                      ) : (
                        testimonial.author
                      )
                    )}
                    {testimonial.handle && (
                      <p className="truncate text-xs text-muted-foreground">
                        {testimonial.handle}
                      </p>
                    )}
                  </div>
                </div>
                {testimonial.badge && (
                  typeof testimonial.badge === "string" ? (
                    <Badge variant="secondary" className="shrink-0 text-xs">
                      {testimonial.badge}
                    </Badge>
                  ) : (
                    testimonial.badge
                  )
                )}
              </div>
              {testimonial.quote && (
                typeof testimonial.quote === "string" ? (
                  <p className={cn("text-sm leading-relaxed", quoteClassName)}>{testimonial.quote}</p>
                ) : (
                  <div className={quoteClassName}>{testimonial.quote}</div>
                )
              )}
            </div>
          );
        })}
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
      <div className={cn("mx-auto mb-12 max-w-2xl text-center", headerClassName)}>
        {heading && (
          typeof heading === "string" ? (
            <h2 className={cn("text-3xl font-semibold tracking-tight md:text-4xl", headingClassName)}>
              {heading}
            </h2>
          ) : (
            <div className={headingClassName}>{heading}</div>
          )
        )}
        {description && (
          typeof description === "string" ? (
            <p className={cn("mt-4 text-lg text-muted-foreground", descriptionClassName)}>
              {description}
            </p>
          ) : (
            <div className={cn("mt-4", descriptionClassName)}>{description}</div>
          )
        )}
      </div>

      {renderTestimonials()}
    </Section>
  );
}
