"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
  ActionConfig,
} from "../../../src/types";

/**
 * Service item configuration for split checklist display
 */
export interface ServicesListSplitChecklistService {
  /**
   * Service ID
   */
  id?: number | string;
  /**
   * Service title
   */
  title?: React.ReactNode;
  /**
   * Service description
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the item
   */
  className?: string;
}

export interface ServicesListSplitChecklistProps {
  /**
   * Badge content
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
   * Custom slot for actions (overrides primaryAction/secondaryAction)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Image configuration
   */
  image?: {
    src: string;
    alt: string;
  };
  /**
   * Checklist heading text
   */
  checklistHeading?: React.ReactNode;
  /**
   * Checklist footer CTA configuration
   */
  checklistAction?: ActionConfig;
  /**
   * Array of service configurations
   */
  services?: ServicesListSplitChecklistService[];
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
   * Additional CSS classes for the left content area
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
   * Additional CSS classes for the checklist container
   */
  checklistClassName?: string;
  /**
   * Additional CSS classes for each service item
   */
  serviceClassName?: string;
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

/**
 * ServicesListSplitChecklist - A split layout with introductory content and image on the left, service checklist on the right.
 * The left column features a badge, title, description, dual CTAs, and an optional image.
 * The right column displays services as a checklist with check icons, titles, and descriptions.
 * Perfect for presenting services alongside compelling marketing copy and visual content.
 *
 * @example
 * ```tsx
 * <ServicesListSplitChecklist
 *   badge="Services"
 *   heading="How I Can Help You"
 *   description="Specialized services for your business."
 *   primaryAction={{ label: "Get in touch", href: "#" }}
 *   services={[{ id: 1, title: "Web Dev", description: "Custom websites" }]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function ServicesListSplitChecklist({
  badge,
  heading,
  description,
  primaryAction,
  secondaryAction,
  actionsSlot,
  image,
  checklistHeading,
  checklistAction,
  services,
  servicesSlot,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  checklistClassName,
  serviceClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: ServicesListSplitChecklistProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;

    return (
      <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
        {primaryAction && (
          <Pressable
            href={primaryAction.href}
            onClick={primaryAction.onClick}
            size="lg"
            variant="default"
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
            size="lg"
            variant="outline"
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
      <div className="space-y-6">
        {services.map((service, index) => (
          <div
            key={service.id ?? index}
            className={cn(
              "border-b border-border pb-6 last:border-0 last:pb-0",
              serviceClassName,
              service.className,
            )}
          >
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-primary/10 p-1">
                <DynamicIcon
                  name="lucide/check"
                  className="h-5 w-5 text-primary"
                />
              </div>
              <div>
                {service.title &&
                  (typeof service.title === "string" ? (
                    <h4 className="font-medium">{service.title}</h4>
                  ) : (
                    <div className="font-medium">{service.title}</div>
                  ))}
                {service.description &&
                  (typeof service.description === "string" ? (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  ) : (
                    <div className="mt-1 text-sm text-muted-foreground">
                      {service.description}
                    </div>
                  ))}
              </div>
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
      <div
        className={cn(
          "grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16",
          containerClassName,
        )}
      >
        <div className={cn("flex flex-col justify-center", contentClassName)}>
          {badge &&
            (typeof badge === "string" ? (
              <Badge className="mb-6 w-fit" variant="outline">
                {badge}
              </Badge>
            ) : (
              <div className="mb-6 w-fit">{badge}</div>
            ))}
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl",
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
                  "mb-8 text-lg leading-relaxed text-muted-foreground",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}
          {renderActions()}
          {image && (
            <div className="relative mt-12 hidden lg:block">
              <Img
                src={image.src}
                alt={image.alt}
                className="rounded-lg object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          )}
        </div>

        <div
          className={cn(
            "flex flex-col justify-center rounded-xl border bg-card p-8 shadow-sm",
            checklistClassName,
          )}
        >
          {checklistHeading &&
            (typeof checklistHeading === "string" ? (
              <h3 className="mb-8 text-lg font-medium text-muted-foreground">
                {checklistHeading}
              </h3>
            ) : (
              <div className="mb-8 text-lg font-medium text-muted-foreground">
                {checklistHeading}
              </div>
            ))}
          {renderServices()}
          {checklistAction && (
            <div className="mt-8 text-center">
              <Pressable
                href={checklistAction.href}
                onClick={checklistAction.onClick}
                variant="outline"
                className="w-full"
                asButton
              >
                {checklistAction.label}
                <DynamicIcon
                  name="lucide/arrow-right"
                  className="ml-2 h-4 w-4"
                />
              </Pressable>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
