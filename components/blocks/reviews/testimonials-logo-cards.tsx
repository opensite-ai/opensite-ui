"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
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

const DEFAULT_TESTIMONIALS: LogoTestimonialItem[] = [
  {
    quote:
      "This platform has transformed the way we develop web applications. The extensive collection of UI components and blocks has significantly accelerated our workflow. The flexibility to customize every aspect allows us to create unique user experiences.",
    author: "Sarah Chen",
    role: "Software Engineer",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar1,
    companyLogo: blockBrandedIconsAndPlaceholders.fictionalCompanyLogo1,
    companyLogoAlt: "TechCorp",
  },
  {
    quote:
      "Extraordinary and very practical. No need to break your head trying to figure things out. A real gold mine for developers who want to ship fast without sacrificing quality.",
    author: "Michael Torres",
    role: "Software Engineer",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar2,
    companyLogo: blockBrandedIconsAndPlaceholders.fictionalCompanyLogo2,
    companyLogoAlt: "StartupXYZ",
  },
  {
    quote:
      "Great work on the templates. This is one of the best component libraries I have seen so far! The attention to detail and the quality of the code is impressive.",
    author: "Emily Watson",
    role: "Creator",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar3,
    companyLogo: blockBrandedIconsAndPlaceholders.fictionalCompanyLogo3,
    companyLogoAlt: "GrowthCo",
  },
  {
    quote:
      "The best personal website template I have seen so far! Clean, modern, and incredibly well-documented. Made our development process so much smoother.",
    author: "David Kim",
    role: "Creator",
    avatarSrc: blockBrandedIconsAndPlaceholders.avatar4,
    companyLogo: blockBrandedIconsAndPlaceholders.fictionalCompanyLogo4,
    companyLogoAlt: "DevStudio",
  },
];

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
  testimonials = DEFAULT_TESTIMONIALS,
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
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: TestimonialsLogoCardsProps): React.JSX.Element {
  const getAuthorName = (testimonial: LogoTestimonialItem): string => {
    if (typeof testimonial.author === "string") return testimonial.author;
    return "";
  };

  const getAvatarSrc = (testimonial: LogoTestimonialItem): string | undefined => {
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
      <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2", gridClassName)}>
        {testimonials.map((testimonial, index) => {
          const authorName = getAuthorName(testimonial);
          const avatarSrc = getAvatarSrc(testimonial);
          return (
            <Card
              key={index}
              className={cn(
                "flex flex-col",
                index === 0 && "sm:col-span-2 lg:row-span-2",
                cardClassName
              )}
            >
              {testimonial.companyLogo && (
                <CardHeader className={cn("pb-0", cardHeaderClassName)}>
                  <Img
                    src={testimonial.companyLogo}
                    alt={testimonial.companyLogoAlt || "Company logo"}
                    className="h-6 w-auto object-contain dark:invert"
                    optixFlowConfig={optixFlowConfig}
                  />
                </CardHeader>
              )}
              <CardContent className={cn("flex flex-1 flex-col justify-between gap-6 pt-6", cardContentClassName)}>
                {testimonial.quote && (
                  typeof testimonial.quote === "string" ? (
                    <blockquote
                      className={cn(
                        "leading-relaxed",
                        index === 0 ? "text-xl font-medium" : "text-sm",
                        quoteClassName
                      )}
                    >
                      {testimonial.quote}
                    </blockquote>
                  ) : (
                    <div className={quoteClassName}>{testimonial.quote}</div>
                  )
                )}
                <div className={cn("flex items-center gap-3", authorClassName)}>
                  <Avatar className={cn(index === 0 ? "size-12" : "size-10")}>
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
                        <cite className="text-sm font-medium not-italic">
                          {testimonial.author}
                        </cite>
                      ) : (
                        testimonial.author
                      )
                    )}
                    {testimonial.role && (
                      typeof testimonial.role === "string" ? (
                        <p className="text-xs text-muted-foreground">
                          {testimonial.role}
                        </p>
                      ) : (
                        testimonial.role
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
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
