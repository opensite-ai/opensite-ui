/**
 * Script loading primitive - Individual export for tree-shaking
 *
 * Shared, SSR-safe, dedupe-backed loader used by the embed blocks
 * (`advanced/script-embed`, `integrations/*`). Importing this subpath pulls in
 * no React and no component code.
 *
 * @example
 * ```ts
 * import { loadScript, loadScriptSequence } from "@opensite/ui/script-loader";
 * ```
 */

export {
  loadScript,
  loadScriptSequence,
  loadStylesheet,
  releaseWriteInterception,
  runInlineScript,
  __resetScriptLoaderForTests,
} from "../lib/script-loader";
export type { LoadScriptOptions } from "../lib/script-loader";
