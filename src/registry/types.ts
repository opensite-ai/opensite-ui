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

export type BuilderContractLayoutRole = "page" | "header" | "footer";

export interface BuilderContractBlockSource {
  exportPath: string;
  modulePath: string;
  typesPath?: string;
  importPath?: string;
  requirePath?: string;
}

export interface BuilderContractPropsContract {
  type: "typescript-type-reference";
  reference: string;
  runtimeSchema: null;
  runtimeSchemaStatus: "missing";
}

export interface BuilderContractExamples {
  exampleUsage: string | null;
  defaultData: null;
}

export interface BuilderContractBlock {
  componentId: string;
  blockName: string;
  blockRef: string;
  displayName: string;
  description: string;
  category: BlockCategory;
  semanticTags: string[];
  layoutRole: BuilderContractLayoutRole;
  propsContract: BuilderContractPropsContract;
  examples: BuilderContractExamples;
  source: BuilderContractBlockSource | null;
}

export interface BuilderContractMetadata {
  contractVersion: string;
  uiVersion: string;
  exportedAt: string;
  source: string;
  totalBlocks: number;
}

export interface BuilderContractSharedLayoutSection {
  sourceType: string;
  sourceOfTruth: string;
  aiAuthoring: "variant_request_only";
  canonicalPayloadKey: "header" | "footer";
  allowedBlockRefs: string[];
}

export interface BuilderContractSharedLayout {
  canonicalLayoutKey: "_layout";
  sections: {
    header: BuilderContractSharedLayoutSection;
    footer: BuilderContractSharedLayoutSection;
  };
}

export interface BuilderContractDynamicSourceDefinition {
  sourceType: string;
  symbolic: true;
  hydrationOwner: string;
  hydrationPhase: string;
  canonicalPayloadExpectation: string;
  requiredFields: string[];
  optionalFields: string[];
}

export interface BuilderContractDynamicSources {
  blog_feed: BuilderContractDynamicSourceDefinition;
}

export interface BuilderContractDesignTokens {
  canonicalSource: "theme_config";
  derivedArtifacts: ["tailwind_css"];
  requiredTokenFamilies: string[];
  requiredSemanticColorRoles: string[];
  policy: string;
}

export interface BuilderContractPageRules {
  outputFormat: "route-map";
  routeKeyPattern: string;
  sharedLayoutKey: "_layout";
  routeEntry: {
    requiredKeys: string[];
    blocksKey: "blocks";
  };
  blockEntry: {
    requiredKeys: string[];
    blockRefSource: string;
    blockNameSource: string;
  };
  sharedLayoutComposition: {
    owner: string;
    headerSource: string;
    footerSource: string;
  };
  dynamicHydration: {
    symbolicInCanonicalPageJson: true;
    owner: string;
    phase: string;
  };
}

export interface BuilderContractBundle {
  metadata: BuilderContractMetadata;
  blocks: BuilderContractBlock[];
  sharedLayout: BuilderContractSharedLayout;
  dynamicSources: BuilderContractDynamicSources;
  designTokens: BuilderContractDesignTokens;
  pageRules: BuilderContractPageRules;
}
