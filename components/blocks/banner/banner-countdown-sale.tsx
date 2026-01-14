"use client";

import * as React from "react";
import { useEffect, useMemo, useState } from "react";

import { cn } from "../../../lib/utils";

/**
 * Time left object for countdown timer
 */
export interface CountdownTimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Props for the BannerCountdownSale component
 */
export interface BannerCountdownSaleProps {
  /**
   * End time for the countdown
   * @default 24 hours from now
   */
  endTime?: Date;
  /**
   * Main message content
   */
  message?: React.ReactNode;
  /**
   * Description content
   */
  description?: React.ReactNode;
  /**
   * Custom slot for rendering the timer (overrides default timer)
   */
  timerSlot?: React.ReactNode;
  /**
   * Custom render function for the timer
   */
  renderTimer?: (timeLeft: CountdownTimeLeft) => React.ReactNode;
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
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the timer wrapper
   */
  timerClassName?: string;
  /**
   * Additional CSS classes for each time unit box
   */
  timeUnitClassName?: string;
  /**
   * Additional CSS classes for the separator
   */
  separatorClassName?: string;
}

/**
 * BannerCountdownSale - A flash sale banner with live countdown timer.
 *
 * Features a red urgency background with a live countdown timer showing hours:minutes:seconds.
 * The timer automatically updates every second and displays time remaining until the sale ends.
 * Ideal for flash sales, time-limited promotions, and urgency-driven marketing campaigns.
 *
 * @example
 * ```tsx
 * <BannerCountdownSale
 *   endTime={new Date(Date.now() + 12 * 60 * 60 * 1000)}
 *   message="Flash Sale Ends In"
 *   description="Up to 70% off on all items"
 * />
 * ```
 */
export function BannerCountdownSale({
  endTime,
  message,
  description,
  timerSlot,
  renderTimer,
  className,
  containerClassName,
  contentClassName,
  messageClassName,
  descriptionClassName,
  timerClassName,
  timeUnitClassName,
  separatorClassName,
}: BannerCountdownSaleProps) {
  const defaultEndTime = useMemo(
    () => new Date(Date.now() + 24 * 60 * 60 * 1000),
    []
  );
  const targetTime = endTime ?? defaultEndTime;

  const [timeLeft, setTimeLeft] = useState<CountdownTimeLeft>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = (): CountdownTimeLeft => {
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

  const renderDefaultTimer = () => {
    if (timerSlot) return timerSlot;
    if (renderTimer) return renderTimer(timeLeft);

    return (
      <div className={cn("flex items-center gap-1 font-mono text-lg font-bold", timerClassName)}>
        <span className={cn("rounded bg-destructive px-2 py-0.5", timeUnitClassName)}>
          {pad(timeLeft.hours)}
        </span>
        <span className={separatorClassName}>:</span>
        <span className={cn("rounded bg-destructive px-2 py-0.5", timeUnitClassName)}>
          {pad(timeLeft.minutes)}
        </span>
        <span className={separatorClassName}>:</span>
        <span className={cn("rounded bg-destructive px-2 py-0.5", timeUnitClassName)}>
          {pad(timeLeft.seconds)}
        </span>
      </div>
    );
  };

  return (
    <div className={cn("w-full bg-destructive text-white", className)}>
      <div className={cn("container py-2.5", containerClassName)}>
        <div className={cn("flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm", contentClassName)}>
          {message && (
            typeof message === "string" ? (
              <span className={cn("font-medium", messageClassName)}>{message}</span>
            ) : (
              <div className={messageClassName}>{message}</div>
            )
          )}
          {renderDefaultTimer()}
          {description && (
            typeof description === "string" ? (
              <span className={cn("text-destructive-foreground", descriptionClassName)}>{description}</span>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
