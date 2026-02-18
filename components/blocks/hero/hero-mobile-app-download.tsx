"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
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
import { Badge } from "@/src";

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
  notificationSlot?: React.ReactNode; /**
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
  storeActions,
  storeActionsSlot,
  ratingValue,
  ratingLabel,
  starCount,
  ratingSlot,
  image,
  imageSlot,
  notification,
  notificationSlot,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  pattern,
  patternOpacity,
  className,
  contentClassName,
  headingClassName,
  description,
  descriptionClassName,
  imageClassName,
  optixFlowConfig,
}: HeroMobileAppDownloadProps): React.JSX.Element {
  const renderBadge = useMemo(() => {
    if (badgeSlot) return badgeSlot;

    return (
      <Badge className="px-4 py-1">
        {badgeIcon && <DynamicIcon name={badgeIcon} />}
        <span>{badgeText}</span>
      </Badge>
    );
  }, [badgeSlot, badgeIcon, badgeText]);

  const renderStoreActions = useMemo(() => {
    if (storeActionsSlot) return storeActionsSlot;
    if (!storeActions || storeActions.length === 0) return null;

    return (
      <div className="flex flex-col gap-4 sm:flex-row">
        {storeActions.map((action, index) => {
          const {
            storePrefix,
            storeName,
            storeIcon,
            className: actionClassName,
            ...pressableProps
          } = action;
          return (
            <Pressable
              key={index}
              asButton
              className={cn("h-fit", actionClassName)}
              {...pressableProps}
            >
              {storeIcon && <DynamicIcon name={storeIcon} size={20} />}
              <div className="text-left">
                {storePrefix && (
                  <div className="text-xs opacity-80">{storePrefix}</div>
                )}
                {storeName && <div className="font-semibold">{storeName}</div>}
              </div>
            </Pressable>
          );
        })}
      </div>
    );
  }, [storeActionsSlot, storeActions]);

  const renderRating = useMemo(() => {
    if (ratingSlot) return ratingSlot;
    if (!ratingValue || !ratingLabel || !starCount) return null;

    return (
      <div className="flex items-center gap-4 pt-4">
        <div className="flex items-center gap-1">
          {[...Array(starCount)].map((_, i) => (
            <DynamicIcon
              key={i}
              name="lucide/star"
              size={16}
              className="fill-current"
            />
          ))}
        </div>
        <span className="text-sm">
          {ratingValue} {ratingLabel}
        </span>
      </div>
    );
  }, [ratingSlot, starCount, ratingValue, ratingLabel]);

  const renderNotification = useMemo(() => {
    if (notificationSlot) return notificationSlot;
    if (!notification) return null;

    return (
      <div
        className={cn(
          "absolute -right-8 top-1/4 w-48 rounded-2xl p-4 shadow-lg",
        )}
      >
        <div className="flex items-center gap-3">
          {notification.icon && (
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full",
                notification.iconBgClass,
              )}
            >
              <DynamicIcon
                name={notification.icon}
                size={20}
                className={notification.iconColorClass}
              />
            </div>
          )}
          <div>
            {notification.title && (
              <div className="font-semibold ">{notification.title}</div>
            )}
            {notification.subtitle && (
              <div className="text-xs">{notification.subtitle}</div>
            )}
          </div>
        </div>
      </div>
    );
  }, [notificationSlot, notification]);

  const renderImage = useMemo(() => {
    if (imageSlot) return imageSlot;
    if (!image) return null;

    return (
      <div
        className={cn(
          "w-full h-full relative flex justify-center",
          imageClassName,
        )}
      >
        <div className="relative">
          <Img
            src={image.src}
            alt={image.alt}
            className={cn(
              "w-full h-full object-cover rounded-3xl shadow-2xl",
              image.className,
            )}
            optixFlowConfig={optixFlowConfig}
          />
          {renderNotification}
        </div>
      </div>
    );
  }, [imageSlot, image, imageClassName, optixFlowConfig, renderNotification]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="pt-8 md:pt-0">
        <div className="grid items-center gap-12 grid-cols-1 md:grid-cols-2 md:gap-20">
          <div className={cn("flex flex-col gap-8", contentClassName)}>
            {renderBadge}
            {heading &&
              (typeof heading === "string" ? (
                <h1
                  className={cn(
                    "text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance",
                    headingClassName,
                  )}
                >
                  {heading}
                </h1>
              ) : (
                <h1
                  className={cn(
                    "text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance",
                    headingClassName,
                  )}
                >
                  {heading}
                </h1>
              ))}
            {description &&
              (typeof description === "string" ? (
                <p className={cn("text-lg text-balance", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              ))}
            {renderStoreActions}
            {renderRating}
          </div>
          {renderImage}
        </div>
      </div>
    </Section>
  );
}
