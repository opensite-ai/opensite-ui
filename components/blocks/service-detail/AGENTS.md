## AGENTS – `components/blocks/service-detail`

Use this file when adding or editing **service detail** blocks in this directory.

These blocks describe a single service in depth. They must remain:

- **Semantic** – clearly express service name, highlights, benefits, and supporting media.
- **Serializable** – props must be plain JSON data.
- **Composable** – built from existing primitives (`Section`, `Container`, common UI components).

---

## 1. Service‑detail specific conventions

- Keep a clear separation between:
  - **Hero/primary content** (headline, subheading, primary CTA, hero media).
  - **Supporting details** (features, process, FAQs, stats, testimonials, related services/resources).
- Make it easy for the Semantic UI engine to understand where to place:
  - Service name and summary.
  - Primary CTA and optional secondary CTA.
  - Media (image/video) describing the service outcome.

When in doubt, look at existing files in this folder as templates.

---

## 2. Layout & primitives

- Wrap the block in `Section` and/or `Container` with the same spacing/background props used in other categories.
- Reuse shared components for:
  - Headings and descriptions.
  - Lists of features/benefits.
  - Stat grids and testimonials.

---

## 3. Media, icons, and links

- Use shared media helpers:
  - `logoPlaceholders`, `imagePlaceholders`, `videoPlaceholders` from `lib/mediaPlaceholders.ts`.
  - `blockBrandedIconsAndPlaceholders` from `lib/blockBrandedIconsAndPlaceholders.ts`.
- Replace `<img>` with the `<Img>` component and expose an optional `optixFlowConfig` prop.
- Use `DynamicIcon` instead of installing new icon libraries (see `docs/ICON_LIBRARY_API.md`).
- Use `Pressable` for all interactive links/buttons (see `docs/PRESSABLE_EXAMPLES.md`).

---

## 4. Tests

For each block in this directory, there should be at least one test file under `components/blocks/service-detail/__tests__/`.

Tests should:

- Render the block with realistic placeholder props.
- Assert that:
  - The main service title and summary render.
  - Primary CTA (and optional secondary CTA) render as `Pressable` and have correct href/text.
  - Key media (images/video) render using placeholders and `<Img>`.
- Avoid testing implementation details; focus on behavior and critical outputs.

Use tests from `components/blocks/about/__tests__` and `components/blocks/cta/__tests__` as patterns.

---

## 5. Registry & semantic metadata

- Ensure every service detail block has a **stable ID** and is registered in the block registry with:
  - Category: `"service-detail"` (or equivalent existing category string).
  - Accurate semantic tags (e.g. `"service"`, `"detail"`, `"hero"`, `"sidebar"`).
  - A descriptive summary explaining when this layout is appropriate (e.g. "service hero with stats sidebar").

This metadata is what the Semantic UI engine uses to choose between different service‑detail layouts.

