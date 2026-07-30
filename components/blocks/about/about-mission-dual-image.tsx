"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  MediaItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { BlockActions } from "@/components/ui/block-actions";
import { MediaAspectRatio } from "../../ui/media-aspect-ratio";
import type { ResponsiveMediaAspectRatioProps } from "../../ui/media-aspect-ratio";

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
   * Dynamic media configuration for an image or video.
   * Video takes priority when both are provided.
   */
  mediaItem?: MediaItem;
  /**
   * Media aspect ratios for desktop and mobile breakpoints.
   * @default { desktop: "square", mobile: "horizontal" }
   */
  mediaAspectRatios?: ResponsiveMediaAspectRatioProps;
  /**
   * Primary image configuration.
   * @deprecated Use `mediaItem` instead.
   */
  primaryImage?: {
    src: string;
    alt: string;
  };
  /**
   * Secondary image configuration.
   * @deprecated Use `mediaItem` instead. This is only used when `mediaItem`
   * and `primaryImage` are not supplied.
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
   * Additional CSS classes for the primary image.
   * @deprecated Set `mediaItem.image.className` instead.
   */
  primaryImageClassName?: string;
  /**
   * Additional CSS classes for the secondary image.
   * @deprecated Set `mediaItem.image.className` instead.
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
  /** Optional Section ID */
  sectionId?: string;
}

export function AboutMissionDualImage({
  sectionId = "about-mission-dual-image",
  missionTitle,
  missionContent,
  visionTitle,
  visionContent,
  mediaItem,
  mediaAspectRatios = { desktop: "square", mobile: "horizontal" },
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
  spacing = "xl",
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
        <div className="flex flex-col items-start gap-2 md:gap-4">
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
              <p className={cn("text-base md:text-lg", secondaryClassname)}>
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

  const hasMediaItem = Boolean(mediaItem?.image?.src || mediaItem?.video?.src);
  const legacyPrimaryImage = primaryImage?.src ? primaryImage : undefined;
  const legacySecondaryImage = secondaryImage?.src ? secondaryImage : undefined;
  const legacyImage = legacyPrimaryImage ?? legacySecondaryImage;
  const resolvedMediaItem: MediaItem | undefined = hasMediaItem
    ? mediaItem
    : legacyImage
      ? { image: legacyImage }
      : undefined;
  const legacyImageClassName = hasMediaItem
    ? undefined
    : legacyPrimaryImage
      ? primaryImageClassName
      : secondaryImageClassName;

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
      <div
        className={cn(
          "grid items-center gap-8 md:gap-16 lg:grid-cols-2",
          contentClassName,
        )}
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

        <MediaAspectRatio
          breakpoint="lg"
          containerClassName="relative w-full"
          frameClassName="rounded-2xl shadow-xl"
          imageClassName={legacyImageClassName}
          mediaItem={resolvedMediaItem}
          optixFlowConfig={optixFlowConfig}
          deviceAspectRatios={mediaAspectRatios}
        />
      </div>
    </Section>
  );
}
