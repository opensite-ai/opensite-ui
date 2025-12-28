"use client";

import * as React from "react";
import { useEffect, useMemo, useState } from "react";

import { cn } from "../../../lib/utils";

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
   * Main message text
   * @default "Flash Sale Ends In"
   */
  message?: string;
  /**
   * Description text
   * @default "Up to 50% off on selected items"
   */
  description?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
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
  message = "Flash Sale Ends In",
  description = "Up to 50% off on selected items",
  className,
}: BannerCountdownSaleProps) {
  const defaultEndTime = useMemo(
    () => new Date(Date.now() + 24 * 60 * 60 * 1000),
    []
  );
  const targetTime = endTime ?? defaultEndTime;

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
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

  return (
    <div className={cn("w-full bg-red-600 text-white", className)}>
      <div className="container py-2.5">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm">
          <span className="font-medium">{message}</span>
          <div className="flex items-center gap-1 font-mono text-lg font-bold">
            <span className="rounded bg-red-700 px-2 py-0.5">
              {pad(timeLeft.hours)}
            </span>
            <span>:</span>
            <span className="rounded bg-red-700 px-2 py-0.5">
              {pad(timeLeft.minutes)}
            </span>
            <span>:</span>
            <span className="rounded bg-red-700 px-2 py-0.5">
              {pad(timeLeft.seconds)}
            </span>
          </div>
          <span className="text-red-100">{description}</span>
        </div>
      </div>
    </div>
  );
}
