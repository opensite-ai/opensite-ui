"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { ActionConfig, ImageItem, OptixFlowConfig } from "../../../src/types";

export interface AppStoreAction extends ActionConfig {
  /**
   * Store label prefix (e.g., "Download on the")
   */
  storePrefix?: string;
  /**
   * Store name (e.g., "App Store")
   */
  storeName?: string;
  /**
   * Store icon name
   */
  storeIcon?: string;
}

export interface NotificationItem {
  /**
   * Notification icon name
   */
  icon?: string;
  /**
   * Icon background class
   */
  iconBgClass?: string;
  /**
   * Icon color class
   */
  iconColorClass?: string;
  /**
   * Notification title
   */
  title?: string;
  /**
   * Notification subtitle
   */
  subtitle?: string;
}

export interface HeroMobileAppDownloadProps {
  /**
   * Badge text
   */
  badgeText?: React.ReactNode;
  /**
   * Badge icon name
   */
  badgeIcon?: string;
  /**
   * Custom slot for badge (overrides badge props)
   */
  badgeSlot?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Array of app store action configurations
   */
  storeActions?: AppStoreAction[];
  /**
   * Custom slot for store actions (overrides storeActions array)
   */
  storeActionsSlot?: React.ReactNode;
  /**
   * Rating value (e.g., "4.9")
   */
  ratingValue?: string;
  /**
   * Rating label (e.g., "rating from 50K+ reviews")
   */
  ratingLabel?: React.ReactNode;
  /**
   * Number of stars to display
   */
  starCount?: number;
  /**
   * Custom slot for rating section (overrides rating props)
   */
  ratingSlot?: React.ReactNode;
  /**
   * Mobile app screenshot image
   */
  image?: ImageItem;
  /**
   * Custom slot for image (overrides image prop)
   */
  imageSlot?: React.ReactNode;
  /**
   * Notification popup configuration
   */
  notification?: NotificationItem;
  /**
   * Custom slot for notification (overrides notification prop)
   */
  notificationSlot?: React.ReactNode;
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
   * Additional CSS classes for the image container
   */
  imageClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroMobileAppDownload({
  badgeText,
  badgeIcon,
  badgeSlot,
  heading,
  description,
  storeActions,
  storeActionsSlot,
  ratingValue = "4.9",
  ratingLabel = "rating from 50K+ reviews",
  starCount = 5,
  ratingSlot,
  image,
  imageSlot,
  notification,
  notificationSlot,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  imageClassName,
  optixFlowConfig,
}: HeroMobileAppDownloadProps): React.JSX.Element {
  const renderBadge = () => {
    if (badgeSlot) return badgeSlot;

    return (
      <div className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
        {badgeIcon && <DynamicIcon name={badgeIcon} size={16} />}
        <span>{badgeText}</span>
      </div>
    );
  };

  const renderStoreActions = () => {
    if (storeActionsSlot) return storeActionsSlot;
    if (!storeActions || storeActions.length === 0) return null;

    return (
      <div className="flex flex-col gap-4 sm:flex-row">
        {storeActions.map((action, index) => {
          const { storePrefix, storeName, storeIcon, className: actionClassName, ...pressableProps } = action;
          return (
            <Pressable
              key={index}
              asButton
              className={actionClassName}
              {...pressableProps}
            >
              {storeIcon && <DynamicIcon name={storeIcon} size={20} />}
              <div className="text-left">
                {storePrefix && <div className="text-xs opacity-80">{storePrefix}</div>}
                {storeName && <div className="font-semibold">{storeName}</div>}
              </div>
            </Pressable>
          );
        })}
      </div>
    );
  };

  const renderRating = () => {
    if (ratingSlot) return ratingSlot;

    return (
      <div className="flex items-center gap-4 pt-4">
        <div className="flex items-center gap-1">
          {[...Array(starCount)].map((_, i) => (
            <DynamicIcon key={i} name="lucide/star" size={16} className="fill-primary text-primary" />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {ratingValue} {ratingLabel}
        </span>
      </div>
    );
  };

  const renderNotification = () => {
    if (notificationSlot) return notificationSlot;
    if (!notification) return null;

    return (
      <div className="absolute -right-8 top-1/4 w-48 rounded-2xl bg-background p-4 shadow-lg">
        <div className="flex items-center gap-3">
          {notification.icon && (
            <div className={cn("flex h-10 w-10 items-center justify-center rounded-full", notification.iconBgClass)}>
              <DynamicIcon name={notification.icon} size={20} className={notification.iconColorClass} />
            </div>
          )}
          <div>
            {notification.title && <div className="font-semibold text-foreground">{notification.title}</div>}
            {notification.subtitle && <div className="text-xs text-muted-foreground">{notification.subtitle}</div>}
          </div>
        </div>
      </div>
    );
  };

  const renderImage = () => {
    if (imageSlot) return imageSlot;
    if (!image) return null;

    return (
      <div className={cn("relative flex justify-center", imageClassName)}>
        <div className="relative">
          <Img
            src={image.src}
            alt={image.alt}
            className={cn("w-64 rounded-3xl shadow-2xl", image.className)}
            optixFlowConfig={optixFlowConfig}
          />
          {renderNotification()}
        </div>
      </div>
    );
  };

  return (
    <section className={cn("bg-background py-20 md:py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className={cn("flex flex-col gap-8", contentClassName)}>
            {renderBadge()}
            {heading && (
              typeof heading === "string" ? (
                <h1 className={cn("text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl", headingClassName)}>
                  {heading}
                </h1>
              ) : (
                <h1 className={cn("text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl", headingClassName)}>
                  {heading}
                </h1>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("text-lg text-muted-foreground", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )
            )}
            {renderStoreActions()}
            {renderRating()}
          </div>
          {renderImage()}
        </div>
      </div>
    </section>
  );
}
