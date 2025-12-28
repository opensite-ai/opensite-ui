"use client";

import * as React from "react";
import { useState } from "react";

import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type { ActionConfig } from "../../../src/types";

/**
 * Props for the BannerGdprRights component
 */
export interface BannerGdprRightsProps {
  /**
   * Icon to display (ReactNode for full flexibility)
   */
  icon?: React.ReactNode;
  /**
   * Icon name for DynamicIcon (used if icon prop is not provided)
   * @default "mynaui/globe"
   */
  iconName?: string;
  /**
   * Banner title content
   */
  title?: React.ReactNode;
  /**
   * Banner description content
   */
  description?: React.ReactNode;
  /**
   * Array of action configurations for links/buttons
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
   * @default "Dismiss banner"
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
   * Additional CSS classes for the dismiss button
   */
  dismissButtonClassName?: string;
}

const defaultActions: ActionConfig[] = [
  {
    label: "Manage your data →",
    href: "#",
    variant: "link",
    className: "p-0 h-auto ml-1",
  },
];

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
 *   actions={[{ label: "Manage Data →", href: "/privacy/manage", variant: "link" }]}
 *   onDismiss={() => console.log('Dismissed')}
 * />
 * ```
 */
export function BannerGdprRights({
  icon,
  iconName = "mynaui/globe",
  title = "Your Privacy Rights",
  description = "Under GDPR, you have the right to access, update, or delete your personal data.",
  actions = defaultActions,
  actionsSlot,
  onDismiss,
  dismissIcon,
  dismissAriaLabel = "Dismiss banner",
  className,
  containerClassName,
  contentClassName,
  iconClassName,
  titleClassName,
  descriptionClassName,
  actionsClassName,
  dismissButtonClassName,
}: BannerGdprRightsProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  const renderIcon = () => {
    if (icon) return icon;
    return (
      <DynamicIcon
        name={iconName}
        size={20}
        className={cn("text-muted-foreground mt-0.5 shrink-0", iconClassName)}
      />
    );
  };

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
      const { label, icon: actionIcon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
      return (
        <Pressable
          key={index}
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
  };

  const renderDismissIcon = () => {
    if (dismissIcon) return dismissIcon;
    return <DynamicIcon name="mynaui/x" size={16} />;
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
      <div className={cn("flex items-start justify-between gap-4 max-w-7xl mx-auto px-4 py-4", containerClassName)}>
        <div className={cn("flex items-start gap-3", contentClassName)}>
          {renderIcon()}
          <div>
            {title && (
              typeof title === "string" ? (
                <h3 className={cn("font-semibold text-sm", titleClassName)}>{title}</h3>
              ) : (
                <div className={titleClassName}>{title}</div>
              )
            )}
            <p className={cn("text-sm text-muted-foreground mt-1", descriptionClassName)}>
              {description}
              {(actionsSlot || (actions && actions.length > 0)) && (
                <span className={actionsClassName}>
                  {renderActions()}
                </span>
              )}
            </p>
          </div>
        </div>
        <Pressable
          onClick={handleDismiss}
          variant="ghost"
          size="icon"
          asButton
          className={cn("size-8", dismissButtonClassName)}
        >
          {renderDismissIcon()}
          <span className="sr-only">{dismissAriaLabel}</span>
        </Pressable>
      </div>
    </div>
  );
}
