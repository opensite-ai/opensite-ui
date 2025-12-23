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
  getBlocksBySemanticTag,
  getBlocksByCategory,
  getBlockById,
  getAllBlocks,
  getAllCategories,
  searchBlocks,
} from "./registry/index";

export type { BlockRegistryEntry, BlockCategory } from "./registry/index";
