"use client";

import * as React from "react";
import { useState, useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Lightbox, type LightboxItem } from "@page-speed/lightbox";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";

/**
 * Image configuration for hero split geometric shapes.
 */
export interface HeroSplitGeometricShapesImage {
  /**
   * Image source URL
   */
  src: string;
  /**
   * Alt text for the image
   */
  alt?: string;
  /**
   * Additional CSS classes for the image
   */
  className?: string;
}

export interface HeroSplitGeometricShapesProps {
  /**
   * Badge/label text above heading
   */
  badgeText?: React.ReactNode;
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
   * Array of images to display in masonry layout (can be strings or objects)
   */
  images?: (string | HeroSplitGeometricShapesImage)[];
  /**
   * Custom slot for rendering images (overrides images array)
   */
  imagesSlot?: React.ReactNode; /**
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
   * Additional CSS classes for the images container
   */
  imagesClassName?: string;
  /**
   * Additional CSS classes for each image
   */
  imageClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroSplitGeometricShapes({
  badgeText,
  heading,
  description,
  actions,
  actionsSlot,
  images,
  imagesSlot,
  background,
  spacing = "py-6 md:py-32",
  pattern,
  patternOpacity,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  imagesClassName,
  imageClassName,
  optixFlowConfig,
}: HeroSplitGeometricShapesProps): React.JSX.Element {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const lightboxItems: LightboxItem[] = useMemo(() => {
    if (!images || images.length === 0) return [];
    return images.map((image, index) => {
      const src = typeof image === "string" ? image : image.src;
      const alt =
        typeof image === "string"
          ? "Gallery image"
          : image.alt || "Gallery image";
      return {
        id: `hero-split-geometric-${index}-${src.slice(-8)}`,
        src,
        alt,
        type: "image" as const,
      };
    });
  }, [images]);

  const handleImageClick = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const handleLightboxClose = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
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
  }, [actionsSlot, actions]);

  const renderImages = useMemo(() => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return (
      <div className={cn("flex flex-col items-center justify-center", imagesClassName)}>
        <div className="relative aspect-7/8 h-full w-full">
          {images.map((image, index) => {
            const src = typeof image === "string" ? image : image.src;
            const alt =
              typeof image === "string"
                ? "Gallery image"
                : image.alt || "Gallery image";
            const itemClass = typeof image === "string" ? undefined : image.className;

            // Position classes for masonry layout matching the original rectangle positions
            const positionClasses = [
              "absolute top-[12%] right-[50%] aspect-square w-[24%]", // Top left, small square
              "absolute top-[36%] right-[50%] aspect-5/6 w-[40%]", // Middle left, tall rectangle
              "absolute bottom-[36%] left-[54%] aspect-5/6 w-[40%]", // Middle right, tall rectangle
              "absolute bottom-[12%] left-[54%] aspect-square w-[24%]", // Bottom right, small square
            ];

            return (
              <div
                key={index}
                className={cn(
                  "cursor-pointer overflow-hidden rounded-lg border border-border",
                  positionClasses[index % 4],
                  itemClass,
                )}
                onClick={() => handleImageClick(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleImageClick(index);
                  }
                }}
              >
                <Img
                  src={src}
                  alt={alt}
                  className={cn(
                    "h-full w-full object-cover transition-opacity hover:opacity-90",
                    imageClassName,
                  )}
                  loading="lazy"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [imagesSlot, images, imagesClassName, imageClassName, optixFlowConfig, handleImageClick]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
      containerClassName={containerClassName}
    >
      <div className={cn("flex flex-col items-center")}>
        <div className="2xl:w-[calc(min(100vw-2*theme(container.padding),100%+8rem))] w-full overflow-clip rounded-lg bg-muted">
          <div className="grid items-center gap-0 md:gap-8 lg:grid-cols-2">
            <div
              className={cn(
                "container flex flex-col items-center px-10 py-8 text-center lg:mx-auto lg:items-start lg:px-16 lg:py-32 lg:text-left",
                contentClassName,
              )}
            >
              {badgeText &&
                (typeof badgeText === "string" ? (
                  <p>{badgeText}</p>
                ) : (
                  badgeText
                ))}
              {heading &&
                (typeof heading === "string" ? (
                  <h1
                    className={cn(
                      "my-6 text-4xl font-bold text-pretty lg:text-6xl",
                      headingClassName,
                    )}
                  >
                    {heading}
                  </h1>
                ) : (
                  <h1
                    className={cn(
                      "my-6 text-4xl font-bold text-pretty lg:text-6xl",
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
                      "mb-8 max-w-xl lg:text-xl",
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
            {renderImages}
          </div>
        </div>
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
