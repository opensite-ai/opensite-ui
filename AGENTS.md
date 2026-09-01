# AGENTS.md — @opensite/ui

This package owns the Semantic UI component registry and builder contract consumed by Octane, routing-config hydration, and render-time libraries. Dynamic source metadata is a cross-repository contract, not component-local implementation detail.

## Dynamic data source rules

- Read `../../docs/dynamic-feeds/FEED_CONTRACT.md` before changing `src/registry/builder-contract.ts`, feed-sensitive registry metadata, or component props used by hydration.
- Canonical page JSON keeps block-level `dataSource` objects symbolic. `blog_feed.category` and `blog_feed.tag` accept a human name as `string` or multiple names as `string[]`; never teach an authoring model to emit database IDs.
- Keep registered source names, optional fields, `expands`, bind targets, and canonical payload guidance aligned with dashtrack-ai, Octane, and `@page-speed/blocks`. Do not fabricate missing review, event, blog, or media values in component defaults.
- Source files are authoritative. Do not hand-edit `builder-contract-bundle.json` or `registry-export.json`; regenerate them with the package scripts when source contract content changes and review semantic diffs separately from timestamps.

## Cross-repository consumers (keep in lockstep)

This package is the **source of truth** for the registry contract and the
actual components. Three downstream repos depend on it — change the contract
deliberately and review each consumer:

- **`opensite-ui-showcase`** (`tools/opensite-ui-showcase`) renders every block
  as a demo and exposes the public JSON API at `ui.opensite.dev`
  (`/api/categories`, `/api/categories/[slug]`, `/api/ai-config`). It pins this
  package (`@opensite/ui`) and regenerates its registry via
  `scripts/sync-registry.mjs`; its `src/types/blocks.ts` mirrors the `Block`
  registry entry emitted here.
- **`octane`** (`octane/`) syncs the showcase API into `ai_semantic_components`
  (`src/services/component_registry.rs`, `POST /api/v1/components/sync`). Its
  `ShowcaseBlock` Rust struct mirrors the `Block` type — field renames such as
  `defaultProps` → `exampleProps` must be coordinated.
- **`dt-cms`** (`dt-cms/Source`) consumes the synced component data through the
  Rails `/api/v1/components/*` API (`src/hooks/useComponentRegistry.ts`).

`src/registry/blocks.ts` and `src/registry/types/blocks.ts` define the
`BlockRegistryEntry` / `usageRequirements` / `propsSchema` contract that all
three consumers read. `builder-contract.ts` defines the dynamic-source contract
shared with Octane's semantic builder.

## Verification and release boundary

- Run `pnpm test:ci`, `pnpm type-check`, and `pnpm build` for registry or dynamic-source changes.
- Confirm generated contract tests cover scalar/array blog filters and every registered source's optional fields and expansion semantics.
- Do not npm-publish. Hand the verified branch, generated artifacts, version impact, and downstream publish order to Jordan.
