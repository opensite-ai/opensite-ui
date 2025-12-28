"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface FeatureIntegrationCardsItem {
  /**
   * Integration icon/logo URL
   */
  icon: string;
  /**
   * Integration title
   */
  title: string;
  /**
   * Integration description
   */
  description: string;
  /**
   * Link URL
   */
  link: string;
}

export interface FeatureIntegrationCardsProps {
  /**
   * Main heading text
   */
  title?: string;
  /**
   * Supporting description text
   */
  description?: string;
  /**
   * Array of integration items
   */
  integrations?: FeatureIntegrationCardsItem[];
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
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
  title = "Integrations",
  description = "Connect with your favorite tools and services to streamline your workflow.",
  integrations = [
    {
      icon: blockBrandedIconsAndPlaceholders.integration1,
      title: "Task Tracker",
      description: "Keep tabs on all your tasks effortlessly.",
      link: "#",
    },
    {
      icon: blockBrandedIconsAndPlaceholders.integration2,
      title: "Team Chat",
      description: "Message teams with the click of a button.",
      link: "#",
    },
    {
      icon: blockBrandedIconsAndPlaceholders.integration3,
      title: "Project Planner",
      description: "Plan projects from milestones to completion.",
      link: "#",
    },
    {
      icon: blockBrandedIconsAndPlaceholders.integration4,
      title: "Board View",
      description: "View tasks in a board for easy tracking.",
      link: "#",
    },
  ],
  className,
  optixFlowConfig,
}: FeatureIntegrationCardsProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center gap-4 text-center">
          {title && (
            <h2 className="text-3xl font-semibold md:text-4xl">{title}</h2>
          )}
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {integrations.map((integration, index) => (
            <Pressable
              key={index}
              href={integration.link}
              className="flex flex-col gap-4 rounded-xl border p-6 transition-colors duration-300 hover:bg-muted/60"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-12 shrink-0 place-content-center rounded-md border">
                  <Img
                    src={integration.icon}
                    alt={integration.title}
                    className="h-auto w-7"
                    loading="lazy"
                    optixFlowConfig={optixFlowConfig}
                  />
                </span>
                <span className="flex items-center gap-1 rounded-full border px-3 py-2.5 text-sm">
                  Visit Website
                  <DynamicIcon name="lucide/arrow-right" size={16} />
                </span>
              </div>
              <div>
                <h3 className="font-medium md:text-lg">{integration.title}</h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  {integration.description}
                </p>
              </div>
            </Pressable>
          ))}
        </div>
      </div>
    </section>
  );
}
