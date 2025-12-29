"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
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

export interface TestimonialsSplitImageProps {
  /**
   * Testimonial data using shared TestimonialItem type
   */
  testimonial?: TestimonialItem;
  /**
   * Custom slot for rendering testimonial (overrides testimonial prop)
   */
  testimonialSlot?: React.ReactNode;
  /**
   * Featured image URL
   */
  imageSrc?: string;
  /**
   * Featured image alt text
   */
  imageAlt?: string;
  /**
   * Position of the image relative to content
   */
  imagePosition?: "left" | "right";
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the grid container
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for the image container
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for the content container
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the quote icon
   */
  quoteIconClassName?: string;
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
    "Working with this team has been transformative for our business. Their expertise and dedication to quality have helped us achieve results we never thought possible. The attention to detail and commitment to excellence is evident in everything they do.",
  author: "Sarah Chen",
  role: "Chief Executive Officer",
  company: "TechVentures Inc.",
  avatarSrc: blockBrandedIconsAndPlaceholders.avatar1,
};

/**
 * TestimonialsSplitImage - A two-column split layout testimonial featuring a large
 * image on one side and a prominent quote with author details on the other. The image
 * position is configurable (left or right). Includes a decorative quote icon, author
 * avatar, name, role, and company. Ideal for featured testimonials, case study highlights,
 * or any section requiring visual impact alongside social proof.
 *
 * @example
 * ```tsx
 * <TestimonialsSplitImage
 *   testimonial={{
 *     quote: "This service transformed our business...",
 *     author: "Jane D.",
 *     role: "CEO",
 *     company: "TechCo",
 *     avatarSrc: "/avatars/jane.jpg"
 *   }}
 *   imageSrc="/images/testimonial.jpg"
 *   imagePosition="left"
 *   background="gray"
 *   spacing="lg"
 * />
 * ```
 */
export function TestimonialsSplitImage({
  testimonial = DEFAULT_TESTIMONIAL,
  testimonialSlot,
  imageSrc = imagePlaceholders[25],
  imageAlt = "Testimonial",
  imagePosition = "left",
  className,
  gridClassName,
  imageClassName,
  contentClassName,
  quoteIconClassName,
  quoteClassName,
  authorClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: TestimonialsSplitImageProps): React.JSX.Element {
  const getAuthorName = (): string => {
    if (typeof testimonial.author === "string") return testimonial.author;
    return "";
  };

  const getAvatarSrc = (): string | undefined => {
    return testimonial.avatarSrc || testimonial.avatar?.src;
  };

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  const renderTestimonial = () => {
    if (testimonialSlot) return testimonialSlot;

    const authorName = getAuthorName();
    const avatarSrc = getAvatarSrc();

    return (
      <div
        className={cn(
          "space-y-6",
          imagePosition === "right" && "lg:order-1",
          contentClassName
        )}
      >
        <DynamicIcon
          name="lucide/quote"
          size={48}
          className={cn("text-primary/20", quoteIconClassName)}
        />

        {testimonial.quote && (
          typeof testimonial.quote === "string" ? (
            <blockquote className={cn("text-xl font-medium leading-relaxed md:text-2xl", quoteClassName)}>
              {testimonial.quote}
            </blockquote>
          ) : (
            <div className={quoteClassName}>{testimonial.quote}</div>
          )
        )}

        <div className={cn("flex items-center gap-4 pt-4", authorClassName)}>
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
            {testimonial.author && (
              typeof testimonial.author === "string" ? (
                <p className="font-semibold">{testimonial.author}</p>
              ) : (
                testimonial.author
              )
            )}
            {(testimonial.role || testimonial.company) && (
              <p className="text-sm text-muted-foreground">
                {testimonial.role && (
                  typeof testimonial.role === "string" ? testimonial.role : testimonial.role
                )}
                {testimonial.company && (
                  typeof testimonial.company === "string"
                    ? ` at ${testimonial.company}`
                    : testimonial.company
                )}
              </p>
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
        {imageSrc && (
          <div
            className={cn(
              "relative aspect-4/3 overflow-hidden rounded-2xl lg:aspect-square",
              imagePosition === "right" && "lg:order-2",
              imageClassName
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

        {renderTestimonial()}
      </div>
    </Section>
  );
}
