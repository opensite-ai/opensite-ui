"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";

/**
 * Featured service configuration for hero cards display
 */
export interface ServicesListHeroCardsFeatured {
  /**
   * Service title
   */
  title?: React.ReactNode;
  /**
   * Service description
   */
  description?: React.ReactNode;
  /**
   * Badge text
   */
  badge?: React.ReactNode;
  /**
   * Service image
   */
  image?: {
    src: string;
    alt: string;
  };
  /**
   * CTA button text
   */
  ctaText?: React.ReactNode;
  /**
   * CTA button URL
   */
  ctaUrl?: string;
  /**
   * CTA click handler
   */
  ctaOnClick?: () => void;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Service item configuration for hero cards display
 */
export interface ServicesListHeroCardsService {
  /**
   * Service title
   */
  title?: React.ReactNode;
  /**
   * Service description
   */
  description?: React.ReactNode;
  /**
   * Service image
   */
  image?: {
    src: string;
    alt: string;
  };
  /**
   * CTA URL
   */
  ctaUrl?: string;
  /**
   * CTA click handler
   */
  ctaOnClick?: () => void;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export interface ServicesListHeroCardsProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Supporting description content
   */
  description?: React.ReactNode;
  /**
   * Featured service configuration
   */
  featuredService?: ServicesListHeroCardsFeatured;
  /**
   * Custom slot for featured service (overrides featuredService)
   */
  featuredSlot?: React.ReactNode;
  /**
   * Array of service configurations
   */
  services?: ServicesListHeroCardsService[];
  /**
   * Custom slot for rendering services (overrides services array)
   */
  servicesSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header
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
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for the featured card
   */
  featuredClassName?: string;
  /**
   * Additional CSS classes for each service card
   */
  cardClassName?: string;
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
 * ServicesListHeroCards - A featured services layout with a large hero card and smaller supporting cards in a grid.
 * The hero card displays prominently with a badge, full description, and CTA button.
 * Supporting cards show as compact image cards with hover effects. Perfect for highlighting a primary service
 * while showcasing related offerings.
 *
 * @example
 * ```tsx
 * <ServicesListHeroCards
 *   heading="Our Services"
 *   description="Comprehensive digital solutions."
 *   featuredService={{ title: "Full-Stack", description: "End-to-end development", badge: "Featured" }}
 *   services={[{ title: "Frontend", description: "React apps" }]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function ServicesListHeroCards({
  heading,
  description,
  featuredService,
  featuredSlot,
  services,
  servicesSlot,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  gridClassName,
  featuredClassName,
  cardClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: ServicesListHeroCardsProps): React.JSX.Element {
  const renderFeatured = () => {
    if (featuredSlot) return featuredSlot;
    if (!featuredService) return null;

    return (
      <div
        className={cn(
          "group relative overflow-hidden rounded-2xl lg:row-span-2",
          featuredClassName,
          featuredService.className,
        )}
      >
        {featuredService.image && (
          <Img
            src={featuredService.image.src}
            alt={featuredService.image.alt}
            className="h-full min-h-[400px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            optixFlowConfig={optixFlowConfig}
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-8">
          {featuredService.badge &&
            (typeof featuredService.badge === "string" ? (
              <Badge className="mb-4">{featuredService.badge}</Badge>
            ) : (
              <div className="mb-4">{featuredService.badge}</div>
            ))}
          {featuredService.title &&
            (typeof featuredService.title === "string" ? (
              <h3 className="text-2xl font-bold text-white md:text-3xl">
                {featuredService.title}
              </h3>
            ) : (
              <div className="text-2xl font-bold text-white md:text-3xl">
                {featuredService.title}
              </div>
            ))}
          {featuredService.description &&
            (typeof featuredService.description === "string" ? (
              <p className="mt-3 text-white/80">
                {featuredService.description}
              </p>
            ) : (
              <div className="mt-3 text-white/80">
                {featuredService.description}
              </div>
            ))}
          {featuredService.ctaText && (
            <Pressable
              href={featuredService.ctaUrl}
              onClick={featuredService.ctaOnClick}
              variant="default"
              className="mt-6"
              asButton
            >
              {featuredService.ctaText}
              <DynamicIcon name="lucide/arrow-right" className="ml-2 h-4 w-4" />
            </Pressable>
          )}
        </div>
      </div>
    );
  };

  const renderServices = () => {
    if (servicesSlot) return servicesSlot;
    if (!services || services.length === 0) return null;

    return (
      <div className="grid grid-cols-2 gap-4">
        {services.map((service, index) => (
          <Pressable
            key={index}
            href={service.ctaUrl}
            onClick={service.ctaOnClick}
            className={cn(
              "group relative overflow-hidden rounded-xl",
              cardClassName,
              service.className,
            )}
          >
            {service.image && (
              <Img
                src={service.image.src}
                alt={service.image.alt}
                className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
                optixFlowConfig={optixFlowConfig}
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              {service.title &&
                (typeof service.title === "string" ? (
                  <h4 className="font-semibold text-white">{service.title}</h4>
                ) : (
                  <div className="font-semibold text-white">
                    {service.title}
                  </div>
                ))}
              {service.description &&
                (typeof service.description === "string" ? (
                  <p className="mt-1 text-xs text-white/70">
                    {service.description}
                  </p>
                ) : (
                  <div className="mt-1 text-xs text-white/70">
                    {service.description}
                  </div>
                ))}
            </div>
          </Pressable>
        ))}
      </div>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("mx-auto max-w-6xl space-y-12", containerClassName)}>
        <div className={cn("space-y-4 text-center", headerClassName)}>
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
                  "mx-auto max-w-2xl text-lg tracking-tight text-muted-foreground md:text-xl",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}
        </div>
        <div className={cn("grid gap-8 lg:grid-cols-2", gridClassName)}>
          {renderFeatured()}
          {renderServices()}
        </div>
      </div>
    </Section>
  );
}
