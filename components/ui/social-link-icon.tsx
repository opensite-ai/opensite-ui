"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Pressable, type PressableProps } from "../../lib/Pressable";
import { DynamicIcon } from "./dynamic-icon";
import {
  usePlatformFromUrl,
  type SocialPlatformName,
} from "@opensite/hooks/usePlatformFromUrl";

// Re-export for consumers
export type { SocialPlatformName };

/**
 * Mapping of platform names to DynamicIcon icon names
 */
const platformIconMap: Record<SocialPlatformName, string> = {
  instagram: "cib/instagram",
  linkedin: "cib/linkedin",
  google: "cib/google",
  facebook: "cib/facebook",
  tiktok: "cib/tiktok",
  youtube: "cib/youtube",
  yelp: "cib/yelp",
  spotify: "cib/spotify",
  apple: "cib/apple",
  x: "prime/twitter",
  github: "cib/github",
  snapchat: "cib/snapchat",
  discord: "cib/discord",
  dev: "simple-icons/devdotto",
  substack: "simple-icons/substack",
  reddit: "cib/reddit",
  pinterest: "cib/pinterest",
  threads: "simple-icons/threads",
  twitch: "cib/twitch",
  whatsapp: "cib/whatsapp",
  telegram: "cib/telegram",
  medium: "simple-icons/medium",
  patreon: "cib/patreon",
  onlyfans: "simple-icons/onlyfans",
  eventbrite: "cib/eventbrite",
  npmjs: "simple-icons/npm",
  crates: "cib/rust",
  rubygems: "cib/rubygems",
  behance: "cib/behance",
  dribbble: "cib/dribbble",
  unknown: "icon-park-solid/circular-connection",
};

/**
 * Props for DynamicIcon that can be passed through
 */
export interface SocialLinkIconDynamicIconProps {
  /**
   * Icon size in pixels
   * @default 20
   */
  iconSize?: number;
  /**
   * Icon color - accepts any valid CSS color
   * Note: When not specified, the icon inherits color from parent via CSS currentColor
   */
  iconColor?: string;
  /**
   * Additional CSS classes for the icon
   */
  iconClassName?: string;
}

/**
 * Props for the SocialLinkIcon component
 */
export interface SocialLinkIconProps
  extends Omit<PressableProps, "children">, SocialLinkIconDynamicIconProps {
  /**
   * The social platform name - determines which icon to display
   */
  platformName?: SocialPlatformName;
  /**
   * Optional label for accessibility (defaults to platform name)
   */
  label?: string;
  /**
   * Optional icon name override
   */
  iconNameOverride?: string;
  /**
   * Required href for the link
   */
  href: string;
}

/**
 * SocialLinkIcon - A reusable social media link icon component.
 *
 * Combines Pressable navigation with DynamicIcon rendering for social media platforms.
 * Supports all major social platforms with proper icon mapping.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <SocialLinkIcon platformName="instagram" href="https://instagram.com/company" />
 *
 * // With custom size and styling
 * <SocialLinkIcon
 *   platformName="x"
 *   href="https://x.com/company"
 *   iconSize={24}
 *   className="hover:text-primary"
 * />
 *
 * // As a button-styled link
 * <SocialLinkIcon
 *   platformName="linkedin"
 *   href="https://linkedin.com/company/example"
 *   asButton
 *   variant="outline"
 *   size="icon"
 * />
 * ```
 */
export const SocialLinkIcon = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement,
  SocialLinkIconProps
>(
  (
    {
      platformName,
      label,
      iconSize = 20,
      iconColor,
      href,
      iconClassName,
      className,
      iconNameOverride,
      ...pressableProps
    },
    ref,
  ) => {
    const platform = usePlatformFromUrl(href as string);

    const smartPlatformName = React.useMemo(() => {
      return platform || platformName;
    }, [platform, platformName]);

    const iconName = React.useMemo(() => {
      return iconNameOverride || platformIconMap[smartPlatformName];
    }, [iconNameOverride, smartPlatformName]);

    const accessibleLabel = React.useMemo(() => {
      return label || platformName;
    }, [label, platformName]);

    return (
      <Pressable
        ref={ref}
        href={href}
        aria-label={accessibleLabel}
        className={cn(
          "inline-flex items-center justify-center transition-colors",
          className,
        )}
        {...pressableProps}
      >
        <DynamicIcon
          name={iconName}
          size={iconSize}
          color={iconColor}
          className={iconClassName}
          alt={accessibleLabel}
        />
      </Pressable>
    );
  },
);

SocialLinkIcon.displayName = "SocialLinkIcon";
