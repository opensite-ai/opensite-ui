/**
 * Footer block components - tree-shakable exports
 *
 * @example
 * ```ts
 * // Recommended: Import specific footer components
 * import { FooterLinksGrid } from "@opensite/ui/blocks/footers/footer-links-grid";
 *
 * // Or import from the footers index
 * import { FooterLinksGrid, FooterSocialNewsletter } from "@opensite/ui/blocks/footers";
 * ```
 */

// Shared types
export type { FooterSocialLink } from "./types";

// Footer components
export { FooterLinksGrid } from "./footer-links-grid";
export type {
  FooterLinksGridProps,
  FooterLinksGridMenuItem,
} from "./footer-links-grid";

export { FooterSocialNewsletter } from "./footer-social-newsletter";
export type {
  FooterSocialNewsletterProps,
  FooterSocialNewsletterSection,
  FooterSocialNewsletterLink,
} from "./footer-social-newsletter";

export { FooterSocialApps } from "./footer-social-apps";
export type {
  FooterSocialAppsProps,
  FooterSocialAppsSection,
  FooterSocialAppsAppLink,
} from "./footer-social-apps";

export { FooterSimpleCentered } from "./footer-simple-centered";
export type {
  FooterSimpleCenteredProps,
  FooterSimpleCenteredSection,
} from "./footer-simple-centered";

export { FooterBrandDescription } from "./footer-brand-description";
export type {
  FooterBrandDescriptionProps,
  FooterBrandDescriptionSection,
  FooterBrandDescriptionLink,
} from "./footer-brand-description";

export { FooterNewsletterGrid } from "./footer-newsletter-grid";
export type {
  FooterNewsletterGridProps,
  FooterNewsletterGridSection,
} from "./footer-newsletter-grid";

export { FooterCtaBanner } from "./footer-cta-banner";
export type {
  FooterCtaBannerProps,
  FooterCtaBannerSection,
  FooterCtaBannerLink,
} from "./footer-cta-banner";

export { FooterContactCard } from "./footer-contact-card";
export type {
  FooterContactCardProps,
  FooterContactCardNavLink,
} from "./footer-contact-card";

export { FooterBackgroundCard } from "./footer-background-card";
export type {
  FooterBackgroundCardProps,
  FooterBackgroundCardMenuItem,
  FooterBackgroundCardContact,
} from "./footer-background-card";

export { FooterAnimatedSocial } from "./footer-animated-social";
export type { FooterAnimatedSocialProps } from "./footer-animated-social";

export { FooterNewsletterMinimal } from "./footer-newsletter-minimal";
export type {
  FooterNewsletterMinimalProps,
  FooterNewsletterMinimalFooterLink,
} from "./footer-newsletter-minimal";

export { FooterCtaSocial } from "./footer-cta-social";
export type { FooterCtaSocialProps } from "./footer-cta-social";

export { FooterNavSocial } from "./footer-nav-social";
export type {
  FooterNavSocialProps,
  FooterNavSocialSection,
  FooterNavSocialNavLink,
} from "./footer-nav-social";

export { FooterNewsletterContact } from "./footer-newsletter-contact";
export type {
  FooterNewsletterContactProps,
  FooterNewsletterContactLink,
  FooterNewsletterContactSection,
  FooterNewsletterContactDetail,
} from "./footer-newsletter-contact";

export { FooterSplitImageAccordion } from "./footer-split-image-accordion";
export type {
  FooterSplitImageAccordionProps,
  FooterSplitImageAccordionLink,
  FooterSplitImageAccordionSection,
} from "./footer-split-image-accordion";

export { FooterAccordionSocial } from "./footer-accordion-social";
export type {
  FooterAccordionSocialProps,
  FooterAccordionSocialNavLink,
  FooterAccordionSocialSection,
} from "./footer-accordion-social";

export { FooterInfoCardsAccordion } from "./footer-info-cards-accordion";
export type {
  FooterInfoCardsAccordionProps,
  FooterInfoCardsAccordionInfoItem,
  FooterInfoCardsAccordionLink,
  FooterInfoCardsAccordionSection,
} from "./footer-info-cards-accordion";
