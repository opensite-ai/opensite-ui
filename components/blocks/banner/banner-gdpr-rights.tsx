"use client";

import * as React from "react";
import { useState } from "react";

import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";

/**
 * Props for the BannerGdprRights component
 */
export interface BannerGdprRightsProps {
  /**
   * Banner title
   * @default "Your Privacy Rights"
   */
  title?: string;
  /**
   * Banner description text
   * @default "Under GDPR, you have the right to access, update, or delete your personal data."
   */
  description?: string;
  /**
   * Manage data link text
   * @default "Manage your data"
   */
  linkText?: string;
  /**
   * Manage data link URL
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
 * BannerGdprRights - A bottom-positioned GDPR privacy rights notice.
 *
 * Features a fixed bottom position with globe icon, title, description, and manage data link.
 * Includes a dismiss button to close the banner. The banner is positioned at the bottom
 * of the viewport with a border-top styling. Ideal for GDPR compliance, data privacy notices,
 * and user rights information.
 *
 * @example
 * ```tsx
 * <BannerGdprRights
 *   title="Your Privacy Rights"
 *   description="You can request access to or deletion of your personal data at any time."
 *   linkText="Manage Data"
 *   linkUrl="/privacy/manage"
 *   onDismiss={() => console.log('Dismissed')}
 * />
 * ```
 */
export function BannerGdprRights({
  title = "Your Privacy Rights",
  description = "Under GDPR, you have the right to access, update, or delete your personal data.",
  linkText = "Manage your data",
  linkUrl = "#",
  onDismiss,
  className,
}: BannerGdprRightsProps) {
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
        <div className="flex items-start gap-3">
          <DynamicIcon
            name="mynaui/globe"
            size={20}
            className="text-muted-foreground mt-0.5 shrink-0"
          />
          <div>
            <h3 className="font-semibold text-sm">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {description}
              <Pressable
                href={linkUrl}
                variant="link"
                className="p-0 h-auto ml-1"
              >
                {linkText} →
              </Pressable>
            </p>
          </div>
        </div>
        <Pressable
          onClick={handleDismiss}
          variant="ghost"
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
