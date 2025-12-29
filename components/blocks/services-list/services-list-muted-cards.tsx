"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

/**
 * Service item configuration for muted cards display
 */
export interface ServicesListMutedCardsService {
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
   * Custom label for items section
   */
  itemsLabel?: React.ReactNode;
  /**
   * Additional CSS classes for the card
   */
  className?: string;
}

export interface ServicesListMutedCardsProps {
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
  services?: ServicesListMutedCardsService[];
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
  pattern?: PatternName | string;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
}

const defaultServices: ServicesListMutedCardsService[] = [
  {
    iconName: "lucide/cog",
    title: "Product Strategy",
    description:
      "Comprehensive market analysis and strategic planning to position your product for success in competitive markets.",
    items: [
      "Market Research",
      "User Personas",
      "Competitive Analysis",
      "Product Roadmaps",
    ],
  },
  {
    iconName: "lucide/pen-tool",
    title: "Design",
    description:
      "User-centered design solutions that create intuitive and engaging experiences across all digital touchpoints.",
    items: ["UI/UX Design", "Prototyping", "Design Systems", "User Testing"],
  },
  {
    iconName: "lucide/code",
    title: "Web Development",
    description:
      "Modern, scalable web applications built with cutting-edge technologies and development best practices.",
    items: [
      "Frontend Development",
      "Backend Development",
      "API Integration",
      "Performance Optimization",
    ],
  },
  {
    iconName: "lucide/shrub",
    title: "Marketing",
    description:
      "Strategic marketing and optimization services to successfully launch and scale your digital products.",
    items: [
      "SEO Strategy",
      "Analytics Setup",
      "A/B Testing",
      "Growth Marketing",
    ],
  },
];

/**
 * ServicesListMutedCards - A 2x2 grid layout with muted background cards featuring icons in bordered boxes.
 * Each card includes a "What's Included" section with a 2-column grid of items.
 * Perfect for displaying comprehensive service offerings with detailed inclusions in a visually distinct format.
 *
 * @example
 * ```tsx
 * <ServicesListMutedCards
 *   heading="Services"
 *   description="End-to-end digital solutions."
 *   services={[
 *     { iconName: "lucide/cog", title: "Strategy", description: "Planning", items: ["Research"] }
 *   ]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function ServicesListMutedCards({
  heading = "Services",
  description = "End-to-end digital solutions designed to help your business thrive in the modern marketplace.",
  services = defaultServices,
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
}: ServicesListMutedCardsProps): React.JSX.Element {
  const renderServiceIcon = (service: ServicesListMutedCardsService) => {
    if (service.icon) return service.icon;
    if (service.iconName) return <DynamicIcon name={service.iconName} className="h-6 w-6" />;
    return null;
  };

  const renderServices = () => {
    if (servicesSlot) return servicesSlot;
    if (!services || services.length === 0) return null;

    return (
      <div className={cn("grid grid-cols-1 gap-8 md:grid-cols-2", gridClassName)}>
        {services.map((service, index) => (
          <div key={index} className={cn("space-y-6 rounded-xl bg-muted p-8", cardClassName, service.className)}>
            <div className="flex items-start gap-4">
              <div className={cn("rounded-lg border border-border bg-background p-2", iconClassName)}>
                {renderServiceIcon(service)}
              </div>
              <div className="space-y-2">
                {service.title && (
                  typeof service.title === "string" ? (
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  ) : (
                    <div className="text-xl font-semibold">{service.title}</div>
                  )
                )}
                {service.description && (
                  typeof service.description === "string" ? (
                    <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                  ) : (
                    <div className="text-sm leading-relaxed text-muted-foreground">{service.description}</div>
                  )
                )}
              </div>
            </div>

            {service.items && service.items.length > 0 && (
              <div className="space-y-3">
                {service.itemsLabel ? (
                  typeof service.itemsLabel === "string" ? (
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{service.itemsLabel}</h4>
                  ) : (
                    <div className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{service.itemsLabel}</div>
                  )
                ) : (
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">What&apos;s Included</h4>
                )}
                <div className="grid grid-cols-2 gap-2">
                  {service.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-foreground" />
                      {typeof item === "string" ? (
                        <span className="text-sm">{item}</span>
                      ) : (
                        <div className="text-sm">{item}</div>
                      )}
                    </div>
                  ))}
                </div>
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
      <div className={cn("mx-auto max-w-6xl space-y-16", containerClassName)}>
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
