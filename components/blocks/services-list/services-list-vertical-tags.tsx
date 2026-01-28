"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

/**
 * Service item configuration for vertical tags display
 */
export interface ServicesListVerticalTagsService {
  /**
   * Custom icon element (takes precedence over iconName)
   */
  icon?: React.ReactNode;
  /**
   * Icon name for DynamicIcon
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
   * List of tag items
   */
  items?: React.ReactNode[];
  /**
   * Additional CSS classes for the card
   */
  className?: string;
}

export interface ServicesListVerticalTagsProps {
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
  services?: ServicesListVerticalTagsService[];
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
   * Additional CSS classes for the list container
   */
  listClassName?: string;
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
}

/**
 * ServicesListVerticalTags - A vertical list layout with services displayed as bordered cards.
 * Each card features an icon, title, description, and pill-shaped tags for included items.
 * Perfect for a scrollable, detailed view of services with tag-based categorization of offerings.
 *
 * @example
 * ```tsx
 * <ServicesListVerticalTags
 *   heading="Services"
 *   description="Comprehensive solutions."
 *   services={[{ iconName: "lucide/cog", title: "Strategy", items: ["Research"] }]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function ServicesListVerticalTags({
  heading,
  description,
  services,
  servicesSlot,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  listClassName,
  cardClassName,
  iconClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
}: ServicesListVerticalTagsProps): React.JSX.Element {
  const renderServiceIcon = (service: ServicesListVerticalTagsService) => {
    if (service.icon) return service.icon;
    if (service.iconName)
      return <DynamicIcon name={service.iconName} className="h-6 w-6" />;
    return null;
  };

  const renderServices = () => {
    if (servicesSlot) return servicesSlot;
    if (!services || services.length === 0) return null;

    return (
      <div className={cn("space-y-6", listClassName)}>
        {services.map((service, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-col items-start gap-6 rounded-lg border border-border p-6 transition-shadow hover:shadow-sm md:flex-row",
              cardClassName,
              service.className,
            )}
          >
            <div className="shrink-0">
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-lg bg-muted",
                  iconClassName,
                )}
              >
                {renderServiceIcon(service)}
              </div>
            </div>
            <div className="flex-1 space-y-3">
              {service.title &&
                (typeof service.title === "string" ? (
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                ) : (
                  <div className="text-xl font-semibold">{service.title}</div>
                ))}
              {service.description &&
                (typeof service.description === "string" ? (
                  <p className="leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                ) : (
                  <div className="leading-relaxed text-muted-foreground">
                    {service.description}
                  </div>
                ))}
              {service.items && service.items.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {service.items.map((item, itemIndex) => (
                    <span
                      key={itemIndex}
                      className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium"
                    >
                      {typeof item === "string" ? item : item}
                    </span>
                  ))}
                </div>
              )}
            </div>
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
      <div className={cn("mx-auto max-w-4xl space-y-16", containerClassName)}>
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
