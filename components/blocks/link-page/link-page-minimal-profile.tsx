"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

/**
 * Link item for the minimal profile link page
 */
export interface MinimalProfileLink {
  id: string;
  label: string;
  href: string;
  icon?: string;
}

/**
 * Social link for the minimal profile link page
 */
export interface MinimalProfileSocialLink {
  id: string;
  platform: string;
  href: string;
  icon: string;
}

/**
 * Props for the LinkPageMinimalProfile component
 */
export interface LinkPageMinimalProfileProps {
  /**
   * Profile name displayed at the top
   */
  name: string;
  /**
   * Optional bio or description
   */
  bio?: string;
  /**
   * Avatar image URL
   */
  avatarUrl?: string;
  /**
   * Array of links to display
   */
  links?: MinimalProfileLink[];
  /**
   * Array of social media links
   */
  socialLinks?: MinimalProfileSocialLink[];
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Theme variation: "light" or "dark"
   */
  theme?: "light" | "dark";
}

const defaultLinks: MinimalProfileLink[] = [
  { id: "1", label: "Portfolio", href: "https://example.com", icon: "lucide/briefcase" },
  { id: "2", label: "Blog", href: "https://example.com/blog", icon: "lucide/pen-line" },
  { id: "3", label: "Contact", href: "mailto:hello@example.com", icon: "lucide/mail" },
];

const defaultSocialLinks: MinimalProfileSocialLink[] = [
  { id: "s1", platform: "Twitter", href: "https://twitter.com", icon: "simple-icons/x" },
  { id: "s2", platform: "GitHub", href: "https://github.com", icon: "simple-icons/github" },
  { id: "s3", platform: "LinkedIn", href: "https://linkedin.com", icon: "simple-icons/linkedin" },
];

/**
 * LinkPageMinimalProfile - A clean, minimal link page focused on simplicity.
 *
 * This component provides a streamlined link page with:
 * - Clean avatar and name display
 * - Optional bio text
 * - Simple link list with subtle hover effects
 * - Social icons at the bottom
 * - Light and dark theme support
 *
 * Ideal for professionals, developers, and anyone who prefers a minimalist aesthetic.
 *
 * @example
 * ```tsx
 * <LinkPageMinimalProfile
 *   name="Alex Johnson"
 *   bio="Software Engineer & Open Source Contributor"
 *   avatarUrl="/avatar.jpg"
 *   links={[
 *     { id: "1", label: "Portfolio", href: "https://example.com", icon: "lucide/briefcase" }
 *   ]}
 * />
 * ```
 */
export function LinkPageMinimalProfile({
  name = "Alex Johnson",
  bio = "Software Engineer & Open Source Contributor",
  avatarUrl = blockBrandedIconsAndPlaceholders.avatar2,
  links = defaultLinks,
  socialLinks = defaultSocialLinks,
  className,
  theme = "light",
}: LinkPageMinimalProfileProps): React.JSX.Element {
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "min-h-screen w-full flex items-start justify-center py-16 px-4",
        isDark ? "bg-neutral-900" : "bg-white",
        className
      )}
    >
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="h-20 w-20 rounded-full overflow-hidden bg-muted">
            <img
              src={avatarUrl}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-1">
            <h1
              className={cn(
                "text-xl font-semibold",
                isDark ? "text-white" : "text-foreground"
              )}
            >
              {name}
            </h1>
            {bio && (
              <p
                className={cn(
                  "text-sm",
                  isDark ? "text-neutral-400" : "text-muted-foreground"
                )}
              >
                {bio}
              </p>
            )}
          </div>
        </div>

        {links.length > 0 && (
          <div className="space-y-2">
            {links.map((link) => (
              <Pressable
                key={link.id}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors",
                  isDark
                    ? "bg-neutral-800 text-white hover:bg-neutral-700"
                    : "bg-neutral-100 text-foreground hover:bg-neutral-200"
                )}
              >
                {link.icon && (
                  <DynamicIcon
                    name={link.icon}
                    size={18}
                    className={isDark ? "text-neutral-400" : "text-muted-foreground"}
                  />
                )}
                <span className="text-sm font-medium">{link.label}</span>
              </Pressable>
            ))}
          </div>
        )}

        {socialLinks.length > 0 && (
          <div className="flex items-center justify-center gap-4 pt-4">
            {socialLinks.map((social) => (
              <Pressable
                key={social.id}
                href={social.href}
                aria-label={social.platform}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  isDark
                    ? "text-neutral-400 hover:text-white hover:bg-neutral-800"
                    : "text-muted-foreground hover:text-foreground hover:bg-neutral-100"
                )}
              >
                <DynamicIcon name={social.icon} size={20} />
              </Pressable>
            ))}
          </div>
        )}

        <div className="pt-8">
          <Pressable
            href="/"
            className={cn(
              "flex items-center justify-center gap-1.5 text-xs transition-opacity hover:opacity-80",
              isDark ? "text-neutral-600" : "text-muted-foreground/50"
            )}
          >
            <DynamicIcon name="lucide/link" size={12} />
            <span>Powered by OpenSite</span>
          </Pressable>
        </div>
      </div>
    </div>
  );
}
