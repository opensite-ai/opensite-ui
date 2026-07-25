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
 * Semantic role hints for a media slot. Consumers (semantic site builders,
 * media classifiers) use these to scope which assets are eligible for a slot.
 *
 * - `logo`: brand logos / wordmarks (small, transparent backgrounds).
 * - `favicon`: tiny brand icon.
 * - `hero`: large hero/banner imagery.
 * - `feature`: large feature/marketing imagery (non-logo).
 * - `thumbnail`: small supporting imagery (e.g. card images, team thumbs).
 * - `profile`: portrait/headshot of a person.
 * - `avatar`: small profile / testimonial avatar.
 * - `gallery`: imagery suited for galleries / grids.
 * - `background`: large background imagery, often photographic.
 * - `screenshot`: product screenshots / UI captures.
 * - `illustration`: vector / illustrative art.
 * - `video-thumbnail`: poster image for a video slot.
 */
export type MediaRole =
  | "logo"
  | "favicon"
  | "hero"
  | "feature"
  | "thumbnail"
  | "profile"
  | "avatar"
  | "gallery"
  | "background"
  | "screenshot"
  | "illustration"
  | "video-thumbnail";

/** Minimum pixel class expected for a media asset. */
export type MediaPixelClass = "tiny" | "small" | "medium" | "large" | "xlarge";

/**
 * Structured description of a single media slot inside a block's prop tree.
 * The `path` is dot/bracket notation, e.g. `featureImage`, `smallImages[]`,
 * `testimonial.avatarSrc`.
 */
export interface BlockMediaSlot {
  path: string;
  /** Allowed/expected semantic roles for this slot, in priority order. */
  roles: MediaRole[];
  /** Roles that must NOT be assigned to this slot. */
  disallowedRoles?: MediaRole[];
  /** Minimum acceptable pixel class for this slot. */
  minPixelClass?: MediaPixelClass;
  /** Preferred aspect ratio, e.g. "16:9", "1:1", "4:5". */
  preferredAspect?: string;
  /** Whether the block visually requires this slot to render correctly. */
  required?: boolean;
  /** Short note explaining the slot's intent (consumed by AI prompts). */
  note?: string;
}

/**
 * Per-prop content constraints. Additive – consumers should treat missing
 * fields as "no constraint declared" rather than rejecting payloads.
 */
export interface BlockPropConstraint {
  /** Whether the block requires this prop to render correctly. */
  required?: boolean;
  /** Maximum string length for text-shaped props. */
  maxLength?: number;
  /**
   * Maximum word count for LABEL-shaped props (badges, chips) where a
   * sentence overflows the slot. Enforced post-generation by Octane with a
   * clean word cut (no ellipsis).
   */
  maxWords?: number;
  /** Exact item count for array props (shorthand for minItems = maxItems). */
  count?: number;
  /** Minimum array length. */
  minItems?: number;
  /** Maximum array length. */
  maxItems?: number;
  /**
   * Array length must be a multiple of this (grid-friendly counts — a
   * 3-column gallery reads 3 or 6, never 4). Octane clamps DOWN to the
   * nearest multiple post-generation.
   */
  itemsMultipleOf?: number;
  /**
   * Pinned values, by index for array props or as a single value for scalars.
   * Used for the `actions[0].variant = "default"` / `actions[1].variant = "outline"` pattern.
   */
  pinnedValues?: Record<string, string | number | boolean>;
  /** Free-form note about this prop (for AI prompts). */
  note?: string;
}

/**
 * Capabilities the host site / data source must satisfy for the block to be
 * suitable. Consumers (e.g. Octane) gate block selection on these BEFORE the
 * block is offered to the model, so it cannot fabricate the missing input.
 */
export type SiteCapability =
  | "reviews_or_testimonials"
  | "pricing"
  | "pricing_data"
  | "team_members"
  | "blog_posts"
  | "portfolio_items"
  | "case_studies"
  | "locations"
  | "events"
  | "products"
  | "services"
  | "stats_or_metrics"
  | "metrics_or_stats"
  | "product_catalog"
  | "media_library"
  | "contact_form"
  | "video_assets"
  | "contact_info"
  | "instagram_media";

/**
 * Structured usage requirements for a block. This is the executable
 * complement to `importantUsageNotes` (which remains for human-readable
 * prompt context). When present, downstream consumers SHOULD enforce these
 * at selection time and during post-generation validation.
 */
export interface BlockUsageRequirements {
  /** Names of props that are required for the block to render correctly. */
  requiredProps?: string[];
  /** Per-prop content/cardinality constraints, keyed by prop name/path. */
  propConstraints?: Record<string, BlockPropConstraint>;
  /** Media slot metadata, keyed by slot path. */
  mediaSlots?: Record<string, BlockMediaSlot>;
  /** Site capabilities required to safely select this block. */
  requiresSiteCapabilities?: SiteCapability[];
  /**
   * Free-form structured rules that don't fit other fields. Consumers should
   * treat unknown keys as advisory.
   */
  notes?: string[];
}

/**
 * Shared metadata fields that describe a block's contract. Used both by
 * {@link BlockMetadata} (no component) and {@link BlockRegistryEntry}
 * (with component).
 */
export interface BlockContractFields {
  /**
   * Human-readable usage guidance for AI prompts. This remains advisory.
   * For executable rules use {@link BlockContractFields.usageRequirements}.
   */
  importantUsageNotes?: string;
  /** Structured, machine-readable usage requirements. */
  usageRequirements?: BlockUsageRequirements;
  /**
   * Canonical example payload for the block, matching the prop shape.
   * Optional. When supplied, consumers should prefer this over parsing
   * `exampleUsage` JSX.
   *
   * IMPORTANT: These are reference examples for AI prompting / preview
   * tooling only. They are NOT runtime defaults — consumers MUST NOT
   * substitute these values as fallback content on a real client site.
   * The previous name (`defaultProps`) was renamed to make this explicit:
   * AI agents had begun treating "default" values as safe runtime
   * fallbacks for missing client data, which is incorrect.
   */
  exampleProps?: Record<string, unknown>;
}

/**
 * Metadata-only block registry entry (no component import)
 * Used for AI-driven component discovery without bundling all components
 */
export interface BlockMetadata extends BlockContractFields {
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
export interface BlockRegistryEntry<T = any> extends BlockContractFields {
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
  /**
   * Canonical example props payload. Populated from
   * BlockRegistryEntry.exampleProps when declared, otherwise null.
   *
   * IMPORTANT: This is reference example data only, not a runtime
   * fallback. Consumers MUST NOT substitute these values for missing
   * client content. The previous name (`defaultData`) was renamed
   * because downstream AI agents were treating it as safe runtime
   * default content.
   */
  exampleProps: Record<string, unknown> | null;
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
  /**
   * Human-readable usage guidance for AI prompts. Mirrors
   * BlockRegistryEntry.importantUsageNotes when declared, otherwise null.
   */
  importantUsageNotes: string | null;
  /**
   * Structured, machine-readable usage requirements. Null when the
   * registry entry does not declare any.
   */
  usageRequirements: BlockUsageRequirements | null;
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
  /**
   * When true, hydration may fan a single symbolic block out into N concrete
   * block instances (one-to-many expansion, contract D6). Absent for the
   * one-to-one sources.
   */
  expands?: boolean;
}

export interface BuilderContractDynamicSources {
  blog_feed: BuilderContractDynamicSourceDefinition;
  blog_post: BuilderContractDynamicSourceDefinition;
  testimonials_feed: BuilderContractDynamicSourceDefinition;
  instagram_feed: BuilderContractDynamicSourceDefinition;
  events_feed: BuilderContractDynamicSourceDefinition;
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
