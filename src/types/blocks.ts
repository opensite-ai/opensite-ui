import type { ReactNode, MouseEventHandler } from "react";
import type { VariantProps } from "class-variance-authority";
import type { buttonVariants } from "../../lib/button-variants";

/**
 * Action configuration for semantic UI blocks.
 * Used by the semantic engine to define button/link actions with full flexibility.
 * 
 * @example
 * ```tsx
 * const actions: ActionConfig[] = [
 *   { label: "Get Started", href: "/signup", variant: "default" },
 *   { label: "Learn More", href: "/about", variant: "outline" }
 * ];
 * ```
 */
export interface ActionConfig extends VariantProps<typeof buttonVariants> {
  /**
   * Button/link label text or ReactNode
   */
  label?: ReactNode;
  /**
   * Icon to display (typically before label)
   */
  icon?: ReactNode;
  /**
   * Icon to display after the label
   */
  iconAfter?: ReactNode;
  /**
   * URL for link behavior
   */
  href?: string;
  /**
   * Click handler for button behavior
   */
  onClick?: MouseEventHandler<HTMLElement>;
  /**
   * Additional CSS classes for the action
   */
  className?: string;
  /**
   * Custom children (overrides label + icon rendering)
   */
  children?: ReactNode;
  /**
   * ARIA label for accessibility
   */
  "aria-label"?: string;
}

/**
 * Logo item configuration for logo grids/carousels.
 * Supports light/dark mode variants and optional linking.
 * 
 * @example
 * ```tsx
 * const logos: LogoItem[] = [
 *   { src: "/logo1.svg", alt: "Company 1" },
 *   { src: { light: "/logo-dark.svg", dark: "/logo-light.svg" }, alt: "Company 2" }
 * ];
 * ```
 */
export interface LogoItem {
  /**
   * Image source URL or light/dark mode variants
   */
  src: string | { light: string; dark?: string };
  /**
   * Alt text for accessibility
   */
  alt: string;
  /**
   * Optional link URL
   */
  href?: string;
  /**
   * Additional CSS classes for the logo wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the img element
   */
  imgClassName?: string;
}

/**
 * Image item configuration for image grids/galleries.
 * 
 * @example
 * ```tsx
 * const images: ImageItem[] = [
 *   { src: "/image1.jpg", alt: "Description 1" },
 *   { src: "/image2.jpg", alt: "Description 2", href: "/gallery/2" }
 * ];
 * ```
 */
export interface ImageItem {
  /**
   * Image source URL
   */
  src: string;
  /**
   * Alt text for accessibility
   */
  alt: string;
  /**
   * Optional link URL
   */
  href?: string;
  /**
   * Additional CSS classes for the image
   */
  className?: string;
}

/**
 * Feature item configuration for feature lists/grids.
 * 
 * @example
 * ```tsx
 * const features: FeatureItem[] = [
 *   { title: "Fast", description: "Lightning quick performance", icon: <BoltIcon /> }
 * ];
 * ```
 */
export interface FeatureItem {
  /**
   * Feature title
   */
  title?: ReactNode;
  /**
   * Feature description
   */
  description?: ReactNode;
  /**
   * Feature icon
   */
  icon?: ReactNode;
  /**
   * Icon name for dynamic icon loading
   */
  iconName?: string;
  /**
   * Optional link URL
   */
  href?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * CSS class for icon background
   */
  iconBgClass?: string;
  /**
   * CSS class for icon color
   */
  iconColorClass?: string;
}

/**
 * Stat item configuration for stats displays.
 * 
 * @example
 * ```tsx
 * const stats: StatItem[] = [
 *   { value: "99%", label: "Uptime" },
 *   { value: "10M+", label: "Users" }
 * ];
 * ```
 */
export interface StatItem {
  /**
   * Stat value (number or formatted string)
   */
  value: ReactNode;
  /**
   * Stat label/description
   */
  label?: ReactNode;
  /**
   * Optional icon
   */
  icon?: ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Testimonial item configuration.
 * 
 * @example
 * ```tsx
 * const testimonials: TestimonialItem[] = [
 *   { quote: "Amazing product!", author: "John Doe", role: "CEO", company: "Acme Inc" }
 * ];
 * ```
 */
export interface TestimonialItem {
  /**
   * Testimonial quote text
   */
  quote: ReactNode;
  /**
   * Author name
   */
  author?: ReactNode;
  /**
   * Author role/title
   */
  role?: ReactNode;
  /**
   * Author company
   */
  company?: ReactNode;
  /**
   * Author avatar image URL
   */
  avatarSrc?: string;
  /**
   * Author avatar configuration (alternative to avatarSrc)
   */
  avatar?: {
    src: string;
    alt?: string;
    fallback?: string;
  };
  /**
   * Company logo URL
   */
  logoSrc?: string;
  /**
   * Star rating (1-5)
   */
  rating?: number;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Navigation link item configuration.
 * 
 * @example
 * ```tsx
 * const links: NavLinkItem[] = [
 *   { label: "Home", href: "/" },
 *   { label: "About", href: "/about" }
 * ];
 * ```
 */
export interface NavLinkItem {
  /**
   * Link label
   */
  label: ReactNode;
  /**
   * Link URL
   */
  href: string;
  /**
   * Optional icon
   */
  icon?: ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Social link item configuration.
 * 
 * @example
 * ```tsx
 * const socials: SocialLinkItem[] = [
 *   { platform: "twitter", href: "https://twitter.com/company", icon: <TwitterIcon /> }
 * ];
 * ```
 */
export interface SocialLinkItem {
  /**
   * Social platform name
   */
  platform?: string;
  /**
   * Display label for the link
   */
  label?: ReactNode;
  /**
   * Link URL
   */
  href: string;
  /**
   * Platform icon
   */
  icon?: ReactNode;
  /**
   * ARIA label for accessibility
   */
  "aria-label"?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Base props shared by all block components.
 * Provides consistent className patterns for customization.
 */
export interface BlockBaseProps {
  /**
   * Additional CSS classes for the outer section/container
   */
  className?: string;
  /**
   * Additional CSS classes for the inner container
   */
  containerClassName?: string;
}

/**
 * Common content props for blocks with heading/description.
 */
export interface BlockContentProps {
  /**
   * Badge/eyebrow content above heading
   */
  badge?: ReactNode;
  /**
   * Main heading content
   */
  heading?: ReactNode;
  /**
   * Description/subheading content
   */
  description?: ReactNode;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
}

/**
 * Common action props for blocks with CTA buttons.
 */
export interface BlockActionProps {
  /**
   * Array of action configurations for buttons/links
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: ReactNode;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
}

/**
 * Common logo props for blocks with logo displays.
 */
export interface BlockLogoProps {
  /**
   * Array of logo configurations
   */
  logos?: LogoItem[];
  /**
   * Custom slot for rendering logos (overrides logos array)
   */
  logosSlot?: ReactNode;
  /**
   * Tagline text above/below logos
   */
  logosTagline?: ReactNode;
  /**
   * Additional CSS classes for the logos container
   */
  logosClassName?: string;
}

/**
 * OptixFlow image optimization configuration.
 */
export interface OptixFlowConfig {
  /**
   * API key for OptixFlow service
   */
  apiKey: string;
  /**
   * Compression level (0-100)
   */
  compression?: number;
}
