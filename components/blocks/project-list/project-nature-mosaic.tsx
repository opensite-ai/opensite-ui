"use client";

import * as React from "react";
import { useMemo } from "react";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import { PatternName } from "@/components/ui/pattern-background";

export interface ProjectNatureMosaicProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description content
   */
  description?: React.ReactNode;
  /**
   * Link button text
   */
  linkText?: React.ReactNode;
  /**
   * Link button href
   */
  linkHref?: string;
  /**
   * Array of image URLs
   */
  images?: string[];
  /**
   * Custom slot for rendering images (overrides images array)
   */
  imagesSlot?: React.ReactNode;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Section background style
   */
  background?: SectionBackground;
  /**
   * Section spacing
   */
  spacing?: SectionSpacing;
  /**
   * Background pattern
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern opacity (0-1)
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
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the link
   */
  linkClassName?: string;
}

/**
 * ProjectNatureMosaic - Asymmetric 2-column mosaic with alternating image sizes.
 *
 * Features a poetic multi-line heading followed by a 2-column grid where images
 * alternate between 4:3 and 4:5 aspect ratios, creating visual rhythm. The left
 * column starts with landscape orientation while the right starts with portrait,
 * then they swap. Includes a descriptive paragraph and link button below the grid.
 * Perfect for nature photography, travel portfolios, or any showcase where varied
 * image compositions create an organic, editorial feel.
 */
export function ProjectNatureMosaic({
  heading,
  description,
  linkText,
  linkHref,
  images,
  imagesSlot,
  optixFlowConfig,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  headingClassName,
  gridClassName,
  descriptionClassName,
  linkClassName,
}: ProjectNatureMosaicProps) {
  const renderedImages = useMemo(() => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return (
      <>
        <div className="space-y-4">
          <Img
            src={images[0]}
            alt="Nature scene 1"
            className="aspect-4/3 w-full rounded-lg object-cover"
            optixFlowConfig={optixFlowConfig}
          />
          {images[2] && (
            <Img
              src={images[2]}
              alt="Nature scene 3"
              className="aspect-4/5 w-full rounded-lg object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          )}
        </div>

        <div className="space-y-4">
          {images[1] && (
            <Img
              src={images[1]}
              alt="Nature scene 2"
              className="aspect-4/5 w-full rounded-lg object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          )}
          {images[3] && (
            <Img
              src={images[3]}
              alt="Nature scene 4"
              className="aspect-4/3 w-full rounded-lg object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          )}
        </div>
      </>
    );
  }, [imagesSlot, images, gridClassName, descriptionClassName, linkClassName, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <div className={cn("container", containerClassName)}>
        {heading &&
          (typeof heading === "string" ? (
            <h1
              className={cn(
                "mb-12 text-xl leading-tight font-medium md:text-3xl whitespace-pre-line",
                headingClassName,
              )}
            >
              {heading}
            </h1>
          ) : (
            <div className={headingClassName}>{heading}</div>
          ))}

        <div
          className={cn(
            "mb-12 grid grid-cols-1 gap-4 md:grid-cols-2",
            gridClassName,
          )}
        >
          {renderedImages}
        </div>

        <div className="max-w-md">
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "mb-4 text-muted-foreground",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}
          <Pressable
            href={linkHref}
            variant="link"
            className={cn("h-auto px-0 text-sm font-medium", linkClassName)}
          >
            {linkText}
          </Pressable>
        </div>
      </div>
    </Section>
  );
}
