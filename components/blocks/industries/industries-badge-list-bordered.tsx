"use client";

import * as React from "react";
import { useMemo } from "react";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";

export interface IndustryService {
  /**
   * Service title
   */
  title: React.ReactNode;
  /**
   * Service description
   */
  description: React.ReactNode;
  /**
   * Image source URL
   */
  imageSrc: string;
  /**
   * Alt text for the image
   */
  imageAlt: string;
  /**
   * Additional CSS classes for the service item
   */
  className?: string;
}

export interface IndustriesBadgeListBorderedProps {
  /**
   * Badge content displayed above the heading
   */
  badge?: React.ReactNode;
  /**
   * Custom slot for badge (overrides badge prop)
   */
  badgeSlot?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Custom slot for heading (overrides heading prop)
   */
  headingSlot?: React.ReactNode;
  /**
   * Array of industry services to display
   */
  services?: IndustryService[];
  /**
   * Custom slot for services (overrides services array)
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
   * Additional CSS classes for the header wrapper
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the services container
   */
  servicesClassName?: string;
  /**
   * Additional CSS classes for individual service items
   */
  itemClassName?: string;
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
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * IndustriesBadgeListBordered displays a professional industries listing with badge header and bordered rows.
 *
 * Features a badge label above a bold heading, followed by a list of industry services in bordered rows.
 * Each row uses a 12-column grid layout with icon, title, and description that reorders responsively
 * on mobile. Ideal for showcasing service offerings, industry expertise, or capability listings
 * in a clean, scannable format.
 *
 * @example
 * ```tsx
 * <IndustriesBadgeListBordered
 *   badge="Industries"
 *   heading="Transforming industries through innovative technology solutions"
 *   services={[
 *     {
 *       title: "Mining",
 *       description: "Empowering mining operations with advanced automation...",
 *       imageSrc: "/mining-icon.png",
 *       imageAlt: "Mining industry icon"
 *     }
 *   ]}
 * />
 * ```
 */
export function IndustriesBadgeListBordered({
  badge,
  badgeSlot,
  heading,
  headingSlot,
  services,
  servicesSlot,
  className,
  containerClassName,
  headerClassName,
  badgeClassName,
  headingClassName,
  servicesClassName,
  itemClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
  optixFlowConfig,
}: IndustriesBadgeListBorderedProps): React.JSX.Element {
  const renderBadge = useMemo(() => {
    if (badgeSlot) return badgeSlot;
    if (!badge) return null;

    return typeof badge === "string" ? (
      <Badge
        variant="outline"
        className={cn(
          "mb-4 rounded-none border-0 bg-muted p-2 text-primary uppercase",
          badgeClassName,
        )}
      >
        {badge}
      </Badge>
    ) : (
      <div className={badgeClassName}>{badge}</div>
    );
  }, [badgeSlot, badge, badgeClassName]);

  const renderHeading = useMemo(() => {
    if (headingSlot) return headingSlot;
    if (!heading) return null;

    return typeof heading === "string" ? (
      <h2
        className={cn(
          "max-w-2xl text-3xl leading-tight font-bold text-balance lg:text-4xl",
          headingClassName,
        )}
      >
        {heading}
      </h2>
    ) : (
      <div className={headingClassName}>{heading}</div>
    );
  }, [headingSlot, heading, headingClassName]);

  const renderServices = useMemo(() => {
    if (servicesSlot) return servicesSlot;
    if (!services || services.length === 0) return null;

    return (
      <div className={cn("space-y-8", servicesClassName)}>
        {services.map((service, index) => (
          <div
            key={index}
            className={cn(
              "border-b border-border pb-8 first:border-t first:pt-8 last:border-b-0",
              itemClassName,
              service.className,
            )}
          >
            <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-12 md:items-center md:gap-8">
              <div className="order-2 md:order-0 md:col-span-4">
                <h3 className="text-lg font-semibold text-foreground md:text-xl">
                  {service.title}
                </h3>
              </div>
              <div className="order-1 md:order-0 md:col-span-2 md:flex md:justify-center">
                <Img
                  src={service.imageSrc}
                  alt={service.imageAlt}
                  className="h-12 w-12 object-contain md:h-16 md:w-16"
                  loading="lazy"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
              <div className="order-3 md:order-0 md:col-span-6">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }, [servicesSlot, services, servicesClassName, itemClassName, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
    >
      <div className={containerClassName}>
        {(badgeSlot || badge || headingSlot || heading) && (
          <div className={cn("mb-16", headerClassName)}>
            {renderBadge}
            {renderHeading}
          </div>
        )}
        {renderServices}
      </div>
    </Section>
  );
}
