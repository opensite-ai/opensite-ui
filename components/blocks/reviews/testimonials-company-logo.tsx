"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
  TestimonialItem,
} from "../../../src/types";

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
  pattern?: PatternName | string;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const DEFAULT_TESTIMONIAL: TestimonialItem = {
  quote:
    "Implementing this solution was the best decision we made this year. Our team productivity increased by 40% and customer satisfaction scores have never been higher. The support team is exceptional - they're always available and incredibly knowledgeable.",
  author: "Jennifer Martinez",
  role: "Chief Technology Officer",
};

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
  testimonial = DEFAULT_TESTIMONIAL,
  testimonialSlot,
  companyLogo = blockBrandedIconsAndPlaceholders.fictionalCompanyLogo1,
  companyLogoAlt = "Company Logo",
  imageSrc = imagePlaceholders[20],
  imageAlt = "Testimonial",
  className,
  gridClassName,
  contentClassName,
  logoClassName,
  quoteClassName,
  authorClassName,
  imageClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: TestimonialsCompanyLogoProps): React.JSX.Element {
  const renderTestimonial = () => {
    if (testimonialSlot) return testimonialSlot;

    return (
      <div className={cn("space-y-8", contentClassName)}>
        {companyLogo && (
          <Img
            src={companyLogo}
            alt={companyLogoAlt}
            className={cn("h-10 w-auto object-contain", logoClassName)}
            optixFlowConfig={optixFlowConfig}
          />
        )}

        <div className="relative">
          <DynamicIcon
            name="lucide/quote"
            size={40}
            className="absolute -left-2 -top-4 text-primary/10"
          />
          {testimonial.quote && (
            typeof testimonial.quote === "string" ? (
              <blockquote className={cn("relative text-xl font-medium leading-relaxed md:text-2xl", quoteClassName)}>
                {testimonial.quote}
              </blockquote>
            ) : (
              <div className={quoteClassName}>{testimonial.quote}</div>
            )
          )}
        </div>

        <div className={cn("flex items-center gap-4", authorClassName)}>
          <div className="h-px flex-1 bg-border" />
          <div className="text-right">
            {testimonial.author && (
              typeof testimonial.author === "string" ? (
                <p className="font-semibold">{testimonial.author}</p>
              ) : (
                testimonial.author
              )
            )}
            {testimonial.role && (
              typeof testimonial.role === "string" ? (
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              ) : (
                testimonial.role
              )
            )}
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
      className={className}
    >
      <div className={cn("grid items-center gap-12 lg:grid-cols-2", gridClassName)}>
        {renderTestimonial()}

        {imageSrc && (
          <div className={cn("relative aspect-4/3 overflow-hidden rounded-2xl", imageClassName)}>
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
