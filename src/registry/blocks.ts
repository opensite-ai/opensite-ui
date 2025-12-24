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
import { FeatureShowcase } from "../../components/blocks/features/feature-showcase";
import type { FeatureShowcaseProps } from "../../components/blocks/features/feature-showcase";

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
  // Add more blocks here following this pattern
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
      block.semanticTags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
}
