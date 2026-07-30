"use client";

import * as React from "react";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

/**
 * Service item configuration for centered icons display
 */
export interface ServicesListCenteredIconsService {
  /**
   * Icon element (overrides iconName)
   */
  icon?: React.ReactNode | string;
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
   * Additional CSS classes for the service card
   */
  className?: string;
}

export interface ServicesListCenteredIconsProps {
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
  services?: ServicesListCenteredIconsService[];
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
 * ServicesListCenteredIcons - A responsive 1x4 grid layout with centered text and circular icons.
 * Features hover effects on icons that invert colors. Each service displays an icon, title, description, and stacked items.
 * Ideal for a compact, visually balanced presentation of services with interactive hover states.
 *
 * @example
 * ```tsx
 * <ServicesListCenteredIcons
 *   heading="Services"
 *   description="We deliver end-to-end digital solutions."
 *   services={[
 *     { iconName: "lucide/cog", title: "Strategy", description: "Planning services", items: ["Research"] }
 *   ]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function ServicesListCenteredIcons({
  sectionId = "services-list-centered-icons",
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
}: ServicesListCenteredIconsProps): React.JSX.Element {
  const renderServiceIcon = (service: ServicesListCenteredIconsService) => {
    const resolvedIcon = service.icon || service.iconName;
    if (!resolvedIcon) return null;

    return <DynamicIcon name={resolvedIcon} className="h-8 w-8" />;
  };

  const renderServices = () => {
    if (servicesSlot) return servicesSlot;
    if (!services || services.length === 0) return null;

    return (
      <div
        className={cn(
          "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4",
          gridClassName,
        )}
      >
        {services.map((service, index) => (
          <div
            key={index}
            className={cn(
              "group space-y-6 text-center",
              cardClassName,
              service.className,
            )}
          >
            <div
              className={cn(
                "mx-auto flex h-16 w-16 items-center justify-center rounded-full transition-colors group-hover:bg-foreground group-hover:text-background",
                getNestedCardBg(background),
                getNestedCardTextColor(background),
                iconClassName,
              )}
            >
              {renderServiceIcon(service)}
            </div>
            <div className="space-y-3">
              {service.title &&
                (typeof service.title === "string" ? (
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                ) : (
                  <div className="text-lg font-semibold">{service.title}</div>
                ))}
              {service.description &&
                (typeof service.description === "string" ? (
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                ) : (
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </div>
                ))}
            </div>
            {service.items && service.items.length > 0 && (
              <div className="space-y-2">
                {service.items.map((item, itemIndex) =>
                  typeof item === "string" ? (
                    <div
                      key={itemIndex}
                      className="text-xs font-medium text-muted-foreground"
                    >
                      {item}
                    </div>
                  ) : (
                    <div key={itemIndex}>{item}</div>
                  ),
                )}
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
      <div className={cn("mx-auto max-w-6xl space-y-16", containerClassName)}>
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
