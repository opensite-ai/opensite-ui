/**
 * LongformContent component for rendering article content in JSX or markdown mode.
 *
 * @example
 * ```tsx
 * import { LongformContent } from "@opensite/ui/longform-content";
 *
 * // JSX mode (default)
 * <LongformContent>
 *   <p>Your content here</p>
 * </LongformContent>
 *
 * // Markdown mode
 * <LongformContent
 *   renderMode="markdown"
 *   markdownString="# Hello World"
 * />
 * ```
 */
export { LongformContent, type LongformContentProps } from "../components/ui/longform-content";
