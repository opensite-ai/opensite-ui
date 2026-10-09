import { BLOCK_METADATA_REGISTRY } from "./block-metadata";
import type { BlockMetadataEntry, BlockCategory } from "./types";

export function getBlockMetadataById(id: string): BlockMetadataEntry | undefined {
  return Object.values(BLOCK_METADATA_REGISTRY).find((block) => block.id === id);
}

export function getAllBlockMetadata(): BlockMetadataEntry[] {
  return Object.values(BLOCK_METADATA_REGISTRY);
}
/**
 * Get blocks by category
 */
export function getBlocksByCategory(
  category: BlockCategory,
): BlockMetadataEntry[] {
  return Object.values(BLOCK_METADATA_REGISTRY).filter(
    (block) => block.category === category,
  );
}

/**
 * Get blocks by semantic tag
 */
export function getBlocksBySemanticTag(tag: string): BlockMetadataEntry[] {
  return Object.values(BLOCK_METADATA_REGISTRY).filter((block) =>
    block.semanticTags.includes(tag),
  );
}

/**
 * Get all categories
 */
export function getAllCategories(): BlockCategory[] {
  return Array.from(
    new Set(Object.values(BLOCK_METADATA_REGISTRY).map((block) => block.category)),
  );
}

/**
 * Search blocks by query (searches name, description, and semantic tags)
 */
export function searchBlocks(query: string): BlockMetadataEntry[] {
  const lowercaseQuery = query.toLowerCase();
  return Object.values(BLOCK_METADATA_REGISTRY).filter(
    (block) =>
      block.name.toLowerCase().includes(lowercaseQuery) ||
      block.description.toLowerCase().includes(lowercaseQuery) ||
      block.semanticTags.some((tag) =>
        tag.toLowerCase().includes(lowercaseQuery),
      ),
  );
}