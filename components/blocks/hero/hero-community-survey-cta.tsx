"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  ImageItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { BlockActions } from "@/components/ui/block-actions";
import { Badge } from "@/src";

export interface HeroCommunitySurveyCtaProps {
  /**
   * Announcement banner content (primary text)
   */
  announcementPrimary?: React.ReactNode;
  /**
   * Announcement banner secondary text
   */
  announcementSecondary?: React.ReactNode;
  /**
   * Announcement banner link text
   */
  announcementLinkText?: React.ReactNode;
  /**
   * Announcement banner href
   */
  announcementHref?: string;
  /**
   * Custom slot for announcement banner (overrides announcement props)
   */
  announcementSlot?: React.ReactNode;
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
   * Main image configuration
   */
  mainImage?: ImageItem;
  /**
   * Left overlay image configuration
   */
  leftOverlayImage?: ImageItem;
  /**
   * Right overlay image configuration
   */
  rightOverlayImage?: ImageItem;
  /**
   * Custom slot for images (overrides image props)
   */
  imagesSlot?: React.ReactNode;
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
   * Additional CSS classes for the announcement banner
   */
  announcementClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the images container
   */
  imagesClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroCommunitySurveyCta({
  announcementPrimary,
  announcementSecondary,
  announcementLinkText,
  announcementHref,
  announcementSlot,
  heading,
  description,
  actions,
  actionsSlot,
  mainImage,
  leftOverlayImage,
  rightOverlayImage,
  imagesSlot,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "pt-32 pb-8 md:pt-32 md:pb-32",
  pattern,
  patternOpacity,
  className,
  announcementClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  imagesClassName,
  optixFlowConfig,
}: HeroCommunitySurveyCtaProps): React.JSX.Element {
  const renderAnnouncement = useMemo(() => {
    if (announcementSlot) return announcementSlot;

    return (
      <Pressable href={announcementHref}>
        <Badge
          className={cn(
            "group mx-auto w-fit gap-3 px-5 py-2 text-sm h-fit",
            announcementClassName,
          )}
        >
          <div className="flex flex-col">
            <div className="font-medium">{announcementPrimary}</div>
            {announcementSecondary}
          </div>
          {announcementLinkText ? (
            <span className="font-semibold pl-4 ml-4 border-l">
              {announcementLinkText}
            </span>
          ) : null}
        </Badge>
      </Pressable>
    );
  }, [
    announcementSlot,
    announcementHref,
    announcementClassName,
    announcementPrimary,
    announcementSecondary,
    announcementLinkText,
  ]);

  const renderImages = useMemo(() => {
    if (imagesSlot) return imagesSlot;

    return (
      <div className={cn("relative mx-auto max-w-5xl", imagesClassName)}>
        {mainImage && (
          <Img
            src={mainImage.src}
            alt={mainImage.alt}
            className={mainImage.className}
            optixFlowConfig={optixFlowConfig}
          />
        )}
        {leftOverlayImage && (
          <Img
            src={leftOverlayImage.src}
            alt={leftOverlayImage.alt}
            className={leftOverlayImage.className}
            optixFlowConfig={optixFlowConfig}
          />
        )}
        {rightOverlayImage && (
          <Img
            src={rightOverlayImage.src}
            alt={rightOverlayImage.alt}
            className={rightOverlayImage.className}
            optixFlowConfig={optixFlowConfig}
          />
        )}
      </div>
    );
  }, [
    imagesSlot,
    imagesClassName,
    mainImage,
    leftOverlayImage,
    rightOverlayImage,
    optixFlowConfig,
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
      <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          {renderAnnouncement}
          {heading &&
            (typeof heading === "string" ? (
              <h1
                className={cn(
                  "max-w-4xl text-4xl font-semibold text-balance lg:text-6xl",
                  headingClassName,
                )}
              >
                {heading}
              </h1>
            ) : (
              <div className={headingClassName}>{heading}</div>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "max-w-4xl lg:text-xl text-balance",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}

          <BlockActions
            actions={actions}
            actionsClassName={actionsClassName}
            actionsSlot={actionsSlot}
          />
        </div>
        <div className="relative">
          {renderImages}
        </div>
      </div>
    </Section>
  );
}
