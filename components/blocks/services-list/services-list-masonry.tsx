"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

/**
 * Service item configuration for masonry display
 */
export interface ServicesListMasonryService {
  /**
   * Icon element (overrides iconName)
   */
  icon?: React.ReactNode;
  /**
   * Icon name in format: prefix/name (e.g., "lucide/code")
   */
  iconName?: string;
  /**
   * Service title
   */
  title?: React.ReactNode;
  /**
   * Service description
   */
  description?: React.ReactNode;
  /**
   * List of items/features
   */
  items?: React.ReactNode[];
  /**
   * Whether this service is featured
   */
  featured?: boolean;
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
   * Additional CSS classes for the card
   */
  className?: string;
}

export interface ServicesListMasonryProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Supporting description content
   */
  description?: React.ReactNode;
  /**
   * Array of service configurations
   */
  services?: ServicesListMasonryService[];
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
   * Additional CSS classes for the masonry grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each card
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the icon container
   */
  iconClassName?: string;
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
}

/**
 * ServicesListMasonry - A masonry-style grid layout with variable card heights based on content.
 * Featured services display with additional items and larger visual presence.
 * Each card includes an icon, title, description, optional items list, and CTA link.
 * Perfect for showcasing services with varying levels of detail in an organic, Pinterest-style layout.
 *
 * @example
 * ```tsx
 * <ServicesListMasonry
 *   heading="Our Services"
 *   description="Comprehensive digital solutions."
 *   services={[
 *     { iconName: "lucide/code", title: "Web Dev", description: "Custom websites", featured: true }
 *   ]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function ServicesListMasonry({
  heading = "Our Services",
  description = "Comprehensive digital solutions tailored to your business needs.",
  services,
  servicesSlot,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  gridClassName,
  cardClassName,
  iconClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
}: ServicesListMasonryProps): React.JSX.Element {
  const renderServiceIcon = (service: ServicesListMasonryService) => {
    if (service.icon) return service.icon;
    if (service.iconName) return <DynamicIcon name={service.iconName} className="h-6 w-6" />;
    return null;
  };

  const renderServices = () => {
    if (servicesSlot) return servicesSlot;
    if (!services || services.length === 0) return null;

    return (
      <div className={cn("columns-1 gap-6 md:columns-2 lg:columns-3", gridClassName)}>
        {services.map((service, index) => (
          <div
            key={index}
            className={cn(
              "mb-6 break-inside-avoid rounded-xl border border-border p-6 transition-shadow hover:shadow-md",
              service.featured && "bg-primary/5 border-primary/20",
              cardClassName,
              service.className
            )}
          >
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg",
                  service.featured ? "bg-primary text-primary-foreground" : "bg-muted",
                  iconClassName
                )}
              >
                {renderServiceIcon(service)}
              </div>
              <div>
                {service.title && (
                  typeof service.title === "string" ? (
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                  ) : (
                    <div className="text-lg font-semibold">{service.title}</div>
                  )
                )}
              </div>
            </div>

            {service.description && (
              typeof service.description === "string" ? (
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
              ) : (
                <div className="mt-4 text-sm leading-relaxed text-muted-foreground">{service.description}</div>
              )
            )}

            {service.items && service.items.length > 0 && (
              <div className="mt-4 space-y-2">
                {service.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-2">
                    <DynamicIcon
                      name="lucide/check"
                      className={cn("h-4 w-4", service.featured ? "text-primary" : "text-muted-foreground")}
                    />
                    {typeof item === "string" ? (
                      <span className="text-sm">{item}</span>
                    ) : (
                      <div className="text-sm">{item}</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {service.ctaText && (
              <Pressable
                href={service.ctaUrl}
                onClick={service.ctaOnClick}
                className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
              >
                {service.ctaText}
                <DynamicIcon name="lucide/arrow-right" className="ml-1 h-4 w-4" />
              </Pressable>
            )}
          </div>
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
              <p className={cn("mx-auto max-w-2xl text-lg tracking-tight text-muted-foreground md:text-xl", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
        </div>
        {renderServices()}
      </div>
    </Section>
  );
}
