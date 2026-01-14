"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { ActionConfig, ImageItem, OptixFlowConfig } from "../../../src/types";

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
   * Additional CSS classes for the section
   */
  className?: string;
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
}

export function HeroPremiumSplitAvatars({
  brandName = "Business",
  brandSuffix = "PRO",
  brandSlot,
  heading = "Achieve More with Elite Access Pro",
  description = "Enhance your career hunt with increased visibility, first-look opportunities and monetary incentives!",
  action,
  actionSlot,
  avatars,
  avatarsSlot,
  socialProofText = "More than 1 million professionals rely on our platform",
  image,
  imageSlot,
  className,
  contentClassName,
  headingClassName,
  descriptionClassName,
  imageClassName,
  optixFlowConfig,
}: HeroPremiumSplitAvatarsProps): React.JSX.Element {
  const renderBrand = () => {
    if (brandSlot) return brandSlot;

    return (
      <h1 className="text-4xl text-foreground">
        {brandName}{" "}
        {brandSuffix && (
          <span className="bg-linear-to-tr from-foreground to-muted bg-clip-text text-transparent">
            {brandSuffix}
          </span>
        )}
      </h1>
    );
  };

  const renderAction = () => {
    if (actionSlot) return actionSlot;
    if (!action) return null;

    const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
    return (
      <Pressable asButton className={actionClassName} {...pressableProps}>
        {children ?? (
          <>
            {icon}
            <span>{label}</span>
            {iconAfter}
          </>
        )}
      </Pressable>
    );
  };

  const renderAvatars = () => {
    if (avatarsSlot) return avatarsSlot;
    if (!avatars || avatars.length === 0) return null;

    return (
      <div className="flex items-center gap-3.5">
        <div className="flex -space-x-3">
          {avatars.map((avatar, index) => (
            <Avatar key={index} className="block size-11 min-h-11 min-w-11 rounded-full object-cover lg:size-11">
              <AvatarImage src={avatar.src} />
              <AvatarFallback>{avatar.fallback}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        {socialProofText && (
          typeof socialProofText === "string" ? (
            <span className="text-xs text-foreground lg:text-sm">
              {socialProofText}
            </span>
          ) : (
            socialProofText
          )
        )}
      </div>
    );
  };

  const renderImage = () => {
    if (imageSlot) return imageSlot;
    if (!image) return null;

    return (
      <Img
        src={image.src}
        alt={image.alt}
        className={cn("hidden h-screen w-1/2 object-cover lg:block", imageClassName, image.className)}
        optixFlowConfig={optixFlowConfig}
      />
    );
  };

  return (
    <section className={cn("dark flex", className)}>
      <div className="flex w-full items-center justify-center bg-background lg:w-1/2">
        <div className={cn("container my-10 flex w-[500px] flex-col gap-24", contentClassName)}>
          {renderBrand()}
          <div>
            {heading && (
              typeof heading === "string" ? (
                <h2 className={cn("text-4xl text-foreground lg:text-6xl", headingClassName)}>
                  {heading}
                </h2>
              ) : (
                <h2 className={cn("text-4xl text-foreground lg:text-6xl", headingClassName)}>
                  {heading}
                </h2>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("mt-2.5 text-foreground lg:text-xl", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )
            )}
            {renderAction()}
          </div>
          {renderAvatars()}
        </div>
      </div>
      {renderImage()}
    </section>
  );
}
