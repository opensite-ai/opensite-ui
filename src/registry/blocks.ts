/**
 * Semantic Block Registry
 *
 * This registry maps semantic concepts to available UI blocks for AI-driven
 * site generation. Each block entry contains:
 * - id: Unique identifier for the block
 * - name: Human-readable name
 * - description: What the block does and when to use it
 * - semanticTags: Array of semantic concepts this block represents
 * - category: Block category (about, features, cta, testimonials, etc.)
 * - component: Reference to the actual component
 * - props: TypeScript type for the component's props
 * - exampleUsage: Code example showing how to use the block
 */

import { AlternatingBlocks } from "../../components/blocks/about/alternating-blocks";
import type { AlternatingBlocksProps } from "../../components/blocks/about/alternating-blocks";
import { AboutMissionFeatures } from "../../components/blocks/about/about-mission-features";
import { AboutStatsShowcase } from "../../components/blocks/about/about-stats-showcase";
import { AboutCompanyProfile } from "../../components/blocks/about/about-company-profile";
import { AboutVisionGallery } from "../../components/blocks/about/about-vision-gallery";
import { AboutDeveloperStory } from "../../components/blocks/about/about-developer-story";
import { AboutStoryGallery } from "../../components/blocks/about/about-story-gallery";
import { AboutStreamlineTeam } from "../../components/blocks/about/about-streamline-team";
import { AboutDeveloperProfile } from "../../components/blocks/about/about-developer-profile";
import { AboutStartupTeam } from "../../components/blocks/about/about-startup-team";
import { AboutMinimalStory } from "../../components/blocks/about/about-minimal-story";
import { AboutStoryHero } from "../../components/blocks/about/about-story-hero";
import { AboutStatsSidebar } from "../../components/blocks/about/about-stats-sidebar";
import { AboutInteractiveTabs } from "../../components/blocks/about/about-interactive-tabs";
import { AboutMissionDualImage } from "../../components/blocks/about/about-mission-dual-image";
import { MediaHoverCtas } from "../../components/blocks/cta/media-hover-ctas";
import type { MediaHoverCtasProps } from "../../components/blocks/cta/media-hover-ctas";
import { FeatureShowcase } from "../../components/blocks/features/feature-showcase";
import type { FeatureShowcaseProps } from "../../components/blocks/features/feature-showcase";
import { TeamMediaShowcase } from "../../components/blocks/team/team-media-showcase";
import type { TeamMediaShowcaseProps } from "../../components/blocks/team/team-media-showcase";

// Footer components
import { FooterLinksGrid } from "../../components/blocks/footers/footer-links-grid";
import { FooterSocialNewsletter } from "../../components/blocks/footers/footer-social-newsletter";
import { FooterSocialApps } from "../../components/blocks/footers/footer-social-apps";
import { FooterSimpleCentered } from "../../components/blocks/footers/footer-simple-centered";
import { FooterBrandDescription } from "../../components/blocks/footers/footer-brand-description";
import { FooterNewsletterGrid } from "../../components/blocks/footers/footer-newsletter-grid";
import { FooterCtaBanner } from "../../components/blocks/footers/footer-cta-banner";
import { FooterContactCard } from "../../components/blocks/footers/footer-contact-card";
import { FooterBackgroundCard } from "../../components/blocks/footers/footer-background-card";
import { FooterAnimatedSocial } from "../../components/blocks/footers/footer-animated-social";
import { FooterNewsletterMinimal } from "../../components/blocks/footers/footer-newsletter-minimal";
import { FooterCtaSocial } from "../../components/blocks/footers/footer-cta-social";
import { FooterNavSocial } from "../../components/blocks/footers/footer-nav-social";

// Gallery components
import { ExpandableCaseStudyCards } from "../../components/blocks/gallery/expandable-case-study-cards";
import { CarouselBadgeCards } from "../../components/blocks/gallery/carousel-badge-cards";
import { CarouselGradientOverlay } from "../../components/blocks/gallery/carousel-gradient-overlay";
import { CarouselDemoLink } from "../../components/blocks/gallery/carousel-demo-link";
import { AutoScrollCarousel } from "../../components/blocks/gallery/auto-scroll-carousel";
import { CarouselSidebarResources } from "../../components/blocks/gallery/carousel-sidebar-resources";
import { CarouselIconTabs } from "../../components/blocks/gallery/carousel-icon-tabs";
import { TestimonialCarouselCards } from "../../components/blocks/gallery/testimonial-carousel-cards";
import { CarouselIconSidebar } from "../../components/blocks/gallery/carousel-icon-sidebar";
import { CarouselGradientText } from "../../components/blocks/gallery/carousel-gradient-text";
import { ServiceHoverCarousel } from "../../components/blocks/gallery/service-hover-carousel";
import { CarouselTabsContent } from "../../components/blocks/gallery/carousel-tabs-content";
import { CarouselScaleFocus } from "../../components/blocks/gallery/carousel-scale-focus";
import { MasonryMotionGrid } from "../../components/blocks/gallery/masonry-motion-grid";
import { BlurVignetteGrid } from "../../components/blocks/gallery/blur-vignette-grid";
import { InteriorCarousel } from "../../components/blocks/gallery/interior-carousel";

// Background Pattern Hero components
import { RadialGradientTop } from "../../components/blocks/background-pattern-hero/radial-gradient-top";
import { RadialGradientBottom } from "../../components/blocks/background-pattern-hero/radial-gradient-bottom";
import { GridBasic } from "../../components/blocks/background-pattern-hero/grid-basic";
import { GridFadeTopLeft } from "../../components/blocks/background-pattern-hero/grid-fade-top-left";
import { GridFadeTopRight } from "../../components/blocks/background-pattern-hero/grid-fade-top-right";
import { GridFadeTop } from "../../components/blocks/background-pattern-hero/grid-fade-top";
import { GridFadeBottom } from "../../components/blocks/background-pattern-hero/grid-fade-bottom";
import { GridFadeBottomLeft } from "../../components/blocks/background-pattern-hero/grid-fade-bottom-left";
import { GridFadeBottomRight } from "../../components/blocks/background-pattern-hero/grid-fade-bottom-right";
import { GridFadeCenter } from "../../components/blocks/background-pattern-hero/grid-fade-center";
import { DiagonalCrossBasic } from "../../components/blocks/background-pattern-hero/diagonal-cross-basic";
import { DiagonalCrossFadeTopLeft } from "../../components/blocks/background-pattern-hero/diagonal-cross-fade-top-left";
import { DiagonalCrossFadeTopRight } from "../../components/blocks/background-pattern-hero/diagonal-cross-fade-top-right";
import { DiagonalCrossFadeTop } from "../../components/blocks/background-pattern-hero/diagonal-cross-fade-top";
import { DiagonalCrossFadeBottom } from "../../components/blocks/background-pattern-hero/diagonal-cross-fade-bottom";
import { DiagonalCrossFadeBottomLeft } from "../../components/blocks/background-pattern-hero/diagonal-cross-fade-bottom-left";
import { DiagonalCrossFadeBottomRight } from "../../components/blocks/background-pattern-hero/diagonal-cross-fade-bottom-right";
import { DiagonalCrossFadeCenter } from "../../components/blocks/background-pattern-hero/diagonal-cross-fade-center";
import { DashedGridBasic } from "../../components/blocks/background-pattern-hero/dashed-grid-basic";
import { DashedGridFadeTopLeft } from "../../components/blocks/background-pattern-hero/dashed-grid-fade-top-left";
import { DashedGridFadeTopRight } from "../../components/blocks/background-pattern-hero/dashed-grid-fade-top-right";
import { DashedGridFadeTop } from "../../components/blocks/background-pattern-hero/dashed-grid-fade-top";
import { DashedGridFadeBottom } from "../../components/blocks/background-pattern-hero/dashed-grid-fade-bottom";
import { DashedGridFadeBottomLeft } from "../../components/blocks/background-pattern-hero/dashed-grid-fade-bottom-left";
import { DashedGridFadeBottomRight } from "../../components/blocks/background-pattern-hero/dashed-grid-fade-bottom-right";
import { DashedGridFadeCenter } from "../../components/blocks/background-pattern-hero/dashed-grid-fade-center";
import { GradientGlowTop } from "../../components/blocks/background-pattern-hero/gradient-glow-top";
import { GradientGlowBottom } from "../../components/blocks/background-pattern-hero/gradient-glow-bottom";
import { SpotlightLeft } from "../../components/blocks/background-pattern-hero/spotlight-left";
import { SpotlightRight } from "../../components/blocks/background-pattern-hero/spotlight-right";
import { CircuitBoardBasic } from "../../components/blocks/background-pattern-hero/circuit-board-basic";
import { CircuitBoardFadeTopLeft } from "../../components/blocks/background-pattern-hero/circuit-board-fade-top-left";
import { CircuitBoardFadeTopRight } from "../../components/blocks/background-pattern-hero/circuit-board-fade-top-right";
import { CircuitBoardFadeTop } from "../../components/blocks/background-pattern-hero/circuit-board-fade-top";
import { CircuitBoardFadeBottom } from "../../components/blocks/background-pattern-hero/circuit-board-fade-bottom";
import { CircuitBoardFadeBottomLeft } from "../../components/blocks/background-pattern-hero/circuit-board-fade-bottom-left";
import { CircuitBoardFadeBottomRight } from "../../components/blocks/background-pattern-hero/circuit-board-fade-bottom-right";
import { CircuitBoardFadeCenter } from "../../components/blocks/background-pattern-hero/circuit-board-fade-center";
import { GridDotsBasic } from "../../components/blocks/background-pattern-hero/grid-dots-basic";
import { GridDotsFadeCenter } from "../../components/blocks/background-pattern-hero/grid-dots-fade-center";

// Blog components
import { BlogGridAuthorCards } from "../../components/blocks/blog/blog-grid-author-cards";
import { BlogCardsTaglineCta } from "../../components/blocks/blog/blog-cards-tagline-cta";
import { BlogCardsReadTime } from "../../components/blocks/blog/blog-cards-read-time";
import { BlogCategoryOverlay } from "../../components/blocks/blog/blog-category-overlay";
import { BlogFeaturedPopular } from "../../components/blocks/blog/blog-featured-popular";
import { BlogRelatedArticles } from "../../components/blocks/blog/blog-related-articles";
import { BlogTechInsights } from "../../components/blocks/blog/blog-tech-insights";
import { BlogHorizontalCards } from "../../components/blocks/blog/blog-horizontal-cards";
import { BlogFilteredResults } from "../../components/blocks/blog/blog-filtered-results";
import { BlogMasonryFeatured } from "../../components/blocks/blog/blog-masonry-featured";
import { BlogHorizontalTimeline } from "../../components/blocks/blog/blog-horizontal-timeline";
import { BlogGridNinePosts } from "../../components/blocks/blog/blog-grid-nine-posts";

// Article components
import { ArticleHeroProse } from "../../components/blocks/article/article-hero-prose";
import { ArticleSidebarSticky } from "../../components/blocks/article/article-sidebar-sticky";
import { ArticleTocSidebar } from "../../components/blocks/article/article-toc-sidebar";
import { ArticleBreadcrumbSocial } from "../../components/blocks/article/article-breadcrumb-social";
import { ArticleCompactToc } from "../../components/blocks/article/article-compact-toc";
import { ArticleChaptersAuthor } from "../../components/blocks/article/article-chapters-author";
import { ArticleSplitAnimated } from "../../components/blocks/article/article-split-animated";

// FAQ components
import { FaqSimpleAccordion } from "../../components/blocks/faq/faq-simple-accordion";
import { FaqStaticList } from "../../components/blocks/faq/faq-static-list";
import { FaqCenteredAccordion } from "../../components/blocks/faq/faq-centered-accordion";
import { FaqBadgeSupport } from "../../components/blocks/faq/faq-badge-support";
import { FaqNumberedList } from "../../components/blocks/faq/faq-numbered-list";
import { FaqNumberedGrid } from "../../components/blocks/faq/faq-numbered-grid";
import { FaqSplitHelp } from "../../components/blocks/faq/faq-split-help";
import { FaqCategorizedSections } from "../../components/blocks/faq/faq-categorized-sections";
import { FaqMutedCards } from "../../components/blocks/faq/faq-muted-cards";
import { FaqBorderedBadge } from "../../components/blocks/faq/faq-bordered-badge";
import { FaqGradientCategories } from "../../components/blocks/faq/faq-gradient-categories";
import { FaqSidebarNavigation } from "../../components/blocks/faq/faq-sidebar-navigation";
import { FaqCardCategories } from "../../components/blocks/faq/faq-card-categories";
import { FaqIconBenefits } from "../../components/blocks/faq/faq-icon-benefits";
import { FaqRoundedCards } from "../../components/blocks/faq/faq-rounded-cards";
import { FaqProfileSidebar } from "../../components/blocks/faq/faq-profile-sidebar";

// Case Studies List components
import { CaseStudiesImageGrid } from "../../components/blocks/case-studies-list/case-studies-image-grid";
import { CaseStudiesTestimonialStats } from "../../components/blocks/case-studies-list/case-studies-testimonial-stats";
import { CaseStudiesFeaturedBorder } from "../../components/blocks/case-studies-list/case-studies-featured-border";
import { CaseStudiesStatsCard } from "../../components/blocks/case-studies-list/case-studies-stats-card";

// Case Study Detail components
import { CaseStudyProseSidebar } from "../../components/blocks/case-study-detail/case-study-prose-sidebar";
import { CaseStudyTocSocialSidebar } from "../../components/blocks/case-study-detail/case-study-toc-social-sidebar";
import { CaseStudyStatsMetrics } from "../../components/blocks/case-study-detail/case-study-stats-metrics";

// Hero components
import { HeroBadgeImageSplit } from "../../components/blocks/hero/hero-badge-image-split";
import { HeroImageLeftContent } from "../../components/blocks/hero/hero-image-left-content";
import { HeroCenteredImageGrid } from "../../components/blocks/hero/hero-centered-image-grid";
import { HeroCenteredScreenshot } from "../../components/blocks/hero/hero-centered-screenshot";
import { HeroPatternBadgeLogos } from "../../components/blocks/hero/hero-pattern-badge-logos";
import { HeroLogoCenteredScreenshot } from "../../components/blocks/hero/hero-logo-centered-screenshot";
import { HeroPatternLogoTechStack } from "../../components/blocks/hero/hero-pattern-logo-tech-stack";
import { HeroAnnouncementBadge } from "../../components/blocks/hero/hero-announcement-badge";
import { HeroTechCarousel } from "../../components/blocks/hero/hero-tech-carousel";
import { HeroSimpleCenteredImage } from "../../components/blocks/hero/hero-simple-centered-image";
import { HeroPlatformFeaturesGrid } from "../../components/blocks/hero/hero-platform-features-grid";
import { HeroSpiralPatternCards } from "../../components/blocks/hero/hero-spiral-pattern-cards";
import { HeroSplitSpiralShapes } from "../../components/blocks/hero/hero-split-spiral-shapes";
import { HeroSplitGeometricShapes } from "../../components/blocks/hero/hero-split-geometric-shapes";
import { HeroCommunitySurveyCta } from "../../components/blocks/hero/hero-community-survey-cta";
import { HeroMarketplaceScatteredImages } from "../../components/blocks/hero/hero-marketplace-scattered-images";
import { HeroBadgeShadowOverlay } from "../../components/blocks/hero/hero-badge-shadow-overlay";
import { HeroVideoBackgroundDark } from "../../components/blocks/hero/hero-video-background-dark";
import { HeroGridPatternEfficiency } from "../../components/blocks/hero/hero-grid-pattern-efficiency";
import { HeroDashedBorderFeatures } from "../../components/blocks/hero/hero-dashed-border-features";
import { HeroDesignCarouselPortfolio } from "../../components/blocks/hero/hero-design-carousel-portfolio";
import { HeroGradientClientFocused } from "../../components/blocks/hero/hero-gradient-client-focused";
import { HeroPremiumSplitAvatars } from "../../components/blocks/hero/hero-premium-split-avatars";
import { HeroUiLibraryShowcase } from "../../components/blocks/hero/hero-ui-library-showcase";
import { HeroFullscreenBackgroundImage } from "../../components/blocks/hero/hero-fullscreen-background-image";
import { HeroFullscreenLogoCta } from "../../components/blocks/hero/hero-fullscreen-logo-cta";
import { HeroGradientAvatarsRating } from "../../components/blocks/hero/hero-gradient-avatars-rating";
import { HeroTaskTimerAnimated } from "../../components/blocks/hero/hero-task-timer-animated";
import { HeroAiPoweredCarousel } from "../../components/blocks/hero/hero-ai-powered-carousel";
import { HeroAdCampaignExpert } from "../../components/blocks/hero/hero-ad-campaign-expert";
import { HeroAdaptableProductGrid } from "../../components/blocks/hero/hero-adaptable-product-grid";
import { HeroPresentationPlatformVideo } from "../../components/blocks/hero/hero-presentation-platform-video";
import { HeroGridPatternSolutions } from "../../components/blocks/hero/hero-grid-pattern-solutions";
import { HeroCrmStreamlined } from "../../components/blocks/hero/hero-crm-streamlined";
import { HeroBillingPlatformLogos } from "../../components/blocks/hero/hero-billing-platform-logos";
import { HeroSoftwareGrowthVideoDialog } from "../../components/blocks/hero/hero-software-growth-video-dialog";
import { HeroConversionVideoPlay } from "../../components/blocks/hero/hero-conversion-video-play";
import { HeroDesignShowcaseLogos } from "../../components/blocks/hero/hero-design-showcase-logos";
import { HeroVideoOverlayStars } from "../../components/blocks/hero/hero-video-overlay-stars";
import { HeroProductivityLauncherVideo } from "../../components/blocks/hero/hero-productivity-launcher-video";
import { HeroHiringAnimatedText } from "../../components/blocks/hero/hero-hiring-animated-text";
import { HeroSplitImageNewsletter } from "../../components/blocks/hero/hero-split-image-newsletter";
import { HeroCenteredGradientCta } from "../../components/blocks/hero/hero-centered-gradient-cta";
import { HeroStatsSocialProof } from "../../components/blocks/hero/hero-stats-social-proof";
import { HeroFeatureCardsGrid } from "../../components/blocks/hero/hero-feature-cards-grid";
import { HeroTestimonialImageGrid } from "../../components/blocks/hero/hero-testimonial-image-grid";
import { HeroDesignSystem3d } from "../../components/blocks/hero/hero-design-system-3d";
import { HeroArchitectureFullscreen } from "../../components/blocks/hero/hero-architecture-fullscreen";
import { HeroInnovationImageGrid } from "../../components/blocks/hero/hero-innovation-image-grid";
import { HeroVideoDialogGradient } from "../../components/blocks/hero/hero-video-dialog-gradient";
import { HeroMinimalCenteredDark } from "../../components/blocks/hero/hero-minimal-centered-dark";
import { HeroProductShowcaseFloating } from "../../components/blocks/hero/hero-product-showcase-floating";
import { HeroSaasDashboardPreview } from "../../components/blocks/hero/hero-saas-dashboard-preview";
import { HeroTherapyTestimonialGrid } from "../../components/blocks/hero/hero-therapy-testimonial-grid";
import { HeroMentalHealthTeam } from "../../components/blocks/hero/hero-mental-health-team";
import { HeroMentorshipVideoSplit } from "../../components/blocks/hero/hero-mentorship-video-split";
import { HeroBusinessOperationsMosaic } from "../../components/blocks/hero/hero-business-operations-mosaic";
import { HeroAgencyAnimatedImages } from "../../components/blocks/hero/hero-agency-animated-images";
import { HeroWelcomeAsymmetricImages } from "../../components/blocks/hero/hero-welcome-asymmetric-images";
import { HeroStartupLaunchCta } from "../../components/blocks/hero/hero-startup-launch-cta";
import { HeroEnterpriseSecurity } from "../../components/blocks/hero/hero-enterprise-security";
import { HeroCreativeStudioStacked } from "../../components/blocks/hero/hero-creative-studio-stacked";
import { HeroDigitalAgencyFullscreen } from "../../components/blocks/hero/hero-digital-agency-fullscreen";
import { HeroCustomerSupportLayered } from "../../components/blocks/hero/hero-customer-support-layered";
import { HeroSharedInboxLayered } from "../../components/blocks/hero/hero-shared-inbox-layered";
import { HeroConversationIntelligence } from "../../components/blocks/hero/hero-conversation-intelligence";
import { HeroBusinessCarouselDots } from "../../components/blocks/hero/hero-business-carousel-dots";
import { HeroDeveloperToolsCode } from "../../components/blocks/hero/hero-developer-tools-code";
import { HeroEcommerceProductShowcase } from "../../components/blocks/hero/hero-ecommerce-product-showcase";
import { HeroMobileAppDownload } from "../../components/blocks/hero/hero-mobile-app-download";
import { HeroPricingComparison } from "../../components/blocks/hero/hero-pricing-comparison";
import { HeroNewsletterMinimal } from "../../components/blocks/hero/hero-newsletter-minimal";
import { HeroComingSoonCountdown } from "../../components/blocks/hero/hero-coming-soon-countdown";
import { HeroEventRegistration } from "../../components/blocks/hero/hero-event-registration";
import { HeroPortfolioCreative } from "../../components/blocks/hero/hero-portfolio-creative";

export interface BlockRegistryEntry<T = any> {
  id: string;
  name: string;
  description: string;
  semanticTags: string[];
  category: BlockCategory;
  component: React.ComponentType<T>;
  props: string;
  exampleUsage: string;
}

export type BlockCategory =
  | "about"
  | "features"
  | "cta"
  | "testimonials"
  | "services"
  | "hero"
  | "footer"
  | "header"
  | "pricing"
  | "team"
  | "stats"
  | "faq"
  | "contact"
  | "gallery"
  | "timeline"
  | "process"
  | "benefits"
  | "comparison"
  | "background-pattern-hero"
    | "blog"
    | "article"
    | "case-studies-list"
    | "case-study-detail";

/**
 * Block Registry - Central registry of all available UI blocks
 */
export const BLOCK_REGISTRY: Record<string, BlockRegistryEntry> = {
  "alternating-blocks": {
    id: "alternating-blocks",
    name: "Alternating Content Blocks",
    description:
      "Display content sections with alternating left/right media placement. Ideal for storytelling, feature showcases, or company history sections.",
    semanticTags: [
      "about",
      "story",
      "history",
      "timeline",
      "features",
      "benefits",
      "alternating",
      "two-column",
      "content-media",
    ],
    category: "about",
    component: AlternatingBlocks,
    props: "AlternatingBlocksProps",
    exampleUsage: `
<AlternatingBlocks
  sections={[
    {
      content: (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              The Origin
            </span>
          </div>
          <h3 className="mb-3 text-2xl font-semibold tracking-tight">
            It started with frustration
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            We spent years watching teams drown in tools that promised to help
            but only added complexity. In 2018, we decided to build something better.
          </p>
        </div>
      ),
      media: <img src="..." alt="..." />,
      mediaLeft: false
    },
    {
      content: <div>...</div>,
      media: <img src="..." alt="..." />,
      mediaLeft: true
    }
  ]}
/>
    `.trim(),
  },
  "about-mission-features": {
    id: "about-mission-features",
    name: "About Mission Features",
    description:
      "A mission-focused about section featuring a hero title, description, main image, mission statement with background image, and a grid of feature cards with icons. Ideal for company about pages that want to highlight their mission and core values.",
    semanticTags: [
      "about",
      "mission",
      "features",
      "values",
      "company",
      "icons",
      "cards",
      "hero",
      "image-grid",
    ],
    category: "about",
    component: AboutMissionFeatures,
    props: "AboutMissionFeaturesProps",
    exampleUsage: `
<AboutMissionFeatures
  title="About Us"
  description="We make it easy to build customer portals and internal tools."
  missionLabel="OUR MISSION"
  missionText="We believe building software should be insanely easy."
  mainImage={{ src: "/images/team.jpg", alt: "Our team" }}
  features={[
    { icon: "lucide/files", title: "Being radically open", description: "..." },
    { icon: "lucide/settings", title: "Optimizing for empowerment", description: "..." }
  ]}
/>
    `.trim(),
  },
  "about-stats-showcase": {
    id: "about-stats-showcase",
    name: "About Stats Showcase",
    description:
      "A comprehensive about section featuring a hero with image grid, statistics display, trusted company logos, and benefit cards with testimonials. Perfect for showcasing company achievements, social proof, and key metrics in a visually engaging layout.",
    semanticTags: [
      "about",
      "stats",
      "statistics",
      "metrics",
      "logos",
      "testimonials",
      "benefits",
      "social-proof",
      "achievements",
    ],
    category: "about",
    component: AboutStatsShowcase,
    props: "AboutStatsShowcaseProps",
    exampleUsage: `
<AboutStatsShowcase
  title="Our Background"
  description="Discover how our solution simplifies complex processes."
  stats={[
    { value: "21M", label: "Global Reach of Users" },
    { value: "12+", label: "Years of Expertise" }
  ]}
  logosTitle="Trusted by leading product teams worldwide."
/>
    `.trim(),
  },
  "about-company-profile": {
    id: "about-company-profile",
    name: "About Company Profile",
    description:
      "A company profile section with main image, breakout card with CTA, secondary image, trusted company logos, and an achievements section with key metrics. Ideal for corporate about pages that need to establish credibility and showcase accomplishments.",
    semanticTags: [
      "about",
      "company",
      "profile",
      "achievements",
      "metrics",
      "logos",
      "corporate",
      "cta",
      "credibility",
    ],
    category: "about",
    component: AboutCompanyProfile,
    props: "AboutCompanyProfileProps",
    exampleUsage: `
<AboutCompanyProfile
  title="About Us"
  description="A passionate team dedicated to creating innovative solutions."
  breakout={{
    title: "Hundreds of blocks at Opensite AI",
    description: "Providing businesses with effective tools.",
    buttonText: "Discover more",
    buttonUrl: "#"
  }}
  achievements={[
    { label: "Companies", value: "300+" },
    { label: "Happy Customers", value: "99%" }
  ]}
/>
    `.trim(),
  },
  "about-vision-gallery": {
    id: "about-vision-gallery",
    name: "About Vision Gallery",
    description:
      "A vision-focused about section with hero title, image gallery grid, two-column vision/creators content, and a team CTA banner. Perfect for companies wanting to share their story, vision, and invite visitors to join their team.",
    semanticTags: [
      "about",
      "vision",
      "gallery",
      "images",
      "story",
      "team",
      "cta",
      "creators",
      "two-column",
    ],
    category: "about",
    component: AboutVisionGallery,
    props: "AboutVisionGalleryProps",
    exampleUsage: `
<AboutVisionGallery
  title="About Us"
  subtitle="Meet our team and discover our values."
  visionTitle="Our Vision"
  visionContent="What if you could create custom software without code?"
  ctaTitle="Part of Our Global Team"
  ctaButtonText="Get to know the team"
/>
    `.trim(),
  },
  "about-developer-story": {
    id: "about-developer-story",
    name: "About Developer Story",
    description:
      "A developer-focused about section with hero title, dual CTAs, logo showcase, statistics bar, and a story section with image. Ideal for developer tools, SaaS platforms, and tech companies targeting technical audiences.",
    semanticTags: [
      "about",
      "developer",
      "story",
      "tech",
      "saas",
      "logos",
      "stats",
      "cta",
      "technical",
    ],
    category: "about",
    component: AboutDeveloperStory,
    props: "AboutDeveloperStoryProps",
    exampleUsage: `
<AboutDeveloperStory
  title="Developer-Focused Solutions for Modern Teams"
  description="We build tools that developers love."
  primaryCta={{ text: "Get Started", url: "#" }}
  stats={[
    { value: "200+", label: "Projects Completed" },
    { value: "50+", label: "Happy Clients" }
  ]}
/>
    `.trim(),
  },
  "about-story-gallery": {
    id: "about-story-gallery",
    name: "About Story Gallery",
    description:
      "A minimal story section with centered title, descriptive content, and a multi-image gallery grid. Perfect for companies wanting to share their journey with visual storytelling in a clean, focused layout.",
    semanticTags: [
      "about",
      "story",
      "gallery",
      "images",
      "minimal",
      "journey",
      "narrative",
      "visual",
    ],
    category: "about",
    component: AboutStoryGallery,
    props: "AboutStoryGalleryProps",
    exampleUsage: `
<AboutStoryGallery
  title="Our Story"
  description="We started with a vision to transform how businesses build software."
  images={[
    { src: "/images/story1.jpg", alt: "Our beginning" },
    { src: "/images/story2.jpg", alt: "Growth phase" }
  ]}
/>
    `.trim(),
  },
  "about-streamline-team": {
    id: "about-streamline-team",
    name: "About Streamline Team",
    description:
      "A streamlined about section with overlapping image layout, feature list with icons, and a team CTA banner. Ideal for showcasing workflow benefits and inviting visitors to join the team in a modern, visually appealing design.",
    semanticTags: [
      "about",
      "streamline",
      "team",
      "features",
      "workflow",
      "icons",
      "cta",
      "modern",
      "overlapping",
    ],
    category: "about",
    component: AboutStreamlineTeam,
    props: "AboutStreamlineTeamProps",
    exampleUsage: `
<AboutStreamlineTeam
  title="Streamline Your Workflow"
  description="Our platform helps teams work smarter, not harder."
  features={[
    { icon: "lucide/zap", title: "Lightning Fast", description: "Build in minutes." },
    { icon: "lucide/shield", title: "Enterprise Security", description: "Bank-grade security." }
  ]}
  teamCta={{ text: "Join Our Team", url: "#" }}
/>
    `.trim(),
  },
  "about-developer-profile": {
    id: "about-developer-profile",
    name: "About Developer Profile",
    description:
      "A developer portfolio-style profile section with avatar, name, role, social links, bio, skills tags, and contact CTA. Perfect for personal portfolios, team member spotlights, or founder profiles on company about pages.",
    semanticTags: [
      "about",
      "developer",
      "profile",
      "portfolio",
      "skills",
      "social",
      "bio",
      "personal",
      "founder",
    ],
    category: "about",
    component: AboutDeveloperProfile,
    props: "AboutDeveloperProfileProps",
    exampleUsage: `
<AboutDeveloperProfile
  name="Alex Johnson"
  role="Full-Stack Developer"
  bio="I'm a passionate developer with 8+ years of experience."
  skills={["React", "TypeScript", "Node.js", "Python"]}
  socialLinks={[
    { icon: "lucide/github", url: "#", label: "GitHub" }
  ]}
/>
    `.trim(),
  },
  "about-startup-team": {
    id: "about-startup-team",
    name: "About Startup Team",
    description:
      "A SaaS startup-style about section with sticky sidebar navigation, main content area, and a team member grid with avatars and social links. Ideal for startup about pages that need organized navigation and team introductions.",
    semanticTags: [
      "about",
      "startup",
      "team",
      "sidebar",
      "navigation",
      "saas",
      "members",
      "avatars",
      "social",
    ],
    category: "about",
    component: AboutStartupTeam,
    props: "AboutStartupTeamProps",
    exampleUsage: `
<AboutStartupTeam
  title="Building the Future of Software Development"
  description="We're a team of passionate builders."
  sidebarLinks={[
    { label: "About Us", href: "#about", isActive: true },
    { label: "Our Team", href: "#team" }
  ]}
  teamMembers={[
    { name: "Sarah Chen", role: "CEO & Co-Founder" }
  ]}
/>
    `.trim(),
  },
  "about-minimal-story": {
    id: "about-minimal-story",
    name: "About Minimal Story",
    description:
      "A minimal, author-focused story section with avatar, author info, title, narrative content, and optional featured image. Perfect for founder stories, company origin narratives, or personal brand about pages.",
    semanticTags: [
      "about",
      "minimal",
      "story",
      "author",
      "founder",
      "narrative",
      "personal",
      "origin",
    ],
    category: "about",
    component: AboutMinimalStory,
    props: "AboutMinimalStoryProps",
    exampleUsage: `
<AboutMinimalStory
  title="Our Story"
  content="Every great company starts with a simple idea."
  author={{
    name: "Jordan Mitchell",
    role: "Founder & CEO"
  }}
/>
    `.trim(),
  },
  "about-story-hero": {
    id: "about-story-hero",
    name: "About Story Hero",
    description:
      "A story section with hero image, subtitle, title, narrative content, and team info card. Ideal for company story pages that want to combine visual impact with detailed narrative and team highlights.",
    semanticTags: [
      "about",
      "story",
      "hero",
      "image",
      "narrative",
      "team",
      "visual",
      "impact",
    ],
    category: "about",
    component: AboutStoryHero,
    props: "AboutStoryHeroProps",
    exampleUsage: `
<AboutStoryHero
  title="Our Story"
  subtitle="Building the future, one line of code at a time"
  content="We started with a bold idea..."
  teamInfo={{
    title: "50+ Team Members",
    description: "Working across 12 countries"
  }}
/>
    `.trim(),
  },
  "about-stats-sidebar": {
    id: "about-stats-sidebar",
    name: "About Stats Sidebar",
    description:
      "A stats-focused about section with sticky sidebar title/description, stats grid with icons, and feature list. Perfect for showcasing company metrics and key differentiators in a scannable, organized layout.",
    semanticTags: [
      "about",
      "stats",
      "sidebar",
      "metrics",
      "features",
      "icons",
      "sticky",
      "organized",
    ],
    category: "about",
    component: AboutStatsSidebar,
    props: "AboutStatsSidebarProps",
    exampleUsage: `
<AboutStatsSidebar
  title="Why Choose Us"
  description="We've built a platform that scales with your needs."
  stats={[
    { icon: "lucide/users", value: "10M+", label: "Active Users" },
    { icon: "lucide/globe", value: "150+", label: "Countries" }
  ]}
/>
    `.trim(),
  },
  "about-interactive-tabs": {
    id: "about-interactive-tabs",
    name: "About Interactive Tabs",
    description:
      "An interactive about section with tabbed navigation, dynamic content switching, and optional images per tab. Ideal for showcasing multiple aspects of a company (work, process, values) in an engaging, space-efficient format.",
    semanticTags: [
      "about",
      "interactive",
      "tabs",
      "navigation",
      "dynamic",
      "work",
      "process",
      "values",
    ],
    category: "about",
    component: AboutInteractiveTabs,
    props: "AboutInteractiveTabsProps",
    exampleUsage: `
<AboutInteractiveTabs
  title="Discover Our Story"
  subtitle="Learn more about who we are"
  tabs={[
    {
      id: "work",
      label: "Our Work",
      content: {
        title: "Crafting Digital Experiences",
        description: "We create beautiful, functional products."
      }
    }
  ]}
/>
    `.trim(),
  },
  "about-mission-dual-image": {
    id: "about-mission-dual-image",
    name: "About Mission Dual Image",
    description:
      "A mission/vision section with dual content blocks, CTA button, and a two-column image layout with offset positioning. Perfect for companies wanting to clearly communicate their mission and vision with strong visual support.",
    semanticTags: [
      "about",
      "mission",
      "vision",
      "dual-image",
      "cta",
      "offset",
      "two-column",
      "visual",
    ],
    category: "about",
    component: AboutMissionDualImage,
    props: "AboutMissionDualImageProps",
    exampleUsage: `
<AboutMissionDualImage
  missionTitle="Our Mission"
  missionContent="To democratize software development."
  visionTitle="Our Vision"
  visionContent="A world where every idea can become reality."
  cta={{ text: "Join Our Journey", url: "#" }}
/>
    `.trim(),
  },
  "media-hover-ctas": {
    id: "media-hover-ctas",
    name: "Media Hover CTAs",
    description:
      "Display CTA cards that reveal background imagery or color on hover. Ideal for mission/vision tiles, service highlights, or campaign prompts.",
    semanticTags: [
      "cta",
      "call-to-action",
      "hover",
      "media",
      "cards",
      "grid",
      "image-hover",
      "tiles",
      "mission",
      "vision",
    ],
    category: "cta",
    component: MediaHoverCtas,
    props: "MediaHoverCtasProps",
    exampleUsage: `
<MediaHoverCtas
  items={[
    {
      content: (
        <div className="flex max-w-sm flex-col gap-4">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            Our Mission
          </span>
          <p className="text-muted-foreground">
            Deliver remarkable experiences with thoughtful design.
          </p>
        </div>
      ),
      onHoverImgSrc: "/images/mission.jpg",
      altText: "Our Mission"
    },
    {
      content: (
        <div className="flex max-w-sm flex-col gap-4">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            Our Vision
          </span>
          <p className="text-muted-foreground">
            Build the future of adaptive customer experiences.
          </p>
        </div>
      ),
      initialBackgroundColor: "var(--brand-100)",
      onHoverBackgroundColor: "var(--brand-900)"
    }
  ]}
/>
    `.trim(),
  },
  "feature-showcase": {
    id: "feature-showcase",
    name: "Feature Showcase Carousel",
    description:
      "Display feature content with media in an interactive carousel format. Each slide shows feature content alongside images or videos with smooth navigation. Features mobile height equalization for consistent appearance.",
    semanticTags: [
      "features",
      "carousel",
      "showcase",
      "slider",
      "highlights",
      "product-features",
      "capabilities",
      "interactive",
      "media-gallery",
    ],
    category: "features",
    component: FeatureShowcase,
    props: "FeatureShowcaseProps",
    exampleUsage: `
<FeatureShowcase
  items={[
    {
      content: (
        <div>
          <span className="text-sm font-medium text-primary mb-2 block">
            DESIGNED TO HELP YOU GROW
          </span>
          <h3 className="mb-4 text-3xl font-bold tracking-tight">
            Powerful Analytics
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Track every metric that matters with real-time dashboards
            and comprehensive reporting tools.
          </p>
        </div>
      ),
      mediaComponent: <img src="..." alt="Analytics Dashboard" className="rounded-lg" />
    },
    {
      content: (
        <div>
          <span className="text-sm font-medium text-primary mb-2 block">
            SEAMLESS INTEGRATION
          </span>
          <h3 className="mb-4 text-3xl font-bold tracking-tight">
            Connect Anywhere
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Integrate with your favorite tools and platforms in seconds.
          </p>
        </div>
      ),
      mediaComponent: <img src="..." alt="Integrations" className="rounded-lg" />
    }
  ]}
/>
    `.trim(),
  },
  "team-media-showcase": {
    id: "team-media-showcase",
    name: "Team Media Showcase",
    description:
      "Display team members in a responsive grid with full-bleed background images and hover effects. Each card shows the member's name and role with an optional action element that appears on hover. Ideal for team pages, about sections, or leadership showcases.",
    semanticTags: [
      "team",
      "members",
      "staff",
      "people",
      "leadership",
      "about",
      "grid",
      "cards",
      "hover",
      "image-background",
      "profiles",
    ],
    category: "team",
    component: TeamMediaShowcase,
    props: "TeamMediaShowcaseProps",
    exampleUsage: `
<TeamMediaShowcase
  listEyebrow="Our Team"
  background="white"
  verticalMargin="lg"
  items={[
    {
      imageSrc: "/team/john-doe.jpg",
      name: "John Doe",
      role: "CEO & Founder",
      action: (
        <Button variant="outline" className="text-white border-white">
          View Profile
        </Button>
      )
    },
    {
      imageSrc: "/team/jane-smith.jpg",
      name: "Jane Smith",
      role: "CTO"
    },
    {
      imageSrc: "/team/bob-wilson.jpg",
      name: "Bob Wilson",
      role: "Head of Design"
    }
  ]}
/>
    `.trim(),
  },
  // Footer blocks
  "footer-links-grid": {
    id: "footer-links-grid",
    name: "Footer Links Grid",
    description:
      "A multi-column footer with logo, navigation links, and legal information. Features a responsive grid layout with customizable navigation sections, company branding, and bottom legal links. Ideal for corporate websites, SaaS products, and marketing sites that need organized footer navigation.",
    semanticTags: [
      "footer",
      "navigation",
      "links",
      "multi-column",
      "grid",
      "corporate",
      "legal",
      "sitemap",
      "branding",
    ],
    category: "footer",
    component: FooterLinksGrid,
    props: "FooterLinksGridProps",
    exampleUsage: `
<FooterLinksGrid
  logo={{
    src: "https://example.com/logo.png",
    alt: "Company Logo",
    title: "Company Name",
    url: "/"
  }}
  tagline="Components made easy."
  menuItems={[
    {
      title: "Product",
      links: [
        { text: "Overview", url: "#" },
        { text: "Pricing", url: "#" }
      ]
    }
  ]}
/>
    `.trim(),
  },
  "footer-social-newsletter": {
    id: "footer-social-newsletter",
    name: "Footer Social Newsletter",
    description:
      "A footer with social icons, navigation links, and newsletter signup. Features prominent social media icons in circular buttons, multi-column navigation, and an email newsletter subscription form. Ideal for community-focused products, SaaS platforms, and businesses that prioritize social engagement and email marketing.",
    semanticTags: [
      "footer",
      "social",
      "newsletter",
      "subscription",
      "email",
      "community",
      "icons",
      "navigation",
    ],
    category: "footer",
    component: FooterSocialNewsletter,
    props: "FooterSocialNewsletterProps",
    exampleUsage: `
<FooterSocialNewsletter
  socialLinks={[
    { icon: "simple-icons/discord", href: "#", label: "Discord" },
    { icon: "simple-icons/x", href: "#", label: "X (Twitter)" }
  ]}
  newsletterLabel="Subscribe to our newsletter"
/>
    `.trim(),
  },
  "footer-social-apps": {
    id: "footer-social-apps",
    name: "Footer Social Apps",
    description:
      "A footer with social icons, navigation links, and mobile app download links. Features prominent social media icons and mobile app store links in circular buttons, along with multi-column navigation. Ideal for products with mobile apps, community-focused platforms, and businesses that want to highlight their cross-platform presence.",
    semanticTags: [
      "footer",
      "social",
      "mobile",
      "apps",
      "download",
      "android",
      "ios",
      "app-store",
      "navigation",
    ],
    category: "footer",
    component: FooterSocialApps,
    props: "FooterSocialAppsProps",
    exampleUsage: `
<FooterSocialApps
  socialLinks={[
    { icon: "simple-icons/discord", href: "#", label: "Discord" }
  ]}
  appLinks={[
    { icon: "mdi/android", href: "#", label: "Android" },
    { icon: "mdi/apple", href: "#", label: "iOS" }
  ]}
/>
    `.trim(),
  },
  "footer-simple-centered": {
    id: "footer-simple-centered",
    name: "Footer Simple Centered",
    description:
      "A clean, minimal footer with logo, sitemap, and legal links. Features a simple two-column sitemap layout with company branding and bottom legal links. Ideal for corporate websites, landing pages, and products that prefer a clean, uncluttered footer design without social media or newsletter elements.",
    semanticTags: [
      "footer",
      "minimal",
      "simple",
      "clean",
      "sitemap",
      "corporate",
      "legal",
      "centered",
    ],
    category: "footer",
    component: FooterSimpleCentered,
    props: "FooterSimpleCenteredProps",
    exampleUsage: `
<FooterSimpleCentered
  tagline="Components made easy."
  sitemap={[
    {
      title: "Company",
      links: [
        { title: "About Us", href: "#" },
        { title: "Careers", href: "#" }
      ]
    }
  ]}
/>
    `.trim(),
  },
  "footer-brand-description": {
    id: "footer-brand-description",
    name: "Footer Brand Description",
    description:
      "A footer with logo, description, social icons, and navigation. Features a prominent brand section with logo, description, and social links on the left, with multi-column navigation on the right. Ideal for brand-focused websites, startups, and businesses that want to emphasize their identity and social presence in the footer.",
    semanticTags: [
      "footer",
      "brand",
      "description",
      "social",
      "identity",
      "startup",
      "navigation",
      "about",
    ],
    category: "footer",
    component: FooterBrandDescription,
    props: "FooterBrandDescriptionProps",
    exampleUsage: `
<FooterBrandDescription
  description="A collection of components for your startup business or side project."
  socialLinks={[
    { icon: "simple-icons/instagram", href: "#", label: "Instagram" }
  ]}
/>
    `.trim(),
  },
  "footer-newsletter-grid": {
    id: "footer-newsletter-grid",
    name: "Footer Newsletter Grid",
    description:
      "A comprehensive footer with logo, social icons, navigation, and newsletter. Features a full-width grid layout with brand section (logo, description, social icons), multi-column navigation, and a prominent newsletter signup form. Ideal for content-heavy websites, SaaS products, and businesses that prioritize email marketing and social engagement.",
    semanticTags: [
      "footer",
      "newsletter",
      "grid",
      "social",
      "comprehensive",
      "email",
      "marketing",
      "subscription",
    ],
    category: "footer",
    component: FooterNewsletterGrid,
    props: "FooterNewsletterGridProps",
    exampleUsage: `
<FooterNewsletterGrid
  description="A collection of 100+ responsive HTML templates."
  newsletterTitle="Newsletter"
  newsletterPlaceholder="Email"
/>
    `.trim(),
  },
  "footer-cta-banner": {
    id: "footer-cta-banner",
    name: "Footer CTA Banner",
    description:
      "A dark-themed footer with prominent CTA banner, navigation, and newsletter. Features a full-width call-to-action banner at the top with heading, description, and button, followed by multi-column navigation, newsletter signup, and social links. Ideal for SaaS products, marketing sites, and businesses that want to drive conversions directly from the footer.",
    semanticTags: [
      "footer",
      "cta",
      "banner",
      "dark",
      "conversion",
      "marketing",
      "newsletter",
      "call-to-action",
    ],
    category: "footer",
    component: FooterCtaBanner,
    props: "FooterCtaBannerProps",
    exampleUsage: `
<FooterCtaBanner
  ctaHeading="Ready to get started?"
  ctaDescription="Join thousands of satisfied customers."
  ctaButtonText="Get Started"
/>
    `.trim(),
  },
  "footer-contact-card": {
    id: "footer-contact-card",
    name: "Footer Contact Card",
    description:
      "A footer with large heading, contact information, and social links. Features a prominent heading, contact details (email, phone, address), social media icons, and horizontal navigation. Ideal for service businesses, agencies, and professional websites that want to emphasize contact information and make it easy for visitors to get in touch.",
    semanticTags: [
      "footer",
      "contact",
      "card",
      "email",
      "phone",
      "address",
      "social",
      "professional",
      "agency",
    ],
    category: "footer",
    component: FooterContactCard,
    props: "FooterContactCardProps",
    exampleUsage: `
<FooterContactCard
  heading="Let's work together"
  email="hello@example.com"
  phone="+1 (555) 123-4567"
  address="123 Main Street, San Francisco, CA"
/>
    `.trim(),
  },
  "footer-background-card": {
    id: "footer-background-card",
    name: "Footer Background Card",
    description:
      "A footer with background image and floating contact card. Features a full-width background image with a floating card containing profile image, personal message, CTA button, navigation links, and contact information. Ideal for creative professionals, agencies, portfolios, and businesses that want a visually striking footer with a personal touch.",
    semanticTags: [
      "footer",
      "background",
      "image",
      "card",
      "creative",
      "portfolio",
      "agency",
      "personal",
      "visual",
    ],
    category: "footer",
    component: FooterBackgroundCard,
    props: "FooterBackgroundCardProps",
    exampleUsage: `
<FooterBackgroundCard
  backgroundImage="https://example.com/bg.jpg"
  profileImage="https://example.com/profile.jpg"
  tagline="Let's Connect"
  personalMessage="I'm passionate about creating beautiful components."
  ctaText="Schedule a call"
/>
    `.trim(),
  },
  "footer-animated-social": {
    id: "footer-animated-social",
    name: "Footer Animated Social",
    description:
      "An animated footer with Framer Motion effects and social links. Features smooth entrance animations, a prominent heading with CTA button, animated social links with hover effects, and a clean separator. Ideal for modern websites, portfolios, and creative projects that want to add visual polish and interactivity to their footer.",
    semanticTags: [
      "footer",
      "animated",
      "motion",
      "social",
      "modern",
      "interactive",
      "creative",
      "portfolio",
    ],
    category: "footer",
    component: FooterAnimatedSocial,
    props: "FooterAnimatedSocialProps",
    exampleUsage: `
<FooterAnimatedSocial
  heading="Connect with Me"
  description="No commitments. Just a quick chat to see if we click."
  ctaText="Get in Touch"
  socialLinks={[
    { name: "Instagram", href: "#" },
    { name: "X (Twitter)", href: "#" }
  ]}
/>
    `.trim(),
  },
  "footer-newsletter-minimal": {
    id: "footer-newsletter-minimal",
    name: "Footer Newsletter Minimal",
    description:
      "A dark-themed minimal footer with newsletter and animated logo. Features a clean layout with main heading, support email, navigation columns, newsletter signup form, and a large animated brand logo. Ideal for modern SaaS products, creative agencies, and businesses that want a sophisticated, dark-themed footer with strong visual branding.",
    semanticTags: [
      "footer",
      "newsletter",
      "minimal",
      "dark",
      "animated",
      "logo",
      "saas",
      "sophisticated",
    ],
    category: "footer",
    component: FooterNewsletterMinimal,
    props: "FooterNewsletterMinimalProps",
    exampleUsage: `
<FooterNewsletterMinimal
  heading="Unlock 800+ blocks now"
  supportEmail="hi@example.com"
  newsletterLabel="Sign up for newsletter :"
/>
    `.trim(),
  },
  "footer-cta-social": {
    id: "footer-cta-social",
    name: "Footer CTA Social",
    description:
      "A centered CTA footer with decorative lines and social icons. Features a centered layout with decorative gradient lines, pre-heading text, large heading, description, prominent CTA button, social media icons, and contact email. Ideal for landing pages, marketing sites, and businesses that want a conversion-focused footer with strong visual appeal.",
    semanticTags: [
      "footer",
      "cta",
      "social",
      "centered",
      "conversion",
      "landing",
      "marketing",
      "decorative",
    ],
    category: "footer",
    component: FooterCtaSocial,
    props: "FooterCtaSocialProps",
    exampleUsage: `
<FooterCtaSocial
  preHeading="Let's connect"
  heading="You want to scale faster? Try Opensite today."
  description="Join thousands of companies already using our platform."
  buttonText="Get Started Now"
/>
    `.trim(),
  },
  "footer-nav-social": {
    id: "footer-nav-social",
    name: "Footer Nav Social",
    description:
      "A comprehensive footer with logo, navigation, newsletter, and social links. Features a logo with navigation sections, a newsletter signup form with heading and description, social media icons, and legal links. Ideal for SaaS products, corporate websites, and businesses that want a complete footer with all essential elements organized in a clean, professional layout.",
    semanticTags: [
      "footer",
      "navigation",
      "social",
      "newsletter",
      "comprehensive",
      "professional",
      "corporate",
      "complete",
    ],
    category: "footer",
    component: FooterNavSocial,
    props: "FooterNavSocialProps",
    exampleUsage: `
<FooterNavSocial
  newsletterHeading="Stay Updated"
  newsletterDescription="Subscribe to our newsletter for the latest updates."
  socialLinks={[
    { icon: "simple-icons/instagram", href: "#", label: "Instagram" }
  ]}
/>
    `.trim(),
  },
  // Gallery blocks
  "expandable-case-study-cards": {
    id: "expandable-case-study-cards",
    name: "Expandable Case Study Cards",
    description:
      "A gallery of expandable case study cards with hover effects. Each card expands on hover to reveal additional details including title, description, and badge. Features smooth width transitions and gradient overlays. Ideal for portfolios, case studies, project showcases, and work samples where you want to highlight multiple items with progressive disclosure.",
    semanticTags: [
      "gallery",
      "case-study",
      "portfolio",
      "expandable",
      "hover",
      "cards",
      "projects",
      "work",
      "showcase",
    ],
    category: "gallery",
    component: ExpandableCaseStudyCards,
    props: "ExpandableCaseStudyCardsProps",
    exampleUsage: `
<ExpandableCaseStudyCards
  items={[
    {
      id: "1",
      title: "Brand Redesign",
      description: "Complete visual identity overhaul",
      image: "/images/project1.jpg",
      badge: "Branding"
    },
    {
      id: "2",
      title: "E-commerce Platform",
      description: "Full-stack development",
      image: "/images/project2.jpg",
      badge: "Development"
    }
  ]}
/>
    `.trim(),
  },
  "carousel-badge-cards": {
    id: "carousel-badge-cards",
    name: "Carousel Badge Cards",
    description:
      "A carousel gallery with badge labels and descriptions on each card. Features navigation buttons, smooth transitions, and cards with category badges. Ideal for product showcases, feature highlights, blog posts, or any content that benefits from categorization and horizontal browsing.",
    semanticTags: [
      "gallery",
      "carousel",
      "badges",
      "cards",
      "navigation",
      "products",
      "features",
      "categories",
    ],
    category: "gallery",
    component: CarouselBadgeCards,
    props: "CarouselBadgeCardsProps",
    exampleUsage: `
<CarouselBadgeCards
  heading="Featured Products"
  description="Explore our latest offerings"
  items={[
    {
      id: "1",
      title: "Product Name",
      description: "Product description here",
      image: "/images/product1.jpg",
      badge: "New"
    }
  ]}
/>
    `.trim(),
  },
  "carousel-gradient-overlay": {
    id: "carousel-gradient-overlay",
    name: "Carousel Gradient Overlay",
    description:
      "A carousel with gradient overlay cards and dot indicators. Features smooth transitions, gradient text overlays on images, and progress dot navigation. Ideal for hero sections, featured content, image galleries, or any visual content that needs elegant text overlays.",
    semanticTags: [
      "gallery",
      "carousel",
      "gradient",
      "overlay",
      "dots",
      "hero",
      "featured",
      "images",
    ],
    category: "gallery",
    component: CarouselGradientOverlay,
    props: "CarouselGradientOverlayProps",
    exampleUsage: `
<CarouselGradientOverlay
  heading="Our Work"
  items={[
    {
      id: "1",
      title: "Project Title",
      description: "Brief description",
      image: "/images/work1.jpg"
    }
  ]}
/>
    `.trim(),
  },
  "carousel-demo-link": {
    id: "carousel-demo-link",
    name: "Carousel Demo Link",
    description:
      "A carousel with a prominent demo link in the header section. Features navigation buttons, external demo link, and cards with images and descriptions. Ideal for product demos, feature showcases, or any content where you want to drive users to a live demo or external resource.",
    semanticTags: [
      "gallery",
      "carousel",
      "demo",
      "link",
      "cta",
      "products",
      "features",
      "external",
    ],
    category: "gallery",
    component: CarouselDemoLink,
    props: "CarouselDemoLinkProps",
    exampleUsage: `
<CarouselDemoLink
  heading="Product Features"
  description="See what we can do"
  demoLink={{ text: "View Demo", href: "/demo" }}
  items={[
    {
      id: "1",
      title: "Feature Name",
      description: "Feature description",
      image: "/images/feature1.jpg"
    }
  ]}
/>
    `.trim(),
  },
  "auto-scroll-carousel": {
    id: "auto-scroll-carousel",
    name: "Auto Scroll Carousel",
    description:
      "A continuously auto-scrolling carousel with staggered image layout. Features automatic scrolling using embla-carousel-auto-scroll, alternating vertical offsets for visual interest, and smooth infinite loop. Ideal for client logos, partner showcases, image galleries, or any content that benefits from passive browsing.",
    semanticTags: [
      "gallery",
      "carousel",
      "auto-scroll",
      "infinite",
      "logos",
      "partners",
      "clients",
      "staggered",
    ],
    category: "gallery",
    component: AutoScrollCarousel,
    props: "AutoScrollCarouselProps",
    exampleUsage: `
<AutoScrollCarousel
  images={[
    { src: "/images/logo1.png", alt: "Client 1" },
    { src: "/images/logo2.png", alt: "Client 2" },
    { src: "/images/logo3.png", alt: "Client 3" }
  ]}
/>
    `.trim(),
  },
  "carousel-sidebar-resources": {
    id: "carousel-sidebar-resources",
    name: "Carousel Sidebar Resources",
    description:
      "A carousel with a sidebar resource list in a three-column layout. Features categorized resource links alongside image carousel. Ideal for documentation, resource libraries, learning platforms, or any content that combines visual browsing with organized link navigation.",
    semanticTags: [
      "gallery",
      "carousel",
      "sidebar",
      "resources",
      "links",
      "documentation",
      "learning",
      "three-column",
    ],
    category: "gallery",
    component: CarouselSidebarResources,
    props: "CarouselSidebarResourcesProps",
    exampleUsage: `
<CarouselSidebarResources
  heading="Resources"
  resources={[
    { title: "Getting Started", href: "/docs/start", icon: "lucide/book-open" },
    { title: "API Reference", href: "/docs/api", icon: "lucide/code" }
  ]}
  images={[
    { src: "/images/doc1.jpg", alt: "Documentation" }
  ]}
/>
    `.trim(),
  },
  "carousel-icon-tabs": {
    id: "carousel-icon-tabs",
    name: "Carousel Icon Tabs",
    description:
      "A carousel with icon-based tab navigation and animated indicator. Features icon tabs that sync with carousel slides, animated underline indicator, and slide counter. Ideal for feature showcases, product tours, or any content that benefits from categorized visual navigation.",
    semanticTags: [
      "gallery",
      "carousel",
      "tabs",
      "icons",
      "navigation",
      "features",
      "animated",
      "indicator",
    ],
    category: "gallery",
    component: CarouselIconTabs,
    props: "CarouselIconTabsProps",
    exampleUsage: `
<CarouselIconTabs
  items={[
    {
      id: "1",
      title: "Dashboard",
      icon: "lucide/layout-dashboard",
      image: "/images/dashboard.jpg"
    },
    {
      id: "2",
      title: "Analytics",
      icon: "lucide/bar-chart",
      image: "/images/analytics.jpg"
    }
  ]}
/>
    `.trim(),
  },
  "testimonial-carousel-cards": {
    id: "testimonial-carousel-cards",
    name: "Testimonial Carousel Cards",
    description:
      "A testimonial carousel with image and quote panels in a two-panel layout. Features customer photos alongside their testimonials, progress bar indicator, and navigation buttons. Ideal for customer testimonials, reviews, success stories, or any social proof content.",
    semanticTags: [
      "gallery",
      "carousel",
      "testimonials",
      "quotes",
      "reviews",
      "social-proof",
      "customers",
      "two-panel",
    ],
    category: "gallery",
    component: TestimonialCarouselCards,
    props: "TestimonialCarouselCardsProps",
    exampleUsage: `
<TestimonialCarouselCards
  items={[
    {
      id: "1",
      quote: "This product changed our workflow completely.",
      author: "Jane Doe",
      role: "CEO at Company",
      image: "/images/testimonial1.jpg"
    }
  ]}
/>
    `.trim(),
  },
  "carousel-icon-sidebar": {
    id: "carousel-icon-sidebar",
    name: "Carousel Icon Sidebar",
    description:
      "A carousel with a dynamic icon sidebar panel in a two-column layout. Features a muted sidebar showing active slide details with icon, title, and description. Ideal for feature tours, product showcases, or any content that benefits from contextual sidebar information.",
    semanticTags: [
      "gallery",
      "carousel",
      "sidebar",
      "icons",
      "two-column",
      "features",
      "contextual",
      "details",
    ],
    category: "gallery",
    component: CarouselIconSidebar,
    props: "CarouselIconSidebarProps",
    exampleUsage: `
<CarouselIconSidebar
  items={[
    {
      id: "1",
      title: "Feature One",
      description: "Description of feature one",
      icon: "lucide/zap",
      image: "/images/feature1.jpg"
    }
  ]}
/>
    `.trim(),
  },
  "carousel-gradient-text": {
    id: "carousel-gradient-text",
    name: "Carousel Gradient Text",
    description:
      "A carousel with gradient overlay text and expanding pill indicators. Features a two-column layout with animated pill indicators that expand on active state. Ideal for portfolio showcases, project galleries, or any visual content with elegant text overlays.",
    semanticTags: [
      "gallery",
      "carousel",
      "gradient",
      "text",
      "pills",
      "indicators",
      "portfolio",
      "animated",
    ],
    category: "gallery",
    component: CarouselGradientText,
    props: "CarouselGradientTextProps",
    exampleUsage: `
<CarouselGradientText
  items={[
    {
      id: "1",
      title: "Project Name",
      subtitle: "Category",
      image: "/images/project1.jpg"
    }
  ]}
/>
    `.trim(),
  },
  "service-hover-carousel": {
    id: "service-hover-carousel",
    name: "Service Hover Carousel",
    description:
      "A carousel of service cards with hover image swap effect. Features portrait cards with primary/secondary image swap on hover, badges, and call-to-action buttons. Ideal for service showcases, team members, product cards, or any content that benefits from reveal-on-hover interactions.",
    semanticTags: [
      "gallery",
      "carousel",
      "services",
      "hover",
      "image-swap",
      "cards",
      "portrait",
      "interactive",
    ],
    category: "gallery",
    component: ServiceHoverCarousel,
    props: "ServiceHoverCarouselProps",
    exampleUsage: `
<ServiceHoverCarousel
  heading="Our Services"
  items={[
    {
      id: "1",
      title: "Web Development",
      description: "Custom web solutions",
      primaryImage: "/images/service1.jpg",
      secondaryImage: "/images/service1-hover.jpg",
      badge: "Popular"
    }
  ]}
/>
    `.trim(),
  },
  "carousel-tabs-content": {
    id: "carousel-tabs-content",
    name: "Carousel Tabs Content",
    description:
      "A carousel with animated tab navigation synced to slides. Features a tab bar with animated underline indicator that follows the active slide. Ideal for categorized content, product features, or any content that benefits from tab-based navigation with visual previews.",
    semanticTags: [
      "gallery",
      "carousel",
      "tabs",
      "animated",
      "underline",
      "categories",
      "navigation",
      "synced",
    ],
    category: "gallery",
    component: CarouselTabsContent,
    props: "CarouselTabsContentProps",
    exampleUsage: `
<CarouselTabsContent
  items={[
    {
      id: "1",
      title: "Overview",
      content: "Overview content here",
      image: "/images/overview.jpg"
    },
    {
      id: "2",
      title: "Features",
      content: "Features content here",
      image: "/images/features.jpg"
    }
  ]}
/>
    `.trim(),
  },
  "carousel-scale-focus": {
    id: "carousel-scale-focus",
    name: "Carousel Scale Focus",
    description:
      "A carousel with scale and opacity focus effect on the active slide. Features active slide at full scale/opacity with adjacent slides scaled down and faded. Ideal for hero carousels, featured content, image galleries, or any content where you want to emphasize the current item.",
    semanticTags: [
      "gallery",
      "carousel",
      "scale",
      "focus",
      "opacity",
      "hero",
      "featured",
      "emphasis",
    ],
    category: "gallery",
    component: CarouselScaleFocus,
    props: "CarouselScaleFocusProps",
    exampleUsage: `
<CarouselScaleFocus
  images={[
    { src: "/images/hero1.jpg", alt: "Hero 1" },
    { src: "/images/hero2.jpg", alt: "Hero 2" },
    { src: "/images/hero3.jpg", alt: "Hero 3" }
  ]}
/>
    `.trim(),
  },
  "masonry-motion-grid": {
    id: "masonry-motion-grid",
    name: "Masonry Motion Grid",
    description:
      "An animated masonry grid layout with Framer Motion animations. Features a 4-column grid with staggered heights and alternating animation directions on scroll. Ideal for image galleries, portfolios, photo collections, or any visual content that benefits from dynamic, Pinterest-style layouts.",
    semanticTags: [
      "gallery",
      "masonry",
      "grid",
      "animated",
      "motion",
      "pinterest",
      "photos",
      "portfolio",
    ],
    category: "gallery",
    component: MasonryMotionGrid,
    props: "MasonryMotionGridProps",
    exampleUsage: `
<MasonryMotionGrid
  images={[
    { src: "/images/photo1.jpg", alt: "Photo 1" },
    { src: "/images/photo2.jpg", alt: "Photo 2" },
    { src: "/images/photo3.jpg", alt: "Photo 3" }
  ]}
/>
    `.trim(),
  },
  "blur-vignette-grid": {
    id: "blur-vignette-grid",
    name: "Blur Vignette Grid",
    description:
      "A grid gallery with animated blur vignette effect on hover. Features a 5-column grid with varying column spans and CSS blur mask effect that reveals on interaction. Ideal for artistic galleries, photography portfolios, or any visual content that benefits from dramatic hover effects.",
    semanticTags: [
      "gallery",
      "grid",
      "blur",
      "vignette",
      "hover",
      "artistic",
      "photography",
      "dramatic",
    ],
    category: "gallery",
    component: BlurVignetteGrid,
    props: "BlurVignetteGridProps",
    exampleUsage: `
<BlurVignetteGrid
  images={[
    { src: "/images/art1.jpg", alt: "Artwork 1", colSpan: 2 },
    { src: "/images/art2.jpg", alt: "Artwork 2", colSpan: 1 }
  ]}
/>
    `.trim(),
  },
  "interior-carousel": {
    id: "interior-carousel",
    name: "Interior Carousel",
    description:
      "A looping two-up carousel layout with semi-transparent navigation overlays. Features portrait images displayed two at a time with elegant navigation controls. Ideal for interior design galleries, real estate showcases, product photography, or any content that benefits from side-by-side image comparison.",
    semanticTags: [
      "gallery",
      "carousel",
      "interior",
      "two-up",
      "portrait",
      "real-estate",
      "design",
      "comparison",
    ],
    category: "gallery",
    component: InteriorCarousel,
    props: "InteriorCarouselProps",
    exampleUsage: `
<InteriorCarousel
  images={[
    { src: "/images/interior1.jpg", alt: "Living Room" },
    { src: "/images/interior2.jpg", alt: "Kitchen" },
    { src: "/images/interior3.jpg", alt: "Bedroom" }
  ]}
/>
    `.trim(),
  },
  "radial-gradient-top": {
    id: "radial-gradient-top",
    name: "Radial Gradient Top",
    description:
      "A hero section with a radial gradient background emanating from the top center. Creates a dramatic primary-colored glow effect that fades into the background. Ideal for landing pages and hero sections that need visual depth and focus.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "gradient",
      "radial",
      "glow",
      "top",
      "landing",
      "dramatic",
    ],
    category: "background-pattern-hero",
    component: RadialGradientTop,
    props: "RadialGradientTopProps",
    exampleUsage: `
<RadialGradientTop>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</RadialGradientTop>
    `.trim(),
  },
  "radial-gradient-bottom": {
    id: "radial-gradient-bottom",
    name: "Radial Gradient Bottom",
    description:
      "A hero section with a radial gradient background emanating from the bottom center. Creates a dramatic primary-colored glow effect rising from below. Ideal for sections that need grounding visual weight at the bottom.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "gradient",
      "radial",
      "glow",
      "bottom",
      "grounding",
      "dramatic",
    ],
    category: "background-pattern-hero",
    component: RadialGradientBottom,
    props: "RadialGradientBottomProps",
    exampleUsage: `
<RadialGradientBottom>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</RadialGradientBottom>
    `.trim(),
  },
  "grid-basic": {
    id: "grid-basic",
    name: "Grid Basic",
    description:
      "A hero section with a simple grid line pattern background. Features evenly spaced horizontal and vertical lines creating a clean grid effect. Ideal for tech, engineering, or data-focused landing pages.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "grid",
      "lines",
      "tech",
      "engineering",
      "data",
      "clean",
    ],
    category: "background-pattern-hero",
    component: GridBasic,
    props: "GridBasicProps",
    exampleUsage: `
<GridBasic>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</GridBasic>
    `.trim(),
  },
  "grid-fade-top-left": {
    id: "grid-fade-top-left",
    name: "Grid Fade Top Left",
    description:
      "A hero section with a grid pattern that fades from the top-left corner. The grid lines are most visible in the top-left and gradually fade toward the opposite corner. Ideal for asymmetric layouts or when content is positioned toward the bottom-right.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "grid",
      "fade",
      "top-left",
      "asymmetric",
      "corner",
      "gradient-mask",
    ],
    category: "background-pattern-hero",
    component: GridFadeTopLeft,
    props: "GridFadeTopLeftProps",
    exampleUsage: `
<GridFadeTopLeft>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</GridFadeTopLeft>
    `.trim(),
  },
  "grid-fade-top-right": {
    id: "grid-fade-top-right",
    name: "Grid Fade Top Right",
    description:
      "A hero section with a grid pattern that fades from the top-right corner. The grid lines are most visible in the top-right and gradually fade toward the opposite corner. Ideal for asymmetric layouts or when content is positioned toward the bottom-left.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "grid",
      "fade",
      "top-right",
      "asymmetric",
      "corner",
      "gradient-mask",
    ],
    category: "background-pattern-hero",
    component: GridFadeTopRight,
    props: "GridFadeTopRightProps",
    exampleUsage: `
<GridFadeTopRight>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</GridFadeTopRight>
    `.trim(),
  },
  "grid-fade-top": {
    id: "grid-fade-top",
    name: "Grid Fade Top",
    description:
      "A hero section with a grid pattern that fades from the top edge. The grid lines are most visible at the top and gradually fade toward the bottom. Ideal for hero sections where content is centered or positioned below.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "grid",
      "fade",
      "top",
      "edge",
      "centered",
      "gradient-mask",
    ],
    category: "background-pattern-hero",
    component: GridFadeTop,
    props: "GridFadeTopProps",
    exampleUsage: `
<GridFadeTop>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</GridFadeTop>
    `.trim(),
  },
  "grid-fade-bottom": {
    id: "grid-fade-bottom",
    name: "Grid Fade Bottom",
    description:
      "A hero section with a grid pattern that fades from the bottom edge. The grid lines are most visible at the bottom and gradually fade toward the top. Ideal for sections that need visual grounding or when content is positioned above.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "grid",
      "fade",
      "bottom",
      "edge",
      "grounding",
      "gradient-mask",
    ],
    category: "background-pattern-hero",
    component: GridFadeBottom,
    props: "GridFadeBottomProps",
    exampleUsage: `
<GridFadeBottom>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</GridFadeBottom>
    `.trim(),
  },
  "grid-fade-bottom-left": {
    id: "grid-fade-bottom-left",
    name: "Grid Fade Bottom Left",
    description:
      "A hero section with a grid pattern that fades from the bottom-left corner. The grid lines are most visible in the bottom-left and gradually fade toward the opposite corner. Ideal for asymmetric layouts or when content is positioned toward the top-right.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "grid",
      "fade",
      "bottom-left",
      "asymmetric",
      "corner",
      "gradient-mask",
    ],
    category: "background-pattern-hero",
    component: GridFadeBottomLeft,
    props: "GridFadeBottomLeftProps",
    exampleUsage: `
<GridFadeBottomLeft>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</GridFadeBottomLeft>
    `.trim(),
  },
  "grid-fade-bottom-right": {
    id: "grid-fade-bottom-right",
    name: "Grid Fade Bottom Right",
    description:
      "A hero section with a grid pattern that fades from the bottom-right corner. The grid lines are most visible in the bottom-right and gradually fade toward the opposite corner. Ideal for asymmetric layouts or when content is positioned toward the top-left.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "grid",
      "fade",
      "bottom-right",
      "asymmetric",
      "corner",
      "gradient-mask",
    ],
    category: "background-pattern-hero",
    component: GridFadeBottomRight,
    props: "GridFadeBottomRightProps",
    exampleUsage: `
<GridFadeBottomRight>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</GridFadeBottomRight>
    `.trim(),
  },
  "grid-fade-center": {
    id: "grid-fade-center",
    name: "Grid Fade Center",
    description:
      "A hero section with a grid pattern that fades from the center outward. The grid lines are most visible in the center and gradually fade toward the edges. Ideal for centered content layouts that need a focused background effect.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "grid",
      "fade",
      "center",
      "focused",
      "centered",
      "gradient-mask",
    ],
    category: "background-pattern-hero",
    component: GridFadeCenter,
    props: "GridFadeCenterProps",
    exampleUsage: `
<GridFadeCenter>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</GridFadeCenter>
    `.trim(),
  },
  "diagonal-cross-basic": {
    id: "diagonal-cross-basic",
    name: "Diagonal Cross Basic",
    description:
      "A hero section with a diagonal cross-hatch pattern background. Features intersecting 45-degree lines creating an X-pattern grid effect. Ideal for modern, dynamic landing pages with a geometric aesthetic.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "diagonal",
      "cross",
      "geometric",
      "modern",
      "dynamic",
      "x-pattern",
    ],
    category: "background-pattern-hero",
    component: DiagonalCrossBasic,
    props: "DiagonalCrossBasicProps",
    exampleUsage: `
<DiagonalCrossBasic>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</DiagonalCrossBasic>
    `.trim(),
  },
  "diagonal-cross-fade-top-left": {
    id: "diagonal-cross-fade-top-left",
    name: "Diagonal Cross Fade Top Left",
    description:
      "A hero section with a diagonal cross-hatch pattern that fades from the top-left corner. The pattern is most visible in the top-left and gradually fades toward the opposite corner. Ideal for asymmetric layouts with geometric styling.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "diagonal",
      "cross",
      "fade",
      "top-left",
      "asymmetric",
      "geometric",
    ],
    category: "background-pattern-hero",
    component: DiagonalCrossFadeTopLeft,
    props: "DiagonalCrossFadeTopLeftProps",
    exampleUsage: `
<DiagonalCrossFadeTopLeft>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</DiagonalCrossFadeTopLeft>
    `.trim(),
  },
  "diagonal-cross-fade-top-right": {
    id: "diagonal-cross-fade-top-right",
    name: "Diagonal Cross Fade Top Right",
    description:
      "A hero section with a diagonal cross-hatch pattern that fades from the top-right corner. The pattern is most visible in the top-right and gradually fades toward the opposite corner. Ideal for asymmetric layouts with geometric styling.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "diagonal",
      "cross",
      "fade",
      "top-right",
      "asymmetric",
      "geometric",
    ],
    category: "background-pattern-hero",
    component: DiagonalCrossFadeTopRight,
    props: "DiagonalCrossFadeTopRightProps",
    exampleUsage: `
<DiagonalCrossFadeTopRight>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</DiagonalCrossFadeTopRight>
    `.trim(),
  },
  "diagonal-cross-fade-top": {
    id: "diagonal-cross-fade-top",
    name: "Diagonal Cross Fade Top",
    description:
      "A hero section with a diagonal cross-hatch pattern that fades from the top edge. The pattern is most visible at the top and gradually fades toward the bottom. Ideal for hero sections with geometric styling where content is centered or below.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "diagonal",
      "cross",
      "fade",
      "top",
      "edge",
      "geometric",
    ],
    category: "background-pattern-hero",
    component: DiagonalCrossFadeTop,
    props: "DiagonalCrossFadeTopProps",
    exampleUsage: `
<DiagonalCrossFadeTop>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</DiagonalCrossFadeTop>
    `.trim(),
  },
  "diagonal-cross-fade-bottom": {
    id: "diagonal-cross-fade-bottom",
    name: "Diagonal Cross Fade Bottom",
    description:
      "A hero section with a diagonal cross-hatch pattern that fades from the bottom edge. The pattern is most visible at the bottom and gradually fades toward the top. Ideal for sections with geometric styling that need visual grounding.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "diagonal",
      "cross",
      "fade",
      "bottom",
      "edge",
      "geometric",
    ],
    category: "background-pattern-hero",
    component: DiagonalCrossFadeBottom,
    props: "DiagonalCrossFadeBottomProps",
    exampleUsage: `
<DiagonalCrossFadeBottom>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</DiagonalCrossFadeBottom>
    `.trim(),
  },
  "diagonal-cross-fade-bottom-left": {
    id: "diagonal-cross-fade-bottom-left",
    name: "Diagonal Cross Fade Bottom Left",
    description:
      "A hero section with a diagonal cross-hatch pattern that fades from the bottom-left corner. The pattern is most visible in the bottom-left and gradually fades toward the opposite corner. Ideal for asymmetric layouts with geometric styling.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "diagonal",
      "cross",
      "fade",
      "bottom-left",
      "asymmetric",
      "geometric",
    ],
    category: "background-pattern-hero",
    component: DiagonalCrossFadeBottomLeft,
    props: "DiagonalCrossFadeBottomLeftProps",
    exampleUsage: `
<DiagonalCrossFadeBottomLeft>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</DiagonalCrossFadeBottomLeft>
    `.trim(),
  },
  "diagonal-cross-fade-bottom-right": {
    id: "diagonal-cross-fade-bottom-right",
    name: "Diagonal Cross Fade Bottom Right",
    description:
      "A hero section with a diagonal cross-hatch pattern that fades from the bottom-right corner. The pattern is most visible in the bottom-right and gradually fades toward the opposite corner. Ideal for asymmetric layouts with geometric styling.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "diagonal",
      "cross",
      "fade",
      "bottom-right",
      "asymmetric",
      "geometric",
    ],
    category: "background-pattern-hero",
    component: DiagonalCrossFadeBottomRight,
    props: "DiagonalCrossFadeBottomRightProps",
    exampleUsage: `
<DiagonalCrossFadeBottomRight>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</DiagonalCrossFadeBottomRight>
    `.trim(),
  },
  "diagonal-cross-fade-center": {
    id: "diagonal-cross-fade-center",
    name: "Diagonal Cross Fade Center",
    description:
      "A hero section with a diagonal cross-hatch pattern that fades from the center outward. The pattern is most visible in the center and gradually fades toward the edges. Ideal for centered content layouts with geometric styling.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "diagonal",
      "cross",
      "fade",
      "center",
      "focused",
      "geometric",
    ],
    category: "background-pattern-hero",
    component: DiagonalCrossFadeCenter,
    props: "DiagonalCrossFadeCenterProps",
    exampleUsage: `
<DiagonalCrossFadeCenter>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</DiagonalCrossFadeCenter>
    `.trim(),
  },
  "dashed-grid-basic": {
    id: "dashed-grid-basic",
    name: "Dashed Grid Basic",
    description:
      "A hero section with a dashed grid line pattern background. Features evenly spaced dashed horizontal and vertical lines creating a subtle grid effect. Ideal for technical, blueprint-style, or minimalist landing pages.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "dashed",
      "grid",
      "technical",
      "blueprint",
      "minimalist",
      "subtle",
    ],
    category: "background-pattern-hero",
    component: DashedGridBasic,
    props: "DashedGridBasicProps",
    exampleUsage: `
<DashedGridBasic>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</DashedGridBasic>
    `.trim(),
  },
  "dashed-grid-fade-top-left": {
    id: "dashed-grid-fade-top-left",
    name: "Dashed Grid Fade Top Left",
    description:
      "A hero section with a dashed grid pattern that fades from the top-left corner. The dashed lines are most visible in the top-left and gradually fade toward the opposite corner. Ideal for asymmetric layouts with a technical aesthetic.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "dashed",
      "grid",
      "fade",
      "top-left",
      "asymmetric",
      "technical",
    ],
    category: "background-pattern-hero",
    component: DashedGridFadeTopLeft,
    props: "DashedGridFadeTopLeftProps",
    exampleUsage: `
<DashedGridFadeTopLeft>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</DashedGridFadeTopLeft>
    `.trim(),
  },
  "dashed-grid-fade-top-right": {
    id: "dashed-grid-fade-top-right",
    name: "Dashed Grid Fade Top Right",
    description:
      "A hero section with a dashed grid pattern that fades from the top-right corner. The dashed lines are most visible in the top-right and gradually fade toward the opposite corner. Ideal for asymmetric layouts with a technical aesthetic.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "dashed",
      "grid",
      "fade",
      "top-right",
      "asymmetric",
      "technical",
    ],
    category: "background-pattern-hero",
    component: DashedGridFadeTopRight,
    props: "DashedGridFadeTopRightProps",
    exampleUsage: `
<DashedGridFadeTopRight>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</DashedGridFadeTopRight>
    `.trim(),
  },
  "dashed-grid-fade-top": {
    id: "dashed-grid-fade-top",
    name: "Dashed Grid Fade Top",
    description:
      "A hero section with a dashed grid pattern that fades from the top edge. The dashed lines are most visible at the top and gradually fade toward the bottom. Ideal for hero sections with a technical aesthetic where content is centered or below.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "dashed",
      "grid",
      "fade",
      "top",
      "edge",
      "technical",
    ],
    category: "background-pattern-hero",
    component: DashedGridFadeTop,
    props: "DashedGridFadeTopProps",
    exampleUsage: `
<DashedGridFadeTop>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</DashedGridFadeTop>
    `.trim(),
  },
  "dashed-grid-fade-bottom": {
    id: "dashed-grid-fade-bottom",
    name: "Dashed Grid Fade Bottom",
    description:
      "A hero section with a dashed grid pattern that fades from the bottom edge. The dashed lines are most visible at the bottom and gradually fade toward the top. Ideal for sections with a technical aesthetic that need visual grounding.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "dashed",
      "grid",
      "fade",
      "bottom",
      "edge",
      "technical",
    ],
    category: "background-pattern-hero",
    component: DashedGridFadeBottom,
    props: "DashedGridFadeBottomProps",
    exampleUsage: `
<DashedGridFadeBottom>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</DashedGridFadeBottom>
    `.trim(),
  },
  "dashed-grid-fade-bottom-left": {
    id: "dashed-grid-fade-bottom-left",
    name: "Dashed Grid Fade Bottom Left",
    description:
      "A hero section with a dashed grid pattern that fades from the bottom-left corner. The dashed lines are most visible in the bottom-left and gradually fade toward the opposite corner. Ideal for asymmetric layouts with a technical aesthetic.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "dashed",
      "grid",
      "fade",
      "bottom-left",
      "asymmetric",
      "technical",
    ],
    category: "background-pattern-hero",
    component: DashedGridFadeBottomLeft,
    props: "DashedGridFadeBottomLeftProps",
    exampleUsage: `
<DashedGridFadeBottomLeft>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</DashedGridFadeBottomLeft>
    `.trim(),
  },
  "dashed-grid-fade-bottom-right": {
    id: "dashed-grid-fade-bottom-right",
    name: "Dashed Grid Fade Bottom Right",
    description:
      "A hero section with a dashed grid pattern that fades from the bottom-right corner. The dashed lines are most visible in the bottom-right and gradually fade toward the opposite corner. Ideal for asymmetric layouts with a technical aesthetic.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "dashed",
      "grid",
      "fade",
      "bottom-right",
      "asymmetric",
      "technical",
    ],
    category: "background-pattern-hero",
    component: DashedGridFadeBottomRight,
    props: "DashedGridFadeBottomRightProps",
    exampleUsage: `
<DashedGridFadeBottomRight>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</DashedGridFadeBottomRight>
    `.trim(),
  },
  "dashed-grid-fade-center": {
    id: "dashed-grid-fade-center",
    name: "Dashed Grid Fade Center",
    description:
      "A hero section with a dashed grid pattern that fades from the center outward. The dashed lines are most visible in the center and gradually fade toward the edges. Ideal for centered content layouts with a technical aesthetic.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "dashed",
      "grid",
      "fade",
      "center",
      "focused",
      "technical",
    ],
    category: "background-pattern-hero",
    component: DashedGridFadeCenter,
    props: "DashedGridFadeCenterProps",
    exampleUsage: `
<DashedGridFadeCenter>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</DashedGridFadeCenter>
    `.trim(),
  },
  "gradient-glow-top": {
    id: "gradient-glow-top",
    name: "Gradient Glow Top",
    description:
      "A hero section with a glowing gradient orb positioned at the top. Features a blurred primary-colored circle creating a soft ambient glow effect. Ideal for modern, atmospheric landing pages with a premium feel.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "glow",
      "gradient",
      "orb",
      "top",
      "atmospheric",
      "premium",
    ],
    category: "background-pattern-hero",
    component: GradientGlowTop,
    props: "GradientGlowTopProps",
    exampleUsage: `
<GradientGlowTop>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</GradientGlowTop>
    `.trim(),
  },
  "gradient-glow-bottom": {
    id: "gradient-glow-bottom",
    name: "Gradient Glow Bottom",
    description:
      "A hero section with a glowing gradient orb positioned at the bottom. Features a blurred primary-colored circle creating a soft ambient glow effect from below. Ideal for sections that need visual grounding with a premium atmospheric feel.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "glow",
      "gradient",
      "orb",
      "bottom",
      "atmospheric",
      "premium",
    ],
    category: "background-pattern-hero",
    component: GradientGlowBottom,
    props: "GradientGlowBottomProps",
    exampleUsage: `
<GradientGlowBottom>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</GradientGlowBottom>
    `.trim(),
  },
  "spotlight-left": {
    id: "spotlight-left",
    name: "Spotlight Left",
    description:
      "A hero section with a spotlight glow effect from the left side. Features a blurred primary-colored circle creating a directional ambient light effect. Ideal for asymmetric layouts where content is positioned on the right.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "spotlight",
      "glow",
      "left",
      "directional",
      "asymmetric",
      "ambient",
    ],
    category: "background-pattern-hero",
    component: SpotlightLeft,
    props: "SpotlightLeftProps",
    exampleUsage: `
<SpotlightLeft>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</SpotlightLeft>
    `.trim(),
  },
  "spotlight-right": {
    id: "spotlight-right",
    name: "Spotlight Right",
    description:
      "A hero section with a spotlight glow effect from the right side. Features a blurred primary-colored circle creating a directional ambient light effect. Ideal for asymmetric layouts where content is positioned on the left.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "spotlight",
      "glow",
      "right",
      "directional",
      "asymmetric",
      "ambient",
    ],
    category: "background-pattern-hero",
    component: SpotlightRight,
    props: "SpotlightRightProps",
    exampleUsage: `
<SpotlightRight>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</SpotlightRight>
    `.trim(),
  },
  "circuit-board-basic": {
    id: "circuit-board-basic",
    name: "Circuit Board Basic",
    description:
      "A hero section with a circuit board pattern background. Features interconnected lines and nodes creating a tech-inspired PCB aesthetic. Ideal for technology, electronics, or engineering-focused landing pages.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "circuit",
      "board",
      "tech",
      "electronics",
      "pcb",
      "engineering",
    ],
    category: "background-pattern-hero",
    component: CircuitBoardBasic,
    props: "CircuitBoardBasicProps",
    exampleUsage: `
<CircuitBoardBasic>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</CircuitBoardBasic>
    `.trim(),
  },
  "circuit-board-fade-top-left": {
    id: "circuit-board-fade-top-left",
    name: "Circuit Board Fade Top Left",
    description:
      "A hero section with a circuit board pattern that fades from the top-left corner. The pattern is most visible in the top-left and gradually fades toward the opposite corner. Ideal for asymmetric tech-focused layouts.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "circuit",
      "board",
      "fade",
      "top-left",
      "asymmetric",
      "tech",
    ],
    category: "background-pattern-hero",
    component: CircuitBoardFadeTopLeft,
    props: "CircuitBoardFadeTopLeftProps",
    exampleUsage: `
<CircuitBoardFadeTopLeft>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</CircuitBoardFadeTopLeft>
    `.trim(),
  },
  "circuit-board-fade-top-right": {
    id: "circuit-board-fade-top-right",
    name: "Circuit Board Fade Top Right",
    description:
      "A hero section with a circuit board pattern that fades from the top-right corner. The pattern is most visible in the top-right and gradually fades toward the opposite corner. Ideal for asymmetric tech-focused layouts.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "circuit",
      "board",
      "fade",
      "top-right",
      "asymmetric",
      "tech",
    ],
    category: "background-pattern-hero",
    component: CircuitBoardFadeTopRight,
    props: "CircuitBoardFadeTopRightProps",
    exampleUsage: `
<CircuitBoardFadeTopRight>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</CircuitBoardFadeTopRight>
    `.trim(),
  },
  "circuit-board-fade-top": {
    id: "circuit-board-fade-top",
    name: "Circuit Board Fade Top",
    description:
      "A hero section with a circuit board pattern that fades from the top edge. The pattern is most visible at the top and gradually fades toward the bottom. Ideal for hero sections with a tech aesthetic where content is centered or below.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "circuit",
      "board",
      "fade",
      "top",
      "edge",
      "tech",
    ],
    category: "background-pattern-hero",
    component: CircuitBoardFadeTop,
    props: "CircuitBoardFadeTopProps",
    exampleUsage: `
<CircuitBoardFadeTop>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</CircuitBoardFadeTop>
    `.trim(),
  },
  "circuit-board-fade-bottom": {
    id: "circuit-board-fade-bottom",
    name: "Circuit Board Fade Bottom",
    description:
      "A hero section with a circuit board pattern that fades from the bottom edge. The pattern is most visible at the bottom and gradually fades toward the top. Ideal for sections with a tech aesthetic that need visual grounding.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "circuit",
      "board",
      "fade",
      "bottom",
      "edge",
      "tech",
    ],
    category: "background-pattern-hero",
    component: CircuitBoardFadeBottom,
    props: "CircuitBoardFadeBottomProps",
    exampleUsage: `
<CircuitBoardFadeBottom>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</CircuitBoardFadeBottom>
    `.trim(),
  },
  "circuit-board-fade-bottom-left": {
    id: "circuit-board-fade-bottom-left",
    name: "Circuit Board Fade Bottom Left",
    description:
      "A hero section with a circuit board pattern that fades from the bottom-left corner. The pattern is most visible in the bottom-left and gradually fades toward the opposite corner. Ideal for asymmetric tech-focused layouts.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "circuit",
      "board",
      "fade",
      "bottom-left",
      "asymmetric",
      "tech",
    ],
    category: "background-pattern-hero",
    component: CircuitBoardFadeBottomLeft,
    props: "CircuitBoardFadeBottomLeftProps",
    exampleUsage: `
<CircuitBoardFadeBottomLeft>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</CircuitBoardFadeBottomLeft>
    `.trim(),
  },
  "circuit-board-fade-bottom-right": {
    id: "circuit-board-fade-bottom-right",
    name: "Circuit Board Fade Bottom Right",
    description:
      "A hero section with a circuit board pattern that fades from the bottom-right corner. The pattern is most visible in the bottom-right and gradually fades toward the opposite corner. Ideal for asymmetric tech-focused layouts.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "circuit",
      "board",
      "fade",
      "bottom-right",
      "asymmetric",
      "tech",
    ],
    category: "background-pattern-hero",
    component: CircuitBoardFadeBottomRight,
    props: "CircuitBoardFadeBottomRightProps",
    exampleUsage: `
<CircuitBoardFadeBottomRight>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</CircuitBoardFadeBottomRight>
    `.trim(),
  },
  "circuit-board-fade-center": {
    id: "circuit-board-fade-center",
    name: "Circuit Board Fade Center",
    description:
      "A hero section with a circuit board pattern that fades from the center outward. The pattern is most visible in the center and gradually fades toward the edges. Ideal for centered content layouts with a tech aesthetic.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "circuit",
      "board",
      "fade",
      "center",
      "focused",
      "tech",
    ],
    category: "background-pattern-hero",
    component: CircuitBoardFadeCenter,
    props: "CircuitBoardFadeCenterProps",
    exampleUsage: `
<CircuitBoardFadeCenter>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</CircuitBoardFadeCenter>
    `.trim(),
  },
  "grid-dots-basic": {
    id: "grid-dots-basic",
    name: "Grid Dots Basic",
    description:
      "A hero section with a grid pattern featuring dots at intersections. Combines thin grid lines with circular nodes at each crossing point. Ideal for data visualization, network, or connection-themed landing pages.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "grid",
      "dots",
      "nodes",
      "network",
      "data",
      "connection",
    ],
    category: "background-pattern-hero",
    component: GridDotsBasic,
    props: "GridDotsBasicProps",
    exampleUsage: `
<GridDotsBasic>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</GridDotsBasic>
    `.trim(),
  },
  "grid-dots-fade-center": {
    id: "grid-dots-fade-center",
    name: "Grid Dots Fade Center",
    description:
      "A hero section with a grid-dots pattern that fades from the center outward. The pattern is most visible in the center and gradually fades toward the edges. Ideal for centered content layouts with a network or connection theme.",
    semanticTags: [
      "hero",
      "background",
      "pattern",
      "grid",
      "dots",
      "fade",
      "center",
      "network",
      "connection",
    ],
    category: "background-pattern-hero",
    component: GridDotsFadeCenter,
    props: "GridDotsFadeCenterProps",
    exampleUsage: `
<GridDotsFadeCenter>
  <div className="text-center">
    <h1>Your Hero Content</h1>
  </div>
</GridDotsFadeCenter>
    `.trim(),
  },

  // Blog components
  "blog-grid-author-cards": {
    id: "blog-grid-author-cards",
    name: "Blog Grid Author Cards",
    description:
      "A responsive blog grid layout displaying posts with author avatars, category badges, and publication dates. Features a 3-column grid on large screens with hover effects on images. Ideal for blog listing pages that emphasize author attribution and content categorization.",
    semanticTags: [
      "blog",
      "posts",
      "articles",
      "grid",
      "author",
      "avatar",
      "category",
      "badge",
      "cards",
      "listing",
    ],
    category: "blog",
    component: BlogGridAuthorCards,
    props: "BlogGridAuthorCardsProps",
    exampleUsage: `
<BlogGridAuthorCards
  title="Blog"
  description="Insights, tutorials, and thoughts on modern software development"
  posts={[
    {
      id: "post-1",
      title: "The Future of Web Development",
      summary: "Explore the latest trends...",
      label: "Web Development",
      author: "Sarah Chen",
      published: "15 Jan 2024",
      href: "#",
      image: "/images/post1.jpg"
    }
  ]}
/>
    `.trim(),
  },
  "blog-cards-tagline-cta": {
    id: "blog-cards-tagline-cta",
    name: "Blog Cards Tagline CTA",
    description:
      "A centered blog section with tagline badge, heading, description, and CTA button above a 3-column card grid. Each card features an image, title, summary, and 'Read more' link. Perfect for marketing-focused blog sections that need a strong call-to-action alongside content previews.",
    semanticTags: [
      "blog",
      "posts",
      "articles",
      "cards",
      "tagline",
      "cta",
      "marketing",
      "grid",
      "centered",
    ],
    category: "blog",
    component: BlogCardsTaglineCta,
    props: "BlogCardsTaglineCtaProps",
    exampleUsage: `
<BlogCardsTaglineCta
  tagline="Our Blog"
  title="Latest Articles"
  description="Stay updated with our latest insights"
  ctaText="View All Posts"
  ctaHref="/blog"
/>
    `.trim(),
  },
  "blog-cards-read-time": {
    id: "blog-cards-read-time",
    name: "Blog Cards Read Time",
    description:
      "A blog card grid featuring author avatars, read time badges, and separator lines. Each card displays an image, title, summary, author info, and estimated reading time. Includes a centered header with icon badge and 'View All Blogs' CTA button. Ideal for content-heavy blogs that want to show reading commitment upfront.",
    semanticTags: [
      "blog",
      "posts",
      "articles",
      "cards",
      "read-time",
      "author",
      "avatar",
      "badge",
      "grid",
    ],
    category: "blog",
    component: BlogCardsReadTime,
    props: "BlogCardsReadTimeProps",
    exampleUsage: `
<BlogCardsReadTime
  title="Blog"
  description="Discover our latest articles"
  ctaText="View All Blogs"
  ctaHref="/blog"
/>
    `.trim(),
  },
  "blog-category-overlay": {
    id: "blog-category-overlay",
    name: "Blog Category Overlay",
    description:
      "A blog grid with category badges overlaid on images using a glassmorphism effect. Features a centered header section with tagline, title, description, and 'View All' link. Each card shows the post image, category overlay, title, date with calendar icon, and 'Read more' link. Great for visually categorized content with modern styling.",
    semanticTags: [
      "blog",
      "posts",
      "articles",
      "cards",
      "category",
      "overlay",
      "glassmorphism",
      "grid",
      "modern",
    ],
    category: "blog",
    component: BlogCategoryOverlay,
    props: "BlogCategoryOverlayProps",
    exampleUsage: `
<BlogCategoryOverlay
  tagline="Blog"
  title="Latest News"
  description="Stay informed with our updates"
  viewAllText="View All"
  viewAllHref="/blog"
/>
    `.trim(),
  },
  "blog-featured-popular": {
    id: "blog-featured-popular",
    name: "Blog Featured Popular",
    description:
      "A two-tier blog layout with a large featured post at the top and a 'Popular Posts' grid below. The featured post displays side-by-side image and content on desktop. Popular posts show in a 3-column grid with images, category badges, titles, and descriptions. Perfect for highlighting editorial picks alongside trending content.",
    semanticTags: [
      "blog",
      "posts",
      "articles",
      "featured",
      "popular",
      "trending",
      "editorial",
      "grid",
      "two-tier",
    ],
    category: "blog",
    component: BlogFeaturedPopular,
    props: "BlogFeaturedPopularProps",
    exampleUsage: `
<BlogFeaturedPopular
  title="Featured Article"
  popularTitle="Popular Posts"
  featuredPost={{
    title: "The Future of AI",
    description: "Exploring what's next...",
    category: "Technology",
    href: "#",
    image: "/images/featured.jpg"
  }}
/>
    `.trim(),
  },
  "blog-related-articles": {
    id: "blog-related-articles",
    name: "Blog Related Articles",
    description:
      "A compact related articles section with a 4-column grid layout. Each article displays category, title, description, and date in a text-only format without images. Features a header with title and 'See all articles' button. Ideal for sidebar widgets or end-of-article related content suggestions.",
    semanticTags: [
      "blog",
      "posts",
      "articles",
      "related",
      "sidebar",
      "widget",
      "text-only",
      "grid",
      "compact",
    ],
    category: "blog",
    component: BlogRelatedArticles,
    props: "BlogRelatedArticlesProps",
    exampleUsage: `
<BlogRelatedArticles
  title="Related Articles"
  ctaText="See all articles"
  ctaHref="/blog"
/>
    `.trim(),
  },
  "blog-tech-insights": {
    id: "blog-tech-insights",
    name: "Blog Tech Insights",
    description:
      "A dark-themed tech blog section with a featured post and secondary posts list. The featured post displays a large image with title and author info. Secondary posts appear in a bordered list with thumbnails and content snippets. Includes a header with title, description, and 'Read More' CTA button. Perfect for technology-focused blogs with a modern, professional aesthetic.",
    semanticTags: [
      "blog",
      "posts",
      "articles",
      "tech",
      "dark-theme",
      "featured",
      "list",
      "professional",
      "modern",
    ],
    category: "blog",
    component: BlogTechInsights,
    props: "BlogTechInsightsProps",
    exampleUsage: `
<BlogTechInsights
  title="Tech Insights"
  description="Latest technology news and analysis"
  ctaText="Read More"
  ctaHref="/blog"
/>
    `.trim(),
  },
  "blog-horizontal-cards": {
    id: "blog-horizontal-cards",
    name: "Blog Horizontal Cards",
    description:
      "A blog layout with horizontal card orientation featuring side-by-side image and content. Each card displays a thumbnail, category badge, author, date, title, summary, and 'Read more' link. Includes a centered header with tagline badge, heading, and description, plus a bottom CTA button. Ideal for content-rich blogs that need more space for article summaries.",
    semanticTags: [
      "blog",
      "posts",
      "articles",
      "horizontal",
      "cards",
      "side-by-side",
      "content-rich",
      "summary",
    ],
    category: "blog",
    component: BlogHorizontalCards,
    props: "BlogHorizontalCardsProps",
    exampleUsage: `
<BlogHorizontalCards
  tagline="Our Blog"
  title="Latest Articles"
  description="Explore our content"
  ctaText="View All"
  ctaHref="/blog"
/>
    `.trim(),
  },
  "blog-filtered-results": {
    id: "blog-filtered-results",
    name: "Blog Filtered Results",
    description:
      "A comprehensive blog page with breadcrumb navigation, featured primary post, category filtering, and paginated results. Features a muted background header section with title, description, and primary post card. The main section includes checkbox-based category filters and a 'Load More' button for pagination. Perfect for full blog listing pages with advanced filtering capabilities.",
    semanticTags: [
      "blog",
      "posts",
      "articles",
      "filter",
      "category",
      "pagination",
      "breadcrumb",
      "featured",
      "listing",
    ],
    category: "blog",
    component: BlogFilteredResults,
    props: "BlogFilteredResultsProps",
    exampleUsage: `
<BlogFilteredResults
  title="Best Blog Articles"
  description="The best blog content"
  allBlogsTitle="All Blogs"
  categories={[
    { label: "All", value: "all" },
    { label: "Technology", value: "technology" }
  ]}
/>
    `.trim(),
  },
  "blog-masonry-featured": {
    id: "blog-masonry-featured",
    name: "Blog Masonry Featured",
    description:
      "A masonry-style blog grid with a large featured post spanning two columns and rows, surrounded by smaller post cards. The featured post includes a full description while secondary posts show only title and metadata. Features a centered title heading and hover effects on images. Ideal for visually dynamic blog layouts that highlight a primary article.",
    semanticTags: [
      "blog",
      "posts",
      "articles",
      "masonry",
      "featured",
      "grid",
      "dynamic",
      "visual",
      "highlight",
    ],
    category: "blog",
    component: BlogMasonryFeatured,
    props: "BlogMasonryFeaturedProps",
    exampleUsage: `
<BlogMasonryFeatured
  title="Latest Articles"
/>
    `.trim(),
  },
  "blog-horizontal-timeline": {
    id: "blog-horizontal-timeline",
    name: "Blog Horizontal Timeline",
    description:
      "A timeline-style blog layout with large images alongside content cards in a horizontal arrangement. Each post features a rounded image, title, uppercase date, description, and animated 'Read' button with arrow icon. Posts are separated by borders creating a timeline effect. Perfect for chronological content presentation or editorial storytelling.",
    semanticTags: [
      "blog",
      "posts",
      "articles",
      "timeline",
      "horizontal",
      "chronological",
      "editorial",
      "storytelling",
    ],
    category: "blog",
    component: BlogHorizontalTimeline,
    props: "BlogHorizontalTimelineProps",
    exampleUsage: `
<BlogHorizontalTimeline
  posts={[
    {
      title: "Our Journey Begins",
      date: "January 2024",
      description: "The story of how we started...",
      href: "#",
      image: "/images/post1.jpg"
    }
  ]}
/>
    `.trim(),
  },
  "blog-grid-nine-posts": {
    id: "blog-grid-nine-posts",
    name: "Blog Grid Nine Posts",
    description:
      "A comprehensive blog grid layout displaying 9 posts with author avatars, category badges, and publication dates. Features a 3-column grid on large screens with hover effects on images. Includes a mobile-only CTA button at the bottom. Ideal for blog archive pages that need to display many articles at once with full author attribution and content categorization.",
    semanticTags: [
      "blog",
      "posts",
      "articles",
      "grid",
      "archive",
      "author",
      "avatar",
      "category",
      "nine-posts",
    ],
    category: "blog",
    component: BlogGridNinePosts,
    props: "BlogGridNinePostsProps",
    exampleUsage: `
<BlogGridNinePosts
  title="Blog Archive"
  description="Browse all our articles"
  ctaText="View all posts"
  ctaHref="/blog"
/>
    `.trim(),
  },
  "article-hero-prose": {
    id: "article-hero-prose",
    name: "Article Hero Prose",
    description:
      "A full-width article layout featuring a prominent hero image, author information with avatar, and rich prose content including alerts, tables, blockquotes, and lists. Ideal for long-form blog posts and articles that need visual hierarchy with a strong opening image and detailed content sections.",
    semanticTags: [
      "article",
      "blog-post",
      "hero",
      "prose",
      "long-form",
      "author",
      "avatar",
      "tables",
      "alerts",
      "blockquotes",
    ],
    category: "article",
    component: ArticleHeroProse,
    props: "ArticleHeroProseProps",
    exampleUsage: `
<ArticleHeroProse
  post={{
    title: "Designing websites faster with Opensite AI",
    authorName: "John Doe",
    image: "/images/hero.jpg",
    pubDate: new Date(),
    description: "A step-by-step guide to building modern websites.",
    authorImage: "/images/author.jpg"
  }}
/>
    `.trim(),
  },
  "article-sidebar-sticky": {
    id: "article-sidebar-sticky",
    name: "Article Sidebar Sticky",
    description:
      "A two-column article layout with a sticky sidebar containing author information and a back navigation link. The main content area features prose styling with images and blockquotes. Perfect for documentation-style articles or blog posts where persistent author attribution and navigation are important.",
    semanticTags: [
      "article",
      "blog-post",
      "sidebar",
      "sticky",
      "author",
      "navigation",
      "prose",
      "two-column",
      "documentation",
    ],
    category: "article",
    component: ArticleSidebarSticky,
    props: "ArticleSidebarStickyProps",
    exampleUsage: `
<ArticleSidebarSticky
  title="The Art of Modern Web Development"
  authorName="Sarah Johnson"
  authorImage="/images/author.jpg"
  publishDate="December 15, 2024"
  backHref="/blog"
  backText="Back to Blog"
/>
    `.trim(),
  },
  "article-toc-sidebar": {
    id: "article-toc-sidebar",
    name: "Article TOC Sidebar",
    description:
      "An article layout with a sticky table of contents sidebar that highlights the active section as users scroll. Includes a CTA card in the sidebar, category badge, author info, and IntersectionObserver-based section tracking. Ideal for technical tutorials, guides, and long-form content that benefits from easy navigation.",
    semanticTags: [
      "article",
      "blog-post",
      "toc",
      "table-of-contents",
      "sidebar",
      "sticky",
      "navigation",
      "tutorial",
      "guide",
      "cta",
    ],
    category: "article",
    component: ArticleTocSidebar,
    props: "ArticleTocSidebarProps",
    exampleUsage: `
<ArticleTocSidebar
  title="Building Scalable Applications"
  description="Learn modern architectural patterns."
  authorName="Alex Chen"
  sections={[
    { id: "introduction", title: "Introduction" },
    { id: "getting-started", title: "Getting Started" }
  ]}
  ctaTitle="Ready to build?"
  ctaButtonText="Get Started"
/>
    `.trim(),
  },
  "article-breadcrumb-social": {
    id: "article-breadcrumb-social",
    name: "Article Breadcrumb Social",
    description:
      "A comprehensive article layout featuring breadcrumb navigation, social sharing buttons, a sticky table of contents sidebar, and a floating back-to-top button. Includes author information with role, read time, and IntersectionObserver-based section tracking. Perfect for content-heavy articles that need robust navigation and sharing capabilities.",
    semanticTags: [
      "article",
      "blog-post",
      "breadcrumb",
      "social-sharing",
      "toc",
      "back-to-top",
      "navigation",
      "author",
      "read-time",
    ],
    category: "article",
    component: ArticleBreadcrumbSocial,
    props: "ArticleBreadcrumbSocialProps",
    exampleUsage: `
<ArticleBreadcrumbSocial
  title="Mastering Performance Optimization"
  authorName="Emily Rodriguez"
  authorRole="Senior Engineer"
  publishDate="January 10, 2025"
  readTime="15 min read"
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" }
  ]}
  shareUrls={{ twitter: "#", linkedin: "#" }}
/>
    `.trim(),
  },
  "article-compact-toc": {
    id: "article-compact-toc",
    name: "Article Compact TOC",
    description:
      "A compact, mobile-friendly article layout with a collapsible table of contents, breadcrumb navigation, and inline social sharing buttons. Features a centered content area with author info, read time, and publication date. Ideal for research papers, studies, and articles that need a clean, focused reading experience on all devices.",
    semanticTags: [
      "article",
      "blog-post",
      "toc",
      "collapsible",
      "mobile-friendly",
      "compact",
      "breadcrumb",
      "social-sharing",
      "research",
    ],
    category: "article",
    component: ArticleCompactToc,
    props: "ArticleCompactTocProps",
    exampleUsage: `
<ArticleCompactToc
  title="Understanding User Behavior"
  authorName="Dr. Michael Chen"
  publishDate="January 12, 2025"
  readTime="18 min read"
  sections={[
    { id: "introduction", title: "Introduction" },
    { id: "methodology", title: "Methodology" }
  ]}
/>
    `.trim(),
  },
  "article-chapters-author": {
    id: "article-chapters-author",
    name: "Article Chapters Author",
    description:
      "A book-style article layout with numbered chapters navigation in a sticky sidebar, detailed author bio with social links, and a conclusion CTA card. Features breadcrumb navigation, centered title section, and IntersectionObserver-based chapter tracking. Perfect for comprehensive guides, tutorials, and educational content organized into distinct chapters.",
    semanticTags: [
      "article",
      "blog-post",
      "chapters",
      "book-style",
      "author-bio",
      "social-links",
      "sidebar",
      "guide",
      "tutorial",
      "educational",
    ],
    category: "article",
    component: ArticleChaptersAuthor,
    props: "ArticleChaptersAuthorProps",
    exampleUsage: `
<ArticleChaptersAuthor
  title="A Comprehensive Guide to Design Patterns"
  subtitle="Master essential patterns every engineer should know"
  chapters={[
    { id: "chapter-1", number: 1, title: "The Foundation" },
    { id: "chapter-2", number: 2, title: "Building Blocks" }
  ]}
  author={{
    name: "Jessica Williams",
    role: "Principal Engineer",
    image: "/images/author.jpg",
    bio: "15+ years of experience in software architecture."
  }}
/>
    `.trim(),
  },
  "article-split-animated": {
    id: "article-split-animated",
    name: "Article Split Animated",
    description:
      "A visually striking split-layout article preview with Framer Motion animations. Features a large image on one side with a gradient overlay and category badge, and article details on the other side including title, description, author info, and CTA button. Ideal for featured article sections, hero posts, and content that needs to make a strong visual impact.",
    semanticTags: [
      "article",
      "blog-post",
      "split-layout",
      "animated",
      "framer-motion",
      "featured",
      "hero",
      "visual-impact",
      "cta",
    ],
    category: "article",
    component: ArticleSplitAnimated,
    props: "ArticleSplitAnimatedProps",
    exampleUsage: `
<ArticleSplitAnimated
  title="The Evolution of Design Systems"
  description="Explore how design systems have transformed..."
  image="/images/featured.jpg"
  authorName="David Park"
  authorRole="Design Lead"
  category="Design"
  ctaText="Read Full Article"
  ctaHref="/article/design-systems"
/>
    `.trim(),
  },

  // FAQ Components
  "faq-simple-accordion": {
    id: "faq-simple-accordion",
    name: "Simple Accordion FAQ",
    description:
      "A clean, minimal FAQ section with collapsible accordion items. Features a bold heading followed by expandable question-answer pairs with smooth animations. Best suited for straightforward FAQ pages where users need quick access to common questions without visual clutter.",
    semanticTags: [
      "faq",
      "questions",
      "answers",
      "accordion",
      "collapsible",
      "help",
      "support",
      "minimal",
      "simple",
    ],
    category: "faq",
    component: FaqSimpleAccordion,
    props: "FaqSimpleAccordionProps",
    exampleUsage: `
<FaqSimpleAccordion
  heading="Frequently asked questions"
  items={[
    { id: "1", question: "What is your return policy?", answer: "We offer a 30-day return policy..." },
    { id: "2", question: "How do I track my order?", answer: "You can track your order..." }
  ]}
/>
    `.trim(),
  },

  "faq-static-list": {
    id: "faq-static-list",
    name: "Static List FAQ",
    description:
      "A non-interactive FAQ layout displaying all questions and answers in a vertical list format. Each Q&A pair is separated by a border, making it easy to scan through all content at once. Ideal for shorter FAQ sections where users benefit from seeing all information without clicking.",
    semanticTags: [
      "faq",
      "questions",
      "answers",
      "list",
      "static",
      "help",
      "support",
      "simple",
      "readable",
    ],
    category: "faq",
    component: FaqStaticList,
    props: "FaqStaticListProps",
    exampleUsage: `
<FaqStaticList
  heading="Frequently asked questions"
  items={[
    { question: "What is your return policy?", answer: "We offer a 30-day return policy..." },
    { question: "How do I track my order?", answer: "You can track your order..." }
  ]}
/>
    `.trim(),
  },

  "faq-centered-accordion": {
    id: "faq-centered-accordion",
    name: "Centered Accordion FAQ",
    description:
      "A centered FAQ section with a prominent heading, descriptive subtext, and collapsible accordion items. The centered layout creates visual hierarchy and draws attention to the content. Perfect for landing pages or dedicated FAQ sections that need a polished, professional appearance.",
    semanticTags: [
      "faq",
      "questions",
      "answers",
      "accordion",
      "centered",
      "help",
      "support",
      "professional",
      "landing-page",
    ],
    category: "faq",
    component: FaqCenteredAccordion,
    props: "FaqCenteredAccordionProps",
    exampleUsage: `
<FaqCenteredAccordion
  heading="Frequently asked questions"
  description="Find answers to common questions about our products."
  items={[
    { id: "1", question: "What is your return policy?", answer: "We offer a 30-day return policy..." }
  ]}
/>
    `.trim(),
  },

  "faq-badge-support": {
    id: "faq-badge-support",
    name: "Badge Header FAQ with Support CTA",
    description:
      "A comprehensive FAQ section featuring a badge label, centered heading with description, accordion items, and a dedicated support call-to-action section at the bottom. The separator and contact button encourage users to reach out if they can't find their answer. Ideal for customer service pages.",
    semanticTags: [
      "faq",
      "questions",
      "answers",
      "accordion",
      "badge",
      "support",
      "contact",
      "help",
      "customer-service",
      "cta",
    ],
    category: "faq",
    component: FaqBadgeSupport,
    props: "FaqBadgeSupportProps",
    exampleUsage: `
<FaqBadgeSupport
  badge="FAQ"
  heading="Frequently asked questions"
  description="Find answers to common questions."
  supportText="Still have questions?"
  supportLinkText="Contact support"
  supportLinkUrl="/contact"
/>
    `.trim(),
  },

  "faq-numbered-list": {
    id: "faq-numbered-list",
    name: "Numbered List FAQ",
    description:
      "A centered FAQ layout with numbered question cards. Each item displays a sequential number badge alongside the question and answer in a bordered card format. The badge header and centered layout create a structured, organized appearance. Great for step-by-step guides or prioritized FAQs.",
    semanticTags: [
      "faq",
      "questions",
      "answers",
      "numbered",
      "list",
      "cards",
      "badge",
      "centered",
      "organized",
      "steps",
    ],
    category: "faq",
    component: FaqNumberedList,
    props: "FaqNumberedListProps",
    exampleUsage: `
<FaqNumberedList
  badge="FAQ"
  heading="Frequently asked questions"
  description="Find answers to common questions."
  items={[
    { question: "What is your return policy?", answer: "We offer a 30-day return policy..." }
  ]}
/>
    `.trim(),
  },

  "faq-numbered-grid": {
    id: "faq-numbered-grid",
    name: "Two-Column Numbered Grid FAQ",
    description:
      "A responsive two-column grid layout displaying numbered FAQ cards. Features a centered header section with heading and description, followed by numbered question-answer cards arranged in a grid. Maximizes space efficiency while maintaining readability. Ideal for pages with many FAQs.",
    semanticTags: [
      "faq",
      "questions",
      "answers",
      "numbered",
      "grid",
      "two-column",
      "cards",
      "responsive",
      "organized",
    ],
    category: "faq",
    component: FaqNumberedGrid,
    props: "FaqNumberedGridProps",
    exampleUsage: `
<FaqNumberedGrid
  heading="Frequently asked questions"
  description="Find answers to common questions."
  items={[
    { question: "What is your return policy?", answer: "We offer a 30-day return policy..." }
  ]}
/>
    `.trim(),
  },

  "faq-split-help": {
    id: "faq-split-help",
    name: "Split Layout FAQ with Help Section",
    description:
      "A two-column FAQ layout with the heading and description on the left, accordion items on the right, and a prominent help banner at the bottom. The split design creates visual interest while the help section provides a clear path to support. Perfect for product pages or documentation sites.",
    semanticTags: [
      "faq",
      "questions",
      "answers",
      "accordion",
      "split",
      "two-column",
      "help",
      "support",
      "cta",
      "banner",
    ],
    category: "faq",
    component: FaqSplitHelp,
    props: "FaqSplitHelpProps",
    exampleUsage: `
<FaqSplitHelp
  heading="Frequently asked questions"
  description="Find answers to common questions."
  helpHeading="Still have questions?"
  helpDescription="Our support team is here to help."
  helpButtonText="Contact Support"
  helpButtonUrl="/contact"
/>
    `.trim(),
  },

  "faq-categorized-sections": {
    id: "faq-categorized-sections",
    name: "Categorized Sections FAQ",
    description:
      "An organized FAQ layout with multiple category sections, each containing its own accordion group. Categories are displayed vertically with clear section headings. Ideal for comprehensive FAQ pages covering different topics like General, Billing, and Support in distinct sections.",
    semanticTags: [
      "faq",
      "questions",
      "answers",
      "accordion",
      "categories",
      "sections",
      "organized",
      "comprehensive",
      "topics",
    ],
    category: "faq",
    component: FaqCategorizedSections,
    props: "FaqCategorizedSectionsProps",
    exampleUsage: `
<FaqCategorizedSections
  heading="Frequently asked questions"
  categories={[
    { title: "General", items: [{ id: "1", question: "What is this?", answer: "..." }] },
    { title: "Billing", items: [{ id: "2", question: "How do I pay?", answer: "..." }] }
  ]}
/>
    `.trim(),
  },

  "faq-muted-cards": {
    id: "faq-muted-cards",
    name: "Muted Background Cards FAQ",
    description:
      "A bold FAQ section with accordion items displayed as muted background cards. Each question expands within its own card container, creating clear visual separation between items. The muted styling provides a softer, more approachable appearance. Great for modern, minimalist designs.",
    semanticTags: [
      "faq",
      "questions",
      "answers",
      "accordion",
      "cards",
      "muted",
      "modern",
      "minimal",
      "soft",
    ],
    category: "faq",
    component: FaqMutedCards,
    props: "FaqMutedCardsProps",
    exampleUsage: `
<FaqMutedCards
  heading="Frequently asked questions"
  items={[
    { id: "1", question: "What is your return policy?", answer: "We offer a 30-day return policy..." }
  ]}
/>
    `.trim(),
  },

  "faq-bordered-badge": {
    id: "faq-bordered-badge",
    name: "Bordered Badge FAQ",
    description:
      "A centered FAQ section featuring a badge with help icon, prominent heading, description, and bordered accordion cards. The icon-enhanced badge adds visual interest while bordered cards create clear item separation. Ideal for help centers or knowledge base pages.",
    semanticTags: [
      "faq",
      "questions",
      "answers",
      "accordion",
      "badge",
      "icon",
      "bordered",
      "cards",
      "help-center",
      "knowledge-base",
    ],
    category: "faq",
    component: FaqBorderedBadge,
    props: "FaqBorderedBadgeProps",
    exampleUsage: `
<FaqBorderedBadge
  badge="FAQ"
  heading="Frequently asked questions"
  description="Find answers to common questions."
  items={[
    { id: "1", question: "What is your return policy?", answer: "We offer a 30-day return policy..." }
  ]}
/>
    `.trim(),
  },

  "faq-gradient-categories": {
    id: "faq-gradient-categories",
    name: "Gradient Background Categorized FAQ",
    description:
      "A visually striking FAQ section with a gradient background container housing categorized accordion groups in a two-column grid. The gradient styling adds depth and visual interest while categories keep content organized. Perfect for SaaS products or modern web applications.",
    semanticTags: [
      "faq",
      "questions",
      "answers",
      "accordion",
      "categories",
      "gradient",
      "two-column",
      "modern",
      "saas",
      "styled",
    ],
    category: "faq",
    component: FaqGradientCategories,
    props: "FaqGradientCategoriesProps",
    exampleUsage: `
<FaqGradientCategories
  heading="Frequently asked questions"
  categories={[
    { title: "General", items: [{ id: "1", question: "What is this?", answer: "..." }] },
    { title: "Billing", items: [{ id: "2", question: "How do I pay?", answer: "..." }] }
  ]}
/>
    `.trim(),
  },

  "faq-sidebar-navigation": {
    id: "faq-sidebar-navigation",
    name: "Sidebar Navigation FAQ",
    description:
      "An interactive FAQ layout with a sticky sidebar navigation for category filtering. Clicking a category smoothly scrolls to that section while highlighting the active category in the sidebar. Ideal for extensive FAQ pages with many categories where quick navigation is essential.",
    semanticTags: [
      "faq",
      "questions",
      "answers",
      "accordion",
      "sidebar",
      "navigation",
      "categories",
      "sticky",
      "interactive",
      "scroll",
    ],
    category: "faq",
    component: FaqSidebarNavigation,
    props: "FaqSidebarNavigationProps",
    exampleUsage: `
<FaqSidebarNavigation
  heading="Frequently asked questions"
  categories={[
    { id: "general", title: "General", items: [{ id: "1", question: "What is this?", answer: "..." }] },
    { id: "billing", title: "Billing", items: [{ id: "2", question: "How do I pay?", answer: "..." }] }
  ]}
/>
    `.trim(),
  },

  "faq-card-categories": {
    id: "faq-card-categories",
    name: "Card-Based Categorized FAQ",
    description:
      "A categorized FAQ layout with each category displayed in its own card container, arranged in a responsive grid. Features a subtle plus-pattern background for visual texture. Each card has a header and accordion content. Great for visually separating different FAQ topics.",
    semanticTags: [
      "faq",
      "questions",
      "answers",
      "accordion",
      "cards",
      "categories",
      "grid",
      "pattern",
      "organized",
      "visual",
    ],
    category: "faq",
    component: FaqCardCategories,
    props: "FaqCardCategoriesProps",
    exampleUsage: `
<FaqCardCategories
  heading="Frequently asked questions"
  categories={[
    { title: "General", items: [{ id: "1", question: "What is this?", answer: "..." }] },
    { title: "Billing", items: [{ id: "2", question: "How do I pay?", answer: "..." }] }
  ]}
/>
    `.trim(),
  },

  "faq-icon-benefits": {
    id: "faq-icon-benefits",
    name: "Icon Benefits Grid",
    description:
      "A benefits-focused section displaying feature cards with icons in a responsive grid. Each card features a circular icon container, title, and description. While not a traditional FAQ, it answers 'why choose us' questions through benefit highlights. Ideal for feature showcases or value propositions.",
    semanticTags: [
      "faq",
      "benefits",
      "features",
      "icons",
      "grid",
      "cards",
      "why-choose-us",
      "value-proposition",
      "showcase",
    ],
    category: "faq",
    component: FaqIconBenefits,
    props: "FaqIconBenefitsProps",
    exampleUsage: `
<FaqIconBenefits
  heading="Why choose us?"
  description="Discover the benefits of using our platform."
  benefits={[
    { icon: "zap", iconPrefix: "lucide", title: "Fast Performance", description: "Optimized for speed..." }
  ]}
/>
    `.trim(),
  },

  "faq-rounded-cards": {
    id: "faq-rounded-cards",
    name: "Rounded Cards FAQ",
    description:
      "A polished FAQ section with accordion items displayed as rounded cards within a muted container. The rounded styling and layered card design create a modern, friendly appearance. The container provides visual grouping while individual cards maintain clear separation.",
    semanticTags: [
      "faq",
      "questions",
      "answers",
      "accordion",
      "cards",
      "rounded",
      "modern",
      "friendly",
      "polished",
      "container",
    ],
    category: "faq",
    component: FaqRoundedCards,
    props: "FaqRoundedCardsProps",
    exampleUsage: `
<FaqRoundedCards
  heading="Frequently asked questions"
  description="Find answers to common questions."
  items={[
    { id: "1", question: "What is your return policy?", answer: "We offer a 30-day return policy..." }
  ]}
/>
    `.trim(),
  },

  "faq-profile-sidebar": {
    id: "faq-profile-sidebar",
    name: "Profile Sidebar FAQ",
    description:
      "A two-column FAQ layout with a sticky sidebar featuring a support representative profile, contact information, and CTA button. The personal touch of showing a team member builds trust while providing easy access to support. Perfect for customer-focused businesses wanting to humanize their help section.",
    semanticTags: [
      "faq",
      "questions",
      "answers",
      "accordion",
      "sidebar",
      "profile",
      "support",
      "contact",
      "personal",
      "trust",
      "human",
    ],
    category: "faq",
    component: FaqProfileSidebar,
    props: "FaqProfileSidebarProps",
    exampleUsage: `
<FaqProfileSidebar
  heading="Frequently asked questions"
  profileImage="/images/support-rep.jpg"
  profileName="Sarah Johnson"
  profileRole="Customer Success Manager"
  contactButtonText="Contact Support"
  contactButtonUrl="/contact"
/>
    `.trim(),
  },

  // Hero components
  "hero-badge-image-split": {
    id: "hero-badge-image-split",
    name: "Badge Image Split Hero",
    description: "A split-layout hero section with a badge, headline, description, and CTA buttons on the left, and a large featured image on the right. Includes a logo bar showing trusted companies. Perfect for SaaS products and business landing pages.",
    semanticTags: ["hero", "landing", "split", "badge", "image", "cta", "logos", "trust", "saas", "business"],
    category: "hero",
    component: HeroBadgeImageSplit,
    props: "HeroBadgeImageSplitProps",
    exampleUsage: `<HeroBadgeImageSplit />`.trim(),
  },

  "hero-image-left-content": {
    id: "hero-image-left-content",
    name: "Image Left Content Hero",
    description: "A hero section with a large image on the left and content on the right, featuring headline, description, and CTA buttons. Great for showcasing products or services with visual emphasis.",
    semanticTags: ["hero", "landing", "split", "image", "content", "cta", "product", "visual"],
    category: "hero",
    component: HeroImageLeftContent,
    props: "HeroImageLeftContentProps",
    exampleUsage: `<HeroImageLeftContent />`.trim(),
  },

  "hero-centered-image-grid": {
    id: "hero-centered-image-grid",
    name: "Centered Image Grid Hero",
    description: "A centered hero section with headline and description above a grid of images. Ideal for portfolios, galleries, or showcasing multiple products or team members.",
    semanticTags: ["hero", "centered", "grid", "images", "gallery", "portfolio", "showcase"],
    category: "hero",
    component: HeroCenteredImageGrid,
    props: "HeroCenteredImageGridProps",
    exampleUsage: `<HeroCenteredImageGrid />`.trim(),
  },

  "hero-centered-screenshot": {
    id: "hero-centered-screenshot",
    name: "Centered Screenshot Hero",
    description: "A centered hero with headline, description, and CTA buttons above a large product screenshot. Perfect for SaaS products, apps, and software landing pages.",
    semanticTags: ["hero", "centered", "screenshot", "product", "saas", "app", "software", "demo"],
    category: "hero",
    component: HeroCenteredScreenshot,
    props: "HeroCenteredScreenshotProps",
    exampleUsage: `<HeroCenteredScreenshot />`.trim(),
  },

  "hero-pattern-badge-logos": {
    id: "hero-pattern-badge-logos",
    name: "Pattern Badge Logos Hero",
    description: "A hero section with a decorative background pattern, badge, headline, and a row of trusted company logos. Great for establishing credibility and trust.",
    semanticTags: ["hero", "pattern", "badge", "logos", "trust", "credibility", "companies", "partners"],
    category: "hero",
    component: HeroPatternBadgeLogos,
    props: "HeroPatternBadgeLogosProps",
    exampleUsage: `<HeroPatternBadgeLogos />`.trim(),
  },

  "hero-logo-centered-screenshot": {
    id: "hero-logo-centered-screenshot",
    name: "Logo Centered Screenshot Hero",
    description: "A centered hero featuring a logo, headline, description, and a large centered screenshot. Includes trusted company logos below. Ideal for product launches.",
    semanticTags: ["hero", "logo", "centered", "screenshot", "product", "launch", "trust", "logos"],
    category: "hero",
    component: HeroLogoCenteredScreenshot,
    props: "HeroLogoCenteredScreenshotProps",
    exampleUsage: `<HeroLogoCenteredScreenshot />`.trim(),
  },

  "hero-pattern-logo-tech-stack": {
    id: "hero-pattern-logo-tech-stack",
    name: "Pattern Logo Tech Stack Hero",
    description: "A hero section with a background pattern, logo, headline, and a visual display of technology stack icons. Perfect for developer tools and technical products.",
    semanticTags: ["hero", "pattern", "logo", "tech", "stack", "developer", "tools", "technical", "icons"],
    category: "hero",
    component: HeroPatternLogoTechStack,
    props: "HeroPatternLogoTechStackProps",
    exampleUsage: `<HeroPatternLogoTechStack />`.trim(),
  },

  "hero-announcement-badge": {
    id: "hero-announcement-badge",
    name: "Announcement Badge Hero",
    description: "A hero section featuring an announcement badge at the top, followed by headline, description, and CTA buttons. Great for product launches and announcements.",
    semanticTags: ["hero", "announcement", "badge", "launch", "news", "update", "cta"],
    category: "hero",
    component: HeroAnnouncementBadge,
    props: "HeroAnnouncementBadgeProps",
    exampleUsage: `<HeroAnnouncementBadge />`.trim(),
  },

  "hero-tech-carousel": {
    id: "hero-tech-carousel",
    name: "Tech Carousel Hero",
    description: "A hero section with a carousel of technology logos or partner brands. Features headline, description, and auto-scrolling logo carousel. Perfect for showcasing integrations.",
    semanticTags: ["hero", "carousel", "tech", "logos", "partners", "integrations", "brands", "auto-scroll"],
    category: "hero",
    component: HeroTechCarousel,
    props: "HeroTechCarouselProps",
    exampleUsage: `<HeroTechCarousel />`.trim(),
  },

  "hero-simple-centered-image": {
    id: "hero-simple-centered-image",
    name: "Simple Centered Image Hero",
    description: "A minimal centered hero with headline, description, CTA buttons, and a single featured image below. Clean and straightforward design for any landing page.",
    semanticTags: ["hero", "simple", "centered", "image", "minimal", "clean", "landing"],
    category: "hero",
    component: HeroSimpleCenteredImage,
    props: "HeroSimpleCenteredImageProps",
    exampleUsage: `<HeroSimpleCenteredImage />`.trim(),
  },

  "hero-platform-features-grid": {
    id: "hero-platform-features-grid",
    name: "Platform Features Grid Hero",
    description: "A hero section showcasing platform features in a grid layout with icons and descriptions. Includes headline and CTA. Perfect for feature-rich products.",
    semanticTags: ["hero", "platform", "features", "grid", "icons", "product", "showcase"],
    category: "hero",
    component: HeroPlatformFeaturesGrid,
    props: "HeroPlatformFeaturesGridProps",
    exampleUsage: `<HeroPlatformFeaturesGrid />`.trim(),
  },

  "hero-spiral-pattern-cards": {
    id: "hero-spiral-pattern-cards",
    name: "Spiral Pattern Cards Hero",
    description: "A creative hero with a spiral background pattern and floating feature cards. Unique visual design for creative agencies and innovative products.",
    semanticTags: ["hero", "spiral", "pattern", "cards", "creative", "innovative", "visual", "agency"],
    category: "hero",
    component: HeroSpiralPatternCards,
    props: "HeroSpiralPatternCardsProps",
    exampleUsage: `<HeroSpiralPatternCards />`.trim(),
  },

  "hero-split-spiral-shapes": {
    id: "hero-split-spiral-shapes",
    name: "Split Spiral Shapes Hero",
    description: "A split-layout hero with content on one side and decorative spiral shapes on the other. Artistic and modern design for creative businesses.",
    semanticTags: ["hero", "split", "spiral", "shapes", "artistic", "modern", "creative", "design"],
    category: "hero",
    component: HeroSplitSpiralShapes,
    props: "HeroSplitSpiralShapesProps",
    exampleUsage: `<HeroSplitSpiralShapes />`.trim(),
  },

  "hero-split-geometric-shapes": {
    id: "hero-split-geometric-shapes",
    name: "Split Geometric Shapes Hero",
    description: "A split-layout hero featuring geometric shapes and patterns alongside content. Modern and professional design for tech companies.",
    semanticTags: ["hero", "split", "geometric", "shapes", "modern", "professional", "tech", "patterns"],
    category: "hero",
    component: HeroSplitGeometricShapes,
    props: "HeroSplitGeometricShapesProps",
    exampleUsage: `<HeroSplitGeometricShapes />`.trim(),
  },

  "hero-community-survey-cta": {
    id: "hero-community-survey-cta",
    name: "Community Survey CTA Hero",
    description: "A hero section focused on community engagement with a survey or feedback CTA. Includes headline, description, and prominent call-to-action for user participation.",
    semanticTags: ["hero", "community", "survey", "feedback", "engagement", "cta", "participation"],
    category: "hero",
    component: HeroCommunitySurveyCta,
    props: "HeroCommunitySurveyCtaProps",
    exampleUsage: `<HeroCommunitySurveyCta />`.trim(),
  },

  "hero-marketplace-scattered-images": {
    id: "hero-marketplace-scattered-images",
    name: "Marketplace Scattered Images Hero",
    description: "A hero section with scattered product images creating a marketplace feel. Dynamic layout showcasing multiple items or categories.",
    semanticTags: ["hero", "marketplace", "scattered", "images", "products", "dynamic", "ecommerce", "shop"],
    category: "hero",
    component: HeroMarketplaceScatteredImages,
    props: "HeroMarketplaceScatteredImagesProps",
    exampleUsage: `<HeroMarketplaceScatteredImages />`.trim(),
  },

  "hero-badge-shadow-overlay": {
    id: "hero-badge-shadow-overlay",
    name: "Badge Shadow Overlay Hero",
    description: "A hero with a badge, headline, and content overlaid on a shadowed background image. Creates depth and visual interest for impactful landing pages.",
    semanticTags: ["hero", "badge", "shadow", "overlay", "background", "depth", "impactful", "landing"],
    category: "hero",
    component: HeroBadgeShadowOverlay,
    props: "HeroBadgeShadowOverlayProps",
    exampleUsage: `<HeroBadgeShadowOverlay />`.trim(),
  },

  "hero-video-background-dark": {
    id: "hero-video-background-dark",
    name: "Video Background Dark Hero",
    description: "A dark-themed hero with a video background, headline, and CTA buttons. Creates an immersive experience for media-rich landing pages.",
    semanticTags: ["hero", "video", "background", "dark", "immersive", "media", "cinematic", "landing"],
    category: "hero",
    component: HeroVideoBackgroundDark,
    props: "HeroVideoBackgroundDarkProps",
    exampleUsage: `<HeroVideoBackgroundDark />`.trim(),
  },

  "hero-grid-pattern-efficiency": {
    id: "hero-grid-pattern-efficiency",
    name: "Grid Pattern Efficiency Hero",
    description: "A hero section with a grid pattern background emphasizing efficiency and productivity. Clean design for business and productivity tools.",
    semanticTags: ["hero", "grid", "pattern", "efficiency", "productivity", "business", "tools", "clean"],
    category: "hero",
    component: HeroGridPatternEfficiency,
    props: "HeroGridPatternEfficiencyProps",
    exampleUsage: `<HeroGridPatternEfficiency />`.trim(),
  },

  "hero-dashed-border-features": {
    id: "hero-dashed-border-features",
    name: "Dashed Border Features Hero",
    description: "A hero with dashed border decorations and feature highlights. Unique visual style that draws attention to key features.",
    semanticTags: ["hero", "dashed", "border", "features", "unique", "decorative", "highlights"],
    category: "hero",
    component: HeroDashedBorderFeatures,
    props: "HeroDashedBorderFeaturesProps",
    exampleUsage: `<HeroDashedBorderFeatures />`.trim(),
  },

  "hero-design-carousel-portfolio": {
    id: "hero-design-carousel-portfolio",
    name: "Design Carousel Portfolio Hero",
    description: "A portfolio-style hero with a carousel showcasing design work or projects. Perfect for creative agencies and designers.",
    semanticTags: ["hero", "design", "carousel", "portfolio", "creative", "agency", "projects", "showcase"],
    category: "hero",
    component: HeroDesignCarouselPortfolio,
    props: "HeroDesignCarouselPortfolioProps",
    exampleUsage: `<HeroDesignCarouselPortfolio />`.trim(),
  },

  "hero-gradient-client-focused": {
    id: "hero-gradient-client-focused",
    name: "Gradient Client Focused Hero",
    description: "A hero with gradient background focused on client success stories or testimonials. Builds trust through social proof.",
    semanticTags: ["hero", "gradient", "client", "focused", "testimonials", "trust", "social-proof", "success"],
    category: "hero",
    component: HeroGradientClientFocused,
    props: "HeroGradientClientFocusedProps",
    exampleUsage: `<HeroGradientClientFocused />`.trim(),
  },

  "hero-premium-split-avatars": {
    id: "hero-premium-split-avatars",
    name: "Premium Split Avatars Hero",
    description: "A premium split-layout hero featuring user avatars and social proof. Shows real users to build credibility and trust.",
    semanticTags: ["hero", "premium", "split", "avatars", "social-proof", "users", "credibility", "trust"],
    category: "hero",
    component: HeroPremiumSplitAvatars,
    props: "HeroPremiumSplitAvatarsProps",
    exampleUsage: `<HeroPremiumSplitAvatars />`.trim(),
  },

  "hero-ui-library-showcase": {
    id: "hero-ui-library-showcase",
    name: "UI Library Showcase Hero",
    description: "A hero designed to showcase UI components or design systems. Features component previews and documentation links.",
    semanticTags: ["hero", "ui", "library", "showcase", "components", "design-system", "documentation", "developer"],
    category: "hero",
    component: HeroUiLibraryShowcase,
    props: "HeroUiLibraryShowcaseProps",
    exampleUsage: `<HeroUiLibraryShowcase />`.trim(),
  },

  "hero-fullscreen-background-image": {
    id: "hero-fullscreen-background-image",
    name: "Fullscreen Background Image Hero",
    description: "A fullscreen hero with a background image, overlay, and centered content. Creates an immersive first impression.",
    semanticTags: ["hero", "fullscreen", "background", "image", "overlay", "immersive", "impactful", "landing"],
    category: "hero",
    component: HeroFullscreenBackgroundImage,
    props: "HeroFullscreenBackgroundImageProps",
    exampleUsage: `<HeroFullscreenBackgroundImage />`.trim(),
  },

  "hero-fullscreen-logo-cta": {
    id: "hero-fullscreen-logo-cta",
    name: "Fullscreen Logo CTA Hero",
    description: "A fullscreen hero featuring a prominent logo and call-to-action. Minimal and focused design for brand-centric landing pages.",
    semanticTags: ["hero", "fullscreen", "logo", "cta", "minimal", "brand", "focused", "landing"],
    category: "hero",
    component: HeroFullscreenLogoCta,
    props: "HeroFullscreenLogoCtaProps",
    exampleUsage: `<HeroFullscreenLogoCta />`.trim(),
  },

  "hero-gradient-avatars-rating": {
    id: "hero-gradient-avatars-rating",
    name: "Gradient Avatars Rating Hero",
    description: "A hero with gradient background, user avatars, and star ratings. Combines visual appeal with social proof elements.",
    semanticTags: ["hero", "gradient", "avatars", "rating", "stars", "social-proof", "reviews", "trust"],
    category: "hero",
    component: HeroGradientAvatarsRating,
    props: "HeroGradientAvatarsRatingProps",
    exampleUsage: `<HeroGradientAvatarsRating />`.trim(),
  },

  "hero-task-timer-animated": {
    id: "hero-task-timer-animated",
    name: "Task Timer Animated Hero",
    description: "An animated hero featuring a task timer or countdown element. Dynamic and engaging for productivity apps.",
    semanticTags: ["hero", "task", "timer", "animated", "countdown", "productivity", "dynamic", "engaging"],
    category: "hero",
    component: HeroTaskTimerAnimated,
    props: "HeroTaskTimerAnimatedProps",
    exampleUsage: `<HeroTaskTimerAnimated />`.trim(),
  },

  "hero-ai-powered-carousel": {
    id: "hero-ai-powered-carousel",
    name: "AI Powered Carousel Hero",
    description: "A hero showcasing AI-powered features with a carousel of capabilities. Perfect for AI products and machine learning tools.",
    semanticTags: ["hero", "ai", "powered", "carousel", "machine-learning", "features", "technology", "innovation"],
    category: "hero",
    component: HeroAiPoweredCarousel,
    props: "HeroAiPoweredCarouselProps",
    exampleUsage: `<HeroAiPoweredCarousel />`.trim(),
  },

  "hero-ad-campaign-expert": {
    id: "hero-ad-campaign-expert",
    name: "Ad Campaign Expert Hero",
    description: "A hero designed for advertising and marketing services. Features campaign metrics and expert positioning.",
    semanticTags: ["hero", "ad", "campaign", "marketing", "advertising", "expert", "metrics", "agency"],
    category: "hero",
    component: HeroAdCampaignExpert,
    props: "HeroAdCampaignExpertProps",
    exampleUsage: `<HeroAdCampaignExpert />`.trim(),
  },

  "hero-adaptable-product-grid": {
    id: "hero-adaptable-product-grid",
    name: "Adaptable Product Grid Hero",
    description: "A flexible hero with an adaptable product grid layout. Showcases multiple products or features in a responsive grid.",
    semanticTags: ["hero", "adaptable", "product", "grid", "flexible", "responsive", "showcase", "features"],
    category: "hero",
    component: HeroAdaptableProductGrid,
    props: "HeroAdaptableProductGridProps",
    exampleUsage: `<HeroAdaptableProductGrid />`.trim(),
  },

  "hero-presentation-platform-video": {
    id: "hero-presentation-platform-video",
    name: "Presentation Platform Video Hero",
    description: "A split-layout hero with video content on the right and presentation platform messaging on the left. Ideal for video conferencing and presentation tools.",
    semanticTags: ["hero", "presentation", "platform", "video", "split", "conferencing", "tools", "communication"],
    category: "hero",
    component: HeroPresentationPlatformVideo,
    props: "HeroPresentationPlatformVideoProps",
    exampleUsage: `<HeroPresentationPlatformVideo />`.trim(),
  },

  "hero-grid-pattern-solutions": {
    id: "hero-grid-pattern-solutions",
    name: "Grid Pattern Solutions Hero",
    description: "A hero with grid pattern background and centered content showcasing business solutions. Professional design for B2B services.",
    semanticTags: ["hero", "grid", "pattern", "solutions", "business", "b2b", "professional", "services"],
    category: "hero",
    component: HeroGridPatternSolutions,
    props: "HeroGridPatternSolutionsProps",
    exampleUsage: `<HeroGridPatternSolutions />`.trim(),
  },

  "hero-crm-streamlined": {
    id: "hero-crm-streamlined",
    name: "CRM Streamlined Hero",
    description: "A streamlined hero for CRM and sales tools. Features split layout with product image and CRM-focused messaging.",
    semanticTags: ["hero", "crm", "streamlined", "sales", "tools", "split", "product", "business"],
    category: "hero",
    component: HeroCrmStreamlined,
    props: "HeroCrmStreamlinedProps",
    exampleUsage: `<HeroCrmStreamlined />`.trim(),
  },

  "hero-billing-platform-logos": {
    id: "hero-billing-platform-logos",
    name: "Billing Platform Logos Hero",
    description: "A hero for billing and payment platforms featuring trusted company logos in a carousel. Builds trust for fintech products.",
    semanticTags: ["hero", "billing", "platform", "logos", "payment", "fintech", "trust", "carousel"],
    category: "hero",
    component: HeroBillingPlatformLogos,
    props: "HeroBillingPlatformLogosProps",
    exampleUsage: `<HeroBillingPlatformLogos />`.trim(),
  },

  "hero-software-growth-video-dialog": {
    id: "hero-software-growth-video-dialog",
    name: "Software Growth Video Dialog Hero",
    description: "A hero focused on software growth with a video dialog modal. Features scattered images and growth-focused messaging.",
    semanticTags: ["hero", "software", "growth", "video", "dialog", "modal", "saas", "startup"],
    category: "hero",
    component: HeroSoftwareGrowthVideoDialog,
    props: "HeroSoftwareGrowthVideoDialogProps",
    exampleUsage: `<HeroSoftwareGrowthVideoDialog />`.trim(),
  },

  "hero-conversion-video-play": {
    id: "hero-conversion-video-play",
    name: "Conversion Video Play Hero",
    description: "A conversion-focused hero with a prominent video play button and brand logos. Designed to drive engagement and conversions.",
    semanticTags: ["hero", "conversion", "video", "play", "engagement", "logos", "cta", "marketing"],
    category: "hero",
    component: HeroConversionVideoPlay,
    props: "HeroConversionVideoPlayProps",
    exampleUsage: `<HeroConversionVideoPlay />`.trim(),
  },

  "hero-design-showcase-logos": {
    id: "hero-design-showcase-logos",
    name: "Design Showcase Logos Hero",
    description: "A hero showcasing design work with trusted design team logos. Perfect for design agencies and creative studios.",
    semanticTags: ["hero", "design", "showcase", "logos", "agency", "creative", "studio", "portfolio"],
    category: "hero",
    component: HeroDesignShowcaseLogos,
    props: "HeroDesignShowcaseLogosProps",
    exampleUsage: `<HeroDesignShowcaseLogos />`.trim(),
  },

  "hero-video-overlay-stars": {
    id: "hero-video-overlay-stars",
    name: "Video Overlay Stars Hero",
    description: "A hero with video overlay, star rating, and testimonial. Combines video content with social proof elements.",
    semanticTags: ["hero", "video", "overlay", "stars", "rating", "testimonial", "social-proof", "reviews"],
    category: "hero",
    component: HeroVideoOverlayStars,
    props: "HeroVideoOverlayStarsProps",
    exampleUsage: `<HeroVideoOverlayStars />`.trim(),
  },

  "hero-productivity-launcher-video": {
    id: "hero-productivity-launcher-video",
    name: "Productivity Launcher Video Hero",
    description: "A hero for productivity apps with video background and download buttons. Features app store badges and launcher-style design.",
    semanticTags: ["hero", "productivity", "launcher", "video", "download", "app", "mobile", "desktop"],
    category: "hero",
    component: HeroProductivityLauncherVideo,
    props: "HeroProductivityLauncherVideoProps",
    exampleUsage: `<HeroProductivityLauncherVideo />`.trim(),
  },

  "hero-hiring-animated-text": {
    id: "hero-hiring-animated-text",
    name: "Hiring Animated Text Hero",
    description: "A hero for hiring platforms with animated rotating text. Dynamic design that showcases different job roles or skills.",
    semanticTags: ["hero", "hiring", "animated", "text", "jobs", "recruitment", "careers", "dynamic"],
    category: "hero",
    component: HeroHiringAnimatedText,
    props: "HeroHiringAnimatedTextProps",
    exampleUsage: `<HeroHiringAnimatedText />`.trim(),
  },

  "hero-split-image-newsletter": {
    id: "hero-split-image-newsletter",
    name: "Split Image Newsletter Hero",
    description: "A split-layout hero with image and newsletter signup form. Perfect for content creators and newsletter-focused businesses.",
    semanticTags: ["hero", "split", "image", "newsletter", "signup", "email", "content", "subscription"],
    category: "hero",
    component: HeroSplitImageNewsletter,
    props: "HeroSplitImageNewsletterProps",
    exampleUsage: `<HeroSplitImageNewsletter />`.trim(),
  },

  "hero-centered-gradient-cta": {
    id: "hero-centered-gradient-cta",
    name: "Centered Gradient CTA Hero",
    description: "A centered hero with gradient background and prominent CTA. Features highlight badges and feature callouts.",
    semanticTags: ["hero", "centered", "gradient", "cta", "features", "highlights", "modern", "vibrant"],
    category: "hero",
    component: HeroCenteredGradientCta,
    props: "HeroCenteredGradientCtaProps",
    exampleUsage: `<HeroCenteredGradientCta />`.trim(),
  },

  "hero-stats-social-proof": {
    id: "hero-stats-social-proof",
    name: "Stats Social Proof Hero",
    description: "A hero featuring prominent statistics and social proof elements. Includes dashboard image and key metrics display.",
    semanticTags: ["hero", "stats", "social-proof", "metrics", "dashboard", "numbers", "credibility", "data"],
    category: "hero",
    component: HeroStatsSocialProof,
    props: "HeroStatsSocialProofProps",
    exampleUsage: `<HeroStatsSocialProof />`.trim(),
  },

  "hero-feature-cards-grid": {
    id: "hero-feature-cards-grid",
    name: "Feature Cards Grid Hero",
    description: "A hero with feature cards arranged in a grid layout. Each card has an icon and description for key features.",
    semanticTags: ["hero", "feature", "cards", "grid", "icons", "benefits", "showcase", "product"],
    category: "hero",
    component: HeroFeatureCardsGrid,
    props: "HeroFeatureCardsGridProps",
    exampleUsage: `<HeroFeatureCardsGrid />`.trim(),
  },

  "hero-testimonial-image-grid": {
    id: "hero-testimonial-image-grid",
    name: "Testimonial Image Grid Hero",
    description: "A hero combining testimonials with an image grid layout. Shows customer feedback alongside visual content.",
    semanticTags: ["hero", "testimonial", "image", "grid", "reviews", "customers", "feedback", "social-proof"],
    category: "hero",
    component: HeroTestimonialImageGrid,
    props: "HeroTestimonialImageGridProps",
    exampleUsage: `<HeroTestimonialImageGrid />`.trim(),
  },

  "hero-design-system-3d": {
    id: "hero-design-system-3d",
    name: "Design System 3D Hero",
    description: "A hero showcasing design systems with 3D perspective images. Modern and innovative design for design tool products.",
    semanticTags: ["hero", "design-system", "3d", "perspective", "modern", "innovative", "tools", "creative"],
    category: "hero",
    component: HeroDesignSystem3d,
    props: "HeroDesignSystem3dProps",
    exampleUsage: `<HeroDesignSystem3d />`.trim(),
  },

  "hero-architecture-fullscreen": {
    id: "hero-architecture-fullscreen",
    name: "Architecture Fullscreen Hero",
    description: "A fullscreen hero with architecture or real estate imagery. Features overlay content for property or construction businesses.",
    semanticTags: ["hero", "architecture", "fullscreen", "real-estate", "property", "construction", "overlay", "immersive"],
    category: "hero",
    component: HeroArchitectureFullscreen,
    props: "HeroArchitectureFullscreenProps",
    exampleUsage: `<HeroArchitectureFullscreen />`.trim(),
  },

  "hero-innovation-image-grid": {
    id: "hero-innovation-image-grid",
    name: "Innovation Image Grid Hero",
    description: "A hero focused on innovation with an image grid layout. Showcases innovative products or research visually.",
    semanticTags: ["hero", "innovation", "image", "grid", "research", "technology", "showcase", "modern"],
    category: "hero",
    component: HeroInnovationImageGrid,
    props: "HeroInnovationImageGridProps",
    exampleUsage: `<HeroInnovationImageGrid />`.trim(),
  },

  "hero-video-dialog-gradient": {
    id: "hero-video-dialog-gradient",
    name: "Video Dialog Gradient Hero",
    description: "A hero with gradient background and video dialog modal. Combines visual appeal with video content engagement.",
    semanticTags: ["hero", "video", "dialog", "gradient", "modal", "engagement", "media", "modern"],
    category: "hero",
    component: HeroVideoDialogGradient,
    props: "HeroVideoDialogGradientProps",
    exampleUsage: `<HeroVideoDialogGradient />`.trim(),
  },

  "hero-minimal-centered-dark": {
    id: "hero-minimal-centered-dark",
    name: "Minimal Centered Dark Hero",
    description: "A minimal dark-themed centered hero with beta badge. Clean and focused design for product launches.",
    semanticTags: ["hero", "minimal", "centered", "dark", "beta", "launch", "clean", "focused"],
    category: "hero",
    component: HeroMinimalCenteredDark,
    props: "HeroMinimalCenteredDarkProps",
    exampleUsage: `<HeroMinimalCenteredDark />`.trim(),
  },

  "hero-product-showcase-floating": {
    id: "hero-product-showcase-floating",
    name: "Product Showcase Floating Hero",
    description: "A hero with floating stats cards around a product showcase. Dynamic design highlighting key metrics and features.",
    semanticTags: ["hero", "product", "showcase", "floating", "stats", "cards", "metrics", "dynamic"],
    category: "hero",
    component: HeroProductShowcaseFloating,
    props: "HeroProductShowcaseFloatingProps",
    exampleUsage: `<HeroProductShowcaseFloating />`.trim(),
  },

  "hero-saas-dashboard-preview": {
    id: "hero-saas-dashboard-preview",
    name: "SaaS Dashboard Preview Hero",
    description: "A hero featuring a SaaS dashboard preview with email signup. Perfect for software products showing their interface.",
    semanticTags: ["hero", "saas", "dashboard", "preview", "email", "signup", "software", "product"],
    category: "hero",
    component: HeroSaasDashboardPreview,
    props: "HeroSaasDashboardPreviewProps",
    exampleUsage: `<HeroSaasDashboardPreview />`.trim(),
  },

  "hero-therapy-testimonial-grid": {
    id: "hero-therapy-testimonial-grid",
    name: "Therapy Testimonial Grid Hero",
    description: "A hero for therapy and wellness services with testimonial grid. Features calming design and client feedback.",
    semanticTags: ["hero", "therapy", "testimonial", "grid", "wellness", "health", "mental-health", "calming"],
    category: "hero",
    component: HeroTherapyTestimonialGrid,
    props: "HeroTherapyTestimonialGridProps",
    exampleUsage: `<HeroTherapyTestimonialGrid />`.trim(),
  },

  "hero-mental-health-team": {
    id: "hero-mental-health-team",
    name: "Mental Health Team Hero",
    description: "A dark-themed hero showcasing mental health professionals. Features team images and supportive messaging.",
    semanticTags: ["hero", "mental-health", "team", "professionals", "dark", "support", "wellness", "healthcare"],
    category: "hero",
    component: HeroMentalHealthTeam,
    props: "HeroMentalHealthTeamProps",
    exampleUsage: `<HeroMentalHealthTeam />`.trim(),
  },

  "hero-mentorship-video-split": {
    id: "hero-mentorship-video-split",
    name: "Mentorship Video Split Hero",
    description: "A split-layout hero for mentorship platforms with video preview. Features career growth messaging and video CTA.",
    semanticTags: ["hero", "mentorship", "video", "split", "career", "growth", "education", "coaching"],
    category: "hero",
    component: HeroMentorshipVideoSplit,
    props: "HeroMentorshipVideoSplitProps",
    exampleUsage: `<HeroMentorshipVideoSplit />`.trim(),
  },

  "hero-business-operations-mosaic": {
    id: "hero-business-operations-mosaic",
    name: "Business Operations Mosaic Hero",
    description: "A hero with mosaic image layout for business operations. Features asymmetric grid and professional messaging.",
    semanticTags: ["hero", "business", "operations", "mosaic", "grid", "professional", "agency", "corporate"],
    category: "hero",
    component: HeroBusinessOperationsMosaic,
    props: "HeroBusinessOperationsMosaicProps",
    exampleUsage: `<HeroBusinessOperationsMosaic />`.trim(),
  },

  "hero-agency-animated-images": {
    id: "hero-agency-animated-images",
    name: "Agency Animated Images Hero",
    description: "A hero for agencies with animated image transitions. Dynamic visual design showcasing creative work.",
    semanticTags: ["hero", "agency", "animated", "images", "creative", "dynamic", "transitions", "portfolio"],
    category: "hero",
    component: HeroAgencyAnimatedImages,
    props: "HeroAgencyAnimatedImagesProps",
    exampleUsage: `<HeroAgencyAnimatedImages />`.trim(),
  },

  "hero-welcome-asymmetric-images": {
    id: "hero-welcome-asymmetric-images",
    name: "Welcome Asymmetric Images Hero",
    description: "A welcoming hero with asymmetric image layout. Features staggered images and friendly messaging.",
    semanticTags: ["hero", "welcome", "asymmetric", "images", "friendly", "staggered", "modern", "landing"],
    category: "hero",
    component: HeroWelcomeAsymmetricImages,
    props: "HeroWelcomeAsymmetricImagesProps",
    exampleUsage: `<HeroWelcomeAsymmetricImages />`.trim(),
  },

  "hero-startup-launch-cta": {
    id: "hero-startup-launch-cta",
    name: "Startup Launch CTA Hero",
    description: "A hero designed for startup launches with prominent CTA. Features launch badge, user avatars, and growth messaging.",
    semanticTags: ["hero", "startup", "launch", "cta", "badge", "avatars", "growth", "funding"],
    category: "hero",
    component: HeroStartupLaunchCta,
    props: "HeroStartupLaunchCtaProps",
    exampleUsage: `<HeroStartupLaunchCta />`.trim(),
  },

  "hero-enterprise-security": {
    id: "hero-enterprise-security",
    name: "Enterprise Security Hero",
    description: "A hero focused on enterprise security features. Includes security badges, feature cards, and trust logos.",
    semanticTags: ["hero", "enterprise", "security", "features", "trust", "compliance", "badges", "b2b"],
    category: "hero",
    component: HeroEnterpriseSecurity,
    props: "HeroEnterpriseSecurityProps",
    exampleUsage: `<HeroEnterpriseSecurity />`.trim(),
  },

  "hero-creative-studio-stacked": {
    id: "hero-creative-studio-stacked",
    name: "Creative Studio Stacked Hero",
    description: "A hero for creative studios with stacked image layout. Features video CTA and design-focused messaging.",
    semanticTags: ["hero", "creative", "studio", "stacked", "images", "video", "design", "agency"],
    category: "hero",
    component: HeroCreativeStudioStacked,
    props: "HeroCreativeStudioStackedProps",
    exampleUsage: `<HeroCreativeStudioStacked />`.trim(),
  },

  "hero-digital-agency-fullscreen": {
    id: "hero-digital-agency-fullscreen",
    name: "Digital Agency Fullscreen Hero",
    description: "A fullscreen hero for digital agencies with background image. Features location info and scroll indicator.",
    semanticTags: ["hero", "digital", "agency", "fullscreen", "background", "location", "immersive", "creative"],
    category: "hero",
    component: HeroDigitalAgencyFullscreen,
    props: "HeroDigitalAgencyFullscreenProps",
    exampleUsage: `<HeroDigitalAgencyFullscreen />`.trim(),
  },

  "hero-customer-support-layered": {
    id: "hero-customer-support-layered",
    name: "Customer Support Layered Hero",
    description: "A hero for customer support platforms with layered image design. Features support messaging and dashboard previews.",
    semanticTags: ["hero", "customer", "support", "layered", "helpdesk", "service", "dashboard", "saas"],
    category: "hero",
    component: HeroCustomerSupportLayered,
    props: "HeroCustomerSupportLayeredProps",
    exampleUsage: `<HeroCustomerSupportLayered />`.trim(),
  },

  "hero-shared-inbox-layered": {
    id: "hero-shared-inbox-layered",
    name: "Shared Inbox Layered Hero",
    description: "A hero for shared inbox and email tools with layered screenshots. Features inbox organization messaging.",
    semanticTags: ["hero", "shared", "inbox", "layered", "email", "collaboration", "team", "communication"],
    category: "hero",
    component: HeroSharedInboxLayered,
    props: "HeroSharedInboxLayeredProps",
    exampleUsage: `<HeroSharedInboxLayered />`.trim(),
  },

  "hero-conversation-intelligence": {
    id: "hero-conversation-intelligence",
    name: "Conversation Intelligence Hero",
    description: "A hero for conversation intelligence and sales tools. Features gradient background and centered screenshot.",
    semanticTags: ["hero", "conversation", "intelligence", "sales", "ai", "analytics", "gradient", "saas"],
    category: "hero",
    component: HeroConversationIntelligence,
    props: "HeroConversationIntelligenceProps",
    exampleUsage: `<HeroConversationIntelligence />`.trim(),
  },

  "hero-business-carousel-dots": {
    id: "hero-business-carousel-dots",
    name: "Business Carousel Dots Hero",
    description: "A business hero with image carousel and dot navigation. Features premium badge and professional messaging.",
    semanticTags: ["hero", "business", "carousel", "dots", "navigation", "premium", "professional", "enterprise"],
    category: "hero",
    component: HeroBusinessCarouselDots,
    props: "HeroBusinessCarouselDotsProps",
    exampleUsage: `<HeroBusinessCarouselDots />`.trim(),
  },

  "hero-developer-tools-code": {
    id: "hero-developer-tools-code",
    name: "Developer Tools Code Hero",
    description: "A hero for developer tools featuring a terminal/code preview. Shows CLI commands and developer-focused messaging.",
    semanticTags: ["hero", "developer", "tools", "code", "terminal", "cli", "programming", "technical"],
    category: "hero",
    component: HeroDeveloperToolsCode,
    props: "HeroDeveloperToolsCodeProps",
    exampleUsage: `<HeroDeveloperToolsCode />`.trim(),
  },

  "hero-ecommerce-product-showcase": {
    id: "hero-ecommerce-product-showcase",
    name: "Ecommerce Product Showcase Hero",
    description: "A hero for ecommerce with product image grid. Features new collection badge and shopping statistics.",
    semanticTags: ["hero", "ecommerce", "product", "showcase", "shopping", "retail", "collection", "store"],
    category: "hero",
    component: HeroEcommerceProductShowcase,
    props: "HeroEcommerceProductShowcaseProps",
    exampleUsage: `<HeroEcommerceProductShowcase />`.trim(),
  },

  "hero-mobile-app-download": {
    id: "hero-mobile-app-download",
    name: "Mobile App Download Hero",
    description: "A hero for mobile apps with download buttons. Features app store badges, phone mockup, and ratings.",
    semanticTags: ["hero", "mobile", "app", "download", "ios", "android", "phone", "ratings"],
    category: "hero",
    component: HeroMobileAppDownload,
    props: "HeroMobileAppDownloadProps",
    exampleUsage: `<HeroMobileAppDownload />`.trim(),
  },

  "hero-pricing-comparison": {
    id: "hero-pricing-comparison",
    name: "Pricing Comparison Hero",
    description: "A hero featuring pricing tiers comparison. Shows starter, pro, and enterprise plans with feature lists.",
    semanticTags: ["hero", "pricing", "comparison", "plans", "tiers", "subscription", "saas", "features"],
    category: "hero",
    component: HeroPricingComparison,
    props: "HeroPricingComparisonProps",
    exampleUsage: `<HeroPricingComparison />`.trim(),
  },

  "hero-newsletter-minimal": {
    id: "hero-newsletter-minimal",
    name: "Newsletter Minimal Hero",
    description: "A minimal hero focused on newsletter signup. Clean design with email input and subscriber count.",
    semanticTags: ["hero", "newsletter", "minimal", "signup", "email", "subscription", "clean", "focused"],
    category: "hero",
    component: HeroNewsletterMinimal,
    props: "HeroNewsletterMinimalProps",
    exampleUsage: `<HeroNewsletterMinimal />`.trim(),
  },

  "hero-coming-soon-countdown": {
    id: "hero-coming-soon-countdown",
    name: "Coming Soon Countdown Hero",
    description: "A dark-themed hero with countdown timer for launches. Features email signup and social links.",
    semanticTags: ["hero", "coming-soon", "countdown", "launch", "timer", "dark", "teaser", "anticipation"],
    category: "hero",
    component: HeroComingSoonCountdown,
    props: "HeroComingSoonCountdownProps",
    exampleUsage: `<HeroComingSoonCountdown />`.trim(),
  },

  "hero-event-registration": {
    id: "hero-event-registration",
    name: "Event Registration Hero",
    description: "A hero for event registration with date badge. Features speaker count, workshop info, and venue location.",
    semanticTags: ["hero", "event", "registration", "conference", "workshop", "speakers", "venue", "date"],
    category: "hero",
    component: HeroEventRegistration,
    props: "HeroEventRegistrationProps",
    exampleUsage: `<HeroEventRegistration />`.trim(),
  },

  "hero-portfolio-creative": {
    id: "hero-portfolio-creative",
    name: "Portfolio Creative Hero",
    description: "A hero for creative portfolios with profile and project grid. Features social links and personal branding.",
    semanticTags: ["hero", "portfolio", "creative", "profile", "projects", "personal", "designer", "freelancer"],
    category: "hero",
    component: HeroPortfolioCreative,
    props: "HeroPortfolioCreativeProps",
    exampleUsage: `<HeroPortfolioCreative />`.trim(),
  },

  // Case Studies List blocks
  "case-studies-image-grid": {
    id: "case-studies-image-grid",
    name: "Case Studies Image Grid",
    description: "A responsive grid layout displaying case studies with full-bleed background images, company logos, and hover zoom effects. Features a 2-column asymmetric grid where the first and fifth items span 2 rows for visual hierarchy. Each card shows a gradient overlay, company logo at top, and case study title at bottom. Ideal for showcasing client success stories, portfolio highlights, or featured projects with strong visual impact.",
    semanticTags: ["case-studies", "portfolio", "grid", "images", "clients", "success-stories", "projects", "showcase", "hover-effects", "visual"],
    category: "case-studies-list",
    component: CaseStudiesImageGrid,
    props: "CaseStudiesImageGridProps",
    exampleUsage: `<CaseStudiesImageGrid />`.trim(),
  },

  "case-studies-testimonial-stats": {
    id: "case-studies-testimonial-stats",
    name: "Case Studies Testimonial Stats",
    description: "A split-layout component displaying customer testimonials alongside key metrics. Features customer photo and quote on the left, and performance statistics on the right. Each testimonial includes author details with company logo. Multiple testimonials are separated by horizontal dividers. Ideal for showcasing customer success stories with quantifiable results and social proof metrics.",
    semanticTags: ["case-studies", "testimonials", "stats", "metrics", "quotes", "customers", "social-proof", "results", "success", "roi"],
    category: "case-studies-list",
    component: CaseStudiesTestimonialStats,
    props: "CaseStudiesTestimonialStatsProps",
    exampleUsage: `<CaseStudiesTestimonialStats />`.trim(),
  },

  "case-studies-featured-border": {
    id: "case-studies-featured-border",
    name: "Case Studies Featured Border",
    description: "A bordered card layout with a prominent featured case study and secondary items below. Features a full-width bordered container with dot pattern decorations on the sides. The featured case study shows company logo, tags, title with subtitle, image preview, and a 'Read case study' CTA with arrow icon. Secondary case studies appear in a two-column grid below. Hover states include background color transitions. Ideal for highlighting a primary success story while showcasing additional case studies.",
    semanticTags: ["case-studies", "featured", "border", "cards", "cta", "hover", "dot-pattern", "enterprise", "b2b", "professional"],
    category: "case-studies-list",
    component: CaseStudiesFeaturedBorder,
    props: "CaseStudiesFeaturedBorderProps",
    exampleUsage: `<CaseStudiesFeaturedBorder />`.trim(),
  },

  "case-studies-stats-card": {
    id: "case-studies-stats-card",
    name: "Case Studies Stats Card",
    description: "A single case study card format with company branding, key metrics, author attribution, and call-to-action. Features a two-column layout within a muted background container. The left column shows company logo, key statistics in a row, and author info with avatar. The right column displays the case study title, summary text, and a 'Read Story' button with arrow icon. Ideal for highlighting a featured customer success story with quantifiable results and personal testimonial.",
    semanticTags: ["case-studies", "stats", "card", "metrics", "author", "cta", "featured", "testimonial", "avatar", "single"],
    category: "case-studies-list",
    component: CaseStudiesStatsCard,
    props: "CaseStudiesStatsCardProps",
    exampleUsage: `<CaseStudiesStatsCard />`.trim(),
  },

  // Case Study Detail blocks
  "case-study-prose-sidebar": {
    id: "case-study-prose-sidebar",
    name: "Case Study Prose Sidebar",
    description: "A case study article layout with rich prose content and a sticky sidebar containing company information. Features a two-column design with the main article area on the left (including hero image, headings, paragraphs, blockquotes, lists, and tables using prose styling) and a sidebar on the right with company logo, description, industry, location, company size, website link, and topics. The sidebar uses an accent background with organized sections separated by borders. Ideal for detailed case study pages, customer success stories, or in-depth articles that need supplementary company context alongside the main narrative.",
    semanticTags: ["case-study", "detail", "prose", "sidebar", "article", "company-info", "success-story", "content", "two-column", "sticky"],
    category: "case-study-detail",
    component: CaseStudyProseSidebar,
    props: "CaseStudyProseSidebarProps",
    exampleUsage: `<CaseStudyProseSidebar />`.trim(),
  },

  "case-study-toc-social-sidebar": {
    id: "case-study-toc-social-sidebar",
    name: "Case Study TOC Social Sidebar",
    description: "A comprehensive case study layout with breadcrumb navigation, featured author attribution, sticky sidebar with company details, table of contents navigation, and social sharing links. Features a three-column layout on large screens: left sidebar with company info (overview, sector, team size, location, established, funding, core features) and social links, center content area with problem/approach/outcomes summary followed by prose sections, and right sidebar with sticky table of contents that highlights active section via IntersectionObserver. The header includes breadcrumbs, large title, and author attribution with avatar. Ideal for in-depth case studies, customer success stories, or detailed articles that benefit from structured navigation and comprehensive company context.",
    semanticTags: ["case-study", "detail", "toc", "table-of-contents", "social", "sidebar", "breadcrumbs", "author", "navigation", "comprehensive", "three-column", "sticky"],
    category: "case-study-detail",
    component: CaseStudyTocSocialSidebar,
    props: "CaseStudyTocSocialSidebarProps",
    exampleUsage: `<CaseStudyTocSocialSidebar />`.trim(),
  },

  "case-study-stats-metrics": {
    id: "case-study-stats-metrics",
    name: "Case Study Stats Metrics",
    description: "A results-focused case study layout with prominent performance metrics, breadcrumb navigation, prose content, and a sticky sidebar with company info and CTA. Features a two-column design with the main content area showing breadcrumbs, title, subtitle, hero image, a grid of 4 key statistics with large values and labels, and rich prose content (headings, paragraphs, blockquotes, lists, tables, alerts). The sticky sidebar displays company logo, overview text, sector information, a solution badge with icon, and a call-to-action button. Ideal for ROI-driven case studies that emphasize quantifiable outcomes, customer success stories with measurable impact, or results-focused content marketing.",
    semanticTags: ["case-study", "detail", "stats", "metrics", "results", "roi", "breadcrumbs", "sidebar", "cta", "quantifiable", "performance", "two-column"],
    category: "case-study-detail",
    component: CaseStudyStatsMetrics,
    props: "CaseStudyStatsMetricsProps",
    exampleUsage: `<CaseStudyStatsMetrics />`.trim(),
  },
};

/**
 * Get blocks by semantic tag
 */
export function getBlocksBySemanticTag(tag: string): BlockRegistryEntry[] {
  return Object.values(BLOCK_REGISTRY).filter((block) =>
    block.semanticTags.includes(tag)
  );
}

/**
 * Get blocks by category
 */
export function getBlocksByCategory(
  category: BlockCategory
): BlockRegistryEntry[] {
  return Object.values(BLOCK_REGISTRY).filter(
    (block) => block.category === category
  );
}

/**
 * Get block by ID
 */
export function getBlockById(id: string): BlockRegistryEntry | undefined {
  return BLOCK_REGISTRY[id];
}

/**
 * Get all available blocks
 */
export function getAllBlocks(): BlockRegistryEntry[] {
  return Object.values(BLOCK_REGISTRY);
}

/**
 * Get all categories
 */
export function getAllCategories(): BlockCategory[] {
  return Array.from(
    new Set(Object.values(BLOCK_REGISTRY).map((block) => block.category))
  );
}

/**
 * Search blocks by query (searches name, description, and semantic tags)
 */
export function searchBlocks(query: string): BlockRegistryEntry[] {
  const lowercaseQuery = query.toLowerCase();
  return Object.values(BLOCK_REGISTRY).filter(
    (block) =>
      block.name.toLowerCase().includes(lowercaseQuery) ||
      block.description.toLowerCase().includes(lowercaseQuery) ||
      block.semanticTags.some((tag) =>
        tag.toLowerCase().includes(lowercaseQuery)
      )
  );
}
