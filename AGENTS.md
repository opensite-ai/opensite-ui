## AGENTS.md – Instructions for coding agents working on `@opensite/ui`

This file is for **AI coding agents and maintainers**. It encodes the non‑obvious rules, constraints, and workflows of this repo so automated changes stay fast, safe, and consistent.

When in doubt, favor: **(1) tests passing, (2) Core Web Vitals + bundle size, (3) ecosystem compatibility**, in that order.

---

## 1. Quick mental model of this repo

- This is a **tree‑shakable React component + block library** for the DashTrack / OpenSite ecosystem.
- It powers high‑performance marketing sites driven by a **semantic site builder** and `@opensite/blocks`.
- Styling is **CSS‑variable + Tailwind CSS v4** driven (see `docs/STYLES.md`).
- Higher‑level **blocks** in `components/blocks/*` are selected via a **block registry** exported from `@opensite/ui/registry`.
- Forms in blocks use the **framework‑agnostic** `@page-speed/forms` library (see `docs/FORMS_INTEGRATION_GUIDE.md`).
- This is a **library**, not an app: avoid baking in app‑specific behavior (Rails, Next, etc.).

---

## 2. Golden rules (must follow)

1. **Preserve tree‑shaking.**
   - Keep per‑entry files in `src/*.ts` that re‑export a single component/block.
   - Avoid new “barrel” files that aggregate many exports.

2. **Do not hand‑edit the large `exports` map in `package.json`.**
   - When adding a new public entrypoint, mirror existing patterns and rely on the export‑generation scripts under `scripts/`.

3. **Respect performance budgets (see `docs/ECOSYSTEM_GUIDELINES.md`).**
   - Avoid heavy new runtime dependencies or expensive work during render.
   - Prefer existing animation/utility libs already in the tree.

4. **Use the shared styling system.**
   - Components and blocks should rely on the CSS variables defined in `docs/STYLES.md`.
   - Only add new tokens when necessary, and document them in that file.

5. **Keep components framework‑agnostic.**
   - No direct imports from app frameworks or DashTrack apps inside this library.
   - Integration‑specific logic belongs in separate helpers or consuming apps.

6. **Blocks must stay JSON‑serializable.**
   - Props for `components/blocks/*` should be plain data (no functions, React nodes, or non‑serializable values in block configuration).

7. **Form behavior uses FormEngine.**
   - Use `FormEngine` from `@page-speed/forms/integration` for all block forms.
   - Expose `formEngineSetup?: FormEngineProps` (not raw `formConfig`/`onSubmit`).
   - See `docs/FORMS_INTEGRATION_GUIDE.md` for implementation patterns.

8. **Prefer copying a proven pattern.**
   - For new work, start from the closest existing component/block and adapt it rather than designing a completely new structure.

9. **Always run minimal checks for code changes.**
   - At least: `pnpm test` and `pnpm type-check` before considering work complete.

---

## 3. Key directories (for navigation)

- `components/ui/*` – Low‑level UI primitives (buttons, containers, dialogs, etc.).
- `components/blocks/*` – High‑level page blocks grouped by domain (about, cta, footers, offer‑modal, etc.).
- `src/*.ts` – Tree‑shakable entry files that re‑export components/blocks and the registry.
- `src/registry.ts` + `registry/*` – Block registry implementation and helpers.
- `lib/utils.ts` – Utilities such as `cn(...)` (preferred way to merge class names).
- `docs/ECOSYSTEM_GUIDELINES.md` – Platform‑wide performance and architecture rules.
- `docs/STYLES.md` – Styling, CSS variables, Tailwind 4 integration (read before changing visuals).
- `docs/FORMS_INTEGRATION_GUIDE.md` – Canonical description of how blocks use `@page-speed/forms`.

Before modifying code in any of these areas, skim the matching doc.

---

## 4. Working with components & blocks

### 4.1 UI components (`components/ui`)

- Accept and propagate `className` to allow Tailwind customization.
- Use `cn(...)` from `lib/utils.ts` to merge Tailwind classes safely.
- Keep public props stable; renaming/removing public props is a breaking change for external consumers.
- Prefer composition (building new behavior from existing primitives) to duplicating logic.

### 4.2 Blocks (`components/blocks`)

- Blocks are designed to be:
  - **Semantic** – represent real marketing patterns (hero, CTA, testimonials, etc.).
  - **Serializable** – props should be simple data suitable for design payloads.
  - **Performant** – no unnecessary side effects or heavy client logic.
- When adding a block:
  1. Place it under the right category folder in `components/blocks/*`.
  2. Define a clear, typed props interface and export it.
  3. Add a matching `src/<block-name>.ts` entry that re‑exports the component and its types.
  4. Register it in the block registry (see next section) with accurate category + semantic tags.

---

## 5. Block registry & semantic selection (`@opensite/ui/registry`)

The registry powers **AI‑driven block selection** via functions exported from `src/registry.ts`:

- `BLOCK_REGISTRY`
- `getBlocksBySemanticTag`
- `getBlocksByCategory`
- `getBlockById`
- `getAllBlocks`, `getAllCategories`, `searchBlocks`

When changing or adding blocks in the registry:

1. Give each block a **stable, unique ID** that will not change across releases.
2. Assign **categories** and **semantic tags** that clearly describe its purpose and layout.
3. Keep descriptions short but precise so AI agents can pick blocks based on intent.
4. Avoid reusing IDs/semantics for unrelated designs; prefer adding a new entry.
5. If a block’s design/intent changes, **update its metadata** in `src/registry/blocks.ts`
   (name/description/semanticTags/exampleUsage). `pnpm build` regenerates `registry-export.json`.

---

## 6. Styling & Tailwind CSS v4

- Tailwind v4 + `@theme inline` is the assumed environment.
- Visual tokens (colors, radii, spacing, button variants, shadows, etc.) are defined as CSS variables in the base CSS template in `docs/STYLES.md`.
- To change visuals:
  - First try adjusting existing CSS variables.
  - Only introduce new variables if a concept truly cannot reuse an existing one.
  - Update `docs/STYLES.md` when you add or repurpose tokens.
- Do not hard‑code theme values directly in components if they can be expressed via variables.

---

## 7. Forms & `FormEngine` from `@page-speed/forms/integration`

Form‑enabled blocks use the `FormEngine` component from `@page-speed/forms/integration`. This provides a unified, streamlined API for all form handling.

### Block Props Pattern

Form blocks expose these props:

- `formEngineSetup?: FormEngineProps` – Full form configuration (endpoint, callbacks, fields, layout)
- `buttonAction?: ActionConfig` – Submit button customization (for newsletter/button‑group forms)
- `formSlot?: React.ReactNode` – Escape hatch for fully custom form rendering

### Two Form Patterns

1. **Newsletter/Button‑Group** (single‑field forms like email signup):
   - Uses `formLayout: "button-group"` in formLayoutSettings
   - Input field with inline submit button
   - `buttonAction` controls button icon/label/variant
   - Reference: `components/blocks/footers/footer-split-image-accordion.tsx`

2. **Standard Multi‑Field** (contact forms, support forms, etc.):
   - Uses default or `formLayout: "standard"` layout
   - Grid of fields with submit button below
   - Reference: `components/blocks/contact/contact-support.tsx`

### Implementation Requirements

When adding forms to blocks:

1. Import from `@page-speed/forms/integration`:
   ```tsx
   import {
     FormEngine,
     type FormEngineProps,
     type FormEngineStyleRules,
     type FormFieldConfig,
   } from "@page-speed/forms/integration";
   ```

2. Define `DEFAULT_STYLE_RULES` and `DEFAULT_FORM_FIELDS` at module level.

3. Implement `renderForm` using `React.useMemo`:
   - Check `formSlot` first (escape hatch)
   - Return `null` if no `formEngineSetup` provided
   - Pass defaults via `defaultFields` and `defaultStyleRules` props

4. Keep `formEngineSetup` **JSON‑serializable** so it flows through design payloads.

5. Do not embed API keys or environment‑specific URLs directly in reusable blocks.

See `docs/FORMS_INTEGRATION_GUIDE.md` for complete implementation examples.

---

## 8. Build, exports & distribution

- Build is handled by **tsup** (`tsup.config.ts`) with many named entrypoints listed in the `allEntries` map.
- For a new public module, you typically need to:
  1. Add a `src/<entry>.ts` file that re‑exports the component/types.
  2. Add that entry to the `allEntries` map in `tsup.config.ts`.
  3. Run the export‑generation scripts (see `package.json` `generate:exports` chain) instead of hand‑editing `exports`.
- `pnpm build` regenerates export maps and `registry-export.json` automatically.
- Keep `sideEffects: false` accurate: if you introduce code with side effects at import time, refactor or mark it explicitly.

---

## 9. Recommended workflows for agents

### 9.1 Modify an existing UI component

1. Locate it under `components/ui/*` and inspect usages if needed.
2. Check whether the change can be expressed via CSS variables instead of new hard‑coded styles.
3. Update props and implementation conservatively; keep public API stable when possible.
4. Add or update tests if behavior changes.
5. Run `pnpm test` and `pnpm type-check`.

### 9.2 Add a new block

1. Identify the closest existing block category and use that as a template.
2. Implement the block under `components/blocks/<category>/` with JSON‑friendly props.
3. Create a `src/<block-name>.ts` entry that re‑exports the block and its props type.
4. Register it in the block registry with good semantic tags.
5. If it includes a form, wire it using the patterns in `docs/FORMS_INTEGRATION_GUIDE.md`.
6. Add tests for basic rendering and key behaviors.

### 9.3 Adjust styling / theming

1. Edit CSS variables in the base template described in `docs/STYLES.md`.
2. Verify dark‑mode behavior and example components still look correct.
3. Avoid introducing Tailwind config changes that would break consuming apps.

### 9.4 Update forms behavior

1. Read `docs/FORMS_INTEGRATION_GUIDE.md` for the current FormEngine patterns.
2. Use `FormEngine` from `@page-speed/forms/integration` – do NOT use raw `useForm`/`Form`/`Field` directly in blocks.
3. Expose `formEngineSetup?: FormEngineProps` as the primary form configuration prop.
4. For newsletter/button‑group forms, also expose `buttonAction?: ActionConfig`.
5. Always provide `formSlot?: React.ReactNode` as an escape hatch for custom forms.
6. Define `DEFAULT_STYLE_RULES` and `DEFAULT_FORM_FIELDS` at module level.
7. Ensure all props remain JSON‑serializable for design payload compatibility.
8. Reference existing blocks:
   - Newsletter pattern: `components/blocks/footers/footer-split-image-accordion.tsx`
   - Standard form pattern: `components/blocks/contact/contact-support.tsx`

---

## 10. Verification checklist

Before considering a change “done”, an agent should:

- [ ] Run `pnpm test` (or the narrowest relevant test command).
- [ ] Run `pnpm type-check`.
- [ ] For export or build‑related changes, run `pnpm build` locally or ensure CI will run it.
- [ ] Confirm new/changed blocks remain JSON‑serializable and correctly wired into the registry.
- [ ] Confirm any styling changes go through CSS variables and respect Tailwind 4 expectations.

If any of these cannot be completed (e.g. missing environment or permissions), clearly note what was skipped and why in the PR description or commit message.
