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
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { ContentGroup, ContentGroupItem } from "@/components/ui/content-group";
import { BlockActions } from "@/components/ui/block-actions";

export interface DirectionConfig {
  desktop: "mediaRight" | "mediaLeft";
  mobile: "mediaTop" | "mediaBottom";
}

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
   * Hero image source URL
   */
  imageSrc?: string;
  /**
   * Hero image alt text
   */
  imageAlt?: string;
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
   * Additional CSS classes for the image container
   */
  imageContainerClassName?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Media aspect ratios
   * @default { desktop: "vertical", mobile: "vertical" }
   */
  mediaAspectRatios?: {
    desktop: "square" | "horizontal" | "vertical";
    mobile: "square" | "horizontal" | "vertical";
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
  imageSrc,
  imageAlt,
  imageContainerClassName,
  imageClassName,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "pt-32 pb-8 md:pt-32 md:pb-32",
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
  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <BlockActions
        actions={actions}
        actionsSlot={actionsSlot}
        actionsClassName={actionsClassName}
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
        <div className="flex flex-col items-center lg:flex-row">
          <ContentGroup
            items={headerItems}
            className={cn(
              "relative flex flex-col items-start gap-8 pb-20 lg:w-1/2",
              contentClassName,
            )}
          />

          <div
            className={cn(
              "relative flex w-full justify-center lg:w-1/2",
              imageContainerClassName,
            )}
          >
            {imageSrc && (
              <div className="relative z-10 -mb-16 h-auto w-[80%] max-w-[355px] lg:w-[520px]">
                <AspectRatio
                  ratio={355 / 520}
                  className="border-muted border rounded-xl shadow-xl overflow-hidden"
                >
                  <Img
                    src={imageSrc}
                    alt={imageAlt}
                    className={cn("size-full object-cover", imageClassName)}
                    optixFlowConfig={optixFlowConfig}
                  />
                </AspectRatio>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
