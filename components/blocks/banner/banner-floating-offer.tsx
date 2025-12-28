"use client";

import * as React from "react";
import { useState } from "react";

import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";

/**
 * Props for the BannerFloatingOffer component
 */
export interface BannerFloatingOfferProps {
  /**
   * Offer title (bold text)
   * @default "Limited time offer"
   */
  offerTitle?: string;
  /**
   * Offer description
   * @default "Get 50% off for your first month"
   */
  offerDescription?: string;
  /**
   * CTA button text
   * @default "Get started"
   */
  buttonText?: string;
  /**
   * CTA button link
   * @default "#"
   */
  buttonLink?: string;
  /**
   * Whether to show the banner
   * @default true
   */
  visible?: boolean;
  /**
   * Callback when banner is dismissed (if dismissible)
   */
  onDismiss?: () => void;
  /**
   * Whether the banner can be dismissed
   * @default false
   */
  dismissible?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
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
 *   buttonText="Claim Offer"
 *   buttonLink="/pricing"
 *   dismissible={true}
 *   onDismiss={() => console.log('Dismissed')}
 * />
 * ```
 */
export function BannerFloatingOffer({
  offerTitle = "Limited time offer",
  offerDescription = "Get 50% off for your first month",
  buttonText = "Get started",
  buttonLink = "#",
  visible = true,
  onDismiss,
  dismissible = false,
  className,
}: BannerFloatingOfferProps) {
  const [isVisible, setIsVisible] = useState(visible);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

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
      <div className="pointer-events-auto flex items-center justify-between gap-x-6 bg-primary px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5">
        <p className="text-sm leading-6 text-primary-foreground">
          <strong className="font-semibold">{offerTitle}</strong>
          <svg
            viewBox="0 0 2 2"
            className="mx-2 inline h-0.5 w-0.5 fill-current"
            aria-hidden="true"
          >
            <circle cx={1} cy={1} r={1} />
          </svg>
          {offerDescription}
        </p>
        <div className="flex items-center gap-2">
          <Pressable
            href={buttonLink}
            size="sm"
            variant="secondary"
            asButton
            className="flex items-center gap-x-1"
          >
            {buttonText} <DynamicIcon name="lucide/arrow-right" size={16} />
          </Pressable>
          {dismissible && (
            <Pressable
              onClick={handleDismiss}
              variant="ghost"
              size="icon"
              asButton
              className="size-8 text-primary-foreground hover:text-primary-foreground/80"
            >
              <DynamicIcon name="mynaui/x" size={16} />
              <span className="sr-only">Dismiss banner</span>
            </Pressable>
          )}
        </div>
      </div>
    </div>
  );
}
