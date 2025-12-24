/**
 * @opensite/ui - Foundational UI component library for OpenSite Semantic Site Builder
 *
 * Tree-shakable exports for optimal bundle sizes.
 * Import components individually for best results:
 *
 * @example
 * ```ts
 * // Import specific components (recommended)
 * import { Container } from "@opensite/ui/components/container";
 * import { Section } from "@opensite/ui/components/section";
 *
 * // Import multiple components
 * import { Container, Section } from "@opensite/ui/components";
 *
 * // Import all (not recommended - larger bundle)
 * import * as UI from "@opensite/ui";
 * ```
 */

// Re-export all components
export * from "./components";

// Re-export hooks
export * from "../lib/hooks";

// Re-export types
export type * from "./types/index";

// Re-export utilities
export { cn } from "../lib/utils";
