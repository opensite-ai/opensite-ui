"use client";

import * as React from "react";
import { useState, useCallback, useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import { Lightbox, type LightboxItem } from "@page-speed/lightbox";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface GalleryImageItem {
  src: string;
  alt: string;
  className?: string;
}

export interface AboutStoryGalleryProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Main title
   */
  title?: React.ReactNode;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Main description
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Array of gallery images
   */
  images?: GalleryImageItem[];
  /**
   * Custom slot for rendering images (overrides images array)
   */
  imagesSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the images container
   */
  imagesClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
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

export function AboutStoryGallery({
  sectionId = "about-story-gallery",
  className,
  title,
  titleClassName,
  description,
  descriptionClassName,
  images,
  imagesSlot,
  imagesClassName,
  optixFlowConfig,
  background,
  spacing = "lg",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  pattern,
  patternOpacity,
}: AboutStoryGalleryProps): React.JSX.Element {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const lightboxItems: LightboxItem[] = useMemo(
    () =>
      (images ?? []).map((img, index) => ({
        id: `gallery-image-${index}`,
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

  const imagesContent = useMemo(() => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return (
      <div
        className={cn(
          "mt-7 md:mt-16 grid gap-4 md:grid-cols-3",
          imagesClassName,
        )}
      >
        {images.map((image, idx) => (
          <div
            key={idx}
            className={cn(
              "cursor-pointer overflow-hidden",
              "rounded-xl transition-transform duration-500",
              "hover:scale-[1.02] hover:shadow-lg",
            )}
            onClick={() => handleImageClick(idx)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleImageClick(idx);
              }
            }}
            aria-label={`View ${image.alt} in lightbox`}
          >
            <Img
              src={image.src}
              alt={image.alt}
              className={cn("h-64 w-full object-cover", image.className)}
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
      className={className}
      containerClassName={containerClassName}
    >
      <div className="mx-auto max-w-3xl text-center">
        {title &&
          (typeof title === "string" ? (
            <h1
              className={cn(
                "text-4xl font-bold tracking-tight md:text-5xl text-balance",
                titleClassName,
              )}
            >
              {title}
            </h1>
          ) : (
            <div className={titleClassName}>{title}</div>
          ))}
        {description &&
          (typeof description === "string" ? (
            <p
              className={cn(
                "mt-6 text-lg whitespace-pre-line text-balance",
                descriptionClassName,
              )}
            >
              {description}
            </p>
          ) : (
            <div className={cn("mt-6", descriptionClassName)}>
              {description}
            </div>
          ))}
      </div>

      {imagesContent}

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
