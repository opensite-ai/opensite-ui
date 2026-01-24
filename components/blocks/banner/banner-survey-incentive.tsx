"use client";

import * as React from "react";
import { useCallback, useMemo, useState } from "react";

import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type { ActionConfig } from "../../../src/types";

/**
 * Props for the BannerSurveyIncentive component
 */
export interface BannerSurveyIncentiveProps {
  /**
   * Icon to display (ReactNode for full flexibility)
   */
  icon?: React.ReactNode;
  /**
   * Icon name for DynamicIcon (used if icon prop is not provided)
   */
  iconName?: string;
  /**
   * Main message title content
   */
  title?: React.ReactNode;
  /**
   * Description content with incentive offer
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
   * Additional CSS classes for the text wrapper
   */
  textClassName?: string;
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

/**
 * BannerSurveyIncentive - A survey invitation banner with shopping bag icon and incentive offer.
 *
 * Features a clean background with border-bottom styling, containing a shopping bag icon,
 * message with incentive offer, action button, and dismiss button. The layout is responsive
 * with the icon hidden on mobile. Ideal for customer feedback collection, survey invitations,
 * and engagement campaigns with discount incentives.
 *
 * @example
 * ```tsx
 * <BannerSurveyIncentive
 *   title="Share your feedback!"
 *   description="Complete our quick survey and receive a 15% discount code."
 *   actions={[{ label: "Start Survey", href: "/survey", size: "sm" }]}
 *   onDismiss={() => console.log('Dismissed')}
 * />
 * ```
 */
export function BannerSurveyIncentive({
  icon,
  iconName,
  title,
  description,
  actions,
  actionsSlot,
  onDismiss,
  dismissIcon,
  dismissAriaLabel,
  className,
  containerClassName,
  contentClassName,
  iconClassName,
  textClassName,
  titleClassName,
  descriptionClassName,
  actionsClassName,
  dismissButtonClassName,
}: BannerSurveyIncentiveProps) {
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
        className={cn("shrink-0 hidden md:block", iconClassName)}
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

  const titleContent = useMemo(() => {
    if (!title) return null;
    return typeof title === "string" ? (
      <span className={cn("font-medium", titleClassName)}>{title}</span>
    ) : (
      <span className={titleClassName}>{title}</span>
    );
  }, [title, titleClassName]);

  const descriptionContent = useMemo(() => {
    if (!description) return null;
    return typeof description === "string" ? (
      <span className={cn("text-muted-foreground", descriptionClassName)}>
        {description}
      </span>
    ) : (
      <span className={descriptionClassName}>{description}</span>
    );
  }, [description, descriptionClassName]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={cn("bg-background border-b text-sm", className)}>
      <div className={cn("flex md:items-center justify-between max-w-7xl mx-auto px-4 py-4", containerClassName)}>
        <div className={cn("flex items-center gap-2", contentClassName)}>
          {iconContent}
          <div className={cn("flex flex-col md:flex-row gap-1", textClassName)}>
            {titleContent}
            {descriptionContent}
          </div>
        </div>
        <div className={cn("flex gap-2", actionsClassName)}>
          {actionsContent}
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
    </div>
  );
}
