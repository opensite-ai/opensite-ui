import type { HTMLAttributes, ReactNode } from "react";

/**
 * Max width variants for Container component
 */
export type ContainerMaxWidth = "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "full";

/**
 * Background variants for Section component
 */
export type SectionBackground = "white" | "gray" | "dark" | "gradient" | "primary" | "secondary" | "muted";

/**
 * Spacing variants for Section component
 */
export type SectionSpacing = "sm" | "md" | "lg" | "xl";

/**
 * Size variants for AnimatedDialog component
 */
export type AnimatedDialogSize = "sm" | "md" | "lg" | "xl" | "full";

/**
 * Props for Container component
 */
export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /**
   * The content to be rendered inside the container
   */
  children: ReactNode;
  /**
   * Maximum width of the container
   * @default "xl"
   */
  maxWidth?: ContainerMaxWidth;
  /**
   * HTML element type to render
   * @default "div"
   */
  as?: keyof JSX.IntrinsicElements;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for Section component
 */
export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /**
   * Section ID for anchor links
   */
  id?: string;
  /**
   * Section title (renders as h2)
   */
  title?: string;
  /**
   * Section subtitle/eyebrow (renders above title)
   */
  subtitle?: string;
  /**
   * The content to be rendered inside the section
   */
  children: ReactNode;
  /**
   * Background style variant
   * @default "white"
   */
  background?: SectionBackground;
  /**
   * Vertical spacing variant
   * @default "lg"
   */
  spacing?: SectionSpacing;
  /**
   * Additional CSS classes (can override spacing and background styles)
   */
  className?: string;
  /**
   * Inline styles (React.CSSProperties)
   */
  style?: React.CSSProperties;
}

/**
 * Props for AnimatedDialog component
 */
export interface AnimatedDialogProps {
  /**
   * Whether the dialog is open
   */
  open: boolean;
  /**
   * Callback when the dialog open state changes
   */
  onOpenChange: (open: boolean) => void;
  /**
   * Dialog title
   */
  title?: string;
  /**
   * Eyebrow text above title
   */
  eyebrow?: string;
  /**
   * Dialog description
   */
  description?: string;
  /**
   * Dialog content
   */
  children?: ReactNode;
  /**
   * Custom header content (overrides title/eyebrow/description)
   */
  header?: ReactNode;
  /**
   * Footer content
   */
  footer?: ReactNode;
  /**
   * Dialog size variant
   * @default "lg"
   */
  size?: AnimatedDialogSize;
  /**
   * Additional CSS classes for the dialog container
   */
  className?: string;
  /**
   * Additional CSS classes for the content area
   */
  contentClassName?: string;
}

/**
 * Props for PageHeroBanner component
 */
export interface PageHeroBannerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Image URL or Media ID to display as background
   * Either imageUrl or videoUrl must be provided
   */
  imageUrl?: string;
  /**
   * Video URL or Media ID to display as background
   * Either imageUrl or videoUrl must be provided
   */
  videoUrl?: string;
  /**
   * Alt text for the image (not used for video)
   */
  alt?: string;
  /**
   * Content to display on top of the banner
   */
  children: ReactNode;
  /**
   * Custom className for the banner container
   */
  className?: string;
  /**
   * Whether to use eager loading for the image
   * @default true for hero banners
   */
  loading?: "eager" | "lazy";
  /**
   * Minimum height of the banner
   * @default "500px"
   */
  minHeight?: string;
  /**
   * Whether to show the gradient overlay
   * @default true
   */
  showOverlay?: boolean;
  /**
   * Gradient overlay opacity
   * @default 0.6
   */
  overlayOpacity?: number;
  /**
   * Maximum width of content area
   * @default "4xl"
   */
  contentMaxWidth?: ContainerMaxWidth;
  /**
   * Custom className for the gradient overlay
   * Allows customization of overlay gradient for accessibility
   */
  overlayClassName?: string;
  /**
   * Custom className for the content Container
   * Allows overriding vertical alignment (e.g., items-start, items-end)
   */
  contentClassName?: string;
}

/**
 * Block Types - Content-Specific UI Blocks
 */

/**
 * Props for AlternatingBlocks component
 */
export interface AlternatingBlockSection {
  /**
   * Content node to display (text, headings, etc.)
   */
  content: ReactNode;
  /**
   * Media node to display (image, video, icon, etc.)
   */
  media: ReactNode;
  /**
   * Whether to place media on the left side
   * @default false (media on right)
   */
  mediaLeft?: boolean;
}

export interface AlternatingBlocksProps {
  /**
   * Array of sections to display with alternating layout
   */
  sections: AlternatingBlockSection[];
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for FeatureShowcase component
 */
export interface FeatureShowcaseItem {
  /**
   * Content node to display (text, headings, etc.)
   */
  content: ReactNode;
  /**
   * Media node to display (image, video, etc.)
   */
  mediaComponent: ReactNode;
}

export interface FeatureShowcaseProps {
  /**
   * Array of feature items to display in carousel
   */
  items: FeatureShowcaseItem[];
  /**
   * Optional children to render above the carousel (e.g., section title)
   */
  children?: ReactNode;
  /**
   * Additional CSS classes for the outer container
   */
  className?: string;
  /**
   * Additional CSS classes for the carousel wrapper
   */
  carouselClassName?: string;
  /**
   * Additional CSS classes for each slide container
   */
  slideClassName?: string;
  /**
   * Additional CSS classes for the content area
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the media area
   */
  mediaClassName?: string;
  /**
   * Additional CSS classes for navigation arrows
   */
  arrowClassName?: string;
  /**
   * Whether to equalize slide heights on mobile
   * @default true
   */
  equalizeOnMobile?: boolean;
  /**
   * Whether to stretch media to fill available height on mobile
   * @default true
   */
  stretchMediaOnMobile?: boolean;
}

/**
 * Props for MediaHoverCtas component
 */
export interface MediaHoverCtaItem {
  /**
   * Content to render inside the CTA card.
   */
  content?: ReactNode;
  /**
   * Image URL to reveal on hover (optional).
   */
  onHoverImgSrc?: string;
  /**
   * Additional classes for the hover image.
   */
  imgHoverClassName?: string;
  /**
   * Alt text for the hover image (leave empty for decorative images).
   */
  altText?: string;
  /**
   * Optional href to make the card a link.
   */
  cardHref?: string;
  /**
   * Initial background color (CSS color value or CSS variable).
   * Example: "#111" or "var(--brand-900)".
   */
  initialBackgroundColor?: string;
  /**
   * Hover background color (CSS color value or CSS variable).
   * Applied only when onHoverImgSrc is not provided.
   */
  onHoverBackgroundColor?: string;
}

export type MediaHoverCtaType = MediaHoverCtaItem;

export interface MediaHoverCtasProps {
  /**
   * Additional classes for the section wrapper.
   */
  sectionClassName?: string;
  /**
   * Additional classes for the grid container.
   */
  gridClassName?: string;
  /**
   * CTA items to render.
   */
  items?: MediaHoverCtaItem[];
  /**
   * Optional Optix Flow configuration for @page-speed/img.
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}
