/**
 * ScriptEmbed - Individual export for tree-shaking
 *
 * Runs an owner-supplied third-party script snippet (chat widget, booking
 * engine, menu embed) inside the standard Section chrome, with a guaranteed
 * load order, StrictMode-safe deduplication, and optional document.write
 * containment for legacy embeds.
 *
 * @example
 * ```ts
 * import { ScriptEmbed } from "@opensite/ui/blocks/advanced/script-embed";
 * ```
 */

export { ScriptEmbed } from "../components/blocks/advanced/script-embed";
export type { ScriptEmbedProps } from "../components/blocks/advanced/script-embed";
