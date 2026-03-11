"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
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

export interface AvatarItem {
  /**
   * Avatar image source
   */
  src: string;
  /**
   * Avatar fallback text
   */
  fallback: string;
}

export interface HeroPremiumSplitAvatarsProps {
  /**
   * Brand name text
   */
  brandName?: React.ReactNode;
  /**
   * Highlighted brand suffix (e.g., "PRO")
   */
  brandSuffix?: React.ReactNode;
  /**
   * Custom slot for brand (overrides brand props)
   */
  brandSlot?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Action configuration for CTA button
   */
  action?: ActionConfig;
  /**
   * Custom slot for action (overrides action prop)
   */
  actionSlot?: React.ReactNode;
  /**
   * Array of avatar items for social proof
   */
  avatars?: AvatarItem[];
  /**
   * Custom slot for avatars (overrides avatars array)
   */
  avatarsSlot?: React.ReactNode;
  /**
   * Social proof text
   */
  socialProofText?: React.ReactNode;
  /**
   * Feature image on the right side
   */
  image?: ImageItem;
  /**
   * Custom slot for image (overrides image prop)
   */
  imageSlot?: React.ReactNode; /**
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
   * Additional CSS classes for the image
   */
  imageClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /** Optional Section ID */
  sectionId?: string;
}

export function HeroPremiumSplitAvatars({
  sectionId = "hero-premium-split-avatars",
  brandName,
  brandSuffix,
  brandSlot,
  heading,
  description,
  action,
  actionSlot,
  avatars,
  avatarsSlot,
  socialProofText,
  image,
  imageSlot,
  className,
  spacing = "pt-28 pb-8 md:pt-32 md:pb-32",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  background,
  pattern,
  patternOpacity,
  contentClassName,
  headingClassName,
  descriptionClassName,
  imageClassName,
  optixFlowConfig,
}: HeroPremiumSplitAvatarsProps): React.JSX.Element {
  const renderBrand = useMemo(() => {
    if (brandSlot) return brandSlot;

    return (
      <h1 className="text-4xl ">
        {brandName}{" "}
        {brandSuffix && <span className="pb-1 border-b-2">{brandSuffix}</span>}
      </h1>
    );
  }, [brandSlot, brandName, brandSuffix]);

  const renderAction = useMemo(() => {
    if (actionSlot) return actionSlot;
    if (!action) return null;

    const {
      label,
      icon,
      iconAfter,
      children,
      className: actionClassName,
      ...pressableProps
    } = action;
    return (
      <div className="flex">
        <Pressable asButton className={actionClassName} {...pressableProps}>
          {children ?? (
            <>
              {icon}
              <span>{label}</span>
              {iconAfter}
            </>
          )}
        </Pressable>
      </div>
    );
  }, [actionSlot, action]);

  const renderAvatars = useMemo(() => {
    if (avatarsSlot) return avatarsSlot;
    if (!avatars || avatars.length === 0) return null;

    return (
      <div className="flex items-center gap-3.5">
        <div className="flex -space-x-3">
          {avatars.map((avatar, index) => (
            <Avatar
              key={index}
              className="block size-11 min-h-11 min-w-11 rounded-full object-cover lg:size-11"
            >
              <AvatarImage src={avatar.src} />
              <AvatarFallback>{avatar.fallback}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        {socialProofText &&
          (typeof socialProofText === "string" ? (
            <span className="text-xs lg:text-sm">{socialProofText}</span>
          ) : (
            socialProofText
          ))}
      </div>
    );
  }, [avatarsSlot, avatars, socialProofText]);

  const renderImage = useMemo(() => {
    if (imageSlot) return imageSlot;
    if (!image) return null;

    return (
      <Img
        src={image.src}
        alt={image.alt}
        className={cn(
          "h-full w-full md:w-1/2 object-cover block rounded-xl shadow-xl",
          imageClassName,
          image.className,
        )}
        optixFlowConfig={optixFlowConfig}
      />
    );
  }, [imageSlot, image, imageClassName, optixFlowConfig]);

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
      <div className="relative flex w-full flex-col md:flex-row gap-8 md:gap-20">
        <div className="flex w-full items-center justify-center lg:w-1/2">
          <div
            className={cn(
              "my-10 flex w-full flex-col gap-6 md:gap-24",
              contentClassName,
            )}
          >
            {renderBrand}
            <div className="flex flex-col gap-4 md:gap-8">
              {heading &&
                (typeof heading === "string" ? (
                  <h2 className={cn("text-4xl lg:text-6xl", headingClassName)}>
                    {heading}
                  </h2>
                ) : (
                  <h2 className={cn("text-4xl lg:text-6xl", headingClassName)}>
                    {heading}
                  </h2>
                ))}
              {description &&
                (typeof description === "string" ? (
                  <p className={cn("mt-2.5 lg:text-xl", descriptionClassName)}>
                    {description}
                  </p>
                ) : (
                  <div className={descriptionClassName}>{description}</div>
                ))}
              {renderAction}
            </div>
            {renderAvatars}
          </div>
        </div>
        {renderImage}
      </div>
    </Section>
  );
}
