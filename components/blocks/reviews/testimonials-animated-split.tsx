"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Section } from "../../ui/section";
import { Img } from "@page-speed/img";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  TestimonialItem,
  OptixFlowConfig,
} from "../../../src/types";

/**
 * Extended testimonial item with image for animated split display
 */
export interface AnimatedSplitTestimonialItem extends TestimonialItem {
  /**
   * Image URL for the testimonial
   */
  image?: string;
}

export interface TestimonialsAnimatedSplitProps {
  /**
   * Array of testimonials to display
   */
  testimonials?: AnimatedSplitTestimonialItem[];
  /**
   * Custom slot for rendering testimonials (overrides testimonials array)
   */
  testimonialsSlot?: React.ReactNode;
  /**
   * Auto-play interval in milliseconds (0 to disable)
   */
  autoPlayInterval?: number;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the image container
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for the content container
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the quote text
   */
  quoteClassName?: string;
  /**
   * Additional CSS classes for the author section
   */
  authorClassName?: string;
  /**
   * Additional CSS classes for the navigation controls
   */
  navigationClassName?: string;
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
   * OptixFlow image optimization config
   */
  optixFlowConfig?: OptixFlowConfig;
}

const DEFAULT_TESTIMONIALS: AnimatedSplitTestimonialItem[] = [
  {
    quote:
      "This platform has completely transformed how we approach our daily operations. The intuitive design and powerful features have made our team significantly more productive.",
    author: "Sarah Chen",
    role: "Product Manager",
    company: "TechCorp",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar1,
    image: imagePlaceholders[30],
  },
  {
    quote:
      "The best investment we've made this year. Our team adopted it instantly and the results speak for themselves. Customer satisfaction is at an all-time high.",
    author: "Michael Torres",
    role: "CEO",
    company: "StartupXYZ",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar2,
    image: imagePlaceholders[31],
  },
  {
    quote:
      "Outstanding support and an exceptional product. The team goes above and beyond to ensure our success. I couldn't recommend them more highly.",
    author: "Emily Watson",
    role: "Operations Director",
    company: "GrowthCo",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar3,
    image: imagePlaceholders[32],
  },
];

/**
 * TestimonialsAnimatedSplit - An animated split-screen testimonial section with smooth
 * transitions powered by Framer Motion. Features a large image on one side and animated
 * quote content on the other. Includes auto-play functionality, navigation dots, and
 * previous/next buttons. The animations create an engaging, premium feel. Perfect for
 * hero sections or featured testimonial showcases.
 *
 * @example
 * ```tsx
 * <TestimonialsAnimatedSplit
 *   testimonials={[
 *     {
 *       quote: "This service transformed our business...",
 *       author: "Jane D.",
 *       role: "CEO",
 *       company: "TechCo",
 *       avatarSrc: "/avatars/jane.jpg",
 *       image: "/images/testimonial-1.jpg"
 *     }
 *   ]}
 *   autoPlayInterval={6000}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function TestimonialsAnimatedSplit({
  testimonials = DEFAULT_TESTIMONIALS,
  testimonialsSlot,
  autoPlayInterval = 6000,
  className,
  imageClassName,
  contentClassName,
  quoteClassName,
  authorClassName,
  navigationClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: TestimonialsAnimatedSplitProps): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  useEffect(() => {
    if (autoPlayInterval <= 0) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlayInterval, goToNext]);

  const current = testimonials[currentIndex];

  const getAuthorName = (testimonial: AnimatedSplitTestimonialItem): string => {
    if (typeof testimonial.author === "string") return testimonial.author;
    return "";
  };

  const getAvatarSrc = (testimonial: AnimatedSplitTestimonialItem): string | undefined => {
    return testimonial.avatarSrc || testimonial.avatar?.src;
  };

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  const renderTestimonial = () => {
    if (testimonialsSlot) return testimonialsSlot;

    const authorName = getAuthorName(current);
    const avatarSrc = getAvatarSrc(current);

    return (
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className={cn("relative aspect-4/3 overflow-hidden rounded-2xl lg:aspect-square", imageClassName)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {current.image && (
                <Img
                  src={current.image}
                  alt="Testimonial"
                  className="size-full object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={cn("space-y-8", contentClassName)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <DynamicIcon
                name="lucide/quote"
                size={48}
                className="text-primary/20"
              />

              {current.quote && (
                typeof current.quote === "string" ? (
                  <blockquote className={cn("text-xl font-medium leading-relaxed md:text-2xl", quoteClassName)}>
                    {current.quote}
                  </blockquote>
                ) : (
                  <div className={quoteClassName}>{current.quote}</div>
                )
              )}

              <div className={cn("flex items-center gap-4", authorClassName)}>
                <Avatar className="size-12">
                  <AvatarImage
                    src={avatarSrc}
                    alt={authorName}
                  />
                  <AvatarFallback>
                    {getInitials(authorName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  {current.author && (
                    typeof current.author === "string" ? (
                      <p className="font-semibold">{current.author}</p>
                    ) : (
                      current.author
                    )
                  )}
                  <p className="text-sm text-muted-foreground">
                    {current.role && (
                      typeof current.role === "string" ? current.role : null
                    )}
                    {current.company && (
                      typeof current.company === "string" ? ` at ${current.company}` : null
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className={cn("flex items-center gap-4", navigationClassName)}>
            <button
              onClick={goToPrev}
              className="flex size-10 items-center justify-center rounded-full border transition-colors hover:bg-muted"
              aria-label="Previous testimonial"
            >
              <DynamicIcon name="lucide/chevron-left" size={20} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "size-2 rounded-full transition-all",
                    index === currentIndex
                      ? "w-6 bg-primary"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="flex size-10 items-center justify-center rounded-full border transition-colors hover:bg-muted"
              aria-label="Next testimonial"
            >
              <DynamicIcon name="lucide/chevron-right" size={20} />
            </button>
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
      {renderTestimonial()}
    </Section>
  );
}
