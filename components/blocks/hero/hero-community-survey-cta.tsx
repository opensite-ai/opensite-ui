"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
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
  /** Optional Section ID */
  sectionId?: string;
}

export function HeroCommunitySurveyCta({
  sectionId = "hero-community-survey-cta",
  announcementPrimary,
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
  spacing = "xl",
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
            "group mx-auto w-fit px-5 py-2 text-sm h-fit",
            announcementClassName,
          )}
        >
          <span>{announcementPrimary}</span>
          {announcementLinkText ? (
            <span className="font-bold pl-4 ml-4 border-l border-primary-foreground">
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
    announcementLinkText,
  ]);

  const imageCount = useMemo(() => {
    let count = 0;
    if (mainImage) count++;
    if (leftOverlayImage) count++;
    if (rightOverlayImage) count++;
    return count;
  }, [mainImage, leftOverlayImage, rightOverlayImage]);

  const renderImages = useMemo(() => {
    if (imagesSlot) return imagesSlot;
    if (imageCount === 0) return null;

    // Single image: centered with rounded corners and shadow
    if (imageCount === 1) {
      const img = mainImage || leftOverlayImage || rightOverlayImage;
      return (
        <div className="flex justify-center">
          <div
            className={cn(
              "relative aspect-4/3 w-full max-w-lg overflow-hidden rounded-lg shadow-2xl",
              imagesClassName,
            )}
          >
            <Img
              src={img!.src}
              alt={img!.alt}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </div>
      );
    }

    // Two images: overlapping absolute-positioned layout
    if (imageCount === 2) {
      const imgs = [mainImage, leftOverlayImage, rightOverlayImage].filter(
        Boolean,
      ) as ImageItem[];
      return (
        <div
          className={cn(
            "relative min-h-[350px] md:min-h-[400px] lg:min-h-[450px]",
            imagesClassName,
          )}
        >
          <div className="absolute left-0 top-0 z-10 aspect-4/3 w-[70%] overflow-hidden rounded-lg shadow-2xl md:w-[65%]">
            <Img
              src={imgs[0].src}
              alt={imgs[0].alt}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
          <div className="absolute bottom-0 right-0 z-20 aspect-3/4 w-[55%] overflow-hidden rounded-lg shadow-2xl md:w-[50%]">
            <Img
              src={imgs[1].src}
              alt={imgs[1].alt}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </div>
      );
    }

    // Three images: cascading overlapping layout
    return (
      <div
        className={cn(
          "relative min-h-[380px] md:min-h-[430px] lg:min-h-[480px]",
          imagesClassName,
        )}
      >
        <div className="absolute left-0 top-0 z-10 aspect-4/3 w-[65%] overflow-hidden rounded-lg shadow-2xl">
          <Img
            src={mainImage!.src}
            alt={mainImage!.alt}
            className="h-full w-full object-cover"
            optixFlowConfig={optixFlowConfig}
          />
        </div>
        <div className="absolute bottom-0 right-0 z-20 aspect-3/4 w-[50%] overflow-hidden rounded-lg shadow-2xl">
          <Img
            src={rightOverlayImage!.src}
            alt={rightOverlayImage!.alt}
            className="h-full w-full object-cover"
            optixFlowConfig={optixFlowConfig}
          />
        </div>
        <div className="absolute bottom-4 left-[10%] z-30 aspect-square w-[35%] overflow-hidden rounded-lg shadow-2xl md:bottom-6 md:left-[5%]">
          <Img
            src={leftOverlayImage!.src}
            alt={leftOverlayImage!.alt}
            className="h-full w-full object-cover"
            optixFlowConfig={optixFlowConfig}
          />
        </div>
      </div>
    );
  }, [
    imagesSlot,
    imagesClassName,
    imageCount,
    mainImage,
    leftOverlayImage,
    rightOverlayImage,
    optixFlowConfig,
  ]);

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
      <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col items-start gap-6 md:gap-8 pt-8 md:pt-0">
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
            mobileConfig={{ width: "full", position: "center" }}
          />
        </div>
        <div className="relative">{renderImages}</div>
      </div>
    </Section>
  );
}
