"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

/**
 * Service item configuration for pricing grid display
 */
export interface ServicesListPricingGridService {
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
   * Duration/timeline text
   */
  duration?: React.ReactNode;
  /**
   * Price text
   */
  price?: React.ReactNode;
  /**
   * List of items/features
   */
  items?: React.ReactNode[];
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

export interface ServicesListPricingGridProps {
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
  services?: ServicesListPricingGridService[];
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
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * ServicesListPricingGrid - A 2x2 grid layout displaying services with duration and pricing information.
 * Each card features an icon, title, description, timeline, price, included items, and a CTA button.
 * Perfect for service-based businesses that want to showcase offerings with transparent pricing.
 *
 * @example
 * ```tsx
 * <ServicesListPricingGrid
 *   heading="Services & Pricing"
 *   description="Transparent pricing for all our services."
 *   services={[
 *     { iconName: "lucide/cog", title: "Strategy", price: "$5,000", duration: "2-4 weeks" }
 *   ]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function ServicesListPricingGrid({
  sectionId = "services-list-pricing-grid",
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
  iconClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
}: ServicesListPricingGridProps): React.JSX.Element {
  const renderServiceIcon = (service: ServicesListPricingGridService) => {
    if (service.icon) return service.icon;
    if (service.iconName)
      return (
        <DynamicIcon name={service.iconName} className="h-6 w-6 text-primary" />
      );
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
              "flex flex-col rounded-xl border border-border p-8 transition-shadow hover:shadow-md",
              cardClassName,
              service.className,
            )}
          >
            <div className="flex items-start gap-4">
              <div
                className={cn("rounded-lg bg-primary/10 p-3", iconClassName)}
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

            <div className="mt-6 flex items-center gap-4 border-t border-b border-border py-4">
              {service.duration && (
                <div className="flex items-center gap-2">
                  <DynamicIcon
                    name="lucide/clock"
                    className="h-4 w-4 text-muted-foreground"
                  />
                  {typeof service.duration === "string" ? (
                    <span className="text-sm font-medium">
                      {service.duration}
                    </span>
                  ) : (
                    <div className="text-sm font-medium">
                      {service.duration}
                    </div>
                  )}
                </div>
              )}
              {service.price &&
                (typeof service.price === "string" ? (
                  <div className="ml-auto text-lg font-bold text-primary">
                    {service.price}
                  </div>
                ) : (
                  <div className="ml-auto text-lg font-bold text-primary">
                    {service.price}
                  </div>
                ))}
            </div>

            {service.items && service.items.length > 0 && (
              <div className="mt-6 space-y-3">
                {service.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-2">
                    <DynamicIcon
                      name="lucide/check"
                      className="h-4 w-4 text-primary"
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
              <div className="mt-auto pt-6">
                <Pressable
                  href={service.ctaUrl}
                  onClick={service.ctaOnClick}
                  variant="outline"
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
      id={sectionId}
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
