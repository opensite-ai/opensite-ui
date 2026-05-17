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
    const isMediaPath =
      /(src|image|images|avatar|logo|media)/i.test(pathText) && !isAltText;

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
    expect(bundle.dynamicSources.blog_feed.hydrationOwner).toBe("dashtrack-ai");
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

  it("declares image media slots where about blocks accept media", () => {
    for (const id of ABOUT_BLOCK_IDS_WITH_MEDIA) {
      const slots = BLOCK_REGISTRY[id].usageRequirements?.mediaSlots ?? {};

      expect(Object.keys(slots).length, id).toBeGreaterThan(0);

      for (const slot of Object.values(slots)) {
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
