"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

/**
 * Expertise item configuration for service detail blocks.
 */
export interface ServiceExpertiseItem {
  /**
   * Icon image URL
   */
  icon?: string;
  /**
   * Icon element (overrides icon URL)
   */
  iconSlot?: React.ReactNode;
  /**
   * Expertise title
   */
  title?: React.ReactNode;
  /**
   * Supporting description
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Service offering item configuration.
 */
export interface ServiceOfferingItem {
  /**
   * Icon name for DynamicIcon (e.g., "lucide/users")
   */
  iconName?: string;
  /**
   * Icon element (overrides iconName)
   */
  icon?: React.ReactNode;
  /**
   * Service title
   */
  title?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Related service item configuration.
 */
export interface RelatedServiceItem {
  /**
   * Image URL
   */
  image?: string;
  /**
   * Image alt text
   */
  imageAlt?: string;
  /**
   * Service title
   */
  title?: React.ReactNode;
  /**
   * Service description
   */
  description?: React.ReactNode;
  /**
   * Link URL
   */
  href?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Content section configuration.
 */
export interface ServiceContentSection {
  /**
   * Section title
   */
  title?: React.ReactNode;
  /**
   * Section paragraphs
   */
  paragraphs?: React.ReactNode[];
  /**
   * Custom content slot (overrides paragraphs)
   */
  contentSlot?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export interface ServiceDetailCenteredExpertiseProps {
  /**
   * Main page title
   */
  title?: React.ReactNode;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Service icon configuration
   */
  serviceIcon?: {
    src: string;
    alt: string;
  };
  /**
   * Custom slot for service icon (overrides serviceIcon)
   */
  serviceIconSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the service icon container
   */
  serviceIconClassName?: string;
  /**
   * Introduction description
   */
  introDescription?: React.ReactNode;
  /**
   * Additional CSS classes for the intro description
   */
  introDescriptionClassName?: string;
  /**
   * Expertise section title
   */
  expertiseTitle?: React.ReactNode;
  /**
   * Additional CSS classes for the expertise title
   */
  expertiseTitleClassName?: string;
  /**
   * Array of expertise items
   */
  expertise?: ServiceExpertiseItem[];
  /**
   * Custom slot for rendering expertise (overrides expertise array)
   */
  expertiseSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the expertise container
   */
  expertiseClassName?: string;
  /**
   * Services section title
   */
  servicesTitle?: React.ReactNode;
  /**
   * Additional CSS classes for the services title
   */
  servicesTitleClassName?: string;
  /**
   * Array of service offerings
   */
  services?: ServiceOfferingItem[];
  /**
   * Custom slot for rendering services (overrides services array)
   */
  servicesSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the services container
   */
  servicesClassName?: string;
  /**
   * Related services section title
   */
  relatedServicesTitle?: React.ReactNode;
  /**
   * Additional CSS classes for the related services title
   */
  relatedServicesTitleClassName?: string;
  /**
   * Array of related services
   */
  relatedServices?: RelatedServiceItem[];
  /**
   * Custom slot for rendering related services (overrides relatedServices array)
   */
  relatedServicesSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the related services container
   */
  relatedServicesClassName?: string;
  /**
   * Array of content sections
   */
  contentSections?: ServiceContentSection[];
  /**
   * Custom slot for rendering content sections (overrides contentSections array)
   */
  contentSectionsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the content sections container
   */
  contentSectionsClassName?: string;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header area
   */
  headerClassName?: string;
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
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function ServiceDetailCenteredExpertise({
  title,
  titleClassName,
  serviceIcon,
  serviceIconSlot,
  serviceIconClassName,
  introDescription,
  introDescriptionClassName,
  expertiseTitle,
  expertiseTitleClassName,
  expertise,
  expertiseSlot,
  expertiseClassName,
  servicesTitle,
  servicesTitleClassName,
  services,
  servicesSlot,
  servicesClassName,
  relatedServicesTitle,
  relatedServicesTitleClassName,
  relatedServices,
  relatedServicesSlot,
  relatedServicesClassName,
  contentSections,
  contentSectionsSlot,
  contentSectionsClassName,
  className,
  containerClassName,
  headerClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: ServiceDetailCenteredExpertiseProps) {
  const renderServiceIcon = () => {
    if (serviceIconSlot) return serviceIconSlot;
    if (!serviceIcon) return null;

    return (
      <div className="flex justify-center">
        <div className={cn("rounded-lg bg-muted p-4", serviceIconClassName)}>
          <Img
            src={serviceIcon.src}
            alt={serviceIcon.alt}
            className="h-12 dark:invert"
            optixFlowConfig={optixFlowConfig}
          />
        </div>
      </div>
    );
  };

  const renderExpertise = () => {
    if (expertiseSlot) return expertiseSlot;
    if (!expertise || expertise.length === 0) return null;

    return (
      <div className={cn("mb-16", expertiseClassName)}>
        {expertiseTitle && (
          <h2
            className={cn(
              "mb-8 text-center text-2xl font-semibold",
              expertiseTitleClassName,
            )}
          >
            {expertiseTitle}
          </h2>
        )}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {expertise.map((item, index) => (
            <div
              key={index}
              className={cn(
                "rounded-lg border bg-background p-6 text-center",
                item.className,
              )}
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center">
                {item.iconSlot ? (
                  item.iconSlot
                ) : item.icon ? (
                  <Img
                    src={item.icon}
                    alt={typeof item.title === "string" ? item.title : ""}
                    className="h-8 w-8 object-contain"
                    optixFlowConfig={optixFlowConfig}
                  />
                ) : null}
              </div>
              {item.title && (
                <div className="text-sm font-medium">
                  {typeof item.title === "string" ? item.title : item.title}
                </div>
              )}
              {item.description && (
                <div className="text-xs text-muted-foreground">
                  {typeof item.description === "string"
                    ? item.description
                    : item.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContentSections = () => {
    if (contentSectionsSlot) return contentSectionsSlot;
    if (!contentSections || contentSections.length === 0) return null;

    return (
      <div
        className={cn(
          "prose prose-sm mx-auto max-w-3xl dark:prose-invert",
          contentSectionsClassName,
        )}
      >
        {contentSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className={section.className}>
            {section.contentSlot ? (
              section.contentSlot
            ) : (
              <>
                {section.title && (
                  <h2>
                    {typeof section.title === "string"
                      ? section.title
                      : section.title}
                  </h2>
                )}
                {section.paragraphs?.map((paragraph, paragraphIndex) =>
                  typeof paragraph === "string" ? (
                    <p key={paragraphIndex}>{paragraph}</p>
                  ) : (
                    <div key={paragraphIndex}>{paragraph}</div>
                  ),
                )}
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderServices = () => {
    if (servicesSlot) return servicesSlot;
    if (!services || services.length === 0) return null;

    return (
      <div className={cn("mt-16", servicesClassName)}>
        {servicesTitle && (
          <h2
            className={cn(
              "mb-8 text-center text-2xl font-semibold",
              servicesTitleClassName,
            )}
          >
            {servicesTitle}
          </h2>
        )}
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center gap-3 rounded-lg border bg-background p-4",
                service.className,
              )}
            >
              {service.icon ? (
                service.icon
              ) : service.iconName ? (
                <DynamicIcon
                  name={service.iconName}
                  size={20}
                  className="text-primary"
                />
              ) : null}
              {service.title && (
                <span className="text-sm">
                  {typeof service.title === "string"
                    ? service.title
                    : service.title}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderRelatedServices = () => {
    if (relatedServicesSlot) return relatedServicesSlot;
    if (!relatedServices || relatedServices.length === 0) return null;

    return (
      <div className={cn("mt-16", relatedServicesClassName)}>
        {relatedServicesTitle && (
          <h2
            className={cn(
              "mb-8 text-center text-2xl font-semibold",
              relatedServicesTitleClassName,
            )}
          >
            {relatedServicesTitle}
          </h2>
        )}
        <div className="grid gap-6 md:grid-cols-3">
          {relatedServices.map((service, index) => (
            <Pressable
              key={index}
              href={service.href}
              className={cn(
                "group block overflow-hidden rounded-lg border bg-background transition-shadow hover:shadow-lg",
                service.className,
              )}
            >
              {service.image && (
                <div className="aspect-video overflow-hidden">
                  <Img
                    src={service.image}
                    alt={
                      service.imageAlt ||
                      (typeof service.title === "string" ? service.title : "")
                    }
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              )}
              <div className="p-4">
                {service.title && (
                  <h3 className="font-medium group-hover:text-primary">
                    {typeof service.title === "string"
                      ? service.title
                      : service.title}
                  </h3>
                )}
                {service.description && (
                  <p className="text-sm text-muted-foreground">
                    {typeof service.description === "string"
                      ? service.description
                      : service.description}
                  </p>
                )}
              </div>
            </Pressable>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Section
      className={className}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("mx-auto max-w-4xl", containerClassName)}>
        <div className={cn("mb-16 space-y-8 text-center", headerClassName)}>
          {renderServiceIcon()}

          {title && (
            <h1
              className={cn(
                "text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl",
                titleClassName,
              )}
            >
              {typeof title === "string" ? title : title}
            </h1>
          )}

          {introDescription && (
            <p
              className={cn(
                "mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground",
                introDescriptionClassName,
              )}
            >
              {typeof introDescription === "string"
                ? introDescription
                : introDescription}
            </p>
          )}
        </div>

        {renderExpertise()}
        {renderContentSections()}
        {renderServices()}
        {renderRelatedServices()}
      </div>
    </Section>
  );
}
