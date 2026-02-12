"use client";

import * as React from "react";
import { useMemo, useState, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Lightbox, type LightboxItem } from "@page-speed/lightbox";
import type {
  ActionConfig,
  ImageItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import { Badge } from "@/src";

export interface HeroGridPatternSolutionsProps {
  /**
   * Badge/link text content
   */
  badgeText?: React.ReactNode;
  /**
   * Badge/link href
   */
  badgeHref?: string;
  /**
   * Custom slot for badge (overrides badge props)
   */
  badgeSlot?: React.ReactNode;
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
   * Array of images for the grid (expects 3 images)
   */
  images?: ImageItem[];
  /**
   * Custom slot for images (overrides images array)
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
   * Additional CSS classes for the content area
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

export function HeroGridPatternSolutions({
  badgeText,
  badgeHref,
  badgeSlot,
  heading,
  description,
  actions,
  actionsSlot,
  images,
  imagesSlot,
  background,
  spacing = "py-32 md:py-32",
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  imagesClassName,
  optixFlowConfig,
}: HeroGridPatternSolutionsProps): React.JSX.Element {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const lightboxItems: LightboxItem[] = useMemo(
    () =>
      (images ?? []).map((img, index) => ({
        id: `hero-grid-image-${index}`,
        type: "image" as const,
        src: img.src,
        alt: img.alt,
        download: true,
        share: true,
      })),
    [images],
  );

  const handleImageClick = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const handleLightboxClose = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const renderBadge = useMemo(() => {
    if (badgeSlot) return badgeSlot;
    if (!badgeText) return null;

    return (
      <Pressable href={badgeHref}>
        <Badge className="px-2">
          {badgeText}
          <DynamicIcon name="lucide/arrow-right" />
        </Badge>
      </Pressable>
    );
  }, [badgeSlot, badgeHref, badgeText]);

  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div
        className={cn(
          "flex flex-col justify-center gap-x-2 gap-y-3 sm:flex-row",
          actionsClassName,
        )}
      >
        {actions.map((action, index) => {
          const {
            label,
            icon,
            iconAfter,
            children,
            className: actionClassName,
            ...pressableProps
          } = action;
          return (
            <Pressable
              key={index}
              asButton
              className={actionClassName}
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
        })}
      </div>
    );
  }, [actionsSlot, actions, actionsClassName]);

  const renderImages = useMemo(() => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return (
      <div
        className={cn(
          "mt-8 md:mt-20 grid grid-cols-2 gap-4 md:flex md:flex-row md:items-center md:justify-center md:gap-6",
          imagesClassName,
        )}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="cursor-pointer overflow-hidden rounded-xl transition-transform hover:scale-[1.02] hover:shadow-lg"
            onClick={() => handleImageClick(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleImageClick(index);
              }
            }}
            aria-label={`View ${image.alt} in lightbox`}
          >
            <Img
              src={image.src}
              alt={image.alt}
              className={cn(
                "h-full max-h-[200px] max-w-[200px] w-full rounded-xl object-cover shadow-xl",
                image.className,
              )}
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        ))}
      </div>
    );
  }, [imagesSlot, images, imagesClassName, optixFlowConfig, handleImageClick]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("relative flex items-center justify-center", className)}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div className="relative overflow-hidden">
          <div className={cn("mx-auto max-w-4xl", contentClassName)}>
            {renderBadge}
            {heading &&
              (typeof heading === "string" ? (
                <h1
                  className={cn(
                    "my-4 mb-6 text-center text-3xl font-semibold lg:text-8xl text-balance",
                    headingClassName,
                  )}
                >
                  {heading}
                </h1>
              ) : (
                <h1
                  className={cn(
                    "my-4 mb-6 text-center text-3xl font-semibold lg:text-8xl text-balance",
                    headingClassName,
                  )}
                >
                  {heading}
                </h1>
              ))}
            {description &&
              (typeof description === "string" ? (
                <p
                  className={cn(
                    "mx-auto mb-8 max-w-2xl text-center lg:text-xl text-balance",
                    descriptionClassName,
                  )}
                >
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              ))}
            {renderActions}
          </div>
        </div>
        {renderImages}
      </div>

      {lightboxOpen && (
        <Lightbox
          items={lightboxItems}
          initialIndex={lightboxIndex}
          layout="horizontal"
          controls={{
            navigation: true,
            thumbnails: true,
            download: true,
            share: true,
            fullscreen: true,
            captions: true,
            counter: true,
          }}
          onClose={handleLightboxClose}
          enableKeyboardShortcuts={true}
          closeOnEscape={true}
          closeOnBackdropClick={true}
        />
      )}
    </Section>
  );
}
