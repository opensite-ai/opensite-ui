"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Img } from "@page-speed/img";
import type {
  ActionConfig,
  ImageItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import { BlockActions } from "@/components/ui/block-actions";
import { BrandLogo } from "../../ui/brand-logo";
import type { LogoConfig } from "../navbars/types";

export interface AvatarItem {
  /**
   * Avatar image source URL
   */
  src: string;
  /**
   * Alt text for the avatar
   */
  alt: string;
}

export interface HeroGradientAvatarsRatingProps {
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
   * Array of avatar items for social proof
   */
  avatars?: AvatarItem[];
  /**
   * Custom slot for avatars (overrides avatars array)
   */
  avatarsSlot?: React.ReactNode;
  /**
   * Rating value (e.g., "5.0")
   */
  ratingValue?: string;
  /**
   * Rating label (e.g., "1000+ happy developers")
   */
  ratingLabel?: React.ReactNode;
  /**
   * Number of stars to display
   */
  starCount?: number;
  /**
   * Array of showcase images (expects 2 images)
   */
  images?: ImageItem[];
  /**
   * Custom slot for images (overrides images array)
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
   * Additional CSS classes for the content column
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

export function HeroGradientAvatarsRating({
  sectionId = "hero-gradient-avatars-rating",
  heading,
  description,
  actions,
  actionsSlot,
  avatars,
  avatarsSlot,
  ratingValue,
  ratingLabel,
  starCount = 5,
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
}: HeroGradientAvatarsRatingProps): React.JSX.Element {
  const renderAvatars = useMemo(() => {
    if (avatarsSlot) return avatarsSlot;
    if (!avatars || avatars.length === 0) return null;

    return (
      <div className="flex -space-x-4">
        {avatars.map((avatar, index) => (
          <Avatar
            key={index}
            className="size-14 border-2 border-background shadow-sm ring-1 ring-border"
          >
            <AvatarImage src={avatar.src} alt={avatar.alt} />
          </Avatar>
        ))}
      </div>
    );
  }, [avatarsSlot, avatars]);

  const renderRating = useMemo(() => {
    if (!ratingValue && !ratingLabel) return null;

    return (
      <div className="flex flex-col items-center sm:items-start">
        <div className="flex items-center gap-1">
          {[...Array(starCount)].map((_, i) => (
            <DynamicIcon
              key={i}
              name="lucide/star"
              size={20}
              className="fill-primary"
            />
          ))}
          {ratingValue && <span className="font-semibold">{ratingValue}</span>}
        </div>
        {ratingLabel &&
          (typeof ratingLabel === "string" ? (
            <p className={cn("text-sm font-medium")}>{ratingLabel}</p>
          ) : (
            ratingLabel
          ))}
      </div>
    );
  }, [ratingValue, ratingLabel, starCount]);

  const renderImages = useMemo(() => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return (
      <div
        className={cn(
          "grid items-center gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2",
          imagesClassName,
        )}
      >
        {images[0] && (
          <div
            className={cn(
              "relative aspect-3/4 w-full overflow-hidden rounded-xl shadow-xl",
            )}
          >
            <Img
              src={images[0].src}
              alt={images[0].alt}
              className={cn(
                "h-full w-full object-cover transition-transform duration-300 hover:scale-105",
                images[0].className,
              )}
              optixFlowConfig={optixFlowConfig}
              loading="eager"
            />
          </div>
        )}
        {images[1] && (
          <div
            className={cn(
              "relative aspect-3/4 w-full overflow-hidden rounded-lg lg:mt-8",
            )}
          >
            <Img
              src={images[1].src}
              alt={images[1].alt}
              className={cn(
                "h-full w-full object-cover transition-transform duration-300 hover:scale-105",
                images[1].className,
              )}
              optixFlowConfig={optixFlowConfig}
              loading="eager"
            />
          </div>
        )}
      </div>
    );
  }, [imagesSlot, images, imagesClassName, optixFlowConfig]);

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
      <div className="relative">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div
            className={cn(
              "flex flex-col items-center text-center lg:items-start lg:text-left pt-6 md:pt-0",
              contentClassName,
            )}
          >
            {(logo || logoSlot) && (
              <div className={cn("mb-4", logoClassName)}>
                <BrandLogo logo={logo} logoSlot={logoSlot} size="lg" />
              </div>
            )}

            {heading && (
              <h1
                className={cn(
                  "text-4xl font-semibold md:text-6xl lg:text-7xl text-balance leading-tight",
                  headingClassName,
                )}
              >
                {typeof heading === "string" ? heading : heading}
              </h1>
            )}

            {description &&
              (typeof description === "string" ? (
                <p
                  className={cn(
                    "my-8 max-w-xl lg:text-lg text-balance",
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

            {(avatars || avatarsSlot || ratingValue || ratingLabel) && (
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:items-center">
                {renderAvatars}
                {renderRating}
              </div>
            )}
          </div>

          {renderImages}
        </div>
      </div>
    </Section>
  );
}
