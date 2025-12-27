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
  | "comparison";

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
