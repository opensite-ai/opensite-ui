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
