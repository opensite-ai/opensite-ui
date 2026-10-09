const blockComponentRegistry: Record<string, React.ComponentType<any>> = {};

type BlockLoader = () => Promise<React.ComponentType<any>>;

// --------------------------------------
// Block loader registry for dynamic imports of React components
// Use explicit dynamic imports for each block to ensure proper bundling and named exports.
// import(`../blocks/${id}`) would hide the targets from the bundler, would include an overly broad set of modules,
// and wouldn't match these wrappers’ named exports.
// --------------------------------------

const BLOCK_LOADERS: Record<string, BlockLoader> = {
  "about-company-profile": () =>
    import("../about-company-profile").then(
      (module) => module.AboutCompanyProfile,
    ),
  "about-culture-tabs": () =>
    import("../about-culture-tabs").then(
      (module) => module.AboutCultureTabs,
    ),
  "about-developer-profile": () =>
    import("../about-developer-profile").then(
      (module) => module.AboutDeveloperProfile,
    ),
  "about-developer-story": () =>
    import("../about-developer-story").then(
      (module) => module.AboutDeveloperStory,
    ),
  "about-expandable-values": () =>
    import("../about-expandable-values").then(
      (module) => module.AboutExpandableValues,
    ),
  "about-interactive-tabs": () =>
    import("../about-interactive-tabs").then(
      (module) => module.AboutInteractiveTabs,
    ),
  "about-location-info-hero": () =>
    import("../about-location-info-hero").then(
      (module) => module.AboutLocationInfoHero,
    ),
  "about-minimal-story": () =>
    import("../about-minimal-story").then(
      (module) => module.AboutMinimalStory,
    ),
  "about-mission-dual-image": () =>
    import("../about-mission-dual-image").then(
      (module) => module.AboutMissionDualImage,
    ),
  "about-mission-features": () =>
    import("../about-mission-features").then(
      (module) => module.AboutMissionFeatures,
    ),
  "about-mission-principles": () =>
    import("../about-mission-principles").then(
      (module) => module.AboutMissionPrinciples,
    ),
  "about-network-spotlight": () =>
    import("../about-network-spotlight").then(
      (module) => module.AboutNetworkSpotlight,
    ),
  "about-split-hero": () =>
    import("../about-split-hero").then(
      (module) => module.AboutSplitHero,
    ),
  "about-startup-team": () =>
    import("../about-startup-team").then(
      (module) => module.AboutStartupTeam,
    ),
  "about-stats-showcase": () =>
    import("../about-stats-showcase").then(
      (module) => module.AboutStatsShowcase,
    ),
  "about-stats-sidebar": () =>
    import("../about-stats-sidebar").then(
      (module) => module.AboutStatsSidebar,
    ),
  "about-story-expertise": () =>
    import("../about-story-expertise").then(
      (module) => module.AboutStoryExpertise,
    ),
  "about-story-gallery": () =>
    import("../about-story-gallery").then(
      (module) => module.AboutStoryGallery,
    ),
  "about-story-hero": () =>
    import("../about-story-hero").then(
      (module) => module.AboutStoryHero,
    ),
  "about-streamline-team": () =>
    import("../about-streamline-team").then(
      (module) => module.AboutStreamlineTeam,
    ),
  "about-vision-gallery": () =>
    import("../about-vision-gallery").then(
      (module) => module.AboutVisionGallery,
    ),
  "alternating-blocks": () =>
    import("../alternating-blocks").then(
      (module) => module.AlternatingBlocks,
    ),
  "community-initiatives": () =>
    import("../community-initiatives").then(
      (module) => module.CommunityInitiatives,
    ),
  "free-form-design": () =>
    import("../free-form-design").then(
      (module) => module.FreeFormDesign,
    ),
  "iframe-embed": () =>
    import("../iframe-embed").then(
      (module) => module.IframeEmbed,
    ),
  "script-embed": () =>
    import("../script-embed").then(
      (module) => module.ScriptEmbed,
    ),
  "article-breadcrumb-social": () =>
    import("../article-breadcrumb-social").then(
      (module) => module.ArticleBreadcrumbSocial,
    ),
  "article-chapters-author": () =>
    import("../article-chapters-author").then(
      (module) => module.ArticleChaptersAuthor,
    ),
  "article-compact-toc": () =>
    import("../article-compact-toc").then(
      (module) => module.ArticleCompactToc,
    ),
  "article-hero-prose": () =>
    import("../article-hero-prose").then(
      (module) => module.ArticleHeroProse,
    ),
  "article-legal-prose": () =>
    import("../article-legal-prose").then(
      (module) => module.ArticleLegalProse,
    ),
  "article-sidebar-sticky": () =>
    import("../article-sidebar-sticky").then(
      (module) => module.ArticleSidebarSticky,
    ),
  "article-split-animated": () =>
    import("../article-split-animated").then(
      (module) => module.ArticleSplitAnimated,
    ),
  "article-toc-sidebar": () =>
    import("../article-toc-sidebar").then(
      (module) => module.ArticleTocSidebar,
    ),
  "circuit-board-basic": () =>
    import("../circuit-board-basic").then(
      (module) => module.CircuitBoardBasic,
    ),
  "circuit-board-fade-bottom-left": () =>
    import("../circuit-board-fade-bottom-left").then(
      (module) => module.CircuitBoardFadeBottomLeft,
    ),
  "circuit-board-fade-bottom-right": () =>
    import("../circuit-board-fade-bottom-right").then(
      (module) => module.CircuitBoardFadeBottomRight,
    ),
  "circuit-board-fade-bottom": () =>
    import("../circuit-board-fade-bottom").then(
      (module) => module.CircuitBoardFadeBottom,
    ),
  "circuit-board-fade-center": () =>
    import("../circuit-board-fade-center").then(
      (module) => module.CircuitBoardFadeCenter,
    ),
  "circuit-board-fade-top-left": () =>
    import("../circuit-board-fade-top-left").then(
      (module) => module.CircuitBoardFadeTopLeft,
    ),
  "circuit-board-fade-top-right": () =>
    import("../circuit-board-fade-top-right").then(
      (module) => module.CircuitBoardFadeTopRight,
    ),
  "circuit-board-fade-top": () =>
    import("../circuit-board-fade-top").then(
      (module) => module.CircuitBoardFadeTop,
    ),
  "dashed-grid-basic": () =>
    import("../dashed-grid-basic").then(
      (module) => module.DashedGridBasic,
    ),
  "dashed-grid-fade-bottom-left": () =>
    import("../dashed-grid-fade-bottom-left").then(
      (module) => module.DashedGridFadeBottomLeft,
    ),
  "dashed-grid-fade-bottom-right": () =>
    import("../dashed-grid-fade-bottom-right").then(
      (module) => module.DashedGridFadeBottomRight,
    ),
  "dashed-grid-fade-bottom": () =>
    import("../dashed-grid-fade-bottom").then(
      (module) => module.DashedGridFadeBottom,
    ),
  "dashed-grid-fade-center": () =>
    import("../dashed-grid-fade-center").then(
      (module) => module.DashedGridFadeCenter,
    ),
  "dashed-grid-fade-top-left": () =>
    import("../dashed-grid-fade-top-left").then(
      (module) => module.DashedGridFadeTopLeft,
    ),
  "dashed-grid-fade-top-right": () =>
    import("../dashed-grid-fade-top-right").then(
      (module) => module.DashedGridFadeTopRight,
    ),
  "dashed-grid-fade-top": () =>
    import("../dashed-grid-fade-top").then(
      (module) => module.DashedGridFadeTop,
    ),
  "diagonal-cross-basic": () =>
    import("../diagonal-cross-basic").then(
      (module) => module.DiagonalCrossBasic,
    ),
  "diagonal-cross-fade-bottom-left": () =>
    import("../diagonal-cross-fade-bottom-left").then(
      (module) => module.DiagonalCrossFadeBottomLeft,
    ),
  "diagonal-cross-fade-bottom-right": () =>
    import("../diagonal-cross-fade-bottom-right").then(
      (module) => module.DiagonalCrossFadeBottomRight,
    ),
  "diagonal-cross-fade-bottom": () =>
    import("../diagonal-cross-fade-bottom").then(
      (module) => module.DiagonalCrossFadeBottom,
    ),
  "diagonal-cross-fade-center": () =>
    import("../diagonal-cross-fade-center").then(
      (module) => module.DiagonalCrossFadeCenter,
    ),
  "diagonal-cross-fade-top-left": () =>
    import("../diagonal-cross-fade-top-left").then(
      (module) => module.DiagonalCrossFadeTopLeft,
    ),
  "diagonal-cross-fade-top-right": () =>
    import("../diagonal-cross-fade-top-right").then(
      (module) => module.DiagonalCrossFadeTopRight,
    ),
  "diagonal-cross-fade-top": () =>
    import("../diagonal-cross-fade-top").then(
      (module) => module.DiagonalCrossFadeTop,
    ),
  "gradient-glow-bottom": () =>
    import("../gradient-glow-bottom").then(
      (module) => module.GradientGlowBottom,
    ),
  "gradient-glow-top": () =>
    import("../gradient-glow-top").then(
      (module) => module.GradientGlowTop,
    ),
  "grid-basic": () =>
    import("../grid-basic").then(
      (module) => module.GridBasic,
    ),
  "grid-dots-basic": () =>
    import("../grid-dots-basic").then(
      (module) => module.GridDotsBasic,
    ),
  "grid-dots-fade-center": () =>
    import("../grid-dots-fade-center").then(
      (module) => module.GridDotsFadeCenter,
    ),
  "grid-fade-bottom-left": () =>
    import("../grid-fade-bottom-left").then(
      (module) => module.GridFadeBottomLeft,
    ),
  "grid-fade-bottom-right": () =>
    import("../grid-fade-bottom-right").then(
      (module) => module.GridFadeBottomRight,
    ),
  "grid-fade-bottom": () =>
    import("../grid-fade-bottom").then(
      (module) => module.GridFadeBottom,
    ),
  "grid-fade-center": () =>
    import("../grid-fade-center").then(
      (module) => module.GridFadeCenter,
    ),
  "grid-fade-top-left": () =>
    import("../grid-fade-top-left").then(
      (module) => module.GridFadeTopLeft,
    ),
  "grid-fade-top-right": () =>
    import("../grid-fade-top-right").then(
      (module) => module.GridFadeTopRight,
    ),
  "grid-fade-top": () =>
    import("../grid-fade-top").then(
      (module) => module.GridFadeTop,
    ),
  "radial-gradient-bottom": () =>
    import("../radial-gradient-bottom").then(
      (module) => module.RadialGradientBottom,
    ),
  "radial-gradient-top": () =>
    import("../radial-gradient-top").then(
      (module) => module.RadialGradientTop,
    ),
  "spotlight-left": () =>
    import("../spotlight-left").then(
      (module) => module.SpotlightLeft,
    ),
  "spotlight-right": () =>
    import("../spotlight-right").then(
      (module) => module.SpotlightRight,
    ),
  "banner-announcement-dismissible": () =>
    import("../banner-announcement-dismissible").then(
      (module) => module.BannerAnnouncementDismissible,
    ),
  "banner-countdown-sale": () =>
    import("../banner-countdown-sale").then(
      (module) => module.BannerCountdownSale,
    ),
  "banner-delivery-countdown": () =>
    import("../banner-delivery-countdown").then(
      (module) => module.BannerDeliveryCountdown,
    ),
  "banner-event-promo": () =>
    import("../banner-event-promo").then(
      (module) => module.BannerEventPromo,
    ),
  "banner-floating-offer": () =>
    import("../banner-floating-offer").then(
      (module) => module.BannerFloatingOffer,
    ),
  "banner-gdpr-rights": () =>
    import("../banner-gdpr-rights").then(
      (module) => module.BannerGdprRights,
    ),
  "banner-privacy-notice": () =>
    import("../banner-privacy-notice").then(
      (module) => module.BannerPrivacyNotice,
    ),
  "banner-promo-cta": () =>
    import("../banner-promo-cta").then(
      (module) => module.BannerPromoCta,
    ),
  "banner-social-follow": () =>
    import("../banner-social-follow").then(
      (module) => module.BannerSocialFollow,
    ),
  "banner-survey-incentive": () =>
    import("../banner-survey-incentive").then(
      (module) => module.BannerSurveyIncentive,
    ),
  "blog-cards-read-time": () =>
    import("../blog-cards-read-time").then(
      (module) => module.BlogCardsReadTime,
    ),
  "blog-cards-tagline-cta": () =>
    import("../blog-cards-tagline-cta").then(
      (module) => module.BlogCardsTaglineCta,
    ),
  "blog-carousel-apple": () =>
    import("../blog-carousel-apple").then(
      (module) => module.BlogCarouselApple,
    ),
  "blog-category-overlay": () =>
    import("../blog-category-overlay").then(
      (module) => module.BlogCategoryOverlay,
    ),
  "blog-featured-popular": () =>
    import("../blog-featured-popular").then(
      (module) => module.BlogFeaturedPopular,
    ),
  "blog-filtered-results": () =>
    import("../blog-filtered-results").then(
      (module) => module.BlogFilteredResults,
    ),
  "blog-grid-author-cards": () =>
    import("../blog-grid-author-cards").then(
      (module) => module.BlogGridAuthorCards,
    ),
  "blog-grid-nine-posts": () =>
    import("../blog-grid-nine-posts").then(
      (module) => module.BlogGridNinePosts,
    ),
  "blog-horizontal-cards": () =>
    import("../blog-horizontal-cards").then(
      (module) => module.BlogHorizontalCards,
    ),
  "blog-horizontal-timeline": () =>
    import("../blog-horizontal-timeline").then(
      (module) => module.BlogHorizontalTimeline,
    ),
  "blog-masonry-featured": () =>
    import("../blog-masonry-featured").then(
      (module) => module.BlogMasonryFeatured,
    ),
  "blog-related-articles": () =>
    import("../blog-related-articles").then(
      (module) => module.BlogRelatedArticles,
    ),
  "blog-tech-insights": () =>
    import("../blog-tech-insights").then(
      (module) => module.BlogTechInsights,
    ),
  "carousel-animated-sections": () =>
    import("../carousel-animated-sections").then(
      (module) => module.CarouselAnimatedSections,
    ),
  "carousel-autoplay-progress": () =>
    import("../carousel-autoplay-progress").then(
      (module) => module.CarouselAutoplayProgress,
    ),
  "carousel-auto-progress-slides": () =>
    import("../carousel-auto-progress-slides").then(
      (module) => module.CarouselAutoProgressSlides,
    ),
  "carousel-feature-badge": () =>
    import("../carousel-feature-badge").then(
      (module) => module.CarouselFeatureBadge,
    ),
  "carousel-fullscreen-scroll-fx": () =>
    import("../carousel-fullscreen-scroll-fx").then(
      (module) => module.CarouselFullscreenScrollFx,
    ),
  "carousel-gallery-thumbnails": () =>
    import("../carousel-gallery-thumbnails").then(
      (module) => module.CarouselGalleryThumbnails,
    ),
  "carousel-horizontal-cards": () =>
    import("../carousel-horizontal-cards").then(
      (module) => module.CarouselHorizontalCards,
    ),
  "carousel-image-hero": () =>
    import("../carousel-image-hero").then(
      (module) => module.CarouselImageHero,
    ),
  "carousel-multi-step-showcase": () =>
    import("../carousel-multi-step-showcase").then(
      (module) => module.CarouselMultiStepShowcase,
    ),
  "carousel-portfolio-hero": () =>
    import("../carousel-portfolio-hero").then(
      (module) => module.CarouselPortfolioHero,
    ),
  "carousel-product-feature-showcase": () =>
    import("../carousel-product-feature-showcase").then(
      (module) => module.CarouselProductFeatureShowcase,
    ),
  "carousel-progress-slider": () =>
    import("../carousel-progress-slider").then(
      (module) => module.CarouselProgressSlider,
    ),
  "carousel-scrolling-feature-showcase": () =>
    import("../carousel-scrolling-feature-showcase").then(
      (module) => module.CarouselScrollingFeatureShowcase,
    ),
  "case-studies-featured-border": () =>
    import("../case-studies-featured-border").then(
      (module) => module.CaseStudiesFeaturedBorder,
    ),
  "case-studies-image-grid": () =>
    import("../case-studies-image-grid").then(
      (module) => module.CaseStudiesImageGrid,
    ),
  "case-studies-stats-card": () =>
    import("../case-studies-stats-card").then(
      (module) => module.CaseStudiesStatsCard,
    ),
  "case-studies-testimonial-stats": () =>
    import("../case-studies-testimonial-stats").then(
      (module) => module.CaseStudiesTestimonialStats,
    ),
  "case-study-prose-sidebar": () =>
    import("../case-study-prose-sidebar").then(
      (module) => module.CaseStudyProseSidebar,
    ),
  "case-study-stats-metrics": () =>
    import("../case-study-stats-metrics").then(
      (module) => module.CaseStudyStatsMetrics,
    ),
  "case-study-toc-social-sidebar": () =>
    import("../case-study-toc-social-sidebar").then(
      (module) => module.CaseStudyTocSocialSidebar,
    ),
  "comparison-ai-models": () =>
    import("../comparison-ai-models").then(
      (module) => module.ComparisonAiModels,
    ),
  "comparison-feature-cards": () =>
    import("../comparison-feature-cards").then(
      (module) => module.ComparisonFeatureCards,
    ),
  "comparison-feature-grid": () =>
    import("../comparison-feature-grid").then(
      (module) => module.ComparisonFeatureGrid,
    ),
  "comparison-grid-badges": () =>
    import("../comparison-grid-badges").then(
      (module) => module.ComparisonGridBadges,
    ),
  "comparison-image-cards": () =>
    import("../comparison-image-cards").then(
      (module) => module.ComparisonImageCards,
    ),
  "comparison-legacy-modern": () =>
    import("../comparison-legacy-modern").then(
      (module) => module.ComparisonLegacyModern,
    ),
  "comparison-metrics-rows": () =>
    import("../comparison-metrics-rows").then(
      (module) => module.ComparisonMetricsRows,
    ),
  "comparison-table-tabs": () =>
    import("../comparison-table-tabs").then(
      (module) => module.ComparisonTableTabs,
    ),
  "comparison-table-tooltips": () =>
    import("../comparison-table-tooltips").then(
      (module) => module.ComparisonTableTooltips,
    ),
  "comparison-table-two-column": () =>
    import("../comparison-table-two-column").then(
      (module) => module.ComparisonTableTwoColumn,
    ),
  "contact-callback": () =>
    import("../contact-callback").then(
      (module) => module.ContactCallback,
    ),
  "contact-card": () =>
    import("../contact-card").then(
      (module) => module.ContactCard,
    ),
  "contact-careers": () =>
    import("../contact-careers").then(
      (module) => module.ContactCareers,
    ),
  "contact-catering": () =>
    import("../contact-catering").then(
      (module) => module.ContactCatering,
    ),
  "contact-consultation": () =>
    import("../contact-consultation").then(
      (module) => module.ContactConsultation,
    ),
  "contact-dark": () =>
    import("../contact-dark").then(
      (module) => module.ContactDark,
    ),
  "contact-demo": () =>
    import("../contact-demo").then(
      (module) => module.ContactDemo,
    ),
  "contact-emergency": () =>
    import("../contact-emergency").then(
      (module) => module.ContactEmergency,
    ),
  "contact-event": () =>
    import("../contact-event").then(
      (module) => module.ContactEvent,
    ),
  "contact-faq": () =>
    import("../contact-faq").then(
      (module) => module.ContactFaq,
    ),
  "contact-feedback": () =>
    import("../contact-feedback").then(
      (module) => module.ContactFeedback,
    ),
  "contact-fitness": () =>
    import("../contact-fitness").then(
      (module) => module.ContactFitness,
    ),
  "contact-floating-banner": () =>
    import("../contact-floating-banner").then(
      (module) => module.ContactFloatingBanner,
    ),
  "contact-guest": () =>
    import("../contact-guest").then(
      (module) => module.ContactGuest,
    ),
  "contact-help-center": () =>
    import("../contact-help-center").then(
      (module) => module.ContactHelpCenter,
    ),
  "contact-image": () =>
    import("../contact-image").then(
      (module) => module.ContactImage,
    ),
  "contact-insurance": () =>
    import("../contact-insurance").then(
      (module) => module.ContactInsurance,
    ),
  "contact-interview": () =>
    import("../contact-interview").then(
      (module) => module.ContactInterview,
    ),
  "contact-locations": () =>
    import("../contact-locations").then(
      (module) => module.ContactLocations,
    ),
  "contact-maintenance": () =>
    import("../contact-maintenance").then(
      (module) => module.ContactMaintenance,
    ),
  "contact-map": () =>
    import("../contact-map").then(
      (module) => module.ContactMap,
    ),
  "contact-minimal": () =>
    import("../contact-minimal").then(
      (module) => module.ContactMinimal,
    ),
  "contact-moving": () =>
    import("../contact-moving").then(
      (module) => module.ContactMoving,
    ),
  "contact-multistep": () =>
    import("../contact-multistep").then(
      (module) => module.ContactMultistep,
    ),
  "contact-partnership": () =>
    import("../contact-partnership").then(
      (module) => module.ContactPartnership,
    ),
  "contact-photography": () =>
    import("../contact-photography").then(
      (module) => module.ContactPhotography,
    ),
  "contact-press": () =>
    import("../contact-press").then(
      (module) => module.ContactPress,
    ),
  "contact-quote": () =>
    import("../contact-quote").then(
      (module) => module.ContactQuote,
    ),
  "contact-referral": () =>
    import("../contact-referral").then(
      (module) => module.ContactReferral,
    ),
  "contact-report": () =>
    import("../contact-report").then(
      (module) => module.ContactReport,
    ),
  "contact-reservation": () =>
    import("../contact-reservation").then(
      (module) => module.ContactReservation,
    ),
  "contact-retreat": () =>
    import("../contact-retreat").then(
      (module) => module.ContactRetreat,
    ),
  "contact-rsvp": () =>
    import("../contact-rsvp").then(
      (module) => module.ContactRsvp,
    ),
  "contact-sales": () =>
    import("../contact-sales").then(
      (module) => module.ContactSales,
    ),
  "contact-schedule": () =>
    import("../contact-schedule").then(
      (module) => module.ContactSchedule,
    ),
  "contact-sponsorship": () =>
    import("../contact-sponsorship").then(
      (module) => module.ContactSponsorship,
    ),
  "contact-support": () =>
    import("../contact-support").then(
      (module) => module.ContactSupport,
    ),
  "contact-tenant": () =>
    import("../contact-tenant").then(
      (module) => module.ContactTenant,
    ),
  "contact-vendor": () =>
    import("../contact-vendor").then(
      (module) => module.ContactVendor,
    ),
  "contact-volunteer": () =>
    import("../contact-volunteer").then(
      (module) => module.ContactVolunteer,
    ),
  "contact-warranty": () =>
    import("../contact-warranty").then(
      (module) => module.ContactWarranty,
    ),
  "contact-wedding": () =>
    import("../contact-wedding").then(
      (module) => module.ContactWedding,
    ),
  "cta-accent-background": () =>
    import("../cta-accent-background").then(
      (module) => module.CtaAccentBackground,
    ),
  "cta-app-download-newsletter": () =>
    import("../cta-app-download-newsletter").then(
      (module) => module.CtaAppDownloadNewsletter,
    ),
  "cta-background-icon-badge": () =>
    import("../cta-background-icon-badge").then(
      (module) => module.CtaBackgroundIconBadge,
    ),
  "cta-case-study-testimonial": () =>
    import("../cta-case-study-testimonial").then(
      (module) => module.CtaCaseStudyTestimonial,
    ),
  "cta-documentation-links": () =>
    import("../cta-documentation-links").then(
      (module) => module.CtaDocumentationLinks,
    ),
  "cta-enterprise-dark-features": () =>
    import("../cta-enterprise-dark-features").then(
      (module) => module.CtaEnterpriseDarkFeatures,
    ),
  "cta-enterprise-split": () =>
    import("../cta-enterprise-split").then(
      (module) => module.CtaEnterpriseSplit,
    ),
  "cta-feature-cards-grid": () =>
    import("../cta-feature-cards-grid").then(
      (module) => module.CtaFeatureCardsGrid,
    ),
  "cta-feature-checklist": () =>
    import("../cta-feature-checklist").then(
      (module) => module.CtaFeatureChecklist,
    ),
  "cta-feature-list": () =>
    import("../cta-feature-list").then(
      (module) => module.CtaFeatureList,
    ),
  "cta-fullwidth-background": () =>
    import("../cta-fullwidth-background").then(
      (module) => module.CtaFullwidthBackground,
    ),
  "cta-gradient-logos-floating": () =>
    import("../cta-gradient-logos-floating").then(
      (module) => module.CtaGradientLogosFloating,
    ),
  "cta-gradient-stats-hero": () =>
    import("../cta-gradient-stats-hero").then(
      (module) => module.CtaGradientStatsHero,
    ),
  "cta-hero-feature-cards": () =>
    import("../cta-hero-feature-cards").then(
      (module) => module.CtaHeroFeatureCards,
    ),
  "cta-image-overlay-arrow": () =>
    import("../cta-image-overlay-arrow").then(
      (module) => module.CtaImageOverlayArrow,
    ),
  "cta-image-overlay-centered": () =>
    import("../cta-image-overlay-centered").then(
      (module) => module.CtaImageOverlayCentered,
    ),
  "cta-minimal-separator": () =>
    import("../cta-minimal-separator").then(
      (module) => module.CtaMinimalSeparator,
    ),
  "cta-newsletter-features": () =>
    import("../cta-newsletter-features").then(
      (module) => module.CtaNewsletterFeatures,
    ),
  "cta-pattern-background": () =>
    import("../cta-pattern-background").then(
      (module) => module.CtaPatternBackground,
    ),
  "cta-platform-demo": () =>
    import("../cta-platform-demo").then(
      (module) => module.CtaPlatformDemo,
    ),
  "cta-simple-centered": () =>
    import("../cta-simple-centered").then(
      (module) => module.CtaSimpleCentered,
    ),
  "cta-split-gradient-image": () =>
    import("../cta-split-gradient-image").then(
      (module) => module.CtaSplitGradientImage,
    ),
  "cta-split-image-logos": () =>
    import("../cta-split-image-logos").then(
      (module) => module.CtaSplitImageLogos,
    ),
  "cta-split-image": () =>
    import("../cta-split-image").then(
      (module) => module.CtaSplitImage,
    ),
  "cta-stacked-cards": () =>
    import("../cta-stacked-cards").then(
      (module) => module.CtaStackedCards,
    ),
  "cta-video-background-hero": () =>
    import("../cta-video-background-hero").then(
      (module) => module.CtaVideoBackgroundHero,
    ),
  "cta-workflow-tabs": () =>
    import("../cta-workflow-tabs").then(
      (module) => module.CtaWorkflowTabs,
    ),
  "media-hover-ctas": () =>
    import("../media-hover-ctas").then(
      (module) => module.MediaHoverCtas,
    ),
  "faq-badge-support": () =>
    import("../faq-badge-support").then(
      (module) => module.FaqBadgeSupport,
    ),
  "faq-bordered-badge": () =>
    import("../faq-bordered-badge").then(
      (module) => module.FaqBorderedBadge,
    ),
  "faq-card-categories": () =>
    import("../faq-card-categories").then(
      (module) => module.FaqCardCategories,
    ),
  "faq-categorized-sections": () =>
    import("../faq-categorized-sections").then(
      (module) => module.FaqCategorizedSections,
    ),
  "faq-centered-accordion": () =>
    import("../faq-centered-accordion").then(
      (module) => module.FaqCenteredAccordion,
    ),
  "faq-gradient-categories": () =>
    import("../faq-gradient-categories").then(
      (module) => module.FaqGradientCategories,
    ),
  "faq-icon-benefits": () =>
    import("../faq-icon-benefits").then(
      (module) => module.FaqIconBenefits,
    ),
  "faq-muted-cards": () =>
    import("../faq-muted-cards").then(
      (module) => module.FaqMutedCards,
    ),
  "faq-numbered-grid": () =>
    import("../faq-numbered-grid").then(
      (module) => module.FaqNumberedGrid,
    ),
  "faq-numbered-list": () =>
    import("../faq-numbered-list").then(
      (module) => module.FaqNumberedList,
    ),
  "faq-profile-sidebar": () =>
    import("../faq-profile-sidebar").then(
      (module) => module.FaqProfileSidebar,
    ),
  "faq-rounded-cards": () =>
    import("../faq-rounded-cards").then(
      (module) => module.FaqRoundedCards,
    ),
  "faq-sidebar-navigation": () =>
    import("../faq-sidebar-navigation").then(
      (module) => module.FaqSidebarNavigation,
    ),
  "faq-simple-accordion": () =>
    import("../faq-simple-accordion").then(
      (module) => module.FaqSimpleAccordion,
    ),
  "faq-split-help": () =>
    import("../faq-split-help").then(
      (module) => module.FaqSplitHelp,
    ),
  "faq-split-hero": () =>
    import("../faq-split-hero").then(
      (module) => module.FaqSplitHero,
    ),
  "faq-static-list": () =>
    import("../faq-static-list").then(
      (module) => module.FaqStaticList,
    ),
  "feature-accordion-image": () =>
    import("../feature-accordion-image").then(
      (module) => module.FeatureAccordionImage,
    ),
  "feature-animated-carousel": () =>
    import("../feature-animated-carousel").then(
      (module) => module.FeatureAnimatedCarousel,
    ),
  "feature-badge-grid-six": () =>
    import("../feature-badge-grid-six").then(
      (module) => module.FeatureBadgeGridSix,
    ),
  "feature-bento-image-grid": () =>
    import("../feature-bento-image-grid").then(
      (module) => module.FeatureBentoImageGrid,
    ),
  "feature-bento-utilities": () =>
    import("../feature-bento-utilities").then(
      (module) => module.FeatureBentoUtilities,
    ),
  "feature-capabilities-grid": () =>
    import("../feature-capabilities-grid").then(
      (module) => module.FeatureCapabilitiesGrid,
    ),
  "feature-card-grid-linked": () =>
    import("../feature-card-grid-linked").then(
      (module) => module.FeatureCardGridLinked,
    ),
  "feature-carousel-progress": () =>
    import("../feature-carousel-progress").then(
      (module) => module.FeatureCarouselProgress,
    ),
  "feature-category-image-cards": () =>
    import("../feature-category-image-cards").then(
      (module) => module.FeatureCategoryImageCards,
    ),
  "feature-checklist-image": () =>
    import("../feature-checklist-image").then(
      (module) => module.FeatureChecklistImage,
    ),
  "feature-checklist-three-column": () =>
    import("../feature-checklist-three-column").then(
      (module) => module.FeatureChecklistThreeColumn,
    ),
  "feature-icon-grid-accent": () =>
    import("../feature-icon-grid-accent").then(
      (module) => module.FeatureIconGridAccent,
    ),
  "feature-icon-grid-bordered": () =>
    import("../feature-icon-grid-bordered").then(
      (module) => module.FeatureIconGridBordered,
    ),
  "feature-icon-grid-muted": () =>
    import("../feature-icon-grid-muted").then(
      (module) => module.FeatureIconGridMuted,
    ),
  "feature-icon-tabs-content": () =>
    import("../feature-icon-tabs-content").then(
      (module) => module.FeatureIconTabsContent,
    ),
  "feature-image-cards-three-column": () =>
    import("../feature-image-cards-three-column").then(
      (module) => module.FeatureImageCardsThreeColumn,
    ),
  "feature-image-overlay-badge": () =>
    import("../feature-image-overlay-badge").then(
      (module) => module.FeatureImageOverlayBadge,
    ),
  "feature-integration-cards": () =>
    import("../feature-integration-cards").then(
      (module) => module.FeatureIntegrationCards,
    ),
  "feature-numbered-cards": () =>
    import("../feature-numbered-cards").then(
      (module) => module.FeatureNumberedCards,
    ),
  "feature-pattern-grid-links": () =>
    import("../feature-pattern-grid-links").then(
      (module) => module.FeaturePatternGridLinks,
    ),
  "feature-showcase": () =>
    import("../feature-showcase").then(
      (module) => module.FeatureShowcase,
    ),
  "feature-split-image-reverse": () =>
    import("../feature-split-image-reverse").then(
      (module) => module.FeatureSplitImageReverse,
    ),
  "feature-split-image": () =>
    import("../feature-split-image").then(
      (module) => module.FeatureSplitImage,
    ),
  "feature-stats-highlight": () =>
    import("../feature-stats-highlight").then(
      (module) => module.FeatureStatsHighlight,
    ),
  "feature-tabbed-content-image": () =>
    import("../feature-tabbed-content-image").then(
      (module) => module.FeatureTabbedContentImage,
    ),
  "feature-three-column-values": () =>
    import("../feature-three-column-values").then(
      (module) => module.FeatureThreeColumnValues,
    ),
  "feature-utility-cards-grid": () =>
    import("../feature-utility-cards-grid").then(
      (module) => module.FeatureUtilityCardsGrid,
    ),
  "footer-accordion-social": () =>
    import("../footer-accordion-social").then(
      (module) => module.FooterAccordionSocial,
    ),
  "footer-animated-social": () =>
    import("../footer-animated-social").then(
      (module) => module.FooterAnimatedSocial,
    ),
  "footer-background-card": () =>
    import("../footer-background-card").then(
      (module) => module.FooterBackgroundCard,
    ),
  "footer-brand-description": () =>
    import("../footer-brand-description").then(
      (module) => module.FooterBrandDescription,
    ),
  "footer-brand-links-contact": () =>
    import("../footer-brand-links-contact").then(
      (module) => module.FooterBrandLinksContact,
    ),
  "footer-comprehensive-links": () =>
    import("../footer-comprehensive-links").then(
      (module) => module.FooterComprehensiveLinks,
    ),
  "footer-contact-card": () =>
    import("../footer-contact-card").then(
      (module) => module.FooterContactCard,
    ),
  "footer-cta-banner": () =>
    import("../footer-cta-banner").then(
      (module) => module.FooterCtaBanner,
    ),
  "footer-cta-social": () =>
    import("../footer-cta-social").then(
      (module) => module.FooterCtaSocial,
    ),
  "footer-info-cards-accordion": () =>
    import("../footer-info-cards-accordion").then(
      (module) => module.FooterInfoCardsAccordion,
    ),
  "footer-links-grid": () =>
    import("../footer-links-grid").then(
      (module) => module.FooterLinksGrid,
    ),
  "footer-nav-social": () =>
    import("../footer-nav-social").then(
      (module) => module.FooterNavSocial,
    ),
  "footer-newsletter-contact": () =>
    import("../footer-newsletter-contact").then(
      (module) => module.FooterNewsletterContact,
    ),
  "footer-newsletter-grid": () =>
    import("../footer-newsletter-grid").then(
      (module) => module.FooterNewsletterGrid,
    ),
  "footer-newsletter-minimal": () =>
    import("../footer-newsletter-minimal").then(
      (module) => module.FooterNewsletterMinimal,
    ),
  "footer-simple-centered": () =>
    import("../footer-simple-centered").then(
      (module) => module.FooterSimpleCentered,
    ),
  "footer-social-apps": () =>
    import("../footer-social-apps").then(
      (module) => module.FooterSocialApps,
    ),
  "footer-social-newsletter": () =>
    import("../footer-social-newsletter").then(
      (module) => module.FooterSocialNewsletter,
    ),
  "footer-split-image-accordion": () =>
    import("../footer-split-image-accordion").then(
      (module) => module.FooterSplitImageAccordion,
    ),
  "auto-scroll-carousel": () =>
    import("../auto-scroll-carousel").then(
      (module) => module.AutoScrollCarousel,
    ),
  "blur-vignette-grid": () =>
    import("../blur-vignette-grid").then(
      (module) => module.BlurVignetteGrid,
    ),
  "carousel-badge-cards": () =>
    import("../carousel-badge-cards").then(
      (module) => module.CarouselBadgeCards,
    ),
  "carousel-demo-link": () =>
    import("../carousel-demo-link").then(
      (module) => module.CarouselDemoLink,
    ),
  "carousel-gradient-overlay": () =>
    import("../carousel-gradient-overlay").then(
      (module) => module.CarouselGradientOverlay,
    ),
  "carousel-gradient-text": () =>
    import("../carousel-gradient-text").then(
      (module) => module.CarouselGradientText,
    ),
  "carousel-icon-sidebar": () =>
    import("../carousel-icon-sidebar").then(
      (module) => module.CarouselIconSidebar,
    ),
  "carousel-icon-tabs": () =>
    import("../carousel-icon-tabs").then(
      (module) => module.CarouselIconTabs,
    ),
  "carousel-scale-focus": () =>
    import("../carousel-scale-focus").then(
      (module) => module.CarouselScaleFocus,
    ),
  "carousel-sidebar-resources": () =>
    import("../carousel-sidebar-resources").then(
      (module) => module.CarouselSidebarResources,
    ),
  "carousel-tabs-content": () =>
    import("../carousel-tabs-content").then(
      (module) => module.CarouselTabsContent,
    ),
  "expandable-case-study-cards": () =>
    import("../expandable-case-study-cards").then(
      (module) => module.ExpandableCaseStudyCards,
    ),
  "instagram-post-grid": () =>
    import("../instagram-post-grid").then(
      (module) => module.InstagramPostGrid,
    ),
  "interior-carousel": () =>
    import("../interior-carousel").then(
      (module) => module.InteriorCarousel,
    ),
  "masonry-motion-grid": () =>
    import("../masonry-motion-grid").then(
      (module) => module.MasonryMotionGrid,
    ),
  "service-hover-carousel": () =>
    import("../service-hover-carousel").then(
      (module) => module.ServiceHoverCarousel,
    ),
  "testimonial-carousel-cards": () =>
    import("../testimonial-carousel-cards").then(
      (module) => module.TestimonialCarouselCards,
    ),
  "hero-adaptable-product-grid": () =>
    import("../hero-adaptable-product-grid").then(
      (module) => module.HeroAdaptableProductGrid,
    ),
  "hero-ad-campaign-expert": () =>
    import("../hero-ad-campaign-expert").then(
      (module) => module.HeroAdCampaignExpert,
    ),
  "hero-agency-animated-images": () =>
    import("../hero-agency-animated-images").then(
      (module) => module.HeroAgencyAnimatedImages,
    ),
  "hero-ai-powered-carousel": () =>
    import("../hero-ai-powered-carousel").then(
      (module) => module.HeroAiPoweredCarousel,
    ),
  "hero-announcement-badge": () =>
    import("../hero-announcement-badge").then(
      (module) => module.HeroAnnouncementBadge,
    ),
  "hero-architecture-fullscreen": () =>
    import("../hero-architecture-fullscreen").then(
      (module) => module.HeroArchitectureFullscreen,
    ),
  "hero-badge-image-split": () =>
    import("../hero-badge-image-split").then(
      (module) => module.HeroBadgeImageSplit,
    ),
  "hero-badge-shadow-overlay": () =>
    import("../hero-badge-shadow-overlay").then(
      (module) => module.HeroBadgeShadowOverlay,
    ),
  "hero-billing-platform-logos": () =>
    import("../hero-billing-platform-logos").then(
      (module) => module.HeroBillingPlatformLogos,
    ),
  "hero-business-carousel-dots": () =>
    import("../hero-business-carousel-dots").then(
      (module) => module.HeroBusinessCarouselDots,
    ),
  "hero-business-operations-mosaic": () =>
    import("../hero-business-operations-mosaic").then(
      (module) => module.HeroBusinessOperationsMosaic,
    ),
  "hero-centered-gradient-cta": () =>
    import("../hero-centered-gradient-cta").then(
      (module) => module.HeroCenteredGradientCta,
    ),
  "hero-centered-image-grid": () =>
    import("../hero-centered-image-grid").then(
      (module) => module.HeroCenteredImageGrid,
    ),
  "hero-centered-screenshot": () =>
    import("../hero-centered-screenshot").then(
      (module) => module.HeroCenteredScreenshot,
    ),
  "hero-coming-soon-countdown": () =>
    import("../hero-coming-soon-countdown").then(
      (module) => module.HeroComingSoonCountdown,
    ),
  "hero-community-survey-cta": () =>
    import("../hero-community-survey-cta").then(
      (module) => module.HeroCommunitySurveyCta,
    ),
  "hero-conversation-intelligence": () =>
    import("../hero-conversation-intelligence").then(
      (module) => module.HeroConversationIntelligence,
    ),
  "hero-conversion-video-play": () =>
    import("../hero-conversion-video-play").then(
      (module) => module.HeroConversionVideoPlay,
    ),
  "hero-creative-studio-stacked": () =>
    import("../hero-creative-studio-stacked").then(
      (module) => module.HeroCreativeStudioStacked,
    ),
  "hero-crm-streamlined": () =>
    import("../hero-crm-streamlined").then(
      (module) => module.HeroCrmStreamlined,
    ),
  "hero-customer-support-layered": () =>
    import("../hero-customer-support-layered").then(
      (module) => module.HeroCustomerSupportLayered,
    ),
  "hero-dashed-border-features": () =>
    import("../hero-dashed-border-features").then(
      (module) => module.HeroDashedBorderFeatures,
    ),
  "hero-design-carousel-portfolio": () =>
    import("../hero-design-carousel-portfolio").then(
      (module) => module.HeroDesignCarouselPortfolio,
    ),
  "hero-design-showcase-logos": () =>
    import("../hero-design-showcase-logos").then(
      (module) => module.HeroDesignShowcaseLogos,
    ),
  "hero-design-system-3d": () =>
    import("../hero-design-system-3d").then(
      (module) => module.HeroDesignSystem3d,
    ),
  "hero-developer-tools-code": () =>
    import("../hero-developer-tools-code").then(
      (module) => module.HeroDeveloperToolsCode,
    ),
  "hero-digital-agency-fullscreen": () =>
    import("../hero-digital-agency-fullscreen").then(
      (module) => module.HeroDigitalAgencyFullscreen,
    ),
  "hero-ecommerce-product-showcase": () =>
    import("../hero-ecommerce-product-showcase").then(
      (module) => module.HeroEcommerceProductShowcase,
    ),
  "hero-enterprise-security": () =>
    import("../hero-enterprise-security").then(
      (module) => module.HeroEnterpriseSecurity,
    ),
  "hero-event-registration": () =>
    import("../hero-event-registration").then(
      (module) => module.HeroEventRegistration,
    ),
  "hero-feature-cards-grid": () =>
    import("../hero-feature-cards-grid").then(
      (module) => module.HeroFeatureCardsGrid,
    ),
  "hero-floating-images": () =>
    import("../hero-floating-images").then(
      (module) => module.HeroFloatingImages,
    ),
  "hero-fullscreen-background-image": () =>
    import("../hero-fullscreen-background-image").then(
      (module) => module.HeroFullscreenBackgroundImage,
    ),
  "hero-fullscreen-logo-cta": () =>
    import("../hero-fullscreen-logo-cta").then(
      (module) => module.HeroFullscreenLogoCta,
    ),
  "hero-gradient-avatars-rating": () =>
    import("../hero-gradient-avatars-rating").then(
      (module) => module.HeroGradientAvatarsRating,
    ),
  "hero-gradient-client-focused": () =>
    import("../hero-gradient-client-focused").then(
      (module) => module.HeroGradientClientFocused,
    ),
  "hero-grid-pattern-efficiency": () =>
    import("../hero-grid-pattern-efficiency").then(
      (module) => module.HeroGridPatternEfficiency,
    ),
  "hero-grid-pattern-solutions": () =>
    import("../hero-grid-pattern-solutions").then(
      (module) => module.HeroGridPatternSolutions,
    ),
  "hero-hiring-animated-text": () =>
    import("../hero-hiring-animated-text").then(
      (module) => module.HeroHiringAnimatedText,
    ),
  "hero-image-left-content": () =>
    import("../hero-image-left-content").then(
      (module) => module.HeroImageLeftContent,
    ),
  "hero-image-slider": () =>
    import("../hero-image-slider").then(
      (module) => module.HeroImageSlider,
    ),
  "hero-innovation-image-grid": () =>
    import("../hero-innovation-image-grid").then(
      (module) => module.HeroInnovationImageGrid,
    ),
  "hero-logo-centered-screenshot": () =>
    import("../hero-logo-centered-screenshot").then(
      (module) => module.HeroLogoCenteredScreenshot,
    ),
  "hero-marketplace-scattered-images": () =>
    import("../hero-marketplace-scattered-images").then(
      (module) => module.HeroMarketplaceScatteredImages,
    ),
  "hero-mental-health-team": () =>
    import("../hero-mental-health-team").then(
      (module) => module.HeroMentalHealthTeam,
    ),
  "hero-mentorship-video-split": () =>
    import("../hero-mentorship-video-split").then(
      (module) => module.HeroMentorshipVideoSplit,
    ),
  "hero-minimal-centered-dark": () =>
    import("../hero-minimal-centered-dark").then(
      (module) => module.HeroMinimalCenteredDark,
    ),
  "hero-mobile-app-download": () =>
    import("../hero-mobile-app-download").then(
      (module) => module.HeroMobileAppDownload,
    ),
  "hero-newsletter-minimal": () =>
    import("../hero-newsletter-minimal").then(
      (module) => module.HeroNewsletterMinimal,
    ),
  "hero-overlay-cta-grid": () =>
    import("../hero-overlay-cta-grid").then(
      (module) => module.HeroOverlayCtaGrid,
    ),
  "hero-pattern-badge-logos": () =>
    import("../hero-pattern-badge-logos").then(
      (module) => module.HeroPatternBadgeLogos,
    ),
  "hero-pattern-logo-tech-stack": () =>
    import("../hero-pattern-logo-tech-stack").then(
      (module) => module.HeroPatternLogoTechStack,
    ),
  "hero-platform-features-grid": () =>
    import("../hero-platform-features-grid").then(
      (module) => module.HeroPlatformFeaturesGrid,
    ),
  "hero-portfolio-creative": () =>
    import("../hero-portfolio-creative").then(
      (module) => module.HeroPortfolioCreative,
    ),
  "hero-premium-split-avatars": () =>
    import("../hero-premium-split-avatars").then(
      (module) => module.HeroPremiumSplitAvatars,
    ),
  "hero-presentation-platform-video": () =>
    import("../hero-presentation-platform-video").then(
      (module) => module.HeroPresentationPlatformVideo,
    ),
  "hero-pricing-comparison": () =>
    import("../hero-pricing-comparison").then(
      (module) => module.HeroPricingComparison,
    ),
  "hero-productivity-launcher-video": () =>
    import("../hero-productivity-launcher-video").then(
      (module) => module.HeroProductivityLauncherVideo,
    ),
  "hero-product-showcase-floating": () =>
    import("../hero-product-showcase-floating").then(
      (module) => module.HeroProductShowcaseFloating,
    ),
  "hero-saas-dashboard-preview": () =>
    import("../hero-saas-dashboard-preview").then(
      (module) => module.HeroSaasDashboardPreview,
    ),
  "hero-shared-inbox-layered": () =>
    import("../hero-shared-inbox-layered").then(
      (module) => module.HeroSharedInboxLayered,
    ),
  "hero-simple-centered-image": () =>
    import("../hero-simple-centered-image").then(
      (module) => module.HeroSimpleCenteredImage,
    ),
  "hero-software-growth-video-dialog": () =>
    import("../hero-software-growth-video-dialog").then(
      (module) => module.HeroSoftwareGrowthVideoDialog,
    ),
  "hero-spiral-pattern-cards": () =>
    import("../hero-spiral-pattern-cards").then(
      (module) => module.HeroSpiralPatternCards,
    ),
  "hero-split-geometric-shapes": () =>
    import("../hero-split-geometric-shapes").then(
      (module) => module.HeroSplitGeometricShapes,
    ),
  "hero-split-icon-cards": () =>
    import("../hero-split-icon-cards").then(
      (module) => module.HeroSplitIconCards,
    ),
  "hero-split-image-newsletter": () =>
    import("../hero-split-image-newsletter").then(
      (module) => module.HeroSplitImageNewsletter,
    ),
  "hero-split-spiral-shapes": () =>
    import("../hero-split-spiral-shapes").then(
      (module) => module.HeroSplitSpiralShapes,
    ),
  "hero-startup-launch-cta": () =>
    import("../hero-startup-launch-cta").then(
      (module) => module.HeroStartupLaunchCta,
    ),
  "hero-stats-social-proof": () =>
    import("../hero-stats-social-proof").then(
      (module) => module.HeroStatsSocialProof,
    ),
  "hero-task-timer-animated": () =>
    import("../hero-task-timer-animated").then(
      (module) => module.HeroTaskTimerAnimated,
    ),
  "hero-tech-carousel": () =>
    import("../hero-tech-carousel").then(
      (module) => module.HeroTechCarousel,
    ),
  "hero-testimonial-image-grid": () =>
    import("../hero-testimonial-image-grid").then(
      (module) => module.HeroTestimonialImageGrid,
    ),
  "hero-therapy-testimonial-grid": () =>
    import("../hero-therapy-testimonial-grid").then(
      (module) => module.HeroTherapyTestimonialGrid,
    ),
  "hero-ui-library-showcase": () =>
    import("../hero-ui-library-showcase").then(
      (module) => module.HeroUiLibraryShowcase,
    ),
  "hero-video-background-dark": () =>
    import("../hero-video-background-dark").then(
      (module) => module.HeroVideoBackgroundDark,
    ),
  "hero-video-dialog-gradient": () =>
    import("../hero-video-dialog-gradient").then(
      (module) => module.HeroVideoDialogGradient,
    ),
  "hero-video-overlay-stars": () =>
    import("../hero-video-overlay-stars").then(
      (module) => module.HeroVideoOverlayStars,
    ),
  "hero-welcome-asymmetric-images": () =>
    import("../hero-welcome-asymmetric-images").then(
      (module) => module.HeroWelcomeAsymmetricImages,
    ),
  "industries-badge-list-bordered": () =>
    import("../industries-badge-list-bordered").then(
      (module) => module.IndustriesBadgeListBordered,
    ),
  "industries-expandable-showcase": () =>
    import("../industries-expandable-showcase").then(
      (module) => module.IndustriesExpandableShowcase,
    ),
  "industries-hover-reveal-grid": () =>
    import("../industries-hover-reveal-grid").then(
      (module) => module.IndustriesHoverRevealGrid,
    ),
  "industries-timeline-table": () =>
    import("../industries-timeline-table").then(
      (module) => module.IndustriesTimelineTable,
    ),
  "tripleseat-form": () =>
    import("../tripleseat-form").then(
      (module) => module.TripleseatForm,
    ),
  "link-page-bento-layout": () =>
    import("../link-page-bento-layout").then(
      (module) => module.LinkPageBentoLayout,
    ),
  "link-page-grid-cards": () =>
    import("../link-page-grid-cards").then(
      (module) => module.LinkPageGridCards,
    ),
  "link-page-minimal-profile": () =>
    import("../link-page-minimal-profile").then(
      (module) => module.LinkPageMinimalProfile,
    ),
  "link-page-newsletter-social": () =>
    import("../link-page-newsletter-social").then(
      (module) => module.LinkPageNewsletterSocial,
    ),
  "link-tree-block": () =>
    import("../link-tree-block").then(
      (module) => module.LinkTreeBlock,
    ),
  "list-achievements-showcase": () =>
    import("../list-achievements-showcase").then(
      (module) => module.ListAchievementsShowcase,
    ),
  "list-career-timeline": () =>
    import("../list-career-timeline").then(
      (module) => module.ListCareerTimeline,
    ),
  "list-feature-comparison": () =>
    import("../list-feature-comparison").then(
      (module) => module.ListFeatureComparison,
    ),
  "list-metrics-dashboard": () =>
    import("../list-metrics-dashboard").then(
      (module) => module.ListMetricsDashboard,
    ),
  "list-searchable-grid": () =>
    import("../list-searchable-grid").then(
      (module) => module.ListSearchableGrid,
    ),
  "list-service-category-table": () =>
    import("../list-service-category-table").then(
      (module) => module.ListServiceCategoryTable,
    ),
  "logos-carousel-heading": () =>
    import("../logos-carousel-heading").then(
      (module) => module.LogosCarouselHeading,
    ),
  "logos-centered-simple": () =>
    import("../logos-centered-simple").then(
      (module) => module.LogosCenteredSimple,
    ),
  "logos-certifications-grid": () =>
    import("../logos-certifications-grid").then(
      (module) => module.LogosCertificationsGrid,
    ),
  "logos-double-carousel-pattern": () =>
    import("../logos-double-carousel-pattern").then(
      (module) => module.LogosDoubleCarouselPattern,
    ),
  "logos-inline-tagline": () =>
    import("../logos-inline-tagline").then(
      (module) => module.LogosInlineTagline,
    ),
  "logos-marquee-muted": () =>
    import("../logos-marquee-muted").then(
      (module) => module.LogosMarqueeMuted,
    ),
  "logos-minimal-carousel": () =>
    import("../logos-minimal-carousel").then(
      (module) => module.LogosMinimalCarousel,
    ),
  "logos-numbered-carousel": () =>
    import("../logos-numbered-carousel").then(
      (module) => module.LogosNumberedCarousel,
    ),
  "logos-partner-grid-sidebar": () =>
    import("../logos-partner-grid-sidebar").then(
      (module) => module.LogosPartnerGridSidebar,
    ),
  "logos-partner-network": () =>
    import("../logos-partner-network").then(
      (module) => module.LogosPartnerNetwork,
    ),
  "logos-two-row-grid": () =>
    import("../logos-two-row-grid").then(
      (module) => module.LogosTwoRowGrid,
    ),
  "navbar-animated-preview": () =>
    import("../navbar-animated-preview").then(
      (module) => module.NavbarAnimatedPreview,
    ),
  "navbar-centered-menu": () =>
    import("../navbar-centered-menu").then(
      (module) => module.NavbarCenteredMenu,
    ),
  "navbar-dark-icons": () =>
    import("../navbar-dark-icons").then(
      (module) => module.NavbarDarkIcons,
    ),
  "navbar-dropdown-menu": () =>
    import("../navbar-dropdown-menu").then(
      (module) => module.NavbarDropdownMenu,
    ),
  "navbar-education-platform": () =>
    import("../navbar-education-platform").then(
      (module) => module.NavbarEducationPlatform,
    ),
  "navbar-enterprise-mega": () =>
    import("../navbar-enterprise-mega").then(
      (module) => module.NavbarEnterpriseMega,
    ),
  "navbar-feature-grid": () =>
    import("../navbar-feature-grid").then(
      (module) => module.NavbarFeatureGrid,
    ),
  "navbar-floating-pill": () =>
    import("../navbar-floating-pill").then(
      (module) => module.NavbarFloatingPill,
    ),
  "navbar-fullscreen-menu": () =>
    import("../navbar-fullscreen-menu").then(
      (module) => module.NavbarFullscreenMenu,
    ),
  "navbar-icon-links": () =>
    import("../navbar-icon-links").then(
      (module) => module.NavbarIconLinks,
    ),
  "navbar-image-preview": () =>
    import("../navbar-image-preview").then(
      (module) => module.NavbarImagePreview,
    ),
  "navbar-mega-menu": () =>
    import("../navbar-mega-menu").then(
      (module) => module.NavbarMegaMenu,
    ),
  "navbar-multi-column-groups": () =>
    import("../navbar-multi-column-groups").then(
      (module) => module.NavbarMultiColumnGroups,
    ),
  "navbar-platform-resources": () =>
    import("../navbar-platform-resources").then(
      (module) => module.NavbarPlatformResources,
    ),
  "navbar-search-focused": () =>
    import("../navbar-search-focused").then(
      (module) => module.NavbarSearchFocused,
    ),
  "navbar-sidebar-mobile": () =>
    import("../navbar-sidebar-mobile").then(
      (module) => module.NavbarSidebarMobile,
    ),
  "navbar-simple-links": () =>
    import("../navbar-simple-links").then(
      (module) => module.NavbarSimpleLinks,
    ),
  "navbar-split-cta": () =>
    import("../navbar-split-cta").then(
      (module) => module.NavbarSplitCta,
    ),
  "navbar-sticky-compact": () =>
    import("../navbar-sticky-compact").then(
      (module) => module.NavbarStickyCompact,
    ),
  "navbar-tabbed-sections": () =>
    import("../navbar-tabbed-sections").then(
      (module) => module.NavbarTabbedSections,
    ),
  "navbar-transparent-overlay": () =>
    import("../navbar-transparent-overlay").then(
      (module) => module.NavbarTransparentOverlay,
    ),
  "offer-modal-membership-image": () =>
    import("../offer-modal-membership-image").then(
      (module) => module.OfferModalMembershipImage,
    ),
  "offer-modal-newsletter-discount": () =>
    import("../offer-modal-newsletter-discount").then(
      (module) => module.OfferModalNewsletterDiscount,
    ),
  "offer-modal-sheet-newsletter": () =>
    import("../offer-modal-sheet-newsletter").then(
      (module) => module.OfferModalSheetNewsletter,
    ),
  "pricing-addons-cards": () =>
    import("../pricing-addons-cards").then(
      (module) => module.PricingAddonsCards,
    ),
  "pricing-addons-featured": () =>
    import("../pricing-addons-featured").then(
      (module) => module.PricingAddonsFeatured,
    ),
  "pricing-collapsible-plans": () =>
    import("../pricing-collapsible-plans").then(
      (module) => module.PricingCollapsiblePlans,
    ),
  "pricing-columns-toggle": () =>
    import("../pricing-columns-toggle").then(
      (module) => module.PricingColumnsToggle,
    ),
  "pricing-comparison-headers": () =>
    import("../pricing-comparison-headers").then(
      (module) => module.PricingComparisonHeaders,
    ),
  "pricing-comparison-table": () =>
    import("../pricing-comparison-table").then(
      (module) => module.PricingComparisonTable,
    ),
  "pricing-discount-card": () =>
    import("../pricing-discount-card").then(
      (module) => module.PricingDiscountCard,
    ),
  "pricing-enterprise-contact": () =>
    import("../pricing-enterprise-contact").then(
      (module) => module.PricingEnterpriseContact,
    ),
  "pricing-feature-matrix": () =>
    import("../pricing-feature-matrix").then(
      (module) => module.PricingFeatureMatrix,
    ),
  "pricing-four-tier-toggle": () =>
    import("../pricing-four-tier-toggle").then(
      (module) => module.PricingFourTierToggle,
    ),
  "pricing-full-comparison": () =>
    import("../pricing-full-comparison").then(
      (module) => module.PricingFullComparison,
    ),
  "pricing-gradient-cards": () =>
    import("../pricing-gradient-cards").then(
      (module) => module.PricingGradientCards,
    ),
  "pricing-icon-headers": () =>
    import("../pricing-icon-headers").then(
      (module) => module.PricingIconHeaders,
    ),
  "pricing-minimal-cards": () =>
    import("../pricing-minimal-cards").then(
      (module) => module.PricingMinimalCards,
    ),
  "pricing-packages-radio": () =>
    import("../pricing-packages-radio").then(
      (module) => module.PricingPackagesRadio,
    ),
  "pricing-popular-highlight": () =>
    import("../pricing-popular-highlight").then(
      (module) => module.PricingPopularHighlight,
    ),
  "pricing-radio-toggle": () =>
    import("../pricing-radio-toggle").then(
      (module) => module.PricingRadioToggle,
    ),
  "pricing-responsive-table": () =>
    import("../pricing-responsive-table").then(
      (module) => module.PricingResponsiveTable,
    ),
  "pricing-services-cards": () =>
    import("../pricing-services-cards").then(
      (module) => module.PricingServicesCards,
    ),
  "pricing-simple-card": () =>
    import("../pricing-simple-card").then(
      (module) => module.PricingSimpleCard,
    ),
  "pricing-single-card": () =>
    import("../pricing-single-card").then(
      (module) => module.PricingSingleCard,
    ),
  "pricing-split-layout": () =>
    import("../pricing-split-layout").then(
      (module) => module.PricingSplitLayout,
    ),
  "pricing-spotlight-card": () =>
    import("../pricing-spotlight-card").then(
      (module) => module.PricingSpotlightCard,
    ),
  "pricing-switch-cards": () =>
    import("../pricing-switch-cards").then(
      (module) => module.PricingSwitchCards,
    ),
  "pricing-tabs-toggle": () =>
    import("../pricing-tabs-toggle").then(
      (module) => module.PricingTabsToggle,
    ),
  "pricing-tier-grid": () =>
    import("../pricing-tier-grid").then(
      (module) => module.PricingTierGrid,
    ),
  "pricing-toggle-cards": () =>
    import("../pricing-toggle-cards").then(
      (module) => module.PricingToggleCards,
    ),
  "pricing-toggle-period": () =>
    import("../pricing-toggle-period").then(
      (module) => module.PricingTogglePeriod,
    ),
  "pricing-two-column-basic": () =>
    import("../pricing-two-column-basic").then(
      (module) => module.PricingTwoColumnBasic,
    ),
  "process-expandable-timeline": () =>
    import("../process-expandable-timeline").then(
      (module) => module.ProcessExpandableTimeline,
    ),
  "process-hover-cards": () =>
    import("../process-hover-cards").then(
      (module) => module.ProcessHoverCards,
    ),
  "process-icon-timeline": () =>
    import("../process-icon-timeline").then(
      (module) => module.ProcessIconTimeline,
    ),
  "process-mission-principles": () =>
    import("../process-mission-principles").then(
      (module) => module.ProcessMissionPrinciples,
    ),
  "process-numbered-services": () =>
    import("../process-numbered-services").then(
      (module) => module.ProcessNumberedServices,
    ),
  "process-roadmap-timeline": () =>
    import("../process-roadmap-timeline").then(
      (module) => module.ProcessRoadmapTimeline,
    ),
  "process-scroll-image": () =>
    import("../process-scroll-image").then(
      (module) => module.ProcessScrollImage,
    ),
  "process-steps-grid": () =>
    import("../process-steps-grid").then(
      (module) => module.ProcessStepsGrid,
    ),
  "process-sticky-steps": () =>
    import("../process-sticky-steps").then(
      (module) => module.ProcessStickySteps,
    ),
  "project-detail-architecture-carousel": () =>
    import("../project-detail-architecture-carousel").then(
      (module) => module.ProjectDetailArchitectureCarousel,
    ),
  "project-detail-card-header": () =>
    import("../project-detail-card-header").then(
      (module) => module.ProjectDetailCardHeader,
    ),
  "project-detail-case-study-prose": () =>
    import("../project-detail-case-study-prose").then(
      (module) => module.ProjectDetailCaseStudyProse,
    ),
  "project-detail-compact-metadata": () =>
    import("../project-detail-compact-metadata").then(
      (module) => module.ProjectDetailCompactMetadata,
    ),
  "project-detail-exhibition-sidebar": () =>
    import("../project-detail-exhibition-sidebar").then(
      (module) => module.ProjectDetailExhibitionSidebar,
    ),
  "project-detail-fashion-editorial": () =>
    import("../project-detail-fashion-editorial").then(
      (module) => module.ProjectDetailFashionEditorial,
    ),
  "project-detail-fullscreen-hero": () =>
    import("../project-detail-fullscreen-hero").then(
      (module) => module.ProjectDetailFullscreenHero,
    ),
  "project-detail-grid-gallery": () =>
    import("../project-detail-grid-gallery").then(
      (module) => module.ProjectDetailGridGallery,
    ),
  "project-detail-hero-metadata": () =>
    import("../project-detail-hero-metadata").then(
      (module) => module.ProjectDetailHeroMetadata,
    ),
  "project-detail-hover-gallery": () =>
    import("../project-detail-hover-gallery").then(
      (module) => module.ProjectDetailHoverGallery,
    ),
  "project-detail-large-hero-featured": () =>
    import("../project-detail-large-hero-featured").then(
      (module) => module.ProjectDetailLargeHeroFeatured,
    ),
  "project-detail-list-related": () =>
    import("../project-detail-list-related").then(
      (module) => module.ProjectDetailListRelated,
    ),
  "project-detail-mask-reveal": () =>
    import("../project-detail-mask-reveal").then(
      (module) => module.ProjectDetailMaskReveal,
    ),
  "project-detail-minimal-centered": () =>
    import("../project-detail-minimal-centered").then(
      (module) => module.ProjectDetailMinimalCentered,
    ),
  "project-detail-numbered-sections": () =>
    import("../project-detail-numbered-sections").then(
      (module) => module.ProjectDetailNumberedSections,
    ),
  "project-detail-parallax-scroll": () =>
    import("../project-detail-parallax-scroll").then(
      (module) => module.ProjectDetailParallaxScroll,
    ),
  "project-detail-photography-breadcrumb": () =>
    import("../project-detail-photography-breadcrumb").then(
      (module) => module.ProjectDetailPhotographyBreadcrumb,
    ),
  "project-detail-sculpture-showcase": () =>
    import("../project-detail-sculpture-showcase").then(
      (module) => module.ProjectDetailSculptureShowcase,
    ),
  "project-detail-sidebar-navigation": () =>
    import("../project-detail-sidebar-navigation").then(
      (module) => module.ProjectDetailSidebarNavigation,
    ),
  "project-detail-sidebar-sticky": () =>
    import("../project-detail-sidebar-sticky").then(
      (module) => module.ProjectDetailSidebarSticky,
    ),
  "project-detail-split-materials": () =>
    import("../project-detail-split-materials").then(
      (module) => module.ProjectDetailSplitMaterials,
    ),
  "project-detail-tabbed-case-study": () =>
    import("../project-detail-tabbed-case-study").then(
      (module) => module.ProjectDetailTabbedCaseStudy,
    ),
  "project-alternating-motion": () =>
    import("../project-alternating-motion").then(
      (module) => module.ProjectAlternatingMotion,
    ),
  "project-background-reveal": () =>
    import("../project-background-reveal").then(
      (module) => module.ProjectBackgroundReveal,
    ),
  "project-card-overlay": () =>
    import("../project-card-overlay").then(
      (module) => module.ProjectCardOverlay,
    ),
  "project-carousel-cinematic": () =>
    import("../project-carousel-cinematic").then(
      (module) => module.ProjectCarouselCinematic,
    ),
  "project-carousel-detail-cards": () =>
    import("../project-carousel-detail-cards").then(
      (module) => module.ProjectCarouselDetailCards,
    ),
  "project-carousel-minimal": () =>
    import("../project-carousel-minimal").then(
      (module) => module.ProjectCarouselMinimal,
    ),
  "project-experience-quote": () =>
    import("../project-experience-quote").then(
      (module) => module.ProjectExperienceQuote,
    ),
  "project-featured-carousel": () =>
    import("../project-featured-carousel").then(
      (module) => module.ProjectFeaturedCarousel,
    ),
  "project-filterable-gallery": () =>
    import("../project-filterable-gallery").then(
      (module) => module.ProjectFilterableGallery,
    ),
  "project-filterable-three-column": () =>
    import("../project-filterable-three-column").then(
      (module) => module.ProjectFilterableThreeColumn,
    ),
  "project-grid-gallery": () =>
    import("../project-grid-gallery").then(
      (module) => module.ProjectGridGallery,
    ),
  "project-grid-motion": () =>
    import("../project-grid-motion").then(
      (module) => module.ProjectGridMotion,
    ),
  "project-horizontal-cards": () =>
    import("../project-horizontal-cards").then(
      (module) => module.ProjectHorizontalCards,
    ),
  "project-hover-reveal-grid": () =>
    import("../project-hover-reveal-grid").then(
      (module) => module.ProjectHoverRevealGrid,
    ),
  "project-interactive-hover-reveal": () =>
    import("../project-interactive-hover-reveal").then(
      (module) => module.ProjectInteractiveHoverReveal,
    ),
  "project-masonry-columns": () =>
    import("../project-masonry-columns").then(
      (module) => module.ProjectMasonryColumns,
    ),
  "project-nature-mosaic": () =>
    import("../project-nature-mosaic").then(
      (module) => module.ProjectNatureMosaic,
    ),
  "project-scroll-reveal": () =>
    import("../project-scroll-reveal").then(
      (module) => module.ProjectScrollReveal,
    ),
  "project-showcase-alternating": () =>
    import("../project-showcase-alternating").then(
      (module) => module.ProjectShowcaseAlternating,
    ),
  "project-sticky-scroll": () =>
    import("../project-sticky-scroll").then(
      (module) => module.ProjectStickyScroll,
    ),
  "project-studio-hover-preview": () =>
    import("../project-studio-hover-preview").then(
      (module) => module.ProjectStudioHoverPreview,
    ),
  "project-table-list": () =>
    import("../project-table-list").then(
      (module) => module.ProjectTableList,
    ),
  "project-video-carousel": () =>
    import("../project-video-carousel").then(
      (module) => module.ProjectVideoCarousel,
    ),
  "project-video-hover-bento": () =>
    import("../project-video-hover-bento").then(
      (module) => module.ProjectVideoHoverBento,
    ),
  "project-video-hover-grid": () =>
    import("../project-video-hover-grid").then(
      (module) => module.ProjectVideoHoverGrid,
    ),
  "project-video-hover-rounded": () =>
    import("../project-video-hover-rounded").then(
      (module) => module.ProjectVideoHoverRounded,
    ),
  "project-video-hover-stack": () =>
    import("../project-video-hover-stack").then(
      (module) => module.ProjectVideoHoverStack,
    ),
  "project-video-hover-two-by-two": () =>
    import("../project-video-hover-two-by-two").then(
      (module) => module.ProjectVideoHoverTwoByTwo,
    ),
  "project-work-showcase": () =>
    import("../project-work-showcase").then(
      (module) => module.ProjectWorkShowcase,
    ),
  "project-zigzag-layout": () =>
    import("../project-zigzag-layout").then(
      (module) => module.ProjectZigzagLayout,
    ),
  "resource-detail-article-hero": () =>
    import("../resource-detail-article-hero").then(
      (module) => module.ResourceDetailArticleHero,
    ),
  "resource-detail-document-sidebar": () =>
    import("../resource-detail-document-sidebar").then(
      (module) => module.ResourceDetailDocumentSidebar,
    ),
  "resource-detail-whitepaper-sidebar": () =>
    import("../resource-detail-whitepaper-sidebar").then(
      (module) => module.ResourceDetailWhitepaperSidebar,
    ),
  "resource-list-course-cards": () =>
    import("../resource-list-course-cards").then(
      (module) => module.ResourceListCourseCards,
    ),
  "resource-list-featured-articles": () =>
    import("../resource-list-featured-articles").then(
      (module) => module.ResourceListFeaturedArticles,
    ),
  "resource-list-featured-grid": () =>
    import("../resource-list-featured-grid").then(
      (module) => module.ResourceListFeaturedGrid,
    ),
  "resource-list-hero-filter": () =>
    import("../resource-list-hero-filter").then(
      (module) => module.ResourceListHeroFilter,
    ),
  "resource-list-news-updates": () =>
    import("../resource-list-news-updates").then(
      (module) => module.ResourceListNewsUpdates,
    ),
  "service-detail-centered-expertise": () =>
    import("../service-detail-centered-expertise").then(
      (module) => module.ServiceDetailCenteredExpertise,
    ),
  "service-detail-compact-cards": () =>
    import("../service-detail-compact-cards").then(
      (module) => module.ServiceDetailCompactCards,
    ),
  "service-detail-image-hero": () =>
    import("../service-detail-image-hero").then(
      (module) => module.ServiceDetailImageHero,
    ),
  "service-detail-prose-minimal": () =>
    import("../service-detail-prose-minimal").then(
      (module) => module.ServiceDetailProseMinimal,
    ),
  "service-detail-sidebar-related": () =>
    import("../service-detail-sidebar-related").then(
      (module) => module.ServiceDetailSidebarRelated,
    ),
  "service-detail-sidebar-stats": () =>
    import("../service-detail-sidebar-stats").then(
      (module) => module.ServiceDetailSidebarStats,
    ),
  "service-detail-stats-hero": () =>
    import("../service-detail-stats-hero").then(
      (module) => module.ServiceDetailStatsHero,
    ),
  "services-list-accordion-benefits": () =>
    import("../services-list-accordion-benefits").then(
      (module) => module.ServicesListAccordionBenefits,
    ),
  "services-list-accordion": () =>
    import("../services-list-accordion").then(
      (module) => module.ServicesListAccordion,
    ),
  "services-list-cards-hover": () =>
    import("../services-list-cards-hover").then(
      (module) => module.ServicesListCardsHover,
    ),
  "services-list-category-accordion": () =>
    import("../services-list-category-accordion").then(
      (module) => module.ServicesListCategoryAccordion,
    ),
  "services-list-centered-icons": () =>
    import("../services-list-centered-icons").then(
      (module) => module.ServicesListCenteredIcons,
    ),
  "services-list-culture-tabs": () =>
    import("../services-list-culture-tabs").then(
      (module) => module.ServicesListCultureTabs,
    ),
  "services-list-expandable-cards": () =>
    import("../services-list-expandable-cards").then(
      (module) => module.ServicesListExpandableCards,
    ),
  "services-list-featured-highlight": () =>
    import("../services-list-featured-highlight").then(
      (module) => module.ServicesListFeaturedHighlight,
    ),
  "services-list-feature-spotlight": () =>
    import("../services-list-feature-spotlight").then(
      (module) => module.ServicesListFeatureSpotlight,
    ),
  "services-list-hero-cards": () =>
    import("../services-list-hero-cards").then(
      (module) => module.ServicesListHeroCards,
    ),
  "services-list-icon-grid": () =>
    import("../services-list-icon-grid").then(
      (module) => module.ServicesListIconGrid,
    ),
  "services-list-image-cards": () =>
    import("../services-list-image-cards").then(
      (module) => module.ServicesListImageCards,
    ),
  "services-list-image-overlay-grid": () =>
    import("../services-list-image-overlay-grid").then(
      (module) => module.ServicesListImageOverlayGrid,
    ),
  "services-list-masonry": () =>
    import("../services-list-masonry").then(
      (module) => module.ServicesListMasonry,
    ),
  "services-list-methodology-steps": () =>
    import("../services-list-methodology-steps").then(
      (module) => module.ServicesListMethodologySteps,
    ),
  "services-list-minimal-grid": () =>
    import("../services-list-minimal-grid").then(
      (module) => module.ServicesListMinimalGrid,
    ),
  "services-list-muted-cards": () =>
    import("../services-list-muted-cards").then(
      (module) => module.ServicesListMutedCards,
    ),
  "services-list-numbered-steps": () =>
    import("../services-list-numbered-steps").then(
      (module) => module.ServicesListNumberedSteps,
    ),
  "services-list-pricing-grid": () =>
    import("../services-list-pricing-grid").then(
      (module) => module.ServicesListPricingGrid,
    ),
  "services-list-progress-sidebar": () =>
    import("../services-list-progress-sidebar").then(
      (module) => module.ServicesListProgressSidebar,
    ),
  "services-list-split-checklist": () =>
    import("../services-list-split-checklist").then(
      (module) => module.ServicesListSplitChecklist,
    ),
  "services-list-sticky-image": () =>
    import("../services-list-sticky-image").then(
      (module) => module.ServicesListStickyImage,
    ),
  "services-list-table-hover": () =>
    import("../services-list-table-hover").then(
      (module) => module.ServicesListTableHover,
    ),
  "services-list-tabs-features": () =>
    import("../services-list-tabs-features").then(
      (module) => module.ServicesListTabsFeatures,
    ),
  "services-list-timeline": () =>
    import("../services-list-timeline").then(
      (module) => module.ServicesListTimeline,
    ),
  "services-list-two-column-grid": () =>
    import("../services-list-two-column-grid").then(
      (module) => module.ServicesListTwoColumnGrid,
    ),
  "services-list-vertical-tags": () =>
    import("../services-list-vertical-tags").then(
      (module) => module.ServicesListVerticalTags,
    ),
  "services-list-video-showcase": () =>
    import("../services-list-video-showcase").then(
      (module) => module.ServicesListVideoShowcase,
    ),
  "stats-animated-counter": () =>
    import("../stats-animated-counter").then(
      (module) => module.StatsAnimatedCounter,
    ),
  "stats-bar-comparison": () =>
    import("../stats-bar-comparison").then(
      (module) => module.StatsBarComparison,
    ),
  "stats-card-group": () =>
    import("../stats-card-group").then(
      (module) => module.StatsCardGroup,
    ),
  "stats-circular-progress": () =>
    import("../stats-circular-progress").then(
      (module) => module.StatsCircularProgress,
    ),
  "stats-growth-timeline": () =>
    import("../stats-growth-timeline").then(
      (module) => module.StatsGrowthTimeline,
    ),
  "stats-icon-cards": () =>
    import("../stats-icon-cards").then(
      (module) => module.StatsIconCards,
    ),
  "stats-impact-grid": () =>
    import("../stats-impact-grid").then(
      (module) => module.StatsImpactGrid,
    ),
  "stats-milestone-sidebar": () =>
    import("../stats-milestone-sidebar").then(
      (module) => module.StatsMilestoneSidebar,
    ),
  "stats-number-ticker": () =>
    import("../stats-number-ticker").then(
      (module) => module.StatsNumberTicker,
    ),
  "stats-primary-secondary": () =>
    import("../stats-primary-secondary").then(
      (module) => module.StatsPrimarySecondary,
    ),
  "stats-simple-grid": () =>
    import("../stats-simple-grid").then(
      (module) => module.StatsSimpleGrid,
    ),
  "stats-timeline-tabs": () =>
    import("../stats-timeline-tabs").then(
      (module) => module.StatsTimelineTabs,
    ),
  "team-alternating-bios": () =>
    import("../team-alternating-bios").then(
      (module) => module.TeamAlternatingBios,
    ),
  "team-avatar-social": () =>
    import("../team-avatar-social").then(
      (module) => module.TeamAvatarSocial,
    ),
  "team-bio-badges": () =>
    import("../team-bio-badges").then(
      (module) => module.TeamBioBadges,
    ),
  "team-carousel-experience": () =>
    import("../team-carousel-experience").then(
      (module) => module.TeamCarouselExperience,
    ),
  "team-compact-cta": () =>
    import("../team-compact-cta").then(
      (module) => module.TeamCompactCta,
    ),
  "team-compact-grid": () =>
    import("../team-compact-grid").then(
      (module) => module.TeamCompactGrid,
    ),
  "team-contact-cards": () =>
    import("../team-contact-cards").then(
      (module) => module.TeamContactCards,
    ),
  "team-department-sections": () =>
    import("../team-department-sections").then(
      (module) => module.TeamDepartmentSections,
    ),
  "team-expertise-cards": () =>
    import("../team-expertise-cards").then(
      (module) => module.TeamExpertiseCards,
    ),
  "team-filterable-search": () =>
    import("../team-filterable-search").then(
      (module) => module.TeamFilterableSearch,
    ),
  "team-gradient-cards": () =>
    import("../team-gradient-cards").then(
      (module) => module.TeamGradientCards,
    ),
  "team-grid-animated": () =>
    import("../team-grid-animated").then(
      (module) => module.TeamGridAnimated,
    ),
  "team-hover-highlight": () =>
    import("../team-hover-highlight").then(
      (module) => module.TeamHoverHighlight,
    ),
  "team-hover-overlay": () =>
    import("../team-hover-overlay").then(
      (module) => module.TeamHoverOverlay,
    ),
  "team-investor-showcase": () =>
    import("../team-investor-showcase").then(
      (module) => module.TeamInvestorShowcase,
    ),
  "team-large-images": () =>
    import("../team-large-images").then(
      (module) => module.TeamLargeImages,
    ),
  "team-media-showcase": () =>
    import("../team-media-showcase").then(
      (module) => module.TeamMediaShowcase,
    ),
  "team-role-filter": () =>
    import("../team-role-filter").then(
      (module) => module.TeamRoleFilter,
    ),
  "team-simple-grid": () =>
    import("../team-simple-grid").then(
      (module) => module.TeamSimpleGrid,
    ),
  "team-skill-badges": () =>
    import("../team-skill-badges").then(
      (module) => module.TeamSkillBadges,
    ),
  "team-social-cards": () =>
    import("../team-social-cards").then(
      (module) => module.TeamSocialCards,
    ),
  "team-social-grid": () =>
    import("../team-social-grid").then(
      (module) => module.TeamSocialGrid,
    ),
  "team-testimonial-stats": () =>
    import("../team-testimonial-stats").then(
      (module) => module.TeamTestimonialStats,
    ),
  "testimonials-animated-split": () =>
    import("../testimonials-animated-split").then(
      (module) => module.TestimonialsAnimatedSplit,
    ),
  "testimonials-bento-grid": () =>
    import("../testimonials-bento-grid").then(
      (module) => module.TestimonialsBentoGrid,
    ),
  "testimonials-carousel-image": () =>
    import("../testimonials-carousel-image").then(
      (module) => module.TestimonialsCarouselImage,
    ),
  "testimonials-centered-avatars": () =>
    import("../testimonials-centered-avatars").then(
      (module) => module.TestimonialsCenteredAvatars,
    ),
  "testimonials-company-logo": () =>
    import("../testimonials-company-logo").then(
      (module) => module.TestimonialsCompanyLogo,
    ),
  "testimonials-grid-add-review": () =>
    import("../testimonials-grid-add-review").then(
      (module) => module.TestimonialsGridAddReview,
    ),
  "testimonials-images-helpful": () =>
    import("../testimonials-images-helpful").then(
      (module) => module.TestimonialsImagesHelpful,
    ),
  "testimonials-large-quote": () =>
    import("../testimonials-large-quote").then(
      (module) => module.TestimonialsLargeQuote,
    ),
  "testimonials-list-verified": () =>
    import("../testimonials-list-verified").then(
      (module) => module.TestimonialsListVerified,
    ),
  "testimonials-logo-cards": () =>
    import("../testimonials-logo-cards").then(
      (module) => module.TestimonialsLogoCards,
    ),
  "testimonials-marquee": () =>
    import("../testimonials-marquee").then(
      (module) => module.TestimonialsMarquee,
    ),
  "testimonials-masonry-grid": () =>
    import("../testimonials-masonry-grid").then(
      (module) => module.TestimonialsMasonryGrid,
    ),
  "testimonials-mini-dividers": () =>
    import("../testimonials-mini-dividers").then(
      (module) => module.TestimonialsMiniDividers,
    ),
  "testimonials-minimal-numbered": () =>
    import("../testimonials-minimal-numbered").then(
      (module) => module.TestimonialsMinimalNumbered,
    ),
  "testimonials-parallax-number": () =>
    import("../testimonials-parallax-number").then(
      (module) => module.TestimonialsParallaxNumber,
    ),
  "testimonials-quote-carousel": () =>
    import("../testimonials-quote-carousel").then(
      (module) => module.TestimonialsQuoteCarousel,
    ),
  "testimonials-scrolling-columns": () =>
    import("../testimonials-scrolling-columns").then(
      (module) => module.TestimonialsScrollingColumns,
    ),
  "testimonials-simple-grid": () =>
    import("../testimonials-simple-grid").then(
      (module) => module.TestimonialsSimpleGrid,
    ),
  "testimonials-slider-minimal": () =>
    import("../testimonials-slider-minimal").then(
      (module) => module.TestimonialsSliderMinimal,
    ),
  "testimonials-split-image": () =>
    import("../testimonials-split-image").then(
      (module) => module.TestimonialsSplitImage,
    ),
  "testimonials-stats-header": () =>
    import("../testimonials-stats-header").then(
      (module) => module.TestimonialsStatsHeader,
    ),
  "testimonials-twitter-cards": () =>
    import("../testimonials-twitter-cards").then(
      (module) => module.TestimonialsTwitterCards,
    ),
  "testimonials-wall-compact": () =>
    import("../testimonials-wall-compact").then(
      (module) => module.TestimonialsWallCompact,
    ),
  "timeline-ai-workflow-cards": () =>
    import("../timeline-ai-workflow-cards").then(
      (module) => module.TimelineAIWorkflowCards,
    ),
  "timeline-alternating-diagonal": () =>
    import("../timeline-alternating-diagonal").then(
      (module) => module.TimelineAlternatingDiagonal,
    ),
  "timeline-changelog-badges": () =>
    import("../timeline-changelog-badges").then(
      (module) => module.TimelineChangelogBadges,
    ),
  "timeline-history-prose": () =>
    import("../timeline-history-prose").then(
      (module) => module.TimelineHistoryProse,
    ),
  "timeline-horizontal-icons": () =>
    import("../timeline-horizontal-icons").then(
      (module) => module.TimelineHorizontalIcons,
    ),
  "timeline-horizontal-phases": () =>
    import("../timeline-horizontal-phases").then(
      (module) => module.TimelineHorizontalPhases,
    ),
  "timeline-productivity-list": () =>
    import("../timeline-productivity-list").then(
      (module) => module.TimelineProductivityList,
    ),
  "timeline-product-launch": () =>
    import("../timeline-product-launch").then(
      (module) => module.TimelineProductLaunch,
    ),
  "timeline-scroll-highlight": () =>
    import("../timeline-scroll-highlight").then(
      (module) => module.TimelineScrollHighlight,
    ),
  "timeline-scroll-sticky-image": () =>
    import("../timeline-scroll-sticky-image").then(
      (module) => module.TimelineScrollStickyImage,
    ),
  "timeline-stepper-animated": () =>
    import("../timeline-stepper-animated").then(
      (module) => module.TimelineStepperAnimated,
    ),
  "timeline-tabbed-phases": () =>
    import("../timeline-tabbed-phases").then(
      (module) => module.TimelineTabbedPhases,
    ),
  "timeline-two-column-featured": () =>
    import("../timeline-two-column-featured").then(
      (module) => module.TimelineTwoColumnFeatured,
    ),
  "timeline-vertical-icon-dashed": () =>
    import("../timeline-vertical-icon-dashed").then(
      (module) => module.TimelineVerticalIconDashed,
    ),
} satisfies Record<string, BlockLoader>;

//-----------------------------
// Load a block component dynamically based on its ID
// @param id The ID of the block to load
// @returns A promise that resolves to the React component for the block
// @throws An error if the block ID is unknown
// @example
// const MyBlock = await loadBlockComponent("link-page-grid-cards");
// MyBlock will now hold the dynamically imported React component for the specified block
// --------------------------------------
export async function loadBlockComponent(
  id: string,
): Promise<React.ComponentType<any>> {
  const loader = BLOCK_LOADERS[id]

  if (!loader) {
    throw new Error(`Unknown block: ${id}`);
  }
  return loader();
}
