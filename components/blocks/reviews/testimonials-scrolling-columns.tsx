"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import { Img } from "@page-speed/img";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  TestimonialItem,
  OptixFlowConfig,
} from "../../../src/types";

/**
 * Extended testimonial item with image for scrolling columns display
 */
export interface ScrollingColumnTestimonialItem extends TestimonialItem {
  /**
   * Image URL for the testimonial card
   */
  imageSrc?: string;
}

export interface TestimonialsScrollingColumnsProps {
  /**
   * Array of testimonials to display
   */
  testimonials?: ScrollingColumnTestimonialItem[];
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
   * OptixFlow image optimization config
   */
  optixFlowConfig?: OptixFlowConfig;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

/**
 * TestimonialsScrollingColumns - An animated testimonial section with staggered card
 * animations powered by Framer Motion. Features large image cards with gradient overlays
 * and quote content positioned at the bottom. Cards animate into view with a staggered
 * effect as they enter the viewport. Ideal for visually rich testimonial sections
 * requiring engaging scroll-triggered animations.
 *
 * @example
 * ```tsx
 * <TestimonialsScrollingColumns
 *   heading="What Our Clients Say"
 *   description="Real feedback from real customers"
 *   testimonials={[
 *     {
 *       quote: "Amazing experience...",
 *       author: "Jane D.",
 *       role: "CEO",
 *       imageSrc: "/images/testimonial-1.jpg"
 *     }
 *   ]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function TestimonialsScrollingColumns({
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
  quoteClassName,
  authorClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: TestimonialsScrollingColumnsProps): React.JSX.Element {
  const getAuthorName = useCallback((
    testimonial: ScrollingColumnTestimonialItem,
  ): string => {
    if (typeof testimonial.author === "string") return testimonial.author;
    return "";
  }, []);

  const renderedTestimonials = useMemo(() => {
    if (testimonialsSlot) return testimonialsSlot;
    if (!testimonials || testimonials.length === 0) return null;

    return (
      <motion.div
        className={cn(
          "grid gap-8 md:grid-cols-2 lg:grid-cols-3",
          gridClassName,
        )}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {testimonials.map((testimonial, index) => {
          const authorName = getAuthorName(testimonial);
          return (
            <motion.div
              key={index}
              className={cn(
                "relative overflow-hidden rounded-lg bg-card shadow-sm",
                cardClassName,
              )}
              variants={itemVariants}
            >
              <div className="relative">
                {testimonial.imageSrc && (
                  <Img
                    src={testimonial.imageSrc}
                    alt={authorName}
                    className="aspect-4/5 w-full object-cover"
                    optixFlowConfig={optixFlowConfig}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-left text-white">
                <DynamicIcon
                  name="lucide/quote"
                  size={32}
                  className="mb-4 text-white/40"
                />
                {testimonial.quote &&
                  (typeof testimonial.quote === "string" ? (
                    <blockquote
                      className={cn(
                        "text-base font-medium leading-relaxed",
                        quoteClassName,
                      )}
                    >
                      {testimonial.quote}
                    </blockquote>
                  ) : (
                    <div className={quoteClassName}>{testimonial.quote}</div>
                  ))}
                <figcaption className={cn("mt-4", authorClassName)}>
                  <p className="font-semibold">
                    &mdash;{" "}
                    {testimonial.author &&
                      (typeof testimonial.author === "string"
                        ? testimonial.author
                        : null)}
                    {testimonial.role &&
                      (typeof testimonial.role === "string" ? (
                        <span className="ml-1 text-white/60">
                          , {testimonial.role}
                        </span>
                      ) : null)}
                  </p>
                </figcaption>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    );
  }, [testimonialsSlot, gridClassName, testimonials, cardClassName, optixFlowConfig, quoteClassName, authorClassName, getAuthorName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <div
        className={cn("mx-auto mb-12 max-w-2xl text-center", headerClassName)}
      >
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

      {renderedTestimonials}
    </Section>
  );
}
