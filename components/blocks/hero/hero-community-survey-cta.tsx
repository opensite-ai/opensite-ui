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
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
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
      <Pressable
        href={announcementHref}
        className={cn(
          "group mx-auto mb-3 w-fit gap-3 rounded-full border px-5 py-2 text-sm",
          announcementClassName,
        )}
      >
        <span className="mr-1 font-medium">{announcementPrimary}</span>
        {announcementSecondary}
        <DynamicIcon
          name="lucide/minus"
          size={16}
          className="mx-1 inline-block"
        />
        <span className="font-semibold group-hover:underline">
          {announcementLinkText}
        </span>
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
      <div className="relative">
        {renderAnnouncement}
        {heading &&
          (typeof heading === "string" ? (
            <h1
              className={cn(
                "mx-auto max-w-4xl text-4xl font-semibold text-balance lg:text-6xl",
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
                "mx-auto max-w-4xl lg:text-xl",
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
      <div className="relative px-8">
        <div className="absolute inset-0 top-1/2 h-full w-full bg-linear-to-b from-muted to-transparent to-50%"></div>
        {renderImages}
      </div>
    </Section>
  );
}
