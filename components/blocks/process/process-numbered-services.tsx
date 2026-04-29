"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

/**
 * Service item configuration for ProcessNumberedServices
 */
export interface ProcessNumberedServiceItem {
  /**
   * Service number (e.g., "01", "02")
   */
  number?: React.ReactNode;
  /**
   * Service title
   */
  title?: React.ReactNode;
  /**
   * Service description
   */
  description?: React.ReactNode;
  /**
   * List of capabilities or features
   */
  capabilities?: React.ReactNode[];
  /**
   * Action configuration for the service CTA
   */
  action?: ActionConfig;
  /**
   * Custom slot for rendering the action (overrides action config)
   */
  actionSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the service item
   */
  className?: string;
  /**
   * @deprecated Use `action` instead
   */
  ctaText?: string;
  /**
   * @deprecated Use `action` instead
   */
  ctaUrl?: string;
}

export interface ProcessNumberedServicesProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Array of service configurations
   */
  services?: ProcessNumberedServiceItem[];
  /**
   * Custom slot for rendering services (overrides services array)
   */
  servicesSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the header area
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
   * Additional CSS classes for the services list
   */
  servicesClassName?: string;
  /**
   * Additional CSS classes for each service item
   */
  serviceItemClassName?: string;
  /**
   * Additional CSS classes for the service number badge
   */
  serviceBadgeClassName?: string;
  /**
   * Additional CSS classes for the capabilities grid
   */
  capabilitiesClassName?: string;
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
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * ProcessNumberedServices - A numbered services section with capabilities grid.
 */
export function ProcessNumberedServices({
  sectionId = "process-numbered-services",
  heading,
  description,
  services,
  servicesSlot,
  className,
  contentClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  servicesClassName,
  serviceItemClassName,
  serviceBadgeClassName,
  capabilitiesClassName,
  background,
  spacing = "py-6 md:py-32",
  pattern,
  patternOpacity,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
}: ProcessNumberedServicesProps): React.JSX.Element {
  // Handle backwards compatibility
  const resolvedHeading = heading;

  const renderServiceAction = useMemo(() => {
    return (service: ProcessNumberedServiceItem) => {
      if (service.actionSlot) return service.actionSlot;

      const action =
        service.action ??
        (service.ctaText && service.ctaUrl
          ? {
              label: service.ctaText,
              href: service.ctaUrl,
              variant: "ghost" as const,
            }
          : null);

      if (!action) return null;

      const {
        label,
        icon,
        iconAfter,
        children,
        className: actionClassName,
        ...pressableProps
      } = action;

      return (
        <Pressable
          asButton
          className={cn(actionClassName, "mt-4")}
          {...pressableProps}
        >
          {children ?? (
            <>
              {icon}
              {label}
              {iconAfter && iconAfter}
            </>
          )}
        </Pressable>
      );
    };
  }, []);

  const renderServices = useMemo(() => {
    if (servicesSlot) return servicesSlot;
    if (!services?.length) return null;

    return (
      <div className={cn("space-y-0", servicesClassName)}>
        {services.map((service, index) => (
          <div
            key={index}
            className={cn(
              "group grid gap-8 border-t py-12 lg:grid-cols-12 lg:gap-12",
              serviceItemClassName,
              service.className,
            )}
          >
            <div className="lg:col-span-1">
              <div
                className={cn(
                  "flex size-16 items-center justify-center rounded-full border-2 border-primary text-primary text-xl font-bold transition-colors",
                  "bg-primary/5 group-hover:bg-primary group-hover:text-primary-foreground",
                  serviceBadgeClassName,
                )}
              >
                {service.number ?? `0${index + 1}`}
              </div>
            </div>

            <div className="lg:col-span-4">
              {service.title &&
                (typeof service.title === "string" ? (
                  <h3 className="mb-3 text-2xl font-semibold tracking-tight">
                    {service.title}
                  </h3>
                ) : (
                  service.title
                ))}
              {service.description &&
                (typeof service.description === "string" ? (
                  <p className={cn("leading-relaxed")}>{service.description}</p>
                ) : (
                  service.description
                ))}
              {renderServiceAction(service)}
            </div>

            <div className="lg:col-span-7">
              {service.capabilities?.length ? (
                <div
                  className={cn(
                    "grid gap-3 sm:grid-cols-2",
                    capabilitiesClassName,
                  )}
                >
                  {service.capabilities.map((capability, cIndex) => (
                    <div
                      key={cIndex}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-4 py-3",
                        "bg-muted text-muted-foreground",
                      )}
                    >
                      <DynamicIcon name="lucide/check-circle-2" size={18} />
                      <span className="text-sm font-medium">{capability}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    );
  }, [
    servicesSlot,
    services,
    background,
    servicesClassName,
    serviceItemClassName,
    serviceBadgeClassName,
    capabilitiesClassName,
    renderServiceAction,
  ]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
      containerClassName={containerClassName}
    >
      <div className={contentClassName}>
        <div className={cn("mb-16 max-w-2xl", headerClassName)}>
          {resolvedHeading &&
            (typeof resolvedHeading === "string" ? (
              <h1
                className={cn(
                  "mb-4 text-4xl font-semibold tracking-tight lg:text-5xl",
                  headingClassName,
                )}
              >
                {resolvedHeading}
              </h1>
            ) : (
              <div className={headingClassName}>{resolvedHeading}</div>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p className={cn("text-lg", descriptionClassName)}>
                {description}
              </p>
            ) : (
              description
            ))}
        </div>
        {renderServices}
      </div>
    </Section>
  );
}
