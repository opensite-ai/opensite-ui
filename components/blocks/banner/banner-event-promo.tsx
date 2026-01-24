"use client";

import * as React from "react";
import { useMemo } from "react";

import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import type { ActionConfig } from "../../../src/types";

/**
 * Props for the BannerEventPromo component
 */
export interface BannerEventPromoProps {
  /**
   * Event name content
   */
  eventName?: React.ReactNode;
  /**
   * Event details content
   */
  eventDetails?: React.ReactNode;
  /**
   * Separator element between event name and details
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
   * Additional CSS classes for the text content wrapper
   */
  textClassName?: string;
  /**
   * Additional CSS classes for the event name
   */
  eventNameClassName?: string;
  /**
   * Additional CSS classes for the separator
   */
  separatorClassName?: string;
  /**
   * Additional CSS classes for the event details
   */
  eventDetailsClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
}

/**
 * BannerEventPromo - An event promotion banner with primary background and registration CTA.
 *
 * Features a primary background with event name (bold), dot separator, event details,
 * and a ghost-styled register button with arrow icon. The layout is responsive with
 * content wrapping on smaller screens. Ideal for conference announcements, webinar promotions,
 * and event registrations.
 *
 * @example
 * ```tsx
 * <BannerEventPromo
 *   eventName="TechSummit 2024"
 *   eventDetails="Join us in San Francisco from Sept 15 - 17 for the biggest tech event of the year."
 *   actions={[{ label: "Get Tickets", href: "/events/techsummit", variant: "ghost", size: "sm" }]}
 * />
 * ```
 */
export function BannerEventPromo({
  eventName,
  eventDetails,
  separator,
  actions,
  actionsSlot,
  className,
  containerClassName,
  contentClassName,
  textClassName,
  eventNameClassName,
  separatorClassName,
  eventDetailsClassName,
  actionsClassName,
}: BannerEventPromoProps) {
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

  const eventNameContent = useMemo(() => {
    if (!eventName) return null;
    return typeof eventName === "string" ? (
      <strong className={cn("font-semibold", eventNameClassName)}>{eventName}</strong>
    ) : (
      <span className={eventNameClassName}>{eventName}</span>
    );
  }, [eventName, eventNameClassName]);

  const eventDetailsContent = useMemo(() => {
    if (!eventDetails) return null;
    return <span className={eventDetailsClassName}>{eventDetails}</span>;
  }, [eventDetails, eventDetailsClassName]);

  return (
    <div className={cn("bg-primary text-primary-foreground", className)}>
      <div className={cn("container mx-auto px-4 md:px-6 2xl:max-w-[1400px]", containerClassName)}>
        <div className={cn("flex items-center justify-between gap-x-6 p-4", contentClassName)}>
          <div className={cn("flex flex-wrap justify-between w-full items-center gap-x-4 gap-y-2", textClassName)}>
            <p className="text-sm leading-6">
              {eventNameContent}
              {eventNameContent && eventDetailsContent && separatorContent}
              {eventDetailsContent}
            </p>
            {(actionsSlot || (actions && actions.length > 0)) && (
              <div className={actionsClassName}>
                {actionsContent}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
