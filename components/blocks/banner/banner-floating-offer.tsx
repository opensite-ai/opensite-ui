"use client";

import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { ActionConfig, SectionBackground } from "../../../src/types";

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
   */
  defaultOpen?: boolean;
  /**
   * Callback when visibility changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Whether the banner can be dismissed
   */
  dismissible?: boolean;
  /**
   * Dismiss button icon (ReactNode for full flexibility)
   */
  dismissIcon?: React.ReactNode;
  /**
   * ARIA label for dismiss button
   */
  dismissAriaLabel?: string;
  /**
   * Background style variant for the section
   * @default "primary"
   */
  background?: SectionBackground;
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
  offerTitle,
  offerDescription,
  separator,
  actions,
  actionsSlot,
  open,
  defaultOpen,
  onOpenChange,
  dismissible,
  dismissIcon,
  dismissAriaLabel,
  background = "primary",
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
  const initialOpen = defaultOpen ?? true;
  const [internalOpen, setInternalOpen] = useState(initialOpen);
  const isVisible = isControlled ? open : internalOpen;
  const dismissLabel = dismissAriaLabel ?? "Dismiss banner";
  const isDismissible = dismissible ?? false;

  useEffect(() => {
    if (!isControlled && defaultOpen !== internalOpen) {
      setInternalOpen(initialOpen);
    }
  }, [defaultOpen, initialOpen, isControlled, internalOpen]);

  const handleDismiss = useCallback(() => {
    if (!isControlled) {
      setInternalOpen(false);
    }
    onOpenChange?.(false);
  }, [isControlled, onOpenChange]);

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
  }, [actions, actionsSlot]);

  const separatorContent = useMemo(() => {
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
  }, [separator, separatorClassName]);

  const dismissIconContent = useMemo(() => {
    if (dismissIcon) return dismissIcon;
    return <DynamicIcon name="mynaui/x" size={16} />;
  }, [dismissIcon]);

  const offerTitleContent = useMemo(() => {
    if (!offerTitle) return null;
    return typeof offerTitle === "string" ? (
      <strong className={cn("font-semibold", offerTitleClassName)}>
        {offerTitle}
      </strong>
    ) : (
      <span className={offerTitleClassName}>{offerTitle}</span>
    );
  }, [offerTitle, offerTitleClassName]);

  const offerDescriptionContent = useMemo(() => {
    if (!offerDescription) return null;
    return <span className={offerDescriptionClassName}>{offerDescription}</span>;
  }, [offerDescription, offerDescriptionClassName]);

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
      <Section background={background} spacing="none" className={cn("pointer-events-auto flex items-center justify-between gap-x-6 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5", containerClassName)}>
        <p className={cn("text-sm leading-6", textClassName)}>
          {offerTitleContent}
          {offerTitleContent && offerDescriptionContent && separatorContent}
          {offerDescriptionContent}
        </p>
        <div className={cn("flex items-center gap-2", actionsClassName)}>
          {actionsContent}
          {isDismissible && (
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
          )}
        </div>
      </Section>
    </div>
  );
}
