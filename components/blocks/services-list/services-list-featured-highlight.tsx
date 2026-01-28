"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

/**
 * Service item configuration for featured highlight display
 */
export interface ServicesListFeaturedHighlightService {
  /**
   * Icon element (overrides iconName)
   */
  icon?: React.ReactNode;
  /**
   * Icon name in format: prefix/name (e.g., "lucide/cog")
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
   * Whether this service is featured/popular
   */
  featured?: boolean;
  /**
   * Featured badge text
   */
  featuredBadge?: React.ReactNode;
  /**
   * List of deliverables
   */
  deliverables?: React.ReactNode[];
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

export interface ServicesListFeaturedHighlightProps {
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
  services?: ServicesListFeaturedHighlightService[];
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
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
}

/**
 * ServicesListFeaturedHighlight - A 2x2 grid layout with featured service highlighting.
 * Featured services display with a "Popular" badge, primary-colored styling, and enhanced visual treatment.
 * Each card includes check icons for deliverables and CTA buttons. Ideal for highlighting a recommended
 * or most popular service option among multiple offerings.
 *
 * @example
 * ```tsx
 * <ServicesListFeaturedHighlight
 *   heading="Our Services"
 *   description="Choose the service that best fits your needs."
 *   services={[
 *     { iconName: "lucide/cog", title: "Strategy", description: "Planning", featured: true, deliverables: ["Research"] }
 *   ]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function ServicesListFeaturedHighlight({
  heading,
  description,
  services,
  servicesSlot,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  gridClassName,
  cardClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
}: ServicesListFeaturedHighlightProps): React.JSX.Element {
  const renderServiceIcon = (service: ServicesListFeaturedHighlightService) => {
    if (service.icon) return service.icon;
    if (service.iconName)
      return <DynamicIcon name={service.iconName} className="h-6 w-6" />;
    return null;
  };

  const renderServices = () => {
    if (servicesSlot) return servicesSlot;
    if (!services || services.length === 0) return null;

    return (
      <div
        className={cn("grid grid-cols-1 gap-8 md:grid-cols-2", gridClassName)}
      >
        {services.map((service, index) => (
          <div
            key={index}
            className={cn(
              "relative flex flex-col rounded-xl border p-8 transition-shadow hover:shadow-md",
              service.featured
                ? "border-primary bg-primary/5 shadow-lg"
                : "border-border",
              cardClassName,
              service.className,
            )}
          >
            {service.featured &&
              service.featuredBadge &&
              (typeof service.featuredBadge === "string" ? (
                <Badge className="absolute -top-3 right-6">
                  {service.featuredBadge}
                </Badge>
              ) : (
                <div className="absolute -top-3 right-6">
                  {service.featuredBadge}
                </div>
              ))}

            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "rounded-lg p-3",
                  service.featured
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted",
                )}
              >
                {renderServiceIcon(service)}
              </div>
              <div className="flex-1">
                {service.title &&
                  (typeof service.title === "string" ? (
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  ) : (
                    <div className="text-xl font-semibold">{service.title}</div>
                  ))}
                {service.description &&
                  (typeof service.description === "string" ? (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  ) : (
                    <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </div>
                  ))}
              </div>
            </div>

            {service.deliverables && service.deliverables.length > 0 && (
              <div className="mt-6 space-y-3">
                {service.deliverables.map((deliverable, delIndex) => (
                  <div key={delIndex} className="flex items-center gap-2">
                    <DynamicIcon
                      name="lucide/check-circle"
                      className={cn(
                        "h-5 w-5",
                        service.featured
                          ? "text-primary"
                          : "text-muted-foreground",
                      )}
                    />
                    {typeof deliverable === "string" ? (
                      <span className="text-sm">{deliverable}</span>
                    ) : (
                      <div className="text-sm">{deliverable}</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {service.ctaText && (
              <div className="mt-auto pt-6">
                <Pressable
                  href={service.ctaUrl}
                  onClick={service.ctaOnClick}
                  variant={service.featured ? "default" : "outline"}
                  className="w-full"
                  asButton
                >
                  {service.ctaText}
                  <DynamicIcon
                    name="lucide/arrow-right"
                    className="ml-2 h-4 w-4"
                  />
                </Pressable>
              </div>
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
        {renderServices()}
      </div>
    </Section>
  );
}
