# Blocks to Add to Library

## components/blocks/about

```tsx
"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MapPin, Phone } from "lucide-react"
// import patternSvgs from lib/patternSvgs.ts

export type PatternName = keyof typeof patternSvgs

interface ActionButton {
  label: string
  href?: string
  onClick?: () => void
}

interface HoursSection {
  label: string
  hours: { day: string; time: string }[]
}

interface HeroInfoSectionProps {
  // Content
  headline: string
  address?: string
  addressHref?: string
  phone?: string
  phoneHref?: string
  actionButtons?: ActionButton[]
  hoursSections?: HoursSection[]

  // Images - 1 or 2 images
  images: { src: string; alt: string }[]

  // Layout direction
  contentPosition?: "left" | "right"
  mobileStackOrder?: "content-first" | "images-first"

  // Styling
  backgroundColor?: string
  accentColor?: string
  patternBackground?: PatternName | string
  patternOpacity?: number
  className?: string
}

export function HeroInfoSection({
  headline,
  address,
  addressHref,
  phone,
  phoneHref,
  actionButtons = [],
  hoursSections = [],
  images,
  contentPosition = "left",
  mobileStackOrder = "content-first",
  backgroundColor = "#1a2332",
  accentColor = "#dc2626",
  patternBackground,
  patternOpacity = 0.1,
  className,
}: HeroInfoSectionProps) {
  const patternUrl =
    patternBackground && patternSvgs[patternBackground as PatternName]
      ? patternSvgs[patternBackground as PatternName]
      : patternBackground

  const isSingleImage = images.length === 1

  return (
    <section
      className={cn("relative w-full overflow-hidden py-12 md:py-16 lg:py-20", className)}
      style={{ backgroundColor }}
    >
      {/* Pattern Background */}
      {patternUrl && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url(${patternUrl})`,
            backgroundRepeat: "repeat",
            opacity: patternOpacity,
          }}
        />
      )}

      <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
        <div
          className={cn(
            "flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12",
            contentPosition === "right" && "lg:flex-row-reverse",
            mobileStackOrder === "images-first" && "flex-col-reverse",
          )}
        >
          {/* Content Side */}
          <div className="flex-1 space-y-6 lg:space-y-8">
            {/* Headline */}
            <h2 className="text-balance text-3xl font-bold uppercase leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
              {headline}
            </h2>

            {/* Action Buttons */}
            {actionButtons.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {actionButtons.map((button, index) => (
                  <Button
                    key={index}
                    variant="link"
                    asChild={!!button.href}
                    onClick={button.onClick}
                    className="h-auto p-0 text-sm font-semibold uppercase tracking-wider text-white underline decoration-2 underline-offset-8 hover:no-underline"
                  >
                    {button.href ? <a href={button.href}>{button.label}</a> : <span>{button.label}</span>}
                  </Button>
                ))}
              </div>
            )}

            {/* Contact Info */}
            {(address || phone) && (
              <div className="space-y-2">
                {address && (
                  <div className="flex items-center gap-3 text-sm text-white">
                    <MapPin className="size-4 shrink-0" />
                    {addressHref ? (
                      <a href={addressHref} className="hover:underline" target="_blank" rel="noopener noreferrer">
                        {address}
                      </a>
                    ) : (
                      <span>{address}</span>
                    )}
                  </div>
                )}
                {phone && (
                  <div className="flex items-center gap-3 text-sm text-white">
                    <Phone className="size-4 shrink-0" />
                    {phoneHref ? (
                      <a href={phoneHref} className="hover:underline">
                        {phone}
                      </a>
                    ) : (
                      <span>{phone}</span>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Hours Sections */}
            {hoursSections.length > 0 && (
              <div className="space-y-4">
                {hoursSections.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    <h3 className="mb-2 text-sm font-medium" style={{ color: accentColor }}>
                      {section.label}
                    </h3>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-white">
                      {section.hours.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex flex-col">
                          <span className="text-white/80">{item.day}</span>
                          <span>{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Images Side */}
          <div className="relative flex-1">
            {isSingleImage ? (
              // Single image - larger and centered
              <div className="flex justify-center">
                <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-lg shadow-2xl">
                  <img
                    src={images[0].src || "/placeholder.svg"}
                    alt={images[0].alt}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            ) : (
              // Two images - overlapping layout like screenshot
              <div className="relative min-h-[350px] md:min-h-[400px] lg:min-h-[450px]">
                {/* Primary image - larger, positioned top-left */}
                <div className="absolute left-0 top-0 z-10 aspect-[4/3] w-[70%] overflow-hidden rounded-lg shadow-2xl md:w-[65%]">
                  <img
                    src={images[0].src || "/placeholder.svg"}
                    alt={images[0].alt}
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* Secondary image - smaller, positioned bottom-right */}
                <div className="absolute bottom-0 right-0 z-20 aspect-[3/4] w-[55%] overflow-hidden rounded-lg shadow-2xl md:w-[50%]">
                  <img
                    src={images[1].src || "/placeholder.svg"}
                    alt={images[1].alt}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
```

## components/blocks/features

```tsx
"use client";

import { Brain, Camera, Plug, Braces, Image as ImageIcon, Search as SearchIcon } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils"

// These card components should only be used for this specific component
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className,
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

const items = [
  {
    title: "Reasoning",
    icon: Brain,
    desc:
      "Understand the universe: solve humanity's most difficult scientific problems with deep thought.",
  },
  {
    title: "Vision",
    icon: Camera,
    desc:
      "See the world through vision, interpreting images and visuals with sharp, insightful understanding.",
  },
  {
    title: "Tool calling",
    icon: Plug,
    desc:
      "Harness external power with tool calling, seamlessly integrating third‑party functions.",
  },
  {
    title: "Structured outputs",
    icon: Braces,
    desc:
      "Organize chaos with structured outputs, delivering clean, predictable responses.",
  },
  {
    title: "Image generation",
    icon: ImageIcon,
    desc:
      "Bring your ideas to life with image generation, creating visuals that are as unique as you are.",
  },
  {
    title: "Search",
    icon: SearchIcon,
    badge: "New",
    desc:
      "Tap into the now with real‑time search, pulling fresh, relevant data from the web and X instantly.",
  },
];

export default function Demo() {
  return (
    <div className="min-h-[60vh] w-full bg-black text-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-xs tracking-widest text-zinc-500">[ CAPABILITIES ]</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Models that fit your needs
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ title, icon: Icon, desc, badge }, i) => (
            <Card
              key={title}
              className="group relative overflow-visible border-zinc-800 bg-gradient-to-b from-zinc-950/60 to-zinc-950/30 p-0 transition-colors duration-300 hover:border-zinc-700"
            >
              {/* subtle gradient on hover */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
              </div>

              {/* faint inner glow that appears on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-tr from-white/0 to-white/0 group-hover:from-white/[0.03] group-hover:to-white/[0.06] transition-colors" />

              {/* white corner squares on hover - now outside the card and square shaped */}
              <div className="pointer-events-none absolute inset-0 hidden group-hover:block">
                <div className="absolute -left-2 -top-2 h-3 w-3 bg-white" />
                <div className="absolute -right-2 -top-2 h-3 w-3 bg-white" />
                <div className="absolute -left-2 -bottom-2 h-3 w-3 bg-white" />
                <div className="absolute -right-2 -bottom-2 h-3 w-3 bg-white" />
              </div>

              <CardHeader className="relative z-10 flex flex-row items-start gap-3 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900/70 text-zinc-200">
                  <Icon className="h-5 w-5 text-zinc-200" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg font-medium text-zinc-100">{title}</CardTitle>
                    {badge && (
                      <span className="rounded-full border border-zinc-600 px-2 py-0.5 text-[10px] leading-none text-zinc-300">
                        {badge}
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative z-10 px-6 pb-6 text-sm text-zinc-400">
                {desc}
              </CardContent>

              {/* focus ring accent on hover */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-white/0"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## components/blocks/hero

```tsx
import React from 'react';
import { cn } from '@/lib/utils'; // Assuming you have a utility for class names

/**
 * @typedef FloatingImageProps
 * @property {string} src - The source URL for the image.
 * @property {string} alt - The alt text for the image for accessibility.
 * @property {string} className - Tailwind CSS classes for positioning, sizing, and animation.
 */
interface FloatingImageProps {
  src: string;
  alt: string;
  className: string;
}

/**
 * @typedef FloatingFoodHeroProps
 * @property {string} title - The main heading text.
 * @property {string} description - The paragraph text below the heading.
 * @property {FloatingImageProps[]} images - An array of image objects to be displayed.
 * @property {string} [className] - Optional additional classes for the section container.
 */
export interface FloatingFoodHeroProps {
  title: string;
  description: string;
  images: FloatingImageProps[];
  className?: string;
}

/**
 * A decorative SVG component for the background swirl lines.
 */
const Swirls = () => (
  <>
    <svg
      className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 text-pink-100 dark:text-pink-900/20"
      width="600"
      height="600"
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M515.266 181.33C377.943 51.564 128.537 136.256 50.8123 293.565C-26.9127 450.874 125.728 600 125.728 600"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
    <svg
      className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 text-pink-100 dark:text-pink-900/20"
      width="700"
      height="700"
      viewBox="0 0 700 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M26.8838 528.274C193.934 689.816 480.051 637.218 594.397 451.983C708.742 266.748 543.953 2.22235 543.953 2.22235"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </>
);

/**
 * A responsive and animated hero section component.
 */
export function FloatingFoodHero({
  title,
  description,
  images,
  className,
}: FloatingFoodHeroProps) {
  return (
    <section
      className={cn(
        'relative w-full min-h-[60vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden bg-background py-20 md:py-32',
        className
      )}
    >
      <div className="absolute inset-0 z-0">
        <Swirls />
      </div>
      
      {/* Render floating images */}
      <div className="absolute inset-0 z-10">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={cn('absolute object-contain', image.className)}
            style={{ animationDelay: `${index * 300}ms` }}
          />
        ))}
      </div>

      {/* Text Content */}
      <div className="relative z-20 container mx-auto px-4 text-center max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          {description}
        </p>
      </div>
    </section>
  );
}
```


## components/blocks/footers

```tsx
import type * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { patternSvgs, type PatternKey } from "@/lib/pattern-svgs"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, type LucideIcon } from "lucide-react"

// ============================================================================
// TYPES
// ============================================================================

export interface FooterLink {
  label: string
  href: string
}

export interface FooterLinkColumn {
  title: string
  links: FooterLink[]
}

export interface SocialLink {
  platform: "facebook" | "twitter" | "instagram" | "linkedin" | "youtube"
  href: string
  label?: string
}

export interface ContactInfo {
  email?: string
  phone?: string
  address?: string
}

export interface FooterProps {
  /** Logo element - can be an image, SVG, or text */
  logo: React.ReactNode
  /** Short business description/tagline */
  tagline?: string
  /** Longer business summary */
  summary?: string
  /** Array of link columns for navigation */
  linkColumns?: FooterLinkColumn[]
  /** Article/blog links - renders in a multi-column grid */
  articleLinks?: FooterLink[]
  /** Title for the articles section */
  articleSectionTitle?: string
  /** Contact information */
  contact?: ContactInfo
  /** Social media links */
  socialLinks?: SocialLink[]
  /** Copyright text - defaults to current year */
  copyright?: string
  /** Company name for copyright */
  companyName?: string
  /** Bottom bar links (privacy policy, terms, etc.) */
  bottomLinks?: FooterLink[]
  /** SVG pattern background */
  pattern?: PatternKey | string
  /** Pattern opacity (0-1) */
  patternOpacity?: number
  /** Additional className for the footer */
  className?: string
}

// ============================================================================
// SOCIAL ICON MAP
// ============================================================================

const socialIcons: Record<SocialLink["platform"], LucideIcon> = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

function FooterPattern({
  pattern,
  opacity = 0.05,
}: {
  pattern: string
  opacity?: number
}) {
  const patternUrl = pattern in patternSvgs ? patternSvgs[pattern as PatternKey] : pattern

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage: `url(${patternUrl})`,
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
        opacity,
      }}
      aria-hidden="true"
    />
  )
}

function FooterBrandSection({
  logo,
  tagline,
  summary,
}: {
  logo: React.ReactNode
  tagline?: string
  summary?: string
}) {
  return (
    <div className="flex flex-col gap-4 max-w-xs">
      <div className="flex items-center">{logo}</div>
      {tagline && <p className="text-sm font-medium text-zinc-100">{tagline}</p>}
      {summary && <p className="text-sm text-zinc-400 leading-relaxed">{summary}</p>}
    </div>
  )
}

function FooterLinkColumnComponent({ column }: { column: FooterLinkColumn }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-zinc-100">{column.title}</h3>
      <ul className="flex flex-col gap-2.5">
        {column.links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FooterArticlesSection({
  title,
  links,
}: {
  title: string
  links: FooterLink[]
}) {
  // Split links into columns for better layout (max 8 per column)
  const columns: FooterLink[][] = []
  const itemsPerColumn = 8

  for (let i = 0; i < links.length; i += itemsPerColumn) {
    columns.push(links.slice(i, i + itemsPerColumn))
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-zinc-100">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-2.5">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors truncate"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

function FooterContactSection({ contact }: { contact: ContactInfo }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-zinc-100">Contact</h3>
      <ul className="flex flex-col gap-3">
        {contact.email && (
          <li>
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-2.5 text-sm text-zinc-400 hover:text-zinc-100 transition-colors group"
            >
              <Mail className="h-4 w-4 shrink-0 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
              <span className="underline underline-offset-2">{contact.email}</span>
            </a>
          </li>
        )}
        {contact.phone && (
          <li>
            <a
              href={`tel:${contact.phone.replace(/\D/g, "")}`}
              className="flex items-center gap-2.5 text-sm text-zinc-400 hover:text-zinc-100 transition-colors group"
            >
              <Phone className="h-4 w-4 shrink-0 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
              <span className="underline underline-offset-2">{contact.phone}</span>
            </a>
          </li>
        )}
        {contact.address && (
          <li>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(contact.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2.5 text-sm text-zinc-400 hover:text-zinc-100 transition-colors group"
            >
              <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
              <span className="underline underline-offset-2">{contact.address}</span>
            </a>
          </li>
        )}
      </ul>
    </div>
  )
}

function FooterSocialSection({ links }: { links: SocialLink[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-zinc-100">Follow Us</h3>
      <div className="flex items-center gap-3">
        {links.map((link) => {
          const Icon = socialIcons[link.platform]
          return (
            <a
              key={link.platform}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label || `Follow us on ${link.platform}`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100 transition-colors"
            >
              <Icon className="h-4 w-4" />
            </a>
          )
        })}
      </div>
    </div>
  )
}

function FooterBottomBar({
  copyright,
  companyName,
  bottomLinks,
}: {
  copyright?: string
  companyName?: string
  bottomLinks?: FooterLink[]
}) {
  const year = new Date().getFullYear()
  const copyrightText = copyright || `© ${year} ${companyName || "Company"}. All rights reserved.`

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-800 pt-8">
      <p className="text-sm text-zinc-500">{copyrightText}</p>
      {bottomLinks && bottomLinks.length > 0 && (
        <div className="flex items-center gap-4 sm:gap-6">
          {bottomLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-2"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

// ============================================================================
// MAIN FOOTER COMPONENT
// ============================================================================

export function ComprehensiveFooter({
  logo,
  tagline,
  summary,
  linkColumns = [],
  articleLinks = [],
  articleSectionTitle = "Recent Articles",
  contact,
  socialLinks = [],
  copyright,
  companyName,
  bottomLinks = [],
  pattern,
  patternOpacity = 0.05,
  className,
}: FooterProps) {
  return (
    <footer
      className={cn("relative overflow-hidden bg-zinc-950 text-zinc-100", className)}
    >
      {/* Pattern Background */}
      {pattern && <FooterPattern pattern={pattern} opacity={patternOpacity} />}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-10 lg:gap-12">
          {/* Top Section: Brand + Link Columns + Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Brand Section */}
            <div className="sm:col-span-2 lg:col-span-3">
              <FooterBrandSection logo={logo} tagline={tagline} summary={summary} />
            </div>

            {/* Link Columns */}
            {linkColumns.map((column, index) => (
              <div key={column.title} className="lg:col-span-2">
                <FooterLinkColumnComponent column={column} />
              </div>
            ))}

            {/* Contact + Social Section */}
            {(contact || socialLinks.length > 0) && (
              <div className="lg:col-span-3 flex flex-col gap-6">
                {contact && <FooterContactSection contact={contact} />}
                {socialLinks.length > 0 && <FooterSocialSection links={socialLinks} />}
              </div>
            )}
          </div>

          {/* Articles Section (if provided) */}
          {articleLinks.length > 0 && (
            <div className="border-t border-zinc-800 pt-8">
              <FooterArticlesSection
                title={articleSectionTitle}
                links={articleLinks}
              />
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="mt-10">
          <FooterBottomBar
            copyright={copyright}
            companyName={companyName}
            bottomLinks={bottomLinks}
          />
        </div>
      </div>
    </footer>
  )
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  FooterPattern,
  FooterBrandSection,
  FooterLinkColumnComponent,
  FooterArticlesSection,
  FooterContactSection,
  FooterSocialSection,
  FooterBottomBar,
}
```
