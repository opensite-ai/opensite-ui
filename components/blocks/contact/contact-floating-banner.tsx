"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface ContactFloatingBannerProps {
  /**
   * Badge text before the main message
   */
  badgeText?: string;
  /**
   * Main message text
   */
  message?: string;
  /**
   * Button text
   */
  buttonText?: string;
  /**
   * Button icon name
   */
  buttonIcon?: string;
  /**
   * Button href
   */
  buttonHref?: string;
  /**
   * Additional CSS classes for the banner
   */
  className?: string;
}

/**
 * ContactFloatingBanner - A fixed floating banner at the bottom of the page
 * with a promotional message and call-to-action button. Perfect for limited-time
 * offers, announcements, or important contact prompts.
 *
 * @example
 * ```tsx
 * <ContactFloatingBanner
 *   badgeText="Limited time offer"
 *   message="Get 50% off for your first month"
 *   buttonText="Get started"
 *   buttonIcon="lucide/arrow-right"
 *   buttonHref="/signup"
 * />
 * ```
 */
export function ContactFloatingBanner({
  badgeText = "Limited time offer",
  message = "Get 50% off for your first month",
  buttonText = "Get started",
  buttonIcon = "lucide/arrow-right",
  buttonHref = "#",
  className,
}: ContactFloatingBannerProps): React.JSX.Element {
  return (
    <div className={cn("container relative mx-auto py-24 lg:py-32", className)}>
      {/* Floating Banner */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8">
        <div className="pointer-events-auto flex items-center justify-between gap-x-6 bg-primary px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5">
          <p className="text-sm leading-6 text-primary-foreground">
            <strong className="font-semibold">{badgeText}</strong>
            <svg
              viewBox="0 0 2 2"
              className="mx-2 inline h-0.5 w-0.5 fill-current"
              aria-hidden="true"
            >
              <circle cx={1} cy={1} r={1} />
            </svg>
            {message}
          </p>
          <Pressable
            href={buttonHref}
            variant="secondary"
            size="sm"
            className="flex items-center gap-x-1"
            asButton
          >
            {buttonText}
            {buttonIcon && <DynamicIcon name={buttonIcon} size={16} />}
          </Pressable>
        </div>
      </div>
      {/* End of Floating Banner */}
    </div>
  );
}

