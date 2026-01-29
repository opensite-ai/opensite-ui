"use client";

import * as React from "react";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  ActionConfig,
} from "../../../src/types";

/**
 * Service item configuration for timeline display
 */
export interface ServicesListTimelineService {
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
   * Duration badge text
   */
  duration?: React.ReactNode;
  /**
   * List of deliverables
   */
  deliverables?: React.ReactNode[];
  /**
   * Additional CSS classes for the card
   */
  className?: string;
}

export interface ServicesListTimelineProps {
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
   * Custom slot for rendering actions (overrides primaryAction)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Array of service configurations
   */
  services?: ServicesListTimelineService[];
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
   * Additional CSS classes for the timeline container
   */
  timelineClassName?: string;
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
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
}

/**
 * ServicesListTimeline - A timeline-style layout displaying services as project phases.
 * Each phase features an icon, title, description, duration badge, and deliverables list.
 * Connected by a vertical timeline line with dot markers. Perfect for showcasing a project
 * workflow or service delivery process with clear timelines and expected outcomes.
 *
 * @example
 * ```tsx
 * <ServicesListTimeline
 *   heading="Our Process"
 *   description="A structured approach to delivering results."
 *   primaryAction={{ label: "Start Your Project", href: "#" }}
 *   services={[{ iconName: "lucide/search", title: "Discovery", duration: "Week 1-2" }]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function ServicesListTimeline({
  heading,
  description,
  primaryAction,
  actionsSlot,
  services,
  servicesSlot,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  timelineClassName,
  cardClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
}: ServicesListTimelineProps): React.JSX.Element {
  const renderServiceIcon = (service: ServicesListTimelineService) => {
    if (service.icon) return service.icon;
    if (service.iconName)
      return (
        <DynamicIcon name={service.iconName} className="h-4 w-4 text-primary" />
      );
    return null;
  };

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!primaryAction) return null;

    return (
      <div className="text-center">
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
      </div>
    );
  };

  const renderServices = () => {
    if (servicesSlot) return servicesSlot;
    if (!services || services.length === 0) return null;

    return (
      <div className={cn("relative", timelineClassName)}>
        <div className="absolute left-4 top-0 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />

        <div className="space-y-12">
          {services.map((service, index) => (
            <div
              key={index}
              className={cn(
                "relative flex flex-col gap-4 md:flex-row md:gap-8",
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse",
              )}
            >
              <div className="absolute left-4 top-0 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-background md:left-1/2">
                {renderServiceIcon(service)}
              </div>

              <div
                className={cn(
                  "ml-12 flex-1 md:ml-0",
                  index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12",
                )}
              >
                <div
                  className={cn(
                    "rounded-xl border border-border p-6 transition-shadow hover:shadow-md",
                    getNestedCardBg(background, 'card'),
                    getNestedCardTextColor(background),
                    index % 2 === 0 ? "md:mr-4" : "md:ml-4",
                    cardClassName,
                    service.className,
                  )}
                >
                  <div
                    className={cn(
                      "mb-2 flex items-center gap-3",
                      index % 2 === 0 ? "md:justify-end" : "",
                    )}
                  >
                    {service.title &&
                      (typeof service.title === "string" ? (
                        <h3 className="text-lg font-semibold">
                          {service.title}
                        </h3>
                      ) : (
                        <div className="text-lg font-semibold">
                          {service.title}
                        </div>
                      ))}
                    {service.duration &&
                      (typeof service.duration === "string" ? (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          {service.duration}
                        </span>
                      ) : (
                        <div className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          {service.duration}
                        </div>
                      ))}
                  </div>
                  {service.description &&
                    (typeof service.description === "string" ? (
                      <p className="mb-4 text-sm text-muted-foreground">
                        {service.description}
                      </p>
                    ) : (
                      <div className="mb-4 text-sm text-muted-foreground">
                        {service.description}
                      </div>
                    ))}
                  {service.deliverables && service.deliverables.length > 0 && (
                    <div
                      className={cn(
                        "flex flex-wrap gap-2",
                        index % 2 === 0 ? "md:justify-end" : "",
                      )}
                    >
                      {service.deliverables.map((deliverable, delIndex) => (
                        <span
                          key={delIndex}
                          className={cn(
                            "inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs",
                            getNestedCardBg(background, 'subtle'),
                            getNestedCardTextColor(background),
                          )}
                        >
                          <DynamicIcon
                            name="lucide/check"
                            className="mr-1 h-3 w-3 text-primary"
                          />
                          {typeof deliverable === "string"
                            ? deliverable
                            : deliverable}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="hidden flex-1 md:block" />
            </div>
          ))}
        </div>
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
      <div className={cn("mx-auto max-w-4xl space-y-16", containerClassName)}>
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
        {renderActions()}
      </div>
    </Section>
  );
}
