"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  FeatureItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { BlockActions } from "@/components/ui/block-actions";

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
  /**
   * Section background variant
   */
  background?: SectionBackground;
  /**
   * Section spacing variant
   */
  spacing?: SectionSpacing;
  /**
   * Pattern background key or URL
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern opacity (0-1)
   */
  patternOpacity?: number;
  /** Optional Section ID */
  sectionId?: string;
}

export function AboutStreamlineTeam({
  sectionId = "about-streamline-team",
  className,
  title,
  titleClassName,
  description,
  descriptionClassName,
  primaryImage,
  primaryImageClassName,
  secondaryImage,
  secondaryImageClassName,
  teamTitle,
  teamTitleClassName,
  teamDescription,
  teamDescriptionClassName,
  actions,
  actionsSlot,
  actionsClassName,
  features,
  featuresSlot,
  featuresClassName,
  teamSectionClassName,
  optixFlowConfig,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  pattern,
  patternOpacity,
}: AboutStreamlineTeamProps): React.JSX.Element {
  const featuresContent = useMemo(() => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return (
      <div className={cn("mt-10 space-y-6", featuresClassName)}>
        {features.map((feature, idx) => (
          <div key={idx} className="flex gap-4">
            <div
              className={cn(
                "flex  shrink-0 items-center justify-center",
                "size-12 rounded-lg",
                "bg-primary text-primary-foreground",
                feature.iconBgClass,
              )}
            >
              {feature.icon}
            </div>
            <div>
              {feature.title &&
                (typeof feature.title === "string" ? (
                  <h3 className="font-semibold">{feature.title}</h3>
                ) : (
                  feature.title
                ))}
              {feature.description &&
                (typeof feature.description === "string" ? (
                  <p className="text-sm">{feature.description}</p>
                ) : (
                  feature.description
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  }, [featuresSlot, features, featuresClassName, background]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          {primaryImage && (
            <Img
              src={primaryImage.src}
              alt={primaryImage.alt}
              className={cn(
                "rounded-2xl object-cover w-auto h-full",
                primaryImageClassName,
              )}
              optixFlowConfig={optixFlowConfig}
            />
          )}
          {secondaryImage && (
            <Img
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              className={cn(
                "size-24 md:size-48",
                "rounded-xl object-cover shadow-lg",
                "border-4 border-background",
                "absolute -bottom-8 -right-2 md:-right-8",
                secondaryImageClassName,
              )}
              optixFlowConfig={optixFlowConfig}
            />
          )}
        </div>
        <div className="pl-0 md:pl-8 lg:pl-16">
          {title &&
            (typeof title === "string" ? (
              <h1
                className={cn(
                  "text-4xl font-bold tracking-tight md:text-5xl",
                  titleClassName,
                )}
              >
                {title}
              </h1>
            ) : (
              title
            ))}
          {description &&
            (typeof description === "string" ? (
              <p className={cn("mt-6 text-lg", descriptionClassName)}>
                {description}
              </p>
            ) : (
              description
            ))}
          {featuresContent}
        </div>
      </div>

      <div
        className={cn(
          "mt-10 md:mt-24 p-6 md:p-16",
          "bg-muted text-muted-foreground",
          "rounded-2xl shadow-lg",
          teamSectionClassName,
        )}
      >
        <div
          className={cn(
            "flex flex-col md:flex-row",
            "justify-center md:justify-between items-center md:items-start",
            "gap-4 md:gap-24",
          )}
        >
          <div className="flex flex-col gap-4 md:gap-8 text-center md:text-left">
            {teamTitle &&
              (typeof teamTitle === "string" ? (
                <h2
                  className={cn(
                    "text-3xl font-bold md:text-4xl text-balance",
                    teamTitleClassName,
                  )}
                >
                  {teamTitle}
                </h2>
              ) : (
                teamTitle
              ))}
            {teamDescription &&
              (typeof teamDescription === "string" ? (
                <p
                  className={cn(
                    "text-lg text-balance",
                    teamDescriptionClassName,
                  )}
                >
                  {teamDescription}
                </p>
              ) : (
                teamDescription
              ))}
          </div>

          <BlockActions
            actions={actions}
            actionsSlot={actionsSlot}
            actionsClassName={actionsClassName}
            verticalSpacing="mt-4 md:mt-0"
          />
        </div>
      </div>
    </Section>
  );
}
