"use client";

import * as React from "react";
import { useCallback, useMemo, useState } from "react";

import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { ActionConfig, SectionBackground } from "../../../src/types";

/**
 * Props for the BannerPrivacyNotice component
 */
export interface BannerPrivacyNoticeProps {
  /**
   * Icon to display (ReactNode for full flexibility)
   */
  icon?: React.ReactNode;
  /**
   * Icon name for DynamicIcon (used if icon prop is not provided)
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
  /**
   * Background style variant
   * @default "default"
   */
  background?: SectionBackground;
  /** Optional Section ID */
  sectionId?: string;
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
 *   actions={[{ label: "Read More →", href: "/privacy", variant: "link" }]}
 *   onDismiss={() => console.log('Dismissed')}
 * />
 * ```
 */
export function BannerPrivacyNotice({
  sectionId = "banner-privacy-notice",
  icon,
  iconName,
  title,
  description,
  actions,
  actionsSlot,
  onDismiss,
  dismissIcon,
  dismissAriaLabel,
  background = "default",
  className,
  containerClassName,
  contentClassName,
  iconClassName,
  titleClassName,
  descriptionClassName,
  actionsClassName,
  dismissButtonClassName,
}: BannerPrivacyNoticeProps) {
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
        className={cn("mt-0.5 shrink-0", iconClassName)}
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

  const titleContent = useMemo(() => {
    if (!title) return null;
    return typeof title === "string" ? (
      <h3 className={cn("font-semibold text-sm", titleClassName)}>{title}</h3>
    ) : (
      <div className={titleClassName}>{title}</div>
    );
  }, [title, titleClassName]);

  const descriptionContent = useMemo(() => {
    if (!description) return null;
    return typeof description === "string" ? (
      <p className={cn("text-sm text-muted-foreground mt-1", descriptionClassName)}>
        {description}
      </p>
    ) : (
      <div className={cn("text-sm text-muted-foreground mt-1", descriptionClassName)}>
        {description}
      </div>
    );
  }, [description, descriptionClassName]);

  if (!isVisible) {
    return null;
  }

  return (
    <Section
      id={sectionId} background={background} spacing="none" className={cn("border-t fixed bottom-0 left-0 right-0 z-50", className)}>
      <div className={cn("flex items-start justify-between gap-4 max-w-7xl mx-auto px-4 py-4", containerClassName)}>
        <div className={cn("flex items-start gap-4", contentClassName)}>
          {iconContent}
          <div>
            {titleContent}
            {descriptionContent}
            {(actionsSlot || (actions && actions.length > 0)) && (
              <div className={actionsClassName}>
                {actionsContent}
              </div>
            )}
          </div>
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
    </Section>
  );
}
