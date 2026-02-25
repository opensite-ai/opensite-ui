"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn, getNestedCardBg, getTextColor } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface GalleryImageItem {
  src: string;
  alt: string;
}

export interface AboutVisionGalleryProps {
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
   * Subtitle text
   */
  subtitle?: React.ReactNode;
  /**
   * Additional CSS classes for the subtitle
   */
  subtitleClassName?: string;
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
   * Primary content section title
   */
  primarySectionTitle?: React.ReactNode;
  /**
   * Additional CSS classes for the primary section title
   */
  primarySectionTitleClassName?: string;
  /**
   * Primary content section body
   */
  primarySectionContent?: React.ReactNode;
  /**
   * Additional CSS classes for the primary section content
   */
  primarySectionContentClassName?: string;
  /**
   * Secondary content section title
   */
  secondarySectionTitle?: React.ReactNode;
  /**
   * Additional CSS classes for the secondary section title
   */
  secondarySectionTitleClassName?: string;
  /**
   * Secondary content section body
   */
  secondarySectionContent?: React.ReactNode;
  /**
   * Additional CSS classes for the secondary section content
   */
  secondarySectionContentClassName?: string;
  /**
   * Secondary section link text
   */
  secondarySectionLinkText?: React.ReactNode;
  /**
   * Secondary section link URL
   */
  secondarySectionLinkUrl?: string;
  /**
   * Call-to-action section title
   */
  ctaTitle?: React.ReactNode;
  /**
   * Additional CSS classes for the CTA title
   */
  ctaTitleClassName?: string;
  /**
   * CTA action configuration
   */
  ctaAction?: ActionConfig;
  /**
   * Custom slot for rendering CTA (overrides ctaAction)
   */
  ctaSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the CTA section
   */
  ctaClassName?: string;
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
}

/**
 * AboutVisionGallery - A two-column about section with image gallery, dual content areas,
 * and a call-to-action banner. Features a hero area with title/subtitle, responsive image
 * grid, two side-by-side content sections, and a prominent CTA section.
 *
 * @example
 * ```tsx
 * <AboutVisionGallery
 *   title="About Our Company"
 *   subtitle="Learn more about what we do"
 *   images={[{ src: "/image1.jpg", alt: "Team photo" }]}
 *   primarySectionTitle="Our Mission"
 *   primarySectionContent="We are dedicated to excellence..."
 *   secondarySectionTitle="Our Story"
 *   secondarySectionContent="Founded in 2020..."
 *   ctaTitle="Join Our Team"
 *   ctaAction={{ label: "View Careers", href: "/careers" }}
 * />
 * ```
 */
export function AboutVisionGallery({
  className,
  title,
  titleClassName,
  subtitle,
  subtitleClassName,
  images,
  imagesSlot,
  imagesClassName,
  primarySectionTitle,
  primarySectionTitleClassName,
  primarySectionContent,
  primarySectionContentClassName,
  secondarySectionTitle,
  secondarySectionTitleClassName,
  secondarySectionContent,
  secondarySectionContentClassName,
  secondarySectionLinkText,
  secondarySectionLinkUrl,
  ctaTitle,
  ctaTitleClassName,
  ctaAction,
  ctaSlot,
  ctaClassName,
  optixFlowConfig,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  pattern,
  patternOpacity,
}: AboutVisionGalleryProps): React.JSX.Element {
  const imagesContent = useMemo(() => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return (
      <div
        className={cn(
          "grid gap-3 md:grid-cols-2 lg:grid-cols-3",
          imagesClassName,
        )}
      >
        {images.map((image, idx) => (
          <Img
            key={idx}
            src={image.src}
            alt={image.alt}
            className="h-80 w-full object-cover"
            optixFlowConfig={optixFlowConfig}
          />
        ))}
      </div>
    );
  }, [imagesSlot, images, imagesClassName, optixFlowConfig]);

  const ctaContent = useMemo(() => {
    if (ctaSlot) return ctaSlot;
    if (!ctaAction) return null;

    return (
      <Pressable
        href={ctaAction.href}
        onClick={ctaAction.onClick}
        size={ctaAction.size || "lg"}
        variant={ctaAction.variant || "default"}
        asButton
      >
        {ctaAction.label}
      </Pressable>
    );
  }, [ctaSlot, ctaAction]);

  const hasPrimarySection = primarySectionTitle || primarySectionContent;
  const hasSecondarySection =
    secondarySectionTitle ||
    secondarySectionContent ||
    secondarySectionLinkText;
  const hasCtaSection = ctaTitle || ctaSlot || ctaAction;

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
      containerClassName={containerClassName}
    >
      {(title || subtitle) && (
        <div className="mx-auto flex max-w-3xl flex-col gap-8 pb-6 md:pb-18 text-center">
          {title &&
            (typeof title === "string" ? (
              <h1
                className={cn(
                  "text-4xl font-semibold md:text-7xl text-balance",
                  titleClassName,
                )}
              >
                {title}
              </h1>
            ) : (
              <div className={titleClassName}>{title}</div>
            ))}
          {subtitle &&
            (typeof subtitle === "string" ? (
              <p
                className={cn(
                  "text-xl font-medium text-balance",
                  getTextColor(background, "muted"),
                  subtitleClassName,
                )}
              >
                {subtitle}
              </p>
            ) : (
              <div className={subtitleClassName}>{subtitle}</div>
            ))}
        </div>
      )}
      {imagesContent}
      {(hasPrimarySection || hasSecondarySection) && (
        <div className="mx-auto grid max-w-5xl gap:7 md:gap-28 py-6 md:py-16 md:grid-cols-2">
          {hasPrimarySection && (
            <div>
              {primarySectionTitle &&
                (typeof primarySectionTitle === "string" ? (
                  <h2
                    className={cn(
                      "mb-5 text-4xl font-semibold",
                      primarySectionTitleClassName,
                    )}
                  >
                    {primarySectionTitle}
                  </h2>
                ) : (
                  <div className={cn("mb-5", primarySectionTitleClassName)}>
                    {primarySectionTitle}
                  </div>
                ))}
              {primarySectionContent &&
                (typeof primarySectionContent === "string" ? (
                  <p
                    className={cn(
                      "text-normal md:text-xl leading-8 font-medium whitespace-pre-line",
                      getTextColor(background, "muted"),
                      primarySectionContentClassName,
                    )}
                  >
                    {primarySectionContent}
                  </p>
                ) : (
                  <div className={primarySectionContentClassName}>
                    {primarySectionContent}
                  </div>
                ))}
            </div>
          )}
          {hasSecondarySection && (
            <div>
              {secondarySectionTitle &&
                (typeof secondarySectionTitle === "string" ? (
                  <h2
                    className={cn(
                      "mb-5 text-4xl font-semibold",
                      secondarySectionTitleClassName,
                    )}
                  >
                    {secondarySectionTitle}
                  </h2>
                ) : (
                  <div className={cn("mb-5", secondarySectionTitleClassName)}>
                    {secondarySectionTitle}
                  </div>
                ))}
              {(secondarySectionContent || secondarySectionLinkText) && (
                <p
                  className={cn(
                    "text-normal md:text-xl leading-8 font-medium",
                    getTextColor(background, "muted"),
                    secondarySectionContentClassName,
                  )}
                >
                  {secondarySectionLinkText && secondarySectionLinkUrl && (
                    <Pressable
                      href={secondarySectionLinkUrl}
                      className="mr-1 underline"
                    >
                      {secondarySectionLinkText}
                    </Pressable>
                  )}
                  {secondarySectionContent}
                </p>
              )}
            </div>
          )}
        </div>
      )}
      {hasCtaSection && (
        <div
          className={cn(
            "mx-auto flex max-w-5xl flex-col items-center justify-between gap-8 rounded-2xl p-14 text-center md:flex-row md:text-left",
            getNestedCardBg(background, "subtle"),
            ctaClassName,
          )}
        >
          {ctaTitle &&
            (typeof ctaTitle === "string" ? (
              <h3
                className={cn(
                  "text-3xl font-semibold whitespace-pre-line",
                  ctaTitleClassName,
                )}
              >
                {ctaTitle}
              </h3>
            ) : (
              <div className={ctaTitleClassName}>{ctaTitle}</div>
            ))}
          {ctaContent}
        </div>
      )}
    </Section>
  );
}
