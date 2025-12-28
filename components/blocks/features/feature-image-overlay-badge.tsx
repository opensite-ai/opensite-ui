"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Img } from "@page-speed/img";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface FeatureImageOverlayBadgeProps {
  /**
   * Badge text
   */
  badge?: string;
  /**
   * Main heading text
   */
  title?: string;
  /**
   * Supporting description text
   */
  description?: string;
  /**
   * Button text
   */
  buttonText?: string;
  /**
   * Button link URL
   */
  buttonLink?: string;
  /**
   * Image source URL
   */
  imageSrc?: string;
  /**
   * Image alt text
   */
  imageAlt?: string;
  /**
   * Avatar image URL
   */
  avatarSrc?: string;
  /**
   * Avatar badge text
   */
  avatarBadgeText?: string;
  /**
   * Overlay title text
   */
  overlayTitle?: string;
  /**
   * Overlay link text
   */
  overlayLinkText?: string;
  /**
   * Overlay link URL
   */
  overlayLinkUrl?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

/**
 * Feature Image Overlay Badge - Two-column layout with content and an image
 * featuring gradient overlay with avatar badge and CTA.
 *
 * Layout: Two-column grid with content on left, image with overlay on right.
 * Key features: Gradient overlay, avatar badge, floating CTA, responsive layout.
 * Best for: Hero features, product highlights, team showcases.
 *
 * @example
 * ```tsx
 * <FeatureImageOverlayBadge
 *   badge="Modern Tactics"
 *   title="Make your site a true standout."
 *   description="Discover new web trends."
 *   buttonText="View Features"
 *   imageSrc="/feature.jpg"
 *   avatarSrc="/avatar.jpg"
 *   avatarBadgeText="Tailored for experts"
 *   overlayTitle="Elevate your platform"
 *   overlayLinkText="Explore all features"
 * />
 * ```
 */
export function FeatureImageOverlayBadge({
  badge = "Modern Tactics",
  title = "Make your site a true standout.",
  description = "Discover new web trends that help you craft sleek, highly functional sites that drive traffic and convert leads into customers.",
  buttonText = "View Features",
  buttonLink = "#",
  imageSrc = blockBrandedIconsAndPlaceholders.placeholder1,
  imageAlt = "Feature illustration",
  avatarSrc = blockBrandedIconsAndPlaceholders.avatar1,
  avatarBadgeText = "Tailored for experts",
  overlayTitle = "Elevate your platform to the next level.",
  overlayLinkText = "Explore all features",
  overlayLinkUrl = "#",
  className,
  optixFlowConfig,
}: FeatureImageOverlayBadgeProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid place-items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            {badge && (
              <Badge variant="outline" className="w-fit bg-background">
                {badge}
              </Badge>
            )}
            {title && (
              <h3 className="text-3xl font-semibold lg:text-5xl">{title}</h3>
            )}
            {description && (
              <p className="text-muted-foreground lg:text-lg">{description}</p>
            )}
            <Pressable
              href={buttonLink}
              variant="default"
              size="lg"
              asButton
              className="mt-2.5 w-fit gap-2"
            >
              {buttonText}
              <DynamicIcon name="lucide/menu" size={16} />
            </Pressable>
          </div>
          <div className="relative rounded-xl">
            <Img
              src={imageSrc}
              alt={imageAlt}
              className="rounded-xl object-cover md:aspect-video lg:aspect-auto"
              loading="lazy"
              optixFlowConfig={optixFlowConfig}
            />
            <div className="absolute top-0 right-0 bottom-0 left-0 rounded-xl bg-gradient-to-t from-primary via-transparent to-transparent"></div>
            <div className="absolute top-0 flex h-full w-full flex-col justify-between p-7">
              <span className="ml-auto flex w-fit items-center gap-2 rounded-full bg-background/30 px-4 py-2.5 text-sm font-semibold backdrop-blur-sm">
                <Avatar className="size-7 rounded-full">
                  <AvatarImage src={avatarSrc} alt="Avatar" />
                </Avatar>
                {avatarBadgeText}
              </span>
              <div className="flex flex-col gap-5 text-background">
                <h4 className="text-lg font-semibold lg:text-3xl">
                  {overlayTitle}
                </h4>
                <Pressable
                  href={overlayLinkUrl}
                  className="flex items-center gap-1 font-medium"
                >
                  {overlayLinkText}
                  <DynamicIcon name="lucide/chevron-right" size={16} />
                </Pressable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
