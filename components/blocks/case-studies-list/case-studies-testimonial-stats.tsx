"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Separator } from "../../ui/separator";
import { Section } from "../../ui/section";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface CaseStudyTestimonialStat {
  /**
   * Stat value (e.g., "98%", "3.8x")
   */
  value: React.ReactNode;
  /**
   * Stat label (e.g., "Customer Satisfaction")
   */
  label: React.ReactNode;
  /**
   * Stat description (e.g., "From verified reviews")
   */
  description: React.ReactNode;
}

export interface CaseStudyTestimonialItem {
  /**
   * Testimonial author image URL
   */
  image: string;
  /**
   * Testimonial quote text
   */
  quote: React.ReactNode;
  /**
   * Author name
   */
  authorName: React.ReactNode;
  /**
   * Author role/title
   */
  authorRole: React.ReactNode;
  /**
   * Company logo image URL
   */
  companyLogo: string;
  /**
   * Array of stats for this testimonial
   */
  stats: CaseStudyTestimonialStat[];
}

export interface CaseStudiesTestimonialStatsProps {
  /**
   * Section heading text
   */
  heading?: React.ReactNode;
  /**
   * Section subheading/title
   */
  subheading?: React.ReactNode;
  /**
   * Array of testimonial items
   */
  testimonials?: CaseStudyTestimonialItem[];
  /**
   * Custom slot for rendering testimonials (overrides testimonials array)
   */
  testimonialsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header area
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the subheading
   */
  subheadingClassName?: string;
  /**
   * Additional CSS classes for the testimonials container
   */
  testimonialsClassName?: string;
  /**
   * Additional CSS classes for each testimonial item
   */
  testimonialItemClassName?: string;
  /**
   * Additional CSS classes for the testimonial image
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for the quote text
   */
  quoteClassName?: string;
  /**
   * Additional CSS classes for the author info
   */
  authorClassName?: string;
  /**
   * Additional CSS classes for the stats container
   */
  statsClassName?: string;
  /**
   * Additional CSS classes for the separator
   */
  separatorClassName?: string;
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
}

/**
 * CaseStudiesTestimonialStats displays customer testimonials alongside key metrics
 * in a split-layout format with visual separators.
 *
 * Features a two-column layout with customer photo and quote on the left, and
 * performance statistics on the right. Each testimonial includes author details
 * with company logo. Multiple testimonials are separated by horizontal dividers.
 * Ideal for showcasing customer success stories with quantifiable results and
 * social proof metrics.
 *
 * @example
 * ```tsx
 * <CaseStudiesTestimonialStats
 *   heading="4500+ Satisfied Customers"
 *   subheading="Real results from real users"
 *   testimonials={[
 *     {
 *       image: "/images/customer.jpg",
 *       quote: "This tool transformed our workflow...",
 *       authorName: "John Doe",
 *       authorRole: "CEO",
 *       companyLogo: "/logos/company.svg",
 *       stats: [
 *         { value: "98%", label: "Satisfaction", description: "From reviews" }
 *       ]
 *     }
 *   ]}
 * />
 * ```
 */
export function CaseStudiesTestimonialStats({
  heading,
  subheading,
  testimonials,
  testimonialsSlot,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  subheadingClassName,
  testimonialsClassName,
  testimonialItemClassName,
  imageClassName,
  quoteClassName,
  authorClassName,
  statsClassName,
  separatorClassName,
  background = "white",
  spacing = "xl",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: CaseStudiesTestimonialStatsProps): React.JSX.Element {
  const renderedTestimonials = React.useMemo(() => {
    if (testimonialsSlot) return testimonialsSlot;
    if (!testimonials || testimonials.length === 0) return null;

    return testimonials.map((testimonial, index) => (
      <div key={index} className={testimonialItemClassName}>
        {index > 0 && <Separator className={cn("my-20", separatorClassName)} />}
        <div className="grid gap-16 lg:grid-cols-3 xl:gap-24">
          <div className="flex flex-col gap-10 border-border sm:flex-row lg:col-span-2 lg:border-r lg:pr-16 xl:pr-24">
            <Img
              src={testimonial.image}
              alt={
                typeof testimonial.authorName === "string"
                  ? testimonial.authorName
                  : "Testimonial author"
              }
              className={cn(
                "aspect-29/35 h-full w-full max-w-60 rounded-2xl object-cover",
                imageClassName,
              )}
              loading="lazy"
              optixFlowConfig={optixFlowConfig}
            />
            <div className="flex h-full flex-col justify-between gap-10">
              {typeof testimonial.quote === "string" ? (
                <q className={cn("sm:text-xl", quoteClassName)}>
                  {testimonial.quote}
                </q>
              ) : (
                <div className={quoteClassName}>{testimonial.quote}</div>
              )}
              <div className={cn("flex items-end gap-6", authorClassName)}>
                <div className="flex flex-col gap-1">
                  {typeof testimonial.authorName === "string" ? (
                    <p className="text-lg font-semibold text-primary">
                      {testimonial.authorName}
                    </p>
                  ) : (
                    testimonial.authorName
                  )}
                  {typeof testimonial.authorRole === "string" ? (
                    <p className="text-muted-foreground">
                      {testimonial.authorRole}
                    </p>
                  ) : (
                    testimonial.authorRole
                  )}
                </div>
                <Img
                  src={testimonial.companyLogo}
                  alt="Company logo"
                  loading="lazy"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            </div>
          </div>
          <div
            className={cn(
              "flex gap-10 self-center lg:flex-col",
              statsClassName,
            )}
          >
            {testimonial.stats.map((stat, statIndex) => (
              <div key={statIndex} className="flex flex-col gap-2">
                {typeof stat.value === "string" ? (
                  <p className="text-4xl font-medium text-primary sm:text-5xl">
                    {stat.value}
                  </p>
                ) : (
                  stat.value
                )}
                {typeof stat.label === "string" ? (
                  <p className="font-semibold text-primary">{stat.label}</p>
                ) : (
                  stat.label
                )}
                {typeof stat.description === "string" ? (
                  <p className="text-muted-foreground">{stat.description}</p>
                ) : (
                  stat.description
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    ));
  }, [
    testimonialsSlot,
    testimonials,
    testimonialItemClassName,
    separatorClassName,
    imageClassName,
    quoteClassName,
    authorClassName,
    statsClassName,
    optixFlowConfig,
  ]);

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("container", containerClassName)}>
        <div className={cn("flex flex-col gap-6 text-center", headerClassName)}>
          {heading &&
            (typeof heading === "string" ? (
              <p className={cn("font-medium", headingClassName)}>{heading}</p>
            ) : (
              <div className={headingClassName}>{heading}</div>
            ))}
          {subheading &&
            (typeof subheading === "string" ? (
              <h2
                className={cn(
                  "text-4xl font-medium md:text-5xl",
                  subheadingClassName,
                )}
              >
                {subheading}
              </h2>
            ) : (
              <div className={subheadingClassName}>{subheading}</div>
            ))}
        </div>
        <div className={cn("mt-20", testimonialsClassName)}>
          {renderedTestimonials}
        </div>
      </div>
    </Section>
  );
}
