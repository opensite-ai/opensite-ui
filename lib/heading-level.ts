/**
 * Heading level for a block's primary title.
 *
 * Page renderers pass `1` to the block that leads the page and `2` to every
 * other block, so a rendered page has exactly one `<h1>`. Blocks fall back to
 * their own default when the prop is omitted (see the registry heading
 * contract in `src/registry/heading-contract.ts`).
 */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/** Intrinsic element for a {@link HeadingLevel}. */
export type HeadingTagName = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const HEADING_TAGS: readonly HeadingTagName[] = ["h1", "h2", "h3", "h4", "h5", "h6"];

/**
 * Resolve the element for a block's primary title. Uses `fallback` when
 * `level` is omitted or is not an integer from 1 to 6.
 */
export function headingTag(
  level: HeadingLevel | undefined,
  fallback: HeadingLevel,
): HeadingTagName {
  const resolved =
    typeof level === "number" && Number.isInteger(level) && level >= 1 && level <= 6
      ? level
      : fallback;
  return HEADING_TAGS[resolved - 1];
}
