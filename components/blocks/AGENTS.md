## AGENTS – `components/blocks`

This file is for **AI coding agents** working on blocks under `components/blocks/*`, especially when converting standard React components (e.g. from `docs/MONDAY_EVENING_DEC_29_COMPONENTS.md`) into semantic blocks.

Keep in mind that these blocks are consumed by the **Semantic UI builder and site rendering engine** described in `docs/SEMANTIC_SITE_BUILDER.md`.

---

## 1. Core responsibilities when adding or editing blocks

1. **Follow existing block patterns.**
   - Use existing blocks in `components/blocks/hero`, `components/blocks/about`, `components/blocks/cta`, etc. as **templates** for structure, props, and tests.
   - Prefer copying the closest matching block and adapting it over inventing a new pattern.

2. **Make blocks fully compatible with the Semantic UI engine.**
   - Props must be **JSON‑serializable** (strings, numbers, booleans, arrays, plain objects).
   - Provide a concise but descriptive **component name** and a **rich summary/description** in the registry entry so the AI engine can choose blocks intelligently.
   - Keep layout + semantics aligned with the architecture in `docs/SEMANTIC_SITE_BUILDER.md`.

3. **Use uniform layout primitives.**
   - Most blocks should wrap content in `Section` and/or `Container` components to ensure:
     - Consistent vertical spacing controls.
     - Uniform background style options.
     - Support for SVG background patterns.
   - Follow how existing blocks wire `Section`/`Container` props (spacing, background, patterns, etc.).

4. **Preserve tree‑shaking and exports.**
   - For each new block, add (or update) the corresponding entry file in `src/` that re‑exports it and its props type.
   - **Do not manually edit** `package.json.exports`; instead run `pnpm generate:exports` when finished.

5. **Keep performance and accessibility in mind.**
   - Avoid unnecessary network calls, timers, or observers inside blocks.
   - Use semantic HTML and sensible ARIA attributes (follow patterns from existing blocks).

---

## 2. Icons and DynamicIcon

When converting components that use external icon libraries (Lucide, MDI, etc.):

- **Do not install additional icon libraries.**
- Use the existing `DynamicIcon` component instead.
- Refer to `docs/ICON_LIBRARY_API.md` for the list of supported collections, prefixes, and API behavior.
- When in doubt about an icon name/collection, you can test it against the Iconify server (`icons.opensite.ai`) as documented there.

General rule: `DynamicIcon` should receive a `name` like `"lucide/home"`, where the prefix matches one of the supported collections.

---

## 3. Images, video, and placeholders

When source components reference concrete image or video URLs:

1. **Use shared placeholder pools.**
   - Logos: `logoPlaceholders` from `lib/mediaPlaceholders.ts`.
   - Generic images: `imagePlaceholders` from `lib/mediaPlaceholders.ts`.
   - Generic videos: `videoPlaceholders` from `lib/mediaPlaceholders.ts`.
   - Branded / block‑specific assets: `blockBrandedIconsAndPlaceholders` from `lib/blockBrandedIconsAndPlaceholders.ts`.

2. **Use the shared `<Img>` component, not raw `<img>` tags.**
   - Locate existing usages of `Img` in blocks and mirror the import path + usage.
   - Expose an **optional** `optixFlowConfig` prop on the block and pass it through to `<Img>` where appropriate.

3. Replace any direct `<video>` or image‑background URLs with entries from the placeholders above unless there is a strong reason not to.

---

## 4. Links, buttons, and Pressable

- **Do not use raw `<a>` or button components for interactive links in blocks.**
- Use the `Pressable` component as documented in `docs/PRESSABLE_EXAMPLES.md` and existing blocks.
- Typical patterns:
  - For navigation CTAs: `<Pressable href=... asButton variant=... size=...>`.
  - For internal navigation, let `Pressable` handle URL normalization instead of manual `target`/`rel` logic.
- You may nest `DynamicIcon` and `Img` inside `Pressable` as shown in the examples doc.

---

## 5. Tailwind 4.1 and styling

- Blocks should rely on the **CSS variable + Tailwind v4** system documented in `docs/STYLES.md`.
- It is fine to use any Tailwind 4.1 utilities, but:
  - Prefer existing design tokens (CSS variables) over hard‑coded colors/sizes.
  - Ensure classes work in both light and dark modes where relevant.
- For repeated patterns (e.g., gradients, borders, shadows), copy existing class combinations from similar blocks.

---

## 6. Tests and `__tests__` patterns

- Follow the testing patterns used in `components/blocks/about/__tests__` and `components/blocks/cta/__tests__`.
- For new block categories (e.g. `components/blocks/service-detail`), create a matching `__tests__` folder and:
  - Test basic render without crashing.
  - Test key behaviors (CTAs render, forms submit handlers called, variants switch correctly, etc.).
  - Use realistic but placeholder data that matches semantic engine expectations.
- Tests should align with both `docs/SEMANTIC_SITE_BUILDER.md` and `docs/ECOSYSTEM_GUIDELINES.md` (no heavy client work, good performance patterns).

---

## 7. Workflow checklist for new blocks

When converting new source components into blocks:

1. Identify target block directories from `docs/MONDAY_EVENING_DEC_29_COMPONENTS.md` headings.
2. Choose the closest existing block in that directory as a template.
3. Implement the new block:
   - Use `Section`/`Container`.
   - Replace icons with `DynamicIcon`.
   - Replace images/videos with placeholders + `<Img>`.
   - Use `Pressable` for links/buttons.
4. Add or update tests in the appropriate `__tests__` directory.
5. Wire the block into the semantic registry (ID, category, semantic tags, description).
6. Run `pnpm test`, `pnpm type-check`, and then `pnpm generate:exports`.
7. Before opening a PR, ensure your branch is rebased on the latest `master` (e.g. via `git pull --rebase`).

