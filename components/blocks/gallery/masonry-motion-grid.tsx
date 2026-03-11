"use client";

import * as React from "react";
import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { cn, getNestedCardBg } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import { Lightbox, type LightboxItem } from "@page-speed/lightbox";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";

/**
 * Image configuration for masonry motion grid.
 */
export interface MasonryMotionGridImage {
  /**
   * Image source URL
   */
  src: string;
  /**
   * Alt text for the image
   */
  alt: string;
  /**
   * Height of the image (CSS value)
   */
  height: string;
  /**
   * Additional CSS classes for the image
   */
  className?: string;
}

export interface MasonryMotionGridProps {
  /**
   * Main title content
   */
  title?: React.ReactNode;
  /**
   * Description text below title
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Images for column 1
   */
  column1Images?: MasonryMotionGridImage[];
  /**
   * Images for column 2
   */
  column2Images?: MasonryMotionGridImage[];
  /**
   * Images for column 3
   */
  column3Images?: MasonryMotionGridImage[];
  /**
   * Images for column 4
   */
  column4Images?: MasonryMotionGridImage[];
  /**
   * Custom slot for rendering the grid (overrides column images)
   */
  gridSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the grid container
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each column
   */
  columnClassName?: string;
  /**
   * Additional CSS classes for each image wrapper
   */
  imageWrapperClassName?: string;
  /**
   * Additional CSS classes for each image
   */
  imageClassName?: string;
  /**
   * Animation duration in seconds
   * @default 0.5
   */
  animationDuration?: number;
  /**
   * Animation delay multiplier for staggered effect
   * @default 0.1
   */
  animationDelayMultiplier?: number;
  /**
   * Whether to show the duplicate grid below
   * @default true
   */
  showDuplicateGrid?: boolean;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * MasonryMotionGrid displays images in an animated masonry grid layout.
 *
 * Features a 4-column (2 on mobile) masonry grid with staggered image heights.
 * Each image animates into view with scale, opacity, and vertical movement
 * using Framer Motion's whileInView trigger. Alternating columns animate from
 * different directions (up/down) for visual interest. The grid is duplicated
 * below for extended galleries. Ideal for portfolio showcases, photo galleries,
 * or any visual content requiring dynamic presentation.
 *
 * @example
 * ```tsx
 * <MasonryMotionGrid
 *   column1Images={[
 *     { src: "/images/photo-1.jpg", alt: "Photo 1", height: "23rem" }
 *   ]}
 *   column2Images={[
 *     { src: "/images/photo-2.jpg", alt: "Photo 2", height: "13rem" }
 *   ]}
 * />
 * ```
 */
export function MasonryMotionGrid({
  sectionId = "masonry-motion-grid",
  title,
  description,
  titleClassName,
  descriptionClassName,
  column1Images,
  column2Images,
  column3Images,
  column4Images,
  gridSlot,
  className,
  gridClassName,
  columnClassName,
  imageWrapperClassName,
  imageClassName,
  animationDuration = 0.5,
  animationDelayMultiplier = 0.1,
  showDuplicateGrid = true,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
  optixFlowConfig,
}: MasonryMotionGridProps): React.JSX.Element {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const allImages = useMemo(
    () => [
      ...(column1Images ?? []),
      ...(column2Images ?? []),
      ...(column3Images ?? []),
      ...(column4Images ?? []),
    ],
    [column1Images, column2Images, column3Images, column4Images],
  );

  const lightboxItems: LightboxItem[] = useMemo(
    () =>
      allImages.map((img, index) => ({
        id: `masonry-image-${index}`,
        type: "image" as const,
        src: img.src,
        alt: img.alt,
        download: true,
        share: true,
      })),
    [allImages],
  );

  const getGlobalIndex = useCallback(
    (columnIndex: number, imageIndex: number): number => {
      const col1Len = column1Images?.length ?? 0;
      const col2Len = column2Images?.length ?? 0;
      const col3Len = column3Images?.length ?? 0;
      const columnOffsets = [
        0,
        col1Len,
        col1Len + col2Len,
        col1Len + col2Len + col3Len,
      ];
      return columnOffsets[columnIndex] + imageIndex;
    },
    [column1Images?.length, column2Images?.length, column3Images?.length],
  );

  const handleImageClick = useCallback((globalIndex: number) => {
    setLightboxIndex(globalIndex);
    setLightboxOpen(true);
  }, []);

  const handleLightboxClose = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const renderColumn = (
    images: MasonryMotionGridImage[],
    direction: "up" | "down",
    columnIndex: number,
  ) => (
    <div className={cn("grid gap-3", columnClassName)}>
      {images.map((image, index) => (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            y: direction === "up" ? 50 : -50,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: animationDuration,
            delay: index * animationDelayMultiplier,
          }}
          key={index}
          className={cn(
            "w-full overflow-hidden rounded-2xl cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-lg",
            getNestedCardBg(background),
            imageWrapperClassName,
          )}
          style={{ height: image.height }}
          onClick={() => handleImageClick(getGlobalIndex(columnIndex, index))}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleImageClick(getGlobalIndex(columnIndex, index));
            }
          }}
          aria-label={`View ${image.alt} in lightbox`}
        >
          <Img
            className={cn(
              "h-full w-full rounded-2xl object-cover",
              imageClassName,
              image.className,
            )}
            src={image.src}
            alt={image.alt}
            loading="lazy"
            optixFlowConfig={optixFlowConfig}
          />
        </motion.div>
      ))}
    </div>
  );

  const renderColumn4 = (images: MasonryMotionGridImage[]) => (
    <div className={cn("grid gap-3", columnClassName)}>
      {images.map((image, index) => (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            y: -50,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: animationDuration,
            delay: index * animationDelayMultiplier,
          }}
          key={index}
          className={cn(
            "w-full overflow-hidden rounded-2xl cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-lg",
            getNestedCardBg(background),
            imageWrapperClassName,
          )}
          style={{ height: image.height }}
          onClick={() => handleImageClick(getGlobalIndex(3, index))}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleImageClick(getGlobalIndex(3, index));
            }
          }}
          aria-label={`View ${image.alt} in lightbox`}
        >
          <Img
            className={cn(
              "h-full w-full rounded-2xl object-cover",
              imageClassName,
              image.className,
            )}
            src={image.src}
            alt={image.alt}
            loading="lazy"
            optixFlowConfig={optixFlowConfig}
          />
        </motion.div>
      ))}
    </div>
  );

  const renderGrid = () => {
    if (gridSlot) return gridSlot;

    return (
      <>
        <div
          className={cn("grid grid-cols-2 gap-3 md:grid-cols-4", gridClassName)}
        >
          {renderColumn(column1Images ?? [], "up", 0)}
          {renderColumn(column2Images ?? [], "down", 1)}
          {renderColumn(column3Images ?? [], "up", 2)}
          {renderColumn4(column4Images ?? [])}
        </div>
        {showDuplicateGrid && (
          <div
            className={cn(
              "mt-4 grid grid-cols-2 gap-3 md:grid-cols-4",
              gridClassName,
            )}
          >
            {renderColumn(column1Images ?? [], "up", 0)}
            {renderColumn(column2Images ?? [], "down", 1)}
            {renderColumn(column3Images ?? [], "up", 2)}
            {renderColumn4(column4Images ?? [])}
          </div>
        )}
      </>
    );
  };

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName="px-8 sm:px-8 md:px-8 lg:px-8"
    >
      {title || description ? (
        <div className="flex flex-col gap-4 mb-10 md:mb-16">
          {title &&
            (typeof title === "string" ? (
              <h2
                className={cn(
                  "text-xl font-medium tracking-tight md:text-2xl lg:text-3xl text-balance",
                  titleClassName,
                )}
              >
                {title}
              </h2>
            ) : (
              <div className={titleClassName}>{title}</div>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p className={cn("max-w-lg text-balance", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div
                className={cn("max-w-lg text-balance", descriptionClassName)}
              >
                {description}
              </div>
            ))}
        </div>
      ) : null}

      {renderGrid()}

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
