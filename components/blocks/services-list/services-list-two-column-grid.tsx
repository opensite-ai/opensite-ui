"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  ActionConfig,
} from "../../../src/types";

/**
 * Service item configuration for two-column grid display
 */
export interface ServicesListTwoColumnGridService {
  /**
   * Custom icon element (takes precedence over iconName)
   */
  icon?: React.ReactNode;
  /**
   * Icon name for DynamicIcon
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
   * CTA URL
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

export interface ServicesListTwoColumnGridProps {
  /**
   * Badge text
   */
  badge?: React.ReactNode;
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
   * Custom slot for rendering actions (overrides primaryAction/secondaryAction)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Array of service configurations
   */
  services?: ServicesListTwoColumnGridService[];
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
   * Additional CSS classes for the content column
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
 * ServicesListTwoColumnGrid - A 2-column layout with introductory content on the left and a 2x2 service grid on the right.
 * The left column features a badge, title, description, and dual CTA buttons.
 * The right column displays services as bordered cards with icons and hover effects.
 * Ideal for presenting services alongside compelling marketing copy.
 *
 * @example
 * ```tsx
 * <ServicesListTwoColumnGrid
 *   badge="Services"
 *   heading="Everything You Need"
 *   description="Comprehensive digital solutions."
 *   primaryAction={{ label: "Get Started", href: "#" }}
 *   services={[{ iconName: "lucide/code", title: "Web Dev", description: "Custom websites" }]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function ServicesListTwoColumnGrid({
  badge,
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
  gridClassName,
  cardClassName,
  iconClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
}: ServicesListTwoColumnGridProps): React.JSX.Element {
  const renderServiceIcon = (service: ServicesListTwoColumnGridService) => {
    if (service.icon) return service.icon;
    if (service.iconName)
      return <DynamicIcon name={service.iconName} className="h-6 w-6" />;
    return null;
  };

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;

    return (
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
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
      <div className={cn("grid grid-cols-2 gap-4", gridClassName)}>
        {services.map((service, index) => (
          <Pressable
            key={index}
            href={service.ctaUrl}
            onClick={service.ctaOnClick}
            className={cn(
              "group flex flex-col rounded-xl border border-border p-6 transition-all hover:border-primary hover:shadow-md",
              cardClassName,
              service.className,
            )}
          >
            <div
              className={cn(
                "mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground",
                iconClassName,
              )}
            >
              {renderServiceIcon(service)}
            </div>
            {service.title &&
              (typeof service.title === "string" ? (
                <h3 className="text-lg font-semibold">{service.title}</h3>
              ) : (
                <div className="text-lg font-semibold">{service.title}</div>
              ))}
            {service.description &&
              (typeof service.description === "string" ? (
                <p className="mt-2 text-sm text-muted-foreground">
                  {service.description}
                </p>
              ) : (
                <div className="mt-2 text-sm text-muted-foreground">
                  {service.description}
                </div>
              ))}
            <div className="mt-auto pt-4">
              <span className="inline-flex items-center text-sm font-medium text-primary">
                Learn more
                <DynamicIcon
                  name="lucide/arrow-right"
                  className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </span>
            </div>
          </Pressable>
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
      <div
        className={cn(
          "grid gap-12 lg:grid-cols-2 lg:gap-16",
          containerClassName,
        )}
      >
        <div className={cn("flex flex-col justify-center", contentClassName)}>
          {badge &&
            (typeof badge === "string" ? (
              <Badge variant="outline" className="mb-4 w-fit">
                {badge}
              </Badge>
            ) : (
              <div className="mb-4 w-fit">{badge}</div>
            ))}
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl",
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
                  "mt-6 text-lg leading-relaxed text-muted-foreground",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}
          {renderActions()}
        </div>
        {renderServices()}
      </div>
    </Section>
  );
}
