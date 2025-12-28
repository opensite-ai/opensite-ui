"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import { patternSvgs } from "../../../lib/patternSvgs";
import {
  imagePlaceholders,
  videoPlaceholders,
  logoPlaceholders,
} from "../../../lib/mediaPlaceholders";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

/**
 * Link item for the link tree
 */
export interface LinkTreeLink {
  id: string;
  label: string;
  href: string;
  icon?: string;
  description?: string;
  featured?: boolean;
  badge?: string;
}

/**
 * Social link for the link tree
 */
export interface SocialLink {
  id: string;
  platform: string;
  href: string;
  icon: string;
  label?: string;
}

/**
 * Media gallery item for the link tree
 */
export interface MediaGalleryItem {
  id: string;
  type: "image" | "video";
  src: string;
  alt?: string;
  href?: string;
}

/**
 * Props for the LinkTreeBlock component
 */
export interface LinkTreeBlockProps {
  /**
   * Brand/profile name displayed at the top
   */
  brandName: string;
  /**
   * Optional tagline or bio displayed below the name
   */
  brandTagline?: string;
  /**
   * Optional logo image URL
   */
  brandLogo?: string;
  /**
   * Optional avatar image URL (takes precedence over logo for the avatar display)
   */
  brandAvatar?: string;
  /**
   * Whether to show a verified badge next to the name
   */
  brandVerified?: boolean;
  /**
   * Array of links to display
   */
  links?: LinkTreeLink[];
  /**
   * Array of social media links
   */
  socialLinks?: SocialLink[];
  /**
   * Array of media items for the gallery section
   */
  mediaGallery?: MediaGalleryItem[];
  /**
   * Title for the media gallery section
   */
  mediaGalleryTitle?: string;
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  /**
   * Theme variation for the component.
   * - "light": Light background with dark text (default)
   * - "dark": Dark background with light text
   * - "glass": Glassmorphism effect with gradient background
   */
  theme?: "light" | "dark" | "glass";
  /**
   * Background pattern URL from patternSvgs. Use values from lib/patternSvgs.ts
   * @example backgroundPattern={patternSvgs.dots}
   */
  backgroundPattern?: string;
  /**
   * Custom accent color CSS value (applied as --accent-color CSS variable)
   */
  accentColor?: string;
}

interface BrandHeaderProps {
  brandName: string;
  brandTagline?: string;
  brandLogo?: string;
  brandAvatar?: string;
  brandVerified?: boolean;
  theme?: "light" | "dark" | "glass";
}

function BrandHeader({
  brandName,
  brandTagline,
  brandLogo,
  brandAvatar,
  brandVerified,
  theme = "light",
}: BrandHeaderProps) {
  const avatarSrc =
    brandAvatar || brandLogo || blockBrandedIconsAndPlaceholders.avatar1;

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-4 border-background shadow-xl overflow-hidden bg-muted">
          <img
            src={avatarSrc}
            alt={brandName}
            className="h-full w-full object-cover"
          />
        </div>
        {brandVerified && (
          <div className="absolute -bottom-1 -right-1 rounded-full bg-primary p-1">
            <DynamicIcon
              name="lucide/check"
              size={14}
              className="text-primary-foreground"
            />
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h1
          className={cn(
            "text-2xl font-bold tracking-tight",
            theme === "dark" ? "text-white" : "text-foreground"
          )}
        >
          {brandName}
        </h1>
        {brandTagline && (
          <p
            className={cn(
              "text-sm max-w-xs text-balance",
              theme === "dark" ? "text-white/70" : "text-muted-foreground"
            )}
          >
            {brandTagline}
          </p>
        )}
      </div>
    </div>
  );
}

interface LinkItemProps {
  link: LinkTreeLink;
  theme?: "light" | "dark" | "glass";
}

function LinkItem({ link, theme = "light" }: LinkItemProps) {
  const isFeatured = link.featured;

  return (
    <Pressable
      href={link.href}
      className={cn(
        "group relative flex items-center gap-3 w-full rounded-xl px-4 py-3.5 transition-all duration-200",
        "hover:scale-[1.02] active:scale-[0.98]",
        isFeatured
          ? cn(
              "bg-primary text-primary-foreground shadow-lg",
              "hover:bg-primary/90"
            )
          : cn(
              theme === "dark"
                ? "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                : theme === "glass"
                ? "bg-white/60 backdrop-blur-sm text-foreground hover:bg-white/80 border border-white/30"
                : "bg-card text-card-foreground hover:bg-accent border border-border"
            )
      )}
    >
      {link.icon && (
        <DynamicIcon
          name={link.icon}
          size={20}
          className={cn(
            "shrink-0",
            isFeatured
              ? "text-primary-foreground"
              : theme === "dark"
              ? "text-white"
              : "text-foreground"
          )}
        />
      )}

      <div className="flex-1 min-w-0 text-left">
        <span className="font-medium text-sm block truncate">{link.label}</span>
        {link.description && (
          <span
            className={cn(
              "text-xs block truncate mt-0.5",
              isFeatured
                ? "text-primary-foreground/70"
                : theme === "dark"
                ? "text-white/60"
                : "text-muted-foreground"
            )}
          >
            {link.description}
          </span>
        )}
      </div>

      {link.badge && (
        <Badge
          variant={isFeatured ? "secondary" : "default"}
          className="shrink-0 text-xs"
        >
          {link.badge}
        </Badge>
      )}

      <DynamicIcon
        name="lucide/chevron-right"
        size={16}
        className={cn(
          "shrink-0 transition-transform group-hover:translate-x-0.5",
          isFeatured
            ? "text-primary-foreground/70"
            : theme === "dark"
            ? "text-white/50"
            : "text-muted-foreground"
        )}
      />
    </Pressable>
  );
}

interface SocialLinksProps {
  socialLinks: SocialLink[];
  theme?: "light" | "dark" | "glass";
}

function SocialLinksSection({
  socialLinks,
  theme = "light",
}: SocialLinksProps) {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {socialLinks.map((social) => (
        <Pressable
          key={social.id}
          href={social.href}
          aria-label={social.label || social.platform}
          className={cn(
            "rounded-full h-12 w-12 flex items-center justify-center p-2.5 transition-all duration-200",
            "hover:scale-110 active:scale-95",
            theme === "dark"
              ? "bg-white/10 text-white hover:bg-white/20"
              : theme === "glass"
              ? "bg-white/60 backdrop-blur-sm hover:bg-white/80"
              : "bg-muted hover:bg-accent"
          )}
        >
          <DynamicIcon
            name={social.icon}
            size={20}
            className={theme === "dark" ? "text-white" : "text-foreground"}
          />
        </Pressable>
      ))}
    </div>
  );
}

interface MediaGalleryProps {
  items: MediaGalleryItem[];
  title?: string;
  theme?: "light" | "dark" | "glass";
}

function MediaGallerySection({
  items,
  title,
  theme = "light",
}: MediaGalleryProps) {
  return (
    <div className="space-y-3">
      {title && (
        <h3
          className={cn(
            "text-sm font-medium text-center",
            theme === "dark" ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {title}
        </h3>
      )}

      <div className="grid grid-cols-3 gap-2">
        {items.slice(0, 6).map((item) => (
          <Pressable
            key={item.id}
            href={item.href}
            className={cn(
              "group relative aspect-square overflow-hidden rounded-lg",
              "transition-all duration-200 hover:scale-[1.02]",
              theme === "dark" ? "ring-1 ring-white/10" : "ring-1 ring-border"
            )}
          >
            {item.type === "video" ? (
              <video
                src={item.src}
                className="h-full w-full object-cover"
                muted
                loop
                playsInline
                onMouseEnter={(e) => e.currentTarget.play()}
                onMouseLeave={(e) => {
                  e.currentTarget.pause();
                  e.currentTarget.currentTime = 0;
                }}
              />
            ) : (
              <img
                src={item.src}
                alt={item.alt || ""}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            )}

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
              {item.type === "video" && (
                <DynamicIcon
                  name="lucide/play"
                  size={24}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                />
              )}
            </div>
          </Pressable>
        ))}
      </div>
    </div>
  );
}

const defaultLinks: LinkTreeLink[] = [
  {
    id: "1",
    label: "My Latest YouTube Video",
    href: "https://youtube.com",
    icon: "simple-icons/youtube",
    featured: true,
    badge: "New",
  },
  {
    id: "2",
    label: "Shop My Presets",
    href: "https://example.com/shop",
    icon: "lucide/shopping-bag",
    description: "Lightroom presets for stunning photos",
  },
  {
    id: "3",
    label: "Book a Consultation",
    href: "https://calendly.com",
    icon: "lucide/calendar",
    description: "1-on-1 photography coaching",
  },
  {
    id: "4",
    label: "Join My Newsletter",
    href: "https://example.com/newsletter",
    icon: "lucide/mail",
  },
  {
    id: "5",
    label: "Listen on Spotify",
    href: "https://spotify.com",
    icon: "simple-icons/spotify",
  },
];

const defaultSocialLinks: SocialLink[] = [
  {
    id: "s1",
    platform: "Instagram",
    href: "https://instagram.com",
    icon: "simple-icons/instagram",
  },
  {
    id: "s2",
    platform: "TikTok",
    href: "https://tiktok.com",
    icon: "simple-icons/tiktok",
  },
  {
    id: "s3",
    platform: "Twitter",
    href: "https://twitter.com",
    icon: "simple-icons/x",
  },
  {
    id: "s4",
    platform: "LinkedIn",
    href: "https://linkedin.com",
    icon: "simple-icons/linkedin",
  },
];

const defaultMediaGallery: MediaGalleryItem[] = [
  { id: "m1", type: "image", src: imagePlaceholders[0], alt: "Photo 1" },
  { id: "m2", type: "image", src: imagePlaceholders[1], alt: "Photo 2" },
  { id: "m3", type: "video", src: videoPlaceholders[0], alt: "Video 1" },
  { id: "m4", type: "image", src: imagePlaceholders[2], alt: "Photo 3" },
  { id: "m5", type: "image", src: imagePlaceholders[3], alt: "Photo 4" },
  { id: "m6", type: "image", src: imagePlaceholders[4], alt: "Photo 5" },
];

/**
 * LinkTreeBlock - A customizable link-in-bio style page component with three theme variations.
 *
 * This component provides a complete link page solution with:
 * - Brand header with avatar, name, tagline, and optional verified badge
 * - Customizable link list with icons, descriptions, badges, and featured states
 * - Media gallery section for showcasing images and videos
 * - Social media links section
 * - Three theme variations: light, dark, and glass (glassmorphism)
 * - Background pattern customization using patternSvgs
 *
 * @example
 * ```tsx
 * // Light theme (default)
 * <LinkTreeBlock
 *   brandName="Sarah Chen"
 *   brandTagline="Digital creator & photographer"
 *   links={[
 *     { id: "1", label: "My Website", href: "https://example.com", icon: "lucide/globe" }
 *   ]}
 * />
 *
 * // Dark theme with pattern background
 * <LinkTreeBlock
 *   brandName="Sarah Chen"
 *   theme="dark"
 *   backgroundPattern={patternSvgs.dots}
 * />
 *
 * // Glass theme with gradient background
 * <LinkTreeBlock
 *   brandName="Sarah Chen"
 *   theme="glass"
 * />
 * ```
 */
export function LinkTreeBlock({
  brandName = "Sarah Chen",
  brandTagline = "Digital creator, photographer & coffee enthusiast",
  brandLogo,
  brandAvatar = blockBrandedIconsAndPlaceholders.avatar1,
  brandVerified = true,
  links = defaultLinks,
  socialLinks = defaultSocialLinks,
  mediaGallery = defaultMediaGallery,
  mediaGalleryTitle = "Latest Content",
  className,
  theme = "light",
  backgroundPattern = patternSvgs.dots,
  accentColor,
}: LinkTreeBlockProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "relative min-h-screen w-full flex items-start justify-center py-12 px-4",
        theme === "dark"
          ? "bg-neutral-950"
          : theme === "glass"
          ? "bg-linear-to-br from-pink-100 via-purple-50 to-blue-100"
          : "bg-muted/30",
        className
      )}
      style={
        accentColor
          ? ({ "--accent-color": accentColor } as React.CSSProperties)
          : undefined
      }
    >
      {backgroundPattern && (
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `url(${backgroundPattern})`,
            backgroundRepeat: "repeat",
            backgroundSize: "100px 100px",
          }}
        />
      )}

      <div className="relative z-10 w-full max-w-md space-y-6">
        <BrandHeader
          brandName={brandName}
          brandTagline={brandTagline}
          brandLogo={brandLogo}
          brandAvatar={brandAvatar}
          brandVerified={brandVerified}
          theme={theme}
        />

        {links.length > 0 && (
          <div className="space-y-3">
            {links.map((link) => (
              <LinkItem key={link.id} link={link} theme={theme} />
            ))}
          </div>
        )}

        {mediaGallery.length > 0 && (
          <MediaGallerySection
            items={mediaGallery}
            title={mediaGalleryTitle}
            theme={theme}
          />
        )}

        {socialLinks.length > 0 && (
          <SocialLinksSection socialLinks={socialLinks} theme={theme} />
        )}

        <div className="pt-4">
          <Pressable
            href="/"
            className={cn(
              "flex items-center justify-center gap-1.5 text-xs transition-opacity hover:opacity-80",
              theme === "dark" ? "text-white/40" : "text-muted-foreground/60"
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
