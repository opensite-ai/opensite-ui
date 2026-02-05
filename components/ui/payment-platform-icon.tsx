"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { DynamicIcon } from "./dynamic-icon";

/**
 * Supported payment platform names
 */
export type PaymentPlatformName =
  | "visa"
  | "mastercard"
  | "amex"
  | "apple"
  | "google"
  | "paypal"
  | "amazon"
  | "samsung"
  | "upi"
  | "afterpay"
  | "venmo"
  | "cashapp"
  | "bitcoin"
  | "contactless"
  | "square"
  | "unknown";

/**
 * Mapping of payment platform names to DynamicIcon icon names
 */
const paymentIconMap: Record<PaymentPlatformName, string> = {
  visa: "cib/cc-visa",
  mastercard: "cib/cc-mastercard",
  amex: "cib/cc-amex",
  apple: "cib/apple-pay",
  google: "cib/google-pay",
  paypal: "cib/cc-paypal",
  amazon: "cib/cc-amazon-pay",
  samsung: "cib/samsung-pay",
  upi: "material-symbols/upi-pay",
  afterpay: "simple-icons/afterpay",
  venmo: "cib/venmo",
  cashapp: "cib/cashapp",
  bitcoin: "cib/bitcoin",
  contactless: "mdi/contactless-payment-circle",
  square: "logos/square",
  unknown: "majesticons/creditcard",
};

/**
 * Props for the PaymentPlatformIcon component
 */
export interface PaymentPlatformIconProps {
  /**
   * The payment platform name - determines which icon to display
   */
  platform: PaymentPlatformName;
  /**
   * Icon size in pixels
   * @default 28
   */
  size?: number;
  /**
   * Icon color - accepts any valid CSS color.
   * When not specified, the icon inherits color from parent via CSS currentColor.
   */
  color?: string;
  /**
   * Additional CSS classes for the wrapper element
   */
  className?: string;
  /**
   * Additional CSS classes for the icon element
   */
  iconClassName?: string;
}

/**
 * PaymentPlatformIcon - A reusable payment platform icon component.
 *
 * Renders a DynamicIcon for a given payment platform name.
 * Supports all major payment platforms with proper icon mapping.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <PaymentPlatformIcon platform="visa" />
 *
 * // With custom size
 * <PaymentPlatformIcon platform="mastercard" size={32} />
 *
 * // Render a list of payment icons
 * {["visa", "mastercard", "amex"].map((p) => (
 *   <PaymentPlatformIcon key={p} platform={p} />
 * ))}
 * ```
 */
export function PaymentPlatformIcon({
  platform,
  size = 28,
  color,
  className,
  iconClassName,
}: PaymentPlatformIconProps) {
  const iconName = paymentIconMap[platform] || paymentIconMap.unknown;

  return (
    <span
      className={cn("inline-flex items-center justify-center", className)}
      aria-label={platform}
    >
      <DynamicIcon
        name={iconName}
        size={size}
        color={color}
        className={iconClassName}
        alt={platform}
      />
    </span>
  );
}

