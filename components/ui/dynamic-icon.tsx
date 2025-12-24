import * as React from "react"

import { cn } from "../../lib/utils"

interface DynamicIconProps {
  /**
   * Icon name in format: prefix/name or prefix:name
   * Examples: "lucide/home", "mdi:account", "heroicons/check"
   */
  name: string
  /**
   * Icon size in pixels
   * @default 28
   */
  size?: number
  /**
   * Icon color - accepts any valid CSS color or "currentColor"
   * @default "currentColor"
   */
  color?: string
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Alt text for accessibility
   */
  alt?: string
}

/**
 * Lightweight icon component that dynamically loads SVG icons from icons.opensite.ai API.
 *
 * Features:
 * - Pulls SVGs from https://icons.opensite.ai API
 * - Lazy loading by default
 * - Accepts prefix/name or prefix:name format
 * - Customizable size and color via URL parameters
 * - Minimal bundle size - no icon library dependencies
 *
 * @example
 * ```tsx
 * <DynamicIcon name="lucide/home" size={24} color="currentColor" />
 * <DynamicIcon name="mdi:account" size={32} color="#ff0000" />
 * ```
 */
export function DynamicIcon({
  name,
  size = 28,
  color = "currentColor",
  className,
  alt,
}: DynamicIconProps) {
  const separator = name.includes("/") ? "/" : ":"
  const [prefix, iconName] = name.split(separator)
  const encodedColor = encodeURIComponent(color)
  const url = `https://icons.opensite.ai/api/icon/${prefix}/${iconName}?format=svg&width=${size}&height=${size}&color=${encodedColor}`

  return (
    <img
      src={url}
      alt={alt || iconName}
      width={size}
      height={size}
      loading="lazy"
      className={cn("inline-block", className)}
    />
  )
}
