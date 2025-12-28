```tsx
"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface LinkTreeLink {
  id: string
  label: string
  href: string
  icon?: string
  description?: string
  featured?: boolean
  badge?: string
}

export interface SocialLink {
  id: string
  platform: string
  href: string
  icon: string
  label?: string
}

export interface MediaGalleryItem {
  id: string
  type: "image" | "video"
  src: string
  alt?: string
  href?: string
}

export interface LinkTreeBlockProps {
  // Brand Header
  brandName: string
  brandTagline?: string
  brandLogo?: string
  brandAvatar?: string
  brandVerified?: boolean

  // Links
  links?: LinkTreeLink[]

  // Social Links
  socialLinks?: SocialLink[]

  // Media Gallery
  mediaGallery?: MediaGalleryItem[]
  mediaGalleryTitle?: string

  // Styling
  className?: string
  theme?: "light" | "dark" | "glass"
  backgroundPattern?: string
  accentColor?: string
}

// ============================================================================
// PLACEHOLDER DATA
// ============================================================================

const patternSvgs = {
  squareAltGrid: "https://cdn.ing/assets/files/record/286187/4gpn0yq2ptra8iwlvmwwv860ggwv",
  grid1: "https://cdn.ing/assets/files/record/286186/nbdflpgp4ostrno079hygibsflp3",
  noise: "https://cdn.ing/assets/i/r/286188/zrqcp9hynh3j7p2laihwzfbujgrl/noise.png",
  dots: "https://cdn.ing/assets/files/record/286198/yfsjx9thvtxzhl2qtshxyhkrm524",
  dotPattern: "https://cdn.ing/assets/files/record/286192/7ig0cku8aqbboiza8nuk6hw0nnsr",
  dotPattern2: "https://cdn.ing/assets/files/record/286189/arez6gd2s7isn9i1o6c7sexdq7bl",
  circles: "https://cdn.ing/assets/files/record/286190/gtmia3sncjtzetdshc20zf1d3c17",
  waves: "https://cdn.ing/assets/files/record/286191/mqlb33fzxz9cdth1bx7if0wmpkp1",
}

const imagePlaceholders = [
  "https://toastability-production.s3.amazonaws.com/xlp46pzk3a4d73jgjx4s7xdafwpn",
  "https://toastability-production.s3.amazonaws.com/g1iuifb3yzoofo9c7a00koyn6q1t",
  "https://toastability-production.s3.amazonaws.com/z9u4sdrj2oq3eds0qyui0nxsus3j",
  "https://toastability-production.s3.amazonaws.com/63aotyt2pb4gqpccej2kkw8reson",
  "https://toastability-production.s3.amazonaws.com/pjgb223h1bjywdk15i3zi7pjhutg",
  "https://toastability-production.s3.amazonaws.com/we9r4e711an6d0bd3dwbl9tb9z7q",
]

const videoPlaceholders = [
  "https://toastability-production.s3.amazonaws.com/urjamg8k59poainq262wz5aigdea",
  "https://toastability-production.s3.amazonaws.com/967hpd5j4k491suxfangl7e4y2m2",
]

const blockBrandedIconsAndPlaceholders = {
  avatar1: "https://cdn.ing/assets/i/r/286239/ebm7o3j2kx48vw98emnwjaf5qvl6/avatar-1.webp",
  logoMark:
    "https://cdn.ing/assets/i/r/285975/eud79qeya11q5w6ueyhklueardyx/monochrome-rounded-square-app-icon-circular-emblem.png",
}

// ============================================================================
// PRESSABLE COMPONENT (as per PRESSABLE_EXAMPLES.md guidelines)
// ============================================================================

interface PressableProps extends React.HTMLAttributes<HTMLElement> {
  href?: string
  variant?: "default" | "outline" | "ghost" | "secondary" | "destructive" | "link"
  size?: "default" | "sm" | "md" | "lg" | "icon"
  asButton?: boolean
  children: React.ReactNode
  disabled?: boolean
}

function Pressable({
  href,
  variant,
  size,
  asButton,
  children,
  className,
  disabled,
  onClick,
  ...props
}: PressableProps) {
  // Determine if external link
  const isExternal = href?.startsWith("http") || href?.startsWith("//")
  const isMailto = href?.startsWith("mailto:") || href?.includes("@")
  const isTel = href?.match(/^(\+?\d|tel:|\(\d)/)

  // Normalize href
  let normalizedHref = href
  if (
    href &&
    !href.startsWith("http") &&
    !href.startsWith("/") &&
    !href.startsWith("mailto:") &&
    !href.startsWith("tel:")
  ) {
    if (isTel) {
      const digits = href.replace(/\D/g, "")
      normalizedHref = `tel:+1${digits}`
    } else if (isMailto) {
      normalizedHref = href.startsWith("mailto:") ? href : `mailto:${href}`
    }
  }

  // Button styles (shadcn-like)
  const buttonVariants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    link: "text-primary underline-offset-4 hover:underline",
  }

  const sizeVariants = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    md: "h-10 px-4 py-2",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  }

  const baseButtonStyles = asButton
    ? cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variant && buttonVariants[variant],
        size && sizeVariants[size],
        className,
      )
    : className

  // Render as link if href exists
  if (normalizedHref) {
    return (
      <a
        href={normalizedHref}
        target={isExternal ? "_blank" : "_self"}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={baseButtonStyles}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    )
  }

  // Render as button if onClick exists or asButton is true
  if (onClick || asButton) {
    return (
      <button
        type="button"
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
        disabled={disabled}
        className={baseButtonStyles}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    )
  }

  // Fallback to span
  return (
    <span className={className} {...props}>
      {children}
    </span>
  )
}

// ============================================================================
// DYNAMIC ICON COMPONENT (via Iconify API as per ICON_LIBRARY_API.md)
// ============================================================================

interface DynamicIconProps {
  name: string
  size?: number
  className?: string
  color?: string
}

function DynamicIcon({ name, size = 24, className, color }: DynamicIconProps) {
  // Parse icon name format: "prefix/icon-name" or just "icon-name" (defaults to lucide)
  const parts = name.split("/")
  const prefix = parts.length > 1 ? parts[0] : "lucide"
  const iconName = parts.length > 1 ? parts[1] : parts[0]

  const iconUrl = `https://icons.opensite.ai/api/icon/${prefix}/${iconName}?format=svg&width=${size}&height=${size}${color ? `&color=${encodeURIComponent(color)}` : ""}`

  return (
    <span
      className={cn("inline-flex items-center justify-center shrink-0", className)}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={iconUrl || "/placeholder.svg"}
        alt=""
        width={size}
        height={size}
        className="w-full h-full"
        loading="lazy"
      />
    </span>
  )
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

// Brand Header Section
interface BrandHeaderProps {
  brandName: string
  brandTagline?: string
  brandLogo?: string
  brandAvatar?: string
  brandVerified?: boolean
  theme?: "light" | "dark" | "glass"
}

function BrandHeader({
  brandName,
  brandTagline,
  brandLogo,
  brandAvatar,
  brandVerified,
  theme = "light",
}: BrandHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      {/* Avatar/Logo */}
      <div className="relative">
        <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
          <AvatarImage src={brandAvatar || brandLogo || blockBrandedIconsAndPlaceholders.logoMark} alt={brandName} />
          <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
            {brandName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Brand Info */}
      <div className="space-y-1">
        <h1 className={cn("text-2xl font-bold tracking-tight", theme === "dark" ? "text-white" : "text-foreground")}>
          {brandName}
        </h1>
        {brandTagline && (
          <p
            className={cn(
              "text-sm max-w-xs text-balance",
              theme === "dark" ? "text-white/70" : "text-muted-foreground",
            )}
          >
            {brandTagline}
          </p>
        )}
      </div>
    </div>
  )
}

// Link Item Component
interface LinkItemProps {
  link: LinkTreeLink
  theme?: "light" | "dark" | "glass"
}

function LinkItem({ link, theme = "light" }: LinkItemProps) {
  const isFeatured = link.featured

  const getIconColor = () => {
    if (isFeatured) return "#ffffff" // White for featured links (dark bg)
    if (theme === "dark") return "#ffffff" // White for dark theme
    return undefined // Default for light/glass themes
  }

  const getCaretColor = () => {
    if (isFeatured) return "rgba(255,255,255,0.7)" // Semi-transparent white for featured
    if (theme === "dark") return "rgba(255,255,255,0.5)" // Semi-transparent white for dark
    return undefined // Default muted for light/glass
  }

  return (
    <Pressable
      href={link.href}
      className={cn(
        "group relative flex items-center gap-3 w-full rounded-xl px-4 py-3.5 transition-all duration-200",
        "hover:scale-[1.02] active:scale-[0.98]",
        isFeatured
          ? cn("bg-primary text-primary-foreground shadow-lg", "hover:bg-primary/90")
          : cn(
              theme === "dark"
                ? "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                : theme === "glass"
                  ? "bg-white/60 backdrop-blur-sm text-foreground hover:bg-white/80 border border-white/30"
                  : "bg-card text-card-foreground hover:bg-accent border border-border",
            ),
      )}
    >
      {/* Icon */}
      {link.icon && <DynamicIcon name={link.icon} size={20} color={getIconColor()} className="shrink-0" />}

      {/* Content */}
      <div className="flex-1 min-w-0 text-left">
        <span className="font-medium text-sm block truncate">{link.label}</span>
        {link.description && (
          <span
            className={cn(
              "text-xs block truncate mt-0.5",
              isFeatured ? "text-primary-foreground/70" : theme === "dark" ? "text-white/60" : "text-muted-foreground",
            )}
          >
            {link.description}
          </span>
        )}
      </div>

      {/* Badge */}
      {link.badge && (
        <Badge variant={isFeatured ? "secondary" : "default"} className="shrink-0 text-xs">
          {link.badge}
        </Badge>
      )}

      {/* Arrow */}
      <DynamicIcon
        name="lucide/chevron-right"
        size={16}
        color={getCaretColor()}
        className="shrink-0 transition-transform group-hover:translate-x-0.5"
      />
    </Pressable>
  )
}

// Social Links Section
interface SocialLinksProps {
  socialLinks: SocialLink[]
  theme?: "light" | "dark" | "glass"
}

function SocialLinks({ socialLinks, theme = "light" }: SocialLinksProps) {
  const iconColor = theme === "dark" ? "#ffffff" : undefined

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {socialLinks.map((social) => (
        <Pressable
          key={social.id}
          href={social.href}
          aria-label={social.label || social.platform}
          className={cn(
            "rounded-full min-h-12 max-h-12 h-12 max-w-12 min-w-12 w-12 items-center justify-center flex flex-1 p-2.5 transition-all duration-200",
            "hover:scale-110 active:scale-95",
            theme === "dark"
              ? "bg-white/10 text-white hover:bg-white/20"
              : theme === "glass"
                ? "bg-white/60 backdrop-blur-sm hover:bg-white/80"
                : "bg-muted hover:bg-accent",
          )}
        >
          <DynamicIcon name={social.icon} size={20} color={iconColor} />
        </Pressable>
      ))}
    </div>
  )
}

// Media Gallery Section
interface MediaGalleryProps {
  items: MediaGalleryItem[]
  title?: string
  theme?: "light" | "dark" | "glass"
}

function MediaGallery({ items, title, theme = "light" }: MediaGalleryProps) {
  return (
    <div className="space-y-3">
      {title && (
        <h3
          className={cn(
            "text-sm font-medium text-center",
            theme === "dark" ? "text-white/70" : "text-muted-foreground",
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
              theme === "dark" ? "ring-1 ring-white/10" : "ring-1 ring-border",
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
                  e.currentTarget.pause()
                  e.currentTarget.currentTime = 0
                }}
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={item.src || "/placeholder.svg"}
                alt={item.alt || ""}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
              {item.type === "video" && (
                <DynamicIcon
                  name="lucide/play"
                  size={24}
                  color="#ffffff"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              )}
            </div>
          </Pressable>
        ))}
      </div>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function LinkTreeBlock({
  brandName,
  brandTagline,
  brandLogo,
  brandAvatar,
  brandVerified,
  links = [],
  socialLinks = [],
  mediaGallery = [],
  mediaGalleryTitle,
  className,
  theme = "light",
  backgroundPattern,
  accentColor,
}: LinkTreeBlockProps) {
  return (
    <div
      className={cn(
        "relative min-h-screen w-full flex items-start justify-center py-12 px-4",
        theme === "dark"
          ? "bg-neutral-950"
          : theme === "glass"
            ? "bg-linear-to-br from-pink-100 via-purple-50 to-blue-100"
            : "bg-muted/30",
        className,
      )}
      style={accentColor ? ({ "--accent-color": accentColor } as React.CSSProperties) : undefined}
    >
      {/* Background Pattern */}
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

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Brand Header */}
        <BrandHeader
          brandName={brandName}
          brandTagline={brandTagline}
          brandLogo={brandLogo}
          brandAvatar={brandAvatar}
          brandVerified={brandVerified}
          theme={theme}
        />

        {/* Links Section */}
        {links.length > 0 && (
          <div className="space-y-3">
            {links.map((link) => (
              <LinkItem key={link.id} link={link} theme={theme} />
            ))}
          </div>
        )}

        {/* Media Gallery */}
        {mediaGallery.length > 0 && <MediaGallery items={mediaGallery} title={mediaGalleryTitle} theme={theme} />}

        {/* Social Links */}
        {socialLinks.length > 0 && <SocialLinks socialLinks={socialLinks} theme={theme} />}

        {/* Footer Branding */}
        <div className="pt-4">
          <Pressable
            href="/"
            className={cn(
              "flex items-center justify-center gap-1.5 text-xs transition-opacity hover:opacity-80",
              theme === "dark" ? "text-white/40" : "text-muted-foreground/60",
            )}
          >
            <DynamicIcon name="lucide/link" size={12} />
            <span>Powered by OpenSite</span>
          </Pressable>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// DEMO/DEFAULT EXPORT
// ============================================================================

// Default demo data for preview
export const defaultLinkTreeData: LinkTreeBlockProps = {
  brandName: "Sarah Chen",
  brandTagline: "Digital creator, photographer & coffee enthusiast ☕",
  brandAvatar: blockBrandedIconsAndPlaceholders.logoMark,
  brandVerified: true,
  links: [
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
  ],
  socialLinks: [
    { id: "s1", platform: "Instagram", href: "https://instagram.com", icon: "simple-icons/instagram" },
    { id: "s2", platform: "TikTok", href: "https://tiktok.com", icon: "simple-icons/tiktok" },
    { id: "s3", platform: "Twitter", href: "https://twitter.com", icon: "simple-icons/x" },
    { id: "s4", platform: "LinkedIn", href: "https://linkedin.com", icon: "simple-icons/linkedin" },
  ],
  mediaGallery: [
    { id: "m1", type: "image", src: imagePlaceholders[0], alt: "Photo 1" },
    { id: "m2", type: "image", src: imagePlaceholders[1], alt: "Photo 2" },
    { id: "m3", type: "video", src: videoPlaceholders[0], alt: "Video 1" },
    { id: "m4", type: "image", src: imagePlaceholders[2], alt: "Photo 3" },
    { id: "m5", type: "image", src: imagePlaceholders[3], alt: "Photo 4" },
    { id: "m6", type: "image", src: imagePlaceholders[4], alt: "Photo 5" },
  ],
  mediaGalleryTitle: "Latest Content",
  theme: "light",
  backgroundPattern: patternSvgs.dots,
}

export default LinkTreeBlock

// Example usages
// <LinkTreeBlock {...defaultLinkTreeData} theme="dark" backgroundPattern={patternSvgs.grid1} />
// <LinkTreeBlock {...defaultLinkTreeData} theme="glass" backgroundPattern={undefined} />
// <LinkTreeBlock {...defaultLinkTreeData} />
```
