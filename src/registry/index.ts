/**
 * Block Registry Exports
 *
 * Provides access to the semantic block registry for AI-driven site generation.
 */

export {
  BLOCK_REGISTRY,
  getBlocksBySemanticTag,
  getBlocksByCategory,
  getBlockById,
  getAllBlocks,
  getAllCategories,
  searchBlocks,
} from "./blocks";

export {
  BUILDER_CONTRACT_VERSION,
  createBuilderContractBundle,
} from "./builder-contract";

export type {
  BlockCategory,
  BlockContractFields,
  BlockMediaSlot,
  BlockMetadata,
  BlockPropConstraint,
  BlockRegistryEntry,
  BlockUsageRequirements,
  BuilderContractBlock,
  BuilderContractBlockSource,
  BuilderContractBundle,
  BuilderContractDesignTokens,
  BuilderContractDynamicSourceDefinition,
  BuilderContractDynamicSources,
  BuilderContractExamples,
  BuilderContractLayoutRole,
  BuilderContractMetadata,
  BuilderContractPageRules,
  BuilderContractPropsContract,
  BuilderContractSharedLayout,
  BuilderContractSharedLayoutSection,
  MediaPixelClass,
  MediaRole,
  SiteCapability,
} from "./types";
