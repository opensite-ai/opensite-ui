"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

/**
 * Service item configuration for icon grid display
 */
export interface ServicesListIconGridService {
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
   * List of items/features
   */
  items?: React.ReactNode[];
  /**
   * Additional CSS classes for the card
   */
  className?: string;
}

export interface ServicesListIconGridProps {
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
  services?: ServicesListIconGridService[];
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
}

/**
 * ServicesListIconGrid - A 2x2 grid layout displaying services with icons, titles, descriptions, and bullet point items.
 * Each service card features a circular icon, bold title, descriptive text, and a list of included items.
 * Ideal for showcasing 4 core services with their key offerings in a clean, organized grid format.
 *
 * @example
 * ```tsx
 * <ServicesListIconGrid
 *   heading="Services"
 *   description="We craft digital experiences."
 *   services={[
 *     { iconName: "lucide/cog", title: "Strategy", description: "Planning", items: ["Research"] }
 *   ]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function ServicesListIconGrid({
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
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
}: ServicesListIconGridProps): React.JSX.Element {
  const renderServiceIcon = (service: ServicesListIconGridService) => {
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
              "space-y-6 rounded-lg border border-border p-8 transition-shadow hover:shadow-sm",
              cardClassName,
              service.className,
            )}
          >
            <div className="flex items-center gap-4">
              <div className={cn("rounded-full bg-muted p-3", iconClassName)}>
                {renderServiceIcon(service)}
              </div>
              {service.title &&
                (typeof service.title === "string" ? (
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                ) : (
                  <div className="text-xl font-semibold">{service.title}</div>
                ))}
            </div>
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
              <div className="space-y-2">
                {service.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-foreground" />
                    {typeof item === "string" ? (
                      <span className="text-sm font-medium">{item}</span>
                    ) : (
                      <div className="text-sm font-medium">{item}</div>
                    )}
                  </div>
                ))}
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
