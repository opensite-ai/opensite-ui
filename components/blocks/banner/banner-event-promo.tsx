"use client";

import * as React from "react";

import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";

/**
 * Props for the BannerEventPromo component
 */
export interface BannerEventPromoProps {
  /**
   * Event name
   * @default "GeneriCon 2024"
   */
  eventName?: string;
  /**
   * Event details text
   * @default "Join us in Denver from June 7 - 9 to see what's coming next."
   */
  eventDetails?: string;
  /**
   * CTA button text
   * @default "Register now"
   */
  buttonText?: string;
  /**
   * CTA button link
   * @default "#"
   */
  buttonLink?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
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
 *   buttonText="Get Tickets"
 *   buttonLink="/events/techsummit"
 * />
 * ```
 */
export function BannerEventPromo({
  eventName = "GeneriCon 2024",
  eventDetails = "Join us in Denver from June 7 - 9 to see what's coming next.",
  buttonText = "Register now",
  buttonLink = "#",
  className,
}: BannerEventPromoProps) {
  return (
    <div className={cn("bg-primary text-primary-foreground", className)}>
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="flex items-center justify-between gap-x-6 p-4">
          <div className="flex flex-wrap justify-between w-full items-center gap-x-4 gap-y-2">
            <p className="text-sm leading-6">
              <strong className="font-semibold">{eventName}</strong>
              <svg
                viewBox="0 0 2 2"
                className="mx-2 inline h-0.5 w-0.5 fill-current"
                aria-hidden="true"
              >
                <circle cx={1} cy={1} r={1} />
              </svg>
              {eventDetails}
            </p>
            <Pressable
              href={buttonLink}
              size="sm"
              variant="ghost"
              asButton
              className="flex items-center gap-x-1"
            >
              {buttonText} <DynamicIcon name="lucide/arrow-right" size={16} />
            </Pressable>
          </div>
        </div>
      </div>
    </div>
  );
}
