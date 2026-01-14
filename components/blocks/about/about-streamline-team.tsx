"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type { ActionConfig, FeatureItem, OptixFlowConfig } from "../../../src/types";

export interface AboutStreamlineTeamProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Main title
   */
  title?: React.ReactNode;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Main description
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Primary image configuration
   */
  primaryImage?: {
    src: string;
    alt: string;
  };
  /**
   * Additional CSS classes for the primary image
   */
  primaryImageClassName?: string;
  /**
   * Secondary image configuration
   */
  secondaryImage?: {
    src: string;
    alt: string;
  };
  /**
   * Additional CSS classes for the secondary image
   */
  secondaryImageClassName?: string;
  /**
   * Team section title
   */
  teamTitle?: React.ReactNode;
  /**
   * Additional CSS classes for the team title
   */
  teamTitleClassName?: string;
  /**
   * Team section description
   */
  teamDescription?: React.ReactNode;
  /**
   * Additional CSS classes for the team description
   */
  teamDescriptionClassName?: string;
  /**
   * Array of action configurations for team CTA
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Array of feature items
   */
  features?: FeatureItem[];
  /**
   * Custom slot for rendering features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the features container
   */
  featuresClassName?: string;
  /**
   * Additional CSS classes for the team section
   */
  teamSectionClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function AboutStreamlineTeam({
  className,
  containerClassName,
  title,
  titleClassName,
  description,
  descriptionClassName,
  primaryImage,
  primaryImageClassName,
  secondaryImage,
  secondaryImageClassName,
  teamTitle = "Meet Our Team",
  teamTitleClassName,
  teamDescription = "We're a diverse group of thinkers, builders, and dreamers united by a common goal: making software development accessible to everyone.",
  teamDescriptionClassName,
  actions,
  actionsSlot,
  actionsClassName,
  features,
  featuresSlot,
  featuresClassName,
  teamSectionClassName,
  optixFlowConfig,
}: AboutStreamlineTeamProps): React.JSX.Element {
  const renderFeatures = () => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return (
      <div className={cn("mt-10 space-y-6", featuresClassName)}>
        {features.map((feature, idx) => (
          <div key={idx} className="flex gap-4">
            <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10", feature.iconBgClass)}>
              {feature.icon}
            </div>
            <div>
              {feature.title && (
                typeof feature.title === "string" ? (
                  <h3 className="font-semibold">{feature.title}</h3>
                ) : (
                  feature.title
                )
              )}
              {feature.description && (
                typeof feature.description === "string" ? (
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                ) : (
                  feature.description
                )
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className={cn("mt-8", actionsClassName)}>
        {actions.map((action, idx) => (
          <Pressable
            key={idx}
            href={action.href}
            onClick={action.onClick}
            size={action.size || "lg"}
            variant={action.variant || "default"}
            asButton
          >
            {action.label}
            <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
          </Pressable>
        ))}
      </div>
    );
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            {primaryImage && (
              <Img
                src={primaryImage.src}
                alt={primaryImage.alt}
                className={cn("rounded-2xl object-cover", primaryImageClassName)}
                optixFlowConfig={optixFlowConfig}
              />
            )}
            {secondaryImage && (
              <Img
                src={secondaryImage.src}
                alt={secondaryImage.alt}
                className={cn("absolute -bottom-8 -right-8 h-48 w-48 rounded-xl border-4 border-background object-cover shadow-lg", secondaryImageClassName)}
                optixFlowConfig={optixFlowConfig}
              />
            )}
          </div>
          <div>
            {title && (
              typeof title === "string" ? (
                <h1 className={cn("text-4xl font-bold tracking-tight md:text-5xl", titleClassName)}>
                  {title}
                </h1>
              ) : (
                <div className={titleClassName}>{title}</div>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("mt-6 text-lg text-muted-foreground", descriptionClassName)}>{description}</p>
              ) : (
                <div className={cn("mt-6", descriptionClassName)}>{description}</div>
              )
            )}
            {renderFeatures()}
          </div>
        </div>

        <div className={cn("mt-32 rounded-2xl bg-muted p-8 md:p-16", teamSectionClassName)}>
          <div className="mx-auto max-w-2xl text-center">
            {teamTitle && (
              typeof teamTitle === "string" ? (
                <h2 className={cn("text-3xl font-bold md:text-4xl", teamTitleClassName)}>{teamTitle}</h2>
              ) : (
                <div className={teamTitleClassName}>{teamTitle}</div>
              )
            )}
            {teamDescription && (
              typeof teamDescription === "string" ? (
                <p className={cn("mt-4 text-lg text-muted-foreground", teamDescriptionClassName)}>
                  {teamDescription}
                </p>
              ) : (
                <div className={cn("mt-4", teamDescriptionClassName)}>{teamDescription}</div>
              )
            )}
            {renderActions()}
          </div>
        </div>
      </div>
    </section>
  );
}
