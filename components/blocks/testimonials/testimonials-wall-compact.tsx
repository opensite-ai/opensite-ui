"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  TestimonialItem,
} from "../../../src/types";
import { ActionConfig } from "@page-speed/maps/components/geo-map";
import { BlockActions } from "@/components/ui/block-actions";

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
}

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
  authorClassName,
  quoteClassName,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "lg",
  pattern,
  patternOpacity,
  actions,
  actionsSlot,
  actionsClassName,
}: TestimonialsWallCompactProps): React.JSX.Element {
  const getAuthorName = useCallback(
    (testimonial: WallTestimonialItem): string => {
      if (typeof testimonial.author === "string") return testimonial.author;
      return "";
    },
    [],
  );

  const getAvatarSrc = useCallback(
    (testimonial: WallTestimonialItem): string | undefined => {
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
          "grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
          gridClassName,
        )}
      >
        {testimonials.map((testimonial, index) => {
          const authorName = getAuthorName(testimonial);
          const avatarSrc = getAvatarSrc(testimonial);
          return (
            <div
              key={index}
              className={cn(
                "bg-card text-card-foreground",
                "rounded-lg border p-4 transition-shadow hover:shadow-md",
                cardClassName,
              )}
            >
              <div
                className={cn(
                  "mb-3 flex items-start justify-between gap-2",
                  authorClassName,
                )}
              >
                <div className="flex items-center gap-2">
                  <Avatar className="size-8">
                    <AvatarImage src={avatarSrc} alt={authorName} />
                    <AvatarFallback className="text-xs">
                      {getInitials(authorName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    {testimonial.author &&
                      (typeof testimonial.author === "string" ? (
                        <p className="truncate text-sm font-medium">
                          {testimonial.author}
                        </p>
                      ) : (
                        testimonial.author
                      ))}
                    {testimonial.handle && (
                      <p className="truncate text-xs font-semibold opacity-75">
                        {testimonial.handle}
                      </p>
                    )}
                  </div>
                </div>
                {testimonial.badge &&
                  (typeof testimonial.badge === "string" ? (
                    <Badge variant="secondary" className="shrink-0 text-xs">
                      {testimonial.badge}
                    </Badge>
                  ) : (
                    testimonial.badge
                  ))}
              </div>
              {testimonial.quote &&
                (typeof testimonial.quote === "string" ? (
                  <p
                    className={cn(
                      "text-sm leading-relaxed pt-2",
                      quoteClassName,
                    )}
                  >
                    {testimonial.quote}
                  </p>
                ) : (
                  testimonial.quote
                ))}
            </div>
          );
        })}
      </div>
    );
  }, [
    testimonialsSlot,
    gridClassName,
    testimonials,
    cardClassName,
    authorClassName,
    quoteClassName,
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
        className={cn(
          "mx-auto mb-12 max-w-full md:max-w-md text-center",
          headerClassName,
        )}
      >
        {heading &&
          (typeof heading === "string" ? (
            <h2
              className={cn(
                "text-3xl font-semibold tracking-tight md:text-4xl text-pretty",
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
