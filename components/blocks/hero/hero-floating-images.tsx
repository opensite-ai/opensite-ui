"use client";

import * as React from "react";
import { useState, useCallback, useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Lightbox, type LightboxItem } from "@page-speed/lightbox";
import { Section } from "../../ui/section";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

/**
 * Image configuration for the gallery section.
 * Supports featured images that span full height and secondary images in a stacked layout.
 */
export interface HeroFloatingImagesImage {
  /**
   * Image source URL
   */
  src: string;
  /**
   * Alt text for accessibility
   */
  alt: string;
  /**
   * Whether this is a featured image (displays larger/taller in the gallery)
   */
  featured?: boolean;
  /**
   * Additional CSS classes for the image
   */
  className?: string;
}

export interface HeroFloatingImagesProps {
  /**
   * Flexible content slot for the left side of the hero.
   * Renders any content the application/AI builder provides (badges, headings, descriptions, actions, etc.)
   * This allows maximum flexibility without prescribing specific content structure.
   */
  children?: React.ReactNode;
  /**
   * Array of images for the gallery section.
   * First image with `featured: true` (or first image if none marked) displays as the tall featured image.
   * Remaining images display in a stacked layout beside it.
   */
  images?: HeroFloatingImagesImage[];
  /**
   * Custom slot for rendering the gallery (overrides images array).
   * Use when you need complete control over the gallery layout.
   */
  imagesSlot?: React.ReactNode;
  /**
   * Icon name for the zoom indicator on gallery images.
   * Uses DynamicIcon format: "prefix/icon-name"
   * @default "lucide/zoom-in"
   */
  zoomIconName?: string;
  /**
   * Whether to enable lightbox functionality for gallery images.
   * When enabled, clicking an image opens it in a fullscreen lightbox.
   * @default true
   */
  enableLightbox?: boolean;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /** Section spacing variant */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name
   */
  pattern?: PatternName;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the main grid container
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for the content area (left side)
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the gallery container (right side)
   */
  galleryClassName?: string;
  /**
   * Additional CSS classes for the featured image wrapper
   */
  featuredImageClassName?: string;
  /**
   * Additional CSS classes for secondary image wrappers
   */
  secondaryImageClassName?: string;
  /**
   * Additional CSS classes for all images
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for the zoom indicator overlay
   */
  zoomIndicatorClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * HeroFloatingImages - A split-layout hero with flexible content and an interactive image gallery.
 *
 * Features a two-column layout: content on the left (fully customizable via children prop)
 * and a gallery on the right with a featured tall image and stacked secondary images.
 * Each image has a hover effect with zoom indicator and opens in a lightbox when clicked.
 *
 * The component uses the children prop pattern for maximum flexibility - the application
 * or AI builder can render any content structure without being constrained to specific
 * heading/description/badge props.
 *
 * @example
 * ```tsx
 * <HeroFloatingImages
 *   images={[
 *     { src: "/featured.jpg", alt: "Featured work", featured: true },
 *     { src: "/work-1.jpg", alt: "Project 1" },
 *     { src: "/work-2.jpg", alt: "Project 2" },
 *   ]}
 * >
 *   <Badge className="mb-6 w-fit" variant="secondary">Featured Work</Badge>
 *   <h1 className="mb-6 text-4xl font-bold">Your Headline Here</h1>
 *   <p className="mb-8 text-lg text-muted-foreground">Your description...</p>
 *   <div className="flex gap-4">
 *     <Pressable href="/portfolio" variant="default" size="lg" asButton>
 *       View Portfolio
 *     </Pressable>
 *   </div>
 * </HeroFloatingImages>
 * ```
 */
export function HeroFloatingImages({
  children,
  images,
  imagesSlot,
  zoomIconName = "lucide/zoom-in",
  enableLightbox = true,
  background,
  pattern,
  patternOpacity,
  className,
  gridClassName,
  contentClassName,
  galleryClassName,
  featuredImageClassName,
  secondaryImageClassName,
  imageClassName,
  zoomIndicatorClassName,
  optixFlowConfig,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-6 md:py-32",
}: HeroFloatingImagesProps): React.JSX.Element {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Memoized: Separate featured image from secondary images
  const { featuredImage, secondaryImages } = useMemo(() => {
    if (!images || images.length === 0) {
      return { featuredImage: undefined, secondaryImages: [] };
    }

    const featured = images.find((img) => img.featured) ?? images[0];
    const secondary = images.filter((img) => img !== featured);

    return { featuredImage: featured, secondaryImages: secondary };
  }, [images]);

  // Memoized: Convert images to lightbox items
  const lightboxItems: LightboxItem[] = useMemo(() => {
    if (!images || images.length === 0) return [];

    // Build lightbox items in the same order as displayed: featured first, then secondary
    const orderedImages = featuredImage
      ? [featuredImage, ...secondaryImages]
      : secondaryImages;

    return orderedImages.map((img, index) => ({
      id: `hero-gallery-${index}-${img.src.slice(-12)}`,
      type: "image" as const,
      src: img.src,
      alt: img.alt,
    }));
  }, [images, featuredImage, secondaryImages]);

  // Callback: Handle image click to open lightbox
  const handleImageClick = useCallback(
    (index: number) => {
      if (!enableLightbox) return;
      setLightboxIndex(index);
      setLightboxOpen(true);
    },
    [enableLightbox],
  );

  // Callback: Handle lightbox close
  const handleLightboxClose = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  // Callback: Handle keyboard navigation on images
  const handleImageKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleImageClick(index);
      }
    },
    [handleImageClick],
  );

  // Memoized: Render zoom indicator overlay
  const zoomIndicator = useMemo(
    () => (
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100",
          zoomIndicatorClassName,
        )}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background/90 shadow-lg">
          <DynamicIcon name={zoomIconName} size={20} />
        </div>
      </div>
    ),
    [zoomIconName, zoomIndicatorClassName],
  );

  // Memoized: Render the featured image
  const featuredImageContent = useMemo(() => {
    if (!featuredImage) return null;

    return (
      <button
        type="button"
        className={cn(
          "group relative col-span-2 aspect-[4/3] overflow-hidden rounded-2xl sm:col-span-1 sm:row-span-2 sm:aspect-auto sm:h-full",
          featuredImageClassName,
        )}
        onClick={() => handleImageClick(0)}
        onKeyDown={(e) => handleImageKeyDown(e, 0)}
        aria-label={`View ${featuredImage.alt} in lightbox`}
      >
        <Img
          src={featuredImage.src}
          alt={featuredImage.alt}
          className={cn(
            "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
            imageClassName,
            featuredImage.className,
          )}
          optixFlowConfig={optixFlowConfig}
        />
        <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/20" />
        {enableLightbox && zoomIndicator}
      </button>
    );
  }, [
    featuredImage,
    featuredImageClassName,
    imageClassName,
    optixFlowConfig,
    enableLightbox,
    zoomIndicator,
    handleImageClick,
    handleImageKeyDown,
  ]);

  // Memoized: Render secondary images
  const secondaryImagesContent = useMemo(() => {
    if (secondaryImages.length === 0) return null;

    return secondaryImages.map((image, index) => {
      // Index offset: featured is 0, so secondary starts at 1
      const lightboxIndex = index + 1;

      return (
        <button
          key={`secondary-${index}-${image.src.slice(-8)}`}
          type="button"
          className={cn(
            "group relative aspect-square overflow-hidden rounded-2xl",
            secondaryImageClassName,
          )}
          onClick={() => handleImageClick(lightboxIndex)}
          onKeyDown={(e) => handleImageKeyDown(e, lightboxIndex)}
          aria-label={`View ${image.alt} in lightbox`}
        >
          <Img
            src={image.src}
            alt={image.alt}
            className={cn(
              "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
              imageClassName,
              image.className,
            )}
            optixFlowConfig={optixFlowConfig}
          />
          <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/20" />
          {enableLightbox && (
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100",
                zoomIndicatorClassName,
              )}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background/90 shadow-lg">
                <DynamicIcon name={zoomIconName} size={16} />
              </div>
            </div>
          )}
        </button>
      );
    });
  }, [
    secondaryImages,
    secondaryImageClassName,
    imageClassName,
    optixFlowConfig,
    enableLightbox,
    zoomIconName,
    zoomIndicatorClassName,
    handleImageClick,
    handleImageKeyDown,
  ]);

  // Memoized: Render the complete gallery section
  const galleryContent = useMemo(() => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return (
      <div className={cn("grid grid-cols-2 gap-4", galleryClassName)}>
        {featuredImageContent}
        {secondaryImagesContent}
      </div>
    );
  }, [
    imagesSlot,
    images,
    galleryClassName,
    featuredImageContent,
    secondaryImagesContent,
  ]);

  // Determine if we have content to render
  const hasContent = useMemo(() => {
    return children !== undefined && children !== null;
  }, [children]);

  const hasGallery = useMemo(() => {
    return imagesSlot || (images && images.length > 0);
  }, [imagesSlot, images]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("relative flex items-center justify-center", className)}
      containerClassName={containerClassName}
    >
      <div
        className={cn(
          "grid gap-4 md:gap-12 grid-cols-1 md:grid-cols-2 lg:gap-16",
          gridClassName,
        )}
      >
        {/* Content Area */}
        {hasContent ? (
          <div className={cn("flex flex-col justify-center", contentClassName)}>
            {children}
          </div>
        ) : null}

        {/* Gallery Area */}
        {hasGallery ? galleryContent : null}
      </div>

      {/* Lightbox */}
      {enableLightbox && lightboxOpen && lightboxItems.length > 0 ? (
        <Lightbox
          items={lightboxItems}
          initialIndex={lightboxIndex}
          onClose={handleLightboxClose}
          layout="horizontal"
          controls={{
            navigation: true,
            counter: true,
            closeButton: true,
            captions: true,
          }}
        />
      ) : null}
    </Section>
  );
}
