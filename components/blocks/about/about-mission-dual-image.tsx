"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { BlockActions } from "@/components/ui/block-actions";

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
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "lg",
  pattern,
  patternOpacity,
}: AboutMissionDualImageProps): React.JSX.Element {
  const renderTextContent = React.useCallback(
    (
      primaryHeading?: React.ReactNode,
      primaryClassName?: string,
      secondaryContent?: React.ReactNode,
      secondaryClassname?: string,
    ) => {
      if (!primaryHeading || !secondaryContent) {
        return null;
      }

      return (
        <div className="flex flex-col items-start gap-4 md:gap-6">
          {primaryHeading &&
            (typeof primaryHeading === "string" ? (
              <h2
                className={cn(
                  "text-3xl font-bold tracking-tight md:text-4xl",
                  primaryClassName,
                )}
              >
                {primaryHeading}
              </h2>
            ) : (
              primaryHeading
            ))}
          {secondaryContent &&
            (typeof secondaryContent === "string" ? (
              <p className={cn("mt-4 text-lg", secondaryClassname)}>
                {secondaryContent}
              </p>
            ) : (
              secondaryContent
            ))}
        </div>
      );
    },
    [],
  );

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div
        className={cn("grid gap-8 md:gap-16 lg:grid-cols-2", contentClassName)}
      >
        <div className="flex flex-col items-start gap-6 md:gap-8">
          {renderTextContent(
            missionTitle,
            missionTitleClassName,
            missionContent,
            missionContentClassName,
          )}
          {renderTextContent(
            visionTitle,
            visionTitleClassName,
            visionContent,
            visionContentClassName,
          )}

          <BlockActions
            actions={actions}
            actionsSlot={actionsSlot}
            actionsClassName={actionsClassName}
          />
        </div>

        <div className="relative flex flex-col gap-4 sm:grid sm:grid-cols-2">
          {primaryImage && (
            <Img
              src={primaryImage.src}
              alt={primaryImage.alt}
              className={cn(
                "w-full h-auto rounded-2xl object-cover sm:h-full shadow-xl",
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
                "w-full h-auto rounded-2xl object-cover sm:h-full sm:mt-12 shadow-xl",
                secondaryImageClassName,
              )}
              optixFlowConfig={optixFlowConfig}
            />
          )}
        </div>
      </div>
    </Section>
  );
}
