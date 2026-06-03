"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface FeatureIntegrationCardsItem {
  /**
   * Integration icon/logo URL
   */
  icon?: string;
  /**
   * Icon alt text
   */
  iconAlt?: string;
  /**
   * Custom icon slot (overrides icon)
   */
  iconSlot?: React.ReactNode;
  /**
   * Integration title content
   */
  title?: React.ReactNode;
  /**
   * Integration description content
   */
  description?: React.ReactNode;
  /**
   * Link URL
   */
  link?: string;
  /**
   * Link label content
   */
  linkLabel?: React.ReactNode;
  /**
   * Custom link label slot (overrides linkLabel)
   */
  linkLabelSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the item
   */
  className?: string;
  /**
   * Additional CSS classes for the icon
   */
  iconClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the link label
   */
  linkLabelClassName?: string;
}

export interface FeatureIntegrationCardsProps {
  /**
   * Main heading content
   */
  title?: React.ReactNode;
  /**
   * Supporting description content
   */
  description?: React.ReactNode;
  /**
   * Array of integration items
   */
  integrations?: FeatureIntegrationCardsItem[];
  /**
   * Custom slot for rendering integrations (overrides integrations array)
   */
  integrationsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
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
   * Additional CSS classes for the title
   */
  titleClassName?: string;
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
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
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
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * Feature Integration Cards - Grid of integration cards with icons, descriptions,
 * and visit website links.
 *
 * Layout: Centered header with four-column grid of bordered cards.
 * Key features: Icon badges, visit website buttons, hover effects, responsive grid.
 * Best for: Integration showcases, app directories, partner listings.
 *
 * @example
 * ```tsx
 * <FeatureIntegrationCards
 *   title="Integrations"
 *   description="Connect with your favorite tools."
 *   integrations={[
 *     { icon: "/slack.png", title: "Slack", description: "Team messaging", link: "/integrations/slack" },
 *   ]}
 * />
 * ```
 */
export function FeatureIntegrationCards({
  sectionId = "feature-integration-cards",
  title,
  description,
  integrations,
  integrationsSlot,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  headerClassName,
  titleClassName,
  descriptionClassName,
  gridClassName,
  cardClassName,
  optixFlowConfig,
  background,
  spacing = "py-12 md:py-32",
  pattern,
  patternOpacity,
  patternClassName,
}: FeatureIntegrationCardsProps): React.JSX.Element {
  const renderIntegrationIcon = useCallback(
    (integration: FeatureIntegrationCardsItem) => {
      if (integration.iconSlot) return integration.iconSlot;
      if (!integration.icon) return null;

      return (
        <div className="flex shrink-0 items-center justify-start">
          <Img
            src={integration.icon}
            alt={
              integration.iconAlt ||
              (typeof integration.title === "string"
                ? integration.title
                : "Integration icon")
            }
            className={cn(
              "h-12 w-auto object-contain",
              integration.iconClassName,
            )}
            loading="eager"
            // @ts-ignore
            optixFlowConfig={
              optixFlowConfig
                ? {
                    ...optixFlowConfig,
                    objectFit: "contain",
                  }
                : {
                    objectFit: "contain",
                  }
            }
          />
        </div>
      );
    },
    [optixFlowConfig],
  );

  const integrationsContent = useMemo(() => {
    if (integrationsSlot) return integrationsSlot;
    if (!integrations || integrations.length === 0) return null;

    return integrations.map((integration, index) => {
      const iconContent = renderIntegrationIcon(integration);

      const cardContent = (
        <>
          <div className="flex items-start gap-2 justify-between">
            {iconContent && <div className={cn("flex")}>{iconContent}</div>}
          </div>
          <div className="space-y-1">
            {integration.title &&
              (typeof integration.title === "string" ? (
                <h3
                  className={cn(
                    "font-semibold md:text-lg",
                    integration.titleClassName,
                  )}
                >
                  {integration.title}
                </h3>
              ) : (
                integration.title
              ))}
            {integration.description &&
              (typeof integration.description === "string" ? (
                <p
                  className={cn(
                    "text-sm leading-relaxed md:text-base",
                    integration.descriptionClassName,
                  )}
                >
                  {integration.description}
                </p>
              ) : (
                <div
                  className={cn(
                    "text-sm leading-relaxed md:text-base",
                    integration.descriptionClassName,
                  )}
                >
                  {integration.description}
                </div>
              ))}
          </div>
        </>
      );

      const cardClasses = cn(
        "flex flex-col gap-5 rounded-xl border p-6 transition-all duration-300 bg-card text-card-foreground",
        "hover:shadow-lg",
        cardClassName,
        integration.className,
      );

      if (integration.link) {
        return (
          <Pressable
            key={index}
            href={integration.link}
            className={cardClasses}
          >
            {cardContent}
          </Pressable>
        );
      }

      return (
        <div key={index} className={cardClasses}>
          {cardContent}
        </div>
      );
    });
  }, [integrationsSlot, integrations, cardClassName, renderIntegrationIcon]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName={containerClassName}
    >
      <div
        className={cn(
          "mx-auto mb-12 flex max-w-3xl flex-col items-center gap-4 text-center",
          headerClassName,
        )}
      >
        {title &&
          (typeof title === "string" ? (
            <h2
              className={cn(
                "text-3xl font-semibold md:text-4xl",
                titleClassName,
              )}
            >
              {title}
            </h2>
          ) : (
            <div
              className={cn(
                "text-3xl font-semibold md:text-4xl",
                titleClassName,
              )}
            >
              {title}
            </div>
          ))}
        {description &&
          (typeof description === "string" ? (
            <p className={cn(descriptionClassName)}>{description}</p>
          ) : (
            <div className={cn(descriptionClassName)}>{description}</div>
          ))}
      </div>
      <div
        className={cn(
          "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
          gridClassName,
        )}
      >
        {integrationsContent}
      </div>
    </Section>
  );
}
