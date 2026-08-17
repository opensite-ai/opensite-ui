"use client";

/**
 * Free-form design tree — types, allowlists and renderer.
 *
 * This module powers `components/blocks/advanced/free-form-design.tsx`. It is a
 * PURPOSE-BUILT, block-internal renderer for a constrained JSON node tree. It is
 * deliberately **not** the platform `__jsx` serialization format:
 *
 * - `__jsx` trees are deserialized by two duplicated host allowlists
 *   (`customer-sites/app/javascript/block-registry.ts` and
 *   `dt-cms/Source/src/features/semantic-builder/SemanticBlocksRenderer.tsx`).
 *   Widening those lists is a cross-repo, lockstep, security-relevant change.
 * - A `FreeFormNode` tree carries no `__jsx` key, so both host deserializers walk
 *   past it untouched and hand it to this block as plain data. Rendering happens
 *   here, inside the block, against the allowlist below — one implementation, one
 *   place to audit, zero host changes.
 *
 * Security model (binding, see DESIGN-CONTRACT.md §4):
 * - Tag allowlist. Unknown tags degrade to `div` (children preserved); a small set
 *   of executable / document-level tags is dropped outright (children discarded).
 * - `on*` attributes are always dropped. `style` is always dropped. Object-valued
 *   attributes are always dropped, so `dangerouslySetInnerHTML` can never be honored.
 * - URL-ish attributes are scheme-checked after control-character stripping, so
 *   `javascript:`, `data:`, `vbscript:`, `blob:` and friends never reach the DOM.
 * - String children are React text nodes: escaped by construction, never parsed as
 *   markup.
 * - Depth and node-count caps bound the render, with honest truncation reporting.
 */

import * as React from "react";
import { Pressable } from "./Pressable";
import { Img } from "@page-speed/img";
import { Video } from "@page-speed/video";

/* ------------------------------------------------------------------------- */
/* Types                                                                      */
/* ------------------------------------------------------------------------- */

/** Scalar attribute values are the only shape ever honored. */
export type FreeFormAttrValue = string | number | boolean;

/**
 * A single node in a free-form design tree.
 *
 * `tag` is either an allowlisted HTML/SVG tag name or one of the component names
 * `"Pressable"` | `"Img"` | `"Video"`. `children` strings are rendered as escaped
 * text nodes — markup inside a string is NEVER parsed.
 */
export interface FreeFormNode {
  /** Allowlisted HTML/SVG tag, or `"Pressable" | "Img" | "Video"`. */
  tag: string;
  /** Tailwind classes for this node. Mirrored into the block's class manifest. */
  className?: string;
  /** Scalar attributes. Filtered — see module docs. */
  attrs?: Record<string, FreeFormAttrValue>;
  /** Child nodes; plain strings become escaped text nodes. */
  children?: Array<FreeFormNode | string>;
}

export interface FreeFormRenderOptions {
  /** Maximum nesting depth before children are dropped. */
  maxDepth?: number;
  /** Maximum number of rendered nodes (elements + text nodes). */
  maxNodes?: number;
  /** Attributes merged onto the rendered ROOT element (block-internal markers). */
  rootAttributes?: Record<string, string>;
}

export interface FreeFormRenderResult {
  /** Rendered React content, or `null` when nothing survived. */
  content: React.ReactNode;
  /** Number of nodes (elements + text nodes) actually rendered. */
  nodeCount: number;
  /** True when the depth cap or node cap cut the tree short. */
  truncated: boolean;
  /** Tags dropped outright (executable/document-level or invalid media nodes). */
  droppedTags: string[];
  /** Tags that were not allowlisted and rendered as `div` instead. */
  degradedTags: string[];
}

/* ------------------------------------------------------------------------- */
/* Caps                                                                       */
/* ------------------------------------------------------------------------- */

/**
 * Depth cap, expressed as a count of nesting LEVELS (the root element is level 1).
 *
 * A tree nested exactly `FREE_FORM_MAX_DEPTH` levels renders in full; the first
 * node on level `FREE_FORM_MAX_DEPTH + 1` is dropped and the render is marked
 * truncated. This is the literal reading of the published contract ("trees are
 * capped at 40 levels deep") — the renderer must not admit a 41st level.
 */
export const FREE_FORM_MAX_DEPTH = 40;

/** Node cap (elements + text nodes). Beyond this the render stops honestly. */
export const FREE_FORM_MAX_NODES = 1500;

/* ------------------------------------------------------------------------- */
/* Tag allowlists                                                             */
/* ------------------------------------------------------------------------- */

/**
 * Allowlisted HTML tags — inert, structural, text-level and tabular elements only.
 *
 * Deliberately absent: `a`, `img`, `video`, `audio`, `button`, `form`, `input`
 * (use `Pressable` / `Img` / `Video`; Octane rewrites raw `a`/`img`/`video` nodes
 * server-side), and `main` (page-level landmark — a block must not emit a second one).
 */
export const FREE_FORM_HTML_TAGS: ReadonlySet<string> = new Set([
  // Sectioning / flow containers
  "div",
  "section",
  "article",
  "aside",
  "header",
  "footer",
  "nav",
  "figure",
  "figcaption",
  "blockquote",
  "address",
  "hr",
  "br",
  "wbr",
  // Headings
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hgroup",
  // Text level
  "p",
  "span",
  "strong",
  "em",
  "b",
  "i",
  "u",
  "s",
  "small",
  "mark",
  "sub",
  "sup",
  "code",
  "pre",
  "kbd",
  "samp",
  "abbr",
  "cite",
  "q",
  "time",
  "del",
  "ins",
  // Lists
  "ul",
  "ol",
  "li",
  "dl",
  "dt",
  "dd",
  // Tables
  "table",
  "caption",
  "colgroup",
  "col",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
]);

/**
 * Allowlisted SVG tags — decorative vector subset.
 *
 * Deliberately absent: `use` and `foreignObject` (namespace-escape / external-reference
 * vectors) and the SMIL animation elements `animate` / `animateTransform` / `set`
 * (documented `attributeName="href"` XSS vectors).
 */
export const FREE_FORM_SVG_TAGS: ReadonlySet<string> = new Set([
  "svg",
  "g",
  "defs",
  "path",
  "circle",
  "ellipse",
  "rect",
  "line",
  "polyline",
  "polygon",
  "linearGradient",
  "radialGradient",
  "stop",
  "clipPath",
  "mask",
  "text",
  "tspan",
]);

/** Component nodes resolved to real house primitives. */
export const FREE_FORM_COMPONENT_TAGS: ReadonlySet<string> = new Set([
  "Pressable",
  "Img",
  "Video",
]);

/**
 * Tags dropped ENTIRELY (node + children). Degrading these to `div` would surface
 * their raw text content (a `<script>` body) as visible page copy, or duplicate
 * document-level elements.
 */
export const FREE_FORM_BLOCKED_TAGS: ReadonlySet<string> = new Set([
  "script",
  "style",
  "noscript",
  "template",
  "slot",
  "iframe",
  "object",
  "embed",
  "applet",
  "frame",
  "frameset",
  "link",
  "meta",
  "base",
  "title",
  "head",
  "body",
  "html",
  "portal",
  "use",
  "foreignobject",
  "animate",
  "animatetransform",
  "set",
]);

/** HTML void elements — React throws if these are given children. */
const VOID_HTML_TAGS: ReadonlySet<string> = new Set(["br", "hr", "wbr", "col"]);

/** Case-insensitive lookup table for the SVG tags (which are camelCase). */
const SVG_TAG_BY_LOWER = new Map<string, string>(
  Array.from(FREE_FORM_SVG_TAGS, (tag) => [tag.toLowerCase(), tag]),
);

/* ------------------------------------------------------------------------- */
/* Attribute filtering                                                        */
/* ------------------------------------------------------------------------- */

/** Attribute names that are never honored, whatever the tag. */
const BLOCKED_ATTRS: ReadonlySet<string> = new Set([
  // Styling must be Tailwind classes only, so the class manifest stays complete.
  "style",
  // className/class arrive via `node.className` (that is what the manifest mirrors).
  "class",
  "classname",
  // React-reserved / raw-HTML sinks.
  "key",
  "ref",
  "children",
  "dangerouslysetinnerhtml",
  "innerhtml",
  "outerhtml",
  "__html",
  // Markup-bearing or fetch-bearing attributes with no legitimate use here.
  "srcdoc",
  "srcset",
  "imagesrcset",
  "is",
  "sandbox",
  "allow",
  "http-equiv",
]);

/** Attributes whose values are URLs and must be scheme-checked. */
const URL_ATTRS: ReadonlySet<string> = new Set([
  "href",
  "src",
  "poster",
  "action",
  "formaction",
  "cite",
  "data",
  "ping",
  "background",
  "longdesc",
  "usemap",
  "profile",
  "manifest",
  "codebase",
  "xlink:href",
  "xlinkhref",
]);

/** URL schemes that may appear in an allowlisted URL attribute. */
const ALLOWED_URL_SCHEMES: ReadonlySet<string> = new Set([
  "http",
  "https",
  "mailto",
  "tel",
  "sms",
]);

/** lowercase HTML attribute name -> React prop name. */
const ATTR_ALIASES: Readonly<Record<string, string>> = {
  for: "htmlFor",
  tabindex: "tabIndex",
  colspan: "colSpan",
  rowspan: "rowSpan",
  datetime: "dateTime",
  readonly: "readOnly",
  maxlength: "maxLength",
  autofocus: "autoFocus",
  crossorigin: "crossOrigin",
  fetchpriority: "fetchPriority",
  playsinline: "playsInline",
  autoplay: "autoPlay",
  srclang: "srcLang",
  itemprop: "itemProp",
  itemscope: "itemScope",
  itemtype: "itemType",
  spellcheck: "spellCheck",
  contenteditable: "contentEditable",
};

/** Conservative attribute-name grammar. Anything else is dropped. */
const ATTR_NAME_RE = /^[A-Za-z][A-Za-z0-9:_.-]*$/;

/** Control characters browsers strip while parsing a URL. */
// eslint-disable-next-line no-control-regex
const URL_CONTROL_CHARS_RE = /[\u0000-\u0020\u007F-\u009F]/g;

const SCHEME_RE = /^([A-Za-z][A-Za-z0-9+.-]*):/;

/**
 * Returns the URL unchanged when its scheme is allowlisted (or when it has no
 * scheme at all — relative paths, `#anchor`, `//host/path`), otherwise `null`.
 *
 * The scheme test runs on a copy with control characters removed, so
 * `"java\tscript:alert(1)"` and `"JAVASCRIPT:alert(1)"` are both rejected.
 */
export function sanitizeFreeFormUrl(raw: FreeFormAttrValue): string | null {
  const value = String(raw).trim();
  if (!value) return null;
  const probe = value.replace(URL_CONTROL_CHARS_RE, "");
  if (!probe) return null;
  const match = SCHEME_RE.exec(probe);
  if (!match) return value; // relative / anchor / protocol-relative
  return ALLOWED_URL_SCHEMES.has(match[1].toLowerCase()) ? value : null;
}

/** Absolute https URLs only — the media-library contract for `Img` / `Video`. */
export function isAbsoluteHttpsUrl(raw: unknown): boolean {
  return typeof raw === "string" && /^https:\/\/[^\s]+$/i.test(raw.trim());
}

const isPassthroughAttr = (lower: string): boolean =>
  lower.startsWith("aria-") || lower.startsWith("data-");

/**
 * Filters a node's `attrs` bag into safe React props.
 *
 * @param attrs raw attribute bag from the design tree
 * @param allowed optional lowercase allowlist; `aria-*`/`data-*` always pass
 */
export function filterFreeFormAttrs(
  attrs: Record<string, unknown> | undefined,
  allowed?: ReadonlySet<string>,
): Record<string, FreeFormAttrValue> {
  const out: Record<string, FreeFormAttrValue> = {};
  if (!attrs || typeof attrs !== "object") return out;

  for (const rawKey of Object.keys(attrs)) {
    const value = (attrs as Record<string, unknown>)[rawKey];
    // Only scalars are ever honored — this is what makes dangerouslySetInnerHTML
    // ({ __html }) structurally impossible to express.
    if (
      typeof value !== "string" &&
      typeof value !== "number" &&
      typeof value !== "boolean"
    ) {
      continue;
    }

    const lower = rawKey.toLowerCase();
    if (lower.startsWith("on")) continue; // every event handler, always
    if (BLOCKED_ATTRS.has(lower)) continue;
    if (!ATTR_NAME_RE.test(rawKey)) continue;
    if (allowed && !allowed.has(lower) && !isPassthroughAttr(lower)) continue;

    let next: FreeFormAttrValue = value;
    if (URL_ATTRS.has(lower)) {
      const safe = sanitizeFreeFormUrl(value);
      if (safe === null) continue;
      next = safe;
    }

    out[ATTR_ALIASES[lower] ?? rawKey] = next;
  }

  return out;
}

/* Component prop allowlists (lowercase keys; aria-*/ /* and data-* always pass). */
const PRESSABLE_ATTRS: ReadonlySet<string> = new Set([
  "href",
  "variant",
  "size",
  "componenttype",
  "fallbackcomponenttype",
  "target",
  "rel",
  "id",
  "title",
  "role",
]);

const IMG_ATTRS: ReadonlySet<string> = new Set([
  "src",
  "alt",
  "width",
  "height",
  "loading",
  "decoding",
  "sizes",
  "fetchpriority",
  "id",
  "title",
  "role",
]);

const VIDEO_ATTRS: ReadonlySet<string> = new Set([
  "src",
  "poster",
  "autoplay",
  "muted",
  "loop",
  "controls",
  "playsinline",
  "preload",
  "width",
  "height",
  "id",
  "title",
  "role",
]);

/* ------------------------------------------------------------------------- */
/* Renderer                                                                   */
/* ------------------------------------------------------------------------- */

interface RenderContext {
  maxDepth: number;
  maxNodes: number;
  nodeCount: number;
  truncated: boolean;
  dropped: Set<string>;
  degraded: Set<string>;
}

const isPlainNode = (value: unknown): value is FreeFormNode =>
  typeof value === "object" &&
  value !== null &&
  !Array.isArray(value) &&
  typeof (value as FreeFormNode).tag === "string" &&
  (value as FreeFormNode).tag.length > 0;

function renderChildren(
  node: FreeFormNode,
  ctx: RenderContext,
  depth: number,
): React.ReactNode[] | null {
  const children = node.children;
  if (!Array.isArray(children) || children.length === 0) return null;

  const rendered: React.ReactNode[] = [];
  for (let index = 0; index < children.length; index += 1) {
    const child = children[index];

    if (typeof child === "string" || typeof child === "number") {
      const text = String(child);
      if (text.length === 0) continue;
      if (ctx.nodeCount >= ctx.maxNodes) {
        ctx.truncated = true;
        break;
      }
      ctx.nodeCount += 1;
      // React escapes text children — markup inside a string stays literal text.
      rendered.push(
        React.createElement(React.Fragment, { key: `t${index}` }, text),
      );
      continue;
    }

    const element = renderNode(child, ctx, depth + 1, String(index));
    if (element !== null) rendered.push(element);
    if (ctx.nodeCount >= ctx.maxNodes) {
      // Only an ACTUAL cut counts as truncation. When the budget is consumed
      // exactly by the last sibling nothing was dropped, so reporting
      // `truncated` here would be a false positive (and would stamp
      // `data-free-form-truncated` on a complete render).
      if (index < children.length - 1) ctx.truncated = true;
      break;
    }
  }

  return rendered.length > 0 ? rendered : null;
}

function renderComponentNode(
  node: FreeFormNode,
  ctx: RenderContext,
  depth: number,
  key: string,
  extraProps?: Record<string, string>,
): React.ReactElement | null {
  const { tag } = node;

  if (tag === "Img") {
    const props = filterFreeFormAttrs(node.attrs, IMG_ATTRS);
    if (!isAbsoluteHttpsUrl(props.src)) {
      ctx.dropped.add("Img");
      return null;
    }
    ctx.nodeCount += 1;
    return React.createElement(Img, {
      key,
      ...props,
      src: String(props.src),
      alt: typeof props.alt === "string" ? props.alt : "",
      ...(node.className ? { className: node.className } : {}),
      ...extraProps,
    } as React.ComponentProps<typeof Img>);
  }

  if (tag === "Video") {
    const props = filterFreeFormAttrs(node.attrs, VIDEO_ATTRS);
    if (!isAbsoluteHttpsUrl(props.src)) {
      ctx.dropped.add("Video");
      return null;
    }
    if (props.poster !== undefined && !isAbsoluteHttpsUrl(props.poster)) {
      delete props.poster;
    }
    ctx.nodeCount += 1;
    return React.createElement(Video, {
      key,
      ...props,
      src: String(props.src),
      ...(node.className ? { className: node.className } : {}),
      ...extraProps,
    } as React.ComponentProps<typeof Video>);
  }

  // Pressable
  const props = filterFreeFormAttrs(node.attrs, PRESSABLE_ATTRS);
  ctx.nodeCount += 1;
  const children = renderChildren(node, ctx, depth);
  return React.createElement(
    Pressable,
    {
      key,
      ...props,
      ...(node.className ? { className: node.className } : {}),
      ...extraProps,
    } as React.ComponentProps<typeof Pressable>,
    children,
  );
}

function renderNode(
  node: unknown,
  ctx: RenderContext,
  depth: number,
  key: string,
  extraProps?: Record<string, string>,
): React.ReactElement | null {
  if (!isPlainNode(node)) return null;

  // `depth` is 0-based, so level = depth + 1. Cutting at `>=` makes `maxDepth`
  // the exact number of levels rendered (40 levels: depths 0..39).
  if (depth >= ctx.maxDepth) {
    ctx.truncated = true;
    return null;
  }
  if (ctx.nodeCount >= ctx.maxNodes) {
    ctx.truncated = true;
    return null;
  }

  const rawTag = node.tag.trim();
  const lowerTag = rawTag.toLowerCase();

  if (FREE_FORM_BLOCKED_TAGS.has(lowerTag)) {
    ctx.dropped.add(lowerTag);
    return null;
  }

  if (FREE_FORM_COMPONENT_TAGS.has(rawTag)) {
    return renderComponentNode(node, ctx, depth, key, extraProps);
  }

  // Resolve the intrinsic tag, degrading anything unrecognized to `div`.
  let tag: string;
  if (FREE_FORM_HTML_TAGS.has(lowerTag)) {
    tag = lowerTag;
  } else if (SVG_TAG_BY_LOWER.has(lowerTag)) {
    tag = SVG_TAG_BY_LOWER.get(lowerTag) as string;
  } else {
    ctx.degraded.add(lowerTag);
    tag = "div";
  }

  const props: Record<string, unknown> = {
    key,
    ...filterFreeFormAttrs(node.attrs),
    ...extraProps,
  };
  if (node.className) props.className = node.className;

  ctx.nodeCount += 1;

  if (VOID_HTML_TAGS.has(tag)) {
    return React.createElement(tag, props);
  }

  return React.createElement(tag, props, renderChildren(node, ctx, depth));
}

/**
 * Renders a free-form design tree into React elements under the allowlist and
 * caps documented at the top of this module.
 *
 * Never throws on malformed input: a non-object / tag-less root yields
 * `{ content: null }`.
 */
export function renderFreeFormTree(
  root: unknown,
  options: FreeFormRenderOptions = {},
): FreeFormRenderResult {
  const ctx: RenderContext = {
    maxDepth: options.maxDepth ?? FREE_FORM_MAX_DEPTH,
    maxNodes: options.maxNodes ?? FREE_FORM_MAX_NODES,
    nodeCount: 0,
    truncated: false,
    dropped: new Set<string>(),
    degraded: new Set<string>(),
  };

  const content = renderNode(root, ctx, 0, "root", options.rootAttributes);

  return {
    content,
    nodeCount: ctx.nodeCount,
    truncated: ctx.truncated,
    droppedTags: Array.from(ctx.dropped).sort(),
    degradedTags: Array.from(ctx.degraded).sort(),
  };
}

export interface FreeFormClassManifestOptions {
  /**
   * Extra class-bearing prop values to fold into the manifest.
   *
   * The safelist extractors that build a live site's compiled stylesheet scan
   * ONLY `blockProps.class` / `blockProps.className`, so every OTHER
   * class-carrying prop on the block (`sectionClassName`, `containerClassName`)
   * must be mirrored into the manifest or its classes get no CSS rule on the
   * live site. Nullish/blank entries are ignored.
   */
  extraClassNames?: ReadonlyArray<string | null | undefined>;
}

/**
 * Builds the block's class manifest: every `className` token used anywhere in the
 * tree PLUS the tokens of any class-bearing block prop passed via
 * `options.extraClassNames`, deduped and sorted.
 *
 * Mirrors the manifest Octane derives server-side (DESIGN-CONTRACT §6.3). Octane's
 * derivation must fold `sectionClassName` and `containerClassName` in the same way
 * — this function is the reference implementation both sides are tested against.
 *
 * Exported for tests, tooling and hand-authored payloads — the block itself never
 * calls it (the manifest is an INPUT prop, not something the block recomputes at
 * render time).
 *
 * @example
 * ```ts
 * collectFreeFormClassNames(designTree, {
 *   extraClassNames: [sectionClassName, containerClassName],
 * });
 * ```
 */
export function collectFreeFormClassNames(
  root: unknown,
  options: FreeFormClassManifestOptions = {},
): string[] {
  const tokens = new Set<string>();
  const addTokens = (value: unknown): void => {
    if (typeof value !== "string") return;
    for (const token of value.split(/\s+/)) {
      if (token) tokens.add(token);
    }
  };
  const walk = (node: unknown, depth: number): void => {
    // Mirrors the renderer's cut so the manifest never advertises classes on a
    // node that is too deep to render.
    if (depth >= FREE_FORM_MAX_DEPTH || !isPlainNode(node)) return;
    addTokens(node.className);
    if (Array.isArray(node.children)) {
      for (const child of node.children) walk(child, depth + 1);
    }
  };
  walk(root, 0);
  for (const extra of options.extraClassNames ?? []) addTokens(extra);
  return Array.from(tokens).sort();
}
