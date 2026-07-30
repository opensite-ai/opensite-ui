# Change Manifest — Control Setup

Task: `dynamic-icon-rendering`
Completed: 2026-07-30T15:18:16Z
Files modified: 1
Files created: 4
Files deleted: 0

## Modified Files

| File | Change Type | Lines +/- | Notes |
|---|---|---:|---|
| `tasks/dynamic-icon-rendering/SPEC.md` | Approval status | +1/-1 | Records Jordan's explicit approval. |
| `tasks/dynamic-icon-rendering/.refactor-scope-allowlist` | Control artifact | generated | Exact 228-file review universe plus spec-authorized tests and outputs. |
| `tasks/dynamic-icon-rendering/.refactor-session.md` | Control artifact | new | Durable branch, scope, progress, and blocker state. |
| `tasks/dynamic-icon-rendering/OBSERVATIONS.md` | Control artifact | new | Holds out-of-scope observations without expanding work. |
| `tasks/dynamic-icon-rendering/CHANGE_MANIFEST.md` | Control artifact | new | Records per-batch changes and verification. |

## Scope Compliance

- [x] All modified files are spec-defined refactor controls.
- [x] No files were created outside spec-defined outputs.
- [x] No dependency or version file was staged or modified by this task.
- [x] No new runtime abstraction or rendering system was created.
- [x] Initial scope inventory reproduced the approved 228 production files and 188 existing adjacent tests.

## Test Results

- Before: not run for documentation-only control setup
- After: not run for documentation-only control setup
- New failures: none
- Pre-existing failures: not evaluated

---

Further batch manifests are appended below after each verified subtask.

---

# Change Manifest — Pilot

Task: `dynamic-icon-rendering`
Completed: 2026-07-30T15:28:09Z
Files modified: 19 implementation/test files, plus 3 control artifacts
Files created: 0
Files deleted: 0

## Modified Files

| File | Change Type | Lines +/- | Notes |
|---|---|---:|---|
| `src/types/blocks.ts` | Public type contract | +2/-2 | `ActionConfig.icon` and `iconAfter` explicitly accept icon names or React nodes. |
| `components/ui/block-actions.tsx` | Runtime render boundary | +3/-2 | Leading and trailing action icons render through `DynamicIcon`; children precedence is unchanged. |
| `components/ui/__tests__/block-actions.test.tsx` | Regression tests | +52/-1 | Covers both string positions, raw-text absence, and custom elements. |
| `components/blocks/hero/hero-announcement-badge.tsx` | Vulnerable direct render | +3/-2 | Routes `badgeIcon` through `DynamicIcon`. |
| `components/blocks/hero/__tests__/hero-announcement-badge.test.tsx` | Regression tests | +42/-3 | Covers string and custom badge icons. |
| `components/blocks/hero/hero-badge-image-split.tsx` | Vulnerable direct render | +3/-2 | Routes `badgeIcon` through `DynamicIcon`. |
| `components/blocks/hero/__tests__/hero-badge-image-split.test.tsx` | Regression tests | +45/-0 | Covers string and custom badge icons. |
| `components/blocks/hero/hero-centered-gradient-cta.tsx` | Vulnerable direct render | +4/-3 | Routes badge and feature icons through `DynamicIcon`. |
| `components/blocks/hero/__tests__/hero-centered-gradient-cta.test.tsx` | Regression tests | +54/-3 | Covers string and custom badge/feature icons. |
| `components/blocks/hero/hero-enterprise-security.tsx` | Vulnerable direct/fallback render | +7/-9 | Routes badge and feature override/name/default precedence through `DynamicIcon`. |
| `components/blocks/hero/__tests__/hero-enterprise-security.test.tsx` | Regression tests | +67/-3 | Covers string/custom values and fallback order. |
| `components/blocks/hero/hero-floating-images.tsx` | Vulnerable direct render | +2/-2 | Routes `badgeIcon` through its existing `DynamicIcon` import. |
| `components/blocks/hero/__tests__/hero-floating-images.test.tsx` | Regression tests | +28/-2 | Covers string and custom badge icons. |
| `components/blocks/hero/hero-image-left-content.tsx` | Vulnerable direct render | +3/-2 | Routes `badgeIcon` through `DynamicIcon`. |
| `components/blocks/hero/__tests__/hero-image-left-content.test.tsx` | Regression tests | +29/-0 | Covers string and custom badge icons. |
| `components/blocks/hero/hero-startup-launch-cta.tsx` | Vulnerable direct render | +3/-2 | Routes `badgeIcon` through `DynamicIcon`; logo media remains unchanged. |
| `components/blocks/hero/__tests__/hero-startup-launch-cta.test.tsx` | Regression tests | +29/-0 | Covers string and custom badge icons. |
| `components/blocks/hero/hero-stats-social-proof.tsx` | Vulnerable direct render | +2/-2 | Routes `badgeIcon` through its existing `DynamicIcon` boundary. |
| `components/blocks/hero/__tests__/hero-stats-social-proof.test.tsx` | Regression tests | +29/-0 | Covers string and custom badge icons. |
| `tasks/dynamic-icon-rendering/.refactor-session.md` | Control state | current batch | Records pilot completion and next batch. |
| `tasks/dynamic-icon-rendering/OBSERVATIONS.md` | Process observation | current batch | Records the resolved transient test-output artifact. |
| `tasks/dynamic-icon-rendering/CHANGE_MANIFEST.md` | Batch manifest | current batch | Records classifications, scope, and verification. |

## Classification Summary

- Vulnerable direct render: 12 icon paths fixed.
- Vulnerable fallback: 1 feature override/name/default path fixed.
- Already safe: existing floating-image zoom icons and social-proof status icons were reviewed and unchanged.
- Image/media icon: startup badge-card logo source was reviewed and unchanged.
- Shared renderer: both `ActionConfig` icon positions were fixed centrally.

## Scope Compliance

- [x] The implementation diff is exactly the approved 19-file pilot.
- [x] All 19 implementation/test files are in the exact scope allowlist.
- [x] No new files exist outside spec-defined outputs.
- [x] No dependency or lockfile changed.
- [x] The pre-existing `package.json` diff remains exactly `3.14.9` to `3.14.10` and is not part of this task.
- [x] No new abstraction or rendering system was created.
- [x] No styling, layout, media, action, or fallback-order behavior changed.
- [x] `git diff --check` passed.
- [x] Independent read-only review reported no findings.

## Test Results

- Focused: 9 files passed, 92 tests passed, exit 0.
- Full `pnpm test:ci`: 485 files passed, 2,531 tests passed, exit 0.
- `pnpm type-check`: exit 0.
- `pnpm build`: exit 0; 606 blocks exported.
- Generated-artifact review: timestamp/version-only metadata from the pre-existing package bump; restored and excluded from the batch.
- New failures: none.
- Pre-existing failures: none observed.
