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
import { BlockActions } from "@/components/ui/block-actions";
import { BrandLogo } from "../../ui/brand-logo";
import type { LogoConfig } from "../navbars/types";

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
  /**
   * Brand logo configuration. LOGO MEDIA ONLY — do not use photos or hero images.
   */
  logo?: LogoConfig;
  /**
   * Custom slot for logo (overrides logo prop)
   */
  logoSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logo container
   */
  logoClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

export function HeroGridPatternSolutions({
  sectionId = "hero-grid-pattern-solutions",
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
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  imagesClassName,
  optixFlowConfig,
  logo,
  logoSlot,
  logoClassName,
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
        <Badge className="px-4">
          {badgeText}
          <DynamicIcon name="lucide/arrow-up-right" size={16} />
        </Badge>
      </Pressable>
    );
  }, [badgeSlot, badgeHref, badgeText]);

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
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("relative flex items-center justify-center", className)}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div className="relative overflow-hidden">
          <div className={cn("flex flex-col items-center", contentClassName)}>
            {renderBadge}
            {(logo || logoSlot) && (

              <div className={cn("mb-4 flex justify-center", logoClassName)}>

                <BrandLogo logo={logo} logoSlot={logoSlot} size="lg" />

              </div>

            )}

            
            {heading &&
              (typeof heading === "string" ? (
                <h1
                  className={cn(
                    "my-4 mb-6 max-w-full md:max-w-md text-center text-3xl font-semibold lg:text-8xl text-balance",
                    headingClassName,
                  )}
                >
                  {heading}
                </h1>
              ) : (
                <h1
                  className={cn(
                    "my-4 mb-6 max-w-full md:max-w-md text-center text-3xl font-semibold lg:text-8xl text-balance",
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
                    "mx-auto mb-8 max-w-full md:max-w-md text-center lg:text-xl text-balance",
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
              actionsSlot={actionsSlot}
              actionsClassName={actionsClassName}
            />
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
