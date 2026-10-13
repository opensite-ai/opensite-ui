import type { HeadingLevel } from "../../lib/heading-level";

/**
 * Heading contract for a block whose primary title accepts `headingLevel`.
 *
 * Page renderers (customer-sites initial-HTML projection and hydrated
 * renderer, Octane) read this instead of hard-coded block lists. Give level 1
 * to the first block on a page whose `canLeadPage` is true, and level 2 to
 * every other block listed here. Blocks that are not listed don't accept
 * `headingLevel`, so don't pass it to them.
 */
export interface BlockHeadingContract {
  /** Prop that carries the primary title (a dot path for nested titles). */
  titleProp: string;
  /** Level rendered when `headingLevel` is omitted. */
  defaultHeadingLevel: HeadingLevel;
  /** The primary title follows the `headingLevel` prop. */
  supportsHeadingLevel: true;
  /** The block may take level 1 when it is the first heading-capable block on a page. */
  canLeadPage: boolean;
  /** String props rendered as non-paragraph eyebrow text above the primary title. */
  eyebrowProps: readonly string[];
}

function entry(
  titleProp: string,
  defaultHeadingLevel: HeadingLevel,
  eyebrowProps: readonly string[] = [],
): BlockHeadingContract {
  return {
    titleProp,
    defaultHeadingLevel,
    supportsHeadingLevel: true,
    canLeadPage: true,
    eyebrowProps,
  };
}

/** Heading contract by block id. */
export const BLOCK_HEADING_CONTRACT: Readonly<Record<string, BlockHeadingContract>> =
  Object.freeze({});

/**
 * Look up a block's heading contract by block id (`hero-announcement-badge`)
 * or block ref (`hero/hero-announcement-badge`).
 */
export function getBlockHeadingContract(
  blockIdOrRef: string,
): BlockHeadingContract | undefined {
  const id = blockIdOrRef.slice(blockIdOrRef.lastIndexOf("/") + 1);
  return Object.prototype.hasOwnProperty.call(BLOCK_HEADING_CONTRACT, id)
    ? BLOCK_HEADING_CONTRACT[id]
    : undefined;
}
