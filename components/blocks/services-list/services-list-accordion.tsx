"use client";

import * as React from "react";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
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
 * Service item configuration for accordion display
 */
export interface ServicesListAccordionService {
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
   * Short description shown in collapsed state
   */
  shortDescription?: React.ReactNode;
  /**
   * Full description shown when expanded
   */
  description?: React.ReactNode;
  /**
   * List of included items/features
   */
  items?: React.ReactNode[];
  /**
   * List of deliverables
   */
  deliverables?: React.ReactNode[];
  /**
   * Additional CSS classes for the accordion item
   */
  className?: string;
}

export interface ServicesListAccordionProps {
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
  services?: ServicesListAccordionService[];
  /**
   * Custom slot for rendering services (overrides services array)
   */
  servicesSlot?: React.ReactNode;
  /**
   * Default expanded accordion item value
   */
  defaultValue?: string;
  /**
   * Label for the "What's Included" section
   */
  itemsLabel?: React.ReactNode;
  /**
   * Label for the "Deliverables" section
   */
  deliverablesLabel?: React.ReactNode;
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
 * ServicesListAccordion - An accordion-based expandable services section with detailed information.
 * Each accordion item shows icon, title, and short description when collapsed, expanding to reveal
 * full description, included items, and deliverables. Ideal for detailed service presentations
 * where users can explore specific offerings without overwhelming the initial view.
 *
 * @example
 * ```tsx
 * <ServicesListAccordion
 *   heading="Our Services"
 *   description="Click to learn more about each service we offer."
 *   services={[
 *     { iconName: "lucide/cog", title: "Strategy", shortDescription: "Planning", description: "Full details..." }
 *   ]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function ServicesListAccordion({
  sectionId = "services-list-accordion",
  heading,
  description,
  services,
  servicesSlot,
  defaultValue,
  itemsLabel,
  deliverablesLabel,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  accordionClassName,
  accordionItemClassName,
  iconClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
}: ServicesListAccordionProps): React.JSX.Element {
  const renderServiceIcon = (service: ServicesListAccordionService) => {
    if (service.icon) return service.icon;
    if (service.iconName)
      return <DynamicIcon name={service.iconName} className="h-5 w-5" />;
    return null;
  };

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
              <div className="flex items-center gap-4 text-left">
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                    getNestedCardBg(background),
                    getNestedCardTextColor(background),
                    iconClassName,
                  )}
                >
                  {renderServiceIcon(service)}
                </div>
                <div>
                  {service.title &&
                    (typeof service.title === "string" ? (
                      <h3 className="text-lg font-semibold">{service.title}</h3>
                    ) : (
                      <div className="text-lg font-semibold">
                        {service.title}
                      </div>
                    ))}
                  {service.shortDescription &&
                    (typeof service.shortDescription === "string" ? (
                      <p className="text-sm text-muted-foreground">
                        {service.shortDescription}
                      </p>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        {service.shortDescription}
                      </div>
                    ))}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="space-y-6 pl-14">
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
                  <div className="space-y-3">
                    {typeof itemsLabel === "string" ? (
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        {itemsLabel}
                      </h4>
                    ) : (
                      itemsLabel
                    )}
                    <div className="grid grid-cols-2 gap-2">
                      {service.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="flex items-center gap-2"
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
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

                {service.deliverables && service.deliverables.length > 0 && (
                  <div className="space-y-3">
                    {typeof deliverablesLabel === "string" ? (
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        {deliverablesLabel}
                      </h4>
                    ) : (
                      deliverablesLabel
                    )}
                    <div className="flex flex-wrap gap-2">
                      {service.deliverables.map((deliverable, delIndex) =>
                        typeof deliverable === "string" ? (
                          <span
                            key={delIndex}
                            className={cn(
                              "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
                              getNestedCardBg(background),
                              getNestedCardTextColor(background),
                            )}
                          >
                            {deliverable}
                          </span>
                        ) : (
                          <div key={delIndex}>{deliverable}</div>
                        ),
                      )}
                    </div>
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
      id={sectionId}
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("mx-auto max-w-3xl space-y-16", containerClassName)}>
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
                  "text-lg tracking-tight text-muted-foreground md:text-xl",
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
