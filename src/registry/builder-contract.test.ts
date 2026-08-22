import { describe, expect, it } from "vitest";

import { BLOCK_REGISTRY } from "./blocks";
import {
  BUILDER_CONTRACT_VERSION,
  createBuilderContractBundle,
} from "./builder-contract";
import type { BlockRegistryEntry, BuilderContractBlockSource } from "./types";

function HeroSimpleCenteredImage() {
  return null;
}

function NavbarImagePreview() {
  return null;
}

function FooterSplitImageAccordion() {
  return null;
}

function AboutStoryExpertise() {
  return null;
}

const SAMPLE_BLOCKS = [
  {
    id: "hero-simple-centered-image",
    name: "Hero Simple Centered Image",
    description: "Hero block",
    semanticTags: ["hero", "image"],
    category: "hero",
    component: HeroSimpleCenteredImage,
    props: "HeroSimpleCenteredImageProps",
    exampleUsage: "<HeroSimpleCenteredImage />",
  },
  {
    id: "navbar-image-preview",
    name: "Navbar Image Preview",
    description: "Navbar block",
    semanticTags: ["navbar", "navigation"],
    category: "navbar",
    component: NavbarImagePreview,
    props: "NavbarImagePreviewProps",
    exampleUsage: "<NavbarImagePreview />",
  },
  {
    id: "footer-split-image-accordion",
    name: "Footer Split Image Accordion",
    description: "Footer block",
    semanticTags: ["footer", "newsletter"],
    category: "footer",
    component: FooterSplitImageAccordion,
    props: "FooterSplitImageAccordionProps",
    exampleUsage: "<FooterSplitImageAccordion />",
  },
  {
    id: "about-story-expertise",
    name: "About Story Expertise",
    description: "About block",
    semanticTags: ["about", "story"],
    category: "about",
    component: AboutStoryExpertise,
    props: "AboutStoryExpertiseProps",
    exampleUsage: "<AboutStoryExpertise />",
  },
] satisfies BlockRegistryEntry[];

const SAMPLE_SOURCES: Record<string, BuilderContractBlockSource> = {
  "hero-simple-centered-image": {
    exportPath: "./blocks/hero/hero-simple-centered-image",
    modulePath: "@opensite/ui/blocks/hero/hero-simple-centered-image",
    typesPath: "./dist/hero-simple-centered-image.d.ts",
    importPath: "./dist/hero-simple-centered-image.js",
    requirePath: "./dist/hero-simple-centered-image.cjs",
  },
  "navbar-image-preview": {
    exportPath: "./blocks/navbars/navbar-image-preview",
    modulePath: "@opensite/ui/blocks/navbars/navbar-image-preview",
    typesPath: "./dist/navbar-image-preview.d.ts",
    importPath: "./dist/navbar-image-preview.js",
    requirePath: "./dist/navbar-image-preview.cjs",
  },
  "footer-split-image-accordion": {
    exportPath: "./blocks/footers/footer-split-image-accordion",
    modulePath: "@opensite/ui/blocks/footers/footer-split-image-accordion",
    typesPath: "./dist/footer-split-image-accordion.d.ts",
    importPath: "./dist/footer-split-image-accordion.js",
    requirePath: "./dist/footer-split-image-accordion.cjs",
  },
};

const ABOUT_BLOCK_IDS = [
  "alternating-blocks",
  "about-mission-features",
  "about-stats-showcase",
  "about-company-profile",
  "about-vision-gallery",
  "about-developer-story",
  "about-story-gallery",
  "about-streamline-team",
  "about-developer-profile",
  "about-startup-team",
  "about-minimal-story",
  "about-story-hero",
  "about-stats-sidebar",
  "about-interactive-tabs",
  "about-mission-dual-image",
  "about-story-expertise",
  "about-network-spotlight",
  "about-location-info-hero",
  "about-split-hero",
  "about-mission-principles",
  "about-expandable-values",
  "community-initiatives",
  "about-culture-tabs",
] as const;

const ABOUT_BLOCK_IDS_WITH_MEDIA = [
  "alternating-blocks",
  "about-mission-features",
  "about-stats-showcase",
  "about-company-profile",
  "about-vision-gallery",
  "about-developer-story",
  "about-story-gallery",
  "about-streamline-team",
  "about-developer-profile",
  "about-startup-team",
  "about-minimal-story",
  "about-story-hero",
  "about-interactive-tabs",
  "about-mission-dual-image",
  "about-story-expertise",
  "about-network-spotlight",
  "about-location-info-hero",
  "about-split-hero",
  "community-initiatives",
  "about-culture-tabs",
] as const;

const ARTICLE_BLOCK_IDS = [
  "article-hero-prose",
  "article-sidebar-sticky",
  "article-toc-sidebar",
  "article-breadcrumb-social",
  "article-compact-toc",
  "article-chapters-author",
  "article-split-animated",
] as const;

const ARTICLE_BLOCK_IDS_WITH_MEDIA = [...ARTICLE_BLOCK_IDS] as const;

// ============================================================
// LINK-PAGE BLOCK IDs
// ============================================================
const LINK_PAGE_BLOCK_IDS = [
  "link-tree-block",
  "link-page-minimal-profile",
  "link-page-newsletter-social",
  "link-page-grid-cards",
  "link-page-bento-layout",
] as const;

const LINK_PAGE_BLOCK_IDS_WITH_MEDIA = [
  "link-page-minimal-profile",
  "link-page-newsletter-social",
  "link-page-grid-cards",
  "link-page-bento-layout",
] as const;

// ============================================================
// PROCESS BLOCK IDs
// ============================================================
const PROCESS_BLOCK_IDS = [
  "process-sticky-steps",
  "process-scroll-image",
  "process-hover-cards",
  "process-icon-timeline",
  "process-expandable-timeline",
  "process-roadmap-timeline",
  "process-mission-principles",
  "process-steps-grid",
  "process-numbered-services",
] as const;

const PROCESS_BLOCK_IDS_WITH_MEDIA = [
  "process-scroll-image",
  "process-hover-cards",
] as const;

// ============================================================
// STATS BLOCK IDs
// ============================================================
const STATS_BLOCK_IDS = [
  "stats-simple-grid",
  "stats-icon-cards",
  "stats-timeline-tabs",
  "stats-primary-secondary",
  "stats-growth-timeline",
  "stats-impact-grid",
  "stats-circular-progress",
  "stats-card-group",
  "stats-animated-counter",
  "stats-number-ticker",
  "stats-milestone-sidebar",
  "stats-bar-comparison",
] as const;

const STATS_BLOCK_IDS_WITH_MEDIA = [
  "stats-card-group",
] as const;

// ============================================================
// FAQ BLOCK IDs
// ============================================================
const FAQ_BLOCK_IDS = [
  "faq-simple-accordion",
  "faq-static-list",
  "faq-centered-accordion",
  "faq-badge-support",
  "faq-numbered-list",
  "faq-numbered-grid",
  "faq-split-help",
  "faq-categorized-sections",
  "faq-muted-cards",
  "faq-bordered-badge",
  "faq-gradient-categories",
  "faq-sidebar-navigation",
  "faq-card-categories",
  "faq-icon-benefits",
  "faq-rounded-cards",
  "faq-profile-sidebar",
  "faq-split-hero",
] as const;

const FAQ_BLOCK_IDS_WITH_MEDIA = [
  "faq-profile-sidebar",
  "faq-split-hero",
] as const;

// ============================================================
// BLOG BLOCK IDs
// ============================================================
const BLOG_BLOCK_IDS = [
  "blog-grid-author-cards",
  "blog-cards-tagline-cta",
  "blog-cards-read-time",
  "blog-category-overlay",
  "blog-featured-popular",
  "blog-related-articles",
  "blog-tech-insights",
  "blog-horizontal-cards",
  "blog-filtered-results",
  "blog-masonry-featured",
  "blog-horizontal-timeline",
  "blog-grid-nine-posts",
  "blog-carousel-apple",
] as const;

// ============================================================
// CAROUSEL BLOCK IDs
// ============================================================
const CAROUSEL_BLOCK_IDS = [
  "carousel-animated-sections",
  "carousel-auto-progress-slides",
  "carousel-autoplay-progress",
  "carousel-feature-badge",
  "carousel-fullscreen-scroll-fx",
  "carousel-gallery-thumbnails",
  "carousel-horizontal-cards",
  "carousel-image-hero",
  "carousel-multi-step-showcase",
  "carousel-portfolio-hero",
  "carousel-product-feature-showcase",
  "carousel-progress-slider",
  "carousel-scrolling-feature-showcase",
] as const;

// ============================================================
// GALLERY BLOCK IDs
// ============================================================
const GALLERY_BLOCK_IDS = [
  "expandable-case-study-cards",
  "carousel-badge-cards",
  "carousel-gradient-overlay",
  "carousel-demo-link",
  "auto-scroll-carousel",
  "carousel-sidebar-resources",
  "carousel-icon-tabs",
  "testimonial-carousel-cards",
  "carousel-icon-sidebar",
  "carousel-gradient-text",
  "service-hover-carousel",
  "carousel-tabs-content",
  "carousel-scale-focus",
  "masonry-motion-grid",
  "blur-vignette-grid",
  "interior-carousel",
] as const;

const GALLERY_BLOCK_IDS_WITH_MEDIA = [
  "expandable-case-study-cards",
  "carousel-badge-cards",
  "carousel-gradient-overlay",
  "carousel-demo-link",
  "auto-scroll-carousel",
  "carousel-sidebar-resources",
  "testimonial-carousel-cards",
  "carousel-icon-sidebar",
  "carousel-gradient-text",
  "service-hover-carousel",
  "carousel-tabs-content",
  "carousel-scale-focus",
  "interior-carousel",
] as const;

// ============================================================
// FOOTER BLOCK IDs
// ============================================================
const FOOTER_BLOCK_IDS = [
  "footer-links-grid",
  "footer-social-newsletter",
  "footer-social-apps",
  "footer-simple-centered",
  "footer-brand-description",
  "footer-brand-links-contact",
  "footer-comprehensive-links",
  "footer-newsletter-grid",
  "footer-cta-banner",
  "footer-contact-card",
  "footer-background-card",
  "footer-animated-social",
  "footer-newsletter-minimal",
  "footer-cta-social",
  "footer-nav-social",
  "footer-newsletter-contact",
  "footer-split-image-accordion",
  "footer-accordion-social",
  "footer-info-cards-accordion",
] as const;

const FOOTER_BLOCK_IDS_WITH_MEDIA = [
  "footer-brand-links-contact",
  "footer-comprehensive-links",
] as const;

// ============================================================
// NAVBAR BLOCK IDs
// ============================================================
const NAVBAR_BLOCK_IDS = [
  "navbar-dropdown-menu",
  "navbar-centered-menu",
  "navbar-mega-menu",
  "navbar-enterprise-mega",
  "navbar-feature-grid",
  "navbar-floating-pill",
  "navbar-platform-resources",
  "navbar-image-preview",
  "navbar-dark-icons",
  "navbar-animated-preview",
  "navbar-multi-column-groups",
  "navbar-sidebar-mobile",
  "navbar-transparent-overlay",
  "navbar-education-platform",
  "navbar-sticky-compact",
  "navbar-search-focused",
  "navbar-simple-links",
  "navbar-split-cta",
  "navbar-icon-links",
  "navbar-tabbed-sections",
  "navbar-fullscreen-menu",
] as const;

const NAVBAR_BLOCK_IDS_WITH_MEDIA: readonly string[] = [] as const;

// ============================================================
// TESTIMONIALS BLOCK IDs
// ============================================================
const TESTIMONIALS_BLOCK_IDS = [
  "testimonials-list-verified",
  "testimonials-images-helpful",
  "testimonials-bento-grid",
  "testimonials-twitter-cards",
  "testimonials-carousel-image",
  "testimonials-centered-avatars",
  "testimonials-company-logo",
  "testimonials-grid-add-review",
  "testimonials-marquee",
  "testimonials-simple-grid",
  "testimonials-slider-minimal",
  "testimonials-split-image",
  "testimonials-stats-header",
  "testimonials-wall-compact",
  "testimonials-mini-dividers",
  "testimonials-logo-cards",
  "testimonials-quote-carousel",
  "testimonials-animated-split",
  "testimonials-scrolling-columns",
  "testimonials-minimal-numbered",
  "testimonials-parallax-number",
  "testimonials-masonry-grid",
  "testimonials-large-quote",
] as const;

const TESTIMONIALS_BLOCK_IDS_WITH_MEDIA = [
  "testimonials-list-verified",
  "testimonials-images-helpful",
  "testimonials-bento-grid",
  "testimonials-twitter-cards",
  "testimonials-carousel-image",
  "testimonials-centered-avatars",
  "testimonials-company-logo",
  "testimonials-grid-add-review",
  "testimonials-marquee",
  "testimonials-simple-grid",
  "testimonials-slider-minimal",
  "testimonials-stats-header",
  "testimonials-wall-compact",
  "testimonials-mini-dividers",
  "testimonials-logo-cards",
  "testimonials-quote-carousel",
  "testimonials-animated-split",
  "testimonials-scrolling-columns",
  "testimonials-minimal-numbered",
  "testimonials-parallax-number",
  "testimonials-masonry-grid",
  "testimonials-large-quote",
] as const;

// ============================================================
// FEATURES BLOCK IDs
// ============================================================
const FEATURES_BLOCK_IDS = [
  "feature-showcase",
  "feature-capabilities-grid",
  "feature-split-image",
  "feature-split-image-reverse",
  "feature-icon-grid-bordered",
  "feature-checklist-image",
  "feature-carousel-progress",
  "feature-card-grid-linked",
  "feature-numbered-cards",
  "feature-icon-grid-accent",
  "feature-three-column-values",
  "feature-badge-grid-six",
  "feature-pattern-grid-links",
  "feature-tabbed-content-image",
  "feature-utility-cards-grid",
  "feature-bento-utilities",
  "feature-checklist-three-column",
  "feature-integration-cards",
  "feature-icon-tabs-content",
  "feature-image-overlay-badge",
  "feature-category-image-cards",
  "feature-bento-image-grid",
  "feature-image-cards-three-column",
  "feature-icon-grid-muted",
  "feature-stats-highlight",
  "feature-accordion-image",
  "feature-animated-carousel",
] as const;

const FEATURES_BLOCK_IDS_WITH_MEDIA = [
  "feature-split-image",
  "feature-split-image-reverse",
  "feature-checklist-image",
  "feature-card-grid-linked",
  "feature-numbered-cards",
  "feature-tabbed-content-image",
  "feature-utility-cards-grid",
  "feature-bento-utilities",
  "feature-checklist-three-column",
  "feature-icon-tabs-content",
  "feature-category-image-cards",
  "feature-bento-image-grid",
  "feature-image-cards-three-column",
  "feature-accordion-image",
  "feature-animated-carousel",
] as const;

// ============================================================
// CONTACT BLOCK IDs
// ============================================================
const CONTACT_BLOCK_IDS = [
  "contact-floating-banner",
  "contact-callback",
  "contact-card",
  "contact-careers",
  "contact-catering",
  "contact-consultation",
  "contact-dark",
  "contact-demo",
  "contact-emergency",
  "contact-event",
  "contact-faq",
  "contact-feedback",
  "contact-fitness",
  "contact-guest",
  "contact-image",
  "contact-insurance",
  "contact-interview",
  "contact-locations",
  "contact-maintenance",
  "contact-map",
  "contact-minimal",
  "contact-moving",
  "contact-multistep",
  "contact-partnership",
  "contact-photography",
  "contact-press",
  "contact-quote",
  "contact-referral",
  "contact-report",
  "contact-reservation",
  "contact-retreat",
  "contact-rsvp",
  "contact-sales",
  "contact-schedule",
  "contact-sponsorship",
  "contact-support",
  "contact-help-center",
  "contact-tenant",
  "contact-vendor",
  "contact-volunteer",
  "contact-warranty",
  "contact-wedding",
] as const;

const CONTACT_BLOCK_IDS_WITH_MEDIA = [
  "contact-image",
  "contact-photography",
] as const;

// ============================================================
// HERO BLOCK IDs (all except hero-mental-health-team and hero-mentorship-video-split)
// ============================================================
const HERO_BLOCK_IDS = [
  "hero-overlay-cta-grid",
  "hero-split-icon-cards",
  "hero-floating-images",
  "hero-badge-image-split",
  "hero-image-left-content",
  "hero-image-slider",
  "hero-centered-image-grid",
  "hero-centered-screenshot",
  "hero-pattern-badge-logos",
  "hero-logo-centered-screenshot",
  "hero-pattern-logo-tech-stack",
  "hero-announcement-badge",
  "hero-tech-carousel",
  "hero-simple-centered-image",
  "hero-platform-features-grid",
  "hero-spiral-pattern-cards",
  "hero-split-spiral-shapes",
  "hero-split-geometric-shapes",
  "hero-community-survey-cta",
  "hero-marketplace-scattered-images",
  "hero-badge-shadow-overlay",
  "hero-video-background-dark",
  "hero-grid-pattern-efficiency",
  "hero-dashed-border-features",
  "hero-design-carousel-portfolio",
  "hero-gradient-client-focused",
  "hero-ui-library-showcase",
  "hero-fullscreen-background-image",
  "hero-fullscreen-logo-cta",
  "hero-gradient-avatars-rating",
  "hero-task-timer-animated",
  "hero-ai-powered-carousel",
  "hero-ad-campaign-expert",
  "hero-adaptable-product-grid",
  "hero-presentation-platform-video",
  "hero-grid-pattern-solutions",
  "hero-crm-streamlined",
  "hero-billing-platform-logos",
  "hero-software-growth-video-dialog",
  "hero-conversion-video-play",
  "hero-design-showcase-logos",
  "hero-video-overlay-stars",
  "hero-productivity-launcher-video",
  "hero-hiring-animated-text",
  "hero-split-image-newsletter",
  "hero-centered-gradient-cta",
  "hero-stats-social-proof",
  "hero-feature-cards-grid",
  "hero-testimonial-image-grid",
  "hero-design-system-3d",
  "hero-architecture-fullscreen",
  "hero-innovation-image-grid",
  "hero-video-dialog-gradient",
  "hero-minimal-centered-dark",
  "hero-product-showcase-floating",
  "hero-saas-dashboard-preview",
  "hero-therapy-testimonial-grid",
  "hero-business-operations-mosaic",
  "hero-agency-animated-images",
  "hero-welcome-asymmetric-images",
  "hero-startup-launch-cta",
  "hero-enterprise-security",
  "hero-creative-studio-stacked",
  "hero-digital-agency-fullscreen",
  "hero-customer-support-layered",
  "hero-shared-inbox-layered",
  "hero-conversation-intelligence",
  "hero-business-carousel-dots",
  "hero-developer-tools-code",
  "hero-ecommerce-product-showcase",
  "hero-mobile-app-download",
  "hero-pricing-comparison",
  "hero-newsletter-minimal",
  "hero-coming-soon-countdown",
  "hero-event-registration",
  "hero-portfolio-creative",
] as const;

const HERO_BLOCK_IDS_WITH_MEDIA = [
  "hero-overlay-cta-grid",
  "hero-floating-images",
  "hero-badge-image-split",
  "hero-image-left-content",
  "hero-image-slider",
  "hero-centered-image-grid",
  "hero-centered-screenshot",
  "hero-pattern-badge-logos",
  "hero-logo-centered-screenshot",
  "hero-pattern-logo-tech-stack",
  "hero-tech-carousel",
  "hero-simple-centered-image",
  "hero-spiral-pattern-cards",
  "hero-split-spiral-shapes",
  "hero-split-geometric-shapes",
  "hero-community-survey-cta",
  "hero-marketplace-scattered-images",
  "hero-badge-shadow-overlay",
  "hero-video-background-dark",
  "hero-design-carousel-portfolio",
  "hero-gradient-client-focused",
  "hero-ui-library-showcase",
  "hero-fullscreen-background-image",
  "hero-gradient-avatars-rating",
  "hero-ai-powered-carousel",
  "hero-ad-campaign-expert",
  "hero-adaptable-product-grid",
  "hero-presentation-platform-video",
  "hero-grid-pattern-solutions",
  "hero-crm-streamlined",
  "hero-billing-platform-logos",
  "hero-software-growth-video-dialog",
  "hero-conversion-video-play",
  "hero-design-showcase-logos",
  "hero-video-overlay-stars",
  "hero-productivity-launcher-video",
  "hero-hiring-animated-text",
  "hero-split-image-newsletter",
  "hero-stats-social-proof",
  "hero-design-system-3d",
  "hero-architecture-fullscreen",
  "hero-innovation-image-grid",
  "hero-video-dialog-gradient",
  "hero-product-showcase-floating",
  "hero-saas-dashboard-preview",
  "hero-therapy-testimonial-grid",
  "hero-business-operations-mosaic",
  "hero-agency-animated-images",
  "hero-welcome-asymmetric-images",
  "hero-startup-launch-cta",
  "hero-creative-studio-stacked",
  "hero-digital-agency-fullscreen",
  "hero-customer-support-layered",
  "hero-shared-inbox-layered",
  "hero-conversation-intelligence",
  "hero-business-carousel-dots",
  "hero-ecommerce-product-showcase",
  "hero-mobile-app-download",
  "hero-event-registration",
  "hero-portfolio-creative",
] as const;


const FORBIDDEN_EXAMPLE_PATTERNS = [
  /\/images\//,
  /imagePlaceholders/,
  /videoPlaceholders/,
] as const;

const FORBIDDEN_ARTICLE_PROP_PATTERNS = [
  /\bshareUrls=/,
  /\bctaButtonText=/,
  /\bctaText=/,
  /\bctaHref=/,
] as const;

function collectStrings(value: unknown): string[] {
  if (typeof value === "string") {
    return [value];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => collectStrings(item));
  }

  if (value && typeof value === "object") {
    return Object.values(value).flatMap((item) => collectStrings(item));
  }

  return [];
}

function collectMediaStrings(value: unknown, path: string[] = []): string[] {
  if (typeof value === "string") {
    const leaf = path[path.length - 1] ?? "";
    const pathText = path.join(".");
    const isAltText = /alt/i.test(leaf);
    // Enum tokens whose leaf ends in "Aspect" (logoAspect: "horizontal",
    // logoBannerAspect: "standard") sit under a logo-ish path but select a
    // SHAPE, not a media asset — excluded like alt text so the absolute-URL
    // assertions below keep checking only real media values.
    const isAspectToken = /aspect$/i.test(leaf);
    const isMediaPath =
      /(src|image|images|avatar|logo|media)/i.test(pathText) &&
      !isAltText &&
      !isAspectToken;

    return isMediaPath ? [value] : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      collectMediaStrings(item, [...path, String(index)]),
    );
  }

  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) =>
      collectMediaStrings(item, [...path, key]),
    );
  }

  return [];
}

describe("createBuilderContractBundle", () => {
  it("builds the required Phase 1 contract sections", () => {
    const bundle = createBuilderContractBundle({
      blocks: SAMPLE_BLOCKS,
      uiVersion: "3.2.1",
      exportedAt: "2026-03-26T00:00:00.000Z",
      blockSources: SAMPLE_SOURCES,
    });

    expect(bundle.metadata).toEqual({
      contractVersion: BUILDER_CONTRACT_VERSION,
      uiVersion: "3.2.1",
      exportedAt: "2026-03-26T00:00:00.000Z",
      source: "@opensite/ui",
      totalBlocks: 4,
    });

    expect(bundle.sharedLayout.canonicalLayoutKey).toBe("_layout");

    // All five Phase 1 symbolic dynamic sources share the same definition
    // shape (symbolic + dashtrack-ai routing-build hydration, requiredFields).
    const dynamicSourceKeys = [
      "blog_feed",
      "blog_post",
      "testimonials_feed",
      "instagram_feed",
      "events_feed",
    ] as const;
    for (const key of dynamicSourceKeys) {
      const source = bundle.dynamicSources[key];
      expect(source.sourceType).toBe(key);
      expect(source.symbolic).toBe(true);
      expect(source.hydrationOwner).toBe("dashtrack-ai");
      expect(source.hydrationPhase).toBe("routing-build");
      expect(source.requiredFields).toEqual(["type"]);
      expect(typeof source.canonicalPayloadExpectation).toBe("string");
    }

    expect(bundle.dynamicSources.blog_feed.optionalFields).toEqual([
      "limit",
      "offset",
      "category",
      "tag",
      "featuredOnly",
      "bindTo",
    ]);
    expect(
      bundle.dynamicSources.blog_feed.canonicalPayloadExpectation,
    ).toContain("one name (string) or multiple names (string[])");
    expect(bundle.dynamicSources.blog_post.optionalFields).toEqual([
      "slug",
      "current",
      "bindTo",
    ]);
    expect(bundle.dynamicSources.testimonials_feed.optionalFields).toEqual([
      "limit",
      "minRating",
      "platforms",
      "locationId",
      "bindTo",
    ]);
    expect(bundle.dynamicSources.instagram_feed.optionalFields).toEqual([
      "limit",
      "profile",
      "hashtag",
      "bindTo",
    ]);
    expect(bundle.dynamicSources.events_feed.optionalFields).toEqual([
      "limit",
      "upcomingOnly",
      "locationIds",
      "bindTo",
    ]);

    // Only events_feed fans a single symbolic block out into many (D6).
    expect(bundle.dynamicSources.events_feed.expands).toBe(true);
    expect(bundle.dynamicSources.blog_feed.expands).toBeUndefined();
    expect(bundle.dynamicSources.blog_post.expands).toBeUndefined();
    expect(bundle.dynamicSources.testimonials_feed.expands).toBeUndefined();
    expect(bundle.dynamicSources.instagram_feed.expands).toBeUndefined();

    expect(bundle.designTokens.canonicalSource).toBe("theme_config");
    expect(bundle.pageRules.blockEntry.requiredKeys).toEqual([
      "block_name",
      "block_ref",
      "data",
    ]);
  });

  it("normalizes block refs, block names, and layout roles from public exports", () => {
    const bundle = createBuilderContractBundle({
      blocks: SAMPLE_BLOCKS,
      uiVersion: "3.2.1",
      blockSources: SAMPLE_SOURCES,
    });

    const hero = bundle.blocks.find(
      (block) => block.componentId === "hero-simple-centered-image",
    );
    const navbar = bundle.blocks.find(
      (block) => block.componentId === "navbar-image-preview",
    );
    const footer = bundle.blocks.find(
      (block) => block.componentId === "footer-split-image-accordion",
    );
    const about = bundle.blocks.find(
      (block) => block.componentId === "about-story-expertise",
    );

    expect(hero).toMatchObject({
      blockName: "HeroSimpleCenteredImage",
      blockRef: "hero/hero-simple-centered-image",
      layoutRole: "page",
    });
    expect(navbar).toMatchObject({
      blockName: "NavbarImagePreview",
      blockRef: "navbars/navbar-image-preview",
      layoutRole: "header",
    });
    expect(footer).toMatchObject({
      blockName: "FooterSplitImageAccordion",
      blockRef: "footers/footer-split-image-accordion",
      layoutRole: "footer",
    });
    expect(about).toMatchObject({
      blockRef: "about/about-story-expertise",
      layoutRole: "page",
    });

    expect(bundle.sharedLayout.sections.header.allowedBlockRefs).toEqual([
      "navbars/navbar-image-preview",
    ]);
    expect(bundle.sharedLayout.sections.footer.allowedBlockRefs).toEqual([
      "footers/footer-split-image-accordion",
    ]);
  });

  it("propagates structured usage requirements and exampleProps into the contract", () => {
    const blocks: BlockRegistryEntry[] = [
      {
        ...SAMPLE_BLOCKS[0],
        importantUsageNotes: "Heading must stay under 40 characters.",
        usageRequirements: {
          requiredProps: ["heading", "featureImage"],
          propConstraints: {
            heading: { required: true, maxLength: 40 },
            smallImages: { count: 2, minItems: 2, maxItems: 2 },
          },
          mediaSlots: {
            featureImage: {
              path: "featureImage",
              roles: ["feature", "hero"],
              disallowedRoles: ["logo"],
              minPixelClass: "large",
              required: true,
            },
          },
          requiresSiteCapabilities: ["media_library"],
        },
        exampleProps: { heading: "Hello" },
      },
    ];

    const bundle = createBuilderContractBundle({
      blocks,
      uiVersion: "3.2.1",
    });
    const hero = bundle.blocks[0];

    expect(hero.importantUsageNotes).toContain("40 characters");
    expect(hero.usageRequirements?.requiredProps).toEqual([
      "heading",
      "featureImage",
    ]);
    expect(hero.usageRequirements?.propConstraints?.heading.maxLength).toBe(40);
    expect(hero.usageRequirements?.mediaSlots?.featureImage.roles).toEqual([
      "feature",
      "hero",
    ]);
    expect(hero.examples.exampleProps).toEqual({ heading: "Hello" });
    expect(hero.examples).not.toHaveProperty("defaultData");
  });

  it("falls back to null usage metadata when a block does not declare any", () => {
    const bundle = createBuilderContractBundle({
      blocks: SAMPLE_BLOCKS,
      uiVersion: "3.2.1",
    });

    for (const block of bundle.blocks) {
      expect(block.importantUsageNotes).toBeNull();
      expect(block.usageRequirements).toBeNull();
      expect(block.examples.exampleProps).toBeNull();
      expect(block.examples).not.toHaveProperty("defaultData");
    }
  });
});

describe("BLOCK_REGISTRY hero-mental-health-team contract", () => {
  const entry = BLOCK_REGISTRY["hero-mental-health-team"];

  it("is registered", () => {
    expect(entry).toBeDefined();
  });

  it("declares structured usage requirements (no featuredImage typo)", () => {
    const notes = entry.importantUsageNotes ?? "";
    expect(notes).toMatch(/featureImage/);
    expect(notes).not.toMatch(/featuredImage/);

    const requirements = entry.usageRequirements;
    expect(requirements).toBeDefined();
    expect(requirements?.requiredProps).toEqual(
      expect.arrayContaining([
        "heading",
        "smallImages",
        "featureImage",
        "testimonial",
      ]),
    );
  });

  it("constrains smallImages to exactly two items", () => {
    const smallImages = entry.usageRequirements?.propConstraints?.smallImages;
    expect(smallImages?.count).toBe(2);
    expect(smallImages?.minItems).toBe(2);
    expect(smallImages?.maxItems).toBe(2);
  });

  it("enforces heading <= 40 and description <= 130 characters", () => {
    const constraints = entry.usageRequirements?.propConstraints ?? {};
    expect(constraints.heading?.maxLength).toBe(40);
    expect(constraints.description?.maxLength).toBe(130);
  });

  it("pins action variants to default/outline", () => {
    const actions = entry.usageRequirements?.propConstraints?.actions;
    expect(actions?.pinnedValues).toEqual({
      "0.variant": "default",
      "1.variant": "outline",
    });
  });

  it("declares media slot roles for featureImage, smallImages, and the testimonial avatar", () => {
    const slots = entry.usageRequirements?.mediaSlots ?? {};

    expect(slots.featureImage?.roles).toEqual(
      expect.arrayContaining(["feature", "hero"]),
    );
    expect(slots.featureImage?.disallowedRoles).toEqual(
      expect.arrayContaining(["logo"]),
    );
    expect(slots.featureImage?.required).toBe(true);

    expect(slots["smallImages[]"]?.roles).toEqual(
      expect.arrayContaining(["thumbnail", "profile"]),
    );
    expect(slots["smallImages[]"]?.disallowedRoles).toEqual(
      expect.arrayContaining(["logo"]),
    );

    expect(slots["testimonial.avatarSrc"]?.roles).toEqual(
      expect.arrayContaining(["profile", "avatar"]),
    );
  });

  it("requires a sourced testimonial via site capabilities", () => {
    const capabilities = entry.usageRequirements?.requiresSiteCapabilities;
    expect(capabilities).toEqual(
      expect.arrayContaining(["reviews_or_testimonials"]),
    );
  });

  it("provides a structured exampleProps payload covering required slots", () => {
    const exampleProps = entry.exampleProps as
      | Record<string, unknown>
      | undefined;
    expect(exampleProps).toBeDefined();
    expect(Array.isArray(exampleProps?.smallImages)).toBe(true);
    expect((exampleProps?.smallImages as unknown[]).length).toBe(2);
    expect(exampleProps?.featureImage).toBeDefined();
    expect(exampleProps?.testimonial).toBeDefined();
  });

  it("does not expose the legacy defaultProps field", () => {
    expect(
      (entry as unknown as Record<string, unknown>).defaultProps,
    ).toBeUndefined();
  });

  it("uses absolute URLs (never relative paths) in exampleProps media", () => {
    const exampleProps = entry.exampleProps as Record<string, unknown>;
    const featureImage = exampleProps.featureImage as { src: string };
    const smallImages = exampleProps.smallImages as Array<{ src: string }>;
    const testimonial = exampleProps.testimonial as { avatarSrc: string };

    expect(featureImage.src).toMatch(/^https?:\/\//);
    for (const img of smallImages) {
      expect(img.src).toMatch(/^https?:\/\//);
    }
    expect(testimonial.avatarSrc).toMatch(/^https?:\/\//);
  });
});

describe("BLOCK_REGISTRY hero-mentorship-video-split contract", () => {
  const entry = BLOCK_REGISTRY["hero-mentorship-video-split"];

  it("is registered with structured metadata", () => {
    expect(entry).toBeDefined();
    expect(entry.importantUsageNotes).toBeDefined();
    expect(entry.usageRequirements).toBeDefined();
    expect(entry.exampleProps).toBeDefined();
  });

  it("warns against swapping image and video media in importantUsageNotes", () => {
    const notes = entry.importantUsageNotes ?? "";
    expect(notes).toMatch(/image/i);
    expect(notes).toMatch(/video/i);
    expect(notes.toLowerCase()).toMatch(/swap|never|not/);
  });

  it("declares media slot roles distinguishing image vs video", () => {
    const slots = entry.usageRequirements?.mediaSlots ?? {};

    expect(slots.image).toBeDefined();
    expect(slots.image?.roles).toEqual(expect.arrayContaining(["hero"]));
    expect(slots.image?.disallowedRoles ?? []).toEqual(
      expect.arrayContaining(["video-thumbnail"]),
    );
    expect(slots.image?.required).toBe(true);

    const videoSrcSlot = slots["modalVideo.video.src"];
    expect(videoSrcSlot).toBeDefined();
    expect(videoSrcSlot?.disallowedRoles ?? []).toEqual(
      expect.arrayContaining(["hero", "feature"]),
    );

    const posterSlot = slots["modalVideo.image.src"];
    expect(posterSlot).toBeDefined();
    expect(posterSlot?.roles).toEqual(
      expect.arrayContaining(["video-thumbnail"]),
    );
  });

  it("uses absolute URLs (never relative paths) for media in exampleProps", () => {
    const exampleProps = entry.exampleProps as Record<string, unknown>;
    const image = exampleProps.image as { src: string };
    const modalVideo = exampleProps.modalVideo as {
      image: { src: string };
      video: { src: string };
    };

    expect(image.src).toMatch(/^https?:\/\//);
    expect(modalVideo.image.src).toMatch(/^https?:\/\//);
    expect(modalVideo.video.src).toMatch(/^https?:\/\//);
  });

  it("does not expose the legacy defaultProps field", () => {
    expect(
      (entry as unknown as Record<string, unknown>).defaultProps,
    ).toBeUndefined();
  });
});

describe("BLOCK_REGISTRY about-mission-dual-image media contract", () => {
  const entry = BLOCK_REGISTRY["about-mission-dual-image"];

  it("requires the dynamic mediaItem prop for newly authored pages", () => {
    expect(entry.usageRequirements?.requiredProps).toEqual(
      expect.arrayContaining(["mediaItem"]),
    );
    expect(
      entry.usageRequirements?.propConstraints?.mediaItem,
    ).toMatchObject({
      required: true,
    });
    expect(entry.importantUsageNotes).toMatch(/image.*video|video.*image/i);
  });

  it("declares image and video media paths with the responsive image crop", () => {
    const slots = entry.usageRequirements?.mediaSlots ?? {};
    const imageSlot = slots["mediaItem.image.src"];
    const videoSlot = slots["mediaItem.video.src"];

    expect(imageSlot).toMatchObject({
      path: "mediaItem.image.src",
      preferredAspect: "1:1",
      required: false,
    });
    expect(imageSlot?.note).toMatch(/IMAGE MEDIA ONLY/i);
    expect(videoSlot).toMatchObject({
      path: "mediaItem.video.src",
      required: false,
    });
    expect(videoSlot?.note).toMatch(/VIDEO MEDIA ONLY/i);
  });

  it("keeps deprecated image props out of AI-authored examples and media slots", () => {
    const exampleProps = entry.exampleProps as Record<string, unknown>;
    const slots = entry.usageRequirements?.mediaSlots ?? {};

    expect(entry.exampleUsage).toContain("mediaItem");
    expect(entry.exampleUsage).not.toMatch(/primaryImage|secondaryImage/);
    expect(exampleProps.mediaItem).toBeDefined();
    expect(exampleProps).not.toHaveProperty("primaryImage");
    expect(exampleProps).not.toHaveProperty("secondaryImage");
    expect(slots).not.toHaveProperty("primaryImage");
    expect(slots).not.toHaveProperty("secondaryImage");
    expect(entry.importantUsageNotes).toMatch(/deprecated/i);
    expect(entry.importantUsageNotes).toMatch(/never author/i);
  });

  it("propagates the dynamic media contract into the builder bundle", () => {
    const bundle = createBuilderContractBundle({
      blocks: Object.values(BLOCK_REGISTRY),
      uiVersion: "test",
    });
    const block = bundle.blocks.find(
      (item) => item.componentId === "about-mission-dual-image",
    );

    expect(block?.description).toMatch(/image or video/i);
    expect(block?.usageRequirements?.requiredProps).toContain("mediaItem");
    expect(
      block?.usageRequirements?.mediaSlots?.["mediaItem.image.src"],
    ).toBeDefined();
    expect(
      block?.usageRequirements?.mediaSlots?.["mediaItem.video.src"],
    ).toBeDefined();
    expect(block?.examples.exampleProps).toHaveProperty("mediaItem");
  });
});

describe("BLOCK_REGISTRY about category contracts", () => {
  it("declares structured usage requirements and exampleProps for every about block", () => {
    for (const id of ABOUT_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];

      expect(entry, id).toBeDefined();
      expect(entry.importantUsageNotes, id).toBeTruthy();
      expect(entry.usageRequirements, id).toBeDefined();
      expect(entry.usageRequirements?.requiredProps, id).toBeDefined();
      expect(entry.usageRequirements?.propConstraints, id).toBeDefined();
      expect(entry.usageRequirements?.mediaSlots, id).toBeDefined();
      expect(entry.exampleProps, id).toBeDefined();
      expect(
        (entry as unknown as Record<string, unknown>).defaultProps,
        id,
      ).toBeUndefined();
    }
  });

  it("does not use legacy defaultData for about blocks in the builder contract", () => {
    const bundle = createBuilderContractBundle({
      blocks: Object.values(BLOCK_REGISTRY),
      uiVersion: "test",
    });

    for (const id of ABOUT_BLOCK_IDS) {
      const block = bundle.blocks.find((item) => item.componentId === id);

      expect(block, id).toBeDefined();
      expect(block?.examples, id).toHaveProperty("exampleProps");
      expect(block?.examples.exampleProps, id).not.toBeNull();
      expect(block?.examples, id).not.toHaveProperty("defaultData");
    }
  });

  it("keeps about exampleUsage and exampleProps free of relative or placeholder media", () => {
    for (const id of ABOUT_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];
      const exampleText = [
        entry.exampleUsage,
        ...collectStrings(entry.exampleProps),
      ].join("\n");

      for (const pattern of FORBIDDEN_EXAMPLE_PATTERNS) {
        expect(exampleText, id).not.toMatch(pattern);
      }
    }
  });

  it("uses current site capability keys for about source-backed data", () => {
    const legacyCapabilityKeys = [
      "metrics_or_stats",
      "pricing_data",
      "contact_info",
    ];

    for (const id of ABOUT_BLOCK_IDS) {
      const capabilities =
        BLOCK_REGISTRY[id].usageRequirements?.requiresSiteCapabilities ?? [];

      for (const capability of legacyCapabilityKeys) {
        expect(capabilities, id).not.toContain(capability);
      }
    }

    expect(
      BLOCK_REGISTRY["about-stats-showcase"].usageRequirements
        ?.requiresSiteCapabilities,
    ).toEqual(expect.arrayContaining(["stats_or_metrics"]));
    expect(
      BLOCK_REGISTRY["about-company-profile"].usageRequirements
        ?.requiresSiteCapabilities,
    ).toEqual(expect.arrayContaining(["stats_or_metrics"]));
    expect(
      BLOCK_REGISTRY["community-initiatives"].usageRequirements
        ?.requiresSiteCapabilities,
    ).toEqual(expect.arrayContaining(["stats_or_metrics"]));
    expect(
      BLOCK_REGISTRY["about-location-info-hero"].usageRequirements
        ?.requiresSiteCapabilities,
    ).toEqual(expect.arrayContaining(["locations"]));
  });

  it("declares typed media slots where about blocks accept media", () => {
    for (const id of ABOUT_BLOCK_IDS_WITH_MEDIA) {
      const slots = BLOCK_REGISTRY[id].usageRequirements?.mediaSlots ?? {};

      expect(Object.keys(slots).length, id).toBeGreaterThan(0);

      for (const slot of Object.values(slots)) {
        if (slot.path.includes(".video")) {
          expect(slot.note, `${id}:${slot.path}`).toMatch(/VIDEO .*ONLY/i);
          expect(slot.disallowedRoles ?? [], `${id}:${slot.path}`).toEqual(
            expect.arrayContaining(["logo", "favicon", "hero", "feature"]),
          );
          continue;
        }

        expect(slot.note, `${id}:${slot.path}`).toMatch(/IMAGE .*ONLY/i);

        if (!slot.roles.includes("logo")) {
          expect(slot.disallowedRoles ?? [], `${id}:${slot.path}`).toEqual(
            expect.arrayContaining(["logo", "favicon", "video-thumbnail"]),
          );
        }
      }
    }
  });

  it("uses absolute media URLs in about exampleProps", () => {
    for (const id of ABOUT_BLOCK_IDS_WITH_MEDIA) {
      const mediaStrings = collectMediaStrings(BLOCK_REGISTRY[id].exampleProps);

      expect(mediaStrings.length, id).toBeGreaterThan(0);
      for (const value of mediaStrings) {
        expect(value, `${id}:${value}`).toMatch(/^https?:\/\//);
      }
    }
  });
});

describe("BLOCK_REGISTRY article category contracts", () => {
  it("declares structured usage requirements and exampleProps for every article block", () => {
    for (const id of ARTICLE_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];

      expect(entry, id).toBeDefined();
      expect(entry.importantUsageNotes, id).toBeTruthy();
      expect(entry.usageRequirements, id).toBeDefined();
      expect(entry.usageRequirements?.requiredProps, id).toBeDefined();
      expect(entry.usageRequirements?.propConstraints, id).toBeDefined();
      expect(entry.usageRequirements?.mediaSlots, id).toBeDefined();
      expect(entry.exampleProps, id).toBeDefined();
      expect(
        (entry as unknown as Record<string, unknown>).defaultProps,
        id,
      ).toBeUndefined();
    }
  });

  it("does not use legacy defaultData for article blocks in the builder contract", () => {
    const bundle = createBuilderContractBundle({
      blocks: Object.values(BLOCK_REGISTRY),
      uiVersion: "test",
    });

    for (const id of ARTICLE_BLOCK_IDS) {
      const block = bundle.blocks.find((item) => item.componentId === id);

      expect(block, id).toBeDefined();
      expect(block?.examples, id).toHaveProperty("exampleProps");
      expect(block?.examples.exampleProps, id).not.toBeNull();
      expect(block?.examples, id).not.toHaveProperty("defaultData");
    }
  });

  it("keeps article exampleUsage and exampleProps free of relative or placeholder media", () => {
    for (const id of ARTICLE_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];
      const exampleText = [
        entry.exampleUsage,
        ...collectStrings(entry.exampleProps),
      ].join("\n");

      for (const pattern of FORBIDDEN_EXAMPLE_PATTERNS) {
        expect(exampleText, id).not.toMatch(pattern);
      }

      for (const pattern of FORBIDDEN_ARTICLE_PROP_PATTERNS) {
        expect(entry.exampleUsage, id).not.toMatch(pattern);
      }
    }
  });

  it("requires source-backed blog, team, and media data for article blocks", () => {
    for (const id of ARTICLE_BLOCK_IDS) {
      const capabilities =
        BLOCK_REGISTRY[id].usageRequirements?.requiresSiteCapabilities ?? [];

      expect(capabilities, id).toEqual(
        expect.arrayContaining(["blog_posts", "team_members", "media_library"]),
      );
      expect(capabilities, id).not.toContain("pricing_data");
      expect(capabilities, id).not.toContain("metrics_or_stats");
    }
  });

  it("declares image media slots where article blocks accept media", () => {
    for (const id of ARTICLE_BLOCK_IDS_WITH_MEDIA) {
      const slots = BLOCK_REGISTRY[id].usageRequirements?.mediaSlots ?? {};

      expect(Object.keys(slots).length, id).toBeGreaterThan(0);

      for (const slot of Object.values(slots)) {
        expect(slot.note, `${id}:${slot.path}`).toMatch(/IMAGE .*ONLY/i);
        expect(slot.disallowedRoles ?? [], `${id}:${slot.path}`).toEqual(
          expect.arrayContaining(["logo", "favicon", "video-thumbnail"]),
        );
      }
    }
  });

  it("uses absolute media URLs in article exampleProps", () => {
    for (const id of ARTICLE_BLOCK_IDS_WITH_MEDIA) {
      const mediaStrings = collectMediaStrings(BLOCK_REGISTRY[id].exampleProps);

      expect(mediaStrings.length, id).toBeGreaterThan(0);
      for (const value of mediaStrings) {
        expect(value, `${id}:${value}`).toMatch(/^https?:\/\//);
      }
    }
  });
});

// article-legal-prose is deliberately NOT in ARTICLE_BLOCK_IDS: it is a
// different contract class. Legal documents have no byline, publication date,
// or hero image (fabricating them is forbidden), and requiring the
// blog/team/media capabilities of the byline-bearing article family would be
// wrong for a block every site's legal pages must be able to use.
describe("BLOCK_REGISTRY article-legal-prose contract", () => {
  const id = "article-legal-prose";

  it("declares the legal-prose registry entry with structured usage requirements", () => {
    const entry = BLOCK_REGISTRY[id];

    expect(entry).toBeDefined();
    expect(entry.category).toBe("article");
    expect(entry.importantUsageNotes).toBeTruthy();
    expect(entry.usageRequirements).toBeDefined();
    expect(entry.usageRequirements?.requiredProps).toEqual([
      "title",
      "markdownString",
    ]);
    expect(entry.usageRequirements?.propConstraints).toBeDefined();
    expect(entry.usageRequirements?.mediaSlots).toEqual({});
    expect(entry.exampleProps).toBeDefined();
    expect(
      (entry as unknown as Record<string, unknown>).defaultProps,
    ).toBeUndefined();
  });

  it("teaches the agent this is THE single block for whole legal documents", () => {
    const notes = BLOCK_REGISTRY[id].importantUsageNotes ?? "";
    expect(notes).toMatch(/legal/i);
    expect(notes).toMatch(/privacy polic/i);
    expect(notes).toMatch(/terms of/i);
    expect(notes).toMatch(/ONE block/);
    expect(notes).toMatch(/accordion/i);
  });

  it("requires no site capabilities and no byline, date, or hero image", () => {
    const requirements = BLOCK_REGISTRY[id].usageRequirements;

    expect(requirements?.requiresSiteCapabilities ?? []).toEqual([]);

    const constraints = requirements?.propConstraints ?? {};
    for (const [prop, constraint] of Object.entries(constraints)) {
      expect(prop).not.toMatch(/author|byline|image|pubDate|publishDate/i);
      if (prop === "lastUpdatedLabel" || prop === "lastUpdatedDate") {
        expect(constraint.required, prop).not.toBe(true);
      }
    }
  });

  it("keeps exampleUsage and exampleProps free of forbidden media and fabricated bylines", () => {
    const entry = BLOCK_REGISTRY[id];
    const exampleText = [
      entry.exampleUsage,
      ...collectStrings(entry.exampleProps),
    ].join("\n");

    for (const pattern of FORBIDDEN_EXAMPLE_PATTERNS) {
      expect(exampleText).not.toMatch(pattern);
    }

    const exampleProps = (entry.exampleProps ?? {}) as Record<string, unknown>;
    expect(exampleProps.title).toBeTruthy();
    expect(typeof exampleProps.markdownString).toBe("string");
    // Per-key assertions with the same forbidden-shape regex the
    // propConstraints check uses (a negated arrayContaining would only fail
    // when ALL forbidden keys appear at once, which guards nothing).
    for (const key of Object.keys(exampleProps)) {
      expect(key).not.toMatch(/author|byline|image|pubDate|publishDate/i);
    }
    expect(Object.keys(exampleProps)).not.toContain("post");
  });

  it("caps the document body generously enough for a full legal document", () => {
    const constraint =
      BLOCK_REGISTRY[id].usageRequirements?.propConstraints?.markdownString;
    expect(constraint?.required).toBe(true);
    expect(constraint?.maxLength ?? 0).toBeGreaterThanOrEqual(14000);
  });
});

describe("BLOCK_REGISTRY link-page category contracts", () => {
  it("declares structured usage requirements and exampleProps for every link-page block", () => {
    for (const id of LINK_PAGE_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];

      expect(entry, id).toBeDefined();
      expect(entry.importantUsageNotes, id).toBeTruthy();
      expect(entry.usageRequirements, id).toBeDefined();
      expect(entry.usageRequirements?.requiredProps, id).toBeDefined();
      expect(entry.usageRequirements?.propConstraints, id).toBeDefined();
      expect(entry.usageRequirements?.mediaSlots, id).toBeDefined();
      expect(entry.exampleProps, id).toBeDefined();
      expect(
        (entry as unknown as Record<string, unknown>).defaultProps,
        id,
      ).toBeUndefined();
    }
  });

  it("does not use legacy defaultData for link-page blocks in the builder contract", () => {
    const bundle = createBuilderContractBundle({
      blocks: Object.values(BLOCK_REGISTRY),
      uiVersion: "test",
    });

    for (const id of LINK_PAGE_BLOCK_IDS) {
      const block = bundle.blocks.find((item) => item.componentId === id);

      expect(block, id).toBeDefined();
      expect(block?.examples, id).toHaveProperty("exampleProps");
      expect(block?.examples.exampleProps, id).not.toBeNull();
      expect(block?.examples, id).not.toHaveProperty("defaultData");
    }
  });

  it("keeps link-page exampleUsage and exampleProps free of relative or placeholder media", () => {
    for (const id of LINK_PAGE_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];
      const exampleText = [
        entry.exampleUsage,
        ...collectStrings(entry.exampleProps),
      ].join("\n");

      for (const pattern of FORBIDDEN_EXAMPLE_PATTERNS) {
        expect(exampleText, id).not.toMatch(pattern);
      }
    }
  });

  it("uses absolute media URLs in link-page exampleProps", () => {
    for (const id of LINK_PAGE_BLOCK_IDS_WITH_MEDIA) {
      const mediaStrings = collectMediaStrings(BLOCK_REGISTRY[id].exampleProps);

      expect(mediaStrings.length, id).toBeGreaterThan(0);
      for (const value of mediaStrings) {
        expect(value, `${id}:${value}`).toMatch(/^https?:\/\//);
      }
    }
  });
});

describe("BLOCK_REGISTRY process category contracts", () => {
  it("declares structured usage requirements and exampleProps for every process block", () => {
    for (const id of PROCESS_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];

      expect(entry, id).toBeDefined();
      expect(entry.importantUsageNotes, id).toBeTruthy();
      expect(entry.usageRequirements, id).toBeDefined();
      expect(entry.usageRequirements?.requiredProps, id).toBeDefined();
      expect(entry.usageRequirements?.propConstraints, id).toBeDefined();
      expect(entry.usageRequirements?.mediaSlots, id).toBeDefined();
      expect(entry.exampleProps, id).toBeDefined();
      expect(
        (entry as unknown as Record<string, unknown>).defaultProps,
        id,
      ).toBeUndefined();
    }
  });

  it("does not use legacy defaultData for process blocks in the builder contract", () => {
    const bundle = createBuilderContractBundle({
      blocks: Object.values(BLOCK_REGISTRY),
      uiVersion: "test",
    });

    for (const id of PROCESS_BLOCK_IDS) {
      const block = bundle.blocks.find((item) => item.componentId === id);

      expect(block, id).toBeDefined();
      expect(block?.examples, id).toHaveProperty("exampleProps");
      expect(block?.examples.exampleProps, id).not.toBeNull();
      expect(block?.examples, id).not.toHaveProperty("defaultData");
    }
  });

  it("keeps process exampleUsage and exampleProps free of relative or placeholder media", () => {
    for (const id of PROCESS_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];
      const exampleText = [
        entry.exampleUsage,
        ...collectStrings(entry.exampleProps),
      ].join("\n");

      for (const pattern of FORBIDDEN_EXAMPLE_PATTERNS) {
        expect(exampleText, id).not.toMatch(pattern);
      }
    }
  });

  it("uses absolute media URLs in process exampleProps", () => {
    for (const id of PROCESS_BLOCK_IDS_WITH_MEDIA) {
      const mediaStrings = collectMediaStrings(BLOCK_REGISTRY[id].exampleProps);

      expect(mediaStrings.length, id).toBeGreaterThan(0);
      for (const value of mediaStrings) {
        expect(value, `${id}:${value}`).toMatch(/^https?:\/\//);
      }
    }
  });
});

describe("BLOCK_REGISTRY stats category contracts", () => {
  it("declares structured usage requirements and exampleProps for every stats block", () => {
    for (const id of STATS_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];

      expect(entry, id).toBeDefined();
      expect(entry.importantUsageNotes, id).toBeTruthy();
      expect(entry.usageRequirements, id).toBeDefined();
      expect(entry.usageRequirements?.requiredProps, id).toBeDefined();
      expect(entry.usageRequirements?.propConstraints, id).toBeDefined();
      expect(entry.usageRequirements?.mediaSlots, id).toBeDefined();
      expect(entry.exampleProps, id).toBeDefined();
      expect(
        (entry as unknown as Record<string, unknown>).defaultProps,
        id,
      ).toBeUndefined();
    }
  });

  it("does not use legacy defaultData for stats blocks in the builder contract", () => {
    const bundle = createBuilderContractBundle({
      blocks: Object.values(BLOCK_REGISTRY),
      uiVersion: "test",
    });

    for (const id of STATS_BLOCK_IDS) {
      const block = bundle.blocks.find((item) => item.componentId === id);

      expect(block, id).toBeDefined();
      expect(block?.examples, id).toHaveProperty("exampleProps");
      expect(block?.examples.exampleProps, id).not.toBeNull();
      expect(block?.examples, id).not.toHaveProperty("defaultData");
    }
  });

  it("keeps stats exampleUsage and exampleProps free of relative or placeholder media", () => {
    for (const id of STATS_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];
      const exampleText = [
        entry.exampleUsage,
        ...collectStrings(entry.exampleProps),
      ].join("\n");

      for (const pattern of FORBIDDEN_EXAMPLE_PATTERNS) {
        expect(exampleText, id).not.toMatch(pattern);
      }
    }
  });

  it("requires stats_or_metrics capability for all stats blocks", () => {
    for (const id of STATS_BLOCK_IDS) {
      const capabilities =
        BLOCK_REGISTRY[id].usageRequirements?.requiresSiteCapabilities ?? [];

      expect(capabilities, id).toEqual(
        expect.arrayContaining(["stats_or_metrics"]),
      );
    }
  });

  it("uses absolute media URLs in stats exampleProps", () => {
    for (const id of STATS_BLOCK_IDS_WITH_MEDIA) {
      const mediaStrings = collectMediaStrings(BLOCK_REGISTRY[id].exampleProps);

      expect(mediaStrings.length, id).toBeGreaterThan(0);
      for (const value of mediaStrings) {
        expect(value, `${id}:${value}`).toMatch(/^https?:\/\//);
      }
    }
  });
});

describe("BLOCK_REGISTRY faq category contracts", () => {
  it("declares structured usage requirements and exampleProps for every faq block", () => {
    for (const id of FAQ_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];

      expect(entry, id).toBeDefined();
      expect(entry.importantUsageNotes, id).toBeTruthy();
      expect(entry.usageRequirements, id).toBeDefined();
      expect(entry.usageRequirements?.requiredProps, id).toBeDefined();
      expect(entry.usageRequirements?.propConstraints, id).toBeDefined();
      expect(entry.usageRequirements?.mediaSlots, id).toBeDefined();
      expect(entry.exampleProps, id).toBeDefined();
      expect(
        (entry as unknown as Record<string, unknown>).defaultProps,
        id,
      ).toBeUndefined();
    }
  });

  it("does not use legacy defaultData for faq blocks in the builder contract", () => {
    const bundle = createBuilderContractBundle({
      blocks: Object.values(BLOCK_REGISTRY),
      uiVersion: "test",
    });

    for (const id of FAQ_BLOCK_IDS) {
      const block = bundle.blocks.find((item) => item.componentId === id);

      expect(block, id).toBeDefined();
      expect(block?.examples, id).toHaveProperty("exampleProps");
      expect(block?.examples.exampleProps, id).not.toBeNull();
      expect(block?.examples, id).not.toHaveProperty("defaultData");
    }
  });

  it("keeps faq exampleUsage and exampleProps free of relative or placeholder media", () => {
    for (const id of FAQ_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];
      const exampleText = [
        entry.exampleUsage,
        ...collectStrings(entry.exampleProps),
      ].join("\n");

      for (const pattern of FORBIDDEN_EXAMPLE_PATTERNS) {
        expect(exampleText, id).not.toMatch(pattern);
      }
    }
  });

  it("uses absolute media URLs in faq exampleProps", () => {
    for (const id of FAQ_BLOCK_IDS_WITH_MEDIA) {
      const mediaStrings = collectMediaStrings(BLOCK_REGISTRY[id].exampleProps);

      expect(mediaStrings.length, id).toBeGreaterThan(0);
      for (const value of mediaStrings) {
        expect(value, `${id}:${value}`).toMatch(/^https?:\/\//);
      }
    }
  });
});

describe("BLOCK_REGISTRY blog category contracts", () => {
  it("declares structured usage requirements and exampleProps for every blog block", () => {
    for (const id of BLOG_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];

      expect(entry, id).toBeDefined();
      expect(entry.importantUsageNotes, id).toBeTruthy();
      expect(entry.usageRequirements, id).toBeDefined();
      expect(entry.usageRequirements?.requiredProps, id).toBeDefined();
      expect(entry.usageRequirements?.propConstraints, id).toBeDefined();
      expect(entry.usageRequirements?.mediaSlots, id).toBeDefined();
      expect(entry.exampleProps, id).toBeDefined();
      expect(
        (entry as unknown as Record<string, unknown>).defaultProps,
        id,
      ).toBeUndefined();
    }
  });

  it("does not use legacy defaultData for blog blocks in the builder contract", () => {
    const bundle = createBuilderContractBundle({
      blocks: Object.values(BLOCK_REGISTRY),
      uiVersion: "test",
    });

    for (const id of BLOG_BLOCK_IDS) {
      const block = bundle.blocks.find((item) => item.componentId === id);

      expect(block, id).toBeDefined();
      expect(block?.examples, id).toHaveProperty("exampleProps");
      expect(block?.examples.exampleProps, id).not.toBeNull();
      expect(block?.examples, id).not.toHaveProperty("defaultData");
    }
  });

  it("keeps blog exampleUsage and exampleProps free of relative or placeholder media", () => {
    for (const id of BLOG_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];
      const exampleText = [
        entry.exampleUsage,
        ...collectStrings(entry.exampleProps),
      ].join("\n");

      for (const pattern of FORBIDDEN_EXAMPLE_PATTERNS) {
        expect(exampleText, id).not.toMatch(pattern);
      }
    }
  });

  it("requires blog_posts and media_library capabilities for all blog blocks", () => {
    for (const id of BLOG_BLOCK_IDS) {
      const capabilities =
        BLOCK_REGISTRY[id].usageRequirements?.requiresSiteCapabilities ?? [];

      expect(capabilities, id).toEqual(
        expect.arrayContaining(["blog_posts", "media_library"]),
      );
    }
  });

  it("uses absolute media URLs in blog exampleProps", () => {
    for (const id of BLOG_BLOCK_IDS) {
      const mediaStrings = collectMediaStrings(BLOCK_REGISTRY[id].exampleProps);

      for (const value of mediaStrings) {
        expect(value, `${id}:${value}`).toMatch(/^https?:\/\//);
      }
    }
  });
});

describe("BLOCK_REGISTRY carousel category contracts", () => {
  it("declares structured usage requirements and exampleProps for every carousel block", () => {
    for (const id of CAROUSEL_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];

      expect(entry, id).toBeDefined();
      expect(entry.importantUsageNotes, id).toBeTruthy();
      expect(entry.usageRequirements, id).toBeDefined();
      expect(entry.usageRequirements?.requiredProps, id).toBeDefined();
      expect(entry.usageRequirements?.propConstraints, id).toBeDefined();
      expect(entry.usageRequirements?.mediaSlots, id).toBeDefined();
      expect(entry.exampleProps, id).toBeDefined();
      expect(
        (entry as unknown as Record<string, unknown>).defaultProps,
        id,
      ).toBeUndefined();
    }
  });

  it("does not use legacy defaultData for carousel blocks in the builder contract", () => {
    const bundle = createBuilderContractBundle({
      blocks: Object.values(BLOCK_REGISTRY),
      uiVersion: "test",
    });

    for (const id of CAROUSEL_BLOCK_IDS) {
      const block = bundle.blocks.find((item) => item.componentId === id);

      expect(block, id).toBeDefined();
      expect(block?.examples, id).toHaveProperty("exampleProps");
      expect(block?.examples.exampleProps, id).not.toBeNull();
      expect(block?.examples, id).not.toHaveProperty("defaultData");
    }
  });

  it("keeps carousel exampleUsage and exampleProps free of relative or placeholder media", () => {
    for (const id of CAROUSEL_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];
      const exampleText = [
        entry.exampleUsage,
        ...collectStrings(entry.exampleProps),
      ].join("\n");

      for (const pattern of FORBIDDEN_EXAMPLE_PATTERNS) {
        expect(exampleText, id).not.toMatch(pattern);
      }
    }
  });

  it("uses absolute media URLs in carousel exampleProps", () => {
    for (const id of CAROUSEL_BLOCK_IDS) {
      const mediaStrings = collectMediaStrings(BLOCK_REGISTRY[id].exampleProps);

      for (const value of mediaStrings) {
        expect(value, `${id}:${value}`).toMatch(/^https?:\/\//);
      }
    }
  });
});

describe("BLOCK_REGISTRY gallery category contracts", () => {
  it("declares structured usage requirements and exampleProps for every gallery block", () => {
    for (const id of GALLERY_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];

      expect(entry, id).toBeDefined();
      expect(entry.importantUsageNotes, id).toBeTruthy();
      expect(entry.usageRequirements, id).toBeDefined();
      expect(entry.usageRequirements?.requiredProps, id).toBeDefined();
      expect(entry.usageRequirements?.propConstraints, id).toBeDefined();
      expect(entry.usageRequirements?.mediaSlots, id).toBeDefined();
      expect(entry.exampleProps, id).toBeDefined();
      expect(
        (entry as unknown as Record<string, unknown>).defaultProps,
        id,
      ).toBeUndefined();
    }
  });

  it("does not use legacy defaultData for gallery blocks in the builder contract", () => {
    const bundle = createBuilderContractBundle({
      blocks: Object.values(BLOCK_REGISTRY),
      uiVersion: "test",
    });

    for (const id of GALLERY_BLOCK_IDS) {
      const block = bundle.blocks.find((item) => item.componentId === id);

      expect(block, id).toBeDefined();
      expect(block?.examples, id).toHaveProperty("exampleProps");
      expect(block?.examples.exampleProps, id).not.toBeNull();
      expect(block?.examples, id).not.toHaveProperty("defaultData");
    }
  });

  it("keeps gallery exampleUsage and exampleProps free of relative or placeholder media", () => {
    for (const id of GALLERY_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];
      const exampleText = [
        entry.exampleUsage,
        ...collectStrings(entry.exampleProps),
      ].join("\n");

      for (const pattern of FORBIDDEN_EXAMPLE_PATTERNS) {
        expect(exampleText, id).not.toMatch(pattern);
      }
    }
  });

  it("uses absolute media URLs in gallery exampleProps", () => {
    for (const id of GALLERY_BLOCK_IDS_WITH_MEDIA) {
      const mediaStrings = collectMediaStrings(BLOCK_REGISTRY[id].exampleProps);

      expect(mediaStrings.length, id).toBeGreaterThan(0);
      for (const value of mediaStrings) {
        expect(value, `${id}:${value}`).toMatch(/^https?:\/\//);
      }
    }
  });
});

describe("BLOCK_REGISTRY footer category contracts", () => {
  it("declares structured usage requirements and exampleProps for every footer block", () => {
    for (const id of FOOTER_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];

      expect(entry, id).toBeDefined();
      expect(entry.importantUsageNotes, id).toBeTruthy();
      expect(entry.usageRequirements, id).toBeDefined();
      expect(entry.usageRequirements?.requiredProps, id).toBeDefined();
      expect(entry.usageRequirements?.propConstraints, id).toBeDefined();
      expect(entry.usageRequirements?.mediaSlots, id).toBeDefined();
      expect(entry.exampleProps, id).toBeDefined();
      expect(
        (entry as unknown as Record<string, unknown>).defaultProps,
        id,
      ).toBeUndefined();
    }
  });

  it("does not use legacy defaultData for footer blocks in the builder contract", () => {
    const bundle = createBuilderContractBundle({
      blocks: Object.values(BLOCK_REGISTRY),
      uiVersion: "test",
    });

    for (const id of FOOTER_BLOCK_IDS) {
      const block = bundle.blocks.find((item) => item.componentId === id);

      expect(block, id).toBeDefined();
      expect(block?.examples, id).toHaveProperty("exampleProps");
      expect(block?.examples.exampleProps, id).not.toBeNull();
      expect(block?.examples, id).not.toHaveProperty("defaultData");
    }
  });

  it("keeps footer exampleUsage and exampleProps free of relative or placeholder media", () => {
    for (const id of FOOTER_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];
      const exampleText = [
        entry.exampleUsage,
        ...collectStrings(entry.exampleProps),
      ].join("\n");

      for (const pattern of FORBIDDEN_EXAMPLE_PATTERNS) {
        expect(exampleText, id).not.toMatch(pattern);
      }
    }
  });

  it("uses absolute media URLs in footer exampleProps", () => {
    for (const id of FOOTER_BLOCK_IDS_WITH_MEDIA) {
      const mediaStrings = collectMediaStrings(BLOCK_REGISTRY[id].exampleProps);

      expect(mediaStrings.length, id).toBeGreaterThan(0);
      for (const value of mediaStrings) {
        expect(value, `${id}:${value}`).toMatch(/^https?:\/\//);
      }
    }
  });
});

describe("BLOCK_REGISTRY navbar category contracts", () => {
  it("declares structured usage requirements and exampleProps for every navbar block", () => {
    for (const id of NAVBAR_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];

      expect(entry, id).toBeDefined();
      expect(entry.importantUsageNotes, id).toBeTruthy();
      expect(entry.usageRequirements, id).toBeDefined();
      expect(entry.usageRequirements?.requiredProps, id).toBeDefined();
      expect(entry.usageRequirements?.propConstraints, id).toBeDefined();
      expect(entry.usageRequirements?.mediaSlots, id).toBeDefined();
      expect(entry.exampleProps, id).toBeDefined();
      expect(
        (entry as unknown as Record<string, unknown>).defaultProps,
        id,
      ).toBeUndefined();
    }
  });

  it("does not use legacy defaultData for navbar blocks in the builder contract", () => {
    const bundle = createBuilderContractBundle({
      blocks: Object.values(BLOCK_REGISTRY),
      uiVersion: "test",
    });

    for (const id of NAVBAR_BLOCK_IDS) {
      const block = bundle.blocks.find((item) => item.componentId === id);

      expect(block, id).toBeDefined();
      expect(block?.examples, id).toHaveProperty("exampleProps");
      expect(block?.examples.exampleProps, id).not.toBeNull();
      expect(block?.examples, id).not.toHaveProperty("defaultData");
    }
  });

  it("keeps navbar exampleUsage and exampleProps free of relative or placeholder media", () => {
    for (const id of NAVBAR_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];
      const exampleText = [
        entry.exampleUsage,
        ...collectStrings(entry.exampleProps),
      ].join("\n");

      for (const pattern of FORBIDDEN_EXAMPLE_PATTERNS) {
        expect(exampleText, id).not.toMatch(pattern);
      }
    }
  });

  it("uses absolute media URLs in navbar exampleProps", () => {
    for (const id of NAVBAR_BLOCK_IDS_WITH_MEDIA) {
      const mediaStrings = collectMediaStrings(BLOCK_REGISTRY[id].exampleProps);

      expect(mediaStrings.length, id).toBeGreaterThan(0);
      for (const value of mediaStrings) {
        expect(value, `${id}:${value}`).toMatch(/^https?:\/\//);
      }
    }
  });
});

describe("BLOCK_REGISTRY testimonials category contracts", () => {
  it("declares structured usage requirements and exampleProps for every testimonials block", () => {
    for (const id of TESTIMONIALS_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];

      expect(entry, id).toBeDefined();
      expect(entry.importantUsageNotes, id).toBeTruthy();
      expect(entry.usageRequirements, id).toBeDefined();
      expect(entry.usageRequirements?.requiredProps, id).toBeDefined();
      expect(entry.usageRequirements?.propConstraints, id).toBeDefined();
      expect(entry.usageRequirements?.mediaSlots, id).toBeDefined();
      expect(entry.exampleProps, id).toBeDefined();
      expect(
        (entry as unknown as Record<string, unknown>).defaultProps,
        id,
      ).toBeUndefined();
    }
  });

  it("does not use legacy defaultData for testimonials blocks in the builder contract", () => {
    const bundle = createBuilderContractBundle({
      blocks: Object.values(BLOCK_REGISTRY),
      uiVersion: "test",
    });

    for (const id of TESTIMONIALS_BLOCK_IDS) {
      const block = bundle.blocks.find((item) => item.componentId === id);

      expect(block, id).toBeDefined();
      expect(block?.examples, id).toHaveProperty("exampleProps");
      expect(block?.examples.exampleProps, id).not.toBeNull();
      expect(block?.examples, id).not.toHaveProperty("defaultData");
    }
  });

  it("keeps testimonials exampleUsage and exampleProps free of relative or placeholder media", () => {
    for (const id of TESTIMONIALS_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];
      const exampleText = [
        entry.exampleUsage,
        ...collectStrings(entry.exampleProps),
      ].join("\n");

      for (const pattern of FORBIDDEN_EXAMPLE_PATTERNS) {
        expect(exampleText, id).not.toMatch(pattern);
      }
    }
  });

  it("requires reviews_or_testimonials capability for all testimonials blocks", () => {
    for (const id of TESTIMONIALS_BLOCK_IDS) {
      const capabilities =
        BLOCK_REGISTRY[id].usageRequirements?.requiresSiteCapabilities ?? [];

      expect(capabilities, id).toEqual(
        expect.arrayContaining(["reviews_or_testimonials"]),
      );
    }
  });

  it("uses absolute media URLs in testimonials exampleProps", () => {
    for (const id of TESTIMONIALS_BLOCK_IDS_WITH_MEDIA) {
      const mediaStrings = collectMediaStrings(BLOCK_REGISTRY[id].exampleProps);

      expect(mediaStrings.length, id).toBeGreaterThan(0);
      for (const value of mediaStrings) {
        expect(value, `${id}:${value}`).toMatch(/^https?:\/\//);
      }
    }
  });
});

describe("BLOCK_REGISTRY features category contracts", () => {
  it("declares structured usage requirements and exampleProps for every features block", () => {
    for (const id of FEATURES_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];

      expect(entry, id).toBeDefined();
      expect(entry.importantUsageNotes, id).toBeTruthy();
      expect(entry.usageRequirements, id).toBeDefined();
      expect(entry.usageRequirements?.requiredProps, id).toBeDefined();
      expect(entry.usageRequirements?.propConstraints, id).toBeDefined();
      expect(entry.usageRequirements?.mediaSlots, id).toBeDefined();
      expect(entry.exampleProps, id).toBeDefined();
      expect(
        (entry as unknown as Record<string, unknown>).defaultProps,
        id,
      ).toBeUndefined();
    }
  });

  it("does not use legacy defaultData for features blocks in the builder contract", () => {
    const bundle = createBuilderContractBundle({
      blocks: Object.values(BLOCK_REGISTRY),
      uiVersion: "test",
    });

    for (const id of FEATURES_BLOCK_IDS) {
      const block = bundle.blocks.find((item) => item.componentId === id);

      expect(block, id).toBeDefined();
      expect(block?.examples, id).toHaveProperty("exampleProps");
      expect(block?.examples.exampleProps, id).not.toBeNull();
      expect(block?.examples, id).not.toHaveProperty("defaultData");
    }
  });

  it("keeps features exampleUsage and exampleProps free of relative or placeholder media", () => {
    for (const id of FEATURES_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];
      const exampleText = [
        entry.exampleUsage,
        ...collectStrings(entry.exampleProps),
      ].join("\n");

      for (const pattern of FORBIDDEN_EXAMPLE_PATTERNS) {
        expect(exampleText, id).not.toMatch(pattern);
      }
    }
  });

  it("uses absolute media URLs in features exampleProps", () => {
    for (const id of FEATURES_BLOCK_IDS_WITH_MEDIA) {
      const mediaStrings = collectMediaStrings(BLOCK_REGISTRY[id].exampleProps);

      expect(mediaStrings.length, id).toBeGreaterThan(0);
      for (const value of mediaStrings) {
        expect(value, `${id}:${value}`).toMatch(/^https?:\/\//);
      }
    }
  });
});

describe("BLOCK_REGISTRY contact category contracts", () => {
  it("declares structured usage requirements and exampleProps for every contact block", () => {
    for (const id of CONTACT_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];

      expect(entry, id).toBeDefined();
      expect(entry.importantUsageNotes, id).toBeTruthy();
      expect(entry.usageRequirements, id).toBeDefined();
      expect(entry.usageRequirements?.requiredProps, id).toBeDefined();
      expect(entry.usageRequirements?.propConstraints, id).toBeDefined();
      expect(entry.usageRequirements?.mediaSlots, id).toBeDefined();
      expect(entry.exampleProps, id).toBeDefined();
      expect(
        (entry as unknown as Record<string, unknown>).defaultProps,
        id,
      ).toBeUndefined();
    }
  });

  it("does not use legacy defaultData for contact blocks in the builder contract", () => {
    const bundle = createBuilderContractBundle({
      blocks: Object.values(BLOCK_REGISTRY),
      uiVersion: "test",
    });

    for (const id of CONTACT_BLOCK_IDS) {
      const block = bundle.blocks.find((item) => item.componentId === id);

      expect(block, id).toBeDefined();
      expect(block?.examples, id).toHaveProperty("exampleProps");
      expect(block?.examples.exampleProps, id).not.toBeNull();
      expect(block?.examples, id).not.toHaveProperty("defaultData");
    }
  });

  it("keeps contact exampleUsage and exampleProps free of relative or placeholder media", () => {
    for (const id of CONTACT_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];
      const exampleText = [
        entry.exampleUsage,
        ...collectStrings(entry.exampleProps),
      ].join("\n");

      for (const pattern of FORBIDDEN_EXAMPLE_PATTERNS) {
        expect(exampleText, id).not.toMatch(pattern);
      }
    }
  });

  it("uses absolute media URLs in contact exampleProps", () => {
    for (const id of CONTACT_BLOCK_IDS_WITH_MEDIA) {
      const mediaStrings = collectMediaStrings(BLOCK_REGISTRY[id].exampleProps);

      expect(mediaStrings.length, id).toBeGreaterThan(0);
      for (const value of mediaStrings) {
        expect(value, `${id}:${value}`).toMatch(/^https?:\/\//);
      }
    }
  });
});

describe("BLOCK_REGISTRY hero category contracts", () => {
  it("declares structured usage requirements and exampleProps for every hero block", () => {
    for (const id of HERO_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];

      expect(entry, id).toBeDefined();
      expect(entry.importantUsageNotes, id).toBeTruthy();
      expect(entry.usageRequirements, id).toBeDefined();
      expect(entry.usageRequirements?.requiredProps, id).toBeDefined();
      expect(entry.usageRequirements?.propConstraints, id).toBeDefined();
      expect(entry.usageRequirements?.mediaSlots, id).toBeDefined();
      expect(entry.exampleProps, id).toBeDefined();
      expect(
        (entry as unknown as Record<string, unknown>).defaultProps,
        id,
      ).toBeUndefined();
    }
  });

  it("does not use legacy defaultData for hero blocks in the builder contract", () => {
    const bundle = createBuilderContractBundle({
      blocks: Object.values(BLOCK_REGISTRY),
      uiVersion: "test",
    });

    for (const id of HERO_BLOCK_IDS) {
      const block = bundle.blocks.find((item) => item.componentId === id);

      expect(block, id).toBeDefined();
      expect(block?.examples, id).toHaveProperty("exampleProps");
      expect(block?.examples.exampleProps, id).not.toBeNull();
      expect(block?.examples, id).not.toHaveProperty("defaultData");
    }
  });

  it("keeps hero exampleUsage and exampleProps free of relative or placeholder media", () => {
    for (const id of HERO_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];
      const exampleText = [
        entry.exampleUsage,
        ...collectStrings(entry.exampleProps),
      ].join("\n");

      for (const pattern of FORBIDDEN_EXAMPLE_PATTERNS) {
        expect(exampleText, id).not.toMatch(pattern);
      }
    }
  });

  it("uses absolute media URLs in hero exampleProps", () => {
    for (const id of HERO_BLOCK_IDS_WITH_MEDIA) {
      const mediaStrings = collectMediaStrings(BLOCK_REGISTRY[id].exampleProps);

      expect(mediaStrings.length, id).toBeGreaterThan(0);
      for (const value of mediaStrings) {
        expect(value, `${id}:${value}`).toMatch(/^https?:\/\//);
      }
    }
  });
});



/* ========================================================================== */
/* advanced + integrations categories                                          */
/*                                                                             */
/* These suites derive their members from the registry instead of a hard-coded */
/* id list, so a category with zero blocks still passes while every block that */
/* DOES land is held to the category rules. Blocks in these two categories     */
/* carry owner-supplied third-party code, so the verbatim-code rule is         */
/* asserted here as a contract, not left to prose review.                      */
/* ========================================================================== */

const EMBED_CATEGORIES = ["advanced", "integrations"] as const;

/** Blocks that must exist once this round lands. */
const PINNED_EMBED_BLOCK_IDS: Record<string, string[]> = {
  advanced: ["iframe-embed", "script-embed", "free-form-design"],
  integrations: ["tripleseat-form"],
};

/**
 * Blocks whose payload is literal owner-supplied third-party code, i.e. exactly
 * the block_refs Octane's verbatim guard covers (DESIGN-CONTRACT §6.1). Only
 * these need the "copy it exactly, never invent it" instruction in their notes;
 * `advanced/free-form-design` is deliberately NOT in scope — its payload is an
 * AI-authored design tree, not pasted third-party code.
 */
const VERBATIM_SCOPE_BLOCK_IDS = [
  "iframe-embed",
  "script-embed",
  "tripleseat-form",
] as const;

/** Runtime mirror of the `SiteCapability` union in `./types`. */
const KNOWN_SITE_CAPABILITIES = [
  "reviews_or_testimonials",
  "pricing",
  "pricing_data",
  "team_members",
  "blog_posts",
  "portfolio_items",
  "case_studies",
  "locations",
  "events",
  "products",
  "services",
  "stats_or_metrics",
  "metrics_or_stats",
  "product_catalog",
  "media_library",
  "contact_form",
  "video_assets",
  "contact_info",
  "instagram_media",
];

function blockIdsInCategory(category: string): string[] {
  return Object.values(BLOCK_REGISTRY)
    .filter((entry) => entry.category === category)
    .map((entry) => entry.id)
    .sort();
}

/** Collect every string value whose key looks like a URL or URL list. */
function collectUrlStrings(value: unknown, path: string[] = []): string[] {
  if (typeof value === "string") {
    const pathText = path.join(".");
    return /url/i.test(pathText) ? [value] : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      collectUrlStrings(item, [...path, String(index)]),
    );
  }

  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) =>
      collectUrlStrings(item, [...path, key]),
    );
  }

  return [];
}

for (const category of EMBED_CATEGORIES) {
  describe(`BLOCK_REGISTRY ${category} category contracts`, () => {
    it(`registers every block Workstream A pins for the ${category} category`, () => {
      const ids = blockIdsInCategory(category);

      for (const pinned of PINNED_EMBED_BLOCK_IDS[category]) {
        expect(ids, category).toContain(pinned);
      }
    });

    it(`declares structured usage requirements and exampleProps for every ${category} block`, () => {
      for (const id of blockIdsInCategory(category)) {
        const entry = BLOCK_REGISTRY[id];

        expect(entry, id).toBeDefined();
        expect(entry.importantUsageNotes, id).toBeTruthy();
        expect(entry.usageRequirements, id).toBeDefined();
        expect(entry.usageRequirements?.requiredProps, id).toBeDefined();
        expect(entry.usageRequirements?.propConstraints, id).toBeDefined();
        expect(entry.usageRequirements?.mediaSlots, id).toBeDefined();
        expect(entry.exampleProps, id).toBeDefined();
        expect(
          (entry as unknown as Record<string, unknown>).defaultProps,
          id,
        ).toBeUndefined();
      }
    });

    it(`carries the verbatim-code rule in every verbatim-scope ${category} block`, () => {
      const ids = blockIdsInCategory(category).filter((id) =>
        (VERBATIM_SCOPE_BLOCK_IDS as readonly string[]).includes(id),
      );

      for (const id of ids) {
        // These blocks paste real third-party code. The model must be told, in
        // the notes that become HARD CONSTRAINTS, never to invent it.
        expect(BLOCK_REGISTRY[id].importantUsageNotes, id).toMatch(
          /exactly|verbatim/i,
        );
      }
    });

    it(`declares a semantic tag set and description for every ${category} block`, () => {
      for (const id of blockIdsInCategory(category)) {
        const entry = BLOCK_REGISTRY[id];

        expect(entry.description.length, id).toBeGreaterThan(40);
        expect(entry.semanticTags.length, id).toBeGreaterThanOrEqual(6);
        expect(entry.props, id).toMatch(/Props$/);
      }
    });

    it(`does not use legacy defaultData for ${category} blocks in the builder contract`, () => {
      const bundle = createBuilderContractBundle({
        blocks: Object.values(BLOCK_REGISTRY),
        uiVersion: "test",
      });

      for (const id of blockIdsInCategory(category)) {
        const block = bundle.blocks.find((item) => item.componentId === id);

        expect(block, id).toBeDefined();
        expect(block?.examples, id).toHaveProperty("exampleProps");
        expect(block?.examples.exampleProps, id).not.toBeNull();
        expect(block?.examples, id).not.toHaveProperty("defaultData");
      }
    });

    it(`derives a ${category}/<id> blockRef and a page layout role`, () => {
      const bundle = createBuilderContractBundle({
        blocks: Object.values(BLOCK_REGISTRY),
        uiVersion: "test",
      });

      for (const id of blockIdsInCategory(category)) {
        const block = bundle.blocks.find((item) => item.componentId === id);

        expect(block?.blockRef, id).toBe(`${category}/${id}`);
        expect(block?.layoutRole, id).toBe("page");
      }
    });

    it(`keeps ${category} exampleUsage and exampleProps free of relative or placeholder media`, () => {
      for (const id of blockIdsInCategory(category)) {
        const entry = BLOCK_REGISTRY[id];
        const exampleText = [
          entry.exampleUsage,
          ...collectStrings(entry.exampleProps),
        ].join("\n");

        for (const pattern of FORBIDDEN_EXAMPLE_PATTERNS) {
          expect(exampleText, id).not.toMatch(pattern);
        }
      }
    });

    it(`uses absolute https URLs in ${category} exampleProps`, () => {
      let assertedValues = 0;
      let expectsValues = false;

      for (const id of blockIdsInCategory(category)) {
        const entry = BLOCK_REGISTRY[id];
        const constraints = entry.usageRequirements?.propConstraints ?? {};
        const slots = entry.usageRequirements?.mediaSlots ?? {};

        // A block is expected to contribute at least one asserted value when it
        // declares a media slot or a URL-shaped prop. tripleseat-form declares
        // neither (mediaSlots: {} on purpose, no url props) and is exempt.
        if (
          Object.keys(slots).length > 0 ||
          Object.keys(constraints).some((key) => /url/i.test(key))
        ) {
          expectsValues = true;
        }

        // `collectUrlStrings` only fires when the accumulated PATH contains
        // "url", which covers embedUrl/scriptUrl but NOT free-form-design's
        // example image at designTree.children.1.attrs.src. On its own this
        // suite was vacuous for exactly the block whose media the model
        // pattern-copies, so it is paired with the media collector the rest of
        // this file uses.
        const mediaStrings = collectMediaStrings(entry.exampleProps);
        const values = [...collectUrlStrings(entry.exampleProps), ...mediaStrings];

        // Non-vacuity per block: anything declaring a media slot must ship a
        // media value in its example (same guard the other category suites
        // use).
        if (Object.keys(slots).length > 0) {
          expect(mediaStrings.length, id).toBeGreaterThan(0);
        }

        for (const value of values) {
          expect(value, `${id}:${value}`).toMatch(/^https:\/\//);
        }

        assertedValues += values.length;
      }

      // Non-vacuity for the category as a whole: a refactor that stops
      // collecting anything must fail here rather than pass silently.
      if (expectsValues) {
        expect(assertedValues, category).toBeGreaterThan(0);
      }
    });

    it(`uses real, current site capability keys for ${category} blocks`, () => {
      // Only the two keys with an unambiguous current replacement are banned
      // (stats_or_metrics / pricing). `contact_info` is a live key used by 47
      // blocks and is NOT legacy outside the about category's own migration.
      const supersededCapabilityKeys = ["metrics_or_stats", "pricing_data"];

      for (const id of blockIdsInCategory(category)) {
        const capabilities =
          BLOCK_REGISTRY[id].usageRequirements?.requiresSiteCapabilities ?? [];

        for (const capability of supersededCapabilityKeys) {
          expect(capabilities, id).not.toContain(capability);
        }

        for (const capability of capabilities) {
          expect(KNOWN_SITE_CAPABILITIES, `${id}:${capability}`).toContain(
            capability,
          );
        }
      }
    });

    it(`keeps any declared ${category} media slot typed and role-restricted`, () => {
      for (const id of blockIdsInCategory(category)) {
        const slots = BLOCK_REGISTRY[id].usageRequirements?.mediaSlots ?? {};

        for (const slot of Object.values(slots)) {
          if (slot.path.includes(".video")) {
            expect(slot.note, `${id}:${slot.path}`).toMatch(/VIDEO .*ONLY/i);
            continue;
          }

          expect(slot.note, `${id}:${slot.path}`).toMatch(/IMAGE .*ONLY/i);
          expect(slot.disallowedRoles ?? [], `${id}:${slot.path}`).toEqual(
            expect.arrayContaining(["logo", "favicon", "video-thumbnail"]),
          );
        }
      }
    });
  });
}

describe("advanced + integrations example-url collectors", () => {
  it("catches a relative or http media url in the real free-form-design example shape", () => {
    // Non-vacuity sentinel for `uses absolute https URLs in <category>
    // exampleProps`. `collectUrlStrings` alone only fires on paths containing
    // "url", so it collected NOTHING for free-form-design, whose example image
    // lives at designTree.children.<n>.attrs.src — a regressed relative src
    // would have shipped silently into the AI-visible example (and
    // lib/free-form-tree.ts drops non-https Img nodes outright, so the symptom
    // is an image-less section, not an error).
    const regressed = {
      sectionClassName: "bg-secondary",
      embedUrl: "http://example.com/embed",
      designTree: {
        tag: "div",
        children: [
          {
            tag: "Img",
            attrs: { src: "/assets/hero.jpg", alt: "should not be collected" },
          },
        ],
      },
    };

    const collected = [
      ...collectUrlStrings(regressed),
      ...collectMediaStrings(regressed),
    ];

    expect(collected).toContain("/assets/hero.jpg");
    expect(collected).toContain("http://example.com/embed");
    expect(collected).not.toContain("should not be collected");

    for (const value of collected) {
      expect(value).not.toMatch(/^https:\/\//);
    }
  });

  it("collects the shipped free-form-design example image and it is absolute https", () => {
    const mediaStrings = collectMediaStrings(
      BLOCK_REGISTRY["free-form-design"].exampleProps,
    );

    expect(mediaStrings.length).toBeGreaterThan(0);
    for (const value of mediaStrings) {
      expect(value).toMatch(/^https:\/\//);
    }
  });
});

describe("advanced + integrations required-prop contracts", () => {
  it("pins tripleseat-form requiredProps to the DESIGN-CONTRACT §7 set", () => {
    expect(
      BLOCK_REGISTRY["tripleseat-form"].usageRequirements?.requiredProps,
    ).toEqual(["leadFormId", "publicKey", "degradedMessage", "retryLabel"]);
  });

  it("pins free-form-design requiredProps to designTree", () => {
    expect(
      BLOCK_REGISTRY["free-form-design"].usageRequirements?.requiredProps,
    ).toEqual(["designTree"]);
  });

  it("keeps real TripleSeat credentials out of the registry entry", () => {
    // The live client's lead_form_id/public_key (and the prototype's) must exist
    // only as test fixtures — never as an example the model could copy onto
    // someone else's site.
    const entry = BLOCK_REGISTRY["tripleseat-form"];
    const serialized = [
      entry.exampleUsage,
      entry.importantUsageNotes ?? "",
      JSON.stringify(entry.exampleProps ?? null),
      JSON.stringify(entry.usageRequirements ?? null),
    ].join("\n");

    for (const secret of ["40635", "3eef23", "25907", "e05666"]) {
      expect(serialized, secret).not.toContain(secret);
    }

    // …and the placeholders that ARE there must be obviously fake.
    const exampleProps = entry.exampleProps as Record<string, unknown>;
    expect(exampleProps.leadFormId).toBe("12345");
    expect(exampleProps.publicKey).toBe("your-tripleseat-public-key");
  });
});

describe("createBuilderContractBundle output naming", () => {
  it("emits examples.exampleProps and no examples.defaultData for any block", () => {
    const allBlocks = Object.values(BLOCK_REGISTRY);
    const bundle = createBuilderContractBundle({
      blocks: allBlocks,
      uiVersion: "test",
    });

    for (const block of bundle.blocks) {
      expect(block.examples).toHaveProperty("exampleProps");
      expect(block.examples).not.toHaveProperty("defaultData");
    }
  });

  it("includes hero-mental-health-team example payload under exampleProps", () => {
    const allBlocks = Object.values(BLOCK_REGISTRY);
    const bundle = createBuilderContractBundle({
      blocks: allBlocks,
      uiVersion: "test",
    });

    const mentalHealth = bundle.blocks.find(
      (b) => b.componentId === "hero-mental-health-team",
    );
    expect(mentalHealth).toBeDefined();
    expect(mentalHealth?.examples.exampleProps).toBeDefined();
    expect(mentalHealth?.examples.exampleProps).not.toBeNull();
  });

  it("includes hero-mentorship-video-split usage requirements in bundle", () => {
    const allBlocks = Object.values(BLOCK_REGISTRY);
    const bundle = createBuilderContractBundle({
      blocks: allBlocks,
      uiVersion: "test",
    });

    const mentorship = bundle.blocks.find(
      (b) => b.componentId === "hero-mentorship-video-split",
    );
    expect(mentorship).toBeDefined();
    expect(mentorship?.usageRequirements?.mediaSlots).toBeDefined();
    expect(mentorship?.usageRequirements?.mediaSlots?.image).toBeDefined();
    expect(
      mentorship?.usageRequirements?.mediaSlots?.["modalVideo.video.src"],
    ).toBeDefined();
    expect(mentorship?.examples.exampleProps).toBeDefined();
  });
});

// ============================================================
// LINK-PAGE LOGO PLACEMENT CONTRACTS (logoAspect / logoBannerImage)
// Added by workstream A7 — see docs/ui-refinements/impl/00-DESIGN-link-page-logos.md §3
// ============================================================

/** The four link-page blocks whose brand-mark slot is named `avatar`. */
const LINK_PAGE_AVATAR_SLOT_BLOCK_IDS = [
  "link-page-minimal-profile",
  "link-page-newsletter-social",
  "link-page-grid-cards",
  "link-page-bento-layout",
] as const;

/** Closed MediaRole union from src/registry/types.ts — there is no "banner" role. */
const MEDIA_ROLE_VALUES = [
  "logo",
  "favicon",
  "hero",
  "feature",
  "thumbnail",
  "profile",
  "avatar",
  "gallery",
  "background",
  "screenshot",
  "illustration",
  "video-thumbnail",
] as const;

describe("BLOCK_REGISTRY link-page logo placement contracts", () => {
  it("declares the logo prop as a logo-role media slot on every link-page block", () => {
    for (const id of LINK_PAGE_BLOCK_IDS) {
      const slot = BLOCK_REGISTRY[id].usageRequirements?.mediaSlots?.logo;

      expect(slot, id).toBeDefined();
      expect(slot?.path, id).toBe("logo.src");
      expect(slot?.roles, id).toEqual(["logo"]);
      expect(slot?.disallowedRoles ?? [], id).not.toContain("logo");
      expect(slot?.required, id).toBe(false);
      expect(slot?.note ?? "", id).toMatch(/LOGO IMAGE ONLY/);
      expect(slot?.note ?? "", id).toMatch(/priority over avatar/i);
    }
  });

  /**
   * The avatar medallion on these four blocks accepts EITHER the site brand
   * mark or a person's headshot (each contract's prose: "typically a profile
   * photo or logo"), so the slot must ban neither role. `imageSlot` bans
   * `logo`; `logoSlot`'s note bans photos ("Do not use photos") — both are
   * wrong here, hence the dedicated dual-role slot.
   */
  it("declares the avatar slot as dual-role: logo OR profile headshot", () => {
    for (const id of LINK_PAGE_AVATAR_SLOT_BLOCK_IDS) {
      const slot = BLOCK_REGISTRY[id].usageRequirements?.mediaSlots?.avatar;

      expect(slot, id).toBeDefined();
      expect(slot?.path, id).toBe("avatar.src");
      expect(slot?.roles, id).toEqual(["profile", "avatar", "logo"]);
      expect(slot?.disallowedRoles ?? [], id).toEqual([
        "favicon",
        "video-thumbnail",
      ]);
      expect(slot?.minPixelClass, id).toBe("small");
      expect(slot?.required, id).toBe(false);
      expect(slot?.note ?? "", id).toMatch(/LOGO OR PROFILE IMAGE ONLY/);
      // Neither one-sided ban may come back.
      expect(slot?.note ?? "", id).not.toMatch(/Do not use logos/);
      expect(slot?.note ?? "", id).not.toMatch(/Do not use photos/);
    }
  });

  /**
   * Placement guidance, not a role ban: octane's brand-mark stripper nulls
   * logo URLs on avatar-named keys (only `logo*`/`favicon`/`brandmark` keys are
   * exempt — see 00-DESIGN-link-page-logos.md §0.5), so a brand mark generated
   * into avatar/brandAvatar silently renders nothing.
   */
  it("tells the agent the brand mark goes in logo.src, never in avatar/brandAvatar", () => {
    for (const id of LINK_PAGE_BLOCK_IDS) {
      const notes = BLOCK_REGISTRY[id].importantUsageNotes ?? "";

      expect(notes, id).toMatch(/put the brand mark in logo\.src/);
      expect(notes, id).toMatch(/NEVER in avatar or brandAvatar/);
      expect(notes, id).toMatch(/nulls logo URLs on avatar-named props/);
      expect(notes, id).toMatch(/renders nothing/);
      expect(notes, id).toMatch(/profile photo \(headshot\)/);
    }
  });

  it("declares the full-bleed banner slot with real MediaRole values", () => {
    for (const id of LINK_PAGE_BLOCK_IDS) {
      const slot =
        BLOCK_REGISTRY[id].usageRequirements?.mediaSlots?.logoBannerImage;

      expect(slot, id).toBeDefined();
      expect(slot?.path, id).toBe("logoBannerImage.src");
      expect(slot?.roles, id).toEqual(["hero", "background"]);
      expect(slot?.minPixelClass, id).toBe("large");
      expect(slot?.preferredAspect, id).toBe("3:1");
      expect(slot?.required, id).toBe(false);
      expect(slot?.note ?? "", id).toMatch(/logoAspect is "banner"/);
      // Post-deploy banner-contain patch: the band never crops the artwork, so
      // the slot note must not go back to advertising a cropped cover band.
      expect(slot?.note ?? "", id).toMatch(/never cropped/);
    }
  });

  it("keeps every link-page media slot role inside the MediaRole union", () => {
    for (const id of LINK_PAGE_BLOCK_IDS) {
      const slots = BLOCK_REGISTRY[id].usageRequirements?.mediaSlots ?? {};

      for (const [name, slot] of Object.entries(slots)) {
        for (const role of [...slot.roles, ...(slot.disallowedRoles ?? [])]) {
          expect(MEDIA_ROLE_VALUES, `${id}.${name}:${role}`).toContain(role);
        }
      }
    }
  });

  it("declares propConstraints for logo, logoAspect and both banner props", () => {
    for (const id of LINK_PAGE_BLOCK_IDS) {
      const constraints =
        BLOCK_REGISTRY[id].usageRequirements?.propConstraints ?? {};

      expect(constraints.logo, id).toMatchObject({ required: false });
      expect(constraints.logo?.note ?? "", id).toMatch(
        /LogoConfig \{ src, alt, url\? \}/,
      );
      expect(constraints.logo?.note ?? "", id).toMatch(/prefer it over avatar/);

      expect(constraints.logoAspect, id).toMatchObject({ required: false });
      const aspectNote = constraints.logoAspect?.note ?? "";
      for (const value of ["horizontal", "square", "vertical", "banner"]) {
        expect(aspectNote, `${id}:${value}`).toContain(`"${value}"`);
      }
      expect(aspectNote, id).toMatch(/never by logoClassName/);

      expect(constraints["logoBannerImage.src"], id).toMatchObject({
        required: false,
      });
      expect(constraints["logoBannerImage.src"]?.note ?? "", id).toMatch(
        /Absolute https URL/,
      );
      expect(constraints["logoBannerImage.src"]?.note ?? "", id).toMatch(
        /never cropped/,
      );

      expect(constraints.logoBannerAspect, id).toMatchObject({
        required: false,
      });
      const bannerAspectNote = constraints.logoBannerAspect?.note ?? "";
      for (const value of ["standard", "wide", "ultrawide"]) {
        expect(bannerAspectNote, `${id}:${value}`).toContain(`"${value}"`);
      }
      // The enum is a reserved shape + height cap, never a crop instruction.
      expect(bannerAspectNote, id).toMatch(/never crops/);
      expect(bannerAspectNote, id).toMatch(/letterboxed/);
    }
  });

  it("carries the new logo keys in exampleProps so octane's sanitizer retains them", () => {
    for (const id of LINK_PAGE_BLOCK_IDS) {
      const exampleProps = BLOCK_REGISTRY[id].exampleProps as
        | Record<string, unknown>
        | undefined;

      expect(exampleProps, id).toBeDefined();

      const logo = exampleProps?.logo as
        | { src?: string; alt?: string }
        | undefined;
      expect(logo?.src ?? "", id).toMatch(/^https:\/\//);
      expect(logo?.alt ?? "", id).not.toBe("");

      expect(exampleProps?.logoAspect, id).toBe("horizontal");

      const banner = exampleProps?.logoBannerImage as
        | { src?: string; alt?: string }
        | undefined;
      expect(banner?.src ?? "", id).toMatch(/^https:\/\//);
      expect(banner?.alt ?? "", id).not.toBe("");
      // The banner is a photographic cover image, never the brand mark itself.
      expect(banner?.src, id).not.toBe(logo?.src);

      expect(exampleProps?.logoBannerAspect, id).toBe("standard");
    }
  });

  it("tells the agent that logoAspect — never a className — controls logo sizing", () => {
    for (const id of LINK_PAGE_BLOCK_IDS) {
      const notes = BLOCK_REGISTRY[id].importantUsageNotes ?? "";

      expect(notes, id).toMatch(/controlled ONLY by logoAspect/);
      expect(notes, id).toMatch(/logoClassName/);
      expect(notes, id).toMatch(/no effect on live sites/);
      expect(notes, id).toMatch(/square icon\/mark/);
      expect(notes, id).toMatch(/stacked or portrait logo/);
      expect(notes, id).toMatch(/omit both otherwise/);
      expect(notes, id).toMatch(/NEVER cropped/);
      expect(notes, id).toMatch(/logo takes priority over avatar/);
    }
  });

  it("stops presenting the avatar slot as the only brand-mark slot", () => {
    for (const id of ["link-tree-block", "link-page-minimal-profile"]) {
      const notes = (
        BLOCK_REGISTRY[id].usageRequirements?.notes ?? []
      ).join(" ");

      expect(notes, id).toMatch(/logo prop/);
      expect(notes, id).toMatch(/logoAspect/);
    }
  });

  it("propagates the logo contract into the builder contract bundle", () => {
    const bundle = createBuilderContractBundle({
      blocks: Object.values(BLOCK_REGISTRY),
      uiVersion: "test",
    });

    for (const id of LINK_PAGE_BLOCK_IDS) {
      const block = bundle.blocks.find((item) => item.componentId === id);

      expect(block, id).toBeDefined();
      expect(block?.usageRequirements?.mediaSlots?.logo, id).toBeDefined();
      expect(
        block?.usageRequirements?.mediaSlots?.logoBannerImage,
        id,
      ).toBeDefined();
      expect(block?.usageRequirements?.propConstraints?.logoAspect, id)
        .toBeDefined();
      expect(block?.examples.exampleProps, id).toHaveProperty("logo");
      expect(block?.examples.exampleProps, id).toHaveProperty("logoAspect");
      expect(block?.examples.exampleProps, id).toHaveProperty(
        "logoBannerImage",
      );
      expect(block?.examples.exampleProps, id).toHaveProperty(
        "logoBannerAspect",
      );
    }
  });

  /**
   * importantUsageNotes is prose handed verbatim to the AI agent. A mangled
   * template literal (e.g. a transposed `${...}` fragment) ships raw
   * interpolation syntax into the prompt, so the emitted string must never
   * contain unresolved template markers.
   *
   * Scoped to the WHOLE registry, not just link-page blocks: the same
   * corruption shape (a `${"…"}` wrapper whose inner quotes collapsed, so a
   * literal `+` became `} ${`) shipped in several unrelated block contracts.
   * Legitimately resolved interpolations emit no `${` at all, so any hit here
   * is a real corruption rather than documented template syntax.
   */
  it("emits importantUsageNotes free of unresolved template fragments for every registry block", () => {
    const offenders = Object.entries(BLOCK_REGISTRY)
      .filter(([, block]) => {
        const notes = block.importantUsageNotes;

        if (notes === undefined) {
          return false;
        }

        return (
          notes.includes("${") ||
          notes.includes("} ${") ||
          /\}\s*\$/.test(notes)
        );
      })
      .map(([id]) => id);

    expect(offenders).toEqual([]);
  });

  it("emits non-empty link-page importantUsageNotes with an intact breakpoint phrase", () => {
    for (const id of LINK_PAGE_BLOCK_IDS) {
      const notes = BLOCK_REGISTRY[id].importantUsageNotes ?? "";

      expect(notes, id).toBeTruthy();
      expect(notes, id).not.toContain("sm}");
    }
  });

  it("describes the grid-cards columns breakpoint in intact prose", () => {
    const notes =
      BLOCK_REGISTRY["link-page-grid-cards"].importantUsageNotes ?? "";

    expect(notes).toContain(
      "columns=3 adds a third column on sm and larger screens.",
    );
  });
});
