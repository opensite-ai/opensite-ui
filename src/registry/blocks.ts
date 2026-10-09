/**
 * Component-backed registry retained for legacy consumers and build-time tooling.
 */
// -----------------------------------------------------------------------------
// BEGIN advanced + integrations embed block imports (keep contiguous)
// INTEGRATOR: append the free-form-design and tripleseat-form imports here.
// -----------------------------------------------------------------------------
import { IframeEmbed } from "../../components/blocks/advanced/iframe-embed";
import { ScriptEmbed } from "../../components/blocks/advanced/script-embed";
import { FreeFormDesign } from "../../components/blocks/advanced/free-form-design";
import { TripleseatForm } from "../../components/blocks/integrations/tripleseat-form";
// END advanced + integrations embed block imports
// -----------------------------------------------------------------------------

import { AlternatingBlocks } from "../../components/blocks/about/alternating-blocks";
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
import { AboutNetworkSpotlight } from "../../components/blocks/about/about-network-spotlight";
import { AboutLocationInfoHero } from "../../components/blocks/about/about-location-info-hero";
import { MediaHoverCtas } from "../../components/blocks/cta/media-hover-ctas";
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
import { CarouselAnimatedSections } from "../../components/blocks/carousel/carousel-animated-sections";
import { CarouselAutoProgressSlides } from "../../components/blocks/carousel/carousel-auto-progress-slides";
import { CarouselAutoplayProgress } from "../../components/blocks/carousel/carousel-autoplay-progress";
import { CarouselFeatureBadge } from "../../components/blocks/carousel/carousel-feature-badge";
import { CarouselFullscreenScrollFx } from "../../components/blocks/carousel/carousel-fullscreen-scroll-fx";
import { CarouselGalleryThumbnails } from "../../components/blocks/carousel/carousel-gallery-thumbnails";
import { CarouselHorizontalCards } from "../../components/blocks/carousel/carousel-horizontal-cards";
import { CarouselImageHero } from "../../components/blocks/carousel/carousel-image-hero";
import { CarouselMultiStepShowcase } from "../../components/blocks/carousel/carousel-multi-step-showcase";
import { CarouselPortfolioHero } from "../../components/blocks/carousel/carousel-portfolio-hero";
import { CarouselProductFeatureShowcase } from "../../components/blocks/carousel/carousel-product-feature-showcase";
import { CarouselProgressSlider } from "../../components/blocks/carousel/carousel-progress-slider";
import { CarouselScrollingFeatureShowcase } from "../../components/blocks/carousel/carousel-scrolling-feature-showcase";
import { FeatureShowcase } from "../../components/blocks/features/feature-showcase";
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
import { TeamMediaShowcase } from "../../components/blocks/team/team-media-showcase";
import { TeamSimpleGrid } from "../../components/blocks/team/team-simple-grid";
import { FooterBrandLinksContact } from "../../components/blocks/footers/footer-brand-links-contact";
import { FooterComprehensiveLinks } from "../../components/blocks/footers/footer-comprehensive-links";
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
import { InstagramPostGrid } from "../../components/blocks/gallery/instagram-post-grid";
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
import { ArticleHeroProse } from "../../components/blocks/article/article-hero-prose";
import { ArticleSidebarSticky } from "../../components/blocks/article/article-sidebar-sticky";
import { ArticleTocSidebar } from "../../components/blocks/article/article-toc-sidebar";
import { ArticleBreadcrumbSocial } from "../../components/blocks/article/article-breadcrumb-social";
import { ArticleCompactToc } from "../../components/blocks/article/article-compact-toc";
import { ArticleChaptersAuthor } from "../../components/blocks/article/article-chapters-author";
import { ArticleSplitAnimated } from "../../components/blocks/article/article-split-animated";
import { ArticleLegalProse } from "../../components/blocks/article/article-legal-prose";
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
import { AboutSplitHero } from "../../components/blocks/about/about-split-hero";
import { AboutMissionPrinciples } from "../../components/blocks/about/about-mission-principles";
import { AboutExpandableValues } from "../../components/blocks/about/about-expandable-values";
import { AboutCultureTabs } from "../../components/blocks/about/about-culture-tabs";
import { CommunityInitiatives } from "../../components/blocks/about/community-initiatives";
import { FeatureAnimatedCarousel } from "../../components/blocks/features/feature-animated-carousel";
import { FooterNewsletterContact } from "../../components/blocks/footers/footer-newsletter-contact";
import { FooterSplitImageAccordion } from "../../components/blocks/footers/footer-split-image-accordion";
import { FooterAccordionSocial } from "../../components/blocks/footers/footer-accordion-social";
import { FooterInfoCardsAccordion } from "../../components/blocks/footers/footer-info-cards-accordion";
import { CaseStudiesImageGrid } from "../../components/blocks/case-studies-list/case-studies-image-grid";
import { CaseStudiesTestimonialStats } from "../../components/blocks/case-studies-list/case-studies-testimonial-stats";
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
import { CaseStudyProseSidebar } from "../../components/blocks/case-study-detail/case-study-prose-sidebar";
import { CaseStudyTocSocialSidebar } from "../../components/blocks/case-study-detail/case-study-toc-social-sidebar";
import { CaseStudyStatsMetrics } from "../../components/blocks/case-study-detail/case-study-stats-metrics";
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
import { ProcessStickySteps } from "../../components/blocks/process/process-sticky-steps";
import { ProcessScrollImage } from "../../components/blocks/process/process-scroll-image";
import { ProcessHoverCards } from "../../components/blocks/process/process-hover-cards";
import { ProcessIconTimeline } from "../../components/blocks/process/process-icon-timeline";
import { ProcessExpandableTimeline } from "../../components/blocks/process/process-expandable-timeline";
import { ProcessRoadmapTimeline } from "../../components/blocks/process/process-roadmap-timeline";
import { ProcessMissionPrinciples } from "../../components/blocks/process/process-mission-principles";
import { ProcessStepsGrid } from "../../components/blocks/process/process-steps-grid";
import { ProcessNumberedServices } from "../../components/blocks/process/process-numbered-services";
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
import { ListServiceCategoryTable } from "../../components/blocks/list/list-service-category-table";
import { ListAchievementsShowcase } from "../../components/blocks/list/list-achievements-showcase";
import { ListCareerTimeline } from "../../components/blocks/list/list-career-timeline";
import { ListMetricsDashboard } from "../../components/blocks/list/list-metrics-dashboard";
import { ListFeatureComparison } from "../../components/blocks/list/list-feature-comparison";
import { ListSearchableGrid } from "../../components/blocks/list/list-searchable-grid";
import { OfferModalNewsletterDiscount } from "../../components/blocks/offer-modal/offer-modal-newsletter-discount";
import { OfferModalMembershipImage } from "../../components/blocks/offer-modal/offer-modal-membership-image";
import { OfferModalSheetNewsletter } from "../../components/blocks/offer-modal/offer-modal-sheet-newsletter";
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
import { IndustriesHoverRevealGrid } from "../../components/blocks/industries/industries-hover-reveal-grid";
import { IndustriesBadgeListBordered } from "../../components/blocks/industries/industries-badge-list-bordered";
import { IndustriesTimelineTable } from "../../components/blocks/industries/industries-timeline-table";
import { IndustriesExpandableShowcase } from "../../components/blocks/industries/industries-expandable-showcase";
import { ResourceDetailWhitepaperSidebar } from "../../components/blocks/resource-detail/resource-detail-whitepaper-sidebar";
import { ResourceDetailArticleHero } from "../../components/blocks/resource-detail/resource-detail-article-hero";
import { ResourceDetailDocumentSidebar } from "../../components/blocks/resource-detail/resource-detail-document-sidebar";
import { ServiceDetailProseMinimal } from "../../components/blocks/service-detail/service-detail-prose-minimal";
import { ServiceDetailImageHero } from "../../components/blocks/service-detail/service-detail-image-hero";
import { ServiceDetailStatsHero } from "../../components/blocks/service-detail/service-detail-stats-hero";
import { ServiceDetailSidebarStats } from "../../components/blocks/service-detail/service-detail-sidebar-stats";
import { ServiceDetailSidebarRelated } from "../../components/blocks/service-detail/service-detail-sidebar-related";
import { ServiceDetailCenteredExpertise } from "../../components/blocks/service-detail/service-detail-centered-expertise";
import { ServiceDetailCompactCards } from "../../components/blocks/service-detail/service-detail-compact-cards";
import { ServicesListIconGrid } from "../../components/blocks/services-list/services-list-icon-grid";
import { ServicesListMutedCards } from "../../components/blocks/services-list/services-list-muted-cards";
import { ServicesListCenteredIcons } from "../../components/blocks/services-list/services-list-centered-icons";
import { ServicesListVerticalTags } from "../../components/blocks/services-list/services-list-vertical-tags";
import { ServicesListAccordion } from "../../components/blocks/services-list/services-list-accordion";
import { ServicesListPricingGrid } from "../../components/blocks/services-list/services-list-pricing-grid";
import { ServicesListFeaturedHighlight } from "../../components/blocks/services-list/services-list-featured-highlight";
import { ServicesListFeatureSpotlight } from "../../components/blocks/services-list/services-list-feature-spotlight";
import { ServicesListImageCards } from "../../components/blocks/services-list/services-list-image-cards";
import { ServicesListImageOverlayGrid } from "../../components/blocks/services-list/services-list-image-overlay-grid";
import { ServicesListHeroCards } from "../../components/blocks/services-list/services-list-hero-cards";
import { ServicesListTwoColumnGrid } from "../../components/blocks/services-list/services-list-two-column-grid";
import { ServicesListMasonry } from "../../components/blocks/services-list/services-list-masonry";
import { ServicesListCategoryAccordion } from "../../components/blocks/services-list/services-list-category-accordion";
import { ServicesListProgressSidebar } from "../../components/blocks/services-list/services-list-progress-sidebar";
import { ServicesListTableHover } from "../../components/blocks/services-list/services-list-table-hover";
import { ServicesListMethodologySteps } from "../../components/blocks/services-list/services-list-methodology-steps";
import { ServicesListStickyImage } from "../../components/blocks/services-list/services-list-sticky-image";
import { ServicesListTabsFeatures } from "../../components/blocks/services-list/services-list-tabs-features";
import { ServicesListVideoShowcase } from "../../components/blocks/services-list/services-list-video-showcase";
import { ServicesListCultureTabs } from "../../components/blocks/services-list/services-list-culture-tabs";
import { ServicesListAccordionBenefits } from "../../components/blocks/services-list/services-list-accordion-benefits";
import { ServicesListSplitChecklist } from "../../components/blocks/services-list/services-list-split-checklist";
import { ServicesListMinimalGrid } from "../../components/blocks/services-list/services-list-minimal-grid";
import { ServicesListNumberedSteps } from "../../components/blocks/services-list/services-list-numbered-steps";
import { ServicesListCardsHover } from "../../components/blocks/services-list/services-list-cards-hover";
import { ServicesListTimeline } from "../../components/blocks/services-list/services-list-timeline";
import { ResourceListHeroFilter } from "../../components/blocks/resource-list/resource-list-hero-filter";
import { ResourceListFeaturedGrid } from "../../components/blocks/resource-list/resource-list-featured-grid";
import { ResourceListFeaturedArticles } from "../../components/blocks/resource-list/resource-list-featured-articles";
import { ResourceListNewsUpdates } from "../../components/blocks/resource-list/resource-list-news-updates";
import { ResourceListCourseCards } from "../../components/blocks/resource-list/resource-list-course-cards";
import { StatsSimpleGrid } from "../../components/blocks/stats/stats-simple-grid";
import { StatsIconCards } from "../../components/blocks/stats/stats-icon-cards";
import { StatsTimelineTabs } from "../../components/blocks/stats/stats-timeline-tabs";
import { StatsPrimarySecondary } from "../../components/blocks/stats/stats-primary-secondary";
import { StatsGrowthTimeline } from "../../components/blocks/stats/stats-growth-timeline";
import { StatsImpactGrid } from "../../components/blocks/stats/stats-impact-grid";
import { StatsCircularProgress } from "../../components/blocks/stats/stats-circular-progress";
import { StatsCardGroup } from "../../components/blocks/stats/stats-card-group";
import { StatsAnimatedCounter } from "../../components/blocks/stats/stats-animated-counter";
import { StatsNumberTicker } from "../../components/blocks/stats/stats-number-ticker";
import { StatsMilestoneSidebar } from "../../components/blocks/stats/stats-milestone-sidebar";
import { StatsBarComparison } from "../../components/blocks/stats/stats-bar-comparison";
import { TimelineVerticalIconDashed } from "../../components/blocks/timeline/timeline-vertical-icon-dashed";
import { TimelineScrollStickyImage } from "../../components/blocks/timeline/timeline-scroll-sticky-image";
import { TimelineTwoColumnFeatured } from "../../components/blocks/timeline/timeline-two-column-featured";
import { TimelineAlternatingDiagonal } from "../../components/blocks/timeline/timeline-alternating-diagonal";
import { TimelineAIWorkflowCards } from "../../components/blocks/timeline/timeline-ai-workflow-cards";
import { TimelineProductivityList } from "../../components/blocks/timeline/timeline-productivity-list";
import { TimelineStepperAnimated } from "../../components/blocks/timeline/timeline-stepper-animated";
import { TimelineChangelogBadges } from "../../components/blocks/timeline/timeline-changelog-badges";
import { TimelineHistoryProse } from "../../components/blocks/timeline/timeline-history-prose";
import { TimelineHorizontalPhases } from "../../components/blocks/timeline/timeline-horizontal-phases";
import { TimelineHorizontalIcons } from "../../components/blocks/timeline/timeline-horizontal-icons";
import { TimelineTabbedPhases } from "../../components/blocks/timeline/timeline-tabbed-phases";
import { TimelineProductLaunch } from "../../components/blocks/timeline/timeline-product-launch";
import { TimelineScrollHighlight } from "../../components/blocks/timeline/timeline-scroll-highlight";
import { LinkTreeBlock } from "../../components/blocks/link-page/link-tree-block";
import { LinkPageMinimalProfile } from "../../components/blocks/link-page/link-page-minimal-profile";
import { LinkPageNewsletterSocial } from "../../components/blocks/link-page/link-page-newsletter-social";
import { LinkPageGridCards } from "../../components/blocks/link-page/link-page-grid-cards";
import { LinkPageBentoLayout } from "../../components/blocks/link-page/link-page-bento-layout";

import { BLOCK_METADATA_REGISTRY } from "./block-metadata";
import type { BlockCategory, BlockRegistryEntry } from "./types";

const BLOCK_COMPONENTS: Record<string, BlockRegistryEntry["component"]> = {
  /* ======================================================================== */
  /* BEGIN advanced + integrations embed blocks                             */
  /* INTEGRATOR: add free-form-design and tripleseat-form in this section. */
  /* ======================================================================== */
  "iframe-embed": IframeEmbed,
  "script-embed": ScriptEmbed,
  "free-form-design": FreeFormDesign,
  "tripleseat-form": TripleseatForm,
  /* ======================================================================== */
  /* END advanced + integrations embed blocks                                */
  /* ======================================================================== */
  "alternating-blocks": AlternatingBlocks,
  "about-mission-features": AboutMissionFeatures,
  "about-stats-showcase": AboutStatsShowcase,
  "about-company-profile": AboutCompanyProfile,
  "about-vision-gallery": AboutVisionGallery,
  "about-developer-story": AboutDeveloperStory,
  "about-story-gallery": AboutStoryGallery,
  "about-streamline-team": AboutStreamlineTeam,
  "about-developer-profile": AboutDeveloperProfile,
  "about-startup-team": AboutStartupTeam,
  "about-minimal-story": AboutMinimalStory,
  "about-story-hero": AboutStoryHero,
  "about-stats-sidebar": AboutStatsSidebar,
  "about-interactive-tabs": AboutInteractiveTabs,
  "about-mission-dual-image": AboutMissionDualImage,
  "about-story-expertise": AboutStoryExpertise,
  "about-network-spotlight": AboutNetworkSpotlight,
  "about-location-info-hero": AboutLocationInfoHero,
  "media-hover-ctas": MediaHoverCtas,
  "cta-documentation-links": CtaDocumentationLinks,
  "cta-feature-checklist": CtaFeatureChecklist,
  "cta-split-image": CtaSplitImage,
  "cta-stacked-cards": CtaStackedCards,
  "cta-feature-list": CtaFeatureList,
  "cta-split-image-logos": CtaSplitImageLogos,
  "cta-fullwidth-background": CtaFullwidthBackground,
  "cta-feature-cards-grid": CtaFeatureCardsGrid,
  "cta-accent-background": CtaAccentBackground,
  "cta-split-gradient-image": CtaSplitGradientImage,
  "cta-background-icon-badge": CtaBackgroundIconBadge,
  "cta-pattern-background": CtaPatternBackground,
  "cta-platform-demo": CtaPlatformDemo,
  "cta-enterprise-split": CtaEnterpriseSplit,
  "cta-minimal-separator": CtaMinimalSeparator,
  "cta-image-overlay-arrow": CtaImageOverlayArrow,
  "cta-image-overlay-centered": CtaImageOverlayCentered,
  "cta-app-download-newsletter": CtaAppDownloadNewsletter,
  "cta-newsletter-features": CtaNewsletterFeatures,
  "cta-hero-feature-cards": CtaHeroFeatureCards,
  "cta-enterprise-dark-features": CtaEnterpriseDarkFeatures,
  "cta-gradient-logos-floating": CtaGradientLogosFloating,
  "cta-gradient-stats-hero": CtaGradientStatsHero,
  "cta-video-background-hero": CtaVideoBackgroundHero,
  "cta-workflow-tabs": CtaWorkflowTabs,
  "cta-case-study-testimonial": CtaCaseStudyTestimonial,
  "cta-simple-centered": CtaSimpleCentered,
  "contact-floating-banner": ContactFloatingBanner,
  "contact-callback": ContactCallback,
  "contact-card": ContactCard,
  "contact-careers": ContactCareers,
  "contact-catering": ContactCatering,
  "contact-consultation": ContactConsultation,
  "contact-dark": ContactDark,
  "contact-demo": ContactDemo,
  "contact-emergency": ContactEmergency,
  "contact-event": ContactEvent,
  "contact-faq": ContactFaq,
  "contact-feedback": ContactFeedback,
  "contact-fitness": ContactFitness,
  "contact-guest": ContactGuest,
  "contact-image": ContactImage,
  "contact-insurance": ContactInsurance,
  "contact-interview": ContactInterview,
  "contact-locations": ContactLocations,
  "contact-maintenance": ContactMaintenance,
  "contact-map": ContactMap,
  "contact-minimal": ContactMinimal,
  "contact-moving": ContactMoving,
  "contact-multistep": ContactMultistep,
  "contact-partnership": ContactPartnership,
  "contact-photography": ContactPhotography,
  "contact-press": ContactPress,
  "contact-quote": ContactQuote,
  "contact-referral": ContactReferral,
  "contact-report": ContactReport,
  "contact-reservation": ContactReservation,
  "contact-retreat": ContactRetreat,
  "contact-rsvp": ContactRsvp,
  "contact-sales": ContactSales,
  "contact-schedule": ContactSchedule,
  "contact-sponsorship": ContactSponsorship,
  "contact-support": ContactSupport,
  "contact-help-center": ContactHelpCenter,
  "contact-tenant": ContactTenant,
  "contact-vendor": ContactVendor,
  "contact-volunteer": ContactVolunteer,
  "contact-warranty": ContactWarranty,
  "contact-wedding": ContactWedding,
  "carousel-animated-sections": CarouselAnimatedSections,
  "carousel-auto-progress-slides": CarouselAutoProgressSlides,
  "carousel-autoplay-progress": CarouselAutoplayProgress,
  "carousel-feature-badge": CarouselFeatureBadge,
  "carousel-fullscreen-scroll-fx": CarouselFullscreenScrollFx,
  "carousel-gallery-thumbnails": CarouselGalleryThumbnails,
  "carousel-horizontal-cards": CarouselHorizontalCards,
  "carousel-image-hero": CarouselImageHero,
  "carousel-multi-step-showcase": CarouselMultiStepShowcase,
  "carousel-portfolio-hero": CarouselPortfolioHero,
  "carousel-product-feature-showcase": CarouselProductFeatureShowcase,
  "carousel-progress-slider": CarouselProgressSlider,
  "carousel-scrolling-feature-showcase": CarouselScrollingFeatureShowcase,
  "feature-showcase": FeatureShowcase,
  "feature-capabilities-grid": FeatureCapabilitiesGrid,
  "feature-split-image": FeatureSplitImage,
  "feature-split-image-reverse": FeatureSplitImageReverse,
  "feature-icon-grid-bordered": FeatureIconGridBordered,
  "feature-checklist-image": FeatureChecklistImage,
  "feature-carousel-progress": FeatureCarouselProgress,
  "feature-card-grid-linked": FeatureCardGridLinked,
  "feature-numbered-cards": FeatureNumberedCards,
  "feature-icon-grid-accent": FeatureIconGridAccent,
  "feature-three-column-values": FeatureThreeColumnValues,
  "feature-badge-grid-six": FeatureBadgeGridSix,
  "feature-pattern-grid-links": FeaturePatternGridLinks,
  "feature-tabbed-content-image": FeatureTabbedContentImage,
  "feature-utility-cards-grid": FeatureUtilityCardsGrid,
  "feature-bento-utilities": FeatureBentoUtilities,
  "feature-checklist-three-column": FeatureChecklistThreeColumn,
  "feature-integration-cards": FeatureIntegrationCards,
  "feature-icon-tabs-content": FeatureIconTabsContent,
  "feature-image-overlay-badge": FeatureImageOverlayBadge,
  "feature-category-image-cards": FeatureCategoryImageCards,
  "feature-bento-image-grid": FeatureBentoImageGrid,
  "feature-image-cards-three-column": FeatureImageCardsThreeColumn,
  "feature-icon-grid-muted": FeatureIconGridMuted,
  "feature-stats-highlight": FeatureStatsHighlight,
  "feature-accordion-image": FeatureAccordionImage,
  "team-media-showcase": TeamMediaShowcase,
  "team-simple-grid": TeamSimpleGrid,
  "team-social-grid": TeamSocialGrid,
  "team-gradient-cards": TeamGradientCards,
  "team-bio-badges": TeamBioBadges,
  "team-expertise-cards": TeamExpertiseCards,
  "team-compact-grid": TeamCompactGrid,
  "team-investor-showcase": TeamInvestorShowcase,
  "team-carousel-experience": TeamCarouselExperience,
  "team-filterable-search": TeamFilterableSearch,
  "team-compact-cta": TeamCompactCta,
  "team-hover-highlight": TeamHoverHighlight,
  "team-social-cards": TeamSocialCards,
  "team-grid-animated": TeamGridAnimated,
  "team-department-sections": TeamDepartmentSections,
  "team-alternating-bios": TeamAlternatingBios,
  "team-avatar-social": TeamAvatarSocial,
  "team-hover-overlay": TeamHoverOverlay,
  "team-role-filter": TeamRoleFilter,
  "team-contact-cards": TeamContactCards,
  "team-large-images": TeamLargeImages,
  "team-skill-badges": TeamSkillBadges,
  "team-testimonial-stats": TeamTestimonialStats,
  "footer-links-grid": FooterLinksGrid,
  "footer-social-newsletter": FooterSocialNewsletter,
  "footer-social-apps": FooterSocialApps,
  "footer-simple-centered": FooterSimpleCentered,
  "footer-brand-description": FooterBrandDescription,
  "footer-brand-links-contact": FooterBrandLinksContact,
  "footer-comprehensive-links": FooterComprehensiveLinks,
  "footer-newsletter-grid": FooterNewsletterGrid,
  "footer-cta-banner": FooterCtaBanner,
  "footer-contact-card": FooterContactCard,
  "footer-background-card": FooterBackgroundCard,
  "footer-animated-social": FooterAnimatedSocial,
  "footer-newsletter-minimal": FooterNewsletterMinimal,
  "footer-cta-social": FooterCtaSocial,
  "footer-nav-social": FooterNavSocial,
  "expandable-case-study-cards": ExpandableCaseStudyCards,
  "carousel-badge-cards": CarouselBadgeCards,
  "carousel-gradient-overlay": CarouselGradientOverlay,
  "carousel-demo-link": CarouselDemoLink,
  "auto-scroll-carousel": AutoScrollCarousel,
  "carousel-sidebar-resources": CarouselSidebarResources,
  "carousel-icon-tabs": CarouselIconTabs,
  "testimonial-carousel-cards": TestimonialCarouselCards,
  "carousel-icon-sidebar": CarouselIconSidebar,
  "carousel-gradient-text": CarouselGradientText,
  "service-hover-carousel": ServiceHoverCarousel,
  "carousel-tabs-content": CarouselTabsContent,
  "carousel-scale-focus": CarouselScaleFocus,
  "masonry-motion-grid": MasonryMotionGrid,
  "blur-vignette-grid": BlurVignetteGrid,
  "interior-carousel": InteriorCarousel,
  "instagram-post-grid": InstagramPostGrid,
  "radial-gradient-top": RadialGradientTop,
  "radial-gradient-bottom": RadialGradientBottom,
  "grid-basic": GridBasic,
  "grid-fade-top-left": GridFadeTopLeft,
  "grid-fade-top-right": GridFadeTopRight,
  "grid-fade-top": GridFadeTop,
  "grid-fade-bottom": GridFadeBottom,
  "grid-fade-bottom-left": GridFadeBottomLeft,
  "grid-fade-bottom-right": GridFadeBottomRight,
  "grid-fade-center": GridFadeCenter,
  "diagonal-cross-basic": DiagonalCrossBasic,
  "diagonal-cross-fade-top-left": DiagonalCrossFadeTopLeft,
  "diagonal-cross-fade-top-right": DiagonalCrossFadeTopRight,
  "diagonal-cross-fade-top": DiagonalCrossFadeTop,
  "diagonal-cross-fade-bottom": DiagonalCrossFadeBottom,
  "diagonal-cross-fade-bottom-left": DiagonalCrossFadeBottomLeft,
  "diagonal-cross-fade-bottom-right": DiagonalCrossFadeBottomRight,
  "diagonal-cross-fade-center": DiagonalCrossFadeCenter,
  "dashed-grid-basic": DashedGridBasic,
  "dashed-grid-fade-top-left": DashedGridFadeTopLeft,
  "dashed-grid-fade-top-right": DashedGridFadeTopRight,
  "dashed-grid-fade-top": DashedGridFadeTop,
  "dashed-grid-fade-bottom": DashedGridFadeBottom,
  "dashed-grid-fade-bottom-left": DashedGridFadeBottomLeft,
  "dashed-grid-fade-bottom-right": DashedGridFadeBottomRight,
  "dashed-grid-fade-center": DashedGridFadeCenter,
  "gradient-glow-top": GradientGlowTop,
  "gradient-glow-bottom": GradientGlowBottom,
  "spotlight-left": SpotlightLeft,
  "spotlight-right": SpotlightRight,
  "circuit-board-basic": CircuitBoardBasic,
  "circuit-board-fade-top-left": CircuitBoardFadeTopLeft,
  "circuit-board-fade-top-right": CircuitBoardFadeTopRight,
  "circuit-board-fade-top": CircuitBoardFadeTop,
  "circuit-board-fade-bottom": CircuitBoardFadeBottom,
  "circuit-board-fade-bottom-left": CircuitBoardFadeBottomLeft,
  "circuit-board-fade-bottom-right": CircuitBoardFadeBottomRight,
  "circuit-board-fade-center": CircuitBoardFadeCenter,
  "grid-dots-basic": GridDotsBasic,
  "grid-dots-fade-center": GridDotsFadeCenter,
  "blog-grid-author-cards": BlogGridAuthorCards,
  "blog-cards-tagline-cta": BlogCardsTaglineCta,
  "blog-cards-read-time": BlogCardsReadTime,
  "blog-category-overlay": BlogCategoryOverlay,
  "blog-featured-popular": BlogFeaturedPopular,
  "blog-related-articles": BlogRelatedArticles,
  "blog-tech-insights": BlogTechInsights,
  "blog-horizontal-cards": BlogHorizontalCards,
  "blog-filtered-results": BlogFilteredResults,
  "blog-masonry-featured": BlogMasonryFeatured,
  "blog-horizontal-timeline": BlogHorizontalTimeline,
  "blog-grid-nine-posts": BlogGridNinePosts,
  "blog-carousel-apple": BlogCarouselApple,
  "article-hero-prose": ArticleHeroProse,
  "article-sidebar-sticky": ArticleSidebarSticky,
  "article-toc-sidebar": ArticleTocSidebar,
  "article-breadcrumb-social": ArticleBreadcrumbSocial,
  "article-compact-toc": ArticleCompactToc,
  "article-chapters-author": ArticleChaptersAuthor,
  "article-split-animated": ArticleSplitAnimated,
  "article-legal-prose": ArticleLegalProse,
  "faq-simple-accordion": FaqSimpleAccordion,
  "faq-static-list": FaqStaticList,
  "faq-centered-accordion": FaqCenteredAccordion,
  "faq-badge-support": FaqBadgeSupport,
  "faq-numbered-list": FaqNumberedList,
  "faq-numbered-grid": FaqNumberedGrid,
  "faq-split-help": FaqSplitHelp,
  "faq-categorized-sections": FaqCategorizedSections,
  "faq-muted-cards": FaqMutedCards,
  "faq-bordered-badge": FaqBorderedBadge,
  "faq-gradient-categories": FaqGradientCategories,
  "faq-sidebar-navigation": FaqSidebarNavigation,
  "faq-card-categories": FaqCardCategories,
  "faq-icon-benefits": FaqIconBenefits,
  "faq-rounded-cards": FaqRoundedCards,
  "faq-profile-sidebar": FaqProfileSidebar,
  "hero-overlay-cta-grid": HeroOverlayCtaGrid,
  "hero-split-icon-cards": HeroSplitIconCards,
  "hero-floating-images": HeroFloatingImages,
  "hero-badge-image-split": HeroBadgeImageSplit,
  "hero-image-left-content": HeroImageLeftContent,
  "hero-image-slider": HeroImageSlider,
  "hero-centered-image-grid": HeroCenteredImageGrid,
  "hero-centered-screenshot": HeroCenteredScreenshot,
  "hero-pattern-badge-logos": HeroPatternBadgeLogos,
  "hero-logo-centered-screenshot": HeroLogoCenteredScreenshot,
  "hero-pattern-logo-tech-stack": HeroPatternLogoTechStack,
  "hero-announcement-badge": HeroAnnouncementBadge,
  "hero-tech-carousel": HeroTechCarousel,
  "hero-simple-centered-image": HeroSimpleCenteredImage,
  "hero-platform-features-grid": HeroPlatformFeaturesGrid,
  "hero-spiral-pattern-cards": HeroSpiralPatternCards,
  "hero-split-spiral-shapes": HeroSplitSpiralShapes,
  "hero-split-geometric-shapes": HeroSplitGeometricShapes,
  "hero-community-survey-cta": HeroCommunitySurveyCta,
  "hero-marketplace-scattered-images": HeroMarketplaceScatteredImages,
  "hero-badge-shadow-overlay": HeroBadgeShadowOverlay,
  "hero-video-background-dark": HeroVideoBackgroundDark,
  "hero-grid-pattern-efficiency": HeroGridPatternEfficiency,
  "hero-dashed-border-features": HeroDashedBorderFeatures,
  "hero-design-carousel-portfolio": HeroDesignCarouselPortfolio,
  "hero-gradient-client-focused": HeroGradientClientFocused,
  "hero-premium-split-avatars": HeroPremiumSplitAvatars,
  "hero-ui-library-showcase": HeroUiLibraryShowcase,
  "hero-fullscreen-background-image": HeroFullscreenBackgroundImage,
  "hero-fullscreen-logo-cta": HeroFullscreenLogoCta,
  "hero-gradient-avatars-rating": HeroGradientAvatarsRating,
  "hero-task-timer-animated": HeroTaskTimerAnimated,
  "hero-ai-powered-carousel": HeroAiPoweredCarousel,
  "hero-ad-campaign-expert": HeroAdCampaignExpert,
  "hero-adaptable-product-grid": HeroAdaptableProductGrid,
  "hero-presentation-platform-video": HeroPresentationPlatformVideo,
  "hero-grid-pattern-solutions": HeroGridPatternSolutions,
  "hero-crm-streamlined": HeroCrmStreamlined,
  "hero-billing-platform-logos": HeroBillingPlatformLogos,
  "hero-software-growth-video-dialog": HeroSoftwareGrowthVideoDialog,
  "hero-conversion-video-play": HeroConversionVideoPlay,
  "hero-design-showcase-logos": HeroDesignShowcaseLogos,
  "hero-video-overlay-stars": HeroVideoOverlayStars,
  "hero-productivity-launcher-video": HeroProductivityLauncherVideo,
  "hero-hiring-animated-text": HeroHiringAnimatedText,
  "hero-split-image-newsletter": HeroSplitImageNewsletter,
  "hero-centered-gradient-cta": HeroCenteredGradientCta,
  "hero-stats-social-proof": HeroStatsSocialProof,
  "hero-feature-cards-grid": HeroFeatureCardsGrid,
  "hero-testimonial-image-grid": HeroTestimonialImageGrid,
  "hero-design-system-3d": HeroDesignSystem3d,
  "hero-architecture-fullscreen": HeroArchitectureFullscreen,
  "hero-innovation-image-grid": HeroInnovationImageGrid,
  "hero-video-dialog-gradient": HeroVideoDialogGradient,
  "hero-minimal-centered-dark": HeroMinimalCenteredDark,
  "hero-product-showcase-floating": HeroProductShowcaseFloating,
  "hero-saas-dashboard-preview": HeroSaasDashboardPreview,
  "hero-therapy-testimonial-grid": HeroTherapyTestimonialGrid,
  "hero-mental-health-team": HeroMentalHealthTeam,
  "hero-mentorship-video-split": HeroMentorshipVideoSplit,
  "hero-business-operations-mosaic": HeroBusinessOperationsMosaic,
  "hero-agency-animated-images": HeroAgencyAnimatedImages,
  "hero-welcome-asymmetric-images": HeroWelcomeAsymmetricImages,
  "hero-startup-launch-cta": HeroStartupLaunchCta,
  "hero-enterprise-security": HeroEnterpriseSecurity,
  "hero-creative-studio-stacked": HeroCreativeStudioStacked,
  "hero-digital-agency-fullscreen": HeroDigitalAgencyFullscreen,
  "hero-customer-support-layered": HeroCustomerSupportLayered,
  "hero-shared-inbox-layered": HeroSharedInboxLayered,
  "hero-conversation-intelligence": HeroConversationIntelligence,
  "hero-business-carousel-dots": HeroBusinessCarouselDots,
  "hero-developer-tools-code": HeroDeveloperToolsCode,
  "hero-ecommerce-product-showcase": HeroEcommerceProductShowcase,
  "hero-mobile-app-download": HeroMobileAppDownload,
  "hero-pricing-comparison": HeroPricingComparison,
  "hero-newsletter-minimal": HeroNewsletterMinimal,
  "hero-coming-soon-countdown": HeroComingSoonCountdown,
  "hero-event-registration": HeroEventRegistration,
  "hero-portfolio-creative": HeroPortfolioCreative,
  "case-studies-image-grid": CaseStudiesImageGrid,
  "case-studies-testimonial-stats": CaseStudiesTestimonialStats,
  "case-studies-featured-border": CaseStudiesFeaturedBorder,
  "case-studies-stats-card": CaseStudiesStatsCard,
  "case-study-prose-sidebar": CaseStudyProseSidebar,
  "case-study-toc-social-sidebar": CaseStudyTocSocialSidebar,
  "case-study-stats-metrics": CaseStudyStatsMetrics,
  "comparison-table-two-column": ComparisonTableTwoColumn,
  "comparison-feature-cards": ComparisonFeatureCards,
  "comparison-grid-badges": ComparisonGridBadges,
  "comparison-metrics-rows": ComparisonMetricsRows,
  "comparison-image-cards": ComparisonImageCards,
  "comparison-table-tabs": ComparisonTableTabs,
  "comparison-table-tooltips": ComparisonTableTooltips,
  "comparison-feature-grid": ComparisonFeatureGrid,
  "comparison-ai-models": ComparisonAiModels,
  "comparison-legacy-modern": ComparisonLegacyModern,
  "navbar-dropdown-menu": NavbarDropdownMenu,
  "navbar-centered-menu": NavbarCenteredMenu,
  "navbar-mega-menu": NavbarMegaMenu,
  "navbar-enterprise-mega": NavbarEnterpriseMega,
  "navbar-feature-grid": NavbarFeatureGrid,
  "navbar-floating-pill": NavbarFloatingPill,
  "navbar-platform-resources": NavbarPlatformResources,
  "navbar-image-preview": NavbarImagePreview,
  "navbar-dark-icons": NavbarDarkIcons,
  "navbar-animated-preview": NavbarAnimatedPreview,
  "navbar-multi-column-groups": NavbarMultiColumnGroups,
  "navbar-sidebar-mobile": NavbarSidebarMobile,
  "navbar-transparent-overlay": NavbarTransparentOverlay,
  "navbar-education-platform": NavbarEducationPlatform,
  "navbar-sticky-compact": NavbarStickyCompact,
  "navbar-search-focused": NavbarSearchFocused,
  "navbar-simple-links": NavbarSimpleLinks,
  "navbar-split-cta": NavbarSplitCta,
  "navbar-icon-links": NavbarIconLinks,
  "navbar-tabbed-sections": NavbarTabbedSections,
  "navbar-fullscreen-menu": NavbarFullscreenMenu,
  "logos-inline-tagline": LogosInlineTagline,
  "logos-certifications-grid": LogosCertificationsGrid,
  "logos-carousel-heading": LogosCarouselHeading,
  "logos-partner-network": LogosPartnerNetwork,
  "logos-two-row-grid": LogosTwoRowGrid,
  "logos-marquee-muted": LogosMarqueeMuted,
  "logos-centered-simple": LogosCenteredSimple,
  "logos-numbered-carousel": LogosNumberedCarousel,
  "logos-double-carousel-pattern": LogosDoubleCarouselPattern,
  "logos-minimal-carousel": LogosMinimalCarousel,
  "logos-partner-grid-sidebar": LogosPartnerGridSidebar,
  "pricing-tier-grid": PricingTierGrid,
  "pricing-toggle-cards": PricingToggleCards,
  "pricing-columns-toggle": PricingColumnsToggle,
  "pricing-radio-toggle": PricingRadioToggle,
  "pricing-comparison-table": PricingComparisonTable,
  "pricing-single-card": PricingSingleCard,
  "pricing-two-column-basic": PricingTwoColumnBasic,
  "pricing-simple-card": PricingSimpleCard,
  "pricing-responsive-table": PricingResponsiveTable,
  "pricing-four-tier-toggle": PricingFourTierToggle,
  "pricing-feature-matrix": PricingFeatureMatrix,
  "pricing-addons-featured": PricingAddonsFeatured,
  "pricing-addons-cards": PricingAddonsCards,
  "pricing-discount-card": PricingDiscountCard,
  "pricing-split-layout": PricingSplitLayout,
  "pricing-tabs-toggle": PricingTabsToggle,
  "pricing-icon-headers": PricingIconHeaders,
  "pricing-comparison-headers": PricingComparisonHeaders,
  "pricing-switch-cards": PricingSwitchCards,
  "pricing-collapsible-plans": PricingCollapsiblePlans,
  "pricing-popular-highlight": PricingPopularHighlight,
  "pricing-services-cards": PricingServicesCards,
  "pricing-packages-radio": PricingPackagesRadio,
  "pricing-toggle-period": PricingTogglePeriod,
  "pricing-spotlight-card": PricingSpotlightCard,
  "pricing-full-comparison": PricingFullComparison,
  "pricing-minimal-cards": PricingMinimalCards,
  "pricing-gradient-cards": PricingGradientCards,
  "pricing-enterprise-contact": PricingEnterpriseContact,
  "process-sticky-steps": ProcessStickySteps,
  "process-scroll-image": ProcessScrollImage,
  "process-hover-cards": ProcessHoverCards,
  "process-icon-timeline": ProcessIconTimeline,
  "process-expandable-timeline": ProcessExpandableTimeline,
  "process-roadmap-timeline": ProcessRoadmapTimeline,
  "process-mission-principles": ProcessMissionPrinciples,
  "process-steps-grid": ProcessStepsGrid,
  "process-numbered-services": ProcessNumberedServices,
  "project-alternating-motion": ProjectAlternatingMotion,
  "project-background-reveal": ProjectBackgroundReveal,
  "project-card-overlay": ProjectCardOverlay,
  "project-carousel-cinematic": ProjectCarouselCinematic,
  "project-carousel-detail-cards": ProjectCarouselDetailCards,
  "project-carousel-minimal": ProjectCarouselMinimal,
  "project-experience-quote": ProjectExperienceQuote,
  "project-featured-carousel": ProjectFeaturedCarousel,
  "project-filterable-gallery": ProjectFilterableGallery,
  "project-filterable-three-column": ProjectFilterableThreeColumn,
  "project-grid-gallery": ProjectGridGallery,
  "project-grid-motion": ProjectGridMotion,
  "project-horizontal-cards": ProjectHorizontalCards,
  "project-hover-reveal-grid": ProjectHoverRevealGrid,
  "project-interactive-hover-reveal": ProjectInteractiveHoverReveal,
  "project-masonry-columns": ProjectMasonryColumns,
  "project-nature-mosaic": ProjectNatureMosaic,
  "project-scroll-reveal": ProjectScrollReveal,
  "project-showcase-alternating": ProjectShowcaseAlternating,
  "project-sticky-scroll": ProjectStickyScroll,
  "project-studio-hover-preview": ProjectStudioHoverPreview,
  "project-table-list": ProjectTableList,
  "project-video-carousel": ProjectVideoCarousel,
  "project-video-hover-bento": ProjectVideoHoverBento,
  "project-video-hover-grid": ProjectVideoHoverGrid,
  "project-video-hover-rounded": ProjectVideoHoverRounded,
  "project-video-hover-stack": ProjectVideoHoverStack,
  "project-video-hover-two-by-two": ProjectVideoHoverTwoByTwo,
  "project-work-showcase": ProjectWorkShowcase,
  "project-zigzag-layout": ProjectZigzagLayout,
  "list-service-category-table": ListServiceCategoryTable,
  "list-achievements-showcase": ListAchievementsShowcase,
  "list-career-timeline": ListCareerTimeline,
  "list-metrics-dashboard": ListMetricsDashboard,
  "list-feature-comparison": ListFeatureComparison,
  "list-searchable-grid": ListSearchableGrid,
  "offer-modal-newsletter-discount": OfferModalNewsletterDiscount,
  "offer-modal-membership-image": OfferModalMembershipImage,
  "offer-modal-sheet-newsletter": OfferModalSheetNewsletter,
  "project-detail-hero-metadata": ProjectDetailHeroMetadata,
  "project-detail-sidebar-sticky": ProjectDetailSidebarSticky,
  "project-detail-case-study-prose": ProjectDetailCaseStudyProse,
  "project-detail-sidebar-navigation": ProjectDetailSidebarNavigation,
  "project-detail-fullscreen-hero": ProjectDetailFullscreenHero,
  "project-detail-sculpture-showcase": ProjectDetailSculptureShowcase,
  "project-detail-grid-gallery": ProjectDetailGridGallery,
  "project-detail-split-materials": ProjectDetailSplitMaterials,
  "project-detail-compact-metadata": ProjectDetailCompactMetadata,
  "project-detail-minimal-centered": ProjectDetailMinimalCentered,
  "project-detail-hover-gallery": ProjectDetailHoverGallery,
  "project-detail-card-header": ProjectDetailCardHeader,
  "project-detail-exhibition-sidebar": ProjectDetailExhibitionSidebar,
  "project-detail-list-related": ProjectDetailListRelated,
  "project-detail-architecture-carousel": ProjectDetailArchitectureCarousel,
  "project-detail-fashion-editorial": ProjectDetailFashionEditorial,
  "project-detail-photography-breadcrumb": ProjectDetailPhotographyBreadcrumb,
  "project-detail-large-hero-featured": ProjectDetailLargeHeroFeatured,
  "project-detail-tabbed-case-study": ProjectDetailTabbedCaseStudy,
  "project-detail-numbered-sections": ProjectDetailNumberedSections,
  "project-detail-mask-reveal": ProjectDetailMaskReveal,
  "project-detail-parallax-scroll": ProjectDetailParallaxScroll,
  "banner-promo-cta": BannerPromoCta,
  "banner-countdown-sale": BannerCountdownSale,
  "banner-delivery-countdown": BannerDeliveryCountdown,
  "banner-announcement-dismissible": BannerAnnouncementDismissible,
  "banner-privacy-notice": BannerPrivacyNotice,
  "banner-survey-incentive": BannerSurveyIncentive,
  "banner-social-follow": BannerSocialFollow,
  "banner-gdpr-rights": BannerGdprRights,
  "banner-event-promo": BannerEventPromo,
  "banner-floating-offer": BannerFloatingOffer,
  "industries-hover-reveal-grid": IndustriesHoverRevealGrid,
  "industries-badge-list-bordered": IndustriesBadgeListBordered,
  "industries-timeline-table": IndustriesTimelineTable,
  "industries-expandable-showcase": IndustriesExpandableShowcase,
  "resource-detail-whitepaper-sidebar": ResourceDetailWhitepaperSidebar,
  "resource-detail-article-hero": ResourceDetailArticleHero,
  "resource-detail-document-sidebar": ResourceDetailDocumentSidebar,
  "testimonials-list-verified": TestimonialsListVerified,
  "testimonials-images-helpful": TestimonialsImagesHelpful,
  "testimonials-bento-grid": TestimonialsBentoGrid,
  "testimonials-twitter-cards": TestimonialsTwitterCards,
  "testimonials-carousel-image": TestimonialsCarouselImage,
  "testimonials-centered-avatars": TestimonialsCenteredAvatars,
  "testimonials-company-logo": TestimonialsCompanyLogo,
  "testimonials-grid-add-review": TestimonialsGridAddReview,
  "testimonials-marquee": TestimonialsMarquee,
  "testimonials-simple-grid": TestimonialsSimpleGrid,
  "testimonials-slider-minimal": TestimonialsSliderMinimal,
  "testimonials-split-image": TestimonialsSplitImage,
  "testimonials-stats-header": TestimonialsStatsHeader,
  "testimonials-wall-compact": TestimonialsWallCompact,
  "testimonials-mini-dividers": TestimonialsMiniDividers,
  "testimonials-logo-cards": TestimonialsLogoCards,
  "testimonials-quote-carousel": TestimonialsQuoteCarousel,
  "testimonials-animated-split": TestimonialsAnimatedSplit,
  "testimonials-scrolling-columns": TestimonialsScrollingColumns,
  "testimonials-minimal-numbered": TestimonialsMinimalNumbered,
  "testimonials-parallax-number": TestimonialsParallaxNumber,
  "testimonials-masonry-grid": TestimonialsMasonryGrid,
  "testimonials-large-quote": TestimonialsLargeQuote,
  "service-detail-prose-minimal": ServiceDetailProseMinimal,
  "service-detail-image-hero": ServiceDetailImageHero,
  "service-detail-stats-hero": ServiceDetailStatsHero,
  "service-detail-sidebar-stats": ServiceDetailSidebarStats,
  "service-detail-sidebar-related": ServiceDetailSidebarRelated,
  "service-detail-centered-expertise": ServiceDetailCenteredExpertise,
  "service-detail-compact-cards": ServiceDetailCompactCards,
  "services-list-icon-grid": ServicesListIconGrid,
  "services-list-muted-cards": ServicesListMutedCards,
  "services-list-centered-icons": ServicesListCenteredIcons,
  "services-list-vertical-tags": ServicesListVerticalTags,
  "services-list-accordion": ServicesListAccordion,
  "services-list-pricing-grid": ServicesListPricingGrid,
  "services-list-featured-highlight": ServicesListFeaturedHighlight,
  "services-list-feature-spotlight": ServicesListFeatureSpotlight,
  "services-list-image-cards": ServicesListImageCards,
  "services-list-image-overlay-grid": ServicesListImageOverlayGrid,
  "services-list-hero-cards": ServicesListHeroCards,
  "services-list-two-column-grid": ServicesListTwoColumnGrid,
  "services-list-masonry": ServicesListMasonry,
  "services-list-category-accordion": ServicesListCategoryAccordion,
  "services-list-progress-sidebar": ServicesListProgressSidebar,
  "services-list-table-hover": ServicesListTableHover,
  "services-list-methodology-steps": ServicesListMethodologySteps,
  "services-list-sticky-image": ServicesListStickyImage,
  "services-list-tabs-features": ServicesListTabsFeatures,
  "services-list-video-showcase": ServicesListVideoShowcase,
  "services-list-culture-tabs": ServicesListCultureTabs,
  "services-list-accordion-benefits": ServicesListAccordionBenefits,
  "services-list-split-checklist": ServicesListSplitChecklist,
  "services-list-minimal-grid": ServicesListMinimalGrid,
  "services-list-numbered-steps": ServicesListNumberedSteps,
  "services-list-cards-hover": ServicesListCardsHover,
  "services-list-timeline": ServicesListTimeline,
  "resource-list-hero-filter": ResourceListHeroFilter,
  "resource-list-featured-grid": ResourceListFeaturedGrid,
  "resource-list-featured-articles": ResourceListFeaturedArticles,
  "resource-list-news-updates": ResourceListNewsUpdates,
  "resource-list-course-cards": ResourceListCourseCards,
  "stats-simple-grid": StatsSimpleGrid,
  "stats-icon-cards": StatsIconCards,
  "stats-timeline-tabs": StatsTimelineTabs,
  "stats-primary-secondary": StatsPrimarySecondary,
  "stats-growth-timeline": StatsGrowthTimeline,
  "stats-impact-grid": StatsImpactGrid,
  "stats-circular-progress": StatsCircularProgress,
  "stats-card-group": StatsCardGroup,
  "stats-animated-counter": StatsAnimatedCounter,
  "stats-number-ticker": StatsNumberTicker,
  "stats-milestone-sidebar": StatsMilestoneSidebar,
  "stats-bar-comparison": StatsBarComparison,
  "timeline-vertical-icon-dashed": TimelineVerticalIconDashed,
  "timeline-scroll-sticky-image": TimelineScrollStickyImage,
  "timeline-two-column-featured": TimelineTwoColumnFeatured,
  "timeline-alternating-diagonal": TimelineAlternatingDiagonal,
  "timeline-ai-workflow-cards": TimelineAIWorkflowCards,
  "timeline-productivity-list": TimelineProductivityList,
  "timeline-stepper-animated": TimelineStepperAnimated,
  "timeline-changelog-badges": TimelineChangelogBadges,
  "timeline-history-prose": TimelineHistoryProse,
  "timeline-horizontal-phases": TimelineHorizontalPhases,
  "timeline-horizontal-icons": TimelineHorizontalIcons,
  "timeline-tabbed-phases": TimelineTabbedPhases,
  "timeline-product-launch": TimelineProductLaunch,
  "timeline-scroll-highlight": TimelineScrollHighlight,
  "link-tree-block": LinkTreeBlock,
  "link-page-minimal-profile": LinkPageMinimalProfile,
  "link-page-newsletter-social": LinkPageNewsletterSocial,
  "link-page-grid-cards": LinkPageGridCards,
  "link-page-bento-layout": LinkPageBentoLayout,
  "about-split-hero": AboutSplitHero,
  "about-mission-principles": AboutMissionPrinciples,
  "about-expandable-values": AboutExpandableValues,
  "community-initiatives": CommunityInitiatives,
  "about-culture-tabs": AboutCultureTabs,
  "feature-animated-carousel": FeatureAnimatedCarousel,
  "footer-newsletter-contact": FooterNewsletterContact,
  "footer-split-image-accordion": FooterSplitImageAccordion,
  "footer-accordion-social": FooterAccordionSocial,
  "footer-info-cards-accordion": FooterInfoCardsAccordion,
  "faq-split-hero": FaqSplitHero,
};

export const BLOCK_REGISTRY: Record<string, BlockRegistryEntry> = Object.fromEntries(
  Object.entries(BLOCK_METADATA_REGISTRY).map(([id, metadata]) => {
    const component = BLOCK_COMPONENTS[id];
    if (!component) throw new Error(`Missing component for block: ${id}`);
    return [id, { ...metadata, component }];
  }),
) as Record<string, BlockRegistryEntry>;

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

