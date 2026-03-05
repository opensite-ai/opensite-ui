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
import { AboutStoryExpertise } from "../../components/blocks/about/about-story-expertise";
import type { AboutStoryExpertiseProps } from "../../components/blocks/about/about-story-expertise";
import { AboutNetworkSpotlight } from "../../components/blocks/about/about-network-spotlight";
import type { AboutNetworkSpotlightProps } from "../../components/blocks/about/about-network-spotlight";
import { AboutLocationInfoHero } from "../../components/blocks/about/about-location-info-hero";
import type { AboutLocationInfoHeroProps } from "../../components/blocks/about/about-location-info-hero";
import { MediaHoverCtas } from "../../components/blocks/cta/media-hover-ctas";
import type { MediaHoverCtasProps } from "../../components/blocks/cta/media-hover-ctas";
import { CtaDocumentationLinks } from "../../components/blocks/cta/cta-documentation-links";
import { CtaFeatureChecklist } from "../../components/blocks/cta/cta-feature-checklist";
import { CtaSplitImage } from "../../components/blocks/cta/cta-split-image";
import { CtaStackedCards } from "../../components/blocks/cta/cta-stacked-cards";
import { CtaFeatureList } from "../../components/blocks/cta/cta-feature-list";
import { CtaSplitImageLogos } from "../../components/blocks/cta/cta-split-image-logos";
import { CtaFullwidthBackground } from "../../components/blocks/cta/cta-fullwidth-background";
import { CtaFeatureCardsGrid } from "../../components/blocks/cta/cta-feature-cards-grid";
import { CtaAccentBackground } from "../../components/blocks/cta/cta-accent-background";
import { CtaSplitGradientImage } from "../../components/blocks/cta/cta-split-gradient-image";
import { CtaBackgroundIconBadge } from "../../components/blocks/cta/cta-background-icon-badge";
import { CtaPatternBackground } from "../../components/blocks/cta/cta-pattern-background";
import { CtaPlatformDemo } from "../../components/blocks/cta/cta-platform-demo";
import { CtaEnterpriseSplit } from "../../components/blocks/cta/cta-enterprise-split";
import { CtaMinimalSeparator } from "../../components/blocks/cta/cta-minimal-separator";
import { CtaImageOverlayArrow } from "../../components/blocks/cta/cta-image-overlay-arrow";
import { CtaAppDownloadNewsletter } from "../../components/blocks/cta/cta-app-download-newsletter";
import { CtaNewsletterFeatures } from "../../components/blocks/cta/cta-newsletter-features";
import { CtaHeroFeatureCards } from "../../components/blocks/cta/cta-hero-feature-cards";
import { CtaEnterpriseDarkFeatures } from "../../components/blocks/cta/cta-enterprise-dark-features";
import { CtaGradientLogosFloating } from "../../components/blocks/cta/cta-gradient-logos-floating";
import { CtaGradientStatsHero } from "../../components/blocks/cta/cta-gradient-stats-hero";
import { CtaVideoBackgroundHero } from "../../components/blocks/cta/cta-video-background-hero";
import { CtaWorkflowTabs } from "../../components/blocks/cta/cta-workflow-tabs";
import { CtaCaseStudyTestimonial } from "../../components/blocks/cta/cta-case-study-testimonial";
import { CtaSimpleCentered } from "../../components/blocks/cta/cta-simple-centered";
import { CtaImageOverlayCentered } from "../../components/blocks/cta/cta-image-overlay-centered";
import type { CtaImageOverlayCenteredProps } from "../../components/blocks/cta/cta-image-overlay-centered";

// Contact components
import { ContactFloatingBanner } from "../../components/blocks/contact/contact-floating-banner";
import { ContactCallback } from "../../components/blocks/contact/contact-callback";
import { ContactCard } from "../../components/blocks/contact/contact-card";
import { ContactCareers } from "../../components/blocks/contact/contact-careers";
import { ContactCatering } from "../../components/blocks/contact/contact-catering";
import { ContactConsultation } from "../../components/blocks/contact/contact-consultation";
import { ContactDark } from "../../components/blocks/contact/contact-dark";
import { ContactDemo } from "../../components/blocks/contact/contact-demo";
import { ContactEmergency } from "../../components/blocks/contact/contact-emergency";
import { ContactEvent } from "../../components/blocks/contact/contact-event";
import { ContactFaq } from "../../components/blocks/contact/contact-faq";
import { ContactFeedback } from "../../components/blocks/contact/contact-feedback";
import { ContactFitness } from "../../components/blocks/contact/contact-fitness";
import { ContactGuest } from "../../components/blocks/contact/contact-guest";
import { ContactImage } from "../../components/blocks/contact/contact-image";
import { ContactInsurance } from "../../components/blocks/contact/contact-insurance";
import { ContactInterview } from "../../components/blocks/contact/contact-interview";
import { ContactLocations } from "../../components/blocks/contact/contact-locations";
import { ContactMaintenance } from "../../components/blocks/contact/contact-maintenance";
import { ContactMap } from "../../components/blocks/contact/contact-map";
import { ContactMinimal } from "../../components/blocks/contact/contact-minimal";
import { ContactMoving } from "../../components/blocks/contact/contact-moving";
import { ContactMultistep } from "../../components/blocks/contact/contact-multistep";
import { ContactPartnership } from "../../components/blocks/contact/contact-partnership";
import { ContactPhotography } from "../../components/blocks/contact/contact-photography";
import { ContactPress } from "../../components/blocks/contact/contact-press";
import { ContactQuote } from "../../components/blocks/contact/contact-quote";
import { ContactReferral } from "../../components/blocks/contact/contact-referral";
import { ContactReport } from "../../components/blocks/contact/contact-report";
import { ContactReservation } from "../../components/blocks/contact/contact-reservation";
import { ContactRetreat } from "../../components/blocks/contact/contact-retreat";
import { ContactRsvp } from "../../components/blocks/contact/contact-rsvp";
import { ContactSales } from "../../components/blocks/contact/contact-sales";
import { ContactSchedule } from "../../components/blocks/contact/contact-schedule";
import { ContactSponsorship } from "../../components/blocks/contact/contact-sponsorship";
import { ContactSupport } from "../../components/blocks/contact/contact-support";
import { ContactTenant } from "../../components/blocks/contact/contact-tenant";
import { ContactVendor } from "../../components/blocks/contact/contact-vendor";
import { ContactVolunteer } from "../../components/blocks/contact/contact-volunteer";
import { ContactWarranty } from "../../components/blocks/contact/contact-warranty";
import { ContactWedding } from "../../components/blocks/contact/contact-wedding";
import { ContactHelpCenter } from "../../components/blocks/contact/contact-help-center";
import type { ContactHelpCenterProps } from "../../components/blocks/contact/contact-help-center";

// Carousel components
import { CarouselAnimatedSections } from "../../components/blocks/carousel/carousel-animated-sections";
import type { CarouselAnimatedSectionsProps } from "../../components/blocks/carousel/carousel-animated-sections";
import { CarouselAutoProgressSlides } from "../../components/blocks/carousel/carousel-auto-progress-slides";
import type { CarouselAutoProgressSlidesProps } from "../../components/blocks/carousel/carousel-auto-progress-slides";
import { CarouselAutoplayProgress } from "../../components/blocks/carousel/carousel-autoplay-progress";
import type { CarouselAutoplayProgressProps } from "../../components/blocks/carousel/carousel-autoplay-progress";
import { CarouselFeatureBadge } from "../../components/blocks/carousel/carousel-feature-badge";
import type { CarouselFeatureBadgeProps } from "../../components/blocks/carousel/carousel-feature-badge";
import { CarouselFullscreenScrollFx } from "../../components/blocks/carousel/carousel-fullscreen-scroll-fx";
import type { CarouselFullscreenScrollFxProps } from "../../components/blocks/carousel/carousel-fullscreen-scroll-fx";
import { CarouselGalleryThumbnails } from "../../components/blocks/carousel/carousel-gallery-thumbnails";
import type { CarouselGalleryThumbnailsProps } from "../../components/blocks/carousel/carousel-gallery-thumbnails";
import { CarouselHorizontalCards } from "../../components/blocks/carousel/carousel-horizontal-cards";
import type { CarouselHorizontalCardsProps } from "../../components/blocks/carousel/carousel-horizontal-cards";
import { CarouselImageHero } from "../../components/blocks/carousel/carousel-image-hero";
import type { CarouselImageHeroProps } from "../../components/blocks/carousel/carousel-image-hero";
import { CarouselMultiStepShowcase } from "../../components/blocks/carousel/carousel-multi-step-showcase";
import type { CarouselMultiStepShowcaseProps } from "../../components/blocks/carousel/carousel-multi-step-showcase";
import { CarouselPortfolioHero } from "../../components/blocks/carousel/carousel-portfolio-hero";
import type { CarouselPortfolioHeroProps } from "../../components/blocks/carousel/carousel-portfolio-hero";
import { CarouselProductFeatureShowcase } from "../../components/blocks/carousel/carousel-product-feature-showcase";
import type { CarouselProductFeatureShowcaseProps } from "../../components/blocks/carousel/carousel-product-feature-showcase";
import { CarouselProgressSlider } from "../../components/blocks/carousel/carousel-progress-slider";
import type { CarouselProgressSliderProps } from "../../components/blocks/carousel/carousel-progress-slider";
import { CarouselScrollingFeatureShowcase } from "../../components/blocks/carousel/carousel-scrolling-feature-showcase";
import type { CarouselScrollingFeatureShowcaseProps } from "../../components/blocks/carousel/carousel-scrolling-feature-showcase";

import { FeatureShowcase } from "../../components/blocks/features/feature-showcase";
import type { FeatureShowcaseProps } from "../../components/blocks/features/feature-showcase";
import { FeatureSplitImage } from "../../components/blocks/features/feature-split-image";
import { FeatureSplitImageReverse } from "../../components/blocks/features/feature-split-image-reverse";
import { FeatureIconGridBordered } from "../../components/blocks/features/feature-icon-grid-bordered";
import { FeatureChecklistImage } from "../../components/blocks/features/feature-checklist-image";
import { FeatureCarouselProgress } from "../../components/blocks/features/feature-carousel-progress";
import { FeatureCardGridLinked } from "../../components/blocks/features/feature-card-grid-linked";
import { FeatureNumberedCards } from "../../components/blocks/features/feature-numbered-cards";
import { FeatureIconGridAccent } from "../../components/blocks/features/feature-icon-grid-accent";
import { FeatureThreeColumnValues } from "../../components/blocks/features/feature-three-column-values";
import { FeatureBadgeGridSix } from "../../components/blocks/features/feature-badge-grid-six";
import { FeaturePatternGridLinks } from "../../components/blocks/features/feature-pattern-grid-links";
import { FeatureTabbedContentImage } from "../../components/blocks/features/feature-tabbed-content-image";
import { FeatureUtilityCardsGrid } from "../../components/blocks/features/feature-utility-cards-grid";
import { FeatureBentoUtilities } from "../../components/blocks/features/feature-bento-utilities";
import { FeatureChecklistThreeColumn } from "../../components/blocks/features/feature-checklist-three-column";
import { FeatureIntegrationCards } from "../../components/blocks/features/feature-integration-cards";
import { FeatureIconTabsContent } from "../../components/blocks/features/feature-icon-tabs-content";
import { FeatureImageOverlayBadge } from "../../components/blocks/features/feature-image-overlay-badge";
import { FeatureCategoryImageCards } from "../../components/blocks/features/feature-category-image-cards";
import { FeatureBentoImageGrid } from "../../components/blocks/features/feature-bento-image-grid";
import { FeatureImageCardsThreeColumn } from "../../components/blocks/features/feature-image-cards-three-column";
import { FeatureIconGridMuted } from "../../components/blocks/features/feature-icon-grid-muted";
import { FeatureStatsHighlight } from "../../components/blocks/features/feature-stats-highlight";
import { FeatureAccordionImage } from "../../components/blocks/features/feature-accordion-image";
import { FeatureCapabilitiesGrid } from "../../components/blocks/features/feature-capabilities-grid";
import type { FeatureCapabilitiesGridProps } from "../../components/blocks/features/feature-capabilities-grid";
import { TeamMediaShowcase } from "../../components/blocks/team/team-media-showcase";
import type { TeamMediaShowcaseProps } from "../../components/blocks/team/team-media-showcase";
import { TeamSimpleGrid } from "../../components/blocks/team/team-simple-grid";
import { FooterBrandLinksContact } from "../../components/blocks/footers/footer-brand-links-contact";
import type { FooterBrandLinksContactProps } from "../../components/blocks/footers/footer-brand-links-contact";
import { FooterComprehensiveLinks } from "../../components/blocks/footers/footer-comprehensive-links";
import type { FooterComprehensiveLinksProps } from "../../components/blocks/footers/footer-comprehensive-links";
import { TeamSocialGrid } from "../../components/blocks/team/team-social-grid";
import { TeamGradientCards } from "../../components/blocks/team/team-gradient-cards";
import { TeamBioBadges } from "../../components/blocks/team/team-bio-badges";
import { TeamExpertiseCards } from "../../components/blocks/team/team-expertise-cards";
import { TeamCompactGrid } from "../../components/blocks/team/team-compact-grid";
import { TeamInvestorShowcase } from "../../components/blocks/team/team-investor-showcase";
import { TeamCarouselExperience } from "../../components/blocks/team/team-carousel-experience";
import { TeamFilterableSearch } from "../../components/blocks/team/team-filterable-search";
import { TeamCompactCta } from "../../components/blocks/team/team-compact-cta";
import { TeamHoverHighlight } from "../../components/blocks/team/team-hover-highlight";
import { TeamSocialCards } from "../../components/blocks/team/team-social-cards";
import { TeamGridAnimated } from "../../components/blocks/team/team-grid-animated";
import { TeamDepartmentSections } from "../../components/blocks/team/team-department-sections";
import { TeamAlternatingBios } from "../../components/blocks/team/team-alternating-bios";
import { TeamAvatarSocial } from "../../components/blocks/team/team-avatar-social";
import { TeamHoverOverlay } from "../../components/blocks/team/team-hover-overlay";
import { TeamRoleFilter } from "../../components/blocks/team/team-role-filter";
import { TeamContactCards } from "../../components/blocks/team/team-contact-cards";
import { TeamLargeImages } from "../../components/blocks/team/team-large-images";
import { TeamSkillBadges } from "../../components/blocks/team/team-skill-badges";
import { TeamTestimonialStats } from "../../components/blocks/team/team-testimonial-stats";

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
import { BlogCarouselApple } from "../../components/blocks/blog/blog-carousel-apple";

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
import { FaqSplitHero } from "../../components/blocks/faq/faq-split-hero";

// New About components
import { AboutSplitHero } from "../../components/blocks/about/about-split-hero";
import type { AboutSplitHeroProps } from "../../components/blocks/about/about-split-hero";
import { AboutMissionPrinciples } from "../../components/blocks/about/about-mission-principles";
import type { AboutMissionPrinciplesProps } from "../../components/blocks/about/about-mission-principles";
import { AboutExpandableValues } from "../../components/blocks/about/about-expandable-values";
import type { AboutExpandableValuesProps } from "../../components/blocks/about/about-expandable-values";
import { AboutCultureTabs } from "../../components/blocks/about/about-culture-tabs";
import type { AboutCultureTabsProps } from "../../components/blocks/about/about-culture-tabs";
import { CommunityInitiatives } from "../../components/blocks/about/community-initiatives";
import type { CommunityInitiativesProps } from "../../components/blocks/about/community-initiatives";

// New Feature components
import { FeatureAnimatedCarousel } from "../../components/blocks/features/feature-animated-carousel";

// New Footer components
import { FooterNewsletterContact } from "../../components/blocks/footers/footer-newsletter-contact";
import { FooterSplitImageAccordion } from "../../components/blocks/footers/footer-split-image-accordion";
import { FooterAccordionSocial } from "../../components/blocks/footers/footer-accordion-social";
import { FooterInfoCardsAccordion } from "../../components/blocks/footers/footer-info-cards-accordion";

// Case Studies List components
import { CaseStudiesImageGrid } from "../../components/blocks/case-studies-list/case-studies-image-grid";
import { CaseStudiesTestimonialStats } from "../../components/blocks/case-studies-list/case-studies-testimonial-stats";

// Reviews components
import { TestimonialsListVerified } from "../../components/blocks/testimonials/testimonials-list-verified";
import { TestimonialsImagesHelpful } from "../../components/blocks/testimonials/testimonials-images-helpful";
import { TestimonialsBentoGrid } from "../../components/blocks/testimonials/testimonials-bento-grid";
import { TestimonialsTwitterCards } from "../../components/blocks/testimonials/testimonials-twitter-cards";
import { TestimonialsCarouselImage } from "../../components/blocks/testimonials/testimonials-carousel-image";
import { TestimonialsCenteredAvatars } from "../../components/blocks/testimonials/testimonials-centered-avatars";
import { TestimonialsCompanyLogo } from "../../components/blocks/testimonials/testimonials-company-logo";
import { TestimonialsGridAddReview } from "../../components/blocks/testimonials/testimonials-grid-add-review";
import { TestimonialsMarquee } from "../../components/blocks/testimonials/testimonials-marquee";
import { TestimonialsSimpleGrid } from "../../components/blocks/testimonials/testimonials-simple-grid";
import { TestimonialsSliderMinimal } from "../../components/blocks/testimonials/testimonials-slider-minimal";
import { TestimonialsSplitImage } from "../../components/blocks/testimonials/testimonials-split-image";
import { TestimonialsStatsHeader } from "../../components/blocks/testimonials/testimonials-stats-header";
import { TestimonialsWallCompact } from "../../components/blocks/testimonials/testimonials-wall-compact";
import { TestimonialsMiniDividers } from "../../components/blocks/testimonials/testimonials-mini-dividers";
import { TestimonialsLogoCards } from "../../components/blocks/testimonials/testimonials-logo-cards";
import { TestimonialsQuoteCarousel } from "../../components/blocks/testimonials/testimonials-quote-carousel";
import { TestimonialsAnimatedSplit } from "../../components/blocks/testimonials/testimonials-animated-split";
import { TestimonialsScrollingColumns } from "../../components/blocks/testimonials/testimonials-scrolling-columns";
import { TestimonialsMinimalNumbered } from "../../components/blocks/testimonials/testimonials-minimal-numbered";
import { TestimonialsParallaxNumber } from "../../components/blocks/testimonials/testimonials-parallax-number";
import { TestimonialsMasonryGrid } from "../../components/blocks/testimonials/testimonials-masonry-grid";
import { TestimonialsLargeQuote } from "../../components/blocks/testimonials/testimonials-large-quote";
import { CaseStudiesFeaturedBorder } from "../../components/blocks/case-studies-list/case-studies-featured-border";
import { CaseStudiesStatsCard } from "../../components/blocks/case-studies-list/case-studies-stats-card";

// Case Study Detail components
import { CaseStudyProseSidebar } from "../../components/blocks/case-study-detail/case-study-prose-sidebar";
import { CaseStudyTocSocialSidebar } from "../../components/blocks/case-study-detail/case-study-toc-social-sidebar";
import { CaseStudyStatsMetrics } from "../../components/blocks/case-study-detail/case-study-stats-metrics";

// Hero components
import { HeroOverlayCtaGrid } from "../../components/blocks/hero/hero-overlay-cta-grid";
import { HeroSplitIconCards } from "../../components/blocks/hero/hero-split-icon-cards";
import { HeroFloatingImages } from "../../components/blocks/hero/hero-floating-images";
import { HeroBadgeImageSplit } from "../../components/blocks/hero/hero-badge-image-split";
import { HeroImageLeftContent } from "../../components/blocks/hero/hero-image-left-content";
import { HeroImageSlider } from "../../components/blocks/hero/hero-image-slider";
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

// Comparison components
import { ComparisonTableTwoColumn } from "../../components/blocks/comparison/comparison-table-two-column";
import { ComparisonFeatureCards } from "../../components/blocks/comparison/comparison-feature-cards";
import { ComparisonGridBadges } from "../../components/blocks/comparison/comparison-grid-badges";
import { ComparisonMetricsRows } from "../../components/blocks/comparison/comparison-metrics-rows";
import { ComparisonImageCards } from "../../components/blocks/comparison/comparison-image-cards";
import { ComparisonTableTabs } from "../../components/blocks/comparison/comparison-table-tabs";
import { ComparisonTableTooltips } from "../../components/blocks/comparison/comparison-table-tooltips";
import { ComparisonFeatureGrid } from "../../components/blocks/comparison/comparison-feature-grid";
import { ComparisonAiModels } from "../../components/blocks/comparison/comparison-ai-models";
import { ComparisonLegacyModern } from "../../components/blocks/comparison/comparison-legacy-modern";

// Navbar components
import { NavbarDropdownMenu } from "../../components/blocks/navbars/navbar-dropdown-menu";
import { NavbarCenteredMenu } from "../../components/blocks/navbars/navbar-centered-menu";
import { NavbarMegaMenu } from "../../components/blocks/navbars/navbar-mega-menu";
import { NavbarEnterpriseMega } from "../../components/blocks/navbars/navbar-enterprise-mega";
import { NavbarFeatureGrid } from "../../components/blocks/navbars/navbar-feature-grid";
import { NavbarFloatingPill } from "../../components/blocks/navbars/navbar-floating-pill";
import { NavbarPlatformResources } from "../../components/blocks/navbars/navbar-platform-resources";
import { NavbarImagePreview } from "../../components/blocks/navbars/navbar-image-preview";
import { NavbarDarkIcons } from "../../components/blocks/navbars/navbar-dark-icons";
import { NavbarAnimatedPreview } from "../../components/blocks/navbars/navbar-animated-preview";
import { NavbarMultiColumnGroups } from "../../components/blocks/navbars/navbar-multi-column-groups";
import { NavbarSidebarMobile } from "../../components/blocks/navbars/navbar-sidebar-mobile";
import { NavbarTransparentOverlay } from "../../components/blocks/navbars/navbar-transparent-overlay";
import { NavbarEducationPlatform } from "../../components/blocks/navbars/navbar-education-platform";
import { NavbarStickyCompact } from "../../components/blocks/navbars/navbar-sticky-compact";
import { NavbarSearchFocused } from "../../components/blocks/navbars/navbar-search-focused";
import { NavbarSimpleLinks } from "../../components/blocks/navbars/navbar-simple-links";
import { NavbarSplitCta } from "../../components/blocks/navbars/navbar-split-cta";
import { NavbarIconLinks } from "../../components/blocks/navbars/navbar-icon-links";
import { NavbarTabbedSections } from "../../components/blocks/navbars/navbar-tabbed-sections";
import { NavbarFullscreenMenu } from "../../components/blocks/navbars/navbar-fullscreen-menu";

// Logos components
import { LogosInlineTagline } from "../../components/blocks/logos/logos-inline-tagline";
import { LogosCertificationsGrid } from "../../components/blocks/logos/logos-certifications-grid";
import { LogosCarouselHeading } from "../../components/blocks/logos/logos-carousel-heading";
import { LogosPartnerNetwork } from "../../components/blocks/logos/logos-partner-network";
import { LogosTwoRowGrid } from "../../components/blocks/logos/logos-two-row-grid";
import { LogosMarqueeMuted } from "../../components/blocks/logos/logos-marquee-muted";
import { LogosCenteredSimple } from "../../components/blocks/logos/logos-centered-simple";
import { LogosNumberedCarousel } from "../../components/blocks/logos/logos-numbered-carousel";
import { LogosDoubleCarouselPattern } from "../../components/blocks/logos/logos-double-carousel-pattern";
import { LogosMinimalCarousel } from "../../components/blocks/logos/logos-minimal-carousel";
import { LogosPartnerGridSidebar } from "../../components/blocks/logos/logos-partner-grid-sidebar";

// Pricing components
import { PricingAddonsCards } from "../../components/blocks/pricing/pricing-addons-cards";
import { PricingAddonsFeatured } from "../../components/blocks/pricing/pricing-addons-featured";
import { PricingCollapsiblePlans } from "../../components/blocks/pricing/pricing-collapsible-plans";
import { PricingColumnsToggle } from "../../components/blocks/pricing/pricing-columns-toggle";
import { PricingComparisonHeaders } from "../../components/blocks/pricing/pricing-comparison-headers";
import { PricingComparisonTable } from "../../components/blocks/pricing/pricing-comparison-table";
import { PricingDiscountCard } from "../../components/blocks/pricing/pricing-discount-card";
import { PricingEnterpriseContact } from "../../components/blocks/pricing/pricing-enterprise-contact";
import { PricingFeatureMatrix } from "../../components/blocks/pricing/pricing-feature-matrix";
import { PricingFourTierToggle } from "../../components/blocks/pricing/pricing-four-tier-toggle";
import { PricingFullComparison } from "../../components/blocks/pricing/pricing-full-comparison";
import { PricingGradientCards } from "../../components/blocks/pricing/pricing-gradient-cards";
import { PricingIconHeaders } from "../../components/blocks/pricing/pricing-icon-headers";
import { PricingMinimalCards } from "../../components/blocks/pricing/pricing-minimal-cards";
import { PricingPackagesRadio } from "../../components/blocks/pricing/pricing-packages-radio";
import { PricingPopularHighlight } from "../../components/blocks/pricing/pricing-popular-highlight";
import { PricingRadioToggle } from "../../components/blocks/pricing/pricing-radio-toggle";
import { PricingResponsiveTable } from "../../components/blocks/pricing/pricing-responsive-table";
import { PricingServicesCards } from "../../components/blocks/pricing/pricing-services-cards";
import { PricingSimpleCard } from "../../components/blocks/pricing/pricing-simple-card";
import { PricingSingleCard } from "../../components/blocks/pricing/pricing-single-card";
import { PricingSplitLayout } from "../../components/blocks/pricing/pricing-split-layout";
import { PricingSpotlightCard } from "../../components/blocks/pricing/pricing-spotlight-card";
import { PricingSwitchCards } from "../../components/blocks/pricing/pricing-switch-cards";
import { PricingTabsToggle } from "../../components/blocks/pricing/pricing-tabs-toggle";
import { PricingTierGrid } from "../../components/blocks/pricing/pricing-tier-grid";
import { PricingToggleCards } from "../../components/blocks/pricing/pricing-toggle-cards";
import { PricingTogglePeriod } from "../../components/blocks/pricing/pricing-toggle-period";
import { PricingTwoColumnBasic } from "../../components/blocks/pricing/pricing-two-column-basic";

// Process components
import { ProcessStickySteps } from "../../components/blocks/process/process-sticky-steps";
import { ProcessScrollImage } from "../../components/blocks/process/process-scroll-image";
import { ProcessHoverCards } from "../../components/blocks/process/process-hover-cards";
import { ProcessIconTimeline } from "../../components/blocks/process/process-icon-timeline";
import { ProcessExpandableTimeline } from "../../components/blocks/process/process-expandable-timeline";
import { ProcessRoadmapTimeline } from "../../components/blocks/process/process-roadmap-timeline";
import { ProcessMissionPrinciples } from "../../components/blocks/process/process-mission-principles";
import { ProcessStepsGrid } from "../../components/blocks/process/process-steps-grid";
import { ProcessNumberedServices } from "../../components/blocks/process/process-numbered-services";

// Project List components
import { ProjectAlternatingMotion } from "../../components/blocks/project-list/project-alternating-motion";
import { ProjectBackgroundReveal } from "../../components/blocks/project-list/project-background-reveal";
import { ProjectCardOverlay } from "../../components/blocks/project-list/project-card-overlay";
import { ProjectCarouselCinematic } from "../../components/blocks/project-list/project-carousel-cinematic";
import { ProjectCarouselDetailCards } from "../../components/blocks/project-list/project-carousel-detail-cards";
import { ProjectCarouselMinimal } from "../../components/blocks/project-list/project-carousel-minimal";
import { ProjectExperienceQuote } from "../../components/blocks/project-list/project-experience-quote";
import { ProjectFeaturedCarousel } from "../../components/blocks/project-list/project-featured-carousel";
import { ProjectFilterableGallery } from "../../components/blocks/project-list/project-filterable-gallery";
import { ProjectFilterableThreeColumn } from "../../components/blocks/project-list/project-filterable-three-column";
import { ProjectGridGallery } from "../../components/blocks/project-list/project-grid-gallery";
import { ProjectGridMotion } from "../../components/blocks/project-list/project-grid-motion";
import { ProjectHorizontalCards } from "../../components/blocks/project-list/project-horizontal-cards";
import { ProjectHoverRevealGrid } from "../../components/blocks/project-list/project-hover-reveal-grid";
import { ProjectInteractiveHoverReveal } from "../../components/blocks/project-list/project-interactive-hover-reveal";
import { ProjectMasonryColumns } from "../../components/blocks/project-list/project-masonry-columns";
import { ProjectNatureMosaic } from "../../components/blocks/project-list/project-nature-mosaic";
import { ProjectScrollReveal } from "../../components/blocks/project-list/project-scroll-reveal";
import { ProjectShowcaseAlternating } from "../../components/blocks/project-list/project-showcase-alternating";
import { ProjectStickyScroll } from "../../components/blocks/project-list/project-sticky-scroll";
import { ProjectStudioHoverPreview } from "../../components/blocks/project-list/project-studio-hover-preview";
import { ProjectTableList } from "../../components/blocks/project-list/project-table-list";
import { ProjectVideoCarousel } from "../../components/blocks/project-list/project-video-carousel";
import { ProjectVideoHoverBento } from "../../components/blocks/project-list/project-video-hover-bento";
import { ProjectVideoHoverGrid } from "../../components/blocks/project-list/project-video-hover-grid";
import { ProjectVideoHoverRounded } from "../../components/blocks/project-list/project-video-hover-rounded";
import { ProjectVideoHoverStack } from "../../components/blocks/project-list/project-video-hover-stack";
import { ProjectVideoHoverTwoByTwo } from "../../components/blocks/project-list/project-video-hover-two-by-two";
import { ProjectWorkShowcase } from "../../components/blocks/project-list/project-work-showcase";
import { ProjectZigzagLayout } from "../../components/blocks/project-list/project-zigzag-layout";

// List components
import { ListServiceCategoryTable } from "../../components/blocks/list/list-service-category-table";
import { ListAchievementsShowcase } from "../../components/blocks/list/list-achievements-showcase";
import { ListCareerTimeline } from "../../components/blocks/list/list-career-timeline";
import { ListMetricsDashboard } from "../../components/blocks/list/list-metrics-dashboard";
import { ListFeatureComparison } from "../../components/blocks/list/list-feature-comparison";
import { ListSearchableGrid } from "../../components/blocks/list/list-searchable-grid";

// Offer Modal components
import { OfferModalNewsletterDiscount } from "../../components/blocks/offer-modal/offer-modal-newsletter-discount";
import { OfferModalMembershipImage } from "../../components/blocks/offer-modal/offer-modal-membership-image";
import { OfferModalSheetNewsletter } from "../../components/blocks/offer-modal/offer-modal-sheet-newsletter";

// Project Detail components
import { ProjectDetailHeroMetadata } from "../../components/blocks/project-detail/project-detail-hero-metadata";
import { ProjectDetailSidebarSticky } from "../../components/blocks/project-detail/project-detail-sidebar-sticky";
import { ProjectDetailCaseStudyProse } from "../../components/blocks/project-detail/project-detail-case-study-prose";
import { ProjectDetailSidebarNavigation } from "../../components/blocks/project-detail/project-detail-sidebar-navigation";
import { ProjectDetailFullscreenHero } from "../../components/blocks/project-detail/project-detail-fullscreen-hero";
import { ProjectDetailSculptureShowcase } from "../../components/blocks/project-detail/project-detail-sculpture-showcase";
import { ProjectDetailGridGallery } from "../../components/blocks/project-detail/project-detail-grid-gallery";
import { ProjectDetailSplitMaterials } from "../../components/blocks/project-detail/project-detail-split-materials";
import { ProjectDetailCompactMetadata } from "../../components/blocks/project-detail/project-detail-compact-metadata";
import { ProjectDetailMinimalCentered } from "../../components/blocks/project-detail/project-detail-minimal-centered";
import { ProjectDetailHoverGallery } from "../../components/blocks/project-detail/project-detail-hover-gallery";
import { ProjectDetailCardHeader } from "../../components/blocks/project-detail/project-detail-card-header";
import { ProjectDetailExhibitionSidebar } from "../../components/blocks/project-detail/project-detail-exhibition-sidebar";
import { ProjectDetailListRelated } from "../../components/blocks/project-detail/project-detail-list-related";
import { ProjectDetailArchitectureCarousel } from "../../components/blocks/project-detail/project-detail-architecture-carousel";
import { ProjectDetailFashionEditorial } from "../../components/blocks/project-detail/project-detail-fashion-editorial";
import { ProjectDetailPhotographyBreadcrumb } from "../../components/blocks/project-detail/project-detail-photography-breadcrumb";
import { ProjectDetailLargeHeroFeatured } from "../../components/blocks/project-detail/project-detail-large-hero-featured";
import { ProjectDetailTabbedCaseStudy } from "../../components/blocks/project-detail/project-detail-tabbed-case-study";
import { ProjectDetailNumberedSections } from "../../components/blocks/project-detail/project-detail-numbered-sections";
import { ProjectDetailMaskReveal } from "../../components/blocks/project-detail/project-detail-mask-reveal";
import { ProjectDetailParallaxScroll } from "../../components/blocks/project-detail/project-detail-parallax-scroll";

// Banner components
import { BannerPromoCta } from "../../components/blocks/banner/banner-promo-cta";
import { BannerCountdownSale } from "../../components/blocks/banner/banner-countdown-sale";
import { BannerDeliveryCountdown } from "../../components/blocks/banner/banner-delivery-countdown";
import { BannerAnnouncementDismissible } from "../../components/blocks/banner/banner-announcement-dismissible";
import { BannerPrivacyNotice } from "../../components/blocks/banner/banner-privacy-notice";
import { BannerSurveyIncentive } from "../../components/blocks/banner/banner-survey-incentive";
import { BannerSocialFollow } from "../../components/blocks/banner/banner-social-follow";
import { BannerGdprRights } from "../../components/blocks/banner/banner-gdpr-rights";
import { BannerEventPromo } from "../../components/blocks/banner/banner-event-promo";
import { BannerFloatingOffer } from "../../components/blocks/banner/banner-floating-offer";

// Industries components
import { IndustriesHoverRevealGrid } from "../../components/blocks/industries/industries-hover-reveal-grid";
import type { IndustriesHoverRevealGridProps } from "../../components/blocks/industries/industries-hover-reveal-grid";
import { IndustriesBadgeListBordered } from "../../components/blocks/industries/industries-badge-list-bordered";
import type { IndustriesBadgeListBorderedProps } from "../../components/blocks/industries/industries-badge-list-bordered";
import { IndustriesTimelineTable } from "../../components/blocks/industries/industries-timeline-table";
import type { IndustriesTimelineTableProps } from "../../components/blocks/industries/industries-timeline-table";
import { IndustriesExpandableShowcase } from "../../components/blocks/industries/industries-expandable-showcase";
import type { IndustriesExpandableShowcaseProps } from "../../components/blocks/industries/industries-expandable-showcase";

// Resource Detail components
import { ResourceDetailWhitepaperSidebar } from "../../components/blocks/resource-detail/resource-detail-whitepaper-sidebar";
import type { ResourceDetailWhitepaperSidebarProps } from "../../components/blocks/resource-detail/resource-detail-whitepaper-sidebar";
import { ResourceDetailArticleHero } from "../../components/blocks/resource-detail/resource-detail-article-hero";
import type { ResourceDetailArticleHeroProps } from "../../components/blocks/resource-detail/resource-detail-article-hero";
import { ResourceDetailDocumentSidebar } from "../../components/blocks/resource-detail/resource-detail-document-sidebar";
import type { ResourceDetailDocumentSidebarProps } from "../../components/blocks/resource-detail/resource-detail-document-sidebar";

// Service Detail components
import { ServiceDetailProseMinimal } from "../../components/blocks/service-detail/service-detail-prose-minimal";
import type { ServiceDetailProseMinimalProps } from "../../components/blocks/service-detail/service-detail-prose-minimal";
import { ServiceDetailImageHero } from "../../components/blocks/service-detail/service-detail-image-hero";
import type { ServiceDetailImageHeroProps } from "../../components/blocks/service-detail/service-detail-image-hero";
import { ServiceDetailStatsHero } from "../../components/blocks/service-detail/service-detail-stats-hero";
import type { ServiceDetailStatsHeroProps } from "../../components/blocks/service-detail/service-detail-stats-hero";
import { ServiceDetailSidebarStats } from "../../components/blocks/service-detail/service-detail-sidebar-stats";
import type { ServiceDetailSidebarStatsProps } from "../../components/blocks/service-detail/service-detail-sidebar-stats";
import { ServiceDetailSidebarRelated } from "../../components/blocks/service-detail/service-detail-sidebar-related";
import type { ServiceDetailSidebarRelatedProps } from "../../components/blocks/service-detail/service-detail-sidebar-related";
import { ServiceDetailCenteredExpertise } from "../../components/blocks/service-detail/service-detail-centered-expertise";
import type { ServiceDetailCenteredExpertiseProps } from "../../components/blocks/service-detail/service-detail-centered-expertise";
import { ServiceDetailCompactCards } from "../../components/blocks/service-detail/service-detail-compact-cards";
import type { ServiceDetailCompactCardsProps } from "../../components/blocks/service-detail/service-detail-compact-cards";

// Services List components
import { ServicesListIconGrid } from "../../components/blocks/services-list/services-list-icon-grid";
import type { ServicesListIconGridProps } from "../../components/blocks/services-list/services-list-icon-grid";
import { ServicesListMutedCards } from "../../components/blocks/services-list/services-list-muted-cards";
import type { ServicesListMutedCardsProps } from "../../components/blocks/services-list/services-list-muted-cards";
import { ServicesListCenteredIcons } from "../../components/blocks/services-list/services-list-centered-icons";
import type { ServicesListCenteredIconsProps } from "../../components/blocks/services-list/services-list-centered-icons";
import { ServicesListVerticalTags } from "../../components/blocks/services-list/services-list-vertical-tags";
import type { ServicesListVerticalTagsProps } from "../../components/blocks/services-list/services-list-vertical-tags";
import { ServicesListAccordion } from "../../components/blocks/services-list/services-list-accordion";
import type { ServicesListAccordionProps } from "../../components/blocks/services-list/services-list-accordion";
import { ServicesListPricingGrid } from "../../components/blocks/services-list/services-list-pricing-grid";
import type { ServicesListPricingGridProps } from "../../components/blocks/services-list/services-list-pricing-grid";
import { ServicesListFeaturedHighlight } from "../../components/blocks/services-list/services-list-featured-highlight";
import type { ServicesListFeaturedHighlightProps } from "../../components/blocks/services-list/services-list-featured-highlight";
import { ServicesListFeatureSpotlight } from "../../components/blocks/services-list/services-list-feature-spotlight";
import type { ServicesListFeatureSpotlightProps } from "../../components/blocks/services-list/services-list-feature-spotlight";
import { ServicesListImageCards } from "../../components/blocks/services-list/services-list-image-cards";
import type { ServicesListImageCardsProps } from "../../components/blocks/services-list/services-list-image-cards";
import { ServicesListImageOverlayGrid } from "../../components/blocks/services-list/services-list-image-overlay-grid";
import type { ServicesListImageOverlayGridProps } from "../../components/blocks/services-list/services-list-image-overlay-grid";
import { ServicesListHeroCards } from "../../components/blocks/services-list/services-list-hero-cards";
import type { ServicesListHeroCardsProps } from "../../components/blocks/services-list/services-list-hero-cards";
import { ServicesListTwoColumnGrid } from "../../components/blocks/services-list/services-list-two-column-grid";
import type { ServicesListTwoColumnGridProps } from "../../components/blocks/services-list/services-list-two-column-grid";
import { ServicesListMasonry } from "../../components/blocks/services-list/services-list-masonry";
import type { ServicesListMasonryProps } from "../../components/blocks/services-list/services-list-masonry";
import { ServicesListCategoryAccordion } from "../../components/blocks/services-list/services-list-category-accordion";
import type { ServicesListCategoryAccordionProps } from "../../components/blocks/services-list/services-list-category-accordion";
import { ServicesListProgressSidebar } from "../../components/blocks/services-list/services-list-progress-sidebar";
import type { ServicesListProgressSidebarProps } from "../../components/blocks/services-list/services-list-progress-sidebar";
import { ServicesListTableHover } from "../../components/blocks/services-list/services-list-table-hover";
import type { ServicesListTableHoverProps } from "../../components/blocks/services-list/services-list-table-hover";
import { ServicesListMethodologySteps } from "../../components/blocks/services-list/services-list-methodology-steps";
import type { ServicesListMethodologyStepsProps } from "../../components/blocks/services-list/services-list-methodology-steps";
import { ServicesListStickyImage } from "../../components/blocks/services-list/services-list-sticky-image";
import type { ServicesListStickyImageProps } from "../../components/blocks/services-list/services-list-sticky-image";
import { ServicesListTabsFeatures } from "../../components/blocks/services-list/services-list-tabs-features";
import type { ServicesListTabsFeaturesProps } from "../../components/blocks/services-list/services-list-tabs-features";
import { ServicesListVideoShowcase } from "../../components/blocks/services-list/services-list-video-showcase";
import type { ServicesListVideoShowcaseProps } from "../../components/blocks/services-list/services-list-video-showcase";
import { ServicesListCultureTabs } from "../../components/blocks/services-list/services-list-culture-tabs";
import type { ServicesListCultureTabsProps } from "../../components/blocks/services-list/services-list-culture-tabs";
import { ServicesListAccordionBenefits } from "../../components/blocks/services-list/services-list-accordion-benefits";
import type { ServicesListAccordionBenefitsProps } from "../../components/blocks/services-list/services-list-accordion-benefits";
import { ServicesListSplitChecklist } from "../../components/blocks/services-list/services-list-split-checklist";
import type { ServicesListSplitChecklistProps } from "../../components/blocks/services-list/services-list-split-checklist";
import { ServicesListMinimalGrid } from "../../components/blocks/services-list/services-list-minimal-grid";
import type { ServicesListMinimalGridProps } from "../../components/blocks/services-list/services-list-minimal-grid";
import { ServicesListNumberedSteps } from "../../components/blocks/services-list/services-list-numbered-steps";
import type { ServicesListNumberedStepsProps } from "../../components/blocks/services-list/services-list-numbered-steps";
import { ServicesListCardsHover } from "../../components/blocks/services-list/services-list-cards-hover";
import type { ServicesListCardsHoverProps } from "../../components/blocks/services-list/services-list-cards-hover";
import { ServicesListTimeline } from "../../components/blocks/services-list/services-list-timeline";
import type { ServicesListTimelineProps } from "../../components/blocks/services-list/services-list-timeline";

// Resource List components
import { ResourceListHeroFilter } from "../../components/blocks/resource-list/resource-list-hero-filter";
import type { ResourceListHeroFilterProps } from "../../components/blocks/resource-list/resource-list-hero-filter";
import { ResourceListFeaturedGrid } from "../../components/blocks/resource-list/resource-list-featured-grid";
import type { ResourceListFeaturedGridProps } from "../../components/blocks/resource-list/resource-list-featured-grid";
import { ResourceListFeaturedArticles } from "../../components/blocks/resource-list/resource-list-featured-articles";
import type { ResourceListFeaturedArticlesProps } from "../../components/blocks/resource-list/resource-list-featured-articles";
import { ResourceListNewsUpdates } from "../../components/blocks/resource-list/resource-list-news-updates";
import type { ResourceListNewsUpdatesProps } from "../../components/blocks/resource-list/resource-list-news-updates";
import { ResourceListCourseCards } from "../../components/blocks/resource-list/resource-list-course-cards";
import type { ResourceListCourseCardsProps } from "../../components/blocks/resource-list/resource-list-course-cards";

// Stats components
import { StatsSimpleGrid } from "../../components/blocks/stats/stats-simple-grid";
import type { StatsSimpleGridProps } from "../../components/blocks/stats/stats-simple-grid";
import { StatsIconCards } from "../../components/blocks/stats/stats-icon-cards";
import type { StatsIconCardsProps } from "../../components/blocks/stats/stats-icon-cards";
import { StatsTimelineTabs } from "../../components/blocks/stats/stats-timeline-tabs";
import type { StatsTimelineTabsProps } from "../../components/blocks/stats/stats-timeline-tabs";
import { StatsPrimarySecondary } from "../../components/blocks/stats/stats-primary-secondary";
import type { StatsPrimarySecondaryProps } from "../../components/blocks/stats/stats-primary-secondary";
import { StatsGrowthTimeline } from "../../components/blocks/stats/stats-growth-timeline";
import type { StatsGrowthTimelineProps } from "../../components/blocks/stats/stats-growth-timeline";
import { StatsImpactGrid } from "../../components/blocks/stats/stats-impact-grid";
import type { StatsImpactGridProps } from "../../components/blocks/stats/stats-impact-grid";
import { StatsCircularProgress } from "../../components/blocks/stats/stats-circular-progress";
import type { StatsCircularProgressProps } from "../../components/blocks/stats/stats-circular-progress";
import { StatsCardGroup } from "../../components/blocks/stats/stats-card-group";
import type { StatsCardGroupProps } from "../../components/blocks/stats/stats-card-group";
import { StatsAnimatedCounter } from "../../components/blocks/stats/stats-animated-counter";
import type { StatsAnimatedCounterProps } from "../../components/blocks/stats/stats-animated-counter";
import { StatsNumberTicker } from "../../components/blocks/stats/stats-number-ticker";
import type { StatsNumberTickerProps } from "../../components/blocks/stats/stats-number-ticker";
import { StatsMilestoneSidebar } from "../../components/blocks/stats/stats-milestone-sidebar";
import type { StatsMilestoneSidebarProps } from "../../components/blocks/stats/stats-milestone-sidebar";
import { StatsBarComparison } from "../../components/blocks/stats/stats-bar-comparison";
import type { StatsBarComparisonProps } from "../../components/blocks/stats/stats-bar-comparison";

// Timeline components
import { TimelineVerticalIconDashed } from "../../components/blocks/timeline/timeline-vertical-icon-dashed";
import type { TimelineVerticalIconDashedProps } from "../../components/blocks/timeline/timeline-vertical-icon-dashed";
import { TimelineScrollStickyImage } from "../../components/blocks/timeline/timeline-scroll-sticky-image";
import type { TimelineScrollStickyImageProps } from "../../components/blocks/timeline/timeline-scroll-sticky-image";
import { TimelineTwoColumnFeatured } from "../../components/blocks/timeline/timeline-two-column-featured";
import type { TimelineTwoColumnFeaturedProps } from "../../components/blocks/timeline/timeline-two-column-featured";
import { TimelineAlternatingDiagonal } from "../../components/blocks/timeline/timeline-alternating-diagonal";
import type { TimelineAlternatingDiagonalProps } from "../../components/blocks/timeline/timeline-alternating-diagonal";
import { TimelineAIWorkflowCards } from "../../components/blocks/timeline/timeline-ai-workflow-cards";
import type { TimelineAIWorkflowCardsProps } from "../../components/blocks/timeline/timeline-ai-workflow-cards";
import { TimelineProductivityList } from "../../components/blocks/timeline/timeline-productivity-list";
import type { TimelineProductivityListProps } from "../../components/blocks/timeline/timeline-productivity-list";
import { TimelineStepperAnimated } from "../../components/blocks/timeline/timeline-stepper-animated";
import type { TimelineStepperAnimatedProps } from "../../components/blocks/timeline/timeline-stepper-animated";
import { TimelineChangelogBadges } from "../../components/blocks/timeline/timeline-changelog-badges";
import type { TimelineChangelogBadgesProps } from "../../components/blocks/timeline/timeline-changelog-badges";
import { TimelineHistoryProse } from "../../components/blocks/timeline/timeline-history-prose";
import type { TimelineHistoryProseProps } from "../../components/blocks/timeline/timeline-history-prose";
import { TimelineHorizontalPhases } from "../../components/blocks/timeline/timeline-horizontal-phases";
import type { TimelineHorizontalPhasesProps } from "../../components/blocks/timeline/timeline-horizontal-phases";
import { TimelineHorizontalIcons } from "../../components/blocks/timeline/timeline-horizontal-icons";
import type { TimelineHorizontalIconsProps } from "../../components/blocks/timeline/timeline-horizontal-icons";
import { TimelineTabbedPhases } from "../../components/blocks/timeline/timeline-tabbed-phases";
import type { TimelineTabbedPhasesProps } from "../../components/blocks/timeline/timeline-tabbed-phases";
import { TimelineProductLaunch } from "../../components/blocks/timeline/timeline-product-launch";
import type { TimelineProductLaunchProps } from "../../components/blocks/timeline/timeline-product-launch";
import { TimelineScrollHighlight } from "../../components/blocks/timeline/timeline-scroll-highlight";
import type { TimelineScrollHighlightProps } from "../../components/blocks/timeline/timeline-scroll-highlight";

// Link Page components
import { LinkTreeBlock } from "../../components/blocks/link-page/link-tree-block";
import type { LinkTreeBlockProps } from "../../components/blocks/link-page/link-tree-block";
import { LinkPageMinimalProfile } from "../../components/blocks/link-page/link-page-minimal-profile";
import type { LinkPageMinimalProfileProps } from "../../components/blocks/link-page/link-page-minimal-profile";
import { LinkPageNewsletterSocial } from "../../components/blocks/link-page/link-page-newsletter-social";
import type { LinkPageNewsletterSocialProps } from "../../components/blocks/link-page/link-page-newsletter-social";
import { LinkPageGridCards } from "../../components/blocks/link-page/link-page-grid-cards";
import type { LinkPageGridCardsProps } from "../../components/blocks/link-page/link-page-grid-cards";
import { LinkPageBentoLayout } from "../../components/blocks/link-page/link-page-bento-layout";
import type { LinkPageBentoLayoutProps } from "../../components/blocks/link-page/link-page-bento-layout";

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
  | "carousel"
  | "gallery"
  | "timeline"
  | "process"
  | "benefits"
  | "comparison"
  | "background-pattern-hero"
  | "blog"
  | "article"
  | "case-studies-list"
  | "case-study-detail"
  | "navbar"
  | "logos"
  | "project-list"
  | "project-detail"
  | "list"
  | "offer-modal"
  | "banner"
  | "industries"
  | "resource-detail"
  | "service-detail"
  | "services-list"
  | "resource-list"
  | "link-page";

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
  "about-story-expertise": {
    id: "about-story-expertise",
    name: "Story & Expertise Spotlight",
    description:
      "A two-part about section that pairs a narrative story with CTA buttons alongside a highlighted image card, followed by a grid of expertise tiles. Ideal for trust-building pages that need both brand story and capability proof points.",
    semanticTags: [
      "about",
      "story",
      "expertise",
      "narrative",
      "cta",
      "image",
      "highlight",
      "grid",
      "trust",
      "capabilities",
    ],
    category: "about",
    component: AboutStoryExpertise,
    props: "AboutStoryExpertiseProps",
    exampleUsage: `<AboutStoryExpertise />`.trim(),
  },
  "about-network-spotlight": {
    id: "about-network-spotlight",
    name: "Partner Network Spotlight",
    description:
      "A high-contrast, two-column spotlight with a featured image overlay card, highlight list, and dual CTAs. Great for partner network invitations, alliance announcements, or community programs.",
    semanticTags: [
      "about",
      "network",
      "partners",
      "spotlight",
      "dark",
      "image",
      "highlights",
      "cta",
      "alliances",
      "community",
    ],
    category: "about",
    component: AboutNetworkSpotlight,
    props: "AboutNetworkSpotlightProps",
    exampleUsage: `<AboutNetworkSpotlight />`.trim(),
  },
  "about-location-info-hero": {
    id: "about-location-info-hero",
    name: "Location Info Hero",
    description:
      "A split hero section with headline, action links, contact details, hours breakdown, and a one- or two-image showcase. Ideal for service hubs, flagship offices, or location-driven about pages.",
    semanticTags: [
      "about",
      "location",
      "contact",
      "hours",
      "hero",
      "images",
      "service-center",
      "address",
      "phone",
      "cta",
    ],
    category: "about",
    component: AboutLocationInfoHero,
    props: "AboutLocationInfoHeroProps",
    exampleUsage: `<AboutLocationInfoHero />`.trim(),
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
  "cta-documentation-links": {
    id: "cta-documentation-links",
    name: "CTA Documentation Links",
    description:
      "A CTA section featuring a grid of documentation or resource links with icons, titles, and descriptions. Includes a main heading, subtitle, and primary action button. Perfect for developer documentation, resource centers, or help sections.",
    semanticTags: [
      "cta",
      "call-to-action",
      "documentation",
      "resources",
      "links",
      "grid",
      "icons",
      "developer",
      "help-center",
    ],
    category: "cta",
    component: CtaDocumentationLinks,
    props: "CtaDocumentationLinksProps",
    exampleUsage: `
<CtaDocumentationLinks
  heading="Explore Our Resources"
  description="Everything you need to get started"
  links={[
    { icon: "lucide/book-open", title: "Documentation", description: "Learn the basics", href: "/docs" },
    { icon: "lucide/code", title: "API Reference", description: "Explore our APIs", href: "/api" }
  ]}
  primaryButton={{ text: "Get Started", href: "/start" }}
/>
    `.trim(),
  },
  "cta-feature-checklist": {
    id: "cta-feature-checklist",
    name: "CTA Feature Checklist",
    description:
      "A split-layout CTA with a feature checklist on one side and a featured image on the other. Includes heading, description, list of features with check icons, and action buttons. Ideal for product pages or feature highlights.",
    semanticTags: [
      "cta",
      "call-to-action",
      "features",
      "checklist",
      "split-layout",
      "image",
      "benefits",
      "product",
    ],
    category: "cta",
    component: CtaFeatureChecklist,
    props: "CtaFeatureChecklistProps",
    exampleUsage: `
<CtaFeatureChecklist
  heading="Why Choose Us"
  description="Built for modern teams"
  features={["Fast deployment", "24/7 support", "Scalable infrastructure"]}
  primaryButton={{ text: "Start Free Trial", href: "/trial" }}
  secondaryButton={{ text: "Learn More", href: "/features" }}
  imageSrc="/images/dashboard.jpg"
/>
    `.trim(),
  },
  "cta-split-image": {
    id: "cta-split-image",
    name: "CTA Split Image",
    description:
      "A clean split-layout CTA with content on one side and a large featured image on the other. Features heading, description, and dual action buttons. Perfect for product showcases or service introductions.",
    semanticTags: [
      "cta",
      "call-to-action",
      "split-layout",
      "image",
      "hero",
      "product",
      "showcase",
    ],
    category: "cta",
    component: CtaSplitImage,
    props: "CtaSplitImageProps",
    exampleUsage: `
<CtaSplitImage
  heading="Transform Your Workflow"
  description="Streamline your processes with our platform"
  primaryButton={{ text: "Get Started", href: "/start" }}
  secondaryButton={{ text: "Watch Demo", href: "/demo" }}
  imageSrc="/images/product.jpg"
/>
    `.trim(),
  },
  "cta-stacked-cards": {
    id: "cta-stacked-cards",
    name: "CTA Stacked Cards",
    description:
      "A CTA section with stacked content cards featuring icons, titles, and descriptions. Includes main heading, subtitle, and action buttons. Great for highlighting multiple services or product tiers.",
    semanticTags: [
      "cta",
      "call-to-action",
      "cards",
      "stacked",
      "services",
      "features",
      "icons",
      "grid",
    ],
    category: "cta",
    component: CtaStackedCards,
    props: "CtaStackedCardsProps",
    exampleUsage: `
<CtaStackedCards
  heading="Choose Your Plan"
  description="Find the perfect fit for your needs"
  cards={[
    { icon: "lucide/zap", title: "Starter", description: "For individuals" },
    { icon: "lucide/rocket", title: "Pro", description: "For teams" }
  ]}
  primaryButton={{ text: "Compare Plans", href: "/pricing" }}
/>
    `.trim(),
  },
  "cta-feature-list": {
    id: "cta-feature-list",
    name: "CTA Feature List",
    description:
      "A CTA section with a vertical list of features, each with an icon, title, and description. Includes main heading, subtitle, and action buttons. Ideal for detailed feature breakdowns or benefit lists.",
    semanticTags: [
      "cta",
      "call-to-action",
      "features",
      "list",
      "benefits",
      "icons",
      "vertical",
    ],
    category: "cta",
    component: CtaFeatureList,
    props: "CtaFeatureListProps",
    exampleUsage: `
<CtaFeatureList
  heading="Everything You Need"
  description="Powerful features for modern teams"
  features={[
    { icon: "lucide/shield", title: "Security", description: "Enterprise-grade protection" },
    { icon: "lucide/zap", title: "Speed", description: "Lightning-fast performance" }
  ]}
  primaryButton={{ text: "Start Building", href: "/start" }}
/>
    `.trim(),
  },
  "cta-split-image-logos": {
    id: "cta-split-image-logos",
    name: "CTA Split Image with Logos",
    description:
      "A split-layout CTA with content and buttons on one side, featured image on the other, and trusted company logos below. Perfect for building credibility with social proof.",
    semanticTags: [
      "cta",
      "call-to-action",
      "split-layout",
      "image",
      "logos",
      "social-proof",
      "trust",
      "companies",
    ],
    category: "cta",
    component: CtaSplitImageLogos,
    props: "CtaSplitImageLogosProps",
    exampleUsage: `
<CtaSplitImageLogos
  heading="Trusted by Industry Leaders"
  description="Join thousands of companies using our platform"
  primaryButton={{ text: "Get Started", href: "/start" }}
  secondaryButton={{ text: "Contact Sales", href: "/contact" }}
  imageSrc="/images/dashboard.jpg"
  logos={["/logos/company1.svg", "/logos/company2.svg"]}
/>
    `.trim(),
  },
  "cta-fullwidth-background": {
    id: "cta-fullwidth-background",
    name: "CTA Fullwidth Background",
    description:
      "A full-width CTA section with a background image, gradient overlay, centered heading, description, and action buttons. Creates a dramatic, immersive call-to-action experience.",
    semanticTags: [
      "cta",
      "call-to-action",
      "fullwidth",
      "background-image",
      "overlay",
      "hero",
      "dramatic",
      "centered",
    ],
    category: "cta",
    component: CtaFullwidthBackground,
    props: "CtaFullwidthBackgroundProps",
    exampleUsage: `
<CtaFullwidthBackground
  heading="Ready to Get Started?"
  description="Join thousands of satisfied customers today"
  primaryButton={{ text: "Start Free Trial", href: "/trial" }}
  secondaryButton={{ text: "Learn More", href: "/about" }}
  backgroundImage="/images/hero-bg.jpg"
/>
    `.trim(),
  },
  "cta-feature-cards-grid": {
    id: "cta-feature-cards-grid",
    name: "CTA Feature Cards Grid",
    description:
      "A CTA section with heading, description, action buttons, and a grid of feature cards with icons. Each card highlights a key feature or benefit. Great for product pages or service overviews.",
    semanticTags: [
      "cta",
      "call-to-action",
      "cards",
      "grid",
      "features",
      "icons",
      "benefits",
      "product",
    ],
    category: "cta",
    component: CtaFeatureCardsGrid,
    props: "CtaFeatureCardsGridProps",
    exampleUsage: `
<CtaFeatureCardsGrid
  heading="Powerful Features"
  description="Everything you need to succeed"
  primaryButton={{ text: "Get Started", href: "/start" }}
  features={[
    { icon: "lucide/zap", title: "Fast", description: "Lightning performance" },
    { icon: "lucide/shield", title: "Secure", description: "Enterprise security" }
  ]}
/>
    `.trim(),
  },
  "cta-accent-background": {
    id: "cta-accent-background",
    name: "CTA Accent Background",
    description:
      "A CTA section with an accent-colored background, large heading, description, and dual action buttons. The colored background creates visual distinction and draws attention.",
    semanticTags: [
      "cta",
      "call-to-action",
      "accent",
      "colored-background",
      "centered",
      "prominent",
      "attention",
    ],
    category: "cta",
    component: CtaAccentBackground,
    props: "CtaAccentBackgroundProps",
    exampleUsage: `
<CtaAccentBackground
  heading="Start Your Journey Today"
  description="No credit card required. Free 14-day trial."
  buttons={[
    { text: "Get Started", href: "/start", variant: "default" },
    { text: "Contact Sales", href: "/contact", variant: "outline" }
  ]}
/>
    `.trim(),
  },
  "cta-split-gradient-image": {
    id: "cta-split-gradient-image",
    name: "CTA Split Gradient Image",
    description:
      "A split-layout CTA with content on one side, featured image on the other, and a subtle radial gradient background. Creates an elegant, modern appearance.",
    semanticTags: [
      "cta",
      "call-to-action",
      "split-layout",
      "gradient",
      "image",
      "elegant",
      "modern",
    ],
    category: "cta",
    component: CtaSplitGradientImage,
    props: "CtaSplitGradientImageProps",
    exampleUsage: `
<CtaSplitGradientImage
  heading="Elevate Your Business"
  description="Modern solutions for modern challenges"
  primaryButton={{ text: "Get Started", href: "/start" }}
  secondaryButton={{ text: "Learn More", href: "/about" }}
  imageSrc="/images/product.jpg"
/>
    `.trim(),
  },
  "cta-background-icon-badge": {
    id: "cta-background-icon-badge",
    name: "CTA Background Icon Badge",
    description:
      "A full-width CTA with background image, icon badge, heading, and action buttons. The icon badge adds a distinctive visual element above the heading.",
    semanticTags: [
      "cta",
      "call-to-action",
      "background-image",
      "icon",
      "badge",
      "fullwidth",
      "overlay",
    ],
    category: "cta",
    component: CtaBackgroundIconBadge,
    props: "CtaBackgroundIconBadgeProps",
    exampleUsage: `
<CtaBackgroundIconBadge
  icon="lucide/rocket"
  heading="Launch Your Project"
  description="Get started in minutes"
  primaryButton={{ text: "Start Now", href: "/start" }}
  backgroundImage="/images/hero-bg.jpg"
/>
    `.trim(),
  },
  "cta-pattern-background": {
    id: "cta-pattern-background",
    name: "CTA Pattern Background",
    description:
      "A CTA section with a subtle pattern background, centered heading, description, and action buttons. The pattern adds visual interest without overwhelming the content.",
    semanticTags: [
      "cta",
      "call-to-action",
      "pattern",
      "background",
      "centered",
      "subtle",
      "decorative",
    ],
    category: "cta",
    component: CtaPatternBackground,
    props: "CtaPatternBackgroundProps",
    exampleUsage: `
<CtaPatternBackground
  heading="Ready to Transform?"
  description="Join thousands of happy customers"
  primaryButton={{ text: "Get Started", href: "/start" }}
  secondaryButton={{ text: "Learn More", href: "/about" }}
/>
    `.trim(),
  },
  "cta-platform-demo": {
    id: "cta-platform-demo",
    name: "CTA Platform Demo",
    description:
      "A CTA section promoting platform exploration with content on one side and decorative product images on the other. Ideal for SaaS products or platform showcases.",
    semanticTags: [
      "cta",
      "call-to-action",
      "platform",
      "demo",
      "product",
      "showcase",
      "saas",
      "split-layout",
    ],
    category: "cta",
    component: CtaPlatformDemo,
    props: "CtaPlatformDemoProps",
    exampleUsage: `
<CtaPlatformDemo
  heading="See It In Action"
  description="Experience the power of our platform"
  primaryButton={{ text: "Request Demo", href: "/demo" }}
  secondaryButton={{ text: "Start Free", href: "/trial" }}
/>
    `.trim(),
  },
  "cta-enterprise-split": {
    id: "cta-enterprise-split",
    name: "CTA Enterprise Split",
    description:
      "A split-layout CTA with enterprise messaging and buttons on one side, documentation/demo links with icons on the other. Perfect for enterprise or B2B landing pages.",
    semanticTags: [
      "cta",
      "call-to-action",
      "enterprise",
      "split-layout",
      "b2b",
      "documentation",
      "links",
      "cards",
    ],
    category: "cta",
    component: CtaEnterpriseSplit,
    props: "CtaEnterpriseSplitProps",
    exampleUsage: `
<CtaEnterpriseSplit
  heading="Enterprise Ready"
  description="Built for scale and security"
  primaryButton={{ text: "Contact Sales", href: "/contact" }}
  links={[
    { icon: "lucide/book", title: "Documentation", description: "Read the docs", href: "/docs" },
    { icon: "lucide/play", title: "Demo", description: "Watch demo", href: "/demo" }
  ]}
/>
    `.trim(),
  },
  "cta-minimal-separator": {
    id: "cta-minimal-separator",
    name: "CTA Minimal Separator",
    description:
      "A minimal CTA section with centered text and a single button flanked by horizontal separators. Clean and understated design for subtle calls-to-action.",
    semanticTags: [
      "cta",
      "call-to-action",
      "minimal",
      "separator",
      "centered",
      "clean",
      "simple",
    ],
    category: "cta",
    component: CtaMinimalSeparator,
    props: "CtaMinimalSeparatorProps",
    exampleUsage: `
<CtaMinimalSeparator
  heading="Ready to begin?"
  buttonText="Get Started"
  buttonHref="/start"
/>
    `.trim(),
  },
  "cta-image-overlay-arrow": {
    id: "cta-image-overlay-arrow",
    name: "CTA Image Overlay Arrow",
    description:
      "A CTA section with background image, centered heading, and a prominent button with an arrow icon. The arrow adds visual direction and encourages action.",
    semanticTags: [
      "cta",
      "call-to-action",
      "background-image",
      "overlay",
      "arrow",
      "centered",
      "action",
    ],
    category: "cta",
    component: CtaImageOverlayArrow,
    props: "CtaImageOverlayArrowProps",
    exampleUsage: `
<CtaImageOverlayArrow
  heading="Start Your Journey"
  buttonText="Explore Now"
  buttonHref="/explore"
  backgroundImage="/images/hero-bg.jpg"
/>
    `.trim(),
  },
  "cta-image-overlay-centered": {
    id: "cta-image-overlay-centered",
    name: "Image Overlay Centered CTA",
    description:
      "A full-width CTA banner with a background image and dark gradient overlay, centered heading, supporting copy, and dual action buttons. Ideal for high-impact conversion moments.",
    semanticTags: [
      "cta",
      "call-to-action",
      "image",
      "overlay",
      "centered",
      "conversion",
      "banner",
      "full-width",
    ],
    category: "cta",
    component: CtaImageOverlayCentered,
    props: "CtaImageOverlayCenteredProps",
    exampleUsage: `<CtaImageOverlayCentered />`.trim(),
  },
  "cta-app-download-newsletter": {
    id: "cta-app-download-newsletter",
    name: "CTA App Download Newsletter",
    description:
      "A two-column CTA grid featuring an app download section with phone mockup and a newsletter subscription form. Perfect for mobile apps with email marketing.",
    semanticTags: [
      "cta",
      "call-to-action",
      "app-download",
      "newsletter",
      "mobile",
      "subscription",
      "email",
      "two-column",
    ],
    category: "cta",
    component: CtaAppDownloadNewsletter,
    props: "CtaAppDownloadNewsletterProps",
    exampleUsage: `
<CtaAppDownloadNewsletter
  appHeading="Get the App"
  appDescription="Available on iOS and Android"
  newsletterHeading="Stay Updated"
  newsletterDescription="Subscribe to our newsletter"
/>
    `.trim(),
  },
  "cta-newsletter-features": {
    id: "cta-newsletter-features",
    name: "CTA Newsletter Features",
    description:
      "A newsletter subscription CTA with badge, heading, email form, and a list of subscription benefits. Highlights the value of subscribing with feature icons.",
    semanticTags: [
      "cta",
      "call-to-action",
      "newsletter",
      "subscription",
      "email",
      "features",
      "benefits",
      "form",
    ],
    category: "cta",
    component: CtaNewsletterFeatures,
    props: "CtaNewsletterFeaturesProps",
    exampleUsage: `
<CtaNewsletterFeatures
  badge="Newsletter"
  heading="Stay in the Loop"
  description="Get weekly updates and insights"
  features={["Industry news", "Product updates", "Tips & tricks"]}
/>
    `.trim(),
  },
  "cta-hero-feature-cards": {
    id: "cta-hero-feature-cards",
    name: "CTA Hero Feature Cards",
    description:
      "A CTA section with a hero image and centered content, plus feature cards below. Combines visual impact with detailed feature highlights.",
    semanticTags: [
      "cta",
      "call-to-action",
      "hero",
      "image",
      "feature-cards",
      "grid",
      "showcase",
    ],
    category: "cta",
    component: CtaHeroFeatureCards,
    props: "CtaHeroFeatureCardsProps",
    exampleUsage: `
<CtaHeroFeatureCards
  heading="The Complete Platform"
  description="Everything you need in one place"
  primaryButton={{ text: "Get Started", href: "/start" }}
  heroImage="/images/hero.jpg"
  features={[
    { title: "Analytics", description: "Track everything" },
    { title: "Automation", description: "Save time" }
  ]}
/>
    `.trim(),
  },
  "cta-enterprise-dark-features": {
    id: "cta-enterprise-dark-features",
    name: "CTA Enterprise Dark Features",
    description:
      "A dark-themed enterprise CTA with serif heading, feature list with icons, and layered decorative images. Creates a premium, sophisticated appearance.",
    semanticTags: [
      "cta",
      "call-to-action",
      "enterprise",
      "dark-theme",
      "features",
      "premium",
      "sophisticated",
      "serif",
    ],
    category: "cta",
    component: CtaEnterpriseDarkFeatures,
    props: "CtaEnterpriseDarkFeaturesProps",
    exampleUsage: `
<CtaEnterpriseDarkFeatures
  heading="Enterprise Solutions"
  description="Built for the world's leading companies"
  features={[
    { icon: "lucide/shield", text: "Enterprise security" },
    { icon: "lucide/users", text: "Team collaboration" }
  ]}
  primaryButton={{ text: "Contact Sales", href: "/contact" }}
/>
    `.trim(),
  },
  "cta-gradient-logos-floating": {
    id: "cta-gradient-logos-floating",
    name: "CTA Gradient Logos Floating",
    description:
      "A CTA section with gradient text heading, centered content, and floating logo circles on both sides. Creates a dynamic, modern appearance with social proof.",
    semanticTags: [
      "cta",
      "call-to-action",
      "gradient",
      "logos",
      "floating",
      "social-proof",
      "modern",
      "dynamic",
    ],
    category: "cta",
    component: CtaGradientLogosFloating,
    props: "CtaGradientLogosFloatingProps",
    exampleUsage: `
<CtaGradientLogosFloating
  heading="Trusted by Innovators"
  description="Join the companies transforming their industries"
  primaryButton={{ text: "Get Started", href: "/start" }}
/>
    `.trim(),
  },
  "cta-gradient-stats-hero": {
    id: "cta-gradient-stats-hero",
    name: "CTA Gradient Stats Hero",
    description:
      "A hero-style CTA with gradient background, heading, description, action buttons, and floating stats cards. Combines visual appeal with social proof metrics.",
    semanticTags: [
      "cta",
      "call-to-action",
      "hero",
      "gradient",
      "stats",
      "metrics",
      "social-proof",
      "cards",
    ],
    category: "cta",
    component: CtaGradientStatsHero,
    props: "CtaGradientStatsHeroProps",
    exampleUsage: `
<CtaGradientStatsHero
  heading="Proven Results"
  description="See why teams choose us"
  primaryButton={{ text: "Start Free", href: "/trial" }}
  stats={[
    { value: "10K+", label: "Customers" },
    { value: "99.9%", label: "Uptime" }
  ]}
/>
    `.trim(),
  },
  "cta-video-background-hero": {
    id: "cta-video-background-hero",
    name: "CTA Video Background Hero",
    description:
      "A hero CTA with looping video background, gradient overlay, heading, description, and buttons including a video modal trigger. Creates an immersive, cinematic experience.",
    semanticTags: [
      "cta",
      "call-to-action",
      "hero",
      "video",
      "background",
      "cinematic",
      "immersive",
      "modal",
    ],
    category: "cta",
    component: CtaVideoBackgroundHero,
    props: "CtaVideoBackgroundHeroProps",
    exampleUsage: `
<CtaVideoBackgroundHero
  heading="Experience the Future"
  description="See what's possible with our platform"
  primaryButton={{ text: "Get Started", href: "/start" }}
  backgroundVideo="/videos/hero-bg.mp4"
  modalVideo="/videos/demo.mp4"
/>
    `.trim(),
  },
  "cta-workflow-tabs": {
    id: "cta-workflow-tabs",
    name: "CTA Workflow Tabs",
    description:
      "A hero CTA with tabbed content sections for different workflows (design, develop, deploy). Each tab shows relevant content and imagery. Perfect for developer tools or multi-step processes.",
    semanticTags: [
      "cta",
      "call-to-action",
      "tabs",
      "workflow",
      "process",
      "developer",
      "interactive",
      "multi-step",
    ],
    category: "cta",
    component: CtaWorkflowTabs,
    props: "CtaWorkflowTabsProps",
    exampleUsage: `
<CtaWorkflowTabs
  heading="Your Complete Workflow"
  description="From design to deployment"
  tabs={[
    { id: "design", label: "Design", title: "Create", description: "Build beautiful interfaces", image: "/images/design.jpg" },
    { id: "develop", label: "Develop", title: "Code", description: "Write clean code", image: "/images/develop.jpg" }
  ]}
  primaryButton={{ text: "Start Building", href: "/start" }}
/>
    `.trim(),
  },
  "cta-case-study-testimonial": {
    id: "cta-case-study-testimonial",
    name: "CTA Case Study Testimonial",
    description:
      "A comprehensive case study CTA with testimonial quote, challenge/solution/results breakdown, stats cards, and video thumbnail. Perfect for showcasing customer success stories.",
    semanticTags: [
      "cta",
      "call-to-action",
      "case-study",
      "testimonial",
      "stats",
      "success-story",
      "customer",
      "results",
    ],
    category: "cta",
    component: CtaCaseStudyTestimonial,
    props: "CtaCaseStudyTestimonialProps",
    exampleUsage: `
<CtaCaseStudyTestimonial
  quote="This platform transformed our business"
  author={{ name: "Jane Doe", title: "CEO", company: "Acme Inc" }}
  sections={[
    { title: "Challenge", content: "Scaling operations" },
    { title: "Solution", content: "Automated workflows" },
    { title: "Results", content: "3x productivity" }
  ]}
  stats={[{ value: "300%", label: "Growth" }]}
/>
    `.trim(),
  },
  "cta-simple-centered": {
    id: "cta-simple-centered",
    name: "CTA Simple Centered",
    description:
      "A minimal centered CTA section with heading, description, and primary/secondary action buttons. Simple, straightforward design focused on conversion.",
    semanticTags: [
      "cta",
      "call-to-action",
      "simple",
      "centered",
      "minimal",
      "conversion",
      "clean",
    ],
    category: "cta",
    component: CtaSimpleCentered,
    props: "CtaSimpleCenteredProps",
    exampleUsage: `
<CtaSimpleCentered
  heading="Ready to Get Started?"
  description="Join thousands of satisfied customers"
  primaryButton={{ text: "Start Free Trial", href: "/trial" }}
  secondaryButton={{ text: "Contact Sales", href: "/contact" }}
/>
    `.trim(),
  },
  "contact-floating-banner": {
    id: "contact-floating-banner",
    name: "Contact Floating Banner",
    description:
      "A fixed floating banner at the bottom of the page with a promotional message and CTA button. Perfect for persistent contact prompts or special offers.",
    semanticTags: [
      "contact",
      "banner",
      "floating",
      "fixed",
      "cta",
      "promotional",
      "persistent",
    ],
    category: "contact",
    component: ContactFloatingBanner,
    props: "ContactFloatingBannerProps",
    exampleUsage: `
<ContactFloatingBanner
  badgeText="Limited Offer"
  message="Get 20% off your first order!"
  buttonText="Claim Offer"
  buttonHref="/contact"
/>
    `.trim(),
  },
  "contact-callback": {
    id: "contact-callback",
    name: "Contact Callback Request",
    description:
      "A comprehensive callback scheduling form with date/time selection, timezone, topic selection, and detailed information fields. Ideal for professional services requiring scheduled consultations.",
    semanticTags: [
      "contact",
      "callback",
      "scheduling",
      "form",
      "appointment",
      "consultation",
      "professional-services",
    ],
    category: "contact",
    component: ContactCallback,
    props: "ContactCallbackProps",
    exampleUsage: `
<ContactCallback
  heading="Request a Callback"
  description="Schedule a time that works for you"
  buttonText="Schedule Callback"
  formConfig={{ endpoint: "/api/callback", format: "json" }}
/>
    `.trim(),
  },
  "contact-card": {
    id: "contact-card",
    name: "Contact Card Form",
    description:
      "A simple contact form with card layout featuring form fields on one side and contact information with multiple contact methods on the other. Clean, professional design.",
    semanticTags: [
      "contact",
      "form",
      "card",
      "split-layout",
      "contact-info",
      "simple",
    ],
    category: "contact",
    component: ContactCard,
    props: "ContactCardProps",
    exampleUsage: `
<ContactCard
  heading="Get In Touch"
  description="We'd love to hear from you. Send us a message and we'll respond as soon as possible."
  buttonText="Send Message"
  contactOptions={[
    { icon: "Phone", info: "+1 (555) 987-6543", href: "tel:+15559876543" },
    { icon: "Mail", info: "support@example.com", href: "mailto:support@example.com" },
    { icon: "MapPin", info: "456 Business Ave, New York, NY 10001" },
    { icon: "Clock", info: "Mon-Fri: 9 AM - 6 PM EST" },
  ]}
  formEngineSetup={{ formConfig: { endpoint: "/api/contact", format: "json" } }}
/>
    `.trim(),
  },
  "contact-careers": {
    id: "contact-careers",
    name: "Contact Careers Application",
    description:
      "A comprehensive job application form with position selection, resume upload, LinkedIn/portfolio links, availability options, and personal information. Perfect for career pages.",
    semanticTags: [
      "contact",
      "careers",
      "jobs",
      "application",
      "form",
      "resume",
      "upload",
      "hiring",
    ],
    category: "contact",
    component: ContactCareers,
    props: "ContactCareersProps",
    exampleUsage: `
<ContactCareers
  heading="Join Our Team"
  description="We're always looking for talented people"
  buttonText="Submit Application"
  formConfig={{ endpoint: "/api/careers", format: "json" }}
/>
    `.trim(),
  },
  "contact-catering": {
    id: "contact-catering",
    name: "Contact Catering Inquiry",
    description:
      "A catering inquiry form with event type selection, guest count, date picker, dietary restrictions checkboxes, and venue information. Ideal for catering and event planning businesses.",
    semanticTags: [
      "contact",
      "catering",
      "events",
      "form",
      "inquiry",
      "dietary",
      "event-planning",
    ],
    category: "contact",
    component: ContactCatering,
    props: "ContactCateringProps",
    exampleUsage: `
<ContactCatering
  heading="Catering Inquiry"
  description="Let us make your event unforgettable"
  buttonText="Request Quote"
  formConfig={{ endpoint: "/api/catering", format: "json" }}
/>
    `.trim(),
  },
  "contact-consultation": {
    id: "contact-consultation",
    name: "Contact Consultation Booking",
    description:
      "A consultation booking form with service selection, duration preferences, budget range, and detailed information fields. Perfect for professional services and consulting businesses.",
    semanticTags: [
      "contact",
      "consultation",
      "booking",
      "form",
      "services",
      "professional",
      "advisory",
    ],
    category: "contact",
    component: ContactConsultation,
    props: "ContactConsultationProps",
    exampleUsage: `
<ContactConsultation
  heading="Book a Consultation"
  description="Let's discuss how we can help your business"
  buttonText="Book Consultation"
  formConfig={{ endpoint: "/api/consultation", format: "json" }}
/>
    `.trim(),
  },
  "contact-dark": {
    id: "contact-dark",
    name: "Contact Dark Theme",
    description:
      "A dark-themed contact form with split layout featuring form fields on one side and contact information with social links on a dark background. Modern, high-contrast design.",
    semanticTags: [
      "contact",
      "form",
      "dark",
      "theme",
      "split-layout",
      "social",
      "modern",
    ],
    category: "contact",
    component: ContactDark,
    props: "ContactDarkProps",
    exampleUsage: `
<ContactDark
  heading="Contact Us"
  description="Any questions or remarks? Just write us a message!"
  buttonText="Send Message"
  formEngineSetup={{ formConfig: { endpoint: "/api/contact", format: "json" } }}
/>
    `.trim(),
  },
  "contact-demo": {
    id: "contact-demo",
    name: "Contact Demo Request",
    description:
      "A demo request form with use case selection, team size, timeline, and company information. Perfect for SaaS products and B2B services requiring product demonstrations.",
    semanticTags: [
      "contact",
      "demo",
      "request",
      "form",
      "saas",
      "b2b",
      "product",
      "trial",
    ],
    category: "contact",
    component: ContactDemo,
    props: "ContactDemoProps",
    exampleUsage: `
<ContactDemo
  heading="Request a Demo"
  description="See how we can help your team work smarter"
  buttonText="Request Demo"
  formConfig={{ endpoint: "/api/demo", format: "json" }}
/>
    `.trim(),
  },
  "contact-emergency": {
    id: "contact-emergency",
    name: "Contact Emergency",
    description:
      "An urgent contact form with priority level selection and immediate response options. Features visual priority indicators and streamlined fields for critical situations.",
    semanticTags: [
      "contact",
      "emergency",
      "urgent",
      "priority",
      "support",
      "critical",
      "form",
    ],
    category: "contact",
    component: ContactEmergency,
    props: "ContactEmergencyProps",
    exampleUsage: `
<ContactEmergency
  heading="Emergency Contact"
  description="We're here to help 24/7"
  buttonText="Submit Emergency Request"
  formEngineSetup={{ formConfig: { endpoint: "/api/emergency", format: "json" } }}
/>
    `.trim(),
  },
  "contact-event": {
    id: "contact-event",
    name: "Contact Event Registration",
    description:
      "Event registration form with attendee information and event-specific fields. Perfect for conferences, workshops, and community events.",
    semanticTags: [
      "contact",
      "event",
      "registration",
      "form",
      "rsvp",
      "attendee",
    ],
    category: "contact",
    component: ContactEvent,
    props: "ContactEventProps",
    exampleUsage: `
<ContactEvent
  heading="Event Registration"
  description="Register for our event"
  buttonText="Register"
  formConfig={{ endpoint: "/api/event", format: "json" }}
/>
    `.trim(),
  },
  "contact-faq": {
    id: "contact-faq",
    name: "Contact FAQ",
    description:
      "A two-column contact form with an FAQ accordion sidebar. Displays frequently asked questions alongside a contact form so visitors can find answers before submitting inquiries. Falls back to a single-column centered layout when no FAQ items are provided.",
    semanticTags: [
      "contact",
      "faq",
      "questions",
      "inquiry",
      "form",
      "support",
      "accordion",
      "two-column",
    ],
    category: "contact",
    component: ContactFaq,
    props: "ContactFaqProps",
    exampleUsage: `
<ContactFaq
  heading="Have a Question?"
  description="Check our FAQs or send us a message"
  faqHeading="Frequently Asked Questions"
  items={[
    { id: "1", question: "What are your hours?", answer: "We are open Monday to Friday, 9am to 5pm." },
    { id: "2", question: "How do I reset my password?", answer: "Click the forgot password link on the login page." },
  ]}
  formHeading="Still need help?"
  buttonText="Send Question"
  formConfig={{ endpoint: "/api/faq", format: "json" }}
/>
    `.trim(),
  },
  "contact-feedback": {
    id: "contact-feedback",
    name: "Contact Feedback",
    description:
      "A simple feedback form with email and feedback message fields. Ideal for collecting customer feedback and suggestions.",
    semanticTags: [
      "contact",
      "feedback",
      "survey",
      "form",
      "customer-feedback",
    ],
    category: "contact",
    component: ContactFeedback,
    props: "ContactFeedbackProps",
    exampleUsage: `
<ContactFeedback
  heading="Share Your Feedback"
  description="We value your input"
  buttonText="Submit Feedback"
  formConfig={{ endpoint: "/api/feedback", format: "json" }}
/>
    `.trim(),
  },
  "contact-fitness": {
    id: "contact-fitness",
    name: "Contact Fitness Consultation",
    description:
      "Fitness consultation form with goals, experience level, and health information. Perfect for gyms, personal trainers, and wellness centers.",
    semanticTags: [
      "contact",
      "fitness",
      "consultation",
      "form",
      "health",
      "wellness",
    ],
    category: "contact",
    component: ContactFitness,
    props: "ContactFitnessProps",
    exampleUsage: `
<ContactFitness
  heading="Fitness Consultation"
  description="Start your fitness journey"
  buttonText="Book Consultation"
  formConfig={{ endpoint: "/api/fitness", format: "json" }}
/>
    `.trim(),
  },
  "contact-guest": {
    id: "contact-guest",
    name: "Contact Guest Information",
    description:
      "Guest information form for hospitality and event management. Collects detailed guest preferences and requirements.",
    semanticTags: [
      "contact",
      "guest",
      "hospitality",
      "form",
      "booking",
      "accommodation",
    ],
    category: "contact",
    component: ContactGuest,
    props: "ContactGuestProps",
    exampleUsage: `
<ContactGuest
  heading="Guest Information"
  description="Provide your guest details"
  buttonText="Submit Information"
  formConfig={{ endpoint: "/api/guest", format: "json" }}
/>
    `.trim(),
  },
  "contact-image": {
    id: "contact-image",
    name: "Contact Image",
    description:
      "Split-layout contact form with an image panel featuring overlay contact items (phone, email, etc.) on the left and a form with heading on the right. Modern, professional design with motion animations.",
    semanticTags: [
      "contact",
      "form",
      "image",
      "split-layout",
      "overlay",
      "modern",
    ],
    category: "contact",
    component: ContactImage,
    props: "ContactImageProps",
    exampleUsage: `
<ContactImage
  eyebrow="Get in Touch"
  heading="Contact Us"
  description="We'd love to hear from you."
  image={{ src: "/office.jpg", alt: "Our office" }}
  contactOverlays={[
    { icon: "lucide/phone", label: "Phone", title: "+1 (555) 987-6543", href: "tel:+15559876543" },
    { icon: "lucide/mail", label: "Email", title: "support@example.com", href: "mailto:support@example.com" },
  ]}
  formEngineSetup={{ formConfig: { endpoint: "/api/contact", format: "json" } }}
/>
    `.trim(),
  },
  "contact-insurance": {
    id: "contact-insurance",
    name: "Contact Insurance Quote",
    description:
      "Insurance quote request form with coverage type, policy details, and personal information. Ideal for insurance agencies and brokers.",
    semanticTags: [
      "contact",
      "insurance",
      "quote",
      "form",
      "coverage",
      "policy",
    ],
    category: "contact",
    component: ContactInsurance,
    props: "ContactInsuranceProps",
    exampleUsage: `
<ContactInsurance
  heading="Insurance Quote"
  description="Get an insurance quote"
  buttonText="Request Quote"
  formConfig={{ endpoint: "/api/insurance", format: "json" }}
/>
    `.trim(),
  },
  "contact-interview": {
    id: "contact-interview",
    name: "Contact Interview Scheduling",
    description:
      "Interview scheduling form with position, availability, and candidate information. Perfect for HR and recruitment teams.",
    semanticTags: [
      "contact",
      "interview",
      "scheduling",
      "form",
      "recruitment",
      "hr",
    ],
    category: "contact",
    component: ContactInterview,
    props: "ContactInterviewProps",
    exampleUsage: `
<ContactInterview
  heading="Schedule Interview"
  description="Book an interview time"
  buttonText="Schedule"
  formConfig={{ endpoint: "/api/interview", format: "json" }}
/>
    `.trim(),
  },
  "contact-locations": {
    id: "contact-locations",
    name: "Contact Locations",
    description:
      "Multi-location contact form with location selection and contact information. Ideal for businesses with multiple offices or stores.",
    semanticTags: ["contact", "locations", "multi-location", "form", "offices"],
    category: "contact",
    component: ContactLocations,
    props: "ContactLocationsProps",
    exampleUsage: `
<ContactLocations
  heading="Find a Location"
  description="Contact us at one of our locations"
  buttonText="Send Message"
  formConfig={{ endpoint: "/api/contact", format: "json" }}
/>
    `.trim(),
  },
  "contact-maintenance": {
    id: "contact-maintenance",
    name: "Contact Maintenance Request",
    description:
      "Maintenance request form with issue type, priority, and detailed description. Perfect for property management and facility services.",
    semanticTags: [
      "contact",
      "maintenance",
      "request",
      "form",
      "property",
      "facility",
    ],
    category: "contact",
    component: ContactMaintenance,
    props: "ContactMaintenanceProps",
    exampleUsage: `
<ContactMaintenance
  heading="Maintenance Request"
  description="Submit a maintenance request"
  buttonText="Submit Request"
  formConfig={{ endpoint: "/api/maintenance", format: "json" }}
/>
    `.trim(),
  },
  "contact-map": {
    id: "contact-map",
    name: "Contact Map",
    description:
      "Contact form with integrated map display. Shows location information alongside contact form fields.",
    semanticTags: ["contact", "map", "location", "form", "address"],
    category: "contact",
    component: ContactMap,
    props: "ContactMapProps",
    exampleUsage: `
<ContactMap
  heading="Contact Us"
  description="Find us on the map and get in touch"
  buttonText="Send Message"
  formConfig={{ endpoint: "/api/contact", format: "json" }}
/>
    `.trim(),
  },
  "contact-minimal": {
    id: "contact-minimal",
    name: "Contact Minimal",
    description:
      "Minimal contact form with just name, email, and message fields. Clean and simple design for basic contact needs.",
    semanticTags: ["contact", "minimal", "simple", "form", "basic"],
    category: "contact",
    component: ContactMinimal,
    props: "ContactMinimalProps",
    exampleUsage: `
<ContactMinimal
  heading="Let's Talk"
  description="Send us a message"
  buttonText="Send Message"
  formConfig={{ endpoint: "/api/contact", format: "json" }}
/>
    `.trim(),
  },
  "contact-moving": {
    id: "contact-moving",
    name: "Contact Moving Services",
    description:
      "Moving services request form with move details, inventory, and scheduling. Perfect for moving companies and relocation services.",
    semanticTags: [
      "contact",
      "moving",
      "relocation",
      "form",
      "services",
      "logistics",
    ],
    category: "contact",
    component: ContactMoving,
    props: "ContactMovingProps",
    exampleUsage: `
<ContactMoving
  heading="Moving Services"
  description="Get help with your move"
  buttonText="Request Quote"
  formConfig={{ endpoint: "/api/moving", format: "json" }}
/>
    `.trim(),
  },
  "contact-multistep": {
    id: "contact-multistep",
    name: "Contact Multistep",
    description:
      "Multi-step contact form with progressive disclosure. Breaks complex forms into manageable steps for better user experience.",
    semanticTags: [
      "contact",
      "multistep",
      "wizard",
      "form",
      "progressive",
      "complex",
    ],
    category: "contact",
    component: ContactMultistep,
    props: "ContactMultistepProps",
    exampleUsage: `
<ContactMultistep
  heading="Contact Us"
  description="Multi-step contact form"
  buttonText="Continue"
  formConfig={{ endpoint: "/api/contact", format: "json" }}
/>
    `.trim(),
  },
  "contact-partnership": {
    id: "contact-partnership",
    name: "Contact Partnership Inquiry",
    description:
      "Partnership inquiry form with company information and collaboration details. Ideal for B2B partnerships and strategic alliances.",
    semanticTags: [
      "contact",
      "partnership",
      "collaboration",
      "form",
      "b2b",
      "alliance",
    ],
    category: "contact",
    component: ContactPartnership,
    props: "ContactPartnershipProps",
    exampleUsage: `
<ContactPartnership
  heading="Partnership Inquiry"
  description="Explore partnership opportunities"
  buttonText="Submit Inquiry"
  formConfig={{ endpoint: "/api/partnership", format: "json" }}
/>
    `.trim(),
  },
  "contact-photography": {
    id: "contact-photography",
    name: "Contact Photography Services",
    description:
      "Full-width split-screen contact form with edge-to-edge design, featuring heading, description and form on one side and a large full-height image on the other. Pattern background support, configurable media placement. Perfect for photographers, studios, and creative services.",
    semanticTags: [
      "contact",
      "photography",
      "split-screen",
      "form",
      "image",
      "creative",
      "edge-to-edge",
    ],
    category: "contact",
    component: ContactPhotography,
    props: "ContactPhotographyProps",
    exampleUsage: `
<ContactPhotography
  heading="Photography Services"
  description="Book a photography session with us"
  buttonText="Send Message"
  imageSrc="/studio.jpg"
  background="dark"
  pattern="grid"
  formConfig={{ endpoint: "/api/photography", format: "json" }}
/>
    `.trim(),
  },
  "contact-press": {
    id: "contact-press",
    name: "Contact Press Inquiries",
    description:
      "Press and media inquiry form with publication details and story information. Designed for PR teams and media relations.",
    semanticTags: ["contact", "press", "media", "form", "pr", "journalism"],
    category: "contact",
    component: ContactPress,
    props: "ContactPressProps",
    exampleUsage: `
<ContactPress
  heading="Press Inquiries"
  description="Media and press contact form"
  buttonText="Submit Inquiry"
  formConfig={{ endpoint: "/api/press", format: "json" }}
/>
    `.trim(),
  },
  "contact-quote": {
    id: "contact-quote",
    name: "Contact Quote Request",
    description:
      "Quote request form with project details, budget, and timeline. Ideal for service providers and contractors.",
    semanticTags: [
      "contact",
      "quote",
      "request",
      "form",
      "pricing",
      "estimate",
    ],
    category: "contact",
    component: ContactQuote,
    props: "ContactQuoteProps",
    exampleUsage: `
<ContactQuote
  heading="Request a Quote"
  description="Get a custom quote for your project"
  buttonText="Request Quote"
  formConfig={{ endpoint: "/api/quote", format: "json" }}
/>
    `.trim(),
  },
  "contact-referral": {
    id: "contact-referral",
    name: "Contact Referral",
    description:
      "Referral form for recommending friends or colleagues. Includes referrer and referee information with incentive details.",
    semanticTags: [
      "contact",
      "referral",
      "recommendation",
      "form",
      "rewards",
      "incentive",
    ],
    category: "contact",
    component: ContactReferral,
    props: "ContactReferralProps",
    exampleUsage: `
<ContactReferral
  heading="Refer a Friend"
  description="Know someone who could benefit from our services?"
  buttonText="Submit Referral"
  formConfig={{ endpoint: "/api/referral", format: "json" }}
/>
    `.trim(),
  },
  "contact-report": {
    id: "contact-report",
    name: "Contact Report Issue",
    description:
      "Issue reporting form with category, severity, and detailed description. Perfect for bug reports and problem tracking.",
    semanticTags: [
      "contact",
      "report",
      "issue",
      "form",
      "bug",
      "problem",
      "support",
    ],
    category: "contact",
    component: ContactReport,
    props: "ContactReportProps",
    exampleUsage: `
<ContactReport
  heading="Report an Issue"
  description="Help us improve by reporting problems"
  buttonText="Submit Report"
  formConfig={{ endpoint: "/api/report", format: "json" }}
/>
    `.trim(),
  },
  "contact-reservation": {
    id: "contact-reservation",
    name: "Contact Reservation",
    description:
      "Reservation form with date, time, party size, and special requests. Ideal for restaurants, hotels, and event venues.",
    semanticTags: [
      "contact",
      "reservation",
      "booking",
      "form",
      "hospitality",
      "restaurant",
    ],
    category: "contact",
    component: ContactReservation,
    props: "ContactReservationProps",
    exampleUsage: `
<ContactReservation
  heading="Make a Reservation"
  description="Reserve your spot today"
  buttonText="Reserve"
  formConfig={{ endpoint: "/api/reservation", format: "json" }}
/>
    `.trim(),
  },
  "contact-retreat": {
    id: "contact-retreat",
    name: "Contact Retreat Registration",
    description:
      "Retreat registration form with accommodation preferences, dietary requirements, and participant information. Perfect for wellness retreats and corporate events.",
    semanticTags: [
      "contact",
      "retreat",
      "registration",
      "form",
      "wellness",
      "event",
    ],
    category: "contact",
    component: ContactRetreat,
    props: "ContactRetreatProps",
    exampleUsage: `
<ContactRetreat
  heading="Retreat Registration"
  description="Register for our upcoming retreat"
  buttonText="Register"
  formConfig={{ endpoint: "/api/retreat", format: "json" }}
/>
    `.trim(),
  },
  "contact-rsvp": {
    id: "contact-rsvp",
    name: "Contact RSVP",
    description:
      "RSVP form for event attendance confirmation with guest count and dietary preferences. Simple and elegant design for invitations.",
    semanticTags: [
      "contact",
      "rsvp",
      "event",
      "form",
      "invitation",
      "attendance",
    ],
    category: "contact",
    component: ContactRsvp,
    props: "ContactRsvpProps",
    exampleUsage: `
<ContactRsvp
  heading="RSVP to Event"
  description="Confirm your attendance"
  buttonText="Submit RSVP"
  formConfig={{ endpoint: "/api/rsvp", format: "json" }}
/>
    `.trim(),
  },
  "contact-sales": {
    id: "contact-sales",
    name: "Contact Sales",
    description:
      "Sales inquiry form with company information and product interest. Designed for B2B sales teams and lead generation.",
    semanticTags: ["contact", "sales", "inquiry", "form", "b2b", "leads"],
    category: "contact",
    component: ContactSales,
    props: "ContactSalesProps",
    exampleUsage: `
<ContactSales
  heading="Talk to Sales"
  description="Interested in our products?"
  buttonText="Contact Sales"
  formConfig={{ endpoint: "/api/sales", format: "json" }}
/>
    `.trim(),
  },
  "contact-schedule": {
    id: "contact-schedule",
    name: "Contact Schedule Meeting",
    description:
      "Meeting scheduling form with calendar integration and time slot selection. Streamlined booking for consultations and appointments.",
    semanticTags: [
      "contact",
      "schedule",
      "meeting",
      "form",
      "booking",
      "calendar",
    ],
    category: "contact",
    component: ContactSchedule,
    props: "ContactScheduleProps",
    exampleUsage: `
<ContactSchedule
  heading="Schedule a Meeting"
  description="Book a time to chat with our team"
  buttonText="Schedule"
  formConfig={{ endpoint: "/api/schedule", format: "json" }}
/>
    `.trim(),
  },
  "contact-sponsorship": {
    id: "contact-sponsorship",
    name: "Contact Sponsorship",
    description:
      "Sponsorship inquiry form with organization details and sponsorship level preferences. Perfect for events and non-profits.",
    semanticTags: [
      "contact",
      "sponsorship",
      "partnership",
      "form",
      "funding",
      "event",
    ],
    category: "contact",
    component: ContactSponsorship,
    props: "ContactSponsorshipProps",
    exampleUsage: `
<ContactSponsorship
  heading="Sponsorship Opportunities"
  description="Partner with us through sponsorship"
  buttonText="Submit Inquiry"
  formConfig={{ endpoint: "/api/sponsorship", format: "json" }}
/>
    `.trim(),
  },
  "contact-support": {
    id: "contact-support",
    name: "Contact Support",
    description:
      "Customer support form with name, email, and message fields. Simple and effective for general support inquiries.",
    semanticTags: ["contact", "support", "help", "form", "customer-service"],
    category: "contact",
    component: ContactSupport,
    props: "ContactSupportProps",
    exampleUsage: `
<ContactSupport
  heading="Customer Support"
  description="We're here to help"
  buttonText="Send Message"
  formConfig={{ endpoint: "/api/support", format: "json" }}
/>
    `.trim(),
  },
  "contact-help-center": {
    id: "contact-help-center",
    name: "Help Center Contact Cards",
    description:
      "A split layout with support copy on the left and a stacked set of contact action cards on the right. Ideal for help centers, service hubs, or onboarding touchpoints that need multiple contact paths.",
    semanticTags: [
      "contact",
      "help",
      "support",
      "cards",
      "split",
      "service-center",
      "cta",
      "links",
      "support-hub",
    ],
    category: "contact",
    component: ContactHelpCenter,
    props: "ContactHelpCenterProps",
    exampleUsage: `<ContactHelpCenter />`.trim(),
  },
  "contact-tenant": {
    id: "contact-tenant",
    name: "Contact Tenant Application",
    description:
      "Tenant application form with rental history, employment, and references. Comprehensive form for property management.",
    semanticTags: [
      "contact",
      "tenant",
      "application",
      "form",
      "rental",
      "property",
    ],
    category: "contact",
    component: ContactTenant,
    props: "ContactTenantProps",
    exampleUsage: `
<ContactTenant
  heading="Tenant Application"
  description="Apply to become a tenant"
  buttonText="Submit Application"
  formConfig={{ endpoint: "/api/tenant", format: "json" }}
/>
    `.trim(),
  },
  "contact-vendor": {
    id: "contact-vendor",
    name: "Contact Vendor Application",
    description:
      "Vendor application form with business information, products/services, and certification details. Perfect for marketplace platforms.",
    semanticTags: [
      "contact",
      "vendor",
      "application",
      "form",
      "supplier",
      "marketplace",
    ],
    category: "contact",
    component: ContactVendor,
    props: "ContactVendorProps",
    exampleUsage: `
<ContactVendor
  heading="Become a Vendor"
  description="Apply to become one of our vendors"
  buttonText="Submit Application"
  formConfig={{ endpoint: "/api/vendor", format: "json" }}
/>
    `.trim(),
  },
  "contact-volunteer": {
    id: "contact-volunteer",
    name: "Contact Volunteer",
    description:
      "Volunteer registration form with availability, skills, and interests. Ideal for non-profits and community organizations.",
    semanticTags: [
      "contact",
      "volunteer",
      "registration",
      "form",
      "non-profit",
      "community",
    ],
    category: "contact",
    component: ContactVolunteer,
    props: "ContactVolunteerProps",
    exampleUsage: `
<ContactVolunteer
  heading="Volunteer With Us"
  description="Join our team of volunteers"
  buttonText="Sign Up"
  formConfig={{ endpoint: "/api/volunteer", format: "json" }}
/>
    `.trim(),
  },
  "contact-warranty": {
    id: "contact-warranty",
    name: "Contact Warranty Claim",
    description:
      "Warranty claim form with product information, purchase details, and issue description. Essential for product support teams.",
    semanticTags: [
      "contact",
      "warranty",
      "claim",
      "form",
      "support",
      "product",
    ],
    category: "contact",
    component: ContactWarranty,
    props: "ContactWarrantyProps",
    exampleUsage: `
<ContactWarranty
  heading="Warranty Claim"
  description="Submit a warranty claim"
  buttonText="Submit Claim"
  formConfig={{ endpoint: "/api/warranty", format: "json" }}
/>
    `.trim(),
  },
  "contact-wedding": {
    id: "contact-wedding",
    name: "Contact Wedding Inquiry",
    description:
      "Wedding planning inquiry form with event details, guest count, and service preferences. Perfect for wedding venues and planners.",
    semanticTags: [
      "contact",
      "wedding",
      "inquiry",
      "form",
      "event",
      "planning",
    ],
    category: "contact",
    component: ContactWedding,
    props: "ContactWeddingProps",
    exampleUsage: `
<ContactWedding
  heading="Wedding Inquiry"
  description="Plan your special day with us"
  buttonText="Submit Inquiry"
  formConfig={{ endpoint: "/api/wedding", format: "json" }}
/>
    `.trim(),
  },
  "carousel-animated-sections": {
    id: "carousel-animated-sections",
    name: "Carousel Animated Sections",
    description:
      "A fullscreen section carousel with smooth animated transitions between slides. Features click-to-advance navigation, progress indicators, and content overlays with CTAs. Perfect for immersive storytelling experiences.",
    semanticTags: [
      "carousel",
      "slider",
      "fullscreen",
      "animated",
      "transitions",
      "storytelling",
      "hero",
      "sections",
      "immersive",
    ],
    category: "carousel",
    component: CarouselAnimatedSections,
    props: "CarouselAnimatedSectionsProps",
    exampleUsage: `
<CarouselAnimatedSections
  sections={[
    {
      id: "1",
      title: "Welcome",
      subtitle: "Start Here",
      description: "Begin your journey with us",
      image: "/images/section-1.jpg",
      ctaText: "Learn More",
      ctaHref: "#learn"
    }
  ]}
/>
    `.trim(),
  },
  "carousel-auto-progress-slides": {
    id: "carousel-auto-progress-slides",
    name: "Carousel Auto Progress Slides",
    description:
      "An auto-advancing carousel with animated progress indicators and smooth blur transitions between slides. Features centered headline, navigation controls, and visual progress dots that fill as each slide auto-advances.",
    semanticTags: [
      "carousel",
      "slider",
      "auto-advance",
      "progress",
      "animated",
      "hero",
      "onboarding",
      "timed",
      "transitions",
    ],
    category: "carousel",
    component: CarouselAutoProgressSlides,
    props: "CarouselAutoProgressSlidesProps",
    exampleUsage: `
<CarouselAutoProgressSlides
  heading="Featured Products"
  subheading="Discover our latest collection"
  items={[
    { src: "/images/product-1.jpg", label: "Product 1" },
    { src: "/images/product-2.jpg", label: "Product 2" }
  ]}
  autoAdvanceInterval={5000}
/>
    `.trim(),
  },
  "carousel-autoplay-progress": {
    id: "carousel-autoplay-progress",
    name: "Carousel Autoplay Progress",
    description:
      "An Embla-powered carousel with autoplay functionality, animated progress bar, dot navigation, and play/pause controls. Features smooth transitions with visual feedback for autoplay timing.",
    semanticTags: [
      "carousel",
      "slider",
      "autoplay",
      "progress-bar",
      "embla",
      "hero",
      "testimonials",
      "features",
      "controls",
    ],
    category: "carousel",
    component: CarouselAutoplayProgress,
    props: "CarouselAutoplayProgressProps",
    exampleUsage: `
<CarouselAutoplayProgress
  slides={[
    {
      src: "/images/slide-1.jpg",
      alt: "Slide 1",
      content: <div>Custom content</div>
    }
  ]}
  autoplayDelay={4000}
  options={{ loop: true }}
/>
    `.trim(),
  },
  "carousel-feature-badge": {
    id: "carousel-feature-badge",
    name: "Carousel Feature Badge",
    description:
      "A two-column feature section with badge label, headline, description text, and an interactive carousel showcasing platform screenshots or feature images. Includes previous/next navigation controls.",
    semanticTags: [
      "carousel",
      "features",
      "screenshots",
      "badge",
      "two-column",
      "platform",
      "showcase",
      "gallery",
    ],
    category: "carousel",
    component: CarouselFeatureBadge,
    props: "CarouselFeatureBadgeProps",
    exampleUsage: `
<CarouselFeatureBadge
  badgeText="Platform"
  heading="This is the start of something new"
  description="Our platform helps you build amazing products"
  items={[
    { src: "/images/screen-1.jpg", alt: "Dashboard" },
    { src: "/images/screen-2.jpg", alt: "Analytics" }
  ]}
/>
    `.trim(),
  },
  "carousel-fullscreen-scroll-fx": {
    id: "carousel-fullscreen-scroll-fx",
    name: "Carousel Fullscreen Scroll Effects",
    description:
      "A GSAP-powered fullscreen carousel with scroll-triggered animations, pinned sections, and smooth parallax effects. Features immersive full-viewport slides with overlay content and navigation indicators.",
    semanticTags: [
      "carousel",
      "fullscreen",
      "scroll",
      "gsap",
      "parallax",
      "immersive",
      "storytelling",
      "portfolio",
      "cinematic",
    ],
    category: "carousel",
    component: CarouselFullscreenScrollFx,
    props: "CarouselFullscreenScrollFxProps",
    exampleUsage: `
<CarouselFullscreenScrollFx
  slides={[
    {
      id: "1",
      title: "Innovation",
      subtitle: "Discover More",
      description: "Experience the future",
      image: "/images/slide-1.jpg",
      overlayColor: "rgba(0,0,0,0.5)"
    }
  ]}
/>
    `.trim(),
  },
  "carousel-gallery-thumbnails": {
    id: "carousel-gallery-thumbnails",
    name: "Carousel Gallery Thumbnails",
    description:
      "A gallery carousel with main image display, thumbnail navigation strip, keyboard navigation support, and auto-play functionality. Features smooth slide transitions with caption overlay and responsive thumbnail grid.",
    semanticTags: [
      "carousel",
      "gallery",
      "thumbnails",
      "images",
      "portfolio",
      "products",
      "real-estate",
      "photography",
      "navigation",
    ],
    category: "carousel",
    component: CarouselGalleryThumbnails,
    props: "CarouselGalleryThumbnailsProps",
    exampleUsage: `
<CarouselGalleryThumbnails
  images={[
    { src: "/images/gallery-1.jpg", alt: "Image 1", width: 1470, height: 980 },
    { src: "/images/gallery-2.jpg", alt: "Image 2", width: 1470, height: 980 }
  ]}
  autoPlay={true}
  autoPlayInterval={5000}
  showThumbnails={true}
/>
    `.trim(),
  },
  "carousel-horizontal-cards": {
    id: "carousel-horizontal-cards",
    name: "Carousel Horizontal Cards",
    description:
      "A horizontal scrolling card carousel with animated entrance effects, navigation buttons, and stat displays. Features smooth scroll behavior with dynamic button visibility based on scroll position.",
    semanticTags: [
      "carousel",
      "cards",
      "horizontal",
      "scroll",
      "features",
      "products",
      "team",
      "testimonials",
      "stats",
    ],
    category: "carousel",
    component: CarouselHorizontalCards,
    props: "CarouselHorizontalCardsProps",
    exampleUsage: `
<CarouselHorizontalCards
  title="Featured Content"
  subtitle="Discover our latest highlights"
  items={[
    {
      id: "1",
      imageSrc: "/images/card-1.jpg",
      title: "Card Title",
      count: 42,
      countLabel: "Projects"
    }
  ]}
  titleHref="#more"
/>
    `.trim(),
  },
  "carousel-image-hero": {
    id: "carousel-image-hero",
    name: "Carousel Image Hero",
    description:
      "A full-width hero section with an auto-advancing background image carousel, overlay content with headline, description, and call-to-action button. Includes navigation arrows and dot indicators for manual slide control.",
    semanticTags: [
      "carousel",
      "hero",
      "fullwidth",
      "background",
      "landing",
      "cta",
      "portfolio",
      "marketing",
      "auto-advance",
    ],
    category: "carousel",
    component: CarouselImageHero,
    props: "CarouselImageHeroProps",
    exampleUsage: `
<CarouselImageHero
  badgeText="Launching Soon"
  heading="Build exceptional digital experiences"
  description="Create stunning websites with ease"
  ctaText="Get Started"
  ctaHref="#start"
  images={[
    { src: "/images/hero-1.jpg", alt: "Hero 1" },
    { src: "/images/hero-2.jpg", alt: "Hero 2" }
  ]}
  autoPlayInterval={6000}
/>
    `.trim(),
  },
  "carousel-multi-step-showcase": {
    id: "carousel-multi-step-showcase",
    name: "Carousel Multi-Step Showcase",
    description:
      "A multi-step feature showcase with animated step navigation, progress indicators, and synchronized image transitions. Features numbered step buttons with active state highlighting and smooth content transitions.",
    semanticTags: [
      "carousel",
      "multi-step",
      "onboarding",
      "tutorial",
      "walkthrough",
      "features",
      "process",
      "steps",
      "progressive",
    ],
    category: "carousel",
    component: CarouselMultiStepShowcase,
    props: "CarouselMultiStepShowcaseProps",
    exampleUsage: `
<CarouselMultiStepShowcase
  heading="How It Works"
  subheading="Follow these simple steps"
  steps={[
    {
      id: "1",
      step: 1,
      title: "Sign Up",
      description: "Create your account in seconds",
      image: "/images/step-1.jpg"
    }
  ]}
  ctaText="Get Started"
  ctaHref="#signup"
/>
    `.trim(),
  },
  "carousel-portfolio-hero": {
    id: "carousel-portfolio-hero",
    name: "Carousel Portfolio Hero",
    description:
      "A fullscreen portfolio hero section with auto-advancing image slider, gradient overlay, category tags, and navigation controls. Features smooth opacity transitions between slides with slide counter display.",
    semanticTags: [
      "carousel",
      "portfolio",
      "hero",
      "fullscreen",
      "creative",
      "agency",
      "photography",
      "design",
      "showcase",
    ],
    category: "carousel",
    component: CarouselPortfolioHero,
    props: "CarouselPortfolioHeroProps",
    exampleUsage: `
<CarouselPortfolioHero
  slides={[
    {
      id: "1",
      image: "/images/portfolio-1.jpg",
      title: "Project Title",
      description: "Project description",
      tag: "Design"
    }
  ]}
  ctaText="View Projects"
  ctaHref="#projects"
  autoPlayInterval={5000}
/>
    `.trim(),
  },
  "carousel-product-feature-showcase": {
    id: "carousel-product-feature-showcase",
    name: "Carousel Product Feature Showcase",
    description:
      "An interactive product feature carousel with mobile-responsive design, color variant selectors, and animated transitions. Features a split layout with product imagery on one side and feature descriptions with navigation on the other.",
    semanticTags: [
      "carousel",
      "product",
      "features",
      "ecommerce",
      "variants",
      "showcase",
      "interactive",
      "split-layout",
      "saas",
    ],
    category: "carousel",
    component: CarouselProductFeatureShowcase,
    props: "CarouselProductFeatureShowcaseProps",
    exampleUsage: `
<CarouselProductFeatureShowcase
  heading="Discover Our Products"
  subheading="Explore features that stand out"
  features={[
    {
      id: "1",
      title: "Product Feature 1",
      description: "Feature description",
      image: "/images/feature-1.jpg",
      colors: [
        { name: "Default", value: "#3b82f6" },
        { name: "Dark", value: "#1f2937" }
      ]
    }
  ]}
  ctaText="Learn More"
  ctaHref="#learn"
/>
    `.trim(),
  },
  "carousel-progress-slider": {
    id: "carousel-progress-slider",
    name: "Carousel Progress Slider",
    description:
      "A context-based slider with animated progress bar indicators for each slide. Features auto-advancing slides with visual progress feedback and smooth transitions between content panels.",
    semanticTags: [
      "carousel",
      "progress",
      "slider",
      "auto-advance",
      "onboarding",
      "walkthrough",
      "features",
      "timed",
      "indicators",
    ],
    category: "carousel",
    component: CarouselProgressSlider,
    props: "CarouselProgressSliderProps",
    exampleUsage: `
<CarouselProgressSlider
  slides={[
    {
      id: "1",
      title: "Feature 1",
      description: "Description",
      image: "/images/feature-1.jpg"
    }
  ]}
  vertical={false}
/>
    `.trim(),
  },
  "carousel-scrolling-feature-showcase": {
    id: "carousel-scrolling-feature-showcase",
    name: "Carousel Scrolling Feature Showcase",
    description:
      "A scroll-driven feature showcase with a sticky image panel that updates as users scroll through feature descriptions. Features smooth transitions between feature images with intersection observer-based activation.",
    semanticTags: [
      "carousel",
      "scroll",
      "features",
      "sticky",
      "storytelling",
      "documentation",
      "marketing",
      "synchronized",
      "intersection-observer",
    ],
    category: "carousel",
    component: CarouselScrollingFeatureShowcase,
    props: "CarouselScrollingFeatureShowcaseProps",
    exampleUsage: `
<CarouselScrollingFeatureShowcase
  sectionTitle="Powerful Features"
  sectionSubtitle="Discover what makes us unique"
  features={[
    {
      id: "1",
      title: "Feature Title",
      description: "Feature description",
      image: "/images/feature-1.jpg"
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
  "feature-capabilities-grid": {
    id: "feature-capabilities-grid",
    name: "Capabilities Feature Grid",
    description:
      "A dark, three-column capability grid with animated hover accents, icon badges, and optional labels. Perfect for highlighting platform capabilities, AI features, or service pillars.",
    semanticTags: [
      "features",
      "capabilities",
      "grid",
      "cards",
      "icons",
      "dark",
      "hover",
      "ai",
      "platform",
    ],
    category: "features",
    component: FeatureCapabilitiesGrid,
    props: "FeatureCapabilitiesGridProps",
    exampleUsage: `<FeatureCapabilitiesGrid />`.trim(),
  },
  "feature-split-image": {
    id: "feature-split-image",
    name: "Feature Split Image",
    description:
      "Two-column feature section with text content on the left and a large image on the right. Includes badge, heading, description, feature list with icons, and CTA button. Perfect for product features, service highlights, or capability showcases.",
    semanticTags: [
      "features",
      "split-layout",
      "two-column",
      "image",
      "product",
      "capabilities",
      "benefits",
      "cta",
    ],
    category: "features",
    component: FeatureSplitImage,
    props: "FeatureSplitImageProps",
    exampleUsage: `
<FeatureSplitImage
  badge="Features"
  title="Powerful Tools for Your Business"
  description="Everything you need to grow your business."
  features={[
    { icon: "lucide/zap", title: "Fast Performance", description: "Lightning fast load times" },
    { icon: "lucide/shield", title: "Secure", description: "Enterprise-grade security" },
  ]}
  buttonText="Get Started"
  buttonLink="/signup"
  imageSrc="/feature-image.jpg"
  imageAlt="Feature showcase"
/>
    `.trim(),
  },
  "feature-split-image-reverse": {
    id: "feature-split-image-reverse",
    name: "Feature Split Image Reverse",
    description:
      "Two-column feature section with a large image on the left and text content on the right. Mirror layout of Feature Split Image. Includes badge, heading, description, feature list with icons, and CTA button.",
    semanticTags: [
      "features",
      "split-layout",
      "two-column",
      "image",
      "reverse",
      "product",
      "capabilities",
      "benefits",
    ],
    category: "features",
    component: FeatureSplitImageReverse,
    props: "FeatureSplitImageReverseProps",
    exampleUsage: `
<FeatureSplitImageReverse
  badge="Features"
  title="Streamline Your Workflow"
  description="Automate repetitive tasks and focus on what matters."
  features={[
    { icon: "lucide/clock", title: "Save Time", description: "Automate daily tasks" },
    { icon: "lucide/users", title: "Collaborate", description: "Work together seamlessly" },
  ]}
  buttonText="Learn More"
  imageSrc="/workflow-image.jpg"
/>
    `.trim(),
  },
  "feature-icon-grid-bordered": {
    id: "feature-icon-grid-bordered",
    name: "Feature Icon Grid Bordered",
    description:
      "Four-column grid of features with icons and dashed left borders. Each feature has an icon badge, title, and description. Clean, organized layout for showcasing multiple capabilities.",
    semanticTags: [
      "features",
      "grid",
      "icons",
      "bordered",
      "four-column",
      "capabilities",
      "benefits",
    ],
    category: "features",
    component: FeatureIconGridBordered,
    props: "FeatureIconGridBorderedProps",
    exampleUsage: `
<FeatureIconGridBordered
  title="Why Choose Us"
  description="Discover the benefits of our platform."
  features={[
    { icon: "lucide/zap", title: "Fast", description: "Lightning speed" },
    { icon: "lucide/shield", title: "Secure", description: "Bank-level security" },
  ]}
/>
    `.trim(),
  },
  "feature-checklist-image": {
    id: "feature-checklist-image",
    name: "Feature Checklist Image",
    description:
      "Split layout with a large image on the left and a checklist of benefits on the right. Each benefit has a check icon, title, and description. Great for product benefits or service features.",
    semanticTags: [
      "features",
      "checklist",
      "image",
      "benefits",
      "split-layout",
      "two-column",
      "product",
    ],
    category: "features",
    component: FeatureChecklistImage,
    props: "FeatureChecklistImageProps",
    exampleUsage: `
<FeatureChecklistImage
  title="Everything You Need"
  description="Our platform includes all the tools you need."
  benefits={[
    { title: "Easy Setup", description: "Get started in minutes" },
    { title: "24/7 Support", description: "We're always here to help" },
  ]}
  imageSrc="/benefits-image.jpg"
/>
    `.trim(),
  },
  "feature-carousel-progress": {
    id: "feature-carousel-progress",
    name: "Feature Carousel Progress",
    description:
      "Carousel-based feature display with progress indicator. Each slide shows a feature with image, title, and description. Includes navigation arrows and progress bar for visual feedback.",
    semanticTags: [
      "features",
      "carousel",
      "slider",
      "progress",
      "interactive",
      "showcase",
      "product",
    ],
    category: "features",
    component: FeatureCarouselProgress,
    props: "FeatureCarouselProgressProps",
    exampleUsage: `
<FeatureCarouselProgress
  title="Key Features"
  description="Explore what makes us different."
  features={[
    { imageSrc: "/feature1.jpg", title: "Analytics", description: "Track everything" },
    { imageSrc: "/feature2.jpg", title: "Automation", description: "Save time" },
  ]}
/>
    `.trim(),
  },
  "feature-card-grid-linked": {
    id: "feature-card-grid-linked",
    name: "Feature Card Grid Linked",
    description:
      "Two-column grid of feature cards with images and clickable headings. Each card has an image, title link, and description. Perfect for blog posts, resources, or feature highlights.",
    semanticTags: [
      "features",
      "grid",
      "cards",
      "linked",
      "two-column",
      "images",
      "resources",
    ],
    category: "features",
    component: FeatureCardGridLinked,
    props: "FeatureCardGridLinkedProps",
    exampleUsage: `
<FeatureCardGridLinked
  title="Resources"
  description="Learn more about our platform."
  features={[
    { imageSrc: "/resource1.jpg", title: "Getting Started", description: "Quick start guide", link: "/docs/start" },
    { imageSrc: "/resource2.jpg", title: "Best Practices", description: "Tips and tricks", link: "/docs/tips" },
  ]}
/>
    `.trim(),
  },
  "feature-numbered-cards": {
    id: "feature-numbered-cards",
    name: "Feature Numbered Cards",
    description:
      "Stacked feature cards with numbered badges and images. Each card has a number badge in the top-left corner, image, title, and description. Great for step-by-step processes or ranked features.",
    semanticTags: [
      "features",
      "numbered",
      "cards",
      "steps",
      "process",
      "images",
      "ranked",
    ],
    category: "features",
    component: FeatureNumberedCards,
    props: "FeatureNumberedCardsProps",
    exampleUsage: `
<FeatureNumberedCards
  title="How It Works"
  description="Simple steps to get started."
  features={[
    { imageSrc: "/step1.jpg", title: "Sign Up", description: "Create your account" },
    { imageSrc: "/step2.jpg", title: "Configure", description: "Set up your workspace" },
  ]}
/>
    `.trim(),
  },
  "feature-icon-grid-accent": {
    id: "feature-icon-grid-accent",
    name: "Feature Icon Grid Accent",
    description:
      "Two-column grid of features with accent background cards. Each feature has an icon in an accent-colored circle, title, and description. Modern, colorful design for capability showcases.",
    semanticTags: [
      "features",
      "grid",
      "icons",
      "accent",
      "two-column",
      "colorful",
      "capabilities",
    ],
    category: "features",
    component: FeatureIconGridAccent,
    props: "FeatureIconGridAccentProps",
    exampleUsage: `
<FeatureIconGridAccent
  title="Platform Features"
  description="Everything you need in one place."
  features={[
    { icon: "lucide/layers", title: "Components", description: "Pre-built UI elements" },
    { icon: "lucide/palette", title: "Themes", description: "Customizable styles" },
  ]}
/>
    `.trim(),
  },
  "feature-three-column-values": {
    id: "feature-three-column-values",
    name: "Feature Three Column Values",
    description:
      "Three-column grid of value cards with icons. Each card has an icon, title, and description. Clean, balanced layout for company values, core principles, or key benefits.",
    semanticTags: [
      "features",
      "values",
      "three-column",
      "grid",
      "icons",
      "principles",
      "benefits",
    ],
    category: "features",
    component: FeatureThreeColumnValues,
    props: "FeatureThreeColumnValuesProps",
    exampleUsage: `
<FeatureThreeColumnValues
  title="Our Values"
  description="What drives us every day."
  values={[
    { icon: "lucide/heart", title: "Customer First", description: "Your success is our priority" },
    { icon: "lucide/lightbulb", title: "Innovation", description: "Always pushing boundaries" },
  ]}
/>
    `.trim(),
  },
  "feature-badge-grid-six": {
    id: "feature-badge-grid-six",
    name: "Feature Badge Grid Six",
    description:
      "Six-feature grid with badge header and centered CTA button. Each feature has an icon in an accent circle, title, and description. Includes badge label and large heading.",
    semanticTags: [
      "features",
      "grid",
      "six-column",
      "badge",
      "icons",
      "cta",
      "capabilities",
    ],
    category: "features",
    component: FeatureBadgeGridSix,
    props: "FeatureBadgeGridSixProps",
    exampleUsage: `
<FeatureBadgeGridSix
  badge="Features"
  title="Everything You Need"
  description="Comprehensive tools for your business."
  features={[
    { icon: "lucide/zap", title: "Fast", description: "Lightning speed" },
  ]}
  buttonText="Get Started"
/>
    `.trim(),
  },
  "feature-pattern-grid-links": {
    id: "feature-pattern-grid-links",
    name: "Feature Pattern Grid Links",
    description:
      "Six-feature grid with pattern background and 'Learn more' links on each card. Each card has an icon, title, description, and arrow link. Pattern background adds visual interest.",
    semanticTags: [
      "features",
      "grid",
      "pattern",
      "links",
      "six-column",
      "icons",
      "learn-more",
    ],
    category: "features",
    component: FeaturePatternGridLinks,
    props: "FeaturePatternGridLinksProps",
    exampleUsage: `
<FeaturePatternGridLinks
  title="Platform Capabilities"
  description="Explore our powerful features."
  features={[
    { icon: "lucide/database", title: "Data Storage", description: "Secure cloud storage", link: "/features/storage" },
  ]}
/>
    `.trim(),
  },
  "feature-tabbed-content-image": {
    id: "feature-tabbed-content-image",
    name: "Feature Tabbed Content Image",
    description:
      "Tabbed interface with content and images that change based on selected tab. Each tab shows heading, description, checklist features, CTA button, and responsive image.",
    semanticTags: [
      "features",
      "tabs",
      "tabbed",
      "interactive",
      "images",
      "checklist",
      "cta",
    ],
    category: "features",
    component: FeatureTabbedContentImage,
    props: "FeatureTabbedContentImageProps",
    exampleUsage: `
<FeatureTabbedContentImage
  title="Product Features"
  description="Explore our capabilities."
  tabs={[
    {
      id: "analytics",
      label: "Analytics",
      heading: "Powerful Analytics",
      description: "Track everything.",
      features: ["Real-time data", "Custom reports"],
      buttonText: "Learn More",
      imageSrc: "/analytics.jpg",
    },
  ]}
/>
    `.trim(),
  },
  "feature-utility-cards-grid": {
    id: "feature-utility-cards-grid",
    name: "Feature Utility Cards Grid",
    description:
      "Six-card grid showcasing utilities with images and descriptions. Header with separator line, two-column intro, and three-column card grid. Each card has image, title, and description.",
    semanticTags: [
      "features",
      "utilities",
      "grid",
      "cards",
      "images",
      "three-column",
      "tools",
    ],
    category: "features",
    component: FeatureUtilityCardsGrid,
    props: "FeatureUtilityCardsGridProps",
    exampleUsage: `
<FeatureUtilityCardsGrid
  iconLabel="lucide/wrench"
  title="Utilities"
  description="Tools to enhance your workflow."
  utilities={[
    { imageSrc: "/tool1.jpg", title: "Code Editor", description: "Write code faster" },
  ]}
/>
    `.trim(),
  },
  "feature-bento-utilities": {
    id: "feature-bento-utilities",
    name: "Feature Bento Utilities",
    description:
      "Bento-style grid layout with mixed card sizes showcasing various utilities. Two-column bento grid with varying card heights and image cards. Includes sparkle icons and coming soon badges.",
    semanticTags: [
      "features",
      "bento",
      "grid",
      "utilities",
      "mixed-sizes",
      "images",
      "modern",
    ],
    category: "features",
    component: FeatureBentoUtilities,
    props: "FeatureBentoUtilitiesProps",
    exampleUsage: `
<FeatureBentoUtilities
  title="Platform Utilities"
  description="Everything you need in one place."
  utilities={[
    { title: "Analytics", description: "Track metrics", imageSrc: "/analytics.jpg" },
  ]}
/>
    `.trim(),
  },
  "feature-checklist-three-column": {
    id: "feature-checklist-three-column",
    name: "Feature Checklist Three Column",
    description:
      "Three-column layout with heading, dual checklists, and feature cards with images. First column has heading and description, middle columns have checklists, and feature cards below with badges and read more links.",
    semanticTags: [
      "features",
      "checklist",
      "three-column",
      "cards",
      "images",
      "badges",
      "benefits",
    ],
    category: "features",
    component: FeatureChecklistThreeColumn,
    props: "FeatureChecklistThreeColumnProps",
    exampleUsage: `
<FeatureChecklistThreeColumn
  title="Why Choose Us"
  description="The benefits of our platform."
  checklistLeft={["Fast setup", "24/7 support"]}
  checklistRight={["Secure", "Scalable"]}
  features={[
    { imageSrc: "/feature1.jpg", badge: "New", title: "Analytics", description: "Track everything", link: "/analytics" },
  ]}
/>
    `.trim(),
  },
  "feature-integration-cards": {
    id: "feature-integration-cards",
    name: "Feature Integration Cards",
    description:
      "Grid of integration cards with icons, descriptions, and visit website links. Centered header with four-column grid of bordered cards. Each card has icon badge, title, description, and external link button.",
    semanticTags: [
      "features",
      "integrations",
      "cards",
      "grid",
      "icons",
      "external-links",
      "partners",
    ],
    category: "features",
    component: FeatureIntegrationCards,
    props: "FeatureIntegrationCardsProps",
    exampleUsage: `
<FeatureIntegrationCards
  title="Integrations"
  description="Connect with your favorite tools."
  integrations={[
    { icon: "simple-icons/slack", title: "Slack", description: "Team communication", link: "https://slack.com" },
  ]}
/>
    `.trim(),
  },
  "feature-icon-tabs-content": {
    id: "feature-icon-tabs-content",
    name: "Feature Icon Tabs Content",
    description:
      "Tabbed interface with icon triggers and content panels featuring images and CTAs. Centered header with icon tabs, muted background content area. Each tab has badge label, heading, description, CTA button, and image.",
    semanticTags: [
      "features",
      "tabs",
      "icons",
      "interactive",
      "images",
      "cta",
      "showcase",
    ],
    category: "features",
    component: FeatureIconTabsContent,
    props: "FeatureIconTabsContentProps",
    exampleUsage: `
<FeatureIconTabsContent
  title="Platform Features"
  description="Explore our capabilities."
  tabs={[
    {
      id: "analytics",
      icon: "lucide/bar-chart",
      label: "Analytics",
      badge: "Popular",
      heading: "Powerful Analytics",
      description: "Track everything.",
      buttonText: "Learn More",
      imageSrc: "/analytics.jpg",
    },
  ]}
/>
    `.trim(),
  },
  "feature-image-overlay-badge": {
    id: "feature-image-overlay-badge",
    name: "Feature Image Overlay Badge",
    description:
      "Two-column layout with content and an image featuring gradient overlay with avatar badge and CTA. Left side has heading, description, and feature list. Right side has image with gradient overlay, avatar badge, and floating CTA.",
    semanticTags: [
      "features",
      "image",
      "overlay",
      "badge",
      "avatar",
      "gradient",
      "cta",
      "two-column",
    ],
    category: "features",
    component: FeatureImageOverlayBadge,
    props: "FeatureImageOverlayBadgeProps",
    exampleUsage: `
<FeatureImageOverlayBadge
  title="Transform Your Business"
  description="Powerful tools for growth."
  features={[
    { icon: "lucide/zap", text: "Lightning fast" },
  ]}
  imageSrc="/hero-image.jpg"
  avatarSrc="/avatar.jpg"
  avatarName="John Doe"
  avatarRole="CEO"
  ctaText="Get Started"
/>
    `.trim(),
  },
  "feature-category-image-cards": {
    id: "feature-category-image-cards",
    name: "Feature Category Image Cards",
    description:
      "Six-card grid with category badges and large images showcasing key features. Centered header with three-column grid of muted background cards. Each card has category label, large image, title, and description.",
    semanticTags: [
      "features",
      "categories",
      "cards",
      "images",
      "grid",
      "three-column",
      "showcase",
    ],
    category: "features",
    component: FeatureCategoryImageCards,
    props: "FeatureCategoryImageCardsProps",
    exampleUsage: `
<FeatureCategoryImageCards
  title="Platform Features"
  description="Everything you need."
  features={[
    { category: "Analytics", imageSrc: "/analytics.jpg", title: "Real-time Data", description: "Track metrics" },
  ]}
/>
    `.trim(),
  },
  "feature-bento-image-grid": {
    id: "feature-bento-image-grid",
    name: "Feature Bento Image Grid",
    description:
      "Asymmetric bento-style grid with large and small image cards featuring gradient overlays and CTAs. One large card and two smaller cards with gradient overlays, icon badges, hover animations, and responsive layout.",
    semanticTags: [
      "features",
      "bento",
      "grid",
      "images",
      "gradient",
      "overlay",
      "asymmetric",
      "modern",
    ],
    category: "features",
    component: FeatureBentoImageGrid,
    props: "FeatureBentoImageGridProps",
    exampleUsage: `
<FeatureBentoImageGrid
  title="Key Features"
  description="Discover what makes us different."
  features={[
    { imageSrc: "/feature1.jpg", icon: "lucide/zap", title: "Fast", description: "Lightning speed", link: "/fast" },
  ]}
/>
    `.trim(),
  },
  "feature-image-cards-three-column": {
    id: "feature-image-cards-three-column",
    name: "Feature Image Cards Three Column",
    description:
      "Three-column grid of image cards with gradient overlays, badges, and CTAs. Three equal-width cards with full-height images, gradient overlays, icon/avatar badges, hover animations, and call-to-action buttons.",
    semanticTags: [
      "features",
      "cards",
      "images",
      "three-column",
      "gradient",
      "overlay",
      "cta",
    ],
    category: "features",
    component: FeatureImageCardsThreeColumn,
    props: "FeatureImageCardsThreeColumnProps",
    exampleUsage: `
<FeatureImageCardsThreeColumn
  title="Our Services"
  description="What we offer."
  features={[
    { imageSrc: "/service1.jpg", icon: "lucide/code", title: "Development", description: "Custom solutions", buttonText: "Learn More", buttonLink: "/dev" },
  ]}
/>
    `.trim(),
  },
  "feature-icon-grid-muted": {
    id: "feature-icon-grid-muted",
    name: "Feature Icon Grid Muted",
    description:
      "Five-feature grid with muted background and icon badges showcasing key capabilities. Muted background section with centered header and five-column grid of bordered cards with icons.",
    semanticTags: [
      "features",
      "grid",
      "icons",
      "muted",
      "five-column",
      "capabilities",
      "benefits",
    ],
    category: "features",
    component: FeatureIconGridMuted,
    props: "FeatureIconGridMutedProps",
    exampleUsage: `
<FeatureIconGridMuted
  title="Key Features"
  description="Tools to enhance your workflow."
  features={[
    { icon: "lucide/check-circle-2", title: "Instant Approvals", description: "Quick approvals" },
  ]}
/>
    `.trim(),
  },
  "feature-stats-highlight": {
    id: "feature-stats-highlight",
    name: "Feature Stats Highlight",
    description:
      "Feature section with stats grid and CTA button showcasing key metrics and achievements. Two-column layout with content/CTA on left and stats grid on right. Includes badge header, stats grid, and CTA button.",
    semanticTags: [
      "features",
      "stats",
      "metrics",
      "achievements",
      "cta",
      "two-column",
      "trust",
    ],
    category: "features",
    component: FeatureStatsHighlight,
    props: "FeatureStatsHighlightProps",
    exampleUsage: `
<FeatureStatsHighlight
  badge="Why Choose Us"
  title="We deliver results"
  description="Our platform helps businesses grow."
  buttonText="Get Started"
  stats={[
    { value: "99%", label: "Uptime" },
    { value: "24/7", label: "Support" },
  ]}
/>
    `.trim(),
  },
  "feature-accordion-image": {
    id: "feature-accordion-image",
    name: "Feature Accordion Image",
    description:
      "Accordion-based feature display with images that change based on the selected accordion item. Two-column layout with accordion on left and dynamic image on right. Smooth transitions between items.",
    semanticTags: [
      "features",
      "accordion",
      "interactive",
      "images",
      "dynamic",
      "two-column",
      "faq",
    ],
    category: "features",
    component: FeatureAccordionImage,
    props: "FeatureAccordionImageProps",
    exampleUsage: `
<FeatureAccordionImage
  title="How It Works"
  description="Learn about our process."
  items={[
    { title: "Sign Up", content: "Create your account.", imageSrc: "/step1.jpg", imageAlt: "Sign up" },
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
  "team-simple-grid": {
    id: "team-simple-grid",
    name: "Team Simple Grid",
    description:
      "A clean, minimal team section displaying members in a responsive grid layout. Each member card shows a circular avatar, name, and role. Ideal for showcasing team members with a professional appearance without social links or additional details.",
    semanticTags: [
      "team",
      "members",
      "staff",
      "people",
      "grid",
      "avatars",
      "minimal",
      "simple",
      "profiles",
    ],
    category: "team",
    component: TeamSimpleGrid,
    props: "TeamSimpleGridProps",
    exampleUsage: `
<TeamSimpleGrid
  heading="Our Team"
  description="Meet the people behind our success"
  members={[
    { id: "1", name: "John Doe", role: "CEO", avatar: "/avatars/john.jpg" }
  ]}
/>
    `.trim(),
  },
  "team-social-grid": {
    id: "team-social-grid",
    name: "Team Social Grid",
    description:
      "A team section displaying members in a responsive grid with social media icons. Each member card shows an avatar, name, role, and links to their GitHub, Twitter, and LinkedIn profiles. Perfect for tech teams or companies that want to highlight their team's online presence.",
    semanticTags: [
      "team",
      "members",
      "staff",
      "social",
      "github",
      "twitter",
      "linkedin",
      "grid",
      "avatars",
      "profiles",
    ],
    category: "team",
    component: TeamSocialGrid,
    props: "TeamSocialGridProps",
    exampleUsage: `
<TeamSocialGrid
  heading="Meet Our Team"
  description="The talented people behind our product"
  members={[
    {
      id: "1",
      name: "Jane Doe",
      role: "Lead Developer",
      avatar: "/avatars/jane.jpg",
      social: { github: "https://github.com/jane", twitter: "https://twitter.com/jane" }
    }
  ]}
/>
    `.trim(),
  },
  "team-gradient-cards": {
    id: "team-gradient-cards",
    name: "Team Gradient Cards",
    description:
      "A visually striking team section featuring cards with gradient backgrounds that animate on hover. Each card displays an avatar with a gradient ring effect, member name, role, and social media links. The cards have a subtle scale and shadow animation on hover for an engaging user experience.",
    semanticTags: [
      "team",
      "members",
      "gradient",
      "hover",
      "animation",
      "cards",
      "social",
      "modern",
      "profiles",
    ],
    category: "team",
    component: TeamGradientCards,
    props: "TeamGradientCardsProps",
    exampleUsage: `
<TeamGradientCards
  heading="Our Leadership"
  description="Meet the visionaries driving our company forward"
  members={[
    {
      id: "1",
      name: "Alex Smith",
      role: "Founder",
      avatar: "/avatars/alex.jpg",
      social: { linkedin: "https://linkedin.com/in/alex" }
    }
  ]}
/>
    `.trim(),
  },
  "team-bio-badges": {
    id: "team-bio-badges",
    name: "Team Bio Badges",
    description:
      "A comprehensive team section featuring member cards with detailed bios and department badges. Each card displays an avatar, name, role, department badge, biographical text, and social media links. Ideal for showcasing leadership teams or key personnel where background information adds credibility.",
    semanticTags: [
      "team",
      "members",
      "bio",
      "biography",
      "department",
      "badges",
      "leadership",
      "detailed",
      "profiles",
    ],
    category: "team",
    component: TeamBioBadges,
    props: "TeamBioBadgesProps",
    exampleUsage: `
<TeamBioBadges
  heading="Leadership Team"
  description="The visionaries guiding our company"
  members={[
    {
      id: "1",
      name: "Jane Smith",
      role: "CEO",
      department: "Executive",
      bio: "20 years of industry experience...",
      avatar: "/avatars/jane.jpg",
      social: { linkedin: "https://linkedin.com/in/jane" }
    }
  ]}
/>
    `.trim(),
  },
  "team-expertise-cards": {
    id: "team-expertise-cards",
    name: "Team Expertise Cards",
    description:
      "A professional team section featuring glassmorphism-style cards with member details and expertise tags. Each card displays an avatar, name, role, department badge, description, and skill/expertise badges. Includes a bottom CTA section for career opportunities. Perfect for companies wanting to highlight team expertise and recruit new talent.",
    semanticTags: [
      "team",
      "members",
      "expertise",
      "skills",
      "badges",
      "careers",
      "cta",
      "glassmorphism",
      "profiles",
    ],
    category: "team",
    component: TeamExpertiseCards,
    props: "TeamExpertiseCardsProps",
    exampleUsage: `
<TeamExpertiseCards
  heading="Our Experts"
  description="Meet the talented team behind our success"
  ctaHeading="Join Our Team"
  ctaButtonText="View Open Positions"
  ctaButtonUrl="/careers"
  members={[
    {
      id: "1",
      name: "John Doe",
      role: "Senior Engineer",
      department: "Engineering",
      description: "Full-stack developer with 8 years experience",
      expertise: ["React", "Node.js", "AWS"],
      avatar: "/avatars/john.jpg"
    }
  ]}
/>
    `.trim(),
  },
  "team-compact-grid": {
    id: "team-compact-grid",
    name: "Team Compact Grid",
    description:
      "A space-efficient team section displaying members in a dense 4-column grid. Each card shows an avatar, name, role, and department badge with a subtle hover effect. Includes a bottom CTA section for career opportunities. Ideal for larger teams where you want to show many members without overwhelming the page.",
    semanticTags: [
      "team",
      "members",
      "compact",
      "grid",
      "dense",
      "department",
      "careers",
      "cta",
      "profiles",
    ],
    category: "team",
    component: TeamCompactGrid,
    props: "TeamCompactGridProps",
    exampleUsage: `
<TeamCompactGrid
  heading="Our Team"
  description="Meet the people making it happen"
  ctaButtonText="Join Us"
  ctaButtonUrl="/careers"
  members={[
    {
      id: "1",
      name: "Jane Doe",
      role: "Designer",
      department: "Design",
      avatar: "/avatars/jane.jpg"
    }
  ]}
/>
    `.trim(),
  },
  "team-investor-showcase": {
    id: "team-investor-showcase",
    name: "Team Investor Showcase",
    description:
      "A clean, horizontal grid layout for showcasing investors, advisors, or board members. Each entry displays a circular photo, name, and company/firm affiliation. Features a prominent heading with primary color styling. Perfect for startup pages highlighting their backers or advisory board.",
    semanticTags: [
      "team",
      "investors",
      "advisors",
      "board",
      "backers",
      "venture",
      "startup",
      "funding",
      "profiles",
    ],
    category: "team",
    component: TeamInvestorShowcase,
    props: "TeamInvestorShowcaseProps",
    exampleUsage: `
<TeamInvestorShowcase
  heading="Our Investors"
  investors={[
    {
      name: "John Smith",
      company: "Acme Ventures",
      image: "/investors/john.jpg"
    }
  ]}
/>
    `.trim(),
  },
  "team-carousel-experience": {
    id: "team-carousel-experience",
    name: "Team Carousel Experience",
    description:
      "A dynamic team section featuring a horizontal carousel of member cards. Each card displays a photo, name, role, and years of experience with a gradient separator. Includes navigation arrows for browsing through team members. Ideal for larger teams where you want an interactive browsing experience without overwhelming the page.",
    semanticTags: [
      "team",
      "members",
      "carousel",
      "slider",
      "experience",
      "years",
      "interactive",
      "navigation",
      "profiles",
    ],
    category: "team",
    component: TeamCarouselExperience,
    props: "TeamCarouselExperienceProps",
    exampleUsage: `
<TeamCarouselExperience
  heading="Our Team"
  headingHighlight="of experts"
  description="Meet the talented individuals driving our success"
  members={[
    {
      name: "Jane Doe",
      image: "/team/jane.jpg",
      role: "CEO",
      yearsOfExperience: 15
    }
  ]}
/>
    `.trim(),
  },
  "team-filterable-search": {
    id: "team-filterable-search",
    name: "Team Filterable Search",
    description:
      "An interactive team section with a search input and department filter tabs. Users can search by name, role, or description, and filter by department. Each member card displays an avatar, name, role, department badge, description, and social links. Perfect for larger organizations where users need to find specific team members quickly.",
    semanticTags: [
      "team",
      "members",
      "search",
      "filter",
      "department",
      "interactive",
      "tabs",
      "directory",
      "profiles",
    ],
    category: "team",
    component: TeamFilterableSearch,
    props: "TeamFilterableSearchProps",
    exampleUsage: `
<TeamFilterableSearch
  heading="Find Your Team"
  description="Search and filter to find the right person"
  searchPlaceholder="Search by name or role..."
  members={[
    {
      id: "1",
      name: "Jane Doe",
      role: "Engineer",
      department: "Engineering",
      description: "Full-stack developer",
      avatar: "/avatars/jane.jpg",
      social: { github: "https://github.com/jane" }
    }
  ]}
/>
    `.trim(),
  },
  "team-compact-cta": {
    id: "team-compact-cta",
    name: "Team Compact CTA",
    description:
      "A compact team section with a clean 4-column grid and a prominent call-to-action button for career opportunities. Each member displays a simple avatar, name, and role. The CTA button is positioned prominently below the team grid. Ideal for landing pages where you want to showcase key team members while driving recruitment.",
    semanticTags: [
      "team",
      "members",
      "compact",
      "cta",
      "careers",
      "recruitment",
      "minimal",
      "grid",
      "profiles",
    ],
    category: "team",
    component: TeamCompactCta,
    props: "TeamCompactCtaProps",
    exampleUsage: `
<TeamCompactCta
  heading="Our Leadership"
  description="Meet the team driving our vision"
  ctaButtonText="View Open Positions"
  ctaButtonUrl="/careers"
  members={[
    { id: "1", name: "John Doe", role: "CEO", avatar: "/avatars/john.jpg" }
  ]}
/>
    `.trim(),
  },
  "team-hover-highlight": {
    id: "team-hover-highlight",
    name: "Team Hover Highlight",
    description:
      "A visually engaging team section where hovering over a member card highlights it while dimming others. Each card features a circular image, name, role, and social links that appear on hover. The hover effect creates focus on the selected member while maintaining context of the full team.",
    semanticTags: [
      "team",
      "members",
      "hover",
      "highlight",
      "focus",
      "interactive",
      "social",
      "animation",
      "profiles",
    ],
    category: "team",
    component: TeamHoverHighlight,
    props: "TeamHoverHighlightProps",
    exampleUsage: `
<TeamHoverHighlight
  heading="Meet Our Team"
  description="The talented individuals behind our success"
  members={[
    {
      id: "1",
      name: "Jane Doe",
      role: "Designer",
      image: "/team/jane.jpg",
      social: { linkedin: "https://linkedin.com/in/jane" }
    }
  ]}
/>
    `.trim(),
  },
  "team-social-cards": {
    id: "team-social-cards",
    name: "Team Social Cards",
    description:
      "A professional team section featuring bordered cards with member photos, biographical text, and social media links. Each card displays a circular avatar, name, role, short bio, and social icons. Cards have a subtle hover shadow effect. Ideal for showcasing key team members with context about their background.",
    semanticTags: [
      "team",
      "members",
      "cards",
      "bio",
      "social",
      "professional",
      "shadow",
      "hover",
      "profiles",
    ],
    category: "team",
    component: TeamSocialCards,
    props: "TeamSocialCardsProps",
    exampleUsage: `
<TeamSocialCards
  heading="Our Leadership"
  description="Meet the people driving our vision"
  members={[
    {
      id: "1",
      name: "John Smith",
      role: "CEO",
      bio: "20 years of industry experience",
      avatar: "/avatars/john.jpg",
      social: { linkedin: "https://linkedin.com/in/john" }
    }
  ]}
/>
    `.trim(),
  },
  "team-grid-animated": {
    id: "team-grid-animated",
    name: "Team Grid Animated",
    description:
      "A visually rich team section featuring a grid background pattern, animated member cards with wave effects on hover, and optional company social links. Each member card has a colored background that varies by position, circular avatar with border animation, and social links that appear on hover. Includes an optional register CTA button and company logo placement.",
    semanticTags: [
      "team",
      "members",
      "animated",
      "pattern",
      "wave",
      "colorful",
      "social",
      "cta",
      "profiles",
    ],
    category: "team",
    component: TeamGridAnimated,
    props: "TeamGridAnimatedProps",
    exampleUsage: `
<TeamGridAnimated
  title="TEAM"
  description="Meet the talented individuals driving our vision"
  registerLink="/register"
  members={[
    {
      name: "Jane Doe",
      designation: "CEO",
      imageSrc: "/team/jane.jpg",
      socialLinks: [{ icon: "lucide/linkedin", href: "https://linkedin.com/in/jane" }]
    }
  ]}
/>
    `.trim(),
  },
  "team-department-sections": {
    id: "team-department-sections",
    name: "Team Department Sections",
    description:
      "A structured team section that organizes members by department with clear section headers. Each department has its own bordered section with a 4-column grid of members showing circular avatars, names, and roles. Ideal for larger organizations wanting to show team structure and hierarchy.",
    semanticTags: [
      "team",
      "members",
      "department",
      "sections",
      "organized",
      "hierarchy",
      "structure",
      "corporate",
      "profiles",
    ],
    category: "team",
    component: TeamDepartmentSections,
    props: "TeamDepartmentSectionsProps",
    exampleUsage: `
<TeamDepartmentSections
  heading="Our Team"
  departments={[
    {
      name: "Engineering",
      members: [
        { name: "John Doe", role: "Lead Engineer", avatar: "/avatars/john.jpg" }
      ]
    }
  ]}
/>
    `.trim(),
  },
  "team-alternating-bios": {
    id: "team-alternating-bios",
    name: "Team Alternating Bios",
    description:
      "A premium team section featuring alternating left/right layouts for each member. Each entry displays a large 4:3 aspect ratio image, name, role, detailed bio, and social media links. Includes a decorative dot pattern background element. Ideal for showcasing key leadership with in-depth biographical information.",
    semanticTags: [
      "team",
      "members",
      "alternating",
      "bio",
      "leadership",
      "premium",
      "large-image",
      "detailed",
      "profiles",
    ],
    category: "team",
    component: TeamAlternatingBios,
    props: "TeamAlternatingBiosProps",
    exampleUsage: `
<TeamAlternatingBios
  heading="Our Leadership"
  description="Meet the visionaries behind our success"
  members={[
    {
      name: "Jane Smith",
      role: "CEO",
      bio: "20 years of industry experience leading innovative companies...",
      image: "/team/jane.jpg",
      social: { linkedin: "https://linkedin.com/in/jane" }
    }
  ]}
/>
    `.trim(),
  },
  "team-avatar-social": {
    id: "team-avatar-social",
    name: "Team Avatar Social",
    description:
      "A simple, elegant team section featuring a 4-column grid of circular avatars with names, roles, and social media links centered below each member. Uses the Avatar component for consistent styling. Ideal for showcasing a small to medium-sized team with a clean, professional appearance.",
    semanticTags: [
      "team",
      "members",
      "avatar",
      "social",
      "simple",
      "clean",
      "centered",
      "grid",
      "profiles",
    ],
    category: "team",
    component: TeamAvatarSocial,
    props: "TeamAvatarSocialProps",
    exampleUsage: `
<TeamAvatarSocial
  heading="Our Team"
  description="The creative minds behind our success"
  members={[
    {
      name: "John Doe",
      role: "Designer",
      image: "/avatars/john.jpg",
      social: { twitter: "https://twitter.com/john" }
    }
  ]}
/>
    `.trim(),
  },
  "team-hover-overlay": {
    id: "team-hover-overlay",
    name: "Team Hover Overlay",
    description:
      "A visually striking team section featuring portrait-style cards (3:4 aspect ratio) with a gradient overlay that reveals bio text and social links on hover. Each card shows a full-bleed image with name and role at the bottom, and on hover displays additional biographical information and social media links with a smooth animation.",
    semanticTags: [
      "team",
      "members",
      "hover",
      "overlay",
      "portrait",
      "gradient",
      "reveal",
      "animation",
      "profiles",
    ],
    category: "team",
    component: TeamHoverOverlay,
    props: "TeamHoverOverlayProps",
    exampleUsage: `
<TeamHoverOverlay
  heading="Our Team"
  description="The amazing people behind the scenes"
  members={[
    {
      name: "Jane Doe",
      role: "Designer",
      bio: "Passionate about creating beautiful experiences",
      image: "/team/jane.jpg",
      social: { linkedin: "https://linkedin.com/in/jane" }
    }
  ]}
/>
    `.trim(),
  },
  "team-role-filter": {
    id: "team-role-filter",
    name: "Team Role Filter",
    description:
      "An interactive team section with filter buttons to show members by role/department. Features a row of filter buttons at the top that filter the team grid below. Each member card shows a circular avatar, name, position, and social links. Ideal for organizations wanting to let users explore team members by department.",
    semanticTags: [
      "team",
      "members",
      "filter",
      "role",
      "department",
      "interactive",
      "buttons",
      "directory",
      "profiles",
    ],
    category: "team",
    component: TeamRoleFilter,
    props: "TeamRoleFilterProps",
    exampleUsage: `
<TeamRoleFilter
  heading="Our Team"
  description="Filter by department"
  roles={["All", "Engineering", "Design", "Marketing"]}
  members={[
    {
      name: "Jane Doe",
      role: "Engineering",
      position: "Senior Engineer",
      image: "/avatars/jane.jpg",
      social: { github: "https://github.com/jane" }
    }
  ]}
/>
    `.trim(),
  },
  "team-contact-cards": {
    id: "team-contact-cards",
    name: "Team Contact Cards",
    description:
      "A comprehensive team section designed for contact and networking purposes. Each card displays a member photo with availability status indicator, name, role, bio, contact information (email, phone, location), availability text, and social links. Status indicators show green for active, yellow for busy, and gray for away. Ideal for sales teams, consultants, or any team where direct contact is important.",
    semanticTags: [
      "team",
      "members",
      "contact",
      "availability",
      "status",
      "email",
      "phone",
      "networking",
      "profiles",
    ],
    category: "team",
    component: TeamContactCards,
    props: "TeamContactCardsProps",
    exampleUsage: `
<TeamContactCards
  heading="Contact Our Team"
  description="Reach out to the right person"
  members={[
    {
      name: "John Doe",
      role: "Sales Director",
      bio: "Available for enterprise discussions",
      image: "/avatars/john.jpg",
      contact: { email: "john@example.com", phone: "+1 555-0123", location: "NYC" },
      availability: "Available now",
      status: "active",
      social: { linkedin: "https://linkedin.com/in/john" }
    }
  ]}
/>
    `.trim(),
  },
  "team-large-images": {
    id: "team-large-images",
    name: "Team Large Images",
    description:
      "A visually impactful team section featuring large 4:3 aspect ratio images in a 3-column grid. Each member entry shows a prominent image, name, role, biographical text, and social media links. Ideal for leadership pages or smaller teams where you want to give each member significant visual presence.",
    semanticTags: [
      "team",
      "members",
      "large-image",
      "prominent",
      "leadership",
      "bio",
      "visual",
      "grid",
      "profiles",
    ],
    category: "team",
    component: TeamLargeImages,
    props: "TeamLargeImagesProps",
    exampleUsage: `
<TeamLargeImages
  heading="Our Leadership"
  description="The talented people behind the scenes"
  members={[
    {
      name: "Jane Doe",
      role: "CEO",
      bio: "20 years of industry experience",
      image: "/team/jane.jpg",
      social: { linkedin: "https://linkedin.com/in/jane" }
    }
  ]}
/>
    `.trim(),
  },
  "team-skill-badges": {
    id: "team-skill-badges",
    name: "Team Skill Badges",
    description:
      "A professional team section featuring cards with circular avatars, member details, and skill badges. Each card displays a centered avatar with a decorative ring, name, role, bio, skill badges, and social links. The skill badges highlight each member's areas of expertise. Ideal for showcasing technical teams or consultants where skills are important differentiators.",
    semanticTags: [
      "team",
      "members",
      "skills",
      "badges",
      "expertise",
      "technical",
      "consultants",
      "competencies",
      "profiles",
    ],
    category: "team",
    component: TeamSkillBadges,
    props: "TeamSkillBadgesProps",
    exampleUsage: `
<TeamSkillBadges
  heading="Our Experts"
  description="The skilled professionals behind our success"
  members={[
    {
      name: "John Doe",
      role: "Senior Engineer",
      bio: "Full-stack developer with 10 years experience",
      image: "/avatars/john.jpg",
      skills: ["React", "Node.js", "AWS", "TypeScript"],
      social: { github: "https://github.com/john" }
    }
  ]}
/>
    `.trim(),
  },
  "team-testimonial-stats": {
    id: "team-testimonial-stats",
    name: "Team Testimonial Stats",
    description:
      "A premium team section featuring horizontal cards split between a large image and content area. Each card displays a full-height member photo on one side, with name, role, achievement stats (years, projects, clients, awards), a testimonial quote with quote icon, and social links on the other side. Ideal for showcasing leadership with credibility-building metrics.",
    semanticTags: [
      "team",
      "members",
      "testimonial",
      "stats",
      "metrics",
      "achievements",
      "quote",
      "leadership",
      "profiles",
    ],
    category: "team",
    component: TeamTestimonialStats,
    props: "TeamTestimonialStatsProps",
    exampleUsage: `
<TeamTestimonialStats
  heading="Our Leadership"
  description="The talented individuals guiding our vision"
  members={[
    {
      name: "Jane Doe",
      role: "CEO",
      testimonial: "Building the future of technology",
      image: "/team/jane.jpg",
      stats: { years: "15+", projects: "100+", clients: "50+" },
      social: { linkedin: "https://linkedin.com/in/jane" }
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
  "footer-brand-links-contact": {
    id: "footer-brand-links-contact",
    name: "Brand Links + Contact Footer",
    description:
      "A multi-column footer with logo and brand summary, navigation link groups, contact details, social icons, and a legal bar. Great for corporate sites that need both navigation depth and clear contact paths.",
    semanticTags: [
      "footer",
      "brand",
      "links",
      "contact",
      "social",
      "legal",
      "multi-column",
      "navigation",
    ],
    category: "footer",
    component: FooterBrandLinksContact,
    props: "FooterBrandLinksContactProps",
    exampleUsage: `<FooterBrandLinksContact />`.trim(),
  },
  "footer-comprehensive-links": {
    id: "footer-comprehensive-links",
    name: "Comprehensive Links Footer",
    description:
      "A full-width footer with brand summary, navigation columns, optional article links, contact details, social icons, and a bottom legal bar. Ideal for content-rich sites that need robust navigation and visibility into resources.",
    semanticTags: [
      "footer",
      "comprehensive",
      "links",
      "contact",
      "social",
      "articles",
      "navigation",
      "legal",
    ],
    category: "footer",
    component: FooterComprehensiveLinks,
    props: "FooterComprehensiveLinksProps",
    exampleUsage: `<FooterComprehensiveLinks />`.trim(),
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
      "A responsive grid layout displaying content items with author attribution, category badges, and metadata. Features a 3-column grid on large screens with hover effects on images. Ideal for content listing pages that emphasize author information and categorization.",
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
  heading="Content Hub"
  description="Browse our latest content and insights"
  posts={[
    {
      id: "item-1",
      title: "Content Title",
      summary: "Brief description of the content...",
      label: "Category",
      author: "Author Name",
      published: "Date",
      href: "#",
      image: "/images/item.jpg"
    }
  ]}
/>
    `.trim(),
  },
  "blog-cards-tagline-cta": {
    id: "blog-cards-tagline-cta",
    name: "Blog Cards Tagline CTA",
    description:
      "A centered content section with tagline badge, heading, description, and CTA button above a 3-column card grid. Each card features an image, title, summary, and action link. Perfect for marketing-focused content sections that need a strong call-to-action alongside item previews.",
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
  badge="Latest Updates"
  heading="Discover Our Content"
  description="Explore our latest insights and updates"
  ctaAction={{
    label: "View All",
    href: "/content"
  }}
  posts={[
    {
      id: "1",
      title: "Content Item Title",
      summary: "Brief description of the content item",
      image: "/images/content-1.jpg",
      href: "/content/item-1"
    }
  ]}
  readMoreText="Read more"
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
      "A content grid with category badges overlaid on images using a glassmorphism effect. Features a centered header section with badge, heading, description, and optional action link. Each card shows the item image, category overlay, title, date with icon, and optional action link. Great for visually categorized content with modern styling.",
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
  badge="Content"
  heading="Latest Updates"
  description="Stay informed with our updates"
  readMoreText="Learn more"
  viewAllAction={{
    label: "View All",
    href: "/content"
  }}
  posts={[
    {
      id: "1",
      title: "Content Item Title",
      image: "/image.jpg",
      category: "Category",
      date: "January 1, 2024",
      href: "/content/1"
    }
  ]}
/>
    `.trim(),
  },
  "blog-featured-popular": {
    id: "blog-featured-popular",
    name: "Blog Featured Popular",
    description:
      "A two-tier content layout with a large featured item at the top and an additional content grid below. The featured item displays side-by-side image and content on desktop. Additional items show in a 3-column grid with images, category badges, titles, and descriptions. Renders only provided content without any defaults. Perfect for highlighting primary content alongside secondary content collections.",
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
      "content",
      "layout",
      "collection",
    ],
    category: "blog",
    component: BlogFeaturedPopular,
    props: "BlogFeaturedPopularProps",
    exampleUsage: `
<BlogFeaturedPopular
  heading="Content Hub"
  popularHeading="More Content"
  posts={[
    {
      id: "1",
      title: "Featured Content Title",
      description: "Description of featured content...",
      category: "Category",
      href: "/content/1",
      image: "/images/featured.jpg"
    },
    {
      id: "2",
      title: "Additional Content Title",
      description: "Description...",
      category: "Category",
      href: "/content/2",
      image: "/images/item-2.jpg"
    }
  ]}
/>
    `.trim(),
  },
  "blog-related-articles": {
    id: "blog-related-articles",
    name: "Blog Related Articles",
    description:
      "A compact related articles section with a 4-column grid layout. Each article displays category, title, description, and date in a text-only format without images. Features a header with title and 'See all' button. Ideal for sidebar widgets or end-of-article related content suggestions.",
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
  heading="Related Articles"
  seeAllAction={{ label: "See all", href: "/articles" }}
/>
    `.trim(),
  },
  "blog-tech-insights": {
    id: "blog-tech-insights",
    name: "Blog Tech Insights",
    description:
      "A dark-themed content section with a featured item and secondary items list. The featured item displays a large image with title and author info. Secondary items appear in a bordered list with thumbnails and content snippets. Includes a header with title, description, and primary CTA button. Perfect for content-focused layouts with a modern, professional aesthetic.",
    semanticTags: [
      "blog",
      "posts",
      "articles",
      "content",
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
  heading="Latest Insights"
  description="Discover our latest content and updates"
/>
    `.trim(),
  },
  "blog-horizontal-cards": {
    id: "blog-horizontal-cards",
    name: "Blog Horizontal Cards",
    description:
      "A content layout with horizontal card orientation featuring side-by-side image and content. Each card displays a thumbnail, category badge, author, date, title, summary, and 'Read more' link. Includes a centered header with optional badge, heading, and description, plus a bottom CTA button. Ideal for content-rich layouts that need more space for item summaries.",
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
  badge="Updates"
  heading="Latest Content"
  description="Explore our content"
  posts={[
    {
      id: "1",
      title: "Content Title",
      image: "/image.jpg",
      summary: "Brief description",
      href: "/content/1"
    }
  ]}
  readMoreText="Read more"
  ctaAction={{
    label: "View All",
    href: "/content"
  }}
/>
    `.trim(),
  },
  "blog-filtered-results": {
    id: "blog-filtered-results",
    name: "Filtered Content Results",
    description:
      "A comprehensive content listing page with breadcrumb navigation, featured primary item, category filtering, and paginated results. Features a muted background header section with title, description, and primary item card. The main section includes checkbox-based category filters and a pagination button. Perfect for full content listing pages with advanced filtering capabilities.",
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
      "content",
    ],
    category: "blog",
    component: BlogFilteredResults,
    props: "BlogFilteredResultsProps",
    exampleUsage: `
<BlogFilteredResults
  heading="Featured Content"
  description="Discover our latest content"
  allContentHeading="All Items"
  categories={[
    { label: "All", value: "all" },
    { label: "Category A", value: "category-a" },
    { label: "Category B", value: "category-b" }
  ]}
  posts={[
    {
      id: "1",
      title: "Sample Item",
      summary: "Item description",
      category: "category-a",
      href: "/item-1"
    }
  ]}
/>
    `.trim(),
  },
  "blog-masonry-featured": {
    id: "blog-masonry-featured",
    name: "Blog Masonry Featured",
    description:
      "A masonry-style grid with a large featured item spanning two columns and rows, surrounded by smaller item cards. The featured item includes a full description while secondary items show only title and metadata. Features a centered heading and hover effects on media. Ideal for visually dynamic layouts that highlight a primary content piece.",
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
  heading="Latest Content"
  posts={[
    {
      title: "Featured Item",
      description: "Detailed description for the featured content",
      image: "/path/to/image.jpg",
      date: "2024-01-01",
      author: "Author Name",
      href: "/featured-item"
    },
    {
      title: "Secondary Item",
      image: "/path/to/image2.jpg",
      date: "2024-01-02",
      author: "Author Name",
      href: "/secondary-item"
    }
  ]}
/>
    `.trim(),
  },
  "blog-horizontal-timeline": {
    id: "blog-horizontal-timeline",
    name: "Blog Horizontal Timeline",
    description:
      "A timeline-style layout with large images alongside content cards in a horizontal arrangement. Each item features a rounded image, title, uppercase date, description, and animated action button with arrow icon. Items are separated by borders creating a timeline effect. Perfect for chronological content presentation or editorial storytelling.",
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
  heading="Timeline"
  readText="Read More"
  posts={[
    {
      title: "Content Title",
      date: "January 2024",
      description: "Content description...",
      href: "#",
      image: "/images/item1.jpg"
    }
  ]}
/>
    `.trim(),
  },
  "blog-grid-nine-posts": {
    id: "blog-grid-nine-posts",
    name: "Blog Grid Nine Posts",
    description:
      "A comprehensive content grid layout displaying multiple items with author avatars, category badges, and publication dates. Features a 3-column grid on large screens with hover effects on images. Includes a mobile-only CTA button at the bottom. Ideal for content archive pages that need to display many items at once with full author attribution and content categorization.",
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
  heading="Content Archive"
  description="Browse all our content"
  posts={[
    {
      id: "1",
      title: "Content title",
      summary: "Content description",
      image: "/path/to/image.jpg",
      author: "Author Name",
      authorAvatar: "/path/to/avatar.jpg",
      published: "Jan 1, 2024",
      category: "Category",
      href: "/content/item-1"
    }
  ]}
  ctaAction={{
    label: "View all items",
    href: "/content"
  }}
/>
    `.trim(),
  },
  "blog-carousel-apple": {
    id: "blog-carousel-apple",
    name: "Blog Carousel Apple",
    description:
      "An eye-catching horizontal carousel featuring Apple-style cards with gradient overlays and smooth animations. Each card displays a featured image, category tag, and title with configurable action types (link, dialog, lightbox). Features optional layout animations and supports custom click handlers. Perfect for showcasing featured content items, latest updates, or curated content collections with a premium, polished aesthetic.",
    semanticTags: [
      "blog",
      "carousel",
      "apple-style",
      "horizontal-scroll",
      "cards",
      "gradient-overlay",
      "animated",
      "featured",
      "premium",
    ],
    category: "blog",
    component: BlogCarouselApple,
    props: "BlogCarouselAppleProps",
    exampleUsage: `
<BlogCarouselApple
  title="Latest Insights"
  subtitle="Featured Content"
  posts={[
    {
      image: "/images/content-1.jpg",
      title: "Content Title",
      category: "Category",
      url: "/content/item-1",
      excerpt: "Brief description..."
    }
  ]}
  actionType="link"
  background="gray"
/>
    `.trim(),
  },
  "article-hero-prose": {
    id: "article-hero-prose",
    name: "Article Hero Prose",
    description:
      "A full-width content layout featuring a prominent hero media, author information with avatar, and rich prose content including alerts, tables, blockquotes, and lists. Ideal for long-form content that needs visual hierarchy with a strong opening media and detailed content sections.",
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
  "hero-overlay-cta-grid": {
    id: "hero-overlay-cta-grid",
    name: "Overlay CTA Grid Hero",
    description:
      "A background-image hero with a centered badge, headline, dual CTAs, and a grid of icon cards for quick navigation. Ideal for service-focused landing pages that need both narrative impact and fast access to top offerings.",
    semanticTags: [
      "hero",
      "overlay",
      "background-image",
      "cta",
      "grid",
      "cards",
      "icons",
      "landing",
      "services",
      "navigation",
    ],
    category: "hero",
    component: HeroOverlayCtaGrid,
    props: "HeroOverlayCtaGridProps",
    exampleUsage: `<HeroOverlayCtaGrid />`.trim(),
  },
  "hero-split-icon-cards": {
    id: "hero-split-icon-cards",
    name: "Split Icon Cards Hero",
    description:
      "A two-column hero with heading, description, and CTAs on the left, plus stacked icon cards on the right. Perfect for highlighting key benefits or service pillars in a quick, scannable layout.",
    semanticTags: [
      "hero",
      "split",
      "two-column",
      "icon-cards",
      "benefits",
      "cta",
      "services",
      "features",
      "callouts",
    ],
    category: "hero",
    component: HeroSplitIconCards,
    props: "HeroSplitIconCardsProps",
    exampleUsage: `<HeroSplitIconCards />`.trim(),
  },
  "hero-floating-images": {
    id: "hero-floating-images",
    name: "Floating Images Hero",
    description:
      "A centered hero with decorative swirl lines and floating image accents around the headline. Great for lifestyle, hospitality, or brand-forward landing pages that need a playful visual tone.",
    semanticTags: [
      "hero",
      "floating",
      "images",
      "centered",
      "decorative",
      "playful",
      "brand",
      "landing",
      "visual",
    ],
    category: "hero",
    component: HeroFloatingImages,
    props: "HeroFloatingImagesProps",
    exampleUsage: `<HeroFloatingImages />`.trim(),
  },
  "hero-badge-image-split": {
    id: "hero-badge-image-split",
    name: "Badge Image Split Hero",
    description:
      "A split-layout hero section with a badge, headline, description, and CTA buttons on the left, and a large featured image on the right. Includes a logo bar showing trusted companies. Perfect for SaaS products and business landing pages.",
    semanticTags: [
      "hero",
      "landing",
      "split",
      "badge",
      "image",
      "cta",
      "logos",
      "trust",
      "saas",
      "business",
    ],
    category: "hero",
    component: HeroBadgeImageSplit,
    props: "HeroBadgeImageSplitProps",
    exampleUsage: `<HeroBadgeImageSplit />`.trim(),
  },

  "hero-image-left-content": {
    id: "hero-image-left-content",
    name: "Image Left Content Hero",
    description:
      "A hero section with a large image on the left and content on the right, featuring headline, description, and CTA buttons. Great for showcasing products or services with visual emphasis.",
    semanticTags: [
      "hero",
      "landing",
      "split",
      "image",
      "content",
      "cta",
      "product",
      "visual",
    ],
    category: "hero",
    component: HeroImageLeftContent,
    props: "HeroImageLeftContentProps",
    exampleUsage: `<HeroImageLeftContent />`.trim(),
  },

  "hero-image-slider": {
    id: "hero-image-slider",
    name: "Image Slider Hero",
    description:
      "An immersive hero that layers headline content over a rotating image slider. Ideal for storytelling or product showcases where multiple visuals should share the spotlight.",
    semanticTags: [
      "hero",
      "slider",
      "carousel",
      "images",
      "background",
      "overlay",
      "cta",
      "storytelling",
      "visual",
      "rotating",
    ],
    category: "hero",
    component: HeroImageSlider,
    props: "HeroImageSliderProps",
    exampleUsage: `<HeroImageSlider />`.trim(),
  },

  "hero-centered-image-grid": {
    id: "hero-centered-image-grid",
    name: "Centered Image Grid Hero",
    description:
      "A centered hero section with headline and description above a grid of images. Ideal for portfolios, galleries, or showcasing multiple products or team members.",
    semanticTags: [
      "hero",
      "centered",
      "grid",
      "images",
      "gallery",
      "portfolio",
      "showcase",
    ],
    category: "hero",
    component: HeroCenteredImageGrid,
    props: "HeroCenteredImageGridProps",
    exampleUsage: `<HeroCenteredImageGrid />`.trim(),
  },

  "hero-centered-screenshot": {
    id: "hero-centered-screenshot",
    name: "Centered Screenshot Hero",
    description:
      "A centered hero with headline, description, and CTA buttons above a large product screenshot. Perfect for SaaS products, apps, and software landing pages.",
    semanticTags: [
      "hero",
      "centered",
      "screenshot",
      "product",
      "saas",
      "app",
      "software",
      "demo",
    ],
    category: "hero",
    component: HeroCenteredScreenshot,
    props: "HeroCenteredScreenshotProps",
    exampleUsage: `<HeroCenteredScreenshot />`.trim(),
  },

  "hero-pattern-badge-logos": {
    id: "hero-pattern-badge-logos",
    name: "Pattern Badge Logos Hero",
    description:
      "A hero section with a decorative background pattern, badge, headline, and a row of trusted company logos. Great for establishing credibility and trust.",
    semanticTags: [
      "hero",
      "pattern",
      "badge",
      "logos",
      "trust",
      "credibility",
      "companies",
      "partners",
    ],
    category: "hero",
    component: HeroPatternBadgeLogos,
    props: "HeroPatternBadgeLogosProps",
    exampleUsage: `<HeroPatternBadgeLogos />`.trim(),
  },

  "hero-logo-centered-screenshot": {
    id: "hero-logo-centered-screenshot",
    name: "Logo Centered Screenshot Hero",
    description:
      "A centered hero featuring a logo, headline, description, and a large centered screenshot. Includes trusted company logos below. Ideal for product launches.",
    semanticTags: [
      "hero",
      "logo",
      "centered",
      "screenshot",
      "product",
      "launch",
      "trust",
      "logos",
    ],
    category: "hero",
    component: HeroLogoCenteredScreenshot,
    props: "HeroLogoCenteredScreenshotProps",
    exampleUsage: `<HeroLogoCenteredScreenshot />`.trim(),
  },

  "hero-pattern-logo-tech-stack": {
    id: "hero-pattern-logo-tech-stack",
    name: "Pattern Logo Tech Stack Hero",
    description:
      "A hero section with a background pattern, logo, headline, and a visual display of technology stack icons. Perfect for developer tools and technical products.",
    semanticTags: [
      "hero",
      "pattern",
      "logo",
      "tech",
      "stack",
      "developer",
      "tools",
      "technical",
      "icons",
    ],
    category: "hero",
    component: HeroPatternLogoTechStack,
    props: "HeroPatternLogoTechStackProps",
    exampleUsage: `<HeroPatternLogoTechStack />`.trim(),
  },

  "hero-announcement-badge": {
    id: "hero-announcement-badge",
    name: "Announcement Badge Hero",
    description:
      "A hero section featuring an announcement badge at the top, followed by headline, description, and CTA buttons. Great for product launches and announcements.",
    semanticTags: [
      "hero",
      "announcement",
      "badge",
      "launch",
      "news",
      "update",
      "cta",
    ],
    category: "hero",
    component: HeroAnnouncementBadge,
    props: "HeroAnnouncementBadgeProps",
    exampleUsage: `<HeroAnnouncementBadge />`.trim(),
  },

  "hero-tech-carousel": {
    id: "hero-tech-carousel",
    name: "Tech Carousel Hero",
    description:
      "A hero section with a carousel of technology logos or partner brands. Features headline, description, and auto-scrolling logo carousel. Perfect for showcasing integrations.",
    semanticTags: [
      "hero",
      "carousel",
      "tech",
      "logos",
      "partners",
      "integrations",
      "brands",
      "auto-scroll",
    ],
    category: "hero",
    component: HeroTechCarousel,
    props: "HeroTechCarouselProps",
    exampleUsage: `<HeroTechCarousel />`.trim(),
  },

  "hero-simple-centered-image": {
    id: "hero-simple-centered-image",
    name: "Simple Centered Image Hero",
    description:
      "A minimal centered hero with headline, description, CTA buttons, and a single featured image below. Clean and straightforward design for any landing page.",
    semanticTags: [
      "hero",
      "simple",
      "centered",
      "image",
      "minimal",
      "clean",
      "landing",
    ],
    category: "hero",
    component: HeroSimpleCenteredImage,
    props: "HeroSimpleCenteredImageProps",
    exampleUsage: `<HeroSimpleCenteredImage />`.trim(),
  },

  "hero-platform-features-grid": {
    id: "hero-platform-features-grid",
    name: "Platform Features Grid Hero",
    description:
      "A hero section showcasing platform features in a grid layout with icons and descriptions. Includes headline and CTA. Perfect for feature-rich products.",
    semanticTags: [
      "hero",
      "platform",
      "features",
      "grid",
      "icons",
      "product",
      "showcase",
    ],
    category: "hero",
    component: HeroPlatformFeaturesGrid,
    props: "HeroPlatformFeaturesGridProps",
    exampleUsage: `<HeroPlatformFeaturesGrid />`.trim(),
  },

  "hero-spiral-pattern-cards": {
    id: "hero-spiral-pattern-cards",
    name: "Spiral Pattern Cards Hero",
    description:
      "A creative hero with a spiral background pattern and floating feature cards. Unique visual design for creative agencies and innovative products.",
    semanticTags: [
      "hero",
      "spiral",
      "pattern",
      "cards",
      "creative",
      "innovative",
      "visual",
      "agency",
    ],
    category: "hero",
    component: HeroSpiralPatternCards,
    props: "HeroSpiralPatternCardsProps",
    exampleUsage: `<HeroSpiralPatternCards />`.trim(),
  },

  "hero-split-spiral-shapes": {
    id: "hero-split-spiral-shapes",
    name: "Split Spiral Shapes Hero",
    description:
      "A split-layout hero with content on one side and decorative spiral shapes on the other. Artistic and modern design for creative businesses.",
    semanticTags: [
      "hero",
      "split",
      "spiral",
      "shapes",
      "artistic",
      "modern",
      "creative",
      "design",
    ],
    category: "hero",
    component: HeroSplitSpiralShapes,
    props: "HeroSplitSpiralShapesProps",
    exampleUsage: `<HeroSplitSpiralShapes />`.trim(),
  },

  "hero-split-geometric-shapes": {
    id: "hero-split-geometric-shapes",
    name: "Split Geometric Shapes Hero",
    description:
      "A split-layout hero featuring geometric shapes and patterns alongside content. Modern and professional design for tech companies.",
    semanticTags: [
      "hero",
      "split",
      "geometric",
      "shapes",
      "modern",
      "professional",
      "tech",
      "patterns",
    ],
    category: "hero",
    component: HeroSplitGeometricShapes,
    props: "HeroSplitGeometricShapesProps",
    exampleUsage: `<HeroSplitGeometricShapes />`.trim(),
  },

  "hero-community-survey-cta": {
    id: "hero-community-survey-cta",
    name: "Community Survey CTA Hero",
    description:
      "A hero section focused on community engagement with a survey or feedback CTA. Includes headline, description, and prominent call-to-action for user participation.",
    semanticTags: [
      "hero",
      "community",
      "survey",
      "feedback",
      "engagement",
      "cta",
      "participation",
    ],
    category: "hero",
    component: HeroCommunitySurveyCta,
    props: "HeroCommunitySurveyCtaProps",
    exampleUsage: `<HeroCommunitySurveyCta />`.trim(),
  },

  "hero-marketplace-scattered-images": {
    id: "hero-marketplace-scattered-images",
    name: "Marketplace Scattered Images Hero",
    description:
      "A hero section with scattered product images creating a marketplace feel. Dynamic layout showcasing multiple items or categories.",
    semanticTags: [
      "hero",
      "marketplace",
      "scattered",
      "images",
      "products",
      "dynamic",
      "ecommerce",
      "shop",
    ],
    category: "hero",
    component: HeroMarketplaceScatteredImages,
    props: "HeroMarketplaceScatteredImagesProps",
    exampleUsage: `<HeroMarketplaceScatteredImages />`.trim(),
  },

  "hero-badge-shadow-overlay": {
    id: "hero-badge-shadow-overlay",
    name: "Badge Shadow Overlay Hero",
    description:
      "A hero with a badge, headline, and content overlaid on a shadowed background image. Creates depth and visual interest for impactful landing pages.",
    semanticTags: [
      "hero",
      "badge",
      "shadow",
      "overlay",
      "background",
      "depth",
      "impactful",
      "landing",
    ],
    category: "hero",
    component: HeroBadgeShadowOverlay,
    props: "HeroBadgeShadowOverlayProps",
    exampleUsage: `<HeroBadgeShadowOverlay />`.trim(),
  },

  "hero-video-background-dark": {
    id: "hero-video-background-dark",
    name: "Video Background Dark Hero",
    description:
      "A dark-themed hero with a video background, headline, and CTA buttons. Creates an immersive experience for media-rich landing pages.",
    semanticTags: [
      "hero",
      "video",
      "background",
      "dark",
      "immersive",
      "media",
      "cinematic",
      "landing",
    ],
    category: "hero",
    component: HeroVideoBackgroundDark,
    props: "HeroVideoBackgroundDarkProps",
    exampleUsage: `<HeroVideoBackgroundDark />`.trim(),
  },

  "hero-grid-pattern-efficiency": {
    id: "hero-grid-pattern-efficiency",
    name: "Grid Pattern Efficiency Hero",
    description:
      "A hero section with a grid pattern background emphasizing efficiency and productivity. Clean design for business and productivity tools.",
    semanticTags: [
      "hero",
      "grid",
      "pattern",
      "efficiency",
      "productivity",
      "business",
      "tools",
      "clean",
    ],
    category: "hero",
    component: HeroGridPatternEfficiency,
    props: "HeroGridPatternEfficiencyProps",
    exampleUsage: `<HeroGridPatternEfficiency />`.trim(),
  },

  "hero-dashed-border-features": {
    id: "hero-dashed-border-features",
    name: "Dashed Border Features Hero",
    description:
      "A hero with dashed border decorations and feature highlights. Unique visual style that draws attention to key features.",
    semanticTags: [
      "hero",
      "dashed",
      "border",
      "features",
      "unique",
      "decorative",
      "highlights",
    ],
    category: "hero",
    component: HeroDashedBorderFeatures,
    props: "HeroDashedBorderFeaturesProps",
    exampleUsage: `<HeroDashedBorderFeatures />`.trim(),
  },

  "hero-design-carousel-portfolio": {
    id: "hero-design-carousel-portfolio",
    name: "Design Carousel Portfolio Hero",
    description:
      "A portfolio-style hero with a carousel showcasing design work or projects. Perfect for creative agencies and designers.",
    semanticTags: [
      "hero",
      "design",
      "carousel",
      "portfolio",
      "creative",
      "agency",
      "projects",
      "showcase",
    ],
    category: "hero",
    component: HeroDesignCarouselPortfolio,
    props: "HeroDesignCarouselPortfolioProps",
    exampleUsage: `<HeroDesignCarouselPortfolio />`.trim(),
  },

  "hero-gradient-client-focused": {
    id: "hero-gradient-client-focused",
    name: "Gradient Client Focused Hero",
    description:
      "A hero with gradient background focused on client success stories or testimonials. Builds trust through social proof.",
    semanticTags: [
      "hero",
      "gradient",
      "client",
      "focused",
      "testimonials",
      "trust",
      "social-proof",
      "success",
    ],
    category: "hero",
    component: HeroGradientClientFocused,
    props: "HeroGradientClientFocusedProps",
    exampleUsage: `<HeroGradientClientFocused />`.trim(),
  },

  "hero-premium-split-avatars": {
    id: "hero-premium-split-avatars",
    name: "Premium Split Avatars Hero",
    description:
      "A premium split-layout hero featuring user avatars and social proof. Shows real users to build credibility and trust.",
    semanticTags: [
      "hero",
      "premium",
      "split",
      "avatars",
      "social-proof",
      "users",
      "credibility",
      "trust",
    ],
    category: "hero",
    component: HeroPremiumSplitAvatars,
    props: "HeroPremiumSplitAvatarsProps",
    exampleUsage: `<HeroPremiumSplitAvatars />`.trim(),
  },

  "hero-ui-library-showcase": {
    id: "hero-ui-library-showcase",
    name: "UI Library Showcase Hero",
    description:
      "A hero designed to showcase UI components or design systems. Features component previews and documentation links.",
    semanticTags: [
      "hero",
      "ui",
      "library",
      "showcase",
      "components",
      "design-system",
      "documentation",
      "developer",
    ],
    category: "hero",
    component: HeroUiLibraryShowcase,
    props: "HeroUiLibraryShowcaseProps",
    exampleUsage: `<HeroUiLibraryShowcase />`.trim(),
  },

  "hero-fullscreen-background-image": {
    id: "hero-fullscreen-background-image",
    name: "Fullscreen Background Image Hero",
    description:
      "A fullscreen hero with a background image, overlay, and centered content. Creates an immersive first impression.",
    semanticTags: [
      "hero",
      "fullscreen",
      "background",
      "image",
      "overlay",
      "immersive",
      "impactful",
      "landing",
    ],
    category: "hero",
    component: HeroFullscreenBackgroundImage,
    props: "HeroFullscreenBackgroundImageProps",
    exampleUsage: `<HeroFullscreenBackgroundImage />`.trim(),
  },

  "hero-fullscreen-logo-cta": {
    id: "hero-fullscreen-logo-cta",
    name: "Fullscreen Logo CTA Hero",
    description:
      "A fullscreen hero featuring a prominent logo and call-to-action. Minimal and focused design for brand-centric landing pages.",
    semanticTags: [
      "hero",
      "fullscreen",
      "logo",
      "cta",
      "minimal",
      "brand",
      "focused",
      "landing",
    ],
    category: "hero",
    component: HeroFullscreenLogoCta,
    props: "HeroFullscreenLogoCtaProps",
    exampleUsage: `<HeroFullscreenLogoCta />`.trim(),
  },

  "hero-gradient-avatars-rating": {
    id: "hero-gradient-avatars-rating",
    name: "Gradient Avatars Rating Hero",
    description:
      "A hero with gradient background, user avatars, and star ratings. Combines visual appeal with social proof elements.",
    semanticTags: [
      "hero",
      "gradient",
      "avatars",
      "rating",
      "stars",
      "social-proof",
      "reviews",
      "trust",
    ],
    category: "hero",
    component: HeroGradientAvatarsRating,
    props: "HeroGradientAvatarsRatingProps",
    exampleUsage: `<HeroGradientAvatarsRating />`.trim(),
  },

  "hero-task-timer-animated": {
    id: "hero-task-timer-animated",
    name: "Task Timer Animated Hero",
    description:
      "An animated hero featuring a task timer or countdown element. Dynamic and engaging for productivity apps.",
    semanticTags: [
      "hero",
      "task",
      "timer",
      "animated",
      "countdown",
      "productivity",
      "dynamic",
      "engaging",
    ],
    category: "hero",
    component: HeroTaskTimerAnimated,
    props: "HeroTaskTimerAnimatedProps",
    exampleUsage: `<HeroTaskTimerAnimated />`.trim(),
  },

  "hero-ai-powered-carousel": {
    id: "hero-ai-powered-carousel",
    name: "AI Powered Carousel Hero",
    description:
      "A hero showcasing AI-powered features with a carousel of capabilities. Perfect for AI products and machine learning tools.",
    semanticTags: [
      "hero",
      "ai",
      "powered",
      "carousel",
      "machine-learning",
      "features",
      "technology",
      "innovation",
    ],
    category: "hero",
    component: HeroAiPoweredCarousel,
    props: "HeroAiPoweredCarouselProps",
    exampleUsage: `<HeroAiPoweredCarousel />`.trim(),
  },

  "hero-ad-campaign-expert": {
    id: "hero-ad-campaign-expert",
    name: "Ad Campaign Expert Hero",
    description:
      "A hero designed for advertising and marketing services. Features campaign metrics and expert positioning.",
    semanticTags: [
      "hero",
      "ad",
      "campaign",
      "marketing",
      "advertising",
      "expert",
      "metrics",
      "agency",
    ],
    category: "hero",
    component: HeroAdCampaignExpert,
    props: "HeroAdCampaignExpertProps",
    exampleUsage: `<HeroAdCampaignExpert />`.trim(),
  },

  "hero-adaptable-product-grid": {
    id: "hero-adaptable-product-grid",
    name: "Adaptable Product Grid Hero",
    description:
      "A flexible hero with an adaptable product grid layout. Showcases multiple products or features in a responsive grid.",
    semanticTags: [
      "hero",
      "adaptable",
      "product",
      "grid",
      "flexible",
      "responsive",
      "showcase",
      "features",
    ],
    category: "hero",
    component: HeroAdaptableProductGrid,
    props: "HeroAdaptableProductGridProps",
    exampleUsage: `<HeroAdaptableProductGrid />`.trim(),
  },

  "hero-presentation-platform-video": {
    id: "hero-presentation-platform-video",
    name: "Presentation Platform Video Hero",
    description:
      "A split-layout hero with video content on the right and presentation platform messaging on the left. Ideal for video conferencing and presentation tools.",
    semanticTags: [
      "hero",
      "presentation",
      "platform",
      "video",
      "split",
      "conferencing",
      "tools",
      "communication",
    ],
    category: "hero",
    component: HeroPresentationPlatformVideo,
    props: "HeroPresentationPlatformVideoProps",
    exampleUsage: `<HeroPresentationPlatformVideo />`.trim(),
  },

  "hero-grid-pattern-solutions": {
    id: "hero-grid-pattern-solutions",
    name: "Grid Pattern Solutions Hero",
    description:
      "A hero with grid pattern background and centered content showcasing business solutions. Professional design for B2B services.",
    semanticTags: [
      "hero",
      "grid",
      "pattern",
      "solutions",
      "business",
      "b2b",
      "professional",
      "services",
    ],
    category: "hero",
    component: HeroGridPatternSolutions,
    props: "HeroGridPatternSolutionsProps",
    exampleUsage: `<HeroGridPatternSolutions />`.trim(),
  },

  "hero-crm-streamlined": {
    id: "hero-crm-streamlined",
    name: "CRM Streamlined Hero",
    description:
      "A streamlined hero for CRM and sales tools. Features split layout with product image and CRM-focused messaging.",
    semanticTags: [
      "hero",
      "crm",
      "streamlined",
      "sales",
      "tools",
      "split",
      "product",
      "business",
    ],
    category: "hero",
    component: HeroCrmStreamlined,
    props: "HeroCrmStreamlinedProps",
    exampleUsage: `<HeroCrmStreamlined />`.trim(),
  },

  "hero-billing-platform-logos": {
    id: "hero-billing-platform-logos",
    name: "Billing Platform Logos Hero",
    description:
      "A hero for billing and payment platforms featuring trusted company logos in a carousel. Builds trust for fintech products.",
    semanticTags: [
      "hero",
      "billing",
      "platform",
      "logos",
      "payment",
      "fintech",
      "trust",
      "carousel",
    ],
    category: "hero",
    component: HeroBillingPlatformLogos,
    props: "HeroBillingPlatformLogosProps",
    exampleUsage: `<HeroBillingPlatformLogos />`.trim(),
  },

  "hero-software-growth-video-dialog": {
    id: "hero-software-growth-video-dialog",
    name: "Software Growth Video Dialog Hero",
    description:
      "A hero focused on software growth with a video dialog modal. Features scattered images and growth-focused messaging.",
    semanticTags: [
      "hero",
      "software",
      "growth",
      "video",
      "dialog",
      "modal",
      "saas",
      "startup",
    ],
    category: "hero",
    component: HeroSoftwareGrowthVideoDialog,
    props: "HeroSoftwareGrowthVideoDialogProps",
    exampleUsage: `<HeroSoftwareGrowthVideoDialog />`.trim(),
  },

  "hero-conversion-video-play": {
    id: "hero-conversion-video-play",
    name: "Conversion Video Play Hero",
    description:
      "A conversion-focused hero with a prominent video play button and brand logos. Designed to drive engagement and conversions.",
    semanticTags: [
      "hero",
      "conversion",
      "video",
      "play",
      "engagement",
      "logos",
      "cta",
      "marketing",
    ],
    category: "hero",
    component: HeroConversionVideoPlay,
    props: "HeroConversionVideoPlayProps",
    exampleUsage: `<HeroConversionVideoPlay />`.trim(),
  },

  "hero-design-showcase-logos": {
    id: "hero-design-showcase-logos",
    name: "Design Showcase Logos Hero",
    description:
      "A hero showcasing design work with trusted design team logos. Perfect for design agencies and creative studios.",
    semanticTags: [
      "hero",
      "design",
      "showcase",
      "logos",
      "agency",
      "creative",
      "studio",
      "portfolio",
    ],
    category: "hero",
    component: HeroDesignShowcaseLogos,
    props: "HeroDesignShowcaseLogosProps",
    exampleUsage: `<HeroDesignShowcaseLogos />`.trim(),
  },

  "hero-video-overlay-stars": {
    id: "hero-video-overlay-stars",
    name: "Video Overlay Stars Hero",
    description:
      "A hero with video overlay, star rating, and testimonial. Combines video content with social proof elements.",
    semanticTags: [
      "hero",
      "video",
      "overlay",
      "stars",
      "rating",
      "testimonial",
      "social-proof",
      "reviews",
    ],
    category: "hero",
    component: HeroVideoOverlayStars,
    props: "HeroVideoOverlayStarsProps",
    exampleUsage: `<HeroVideoOverlayStars />`.trim(),
  },

  "hero-productivity-launcher-video": {
    id: "hero-productivity-launcher-video",
    name: "Productivity Launcher Video Hero",
    description:
      "A hero for productivity apps with video background and download buttons. Features app store badges and launcher-style design.",
    semanticTags: [
      "hero",
      "productivity",
      "launcher",
      "video",
      "download",
      "app",
      "mobile",
      "desktop",
    ],
    category: "hero",
    component: HeroProductivityLauncherVideo,
    props: "HeroProductivityLauncherVideoProps",
    exampleUsage: `<HeroProductivityLauncherVideo />`.trim(),
  },

  "hero-hiring-animated-text": {
    id: "hero-hiring-animated-text",
    name: "Hiring Animated Text Hero",
    description:
      "A hero for hiring platforms with animated rotating text. Dynamic design that showcases different job roles or skills.",
    semanticTags: [
      "hero",
      "hiring",
      "animated",
      "text",
      "jobs",
      "recruitment",
      "careers",
      "dynamic",
    ],
    category: "hero",
    component: HeroHiringAnimatedText,
    props: "HeroHiringAnimatedTextProps",
    exampleUsage: `<HeroHiringAnimatedText />`.trim(),
  },

  "hero-split-image-newsletter": {
    id: "hero-split-image-newsletter",
    name: "Split Image Newsletter Hero",
    description:
      "A split-layout hero with image and newsletter signup form. Perfect for content creators and newsletter-focused businesses.",
    semanticTags: [
      "hero",
      "split",
      "image",
      "newsletter",
      "signup",
      "email",
      "content",
      "subscription",
    ],
    category: "hero",
    component: HeroSplitImageNewsletter,
    props: "HeroSplitImageNewsletterProps",
    exampleUsage: `<HeroSplitImageNewsletter />`.trim(),
  },

  "hero-centered-gradient-cta": {
    id: "hero-centered-gradient-cta",
    name: "Centered Gradient CTA Hero",
    description:
      "A centered hero with gradient background and prominent CTA. Features highlight badges and feature callouts.",
    semanticTags: [
      "hero",
      "centered",
      "gradient",
      "cta",
      "features",
      "highlights",
      "modern",
      "vibrant",
    ],
    category: "hero",
    component: HeroCenteredGradientCta,
    props: "HeroCenteredGradientCtaProps",
    exampleUsage: `<HeroCenteredGradientCta />`.trim(),
  },

  "hero-stats-social-proof": {
    id: "hero-stats-social-proof",
    name: "Stats Social Proof Hero",
    description:
      "A hero featuring prominent statistics and social proof elements. Includes dashboard image and key metrics display.",
    semanticTags: [
      "hero",
      "stats",
      "social-proof",
      "metrics",
      "dashboard",
      "numbers",
      "credibility",
      "data",
    ],
    category: "hero",
    component: HeroStatsSocialProof,
    props: "HeroStatsSocialProofProps",
    exampleUsage: `<HeroStatsSocialProof />`.trim(),
  },

  "hero-feature-cards-grid": {
    id: "hero-feature-cards-grid",
    name: "Feature Cards Grid Hero",
    description:
      "A hero with feature cards arranged in a grid layout. Each card has an icon and description for key features.",
    semanticTags: [
      "hero",
      "feature",
      "cards",
      "grid",
      "icons",
      "benefits",
      "showcase",
      "product",
    ],
    category: "hero",
    component: HeroFeatureCardsGrid,
    props: "HeroFeatureCardsGridProps",
    exampleUsage: `<HeroFeatureCardsGrid />`.trim(),
  },

  "hero-testimonial-image-grid": {
    id: "hero-testimonial-image-grid",
    name: "Testimonial Image Grid Hero",
    description:
      "A hero combining testimonials with an image grid layout. Shows customer feedback alongside visual content.",
    semanticTags: [
      "hero",
      "testimonial",
      "image",
      "grid",
      "reviews",
      "customers",
      "feedback",
      "social-proof",
    ],
    category: "hero",
    component: HeroTestimonialImageGrid,
    props: "HeroTestimonialImageGridProps",
    exampleUsage: `<HeroTestimonialImageGrid />`.trim(),
  },

  "hero-design-system-3d": {
    id: "hero-design-system-3d",
    name: "Design System 3D Hero",
    description:
      "A hero showcasing design systems with 3D perspective images. Modern and innovative design for design tool products.",
    semanticTags: [
      "hero",
      "design-system",
      "3d",
      "perspective",
      "modern",
      "innovative",
      "tools",
      "creative",
    ],
    category: "hero",
    component: HeroDesignSystem3d,
    props: "HeroDesignSystem3dProps",
    exampleUsage: `<HeroDesignSystem3d />`.trim(),
  },

  "hero-architecture-fullscreen": {
    id: "hero-architecture-fullscreen",
    name: "Architecture Fullscreen Hero",
    description:
      "A fullscreen hero with architecture or real estate imagery. Features overlay content for property or construction businesses.",
    semanticTags: [
      "hero",
      "architecture",
      "fullscreen",
      "real-estate",
      "property",
      "construction",
      "overlay",
      "immersive",
    ],
    category: "hero",
    component: HeroArchitectureFullscreen,
    props: "HeroArchitectureFullscreenProps",
    exampleUsage: `<HeroArchitectureFullscreen />`.trim(),
  },

  "hero-innovation-image-grid": {
    id: "hero-innovation-image-grid",
    name: "Innovation Image Grid Hero",
    description:
      "A hero focused on innovation with an image grid layout. Showcases innovative products or research visually.",
    semanticTags: [
      "hero",
      "innovation",
      "image",
      "grid",
      "research",
      "technology",
      "showcase",
      "modern",
    ],
    category: "hero",
    component: HeroInnovationImageGrid,
    props: "HeroInnovationImageGridProps",
    exampleUsage: `<HeroInnovationImageGrid />`.trim(),
  },

  "hero-video-dialog-gradient": {
    id: "hero-video-dialog-gradient",
    name: "Video Dialog Gradient Hero",
    description:
      "A hero with gradient background and video dialog modal. Combines visual appeal with video content engagement.",
    semanticTags: [
      "hero",
      "video",
      "dialog",
      "gradient",
      "modal",
      "engagement",
      "media",
      "modern",
    ],
    category: "hero",
    component: HeroVideoDialogGradient,
    props: "HeroVideoDialogGradientProps",
    exampleUsage: `<HeroVideoDialogGradient />`.trim(),
  },

  "hero-minimal-centered-dark": {
    id: "hero-minimal-centered-dark",
    name: "Minimal Centered Dark Hero",
    description:
      "A minimal dark-themed centered hero with beta badge. Clean and focused design for product launches.",
    semanticTags: [
      "hero",
      "minimal",
      "centered",
      "dark",
      "beta",
      "launch",
      "clean",
      "focused",
    ],
    category: "hero",
    component: HeroMinimalCenteredDark,
    props: "HeroMinimalCenteredDarkProps",
    exampleUsage: `<HeroMinimalCenteredDark />`.trim(),
  },

  "hero-product-showcase-floating": {
    id: "hero-product-showcase-floating",
    name: "Product Showcase Floating Hero",
    description:
      "A hero with floating stats cards around a product showcase. Dynamic design highlighting key metrics and features.",
    semanticTags: [
      "hero",
      "product",
      "showcase",
      "floating",
      "stats",
      "cards",
      "metrics",
      "dynamic",
    ],
    category: "hero",
    component: HeroProductShowcaseFloating,
    props: "HeroProductShowcaseFloatingProps",
    exampleUsage: `<HeroProductShowcaseFloating />`.trim(),
  },

  "hero-saas-dashboard-preview": {
    id: "hero-saas-dashboard-preview",
    name: "SaaS Dashboard Preview Hero",
    description:
      "A hero featuring a SaaS dashboard preview with email signup. Perfect for software products showing their interface.",
    semanticTags: [
      "hero",
      "saas",
      "dashboard",
      "preview",
      "email",
      "signup",
      "software",
      "product",
    ],
    category: "hero",
    component: HeroSaasDashboardPreview,
    props: "HeroSaasDashboardPreviewProps",
    exampleUsage: `<HeroSaasDashboardPreview />`.trim(),
  },

  "hero-therapy-testimonial-grid": {
    id: "hero-therapy-testimonial-grid",
    name: "Therapy Testimonial Grid Hero",
    description:
      "A hero for therapy and wellness services with testimonial grid. Features calming design and client feedback.",
    semanticTags: [
      "hero",
      "therapy",
      "testimonial",
      "grid",
      "wellness",
      "health",
      "mental-health",
      "calming",
    ],
    category: "hero",
    component: HeroTherapyTestimonialGrid,
    props: "HeroTherapyTestimonialGridProps",
    exampleUsage: `<HeroTherapyTestimonialGrid />`.trim(),
  },

  "hero-mental-health-team": {
    id: "hero-mental-health-team",
    name: "Mental Health Team Hero",
    description:
      "A dark-themed hero showcasing mental health professionals. Features team images and supportive messaging.",
    semanticTags: [
      "hero",
      "mental-health",
      "team",
      "professionals",
      "dark",
      "support",
      "wellness",
      "healthcare",
    ],
    category: "hero",
    component: HeroMentalHealthTeam,
    props: "HeroMentalHealthTeamProps",
    exampleUsage: `<HeroMentalHealthTeam />`.trim(),
  },

  "hero-mentorship-video-split": {
    id: "hero-mentorship-video-split",
    name: "Mentorship Video Split Hero",
    description:
      "A split-layout hero for mentorship platforms with video preview. Features career growth messaging and video CTA.",
    semanticTags: [
      "hero",
      "mentorship",
      "video",
      "split",
      "career",
      "growth",
      "education",
      "coaching",
    ],
    category: "hero",
    component: HeroMentorshipVideoSplit,
    props: "HeroMentorshipVideoSplitProps",
    exampleUsage: `<HeroMentorshipVideoSplit />`.trim(),
  },

  "hero-business-operations-mosaic": {
    id: "hero-business-operations-mosaic",
    name: "Business Operations Mosaic Hero",
    description:
      "A hero with mosaic image layout for business operations. Features asymmetric grid and professional messaging.",
    semanticTags: [
      "hero",
      "business",
      "operations",
      "mosaic",
      "grid",
      "professional",
      "agency",
      "corporate",
    ],
    category: "hero",
    component: HeroBusinessOperationsMosaic,
    props: "HeroBusinessOperationsMosaicProps",
    exampleUsage: `<HeroBusinessOperationsMosaic />`.trim(),
  },

  "hero-agency-animated-images": {
    id: "hero-agency-animated-images",
    name: "Agency Animated Images Hero",
    description:
      "A hero for agencies with animated image transitions. Dynamic visual design showcasing creative work.",
    semanticTags: [
      "hero",
      "agency",
      "animated",
      "images",
      "creative",
      "dynamic",
      "transitions",
      "portfolio",
    ],
    category: "hero",
    component: HeroAgencyAnimatedImages,
    props: "HeroAgencyAnimatedImagesProps",
    exampleUsage: `<HeroAgencyAnimatedImages />`.trim(),
  },

  "hero-welcome-asymmetric-images": {
    id: "hero-welcome-asymmetric-images",
    name: "Welcome Asymmetric Images Hero",
    description:
      "A welcoming hero with asymmetric image layout. Features staggered images and friendly messaging.",
    semanticTags: [
      "hero",
      "welcome",
      "asymmetric",
      "images",
      "friendly",
      "staggered",
      "modern",
      "landing",
    ],
    category: "hero",
    component: HeroWelcomeAsymmetricImages,
    props: "HeroWelcomeAsymmetricImagesProps",
    exampleUsage: `<HeroWelcomeAsymmetricImages />`.trim(),
  },

  "hero-startup-launch-cta": {
    id: "hero-startup-launch-cta",
    name: "Startup Launch CTA Hero",
    description:
      "A hero designed for startup launches with prominent CTA. Features launch badge, user avatars, and growth messaging.",
    semanticTags: [
      "hero",
      "startup",
      "launch",
      "cta",
      "badge",
      "avatars",
      "growth",
      "funding",
    ],
    category: "hero",
    component: HeroStartupLaunchCta,
    props: "HeroStartupLaunchCtaProps",
    exampleUsage: `<HeroStartupLaunchCta />`.trim(),
  },

  "hero-enterprise-security": {
    id: "hero-enterprise-security",
    name: "Enterprise Security Hero",
    description:
      "A hero focused on enterprise security features. Includes security badges, feature cards, and trust logos.",
    semanticTags: [
      "hero",
      "enterprise",
      "security",
      "features",
      "trust",
      "compliance",
      "badges",
      "b2b",
    ],
    category: "hero",
    component: HeroEnterpriseSecurity,
    props: "HeroEnterpriseSecurityProps",
    exampleUsage: `<HeroEnterpriseSecurity />`.trim(),
  },

  "hero-creative-studio-stacked": {
    id: "hero-creative-studio-stacked",
    name: "Creative Studio Stacked Hero",
    description:
      "A hero for creative studios with stacked image layout. Features video CTA and design-focused messaging.",
    semanticTags: [
      "hero",
      "creative",
      "studio",
      "stacked",
      "images",
      "video",
      "design",
      "agency",
    ],
    category: "hero",
    component: HeroCreativeStudioStacked,
    props: "HeroCreativeStudioStackedProps",
    exampleUsage: `<HeroCreativeStudioStacked />`.trim(),
  },

  "hero-digital-agency-fullscreen": {
    id: "hero-digital-agency-fullscreen",
    name: "Digital Agency Fullscreen Hero",
    description:
      "A fullscreen hero for digital agencies with background image. Features location info and scroll indicator.",
    semanticTags: [
      "hero",
      "digital",
      "agency",
      "fullscreen",
      "background",
      "location",
      "immersive",
      "creative",
    ],
    category: "hero",
    component: HeroDigitalAgencyFullscreen,
    props: "HeroDigitalAgencyFullscreenProps",
    exampleUsage: `<HeroDigitalAgencyFullscreen />`.trim(),
  },

  "hero-customer-support-layered": {
    id: "hero-customer-support-layered",
    name: "Customer Support Layered Hero",
    description:
      "A hero for customer support platforms with layered image design. Features support messaging and dashboard previews.",
    semanticTags: [
      "hero",
      "customer",
      "support",
      "layered",
      "helpdesk",
      "service",
      "dashboard",
      "saas",
    ],
    category: "hero",
    component: HeroCustomerSupportLayered,
    props: "HeroCustomerSupportLayeredProps",
    exampleUsage: `<HeroCustomerSupportLayered />`.trim(),
  },

  "hero-shared-inbox-layered": {
    id: "hero-shared-inbox-layered",
    name: "Shared Inbox Layered Hero",
    description:
      "A hero for shared inbox and email tools with layered screenshots. Features inbox organization messaging.",
    semanticTags: [
      "hero",
      "shared",
      "inbox",
      "layered",
      "email",
      "collaboration",
      "team",
      "communication",
    ],
    category: "hero",
    component: HeroSharedInboxLayered,
    props: "HeroSharedInboxLayeredProps",
    exampleUsage: `<HeroSharedInboxLayered />`.trim(),
  },

  "hero-conversation-intelligence": {
    id: "hero-conversation-intelligence",
    name: "Conversation Intelligence Hero",
    description:
      "A hero for conversation intelligence and sales tools. Features gradient background and centered screenshot.",
    semanticTags: [
      "hero",
      "conversation",
      "intelligence",
      "sales",
      "ai",
      "analytics",
      "gradient",
      "saas",
    ],
    category: "hero",
    component: HeroConversationIntelligence,
    props: "HeroConversationIntelligenceProps",
    exampleUsage: `<HeroConversationIntelligence />`.trim(),
  },

  "hero-business-carousel-dots": {
    id: "hero-business-carousel-dots",
    name: "Business Carousel Dots Hero",
    description:
      "A business hero with image carousel and dot navigation. Features premium badge and professional messaging.",
    semanticTags: [
      "hero",
      "business",
      "carousel",
      "dots",
      "navigation",
      "premium",
      "professional",
      "enterprise",
    ],
    category: "hero",
    component: HeroBusinessCarouselDots,
    props: "HeroBusinessCarouselDotsProps",
    exampleUsage: `<HeroBusinessCarouselDots />`.trim(),
  },

  "hero-developer-tools-code": {
    id: "hero-developer-tools-code",
    name: "Developer Tools Code Hero",
    description:
      "A hero for developer tools featuring a terminal/code preview. Shows CLI commands and developer-focused messaging.",
    semanticTags: [
      "hero",
      "developer",
      "tools",
      "code",
      "terminal",
      "cli",
      "programming",
      "technical",
    ],
    category: "hero",
    component: HeroDeveloperToolsCode,
    props: "HeroDeveloperToolsCodeProps",
    exampleUsage: `<HeroDeveloperToolsCode />`.trim(),
  },

  "hero-ecommerce-product-showcase": {
    id: "hero-ecommerce-product-showcase",
    name: "Ecommerce Product Showcase Hero",
    description:
      "A hero for ecommerce with product image grid. Features new collection badge and shopping statistics.",
    semanticTags: [
      "hero",
      "ecommerce",
      "product",
      "showcase",
      "shopping",
      "retail",
      "collection",
      "store",
    ],
    category: "hero",
    component: HeroEcommerceProductShowcase,
    props: "HeroEcommerceProductShowcaseProps",
    exampleUsage: `<HeroEcommerceProductShowcase />`.trim(),
  },

  "hero-mobile-app-download": {
    id: "hero-mobile-app-download",
    name: "Mobile App Download Hero",
    description:
      "A hero for mobile apps with download buttons. Features app store badges, phone mockup, and ratings.",
    semanticTags: [
      "hero",
      "mobile",
      "app",
      "download",
      "ios",
      "android",
      "phone",
      "ratings",
    ],
    category: "hero",
    component: HeroMobileAppDownload,
    props: "HeroMobileAppDownloadProps",
    exampleUsage: `<HeroMobileAppDownload />`.trim(),
  },

  "hero-pricing-comparison": {
    id: "hero-pricing-comparison",
    name: "Pricing Comparison Hero",
    description:
      "A hero featuring pricing tiers comparison. Shows starter, pro, and enterprise plans with feature lists.",
    semanticTags: [
      "hero",
      "pricing",
      "comparison",
      "plans",
      "tiers",
      "subscription",
      "saas",
      "features",
    ],
    category: "hero",
    component: HeroPricingComparison,
    props: "HeroPricingComparisonProps",
    exampleUsage: `<HeroPricingComparison />`.trim(),
  },

  "hero-newsletter-minimal": {
    id: "hero-newsletter-minimal",
    name: "Newsletter Minimal Hero",
    description:
      "A minimal hero focused on newsletter signup. Clean design with email input and subscriber count.",
    semanticTags: [
      "hero",
      "newsletter",
      "minimal",
      "signup",
      "email",
      "subscription",
      "clean",
      "focused",
    ],
    category: "hero",
    component: HeroNewsletterMinimal,
    props: "HeroNewsletterMinimalProps",
    exampleUsage: `<HeroNewsletterMinimal />`.trim(),
  },

  "hero-coming-soon-countdown": {
    id: "hero-coming-soon-countdown",
    name: "Coming Soon Countdown Hero",
    description:
      "A dark-themed hero with countdown timer for launches. Features email signup and social links.",
    semanticTags: [
      "hero",
      "coming-soon",
      "countdown",
      "launch",
      "timer",
      "dark",
      "teaser",
      "anticipation",
    ],
    category: "hero",
    component: HeroComingSoonCountdown,
    props: "HeroComingSoonCountdownProps",
    exampleUsage: `<HeroComingSoonCountdown />`.trim(),
  },

  "hero-event-registration": {
    id: "hero-event-registration",
    name: "Event Registration Hero",
    description:
      "A hero for event registration with date badge. Features speaker count, workshop info, and venue location.",
    semanticTags: [
      "hero",
      "event",
      "registration",
      "conference",
      "workshop",
      "speakers",
      "venue",
      "date",
    ],
    category: "hero",
    component: HeroEventRegistration,
    props: "HeroEventRegistrationProps",
    exampleUsage: `<HeroEventRegistration />`.trim(),
  },

  "hero-portfolio-creative": {
    id: "hero-portfolio-creative",
    name: "Portfolio Creative Hero",
    description:
      "A hero for creative portfolios with profile and project grid. Features social links and personal branding.",
    semanticTags: [
      "hero",
      "portfolio",
      "creative",
      "profile",
      "projects",
      "personal",
      "designer",
      "freelancer",
    ],
    category: "hero",
    component: HeroPortfolioCreative,
    props: "HeroPortfolioCreativeProps",
    exampleUsage: `<HeroPortfolioCreative />`.trim(),
  },

  // Case Studies List blocks
  "case-studies-image-grid": {
    id: "case-studies-image-grid",
    name: "Case Studies Image Grid",
    description:
      "A responsive grid layout displaying case studies with full-bleed background images, company logos, and hover zoom effects. Features a 2-column asymmetric grid where the first and fifth items span 2 rows for visual hierarchy. Each card shows a gradient overlay, company logo at top, and case study title at bottom. Ideal for showcasing client success stories, portfolio highlights, or featured projects with strong visual impact.",
    semanticTags: [
      "case-studies",
      "portfolio",
      "grid",
      "images",
      "clients",
      "success-stories",
      "projects",
      "showcase",
      "hover-effects",
      "visual",
    ],
    category: "case-studies-list",
    component: CaseStudiesImageGrid,
    props: "CaseStudiesImageGridProps",
    exampleUsage: `<CaseStudiesImageGrid />`.trim(),
  },

  "case-studies-testimonial-stats": {
    id: "case-studies-testimonial-stats",
    name: "Case Studies Testimonial Stats",
    description:
      "A split-layout component displaying customer testimonials alongside key metrics. Features customer photo and quote on the left, and performance statistics on the right. Each testimonial includes author details with company logo. Multiple testimonials are separated by horizontal dividers. Ideal for showcasing customer success stories with quantifiable results and social proof metrics.",
    semanticTags: [
      "case-studies",
      "testimonials",
      "stats",
      "metrics",
      "quotes",
      "customers",
      "social-proof",
      "results",
      "success",
      "roi",
    ],
    category: "case-studies-list",
    component: CaseStudiesTestimonialStats,
    props: "CaseStudiesTestimonialStatsProps",
    exampleUsage: `<CaseStudiesTestimonialStats />`.trim(),
  },

  "case-studies-featured-border": {
    id: "case-studies-featured-border",
    name: "Case Studies Featured Border",
    description:
      "A bordered card layout with a prominent featured case study and secondary items below. Features a full-width bordered container with dot pattern decorations on the sides. The featured case study shows company logo, tags, title with subtitle, image preview, and a 'Read case study' CTA with arrow icon. Secondary case studies appear in a two-column grid below. Hover states include background color transitions. Ideal for highlighting a primary success story while showcasing additional case studies.",
    semanticTags: [
      "case-studies",
      "featured",
      "border",
      "cards",
      "cta",
      "hover",
      "dot-pattern",
      "enterprise",
      "b2b",
      "professional",
    ],
    category: "case-studies-list",
    component: CaseStudiesFeaturedBorder,
    props: "CaseStudiesFeaturedBorderProps",
    exampleUsage: `<CaseStudiesFeaturedBorder />`.trim(),
  },

  "case-studies-stats-card": {
    id: "case-studies-stats-card",
    name: "Case Studies Stats Card",
    description:
      "A single case study card format with company branding, key metrics, author attribution, and call-to-action. Features a two-column layout within a muted background container. The left column shows company logo, key statistics in a row, and author info with avatar. The right column displays the case study title, summary text, and a 'Read Story' button with arrow icon. Ideal for highlighting a featured customer success story with quantifiable results and personal testimonial.",
    semanticTags: [
      "case-studies",
      "stats",
      "card",
      "metrics",
      "author",
      "cta",
      "featured",
      "testimonial",
      "avatar",
      "single",
    ],
    category: "case-studies-list",
    component: CaseStudiesStatsCard,
    props: "CaseStudiesStatsCardProps",
    exampleUsage: `<CaseStudiesStatsCard />`.trim(),
  },

  // Case Study Detail blocks
  "case-study-prose-sidebar": {
    id: "case-study-prose-sidebar",
    name: "Case Study Prose Sidebar",
    description:
      "A case study article layout with rich prose content and a sticky sidebar containing company information. Features a two-column design with the main article area on the left (including hero image, headings, paragraphs, blockquotes, lists, and tables using prose styling) and a sidebar on the right with company logo, description, industry, location, company size, website link, and topics. The sidebar uses an accent background with organized sections separated by borders. Ideal for detailed case study pages, customer success stories, or in-depth articles that need supplementary company context alongside the main narrative.",
    semanticTags: [
      "case-study",
      "detail",
      "prose",
      "sidebar",
      "article",
      "company-info",
      "success-story",
      "content",
      "two-column",
      "sticky",
    ],
    category: "case-study-detail",
    component: CaseStudyProseSidebar,
    props: "CaseStudyProseSidebarProps",
    exampleUsage: `<CaseStudyProseSidebar />`.trim(),
  },

  "case-study-toc-social-sidebar": {
    id: "case-study-toc-social-sidebar",
    name: "Case Study TOC Social Sidebar",
    description:
      "A comprehensive case study layout with breadcrumb navigation, featured author attribution, sticky sidebar with company details, table of contents navigation, and social sharing links. Features a three-column layout on large screens: left sidebar with company info (overview, sector, team size, location, established, funding, core features) and social links, center content area with problem/approach/outcomes summary followed by prose sections, and right sidebar with sticky table of contents that highlights active section via IntersectionObserver. The header includes breadcrumbs, large title, and author attribution with avatar. Ideal for in-depth case studies, customer success stories, or detailed articles that benefit from structured navigation and comprehensive company context.",
    semanticTags: [
      "case-study",
      "detail",
      "toc",
      "table-of-contents",
      "social",
      "sidebar",
      "breadcrumbs",
      "author",
      "navigation",
      "comprehensive",
      "three-column",
      "sticky",
    ],
    category: "case-study-detail",
    component: CaseStudyTocSocialSidebar,
    props: "CaseStudyTocSocialSidebarProps",
    exampleUsage: `<CaseStudyTocSocialSidebar />`.trim(),
  },

  "case-study-stats-metrics": {
    id: "case-study-stats-metrics",
    name: "Case Study Stats Metrics",
    description:
      "A results-focused case study layout with prominent performance metrics, breadcrumb navigation, prose content, and a sticky sidebar with company info and CTA. Features a two-column design with the main content area showing breadcrumbs, title, subtitle, hero image, a grid of 4 key statistics with large values and labels, and rich prose content (headings, paragraphs, blockquotes, lists, tables, alerts). The sticky sidebar displays company logo, overview text, sector information, a solution badge with icon, and a call-to-action button. Ideal for ROI-driven case studies that emphasize quantifiable outcomes, customer success stories with measurable impact, or results-focused content marketing.",
    semanticTags: [
      "case-study",
      "detail",
      "stats",
      "metrics",
      "results",
      "roi",
      "breadcrumbs",
      "sidebar",
      "cta",
      "quantifiable",
      "performance",
      "two-column",
    ],
    category: "case-study-detail",
    component: CaseStudyStatsMetrics,
    props: "CaseStudyStatsMetricsProps",
    exampleUsage: `<CaseStudyStatsMetrics />`.trim(),
  },

  // Comparison blocks
  "comparison-table-two-column": {
    id: "comparison-table-two-column",
    name: "Comparison Table Two Column",
    description:
      "A table-based comparison layout with two columns showing features side by side. Displays company logos at the top and feature rows below with the first column (Option A) highlighted in green tones indicating the preferred choice, while the second column (Option B) uses red tones. Rows can optionally display check/x icons for boolean comparisons. Best for product comparisons, service tier comparisons, competitor analysis, and feature-by-feature breakdowns where one option is clearly preferred.",
    semanticTags: [
      "comparison",
      "table",
      "two-column",
      "features",
      "product-comparison",
      "competitor",
      "side-by-side",
      "checklist",
      "pros-cons",
    ],
    category: "comparison",
    component: ComparisonTableTwoColumn,
    props: "ComparisonTableTwoColumnProps",
    exampleUsage: `<ComparisonTableTwoColumn
  title="Compare us with others."
  rows={[
    { label: "Onboarding", optionA: "1-2 days", optionB: "30 days" },
    { label: "Support", optionA: "24/7 dedicated team", optionB: "Limited hours", hasIcon: true }
  ]}
/>`.trim(),
  },

  "comparison-feature-cards": {
    id: "comparison-feature-cards",
    name: "Comparison Feature Cards",
    description:
      "Side-by-side feature comparison cards displaying two product/service options with feature checklists. The highlighted card uses a bordered, shadowed style while the other uses a muted background. Features show check icons for included items and strikethrough with minus icons for excluded items. Includes optional explanatory text sections below the cards for suitability and key differences. Best for product tier comparisons, subscription plan comparisons, competitor feature analysis, and service package breakdowns.",
    semanticTags: [
      "comparison",
      "cards",
      "features",
      "checklist",
      "product-tiers",
      "subscription",
      "pricing",
      "side-by-side",
      "included-excluded",
    ],
    category: "comparison",
    component: ComparisonFeatureCards,
    props: "ComparisonFeatureCardsProps",
    exampleUsage: `<ComparisonFeatureCards
  title="Product A vs. Product B: Making the Right Choice"
  productA={{ name: "Product A", features: [{ text: "Unlimited Users", included: true }] }}
  productB={{ name: "Product B", features: [{ text: "Unlimited Users", included: false }] }}
/>`.trim(),
  },

  "comparison-grid-badges": {
    id: "comparison-grid-badges",
    name: "Comparison Grid Badges",
    description:
      "Grid-based comparison layout with icons and badge-style value indicators. Displays features in a responsive grid with icons, descriptions, and two badges comparing options. Each feature card shows an icon, title, description, and badges with highlighted badges using a distinct color to indicate the preferred choice. Best for feature-rich product comparisons, technical specification comparisons, service tier breakdowns, and capability matrices.",
    semanticTags: [
      "comparison",
      "grid",
      "badges",
      "icons",
      "features",
      "technical",
      "specifications",
      "capabilities",
      "metrics",
    ],
    category: "comparison",
    component: ComparisonGridBadges,
    props: "ComparisonGridBadgesProps",
    exampleUsage: `<ComparisonGridBadges
  title="Feature Comparison"
  features={[
    { icon: "lucide/code-2", title: "Development Speed", description: "Time to production", optionAValue: "2-4 weeks", optionBValue: "3-6 months", optionAHighlight: true }
  ]}
/>`.trim(),
  },

  "comparison-metrics-rows": {
    id: "comparison-metrics-rows",
    name: "Comparison Metrics Rows",
    description:
      "Data-heavy comparison layout with quantitative metrics displayed in horizontal rows. Features large typography for values with supporting descriptions, optional units, and explanatory text. Each row compares two options with prominent numbers. Includes column headers, footnotes section, and a call-to-action button. Best for ROI comparisons, cost analysis, timeline comparisons, performance metrics, and quantitative feature breakdowns.",
    semanticTags: [
      "comparison",
      "metrics",
      "data",
      "numbers",
      "roi",
      "cost",
      "timeline",
      "performance",
      "quantitative",
      "statistics",
    ],
    category: "comparison",
    component: ComparisonMetricsRows,
    props: "ComparisonMetricsRowsProps",
    exampleUsage: `<ComparisonMetricsRows
  title="Compare Cloud vs On-site Infrastructure"
  metrics={[
    { title: "Initial Setup", optionA: { value: "6", unit: "mo", desc: "Enterprise timeline" }, optionB: { value: "2", unit: "wk", desc: "Rapid deployment" } }
  ]}
/>`.trim(),
  },

  "comparison-image-cards": {
    id: "comparison-image-cards",
    name: "Comparison Image Cards",
    description:
      "Two large image cards side by side with a centered 'OR' badge divider. Each card features a full-bleed background image with a gradient overlay at the bottom containing the title, description, and CTA button. Creates a visual choice between two distinct options. Best for service tier selection, build vs buy decisions, path selection, and two-option comparisons with strong visual differentiation.",
    semanticTags: [
      "comparison",
      "images",
      "cards",
      "visual",
      "choice",
      "options",
      "cta",
      "decision",
      "path-selection",
      "build-vs-buy",
    ],
    category: "comparison",
    component: ComparisonImageCards,
    props: "ComparisonImageCardsProps",
    exampleUsage: `<ComparisonImageCards
  title="Old vs New"
  optionA={{ image: "/option1.jpg", title: "Option 1", description: "Let our team handle everything", ctaText: "Get Started", ctaHref: "#" }}
  optionB={{ image: "/option2.jpg", title: "Option 2", description: "Take control yourself", ctaText: "Get Started", ctaHref: "#" }}
/>`.trim(),
  },

  "comparison-table-tabs": {
    id: "comparison-table-tabs",
    name: "Comparison Table Tabs",
    description:
      "Feature comparison table with multiple options using tabs on mobile and full columns on desktop. Each cell includes a status indicator (positive/negative/neutral) with corresponding colored icons and backgrounds. Uses green for positive, red for negative, and amber for neutral states. Best for multi-option technical comparisons, storage solutions, hosting options, and service tier comparisons with detailed attributes.",
    semanticTags: [
      "comparison",
      "table",
      "tabs",
      "mobile",
      "responsive",
      "status",
      "indicators",
      "technical",
      "multi-option",
      "storage",
      "hosting",
    ],
    category: "comparison",
    component: ComparisonTableTabs,
    props: "ComparisonTableTabsProps",
    exampleUsage: `<ComparisonTableTabs
  features={["Initial cost", "Scalability", "Performance"]}
  models={[
    { name: "SSD", attributes: [{ value: "Medium to high", status: "negative" }, { value: "Limited", status: "neutral" }, { value: "Very fast", status: "positive" }] }
  ]}
/>`.trim(),
  },

  "comparison-table-tooltips": {
    id: "comparison-table-tooltips",
    name: "Comparison Table Tooltips",
    description:
      "Two-column comparison table with the preferred option highlighted using a muted background. Some cells can include tooltips that reveal additional context on hover. Clean, minimal design with clear visual hierarchy. Best for framework comparisons, technology stack comparisons, and detailed feature matrices where some items need additional explanation.",
    semanticTags: [
      "comparison",
      "table",
      "tooltips",
      "hover",
      "framework",
      "technology",
      "features",
      "detailed",
      "context",
      "explanation",
    ],
    category: "comparison",
    component: ComparisonTableTooltips,
    props: "ComparisonTableTooltipsProps",
    exampleUsage: `<ComparisonTableTooltips
  title="Compare Us"
  rows={[
    { feature: "Dark Mode", optionA: "Built-in", optionB: "Requires extra setup" },
    { feature: "Premium Components", optionA: "Available", optionB: { value: "Not included", tooltip: { title: "Premium Only", content: "Some components require paid versions." } } }
  ]}
/>`.trim(),
  },

  "comparison-feature-grid": {
    id: "comparison-feature-grid",
    name: "Comparison Feature Grid",
    description:
      "Features displayed in a responsive list format with icons, labels, descriptions, and check/x indicators for each option. Each row shows the feature icon on the left, feature details in the middle, and status indicators on the right. Supports true/false/partial states with corresponding visual indicators (green check, red x, yellow check for partial). Best for framework comparisons, library comparisons, detailed feature matrices, and technology stack evaluations.",
    semanticTags: [
      "comparison",
      "grid",
      "features",
      "icons",
      "checklist",
      "framework",
      "library",
      "technology",
      "evaluation",
      "partial-support",
    ],
    category: "comparison",
    component: ComparisonFeatureGrid,
    props: "ComparisonFeatureGridProps",
    exampleUsage: `<ComparisonFeatureGrid
  title="Compare Us"
  features={[
    { icon: "lucide/moon", label: "Dark Mode", description: "Built-in dark mode support", optionA: true, optionB: false },
    { icon: "lucide/type", label: "TypeScript", description: "TypeScript support level", optionA: true, optionB: "partial" }
  ]}
/>`.trim(),
  },

  "comparison-ai-models": {
    id: "comparison-ai-models",
    name: "Comparison AI Models",
    description:
      "Detailed comparison table for AI models with interactive hover effects. Each column represents a model with its icon, and cells are color-coded based on performance (best/worst/neutral) using green, red, and muted colors. Includes a technical analysis section below that highlights on hover. Designed for comparing LLM capabilities, pricing, and performance metrics. Best for AI/ML model comparisons, API pricing comparisons, technical specification matrices, and performance benchmarks.",
    semanticTags: [
      "comparison",
      "ai",
      "models",
      "llm",
      "machine-learning",
      "api",
      "pricing",
      "performance",
      "benchmarks",
      "technical",
      "hover-effects",
    ],
    category: "comparison",
    component: ComparisonAiModels,
    props: "ComparisonAiModelsProps",
    exampleUsage: `<ComparisonAiModels
  models={{
    modelA: { name: "GPT-4o", icon: "/openai.svg", summary: ["Fast response times"], hoverColor: "red" },
    modelB: { name: "Claude 3.5", icon: "/claude.svg", summary: ["Best reasoning"], hoverColor: "blue" }
  }}
/>`.trim(),
  },

  "comparison-legacy-modern": {
    id: "comparison-legacy-modern",
    name: "Comparison Legacy Modern",
    description:
      "Two-column comparison between legacy/old approaches and modern/new solutions. The legacy column uses muted styling with X icons for pain points, while the modern column uses a bordered card with emoji indicators for benefits. Features are separated by dividers for clear visual hierarchy. Best for digital transformation messaging, product modernization pitches, before/after comparisons, migration benefits, and upgrade justifications.",
    semanticTags: [
      "comparison",
      "legacy",
      "modern",
      "transformation",
      "migration",
      "upgrade",
      "before-after",
      "old-vs-new",
      "benefits",
      "pain-points",
    ],
    category: "comparison",
    component: ComparisonLegacyModern,
    props: "ComparisonLegacyModernProps",
    exampleUsage: `<ComparisonLegacyModern
  title="Why Teams are"
  titleHighlight="Moving to Modern Tools"
  legacyFeatures={[{ text: "One-size-fits-all project tools" }]}
  modernFeatures={[{ emoji: "🧭", text: "Built for modern product teams" }]}
/>`.trim(),
  },

  // Navbar components
  "navbar-dropdown-menu": {
    id: "navbar-dropdown-menu",
    name: "Navbar Dropdown Menu",
    description:
      "A responsive navigation bar with dropdown menus for desktop and a slide-out sheet menu for mobile. Features logo, navigation links with dropdown submenus containing icons and descriptions, and call-to-action buttons. The desktop view shows horizontal navigation with hover-triggered dropdowns, while mobile uses a hamburger menu that opens a full sheet with accordion-style navigation. Ideal for marketing sites, SaaS applications, and corporate websites that need organized multi-level navigation.",
    semanticTags: [
      "navbar",
      "navigation",
      "header",
      "dropdown",
      "menu",
      "responsive",
      "mobile-menu",
      "sheet",
      "accordion",
      "cta-buttons",
    ],
    category: "navbar",
    component: NavbarDropdownMenu,
    props: "NavbarDropdownMenuProps",
    exampleUsage: `<NavbarDropdownMenu
  logo={{ src: "/logo.svg", alt: "Company" }}
  menuItems={[
    { label: "Products", href: "#", subMenuItems: [{ label: "Analytics", href: "/analytics", icon: "lucide/bar-chart", description: "Track metrics" }] }
  ]}
  ctaButton={{ label: "Get Started", href: "/signup" }}
/>`.trim(),
  },

  "navbar-centered-menu": {
    id: "navbar-centered-menu",
    name: "Navbar Centered Menu",
    description:
      "A navigation bar with centered navigation links and dropdown menus that appear directly below each trigger. Features logo on the left, centered navigation with dropdowns, and CTA buttons on the right. Uses a custom NavigationMenu implementation that centers dropdown content below each menu item rather than spanning the full width. Mobile view uses a sheet with accordion navigation. Perfect for brands that want a balanced, symmetrical header layout.",
    semanticTags: [
      "navbar",
      "navigation",
      "header",
      "centered",
      "dropdown",
      "balanced",
      "symmetrical",
      "responsive",
      "mobile-menu",
    ],
    category: "navbar",
    component: NavbarCenteredMenu,
    props: "NavbarCenteredMenuProps",
    exampleUsage: `<NavbarCenteredMenu
  logo={{ src: "/logo.svg", alt: "Company" }}
  menuItems={[
    { label: "Features", href: "#", subMenuItems: [{ label: "Dashboard", href: "/dashboard", icon: "lucide/layout-dashboard" }] }
  ]}
/>`.trim(),
  },

  "navbar-mega-menu": {
    id: "navbar-mega-menu",
    name: "Navbar Mega Menu",
    description:
      "A comprehensive navigation bar with multiple mega-menu panels for complex site structures. Features distinct mega-menu styles for Platform (with product features), Use Cases (with industry solutions), Developers (with documentation and resources), and Resources (with company info). Each mega-menu panel spans the full viewport width with organized content sections, featured cards, and quick links. Mobile view uses a multi-level navigation with back buttons for drilling into sections. Ideal for enterprise SaaS, developer platforms, and large-scale websites with extensive navigation needs.",
    semanticTags: [
      "navbar",
      "navigation",
      "mega-menu",
      "enterprise",
      "multi-level",
      "platform",
      "developers",
      "resources",
      "full-width",
      "complex-navigation",
    ],
    category: "navbar",
    component: NavbarMegaMenu,
    props: "NavbarMegaMenuProps",
    exampleUsage: `<NavbarMegaMenu
  logo={{ src: "/logo.svg", alt: "Company" }}
  menuLinks={[
    {
      title: "Platform",
      dropdownItems: [
        { title: "Analytics", href: "/analytics", icon: "lucide/bar-chart", description: "Track your metrics" },
        { title: "Automation", href: "/automation", icon: "lucide/workflow", description: "Automate workflows" }
      ]
    },
    {
      title: "Resources",
      dropdownItems: [
        { title: "Blog", href: "/blog", icon: "lucide/newspaper", description: "Latest updates" },
        { title: "Guides", href: "/guides", icon: "lucide/book-open", description: "How-tos and playbooks" }
      ]
    },
    { title: "Pricing", href: "/pricing" }
  ]}
  actions={[
    { label: "Sign in", href: "/login", variant: "ghost" },
    { label: "Get started", href: "/signup", variant: "default" }
  ]}
/>`.trim(),
  },

  "navbar-enterprise-mega": {
    id: "navbar-enterprise-mega",
    name: "Navbar Enterprise Mega Menu",
    description:
      "A comprehensive enterprise-grade navigation bar with five distinct mega-menu styles. Features Solutions menu with bordered cards containing subpages and developer platform section, Products menu with featured image card and categorized listings, Global menu with enterprise features and regional location selectors, Partners menu with large promotional cards and partner type listings, and Resources menu with topic groups and resource cards. Each menu spans full width with rich content layouts. Mobile view uses full-screen sheet with accordion navigation. Ideal for large enterprise SaaS platforms, B2B software companies, and global organizations with complex product offerings.",
    semanticTags: [
      "navbar",
      "navigation",
      "enterprise",
      "mega-menu",
      "solutions",
      "products",
      "global",
      "partners",
      "resources",
      "b2b",
      "corporate",
    ],
    category: "navbar",
    component: NavbarEnterpriseMega,
    props: "NavbarEnterpriseMegaProps",
    exampleUsage: `<NavbarEnterpriseMega
  logo={{ src: "/logo.svg", alt: "Enterprise" }}
  solutionsItems={[{ label: "Analytics Suite", href: "/analytics", subPages: [{ label: "Dashboards", href: "/dashboards" }] }]}
  productsItems={[{ label: "Platform", href: "/platform", icon: "lucide/layers" }]}
  globalItems={[{ label: "Enterprise", href: "/enterprise", icon: "lucide/building" }]}
/>`.trim(),
  },

  "navbar-feature-grid": {
    id: "navbar-feature-grid",
    name: "Navbar Feature Grid",
    description:
      "A navigation bar with a two-column feature grid dropdown menu. The dropdown displays navigation items in a clean grid layout with icons, titles, and descriptions. Features logo, main navigation links, feature grid dropdown, and CTA buttons. Desktop view shows the grid dropdown on hover, while mobile uses a sheet with accordion navigation. Perfect for showcasing product features, tools, or services in an organized grid format within the navigation.",
    semanticTags: [
      "navbar",
      "navigation",
      "feature-grid",
      "grid-layout",
      "dropdown",
      "icons",
      "descriptions",
      "product-features",
      "tools",
    ],
    category: "navbar",
    component: NavbarFeatureGrid,
    props: "NavbarFeatureGridProps",
    exampleUsage: `<NavbarFeatureGrid
  logo={{ src: "/logo.svg", alt: "Company" }}
  features={[
    { label: "Dashboard", href: "/dashboard", icon: "lucide/layout-dashboard", description: "View your analytics" },
    { label: "Settings", href: "/settings", icon: "lucide/settings", description: "Configure your account" }
  ]}
/>`.trim(),
  },

  "navbar-floating-pill": {
    id: "navbar-floating-pill",
    name: "Navbar Floating Pill",
    description:
      "A modern floating navigation bar with pill-shaped design and glassmorphism effect. Positioned absolutely at the top of the page with rounded-full border, backdrop blur, and subtle shadow. Features smooth dropdown animations and a collapsible mobile menu with custom hamburger animation that transforms into an X. The floating design creates a premium, modern aesthetic that works well over hero sections and images. Ideal for creative agencies, portfolios, modern SaaS landing pages, and design-focused websites.",
    semanticTags: [
      "navbar",
      "navigation",
      "floating",
      "pill",
      "glassmorphism",
      "backdrop-blur",
      "modern",
      "premium",
      "creative",
      "animated-hamburger",
    ],
    category: "navbar",
    component: NavbarFloatingPill,
    props: "NavbarFloatingPillProps",
    exampleUsage: `<NavbarFloatingPill
  logo={{ src: "/logo.svg", alt: "Company" }}
  menuItems={[
    { label: "Products", href: "#", subMenuItems: [{ label: "Features", href: "/features" }] }
  ]}
  ctaButton={{ label: "Get Started", href: "/signup" }}
/>`.trim(),
  },

  "navbar-platform-resources": {
    id: "navbar-platform-resources",
    name: "Navbar Platform Resources",
    description:
      "A navigation bar with comprehensive platform and resources mega-menus. Features two main dropdowns: Platform menu with solutions grid and use cases section, and Resources menu with a three-column grid of resource links. Includes solution cards with icons and descriptions, use case items, and categorized resource links. Mobile view uses full-screen overlay with accordion navigation. Perfect for SaaS platforms, developer tools, and technology companies that need to showcase both product capabilities and educational resources.",
    semanticTags: [
      "navbar",
      "navigation",
      "platform",
      "resources",
      "mega-menu",
      "solutions",
      "use-cases",
      "documentation",
      "saas",
      "developer-tools",
    ],
    category: "navbar",
    component: NavbarPlatformResources,
    props: "NavbarPlatformResourcesProps",
    exampleUsage: `<NavbarPlatformResources
  logo={{ src: "/logo.svg", alt: "Platform" }}
  menuLinks={[
    {
      title: "Platform",
      dropdownItems: [
        { title: "Analytics", href: "/analytics", icon: "lucide/bar-chart", description: "Track metrics" },
        { title: "Automation", href: "/automation", icon: "lucide/workflow", description: "Automate workflows" }
      ]
    },
    {
      title: "Resources",
      dropdownItems: [
        { title: "Documentation", href: "/docs", icon: "lucide/book" },
        { title: "Guides", href: "/guides", icon: "lucide/book-open", description: "Best practices" }
      ]
    },
    { title: "Pricing", href: "/pricing" }
  ]}
  actions={[
    { label: "Sign in", href: "/login", variant: "ghost" },
    { label: "Get started", href: "/signup", variant: "default" }
  ]}
/>`.trim(),
  },

  "navbar-image-preview": {
    id: "navbar-image-preview",
    name: "Navbar Image Preview",
    description:
      "A fixed navigation bar with image preview functionality in dropdown menus. The navigation bar changes background on scroll for better visibility. Desktop dropdowns display a large image preview that dynamically changes when hovering over different menu items, creating an engaging visual experience. Mobile view uses a full-screen dark overlay with categorized link columns and social links at the bottom. Ideal for creative agencies, portfolios, e-commerce sites, and brands that want to showcase visual content directly in their navigation.",
    semanticTags: [
      "navbar",
      "navigation",
      "image-preview",
      "hover-preview",
      "visual",
      "creative",
      "portfolio",
      "e-commerce",
      "fixed",
      "scroll-aware",
    ],
    category: "navbar",
    component: NavbarImagePreview,
    props: "NavbarImagePreviewProps",
    exampleUsage: `<NavbarImagePreview
  logo={{ src: "/logo.svg", alt: "Company" }}
  menuItems={[
    { label: "Products", href: "#", image: "/product-preview.jpg", subMenuItems: [{ label: "New Arrivals", href: "/new", image: "/new-arrivals.jpg" }] }
  ]}
/>`.trim(),
  },

  "navbar-dark-icons": {
    id: "navbar-dark-icons",
    name: "Navbar Dark Icons",
    description:
      "A dark-themed navigation bar with colorful icon indicators in dropdown menus. Features a dark background with dropdown menus containing items with colorful icon backgrounds that provide visual categorization. Includes a GitHub stars counter button and primary CTA. Mobile view uses a full-screen dark sheet with accordion navigation. Perfect for developer tools, open-source projects, tech startups, and products that want a modern dark aesthetic with visual hierarchy through color-coded icons.",
    semanticTags: [
      "navbar",
      "navigation",
      "dark-theme",
      "colorful-icons",
      "github-stars",
      "developer-tools",
      "open-source",
      "tech",
      "modern",
      "icon-indicators",
    ],
    category: "navbar",
    component: NavbarDarkIcons,
    props: "NavbarDarkIconsProps",
    exampleUsage: `<NavbarDarkIcons
  logo={{ src: "/logo.svg", alt: "DevTool" }}
  githubStars={1234}
  menuItems={[
    { label: "Features", href: "#", subMenuItems: [{ label: "Analytics", href: "/analytics", icon: "lucide/bar-chart", iconColor: "blue" }] }
  ]}
/>`.trim(),
  },

  "navbar-animated-preview": {
    id: "navbar-animated-preview",
    name: "Navbar Animated Preview",
    description:
      "A navigation bar with animated image previews and multiple distinct dropdown styles. Features three dropdown menu types: Products menu with animated image preview that transitions smoothly between items, Solutions menu with featured cards and organized grid layout, and Developers menu with grouped links and featured image section. Navigation menu spans full width with smooth fade-in animations. Mobile view uses full-screen sheet with accordion navigation. Ideal for SaaS products, technology platforms, and companies that want engaging, animated navigation experiences.",
    semanticTags: [
      "navbar",
      "navigation",
      "animated",
      "image-preview",
      "transitions",
      "products",
      "solutions",
      "developers",
      "full-width",
      "engaging",
    ],
    category: "navbar",
    component: NavbarAnimatedPreview,
    props: "NavbarAnimatedPreviewProps",
    exampleUsage: `<NavbarAnimatedPreview
  logo={{ src: "/logo.svg", alt: "Company" }}
  products={[{ label: "Analytics", href: "/analytics", image: "/analytics-preview.jpg", description: "Track your metrics" }]}
  solutions={[{ label: "Enterprise", href: "/enterprise", icon: "lucide/building" }]}
  developers={[{ label: "Documentation", href: "/docs", icon: "lucide/book" }]}
/>`.trim(),
  },

  "navbar-multi-column-groups": {
    id: "navbar-multi-column-groups",
    name: "Navbar Multi-Column Groups",
    description:
      "A navigation bar with multi-column grouped dropdown menus. Dropdown menus organize links into multiple columns by category, with each column having a group title and list of links with icons and descriptions. The dropdown width dynamically adjusts based on the number of groups for optimal layout. Mobile view uses a dark-themed full-screen sheet with accordion navigation and CTA buttons prominently displayed at the top. Perfect for large websites with many navigation categories, enterprise software, and platforms with extensive feature sets.",
    semanticTags: [
      "navbar",
      "navigation",
      "multi-column",
      "grouped",
      "categories",
      "organized",
      "enterprise",
      "extensive",
      "dynamic-width",
      "dark-mobile",
    ],
    category: "navbar",
    component: NavbarMultiColumnGroups,
    props: "NavbarMultiColumnGroupsProps",
    exampleUsage: `<NavbarMultiColumnGroups
  logo={{ src: "/logo.svg", alt: "Enterprise" }}
  menuItems={[
    { label: "Products", href: "#", groups: [
      { title: "Analytics", items: [{ label: "Dashboard", href: "/dashboard", icon: "lucide/layout-dashboard" }] }
    ]}
  ]}
/>`.trim(),
  },

  "navbar-sidebar-mobile": {
    id: "navbar-sidebar-mobile",
    name: "Navbar Sidebar Mobile",
    description:
      "A navigation bar with a slide-out sidebar for mobile devices. Features standard horizontal navigation menu on desktop with dropdown menus containing icons, titles, and descriptions. Mobile view uses a slide-out sidebar from the left with accordion navigation and additional footer links. The sidebar includes a header with logo and close button, providing an app-like mobile navigation experience. Ideal for applications, dashboards, and websites that want a more immersive mobile navigation pattern.",
    semanticTags: [
      "navbar",
      "navigation",
      "sidebar",
      "slide-out",
      "mobile",
      "app-like",
      "accordion",
      "dashboard",
      "application",
      "immersive",
    ],
    category: "navbar",
    component: NavbarSidebarMobile,
    props: "NavbarSidebarMobileProps",
    exampleUsage: `<NavbarSidebarMobile
  logo={{ src: "/logo.svg", alt: "App" }}
  menuItems={[
    { label: "Dashboard", href: "/dashboard", icon: "lucide/layout-dashboard" },
    { label: "Features", href: "#", subMenuItems: [{ label: "Analytics", href: "/analytics", icon: "lucide/bar-chart" }] }
  ]}
  footerLinks={[{ label: "Help Center", href: "/help" }]}
/>`.trim(),
  },

  "navbar-transparent-overlay": {
    id: "navbar-transparent-overlay",
    name: "Navbar Transparent Overlay",
    description:
      "A transparent navigation bar that transitions to solid on scroll. Logo and navigation links are visible against hero images or video backgrounds with appropriate contrast. Mobile view uses a full-screen overlay menu with large, centered navigation links that animate in with a staggered effect. The hamburger menu icon transforms into an X when open. Perfect for landing pages, portfolios, creative websites, and any page with prominent hero sections where the navbar should blend with the background initially.",
    semanticTags: [
      "navbar",
      "navigation",
      "transparent",
      "overlay",
      "scroll-transition",
      "hero",
      "landing-page",
      "portfolio",
      "creative",
      "staggered-animation",
    ],
    category: "navbar",
    component: NavbarTransparentOverlay,
    props: "NavbarTransparentOverlayProps",
    exampleUsage: `<NavbarTransparentOverlay
  logo={{ src: "/logo-white.svg", alt: "Company" }}
  menuItems={[
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Contact", href: "/contact" }
  ]}
/>`.trim(),
  },

  "navbar-education-platform": {
    id: "navbar-education-platform",
    name: "Navbar Education Platform",
    description:
      "A navigation bar designed for education and LMS platforms. Features two main dropdown menus: Products menu with tools and quick start sections including a featured image card for latest updates, and Support menu with guides and about us sections. Each menu item displays an icon, title, and description with hover animations. Mobile view uses accordion navigation with categorized sections. Ideal for online learning platforms, educational institutions, course marketplaces, and knowledge management systems.",
    semanticTags: [
      "navbar",
      "navigation",
      "education",
      "lms",
      "learning",
      "courses",
      "support",
      "documentation",
      "knowledge-base",
      "e-learning",
    ],
    category: "navbar",
    component: NavbarEducationPlatform,
    props: "NavbarEducationPlatformProps",
    exampleUsage: `<NavbarEducationPlatform
  logo={{ src: "/logo.svg", alt: "EduPlatform" }}
  products={[{ label: "Courses", href: "/courses", icon: "lucide/book-open", description: "Browse all courses" }]}
  support={[{ label: "Help Center", href: "/help", icon: "lucide/help-circle", description: "Get assistance" }]}
  featuredUpdate={{ title: "New Feature", description: "Check out our latest tools", image: "/feature.jpg", href: "/updates" }}
/>`.trim(),
  },

  "navbar-sticky-compact": {
    id: "navbar-sticky-compact",
    name: "Navbar Sticky Compact",
    description:
      "A compact sticky navigation bar that shrinks on scroll to maximize content space. The logo shrinks and padding reduces as the user scrolls down, maintaining navigation accessibility while giving more room to content. Desktop view shows dropdown menus with icons, while mobile view uses a slide-out sheet from the right. The smooth transition between normal and compact states provides a polished user experience. Ideal for content-heavy sites, blogs, documentation, and any website where vertical space is valuable.",
    semanticTags: [
      "navbar",
      "navigation",
      "sticky",
      "compact",
      "shrink-on-scroll",
      "space-efficient",
      "content-heavy",
      "blog",
      "documentation",
      "smooth-transition",
    ],
    category: "navbar",
    component: NavbarStickyCompact,
    props: "NavbarStickyCompactProps",
    exampleUsage: `<NavbarStickyCompact
  logo={{ src: "/logo.svg", alt: "Blog" }}
  menuItems={[
    { label: "Articles", href: "/articles" },
    { label: "Categories", href: "#", subMenuItems: [{ label: "Technology", href: "/tech", icon: "lucide/cpu" }] }
  ]}
/>`.trim(),
  },

  "navbar-search-focused": {
    id: "navbar-search-focused",
    name: "Navbar Search Focused",
    description:
      "A navigation bar with a prominent search input as the primary action. Features a centered search bar that takes up significant horizontal space, making search the most visible and accessible action. Navigation links are positioned to the sides of the search bar. The search input expands on focus for better usability. Mobile view moves the search bar below the logo and hamburger menu, with navigation in a slide-out sheet. Ideal for e-commerce sites, marketplaces, documentation sites, and content-heavy platforms where search is the primary user action.",
    semanticTags: [
      "navbar",
      "navigation",
      "search",
      "search-focused",
      "e-commerce",
      "marketplace",
      "documentation",
      "content-platform",
      "prominent-search",
      "expandable",
    ],
    category: "navbar",
    component: NavbarSearchFocused,
    props: "NavbarSearchFocusedProps",
    exampleUsage: `<NavbarSearchFocused
  logo={{ src: "/logo.svg", alt: "Store" }}
  searchPlaceholder="Search products..."
  onSearch={(query) => console.log(query)}
  menuItems={[
    { label: "Categories", href: "/categories" },
    { label: "Deals", href: "/deals" }
  ]}
/>`.trim(),
  },

  "navbar-simple-links": {
    id: "navbar-simple-links",
    name: "Navbar Simple Links",
    description:
      "A clean, minimal navigation bar with animated active indicator. Features horizontal navigation links with an animated underline indicator that slides smoothly to show the currently active item. The simple design focuses on essential navigation without dropdowns or complex menus. Desktop view shows all links inline with the sliding indicator, while mobile uses a popover menu with a left border indicator for the active item. Perfect for simple marketing sites, portfolios, personal websites, and landing pages that need straightforward navigation.",
    semanticTags: [
      "navbar",
      "navigation",
      "simple",
      "minimal",
      "animated-indicator",
      "underline",
      "clean",
      "portfolio",
      "landing-page",
      "straightforward",
    ],
    category: "navbar",
    component: NavbarSimpleLinks,
    props: "NavbarSimpleLinksProps",
    exampleUsage: `<NavbarSimpleLinks
  logo={{ src: "/logo.svg", alt: "Portfolio" }}
  menuItems={[
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Contact", href: "/contact" }
  ]}
  activeItem="Home"
/>`.trim(),
  },

  "navbar-split-cta": {
    id: "navbar-split-cta",
    name: "Navbar Split CTA",
    description:
      "A navigation bar with split primary and secondary call-to-action buttons. Features a balanced layout with navigation links on the left and two distinct CTA buttons on the right: a secondary outline button and a primary filled button. Dropdown menus display items with icons and descriptions in a clean list format. Mobile view uses a slide-out sheet with CTAs prominently displayed at the top. Ideal for SaaS products and services that want to emphasize both login/signup actions or demo/trial options simultaneously.",
    semanticTags: [
      "navbar",
      "navigation",
      "split-cta",
      "dual-buttons",
      "login-signup",
      "demo-trial",
      "saas",
      "conversion",
      "balanced-layout",
      "prominent-cta",
    ],
    category: "navbar",
    component: NavbarSplitCta,
    props: "NavbarSplitCtaProps",
    exampleUsage: `<NavbarSplitCta
  logo={{ src: "/logo.svg", alt: "SaaS" }}
  menuItems={[
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" }
  ]}
  secondaryCta={{ label: "Log In", href: "/login" }}
  primaryCta={{ label: "Start Free Trial", href: "/signup" }}
/>`.trim(),
  },

  "navbar-icon-links": {
    id: "navbar-icon-links",
    name: "Navbar Icon Links",
    description:
      "A compact navigation bar with icon-only links and tooltips. Features a minimalist design with icon-only navigation links that display tooltips on hover to reveal the link label. This approach maximizes horizontal space while maintaining accessibility through tooltips. The active state is indicated by a highlighted background. Mobile view uses a slide-out sheet with full text labels. Ideal for dashboards, admin panels, applications, and interfaces where users are familiar with the navigation structure and icon meanings.",
    semanticTags: [
      "navbar",
      "navigation",
      "icon-only",
      "tooltips",
      "compact",
      "minimalist",
      "dashboard",
      "admin-panel",
      "application",
      "space-efficient",
    ],
    category: "navbar",
    component: NavbarIconLinks,
    props: "NavbarIconLinksProps",
    exampleUsage: `<NavbarIconLinks
  logo={{ src: "/logo.svg", alt: "Dashboard" }}
  menuItems={[
    { label: "Dashboard", href: "/dashboard", icon: "lucide/layout-dashboard" },
    { label: "Analytics", href: "/analytics", icon: "lucide/bar-chart" },
    { label: "Settings", href: "/settings", icon: "lucide/settings" }
  ]}
  activeItem="Dashboard"
/>`.trim(),
  },

  "navbar-tabbed-sections": {
    id: "navbar-tabbed-sections",
    name: "Navbar Tabbed Sections",
    description:
      "A navigation bar with tabbed dropdown menus for organized content. Features dropdown menus that use tabs to organize content into distinct sections. Each tab displays a list of links with icons and descriptions, and optionally a featured content card with an image. Tabs allow users to quickly switch between different categories within the same dropdown without closing it. Mobile view uses a slide-out sheet with expandable sections. Ideal for products with many features organized into logical categories, enterprise software, and platforms with diverse offerings.",
    semanticTags: [
      "navbar",
      "navigation",
      "tabbed",
      "organized",
      "categories",
      "featured-content",
      "enterprise",
      "diverse-offerings",
      "multi-section",
      "switchable",
    ],
    category: "navbar",
    component: NavbarTabbedSections,
    props: "NavbarTabbedSectionsProps",
    exampleUsage: `<NavbarTabbedSections
  logo={{ src: "/logo.svg", alt: "Platform" }}
  menuItems={[
    { label: "Products", href: "#", tabs: [
      { label: "Analytics", items: [{ label: "Dashboard", href: "/dashboard", icon: "lucide/layout-dashboard" }] },
      { label: "Marketing", items: [{ label: "Campaigns", href: "/campaigns", icon: "lucide/megaphone" }] }
    ]}
  ]}
/>`.trim(),
  },

  "navbar-fullscreen-menu": {
    id: "navbar-fullscreen-menu",
    name: "Navbar Fullscreen Menu",
    description:
      "A dramatic navigation bar with fullscreen overlay navigation. Features a minimal header with logo and MENU/CLOSE text toggle. When activated, a fullscreen overlay appears with large, centered menu items that animate in with blur effects on hover. Social links appear at the bottom with staggered animations. The theatrical presentation creates a memorable navigation experience. Perfect for creative agencies, portfolios, artistic websites, fashion brands, and any site that wants to make a bold visual statement with their navigation.",
    semanticTags: [
      "navbar",
      "navigation",
      "fullscreen",
      "overlay",
      "dramatic",
      "creative",
      "portfolio",
      "artistic",
      "fashion",
      "theatrical",
      "animated",
    ],
    category: "navbar",
    component: NavbarFullscreenMenu,
    props: "NavbarFullscreenMenuProps",
    exampleUsage: `<NavbarFullscreenMenu
  logo={{ src: "/logo.svg", alt: "Agency" }}
  menuItems={[
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" }
  ]}
  socialLinks={[
    { label: "Instagram", href: "https://instagram.com", icon: "lucide/instagram" },
    { label: "Twitter", href: "https://twitter.com", icon: "lucide/twitter" }
  ]}
/>`.trim(),
  },

  // Logos components
  "logos-inline-tagline": {
    id: "logos-inline-tagline",
    name: "Logos Inline Tagline",
    description:
      "A simple horizontal logo strip with a tagline on the left and partner logos on the right. Features grayscale logos with hover effects and responsive flex-wrap layout. Ideal for displaying trusted partners or clients in a compact, professional format at the top or bottom of landing pages.",
    semanticTags: [
      "logos",
      "partners",
      "clients",
      "trust",
      "social-proof",
      "horizontal",
      "inline",
      "tagline",
      "compact",
      "grayscale",
    ],
    category: "logos",
    component: LogosInlineTagline,
    props: "LogosInlineTaglineProps",
    exampleUsage: `<LogosInlineTagline
  tagline="Used by the world's leading companies"
  partners={[
    { name: "Company 1", logo: "/logos/company1.svg" },
    { name: "Company 2", logo: "/logos/company2.svg" }
  ]}
/>`.trim(),
  },

  "logos-certifications-grid": {
    id: "logos-certifications-grid",
    name: "Logos Certifications Grid",
    description:
      "A split-layout section with text content and CTA on the left, and a 3-column grid of certification/partner logos on the right. Features bordered container with responsive grid layout. Perfect for showcasing certifications, compliance badges, or partner endorsements alongside a compelling call-to-action.",
    semanticTags: [
      "logos",
      "certifications",
      "compliance",
      "badges",
      "grid",
      "split-layout",
      "cta",
      "trust",
      "endorsements",
      "bordered",
    ],
    category: "logos",
    component: LogosCertificationsGrid,
    props: "LogosCertificationsGridProps",
    exampleUsage: `<LogosCertificationsGrid
  title="Our certifications say it all."
  description="Industry-leading compliance and security standards."
  buttonText="Get in touch"
  buttonUrl="/contact"
  logos={[
    { id: "cert-1", description: "ISO 27001", image: "/certs/iso.svg" },
    { id: "cert-2", description: "SOC 2", image: "/certs/soc2.svg" }
  ]}
/>`.trim(),
  },

  "logos-carousel-heading": {
    id: "logos-carousel-heading",
    name: "Logos Carousel Heading",
    description:
      "An auto-scrolling logo carousel with a centered heading above. Features smooth infinite scroll animation using Embla Carousel with gradient fade overlays on both sides. Ideal for hero sections or trust indicators where you want to showcase many partners in a dynamic, attention-grabbing format.",
    semanticTags: [
      "logos",
      "carousel",
      "auto-scroll",
      "infinite",
      "animated",
      "heading",
      "partners",
      "trust",
      "hero",
      "gradient-fade",
    ],
    category: "logos",
    component: LogosCarouselHeading,
    props: "LogosCarouselHeadingProps",
    exampleUsage: `<LogosCarouselHeading
  heading="Trusted by these companies"
  logos={[
    { id: "logo-1", description: "Company 1", image: "/logos/company1.svg" },
    { id: "logo-2", description: "Company 2", image: "/logos/company2.svg" }
  ]}
/>`.trim(),
  },

  "logos-partner-network": {
    id: "logos-partner-network",
    name: "Logos Partner Network",
    description:
      "A centered partner showcase with badge, title, description, and CTA button above a responsive logo grid. Features grayscale-to-color hover effects and clean 4-column layout. Perfect for partner program pages or sections highlighting business relationships with a clear call-to-action for potential partners.",
    semanticTags: [
      "logos",
      "partners",
      "network",
      "badge",
      "cta",
      "grid",
      "hover-effects",
      "grayscale",
      "centered",
      "program",
    ],
    category: "logos",
    component: LogosPartnerNetwork,
    props: "LogosPartnerNetworkProps",
    exampleUsage: `<LogosPartnerNetwork
  badge="Partner Network"
  title="Trusted by industry leaders"
  description="Join thousands of companies that trust our platform."
  buttonText="Become a partner"
  buttonUrl="/partners"
  logos={[
    { name: "Partner 1", logo: "/logos/partner1.svg" },
    { name: "Partner 2", logo: "/logos/partner2.svg" }
  ]}
/>`.trim(),
  },

  "logos-two-row-grid": {
    id: "logos-two-row-grid",
    name: "Logos Two Row Grid",
    description:
      "A two-row logo display with clickable company logos arranged in centered rows. Features grayscale-to-color hover transitions and optional link support for each logo. Ideal for showcasing a larger number of partners or clients in an organized, balanced layout with interactive elements.",
    semanticTags: [
      "logos",
      "two-row",
      "grid",
      "clickable",
      "links",
      "partners",
      "clients",
      "hover",
      "grayscale",
      "balanced",
    ],
    category: "logos",
    component: LogosTwoRowGrid,
    props: "LogosTwoRowGridProps",
    exampleUsage: `<LogosTwoRowGrid
  heading="Trusted by leading companies worldwide"
  companies={[
    { name: "Company 1", logo: "/logos/company1.svg", url: "https://company1.com" },
    { name: "Company 2", logo: "/logos/company2.svg", url: "https://company2.com" }
  ]}
/>`.trim(),
  },

  "logos-marquee-muted": {
    id: "logos-marquee-muted",
    name: "Logos Marquee Muted",
    description:
      "A continuous marquee-style logo carousel on a muted background. Features subtle grayscale logos with smooth infinite scroll animation and gradient fade overlays. Perfect for adding social proof in a non-intrusive way, especially in sections with muted or secondary visual hierarchy.",
    semanticTags: [
      "logos",
      "marquee",
      "muted",
      "background",
      "subtle",
      "grayscale",
      "infinite-scroll",
      "social-proof",
      "non-intrusive",
      "secondary",
    ],
    category: "logos",
    component: LogosMarqueeMuted,
    props: "LogosMarqueeMutedProps",
    exampleUsage: `<LogosMarqueeMuted
  heading="Trusted by leading companies"
  logos={[
    { name: "Company 1", logo: "/logos/company1.svg" },
    { name: "Company 2", logo: "/logos/company2.svg" }
  ]}
/>`.trim(),
  },

  "logos-centered-simple": {
    id: "logos-centered-simple",
    name: "Logos Centered Simple",
    description:
      "A clean, centered logo section with title, subtitle, and a single row of logos. Features grayscale-to-color hover effects with simple, elegant styling. Ideal for minimalist designs where you want to display trusted partners without overwhelming the page layout.",
    semanticTags: [
      "logos",
      "centered",
      "simple",
      "minimal",
      "clean",
      "elegant",
      "title",
      "subtitle",
      "hover",
      "grayscale",
    ],
    category: "logos",
    component: LogosCenteredSimple,
    props: "LogosCenteredSimpleProps",
    exampleUsage: `<LogosCenteredSimple
  title="Trusted by innovative companies"
  subtitle="Join thousands of businesses that rely on our platform"
  logos={[
    { name: "Company 1", logo: "/logos/company1.svg" },
    { name: "Company 2", logo: "/logos/company2.svg" }
  ]}
/>`.trim(),
  },

  "logos-numbered-carousel": {
    id: "logos-numbered-carousel",
    name: "Logos Numbered Carousel",
    description:
      "An auto-scrolling logo carousel with a headline and company count indicator. Features numbered hover states for each logo, gradient overlays, and smooth infinite scroll. Perfect for data-driven presentations where you want to emphasize the quantity of trusted partners alongside their logos.",
    semanticTags: [
      "logos",
      "carousel",
      "numbered",
      "count",
      "data-driven",
      "headline",
      "auto-scroll",
      "gradient",
      "partners",
      "quantity",
    ],
    category: "logos",
    component: LogosNumberedCarousel,
    props: "LogosNumberedCarouselProps",
    exampleUsage: `<LogosNumberedCarousel
  headline="Powering the world's best product teams."
  logos={[
    { name: "Company 1", logo: "/logos/company1.svg" },
    { name: "Company 2", logo: "/logos/company2.svg" }
  ]}
/>`.trim(),
  },

  "logos-double-carousel-pattern": {
    id: "logos-double-carousel-pattern",
    name: "Logos Double Carousel Pattern",
    description:
      "A visually rich section with two rows of auto-scrolling logos moving in opposite directions, overlaid on a dot pattern background. Features centered title, description, and dual CTA buttons. Ideal for hero-adjacent sections where you want maximum visual impact while showcasing partners.",
    semanticTags: [
      "logos",
      "double-carousel",
      "pattern",
      "background",
      "opposite-directions",
      "cta",
      "visual-impact",
      "hero-adjacent",
      "animated",
      "dots",
    ],
    category: "logos",
    component: LogosDoubleCarouselPattern,
    props: "LogosDoubleCarouselPatternProps",
    exampleUsage: `<LogosDoubleCarouselPattern
  title="Trusted by industry leaders worldwide"
  description="Join thousands of companies that rely on our platform."
  primaryButtonText="Get started"
  primaryButtonUrl="/signup"
  secondaryButtonText="Learn more"
  secondaryButtonUrl="/about"
  topRowLogos={[{ name: "Company 1", logo: "/logos/company1.svg" }]}
  bottomRowLogos={[{ name: "Company 2", logo: "/logos/company2.svg" }]}
/>`.trim(),
  },

  "logos-minimal-carousel": {
    id: "logos-minimal-carousel",
    name: "Logos Minimal Carousel",
    description:
      "A minimal, bordered logo carousel with subtle dividers between logos. Features grayscale logos with hover color transitions and smooth auto-scroll animation. Perfect for clean, professional designs where logos should be present but not dominant in the visual hierarchy.",
    semanticTags: [
      "logos",
      "minimal",
      "carousel",
      "bordered",
      "dividers",
      "subtle",
      "grayscale",
      "professional",
      "clean",
      "auto-scroll",
    ],
    category: "logos",
    component: LogosMinimalCarousel,
    props: "LogosMinimalCarouselProps",
    exampleUsage: `<LogosMinimalCarousel
  logos={[
    { name: "Company 1", logo: "/logos/company1.svg" },
    { name: "Company 2", logo: "/logos/company2.svg" }
  ]}
/>`.trim(),
  },

  "logos-partner-grid-sidebar": {
    id: "logos-partner-grid-sidebar",
    name: "Logos Partner Grid Sidebar",
    description:
      "A two-column layout with a sticky sidebar containing title, description, and timeline milestones, alongside a responsive grid of partner logos. Features hover effects and card-style logo containers. Ideal for partner pages that want to tell a story about partnership growth over time while displaying current partners.",
    semanticTags: [
      "logos",
      "partners",
      "grid",
      "sidebar",
      "sticky",
      "timeline",
      "milestones",
      "story",
      "growth",
      "cards",
    ],
    category: "logos",
    component: LogosPartnerGridSidebar,
    props: "LogosPartnerGridSidebarProps",
    exampleUsage: `<LogosPartnerGridSidebar
  sidebarTitle="Our Partners"
  sidebarDescription="We've partnered with industry leaders to deliver exceptional value."
  yearSections={[
    { year: "2020", description: "Started with 10 founding partners." },
    { year: "2024", description: "Now serving 200+ partners globally." }
  ]}
  partners={[
    { name: "Partner 1", logo: "/logos/partner1.svg" },
    { name: "Partner 2", logo: "/logos/partner2.svg" }
  ]}
/>`.trim(),
  },

  // Pricing Components
  "pricing-tier-grid": {
    id: "pricing-tier-grid",
    name: "Pricing Tier Grid",
    description:
      "A 4-column pricing grid displaying Free, Pro, Premium, and Enterprise tiers with feature lists and comparison labels. Ideal for SaaS products with multiple pricing tiers that need clear feature differentiation.",
    semanticTags: [
      "pricing",
      "plans",
      "tiers",
      "subscription",
      "saas",
      "grid",
      "comparison",
      "features",
      "enterprise",
    ],
    category: "pricing",
    component: PricingTierGrid,
    props: "PricingTierGridProps",
    exampleUsage: `<PricingTierGrid
  title="Choose Your Plan"
  subtitle="Select the perfect plan for your needs"
  tiers={[
    { name: "Free", price: "$0", features: ["5 projects", "Basic support"] },
    { name: "Pro", price: "$29", features: ["Unlimited projects", "Priority support"] }
  ]}
/>`.trim(),
  },
  "pricing-toggle-cards": {
    id: "pricing-toggle-cards",
    name: "Pricing Toggle Cards",
    description:
      "A 3-column card layout with monthly/yearly Switch toggle for billing period selection. Features popular plan highlighting and clean card design with feature lists.",
    semanticTags: [
      "pricing",
      "plans",
      "toggle",
      "switch",
      "monthly",
      "yearly",
      "cards",
      "subscription",
    ],
    category: "pricing",
    component: PricingToggleCards,
    props: "PricingToggleCardsProps",
    exampleUsage: `<PricingToggleCards
  title="Simple Pricing"
  plans={[
    { name: "Basic", monthlyPrice: 9, yearlyPrice: 90, features: ["Feature 1"] }
  ]}
/>`.trim(),
  },
  "pricing-columns-toggle": {
    id: "pricing-columns-toggle",
    name: "Pricing Columns Toggle",
    description:
      "A 3-column pricing layout with annual billing toggle button. Features highlighted plan option and clean design with feature lists and separator elements.",
    semanticTags: [
      "pricing",
      "plans",
      "toggle",
      "annual",
      "columns",
      "subscription",
      "highlight",
    ],
    category: "pricing",
    component: PricingColumnsToggle,
    props: "PricingColumnsToggleProps",
    exampleUsage: `<PricingColumnsToggle
  title="Pricing Plans"
  plans={[
    { name: "Starter", monthlyPrice: 19, yearlyPrice: 190, features: ["Feature 1"] }
  ]}
/>`.trim(),
  },
  "pricing-radio-toggle": {
    id: "pricing-radio-toggle",
    name: "Pricing Radio Toggle",
    description:
      "A 3-column pricing layout with radio button style toggle for billing period. Features Badge component for popular plan indicator and clean card design.",
    semanticTags: [
      "pricing",
      "plans",
      "radio",
      "toggle",
      "badge",
      "popular",
      "subscription",
    ],
    category: "pricing",
    component: PricingRadioToggle,
    props: "PricingRadioToggleProps",
    exampleUsage: `<PricingRadioToggle
  title="Choose Your Plan"
  plans={[
    { name: "Basic", monthlyPrice: 15, yearlyPrice: 150, features: ["Feature 1"], isPopular: true }
  ]}
/>`.trim(),
  },
  "pricing-comparison-table": {
    id: "pricing-comparison-table",
    name: "Pricing Comparison Table",
    description:
      "A 2-column card layout with detailed feature comparison table below. Uses Table components for organized feature matrix with check/minus icons for availability.",
    semanticTags: [
      "pricing",
      "comparison",
      "table",
      "features",
      "matrix",
      "plans",
      "detailed",
    ],
    category: "pricing",
    component: PricingComparisonTable,
    props: "PricingComparisonTableProps",
    exampleUsage: `<PricingComparisonTable
  title="Compare Plans"
  plans={[
    { name: "Basic", price: "$9", features: ["Feature 1"] }
  ]}
  comparisonFeatures={[
    { name: "Storage", basic: "5GB", pro: "50GB" }
  ]}
/>`.trim(),
  },
  "pricing-single-card": {
    id: "pricing-single-card",
    name: "Pricing Single Card",
    description:
      "A single comprehensive pricing card with grouped feature sections. Features organized into titled sections with a single CTA button. Ideal for single-tier products.",
    semanticTags: [
      "pricing",
      "single",
      "card",
      "grouped",
      "features",
      "sections",
      "simple",
    ],
    category: "pricing",
    component: PricingSingleCard,
    props: "PricingSingleCardProps",
    exampleUsage: `<PricingSingleCard
  title="Pro Plan"
  price="$49"
  featureGroups={[
    { title: "Core Features", features: ["Feature 1", "Feature 2"] }
  ]}
/>`.trim(),
  },
  "pricing-two-column-basic": {
    id: "pricing-two-column-basic",
    name: "Pricing Two Column Basic",
    description:
      "A clean two-column layout with two pricing plans and radio toggle for billing period. Simple and focused design ideal for products with basic/pro tier structure.",
    semanticTags: [
      "pricing",
      "two-column",
      "basic",
      "simple",
      "toggle",
      "plans",
      "startup",
    ],
    category: "pricing",
    component: PricingTwoColumnBasic,
    props: "PricingTwoColumnBasicProps",
    exampleUsage: `<PricingTwoColumnBasic
  title="Simple Pricing"
  plans={[
    { name: "Basic", monthlyPrice: 19, yearlyPrice: 190, features: ["Feature 1"] },
    { name: "Pro", monthlyPrice: 49, yearlyPrice: 490, features: ["Feature 1", "Feature 2"] }
  ]}
/>`.trim(),
  },
  "pricing-simple-card": {
    id: "pricing-simple-card",
    name: "Pricing Simple Card",
    description:
      "A single, minimal pricing card with prominent price display and feature list. Clean and focused design ideal for landing pages or single pricing tier products.",
    semanticTags: [
      "pricing",
      "simple",
      "minimal",
      "card",
      "single",
      "landing",
      "focused",
    ],
    category: "pricing",
    component: PricingSimpleCard,
    props: "PricingSimpleCardProps",
    exampleUsage: `<PricingSimpleCard
  title="Pro Plan"
  price="$49"
  priceInterval="/month"
  features={["Feature 1", "Feature 2"]}
  buttonText="Get Started"
/>`.trim(),
  },
  "pricing-responsive-table": {
    id: "pricing-responsive-table",
    name: "Pricing Responsive Table",
    description:
      "A comprehensive pricing comparison with mobile cards and desktop table views. Features tooltips for feature explanations and Switch toggle for billing period.",
    semanticTags: [
      "pricing",
      "responsive",
      "table",
      "mobile",
      "desktop",
      "comparison",
      "tooltips",
    ],
    category: "pricing",
    component: PricingResponsiveTable,
    props: "PricingResponsiveTableProps",
    exampleUsage: `<PricingResponsiveTable
  title="Compare Plans"
  plans={[
    { name: "Free", monthlyPrice: 0, yearlyPrice: 0, buttonText: "Get Started" }
  ]}
  features={[
    { name: "Projects", tooltip: "Number of projects", free: "3", pro: "Unlimited", enterprise: "Unlimited" }
  ]}
/>`.trim(),
  },
  "pricing-four-tier-toggle": {
    id: "pricing-four-tier-toggle",
    name: "Pricing Four Tier Toggle",
    description:
      "A 4-column pricing grid with annual billing Switch toggle. Features check/X icons for feature availability and popular plan highlighting with Badge.",
    semanticTags: [
      "pricing",
      "four-tier",
      "toggle",
      "switch",
      "enterprise",
      "comparison",
      "features",
    ],
    category: "pricing",
    component: PricingFourTierToggle,
    props: "PricingFourTierToggleProps",
    exampleUsage: `<PricingFourTierToggle
  title="Pricing Plans"
  plans={[
    { name: "Free", monthlyPrice: 0, yearlyPrice: 0, features: [{ name: "Feature", included: true }] }
  ]}
/>`.trim(),
  },
  "pricing-feature-matrix": {
    id: "pricing-feature-matrix",
    name: "Pricing Feature Matrix",
    description:
      "A comprehensive pricing comparison with collapsible feature categories. Features tabs-based billing toggle, tooltips, and organized feature groups that can be expanded/collapsed.",
    semanticTags: [
      "pricing",
      "matrix",
      "features",
      "collapsible",
      "categories",
      "tabs",
      "detailed",
    ],
    category: "pricing",
    component: PricingFeatureMatrix,
    props: "PricingFeatureMatrixProps",
    exampleUsage: `<PricingFeatureMatrix
  title="Compare Plans"
  plans={[
    { name: "Starter", monthlyPrice: 19, yearlyPrice: 190, buttonText: "Get Started" }
  ]}
  featureCategories={[
    { name: "Core", features: [{ name: "Projects", starter: "5", professional: "Unlimited", enterprise: "Unlimited" }] }
  ]}
/>`.trim(),
  },
  "pricing-addons-featured": {
    id: "pricing-addons-featured",
    name: "Pricing Addons Featured",
    description:
      "Featured add-on options with 3 highlighted cards plus a secondary list of additional add-ons. Ideal for upselling additional features or services to existing customers.",
    semanticTags: [
      "pricing",
      "addons",
      "featured",
      "upsell",
      "extras",
      "upgrades",
      "services",
    ],
    category: "pricing",
    component: PricingAddonsFeatured,
    props: "PricingAddonsFeaturedProps",
    exampleUsage: `<PricingAddonsFeatured
  title="Enhance Your Plan"
  featuredAddons={[
    { name: "Analytics", description: "Deep insights", price: "$29", features: ["Feature 1"] }
  ]}
  additionalAddons={[
    { name: "Extra Storage", description: "100GB more", price: "$10/month" }
  ]}
/>`.trim(),
  },
  "pricing-addons-cards": {
    id: "pricing-addons-cards",
    name: "Pricing Addons Cards",
    description:
      "A row of 3 add-on cards with feature lists. Each card includes name, description, price, feature checklist, and CTA button. Simpler version without additional add-ons list.",
    semanticTags: [
      "pricing",
      "addons",
      "cards",
      "extras",
      "upgrades",
      "features",
      "simple",
    ],
    category: "pricing",
    component: PricingAddonsCards,
    props: "PricingAddonsCardsProps",
    exampleUsage: `<PricingAddonsCards
  title="Power-ups"
  addons={[
    { name: "Analytics", description: "Deep insights", price: "$19", features: ["Feature 1"] }
  ]}
/>`.trim(),
  },
  "pricing-discount-card": {
    id: "pricing-discount-card",
    name: "Pricing Discount Card",
    description:
      "A single pricing card with discount badge and strikethrough original price. Features prominent discount indicator for promotional pricing or limited-time offers.",
    semanticTags: [
      "pricing",
      "discount",
      "promotion",
      "sale",
      "offer",
      "badge",
      "special",
    ],
    category: "pricing",
    component: PricingDiscountCard,
    props: "PricingDiscountCardProps",
    exampleUsage: `<PricingDiscountCard
  title="Pro Plan"
  originalPrice="$99"
  discountedPrice="$79"
  discountBadge="20% OFF"
  features={["Feature 1", "Feature 2"]}
/>`.trim(),
  },
  "pricing-split-layout": {
    id: "pricing-split-layout",
    name: "Pricing Split Layout",
    description:
      "A split layout with marketing content on the left and pricing card on the right. Combines compelling headline, description, and feature list with prominent pricing display.",
    semanticTags: [
      "pricing",
      "split",
      "layout",
      "marketing",
      "conversion",
      "landing",
      "cta",
    ],
    category: "pricing",
    component: PricingSplitLayout,
    props: "PricingSplitLayoutProps",
    exampleUsage: `<PricingSplitLayout
  title="Start Building Today"
  subtitle="Simple, transparent pricing"
  price="$49"
  features={["Feature 1", "Feature 2"]}
  buttonText="Get Started"
/>`.trim(),
  },
  "pricing-tabs-toggle": {
    id: "pricing-tabs-toggle",
    name: "Pricing Tabs Toggle",
    description:
      "A 3-column pricing grid with tabs-based monthly/yearly toggle. Features plan icons, popular plan highlighting, and clean card design with feature lists.",
    semanticTags: [
      "pricing",
      "tabs",
      "toggle",
      "icons",
      "plans",
      "subscription",
      "saas",
    ],
    category: "pricing",
    component: PricingTabsToggle,
    props: "PricingTabsToggleProps",
    exampleUsage: `<PricingTabsToggle
  title="Simple Pricing"
  plans={[
    { name: "Free", monthlyPrice: 0, yearlyPrice: 0, features: ["Feature 1"], icon: "lucide/user" }
  ]}
/>`.trim(),
  },
  "pricing-icon-headers": {
    id: "pricing-icon-headers",
    name: "Pricing Icon Headers",
    description:
      "A 3-column pricing grid with icon-based plan headers. Each plan features a colored icon badge for visual differentiation through icon colors.",
    semanticTags: [
      "pricing",
      "icons",
      "headers",
      "visual",
      "colorful",
      "plans",
      "badges",
    ],
    category: "pricing",
    component: PricingIconHeaders,
    props: "PricingIconHeadersProps",
    exampleUsage: `<PricingIconHeaders
  title="Pricing Plans"
  plans={[
    { name: "Starter", price: "$9", features: ["Feature 1"], icon: "lucide/rocket", iconBgClass: "bg-blue-100 text-blue-600" }
  ]}
/>`.trim(),
  },
  "pricing-comparison-headers": {
    id: "pricing-comparison-headers",
    name: "Pricing Comparison Headers",
    description:
      "A comparison table with plan headers and monthly/yearly Switch toggle. Features sticky plan headers, feature rows with check/X indicators, and responsive design.",
    semanticTags: [
      "pricing",
      "comparison",
      "headers",
      "table",
      "sticky",
      "toggle",
      "detailed",
    ],
    category: "pricing",
    component: PricingComparisonHeaders,
    props: "PricingComparisonHeadersProps",
    exampleUsage: `<PricingComparisonHeaders
  title="Compare Plans"
  plans={[
    { name: "Free", monthlyPrice: 0, yearlyPrice: 0, buttonText: "Get Started" }
  ]}
  features={[
    { name: "Projects", free: "3", pro: "Unlimited", enterprise: "Unlimited" }
  ]}
/>`.trim(),
  },
  "pricing-switch-cards": {
    id: "pricing-switch-cards",
    name: "Pricing Switch Cards",
    description:
      "A 3-card pricing layout with Switch toggle for billing period. Features clean card design with popular plan highlighting and feature lists.",
    semanticTags: [
      "pricing",
      "switch",
      "cards",
      "toggle",
      "plans",
      "subscription",
      "clean",
    ],
    category: "pricing",
    component: PricingSwitchCards,
    props: "PricingSwitchCardsProps",
    exampleUsage: `<PricingSwitchCards
  title="Simple Pricing"
  plans={[
    { name: "Free", monthlyPrice: 0, yearlyPrice: 0, features: ["Feature 1"] }
  ]}
/>`.trim(),
  },
  "pricing-collapsible-plans": {
    id: "pricing-collapsible-plans",
    name: "Pricing Collapsible Plans",
    description:
      "Pricing plans with collapsible mobile menu and desktop comparison. Features dropdown plan selector on mobile and expanded cards on desktop for responsive experience.",
    semanticTags: [
      "pricing",
      "collapsible",
      "mobile",
      "responsive",
      "dropdown",
      "plans",
      "adaptive",
    ],
    category: "pricing",
    component: PricingCollapsiblePlans,
    props: "PricingCollapsiblePlansProps",
    exampleUsage: `<PricingCollapsiblePlans
  title="Pricing Plans"
  plans={[
    { name: "Starter", price: "$9", features: ["Feature 1"] }
  ]}
/>`.trim(),
  },
  "pricing-popular-highlight": {
    id: "pricing-popular-highlight",
    name: "Pricing Popular Highlight",
    description:
      "A 3-column pricing grid with the popular plan visually elevated and scaled up. Features enhanced styling to draw attention to the recommended tier.",
    semanticTags: [
      "pricing",
      "popular",
      "highlight",
      "elevated",
      "recommended",
      "emphasis",
      "scale",
    ],
    category: "pricing",
    component: PricingPopularHighlight,
    props: "PricingPopularHighlightProps",
    exampleUsage: `<PricingPopularHighlight
  title="Pricing Plans"
  plans={[
    { name: "Basic", monthlyPrice: 15, yearlyPrice: 150, features: ["Feature 1"] },
    { name: "Pro", monthlyPrice: 39, yearlyPrice: 390, features: ["Feature 1"], isPopular: true }
  ]}
/>`.trim(),
  },
  "pricing-services-cards": {
    id: "pricing-services-cards",
    name: "Pricing Services Cards",
    description:
      "A two-card layout for service-based pricing. Features icon headers, feature lists, and distinct styling for the primary service. Ideal for agencies and consultants.",
    semanticTags: [
      "pricing",
      "services",
      "agency",
      "consulting",
      "packages",
      "professional",
      "icons",
    ],
    category: "pricing",
    component: PricingServicesCards,
    props: "PricingServicesCardsProps",
    exampleUsage: `<PricingServicesCards
  title="Our Services"
  plans={[
    { name: "Consultation", price: "$199", features: ["Feature 1"], icon: "lucide/users" }
  ]}
/>`.trim(),
  },
  "pricing-packages-radio": {
    id: "pricing-packages-radio",
    name: "Pricing Packages Radio",
    description:
      "Pricing packages with radio button selection. Users select a package and proceed with a single CTA button. Features visual selection state and popular package highlighting.",
    semanticTags: [
      "pricing",
      "packages",
      "radio",
      "selection",
      "marketing",
      "services",
      "choose",
    ],
    category: "pricing",
    component: PricingPackagesRadio,
    props: "PricingPackagesRadioProps",
    exampleUsage: `<PricingPackagesRadio
  title="Marketing Packages"
  packages={[
    { id: "basic", name: "Basic", price: "$499", features: ["Feature 1"] }
  ]}
  buttonText="Get Started"
/>`.trim(),
  },
  "pricing-toggle-period": {
    id: "pricing-toggle-period",
    name: "Pricing Toggle Period",
    description:
      "Pricing plans with toggle group for multiple billing periods (monthly, quarterly, yearly). Features clean two-column layout with popular plan highlighting.",
    semanticTags: [
      "pricing",
      "toggle",
      "period",
      "quarterly",
      "flexible",
      "billing",
      "options",
    ],
    category: "pricing",
    component: PricingTogglePeriod,
    props: "PricingTogglePeriodProps",
    exampleUsage: `<PricingTogglePeriod
  title="Flexible Pricing"
  plans={[
    { name: "Starter", monthlyPrice: 19, quarterlyPrice: 49, yearlyPrice: 149, features: ["Feature 1"] }
  ]}
/>`.trim(),
  },
  "pricing-spotlight-card": {
    id: "pricing-spotlight-card",
    name: "Pricing Spotlight Card",
    description:
      "A single premium pricing card with spotlight/glow effect. Features gradient border, prominent pricing display, and dual CTA buttons for flagship product highlighting.",
    semanticTags: [
      "pricing",
      "spotlight",
      "premium",
      "glow",
      "featured",
      "flagship",
      "hero",
    ],
    category: "pricing",
    component: PricingSpotlightCard,
    props: "PricingSpotlightCardProps",
    exampleUsage: `<PricingSpotlightCard
  title="Premium Plan"
  subtitle="The ultimate solution"
  price="$99"
  features={["Feature 1", "Feature 2"]}
  buttonText="Get Started"
/>`.trim(),
  },
  "pricing-full-comparison": {
    id: "pricing-full-comparison",
    name: "Pricing Full Comparison",
    description:
      "A comprehensive 4-tier pricing comparison with full feature matrix. Features plan cards at top followed by detailed comparison table organized by category.",
    semanticTags: [
      "pricing",
      "comparison",
      "full",
      "matrix",
      "detailed",
      "enterprise",
      "comprehensive",
    ],
    category: "pricing",
    component: PricingFullComparison,
    props: "PricingFullComparisonProps",
    exampleUsage: `<PricingFullComparison
  title="Compare All Plans"
  plans={[
    { name: "Free", monthlyPrice: 0, yearlyPrice: 0, buttonText: "Get Started" }
  ]}
  features={[
    { name: "Projects", category: "Usage", free: "3", startup: "10", team: "Unlimited", enterprise: "Unlimited" }
  ]}
/>`.trim(),
  },
  "pricing-minimal-cards": {
    id: "pricing-minimal-cards",
    name: "Pricing Minimal Cards",
    description:
      "A clean, minimal 3-column pricing layout with essential information. No toggle or complex interactions - just straightforward pricing display.",
    semanticTags: [
      "pricing",
      "minimal",
      "simple",
      "clean",
      "basic",
      "straightforward",
      "static",
    ],
    category: "pricing",
    component: PricingMinimalCards,
    props: "PricingMinimalCardsProps",
    exampleUsage: `<PricingMinimalCards
  title="Simple Pricing"
  plans={[
    { name: "Basic", price: "$9", features: ["Feature 1"] }
  ]}
/>`.trim(),
  },
  "pricing-gradient-cards": {
    id: "pricing-gradient-cards",
    name: "Pricing Gradient Cards",
    description:
      "Pricing plans with subtle gradient backgrounds. Each card features a unique gradient color scheme for visual differentiation with Switch toggle for billing.",
    semanticTags: [
      "pricing",
      "gradient",
      "colorful",
      "modern",
      "visual",
      "cards",
      "stylish",
    ],
    category: "pricing",
    component: PricingGradientCards,
    props: "PricingGradientCardsProps",
    exampleUsage: `<PricingGradientCards
  title="Pricing Plans"
  plans={[
    { name: "Starter", monthlyPrice: 15, yearlyPrice: 150, features: ["Feature 1"], gradientClass: "from-blue-500/10 to-cyan-500/10" }
  ]}
/>`.trim(),
  },
  "pricing-enterprise-contact": {
    id: "pricing-enterprise-contact",
    name: "Pricing Enterprise Contact",
    description:
      "An enterprise-focused pricing section with contact CTA. Features list of enterprise benefits with descriptions and prominent contact buttons for custom quotes.",
    semanticTags: [
      "pricing",
      "enterprise",
      "contact",
      "sales",
      "custom",
      "quote",
      "b2b",
    ],
    category: "pricing",
    component: PricingEnterpriseContact,
    props: "PricingEnterpriseContactProps",
    exampleUsage: `<PricingEnterpriseContact
  title="Enterprise"
  subtitle="For large organizations"
  features={[
    { name: "Unlimited everything", description: "No limits" }
  ]}
  buttonText="Contact Sales"
/>`.trim(),
  },

  // Process blocks
  "process-sticky-steps": {
    id: "process-sticky-steps",
    name: "Process Sticky Steps",
    description:
      "A process section with a sticky left sidebar containing title, description, and CTA, paired with a scrollable right column of numbered step cards. Each step features a decorative corner illustration and displays step number, title, and description. Ideal for showcasing methodologies, workflows, or multi-step processes.",
    semanticTags: [
      "process",
      "steps",
      "methodology",
      "workflow",
      "sticky",
      "sidebar",
      "numbered",
      "how-it-works",
      "timeline",
    ],
    category: "process",
    component: ProcessStickySteps,
    props: "ProcessStickyStepsProps",
    exampleUsage: `<ProcessStickySteps
  title="Our Process"
  description="We follow a proven methodology to deliver exceptional results."
  ctaText="Get in touch"
  ctaUrl="#contact"
  steps={[
    { step: "01", title: "Discover & Research", description: "Understanding your needs..." },
    { step: "02", title: "Strategy & Planning", description: "Developing a roadmap..." }
  ]}
/>`.trim(),
  },
  "process-scroll-image": {
    id: "process-scroll-image",
    name: "Process Scroll Image",
    description:
      "A scroll-triggered process section with a sticky left panel containing title, description, animated image carousel, and CTA. As users scroll through the numbered steps on the right, the corresponding image animates into view with a clip-path reveal effect. Perfect for visual storytelling and step-by-step guides.",
    semanticTags: [
      "process",
      "scroll",
      "animation",
      "image",
      "carousel",
      "interactive",
      "visual",
      "storytelling",
      "steps",
    ],
    category: "process",
    component: ProcessScrollImage,
    props: "ProcessScrollImageProps",
    exampleUsage: `<ProcessScrollImage
  title="Our Process"
  description="Watch our process unfold as you scroll."
  steps={[
    { step: "01", title: "Discovery", image: "/images/step1.jpg", description: "..." },
    { step: "02", title: "Planning", image: "/images/step2.jpg", description: "..." }
  ]}
/>`.trim(),
  },
  "process-hover-cards": {
    id: "process-hover-cards",
    name: "Process Hover Cards",
    description:
      "A process section with hover-activated cards that reveal floating images on desktop. Each step displays a mono-font number, title, and description with smooth hover transitions. The floating image appears with a fade-in animation when hovering. Ideal for interactive process showcases and service overviews.",
    semanticTags: [
      "process",
      "hover",
      "interactive",
      "cards",
      "image",
      "animation",
      "services",
      "steps",
    ],
    category: "process",
    component: ProcessHoverCards,
    props: "ProcessHoverCardsProps",
    exampleUsage: `<ProcessHoverCards
  title="Our Process"
  description="Hover over each step to learn more."
  steps={[
    { step: "01", title: "Research", image: "/images/research.jpg", description: "..." },
    { step: "02", title: "Design", image: "/images/design.jpg", description: "..." }
  ]}
/>`.trim(),
  },
  "process-icon-timeline": {
    id: "process-icon-timeline",
    name: "Process Icon Timeline",
    description:
      "A vertical timeline with colored icon badges and alternating left/right card layout. Each step features a customizable colored badge with icon, title, description, and optional highlight tags. The timeline line connects all steps visually. Perfect for detailed process flows, project phases, or methodology explanations.",
    semanticTags: [
      "process",
      "timeline",
      "icons",
      "badges",
      "vertical",
      "alternating",
      "phases",
      "methodology",
      "highlights",
    ],
    category: "process",
    component: ProcessIconTimeline,
    props: "ProcessIconTimelineProps",
    exampleUsage: `<ProcessIconTimeline
  title="Our Process"
  description="A proven methodology for success."
  steps={[
    { icon: "lucide/lightbulb", title: "Discovery", description: "...", highlights: ["Research", "Analysis"], badgeColor: "bg-blue-500" },
    { icon: "lucide/code", title: "Development", description: "...", highlights: ["Frontend", "Backend"], badgeColor: "bg-green-500" }
  ]}
/>`.trim(),
  },
  "process-expandable-timeline": {
    id: "process-expandable-timeline",
    name: "Process Expandable Timeline",
    description:
      "A clickable timeline with expandable content sections. Each step shows a numbered badge, title, and brief description that expands to reveal detailed content when clicked. Features smooth height animations and decorative corner connectors. Ideal for FAQ-style process explanations or detailed methodology breakdowns.",
    semanticTags: [
      "process",
      "timeline",
      "expandable",
      "accordion",
      "interactive",
      "clickable",
      "detailed",
      "faq-style",
    ],
    category: "process",
    component: ProcessExpandableTimeline,
    props: "ProcessExpandableTimelineProps",
    exampleUsage: `<ProcessExpandableTimeline
  title="How We Work"
  description="Click on each step to learn more."
  steps={[
    { title: "Discovery Phase", description: "Understanding your needs", expandedContent: "During the discovery phase..." },
    { title: "Planning", description: "Creating a roadmap", expandedContent: "We develop a comprehensive plan..." }
  ]}
/>`.trim(),
  },
  "process-roadmap-timeline": {
    id: "process-roadmap-timeline",
    name: "Process Roadmap Timeline",
    description:
      "A product roadmap timeline with status badges (completed, in-progress, upcoming) and milestone cards. Features alternating left/right layout, date labels, feature tags, and visual status indicators. The timeline line connects milestones with numbered or checkmark badges. Perfect for product roadmaps and project timelines.",
    semanticTags: [
      "process",
      "roadmap",
      "timeline",
      "milestones",
      "status",
      "product",
      "project",
      "planning",
      "phases",
    ],
    category: "process",
    component: ProcessRoadmapTimeline,
    props: "ProcessRoadmapTimelineProps",
    exampleUsage: `<ProcessRoadmapTimeline
  title="Product Roadmap"
  description="Our journey from concept to completion."
  milestones={[
    { title: "Foundation", description: "Core infrastructure", date: "Q1 2024", status: "completed", features: ["Architecture", "Database"] },
    { title: "Enhancement", description: "Advanced features", date: "Q3 2024", status: "in-progress", features: ["Analytics", "Reporting"] }
  ]}
/>`.trim(),
  },
  "process-mission-principles": {
    id: "process-mission-principles",
    name: "Process Mission Principles",
    description:
      "A mission statement section with a grid of numbered principle cards. Features a prominent mission title and description followed by a responsive grid of principles, each with a floating number badge, title, and description. Ideal for company values, guiding principles, or core beliefs sections.",
    semanticTags: [
      "process",
      "mission",
      "principles",
      "values",
      "beliefs",
      "company",
      "culture",
      "numbered",
      "grid",
    ],
    category: "process",
    component: ProcessMissionPrinciples,
    props: "ProcessMissionPrinciplesProps",
    exampleUsage: `<ProcessMissionPrinciples
  missionLabel="OUR MISSION"
  missionTitle="Building the Future Together"
  missionDescription="We're on a mission to transform how businesses operate."
  principlesLabel="OUR PRINCIPLES"
  principles={[
    { number: "01", title: "Customer First", description: "Every decision starts with the customer." },
    { number: "02", title: "Quality Over Speed", description: "Excellence is a habit, not an exception." }
  ]}
/>`.trim(),
  },
  "process-steps-grid": {
    id: "process-steps-grid",
    name: "Process Steps Grid",
    description:
      "A grid layout of process step cards with large background numbers and icons. Each card features an icon in a colored badge, title, description, and a decorative oversized step number in the background. Hover effects highlight the active card. Perfect for showcasing methodologies, service processes, or workflow steps.",
    semanticTags: [
      "process",
      "grid",
      "steps",
      "cards",
      "icons",
      "numbered",
      "methodology",
      "services",
      "workflow",
    ],
    category: "process",
    component: ProcessStepsGrid,
    props: "ProcessStepsGridProps",
    exampleUsage: `<ProcessStepsGrid
  title="Our Process"
  description="A systematic approach to delivering exceptional results."
  steps={[
    { icon: "lucide/search", title: "Research", description: "Understanding your business..." },
    { icon: "lucide/lightbulb", title: "Ideation", description: "Developing creative solutions..." }
  ]}
/>`.trim(),
  },
  "process-numbered-services": {
    id: "process-numbered-services",
    name: "Process Numbered Services",
    description:
      "A services section with large numbered circles and capability lists. Each service displays a prominent number badge, title, description, CTA link, and a grid of capabilities with checkmark icons. The layout uses a 12-column grid for flexible content arrangement. Ideal for service offerings, capabilities, or solution pages.",
    semanticTags: [
      "process",
      "services",
      "numbered",
      "capabilities",
      "offerings",
      "solutions",
      "cta",
      "checkmarks",
    ],
    category: "process",
    component: ProcessNumberedServices,
    props: "ProcessNumberedServicesProps",
    exampleUsage: `<ProcessNumberedServices
  title="Our Services"
  description="Comprehensive solutions to help you succeed."
  services={[
    { number: "01", title: "Strategy", description: "Digital transformation...", capabilities: ["Roadmap", "Assessment"], ctaText: "Learn more", ctaUrl: "#" },
    { number: "02", title: "Design", description: "User experience...", capabilities: ["UX Research", "UI Design"], ctaText: "Learn more", ctaUrl: "#" }
  ]}
/>`.trim(),
  },
  // Project List components
  "project-alternating-motion": {
    id: "project-alternating-motion",
    name: "Project Alternating Motion",
    description:
      "A portfolio section with alternating left/right project cards featuring hover-activated motion effects. Each card displays a project image with gradient overlay, title, description, and technology badges. The alternating layout creates visual rhythm while motion effects add interactivity. Perfect for creative portfolios and agency showcases.",
    semanticTags: [
      "project-list",
      "portfolio",
      "projects",
      "alternating",
      "motion",
      "hover",
      "cards",
      "technologies",
      "showcase",
    ],
    category: "project-list",
    component: ProjectAlternatingMotion,
    props: "ProjectAlternatingMotionProps",
    exampleUsage: `<ProjectAlternatingMotion
  heading="Featured Projects"
  subheading="A selection of recent work"
  projects={[
    { title: "E-commerce Platform", description: "Modern shopping experience", image: "/project1.jpg", technologies: ["React", "Node.js"], link: "#" }
  ]}
/>`.trim(),
  },
  "project-background-reveal": {
    id: "project-background-reveal",
    name: "Project Background Reveal",
    description:
      "Full-width project cards with background image reveal on hover. Each card displays heading, subheading, and description with a background image that becomes visible on hover with a smooth transition. Includes a header section with title and CTA button. Perfect for portfolios where visual impact is key.",
    semanticTags: [
      "project-list",
      "portfolio",
      "projects",
      "background",
      "reveal",
      "hover",
      "full-width",
      "cards",
      "cta",
    ],
    category: "project-list",
    component: ProjectBackgroundReveal,
    props: "ProjectBackgroundRevealProps",
    exampleUsage: `<ProjectBackgroundReveal
  heading="Our Work"
  subheading="Featured Projects"
  projects={[
    { heading: "Brand Identity", subheading: "Design", description: "Complete rebrand", image: "/project1.jpg", url: "#" }
  ]}
/>`.trim(),
  },
  "project-card-overlay": {
    id: "project-card-overlay",
    name: "Project Card Overlay",
    description:
      "A grid of project cards with gradient overlays and hover effects. Each card features a full-bleed image with a dark gradient overlay, category badge, title, and description. On hover, the overlay lightens and content shifts. Ideal for creative portfolios and agency showcases.",
    semanticTags: [
      "project-list",
      "portfolio",
      "projects",
      "grid",
      "overlay",
      "gradient",
      "hover",
      "cards",
      "badge",
    ],
    category: "project-list",
    component: ProjectCardOverlay,
    props: "ProjectCardOverlayProps",
    exampleUsage: `<ProjectCardOverlay
  heading="Portfolio"
  subheading="Recent projects"
  projects={[
    { title: "Website Redesign", category: "Web Design", description: "Modern UI overhaul", image: "/project1.jpg", link: "#" }
  ]}
/>`.trim(),
  },
  "project-carousel-cinematic": {
    id: "project-carousel-cinematic",
    name: "Project Carousel Cinematic",
    description:
      "A cinematic carousel with large landscape images and minimal text overlays. Features wide aspect ratio cards with gradient overlays, category labels, titles, and descriptions. Navigation arrows and dot indicators provide carousel control. Perfect for film, photography, or architectural portfolios.",
    semanticTags: [
      "project-list",
      "portfolio",
      "projects",
      "carousel",
      "cinematic",
      "landscape",
      "film",
      "photography",
      "architecture",
    ],
    category: "project-list",
    component: ProjectCarouselCinematic,
    props: "ProjectCarouselCinematicProps",
    exampleUsage: `<ProjectCarouselCinematic
  heading="Featured Work"
  subheading="Cinematic showcase"
  projects={[
    { title: "Documentary Film", category: "Film", description: "Award-winning documentary", image: "/project1.jpg", link: "#" }
  ]}
/>`.trim(),
  },
  "project-carousel-detail-cards": {
    id: "project-carousel-detail-cards",
    name: "Project Carousel Detail Cards",
    description:
      "A carousel of detailed project cards with comprehensive metadata. Each card includes image, category badge, title, client info, year, description, and CTA button. Features navigation arrows and dot indicators. Ideal for agency portfolios or case study showcases requiring detailed project information.",
    semanticTags: [
      "project-list",
      "portfolio",
      "projects",
      "carousel",
      "detailed",
      "metadata",
      "client",
      "case-study",
      "agency",
    ],
    category: "project-list",
    component: ProjectCarouselDetailCards,
    props: "ProjectCarouselDetailCardsProps",
    exampleUsage: `<ProjectCarouselDetailCards
  heading="Case Studies"
  subheading="Detailed project showcase"
  projects={[
    { title: "E-commerce Platform", category: "Web Development", client: "Retail Co", year: "2023", description: "Full-stack solution", image: "/project1.jpg", link: "#" }
  ]}
/>`.trim(),
  },
  "project-carousel-minimal": {
    id: "project-carousel-minimal",
    name: "Project Carousel Minimal",
    description:
      "A minimal carousel with clean project cards and subtle hover effects. Each card features a square image with hover zoom, title, and category. Navigation arrows and dot indicators provide carousel control. Perfect for clean, modern portfolios where simplicity is key.",
    semanticTags: [
      "project-list",
      "portfolio",
      "projects",
      "carousel",
      "minimal",
      "clean",
      "modern",
      "simple",
    ],
    category: "project-list",
    component: ProjectCarouselMinimal,
    props: "ProjectCarouselMinimalProps",
    exampleUsage: `<ProjectCarouselMinimal
  heading="Projects"
  subheading="Recent work"
  projects={[
    { title: "Brand Identity", category: "Branding", image: "/project1.jpg", link: "#" }
  ]}
/>`.trim(),
  },
  "project-experience-quote": {
    id: "project-experience-quote",
    name: "Project Experience Quote",
    description:
      "Professional experience cards with testimonial quotes. Each card features a colored header with role and company, location and duration metadata, description, achievement list, and a testimonial quote. Displayed in a 3-column grid. Ideal for professional portfolios and career showcases.",
    semanticTags: [
      "project-list",
      "portfolio",
      "experience",
      "career",
      "testimonial",
      "quote",
      "achievements",
      "professional",
      "resume",
    ],
    category: "project-list",
    component: ProjectExperienceQuote,
    props: "ProjectExperienceQuoteProps",
    exampleUsage: `<ProjectExperienceQuote
  heading="Experience"
  subheading="Professional journey"
  experiences={[
    { role: "Senior Developer", company: "Tech Corp", location: "San Francisco", duration: "2020-2023", description: "Led development team", achievements: ["Shipped 5 products"], quote: { text: "Great work!", author: "CEO", position: "Tech Corp" }, link: "#" }
  ]}
/>`.trim(),
  },
  "project-featured-carousel": {
    id: "project-featured-carousel",
    name: "Project Featured Carousel",
    description:
      "A full-featured carousel with client info, badges, and descriptions. Each card includes a square image, category badge, title, client/year metadata, description, and CTA button. Navigation arrows are positioned at the sides. Perfect for agency portfolios or freelancer showcases.",
    semanticTags: [
      "project-list",
      "portfolio",
      "projects",
      "carousel",
      "featured",
      "client",
      "agency",
      "freelancer",
      "showcase",
    ],
    category: "project-list",
    component: ProjectFeaturedCarousel,
    props: "ProjectFeaturedCarouselProps",
    exampleUsage: `<ProjectFeaturedCarousel
  heading="Featured Projects"
  subheading="Client work showcase"
  projects={[
    { title: "E-commerce Redesign", client: "Fashion Boutique", year: "2023", category: "Web Design", description: "Complete overhaul", image: "/project1.jpg", link: "#" }
  ]}
/>`.trim(),
  },
  "project-filterable-gallery": {
    id: "project-filterable-gallery",
    name: "Project Filterable Gallery",
    description:
      "A filterable gallery with category tabs and animated transitions. Projects are displayed in a responsive grid with hover effects revealing title and category. Category tabs allow filtering with smooth fade animations. Perfect for portfolios with multiple project categories.",
    semanticTags: [
      "project-list",
      "portfolio",
      "projects",
      "gallery",
      "filterable",
      "tabs",
      "categories",
      "animated",
      "grid",
    ],
    category: "project-list",
    component: ProjectFilterableGallery,
    props: "ProjectFilterableGalleryProps",
    exampleUsage: `<ProjectFilterableGallery
  heading="Portfolio"
  subheading="Filter by category"
  categories={["All", "Web", "Mobile", "Branding"]}
  projects={[
    { title: "Website", category: "Web", image: "/project1.jpg", link: "#" }
  ]}
/>`.trim(),
  },
  "project-filterable-three-column": {
    id: "project-filterable-three-column",
    name: "Project Filterable Three Column",
    description:
      "A three-column filterable gallery with category tabs and hover overlays. Each project card displays an image with hover overlay showing title, description, and tags. Category tabs allow filtering projects. Perfect for design portfolios and creative showcases with multiple categories.",
    semanticTags: [
      "project-list",
      "portfolio",
      "projects",
      "gallery",
      "filterable",
      "three-column",
      "tags",
      "overlay",
      "hover",
    ],
    category: "project-list",
    component: ProjectFilterableThreeColumn,
    props: "ProjectFilterableThreeColumnProps",
    exampleUsage: `<ProjectFilterableThreeColumn
  categories={["All", "Design", "Development"]}
  projects={[
    { id: 1, title: "Brand Design", category: "Design", description: "Visual identity", image: "/project1.jpg", tags: ["Logo", "Colors"] }
  ]}
/>`.trim(),
  },
  "project-grid-gallery": {
    id: "project-grid-gallery",
    name: "Project Grid Gallery",
    description:
      "A responsive grid gallery of project cards with hover effects. Each card displays a project image with hover zoom effect, title, and category badge. The grid adapts from 1 column on mobile to 3 columns on desktop. Perfect for simple, clean portfolio layouts.",
    semanticTags: [
      "project-list",
      "portfolio",
      "projects",
      "grid",
      "gallery",
      "responsive",
      "hover",
      "simple",
      "clean",
    ],
    category: "project-list",
    component: ProjectGridGallery,
    props: "ProjectGridGalleryProps",
    exampleUsage: `<ProjectGridGallery
  heading="Projects"
  subheading="Recent work"
  projects={[
    { title: "Website Design", category: "Web", image: "/project1.jpg", link: "#" }
  ]}
/>`.trim(),
  },
  "project-grid-motion": {
    id: "project-grid-motion",
    name: "Project Grid Motion",
    description:
      "A grid of project cards with Framer Motion animations. Cards feature staggered entrance animations, hover scale effects, and smooth transitions. Each card displays an image, title, and category. Perfect for portfolios that want to add visual interest through motion.",
    semanticTags: [
      "project-list",
      "portfolio",
      "projects",
      "grid",
      "motion",
      "animation",
      "framer-motion",
      "staggered",
      "hover",
    ],
    category: "project-list",
    component: ProjectGridMotion,
    props: "ProjectGridMotionProps",
    exampleUsage: `<ProjectGridMotion
  heading="Portfolio"
  subheading="Animated showcase"
  projects={[
    { title: "App Design", category: "Mobile", image: "/project1.jpg", link: "#" }
  ]}
/>`.trim(),
  },
  "project-horizontal-cards": {
    id: "project-horizontal-cards",
    name: "Project Horizontal Cards",
    description:
      "Wide horizontal cards with image sidebar and detailed metadata. Each card displays a landscape image on the left with title, description, client info, role, technologies, year, and CTA link on the right. Perfect for case studies or detailed project showcases.",
    semanticTags: [
      "project-list",
      "portfolio",
      "projects",
      "horizontal",
      "cards",
      "detailed",
      "case-study",
      "metadata",
      "technologies",
    ],
    category: "project-list",
    component: ProjectHorizontalCards,
    props: "ProjectHorizontalCardsProps",
    exampleUsage: `<ProjectHorizontalCards
  heading="Case Studies"
  subheading="Detailed project showcase"
  projects={[
    { title: "E-commerce Platform", image: "/project1.jpg", description: "Full-stack solution", client: "Retail Co", role: "Lead Developer", technologies: ["React", "Node.js"], year: "2023", link: "#" }
  ]}
/>`.trim(),
  },
  "project-hover-reveal-grid": {
    id: "project-hover-reveal-grid",
    name: "Project Hover Reveal Grid",
    description:
      "A grid of project cards with content revealed on hover. Each card displays a full-bleed image that darkens on hover to reveal title, category, and description. The reveal animation creates an engaging interactive experience. Perfect for visual-first portfolios.",
    semanticTags: [
      "project-list",
      "portfolio",
      "projects",
      "grid",
      "hover",
      "reveal",
      "overlay",
      "interactive",
      "visual",
    ],
    category: "project-list",
    component: ProjectHoverRevealGrid,
    props: "ProjectHoverRevealGridProps",
    exampleUsage: `<ProjectHoverRevealGrid
  heading="Portfolio"
  subheading="Hover to explore"
  projects={[
    { title: "Brand Identity", category: "Branding", description: "Visual identity system", image: "/project1.jpg", link: "#" }
  ]}
/>`.trim(),
  },
  "project-interactive-hover-reveal": {
    id: "project-interactive-hover-reveal",
    name: "Project Interactive Hover Reveal",
    description:
      "A three-column grid with expanded content on hover. Cards display full-bleed images with gradient overlays. In default state, only category and title are visible. On hover, description and 'View Project' link appear with smooth transitions. Perfect for design portfolios and creative showcases.",
    semanticTags: [
      "project-list",
      "portfolio",
      "projects",
      "grid",
      "interactive",
      "hover",
      "reveal",
      "three-column",
      "gradient",
    ],
    category: "project-list",
    component: ProjectInteractiveHoverReveal,
    props: "ProjectInteractiveHoverRevealProps",
    exampleUsage: `<ProjectInteractiveHoverReveal
  heading="Portfolio Highlights"
  subheading="Explore featured work"
  projects={[
    { title: "Photography Portfolio", category: "Web Design", description: "Minimalist website", image: "/project1.jpg", link: "#" }
  ]}
/>`.trim(),
  },
  "project-masonry-columns": {
    id: "project-masonry-columns",
    name: "Project Masonry Columns",
    description:
      "A masonry-style grid with varying card heights for visual interest. Cards are distributed across columns with different aspect ratios creating a Pinterest-like layout. Each card displays an image with hover overlay showing title and category. Perfect for photography or design portfolios.",
    semanticTags: [
      "project-list",
      "portfolio",
      "projects",
      "masonry",
      "pinterest",
      "columns",
      "varying-heights",
      "photography",
      "design",
    ],
    category: "project-list",
    component: ProjectMasonryColumns,
    props: "ProjectMasonryColumnsProps",
    exampleUsage: `<ProjectMasonryColumns
  heading="Gallery"
  subheading="Masonry layout"
  projects={[
    { title: "Photo Series", category: "Photography", image: "/project1.jpg", link: "#" }
  ]}
/>`.trim(),
  },
  "project-nature-mosaic": {
    id: "project-nature-mosaic",
    name: "Project Nature Mosaic",
    description:
      "A mosaic grid layout with varying card sizes for visual hierarchy. Features a mix of large and small cards arranged in an asymmetric pattern. Each card displays an image with hover effects. Perfect for photography portfolios or nature-themed showcases.",
    semanticTags: [
      "project-list",
      "portfolio",
      "projects",
      "mosaic",
      "asymmetric",
      "varying-sizes",
      "photography",
      "nature",
      "visual-hierarchy",
    ],
    category: "project-list",
    component: ProjectNatureMosaic,
    props: "ProjectNatureMosaicProps",
    exampleUsage: `<ProjectNatureMosaic
  heading="Nature Gallery"
  subheading="Mosaic showcase"
  images={["/image1.jpg", "/image2.jpg", "/image3.jpg"]}
/>`.trim(),
  },
  "project-scroll-reveal": {
    id: "project-scroll-reveal",
    name: "Project Scroll Reveal",
    description:
      "A scroll-triggered reveal layout with staggered animations. Projects appear as the user scrolls down the page with fade-in and slide-up effects. Each card displays an image, title, description, and technology badges. Perfect for storytelling portfolios and case study pages.",
    semanticTags: [
      "project-list",
      "portfolio",
      "projects",
      "scroll",
      "reveal",
      "animation",
      "staggered",
      "storytelling",
      "case-study",
    ],
    category: "project-list",
    component: ProjectScrollReveal,
    props: "ProjectScrollRevealProps",
    exampleUsage: `<ProjectScrollReveal
  heading="Our Work"
  subheading="Scroll to explore"
  projects={[
    { title: "E-commerce Platform", description: "Full-stack solution", image: "/project1.jpg", technologies: ["React", "Node.js"], link: "#" }
  ]}
/>`.trim(),
  },
  "project-showcase-alternating": {
    id: "project-showcase-alternating",
    name: "Project Showcase Alternating",
    description:
      "An alternating layout with large images and detailed content sections. Projects alternate between image-left and image-right layouts. Each section includes title, description, and CTA link. Perfect for detailed project showcases and case study presentations.",
    semanticTags: [
      "project-list",
      "portfolio",
      "projects",
      "alternating",
      "showcase",
      "detailed",
      "case-study",
      "large-images",
      "cta",
    ],
    category: "project-list",
    component: ProjectShowcaseAlternating,
    props: "ProjectShowcaseAlternatingProps",
    exampleUsage: `<ProjectShowcaseAlternating
  heading="Featured Work"
  subheading="Detailed showcase"
  projects={[
    { title: "Brand Redesign", description: "Complete visual overhaul", image: "/project1.jpg", link: "#" }
  ]}
/>`.trim(),
  },
  "project-sticky-scroll": {
    id: "project-sticky-scroll",
    name: "Project Sticky Scroll",
    description:
      "A scroll-driven content reveal with sticky gradient sidebar. Features a scrollable container with text content on the left and a sticky gradient panel on the right that changes color as you scroll. Each section has a title and description that fade based on scroll position. Perfect for storytelling and case study walkthroughs.",
    semanticTags: [
      "project-list",
      "portfolio",
      "projects",
      "sticky",
      "scroll",
      "gradient",
      "storytelling",
      "case-study",
      "walkthrough",
    ],
    category: "project-list",
    component: ProjectStickyScroll,
    props: "ProjectStickyScrollProps",
    exampleUsage: `<ProjectStickyScroll
  content={[
    { title: "Discovery Phase", description: "Understanding the problem space and user needs." },
    { title: "Design Phase", description: "Creating wireframes and visual designs." }
  ]}
/>`.trim(),
  },
  "project-studio-hover-preview": {
    id: "project-studio-hover-preview",
    name: "Project Studio Hover Preview",
    description:
      "A studio-style project list with hover image previews. Displays projects as a vertical list with title, category, and year. On hover, a preview image appears alongside the list item. Perfect for design studios and creative agencies with a minimalist aesthetic.",
    semanticTags: [
      "project-list",
      "portfolio",
      "projects",
      "studio",
      "hover",
      "preview",
      "list",
      "minimalist",
      "agency",
    ],
    category: "project-list",
    component: ProjectStudioHoverPreview,
    props: "ProjectStudioHoverPreviewProps",
    exampleUsage: `<ProjectStudioHoverPreview
  heading="Selected Work"
  subheading="Hover to preview"
  projects={[
    { title: "Brand Identity", category: "Branding", year: "2023", image: "/project1.jpg", link: "#" }
  ]}
/>`.trim(),
  },
  "project-table-list": {
    id: "project-table-list",
    name: "Project Table List",
    description:
      "A table-style project list with sortable columns. Displays projects in rows with columns for title, category, year, and status. Includes hover effects and optional sorting functionality. Perfect for portfolios that need to display many projects in a compact format.",
    semanticTags: [
      "project-list",
      "portfolio",
      "projects",
      "table",
      "list",
      "sortable",
      "compact",
      "data",
      "organized",
    ],
    category: "project-list",
    component: ProjectTableList,
    props: "ProjectTableListProps",
    exampleUsage: `<ProjectTableList
  heading="All Projects"
  subheading="Complete project list"
  projects={[
    { title: "Website Redesign", category: "Web", year: "2023", status: "Completed", link: "#" }
  ]}
/>`.trim(),
  },
  "project-video-carousel": {
    id: "project-video-carousel",
    name: "Project Video Carousel",
    description:
      "A carousel of project cards with video thumbnails. Each card displays a video that plays on hover with title and category overlay. Navigation arrows and dot indicators provide carousel control. Perfect for video production portfolios or motion design showcases.",
    semanticTags: [
      "project-list",
      "portfolio",
      "projects",
      "carousel",
      "video",
      "motion",
      "production",
      "hover-play",
      "multimedia",
    ],
    category: "project-list",
    component: ProjectVideoCarousel,
    props: "ProjectVideoCarouselProps",
    exampleUsage: `<ProjectVideoCarousel
  heading="Video Work"
  subheading="Motion design showcase"
  projects={[
    { title: "Brand Animation", category: "Motion", video: "/video1.mp4", thumbnail: "/thumb1.jpg", link: "#" }
  ]}
/>`.trim(),
  },
  "project-video-hover-bento": {
    id: "project-video-hover-bento",
    name: "Project Video Hover Bento",
    description:
      "A bento-style grid with video hover effects. Features a mix of large and small cards arranged in an asymmetric bento box layout. Videos play on hover with title and category overlays. Perfect for creative portfolios with video content.",
    semanticTags: [
      "project-list",
      "portfolio",
      "projects",
      "bento",
      "video",
      "hover",
      "asymmetric",
      "creative",
      "multimedia",
    ],
    category: "project-list",
    component: ProjectVideoHoverBento,
    props: "ProjectVideoHoverBentoProps",
    exampleUsage: `<ProjectVideoHoverBento
  heading="Creative Work"
  subheading="Bento video showcase"
  projects={[
    { title: "Motion Graphics", category: "Animation", video: "/video1.mp4", thumbnail: "/thumb1.jpg", link: "#" }
  ]}
/>`.trim(),
  },
  "project-video-hover-grid": {
    id: "project-video-hover-grid",
    name: "Project Video Hover Grid",
    description:
      "A grid of project cards with video hover effects. Each card displays a thumbnail image that transitions to video playback on hover. Title and category appear as overlays. Perfect for video production portfolios or motion design showcases.",
    semanticTags: [
      "project-list",
      "portfolio",
      "projects",
      "grid",
      "video",
      "hover",
      "production",
      "motion",
      "multimedia",
    ],
    category: "project-list",
    component: ProjectVideoHoverGrid,
    props: "ProjectVideoHoverGridProps",
    exampleUsage: `<ProjectVideoHoverGrid
  heading="Video Portfolio"
  subheading="Hover to play"
  projects={[
    { title: "Commercial", category: "Video", video: "/video1.mp4", thumbnail: "/thumb1.jpg", link: "#" }
  ]}
/>`.trim(),
  },
  "project-video-hover-rounded": {
    id: "project-video-hover-rounded",
    name: "Project Video Hover Rounded",
    description:
      "A grid of rounded project cards with video hover effects. Each card has large border radius and displays a thumbnail that transitions to video on hover. Title and category appear as overlays. Perfect for modern, friendly portfolio designs.",
    semanticTags: [
      "project-list",
      "portfolio",
      "projects",
      "grid",
      "video",
      "rounded",
      "modern",
      "friendly",
      "hover",
    ],
    category: "project-list",
    component: ProjectVideoHoverRounded,
    props: "ProjectVideoHoverRoundedProps",
    exampleUsage: `<ProjectVideoHoverRounded
  heading="Video Work"
  subheading="Modern showcase"
  projects={[
    { title: "Product Video", category: "Commercial", video: "/video1.mp4", thumbnail: "/thumb1.jpg", link: "#" }
  ]}
/>`.trim(),
  },
  "project-video-hover-stack": {
    id: "project-video-hover-stack",
    name: "Project Video Hover Stack",
    description:
      "A stacked layout of project cards with video hover effects. Cards are displayed in a vertical stack with full-width videos that play on hover. Each card includes title, category, and description. Perfect for video portfolios that want to emphasize individual projects.",
    semanticTags: [
      "project-list",
      "portfolio",
      "projects",
      "stack",
      "video",
      "hover",
      "full-width",
      "vertical",
      "emphasis",
    ],
    category: "project-list",
    component: ProjectVideoHoverStack,
    props: "ProjectVideoHoverStackProps",
    exampleUsage: `<ProjectVideoHoverStack
  heading="Featured Videos"
  subheading="Stacked showcase"
  projects={[
    { title: "Documentary", category: "Film", description: "Award-winning film", video: "/video1.mp4", thumbnail: "/thumb1.jpg", link: "#" }
  ]}
/>`.trim(),
  },
  "project-video-hover-two-by-two": {
    id: "project-video-hover-two-by-two",
    name: "Project Video Hover Two By Two",
    description:
      "A 2x2 grid of project cards with video hover effects. Each card displays a thumbnail that transitions to video playback on hover. Title and category appear as overlays. Perfect for showcasing a curated selection of video projects in a balanced layout.",
    semanticTags: [
      "project-list",
      "portfolio",
      "projects",
      "grid",
      "video",
      "2x2",
      "curated",
      "balanced",
      "hover",
    ],
    category: "project-list",
    component: ProjectVideoHoverTwoByTwo,
    props: "ProjectVideoHoverTwoByTwoProps",
    exampleUsage: `<ProjectVideoHoverTwoByTwo
  heading="Selected Videos"
  subheading="Curated showcase"
  projects={[
    { title: "Brand Film", category: "Commercial", video: "/video1.mp4", thumbnail: "/thumb1.jpg", link: "#" }
  ]}
/>`.trim(),
  },
  "project-work-showcase": {
    id: "project-work-showcase",
    name: "Project Work Showcase",
    description:
      "Work experience cards with embedded project galleries. Each card displays role, company, duration, description, technology badges, and a grid of related projects. Stacked full-width cards create a comprehensive work history. Perfect for professional portfolios and career showcases.",
    semanticTags: [
      "project-list",
      "portfolio",
      "experience",
      "work",
      "career",
      "technologies",
      "gallery",
      "professional",
      "resume",
    ],
    category: "project-list",
    component: ProjectWorkShowcase,
    props: "ProjectWorkShowcaseProps",
    exampleUsage: `<ProjectWorkShowcase
  heading="Work Experience"
  subheading="Professional journey"
  experiences={[
    { role: "Senior Developer", company: "Tech Corp", duration: "2020-2023", description: "Led development", technologies: ["React", "Node.js"], projects: [{ title: "E-commerce", image: "/project1.jpg", description: "Platform", link: "#" }] }
  ]}
/>`.trim(),
  },
  "project-zigzag-layout": {
    id: "project-zigzag-layout",
    name: "Project Zigzag Layout",
    description:
      "An alternating image-content layout with technology badges. Projects alternate between image-left and image-right layouts. Each section includes title, category, description, technology badges, and CTA link. Perfect for detailed project showcases and case study presentations.",
    semanticTags: [
      "project-list",
      "portfolio",
      "projects",
      "zigzag",
      "alternating",
      "technologies",
      "case-study",
      "detailed",
      "cta",
    ],
    category: "project-list",
    component: ProjectZigzagLayout,
    props: "ProjectZigzagLayoutProps",
    exampleUsage: `<ProjectZigzagLayout
  heading="Featured Projects"
  subheading="Detailed showcase"
  projects={[
    { id: 1, title: "E-commerce Platform", category: "Web Development", description: "Full-stack solution", image: "/project1.jpg", technologies: ["React", "Node.js"], link: "#" }
  ]}
/>`.trim(),
  },

  // List components
  "list-service-category-table": {
    id: "list-service-category-table",
    name: "Service Category Table",
    description:
      "A responsive table displaying service categories with icons, descriptions, years, offer types, and market segments. Features color-coded offer indicators and a mobile-optimized layout that collapses columns into a compact view. Ideal for showcasing product catalogs, service offerings, or feature comparisons in a structured, scannable format.",
    semanticTags: [
      "list",
      "table",
      "services",
      "categories",
      "products",
      "catalog",
      "offerings",
      "responsive",
      "data-table",
      "comparison",
    ],
    category: "list",
    component: ListServiceCategoryTable,
    props: "ListServiceCategoryTableProps",
    exampleUsage: `<ListServiceCategoryTable
  items={[
    {
      icon: "lucide/shield",
      category: "Security",
      description: "Enterprise security solution",
      year: 2024,
      offer: "Professional",
      segment: "Business"
    }
  ]}
/>`.trim(),
  },
  "list-achievements-showcase": {
    id: "list-achievements-showcase",
    name: "Achievements Showcase",
    description:
      "A vertical list displaying achievements and recognition with icons, titles, categories, descriptions, and action links. Each item is separated by dividers and features a responsive grid layout that adapts to mobile screens. Perfect for showcasing awards, certifications, milestones, or company achievements in a professional, scannable format.",
    semanticTags: [
      "list",
      "achievements",
      "awards",
      "recognition",
      "milestones",
      "certifications",
      "accomplishments",
      "portfolio",
      "showcase",
    ],
    category: "list",
    component: ListAchievementsShowcase,
    props: "ListAchievementsShowcaseProps",
    exampleUsage: `<ListAchievementsShowcase
  heading="Our Achievements & Recognition"
  items={[
    {
      icon: "lucide/trophy",
      title: "Industry Recognition",
      category: "Achievement",
      description: "Outstanding Performance Award.",
      link: "/achievements/recognition"
    }
  ]}
  buttonText="View project"
/>`.trim(),
  },
  "list-career-timeline": {
    id: "list-career-timeline",
    name: "Career Timeline",
    description:
      "A two-section timeline displaying professional experience and achievements/awards. Features a bold heading, experience history with roles and companies, and a comprehensive awards section with organizations. Perfect for portfolio pages, about sections, or resume-style presentations showcasing career progression and professional recognition.",
    semanticTags: [
      "list",
      "timeline",
      "career",
      "experience",
      "resume",
      "cv",
      "portfolio",
      "professional",
      "awards",
      "history",
    ],
    category: "list",
    component: ListCareerTimeline,
    props: "ListCareerTimelineProps",
    exampleUsage: `<ListCareerTimeline
  sectionLabel="/ CAREER PATH"
  heading={<>BUILDING SOLUTIONS,<br /> SHAPING THE FUTURE</>}
  experienceLabel="/ EXPERIENCE"
  experiences={[
    { year: "2019 - PRESENT", role: "SENIOR SOFTWARE ENGINEER", company: "TECH CORP" }
  ]}
  achievementsLabel="/ ACHIEVEMENTS"
  awards={[
    { year: "2023", title: "BEST SOFTWARE ENGINEER", organization: "TECH AWARDS" }
  ]}
/>`.trim(),
  },
  "list-metrics-dashboard": {
    id: "list-metrics-dashboard",
    name: "Metrics Dashboard",
    description:
      "A comprehensive metrics dashboard with tabbed category filtering, status indicators, change percentages, and tooltips. Features a mobile-friendly dropdown for category selection and a responsive grid layout for metric items. Perfect for admin dashboards, analytics pages, or status monitoring displays showcasing KPIs across multiple categories like performance, security, users, and business.",
    semanticTags: [
      "list",
      "metrics",
      "dashboard",
      "analytics",
      "kpi",
      "statistics",
      "monitoring",
      "performance",
      "tabs",
      "status",
    ],
    category: "list",
    component: ListMetricsDashboard,
    props: "ListMetricsDashboardProps",
    exampleUsage: `<ListMetricsDashboard
  badgeText="System Metrics"
  heading="Platform Health & Performance"
  description="Key metrics across our infrastructure, security, and business operations."
  metrics={[
    {
      id: "uptime",
      icon: "lucide/server",
      name: "System Uptime",
      value: "99.99%",
      changePercentage: 0.02,
      status: "positive",
      category: "performance"
    }
  ]}
  dashboardLinkText="View complete dashboard"
  dashboardLinkUrl="/dashboard"
/>`.trim(),
  },
  "list-feature-comparison": {
    id: "list-feature-comparison",
    name: "Feature Comparison",
    description:
      "A hero-style feature comparison table with pricing tiers, trust indicators, and call-to-action buttons. Displays features across Basic, Pro, and Enterprise plans with check/X icons for availability. Perfect for pricing pages, plan comparison sections, or feature matrices that help users choose the right tier for their needs.",
    semanticTags: [
      "list",
      "comparison",
      "pricing",
      "features",
      "plans",
      "tiers",
      "table",
      "hero",
      "cta",
      "trust-indicators",
    ],
    category: "list",
    component: ListFeatureComparison,
    props: "ListFeatureComparisonProps",
    exampleUsage: `<ListFeatureComparison
  badgeText="New Enterprise Plan Available"
  heading="Choose the perfect plan for your needs"
  description="From startups to enterprises, we have a plan that scales with your business."
  features={[
    { name: "Unlimited Projects", basic: false, pro: true, enterprise: true },
    { name: "API Access", basic: true, pro: true, enterprise: true }
  ]}
  primaryButtonText="Get Started"
  primaryButtonUrl="/signup"
  trustIndicators={[
    { icon: "lucide/users", title: "50,000+ Users", description: "Join our community" }
  ]}
/>`.trim(),
  },
  "list-searchable-grid": {
    id: "list-searchable-grid",
    name: "Searchable Resource Grid",
    description:
      "A searchable grid of cards with optional icons and tags, plus a keyword input and empty-state messaging. Ideal for resource libraries, catalogs, or partner directories that need fast filtering.",
    semanticTags: [
      "list",
      "search",
      "filter",
      "grid",
      "resources",
      "catalog",
      "directory",
      "cards",
      "tags",
    ],
    category: "list",
    component: ListSearchableGrid,
    props: "ListSearchableGridProps",
    exampleUsage: `<ListSearchableGrid />`.trim(),
  },

  // Offer Modal components
  "offer-modal-newsletter-discount": {
    id: "offer-modal-newsletter-discount",
    name: "Newsletter Discount Offer Modal",
    description:
      "A compact newsletter signup modal positioned at the bottom-right of the screen. Features a clean design with a close button, compelling headline, email input field, and subscribe CTA button. Perfect for e-commerce sites offering first-purchase discounts, newsletter signup incentives, or promotional offers. The non-intrusive positioning allows users to continue browsing while the offer remains visible.",
    semanticTags: [
      "offer",
      "modal",
      "newsletter",
      "discount",
      "popup",
      "email-capture",
      "subscription",
      "promotion",
      "e-commerce",
      "lead-generation",
      "bottom-right",
      "non-intrusive",
    ],
    category: "offer-modal",
    component: OfferModalNewsletterDiscount,
    props: "OfferModalNewsletterDiscountProps",
    exampleUsage: `<OfferModalNewsletterDiscount
  title="Join our newsletter and enjoy 35% off your first order"
  emailPlaceholder="Email"
  buttonText="Subscribe"
  closeButtonText="Close"
  defaultOpen={true}
  onSubmit={(email) => console.log('Subscribed:', email)}
/>`.trim(),
  },
  "offer-modal-membership-image": {
    id: "offer-modal-membership-image",
    name: "Membership Offer Modal with Image",
    description:
      "A visually rich membership offer modal featuring a header image, overline text, compelling title, email signup form with mail icon, and descriptive footer text. Includes responsive design with mobile-optimized layout (arrow button on mobile, full-width button on desktop) and hover animations on the close button. The image header creates visual impact while the form captures leads. Ideal for e-commerce membership programs, exclusive offers, premium newsletter signups, or VIP access promotions.",
    semanticTags: [
      "offer",
      "modal",
      "membership",
      "image",
      "signup",
      "email-capture",
      "promotion",
      "e-commerce",
      "lead-generation",
      "premium",
      "vip",
      "exclusive",
      "responsive",
      "form-validation",
    ],
    category: "offer-modal",
    component: OfferModalMembershipImage,
    props: "OfferModalMembershipImageProps",
    exampleUsage: `<OfferModalMembershipImage
  overline="Treat Yourself!"
  title="Become a Member & Enjoy 20% Off"
  description="Sign up to receive our latest updates — you can unsubscribe whenever you like."
  image={{ src: "/promo.jpg", alt: "Promotional image" }}
  emailPlaceholder="Email Address"
  buttonText="Get Offer"
  defaultOpen={true}
  onSubmit={(email) => console.log('Subscribed:', email)}
/>`.trim(),
  },
  "offer-modal-sheet-newsletter": {
    id: "offer-modal-sheet-newsletter",
    name: "Sheet-Style Newsletter Offer Modal",
    description:
      "A side-sheet style newsletter signup modal that slides in from the right side of the screen. Features a logo, compelling headline, description, email signup form with rounded inputs, legal consent links (Terms of Use and Privacy Policy), and a square aspect ratio promotional image. The sheet design provides a more immersive experience while maintaining easy dismissal via the close button with rotation animation. Perfect for premium brands, lifestyle products, fashion e-commerce, or any site wanting a sophisticated newsletter capture experience with strong visual branding.",
    semanticTags: [
      "offer",
      "modal",
      "sheet",
      "newsletter",
      "sidebar",
      "slide-in",
      "email-capture",
      "subscription",
      "promotion",
      "premium",
      "branding",
      "logo",
      "terms",
      "privacy",
      "lifestyle",
      "fashion",
    ],
    category: "offer-modal",
    component: OfferModalSheetNewsletter,
    props: "OfferModalSheetNewsletterProps",
    exampleUsage: `<OfferModalSheetNewsletter
  logo={{ src: "/logo.png", alt: "Brand Logo" }}
  title="Join Now & Enjoy 20% Off"
  description="Join our mailing list for updates and offers. You can unsubscribe at any time."
  image={{ src: "/promo.jpg", alt: "Promotional image" }}
  emailPlaceholder="Email Address"
  buttonText="Join"
  termsUrl="/terms"
  privacyUrl="/privacy"
  defaultOpen={true}
  onSubmit={(email) => console.log('Subscribed:', email)}
/>`.trim(),
  },

  // Project Detail components
  "project-detail-hero-metadata": {
    id: "project-detail-hero-metadata",
    name: "Project Detail Hero with Metadata",
    description:
      "A project detail page layout featuring a large hero image with overlaid title, followed by a metadata section displaying project details like category, year, and artist. Includes a description section and a gallery grid. Ideal for portfolio sites, art galleries, and creative showcases.",
    semanticTags: [
      "project",
      "portfolio",
      "detail",
      "hero",
      "metadata",
      "gallery",
      "art",
      "creative",
      "showcase",
      "case-study",
    ],
    category: "project-detail",
    component: ProjectDetailHeroMetadata,
    props: "ProjectDetailHeroMetadataProps",
    exampleUsage: `<ProjectDetailHeroMetadata
  title="Ethereal Horizons"
  category="Digital Art"
  year="2024"
  artist="Jane Smith"
  heroImage={{ src: "/hero.jpg", alt: "Project hero" }}
  description="A stunning digital art piece exploring the boundaries of light and shadow."
  galleryImages={[
    { src: "/gallery1.jpg", alt: "Gallery 1" },
    { src: "/gallery2.jpg", alt: "Gallery 2" },
  ]}
/>`.trim(),
  },
  "project-detail-sidebar-sticky": {
    id: "project-detail-sidebar-sticky",
    name: "Project Detail with Sticky Sidebar",
    description:
      "A two-column project detail layout with a sticky sidebar containing project metadata and navigation. The main content area displays a hero image, description, and gallery. The sidebar remains visible while scrolling through the content. Perfect for detailed project pages with extensive information.",
    semanticTags: [
      "project",
      "portfolio",
      "detail",
      "sidebar",
      "sticky",
      "navigation",
      "metadata",
      "gallery",
      "two-column",
    ],
    category: "project-detail",
    component: ProjectDetailSidebarSticky,
    props: "ProjectDetailSidebarStickyProps",
    exampleUsage: `<ProjectDetailSidebarSticky
  title="Urban Perspectives"
  subtitle="A photographic journey through city landscapes"
  category="Photography"
  year="2024"
  client="City Magazine"
  heroImage={{ src: "/hero.jpg", alt: "Project hero" }}
  description="Exploring the hidden beauty of urban environments."
  galleryImages={[
    { src: "/gallery1.jpg", alt: "Gallery 1", caption: "Downtown at dusk" },
  ]}
/>`.trim(),
  },
  "project-detail-case-study-prose": {
    id: "project-detail-case-study-prose",
    name: "Project Detail Case Study Prose",
    description:
      "A long-form case study layout with prose sections and inline images. Features a hero section with title and metadata, followed by multiple content sections with headings and body text. Ideal for detailed project write-ups, design case studies, and portfolio pieces that require extensive explanation.",
    semanticTags: [
      "project",
      "case-study",
      "prose",
      "long-form",
      "content",
      "detail",
      "portfolio",
      "design",
      "write-up",
    ],
    category: "project-detail",
    component: ProjectDetailCaseStudyProse,
    props: "ProjectDetailCaseStudyProseProps",
    exampleUsage: `<ProjectDetailCaseStudyProse
  title="Brand Redesign"
  category="Branding"
  year="2024"
  heroImage={{ src: "/hero.jpg", alt: "Project hero" }}
  sections={[
    { heading: "The Challenge", body: "Our client needed a fresh identity..." },
    { heading: "The Solution", body: "We developed a comprehensive brand system..." },
  ]}
/>`.trim(),
  },
  "project-detail-sidebar-navigation": {
    id: "project-detail-sidebar-navigation",
    name: "Project Detail with Sidebar Navigation",
    description:
      "A project detail layout with a sidebar containing section navigation links. Users can click navigation items to scroll to specific sections. Features a hero image, multiple content sections with images, and smooth scroll behavior. Perfect for long project pages with distinct sections.",
    semanticTags: [
      "project",
      "portfolio",
      "detail",
      "sidebar",
      "navigation",
      "sections",
      "scroll",
      "anchor-links",
      "table-of-contents",
    ],
    category: "project-detail",
    component: ProjectDetailSidebarNavigation,
    props: "ProjectDetailSidebarNavigationProps",
    exampleUsage: `<ProjectDetailSidebarNavigation
  title="Product Launch Campaign"
  subtitle="A multi-channel marketing initiative"
  heroImage={{ src: "/hero.jpg", alt: "Project hero" }}
  sections={[
    { id: "overview", title: "Overview", content: "Campaign overview...", image: { src: "/img1.jpg", alt: "Overview" } },
    { id: "strategy", title: "Strategy", content: "Our strategic approach...", image: { src: "/img2.jpg", alt: "Strategy" } },
  ]}
/>`.trim(),
  },
  "project-detail-fullscreen-hero": {
    id: "project-detail-fullscreen-hero",
    name: "Project Detail Fullscreen Hero",
    description:
      "A dramatic project detail layout with a fullscreen hero image that fills the viewport. Title and metadata overlay the hero with a gradient for readability. Content sections follow below with alternating layouts. Ideal for visually striking portfolio pieces and creative showcases.",
    semanticTags: [
      "project",
      "portfolio",
      "detail",
      "fullscreen",
      "hero",
      "dramatic",
      "visual",
      "creative",
      "immersive",
    ],
    category: "project-detail",
    component: ProjectDetailFullscreenHero,
    props: "ProjectDetailFullscreenHeroProps",
    exampleUsage: `<ProjectDetailFullscreenHero
  title="Mountain Expedition"
  category="Adventure Photography"
  year="2024"
  heroImage={{ src: "/hero.jpg", alt: "Mountain landscape" }}
  sections={[
    { heading: "The Journey", body: "A 30-day expedition...", image: { src: "/img1.jpg", alt: "Journey" } },
  ]}
/>`.trim(),
  },
  "project-detail-sculpture-showcase": {
    id: "project-detail-sculpture-showcase",
    name: "Project Detail Sculpture Showcase",
    description:
      "A gallery-focused project detail layout designed for showcasing physical artworks like sculptures. Features a large hero image with title overlay, detailed specifications section, and a masonry-style gallery. Includes dimensions, materials, and exhibition information. Perfect for artists and galleries.",
    semanticTags: [
      "project",
      "portfolio",
      "detail",
      "sculpture",
      "art",
      "gallery",
      "exhibition",
      "physical-art",
      "specifications",
      "masonry",
    ],
    category: "project-detail",
    component: ProjectDetailSculptureShowcase,
    props: "ProjectDetailSculptureShowcaseProps",
    exampleUsage: `<ProjectDetailSculptureShowcase
  title="Metamorphosis"
  artist="John Doe"
  year="2024"
  heroImage={{ src: "/hero.jpg", alt: "Sculpture" }}
  dimensions="48 x 24 x 36 inches"
  materials="Bronze, Steel"
  exhibition="Modern Art Museum"
  description="A transformative piece exploring change and growth."
  galleryImages={[
    { src: "/gallery1.jpg", alt: "Detail view 1" },
  ]}
/>`.trim(),
  },
  "project-detail-grid-gallery": {
    id: "project-detail-grid-gallery",
    name: "Project Detail Grid Gallery",
    description:
      "A project detail layout emphasizing a grid-based image gallery. Features a compact header with title and metadata, followed by a responsive grid of project images. Each image can have a caption. Ideal for photography portfolios, product showcases, and visual-heavy projects.",
    semanticTags: [
      "project",
      "portfolio",
      "detail",
      "grid",
      "gallery",
      "images",
      "photography",
      "visual",
      "responsive",
    ],
    category: "project-detail",
    component: ProjectDetailGridGallery,
    props: "ProjectDetailGridGalleryProps",
    exampleUsage: `<ProjectDetailGridGallery
  title="Summer Collection"
  category="Fashion"
  year="2024"
  description="Our latest summer fashion collection featuring bold colors and patterns."
  images={[
    { src: "/img1.jpg", alt: "Look 1", caption: "Sunset dress" },
    { src: "/img2.jpg", alt: "Look 2", caption: "Ocean breeze top" },
  ]}
/>`.trim(),
  },
  "project-detail-split-materials": {
    id: "project-detail-split-materials",
    name: "Project Detail Split Materials",
    description:
      "A split-layout project detail page with materials and specifications on one side and images on the other. Features a hero section, detailed specs list, and gallery. Perfect for product design, industrial design, and projects where materials and construction details are important.",
    semanticTags: [
      "project",
      "portfolio",
      "detail",
      "split",
      "materials",
      "specifications",
      "product-design",
      "industrial",
      "technical",
    ],
    category: "project-detail",
    component: ProjectDetailSplitMaterials,
    props: "ProjectDetailSplitMaterialsProps",
    exampleUsage: `<ProjectDetailSplitMaterials
  title="Ergonomic Chair"
  category="Furniture Design"
  year="2024"
  heroImage={{ src: "/hero.jpg", alt: "Chair" }}
  description="A revolutionary ergonomic chair designed for all-day comfort."
  specifications={[
    { label: "Material", value: "Recycled aluminum, mesh fabric" },
    { label: "Dimensions", value: "28W x 26D x 42H inches" },
  ]}
  galleryImages={[
    { src: "/gallery1.jpg", alt: "Side view" },
  ]}
/>`.trim(),
  },
  "project-detail-compact-metadata": {
    id: "project-detail-compact-metadata",
    name: "Project Detail Compact Metadata",
    description:
      "A compact project detail layout with metadata displayed in a horizontal bar. Features a hero image, inline metadata items, description, and gallery. Space-efficient design ideal for projects with multiple metadata fields that need to be visible at a glance.",
    semanticTags: [
      "project",
      "portfolio",
      "detail",
      "compact",
      "metadata",
      "horizontal",
      "efficient",
      "inline",
    ],
    category: "project-detail",
    component: ProjectDetailCompactMetadata,
    props: "ProjectDetailCompactMetadataProps",
    exampleUsage: `<ProjectDetailCompactMetadata
  title="Mobile App Redesign"
  heroImage={{ src: "/hero.jpg", alt: "App screens" }}
  metadata={[
    { label: "Client", value: "TechCorp" },
    { label: "Year", value: "2024" },
    { label: "Role", value: "Lead Designer" },
  ]}
  description="A complete redesign of the mobile banking experience."
  galleryImages={[
    { src: "/gallery1.jpg", alt: "Screen 1" },
  ]}
/>`.trim(),
  },
  "project-detail-minimal-centered": {
    id: "project-detail-minimal-centered",
    name: "Project Detail Minimal Centered",
    description:
      "A minimalist, centered project detail layout with clean typography and generous whitespace. Features a centered title, subtitle, and description with a single hero image. Gallery images displayed in a simple grid. Perfect for elegant, understated portfolio presentations.",
    semanticTags: [
      "project",
      "portfolio",
      "detail",
      "minimal",
      "centered",
      "clean",
      "elegant",
      "whitespace",
      "typography",
    ],
    category: "project-detail",
    component: ProjectDetailMinimalCentered,
    props: "ProjectDetailMinimalCenteredProps",
    exampleUsage: `<ProjectDetailMinimalCentered
  title="Quiet Moments"
  subtitle="A meditation on stillness"
  heroImage={{ src: "/hero.jpg", alt: "Quiet scene" }}
  description="A photographic series exploring moments of peace in everyday life."
  galleryImages={[
    { src: "/gallery1.jpg", alt: "Moment 1" },
  ]}
/>`.trim(),
  },
  "project-detail-hover-gallery": {
    id: "project-detail-hover-gallery",
    name: "Project Detail Hover Gallery",
    description:
      "A project detail layout with an interactive hover-reveal gallery. Images display titles and descriptions on hover with smooth animations. Features a header section with back navigation, title, and metadata. Ideal for interactive portfolios and creative showcases.",
    semanticTags: [
      "project",
      "portfolio",
      "detail",
      "hover",
      "interactive",
      "gallery",
      "animation",
      "reveal",
      "creative",
    ],
    category: "project-detail",
    component: ProjectDetailHoverGallery,
    props: "ProjectDetailHoverGalleryProps",
    exampleUsage: `<ProjectDetailHoverGallery
  title="Interactive Installations"
  category="Digital Art"
  year="2024"
  backHref="/projects"
  images={[
    { src: "/img1.jpg", alt: "Installation 1", title: "Light Wave", description: "An immersive light experience" },
  ]}
/>`.trim(),
  },
  "project-detail-card-header": {
    id: "project-detail-card-header",
    name: "Project Detail Card Header",
    description:
      "A project detail layout with a card-based header containing the hero image and metadata. The card has rounded corners and a subtle shadow. Content and gallery follow below. Modern, polished design ideal for tech portfolios and SaaS case studies.",
    semanticTags: [
      "project",
      "portfolio",
      "detail",
      "card",
      "header",
      "modern",
      "polished",
      "tech",
      "saas",
      "rounded",
    ],
    category: "project-detail",
    component: ProjectDetailCardHeader,
    props: "ProjectDetailCardHeaderProps",
    exampleUsage: `<ProjectDetailCardHeader
  title="Dashboard Redesign"
  category="UI/UX"
  year="2024"
  artist="Design Team"
  heroImage={{ src: "/hero.jpg", alt: "Dashboard" }}
  description="A complete overhaul of the analytics dashboard."
  galleryImages={[
    { src: "/gallery1.jpg", alt: "Screen 1" },
  ]}
/>`.trim(),
  },
  "project-detail-exhibition-sidebar": {
    id: "project-detail-exhibition-sidebar",
    name: "Project Detail Exhibition Sidebar",
    description:
      "A project detail layout with a sidebar listing exhibition history and venues. Features a hero image, description, and gallery in the main content area. The sidebar displays past and upcoming exhibitions with dates and locations. Perfect for artists and galleries.",
    semanticTags: [
      "project",
      "portfolio",
      "detail",
      "exhibition",
      "sidebar",
      "venues",
      "art",
      "gallery",
      "history",
    ],
    category: "project-detail",
    component: ProjectDetailExhibitionSidebar,
    props: "ProjectDetailExhibitionSidebarProps",
    exampleUsage: `<ProjectDetailExhibitionSidebar
  title="Reflections"
  category="Mixed Media"
  year="2024"
  heroImage={{ src: "/hero.jpg", alt: "Artwork" }}
  description="A series exploring identity and self-perception."
  exhibitions={[
    { title: "Solo Show", venue: "Modern Gallery", date: "Jan 2024" },
  ]}
  galleryImages={[
    { src: "/gallery1.jpg", alt: "Piece 1" },
  ]}
/>`.trim(),
  },
  "project-detail-list-related": {
    id: "project-detail-list-related",
    name: "Project Detail with Related Projects List",
    description:
      "A project detail layout with a related projects section displayed as a list. Features a hero image, metadata, description, and gallery, followed by a list of related projects with thumbnails. Encourages exploration of similar work. Ideal for portfolio sites.",
    semanticTags: [
      "project",
      "portfolio",
      "detail",
      "related",
      "list",
      "thumbnails",
      "navigation",
      "exploration",
      "similar",
    ],
    category: "project-detail",
    component: ProjectDetailListRelated,
    props: "ProjectDetailListRelatedProps",
    exampleUsage: `<ProjectDetailListRelated
  title="Brand Identity"
  category="Branding"
  year="2024"
  heroImage={{ src: "/hero.jpg", alt: "Brand" }}
  description="A comprehensive brand identity system."
  galleryImages={[
    { src: "/gallery1.jpg", alt: "Logo" },
  ]}
  relatedProjects={[
    { title: "Website Design", category: "Web", year: "2024", thumbnail: { src: "/thumb1.jpg", alt: "Website" }, href: "/projects/website" },
  ]}
/>`.trim(),
  },
  "project-detail-architecture-carousel": {
    id: "project-detail-architecture-carousel",
    name: "Project Detail Architecture Carousel",
    description:
      "A project detail layout with a carousel for showcasing architectural or spatial projects. Features navigation controls, dot indicators, and multiple content sections with alternating image placement. Includes a detail grid at the bottom. Perfect for architecture and interior design portfolios.",
    semanticTags: [
      "project",
      "portfolio",
      "detail",
      "architecture",
      "carousel",
      "spatial",
      "interior",
      "navigation",
      "slides",
    ],
    category: "project-detail",
    component: ProjectDetailArchitectureCarousel,
    props: "ProjectDetailArchitectureCarouselProps",
    exampleUsage: `<ProjectDetailArchitectureCarousel
  title="Modern Residence"
  category="Architecture"
  year="2024"
  heroImage={{ src: "/hero.jpg", alt: "House exterior" }}
  carouselImages={[
    { src: "/slide1.jpg", alt: "Living room" },
    { src: "/slide2.jpg", alt: "Kitchen" },
  ]}
  sections={[
    { heading: "Design Concept", body: "A seamless blend of indoor and outdoor living.", image: { src: "/img1.jpg", alt: "Concept" } },
  ]}
  detailImages={[
    { src: "/detail1.jpg", alt: "Detail 1" },
  ]}
/>`.trim(),
  },
  "project-detail-fashion-editorial": {
    id: "project-detail-fashion-editorial",
    name: "Project Detail Fashion Editorial",
    description:
      "An editorial-style project detail layout designed for fashion and photography projects. Features a large title, hero image with portrait aspect ratio, credits sidebar listing team members, and a gallery of editorial images. Perfect for fashion shoots and creative collaborations.",
    semanticTags: [
      "project",
      "portfolio",
      "detail",
      "fashion",
      "editorial",
      "photography",
      "credits",
      "team",
      "portrait",
    ],
    category: "project-detail",
    component: ProjectDetailFashionEditorial,
    props: "ProjectDetailFashionEditorialProps",
    exampleUsage: `<ProjectDetailFashionEditorial
  title="AUTUMN COLLECTION"
  heroImage={{ src: "/hero.jpg", alt: "Fashion shoot" }}
  credits={[
    { role: "Photographer", name: "Jane Doe" },
    { role: "Stylist", name: "John Smith" },
  ]}
  galleryImages={[
    { src: "/gallery1.jpg", alt: "Look 1" },
  ]}
/>`.trim(),
  },
  "project-detail-photography-breadcrumb": {
    id: "project-detail-photography-breadcrumb",
    name: "Project Detail Photography Breadcrumb",
    description:
      "A project detail layout with breadcrumb navigation and a sticky sidebar. Features a two-column layout with metadata in the sidebar and images in the main content area. Breadcrumbs show the navigation path. Ideal for photography portfolios with organized categories.",
    semanticTags: [
      "project",
      "portfolio",
      "detail",
      "photography",
      "breadcrumb",
      "navigation",
      "sidebar",
      "sticky",
      "categories",
    ],
    category: "project-detail",
    component: ProjectDetailPhotographyBreadcrumb,
    props: "ProjectDetailPhotographyBreadcrumbProps",
    exampleUsage: `<ProjectDetailPhotographyBreadcrumb
  title="Street Photography"
  subtitle="Urban life in motion"
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "Photography", href: "/photography" },
    { label: "Street" },
  ]}
  metadata={[
    { label: "Location", value: "New York City" },
    { label: "Year", value: "2024" },
  ]}
  description="Capturing the energy and diversity of city streets."
  heroImage={{ src: "/hero.jpg", alt: "Street scene" }}
  galleryImages={[
    { src: "/gallery1.jpg", alt: "Photo 1" },
  ]}
/>`.trim(),
  },
  "project-detail-large-hero-featured": {
    id: "project-detail-large-hero-featured",
    name: "Project Detail Large Hero Featured",
    description:
      "A project detail layout with an extra-large hero section featuring gradient overlay and scroll-based opacity effects. Includes a details grid, multiple prose sections with alternating layouts, and a gallery. Dramatic and immersive design for featured projects.",
    semanticTags: [
      "project",
      "portfolio",
      "detail",
      "large-hero",
      "featured",
      "gradient",
      "scroll",
      "immersive",
      "dramatic",
    ],
    category: "project-detail",
    component: ProjectDetailLargeHeroFeatured,
    props: "ProjectDetailLargeHeroFeaturedProps",
    exampleUsage: `<ProjectDetailLargeHeroFeatured
  title="Epic Journey"
  heroImage={{ src: "/hero.jpg", alt: "Journey" }}
  details={[
    { label: "Duration", value: "6 months" },
    { label: "Location", value: "Global" },
  ]}
  sections={[
    { heading: "The Beginning", body: "It all started with a dream...", image: { src: "/img1.jpg", alt: "Start" } },
  ]}
  galleryImages={[
    { src: "/gallery1.jpg", alt: "Moment 1" },
  ]}
/>`.trim(),
  },
  "project-detail-tabbed-case-study": {
    id: "project-detail-tabbed-case-study",
    name: "Project Detail Tabbed Case Study",
    description:
      "A comprehensive case study layout with tabbed navigation for different sections like Overview, Challenge, Solution, and Results. Includes content sections, testimonials, and a tools/technologies section. Perfect for detailed project case studies and client work showcases.",
    semanticTags: [
      "project",
      "portfolio",
      "detail",
      "case-study",
      "tabs",
      "testimonial",
      "tools",
      "comprehensive",
      "client-work",
    ],
    category: "project-detail",
    component: ProjectDetailTabbedCaseStudy,
    props: "ProjectDetailTabbedCaseStudyProps",
    exampleUsage: `<ProjectDetailTabbedCaseStudy
  title="E-commerce Platform"
  heroImage={{ src: "/hero.jpg", alt: "Platform" }}
  tabs={[
    { id: "overview", label: "Overview" },
    { id: "challenge", label: "Challenge" },
  ]}
  contentSections={[
    { heading: "Project Goals", body: "Increase conversion rates...", image: { src: "/img1.jpg", alt: "Goals" } },
  ]}
  testimonial={{
    quote: "The results exceeded our expectations.",
    author: "CEO",
    role: "Client Company",
    avatar: { src: "/avatar.jpg", alt: "CEO" },
  }}
  tools={[
    { name: "React", icon: "react" },
    { name: "Node.js", icon: "nodejs" },
  ]}
/>`.trim(),
  },
  "project-detail-numbered-sections": {
    id: "project-detail-numbered-sections",
    name: "Project Detail Numbered Sections",
    description:
      "A project detail layout with large numbered section headings. Each section features a prominent number (01, 02, 03), title, description, and image with alternating left/right placement. Creates a clear visual hierarchy and reading flow. Ideal for process-oriented case studies.",
    semanticTags: [
      "project",
      "portfolio",
      "detail",
      "numbered",
      "sections",
      "process",
      "hierarchy",
      "alternating",
      "steps",
    ],
    category: "project-detail",
    component: ProjectDetailNumberedSections,
    props: "ProjectDetailNumberedSectionsProps",
    exampleUsage: `<ProjectDetailNumberedSections
  title="Design Process"
  heroImage={{ src: "/hero.jpg", alt: "Process" }}
  sections={[
    { number: "01", title: "Research", description: "Understanding user needs...", image: { src: "/img1.jpg", alt: "Research" } },
    { number: "02", title: "Design", description: "Creating solutions...", image: { src: "/img2.jpg", alt: "Design" } },
  ]}
/>`.trim(),
  },
  "project-detail-mask-reveal": {
    id: "project-detail-mask-reveal",
    name: "Project Detail Mask Reveal",
    description:
      "A project detail layout with scroll-triggered clip-path reveal animations. Images are revealed as the user scrolls using CSS clip-path transitions. Features parallax effects and smooth animations. Creates an engaging, cinematic viewing experience for visual projects.",
    semanticTags: [
      "project",
      "portfolio",
      "detail",
      "mask",
      "reveal",
      "animation",
      "scroll",
      "clip-path",
      "cinematic",
      "parallax",
    ],
    category: "project-detail",
    component: ProjectDetailMaskReveal,
    props: "ProjectDetailMaskRevealProps",
    exampleUsage: `<ProjectDetailMaskReveal
  title="Visual Journey"
  heroImage={{ src: "/hero.jpg", alt: "Journey" }}
  revealImages={[
    { src: "/reveal1.jpg", alt: "Scene 1", caption: "The beginning" },
    { src: "/reveal2.jpg", alt: "Scene 2", caption: "The middle" },
  ]}
/>`.trim(),
  },
  "project-detail-parallax-scroll": {
    id: "project-detail-parallax-scroll",
    name: "Project Detail Parallax Scroll",
    description:
      "A project detail layout with parallax scroll effects throughout. The hero section features Y-axis parallax and opacity transforms. Content sections have staggered parallax effects creating depth. Ideal for immersive storytelling and visually dynamic project presentations.",
    semanticTags: [
      "project",
      "portfolio",
      "detail",
      "parallax",
      "scroll",
      "animation",
      "depth",
      "immersive",
      "storytelling",
      "dynamic",
    ],
    category: "project-detail",
    component: ProjectDetailParallaxScroll,
    props: "ProjectDetailParallaxScrollProps",
    exampleUsage: `<ProjectDetailParallaxScroll
  title="Immersive Experience"
  heroImage={{ src: "/hero.jpg", alt: "Experience" }}
  sections={[
    { heading: "Chapter One", body: "The story begins...", image: { src: "/img1.jpg", alt: "Chapter 1" } },
    { heading: "Chapter Two", body: "The journey continues...", image: { src: "/img2.jpg", alt: "Chapter 2" } },
  ]}
/>`.trim(),
  },

  // Banner components
  "banner-promo-cta": {
    id: "banner-promo-cta",
    name: "Banner Promo CTA",
    description:
      "A promotional banner with message, discount text, and arrow link CTA. Features a full-width primary background with centered content including a bold message, discount text, and an underlined link with arrow icon. Ideal for seasonal sales, promotional announcements, and limited-time offers.",
    semanticTags: [
      "banner",
      "promo",
      "promotion",
      "sale",
      "discount",
      "offer",
      "cta",
      "call-to-action",
      "announcement",
      "marketing",
    ],
    category: "banner",
    component: BannerPromoCta,
    props: "BannerPromoCtaProps",
    exampleUsage: `<BannerPromoCta
  message="Summer Sale"
  discount="Up to 70% off"
  actions={[{ label: "Shop Now", href: "/sale" }]}
/>`.trim(),
  },
  "banner-countdown-sale": {
    id: "banner-countdown-sale",
    name: "Banner Countdown Sale",
    description:
      "A flash sale banner with live countdown timer showing hours:minutes:seconds. Features a red urgency background with a live countdown timer that automatically updates every second. The timer displays time remaining until the sale ends. Ideal for flash sales, time-limited promotions, and urgency-driven marketing campaigns.",
    semanticTags: [
      "banner",
      "countdown",
      "timer",
      "sale",
      "flash-sale",
      "urgency",
      "promotion",
      "limited-time",
      "marketing",
    ],
    category: "banner",
    component: BannerCountdownSale,
    props: "BannerCountdownSaleProps",
    exampleUsage: `<BannerCountdownSale
  endTime={new Date(Date.now() + 12 * 60 * 60 * 1000)}
  message="Flash Sale Ends In"
  description="Up to 70% off on all items"
/>`.trim(),
  },
  "banner-delivery-countdown": {
    id: "banner-delivery-countdown",
    name: "Banner Delivery Countdown",
    description:
      "A delivery deadline banner with countdown timer and gift icon. Features an amber attention-grabbing background with a gift icon and live countdown timer. Shows time remaining to place an order for guaranteed delivery by a specific date. Ideal for holiday shipping deadlines, delivery guarantees, and order cutoff times.",
    semanticTags: [
      "banner",
      "countdown",
      "timer",
      "delivery",
      "shipping",
      "deadline",
      "holiday",
      "order",
      "ecommerce",
    ],
    category: "banner",
    component: BannerDeliveryCountdown,
    props: "BannerDeliveryCountdownProps",
    exampleUsage: `<BannerDeliveryCountdown
  deliveryDate="Dec 25"
  cutoffTime={new Date(Date.now() + 6 * 60 * 60 * 1000)}
/>`.trim(),
  },
  "banner-announcement-dismissible": {
    id: "banner-announcement-dismissible",
    name: "Banner Announcement Dismissible",
    description:
      "A top announcement banner with icon, message, CTA button, and dismiss button. Features a clean background with border-bottom styling, containing an icon, announcement text, action button, and dismissible X button. The banner can be closed by the user and triggers an optional callback. Ideal for product launches, feature announcements, and important updates.",
    semanticTags: [
      "banner",
      "announcement",
      "notification",
      "dismissible",
      "closable",
      "alert",
      "update",
      "launch",
      "feature",
    ],
    category: "banner",
    component: BannerAnnouncementDismissible,
    props: "BannerAnnouncementDismissibleProps",
    exampleUsage: `<BannerAnnouncementDismissible
  iconName="mynaui/rocket"
  message="New feature: AI-powered analytics is now live!"
  actions={[{ label: "Try It Now", href: "/features/analytics", variant: "secondary", size: "sm" }]}
  onDismiss={() => console.log('Banner dismissed')}
/>`.trim(),
  },
  "banner-privacy-notice": {
    id: "banner-privacy-notice",
    name: "Banner Privacy Notice",
    description:
      "A bottom-positioned privacy policy update notice with shield icon, title, description, and review link. Features a fixed bottom position with border-top styling. Includes a dismiss button to close the banner. Ideal for privacy policy updates, legal notices, and compliance notifications.",
    semanticTags: [
      "banner",
      "privacy",
      "policy",
      "legal",
      "compliance",
      "notice",
      "bottom",
      "fixed",
      "dismissible",
    ],
    category: "banner",
    component: BannerPrivacyNotice,
    props: "BannerPrivacyNoticeProps",
    exampleUsage: `<BannerPrivacyNotice
  title="Privacy Policy Updated"
  description="We've made changes to how we handle your data."
  actions={[{ label: "Read More", href: "/privacy", variant: "link" }]}
  onDismiss={() => console.log('Dismissed')}
/>`.trim(),
  },
  "banner-survey-incentive": {
    id: "banner-survey-incentive",
    name: "Banner Survey Incentive",
    description:
      "A survey invitation banner with shopping bag icon and incentive offer. Features a clean background with border-bottom styling, containing a shopping bag icon, message with incentive offer, action button, and dismiss button. The layout is responsive with the icon hidden on mobile. Ideal for customer feedback collection, survey invitations, and engagement campaigns with discount incentives.",
    semanticTags: [
      "banner",
      "survey",
      "feedback",
      "incentive",
      "discount",
      "engagement",
      "customer",
      "dismissible",
    ],
    category: "banner",
    component: BannerSurveyIncentive,
    props: "BannerSurveyIncentiveProps",
    exampleUsage: `<BannerSurveyIncentive
  title="Share your feedback!"
  description="Complete our quick survey and receive a 15% discount code."
  actions={[{ label: "Start Survey", href: "/survey", size: "sm" }]}
  onDismiss={() => console.log('Dismissed')}
/>`.trim(),
  },
  "banner-social-follow": {
    id: "banner-social-follow",
    name: "Banner Social Follow",
    description:
      "A gradient background banner encouraging social media follows. Features a vibrant pink-to-rose gradient background with white text, users icon, follow CTA button, and dismiss button. The layout is centered with responsive text alignment. Ideal for social media promotion, community building, and engagement campaigns.",
    semanticTags: [
      "banner",
      "social",
      "social-media",
      "follow",
      "community",
      "engagement",
      "gradient",
      "dismissible",
    ],
    category: "banner",
    component: BannerSocialFollow,
    props: "BannerSocialFollowProps",
    exampleUsage: `<BannerSocialFollow
  message="Join our community of 50,000+ developers!"
  actions={[{ label: "Follow Now", href: "https://twitter.com/example", variant: "secondary", size: "sm" }]}
  onDismiss={() => console.log('Dismissed')}
/>`.trim(),
  },
  "banner-gdpr-rights": {
    id: "banner-gdpr-rights",
    name: "Banner GDPR Rights",
    description:
      "A bottom-positioned privacy rights notice with icon, title, description, and manage data link. Features a fixed bottom position with border-top styling. Includes a dismiss button to close the banner. Ideal for privacy notices, data policy updates, and user rights information.",
    semanticTags: [
      "banner",
      "gdpr",
      "privacy",
      "data",
      "rights",
      "compliance",
      "legal",
      "bottom",
      "fixed",
      "dismissible",
    ],
    category: "banner",
    component: BannerGdprRights,
    props: "BannerGdprRightsProps",
    exampleUsage: `<BannerGdprRights
  title="Your Privacy Rights"
  description="You can request access to or deletion of your personal data at any time."
  actions={[{ label: "Manage Data", href: "/privacy/manage", variant: "link" }]}
  onDismiss={() => console.log('Dismissed')}
/>`.trim(),
  },
  "banner-event-promo": {
    id: "banner-event-promo",
    name: "Banner Event Promo",
    description:
      "An event promotion banner with primary background and registration CTA. Features a primary background with event name (bold), dot separator, event details, and a ghost-styled register button with arrow icon. The layout is responsive with content wrapping on smaller screens. Ideal for conference announcements, webinar promotions, and event registrations.",
    semanticTags: [
      "banner",
      "event",
      "conference",
      "webinar",
      "registration",
      "promotion",
      "announcement",
      "cta",
    ],
    category: "banner",
    component: BannerEventPromo,
    props: "BannerEventPromoProps",
    exampleUsage: `<BannerEventPromo
  eventName="TechSummit 2024"
  eventDetails="Join us in San Francisco from Sept 15 - 17 for the biggest tech event of the year."
  actions={[{ label: "Get Tickets", href: "/events/techsummit", variant: "ghost", size: "sm" }]}
/>`.trim(),
  },
  "banner-floating-offer": {
    id: "banner-floating-offer",
    name: "Banner Floating Offer",
    description:
      "A floating bottom banner with rounded corners and offer CTA. Features a fixed bottom position with primary background, rounded container on larger screens, offer text with bold title, dot separator, description, and a secondary-styled CTA button with arrow icon. The banner floats above content and can optionally be dismissed. Ideal for limited-time offers, conversion prompts, and persistent CTAs.",
    semanticTags: [
      "banner",
      "floating",
      "sticky",
      "fixed",
      "offer",
      "promotion",
      "cta",
      "conversion",
      "persistent",
      "dismissible",
    ],
    category: "banner",
    component: BannerFloatingOffer,
    props: "BannerFloatingOfferProps",
    exampleUsage: `<BannerFloatingOffer
  offerTitle="Black Friday Special"
  offerDescription="Save 60% on annual plans - ends tonight!"
  actions={[{ label: "Claim Offer", href: "/pricing", variant: "secondary", size: "sm" }]}
  dismissible={true}
  onOpenChange={(open) => console.log('Visibility:', open)}
/>`.trim(),
  },

  // Industries blocks
  "industries-hover-reveal-grid": {
    id: "industries-hover-reveal-grid",
    name: "Industries Hover Reveal Grid",
    description:
      "A responsive grid of industry cards with animated hover effects. Features image overlays that reveal descriptions on hover, plus button rotation animations, and smooth transitions. Displays 1 column on mobile, 2 on tablet, and 4 on desktop. Ideal for showcasing industry verticals, service categories, or portfolio sectors with engaging visual interactions.",
    semanticTags: [
      "industries",
      "sectors",
      "verticals",
      "categories",
      "services",
      "portfolio",
      "grid",
      "hover",
      "animation",
      "cards",
      "showcase",
    ],
    category: "industries",
    component: IndustriesHoverRevealGrid,
    props: "IndustriesHoverRevealGridProps",
    exampleUsage: `<IndustriesHoverRevealGrid
  title="Industries We Serve"
  industryLabel="Industry"
  industries={[
    {
      name: "Healthcare",
      description: "Digital solutions for modern healthcare providers",
      image: "/healthcare.jpg",
      imageAlt: "Healthcare industry",
      url: "/industries/healthcare"
    },
    {
      name: "Finance",
      description: "Secure fintech applications and banking solutions",
      image: "/finance.jpg",
      imageAlt: "Finance industry",
      url: "/industries/finance"
    }
  ]}
/>`.trim(),
  },

  "industries-badge-list-bordered": {
    id: "industries-badge-list-bordered",
    name: "Industries Badge List Bordered",
    description:
      "A professional industries listing with badge header and bordered row layout. Each row displays an image, title, and description in a clean grid format. Features responsive reordering on mobile with images appearing first. Perfect for service offerings, industry expertise listings, or capability showcases with a structured, scannable design.",
    semanticTags: [
      "industries",
      "services",
      "capabilities",
      "expertise",
      "list",
      "badge",
      "bordered",
      "professional",
      "structured",
    ],
    category: "industries",
    component: IndustriesBadgeListBordered,
    props: "IndustriesBadgeListBorderedProps",
    exampleUsage: `<IndustriesBadgeListBordered
  badge="Our Expertise"
  heading="Industries We Specialize In"
  services={[
    {
      title: "E-Commerce",
      description: "End-to-end e-commerce solutions from storefront to fulfillment",
      imageSrc: "/ecommerce.jpg",
      imageAlt: "E-commerce solutions"
    },
    {
      title: "SaaS Platforms",
      description: "Scalable software-as-a-service application development",
      imageSrc: "/saas.jpg",
      imageAlt: "SaaS development"
    }
  ]}
/>`.trim(),
  },

  "industries-timeline-table": {
    id: "industries-timeline-table",
    name: "Industries Timeline Table",
    description:
      "A timeline-style table layout displaying industry projects with year, name, description, and background image reveals on hover. Features column headers, hover-triggered background images, and arrow link indicators. Ideal for project portfolios, case study listings, company history, or industry experience timelines with an elegant tabular presentation.",
    semanticTags: [
      "industries",
      "timeline",
      "table",
      "projects",
      "portfolio",
      "case-studies",
      "history",
      "experience",
      "hover",
      "background-image",
    ],
    category: "industries",
    component: IndustriesTimelineTable,
    props: "IndustriesTimelineTableProps",
    exampleUsage: `<IndustriesTimelineTable
  labels={["Year", "Project", "Description"]}
  projects={[
    {
      year: "2024",
      name: "FinTech Platform",
      description: "Complete digital banking transformation",
      imageSrc: "/fintech-project.jpg",
      imageAlt: "FinTech project",
      url: "/projects/fintech"
    },
    {
      year: "2023",
      name: "Healthcare Portal",
      description: "Patient management system redesign",
      imageSrc: "/healthcare-project.jpg",
      imageAlt: "Healthcare project",
      url: "/projects/healthcare"
    }
  ]}
/>`.trim(),
  },

  "industries-expandable-showcase": {
    id: "industries-expandable-showcase",
    name: "Industries Expandable Showcase",
    description:
      "An interactive expandable showcase for industry categories with accordion-style panels on desktop. Hovering expands a panel to reveal its image and details with smooth animations. On mobile, displays stacked cards with images. Each panel shows category name, title description, and learn more link. Perfect for renewable energy, service verticals, or portfolio categories with engaging hover interactions.",
    semanticTags: [
      "industries",
      "expandable",
      "accordion",
      "showcase",
      "categories",
      "interactive",
      "hover",
      "animation",
      "panels",
      "renewable",
      "energy",
    ],
    category: "industries",
    component: IndustriesExpandableShowcase,
    props: "IndustriesExpandableShowcaseProps",
    exampleUsage: `<IndustriesExpandableShowcase
  heading="Powering Renewable Industries"
  contractors={[
    {
      id: "solar",
      category: "Solar",
      title: "Scaling Solar Infrastructure with Advanced Grid Integration",
      imageSrc: "/solar.jpg",
      imageAlt: "Solar power generation",
      learnMoreUrl: "/industries/solar"
    },
    {
      id: "wind",
      category: "Wind",
      title: "Maximizing Wind Farm Efficiency with AI Optimization",
      imageSrc: "/wind.jpg",
      imageAlt: "Wind power generation",
      learnMoreUrl: "/industries/wind"
    }
  ]}
/>`.trim(),
  },

  "resource-detail-whitepaper-sidebar": {
    id: "resource-detail-whitepaper-sidebar",
    name: "Resource Detail Whitepaper Sidebar",
    description:
      "A resource detail layout with a left sidebar containing whitepaper info card, download options (PDF and Print), and social sharing icons. Main content area displays prose article content with headings, paragraphs, lists, blockquotes, and tables. Ideal for whitepapers, guides, ebooks, research papers, and downloadable resources that need prominent download CTAs and social sharing.",
    semanticTags: [
      "resource",
      "detail",
      "whitepaper",
      "sidebar",
      "download",
      "pdf",
      "guide",
      "ebook",
      "article",
      "prose",
      "social-sharing",
      "two-column",
    ],
    category: "resource-detail",
    component: ResourceDetailWhitepaperSidebar,
    props: "ResourceDetailWhitepaperSidebarProps",
    exampleUsage: `<ResourceDetailWhitepaperSidebar
  sidebar={{
    resourceType: "Whitepaper",
    resourceTitle: "The Complete Guide to Launching Your Startup",
    downloadDescription: "Enjoy this guide? Download it for offline reading or sharing.",
    readTime: "5 minutes",
    primaryDownload: { text: "PDF Format", href: "/download/pdf" },
    secondaryDownload: { text: "Print Version", href: "/download/print" },
    shareTitle: "Share this guide",
    socialLinks: [
      { platform: "linkedin", href: "#", label: "Share on LinkedIn" },
      { platform: "twitter", href: "#", label: "Share on Twitter" }
    ]
  }}
  article={{
    title: "White Paper: The Complete Guide",
    content: <div>Your article content here...</div>
  }}
/>`.trim(),
  },

  "resource-detail-article-hero": {
    id: "resource-detail-article-hero",
    name: "Resource Detail Article Hero",
    description:
      "A full-width article hero with dark primary background, navigation back link, title, author info with avatar, social sharing buttons, and featured illustration image. Below the hero is prose content area with author bio section at the bottom. Ideal for blog posts, articles, case studies, thought leadership pieces, and long-form content that needs a visually impactful hero section.",
    semanticTags: [
      "resource",
      "detail",
      "article",
      "hero",
      "blog",
      "author",
      "social-sharing",
      "featured-image",
      "prose",
      "case-study",
      "thought-leadership",
      "dark-hero",
    ],
    category: "resource-detail",
    component: ResourceDetailArticleHero,
    props: "ResourceDetailArticleHeroProps",
    exampleUsage: `<ResourceDetailArticleHero
  navigation={{ backText: "All Articles", backHref: "/blog" }}
  blog={{
    title: "Building Sustainable Web Applications",
    author: "Sarah Chen",
    date: "December 15, 2024",
    readTime: "8 min read",
    role: "Senior Developer",
    imageSrc: "/avatars/sarah.jpg",
    content: <div>Your article content here...</div>
  }}
  social={{
    heading: "Share this article",
    links: [
      { icon: "link", href: "#", label: "Copy link" },
      { icon: "linkedin", href: "#", label: "Share on LinkedIn" },
      { icon: "twitter", href: "#", label: "Share on X" }
    ]
  }}
  illustration={{
    imageSrc: "/images/hero.jpg",
    imageAlt: "Article hero image"
  }}
/>`.trim(),
  },

  "resource-detail-document-sidebar": {
    id: "resource-detail-document-sidebar",
    name: "Resource Detail Document Sidebar",
    description:
      "A document detail page with breadcrumb navigation, title, two-column layout with article content on the left and sticky sidebar on the right. Sidebar contains document excerpt, download button, reviewer info with avatar, key features checklist with check icons, and social sharing links. Ideal for legal documents, templates, contracts, service agreements, and downloadable resources that need reviewer credibility and feature highlights.",
    semanticTags: [
      "resource",
      "detail",
      "document",
      "sidebar",
      "breadcrumb",
      "download",
      "template",
      "contract",
      "legal",
      "agreement",
      "reviewer",
      "features",
      "checklist",
      "sticky-sidebar",
      "two-column",
    ],
    category: "resource-detail",
    component: ResourceDetailDocumentSidebar,
    props: "ResourceDetailDocumentSidebarProps",
    exampleUsage: `<ResourceDetailDocumentSidebar
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "Templates", href: "/templates" },
    { label: "Service Agreement", isCurrentPage: true }
  ]}
  title="Professional Service Agreement"
  article={{
    featuredImage: { src: "/images/doc.jpg", alt: "Document preview" },
    content: <div>Your article content here...</div>
  }}
  sidebar={{
    excerptTitle: "Document Summary",
    excerptDescription: "A comprehensive service agreement template...",
    downloadButton: { text: "Download PDF", href: "/download" },
    reviewer: { name: "John Doe", role: "Legal Consultant", avatarSrc: "/avatars/john.jpg" },
    featuresTitle: "Key Features",
    features: [
      { text: "Customizable Terms" },
      { text: "Digital Signatures" },
      { text: "Document Tracking" }
    ],
    shareTitle: "Share this template",
    socialLinks: [
      { icon: "linkedin", href: "#", label: "Share on LinkedIn" }
    ]
  }}
/>`.trim(),
  },

  // Testimonials components
  "testimonials-list-verified": {
    id: "testimonials-list-verified",
    name: "Testimonials List with Verified Badges",
    description:
      "A customer reviews section featuring a rating summary header with overall score, star distribution breakdown, and a list of individual reviews with verified purchase badges, author avatars, dates, and star ratings. Ideal for product pages, service reviews, or any page requiring authentic customer feedback display.",
    semanticTags: [
      "reviews",
      "testimonials",
      "ratings",
      "stars",
      "verified",
      "customer-feedback",
      "product-reviews",
      "social-proof",
    ],
    category: "testimonials",
    component: TestimonialsListVerified,
    props: "TestimonialsListVerifiedProps",
    exampleUsage: `
<TestimonialsListVerified
  title="Customer Reviews"
  averageRating={4.8}
  totalReviews={1250}
  reviews={[
    {
      id: "1",
      author: { name: "Sarah M.", avatar: "/avatars/sarah.jpg" },
      rating: 5,
      date: "2024-01-15",
      content: "Excellent product! Exceeded my expectations.",
      verified: true
    }
  ]}
/>`.trim(),
  },
  "testimonials-images-helpful": {
    id: "testimonials-images-helpful",
    name: "Testimonials with Images and Helpful Voting",
    description:
      "An enhanced reviews section featuring customer photos, helpful/not helpful voting buttons, and a write review CTA. Each review displays images in a gallery format with star ratings, author info, and engagement metrics. Perfect for e-commerce product pages requiring visual customer feedback.",
    semanticTags: [
      "reviews",
      "testimonials",
      "images",
      "photos",
      "helpful",
      "voting",
      "customer-photos",
      "product-reviews",
      "user-generated-content",
    ],
    category: "testimonials",
    component: TestimonialsImagesHelpful,
    props: "TestimonialsImagesHelpfulProps",
    exampleUsage: `
<TestimonialsImagesHelpful
  title="Customer Reviews"
  reviews={[
    {
      id: "1",
      author: { name: "John D.", avatar: "/avatars/john.jpg" },
      rating: 5,
      date: "2024-01-15",
      content: "Amazing quality!",
      images: ["/review-1.jpg", "/review-2.jpg"],
      helpfulCount: 24,
      verified: true
    }
  ]}
  onWriteReview={() => console.log("Write review")}
/>`.trim(),
  },
  "testimonials-bento-grid": {
    id: "testimonials-bento-grid",
    name: "Testimonials Bento Grid",
    description:
      "A bento-style grid layout for testimonials with a featured testimonial spanning multiple rows. Cards display quotes with author avatars, names, roles, and decorative quote icons. The asymmetric grid creates visual interest while highlighting key testimonials. Ideal for landing pages and about sections.",
    semanticTags: [
      "testimonials",
      "bento",
      "grid",
      "featured",
      "quotes",
      "social-proof",
      "asymmetric",
      "cards",
    ],
    category: "testimonials",
    component: TestimonialsBentoGrid,
    props: "TestimonialsBentoGridProps",
    exampleUsage: `
<TestimonialsBentoGrid
  title="What Our Clients Say"
  testimonials={[
    {
      id: "1",
      quote: "This platform transformed our workflow...",
      author: { name: "Sarah Chen", role: "CEO", avatar: "/avatars/sarah.jpg" },
      featured: true
    }
  ]}
/>`.trim(),
  },
  "testimonials-twitter-cards": {
    id: "testimonials-twitter-cards",
    name: "Testimonials Twitter/X Style Cards",
    description:
      "A responsive grid of social media testimonial cards supporting multiple platforms (Twitter/X, Instagram, Facebook, LinkedIn, TikTok, YouTube, etc.). Each card displays post content, author avatar, display name, social handle, and links to the original post. The SocialLinkIcon automatically detects the platform from the URL and displays the appropriate brand icon. Cards feature hover effects transitioning to primary colors. Ideal for showcasing authentic social proof from real user posts across any social platform.",
    semanticTags: [
      "testimonials",
      "social-media",
      "social-proof",
      "cards",
      "grid",
      "twitter",
      "instagram",
      "facebook",
      "linkedin",
      "tiktok",
      "youtube",
      "reviews",
      "user-generated-content",
      "mentions",
      "multi-platform",
    ],
    category: "testimonials",
    component: TestimonialsTwitterCards,
    props: "TestimonialsTwitterCardsProps",
    exampleUsage: `
<TestimonialsTwitterCards
  heading="What People Are Saying"
  description="Real posts from real users across social platforms"
  testimonials={[
    {
      content: "Just tried @company and it's amazing! The best tool I've used.",
      author: "John Doe",
      handle: "@johndoe",
      avatarSrc: "/avatars/john.jpg",
      linkConfig: {
        label: "View on Twitter",
        href: "https://twitter.com/johndoe/status/123456789"
      }
    },
    {
      content: "This changed my workflow completely. Highly recommend!",
      author: "Jane Smith",
      handle: "@janesmith",
      avatarSrc: "/avatars/jane.jpg",
      linkConfig: {
        label: "See on Instagram",
        href: "https://instagram.com/p/ABC123"
      }
    },
    {
      content: "Our team productivity increased 40% after implementing this solution.",
      author: "Tech Corp",
      handle: "Tech Corp",
      avatarSrc: "/avatars/techcorp.jpg",
      linkConfig: {
        label: "Read on LinkedIn",
        href: "https://linkedin.com/posts/techcorp_123"
      }
    }
  ]}
  background="gray"
  spacing="lg"
/>`.trim(),
  },
  "testimonials-carousel-image": {
    id: "testimonials-carousel-image",
    name: "Testimonials Full-Width Image Carousel",
    description:
      "A full-width testimonial carousel with background images and navigation controls. Each slide features a large background image with gradient overlay, quote text, and author information. Includes previous/next buttons and dot indicators for manual navigation. Ideal for hero sections or impactful testimonial displays.",
    semanticTags: [
      "testimonials",
      "carousel",
      "slider",
      "images",
      "full-width",
      "hero",
      "navigation",
      "background-image",
    ],
    category: "testimonials",
    component: TestimonialsCarouselImage,
    props: "TestimonialsCarouselImageProps",
    exampleUsage: `
<TestimonialsCarouselImage
  testimonials={[
    {
      id: "1",
      quote: "Working with this team was incredible...",
      author: { name: "Sarah Chen", role: "CEO", company: "TechCorp" },
      backgroundImage: "/testimonial-bg-1.jpg"
    }
  ]}
  autoPlayInterval={5000}
/>`.trim(),
  },
  "testimonials-centered-avatars": {
    id: "testimonials-centered-avatars",
    name: "Testimonials Centered with Avatar Stack",
    description:
      "A centered testimonial section featuring an overlapping avatar stack at the top, creating a community feel. Displays a rotating testimonial with quote, author name, role, and navigation dots. The stacked avatars create visual interest and suggest multiple satisfied customers. Perfect for SaaS landing pages.",
    semanticTags: [
      "testimonials",
      "centered",
      "avatars",
      "stack",
      "community",
      "social-proof",
      "minimal",
      "rotating",
    ],
    category: "testimonials",
    component: TestimonialsCenteredAvatars,
    props: "TestimonialsCenteredAvatarsProps",
    exampleUsage: `
<TestimonialsCenteredAvatars
  badge="Testimonials"
  title="Loved by thousands"
  testimonials={[
    {
      id: "1",
      quote: "The best tool we've ever used...",
      author: { name: "Sarah Chen", role: "Product Manager", avatar: "/avatars/sarah.jpg" }
    }
  ]}
/>`.trim(),
  },
  "testimonials-company-logo": {
    id: "testimonials-company-logo",
    name: "Testimonials with Company Logo",
    description:
      "A single testimonial section featuring the company logo prominently, along with a large quote, author photo, and attribution. The layout emphasizes the company endorsement with logo placement and professional styling. Ideal for B2B landing pages and enterprise social proof.",
    semanticTags: [
      "testimonials",
      "company",
      "logo",
      "enterprise",
      "b2b",
      "single",
      "featured",
      "corporate",
    ],
    category: "testimonials",
    component: TestimonialsCompanyLogo,
    props: "TestimonialsCompanyLogoProps",
    exampleUsage: `
<TestimonialsCompanyLogo
  testimonial={{
    quote: "This solution transformed our operations...",
    author: { name: "John Smith", role: "CTO", avatar: "/avatars/john.jpg" },
    companyLogo: "/logos/company.svg",
    image: "/testimonial-image.jpg"
  }}
/>`.trim(),
  },
  "testimonials-grid-add-review": {
    id: "testimonials-grid-add-review",
    name: "Testimonials Grid with Add Review Card",
    description:
      "A testimonial grid featuring customer reviews alongside an 'Add Review' card with dashed border and plus icon. Each review card displays star ratings, quote, and author info. The add review card encourages user engagement. Perfect for product pages and community-driven platforms.",
    semanticTags: [
      "testimonials",
      "grid",
      "add-review",
      "interactive",
      "ratings",
      "stars",
      "user-generated",
      "engagement",
    ],
    category: "testimonials",
    component: TestimonialsGridAddReview,
    props: "TestimonialsGridAddReviewProps",
    exampleUsage: `
<TestimonialsGridAddReview
  title="Customer Reviews"
  testimonials={[
    {
      id: "1",
      quote: "Excellent product!",
      rating: 5,
      author: { name: "Sarah M.", avatar: "/avatars/sarah.jpg" }
    }
  ]}
  onAddReview={() => console.log("Add review")}
/>`.trim(),
  },
  "testimonials-marquee": {
    id: "testimonials-marquee",
    name: "Testimonials Auto-Scrolling Marquee",
    description:
      "An auto-scrolling horizontal marquee of testimonial cards that creates continuous movement. Cards display quotes with author avatars and info. Configurable speed (slow/normal/fast) and pause-on-hover functionality. Creates dynamic visual interest and showcases many testimonials in limited space.",
    semanticTags: [
      "testimonials",
      "marquee",
      "scrolling",
      "animation",
      "horizontal",
      "continuous",
      "dynamic",
      "cards",
    ],
    category: "testimonials",
    component: TestimonialsMarquee,
    props: "TestimonialsMarqueeProps",
    exampleUsage: `
<TestimonialsMarquee
  title="What People Say"
  testimonials={[
    {
      id: "1",
      quote: "Amazing experience!",
      author: { name: "John D.", role: "CEO", avatar: "/avatars/john.jpg" }
    }
  ]}
  speed="normal"
  pauseOnHover={true}
/>`.trim(),
  },
  "testimonials-simple-grid": {
    id: "testimonials-simple-grid",
    name: "Testimonials Simple Grid",
    description:
      "A clean, straightforward grid of testimonial cards with configurable columns (2, 3, or 4). Each card displays a quote with author avatar, name, and role. The minimal design focuses on content without distractions. Ideal for any page requiring a clean testimonial display.",
    semanticTags: [
      "testimonials",
      "grid",
      "simple",
      "clean",
      "minimal",
      "cards",
      "configurable",
      "responsive",
    ],
    category: "testimonials",
    component: TestimonialsSimpleGrid,
    props: "TestimonialsSimpleGridProps",
    exampleUsage: `
<TestimonialsSimpleGrid
  title="What Our Clients Say"
  columns={3}
  testimonials={[
    {
      id: "1",
      quote: "Great service!",
      author: { name: "Sarah Chen", role: "Manager", avatar: "/avatars/sarah.jpg" }
    }
  ]}
/>`.trim(),
  },
  "testimonials-slider-minimal": {
    id: "testimonials-slider-minimal",
    name: "Testimonials Minimal Auto-Rotating Slider",
    description:
      "A minimal testimonial slider with smooth fade transitions and auto-rotation. Displays one testimonial at a time with quote, author info, and dot navigation indicators. Configurable auto-play interval. The clean design focuses attention on the testimonial content.",
    semanticTags: [
      "testimonials",
      "slider",
      "minimal",
      "auto-rotate",
      "fade",
      "transitions",
      "single",
      "clean",
    ],
    category: "testimonials",
    component: TestimonialsSliderMinimal,
    props: "TestimonialsSliderMinimalProps",
    exampleUsage: `
<TestimonialsSliderMinimal
  testimonials={[
    {
      id: "1",
      quote: "Transformed our workflow completely...",
      author: { name: "John Smith", role: "CTO", avatar: "/avatars/john.jpg" }
    }
  ]}
  autoPlayInterval={4000}
/>`.trim(),
  },
  "testimonials-split-image": {
    id: "testimonials-split-image",
    name: "Testimonials Split Layout with Image",
    description:
      "A split-screen testimonial layout with a large image on one side and quote content on the other. Configurable image position (left/right). Features decorative quote icon, large typography, and author attribution. Perfect for impactful single testimonial displays on landing pages.",
    semanticTags: [
      "testimonials",
      "split",
      "image",
      "two-column",
      "featured",
      "large",
      "hero",
      "impactful",
    ],
    category: "testimonials",
    component: TestimonialsSplitImage,
    props: "TestimonialsSplitImageProps",
    exampleUsage: `
<TestimonialsSplitImage
  testimonial={{
    quote: "This product changed everything for us...",
    author: { name: "Sarah Chen", role: "CEO", company: "TechCorp" },
    image: "/testimonial-image.jpg"
  }}
  imagePosition="left"
/>`.trim(),
  },
  "testimonials-stats-header": {
    id: "testimonials-stats-header",
    name: "Testimonials with Stats Header",
    description:
      "A testimonial section with a statistics display header showing key metrics (customers, rating, etc.) above a grid of testimonial cards. The stats create immediate credibility before users read individual testimonials. Ideal for showcasing both quantitative and qualitative social proof.",
    semanticTags: [
      "testimonials",
      "stats",
      "metrics",
      "numbers",
      "header",
      "grid",
      "social-proof",
      "credibility",
    ],
    category: "testimonials",
    component: TestimonialsStatsHeader,
    props: "TestimonialsStatsHeaderProps",
    exampleUsage: `
<TestimonialsStatsHeader
  title="Trusted by Thousands"
  stats={[
    { label: "Happy Customers", value: "10,000+" },
    { label: "Average Rating", value: "4.9/5" }
  ]}
  testimonials={[
    {
      id: "1",
      quote: "Excellent service!",
      author: { name: "John D.", role: "CEO", avatar: "/avatars/john.jpg" }
    }
  ]}
/>`.trim(),
  },
  "testimonials-wall-compact": {
    id: "testimonials-wall-compact",
    name: "Testimonials Dense Wall",
    description:
      "A dense wall of compact testimonial cards displaying many testimonials in a masonry-like grid. Each card shows a short quote with author avatar, name, and optional badge. The compact format maximizes social proof by showing volume of positive feedback. Ideal for showcasing community support.",
    semanticTags: [
      "testimonials",
      "wall",
      "compact",
      "dense",
      "masonry",
      "volume",
      "community",
      "badges",
    ],
    category: "testimonials",
    component: TestimonialsWallCompact,
    props: "TestimonialsWallCompactProps",
    exampleUsage: `
<TestimonialsWallCompact
  title="Wall of Love"
  testimonials={[
    {
      id: "1",
      quote: "Love it!",
      author: { name: "Sarah M.", avatar: "/avatars/sarah.jpg" },
      badge: "Verified"
    }
  ]}
/>`.trim(),
  },
  "testimonials-mini-dividers": {
    id: "testimonials-mini-dividers",
    name: "Testimonials Grid with Dividers",
    description:
      "A testimonial grid with subtle dividers separating each card, creating a clean organized layout. Each card displays star ratings, quote, and author info with avatar. The dividers add structure while maintaining a minimal aesthetic. Perfect for professional service pages.",
    semanticTags: [
      "testimonials",
      "grid",
      "dividers",
      "organized",
      "ratings",
      "stars",
      "clean",
      "professional",
    ],
    category: "testimonials",
    component: TestimonialsMiniDividers,
    props: "TestimonialsMiniDividersProps",
    exampleUsage: `
<TestimonialsMiniDividers
  title="Customer Feedback"
  testimonials={[
    {
      id: "1",
      quote: "Professional service!",
      rating: 5,
      author: { name: "John Smith", role: "Manager", avatar: "/avatars/john.jpg" }
    }
  ]}
/>`.trim(),
  },
  "testimonials-logo-cards": {
    id: "testimonials-logo-cards",
    name: "Testimonials Cards with Company Logos",
    description:
      "Testimonial cards featuring company logos prominently in the header, with the first card spanning multiple columns for a featured effect. Each card displays the company logo, quote, and author info. Ideal for B2B testimonials where company endorsement is key.",
    semanticTags: [
      "testimonials",
      "logos",
      "company",
      "b2b",
      "enterprise",
      "featured",
      "cards",
      "corporate",
    ],
    category: "testimonials",
    component: TestimonialsLogoCards,
    props: "TestimonialsLogoCardsProps",
    exampleUsage: `
<TestimonialsLogoCards
  title="Trusted by Industry Leaders"
  testimonials={[
    {
      id: "1",
      quote: "Transformed our operations...",
      author: { name: "Sarah Chen", role: "CTO", avatar: "/avatars/sarah.jpg" },
      companyLogo: "/logos/company.svg"
    }
  ]}
/>`.trim(),
  },
  "testimonials-quote-carousel": {
    id: "testimonials-quote-carousel",
    name: "Testimonials Quote Carousel",
    description:
      "A carousel of testimonial quote cards using shadcn's Carousel component with navigation arrows. Each card features a large decorative quote mark, testimonial text, and author info. The carousel format allows browsing multiple testimonials in a compact space.",
    semanticTags: [
      "testimonials",
      "carousel",
      "quotes",
      "navigation",
      "arrows",
      "cards",
      "browsable",
      "compact",
    ],
    category: "testimonials",
    component: TestimonialsQuoteCarousel,
    props: "TestimonialsQuoteCarouselProps",
    exampleUsage: `
<TestimonialsQuoteCarousel
  title="What Clients Say"
  testimonials={[
    {
      id: "1",
      quote: "Outstanding results!",
      author: { name: "John D.", role: "CEO", avatar: "/avatars/john.jpg" }
    }
  ]}
/>`.trim(),
  },
  "testimonials-animated-split": {
    id: "testimonials-animated-split",
    name: "Testimonials Animated Split Screen",
    description:
      "An animated split-screen testimonial section using Framer Motion for smooth transitions. Features a large image on one side with quote and author info on the other. Includes auto-play, navigation buttons, and dot indicators. Creates an engaging, premium testimonial experience.",
    semanticTags: [
      "testimonials",
      "animated",
      "split",
      "framer-motion",
      "transitions",
      "premium",
      "interactive",
      "auto-play",
    ],
    category: "testimonials",
    component: TestimonialsAnimatedSplit,
    props: "TestimonialsAnimatedSplitProps",
    exampleUsage: `
<TestimonialsAnimatedSplit
  testimonials={[
    {
      id: "1",
      quote: "A game-changer for our team...",
      author: { name: "Sarah Chen", role: "Director", avatar: "/avatars/sarah.jpg" },
      image: "/testimonial-1.jpg"
    }
  ]}
  autoPlayInterval={5000}
/>`.trim(),
  },
  "testimonials-scrolling-columns": {
    id: "testimonials-scrolling-columns",
    name: "Testimonials Animated Scrolling Columns",
    description:
      "An animated testimonial section with staggered card animations powered by Framer Motion. Features large image cards with gradient overlays and quote content positioned at the bottom. Cards animate into view with a staggered effect as they enter the viewport. Ideal for visually rich testimonial sections.",
    semanticTags: [
      "testimonials",
      "animated",
      "scrolling",
      "framer-motion",
      "staggered",
      "images",
      "gradient",
      "viewport",
    ],
    category: "testimonials",
    component: TestimonialsScrollingColumns,
    props: "TestimonialsScrollingColumnsProps",
    exampleUsage: `
<TestimonialsScrollingColumns
  title="What Our Clients Say"
  subtitle="Real feedback from real customers"
  testimonials={[
    {
      id: "1",
      quote: "Amazing experience...",
      name: "Jane D.",
      role: "CEO",
      imageSrc: "/testimonial-1.jpg"
    }
  ]}
/>`.trim(),
  },
  "testimonials-minimal-numbered": {
    id: "testimonials-minimal-numbered",
    name: "Testimonials Minimal with Large Numbers",
    description:
      "A minimal testimonial slider featuring large numbered indicators (01, 02, 03) that transition with the content. Displays one testimonial at a time with smooth fade transitions, author information with avatar, and navigation controls. The oversized numbers create a distinctive visual element.",
    semanticTags: [
      "testimonials",
      "minimal",
      "numbered",
      "slider",
      "large-numbers",
      "transitions",
      "navigation",
      "distinctive",
    ],
    category: "testimonials",
    component: TestimonialsMinimalNumbered,
    props: "TestimonialsMinimalNumberedProps",
    exampleUsage: `
<TestimonialsMinimalNumbered
  testimonials={[
    {
      id: "1",
      quote: "Transformed our creative process...",
      author: { name: "Sarah Chen", role: "Design Director", company: "Linear", avatar: "/avatars/sarah.jpg" }
    }
  ]}
  autoPlayInterval={5000}
/>`.trim(),
  },
  "testimonials-parallax-number": {
    id: "testimonials-parallax-number",
    name: "Testimonials Parallax Number Effect",
    description:
      "A premium testimonial section featuring an oversized animated number with parallax mouse-tracking effect. The large index number responds to mouse movement, creating depth. Includes a vertical progress indicator, company badge, word-by-word quote animation, and smooth navigation controls. Perfect for high-end landing pages.",
    semanticTags: [
      "testimonials",
      "parallax",
      "animated",
      "premium",
      "mouse-tracking",
      "framer-motion",
      "interactive",
      "high-end",
    ],
    category: "testimonials",
    component: TestimonialsParallaxNumber,
    props: "TestimonialsParallaxNumberProps",
    exampleUsage: `
<TestimonialsParallaxNumber
  testimonials={[
    {
      id: "1",
      quote: "Transformed our entire creative process overnight.",
      author: "Sarah Chen",
      role: "Design Director",
      company: "Linear"
    }
  ]}
  autoPlayInterval={6000}
/>`.trim(),
  },
  "testimonials-masonry-grid": {
    id: "testimonials-masonry-grid",
    name: "Testimonials Masonry Grid",
    description:
      "A masonry-style grid layout for testimonials with varying card heights based on content length. Cards are distributed across columns creating an organic, Pinterest-like layout. Each card displays a quote with author avatar, name, and role. Ideal for showcasing testimonials of varying lengths.",
    semanticTags: [
      "testimonials",
      "masonry",
      "grid",
      "pinterest",
      "organic",
      "varying-heights",
      "cards",
      "layout",
    ],
    category: "testimonials",
    component: TestimonialsMasonryGrid,
    props: "TestimonialsMasonryGridProps",
    exampleUsage: `
<TestimonialsMasonryGrid
  title="What People Say"
  subtitle="Feedback from our community"
  testimonials={[
    {
      id: "1",
      content: "Amazing product that changed our workflow...",
      author: { name: "John D.", role: "CEO", avatar: "/avatars/john.jpg" }
    }
  ]}
/>`.trim(),
  },
  "testimonials-large-quote": {
    id: "testimonials-large-quote",
    name: "Testimonials Large Centered Quote",
    description:
      "A centered, single testimonial section featuring an oversized quote with decorative quote icons. The large typography creates visual impact while the centered layout draws focus to the testimonial content. Includes author avatar, name, role, and company. Perfect for hero sections or impactful single testimonials.",
    semanticTags: [
      "testimonials",
      "large",
      "centered",
      "quote",
      "single",
      "hero",
      "impactful",
      "typography",
    ],
    category: "testimonials",
    component: TestimonialsLargeQuote,
    props: "TestimonialsLargeQuoteProps",
    exampleUsage: `
<TestimonialsLargeQuote
  testimonial={{
    quote: "This platform has fundamentally changed how we approach our work...",
    author: { name: "Sarah Chen", role: "CEO", company: "TechVentures Inc.", avatar: "/avatars/sarah.jpg" }
  }}
/>`.trim(),
  },

  // Service Detail components
  "service-detail-prose-minimal": {
    id: "service-detail-prose-minimal",
    name: "Service Detail Prose Minimal",
    description:
      "A minimal service detail page with a muted hero section, introduction block, and prose content sections. Features a clean, text-focused layout with service title, intro description, content paragraphs, and a bulleted services list. Ideal for professional services, consulting, or any service that benefits from detailed written explanations without heavy visual elements.",
    semanticTags: [
      "service",
      "detail",
      "minimal",
      "prose",
      "text",
      "content",
      "services-list",
      "professional",
      "consulting",
    ],
    category: "service-detail",
    component: ServiceDetailProseMinimal,
    props: "ServiceDetailProseMinimalProps",
    exampleUsage: `
<ServiceDetailProseMinimal
  title="UX/UI Design"
  introTitle="User-Centered Design That Converts"
  introDescription="We believe that great design should be intuitive..."
  contentSections={[
    { title: "Creating Meaningful Digital Experiences", paragraphs: ["..."] }
  ]}
  servicesList={{ title: "Our Services", items: ["User research", "Wireframing"] }}
/>`.trim(),
  },

  "service-detail-image-hero": {
    id: "service-detail-image-hero",
    name: "Service Detail Image Hero",
    description:
      "A service detail page featuring a full-width background image hero with dark overlay and centered title. Includes introduction section, prose content blocks, and services list. The dramatic hero image creates visual impact while maintaining readability. Perfect for creative services, design agencies, or any service that benefits from strong visual presentation.",
    semanticTags: [
      "service",
      "detail",
      "hero",
      "image",
      "background",
      "overlay",
      "dramatic",
      "creative",
      "agency",
    ],
    category: "service-detail",
    component: ServiceDetailImageHero,
    props: "ServiceDetailImageHeroProps",
    exampleUsage: `
<ServiceDetailImageHero
  title="UX/UI Design"
  heroImage={{ src: "/images/hero.jpg", alt: "Service hero" }}
  introTitle="User-Centered Design That Converts"
  introDescription="We believe that great design should be intuitive..."
  contentSections={[{ title: "Creating Experiences", paragraphs: ["..."] }]}
/>`.trim(),
  },

  "service-detail-stats-hero": {
    id: "service-detail-stats-hero",
    name: "Service Detail Stats Hero",
    description:
      "A service detail page with a background image hero featuring a service icon, followed by a stats grid section highlighting expertise metrics. Includes prose content and services list. The stats section with tool/technology icons builds credibility by showcasing proficiency levels and experience. Ideal for technical services, development agencies, or services where quantifiable expertise matters.",
    semanticTags: [
      "service",
      "detail",
      "hero",
      "stats",
      "metrics",
      "expertise",
      "technical",
      "development",
      "credibility",
    ],
    category: "service-detail",
    component: ServiceDetailStatsHero,
    props: "ServiceDetailStatsHeroProps",
    exampleUsage: `
<ServiceDetailStatsHero
  title="UX/UI Design"
  heroImage={{ src: "/images/hero.jpg", alt: "Service hero" }}
  serviceIcon={{ src: "/icons/ux.svg", alt: "UX/UI" }}
  stats={[
    { icon: "/icons/adobe.svg", title: "Adobe Suite", value: "100%", description: "Proficiency" }
  ]}
/>`.trim(),
  },

  "service-detail-sidebar-stats": {
    id: "service-detail-sidebar-stats",
    name: "Service Detail Sidebar Stats",
    description:
      "A two-column service detail layout with main content on the left and a sticky sidebar on the right displaying expertise stats. Features a muted hero with service icon, prose content, icon-enhanced services list, and sidebar with tool/technology proficiency indicators. The sidebar remains visible while scrolling through content. Perfect for services requiring detailed explanations with quick-reference expertise information.",
    semanticTags: [
      "service",
      "detail",
      "sidebar",
      "stats",
      "sticky",
      "two-column",
      "expertise",
      "icons",
      "professional",
    ],
    category: "service-detail",
    component: ServiceDetailSidebarStats,
    props: "ServiceDetailSidebarStatsProps",
    exampleUsage: `
<ServiceDetailSidebarStats
  title="UX/UI Design"
  serviceIcon={{ src: "/icons/ux.svg", alt: "UX/UI" }}
  services={[{ icon: "lucide/users", title: "User research" }]}
  stats={[{ icon: "/icons/figma.svg", title: "Figma", description: "5+ years" }]}
/>`.trim(),
  },

  "service-detail-sidebar-related": {
    id: "service-detail-sidebar-related",
    name: "Service Detail Sidebar Related",
    description:
      "A two-column service detail layout featuring main content with a sidebar containing both expertise stats and related services links. The sidebar includes clickable related service cards with icons and descriptions for cross-navigation. Ideal for businesses with multiple interconnected services where users might want to explore related offerings while learning about a specific service.",
    semanticTags: [
      "service",
      "detail",
      "sidebar",
      "related",
      "navigation",
      "cross-sell",
      "links",
      "expertise",
      "interconnected",
    ],
    category: "service-detail",
    component: ServiceDetailSidebarRelated,
    props: "ServiceDetailSidebarRelatedProps",
    exampleUsage: `
<ServiceDetailSidebarRelated
  title="UX/UI Design"
  serviceIcon={{ src: "/icons/ux.svg", alt: "UX/UI" }}
  stats={[{ icon: "/icons/figma.svg", title: "Figma", description: "Expert" }]}
  relatedServices={[
    { icon: "lucide/code", title: "Web Development", description: "Custom websites", link: "/services/web" }
  ]}
/>`.trim(),
  },

  "service-detail-centered-expertise": {
    id: "service-detail-centered-expertise",
    name: "Service Detail Centered Expertise",
    description:
      "A centered service detail layout with a prominent expertise grid, icon-enhanced services list, and related services cards with images. Features a centered hero with service icon, four-column expertise grid showing tools/technologies, two-column services checklist, and three-column related services with thumbnail images. Perfect for showcasing comprehensive service offerings with visual hierarchy and clear navigation to related services.",
    semanticTags: [
      "service",
      "detail",
      "centered",
      "expertise",
      "grid",
      "cards",
      "images",
      "comprehensive",
      "visual",
    ],
    category: "service-detail",
    component: ServiceDetailCenteredExpertise,
    props: "ServiceDetailCenteredExpertiseProps",
    exampleUsage: `
<ServiceDetailCenteredExpertise
  title="UX/UI Design"
  serviceIcon={{ src: "/icons/ux.svg", alt: "UX/UI" }}
  expertise={[{ icon: "/icons/figma.svg", title: "Figma", description: "Expert" }]}
  services={[{ icon: "lucide/users", title: "User research" }]}
  relatedServices={[{ image: "/images/web.jpg", title: "Web Dev", description: "...", link: "#" }]}
/>`.trim(),
  },

  "service-detail-compact-cards": {
    id: "service-detail-compact-cards",
    name: "Service Detail Compact Cards",
    description:
      "A compact service detail layout with horizontal expertise cards, icon-enhanced services list, and a four-column related services grid. Features a left-aligned service icon with title, inline expertise badges, two-column services checklist, and compact related service cards with images. The horizontal expertise layout saves vertical space while maintaining visual appeal. Ideal for services pages where space efficiency is important or when displaying multiple services on a single page.",
    semanticTags: [
      "service",
      "detail",
      "compact",
      "cards",
      "horizontal",
      "badges",
      "efficient",
      "grid",
      "multiple",
    ],
    category: "service-detail",
    component: ServiceDetailCompactCards,
    props: "ServiceDetailCompactCardsProps",
    exampleUsage: `
<ServiceDetailCompactCards
  title="UX/UI Design"
  serviceIcon={{ src: "/icons/ux.svg", alt: "UX/UI" }}
  expertise={[{ icon: "/icons/figma.svg", title: "Figma", description: "Expert" }]}
  services={[{ icon: "lucide/users", title: "User research" }]}
  relatedServices={[{ image: "/images/web.jpg", title: "Web Dev", description: "...", link: "#" }]}
/>`.trim(),
  },

  // Services List components
  "services-list-icon-grid": {
    id: "services-list-icon-grid",
    name: "Services List Icon Grid",
    description:
      "A 2x2 grid layout displaying services with icons, titles, descriptions, and bullet point items. Each service card features a circular icon, bold title, descriptive text, and a list of included items. Ideal for showcasing 4 core services with their key offerings in a clean, organized grid format.",
    semanticTags: [
      "services",
      "grid",
      "icons",
      "cards",
      "offerings",
      "features",
      "list",
      "bullet-points",
    ],
    category: "services-list",
    component: ServicesListIconGrid,
    props: "ServicesListIconGridProps",
    exampleUsage: `
<ServicesListIconGrid
  title="Our Services"
  description="Comprehensive solutions for your business"
  services={[
    {
      icon: "lucide/code",
      title: "Web Development",
      description: "Custom web solutions",
      items: ["React", "Next.js", "TypeScript"]
    }
  ]}
/>`.trim(),
  },

  "services-list-muted-cards": {
    id: "services-list-muted-cards",
    name: "Services List Muted Cards",
    description:
      "A 2x2 grid layout with muted background cards featuring icons in bordered boxes. Each card includes a 'What's Included' section with a 2-column grid of items. Perfect for displaying comprehensive service offerings with detailed inclusions in a visually distinct format.",
    semanticTags: [
      "services",
      "grid",
      "cards",
      "muted",
      "inclusions",
      "features",
      "bordered",
      "comprehensive",
    ],
    category: "services-list",
    component: ServicesListMutedCards,
    props: "ServicesListMutedCardsProps",
    exampleUsage: `
<ServicesListMutedCards
  title="What We Offer"
  description="Full-service solutions"
  services={[
    {
      icon: "lucide/palette",
      title: "Design Services",
      description: "Creative design solutions",
      items: ["UI Design", "Branding", "Prototyping"]
    }
  ]}
/>`.trim(),
  },

  "services-list-centered-icons": {
    id: "services-list-centered-icons",
    name: "Services List Centered Icons",
    description:
      "A responsive 1x4 grid layout with centered text and circular icons. Features hover effects on icons that invert colors. Each service displays an icon, title, description, and stacked items. Ideal for a compact, visually balanced presentation of services with interactive hover states.",
    semanticTags: [
      "services",
      "grid",
      "centered",
      "icons",
      "hover",
      "interactive",
      "compact",
      "balanced",
    ],
    category: "services-list",
    component: ServicesListCenteredIcons,
    props: "ServicesListCenteredIconsProps",
    exampleUsage: `
<ServicesListCenteredIcons
  title="Our Expertise"
  description="Areas we excel in"
  services={[
    {
      icon: "lucide/rocket",
      title: "Launch Support",
      description: "Get your product to market",
      items: ["Strategy", "Execution", "Support"]
    }
  ]}
/>`.trim(),
  },

  "services-list-vertical-tags": {
    id: "services-list-vertical-tags",
    name: "Services List Vertical Tags",
    description:
      "A vertical list layout with services displayed as bordered cards. Each card features an icon, title, description, and pill-shaped tags for included items. Perfect for a scrollable, detailed view of services with tag-based categorization of offerings.",
    semanticTags: [
      "services",
      "vertical",
      "list",
      "tags",
      "pills",
      "bordered",
      "scrollable",
      "detailed",
    ],
    category: "services-list",
    component: ServicesListVerticalTags,
    props: "ServicesListVerticalTagsProps",
    exampleUsage: `
<ServicesListVerticalTags
  title="Service Packages"
  description="Choose the right package for you"
  services={[
    {
      icon: "lucide/box",
      title: "Starter Package",
      description: "Perfect for small projects",
      items: ["Basic Setup", "Support", "Updates"]
    }
  ]}
/>`.trim(),
  },

  "services-list-accordion": {
    id: "services-list-accordion",
    name: "Services List Accordion",
    description:
      "An accordion-based expandable services section with detailed information. Each accordion item shows icon, title, and short description when collapsed, expanding to reveal full description, included items, and deliverables. Ideal for detailed service presentations where users can explore specific offerings without overwhelming the initial view.",
    semanticTags: [
      "services",
      "accordion",
      "expandable",
      "collapsible",
      "detailed",
      "deliverables",
      "interactive",
      "progressive-disclosure",
    ],
    category: "services-list",
    component: ServicesListAccordion,
    props: "ServicesListAccordionProps",
    exampleUsage: `
<ServicesListAccordion
  title="Explore Our Services"
  description="Click to learn more"
  services={[
    {
      icon: "lucide/settings",
      title: "Consulting",
      shortDescription: "Expert guidance",
      fullDescription: "Comprehensive consulting services",
      items: ["Analysis", "Strategy", "Implementation"],
      deliverables: ["Report", "Roadmap", "Support"]
    }
  ]}
/>`.trim(),
  },

  "services-list-pricing-grid": {
    id: "services-list-pricing-grid",
    name: "Services List Pricing Grid",
    description:
      "A 2x2 grid layout displaying services with duration and pricing information. Each card features an icon, title, description, timeline, price, included items, and a CTA button. Perfect for service-based businesses that want to showcase offerings with transparent pricing.",
    semanticTags: [
      "services",
      "pricing",
      "grid",
      "duration",
      "cost",
      "transparent",
      "cta",
      "packages",
    ],
    category: "services-list",
    component: ServicesListPricingGrid,
    props: "ServicesListPricingGridProps",
    exampleUsage: `
<ServicesListPricingGrid
  title="Service Pricing"
  description="Transparent pricing for all services"
  services={[
    {
      icon: "lucide/zap",
      title: "Quick Start",
      description: "Fast implementation",
      duration: "2 weeks",
      price: "$2,500",
      items: ["Setup", "Training", "Support"],
      ctaText: "Get Started",
      ctaLink: "/contact"
    }
  ]}
/>`.trim(),
  },

  "services-list-featured-highlight": {
    id: "services-list-featured-highlight",
    name: "Services List Featured Highlight",
    description:
      "A 2x2 grid layout with featured service highlighting. Featured services display with a 'Popular' badge, primary-colored styling, and enhanced visual treatment. Each card includes check icons for deliverables and CTA buttons. Ideal for highlighting a recommended or most popular service option among multiple offerings.",
    semanticTags: [
      "services",
      "featured",
      "highlight",
      "popular",
      "badge",
      "recommended",
      "grid",
      "cta",
    ],
    category: "services-list",
    component: ServicesListFeaturedHighlight,
    props: "ServicesListFeaturedHighlightProps",
    exampleUsage: `
<ServicesListFeaturedHighlight
  title="Choose Your Plan"
  description="Find the perfect fit"
  services={[
    {
      icon: "lucide/star",
      title: "Premium",
      description: "Full-featured solution",
      featured: true,
      items: ["All Features", "Priority Support", "Custom Integrations"],
      ctaText: "Choose Premium",
      ctaLink: "/signup"
    }
  ]}
/>`.trim(),
  },
  "services-list-feature-spotlight": {
    id: "services-list-feature-spotlight",
    name: "Service Feature Spotlight",
    description:
      "An alternating image-and-card layout that spotlights service differentiators with icon headers and badge pills. Great for storytelling sections that need visual depth while highlighting key benefits.",
    semanticTags: [
      "services",
      "features",
      "spotlight",
      "alternating",
      "image",
      "badges",
      "icons",
      "benefits",
      "storytelling",
    ],
    category: "services-list",
    component: ServicesListFeatureSpotlight,
    props: "ServicesListFeatureSpotlightProps",
    exampleUsage: `<ServicesListFeatureSpotlight />`.trim(),
  },

  "services-list-image-cards": {
    id: "services-list-image-cards",
    name: "Services List Image Cards",
    description:
      "An asymmetric layout with introductory text on the left and 2 featured service cards on the right. Each service card features a large image overlay with gradient, title, description, and CTA link. Perfect for showcasing 2-3 primary services with strong visual impact and clear calls to action.",
    semanticTags: [
      "services",
      "images",
      "cards",
      "asymmetric",
      "visual",
      "gradient",
      "overlay",
      "cta",
    ],
    category: "services-list",
    component: ServicesListImageCards,
    props: "ServicesListImageCardsProps",
    exampleUsage: `
<ServicesListImageCards
  title="Featured Services"
  description="Our most popular offerings"
  services={[
    {
      image: "/images/service1.jpg",
      title: "Web Design",
      description: "Beautiful, responsive websites",
      ctaText: "Learn More",
      ctaLink: "/services/web-design"
    }
  ]}
/>`.trim(),
  },

  "services-list-image-overlay-grid": {
    id: "services-list-image-overlay-grid",
    name: "Services List Image Overlay Grid",
    description:
      "An asymmetric layout with introductory text on the left and a 5-service grid on the right. Services display as image cards with gradient overlays, titles, and descriptions that appear on hover. The grid features varying card sizes for visual interest. Ideal for showcasing multiple services with strong imagery.",
    semanticTags: [
      "services",
      "images",
      "grid",
      "overlay",
      "hover",
      "asymmetric",
      "visual",
      "gallery",
    ],
    category: "services-list",
    component: ServicesListImageOverlayGrid,
    props: "ServicesListImageOverlayGridProps",
    exampleUsage: `
<ServicesListImageOverlayGrid
  title="Our Services"
  description="Explore what we offer"
  services={[
    {
      image: "/images/service.jpg",
      title: "Consulting",
      description: "Expert guidance for your business"
    }
  ]}
/>`.trim(),
  },

  "services-list-hero-cards": {
    id: "services-list-hero-cards",
    name: "Services List Hero Cards",
    description:
      "A featured services layout with a large hero card and smaller supporting cards in a grid. The hero card displays prominently with a badge, full description, and CTA button. Supporting cards show as compact image cards with hover effects. Perfect for highlighting a primary service while showcasing related offerings.",
    semanticTags: [
      "services",
      "hero",
      "featured",
      "cards",
      "grid",
      "badge",
      "cta",
      "highlight",
    ],
    category: "services-list",
    component: ServicesListHeroCards,
    props: "ServicesListHeroCardsProps",
    exampleUsage: `
<ServicesListHeroCards
  title="Our Solutions"
  description="Comprehensive service offerings"
  heroService={{
    image: "/images/hero.jpg",
    badge: "Featured",
    title: "Enterprise Solutions",
    description: "Complete business transformation",
    ctaText: "Learn More",
    ctaLink: "/enterprise"
  }}
  services={[
    {
      image: "/images/service.jpg",
      title: "Consulting",
      link: "/consulting"
    }
  ]}
/>`.trim(),
  },

  "services-list-two-column-grid": {
    id: "services-list-two-column-grid",
    name: "Services List Two Column Grid",
    description:
      "A 2-column layout with introductory content on the left and a 2x2 service grid on the right. The left column features a badge, title, description, and dual CTA buttons. The right column displays services as bordered cards with icons and hover effects. Ideal for presenting services alongside compelling marketing copy.",
    semanticTags: [
      "services",
      "two-column",
      "grid",
      "marketing",
      "cta",
      "icons",
      "bordered",
      "split",
    ],
    category: "services-list",
    component: ServicesListTwoColumnGrid,
    props: "ServicesListTwoColumnGridProps",
    exampleUsage: `
<ServicesListTwoColumnGrid
  badge="Services"
  title="What We Do"
  description="Comprehensive solutions"
  primaryCta={{ text: "Get Started", link: "/contact" }}
  secondaryCta={{ text: "Learn More", link: "/about" }}
  services={[
    {
      icon: "lucide/code",
      title: "Development",
      description: "Custom software solutions"
    }
  ]}
/>`.trim(),
  },

  "services-list-masonry": {
    id: "services-list-masonry",
    name: "Services List Masonry",
    description:
      "A masonry-style grid layout with variable card heights based on content. Featured services display with additional items and larger visual presence. Each card includes an icon, title, description, optional items list, and CTA link. Perfect for showcasing services with varying levels of detail in an organic, Pinterest-style layout.",
    semanticTags: [
      "services",
      "masonry",
      "grid",
      "variable",
      "organic",
      "pinterest",
      "featured",
      "dynamic",
    ],
    category: "services-list",
    component: ServicesListMasonry,
    props: "ServicesListMasonryProps",
    exampleUsage: `
<ServicesListMasonry
  title="Our Services"
  description="Explore our offerings"
  services={[
    {
      icon: "lucide/layers",
      title: "Full Stack Development",
      description: "End-to-end solutions",
      featured: true,
      items: ["Frontend", "Backend", "DevOps"],
      ctaText: "Learn More",
      ctaLink: "/services/fullstack"
    }
  ]}
/>`.trim(),
  },

  "services-list-category-accordion": {
    id: "services-list-category-accordion",
    name: "Services List Category Accordion",
    description:
      "An accordion layout with large titles and expandable service items featuring categories and badges. Each accordion item displays a category label, title, and expands to show full description, included items, and technology badges. Ideal for organizing services by category with detailed information revealed on demand.",
    semanticTags: [
      "services",
      "accordion",
      "categories",
      "badges",
      "expandable",
      "organized",
      "detailed",
      "technology",
    ],
    category: "services-list",
    component: ServicesListCategoryAccordion,
    props: "ServicesListCategoryAccordionProps",
    exampleUsage: `
<ServicesListCategoryAccordion
  title="Services by Category"
  description="Organized service offerings"
  services={[
    {
      category: "Development",
      title: "Web Applications",
      description: "Custom web app development",
      items: ["React", "Node.js", "PostgreSQL"],
      badges: ["React", "TypeScript", "AWS"]
    }
  ]}
/>`.trim(),
  },

  "services-list-progress-sidebar": {
    id: "services-list-progress-sidebar",
    name: "Services List Progress Sidebar",
    description:
      "A creative solutions layout with a sticky left sidebar and service list with progress indicators. The sidebar contains title, description, and CTA. Each service displays with an icon, title, description, and visual progress bar. Perfect for showcasing a process or methodology with clear status indicators for each phase.",
    semanticTags: [
      "services",
      "progress",
      "sidebar",
      "sticky",
      "process",
      "methodology",
      "phases",
      "status",
    ],
    category: "services-list",
    component: ServicesListProgressSidebar,
    props: "ServicesListProgressSidebarProps",
    exampleUsage: `
<ServicesListProgressSidebar
  sidebarTitle="Our Process"
  sidebarDescription="How we work"
  ctaText="Start Project"
  ctaLink="/contact"
  services={[
    {
      icon: "lucide/search",
      title: "Discovery",
      description: "Understanding your needs",
      progress: 100
    }
  ]}
/>`.trim(),
  },

  "services-list-table-hover": {
    id: "services-list-table-hover",
    name: "Services List Table Hover",
    description:
      "A table-based services layout with cursor-following image preview on hover. Services display as rows with category, title, description, and an arrow indicator. On hover, a preview image appears near the cursor. Ideal for a clean, minimal presentation with interactive image previews that add visual interest without cluttering the layout.",
    semanticTags: [
      "services",
      "table",
      "hover",
      "preview",
      "minimal",
      "clean",
      "interactive",
      "cursor",
    ],
    category: "services-list",
    component: ServicesListTableHover,
    props: "ServicesListTableHoverProps",
    exampleUsage: `
<ServicesListTableHover
  title="Our Services"
  description="Hover to preview"
  services={[
    {
      category: "Design",
      title: "UI/UX Design",
      description: "User-centered design",
      image: "/images/design.jpg",
      link: "/services/design"
    }
  ]}
/>`.trim(),
  },

  "services-list-methodology-steps": {
    id: "services-list-methodology-steps",
    name: "Services List Methodology Steps",
    description:
      "A structured methodology layout displaying numbered service steps with options. Each step features a large number, title, description, and a list of included options/deliverables. Perfect for showcasing a process, workflow, or methodology with clear sequential steps.",
    semanticTags: [
      "services",
      "methodology",
      "steps",
      "numbered",
      "process",
      "workflow",
      "sequential",
      "deliverables",
    ],
    category: "services-list",
    component: ServicesListMethodologySteps,
    props: "ServicesListMethodologyStepsProps",
    exampleUsage: `
<ServicesListMethodologySteps
  title="Our Methodology"
  description="A proven approach"
  steps={[
    {
      number: 1,
      title: "Discovery",
      description: "Understanding your goals",
      options: ["Stakeholder interviews", "Market research", "Requirements gathering"]
    }
  ]}
/>`.trim(),
  },

  "services-list-sticky-image": {
    id: "services-list-sticky-image",
    name: "Services List Sticky Image",
    description:
      "A sticky left sidebar layout with image transitions and a scrollable service list on the right. As users scroll through services, the corresponding image appears in the sticky left panel. Each service includes title, description, items list, and CTA. Perfect for detailed service presentations with strong visual support that changes contextually.",
    semanticTags: [
      "services",
      "sticky",
      "image",
      "scroll",
      "transitions",
      "contextual",
      "visual",
      "detailed",
    ],
    category: "services-list",
    component: ServicesListStickyImage,
    props: "ServicesListStickyImageProps",
    exampleUsage: `
<ServicesListStickyImage
  title="Our Services"
  description="Scroll to explore"
  services={[
    {
      image: "/images/service1.jpg",
      title: "Web Development",
      description: "Custom web solutions",
      items: ["React", "Next.js", "Node.js"],
      ctaText: "Learn More",
      ctaLink: "/services/web"
    }
  ]}
/>`.trim(),
  },

  "services-list-tabs-features": {
    id: "services-list-tabs-features",
    name: "Services List Tabs Features",
    description:
      "A tabbed services layout with feature lists and images. Users can switch between service categories using tabs, with each tab displaying a description, feature list with check icons, and a corresponding image. Ideal for organizing multiple service categories in a compact, interactive format.",
    semanticTags: [
      "services",
      "tabs",
      "features",
      "categories",
      "interactive",
      "compact",
      "checklist",
      "images",
    ],
    category: "services-list",
    component: ServicesListTabsFeatures,
    props: "ServicesListTabsFeaturesProps",
    exampleUsage: `
<ServicesListTabsFeatures
  title="Service Categories"
  description="Explore by category"
  tabs={[
    {
      label: "Development",
      description: "Custom software solutions",
      features: ["Web Apps", "Mobile Apps", "APIs"],
      image: "/images/dev.jpg"
    }
  ]}
/>`.trim(),
  },

  "services-list-video-showcase": {
    id: "services-list-video-showcase",
    name: "Services List Video Showcase",
    description:
      "A services layout featuring video showcases for each service. Each service card includes an icon, title, description, video player with poster image, and CTA. Videos play on hover or click. Perfect for showcasing services with dynamic video content that demonstrates capabilities or processes.",
    semanticTags: [
      "services",
      "video",
      "showcase",
      "multimedia",
      "dynamic",
      "interactive",
      "demonstration",
      "media",
    ],
    category: "services-list",
    component: ServicesListVideoShowcase,
    props: "ServicesListVideoShowcaseProps",
    exampleUsage: `
<ServicesListVideoShowcase
  title="See Our Work"
  description="Watch how we deliver"
  services={[
    {
      icon: "lucide/play",
      title: "Product Demo",
      description: "See our platform in action",
      videoUrl: "/videos/demo.mp4",
      posterImage: "/images/poster.jpg",
      ctaText: "Try It Free",
      ctaLink: "/signup"
    }
  ]}
/>`.trim(),
  },

  "services-list-culture-tabs": {
    id: "services-list-culture-tabs",
    name: "Services List Culture Tabs",
    description:
      "A tabbed layout showcasing company culture aspects with testimonials. Each tab displays a culture aspect with description, image gallery, and employee testimonial. Includes a bottom CTA section for recruitment. Ideal for about/careers pages highlighting company values and culture through employee stories and visual content.",
    semanticTags: [
      "services",
      "culture",
      "tabs",
      "testimonials",
      "careers",
      "values",
      "gallery",
      "recruitment",
    ],
    category: "services-list",
    component: ServicesListCultureTabs,
    props: "ServicesListCultureTabsProps",
    exampleUsage: `
<ServicesListCultureTabs
  title="Our Culture"
  description="What makes us unique"
  tabs={[
    {
      label: "Innovation",
      description: "We embrace new ideas",
      images: ["/images/team1.jpg", "/images/team2.jpg"],
      testimonial: {
        quote: "Best place I've worked",
        author: "Jane Doe",
        role: "Engineer"
      }
    }
  ]}
  ctaTitle="Join Our Team"
  ctaDescription="We're hiring!"
  ctaLink="/careers"
/>`.trim(),
  },

  "services-list-accordion-benefits": {
    id: "services-list-accordion-benefits",
    name: "Services List Accordion Benefits",
    description:
      "An accordion layout with expandable service items featuring detailed benefits lists. Each accordion item shows title and short description when collapsed, expanding to reveal full description, benefits list with bullet points, and a CTA link. Includes a bottom CTA for custom quotes. Ideal for freelancers or agencies showcasing detailed service offerings with clear value propositions.",
    semanticTags: [
      "services",
      "accordion",
      "benefits",
      "expandable",
      "detailed",
      "value-proposition",
      "freelancer",
      "agency",
    ],
    category: "services-list",
    component: ServicesListAccordionBenefits,
    props: "ServicesListAccordionBenefitsProps",
    exampleUsage: `
<ServicesListAccordionBenefits
  title="Our Services"
  description="Explore what we offer"
  services={[
    {
      title: "Brand Strategy",
      shortDescription: "Define your brand identity",
      fullDescription: "Comprehensive brand strategy services",
      benefits: ["Market positioning", "Brand voice", "Visual identity"],
      ctaText: "Get Started",
      ctaLink: "/contact"
    }
  ]}
  bottomCtaTitle="Need Something Custom?"
  bottomCtaLink="/custom-quote"
/>`.trim(),
  },

  "services-list-split-checklist": {
    id: "services-list-split-checklist",
    name: "Services List Split Checklist",
    description:
      "A split layout with introductory content and image on the left, service checklist on the right. The left column features a badge, title, description, dual CTAs, and an optional image. The right column displays services as a checklist with check icons, titles, and descriptions. Perfect for presenting services alongside compelling marketing copy and visual content.",
    semanticTags: [
      "services",
      "split",
      "checklist",
      "marketing",
      "cta",
      "image",
      "visual",
      "two-column",
    ],
    category: "services-list",
    component: ServicesListSplitChecklist,
    props: "ServicesListSplitChecklistProps",
    exampleUsage: `
<ServicesListSplitChecklist
  badge="Services"
  title="What's Included"
  description="Everything you need"
  image="/images/services.jpg"
  primaryCta={{ text: "Get Started", link: "/contact" }}
  secondaryCta={{ text: "Learn More", link: "/about" }}
  services={[
    {
      title: "Strategy",
      description: "Comprehensive planning"
    }
  ]}
/>`.trim(),
  },

  "services-list-minimal-grid": {
    id: "services-list-minimal-grid",
    name: "Services List Minimal Grid",
    description:
      "A clean, minimal 3-column grid layout for displaying services. Each service card features an icon, title, description, and optional CTA link. The design emphasizes simplicity and readability with subtle hover effects. Ideal for showcasing multiple services in a clean, scannable format.",
    semanticTags: [
      "services",
      "minimal",
      "grid",
      "clean",
      "simple",
      "scannable",
      "icons",
      "three-column",
    ],
    category: "services-list",
    component: ServicesListMinimalGrid,
    props: "ServicesListMinimalGridProps",
    exampleUsage: `
<ServicesListMinimalGrid
  title="Our Services"
  description="Simple, effective solutions"
  services={[
    {
      icon: "lucide/globe",
      title: "Web Design",
      description: "Beautiful, responsive websites",
      ctaText: "Learn More",
      ctaLink: "/services/web"
    }
  ]}
/>`.trim(),
  },

  "services-list-numbered-steps": {
    id: "services-list-numbered-steps",
    name: "Services List Numbered Steps",
    description:
      "A numbered steps layout displaying services as a sequential process. Each step features a large number, title, description, and optional items list. Connected by a vertical line to show progression. Perfect for showcasing a workflow, process, or methodology with clear sequential steps and deliverables.",
    semanticTags: [
      "services",
      "numbered",
      "steps",
      "process",
      "workflow",
      "sequential",
      "timeline",
      "methodology",
    ],
    category: "services-list",
    component: ServicesListNumberedSteps,
    props: "ServicesListNumberedStepsProps",
    exampleUsage: `
<ServicesListNumberedSteps
  title="Our Process"
  description="How we work"
  steps={[
    {
      title: "Discovery",
      description: "Understanding your needs",
      items: ["Requirements", "Research", "Planning"]
    }
  ]}
/>`.trim(),
  },

  "services-list-cards-hover": {
    id: "services-list-cards-hover",
    name: "Services List Cards Hover",
    description:
      "A grid layout with interactive hover cards that reveal additional features. Each card displays an icon, title, and description, with features appearing on hover. Cards feature smooth transitions and visual feedback. Ideal for showcasing services with progressive disclosure of details through hover interactions.",
    semanticTags: [
      "services",
      "cards",
      "hover",
      "interactive",
      "progressive-disclosure",
      "features",
      "transitions",
      "grid",
    ],
    category: "services-list",
    component: ServicesListCardsHover,
    props: "ServicesListCardsHoverProps",
    exampleUsage: `
<ServicesListCardsHover
  title="Our Services"
  description="Hover to explore"
  services={[
    {
      icon: "lucide/code",
      title: "Development",
      description: "Custom solutions",
      features: ["React", "Node.js", "AWS"]
    }
  ]}
/>`.trim(),
  },

  "services-list-timeline": {
    id: "services-list-timeline",
    name: "Services List Timeline",
    description:
      "A timeline-style layout displaying services as project phases. Each phase features an icon, title, description, duration badge, and deliverables list. Connected by a vertical timeline line with dot markers. Perfect for showcasing a project workflow or service delivery process with clear timelines and expected outcomes.",
    semanticTags: [
      "services",
      "timeline",
      "phases",
      "project",
      "workflow",
      "duration",
      "deliverables",
      "process",
    ],
    category: "services-list",
    component: ServicesListTimeline,
    props: "ServicesListTimelineProps",
    exampleUsage: `
<ServicesListTimeline
  title="Project Timeline"
  description="Our delivery process"
  phases={[
    {
      icon: "lucide/search",
      title: "Discovery",
      description: "Understanding requirements",
      duration: "1-2 weeks",
      deliverables: ["Requirements doc", "Project plan"]
    }
  ]}
/>`.trim(),
  },

  // Resource List components
  "resource-list-hero-filter": {
    id: "resource-list-hero-filter",
    name: "Resource List Hero Filter",
    description:
      "A comprehensive resource listing page with hero section, breadcrumb navigation, email subscription form, featured post card, and filterable resource grid with category checkboxes and load more functionality. Features a pattern background, email capture with @page-speed/forms integration, and responsive card layout. Ideal for resource centers, blog archives, documentation hubs, report libraries, knowledge bases, and content marketing pages that need category filtering and email capture functionality.",
    semanticTags: [
      "resources",
      "blog",
      "articles",
      "reports",
      "documentation",
      "knowledge-base",
      "filter",
      "categories",
      "newsletter",
      "email-capture",
      "hero",
      "breadcrumb",
      "cards",
      "grid",
      "load-more",
      "pagination",
    ],
    category: "resource-list",
    component: ResourceListHeroFilter,
    props: "ResourceListHeroFilterProps",
    exampleUsage: `
<ResourceListHeroFilter
  title="Explore Reports"
  description="The best Reports is one that captivates readers with engaging, well-researched content."
  breadcrumb={[
    { label: "Resources", link: "#" },
    { label: "Reports", link: "#" }
  ]}
  categories={[
    { label: "All", value: "all" },
    { label: "Productivity", value: "productivity" },
    { label: "Performance", value: "performance" }
  ]}
  posts={[
    {
      category: "Productivity",
      title: "5 VS Code Extensions That Will Save You Hours",
      summary: "Discover must-have extensions to boost your coding efficiency.",
      link: "#",
      cta: "Read More",
      thumbnail: "https://example.com/image.jpg"
    }
  ]}
  formConfig={{
    endpoint: "/api/subscribe",
    format: "json"
  }}
/>`.trim(),
  },
  "resource-list-featured-grid": {
    id: "resource-list-featured-grid",
    name: "Resource List Featured Grid",
    description:
      "A visually rich resource listing with featured article hero, secondary article cards, and a tabbed category filter for browsing articles. Features large featured article with image overlay, badge, and author avatars, two secondary article cards with grayscale-to-color hover effect, tabbed category filtering, and article list with title, category, date, and author avatars. Ideal for resource centers, whitepapers libraries, research publications, tech blogs, news portals, and content hubs that want to highlight featured content while providing easy category-based navigation.",
    semanticTags: [
      "resources",
      "whitepapers",
      "articles",
      "featured",
      "grid",
      "tabs",
      "categories",
      "filter",
      "authors",
      "avatars",
      "news",
      "publications",
      "research",
    ],
    category: "resource-list",
    component: ResourceListFeaturedGrid,
    props: "ResourceListFeaturedGridProps",
    exampleUsage: `
<ResourceListFeaturedGrid
  title="Resources & Whitepapers"
  description="Explore our thoughts and perspectives on key topics."
  categories={["All", "Data", "AI", "Security", "News"]}
  featuredArticle={{
    title: "Getting Started With Modern Digital Platforms",
    imageUrl: "https://example.com/featured.jpg",
    date: "Dec 4, 2024",
    authors: ["https://example.com/avatar1.jpg"],
    link: "#",
    badge: "Featured Article"
  }}
  articles={[
    {
      title: "Exploring Modern Data Analytics",
      category: "Data",
      date: "Dec 4, 2024",
      author: ["https://example.com/avatar1.jpg"],
      link: "#"
    }
  ]}
/>`.trim(),
  },
  "resource-list-featured-articles": {
    id: "resource-list-featured-articles",
    name: "Resource List Featured Articles",
    description:
      "A clean resource listing with a prominent featured post section and a structured article list showing date, category, and title. Features a featured post card with large image, badge, title, and CTA button, plus an article list with three-column layout (date, category, title) and hover effects. Ideal for blog archives, resource libraries, documentation indexes, knowledge bases, tutorial collections, and content hubs that want to highlight a featured piece while providing easy access to other articles.",
    semanticTags: [
      "resources",
      "articles",
      "blog",
      "featured",
      "list",
      "tutorials",
      "documentation",
      "knowledge-base",
      "archive",
      "minimal",
      "clean",
    ],
    category: "resource-list",
    component: ResourceListFeaturedArticles,
    props: "ResourceListFeaturedArticlesProps",
    exampleUsage: `
<ResourceListFeaturedArticles
  featuredPost={{
    title: "How to Build Reusable UI Component Blocks",
    imageUrl: "https://example.com/featured.jpg",
    link: "#"
  }}
  featuredBadgeText="Featured Resource"
  featuredButtonText="Read more"
  articlesTitle="Resources"
  articles={[
    {
      date: "Jan 02, 2025",
      category: "Design Systems",
      title: "Mastering Reusable UI Block Patterns",
      link: "#"
    }
  ]}
/>`.trim(),
  },
  "resource-list-news-updates": {
    id: "resource-list-news-updates",
    name: "Resource List News Updates",
    description:
      "A news and updates listing with animated hover effects, category badges, author avatars, and dates in a clean two-column layout. Features section label with accent dot indicator, two-line title with primary/muted color split, news items with hover slide animation and background highlight, and arrow icon that appears on hover. Ideal for company news sections, press release archives, update logs, announcement pages, changelog displays, and any content that benefits from a timeline-style presentation with author attribution.",
    semanticTags: [
      "news",
      "updates",
      "announcements",
      "press-releases",
      "changelog",
      "timeline",
      "authors",
      "avatars",
      "animated",
      "hover-effects",
    ],
    category: "resource-list",
    component: ResourceListNewsUpdates,
    props: "ResourceListNewsUpdatesProps",
    exampleUsage: `
<ResourceListNewsUpdates
  sectionLabel="Resources"
  title="Stay in the loop?"
  subtitle="Discover our recent updates."
  news={[
    {
      title: "TechFlow AI Platform now available on Azure Marketplace",
      category: "Partnership",
      avatar: "https://example.com/avatar1.jpg",
      date: "June 15, 2024",
      link: "#"
    }
  ]}
/>`.trim(),
  },
  "resource-list-course-cards": {
    id: "resource-list-course-cards",
    name: "Resource List Course Cards",
    description:
      "A course/training listing with detailed metadata cards featuring author info, lesson counts, video duration, and animated visual elements. Features course cards with badge, title, description, and author info, metadata display (audience, lessons count, videos count, duration), author section with avatar, name, and title, and animated visual element with stacked cards and gradient background. Ideal for online course platforms, training portals, educational resources, tutorial libraries, certification programs, and learning management systems that need to showcase course details with instructor information.",
    semanticTags: [
      "courses",
      "training",
      "education",
      "tutorials",
      "learning",
      "lessons",
      "videos",
      "instructors",
      "authors",
      "certification",
      "lms",
      "animated",
    ],
    category: "resource-list",
    component: ResourceListCourseCards,
    props: "ResourceListCourseCardsProps",
    exampleUsage: `
<ResourceListCourseCards
  courses={[
    {
      badge: "Course",
      title: "Master Sanity Studio Fundamentals",
      description: "Learn the core concepts of Sanity Studio, from schema design to content modeling.",
      author: {
        name: "Alex Chen",
        title: "Senior Developer",
        avatar: "https://example.com/avatar1.jpg"
      },
      image: "https://example.com/course.jpg",
      lessons: 12,
      videos: 15,
      duration: "42:18 minutes",
      audience: ["Developers", "Content creators"],
      gradient: "from-blue-100 to-purple-100",
      cta: {
        text: "Start",
        url: "#"
      }
    }
  ]}
/>`.trim(),
  },
  "stats-simple-grid": {
    id: "stats-simple-grid",
    name: "Stats Simple Grid",
    description:
      "A clean, minimal stats section with a heading, action buttons, and a responsive grid of key metrics. Features a 2x2 grid on mobile that expands to 4 columns on larger screens. Ideal for showcasing company achievements, platform performance, or key business metrics with prominent numerical values.",
    semanticTags: [
      "stats",
      "metrics",
      "numbers",
      "achievements",
      "performance",
      "grid",
      "simple",
      "minimal",
      "kpi",
    ],
    category: "stats",
    component: StatsSimpleGrid,
    props: "StatsSimpleGridProps",
    exampleUsage: `
<StatsSimpleGrid
  heading="Platform Performance Insights"
  stats={[
    { value: "90%", label: "Customer Satisfaction" },
    { value: "200+", label: "Enterprise Clients" },
    { value: "99%", label: "Uptime Guarantee" },
    { value: "150+", label: "Team Members" },
  ]}
  primaryButtonText="Get Started"
  primaryButtonUrl="/signup"
/>`.trim(),
  },
  "stats-icon-cards": {
    id: "stats-icon-cards",
    name: "Stats Icon Cards",
    description:
      "A modern stats grid featuring bordered cards with icons, large numerical values, and growth indicators. Each card displays a metric with a circular icon badge, prominent value, and color-coded growth trend. Ideal for dashboards, analytics sections, or showcasing key performance indicators with visual hierarchy.",
    semanticTags: [
      "stats",
      "metrics",
      "icons",
      "cards",
      "growth",
      "trends",
      "dashboard",
      "analytics",
      "kpi",
    ],
    category: "stats",
    component: StatsIconCards,
    props: "StatsIconCardsProps",
    exampleUsage: `
<StatsIconCards
  heading="Our Growth in Numbers"
  description="Key metrics that showcase our impact"
  stats={[
    { label: "Active Users", value: "120K+", growth: "18% growth", icon: "lucide/users" },
    { label: "Revenue", value: "$3.2M", growth: "32% increase", icon: "lucide/dollar-sign" },
  ]}
/>`.trim(),
  },
  "stats-timeline-tabs": {
    id: "stats-timeline-tabs",
    name: "Stats Timeline Tabs",
    description:
      "A tabbed stats display showing metrics across different time periods (weekly, monthly, quarterly, yearly). Features a badge header, centered tab navigation, and a responsive grid of stat cards with color-coded trend indicators. Each stat shows the value, percentage change, and comparison period. Ideal for analytics dashboards, performance reports, or any time-series data visualization.",
    semanticTags: [
      "stats",
      "metrics",
      "tabs",
      "timeline",
      "periods",
      "trends",
      "analytics",
      "dashboard",
      "time-series",
    ],
    category: "stats",
    component: StatsTimelineTabs,
    props: "StatsTimelineTabsProps",
    exampleUsage: `
<StatsTimelineTabs
  badge="Performance Timeline"
  heading="Growth Progression"
  description="Track our key metrics over different time periods"
  defaultPeriod="monthly"
/>`.trim(),
  },
  "stats-primary-secondary": {
    id: "stats-primary-secondary",
    name: "Stats Primary Secondary",
    description:
      "A two-column stats layout featuring one prominent primary metric with a badge indicator, alongside a row of secondary supporting stats. The primary stat is emphasized with large typography and a verification badge, while secondary stats are displayed in a clean grid with a vertical divider. Ideal for highlighting a key achievement with supporting metrics.",
    semanticTags: [
      "stats",
      "metrics",
      "primary",
      "secondary",
      "highlight",
      "achievement",
      "badge",
      "two-column",
    ],
    category: "stats",
    component: StatsPrimarySecondary,
    props: "StatsPrimarySecondaryProps",
    exampleUsage: `
<StatsPrimarySecondary
  primaryValue="92%"
  primaryBadge="+7% this month"
  primaryDescription="of U.S. adults have bought from businesses using our platform"
  secondaryStats={[
    { value: "99.95%", label: "in fulfilling orders" },
    { value: "2,000+", label: "partner with us" },
  ]}
/>`.trim(),
  },
  "stats-growth-timeline": {
    id: "stats-growth-timeline",
    name: "Stats Growth Timeline",
    description:
      "A vertical timeline showcasing company milestones and growth journey. Features alternating left/right content placement, year badges, milestone cards with icons and metrics, a 'Where We Are Today' summary section, and a future roadmap CTA. Ideal for about pages, investor presentations, or company history sections.",
    semanticTags: [
      "stats",
      "timeline",
      "milestones",
      "growth",
      "history",
      "journey",
      "company",
      "about",
      "achievements",
    ],
    category: "stats",
    component: StatsGrowthTimeline,
    props: "StatsGrowthTimelineProps",
    exampleUsage: `
<StatsGrowthTimeline
  badge="Our Journey"
  heading="Growing From Startup to Industry Leader"
  milestones={[
    { id: "launch", year: "2018", title: "Company Founded", description: "Started with a small team", metric: { value: "5", label: "Team Members" }, icon: "lucide/calendar-days" },
  ]}
/>`.trim(),
  },
  "stats-impact-grid": {
    id: "stats-impact-grid",
    name: "Stats Impact Grid",
    description:
      "A comprehensive stats section featuring a grid of impact metrics with icons, an industry comparison bar chart, and a call-to-action. Each stat card displays an icon, large value with prefix/suffix, label, and description. Includes a visual comparison between industry average and platform performance. Ideal for showcasing ROI, business impact, or platform benefits with social proof.",
    semanticTags: [
      "stats",
      "impact",
      "roi",
      "comparison",
      "metrics",
      "icons",
      "cards",
      "cta",
      "benefits",
    ],
    category: "stats",
    component: StatsImpactGrid,
    props: "StatsImpactGridProps",
    exampleUsage: `
<StatsImpactGrid
  badge="Proven Results"
  heading="Transforming Businesses With Real Numbers"
  stats={[
    { id: "roi", value: "437", suffix: "%", label: "Average ROI", description: "Return on investment", icon: "lucide/line-chart" },
  ]}
/>`.trim(),
  },
  "stats-circular-progress": {
    id: "stats-circular-progress",
    name: "Stats Circular Progress",
    description:
      "A tabbed stats display featuring circular progress indicators organized by category (Business, Technical, Customer). Each stat shows a visual circular progress ring with the value centered inside, along with a label and additional info. Includes both desktop tabs and mobile dropdown for category selection. Ideal for KPI dashboards, performance reports, or multi-dimensional metrics visualization.",
    semanticTags: [
      "stats",
      "circular",
      "progress",
      "tabs",
      "categories",
      "kpi",
      "dashboard",
      "visualization",
    ],
    category: "stats",
    component: StatsCircularProgress,
    props: "StatsCircularProgressProps",
    exampleUsage: `
<StatsCircularProgress
  badge="Performance"
  heading="Key Performance Indicators"
  categories={[
    { id: "business", name: "Business", stats: [{ label: "Revenue Growth", value: 84, suffix: "%", info: "Year over year" }] },
  ]}
/>`.trim(),
  },
  "stats-card-group": {
    id: "stats-card-group",
    name: "Stats Card Group",
    description:
      "A compact stats display featuring three metrics in a bordered card with icons and optional avatar stacks. Each stat shows an icon, large value, and label. The first stat can include a stacked avatar group to represent users or customers. Ideal for social proof sections, trust indicators, or compact dashboard summaries.",
    semanticTags: [
      "stats",
      "cards",
      "icons",
      "avatars",
      "social-proof",
      "trust",
      "compact",
      "group",
    ],
    category: "stats",
    component: StatsCardGroup,
    props: "StatsCardGroupProps",
    exampleUsage: `
<StatsCardGroup
  stats={[
    { icon: "lucide/users", value: "2,000+", label: "Happy Customers", showAvatars: true },
    { icon: "lucide/star", value: "4.9/5", label: "Average Rating" },
  ]}
/>`.trim(),
  },
  "stats-animated-counter": {
    id: "stats-animated-counter",
    name: "Stats Animated Counter",
    description:
      "A stats section featuring animated number counters that trigger when scrolled into view. Each stat displays an optional icon, animated value with prefix/suffix, and label. Uses intersection observer to start the animation only when visible. Ideal for impact sections, achievements, or any metrics that benefit from engaging number animations.",
    semanticTags: [
      "stats",
      "animated",
      "counter",
      "numbers",
      "scroll",
      "intersection",
      "impact",
      "achievements",
    ],
    category: "stats",
    component: StatsAnimatedCounter,
    props: "StatsAnimatedCounterProps",
    exampleUsage: `
<StatsAnimatedCounter
  heading="Our Impact in Numbers"
  stats={[
    { value: 500, suffix: "+", label: "Projects Completed", icon: "lucide/folder-check" },
    { value: 98, suffix: "%", label: "Client Satisfaction", icon: "lucide/heart" },
  ]}
  animationDuration={2000}
/>`.trim(),
  },
  "stats-number-ticker": {
    id: "stats-number-ticker",
    name: "Stats Number Ticker",
    description:
      "A stats section featuring smooth number ticker animations that count up when scrolled into view. Each stat card displays an animated value with optional prefix/suffix, label, and description. Uses exponential easing for a polished counting effect. Supports both integer and decimal values. Ideal for landing pages, dashboards, or any section showcasing impressive metrics.",
    semanticTags: [
      "stats",
      "ticker",
      "animated",
      "numbers",
      "scroll",
      "cards",
      "metrics",
      "landing-page",
    ],
    category: "stats",
    component: StatsNumberTicker,
    props: "StatsNumberTickerProps",
    exampleUsage: `
<StatsNumberTicker
  badge="By The Numbers"
  heading="Platform Statistics"
  stats={[
    { value: 10000, suffix: "+", label: "Active Users", description: "Growing community" },
    { value: 99.9, suffix: "%", label: "Uptime", description: "Enterprise-grade reliability" },
  ]}
/>`.trim(),
  },
  "stats-milestone-sidebar": {
    id: "stats-milestone-sidebar",
    name: "Stats Milestone Sidebar",
    description:
      "A two-column layout featuring a sticky sidebar with heading and description, alongside a scrollable list of company milestones. Each milestone displays a year badge, title, and description. The sidebar remains fixed while users scroll through the timeline. Ideal for company history pages, about sections, or investor presentations.",
    semanticTags: [
      "stats",
      "milestones",
      "timeline",
      "sidebar",
      "sticky",
      "history",
      "company",
      "about",
    ],
    category: "stats",
    component: StatsMilestoneSidebar,
    props: "StatsMilestoneSidebarProps",
    exampleUsage: `
<StatsMilestoneSidebar
  heading="Our Journey"
  description="Key moments that shaped who we are today"
  milestones={[
    { year: "2018", title: "Company Founded", description: "Started with a vision to transform how businesses operate online." },
  ]}
/>`.trim(),
  },
  "stats-bar-comparison": {
    id: "stats-bar-comparison",
    name: "Stats Bar Comparison",
    description:
      "A visual comparison section featuring animated horizontal bar charts that compare platform metrics against industry averages. Each group displays a title and two bars with labels and values. Bars animate from 0 to their target width when scrolled into view. Ideal for competitive analysis, benchmark comparisons, or showcasing platform advantages.",
    semanticTags: [
      "stats",
      "comparison",
      "bars",
      "charts",
      "animated",
      "benchmark",
      "competitive",
      "industry",
    ],
    category: "stats",
    component: StatsBarComparison,
    props: "StatsBarComparisonProps",
    exampleUsage: `
<StatsBarComparison
  badge="Competitive Edge"
  heading="How We Compare"
  comparisons={[
    {
      title: "Revenue Growth",
      bars: [
        { label: "Our Platform", value: 89, displayValue: "$2.4M", color: "bg-primary" },
        { label: "Industry Average", value: 34, displayValue: "$920K" },
      ],
    },
  ]}
/>`.trim(),
  },
  // Timeline components
  "timeline-vertical-icon-dashed": {
    id: "timeline-vertical-icon-dashed",
    name: "Timeline Vertical Icon Dashed",
    description:
      "A vertical timeline with centered icon circles and dashed line connectors. Each step displays an icon in a bordered circle, a title, and description. Ideal for showcasing sequential processes, onboarding flows, or step-by-step guides with a clean, minimal aesthetic.",
    semanticTags: [
      "timeline",
      "vertical",
      "steps",
      "process",
      "icons",
      "dashed",
      "sequential",
      "onboarding",
    ],
    category: "timeline",
    component: TimelineVerticalIconDashed,
    props: "TimelineVerticalIconDashedProps",
    exampleUsage: `
<TimelineVerticalIconDashed
  steps={[
    { icon: "lucide/files", title: "Data Integration", description: "Connect your existing tools and platforms seamlessly." },
    { icon: "lucide/layout", title: "Custom Configuration", description: "Tailor the platform to your needs." },
    { icon: "lucide/circle-arrow-out-up-right", title: "Scale Your Business", description: "Access comprehensive analytics and tools." },
  ]}
/>`.trim(),
  },
  "timeline-scroll-sticky-image": {
    id: "timeline-scroll-sticky-image",
    name: "Timeline Scroll Sticky Image",
    description:
      "A scroll-based timeline with a sticky image display that updates as users scroll through content sections. Features a left content column with scrollable sections and a right sticky image that changes based on the active section. Perfect for product tours, feature showcases, or storytelling experiences.",
    semanticTags: [
      "timeline",
      "scroll",
      "sticky",
      "image",
      "interactive",
      "sections",
      "product-tour",
      "storytelling",
    ],
    category: "timeline",
    component: TimelineScrollStickyImage,
    props: "TimelineScrollStickyImageProps",
    exampleUsage: `
<TimelineScrollStickyImage
  sections={[
    { title: "Getting Started", description: "Begin your journey with our platform.", image: "/images/step1.jpg" },
    { title: "Configuration", description: "Set up your preferences and integrations.", image: "/images/step2.jpg" },
  ]}
/>`.trim(),
  },
  "timeline-two-column-featured": {
    id: "timeline-two-column-featured",
    name: "Timeline Two Column Featured",
    description:
      "A two-column timeline layout with a sticky left column containing header content and a scrollable right column with feature cards. Each feature card includes an image, title, description, and CTA button. Ideal for showcasing product features, service offerings, or company milestones.",
    semanticTags: [
      "timeline",
      "two-column",
      "featured",
      "cards",
      "sticky",
      "features",
      "cta",
      "product",
    ],
    category: "timeline",
    component: TimelineTwoColumnFeatured,
    props: "TimelineTwoColumnFeaturedProps",
    exampleUsage: `
<TimelineTwoColumnFeatured
  title="Our Features"
  description="Discover what makes us different"
  features={[
    { title: "Feature One", description: "Description of the feature.", image: "/images/feature1.jpg", ctaText: "Learn More", ctaHref: "/features/1" },
  ]}
/>`.trim(),
  },
  "timeline-alternating-diagonal": {
    id: "timeline-alternating-diagonal",
    name: "Timeline Alternating Diagonal",
    description:
      "A multi-step timeline with alternating left/right layout and diagonal pattern backgrounds. Features numbered steps with icons, images, and detailed descriptions. Each step alternates between left and right positioning for visual variety. Perfect for process explanations, company history, or product development stages.",
    semanticTags: [
      "timeline",
      "alternating",
      "diagonal",
      "pattern",
      "steps",
      "numbered",
      "process",
      "history",
    ],
    category: "timeline",
    component: TimelineAlternatingDiagonal,
    props: "TimelineAlternatingDiagonalProps",
    exampleUsage: `
<TimelineAlternatingDiagonal
  badge="Our Process"
  title="How We Work"
  items={[
    { step: 1, icon: "lucide/lightbulb", title: "Ideation", description: "We brainstorm and conceptualize.", image: "/images/step1.jpg" },
  ]}
/>`.trim(),
  },
  "timeline-ai-workflow-cards": {
    id: "timeline-ai-workflow-cards",
    name: "Timeline AI Workflow Cards",
    description:
      "A sticky header timeline with scrollable AI feature cards. Features numbered cards (01, 02, 03) with icons, titles, and descriptions on a muted background. The header section remains sticky while cards scroll. Ideal for showcasing AI capabilities, workflow automation features, or technology highlights.",
    semanticTags: [
      "timeline",
      "ai",
      "workflow",
      "cards",
      "numbered",
      "sticky",
      "features",
      "automation",
    ],
    category: "timeline",
    component: TimelineAIWorkflowCards,
    props: "TimelineAIWorkflowCardsProps",
    exampleUsage: `
<TimelineAIWorkflowCards
  title="AI-Powered Features"
  description="Discover our intelligent automation"
  items={[
    { icon: "lucide/brain", title: "AI-Driven Insights", description: "Get intelligent recommendations." },
  ]}
/>`.trim(),
  },
  "timeline-productivity-list": {
    id: "timeline-productivity-list",
    name: "Timeline Productivity List",
    description:
      "A sticky header timeline with icon-based productivity features displayed as a border-separated list. Each item shows an icon and title in a clean, minimal layout. The header section remains sticky while the list scrolls. Perfect for highlighting benefits, productivity features, or key selling points.",
    semanticTags: [
      "timeline",
      "productivity",
      "list",
      "icons",
      "benefits",
      "features",
      "sticky",
      "minimal",
    ],
    category: "timeline",
    component: TimelineProductivityList,
    props: "TimelineProductivityListProps",
    exampleUsage: `
<TimelineProductivityList
  title="Boost Your Productivity"
  description="Key features that help you work smarter"
  items={[
    { icon: "lucide/zap", title: "Boost Productivity" },
    { icon: "lucide/shield-check", title: "Minimize Errors" },
  ]}
/>`.trim(),
  },
  "timeline-stepper-animated": {
    id: "timeline-stepper-animated",
    name: "Timeline Stepper Animated",
    description:
      "An interactive stepper timeline with progress bar and navigation buttons. Features animated transitions between steps using Framer Motion, a visual progress indicator, and Previous/Next navigation. Each step displays an image, title, and description. Ideal for multi-step forms, onboarding wizards, or guided tutorials.",
    semanticTags: [
      "timeline",
      "stepper",
      "animated",
      "progress",
      "navigation",
      "wizard",
      "onboarding",
      "interactive",
    ],
    category: "timeline",
    component: TimelineStepperAnimated,
    props: "TimelineStepperAnimatedProps",
    exampleUsage: `
<TimelineStepperAnimated
  steps={[
    { title: "Introduction", description: "Welcome to our platform.", image: "/images/step1.jpg" },
    { title: "Personal Information", description: "Tell us about yourself.", image: "/images/step2.jpg" },
  ]}
/>`.trim(),
  },
  "timeline-changelog-badges": {
    id: "timeline-changelog-badges",
    name: "Timeline Changelog Badges",
    description:
      "A vertical changelog timeline with date badges and bullet point content. Each entry displays a date badge, title, and HTML content with bullet points. Features a vertical separator line connecting entries. Perfect for product changelogs, release notes, or version history displays.",
    semanticTags: [
      "timeline",
      "changelog",
      "badges",
      "dates",
      "releases",
      "versions",
      "updates",
      "history",
    ],
    category: "timeline",
    component: TimelineChangelogBadges,
    props: "TimelineChangelogBadgesProps",
    exampleUsage: `
<TimelineChangelogBadges
  title="Changelog"
  entries={[
    { date: "March 2024", title: "Version 2.0", content: "<ul><li>New feature A</li><li>Bug fix B</li></ul>" },
  ]}
/>`.trim(),
  },
  "timeline-history-prose": {
    id: "timeline-history-prose",
    name: "Timeline History Prose",
    description:
      "A vertical history timeline with prose content cards. Each entry displays a year, title, and formatted prose content. Features a vertical separator line connecting entries with year markers. Ideal for company history, historical events, or biographical timelines with rich text content.",
    semanticTags: [
      "timeline",
      "history",
      "prose",
      "years",
      "events",
      "biography",
      "company",
      "milestones",
    ],
    category: "timeline",
    component: TimelineHistoryProse,
    props: "TimelineHistoryProseProps",
    exampleUsage: `
<TimelineHistoryProse
  title="Our History"
  entries={[
    { year: "2018", title: "Company Founded", content: "We started with a vision to transform the industry." },
  ]}
/>`.trim(),
  },
  "timeline-horizontal-phases": {
    id: "timeline-horizontal-phases",
    name: "Timeline Horizontal Phases",
    description:
      "A horizontal animated phase timeline with progress indicators. Features animated progress bars using Framer Motion, phase cards with dates and descriptions. Displays vertically on mobile and horizontally on desktop. Perfect for project phases, development stages, or roadmap presentations.",
    semanticTags: [
      "timeline",
      "horizontal",
      "phases",
      "animated",
      "progress",
      "roadmap",
      "stages",
      "project",
    ],
    category: "timeline",
    component: TimelineHorizontalPhases,
    props: "TimelineHorizontalPhasesProps",
    exampleUsage: `
<TimelineHorizontalPhases
  title="Project Phases"
  phases={[
    { title: "Phase 1", date: "Q1 2024", description: "Initial planning and research." },
    { title: "Phase 2", date: "Q2 2024", description: "Development and testing." },
  ]}
/>`.trim(),
  },
  "timeline-horizontal-icons": {
    id: "timeline-horizontal-icons",
    name: "Timeline Horizontal Icons",
    description:
      "A horizontal phase timeline with icon indicators displayed in nested bordered containers. Features animated transitions using Framer Motion, with each phase showing an icon, title, and description. Displays vertically on mobile and horizontally on desktop. Ideal for process flows, service stages, or feature highlights.",
    semanticTags: [
      "timeline",
      "horizontal",
      "icons",
      "phases",
      "animated",
      "process",
      "stages",
      "features",
    ],
    category: "timeline",
    component: TimelineHorizontalIcons,
    props: "TimelineHorizontalIconsProps",
    exampleUsage: `
<TimelineHorizontalIcons
  title="Our Process"
  phases={[
    { icon: "lucide/rocket", title: "Phase I", description: "Launch and initial setup." },
    { icon: "lucide/cpu", title: "Phase II", description: "Core development." },
  ]}
/>`.trim(),
  },
  "timeline-tabbed-phases": {
    id: "timeline-tabbed-phases",
    name: "Timeline Tabbed Phases",
    description:
      "A tabbed phase timeline with image cards and animated content transitions. Features tab navigation for switching between phases, each displaying an image, title, description, and optional download button. Uses Framer Motion for smooth content animations. Perfect for product launches, project phases, or feature showcases.",
    semanticTags: [
      "timeline",
      "tabbed",
      "phases",
      "animated",
      "tabs",
      "images",
      "product",
      "launch",
    ],
    category: "timeline",
    component: TimelineTabbedPhases,
    props: "TimelineTabbedPhasesProps",
    exampleUsage: `
<TimelineTabbedPhases
  title="Product Launch Phases"
  phases={[
    { id: "init", label: "Initialize", title: "Project Setup", description: "Configure your environment.", image: "/images/phase1.jpg" },
  ]}
/>`.trim(),
  },
  "timeline-product-launch": {
    id: "timeline-product-launch",
    name: "Timeline Product Launch",
    description:
      "A product launch roadmap timeline with progress bars and animated reveal. Features step cards with progress indicators, descriptions, and a CTA button. Animates from top-to-bottom on mobile and left-to-right on desktop. Ideal for product roadmaps, launch timelines, or development milestones.",
    semanticTags: [
      "timeline",
      "product",
      "launch",
      "roadmap",
      "progress",
      "animated",
      "milestones",
      "development",
    ],
    category: "timeline",
    component: TimelineProductLaunch,
    props: "TimelineProductLaunchProps",
    exampleUsage: `
<TimelineProductLaunch
  title="Product Roadmap"
  description="Our journey from idea to launch"
  steps={[
    { title: "Ideation", description: "Brainstorming and concept development.", progress: 100 },
    { title: "Development", description: "Building the core features.", progress: 75 },
  ]}
  ctaText="Get Started"
  ctaHref="/signup"
/>`.trim(),
  },
  "timeline-scroll-highlight": {
    id: "timeline-scroll-highlight",
    name: "Timeline Scroll Highlight",
    description:
      "A scroll-based timeline with active item highlighting using IntersectionObserver. Features a sticky header showing the current item index and date, with items that highlight as they enter the viewport. Each item displays an image, title, and description. Perfect for company milestones, event timelines, or historical narratives.",
    semanticTags: [
      "timeline",
      "scroll",
      "highlight",
      "interactive",
      "milestones",
      "events",
      "history",
      "sticky",
    ],
    category: "timeline",
    component: TimelineScrollHighlight,
    props: "TimelineScrollHighlightProps",
    exampleUsage: `
<TimelineScrollHighlight
  items={[
    { date: "2018", title: "Company Foundation", description: "We started our journey.", image: "/images/2018.jpg" },
    { date: "2020", title: "First Product Launch", description: "Released our flagship product.", image: "/images/2020.jpg" },
  ]}
/>`.trim(),
  },
  // Link Page components
  "link-tree-block": {
    id: "link-tree-block",
    name: "Link Tree Block",
    description:
      "A customizable link-in-bio style page component with three theme variations (light, dark, glass). Features brand header with avatar and verified badge, customizable link list with icons, descriptions, badges and featured states, media gallery for images and videos, social media links, and background pattern customization. Ideal for creators, influencers, and businesses needing a comprehensive link page.",
    semanticTags: [
      "link-page",
      "link-tree",
      "bio-link",
      "linktree",
      "profile",
      "creator",
      "influencer",
      "social",
      "media-gallery",
      "links",
    ],
    category: "link-page",
    component: LinkTreeBlock,
    props: "LinkTreeBlockProps",
    exampleUsage: `
<LinkTreeBlock
  brandName="Sarah Chen"
  brandTagline="Digital creator & photographer"
  theme="dark"
  backgroundPattern={patternSvgs.dots}
  links={[
    { id: "1", label: "My Website", href: "https://example.com", icon: "lucide/globe", featured: true }
  ]}
  socialLinks={[
    { id: "s1", platform: "Instagram", href: "https://instagram.com", icon: "simple-icons/instagram" }
  ]}
/>`.trim(),
  },
  "link-page-minimal-profile": {
    id: "link-page-minimal-profile",
    name: "Link Page Minimal Profile",
    description:
      "A clean, minimal link page focused on simplicity. Features a streamlined avatar and name display, optional bio text, simple link list with subtle hover effects, and social icons at the bottom. Supports light and dark themes. Ideal for professionals, developers, and anyone who prefers a minimalist aesthetic for their link page.",
    semanticTags: [
      "link-page",
      "minimal",
      "profile",
      "simple",
      "clean",
      "professional",
      "developer",
      "portfolio",
      "links",
    ],
    category: "link-page",
    component: LinkPageMinimalProfile,
    props: "LinkPageMinimalProfileProps",
    exampleUsage: `
<LinkPageMinimalProfile
  name="Alex Johnson"
  bio="Software Engineer & Open Source Contributor"
  avatarUrl="/avatar.jpg"
  theme="light"
  links={[
    { id: "1", label: "Portfolio", href: "https://example.com", icon: "lucide/briefcase" }
  ]}
  socialLinks={[
    { id: "s1", platform: "GitHub", href: "https://github.com", icon: "simple-icons/github" }
  ]}
/>`.trim(),
  },
  "link-page-newsletter-social": {
    id: "link-page-newsletter-social",
    name: "Link Page Newsletter Social",
    description:
      "A link page with integrated newsletter signup form powered by FormEngine. Features profile section with avatar, newsletter signup form with email validation via @page-speed/forms/integration, social media links, and additional links section. Supports universal REST API integration via formEngineSetup. Ideal for content creators, bloggers, and marketers who want to grow their email list.",
    semanticTags: [
      "link-page",
      "newsletter",
      "email",
      "subscribe",
      "form",
      "social",
      "creator",
      "marketing",
      "lead-generation",
      "links",
    ],
    category: "link-page",
    component: LinkPageNewsletterSocial,
    props: "LinkPageNewsletterSocialProps",
    exampleUsage: `
<LinkPageNewsletterSocial
  name="Content Creator"
  bio="Weekly tips on growing your audience"
  newsletterHeading="Join my newsletter"
  formEngineSetup={{
    formConfig: { endpoint: "/api/subscribe", format: "json" },
  }}
  buttonAction={{ label: "Subscribe", variant: "default" }}
  links={[
    { id: "1", label: "My Website", href: "https://example.com", icon: "lucide/globe" }
  ]}
/>`.trim(),
  },
  "link-page-grid-cards": {
    id: "link-page-grid-cards",
    name: "Link Page Grid Cards",
    description:
      "A visually rich link page displaying links as a responsive grid of cards. Features profile header with avatar, links as cards with icons, labels and optional descriptions, hover effects with scale and shadow transitions, configurable 2 or 3 column layout, and social media links. Ideal for creators, businesses, and anyone who wants a more visual link page.",
    semanticTags: [
      "link-page",
      "grid",
      "cards",
      "visual",
      "creative",
      "business",
      "portfolio",
      "showcase",
      "links",
    ],
    category: "link-page",
    component: LinkPageGridCards,
    props: "LinkPageGridCardsProps",
    exampleUsage: `
<LinkPageGridCards
  name="Creative Studio"
  bio="Design, Development & Strategy"
  columns={3}
  theme="light"
  links={[
    { id: "1", label: "Portfolio", href: "/work", icon: "lucide/briefcase", description: "View our work" }
  ]}
  socialLinks={[
    { id: "s1", platform: "Instagram", href: "https://instagram.com", icon: "simple-icons/instagram" }
  ]}
/>`.trim(),
  },
  "link-page-bento-layout": {
    id: "link-page-bento-layout",
    name: "Link Page Bento Layout",
    description:
      "A modern bento grid style link page with visual hierarchy. Features profile header with avatar, bento grid layout with featured links in larger cells with optional background images, regular links in smaller cells, and social media links. Creates visual hierarchy by making featured links more prominent. Ideal for digital creators, entrepreneurs, and anyone wanting a trendy, modern link page design.",
    semanticTags: [
      "link-page",
      "bento",
      "grid",
      "modern",
      "trendy",
      "visual",
      "featured",
      "creator",
      "entrepreneur",
      "links",
    ],
    category: "link-page",
    component: LinkPageBentoLayout,
    props: "LinkPageBentoLayoutProps",
    exampleUsage: `
<LinkPageBentoLayout
  name="Digital Creator"
  bio="Content creator & entrepreneur"
  theme="dark"
  links={[
    { id: "1", label: "Latest Video", href: "https://youtube.com", icon: "simple-icons/youtube", featured: true, imageUrl: "/thumbnail.jpg" },
    { id: "2", label: "Blog", href: "/blog", icon: "lucide/pen-line" }
  ]}
  socialLinks={[
    { id: "s1", platform: "Instagram", href: "https://instagram.com", icon: "simple-icons/instagram" }
  ]}
/>`.trim(),
  },

  // New About components
  "about-split-hero": {
    id: "about-split-hero",
    name: "About Split Hero",
    description:
      "A split-screen hero section with dark theme styling, featuring text content on the left and a large image on the right. Includes brand text with gradient highlight, prominent heading, description, and CTA button. Best for premium/pro tier landing pages, product launches, and upgrade prompts.",
    semanticTags: [
      "about",
      "hero",
      "split",
      "dark-theme",
      "premium",
      "upgrade",
      "cta",
      "brand",
      "landing",
    ],
    category: "about",
    component: AboutSplitHero,
    props: "AboutSplitHeroProps",
    exampleUsage: `
<AboutSplitHero
  brandText="Business"
  brandHighlight="PRO"
  heading="Achieve More with Elite Access Pro"
  description="Enhance your career hunt with increased visibility."
  ctaText="Upgrade to premium"
  ctaUrl="/upgrade"
/>`.trim(),
  },

  "about-mission-principles": {
    id: "about-mission-principles",
    name: "About Mission Principles",
    description:
      "A comprehensive mission statement section with numbered principle cards and a vision callout. Features a two-column grid with mission text on left, principle cards on right, followed by a full-width vision banner. Best for company about pages, mission statements, and values showcases.",
    semanticTags: [
      "about",
      "mission",
      "principles",
      "values",
      "vision",
      "company",
      "culture",
      "numbered",
      "cards",
    ],
    category: "about",
    component: AboutMissionPrinciples,
    props: "AboutMissionPrinciplesProps",
    exampleUsage: `
<AboutMissionPrinciples
  badgeText="Our Mission"
  missionHeading="To empower people through technology"
  missionDescription="We believe technology should serve humanity."
  principles={[
    { number: "01", title: "Customer-Centric", description: "..." },
  ]}
/>`.trim(),
  },

  "about-expandable-values": {
    id: "about-expandable-values",
    name: "About Expandable Values",
    description:
      "An interactive values section with expandable cards that reveal detailed descriptions and examples when clicked. Features a responsive grid of value cards that expand to full width when active, with icon integration and example lists. Best for company values pages, culture showcases, and brand identity sections.",
    semanticTags: [
      "about",
      "values",
      "expandable",
      "interactive",
      "cards",
      "culture",
      "brand",
      "icons",
      "accordion",
    ],
    category: "about",
    component: AboutExpandableValues,
    props: "AboutExpandableValuesProps",
    exampleUsage: `
<AboutExpandableValues
  badgeText="Our Core Values"
  heading="The Principles That Guide Us"
  values={[
    {
      id: "integrity",
      icon: "lucide/shield",
      title: "Integrity",
      shortDescription: "Doing what's right.",
      longDescription: "We believe in honesty...",
      examples: ["Transparent pricing", "Honest communication"],
    },
  ]}
/>`.trim(),
  },

  "community-initiatives": {
    id: "community-initiatives",
    name: "Community Initiatives",
    description:
      "A comprehensive community impact section with tabbed categories and detailed initiative cards with metrics. Features a tabbed interface with alternating content/image layout for initiatives, metrics display, and responsive dropdown for mobile. Best for community impact pages, corporate responsibility sections, and values showcases.",
    semanticTags: [
      "about",
      "community",
      "impact",
      "initiatives",
      "metrics",
      "tabs",
      "corporate",
      "responsibility",
    ],
    category: "about",
    component: CommunityInitiatives,
    props: "CommunityInitiativesProps",
    exampleUsage: `
<CommunityInitiatives
  badgeText="Food Drive"
  heading="Supporting Our Community"
  categories={[
    {
      id: "food-drive",
      title: "Food Drive",
      description: "Supporting our community through food donations.",
      initiatives: [...]
    },
  ]}
/>`.trim(),
  },

  "about-culture-tabs": {
    id: "about-culture-tabs",
    name: "About Culture Tabs",
    description:
      "A tabbed company culture section with testimonials, image galleries, and a careers CTA. Features a tabbed interface with description, testimonial card, and image grid for each culture aspect. Best for company culture pages, careers sections, and about us pages.",
    semanticTags: [
      "about",
      "culture",
      "tabs",
      "testimonials",
      "gallery",
      "careers",
      "team",
      "values",
      "workplace",
    ],
    category: "about",
    component: AboutCultureTabs,
    props: "AboutCultureTabsProps",
    exampleUsage: `
<AboutCultureTabs
  badgeText="Our Culture"
  heading="What Makes Us Different"
  aspects={[
    {
      id: "innovation",
      title: "Innovation First",
      description: "We believe in challenging the status quo.",
      images: [...],
      testimonial: { quote: "...", author: "...", role: "...", avatar: "..." },
    },
  ]}
/>`.trim(),
  },

  // New Feature components
  "feature-animated-carousel": {
    id: "feature-animated-carousel",
    name: "Feature Animated Carousel",
    description:
      "An interactive feature carousel with animated transitions between feature cards and images. Features a vertical card list with up/down navigation controls on desktop and horizontal swipe on mobile. Uses Framer Motion for smooth animations. Best for product feature showcases, service highlights, and interactive landing pages.",
    semanticTags: [
      "features",
      "carousel",
      "animated",
      "interactive",
      "cards",
      "showcase",
      "framer-motion",
      "responsive",
    ],
    category: "features",
    component: FeatureAnimatedCarousel,
    props: "FeatureAnimatedCarouselProps",
    exampleUsage: `
<FeatureAnimatedCarousel
  features={[
    {
      image: "/feature1.jpg",
      title: "Feature One",
      description: "Description of the first feature.",
    },
  ]}
/>`.trim(),
  },

  // New Footer components
  "footer-newsletter-contact": {
    id: "footer-newsletter-contact",
    name: "Footer Newsletter Contact",
    description:
      "A comprehensive footer with newsletter signup, navigation links, contact details, and social media icons. Features a four-column grid layout with newsletter form, link sections, and contact info with icons. Best for e-commerce sites, business websites, and service-based companies.",
    semanticTags: [
      "footer",
      "newsletter",
      "contact",
      "social",
      "links",
      "ecommerce",
      "business",
      "navigation",
    ],
    category: "footer",
    component: FooterNewsletterContact,
    props: "FooterNewsletterContactProps",
    exampleUsage: `
<FooterNewsletterContact
  newsletterTitle="Newsletter"
  newsletterDescription="Join our newsletter for exclusive deals."
  footerLinks={[
    { title: "Information", items: [...] },
  ]}
  contactDetails={[
    { icon: "lucide/mail", text: "support@store.com", type: "email" },
  ]}
/>`.trim(),
  },

  "footer-split-image-accordion": {
    id: "footer-split-image-accordion",
    name: "Footer Split Image Accordion",
    description:
      "A split-layout footer with large image, newsletter signup powered by FormEngine, accordion navigation, and payment methods. Features a two-column split with image on left, content on right, and responsive accordion links for mobile. Uses @page-speed/forms/integration for form handling. Best for e-commerce sites, fashion brands, and lifestyle businesses.",
    semanticTags: [
      "footer",
      "split",
      "image",
      "accordion",
      "newsletter",
      "payment",
      "ecommerce",
      "fashion",
    ],
    category: "footer",
    component: FooterSplitImageAccordion,
    props: "FooterSplitImageAccordionProps",
    exampleUsage: `
<FooterSplitImageAccordion
  newsletterTitle="Get updates and save 20%"
  formEngineSetup={{
    formConfig: { endpoint: "/api/subscribe", format: "json" },
  }}
  footerLinks={[
    { title: "Collections", id: "collections", items: [...] },
  ]}
  footerData={{
    image: { src: "/hero.jpg", alt: "Hero" },
    title: "Modern Fashion",
    description: "Quality clothing for everyone.",
  }}
/>`.trim(),
  },

  "footer-accordion-social": {
    id: "footer-accordion-social",
    name: "Footer Accordion Social",
    description:
      "A footer with newsletter, accordion navigation links, and social media icons with responsive accordion behavior. Features newsletter section at top, accordion links in grid, and social icons. Accordion is collapsed on mobile and expanded on desktop. Best for e-commerce sites, retail brands, and content-heavy websites.",
    semanticTags: [
      "footer",
      "accordion",
      "social",
      "newsletter",
      "responsive",
      "ecommerce",
      "retail",
      "navigation",
    ],
    category: "footer",
    component: FooterAccordionSocial,
    props: "FooterAccordionSocialProps",
    exampleUsage: `
<FooterAccordionSocial
  newsletterTitle="Stay in the loop"
  newsletterDescription="Get updates on new products and offers."
  footerLinks={[
    { title: "Shop", id: "shop", items: [...] },
  ]}
/>`.trim(),
  },

  "footer-info-cards-accordion": {
    id: "footer-info-cards-accordion",
    name: "Footer Info Cards Accordion",
    description:
      "A comprehensive footer with info cards, newsletter, accordion navigation, payment methods, and social links. Features hero image with newsletter, contact info cards grid, accordion links, and language selector. Best for e-commerce sites, service businesses, and customer-focused brands.",
    semanticTags: [
      "footer",
      "info",
      "cards",
      "accordion",
      "newsletter",
      "payment",
      "contact",
      "ecommerce",
      "service",
    ],
    category: "footer",
    component: FooterInfoCardsAccordion,
    props: "FooterInfoCardsAccordionProps",
    exampleUsage: `
<FooterInfoCardsAccordion
  newsletterTitle="Newsletter"
  newsletterDescription="Join for exclusive offers."
  infoItems={[
    { icon: "lucide/phone", title: "Call Us", text: "+1 555-1234" },
  ]}
  footerLinks={[
    { title: "Shop", id: "shop", items: [...] },
  ]}
/>`.trim(),
  },

  // New FAQ components
  "faq-split-hero": {
    id: "faq-split-hero",
    name: "FAQ Split Hero",
    description:
      "A full-width split-screen FAQ section with animated accordion on one side and image or video media on the other. Supports configurable layout direction for desktop (media left/right) and mobile stacking order (media top/bottom), pattern background overlays with adjustable opacity, section background theming, image optimization via OptixFlow, and extensive className overrides for every sub-element. Media supports both images and videos with a slot escape hatch for fully custom rendering. Best for landing pages, product pages, and service pages requiring prominent FAQ visibility.",
    semanticTags: [
      "faq",
      "split",
      "hero",
      "accordion",
      "animated",
      "landing",
      "questions",
      "full-width",
      "split-screen",
      "image",
      "video",
      "media",
      "responsive",
      "layout-direction",
      "pattern-background",
      "customizable",
      "two-column",
    ],
    category: "faq",
    component: FaqSplitHero,
    props: "FaqSplitHeroProps",
    exampleUsage: `
<FaqSplitHero
  heading="Frequently Asked Questions"
  subheading="Find answers to common questions about our services."
  items={[
    { id: "1", question: "What services do you offer?", answer: "..." },
  ]}
  mediaItem={{
    image: { src: "/images/faq-hero.jpg", alt: "FAQ illustration" }
  }}
  directionConfig={{ desktop: "mediaRight", mobile: "mediaTop" }}
  background="muted"
  pattern="grid"
  patternOpacity={0.3}
/>`.trim(),
  },
};

/**
 * Get blocks by semantic tag
 */
export function getBlocksBySemanticTag(tag: string): BlockRegistryEntry[] {
  return Object.values(BLOCK_REGISTRY).filter((block) =>
    block.semanticTags.includes(tag),
  );
}

/**
 * Get blocks by category
 */
export function getBlocksByCategory(
  category: BlockCategory,
): BlockRegistryEntry[] {
  return Object.values(BLOCK_REGISTRY).filter(
    (block) => block.category === category,
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
    new Set(Object.values(BLOCK_REGISTRY).map((block) => block.category)),
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
        tag.toLowerCase().includes(lowercaseQuery),
      ),
  );
}
