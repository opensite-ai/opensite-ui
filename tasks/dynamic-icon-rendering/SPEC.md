# Dynamic Icon Rendering Refactor Spec

**Task name:** `dynamic-icon-rendering`
**Date:** 2026-07-30
**Initiator:** Jordan Hudgens
**Status:** Approved by Jordan on 2026-07-30

## What This Task Does

Audit every public block/component icon contract and every icon render path in
`@opensite/ui`, then route icon-library strings and custom React nodes through
the existing `DynamicIcon` compatibility component. The refactor fixes cases
where the site builder supplies a valid icon name such as
`"lucide/shield"` but the component interpolates it as a raw `ReactNode`,
rendering visible text. It preserves custom React icon elements, current
layout/styling, existing `iconName` fallbacks, and image-based icon behavior.

This task does not redesign the icon system. `DynamicIcon` already implements
the required runtime behavior:

- Strings are forwarded to `@page-speed/icon`.
- Non-string React nodes render unchanged.
- `null` and `undefined` render nothing.

## Research Baseline

Repository state at the spec gate:

- Branch/HEAD: `master` at `3367d1b`.
- Existing user change: `package.json` is unstaged at version `3.14.10`.
  It is not part of this refactor and must never be staged or overwritten.
- Prior verified fixes:
  - `about-expandable-values.tsx` routes `icon` through `DynamicIcon`.
  - `feature-capabilities-grid.tsx` routes both string names and custom React
    nodes through `DynamicIcon`.
- Current reproduced defect:
  - `HeroAnnouncementBadgeProps.badgeIcon` is `React.ReactNode`.
  - `hero-announcement-badge.tsx` renders `{badgeIcon}` directly.
  - Its current test suite does not exercise `badgeIcon`.
- Shared reproduced defect:
  - `ActionConfig.icon` and `ActionConfig.iconAfter` are `ReactNode`.
  - `components/ui/block-actions.tsx` renders `{icon}` and `{iconAfter}`
    directly.

AST-assisted inventory results:

- 1,144 component TSX files exist; 1,080 are block files.
- 402 icon-like prop declarations exist in 182 production component files.
- 196 component prop declarations are string-capable through
  `ReactNode`, `ReactNode | string`, or `DynamicIconName`.
- Those 196 declarations occur in 125 component files.
- Eight additional string-capable icon props live in
  `src/types/blocks.ts`, including `ActionConfig.icon` and `iconAfter`.
- 343 simple raw icon JSX expressions occur in 168 files.
- 46 files contain helpers that directly return an icon-like value.
- The union is 228 production component files requiring review, plus
  `src/types/blocks.ts`.
- 188 of the 228 component files have an adjacent existing test file.
- 49 block-local prop/render pairs are already confirmed raw-render defects.
- The 343 raw expressions are review sites, not 343 assumed defects:
  pre-resolved React elements, image URLs, and guarded fallback values must be
  classified before modification.

Review-universe distribution:

| Category | Files |
|---|---:|
| hero | 33 |
| cta | 26 |
| pricing | 26 |
| features | 21 |
| project-detail | 20 |
| services-list | 15 |
| navbars | 14 |
| banner | 9 |
| blog | 9 |
| stats | 6 |
| link-page | 5 |
| service-detail | 5 |
| carousel | 5 |
| about | 4 |
| article | 4 |
| process | 4 |
| UI primitives/helpers | 4 |
| resource-detail | 3 |
| logos | 3 |
| list | 3 |
| project-list | 2 |
| gallery | 2 |
| contact | 1 |
| testimonials | 1 |
| case-studies-list | 1 |
| comparison | 1 |
| case-study-detail | 1 |

Permanent invariant-audit correction:

- The approved in-scope rules later identified six direct renderers omitted by
  the initial collector: CTA video background, two FAQ actions, two hero
  feature lists, and the case-study outcome list.
- The corrected review universe is 234 production component files plus
  `src/types/blocks.ts`; all six adjacent tests already existed.
- The correction remains inside the approved final-batch file limits and does
  not expand the behavioral scope.

## Defect Classification

Every review site must receive exactly one classification in the change
manifest:

1. **Vulnerable direct render**
   - A string-capable icon prop/value is interpolated as JSX or returned by a
     render helper without passing through `DynamicIcon`.
2. **Vulnerable fallback**
   - A ReactNode icon override is selected ahead of a safe `iconName`
     fallback, but the override itself can still be a string.
3. **Already safe**
   - The icon value reaches `<DynamicIcon name={...} />` on every render path.
4. **Image/media icon**
   - The string is explicitly documented and rendered as an image URL/source.
     It must keep using `Img`, not `DynamicIcon`.
5. **Pre-resolved element**
   - A local value is provably constructed as JSX before final interpolation.
     It may remain as-is only when no builder-supplied string can enter it.
6. **Metadata/non-content**
   - Size, class, color, position, boolean, or other icon metadata. It is not an
     icon value and is excluded.

No ambiguous classification may be changed. Ambiguity triggers a checkpoint.

## Explicit Scope Boundary

### In Scope

- Production TypeScript/TSX under:
  - `components/blocks/`
  - `components/ui/`
  - `src/types/blocks.ts`
- Only files matching at least one of these audited conditions:
  - Declare an icon-like prop capable of receiving a string or React node.
  - Directly render an icon-like identifier/property.
  - Return an icon-like value from a render helper.
  - Consume a shared icon-bearing type such as `ActionConfig` and render its
    icon fields manually.
- Adjacent tests for every changed component.
- A bounded source-contract regression test that rejects raw rendering of
  builder-facing icon values.
- Generated artifacts only when normal package scripts regenerate them:
  - `builder-contract-bundle.json`
  - `registry-export.json`
  - existing export/manifests generated by `pnpm build`
- Refactor control artifacts under `tasks/dynamic-icon-rendering/`:
  - `SPEC.md`
  - `.refactor-scope-allowlist`
  - `.refactor-session.md`
  - `OBSERVATIONS.md`
  - `CHANGE_MANIFEST.md`

### Out of Scope — Do Not Touch

- `package.json`, lockfiles, dependencies, package version, or publish config.
- `components/ui/dynamic-icon.tsx`; its behavior is already correct.
- CSS tokens, styling, layout, animation, spacing, or responsive behavior.
- Component structure except the minimum icon-render substitution.
- Registry prose/examples unless a source statement is factually wrong about
  the icon prop being corrected.
- Dynamic feed source names, `dataSource`, hydration, bind targets, or payload
  mappings.
- Image/media icon strings that are intentionally rendered with `Img`.
- Business logic, navigation behavior, actions, links, forms, or state.
- Build config, CI config, deployment config, publishing, or downstream repos.
- Unrelated test/lint/build failures.

## Target Contract and Transformation Rules

1. Dedicated builder-facing icon values must explicitly accept both icon names
   and custom React nodes. Existing `DynamicIconName` types remain valid;
   `ReactNode`-only declarations become an explicit string-capable contract
   without narrowing existing consumers.
2. Final rendering must pass the value through:

   ```tsx
   <DynamicIcon name={iconValue} ...existingIconProps />
   ```

3. Preserve existing precedence exactly:

   ```text
   custom icon/iconSlot -> legacy iconName -> existing default -> null
   ```

   The custom value itself must also pass through `DynamicIcon`.
4. Preserve wrapper elements, classes, size intent, colors, accessibility
   labels, hover behavior, and conditionals.
5. Do not replace or remove legacy `iconName` props.
6. Do not create a new icon helper or abstraction. Use the existing
   `DynamicIcon`.
7. Do not blindly transform a string documented as an image URL.
8. `children` and explicit content slots continue to override generated
   label/icon composition.
9. Pre-resolved elements may be wrapped by `DynamicIcon` when that creates a
   uniform final boundary; non-string nodes are rendered unchanged.

## Pilot Batch — 19 Files Maximum

The first implementation batch validates the central and block-local patterns
before scaling.

Shared contract/renderer:

1. `src/types/blocks.ts`
2. `components/ui/block-actions.tsx`
3. The existing adjacent `block-actions` test file, or one new focused test if
   none exists

Eight hero blocks and their eight existing adjacent tests:

1. `hero-announcement-badge`
2. `hero-badge-image-split`
3. `hero-centered-gradient-cta`
4. `hero-enterprise-security`
5. `hero-floating-images`
6. `hero-image-left-content`
7. `hero-startup-launch-cta`
8. `hero-stats-social-proof`

`hero-image-slider` is intentionally deferred because its icon path also
crosses form-engine setup and should be reviewed with the remaining manual
action renderers.

Pilot acceptance:

- Each string icon is rendered through the mocked `DynamicIcon`.
- The icon-name text is absent from rendered content.
- Each custom React icon element is preserved.
- Action `icon` and `iconAfter` both pass.
- Existing hero behavior tests remain green.
- No file outside the 19-file pilot allowlist changes.

## Follow-up Batches

Every implementation batch is limited to at most 25 production files and at
most 50 total source/test files. The exact file allowlist is materialized from
the research inventory before execution.

1. Remaining hero icon/action consumers, part A.
2. Remaining hero icon/action consumers, part B.
3. CTA, part A.
4. CTA, part B.
5. Pricing, part A.
6. Pricing, part B.
7. Features.
8. Project detail.
9. Services list.
10. Navbars.
11. Banner and blog.
12. Stats, service detail, process, about, and testimonials.
13. Carousel, link page, resource detail, logos, list, and project list.
14. Article, UI helpers, gallery, contact, case studies, and comparison.
15. Repository-wide invariant audit, generated artifacts, and full
    verification.

Batch boundaries may shrink when risk is higher. They may not expand beyond
the stated budgets without a new checkpoint.

## Tests and Permanent Regression Guard

For every changed render path:

- Add or extend a focused test that supplies an icon API string and asserts
  that `DynamicIcon` receives it.
- Assert that the raw icon-name string does not appear as visible text.
- Preserve or add a custom React element assertion.
- Cover both leading and trailing action icons when the renderer supports
  `ActionConfig`.

Add one spec-authorized source-contract test, kept under the 50-line net-new
logic threshold where practical, that fails on unapproved direct rendering of
builder-facing icon values. The guard must:

- Detect simple JSX children such as `{icon}`, `{item.icon}`,
  `{badgeIcon}`, and `{iconAfter}`.
- Detect helper returns such as `return item.icon`.
- Ignore icon metadata and documented image/media sources.
- Use an explicit, reviewed allowlist for any intentional exception.

If a reliable guard cannot stay bounded or produces ambiguous false positives,
halt at a checkpoint instead of creating a new lint system or test framework.

## Verification Sequence

Run and record explicit exit status for every batch:

1. Focused tests for all changed components.
2. `pnpm type-check`.
3. `git diff --check`.
4. Scope audit against
   `tasks/dynamic-icon-rendering/.refactor-scope-allowlist`.
5. Dependency audit confirming no `package.json` or lockfile changes.

Run at the pilot gate and final gate:

1. `pnpm test:ci`
2. `pnpm type-check`
3. `pnpm build`
4. Re-run the complete AST inventory and require:
   - zero unclassified review sites;
   - zero vulnerable direct/fallback render paths;
   - zero raw icon-name text assertions failing.
5. Review generated artifact diffs separately from timestamp-only changes.

Do not fix unrelated failures. Record them and stop at the required checkpoint.

## Acceptance Criteria

- Every one of the 228 component review files and the shared type file has a
  recorded classification.
- Every vulnerable builder-facing icon value renders through `DynamicIcon`.
- `hero-announcement-badge` accepts and renders string icon names correctly.
- Shared `ActionConfig.icon` and `iconAfter` render dynamically through
  `BlockActions`.
- Manual action renderers cannot display icon names as text.
- Custom React icon elements still render unchanged.
- Intentional image icon URLs still use `Img`.
- Legacy `iconName` props and fallback precedence remain compatible.
- The permanent regression guard passes.
- Focused tests, full `test:ci`, type-check, build, and diff checks pass, or the
  task halts on an unrelated failure without modifying it.
- No dependency, version, styling, layout, business-logic, or deployment
  changes occur.
- The existing unstaged `package.json` version `3.14.10` remains untouched.
- Generated registry/contract artifacts are produced only by package scripts.
- No push, publish, or deployment occurs.

## Drift Checks

At least every 25 production files, record:

1. Every changed file is in the approved allowlist.
2. No dependency/version file changed.
3. No new abstraction, utility, or rendering system was added.
4. Every change is necessary to remove a raw icon render or test it.
5. No styling/layout behavior changed.

Any failed drift check halts execution.

## Commit, Review, and Release Boundary

Proposed execution isolation after approval:

- Create local branch `refactor/dynamic-icon-rendering` from `3367d1b`.
- Carry but never stage the existing user-owned `package.json` version bump.
- Make one local atomic commit per passing batch using explicit path staging.
- Do not push, publish, deploy, or change downstream repositories.

Approval of this spec includes approval for the local branch and atomic local
batch commits above. If Jordan wants the work left uncommitted, the spec must
be corrected before execution because the large-scale-refactor protocol
requires reviewable rollback boundaries.

## Rollback Plan

- Each batch is independently revertible with `git revert`.
- Before a batch commit, the exact staged path list is compared with the
  allowlist.
- The branch can be deleted without affecting `master`.
- The pre-existing unstaged `package.json` change remains outside all commits
  and rollback operations.
- No generated artifact is hand-edited; regeneration is repeatable through the
  package scripts.

## Spec Gate

No implementation, parallel-agent delegation, branch creation, or commit may
begin until Jordan explicitly approves this spec.
