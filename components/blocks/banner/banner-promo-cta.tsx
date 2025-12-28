"use client";

import * as React from "react";

import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";

/**
 * Props for the BannerPromoCta component
 */
export interface BannerPromoCtaProps {
  /**
   * Main promotional message
   * @default "Winter Sale"
   */
  message?: string;
  /**
   * Discount or offer text
   * @default "Up to 50% off"
   */
  discount?: string;
  /**
   * Link URL for the CTA
   * @default "#"
   */
  link?: string;
  /**
   * Text for the CTA link
   * @default "Shop Now"
   */
  linkText?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * BannerPromoCta - A promotional banner with message, discount text, and arrow link CTA.
 *
 * Features a full-width primary background with centered content including a bold message,
 * discount text, and an underlined link with arrow icon. Ideal for seasonal sales,
 * promotional announcements, and limited-time offers.
 *
 * @example
 * ```tsx
 * <BannerPromoCta
 *   message="Summer Sale"
 *   discount="Up to 70% off"
 *   link="/sale"
 *   linkText="Shop Now"
 * />
 * ```
 */
export function BannerPromoCta({
  message = "Winter Sale",
  discount = "Up to 50% off",
  link = "#",
  linkText = "Shop Now",
  className,
}: BannerPromoCtaProps) {
  return (
    <div
      className={cn("w-full bg-primary text-primary-foreground", className)}
    >
      <div className="container py-2.5">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center text-sm">
          <span className="font-semibold">{message}</span>
          <span className="hidden sm:inline">·</span>
          <span>{discount}</span>
          <Pressable
            href={link}
            className="inline-flex items-center gap-1 font-medium underline underline-offset-4 hover:no-underline"
          >
            {linkText}
            <DynamicIcon name="lucide/arrow-right" size={12} />
          </Pressable>
        </div>
      </div>
    </div>
  );
}
