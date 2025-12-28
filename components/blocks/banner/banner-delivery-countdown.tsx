"use client";

import * as React from "react";
import { useEffect, useMemo, useState } from "react";

import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";

/**
 * Props for the BannerDeliveryCountdown component
 */
export interface BannerDeliveryCountdownProps {
  /**
   * Target delivery date display text
   * @default "Dec 24"
   */
  deliveryDate?: string;
  /**
   * Cutoff time for orders
   * @default 4 hours from now
   */
  cutoffTime?: Date;
  /**
   * Additional CSS classes
   */
  className?: string;
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
  deliveryDate = "Dec 24",
  cutoffTime,
  className,
}: BannerDeliveryCountdownProps) {
  const defaultCutoffTime = useMemo(
    () => new Date(Date.now() + 4 * 60 * 60 * 1000),
    []
  );
  const targetTime = cutoffTime ?? defaultCutoffTime;

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
    <div className={cn("w-full bg-amber-500 text-amber-950", className)}>
      <div className="container py-2.5">
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
          <div className="flex items-center gap-2">
            <DynamicIcon name="lucide/gift" size={16} />
            <span>
              Order within{" "}
              <span className="font-mono font-bold">
                {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:
                {pad(timeLeft.seconds)}
              </span>{" "}
              for delivery by{" "}
              <span className="font-semibold">{deliveryDate}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
