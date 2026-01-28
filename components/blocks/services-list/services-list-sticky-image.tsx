"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";

/**
 * Service item configuration for sticky image display
 */
export interface ServicesListStickyImageService {
  /**
   * Service title
   */
  title?: React.ReactNode;
  /**
   * Service description
   */
  description?: React.ReactNode;
  /**
   * List of items/features
   */
  items?: React.ReactNode[];
  /**
   * Image configuration
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

export interface ServicesListStickyImageProps {
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
  services?: ServicesListStickyImageService[];
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
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each card
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the sticky image container
   */
  imageContainerClassName?: string;
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
 * ServicesListStickyImage - A sticky left sidebar layout with image transitions and a scrollable service list on the right.
 * As users scroll through services, the corresponding image appears in the sticky left panel.
 * Each service includes title, description, items list, and CTA. Perfect for detailed service presentations
 * with strong visual support that changes contextually.
 *
 * @example
 * ```tsx
 * <ServicesListStickyImage
 *   heading="Our Services"
 *   description="Comprehensive digital solutions."
 *   services={[{ title: "Web Dev", description: "Custom websites", image: { src: "/img.jpg", alt: "Web" } }]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function ServicesListStickyImage({
  heading,
  description,
  services,
  servicesSlot,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  gridClassName,
  cardClassName,
  imageContainerClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: ServicesListStickyImageProps): React.JSX.Element {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const renderServices = () => {
    if (servicesSlot) return servicesSlot;
    if (!services || services.length === 0) return null;

    return (
      <div className="space-y-8">
        {services.map((service, index) => (
          <div
            key={index}
            className={cn(
              "rounded-xl border p-6 transition-all cursor-pointer",
              activeIndex === index
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border hover:border-primary/50",
              cardClassName,
              service.className,
            )}
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
          >
            {service.image && (
              <div className="mb-4 lg:hidden">
                <Img
                  src={service.image.src}
                  alt={service.image.alt}
                  className="aspect-video w-full rounded-lg object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            )}
            {service.title &&
              (typeof service.title === "string" ? (
                <h3 className="text-xl font-bold">{service.title}</h3>
              ) : (
                <div className="text-xl font-bold">{service.title}</div>
              ))}
            {service.description &&
              (typeof service.description === "string" ? (
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              ) : (
                <div className="mt-3 text-muted-foreground leading-relaxed">
                  {service.description}
                </div>
              ))}
            {service.items && service.items.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-2">
                {service.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-2">
                    <DynamicIcon
                      name="lucide/check"
                      className="h-4 w-4 text-primary"
                    />
                    {typeof item === "string" ? (
                      <span className="text-sm">{item}</span>
                    ) : (
                      <div className="text-sm">{item}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {service.ctaText && (
              <Pressable
                href={service.ctaUrl}
                onClick={service.ctaOnClick}
                className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
              >
                {service.ctaText}
                <DynamicIcon
                  name="lucide/arrow-right"
                  className="ml-1 h-4 w-4"
                />
              </Pressable>
            )}
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
      <div className={cn("mx-auto max-w-6xl space-y-12", containerClassName)}>
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

        <div
          className={cn("grid gap-12 lg:grid-cols-2 lg:gap-16", gridClassName)}
        >
          <div className="hidden lg:block">
            <div className={cn("sticky top-32", imageContainerClassName)}>
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
                {services?.map(
                  (service, index) =>
                    service.image && (
                      <Img
                        key={index}
                        src={service.image.src}
                        alt={service.image.alt}
                        className={cn(
                          "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                          activeIndex === index ? "opacity-100" : "opacity-0",
                        )}
                        optixFlowConfig={optixFlowConfig}
                      />
                    ),
                )}
              </div>
            </div>
          </div>
          {renderServices()}
        </div>
      </div>
    </Section>
  );
}
