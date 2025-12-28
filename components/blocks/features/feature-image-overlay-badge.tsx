"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Img } from "@page-speed/img";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import type { ActionConfig, OptixFlowConfig } from "../../../src/types";

export interface FeatureImageOverlayBadgeProps {
  /**
   * Badge content
   */
  badge?: React.ReactNode;
  /**
   * Main heading content
   */
  title?: React.ReactNode;
  /**
   * Supporting description content
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
   * Image source URL
   */
  imageSrc?: string;
  /**
   * Image alt text
   */
  imageAlt?: string;
  /**
   * Custom slot for image (overrides imageSrc)
   */
  imageSlot?: React.ReactNode;
  /**
   * Avatar image URL
   */
  avatarSrc?: string;
  /**
   * Avatar badge text content
   */
  avatarBadgeText?: React.ReactNode;
  /**
   * Overlay title content
   */
  overlayTitle?: React.ReactNode;
  /**
   * Overlay link text content
   */
  overlayLinkText?: React.ReactNode;
  /**
   * Overlay link URL
   */
  overlayLinkUrl?: string;
  /**
   * onClick handler for overlay link
   */
  overlayLinkOnClick?: () => void;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for the content area
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the image wrapper
   */
  imageWrapperClassName?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for the overlay
   */
  overlayClassName?: string;
  /**
   * Additional CSS classes for the avatar badge
   */
  avatarBadgeClassName?: string;
  /**
   * Additional CSS classes for the overlay title
   */
  overlayTitleClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultActions: ActionConfig[] = [
  {
    label: "View Features",
    href: "#",
    variant: "default",
    size: "lg",
    iconAfter: <DynamicIcon name="lucide/menu" size={16} />,
  },
];

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
 *   actions={[{ label: "View Features", href: "#", variant: "default" }]}
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
  actions = defaultActions,
  actionsSlot,
  imageSrc = blockBrandedIconsAndPlaceholders.placeholder1,
  imageAlt = "Feature illustration",
  imageSlot,
  avatarSrc = blockBrandedIconsAndPlaceholders.avatar1,
  avatarBadgeText = "Tailored for experts",
  overlayTitle = "Elevate your platform to the next level.",
  overlayLinkText = "Explore all features",
  overlayLinkUrl = "#",
  overlayLinkOnClick,
  className,
  containerClassName,
  gridClassName,
  contentClassName,
  badgeClassName,
  titleClassName,
  descriptionClassName,
  actionsClassName,
  imageWrapperClassName,
  imageClassName,
  overlayClassName,
  avatarBadgeClassName,
  overlayTitleClassName,
  optixFlowConfig,
}: FeatureImageOverlayBadgeProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
      if (action.children) {
        return (
          <Pressable
            key={index}
            href={action.href}
            onClick={action.onClick}
            variant={action.variant}
            size={action.size}
            className={cn("mt-2.5 w-fit gap-2", action.className)}
            aria-label={action["aria-label"]}
            asButton
          >
            {action.children}
          </Pressable>
        );
      }

      return (
        <Pressable
          key={index}
          href={action.href}
          onClick={action.onClick}
          variant={action.variant}
          size={action.size}
          className={cn("mt-2.5 w-fit gap-2", action.className)}
          aria-label={action["aria-label"]}
          asButton
        >
          {action.icon}
          {action.label}
          {action.iconAfter}
        </Pressable>
      );
    });
  };

  const renderImage = () => {
    if (imageSlot) return imageSlot;
    if (imageSrc) {
      return (
        <Img
          src={imageSrc}
          alt={imageAlt}
          className={cn("rounded-xl object-cover md:aspect-video lg:aspect-auto", imageClassName)}
          loading="lazy"
          optixFlowConfig={optixFlowConfig}
        />
      );
    }
    return null;
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className={cn("grid place-items-center gap-10 lg:grid-cols-2", gridClassName)}>
          <div className={cn("flex flex-col gap-5", contentClassName)}>
            {badge && (
              <Badge variant="outline" className={cn("w-fit bg-background", badgeClassName)}>
                {badge}
              </Badge>
            )}
            {title && (
              typeof title === "string" ? (
                <h3 className={cn("text-3xl font-semibold lg:text-5xl", titleClassName)}>{title}</h3>
              ) : (
                <div className={cn("text-3xl font-semibold lg:text-5xl", titleClassName)}>{title}</div>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("text-muted-foreground lg:text-lg", descriptionClassName)}>{description}</p>
              ) : (
                <div className={cn("text-muted-foreground lg:text-lg", descriptionClassName)}>{description}</div>
              )
            )}
            <div className={actionsClassName}>
              {renderActions()}
            </div>
          </div>
          <div className={cn("relative rounded-xl", imageWrapperClassName)}>
            {renderImage()}
            <div className={cn("absolute top-0 right-0 bottom-0 left-0 rounded-xl bg-linear-to-t from-primary via-transparent to-transparent", overlayClassName)}></div>
            <div className="absolute top-0 flex h-full w-full flex-col justify-between p-7">
              <span className={cn("ml-auto flex w-fit items-center gap-2 rounded-full bg-background/30 px-4 py-2.5 text-sm font-semibold backdrop-blur-sm", avatarBadgeClassName)}>
                <Avatar className="size-7 rounded-full">
                  <AvatarImage src={avatarSrc} alt="Avatar" />
                </Avatar>
                {avatarBadgeText}
              </span>
              <div className="flex flex-col gap-5 text-background">
                {overlayTitle && (
                  typeof overlayTitle === "string" ? (
                    <h4 className={cn("text-lg font-semibold lg:text-3xl", overlayTitleClassName)}>
                      {overlayTitle}
                    </h4>
                  ) : (
                    <div className={cn("text-lg font-semibold lg:text-3xl", overlayTitleClassName)}>
                      {overlayTitle}
                    </div>
                  )
                )}
                {overlayLinkText && (
                  <Pressable
                    href={overlayLinkUrl}
                    onClick={overlayLinkOnClick}
                    className="flex items-center gap-1 font-medium"
                  >
                    {overlayLinkText}
                    <DynamicIcon name="lucide/chevron-right" size={16} />
                  </Pressable>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
