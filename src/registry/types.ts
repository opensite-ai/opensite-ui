/**
 * Block Registry Types
 *
 * Shared type definitions for the block registry system.
 */

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
 * Metadata-only block registry entry (no component import)
 * Used for AI-driven component discovery without bundling all components
 */
export interface BlockMetadata {
  id: string;
  name: string;
  description: string;
  semanticTags: string[];
  category: BlockCategory;
  /** Module path for dynamic import, e.g., "@opensite/ui/blocks/about/alternating-blocks" */
  modulePath: string;
  /** Export name from the module */
  exportName: string;
  /** TypeScript props type name */
  props: string;
  /** Example usage code */
  exampleUsage: string;
}

/**
 * Full block registry entry with component reference
 * @deprecated Use BlockMetadata for new code - this type causes all components to be bundled
 */
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

/**
 * Helper type for lazy-loaded component
 */
export type LazyBlockLoader<T = any> = () => Promise<{
  default?: React.ComponentType<T>;
  [key: string]: React.ComponentType<T> | undefined;
}>;
