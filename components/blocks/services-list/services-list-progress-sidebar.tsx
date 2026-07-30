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
 * Service item configuration for progress sidebar display
 */
export interface ServicesListProgressSidebarService {
  /**
   * Icon element (overrides iconName)
   */
  icon?: React.ReactNode | string;
  /**
   * Icon name in format: prefix/name (e.g., "lucide/lightbulb")
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
   * Progress percentage (0-100)
   */
  progress?: number;
  /**
   * Status text
   */
  status?: React.ReactNode;
  /**
   * Additional CSS classes for the card
   */
  className?: string;
}

export interface ServicesListProgressSidebarProps {
  /**
   * Sidebar heading content
   */
  sidebarHeading?: React.ReactNode;
  /**
   * Sidebar description content
   */
  sidebarDescription?: React.ReactNode;
  /**
   * Primary CTA configuration
   */
  primaryAction?: ActionConfig;
  /**
   * Custom slot for actions (overrides primaryAction)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Array of service configurations
   */
  services?: ServicesListProgressSidebarService[];
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
   * Additional CSS classes for the sidebar
   */
  sidebarClassName?: string;
  /**
   * Additional CSS classes for the sidebar heading
   */
  sidebarHeadingClassName?: string;
  /**
   * Additional CSS classes for the sidebar description
   */
  sidebarDescriptionClassName?: string;
  /**
   * Additional CSS classes for the services container
   */
  servicesClassName?: string;
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
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * ServicesListProgressSidebar - A creative solutions layout with a sticky left sidebar and service list with progress indicators.
 * The sidebar contains title, description, and CTA. Each service displays with an icon, title, description, and visual progress bar.
 * Perfect for showcasing a process or methodology with clear status indicators for each phase.
 *
 * @example
 * ```tsx
 * <ServicesListProgressSidebar
 *   sidebarHeading="Our Creative Process"
 *   sidebarDescription="We follow a proven methodology."
 *   primaryAction={{ label: "Start Your Project", href: "#" }}
 *   services={[{ iconName: "lucide/lightbulb", title: "Discovery", progress: 100 }]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function ServicesListProgressSidebar({
  sectionId = "services-list-progress-sidebar",
  sidebarHeading,
  sidebarDescription,
  primaryAction,
  actionsSlot,
  services,
  servicesSlot,
  className,
  containerClassName,
  sidebarClassName,
  sidebarHeadingClassName,
  sidebarDescriptionClassName,
  servicesClassName,
  cardClassName,
  iconClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
}: ServicesListProgressSidebarProps): React.JSX.Element {
  const renderServiceIcon = (service: ServicesListProgressSidebarService) => {
    if (service.icon)
      return <DynamicIcon name={service.icon} className="h-6 w-6" />;
    if (service.iconName)
      return <DynamicIcon name={service.iconName} className="h-6 w-6" />;
    return null;
  };

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!primaryAction) return null;

    return (
      <div className="mt-8">
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
      <div className={cn("space-y-6 lg:col-span-2", servicesClassName)}>
        {services.map((service, index) => (
          <div
            key={index}
            className={cn(
              "rounded-xl border border-border p-6 transition-shadow hover:shadow-md",
              cardClassName,
              service.className,
            )}
          >
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg",
                  service.progress === 100
                    ? "bg-success/10 text-success dark:bg-success/10 dark:text-success"
                    : service.progress && service.progress > 0
                      ? "bg-primary/10 text-primary"
                      : cn(getNestedCardBg(background), "text-muted-foreground"),
                  iconClassName,
                )}
              >
                {renderServiceIcon(service)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  {service.title &&
                    (typeof service.title === "string" ? (
                      <h3 className="text-lg font-semibold">{service.title}</h3>
                    ) : (
                      <div className="text-lg font-semibold">
                        {service.title}
                      </div>
                    ))}
                  {service.status && (
                    <span
                      className={cn(
                        "text-xs font-medium",
                        service.progress === 100
                          ? "text-success dark:text-success"
                          : service.progress && service.progress > 0
                            ? "text-primary"
                            : "text-muted-foreground",
                      )}
                    >
                      {typeof service.status === "string"
                        ? service.status
                        : service.status}
                    </span>
                  )}
                </div>
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
                {typeof service.progress === "number" && (
                  <div className="mt-4">
                    <div className={cn(
                      "h-2 w-full overflow-hidden rounded-full",
                      getNestedCardBg(background),
                    )}>
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          service.progress === 100
                            ? "bg-success"
                            : "bg-primary",
                        )}
                        style={{ width: `${service.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
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
      <div
        className={cn(
          "grid gap-12 lg:grid-cols-3 lg:gap-16",
          containerClassName,
        )}
      >
        <div
          className={cn("lg:sticky lg:top-32 lg:self-start", sidebarClassName)}
        >
          {sidebarHeading &&
            (typeof sidebarHeading === "string" ? (
              <h2
                className={cn(
                  "text-3xl font-bold tracking-tight md:text-4xl",
                  sidebarHeadingClassName,
                )}
              >
                {sidebarHeading}
              </h2>
            ) : (
              <div className={sidebarHeadingClassName}>{sidebarHeading}</div>
            ))}
          {sidebarDescription &&
            (typeof sidebarDescription === "string" ? (
              <p
                className={cn(
                  "mt-6 text-lg leading-relaxed text-muted-foreground",
                  sidebarDescriptionClassName,
                )}
              >
                {sidebarDescription}
              </p>
            ) : (
              <div className={sidebarDescriptionClassName}>
                {sidebarDescription}
              </div>
            ))}
          {renderActions()}
        </div>
        {renderServices()}
      </div>
    </Section>
  );
}
