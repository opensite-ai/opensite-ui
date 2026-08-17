/**
 * FreeFormDesign - Individual export for tree-shaking
 *
 * Renders a fully custom, AI-authored design from a constrained JSON node tree
 * inside a standard Section wrapper. Last-resort escape hatch for bespoke or
 * cloned layouts that no catalog block can express.
 *
 * @example
 * ```ts
 * import { FreeFormDesign } from "@opensite/ui/blocks/advanced/free-form-design";
 * ```
 */

export { FreeFormDesign } from "../components/blocks/advanced/free-form-design";
export type {
  FreeFormDesignProps,
  FreeFormNode,
} from "../components/blocks/advanced/free-form-design";

/**
 * Class-manifest helper for hand-authored / demo payloads.
 *
 * Octane derives the manifest server-side for AI-generated blocks. Anything
 * authored by hand must build it the same way — tree classes PLUS the
 * `sectionClassName` / `containerClassName` tokens — or those classes get no
 * compiled CSS rule on a live customer site:
 *
 * ```ts
 * className={collectFreeFormClassNames(designTree, {
 *   extraClassNames: [sectionClassName, containerClassName],
 * }).join(" ")}
 * ```
 */
export {
  collectFreeFormClassNames,
  FREE_FORM_MAX_DEPTH,
  FREE_FORM_MAX_NODES,
} from "../lib/free-form-tree";
export type { FreeFormClassManifestOptions } from "../lib/free-form-tree";
