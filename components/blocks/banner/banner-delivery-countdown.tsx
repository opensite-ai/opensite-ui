"use client";

import * as React from "react";
import { useEffect, useMemo, useState } from "react";

import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";

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
  icon?: React.ReactNode;
  /**
   * Icon name for DynamicIcon (used if icon prop is not provided)
   * @default "lucide/gift"
   */
  iconName?: string;
  /**
   * Target delivery date content
   */
  deliveryDate?: React.ReactNode;
  /**
   * Cutoff time for orders
   * @default 4 hours from now
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
  icon,
  iconName = "lucide/gift",
  deliveryDate = "Dec 24",
  cutoffTime,
  prefixText = "Order within",
  middleText = "for delivery by",
  timerSlot,
  renderTimer,
  className,
  containerClassName,
  contentClassName,
  iconClassName,
  messageClassName,
  timerClassName,
  deliveryDateClassName,
}: BannerDeliveryCountdownProps) {
  const defaultCutoffTime = useMemo(
    () => new Date(Date.now() + 4 * 60 * 60 * 1000),
    []
  );
  const targetTime = cutoffTime ?? defaultCutoffTime;

  const [timeLeft, setTimeLeft] = useState<DeliveryCountdownTimeLeft>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
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

  const pad = (n: number) => n.toString().padStart(2, "0");

  const renderIcon = () => {
    if (icon) return icon;
    return <DynamicIcon name={iconName} size={16} className={iconClassName} />;
  };

  const renderDefaultTimer = () => {
    if (timerSlot) return timerSlot;
    if (renderTimer) return renderTimer(timeLeft);

    return (
      <span className={cn("font-mono font-bold", timerClassName)}>
        {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
      </span>
    );
  };

  return (
    <div className={cn("w-full bg-accent text-accent-foreground", className)}>
      <div className={cn("container py-2.5", containerClassName)}>
        <div className={cn("flex flex-wrap items-center justify-center gap-3 text-sm", contentClassName)}>
          <div className={cn("flex items-center gap-2", messageClassName)}>
            {renderIcon()}
            <span>
              {prefixText}{" "}
              {renderDefaultTimer()}{" "}
              {middleText}{" "}
              {deliveryDate && (
                typeof deliveryDate === "string" ? (
                  <span className={cn("font-semibold", deliveryDateClassName)}>{deliveryDate}</span>
                ) : (
                  <span className={deliveryDateClassName}>{deliveryDate}</span>
                )
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
