/**
 * Block Registry - Individual export for tree-shaking
 *
 * Provides access to the semantic block registry for AI-driven site generation.
 *
 * @example
 * ```ts
 * import { BLOCK_REGISTRY, getBlocksBySemanticTag } from "@opensite/ui/registry";
 * ```
 */

export {
  BLOCK_REGISTRY,
  BUILDER_CONTRACT_VERSION,
  createBuilderContractBundle,
  getBlocksBySemanticTag,
  getBlocksByCategory,
  getBlockById,
  getAllBlocks,
  getAllCategories,
  searchBlocks,
} from "./registry/index";

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
} from "./registry/index";
