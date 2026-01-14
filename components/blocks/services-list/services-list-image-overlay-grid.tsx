"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing, OptixFlowConfig, ActionConfig } from "../../../src/types";

/**
 * Service item configuration for image overlay grid display
 */
export interface ServicesListImageOverlayGridService {
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
   * Additional CSS classes for the card
   */
  className?: string;
}

export interface ServicesListImageOverlayGridProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Supporting description content
   */
  description?: React.ReactNode;
  /**
   * Primary CTA configuration
   */
  primaryAction?: ActionConfig;
  /**
   * Custom slot for actions (overrides primaryAction)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Array of service configurations
   */
  services?: ServicesListImageOverlayGridService[];
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
   * Additional CSS classes for the content area
   */
  contentClassName?: string;
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
   * Additional CSS classes for each card
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

/**
 * ServicesListImageOverlayGrid - An asymmetric layout with introductory text on the left and a 5-service grid on the right.
 * Services display as image cards with gradient overlays, titles, and descriptions that appear on hover.
 * The grid features varying card sizes for visual interest. Ideal for showcasing multiple services with strong imagery.
 *
 * @example
 * ```tsx
 * <ServicesListImageOverlayGrid
 *   heading="Our Services"
 *   description="We offer a comprehensive range of digital services."
 *   primaryAction={{ label: "View All", href: "#" }}
 *   services={[{ title: "Web Dev", description: "Custom websites" }]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function ServicesListImageOverlayGrid({
  heading,
  description,
  primaryAction,
  actionsSlot,
  services,
  servicesSlot,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  gridClassName,
  cardClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: ServicesListImageOverlayGridProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!primaryAction) return null;

    return (
      <div className="mt-8">
        <Pressable
          href={primaryAction.href}
          onClick={primaryAction.onClick}
          variant="default"
          size="lg"
          asButton
        >
          {primaryAction.label}
          <DynamicIcon name="lucide/arrow-right" className="ml-2 h-4 w-4" />
        </Pressable>
      </div>
    );
  };

  const renderServices = () => {
    if (servicesSlot) return servicesSlot;
    if (!services || services.length === 0) return null;

    return (
      <div className={cn("grid grid-cols-2 gap-4 lg:col-span-2 md:grid-cols-3", gridClassName)}>
        {services.map((service, index) => (
          <Pressable
            key={index}
            href={service.ctaUrl}
            onClick={service.ctaOnClick}
            className={cn(
              "group relative overflow-hidden rounded-xl",
              index === 0 && "md:col-span-2 md:row-span-2",
              index > 0 && "aspect-square",
              cardClassName,
              service.className
            )}
          >
            {service.image && (
              <Img
                src={service.image.src}
                alt={service.image.alt}
                className={cn(
                  "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110",
                  index === 0 ? "aspect-square md:aspect-auto" : "aspect-square"
                )}
                optixFlowConfig={optixFlowConfig}
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
              {service.title && (
                typeof service.title === "string" ? (
                  <h3 className="text-lg font-bold text-white md:text-xl">{service.title}</h3>
                ) : (
                  <div className="text-lg font-bold text-white md:text-xl">{service.title}</div>
                )
              )}
              {service.description && (
                typeof service.description === "string" ? (
                  <p className="mt-1 text-sm text-white/80 opacity-0 transition-opacity group-hover:opacity-100">{service.description}</p>
                ) : (
                  <div className="mt-1 text-sm text-white/80 opacity-0 transition-opacity group-hover:opacity-100">{service.description}</div>
                )
              )}
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
      <div className={cn("grid gap-12 lg:grid-cols-3 lg:gap-8", containerClassName)}>
        <div className={cn("flex flex-col justify-center lg:col-span-1", contentClassName)}>
          {heading && (
            typeof heading === "string" ? (
              <h2 className={cn("text-3xl font-bold tracking-tight md:text-4xl", headingClassName)}>
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("mt-6 text-lg leading-relaxed text-muted-foreground", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
          {renderActions()}
        </div>
        {renderServices()}
      </div>
    </Section>
  );
}
