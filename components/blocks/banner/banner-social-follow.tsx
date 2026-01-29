"use client";

import * as React from "react";
import { useCallback, useMemo, useState } from "react";

import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type { ActionConfig } from "../../../src/types";

/**
 * Props for the BannerSocialFollow component
 */
export interface BannerSocialFollowProps {
  /**
   * Icon to display (ReactNode for full flexibility)
   */
  icon?: React.ReactNode;
  /**
   * Icon name for DynamicIcon (used if icon prop is not provided)
   */
  iconName?: string;
  /**
   * Banner message content
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
 * BannerSocialFollow - A gradient background banner encouraging social media follows.
 *
 * Features a vibrant pink-to-rose gradient background with white text, users icon,
 * follow CTA button, and dismiss button. The layout is centered with responsive text alignment.
 * Ideal for social media promotion, community building, and engagement campaigns.
 *
 * @example
 * ```tsx
 * <BannerSocialFollow
 *   message="Join our community of 50,000+ developers!"
 *   actions={[{ label: "Follow Now", href: "https://twitter.com/example", variant: "secondary", size: "sm" }]}
 *   onDismiss={() => console.log('Dismissed')}
 * />
 * ```
 */
export function BannerSocialFollow({
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
  iconClassName,
  messageClassName,
  actionsClassName,
  dismissButtonClassName,
}: BannerSocialFollowProps) {
  const [isVisible, setIsVisible] = useState(true);
  const dismissLabel = dismissAriaLabel ?? "Dismiss banner";

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    onDismiss?.();
  }, [onDismiss]);

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

  const dismissIconContent = useMemo(() => {
    if (dismissIcon) return dismissIcon;
    return <DynamicIcon name="mynaui/x" size={16} />;
  }, [dismissIcon]);

  const messageContent = useMemo(() => {
    if (!message) return null;
    return typeof message === "string" ? (
      <span className={cn("font-medium", messageClassName)}>{message}</span>
    ) : (
      <span className={messageClassName}>{message}</span>
    );
  }, [message, messageClassName]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        "bg-primary text-primary-foreground",
        className
      )}
    >
      <div className={cn("max-w-7xl mx-auto px-3 py-3 flex items-center justify-center text-left md:text-center gap-2", containerClassName)}>
        {iconContent}
        {messageContent}
        {(actionsSlot || (actions && actions.length > 0)) && (
          <span className={actionsClassName}>
            {actionsContent}
          </span>
        )}
        <Pressable
          onClick={handleDismiss}
          variant="ghost"
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
