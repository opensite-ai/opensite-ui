"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import type { OptixFlowConfig } from "../../../src/types";

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
}

const defaultIntegrations: FeatureIntegrationCardsItem[] = [
  {
    icon: blockBrandedIconsAndPlaceholders.integration1,
    title: "Task Tracker",
    description: "Keep tabs on all your tasks effortlessly.",
    link: "#",
    linkLabel: "Visit Website",
  },
  {
    icon: blockBrandedIconsAndPlaceholders.integration2,
    title: "Team Chat",
    description: "Message teams with the click of a button.",
    link: "#",
    linkLabel: "Visit Website",
  },
  {
    icon: blockBrandedIconsAndPlaceholders.integration3,
    title: "Project Planner",
    description: "Plan projects from milestones to completion.",
    link: "#",
    linkLabel: "Visit Website",
  },
  {
    icon: blockBrandedIconsAndPlaceholders.integration4,
    title: "Board View",
    description: "View tasks in a board for easy tracking.",
    link: "#",
    linkLabel: "Visit Website",
  },
];

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
  title = "Integrations",
  description = "Connect with your favorite tools and services to streamline your workflow.",
  integrations = defaultIntegrations,
  integrationsSlot,
  className,
  containerClassName,
  headerClassName,
  titleClassName,
  descriptionClassName,
  gridClassName,
  cardClassName,
  optixFlowConfig,
}: FeatureIntegrationCardsProps): React.JSX.Element {
  const renderIntegrationIcon = (integration: FeatureIntegrationCardsItem) => {
    if (integration.iconSlot) return integration.iconSlot;
    if (integration.icon) {
      return (
        <Img
          src={integration.icon}
          alt={integration.iconAlt || (typeof integration.title === "string" ? integration.title : "Integration icon")}
          className={cn("h-auto w-7", integration.iconClassName)}
          loading="lazy"
          optixFlowConfig={optixFlowConfig}
        />
      );
    }
    return null;
  };

  const renderLinkLabel = (integration: FeatureIntegrationCardsItem) => {
    if (integration.linkLabelSlot) return integration.linkLabelSlot;
    return (
      <span className={cn("flex items-center gap-1 rounded-full border px-3 py-2.5 text-sm", integration.linkLabelClassName)}>
        {integration.linkLabel || "Visit Website"}
        <DynamicIcon name="lucide/arrow-right" size={16} />
      </span>
    );
  };

  const renderIntegrations = () => {
    if (integrationsSlot) return integrationsSlot;
    if (!integrations || integrations.length === 0) return null;

    return integrations.map((integration, index) => {
      const cardContent = (
        <>
          <div className="flex items-center justify-between">
            <span className="grid size-12 shrink-0 place-content-center rounded-md border">
              {renderIntegrationIcon(integration)}
            </span>
            {renderLinkLabel(integration)}
          </div>
          <div>
            {integration.title && (
              typeof integration.title === "string" ? (
                <h3 className={cn("font-medium md:text-lg", integration.titleClassName)}>{integration.title}</h3>
              ) : (
                <div className={cn("font-medium md:text-lg", integration.titleClassName)}>{integration.title}</div>
              )
            )}
            {integration.description && (
              typeof integration.description === "string" ? (
                <p className={cn("text-sm text-muted-foreground md:text-base", integration.descriptionClassName)}>
                  {integration.description}
                </p>
              ) : (
                <div className={cn("text-sm text-muted-foreground md:text-base", integration.descriptionClassName)}>
                  {integration.description}
                </div>
              )
            )}
          </div>
        </>
      );

      if (integration.link) {
        return (
          <Pressable
            key={index}
            href={integration.link}
            className={cn("flex flex-col gap-4 rounded-xl border p-6 transition-colors duration-300 hover:bg-muted/60", cardClassName, integration.className)}
          >
            {cardContent}
          </Pressable>
        );
      }

      return (
        <div
          key={index}
          className={cn("flex flex-col gap-4 rounded-xl border p-6 transition-colors duration-300 hover:bg-muted/60", cardClassName, integration.className)}
        >
          {cardContent}
        </div>
      );
    });
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className={cn("mx-auto mb-12 flex max-w-3xl flex-col items-center gap-4 text-center", headerClassName)}>
          {title && (
            typeof title === "string" ? (
              <h2 className={cn("text-3xl font-semibold md:text-4xl", titleClassName)}>{title}</h2>
            ) : (
              <div className={cn("text-3xl font-semibold md:text-4xl", titleClassName)}>{title}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("text-muted-foreground", descriptionClassName)}>{description}</p>
            ) : (
              <div className={cn("text-muted-foreground", descriptionClassName)}>{description}</div>
            )
          )}
        </div>
        <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-4", gridClassName)}>
          {renderIntegrations()}
        </div>
      </div>
    </section>
  );
}
