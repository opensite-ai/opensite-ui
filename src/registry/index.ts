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

export type { BlockRegistryEntry, BlockCategory } from "./blocks";
