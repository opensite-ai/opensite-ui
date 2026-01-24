"use client";

import * as React from "react";
import { useCallback, useMemo, useState } from "react";

import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type { ActionConfig } from "../../../src/types";

/**
 * Props for the BannerAnnouncementDismissible component
 */
export interface BannerAnnouncementDismissibleProps {
  /**
   * Icon to display (ReactNode for full flexibility)
   */
  icon?: React.ReactNode;
  /**
   * Icon name for DynamicIcon (used if icon prop is not provided)
   */
  iconName?: string;
  /**
   * Announcement message content
   */
  message?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Callback when banner is dismissed
   */
  onDismiss?: () => void;
  /**
   * Dismiss button icon (ReactNode for full flexibility)
   */
  dismissIcon?: React.ReactNode;
  /**
   * ARIA label for dismiss button
   */
  dismissAriaLabel?: string;
  /**
   * Additional CSS classes for the banner container
   */
  className?: string;
  /**
   * Additional CSS classes for the inner container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the icon
   */
  iconClassName?: string;
  /**
   * Additional CSS classes for the message
   */
  messageClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the dismiss button
   */
  dismissButtonClassName?: string;
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
 *   iconName="mynaui/rocket"
 *   message="New feature: AI-powered analytics is now live!"
 *   actions={[{ label: "Try It Now", href: "/features/analytics", variant: "secondary", size: "sm" }]}
 *   onDismiss={() => console.log('Banner dismissed')}
 * />
 * ```
 */
export function BannerAnnouncementDismissible({
  icon,
  iconName,
  message,
  actions,
  actionsSlot,
  onDismiss,
  dismissIcon,
  dismissAriaLabel,
  className,
  containerClassName,
  contentClassName,
  iconClassName,
  messageClassName,
  actionsClassName,
  dismissButtonClassName,
}: BannerAnnouncementDismissibleProps) {
  const [isVisible, setIsVisible] = useState(true);
  const dismissLabel = dismissAriaLabel ?? "Dismiss banner";

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    onDismiss?.();
  }, [onDismiss]);

  const actionsContent = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
      const {
        label,
        icon: actionIcon,
        iconAfter,
        children,
        className: actionClassName,
        ...pressableProps
      } = action;
      return (
        <Pressable
          key={index}
          asButton
          className={actionClassName}
          {...pressableProps}
        >
          {children ?? (
            <>
              {actionIcon}
              {label}
              {iconAfter}
            </>
          )}
        </Pressable>
      );
    });
  }, [actions, actionsSlot]);

  const iconContent = useMemo(() => {
    if (icon) return icon;
    if (!iconName) return null;
    return (
      <DynamicIcon
        name={iconName}
        size={20}
        className={cn("shrink-0", iconClassName)}
      />
    );
  }, [icon, iconName, iconClassName]);

  const dismissIconContent = useMemo(() => {
    if (dismissIcon) return dismissIcon;
    return <DynamicIcon name="mynaui/x" size={16} />;
  }, [dismissIcon]);

  const messageContent = useMemo(() => {
    if (!message) return null;
    return typeof message === "string" ? (
      <span className={cn("font-medium text-sm", messageClassName)}>
        {message}
      </span>
    ) : (
      <div className={messageClassName}>{message}</div>
    );
  }, [message, messageClassName]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={cn("bg-background border-b", className)}>
      <div className={cn("max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2", containerClassName)}>
        <div className={cn("flex items-center gap-4", contentClassName)}>
          {iconContent}
          {messageContent}
          {(actionsSlot || (actions && actions.length > 0)) && (
            <div className={actionsClassName}>
              {actionsContent}
            </div>
          )}
        </div>
        <Pressable
          onClick={handleDismiss}
          variant="outline"
          size="icon"
          asButton
          className={cn("size-8", dismissButtonClassName)}
        >
          {dismissIconContent}
          <span className="sr-only">{dismissLabel}</span>
        </Pressable>
      </div>
    </div>
  );
}
