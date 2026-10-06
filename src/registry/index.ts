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

export { BLOCK_METADATA_REGISTRY } from "./block-metadata";

export { getAllBlockMetadata, getBlockMetadataById } from "./block-helpers";

export {
  BUILDER_CONTRACT_VERSION,
  createBuilderContractBundle,
} from "./builder-contract";

export type {
  BlockCategory,
  BlockContractFields,
  BlockMediaSlot,
  BlockMetadata,
  BlockMetadataEntry,
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
