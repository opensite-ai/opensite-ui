"use client";

import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { SectionBackground } from "../../../src/types";

/**
 * Time left object for countdown timer
 */
export interface DeliveryCountdownTimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Props for the BannerDeliveryCountdown component
 */
export interface BannerDeliveryCountdownProps {
  /**
   * Icon to display (ReactNode for full flexibility)
   */
  icon?: React.ReactNode | string;
  /**
   * Icon name for DynamicIcon (used if icon prop is not provided)
   */
  iconName?: string;
  /**
   * Target delivery date content
   */
  deliveryDate?: React.ReactNode;
  /**
   * Cutoff time for orders
   */
  cutoffTime?: Date;
  /**
   * Prefix text before the timer
   */
  prefixText?: React.ReactNode;
  /**
   * Text between timer and delivery date
   */
  middleText?: React.ReactNode;
  /**
   * Custom slot for rendering the timer (overrides default timer)
   */
  timerSlot?: React.ReactNode;
  /**
   * Custom render function for the timer
   */
  renderTimer?: (timeLeft: DeliveryCountdownTimeLeft) => React.ReactNode;
  /**
   * Background style variant for the section
   * @default "muted"
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
   * Additional CSS classes for the icon
   */
  iconClassName?: string;
  /**
   * Additional CSS classes for the message wrapper
   */
  messageClassName?: string;
  /**
   * Additional CSS classes for the timer
   */
  timerClassName?: string;
  /**
   * Additional CSS classes for the delivery date
   */
  deliveryDateClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * BannerDeliveryCountdown - A delivery deadline banner with countdown timer and gift icon.
 *
 * Features an amber attention-grabbing background with a gift icon and live countdown timer.
 * Shows time remaining to place an order for guaranteed delivery by a specific date.
 * Ideal for holiday shipping deadlines, delivery guarantees, and order cutoff times.
 *
 * @example
 * ```tsx
 * <BannerDeliveryCountdown
 *   deliveryDate="Dec 25"
 *   cutoffTime={new Date(Date.now() + 6 * 60 * 60 * 1000)}
 * />
 * ```
 */
export function BannerDeliveryCountdown({
  sectionId = "banner-delivery-countdown",
  icon,
  iconName,
  deliveryDate,
  cutoffTime,
  prefixText,
  middleText,
  timerSlot,
  renderTimer,
  background = "muted",
  className,
  containerClassName,
  contentClassName,
  iconClassName,
  messageClassName,
  timerClassName,
  deliveryDateClassName,
}: BannerDeliveryCountdownProps) {
  const targetTime = cutoffTime;

  const [timeLeft, setTimeLeft] = useState<DeliveryCountdownTimeLeft>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!targetTime) {
      return;
    }

    const calculateTimeLeft = (): DeliveryCountdownTimeLeft => {
      const now = new Date().getTime();
      const target = targetTime.getTime();
      const diff = target - now;

      if (diff <= 0) {
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  const pad = useCallback((n: number) => n.toString().padStart(2, "0"), []);

  const iconContent = useMemo(() => {
    const resolvedIcon = icon || iconName;
    if (!resolvedIcon) return null;
    return <DynamicIcon name={resolvedIcon} size={16} className={iconClassName} />;
  }, [icon, iconName, iconClassName]);

  const timerContent = useMemo(() => {
    if (timerSlot) return timerSlot;
    if (renderTimer) return renderTimer(timeLeft);
    if (!targetTime) return null;

    return (
      <span className={cn("font-mono font-bold", timerClassName)}>
        {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
      </span>
    );
  }, [timerSlot, renderTimer, timeLeft, timerClassName, pad, targetTime]);

  const deliveryDateContent = useMemo(() => {
    if (!deliveryDate) return null;
    return typeof deliveryDate === "string" ? (
      <span className={cn("font-semibold", deliveryDateClassName)}>
        {deliveryDate}
      </span>
    ) : (
      <span className={deliveryDateClassName}>{deliveryDate}</span>
    );
  }, [deliveryDate, deliveryDateClassName]);

  const messageParts = useMemo(() => {
    return [prefixText, timerContent, middleText, deliveryDateContent].filter(
      (part) => part !== null && part !== undefined
    );
  }, [prefixText, timerContent, middleText, deliveryDateContent]);

  return (
    <Section
      id={sectionId} background={background} spacing="none" className={cn("bg-accent text-accent-foreground", className)}>
      <div className={cn("container py-2.5", containerClassName)}>
        <div className={cn("flex flex-wrap items-center justify-center gap-3 text-sm", contentClassName)}>
          <div className={cn("flex items-center gap-2", messageClassName)}>
            {iconContent}
            {messageParts.length > 0 && (
              <span>
                {messageParts.map((part, index) => (
                  <React.Fragment key={index}>
                    {index > 0 ? " " : null}
                    {part}
                  </React.Fragment>
                ))}
              </span>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
