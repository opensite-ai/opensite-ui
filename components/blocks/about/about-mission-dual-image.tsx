"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { ActionConfig, OptixFlowConfig, SectionBackground, SectionSpacing } from "../../../src/types";

export interface AboutMissionDualImageProps {
  /**
   * Mission section title
   */
  missionTitle?: React.ReactNode;
  /**
   * Mission section content
   */
  missionContent?: React.ReactNode;
  /**
   * Vision section title
   */
  visionTitle?: React.ReactNode;
  /**
   * Vision section content
   */
  visionContent?: React.ReactNode;
  /**
   * Primary image configuration
   */
  primaryImage?: {
    src: string;
    alt: string;
  };
  /**
   * Secondary image configuration
   */
  secondaryImage?: {
    src: string;
    alt: string;
  };
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the mission title
   */
  missionTitleClassName?: string;
  /**
   * Additional CSS classes for the mission content
   */
  missionContentClassName?: string;
  /**
   * Additional CSS classes for the vision title
   */
  visionTitleClassName?: string;
  /**
   * Additional CSS classes for the vision content
   */
  visionContentClassName?: string;
  /**
   * Additional CSS classes for the primary image
   */
  primaryImageClassName?: string;
  /**
   * Additional CSS classes for the secondary image
   */
  secondaryImageClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * OptixFlow image optimization configuration
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
}

export function AboutMissionDualImage({
  missionTitle,
  missionContent,
  visionTitle,
  visionContent,
  primaryImage,
  secondaryImage,
  actions,
  actionsSlot,
  className,
  containerClassName,
  contentClassName,
  missionTitleClassName,
  missionContentClassName,
  visionTitleClassName,
  visionContentClassName,
  primaryImageClassName,
  secondaryImageClassName,
  actionsClassName,
  optixFlowConfig,
  background,
  spacing,
  pattern,
  patternOpacity,
}: AboutMissionDualImageProps): React.JSX.Element {
  const actionsContent = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
      const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
      return (
        <Pressable
          key={index}
          asButton
          className={cn("w-fit", actionClassName)}
          {...pressableProps}
        >
          {children ?? (
            <>
              {icon}
              {label}
              {iconAfter}
            </>
          )}
        </Pressable>
      );
    });
  }, [actionsSlot, actions]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
      containerClassName={containerClassName}
    >
        <div className={cn("grid gap-16 lg:grid-cols-2", contentClassName)}>
          <div className="flex flex-col justify-center">
            <div className="mb-12">
              {missionTitle && (
                typeof missionTitle === "string" ? (
                  <h2 className={cn("text-3xl font-bold tracking-tight md:text-4xl", missionTitleClassName)}>
                    {missionTitle}
                  </h2>
                ) : (
                  <div className={missionTitleClassName}>{missionTitle}</div>
                )
              )}
              {missionContent && (
                typeof missionContent === "string" ? (
                  <p className={cn("mt-4 text-lg text-muted-foreground", missionContentClassName)}>
                    {missionContent}
                  </p>
                ) : (
                  <div className={cn("mt-4", missionContentClassName)}>{missionContent}</div>
                )
              )}
            </div>
            <div>
              {visionTitle && (
                typeof visionTitle === "string" ? (
                  <h2 className={cn("text-3xl font-bold tracking-tight md:text-4xl", visionTitleClassName)}>
                    {visionTitle}
                  </h2>
                ) : (
                  <div className={visionTitleClassName}>{visionTitle}</div>
                )
              )}
              {visionContent && (
                typeof visionContent === "string" ? (
                  <p className={cn("mt-4 text-lg text-muted-foreground", visionContentClassName)}>
                    {visionContent}
                  </p>
                ) : (
                  <div className={cn("mt-4", visionContentClassName)}>{visionContent}</div>
                )
              )}
            </div>
            {(actionsSlot || (actions && actions.length > 0)) && (
              <div className={cn("mt-8 flex flex-wrap gap-4", actionsClassName)}>
                {actionsContent}
              </div>
            )}
          </div>

          <div className="relative grid grid-cols-2 gap-4">
            {primaryImage && (
              <Img
                src={primaryImage.src}
                alt={primaryImage.alt}
                className={cn("h-full rounded-2xl object-cover", primaryImageClassName)}
                optixFlowConfig={optixFlowConfig}
              />
            )}
            {secondaryImage && (
              <Img
                src={secondaryImage.src}
                alt={secondaryImage.alt}
                className={cn("mt-12 h-full rounded-2xl object-cover", secondaryImageClassName)}
                optixFlowConfig={optixFlowConfig}
              />
            )}
          </div>
        </div>
    </Section>
  );
}
