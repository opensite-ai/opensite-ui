"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

/**
 * Service item configuration for category accordion display
 */
export interface ServicesListCategoryAccordionService {
  /**
   * Service title
   */
  title?: React.ReactNode;
  /**
   * Service description
   */
  description?: React.ReactNode;
  /**
   * Category label
   */
  category?: React.ReactNode;
  /**
   * List of included items
   */
  items?: React.ReactNode[];
  /**
   * List of technology/skill badges
   */
  badges?: React.ReactNode[];
  /**
   * Additional CSS classes for the accordion item
   */
  className?: string;
}

export interface ServicesListCategoryAccordionProps {
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
  services?: ServicesListCategoryAccordionService[];
  /**
   * Custom slot for rendering services (overrides services array)
   */
  servicesSlot?: React.ReactNode;
  /**
   * Default expanded accordion item value
   */
  defaultValue?: string;
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
   * Additional CSS classes for the accordion
   */
  accordionClassName?: string;
  /**
   * Additional CSS classes for each accordion item
   */
  accordionItemClassName?: string;
  /**
   * Additional CSS classes for the items grid
   */
  itemsGridClassName?: string;
  /**
   * Additional CSS classes for the badges container
   */
  badgesClassName?: string;
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
 * ServicesListCategoryAccordion - An accordion layout with large titles and expandable service items featuring categories and badges.
 * Each accordion item displays a category label, title, and expands to show full description, included items, and technology badges.
 * Ideal for organizing services by category with detailed information revealed on demand.
 *
 * @example
 * ```tsx
 * <ServicesListCategoryAccordion
 *   heading="Our Services"
 *   description="Explore our comprehensive range of digital services."
 *   services={[
 *     { title: "Web Dev", description: "Custom sites", category: "Development", items: ["Frontend"], badges: ["React"] }
 *   ]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function ServicesListCategoryAccordion({
  heading,
  description,
  services,
  servicesSlot,
  defaultValue,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  accordionClassName,
  accordionItemClassName,
  itemsGridClassName,
  badgesClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
}: ServicesListCategoryAccordionProps): React.JSX.Element {
  const renderServices = () => {
    if (servicesSlot) return servicesSlot;
    if (!services || services.length === 0) return null;

    return (
      <Accordion
        type="single"
        collapsible
        className={cn("w-full", accordionClassName)}
        defaultValue={defaultValue}
      >
        {services.map((service, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className={cn(
              "border-b border-border",
              accordionItemClassName,
              service.className,
            )}
          >
            <AccordionTrigger className="hover:no-underline py-6">
              <div className="flex flex-col items-start gap-2 text-left">
                {service.category &&
                  (typeof service.category === "string" ? (
                    <span className="text-xs font-medium uppercase tracking-wider text-primary">
                      {service.category}
                    </span>
                  ) : (
                    <div className="text-xs font-medium uppercase tracking-wider text-primary">
                      {service.category}
                    </div>
                  ))}
                {service.title &&
                  (typeof service.title === "string" ? (
                    <h3 className="text-xl font-bold md:text-2xl">
                      {service.title}
                    </h3>
                  ) : (
                    <div className="text-xl font-bold md:text-2xl">
                      {service.title}
                    </div>
                  ))}
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="space-y-6">
                {service.description &&
                  (typeof service.description === "string" ? (
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  ) : (
                    <div className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </div>
                  ))}

                {service.items && service.items.length > 0 && (
                  <div
                    className={cn(
                      "grid grid-cols-2 gap-3 md:grid-cols-4",
                      itemsGridClassName,
                    )}
                  >
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

                {service.badges && service.badges.length > 0 && (
                  <div className={cn("flex flex-wrap gap-2", badgesClassName)}>
                    {service.badges.map((badge, badgeIndex) =>
                      typeof badge === "string" ? (
                        <Badge key={badgeIndex} variant="secondary">
                          {badge}
                        </Badge>
                      ) : (
                        <div key={badgeIndex}>{badge}</div>
                      ),
                    )}
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
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
      <div className={cn("mx-auto max-w-4xl space-y-12", containerClassName)}>
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
