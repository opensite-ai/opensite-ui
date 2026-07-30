"use client";

import * as React from "react";
import { useMemo } from "react";

import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { ActionConfig, SectionBackground } from "../../../src/types";

/**
 * Props for the BannerPromoCta component
 */
export interface BannerPromoCtaProps {
  /**
   * Main promotional message content
   */
  message?: React.ReactNode;
  /**
   * Discount or offer content
   */
  discount?: React.ReactNode;
  /**
   * Separator element between message and discount
   */
  separator?: React.ReactNode;
  /**
   * Array of action configurations for CTA links/buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
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
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the message
   */
  messageClassName?: string;
  /**
   * Additional CSS classes for the separator
   */
  separatorClassName?: string;
  /**
   * Additional CSS classes for the discount
   */
  discountClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * BannerPromoCta - A promotional banner with message, discount text, and arrow link CTA.
 *
 * Features a full-width primary background with centered content including a bold message,
 * discount text, and an underlined link with arrow icon. Ideal for seasonal sales,
 * promotional announcements, and limited-time offers.
 *
 * @example
 * ```tsx
 * <BannerPromoCta
 *   message="Summer Sale"
 *   discount="Up to 70% off"
 *   actions={[{ label: "Shop Now", href: "/sale" }]}
 * />
 * ```
 */
export function BannerPromoCta({
  sectionId = "banner-promo-cta",
  message,
  discount,
  separator,
  actions,
  actionsSlot,
  background = "primary",
  className,
  containerClassName,
  contentClassName,
  messageClassName,
  separatorClassName,
  discountClassName,
  actionsClassName,
}: BannerPromoCtaProps) {
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
          className={cn("inline-flex items-center gap-1 font-medium underline underline-offset-4 hover:no-underline", actionClassName)}
          {...pressableProps}
        >
          {children ?? (
            <>
              {actionIcon !== "" && <DynamicIcon name={actionIcon} />}
              {label}
              {iconAfter !== "" && <DynamicIcon name={iconAfter} />}
            </>
          )}
        </Pressable>
      );
    });
  }, [actions, actionsSlot]);

  const separatorContent = useMemo(() => {
    if (separator) return separator;
    return <span className={cn("hidden sm:inline", separatorClassName)}>·</span>;
  }, [separator, separatorClassName]);

  const messageContent = useMemo(() => {
    if (!message) return null;
    return typeof message === "string" ? (
      <span className={cn("font-semibold", messageClassName)}>{message}</span>
    ) : (
      <span className={messageClassName}>{message}</span>
    );
  }, [message, messageClassName]);

  const discountContent = useMemo(() => {
    if (!discount) return null;
    return <span className={discountClassName}>{discount}</span>;
  }, [discount, discountClassName]);

  return (
    <Section
      id={sectionId} background={background} spacing="none" className={className}>
      <div className={cn("container py-2.5", containerClassName)}>
        <div className={cn("flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center text-sm", contentClassName)}>
          {messageContent}
          {messageContent && discountContent && separatorContent}
          {discountContent}
          {(actionsSlot || (actions && actions.length > 0)) && (
            <span className={actionsClassName}>
              {actionsContent}
            </span>
          )}
        </div>
      </div>
    </Section>
  );
}
