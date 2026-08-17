"use client";

import * as React from "react";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ContainerMaxWidth,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import {
  FREE_FORM_MAX_DEPTH,
  FREE_FORM_MAX_NODES,
  renderFreeFormTree,
  type FreeFormNode,
} from "../../../lib/free-form-tree";

export type { FreeFormNode } from "../../../lib/free-form-tree";

export interface FreeFormDesignProps {
  /**
   * Root node of the custom design tree.
   *
   * Shape: `{ tag, className?, attrs?, children? }`, recursive. `children` may hold
   * further nodes or plain strings (strings render as escaped TEXT — markup inside a
   * string is never parsed).
   *
   * `tag` must be an allowlisted HTML/SVG tag or one of the component names
   * `"Pressable"` (links/buttons), `"Img"` (images) or `"Video"` (video). Raw `a`,
   * `img` and `video` tags are NOT allowlisted and degrade to a plain `div`.
   * `script`, `style`, `iframe`, `link`, `meta` and other executable or
   * document-level tags are dropped entirely.
   *
   * `attrs` accepts scalar values only. Event handlers (`onClick`, `onerror`, any
   * `on*`), the `style` attribute, and `javascript:`/`data:` URLs are stripped.
   * Style the design with Tailwind classes via each node's `className`.
   *
   * `Img.attrs.src` and `Video.attrs.src` MUST be absolute `https://` media-library
   * URLs; nodes with a missing or relative src are dropped.
   *
   * A string child that begins with `<` (e.g. `"<b>not bold</b>"`) renders as
   * literal, escaped text — it is never parsed as markup. Put real emphasis in a
   * child NODE (`{ tag: "strong", … }`) instead.
   *
   * Trees are capped at {@link FREE_FORM_MAX_DEPTH} nesting levels (the root node is
   * level 1) and {@link FREE_FORM_MAX_NODES} rendered nodes; anything beyond either
   * cap is dropped and the Section is marked `data-free-form-truncated`.
   */
  designTree?: FreeFormNode;
  /**
   * ⚠️ CLASS MANIFEST — NOT a styling prop. This deviates from every other block.
   *
   * Space-separated list of EVERY Tailwind class this block uses anywhere: every
   * `className` inside `designTree` **plus** the tokens of
   * {@link FreeFormDesignProps.sectionClassName} and
   * {@link FreeFormDesignProps.containerClassName}. It is deliberately **not applied
   * to any element**.
   *
   * Why it exists: live customer sites are served a safelist-COMPILED Tailwind
   * stylesheet, and the toastability extractor only scans `blockProps.className`.
   * Classes that live inside a nested tree — or under any other prop name, including
   * `sectionClassName`/`containerClassName` — are never seen by the compiler, so they
   * would have no CSS rule at all on the live site. Mirroring them here makes them
   * visible to the extractor.
   *
   * Octane derives this automatically (tree + `sectionClassName` +
   * `containerClassName`); authors may omit it. Hand-authored payloads should build
   * it with `collectFreeFormClassNames(designTree, { extraClassNames: [sectionClassName,
   * containerClassName] })` from `lib/free-form-tree`.
   */
  className?: string;
  /**
   * Additional CSS classes for the Section element.
   *
   * This is what every other block calls `className` — on this block `className` is
   * the class manifest (see above), so section styling moved here.
   *
   * ⚠️ These tokens MUST also appear in {@link FreeFormDesignProps.className}, or they
   * get no compiled CSS rule on a live customer site.
   */
  sectionClassName?: string;
  /**
   * Text shown when `designTree` is missing or renders nothing.
   * Omit it and the block renders no content rather than inventing copy.
   */
  emptyStateLabel?: string;
  /** Section DOM id, for anchor links. */
  sectionId?: string;
  /** Optional Section heading rendered above the custom design. */
  title?: string;
  /** Optional Section eyebrow rendered above the title. */
  subtitle?: string;
  /** Section background variant. */
  background?: SectionBackground;
  /** Section vertical spacing variant. */
  spacing?: SectionSpacing;
  /** Background pattern overlay name. */
  pattern?: PatternName;
  /** Pattern overlay opacity (0-1). */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the Section's inner container.
   *
   * ⚠️ Like `sectionClassName`, these tokens MUST also appear in
   * {@link FreeFormDesignProps.className} to be compiled on a live site.
   */
  containerClassName?: string;
  /**
   * Max width of the Section's inner container. Defaults to the house `"xl"`
   * (`max-w-7xl`), so an omitted value boxes the whole design at 1280px.
   *
   * EDGE-TO-EDGE CLONE: set `spacing="none"`, `containerMaxWidth="full"` and
   * `containerClassName="px-0 sm:px-0 lg:px-0"` (and mirror those three padding
   * tokens into `className`). `containerMaxWidth` alone removes the width clamp
   * but leaves the container's default `px-2 sm:px-4 lg:px-8` gutters.
   */
  containerMaxWidth?: ContainerMaxWidth;
  /** Inline styles for the Section element. */
  style?: React.CSSProperties;
}

/**
 * Free-Form Design — renders a fully custom, AI-authored design inside a standard
 * Section wrapper.
 *
 * Use when the requested layout genuinely cannot be expressed with an existing
 * block (a cloned section from another site, a bespoke one-off composition). The
 * design is supplied as a constrained JSON node tree and rendered by a block-internal
 * allowlist renderer — see `lib/free-form-tree.ts` for the security model.
 *
 * @example
 * ```tsx
 * <FreeFormDesign
 *   sectionId="custom-hero"
 *   spacing="none"
 *   sectionClassName="bg-secondary"
 *   // manifest = every tree class + every sectionClassName/containerClassName token
 *   className="bg-secondary grid gap-8 md:grid-cols-2 text-4xl font-bold"
 *   designTree={{
 *     tag: "div",
 *     className: "grid gap-8 md:grid-cols-2",
 *     children: [
 *       { tag: "h2", className: "text-4xl font-bold", children: ["Built for teams"] },
 *       { tag: "Pressable", attrs: { href: "/contact", variant: "default" }, children: ["Talk to us"] },
 *     ],
 *   }}
 * />
 * ```
 */
export function FreeFormDesign({
  designTree,
  // `className` IS the class manifest and is intentionally NOT rendered anywhere.
  // Destructured only so it never leaks into the Section via a rest spread.
  className: _classManifest,
  sectionClassName,
  emptyStateLabel,
  sectionId = "free-form-design",
  title,
  subtitle,
  background,
  spacing,
  pattern,
  patternOpacity,
  containerClassName,
  containerMaxWidth,
  style,
}: FreeFormDesignProps): React.JSX.Element {
  const rendered = React.useMemo(
    () =>
      renderFreeFormTree(designTree, {
        maxDepth: FREE_FORM_MAX_DEPTH,
        maxNodes: FREE_FORM_MAX_NODES,
        rootAttributes: { "data-free-form-design": "root" },
      }),
    [designTree],
  );

  const { content, truncated, nodeCount, droppedTags, degradedTags } = rendered;

  React.useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    if (truncated) {
      // Honest truncation: the render is capped, and we say so out loud rather
      // than pretending the whole design shipped.
      console.warn(
        `[opensite-free-form-design] tree truncated at ${nodeCount} nodes ` +
          `(caps: ${FREE_FORM_MAX_NODES} nodes / ${FREE_FORM_MAX_DEPTH} depth).`,
      );
    }
    if (droppedTags.length > 0) {
      console.warn(
        `[opensite-free-form-design] dropped disallowed nodes: ${droppedTags.join(", ")}.`,
      );
    }
    if (degradedTags.length > 0) {
      console.warn(
        `[opensite-free-form-design] non-allowlisted tags rendered as <div>: ${degradedTags.join(", ")}.`,
      );
    }
  }, [truncated, nodeCount, droppedTags, degradedTags]);

  return (
    <Section
      id={sectionId}
      title={title}
      subtitle={subtitle}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={sectionClassName}
      containerClassName={containerClassName}
      containerMaxWidth={containerMaxWidth}
      style={style}
      data-free-form-truncated={truncated ? "true" : undefined}
    >
      {content ?? (emptyStateLabel ? <p>{emptyStateLabel}</p> : null)}
    </Section>
  );
}
