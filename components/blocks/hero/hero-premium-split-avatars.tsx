"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import type {
  ActionConfig,
  DirectionConfig,
  ImageItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import {
  MediaAspectRatio,
  ResponsiveMediaAspectRatioProps,
} from "../../ui/media-aspect-ratio";
import { BrandLogo } from "../../ui/brand-logo";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type { LogoConfig } from "../navbars/types";

export type { DirectionConfig };

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
  imageSlot?: React.ReactNode;
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
  /**
   * Media aspect ratios for desktop and mobile breakpoints
   * @default { desktop: "vertical", mobile: "vertical" }
   */
  mediaAspectRatios?: ResponsiveMediaAspectRatioProps;
  /**
   * Direction configuration for desktop and mobile layouts
   * @default { desktop: 'mediaRight', mobile: 'mediaBottom' }
   */
  directionConfig?: DirectionConfig;
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
  spacing = "hero",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  background,
  pattern,
  patternOpacity,
  contentClassName,
  headingClassName,
  descriptionClassName,
  imageClassName,
  optixFlowConfig,
  mediaAspectRatios = { desktop: "vertical", mobile: "vertical" },
  directionConfig = { desktop: "mediaRight", mobile: "mediaBottom" },
  logo,
  logoSlot,
  logoClassName,
}: HeroPremiumSplitAvatarsProps): React.JSX.Element {
  const responsiveClassName = useMemo(() => {
    const desktopOrder =
      directionConfig.desktop === "mediaRight"
        ? "md:flex-row"
        : "md:flex-row-reverse";

    const mobileOrder =
      directionConfig.mobile === "mediaTop" ? "flex-col-reverse" : "flex-col";

    return `${mobileOrder} ${desktopOrder}`;
  }, [directionConfig.desktop, directionConfig.mobile]);

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
              <DynamicIcon name={icon} />
              <span>{label}</span>
              <DynamicIcon name={iconAfter} />
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
      <MediaAspectRatio
        breakpoint="md"
        containerClassName="relative flex w-full justify-center md:w-1/2"
        mobileClassName="w-full"
        desktopClassName="w-full max-h-[70dvh]"
        frameClassName="rounded-xl shadow-xl"
        imageClassName={cn("block", imageClassName)}
        mediaItem={{
          image: {
            ...image,
            loading: "eager",
          },
        }}
        optixFlowConfig={optixFlowConfig}
        deviceAspectRatios={mediaAspectRatios}
      />
    );
  }, [
    imageSlot,
    image,
    imageClassName,
    optixFlowConfig,
    mediaAspectRatios,
  ]);

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
      <div
        className={cn(
          "relative flex w-full gap-8 md:gap-20",
          responsiveClassName,
        )}
      >
        <div className="flex w-full items-center justify-center lg:w-1/2">
          <div
            className={cn(
              "my-10 flex w-full flex-col gap-6 md:gap-24",
              contentClassName,
            )}
          >
            {renderBrand}
            <div className="flex flex-col gap-4 md:gap-8">
              {(logo || logoSlot) && (

                <div className={cn("mb-4", logoClassName)}>

                  <BrandLogo logo={logo} logoSlot={logoSlot} size="lg" />

                </div>

              )}

              
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
