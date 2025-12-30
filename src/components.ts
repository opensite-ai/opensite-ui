/**
 * All UI components - tree-shakable exports
 *
 * Import specific components for optimal bundle sizes:
 *
 * @example
 * ```ts
 * // Recommended: Import specific components
 * import { Container, Section } from "@opensite/ui/components";
 *
 * // Or use granular imports
 * import { Container } from "@opensite/ui/components/container";
 * ```
 */

// Layout components
export { Container } from "../components/ui/container";
export { Section } from "../components/ui/section";

// Interactive components
export { AnimatedDialog } from "../components/ui/animated-dialog";

// Hero components
export { PageHeroBanner } from "../components/ui/page-hero-banner";
export { ImageSlider } from "../components/ui/image-slider";

// shadcn UI components
export { Button } from "../components/ui/button";
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
export { Badge } from "../components/ui/badge";
export {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../components/ui/popover";
export { DynamicIcon } from "../components/ui/dynamic-icon";

// Navigation components
export { Pressable } from "../lib/Pressable";
export type { PressableProps } from "../lib/Pressable";

// Content-specific blocks
export { AlternatingBlocks } from "../components/blocks/about/alternating-blocks";
export { MediaHoverCtas } from "../components/blocks/cta/media-hover-ctas";

// Footer blocks
export { FooterLinksGrid } from "../components/blocks/footers/footer-links-grid";
export { FooterSocialNewsletter } from "../components/blocks/footers/footer-social-newsletter";
export { FooterSocialApps } from "../components/blocks/footers/footer-social-apps";
export { FooterSimpleCentered } from "../components/blocks/footers/footer-simple-centered";
export { FooterBrandDescription } from "../components/blocks/footers/footer-brand-description";
export { FooterNewsletterGrid } from "../components/blocks/footers/footer-newsletter-grid";
export { FooterCtaBanner } from "../components/blocks/footers/footer-cta-banner";
export { FooterContactCard } from "../components/blocks/footers/footer-contact-card";
export { FooterBackgroundCard } from "../components/blocks/footers/footer-background-card";
export { FooterAnimatedSocial } from "../components/blocks/footers/footer-animated-social";
export { FooterNewsletterMinimal } from "../components/blocks/footers/footer-newsletter-minimal";
export { FooterCtaSocial } from "../components/blocks/footers/footer-cta-social";
export { FooterNavSocial } from "../components/blocks/footers/footer-nav-social";

// Re-export types for convenience
export type {
  ContainerProps,
  ContainerMaxWidth,
  SectionProps,
  SectionBackground,
  SectionSpacing,
  AnimatedDialogProps,
  AnimatedDialogSize,
  PageHeroBannerProps,
  AlternatingBlocksProps,
  AlternatingBlockSection,
  MediaHoverCtasProps,
  MediaHoverCtaItem,
  MediaHoverCtaType,
} from "./types/index";
