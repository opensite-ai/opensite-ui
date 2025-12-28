"use client";

import * as React from "react";
import { useState, useEffect } from "react";

import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type { ActionConfig } from "../../../src/types";

/**
 * Props for the BannerFloatingOffer component
 */
export interface BannerFloatingOfferProps {
  /**
   * Offer title content
   */
  offerTitle?: React.ReactNode;
  /**
   * Offer description content
   */
  offerDescription?: React.ReactNode;
  /**
   * Separator element between title and description
   */
  separator?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Controlled visibility state (use with onOpenChange for controlled mode)
   */
  open?: boolean;
  /**
   * Default visibility state for uncontrolled mode
   * @default true
   */
  defaultOpen?: boolean;
  /**
   * Callback when visibility changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Whether the banner can be dismissed
   * @default false
   */
  dismissible?: boolean;
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
   * Additional CSS classes for the text content
   */
  textClassName?: string;
  /**
   * Additional CSS classes for the offer title
   */
  offerTitleClassName?: string;
  /**
   * Additional CSS classes for the separator
   */
  separatorClassName?: string;
  /**
   * Additional CSS classes for the offer description
   */
  offerDescriptionClassName?: string;
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
    label: "Get started",
    href: "#",
    variant: "secondary",
    size: "sm",
    iconAfter: <DynamicIcon name="lucide/arrow-right" size={16} />,
  },
];

/**
 * BannerFloatingOffer - A floating bottom banner with rounded corners and offer CTA.
 *
 * Features a fixed bottom position with primary background, rounded container on larger screens,
 * offer text with bold title, dot separator, description, and a secondary-styled CTA button
 * with arrow icon. The banner floats above content and can optionally be dismissed.
 * Ideal for limited-time offers, conversion prompts, and persistent CTAs.
 *
 * @example
 * ```tsx
 * <BannerFloatingOffer
 *   offerTitle="Black Friday Special"
 *   offerDescription="Save 60% on annual plans - ends tonight!"
 *   actions={[{ label: "Claim Offer", href: "/pricing", variant: "secondary", size: "sm" }]}
 *   dismissible={true}
 *   onOpenChange={(open) => console.log('Visibility:', open)}
 * />
 * ```
 */
export function BannerFloatingOffer({
  offerTitle = "Limited time offer",
  offerDescription = "Get 50% off for your first month",
  separator,
  actions = defaultActions,
  actionsSlot,
  open,
  defaultOpen = true,
  onOpenChange,
  dismissible = false,
  dismissIcon,
  dismissAriaLabel = "Dismiss banner",
  className,
  containerClassName,
  textClassName,
  offerTitleClassName,
  separatorClassName,
  offerDescriptionClassName,
  actionsClassName,
  dismissButtonClassName,
}: BannerFloatingOfferProps) {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isVisible = isControlled ? open : internalOpen;

  useEffect(() => {
    if (!isControlled && defaultOpen !== internalOpen) {
      setInternalOpen(defaultOpen);
    }
  }, [defaultOpen, isControlled, internalOpen]);

  const handleDismiss = () => {
    if (!isControlled) {
      setInternalOpen(false);
    }
    onOpenChange?.(false);
  };

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
      const { label, icon: actionIcon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
      return (
        <Pressable
          key={index}
          asButton
          className={cn("flex items-center gap-x-1", actionClassName)}
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

  const renderSeparator = () => {
    if (separator) return separator;
    return (
      <svg
        viewBox="0 0 2 2"
        className={cn("mx-2 inline h-0.5 w-0.5 fill-current", separatorClassName)}
        aria-hidden="true"
      >
        <circle cx={1} cy={1} r={1} />
      </svg>
    );
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
        "pointer-events-none fixed inset-x-0 bottom-0 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8 z-50",
        className
      )}
    >
      <div className={cn("pointer-events-auto flex items-center justify-between gap-x-6 bg-primary px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5", containerClassName)}>
        <p className={cn("text-sm leading-6 text-primary-foreground", textClassName)}>
          {offerTitle && (
            typeof offerTitle === "string" ? (
              <strong className={cn("font-semibold", offerTitleClassName)}>{offerTitle}</strong>
            ) : (
              <span className={offerTitleClassName}>{offerTitle}</span>
            )
          )}
          {renderSeparator()}
          {offerDescription && (
            typeof offerDescription === "string" ? (
              <span className={offerDescriptionClassName}>{offerDescription}</span>
            ) : (
              <span className={offerDescriptionClassName}>{offerDescription}</span>
            )
          )}
        </p>
        <div className={cn("flex items-center gap-2", actionsClassName)}>
          {renderActions()}
          {dismissible && (
            <Pressable
              onClick={handleDismiss}
              variant="ghost"
              size="icon"
              asButton
              className={cn("size-8 text-primary-foreground hover:text-primary-foreground/80", dismissButtonClassName)}
            >
              {renderDismissIcon()}
              <span className="sr-only">{dismissAriaLabel}</span>
            </Pressable>
          )}
        </div>
      </div>
    </div>
  );
}
