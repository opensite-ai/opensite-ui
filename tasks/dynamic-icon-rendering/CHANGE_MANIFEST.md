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

---

# Change Manifest — Remaining Hero Part B

Task: `dynamic-icon-rendering`
Completed: 2026-07-30T15:49:00Z
Files modified: 24 implementation/test files, plus 2 control artifacts
Files created: 0
Files deleted: 0

## Modified Files

| Source and adjacent test | Classification / change | Combined lines +/- | Notes |
|---|---|---:|---|
| `hero-mentorship-video-split` | Vulnerable direct render | +51/-5 | Manual action icons now use `DynamicIcon`; hardcoded play icon remains safe. |
| `hero-minimal-centered-dark` | Vulnerable direct render | +52/-4 | Shared `StatItem.icon` now uses `DynamicIcon`; actions already use `BlockActions`. |
| `hero-newsletter-minimal` | Vulnerable direct render | +66/-5 | Stat icon and trailing submit icon now use `DynamicIcon`; no leading/children behavior was added. |
| `hero-pattern-badge-logos` | Vulnerable direct render | +59/-2 | Manual action icons now use `DynamicIcon`. |
| `hero-pattern-logo-tech-stack` | Vulnerable direct render | +50/-2 | Manual action icons now use `DynamicIcon`. |
| `hero-platform-features-grid` | Vulnerable direct/fallback render | +117/-9 | Action icons and feature override/name fallback now use `DynamicIcon` with exact legacy truthiness. |
| `hero-portfolio-creative` | Vulnerable direct/fallback render | +124/-4 | Action icons and social icon/name fallback now use `DynamicIcon` without adding shared override semantics. |
| `hero-premium-split-avatars` | Vulnerable direct render | +46/-2 | Manual action icons now use `DynamicIcon`. |
| `hero-productivity-launcher-video` | Vulnerable direct render | +56/-5 | Manual action icons now use `DynamicIcon`. |
| `hero-simple-centered-image` | Vulnerable direct render in dead helper | +19/-2 | Unreferenced helper remains structurally intact but both raw sites are safe; bounded source assertion added. |
| `hero-split-image-newsletter` | Vulnerable direct render | +58/-5 | Existing trailing submit icon now uses `DynamicIcon`; leading/children behavior remains intentionally absent. |
| `hero-split-spiral-shapes` | Vulnerable direct render | +56/-5 | Manual action icons now use `DynamicIcon`. |
| `tasks/dynamic-icon-rendering/.refactor-session.md` | Control state | current batch | Records hero completion and CTA scope. |
| `tasks/dynamic-icon-rendering/CHANGE_MANIFEST.md` | Batch manifest | current batch | Records classifications, reviews, and verification. |

## Scope Compliance

- [x] The implementation diff is exactly 12 approved production files and their 12 existing adjacent tests.
- [x] All 24 implementation/test files are in the exact scope allowlist.
- [x] No new files exist outside spec-defined outputs.
- [x] No dependency or lockfile changed.
- [x] The pre-existing `package.json` version-only diff is unchanged and unstaged.
- [x] No new shared abstraction, test harness, or rendering system was created.
- [x] No styling, layout, image/media, slot, action order, children precedence, or form behavior changed.
- [x] Post-change AST audit reports zero raw icon-like JSX children or helper returns in the 12 production files.
- [x] `git diff --check` passed.
- [x] Two independent read-only reviews covered all 12 pairs.

## Review Resolution

- Independent reviews found that collapsed fallback expressions changed empty
  legacy `iconName` values from no output to an empty icon span in two blocks.
  Both now use explicit branches: a non-null custom override passes through
  `DynamicIcon`, otherwise a truthy legacy name passes through `DynamicIcon`,
  otherwise the block renders `null`.
- The dead `hero-simple-centered-image` helper was not deleted or refactored.
  Its adjacent test has one exact-file source assertion for both approved
  `DynamicIcon` boundaries and rejects the two former raw JSX lines.
- The newsletter test's local `Form` boundary is retained for the same focused
  reason as the prior countdown block: the package component does not expose
  component-owned children in this unit environment.

## Test Results

- Focused: 12 files passed, 98 tests passed, exit 0.
- `pnpm type-check`: exit 0.
- Exact scope/allowlist audit: exit 0.
- Dependency/package-baseline audit: exit 0.
- Post-change raw-render AST audit: exit 0.
- New failures: none.
- Pre-existing failures: none observed.

---

# Change Manifest — Remaining Hero Part A

Task: `dynamic-icon-rendering`
Completed: 2026-07-30T15:37:57Z
Files modified: 26 implementation/test files, plus 2 control artifacts
Files created: 0
Files deleted: 0

## Modified Files

| Source and adjacent test | Classification / change | Combined lines +/- | Notes |
|---|---|---:|---|
| `hero-architecture-fullscreen` | Vulnerable direct render | +55/-2 | Leading/trailing manual action icons now use `DynamicIcon`. |
| `hero-billing-platform-logos` | Vulnerable direct render | +84/-4 | Both action layouts now use `DynamicIcon`. |
| `hero-centered-image-grid` | Vulnerable direct render | +92/-4 | Standard and image-overlay action layouts now use `DynamicIcon`. |
| `hero-centered-screenshot` | Vulnerable direct render | +59/-2 | Leading/trailing manual action icons now use `DynamicIcon`. |
| `hero-coming-soon-countdown` | Vulnerable direct render | +51/-4 | Trailing form-action icon now uses `DynamicIcon`; badge icon was already safe. |
| `hero-conversion-video-play` | Vulnerable direct render | +51/-5 | Primary action icons now use `DynamicIcon`; hardcoded play icon remains safe. |
| `hero-dashed-border-features` | Vulnerable direct render | +46/-5 | Manual action icons now use `DynamicIcon`; feature/decorative icons remain safe. |
| `hero-ecommerce-product-showcase` | Vulnerable direct render | +43/-1 | `StatItem.icon` now uses its existing `DynamicIcon` boundary. |
| `hero-fullscreen-logo-cta` | Vulnerable direct render | +46/-2 | Manual action icons now use `DynamicIcon`; logo media is unchanged. |
| `hero-grid-pattern-efficiency` | Vulnerable direct render | +43/-5 | Manual action icons now use `DynamicIcon`. |
| `hero-image-slider` | Vulnerable direct render | +69/-7 | Form-engine `buttonIcon` is explicitly string-capable and its submit label uses `DynamicIcon`. |
| `hero-logo-centered-screenshot` | Vulnerable direct render | +46/-2 | Manual action icons now use `DynamicIcon`; logo/screenshot media is unchanged. |
| `hero-marketplace-scattered-images` | Vulnerable direct render | +45/-2 | Manual action icons now use `DynamicIcon`; tagline icon and image media remain safe. |
| `tasks/dynamic-icon-rendering/.refactor-session.md` | Control state | current batch | Records batch completion and next scope. |
| `tasks/dynamic-icon-rendering/CHANGE_MANIFEST.md` | Batch manifest | current batch | Records classifications, drift checks, and verification. |

## Scope Compliance

- [x] The implementation diff is exactly 13 approved production files and their 13 existing adjacent tests.
- [x] All 26 implementation/test files are in the exact scope allowlist.
- [x] No new files exist outside spec-defined outputs.
- [x] No dependency or lockfile changed.
- [x] The pre-existing `package.json` version-only diff is unchanged and unstaged.
- [x] No new shared abstraction or rendering system was created.
- [x] No styling, layout, image/media, action order, children precedence, or fallback behavior changed.
- [x] Post-change AST audit reports no raw icon-like JSX children or helper returns in the 13 production files.
- [x] `git diff --check` passed.
- [x] Two independent read-only reviews covered all 13 pairs.

## Review Resolution

- A truthiness guard initially added around `hero-image-slider`'s `DynamicIcon`
  was removed so all valid non-string React nodes preserve prior behavior.
- One reviewer questioned the new countdown `Form` mock. It is retained as a
  bounded unit-test boundary because the real package component does not render
  the component-owned child action in this test environment, making the icon
  path otherwise unobservable. The file already mocks the adjacent forms
  integration APIs; no production or package integration behavior changed.

## Test Results

- Focused: 13 files passed, 98 tests passed, exit 0.
- `pnpm type-check`: exit 0.
- Exact scope/allowlist audit: exit 0.
- Dependency/package-baseline audit: exit 0.
- Post-change raw-render AST audit: exit 0.
- New failures: none.
- Pre-existing failures: none observed.
