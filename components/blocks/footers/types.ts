/**
 * Shared types for footer block components
 */

/**
 * Social link configuration for footer blocks.
 *
 * Uses the SocialLinkIcon component which automatically extracts
 * the platform from the URL using usePlatformFromUrl hook.
 *
 * @example
 * ```tsx
 * const socialLinks: FooterSocialLink[] = [
 *   { href: "https://instagram.com/company" },
 *   { href: "https://x.com/company", label: "Follow us on X" },
 *   { href: "https://linkedin.com/company/example" },
 * ];
 * ```
 */
export interface FooterSocialLink {
  /**
   * Link URL - required. The platform icon is automatically determined from the URL.
   */
  href: string;
  /**
   * Optional accessible label for screen readers.
   * If not provided, the platform name is used.
   */
  label?: string;
  /**
   * Optional icon name override in format: prefix/name (e.g., "cib/instagram")
   * Use when you need a specific icon that differs from the auto-detected platform.
   */
  iconNameOverride?: string;
}

