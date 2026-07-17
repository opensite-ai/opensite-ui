# AGENTS.md — @opensite/ui

This package owns the Semantic UI component registry and builder contract consumed by Octane, routing-config hydration, and render-time libraries. Dynamic source metadata is a cross-repository contract, not component-local implementation detail.

## Dynamic data source rules

- Read `../../docs/dynamic-feeds/FEED_CONTRACT.md` before changing `src/registry/builder-contract.ts`, feed-sensitive registry metadata, or component props used by hydration.
- Canonical page JSON keeps block-level `dataSource` objects symbolic. `blog_feed.category` and `blog_feed.tag` accept a human name as `string` or multiple names as `string[]`; never teach an authoring model to emit database IDs.
- Keep registered source names, optional fields, `expands`, bind targets, and canonical payload guidance aligned with dashtrack-ai, Octane, and `@page-speed/blocks`. Do not fabricate missing review, event, blog, or media values in component defaults.
- Source files are authoritative. Do not hand-edit `builder-contract-bundle.json` or `registry-export.json`; regenerate them with the package scripts when source contract content changes and review semantic diffs separately from timestamps.

## Verification and release boundary

- Run `pnpm test:ci`, `pnpm type-check`, and `pnpm build` for registry or dynamic-source changes.
- Confirm generated contract tests cover scalar/array blog filters and every registered source's optional fields and expansion semantics.
- Do not npm-publish. Hand the verified branch, generated artifacts, version impact, and downstream publish order to Jordan.
