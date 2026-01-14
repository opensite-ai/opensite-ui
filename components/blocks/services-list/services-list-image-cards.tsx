"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing, OptixFlowConfig, ActionConfig } from "../../../src/types";

/**
 * Service item configuration for image cards display
 */
export interface ServicesListImageCardsService {
  /**
   * Service title
   */
  title?: React.ReactNode;
  /**
   * Service description
   */
  description?: React.ReactNode;
  /**
   * Service image
   */
  image?: {
    src: string;
    alt: string;
  };
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

export interface ServicesListImageCardsProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Supporting description content
   */
  description?: React.ReactNode;
  /**
   * Primary CTA configuration
   */
  primaryAction?: ActionConfig;
  /**
   * Secondary CTA configuration
   */
  secondaryAction?: ActionConfig;
  /**
   * Custom slot for actions (overrides primaryAction/secondaryAction)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Array of service configurations
   */
  services?: ServicesListImageCardsService[];
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
   * Additional CSS classes for the content area
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each card
   */
  cardClassName?: string;
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
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * ServicesListImageCards - An asymmetric layout with introductory text on the left and 2 featured service cards on the right.
 * Each service card features a large image overlay with gradient, title, description, and CTA link.
 * Perfect for showcasing 2-3 primary services with strong visual impact and clear calls to action.
 *
 * @example
 * ```tsx
 * <ServicesListImageCards
 *   heading="Transform Your Digital Presence"
 *   description="We specialize in creating digital experiences."
 *   primaryAction={{ label: "Get Started", href: "#" }}
 *   services={[{ title: "Web Dev", description: "Custom websites" }]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function ServicesListImageCards({
  heading,
  description,
  primaryAction,
  secondaryAction,
  actionsSlot,
  services,
  servicesSlot,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  gridClassName,
  cardClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: ServicesListImageCardsProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;

    return (
      <div className={cn("mt-8 flex flex-col gap-4 sm:flex-row", actionsClassName)}>
        {primaryAction && (
          <Pressable
            href={primaryAction.href}
            onClick={primaryAction.onClick}
            variant="default"
            size="lg"
            asButton
          >
            {primaryAction.label}
            <DynamicIcon name="lucide/arrow-right" className="ml-2 h-4 w-4" />
          </Pressable>
        )}
        {secondaryAction && (
          <Pressable
            href={secondaryAction.href}
            onClick={secondaryAction.onClick}
            variant="outline"
            size="lg"
            asButton
          >
            {secondaryAction.label}
          </Pressable>
        )}
      </div>
    );
  };

  const renderServices = () => {
    if (servicesSlot) return servicesSlot;
    if (!services || services.length === 0) return null;

    return (
      <div className={cn("grid gap-6", gridClassName)}>
        {services.map((service, index) => (
          <div
            key={index}
            className={cn("group relative overflow-hidden rounded-xl", cardClassName, service.className)}
          >
            {service.image && (
              <Img
                src={service.image.src}
                alt={service.image.alt}
                className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                optixFlowConfig={optixFlowConfig}
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              {service.title && (
                typeof service.title === "string" ? (
                  <h3 className="text-xl font-bold text-white">{service.title}</h3>
                ) : (
                  <div className="text-xl font-bold text-white">{service.title}</div>
                )
              )}
              {service.description && (
                typeof service.description === "string" ? (
                  <p className="mt-2 text-sm text-white/80">{service.description}</p>
                ) : (
                  <div className="mt-2 text-sm text-white/80">{service.description}</div>
                )
              )}
              {service.ctaText && (
                <Pressable
                  href={service.ctaUrl}
                  onClick={service.ctaOnClick}
                  className="mt-4 inline-flex items-center text-sm font-medium text-white hover:underline"
                >
                  {service.ctaText}
                  <DynamicIcon name="lucide/arrow-right" className="ml-1 h-4 w-4" />
                </Pressable>
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
      <div className={cn("grid gap-12 lg:grid-cols-2 lg:gap-16", containerClassName)}>
        <div className={cn("flex flex-col justify-center", contentClassName)}>
          {heading && (
            typeof heading === "string" ? (
              <h2 className={cn("text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl", headingClassName)}>
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("mt-6 text-lg leading-relaxed text-muted-foreground", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
          {renderActions()}
        </div>
        {renderServices()}
      </div>
    </Section>
  );
}
