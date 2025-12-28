"use client";

import * as React from "react";
import { useState } from "react";

import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";

/**
 * Props for the BannerAnnouncementDismissible component
 */
export interface BannerAnnouncementDismissibleProps {
  /**
   * Icon name in format: prefix/name (e.g., "mynaui/boat")
   * @default "mynaui/boat"
   */
  icon?: string;
  /**
   * Announcement message text
   * @default "Introducing our new AI-powered dashboard - Now available!"
   */
  message?: string;
  /**
   * CTA button text
   * @default "Learn More"
   */
  buttonText?: string;
  /**
   * CTA button link
   * @default "#"
   */
  buttonLink?: string;
  /**
   * Callback when banner is dismissed
   */
  onDismiss?: () => void;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * BannerAnnouncementDismissible - A top announcement banner with icon, message, CTA button, and dismiss button.
 *
 * Features a clean background with border-bottom styling, containing an icon, announcement text,
 * action button, and dismissible X button. The banner can be closed by the user and triggers
 * an optional callback. Ideal for product launches, feature announcements, and important updates.
 *
 * @example
 * ```tsx
 * <BannerAnnouncementDismissible
 *   icon="mynaui/rocket"
 *   message="New feature: AI-powered analytics is now live!"
 *   buttonText="Try It Now"
 *   buttonLink="/features/analytics"
 *   onDismiss={() => console.log('Banner dismissed')}
 * />
 * ```
 */
export function BannerAnnouncementDismissible({
  icon = "mynaui/boat",
  message = "Introducing our new AI-powered dashboard - Now available!",
  buttonText = "Learn More",
  buttonLink = "#",
  onDismiss,
  className,
}: BannerAnnouncementDismissibleProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={cn("bg-background border-b", className)}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <DynamicIcon name={icon} size={20} className="shrink-0" />
          <span className="font-medium text-sm">{message}</span>
          <Pressable
            href={buttonLink}
            variant="secondary"
            size="sm"
            asButton
          >
            {buttonText}
          </Pressable>
        </div>
        <Pressable
          onClick={handleDismiss}
          variant="outline"
          size="icon"
          asButton
          className="size-8"
        >
          <DynamicIcon name="mynaui/x" size={16} />
          <span className="sr-only">Dismiss banner</span>
        </Pressable>
      </div>
    </div>
  );
}
