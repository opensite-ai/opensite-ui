"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

/**
 * Bento link item for the bento layout link page
 */
export interface BentoLink {
  id: string;
  label: string;
  href: string;
  icon?: string;
  description?: string;
  featured?: boolean;
  imageUrl?: string;
}

/**
 * Social link for the bento layout link page
 */
export interface BentoSocialLink {
  id: string;
  platform: string;
  href: string;
  icon: string;
}

/**
 * Props for the LinkPageBentoLayout component
 */
export interface LinkPageBentoLayoutProps {
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
   * Array of links to display in bento grid
   */
  links?: BentoLink[];
  /**
   * Array of social media links
   */
  socialLinks?: BentoSocialLink[];
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Theme variation: "light" or "dark"
   */
  theme?: "light" | "dark";
}

const defaultLinks: BentoLink[] = [
  {
    id: "1",
    label: "Latest Video",
    href: "https://youtube.com",
    icon: "simple-icons/youtube",
    description: "Watch my newest content",
    featured: true,
    imageUrl: imagePlaceholders[0],
  },
  {
    id: "2",
    label: "Shop",
    href: "https://example.com/shop",
    icon: "lucide/shopping-bag",
    description: "Browse products",
    featured: true,
    imageUrl: imagePlaceholders[1],
  },
  {
    id: "3",
    label: "Portfolio",
    href: "https://example.com",
    icon: "lucide/briefcase",
  },
  {
    id: "4",
    label: "Blog",
    href: "https://example.com/blog",
    icon: "lucide/pen-line",
  },
  {
    id: "5",
    label: "Podcast",
    href: "https://example.com/podcast",
    icon: "lucide/mic",
  },
  {
    id: "6",
    label: "Contact",
    href: "mailto:hello@example.com",
    icon: "lucide/mail",
  },
];

const defaultSocialLinks: BentoSocialLink[] = [
  { id: "s1", platform: "Twitter", href: "https://twitter.com", icon: "simple-icons/x" },
  { id: "s2", platform: "Instagram", href: "https://instagram.com", icon: "simple-icons/instagram" },
  { id: "s3", platform: "TikTok", href: "https://tiktok.com", icon: "simple-icons/tiktok" },
  { id: "s4", platform: "LinkedIn", href: "https://linkedin.com", icon: "simple-icons/linkedin" },
];

/**
 * LinkPageBentoLayout - A modern bento grid style link page.
 *
 * This component provides a visually striking link page with:
 * - Profile header with avatar, name, and bio
 * - Bento grid layout with featured links in larger cells
 * - Featured links can include background images
 * - Regular links in smaller cells
 * - Social media links section
 * - Light and dark theme support
 *
 * The bento layout creates visual hierarchy by making featured links
 * more prominent with larger cells and optional background images.
 *
 * @example
 * ```tsx
 * <LinkPageBentoLayout
 *   name="Digital Creator"
 *   bio="Content creator & entrepreneur"
 *   links={[
 *     {
 *       id: "1",
 *       label: "Latest Video",
 *       href: "https://youtube.com",
 *       icon: "simple-icons/youtube",
 *       featured: true,
 *       imageUrl: "/video-thumbnail.jpg"
 *     },
 *     { id: "2", label: "Blog", href: "/blog", icon: "lucide/pen-line" }
 *   ]}
 * />
 * ```
 */
export function LinkPageBentoLayout({
  name = "Digital Creator",
  bio = "Content creator, entrepreneur & coffee enthusiast",
  avatarUrl = blockBrandedIconsAndPlaceholders.avatar5,
  links = defaultLinks,
  socialLinks = defaultSocialLinks,
  className,
  theme = "light",
}: LinkPageBentoLayoutProps): React.JSX.Element {
  const isDark = theme === "dark";

  const featuredLinks = links.filter((link) => link.featured);
  const regularLinks = links.filter((link) => !link.featured);

  return (
    <div
      className={cn(
        "min-h-screen w-full flex items-start justify-center py-12 px-4",
        isDark ? "bg-neutral-950" : "bg-white",
        className
      )}
    >
      <div className="w-full max-w-lg space-y-6">
        <div className="flex flex-col items-center text-center space-y-3">
          <div
            className={cn(
              "h-20 w-20 rounded-full overflow-hidden",
              isDark ? "ring-2 ring-white/20" : "ring-2 ring-neutral-200"
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
                "text-xl font-bold",
                isDark ? "text-white" : "text-foreground"
              )}
            >
              {name}
            </h1>
            {bio && (
              <p
                className={cn(
                  "text-sm max-w-xs",
                  isDark ? "text-neutral-400" : "text-muted-foreground"
                )}
              >
                {bio}
              </p>
            )}
          </div>

          {socialLinks.length > 0 && (
            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map((social) => (
                <Pressable
                  key={social.id}
                  href={social.href}
                  aria-label={social.platform}
                  className={cn(
                    "p-2 rounded-full transition-all duration-200",
                    "hover:scale-110 active:scale-95",
                    isDark
                      ? "text-neutral-500 hover:text-white hover:bg-white/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-neutral-100"
                  )}
                >
                  <DynamicIcon name={social.icon} size={18} />
                </Pressable>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3">
          {featuredLinks.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {featuredLinks.map((link) => (
                <Pressable
                  key={link.id}
                  href={link.href}
                  className={cn(
                    "group relative aspect-[4/3] rounded-2xl overflow-hidden transition-all duration-200",
                    "hover:scale-[1.02] active:scale-[0.98]",
                    isDark
                      ? "bg-white/5 border border-white/10"
                      : "bg-neutral-100 border border-neutral-200"
                  )}
                >
                  {link.imageUrl && (
                    <img
                      src={link.imageUrl}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                  <div
                    className={cn(
                      "absolute inset-0 transition-opacity",
                      link.imageUrl
                        ? "bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                        : isDark
                          ? "bg-gradient-to-t from-white/10 to-transparent"
                          : "bg-gradient-to-t from-neutral-200/50 to-transparent"
                    )}
                  />
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <div className="flex items-center gap-2">
                      {link.icon && (
                        <DynamicIcon
                          name={link.icon}
                          size={18}
                          className={link.imageUrl ? "text-white" : isDark ? "text-white" : "text-foreground"}
                        />
                      )}
                      <span
                        className={cn(
                          "font-semibold text-sm",
                          link.imageUrl ? "text-white" : isDark ? "text-white" : "text-foreground"
                        )}
                      >
                        {link.label}
                      </span>
                    </div>
                    {link.description && (
                      <span
                        className={cn(
                          "text-xs mt-0.5",
                          link.imageUrl ? "text-white/70" : isDark ? "text-neutral-400" : "text-muted-foreground"
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

          {regularLinks.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {regularLinks.map((link) => (
                <Pressable
                  key={link.id}
                  href={link.href}
                  className={cn(
                    "group flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
                    "hover:scale-[1.02] active:scale-[0.98]",
                    isDark
                      ? "bg-white/5 hover:bg-white/10 border border-white/10"
                      : "bg-neutral-50 hover:bg-neutral-100 border border-neutral-200"
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                      isDark ? "bg-white/10" : "bg-white"
                    )}
                  >
                    {link.icon && (
                      <DynamicIcon
                        name={link.icon}
                        size={20}
                        className={isDark ? "text-white" : "text-foreground"}
                      />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium truncate",
                      isDark ? "text-white" : "text-foreground"
                    )}
                  >
                    {link.label}
                  </span>
                </Pressable>
              ))}
            </div>
          )}
        </div>

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
