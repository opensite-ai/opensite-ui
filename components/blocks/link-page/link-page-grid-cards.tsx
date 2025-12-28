"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

/**
 * Link card item for the grid cards link page
 */
export interface GridCardLink {
  id: string;
  label: string;
  href: string;
  icon?: string;
  description?: string;
}

/**
 * Social link for the grid cards link page
 */
export interface GridCardSocialLink {
  id: string;
  platform: string;
  href: string;
  icon: string;
}

/**
 * Props for the LinkPageGridCards component
 */
export interface LinkPageGridCardsProps {
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
   * Array of links to display as cards
   */
  links?: GridCardLink[];
  /**
   * Array of social media links
   */
  socialLinks?: GridCardSocialLink[];
  /**
   * Number of columns in the grid (2 or 3)
   */
  columns?: 2 | 3;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Theme variation: "light" or "dark"
   */
  theme?: "light" | "dark";
}

const defaultLinks: GridCardLink[] = [
  { id: "1", label: "Portfolio", href: "https://example.com", icon: "lucide/briefcase", description: "View my work" },
  { id: "2", label: "Blog", href: "https://example.com/blog", icon: "lucide/pen-line", description: "Read my thoughts" },
  { id: "3", label: "Shop", href: "https://example.com/shop", icon: "lucide/shopping-bag", description: "Browse products" },
  { id: "4", label: "Courses", href: "https://example.com/courses", icon: "lucide/graduation-cap", description: "Learn with me" },
  { id: "5", label: "Podcast", href: "https://example.com/podcast", icon: "lucide/mic", description: "Listen now" },
  { id: "6", label: "Contact", href: "mailto:hello@example.com", icon: "lucide/mail", description: "Get in touch" },
];

const defaultSocialLinks: GridCardSocialLink[] = [
  { id: "s1", platform: "Twitter", href: "https://twitter.com", icon: "simple-icons/x" },
  { id: "s2", platform: "Instagram", href: "https://instagram.com", icon: "simple-icons/instagram" },
  { id: "s3", platform: "YouTube", href: "https://youtube.com", icon: "simple-icons/youtube" },
  { id: "s4", platform: "LinkedIn", href: "https://linkedin.com", icon: "simple-icons/linkedin" },
];

/**
 * LinkPageGridCards - A link page displaying links as a grid of cards.
 *
 * This component provides a visually rich link page with:
 * - Profile header with avatar, name, and bio
 * - Links displayed as a responsive grid of cards
 * - Each card has an icon, label, and optional description
 * - Hover effects with scale and shadow transitions
 * - Social media links section
 * - Configurable 2 or 3 column layout
 * - Light and dark theme support
 *
 * Ideal for creators, businesses, and anyone who wants a more visual link page.
 *
 * @example
 * ```tsx
 * <LinkPageGridCards
 *   name="Creative Studio"
 *   bio="Design, Development & Strategy"
 *   columns={3}
 *   links={[
 *     { id: "1", label: "Portfolio", href: "/work", icon: "lucide/briefcase", description: "View our work" }
 *   ]}
 * />
 * ```
 */
export function LinkPageGridCards({
  name = "Creative Studio",
  bio = "Design, Development & Strategy",
  avatarUrl = blockBrandedIconsAndPlaceholders.avatar4,
  links = defaultLinks,
  socialLinks = defaultSocialLinks,
  columns = 2,
  className,
  theme = "light",
}: LinkPageGridCardsProps): React.JSX.Element {
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "min-h-screen w-full flex items-start justify-center py-12 px-4",
        isDark ? "bg-neutral-950" : "bg-neutral-50",
        className
      )}
    >
      <div className="w-full max-w-lg space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div
            className={cn(
              "h-20 w-20 rounded-2xl overflow-hidden shadow-lg",
              isDark ? "ring-2 ring-white/10" : "ring-2 ring-neutral-200"
            )}
          >
            <img
              src={avatarUrl}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-1">
            <h1
              className={cn(
                "text-2xl font-bold",
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

        {socialLinks.length > 0 && (
          <div className="flex items-center justify-center gap-2">
            {socialLinks.map((social) => (
              <Pressable
                key={social.id}
                href={social.href}
                aria-label={social.platform}
                className={cn(
                  "p-2 rounded-lg transition-all duration-200",
                  "hover:scale-110 active:scale-95",
                  isDark
                    ? "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
                    : "bg-white text-muted-foreground hover:bg-neutral-100 hover:text-foreground"
                )}
              >
                <DynamicIcon name={social.icon} size={18} />
              </Pressable>
            ))}
          </div>
        )}

        {links.length > 0 && (
          <div
            className={cn(
              "grid gap-3",
              columns === 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2"
            )}
          >
            {links.map((link) => (
              <Pressable
                key={link.id}
                href={link.href}
                className={cn(
                  "group flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200",
                  "hover:scale-[1.03] active:scale-[0.97]",
                  isDark
                    ? "bg-white/5 hover:bg-white/10 border border-white/10"
                    : "bg-white hover:bg-white shadow-sm hover:shadow-md border border-neutral-200"
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                    isDark
                      ? "bg-white/10 group-hover:bg-white/20"
                      : "bg-neutral-100 group-hover:bg-neutral-200"
                  )}
                >
                  {link.icon && (
                    <DynamicIcon
                      name={link.icon}
                      size={24}
                      className={isDark ? "text-white" : "text-foreground"}
                    />
                  )}
                </div>
                <div className="text-center space-y-0.5">
                  <span
                    className={cn(
                      "text-sm font-medium block",
                      isDark ? "text-white" : "text-foreground"
                    )}
                  >
                    {link.label}
                  </span>
                  {link.description && (
                    <span
                      className={cn(
                        "text-xs block",
                        isDark ? "text-neutral-500" : "text-muted-foreground"
                      )}
                    >
                      {link.description}
                    </span>
                  )}
                </div>
              </Pressable>
            ))}
          </div>
        )}

        <div className="pt-4">
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
