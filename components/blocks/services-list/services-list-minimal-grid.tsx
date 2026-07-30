"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

/**
 * Service item configuration for minimal grid display
 */
export interface ServicesListMinimalGridService {
  /**
   * Icon element (overrides iconName)
   */
  icon?: React.ReactNode | string;
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

export interface ServicesListMinimalGridProps {
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
  services?: ServicesListMinimalGridService[];
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
 * ServicesListMinimalGrid - A clean, minimal 3-column grid layout for displaying services.
 * Each service card features an icon, title, description, and optional CTA link.
 * The design emphasizes simplicity and readability with subtle hover effects.
 * Ideal for showcasing multiple services in a clean, scannable format.
 *
 * @example
 * ```tsx
 * <ServicesListMinimalGrid
 *   heading="Our Services"
 *   description="Comprehensive digital solutions."
 *   services={[
 *     { iconName: "lucide/code", title: "Web Dev", description: "Custom websites" }
 *   ]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function ServicesListMinimalGrid({
  sectionId = "services-list-minimal-grid",
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
}: ServicesListMinimalGridProps): React.JSX.Element {
  const renderServiceIcon = (service: ServicesListMinimalGridService) => {
    const icon = service.icon || service.iconName;
    return icon ? <DynamicIcon name={icon} className="h-6 w-6" /> : null;
  };

  const renderServices = () => {
    if (servicesSlot) return servicesSlot;
    if (!services || services.length === 0) return null;

    return (
      <div
        className={cn(
          "grid gap-8 md:grid-cols-2 lg:grid-cols-3",
          gridClassName,
        )}
      >
        {services.map((service, index) => (
          <div
            key={index}
            className={cn(
              "group rounded-lg border border-border p-6 transition-all hover:border-primary/50 hover:shadow-md",
              cardClassName,
              service.className,
            )}
          >
            {(service.icon || service.iconName) && (
              <div
                className={cn(
                  "mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground",
                  iconClassName,
                )}
              >
                {renderServiceIcon(service)}
              </div>
            )}
            {service.title &&
              (typeof service.title === "string" ? (
                <h3 className="mb-2 text-lg font-semibold">{service.title}</h3>
              ) : (
                <div className="mb-2 text-lg font-semibold">
                  {service.title}
                </div>
              ))}
            {service.description &&
              (typeof service.description === "string" ? (
                <p className="mb-4 text-sm text-muted-foreground">
                  {service.description}
                </p>
              ) : (
                <div className="mb-4 text-sm text-muted-foreground">
                  {service.description}
                </div>
              ))}
            {service.ctaText && (
              <Pressable
                href={service.ctaUrl}
                onClick={service.ctaOnClick}
                className="inline-flex items-center text-sm font-medium text-primary hover:underline"
              >
                {service.ctaText}
                <DynamicIcon
                  name="lucide/arrow-right"
                  className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </Pressable>
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
