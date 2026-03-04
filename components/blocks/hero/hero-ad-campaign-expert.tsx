"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { AspectRatio } from "../../ui/aspect-ratio";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  DirectionConfig,
  MediaItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { ContentGroup, ContentGroupItem } from "@/components/ui/content-group";
import { BlockActions } from "@/components/ui/block-actions";
import { useResponsiveLayout } from "@/src";

export type { DirectionConfig };

type MediaAspectRatio = "square" | "horizontal" | "vertical";

const ASPECT_RATIOS: Record<MediaAspectRatio, number> = {
  square: 1,
  horizontal: 16 / 9,
  vertical: 355 / 520,
};

export interface HeroAdCampaignExpertProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
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
   * Media item configuration for image and/or video rendering.
   * Replaces individual imageSrc/imageAlt/imageClassName props.
   */
  mediaItem?: MediaItem;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the content column
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Media aspect ratios for desktop and mobile breakpoints
   * @default { desktop: "vertical", mobile: "vertical" }
   */
  mediaAspectRatios?: {
    desktop: MediaAspectRatio;
    mobile: MediaAspectRatio;
  };
  /**
   * Direction configuration for desktop and mobile layouts
   * @default { desktop: 'mediaRight', mobile: 'mediaTop' }
   */
  directionConfig?: DirectionConfig;
}

export function HeroAdCampaignExpert({
  heading,
  description,
  actions,
  actionsSlot,
  actionsClassName,
  mediaItem,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "hero",
  mediaAspectRatios = { desktop: "vertical", mobile: "vertical" },
  directionConfig = { desktop: "mediaRight", mobile: "mediaTop" },
  pattern,
  patternOpacity,
  className,
  contentClassName,
  headingClassName,
  descriptionClassName,
  optixFlowConfig,
}: HeroAdCampaignExpertProps): React.JSX.Element {
  const { responsiveClassName } = useResponsiveLayout({ directionConfig });

  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <BlockActions
        actions={actions}
        actionsSlot={actionsSlot}
        actionsClassName={cn("mt-4 md:mt-4", actionsClassName)}
      />
    );
  }, [actionsSlot, actions, actionsClassName]);

  const headerItems = useMemo(() => {
    const items: ContentGroupItem[] = [];

    if (heading) {
      if (typeof heading === "string") {
        items.push({
          _type: "text",
          as: "h1",
          className: cn(
            "text-3xl leading-tight font-bold tracking-tighter lg:text-5xl text-balance",
            headingClassName,
          ),
          children: heading,
        });
      } else {
        items.push(heading);
      }
    }

    if (description) {
      if (typeof description === "string") {
        items.push({
          _type: "text",
          as: "p",
          className: cn("text-lg text-balance", descriptionClassName),
          children: description,
        });
      } else {
        items.push(description);
      }
    }

    if (renderActions) {
      items.push({
        _type: "text",
        as: "div",
        children: renderActions,
      });
    }

    return items;
  }, [
    heading,
    headingClassName,
    description,
    descriptionClassName,
    renderActions,
  ]);

  const hasMedia = mediaItem?.image || mediaItem?.video;

  const renderMedia = useMemo(() => {
    if (!mediaItem) return null;

    const { image, video } = mediaItem;

    // Video takes priority when provided
    if (video) {
      const { src, className: videoClassName, ...videoRest } = video;
      return (
        <video
          src={src}
          className={cn("size-full object-cover", videoClassName)}
          {...videoRest}
        />
      );
    }

    if (image) {
      const { src, alt, className: imgClassName, ...imgRest } = image;
      return (
        <Img
          src={src as string}
          alt={alt}
          className={cn("size-full object-cover", imgClassName)}
          optixFlowConfig={optixFlowConfig}
          {...imgRest}
        />
      );
    }

    return null;
  }, [mediaItem, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div
          className={cn(
            "flex items-center gap-12 md:gap-16 lg:gap-24",
            responsiveClassName,
          )}
        >
          <ContentGroup
            items={headerItems}
            className={cn(
              "relative flex flex-col items-start gap-4 w-full lg:w-1/2",
              contentClassName,
            )}
          />

          {hasMedia && (
            <div className={cn("relative flex w-full justify-center lg:w-1/2")}>
              {/* Mobile aspect ratio - uses AspectRatio component */}
              <div className="relative h-auto w-[80%] max-w-[355px] lg:hidden">
                <AspectRatio
                  ratio={ASPECT_RATIOS[mediaAspectRatios.mobile]}
                  className={cn(
                    "rounded-xl shadow-2xl overflow-hidden",
                    mediaItem?.containerClassName,
                  )}
                >
                  {renderMedia}
                </AspectRatio>
              </div>
              {/* Desktop aspect ratio - uses native CSS aspect-ratio with max-height constraint */}
              <div
                className="hidden lg:block max-h-[70dvh] w-auto"
                style={{
                  aspectRatio: ASPECT_RATIOS[mediaAspectRatios.desktop],
                }}
              >
                <div
                  className={cn(
                    "size-full rounded-xl shadow-2xl overflow-hidden",
                    mediaItem?.containerClassName,
                  )}
                >
                  {renderMedia}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
