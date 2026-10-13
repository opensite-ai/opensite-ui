import type { HeadingLevel } from "../../lib/heading-level";

/**
 * Heading contract for a block whose primary title accepts `headingLevel`.
 *
 * Page renderers (customer-sites initial-HTML projection and hydrated
 * renderer, Octane) read this instead of hard-coded block lists. Give level 1
 * to the first block on a page whose `canLeadPage` is true, and level 2 to
 * every other block listed here. Blocks that are not listed don't accept
 * `headingLevel`, so don't pass it to them.
 */
export interface BlockHeadingContract {
  /** Prop that carries the primary title (a dot path for nested titles). */
  titleProp: string;
  /** Level rendered when `headingLevel` is omitted. */
  defaultHeadingLevel: HeadingLevel;
  /** The primary title follows the `headingLevel` prop. */
  supportsHeadingLevel: true;
  /** The block may take level 1 when it is the first heading-capable block on a page. */
  canLeadPage: boolean;
  /** String props rendered as non-paragraph eyebrow text above the primary title. */
  eyebrowProps: readonly string[];
}

function entry(
  titleProp: string,
  defaultHeadingLevel: HeadingLevel,
  eyebrowProps: readonly string[] = [],
): BlockHeadingContract {
  return {
    titleProp,
    defaultHeadingLevel,
    supportsHeadingLevel: true,
    canLeadPage: true,
    eyebrowProps,
  };
}

/** Heading contract by block id. */
export const BLOCK_HEADING_CONTRACT: Readonly<Record<string, BlockHeadingContract>> =
  Object.freeze({
    "about-interactive-tabs": entry("title", 1),
    "about-location-info-hero": entry("headline", 2),
    "about-mission-features": entry("title", 1),
    "about-split-hero": entry("heading", 1),
    "about-story-hero": entry("title", 1),
    "contact-careers": entry("heading", 1),
    "hero-ad-campaign-expert": entry("heading", 1),
    "hero-adaptable-product-grid": entry("heading", 1),
    "hero-agency-animated-images": entry("heading", 1),
    "hero-ai-powered-carousel": entry("heading", 1),
    "hero-announcement-badge": entry("heading", 1),
    "hero-architecture-fullscreen": entry("heading", 1),
    "hero-badge-image-split": entry("heading", 1),
    "hero-badge-shadow-overlay": entry("heading", 1),
    "hero-billing-platform-logos": entry("heading", 1),
    "hero-business-carousel-dots": entry("heading", 1),
    "hero-business-operations-mosaic": entry("heading", 1),
    "hero-centered-gradient-cta": entry("heading", 1),
    "hero-centered-image-grid": entry("heading", 1),
    "hero-centered-screenshot": entry("heading", 1),
    "hero-coming-soon-countdown": entry("heading", 1),
    "hero-community-survey-cta": entry("heading", 1),
    "hero-conversation-intelligence": entry("headingPrimary", 1),
    "hero-conversion-video-play": entry("heading", 1),
    "hero-creative-studio-stacked": entry("heading", 1),
    "hero-crm-streamlined": entry("heading", 1),
    "hero-customer-support-layered": entry("heading", 1),
    "hero-dashed-border-features": entry("heading", 1),
    "hero-design-carousel-portfolio": entry("heading", 1),
    "hero-design-showcase-logos": entry("heading", 1),
    "hero-design-system-3d": entry("heading", 1),
    "hero-developer-tools-code": entry("heading", 1),
    "hero-digital-agency-fullscreen": entry("heading", 1),
    "hero-ecommerce-product-showcase": entry("heading", 1),
    "hero-enterprise-security": entry("heading", 1),
    "hero-event-registration": entry("heading", 1),
    "hero-feature-cards-grid": entry("heading", 1),
    "hero-floating-images": entry("heading", 1),
    "hero-fullscreen-background-image": entry("heading", 1),
    "hero-fullscreen-logo-cta": entry("heading", 1),
    "hero-gradient-avatars-rating": entry("heading", 1),
    "hero-gradient-client-focused": entry("heading", 1),
    "hero-grid-pattern-efficiency": entry("heading", 1),
    "hero-grid-pattern-solutions": entry("heading", 1),
    "hero-hiring-animated-text": entry("headingPrefix", 1),
    "hero-image-left-content": entry("heading", 1),
    "hero-image-slider": entry("heading", 1),
    "hero-innovation-image-grid": entry("heading", 1),
    "hero-logo-centered-screenshot": entry("heading", 1),
    "hero-marketplace-scattered-images": entry("heading", 1),
    "hero-mental-health-team": entry("heading", 1),
    "hero-mentorship-video-split": entry("heading", 1),
    "hero-minimal-centered-dark": entry("heading", 1),
    "hero-mobile-app-download": entry("heading", 1),
    "hero-newsletter-minimal": entry("heading", 1),
    "hero-overlay-cta-grid": entry("heading", 1),
    "hero-pattern-badge-logos": entry("heading", 1),
    "hero-pattern-logo-tech-stack": entry("heading", 1),
    "hero-platform-features-grid": entry("heading", 1),
    "hero-portfolio-creative": entry("heading", 1),
    "hero-premium-split-avatars": entry("brandName", 1),
    "hero-presentation-platform-video": entry("heading", 1),
    "hero-pricing-comparison": entry("heading", 1),
    "hero-product-showcase-floating": entry("heading", 2),
    "hero-productivity-launcher-video": entry("heading", 1),
    "hero-saas-dashboard-preview": entry("heading", 1),
    "hero-shared-inbox-layered": entry("heading", 1),
    "hero-simple-centered-image": entry("heading", 1),
    "hero-software-growth-video-dialog": entry("heading", 1),
    "hero-spiral-pattern-cards": entry("heading", 1),
    "hero-split-geometric-shapes": entry("heading", 1),
    "hero-split-icon-cards": entry("heading", 2),
    "hero-split-image-newsletter": entry("heading", 1),
    "hero-split-spiral-shapes": entry("heading", 1),
    "hero-startup-launch-cta": entry("heading", 1),
    "hero-stats-social-proof": entry("heading", 1),
    "hero-task-timer-animated": entry("heading", 1),
    "hero-tech-carousel": entry("items.0.title", 2),
    "hero-testimonial-image-grid": entry("heading", 1),
    "hero-therapy-testimonial-grid": entry("heading", 1),
    "hero-ui-library-showcase": entry("heading", 1),
    "hero-video-background-dark": entry("heading", 1),
    "hero-video-dialog-gradient": entry("heading", 1),
    "hero-video-overlay-stars": entry("heading", 1),
    "hero-welcome-asymmetric-images": entry("heading", 1),
    "process-icon-timeline": entry("heading", 1),
    "timeline-tabbed-phases": entry("heading", 1),
  });

/**
 * Look up a block's heading contract by block id (`hero-announcement-badge`)
 * or block ref (`hero/hero-announcement-badge`).
 */
export function getBlockHeadingContract(
  blockIdOrRef: string,
): BlockHeadingContract | undefined {
  const id = blockIdOrRef.slice(blockIdOrRef.lastIndexOf("/") + 1);
  return Object.prototype.hasOwnProperty.call(BLOCK_HEADING_CONTRACT, id)
    ? BLOCK_HEADING_CONTRACT[id]
    : undefined;
}
