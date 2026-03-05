"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
  TestimonialItem,
} from "../../../src/types";
import { Pressable } from "../../../lib/Pressable";

export interface TestimonialsCompanyLogoProps {
  /**
   * Testimonial data using shared TestimonialItem type
   */
  testimonial?: TestimonialItem;
  /**
   * Custom slot for rendering testimonial (overrides testimonial prop)
   */
  testimonialSlot?: React.ReactNode;
  /**
   * Company logo image URL
   */
  companyLogo?: string;
  /**
   * Company logo alt text
   */
  companyLogoAlt?: string;
  /**
   * Featured image URL
   */
  imageSrc?: string;
  /**
   * Featured image alt text
   */
  imageAlt?: string;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the grid container
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for the content column
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the company logo
   */
  logoClassName?: string;
  /**
   * Additional CSS classes for the quote
   */
  quoteClassName?: string;
  /**
   * Additional CSS classes for the author section
   */
  authorClassName?: string;
  /**
   * Additional CSS classes for the image container
   */
  imageClassName?: string;
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
 * TestimonialsCompanyLogo - A prominent company testimonial section featuring a large
 * company logo, extended quote, author information, and an accompanying image. Designed
 * for showcasing enterprise-level endorsements with visual branding. The split layout
 * places the testimonial content alongside a professional image. Perfect for B2B landing
 * pages and case study highlights.
 *
 * @example
 * ```tsx
 * <TestimonialsCompanyLogo
 *   testimonial={{
 *     quote: "This platform transformed our operations...",
 *     author: "Jane D.",
 *     role: "CTO",
 *   }}
 *   companyLogo="/logos/company.svg"
 *   companyLogoAlt="Acme Corp"
 *   imageSrc="/images/office.jpg"
 *   background="gray"
 *   spacing="lg"
 * />
 * ```
 */
export function TestimonialsCompanyLogo({
  testimonial,
  testimonialSlot,
  companyLogo,
  companyLogoAlt,
  imageSrc,
  imageAlt,
  className,
  gridClassName,
  contentClassName,
  logoClassName,
  quoteClassName,
  authorClassName,
  imageClassName,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: TestimonialsCompanyLogoProps): React.JSX.Element {
  const renderedTestimonial = useMemo(() => {
    if (testimonialSlot) return testimonialSlot;
    if (!testimonial) return null;

    return (
      <div className={cn("space-y-12 md:space-y-16", contentClassName)}>
        <div className="relative">
          <DynamicIcon name="mdi/comment-quote-outline" size={48} />

          {testimonial.quote &&
            (typeof testimonial.quote === "string" ? (
              <blockquote
                className={cn(
                  "relative text-lg font-light leading-relaxed md:text-2xl",
                  quoteClassName,
                )}
              >
                {testimonial.quote}
              </blockquote>
            ) : (
              testimonial.quote
            ))}
        </div>

        <div className={cn("flex flex-row justify-between items-center gap-4")}>
          {companyLogo && (
            <Img
              src={companyLogo}
              alt={companyLogoAlt}
              className={cn("h-12 w-auto object-contain", logoClassName)}
              optixFlowConfig={optixFlowConfig}
            />
          )}
          <div className={cn("space-y-1 text-right", authorClassName)}>
            <div className="flex flex-col items-end">
              {testimonial.author &&
                (typeof testimonial.author === "string" ? (
                  <span className="font-semibold">{testimonial.author}</span>
                ) : (
                  testimonial.author
                ))}
              {testimonial.role &&
                (typeof testimonial.role === "string" ? (
                  <span className="text-sm opacity-75">{testimonial.role}</span>
                ) : (
                  testimonial.role
                ))}
            </div>
            <Pressable
              href={testimonial.linkConfig?.href}
              className="cursor-pointer text-sm font-bold uppercase transition-all duration-500 hover:underline hover:underline-offset-4"
            >
              {testimonial.linkConfig?.label || "Learn more"}
            </Pressable>
          </div>
        </div>
      </div>
    );
  }, [
    testimonialSlot,
    contentClassName,
    companyLogo,
    companyLogoAlt,
    logoClassName,
    optixFlowConfig,
    testimonial,
    quoteClassName,
    authorClassName,
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
          "grid items-center gap-16 lg:gap-24 grid-cols-1 lg:grid-cols-2",
          gridClassName,
        )}
      >
        {renderedTestimonial}

        {imageSrc && (
          <div
            className={cn(
              "ring-8 ring-primary",
              "relative aspect-4/3 overflow-hidden",
              "rounded-2xl shadow-xl",
              imageClassName,
            )}
          >
            <Img
              src={imageSrc}
              alt={imageAlt}
              className="size-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        )}
      </div>
    </Section>
  );
}
