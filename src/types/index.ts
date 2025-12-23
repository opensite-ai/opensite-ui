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
   * Additional CSS classes
   */
  className?: string;
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
}
