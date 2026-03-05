"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
  TestimonialItem,
} from "../../../src/types";

/**
 * Extended testimonial item with company logo for logo cards
 */
export interface LogoTestimonialItem extends TestimonialItem {
  /**
   * Company logo image URL
   */
  companyLogo?: string;
  /**
   * Company logo alt text
   */
  companyLogoAlt?: string;
}

export interface TestimonialsLogoCardsProps {
  /**
   * Array of testimonials to display
   */
  testimonials?: LogoTestimonialItem[];
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
   * Additional CSS classes for the card header
   */
  cardHeaderClassName?: string;
  /**
   * Additional CSS classes for the card content
   */
  cardContentClassName?: string;
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
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
}

/**
 * TestimonialsLogoCards - A grid of testimonial cards featuring company logos in the
 * header. Each card displays a company logo, extended quote, and author information
 * with avatar. The prominent logo placement emphasizes brand partnerships and enterprise
 * credibility. Ideal for B2B landing pages showcasing client testimonials with brand
 * recognition.
 *
 * @example
 * ```tsx
 * <TestimonialsLogoCards
 *   heading="Trusted by Leading Companies"
 *   description="See what our enterprise clients say"
 *   testimonials={[
 *     {
 *       quote: "Amazing platform...",
 *       author: "Jane D.",
 *       role: "CTO",
 *       avatarSrc: "/avatars/jane.jpg",
 *       companyLogo: "/logos/company.svg",
 *       companyLogoAlt: "Acme Corp"
 *     }
 *   ]}
 *   background="gray"
 *   spacing="lg"
 * />
 * ```
 */
export function TestimonialsLogoCards({
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
  cardHeaderClassName,
  cardContentClassName,
  quoteClassName,
  authorClassName,
  background,
  spacing = "lg",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: TestimonialsLogoCardsProps): React.JSX.Element {
  const getAuthorName = useCallback(
    (testimonial: LogoTestimonialItem): string => {
      if (typeof testimonial.author === "string") return testimonial.author;
      return "";
    },
    [],
  );

  const getAvatarSrc = useCallback(
    (testimonial: LogoTestimonialItem): string | undefined => {
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
          "grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2",
          gridClassName,
        )}
      >
        {testimonials.map((testimonial, index) => {
          const authorName = getAuthorName(testimonial);
          const avatarSrc = getAvatarSrc(testimonial);
          return (
            <Card
              key={index}
              className={cn(
                "flex flex-col",
                index === 0 && "sm:col-span-2 lg:row-span-2",
                cardClassName,
              )}
            >
              {testimonial.companyLogo && (
                <CardHeader className={cn("pb-0", cardHeaderClassName)}>
                  <Img
                    src={testimonial.companyLogo}
                    alt={testimonial.companyLogoAlt || "Company logo"}
                    className={cn(
                      index === 0 ? "h-10" : "h-5",
                      "w-auto object-contain",
                    )}
                    optixFlowConfig={optixFlowConfig}
                  />
                </CardHeader>
              )}
              <CardContent
                className={cn(
                  "flex flex-1 flex-col justify-between gap-6 pt-6",
                  cardContentClassName,
                )}
              >
                {testimonial.quote &&
                  (typeof testimonial.quote === "string" ? (
                    <blockquote
                      className={cn(
                        "leading-relaxed",
                        index === 0
                          ? "text-lg md:text-xl font-light"
                          : "text-sm md:text-base",
                        quoteClassName,
                      )}
                    >
                      {testimonial.quote}
                    </blockquote>
                  ) : (
                    testimonial.quote
                  ))}
                <div className={cn("flex items-center gap-3", authorClassName)}>
                  <Avatar
                    className={cn(
                      index === 0 ? "size-12" : "size-10",
                      "ring-4 ring-primary",
                    )}
                  >
                    <AvatarImage src={avatarSrc} alt={authorName} />
                    <AvatarFallback>{getInitials(authorName)}</AvatarFallback>
                  </Avatar>
                  <div>
                    {testimonial.author &&
                      (typeof testimonial.author === "string" ? (
                        <cite className="text-sm md:text-base font-medium">
                          {testimonial.author}
                        </cite>
                      ) : (
                        testimonial.author
                      ))}
                    {testimonial.role &&
                      (typeof testimonial.role === "string" ? (
                        <p className="text-xs md:text-sm">{testimonial.role}</p>
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
  }, [
    testimonialsSlot,
    gridClassName,
    testimonials,
    cardClassName,
    cardHeaderClassName,
    optixFlowConfig,
    cardContentClassName,
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
                "text-3xl font-semibold tracking-tight md:text-4xl text-balance",
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
