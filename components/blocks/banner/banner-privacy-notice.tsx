"use client";

import * as React from "react";
import { useState } from "react";

import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";

/**
 * Props for the BannerPrivacyNotice component
 */
export interface BannerPrivacyNoticeProps {
  /**
   * Banner title
   * @default "Privacy Policy Updated"
   */
  title?: string;
  /**
   * Banner description text
   * @default "We've updated our privacy policy to better protect your data. Please review the changes."
   */
  description?: string;
  /**
   * Review link text
   * @default "Review Changes"
   */
  linkText?: string;
  /**
   * Review link URL
   * @default "#"
   */
  linkUrl?: string;
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
 * BannerPrivacyNotice - A bottom-positioned privacy policy update notice.
 *
 * Features a fixed bottom position with shield icon, title, description, and review link.
 * Includes a dismiss button to close the banner. The banner is positioned at the bottom
 * of the viewport with a border-top styling. Ideal for privacy policy updates, legal notices,
 * and compliance notifications.
 *
 * @example
 * ```tsx
 * <BannerPrivacyNotice
 *   title="Privacy Policy Updated"
 *   description="We've made changes to how we handle your data."
 *   linkText="Read More"
 *   linkUrl="/privacy"
 *   onDismiss={() => console.log('Dismissed')}
 * />
 * ```
 */
export function BannerPrivacyNotice({
  title = "Privacy Policy Updated",
  description = "We've updated our privacy policy to better protect your data. Please review the changes.",
  linkText = "Review Changes",
  linkUrl = "#",
  onDismiss,
  className,
}: BannerPrivacyNoticeProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        "bg-background border-t fixed bottom-0 left-0 right-0 z-50",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4 max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-start gap-4">
          <DynamicIcon
            name="mynaui/shield"
            size={20}
            className="mt-0.5 shrink-0"
          />
          <div>
            <h3 className="font-semibold text-sm">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
            <Pressable
              href={linkUrl}
              variant="link"
              className="text-primary px-0 h-auto mt-2"
            >
              {linkText} →
            </Pressable>
          </div>
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
