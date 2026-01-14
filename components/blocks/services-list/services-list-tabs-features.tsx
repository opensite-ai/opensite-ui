"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing, OptixFlowConfig } from "../../../src/types";

/**
 * Service item configuration for tabs features display
 */
export interface ServicesListTabsFeaturesService {
  /**
   * Unique ID for the tab
   */
  id: string;
  /**
   * Service title (used in tab and content)
   */
  title?: React.ReactNode;
  /**
   * Service description
   */
  description?: React.ReactNode;
  /**
   * List of features
   */
  features?: React.ReactNode[];
  /**
   * Image configuration
   */
  image?: {
    src: string;
    alt: string;
  };
  /**
   * Additional CSS classes for the tab content
   */
  className?: string;
}

export interface ServicesListTabsFeaturesProps {
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
  services?: ServicesListTabsFeaturesService[];
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
   * Additional CSS classes for the tabs list
   */
  tabsListClassName?: string;
  /**
   * Additional CSS classes for each tab trigger
   */
  tabTriggerClassName?: string;
  /**
   * Additional CSS classes for each tab content
   */
  tabContentClassName?: string;
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
 * ServicesListTabsFeatures - A tabbed services layout with feature lists and images.
 * Users can switch between service categories using tabs, with each tab displaying
 * a description, feature list with check icons, and a corresponding image.
 * Ideal for organizing multiple service categories in a compact, interactive format.
 *
 * @example
 * ```tsx
 * <ServicesListTabsFeatures
 *   heading="Our Services"
 *   description="Explore our comprehensive range of digital services."
 *   services={[{ id: "dev", title: "Development", description: "Custom apps", features: ["React"] }]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function ServicesListTabsFeatures({
  heading = "Our Services",
  description = "Explore our comprehensive range of digital services.",
  services,
  servicesSlot,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  tabsListClassName,
  tabTriggerClassName,
  tabContentClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: ServicesListTabsFeaturesProps): React.JSX.Element {
  const renderServices = () => {
    if (servicesSlot) return servicesSlot;
    if (!services || services.length === 0) return null;

    return (
      <Tabs defaultValue={services[0]?.id} className="w-full">
        <div className="flex justify-center">
          <TabsList className={cn(
            "grid h-auto w-full max-w-2xl grid-cols-2 gap-2 bg-transparent p-0 md:grid-cols-4",
            tabsListClassName
          )}>
            {services.map((service) => (
              <TabsTrigger
                key={service.id}
                value={service.id}
                className={cn(
                  "rounded-lg border border-border bg-background px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                  tabTriggerClassName
                )}
              >
                {service.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {services.map((service) => (
          <TabsContent
            key={service.id}
            value={service.id}
            className={cn("mt-8", tabContentClassName, service.className)}
          >
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center">
                {service.title && (
                  typeof service.title === "string" ? (
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                  ) : (
                    <div className="text-2xl font-bold">{service.title}</div>
                  )
                )}
                {service.description && (
                  typeof service.description === "string" ? (
                    <p className="mt-4 text-muted-foreground leading-relaxed">{service.description}</p>
                  ) : (
                    <div className="mt-4 text-muted-foreground leading-relaxed">{service.description}</div>
                  )
                )}
                {service.features && service.features.length > 0 && (
                  <div className="mt-6 space-y-3">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                          <DynamicIcon name="lucide/check" className="h-4 w-4 text-primary" />
                        </div>
                        {typeof feature === "string" ? (
                          <span>{feature}</span>
                        ) : (
                          <div>{feature}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {service.image && (
                <div className="overflow-hidden rounded-xl">
                  <Img
                    src={service.image.src}
                    alt={service.image.alt}
                    className="aspect-4/3 w-full object-cover"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
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
      <div className={cn("mx-auto max-w-6xl space-y-12", containerClassName)}>
        <div className={cn("space-y-4 text-center", headerClassName)}>
          {heading && (
            typeof heading === "string" ? (
              <h2 className={cn("text-3xl font-semibold tracking-tight md:text-4xl", headingClassName)}>
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("mx-auto max-w-2xl text-lg tracking-tight text-muted-foreground md:text-xl", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
        </div>
        {renderServices()}
      </div>
    </Section>
  );
}
