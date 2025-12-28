"use client";

import * as React from "react";
import { useState } from "react";

import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";

/**
 * Props for the BannerSocialFollow component
 */
export interface BannerSocialFollowProps {
  /**
   * Banner message text
   * @default "Follow us on social media for the latest updates and tips!"
   */
  message?: string;
  /**
   * CTA button text
   * @default "Follow Us"
   */
  buttonText?: string;
  /**
   * CTA button link
   * @default "#"
   */
  buttonLink?: string;
  /**
   * Callback when banner is dismissed
   */
  onDismiss?: () => void;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * BannerSocialFollow - A gradient background banner encouraging social media follows.
 *
 * Features a vibrant pink-to-rose gradient background with white text, users icon,
 * follow CTA button, and dismiss button. The layout is centered with responsive text alignment.
 * Ideal for social media promotion, community building, and engagement campaigns.
 *
 * @example
 * ```tsx
 * <BannerSocialFollow
 *   message="Join our community of 50,000+ developers!"
 *   buttonText="Follow Now"
 *   buttonLink="https://twitter.com/example"
 *   onDismiss={() => console.log('Dismissed')}
 * />
 * ```
 */
export function BannerSocialFollow({
  message = "Follow us on social media for the latest updates and tips!",
  buttonText = "Follow Us",
  buttonLink = "#",
  onDismiss,
  className,
}: BannerSocialFollowProps) {
  const [isVisible, setIsVisible] = useState(true);

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
        "bg-gradient-to-r from-pink-500 to-rose-500 text-white",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-3 py-3 flex items-center justify-center text-left md:text-center gap-2">
        <DynamicIcon name="mynaui/users" size={20} className="shrink-0" />
        <span className="font-medium">{message}</span>
        <Pressable
          href={buttonLink}
          variant="secondary"
          size="sm"
          asButton
          className="ml-4"
        >
          {buttonText}
        </Pressable>
        <Pressable
          onClick={handleDismiss}
          variant="ghost"
          size="icon"
          asButton
          className="size-8"
        >
          <DynamicIcon name="mynaui/x" size={16} />
          <span className="sr-only">Dismiss banner</span>
        </Pressable>
      </div>
    </div>
  );
}
