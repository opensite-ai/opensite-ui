"use client";

import * as React from "react";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

/**
 * Service item configuration for hover cards display
 */
export interface ServicesListCardsHoverService {
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
   * List of features revealed on hover
   */
  features?: React.ReactNode[];
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

export interface ServicesListCardsHoverProps {
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
  services?: ServicesListCardsHoverService[];
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
 * ServicesListCardsHover - A grid layout with interactive hover cards that reveal additional features.
 * Each card displays an icon, title, and description, with features appearing on hover.
 * Cards feature smooth transitions and visual feedback. Ideal for showcasing services
 * with progressive disclosure of details through hover interactions.
 *
 * @example
 * ```tsx
 * <ServicesListCardsHover
 *   heading="Our Services"
 *   description="Hover over each service to discover what we offer."
 *   services={[
 *     { iconName: "lucide/code", title: "Web Dev", description: "Custom sites", features: ["React", "Node.js"] }
 *   ]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function ServicesListCardsHover({
  sectionId = "services-list-cards-hover",
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
}: ServicesListCardsHoverProps): React.JSX.Element {
  const renderServiceIcon = (service: ServicesListCardsHoverService) => {
    if (service.icon) return service.icon;
    if (service.iconName)
      return <DynamicIcon name={service.iconName} className="h-7 w-7" />;
    return null;
  };

  const renderServices = () => {
    if (servicesSlot) return servicesSlot;
    if (!services || services.length === 0) return null;

    return (
      <div
        className={cn(
          "grid gap-6 md:grid-cols-2 lg:grid-cols-4",
          gridClassName,
        )}
      >
        {services.map((service, index) => (
          <div
            key={index}
            className={cn(
              "group relative overflow-hidden rounded-xl border border-border p-6 transition-all duration-300 hover:border-primary hover:shadow-lg",
              getNestedCardBg(background, 'card'),
              getNestedCardTextColor(background),
              cardClassName,
              service.className,
            )}
          >
            <div className="relative z-10">
              {(service.icon || service.iconName) && (
                <div
                  className={cn(
                    "mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground",
                    iconClassName,
                  )}
                >
                  {renderServiceIcon(service)}
                </div>
              )}
              {service.title &&
                (typeof service.title === "string" ? (
                  <h3 className="mb-2 text-lg font-semibold">
                    {service.title}
                  </h3>
                ) : (
                  <div className="mb-2 text-lg font-semibold">
                    {service.title}
                  </div>
                ))}
              {service.description &&
                (typeof service.description === "string" ? (
                  <p className="text-sm text-muted-foreground transition-all duration-300 group-hover:mb-4">
                    {service.description}
                  </p>
                ) : (
                  <div className="text-sm text-muted-foreground transition-all duration-300 group-hover:mb-4">
                    {service.description}
                  </div>
                ))}

              <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100">
                {service.features && service.features.length > 0 && (
                  <div className="mb-4 space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-2 text-sm"
                      >
                        <DynamicIcon
                          name="lucide/check"
                          className="h-4 w-4 text-primary"
                        />
                        {typeof feature === "string" ? (
                          <span>{feature}</span>
                        ) : (
                          <div>{feature}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {service.ctaText && (
                  <Pressable
                    href={service.ctaUrl}
                    onClick={service.ctaOnClick}
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    {service.ctaText}
                    <DynamicIcon
                      name="lucide/arrow-right"
                      className="ml-1 h-4 w-4"
                    />
                  </Pressable>
                )}
              </div>
            </div>

            <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
