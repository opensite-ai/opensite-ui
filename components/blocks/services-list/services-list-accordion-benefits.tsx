"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing, ActionConfig } from "../../../src/types";

/**
 * Service item configuration for accordion benefits display
 */
export interface ServicesListAccordionBenefitsService {
  /**
   * Unique identifier for the service
   */
  id?: string;
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
  fullDescription?: React.ReactNode;
  /**
   * List of benefits
   */
  benefits?: React.ReactNode[];
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
   * Additional CSS classes for the accordion item
   */
  className?: string;
}

export interface ServicesListAccordionBenefitsProps {
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
  services?: ServicesListAccordionBenefitsService[];
  /**
   * Custom slot for rendering services (overrides services array)
   */
  servicesSlot?: React.ReactNode;
  /**
   * Default expanded accordion item value
   */
  defaultValue?: string;
  /**
   * Label for the benefits section
   */
  benefitsLabel?: React.ReactNode;
  /**
   * Bottom CTA action configuration
   */
  bottomAction?: ActionConfig;
  /**
   * Custom slot for bottom CTA (overrides bottomAction)
   */
  bottomActionSlot?: React.ReactNode;
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
   * Additional CSS classes for the bottom CTA container
   */
  bottomActionClassName?: string;
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

/**
 * ServicesListAccordionBenefits - An accordion layout with expandable service items featuring detailed benefits lists.
 * Each accordion item shows title and short description when collapsed, expanding to reveal full description,
 * benefits list with bullet points, and a CTA link. Includes a bottom CTA for custom quotes.
 * Ideal for freelancers or agencies showcasing detailed service offerings with clear value propositions.
 *
 * @example
 * ```tsx
 * <ServicesListAccordionBenefits
 *   heading="My Services"
 *   description="Click on any service to learn more"
 *   services={[
 *     { id: "1", title: "Web Dev", shortDescription: "Custom sites", fullDescription: "Full details...", benefits: ["Fast", "Secure"] }
 *   ]}
 *   bottomAction={{ label: "Get a quote", href: "/contact" }}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function ServicesListAccordionBenefits({
  heading,
  description,
  services,
  servicesSlot,
  defaultValue,
  benefitsLabel,
  bottomAction,
  bottomActionSlot,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  accordionClassName,
  accordionItemClassName,
  bottomActionClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
}: ServicesListAccordionBenefitsProps): React.JSX.Element {
  const renderServices = () => {
    if (servicesSlot) return servicesSlot;
    if (!services || services.length === 0) return null;

    return (
      <Accordion type="single" collapsible className={cn("w-full", accordionClassName)} defaultValue={defaultValue}>
        {services.map((service, index) => (
          <AccordionItem
            key={service.id || `service-${index}`}
            value={service.id || `service-${index}`}
            className={cn("border-b border-primary/10 px-0", accordionItemClassName, service.className)}
          >
            <AccordionTrigger className="py-6 hover:no-underline">
              <div className="flex flex-1 items-center text-left">
                <div>
                  {service.title && (
                    typeof service.title === "string" ? (
                      <h3 className="text-xl font-medium">{service.title}</h3>
                    ) : (
                      <div className="text-xl font-medium">{service.title}</div>
                    )
                  )}
                  {service.shortDescription && (
                    typeof service.shortDescription === "string" ? (
                      <p className="text-sm text-muted-foreground">{service.shortDescription}</p>
                    ) : (
                      <div className="text-sm text-muted-foreground">{service.shortDescription}</div>
                    )
                  )}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="space-y-4">
                {service.fullDescription && (
                  typeof service.fullDescription === "string" ? (
                    <p className="text-muted-foreground">{service.fullDescription}</p>
                  ) : (
                    <div className="text-muted-foreground">{service.fullDescription}</div>
                  )
                )}
                {service.benefits && service.benefits.length > 0 && (
                  <div>
                    {typeof benefitsLabel === "string" ? (
                      <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                        {benefitsLabel}
                      </h4>
                    ) : (
                      benefitsLabel
                    )}
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {service.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start gap-2 text-sm">
                          <span className="text-xl leading-tight text-primary">&bull;</span>
                          {typeof benefit === "string" ? (
                            <span>{benefit}</span>
                          ) : (
                            <div>{benefit}</div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {service.ctaText && (
                  <div className="pt-2">
                    <Pressable
                      href={service.ctaUrl}
                      onClick={service.ctaOnClick}
                      variant="outline"
                      size="sm"
                      asButton
                    >
                      {service.ctaText}
                      <DynamicIcon name="lucide/arrow-right" className="ml-2 h-3.5 w-3.5" />
                    </Pressable>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };

  const renderBottomAction = () => {
    if (bottomActionSlot) return bottomActionSlot;
    if (!bottomAction) return null;

    return (
      <div className={cn("mt-12 text-center", bottomActionClassName)}>
        <Pressable href={bottomAction.href} onClick={bottomAction.onClick} variant="default" asButton>
          {bottomAction.label}
          <DynamicIcon name="lucide/arrow-right" className="ml-2 h-4 w-4" />
        </Pressable>
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
      <div className={cn("mx-auto max-w-3xl", containerClassName)}>
        <div className={cn("mb-12 text-center md:mb-16", headerClassName)}>
          {heading && (
            typeof heading === "string" ? (
              <h2 className={cn("text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl", headingClassName)}>
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("mx-auto mt-4 max-w-2xl text-lg text-muted-foreground", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
        </div>
        {renderServices()}
        {renderBottomAction()}
      </div>
    </Section>
  );
}
