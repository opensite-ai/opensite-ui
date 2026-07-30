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

# Change Manifest — Retroactive Parity Correction Part B

## Modified Files

| Source and adjacent test | Classification / change | Combined lines +/- | Notes |
|---|---|---:|---|
| `hero-mentorship-video-split` | Empty-string/action parity correction | +56/-2 | Manual leading/trailing icons and complete child replacement are covered. |
| `hero-minimal-centered-dark` | Empty-string parity correction | +20/-1 | Badge icon now preserves raw empty-string behavior. |
| `hero-newsletter-minimal` | Empty-string/action contract correction | +73/-7 | Badge/submit icons are guarded and children replace label plus trailing icon. |
| `hero-pattern-badge-logos` | Empty-string/action parity correction | +64/-2 | Manual action icons preserve raw React-node behavior. |
| `hero-pattern-logo-tech-stack` | Empty-string/action parity correction | +66/-2 | Manual action icons preserve raw React-node behavior. |
| `hero-platform-features-grid` | Fallback/style parity correction | +98/-7 | Action and feature overrides preserve nullish precedence and size 24. |
| `hero-portfolio-creative` | Fallback/style parity correction | +108/-7 | Action and social overrides preserve nullish precedence and size 20. |
| `hero-premium-split-avatars` | Empty-string/action parity correction | +56/-2 | Manual action icons preserve raw React-node behavior. |
| `hero-productivity-launcher-video` | Empty-string/action parity correction | +66/-2 | Manual action icons preserve raw React-node behavior. |
| `hero-simple-centered-image` | Dead-helper source invariant | +9/-4 | The retained unreferenced helper uses the same exact empty-string guard contract. |
| `hero-split-image-newsletter` | Empty-string/action contract correction | +59/-2 | Submit icon is guarded and children replace label plus trailing icon. |
| `hero-split-spiral-shapes` | Empty-string/action parity correction | +66/-2 | Manual action icons preserve raw React-node behavior. |
| `tasks/dynamic-icon-rendering/.refactor-session.md` | Control state | current batch | Records correction completion and CTA part B handoff. |
| `tasks/dynamic-icon-rendering/CHANGE_MANIFEST.md` | Batch manifest | current batch | Records corrected boundaries and verification. |

## Scope Compliance

- [x] The implementation diff is exactly 12 approved production files and their 12 adjacent tests.
- [x] All 24 source/test files are in the exact scope allowlist.
- [x] No new files exist outside spec-defined outputs.
- [x] No dependency or lockfile changed.
- [x] The pre-existing `package.json` version-only diff is unchanged and unstaged.
- [x] No shared abstraction, dependency, or alternate rendering system was introduced.
- [x] All 24 audited boundaries use exact empty-string guards.
- [x] Platform and portfolio preserve nullish fallback precedence and inherited sizes.
- [x] Newsletter action children replace the complete generated composition.
- [x] `git diff --check` passed for the bounded path set.

## Review Resolution

- The same exact empty-string rule is applied to all reachable hero-B
  boundaries and the retained dead helper so the source contract is
  consistent.
- Platform feature and portfolio social overrides remain authoritative for any
  non-null value, including `""`, `false`, and `0`; legacy names are used only
  by their original fallback branches.
- Newsletter action renderers continue intentionally omitting leading icons,
  while `children` now replaces their full generated label/trailing fragment.
- Independent review identified and closed a newsletter test gap: the test now
  rejects both accidental `DynamicIcon` rendering and raw-text rendering of the
  intentionally omitted leading icon.

## Test Results

- Focused: 12 files passed, 111 tests passed, exit 0.
- `pnpm type-check`: exit 0.
- Exact source/test scope and allowlist audit: exit 0.
- Restricted `git diff --check`: exit 0.
- Independent Hero-B focused review: 12 files / 111 tests, exit 0.
- Review-driven newsletter assertion: 1 file / 9 tests, exit 0.
- New failures: none.
- Pre-existing failures: existing video-without-source warnings only.

# Change Manifest — Retroactive Parity Correction Part A

## Modified Files

| Source and adjacent test | Classification / change | Combined lines +/- | Notes |
|---|---|---:|---|
| `components/ui/block-actions` | Empty-string parity correction | +49/-2 | Both shared action icon positions now suppress only `""`; `children` still replaces the complete composition. |
| `hero-announcement-badge` | Test hardening only | +17/-0 | Confirms the existing truthy badge gate preserves empty/false/zero behavior. |
| `hero-badge-image-split` | Empty-string parity correction | +20/-1 | Badge icon uses an exact empty-string guard. |
| `hero-centered-gradient-cta` | Empty-string parity correction | +40/-2 | Feature and badge icon boundaries use exact empty-string guards. |
| `hero-enterprise-security` | Fallback/style parity correction | +80/-7 | Feature and badge overrides preserve fallback suppression, size 24, and the configured color class. |
| `hero-floating-images` | Empty-string parity correction | +20/-1 | Badge icon uses an exact empty-string guard. |
| `hero-image-left-content` | Empty-string parity correction | +20/-1 | Badge icon uses an exact empty-string guard. |
| `hero-startup-launch-cta` | Empty-string parity correction | +20/-1 | Badge icon uses an exact empty-string guard. |
| `hero-stats-social-proof` | Empty-string parity correction | +20/-1 | Badge icon uses an exact empty-string guard. |
| `hero-architecture-fullscreen` | Empty-string/action parity correction | +44/-2 | Manual leading/trailing icons are guarded; complete child replacement is asserted. |
| `hero-billing-platform-logos` | Empty-string/action parity correction | +63/-4 | Both action layouts preserve empty/false/zero and complete child replacement. |
| `hero-centered-image-grid` | Empty-string/action parity correction | +67/-4 | Standard and overlay action layouts preserve React-node and child semantics. |
| `hero-centered-screenshot` | Empty-string/action parity correction | +43/-2 | Manual action icons use exact empty-string guards. |
| `hero-coming-soon-countdown` | Empty-string/action contract correction | +58/-2 | Trailing form icon is guarded and `children` replaces label plus icon. |
| `hero-conversion-video-play` | Empty-string/action parity correction | +46/-2 | Primary action icons preserve raw React-node behavior. |
| `hero-dashed-border-features` | Empty-string/action parity correction | +46/-2 | Manual action icons preserve raw React-node behavior. |
| `hero-ecommerce-product-showcase` | Empty-string parity correction | +22/-1 | Stat icon preserves empty/false/zero behavior. |
| `hero-fullscreen-logo-cta` | Empty-string/action parity correction | +44/-2 | Manual action icons preserve raw React-node behavior. |
| `hero-grid-pattern-efficiency` | Empty-string/action parity correction | +44/-2 | Manual action icons preserve raw React-node behavior. |
| `hero-image-slider` | Empty-string form parity correction | +38/-1 | Form submit icon preserves raw React-node behavior. |
| `hero-logo-centered-screenshot` | Empty-string/action parity correction | +44/-2 | Manual action icons preserve raw React-node behavior. |
| `hero-marketplace-scattered-images` | Empty-string/action parity correction | +44/-2 | Manual action icons preserve raw React-node behavior. |
| `tasks/dynamic-icon-rendering/.refactor-session.md` | Control state | current batch | Records correction completion and next scope. |
| `tasks/dynamic-icon-rendering/CHANGE_MANIFEST.md` | Batch manifest | current batch | Records corrected boundaries and verification. |
| `tasks/dynamic-icon-rendering/OBSERVATIONS.md` | Process observation | current batch | Records the empty-string audit rule for remaining batches. |

## Scope Compliance

- [x] The implementation diff is exactly 21 approved production files and 22 adjacent tests.
- [x] All 43 source/test files are in the exact scope allowlist.
- [x] No new files exist outside spec-defined outputs.
- [x] No dependency or lockfile changed.
- [x] The pre-existing `package.json` version-only diff is unchanged and unstaged.
- [x] No shared abstraction, dependency, or alternate rendering system was introduced.
- [x] Exact `=== ""` guards preserve `false`, `0`, custom nodes, and original fallback operators.
- [x] Inherited feature-icon size/class intent is preserved.
- [x] Action `children` replaces the complete generated composition.
- [x] `git diff --check` passed for the bounded path set.

## Review Resolution

- The CTA review exposed that `DynamicIcon` forwards `""` to the icon package,
  producing icon DOM where a raw React child produced none. Every newly added
  boundary in this correction scope was audited; exact empty-string guards were
  added without truthiness coercion.
- `hero-announcement-badge` already had a correct truthy gate, so only its test
  changed.
- `hero-coming-soon-countdown` now applies the approved `ActionConfig.children`
  replacement contract to the complete generated label and trailing-icon
  fragment.
- Independent pilot/shared review approved all 17 paths with no defects.
- Independent Hero-A review approved all 13 source/test pairs and all 27
  corrected boundaries with no defects.

## Test Results

- Focused: 22 files passed, 213 tests passed, exit 0.
- `pnpm type-check`: exit 0.
- Exact source/test scope and allowlist audit: exit 0.
- Restricted `git diff --check`: exit 0.
- Independent pilot/shared focused review: 9 files / 102 tests, exit 0.
- Independent Hero-A focused review: 13 files / 111 tests, exit 0.
- New failures: none.
- Pre-existing failures: none observed.

# Change Manifest — CTA Part A

## Modified Files

| Source and adjacent test | Classification / change | Combined lines +/- | Notes |
|---|---|---:|---|
| `cta-accent-background` | Vulnerable direct render | +100/-6 | Manual action icons now use `DynamicIcon`; complete action-child replacement is preserved. |
| `cta-app-download-newsletter` | Vulnerable direct render | +231/-12 | App-store, action, and form-submit icons now accept names while retaining platform defaults and sizing. |
| `cta-background-icon-badge` | Vulnerable fallback render | +174/-11 | Badge override and action icons now use `DynamicIcon` with the existing badge dimensions. |
| `cta-case-study-testimonial` | Vulnerable mixed render | +252/-20 | Section, leading, and trailing action icons now resolve dynamically with original fallback and styling intent. |
| `cta-documentation-links` | Vulnerable mixed render | +233/-18 | Link and manual action icons now resolve dynamically; hardcoded chevrons remain unchanged. |
| `cta-enterprise-dark-features` | Vulnerable mixed render | +235/-18 | Feature and manual action icons now resolve dynamically; media remains unchanged. |
| `cta-enterprise-split` | Vulnerable mixed render | +234/-15 | Link and manual action icons now resolve dynamically with complete child replacement. |
| `cta-feature-cards-grid` | Vulnerable direct render | +115/-6 | Feature-card and action icons now use `DynamicIcon`. |
| `cta-feature-checklist` | Vulnerable fallback render | +104/-5 | Checklist icon overrides and legacy names now use `DynamicIcon` without changing fallback precedence. |
| `cta-feature-list` | Vulnerable fallback render | +137/-14 | Feature icon overrides and action icons now use `DynamicIcon`; media remains unchanged. |
| `cta-fullwidth-background` | Vulnerable direct render | +63/-2 | Manual action icons now use `DynamicIcon`. |
| `cta-gradient-logos-floating` | Vulnerable mixed render | +96/-9 | Manual action icons now resolve dynamically; floating logos remain media. |
| `cta-gradient-stats-hero` | Vulnerable mixed render | +131/-13 | Manual action and stat icons now use `DynamicIcon` with original truthiness behavior. |
| `tasks/dynamic-icon-rendering/.refactor-session.md` | Control state | current batch | Records batch completion and the retroactive parity audit. |
| `tasks/dynamic-icon-rendering/CHANGE_MANIFEST.md` | Batch manifest | current batch | Records classifications, semantic corrections, and verification. |

## Scope Compliance

- [x] The implementation diff is exactly 13 approved production files and their 13 existing adjacent tests.
- [x] All 26 implementation/test files are in the exact scope allowlist.
- [x] No new files exist outside spec-defined outputs.
- [x] No dependency or lockfile changed.
- [x] The pre-existing `package.json` version-only diff is unchanged and unstaged.
- [x] No new shared abstraction or rendering system was created.
- [x] No styling, layout, image/media, action order, children precedence, or fallback behavior changed.
- [x] Post-change audit reports no raw icon-like JSX children in the 13 production files.
- [x] Positive empty-icon placeholder expectations are absent.
- [x] `git diff --check` passed.
- [x] Independent semantic reviews covered all 13 source/test pairs.

## Review Resolution

- Empty-string icon overrides retain raw React behavior: they produce no icon
  DOM and continue to suppress or select fallbacks according to each original
  `??`, `||`, or truthy branch. Tests also cover `false`, `0`, custom nodes,
  nullish values, and defaults where those values are accepted.
- In documentation, enterprise-dark, and enterprise-split actions,
  `action.children` replaces the complete generated leading-icon, label, and
  trailing-icon composition. Existing `actionsSlot` replacement remains intact.
- App-store, badge, section, and trailing-arrow string overrides inherit the
  same size and class intent as their prior default/icon-name render paths.

## Test Results

- Focused: 13 files passed, 144 tests passed, exit 0.
- `pnpm type-check`: exit 0.
- Exact 26-file scope/allowlist audit: exit 0.
- Dependency/package-baseline audit: exit 0.
- Post-change raw-render and empty-expectation audits: exit 0.
- `git diff --check`: exit 0.
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

# Change Manifest — CTA Part B

## Modified Files

| Source and adjacent test | Classification / change | Combined lines +/- | Notes |
|---|---|---:|---|
| `cta-hero-feature-cards` | Vulnerable mixed render | +279/-47 | Action and card icons now resolve dynamically with distinct wrapper/selector and first-arrow semantics intact. |
| `cta-image-overlay-arrow` | Vulnerable action fallback | +181/-25 | Leading icon and nullish trailing-arrow override preserve size and hover classes. |
| `cta-image-overlay-centered` | Vulnerable direct render | +139/-3 | Both manual action icon positions now resolve dynamically. |
| `cta-minimal-separator` | Vulnerable direct render | +129/-3 | Both manual action icon positions now resolve dynamically. |
| `cta-newsletter-features` | Vulnerable form/fallback render | +247/-21 | Form submit and feature icons preserve `||`/`??`, default arrow, styles, and intentional omissions. |
| `cta-pattern-background` | Vulnerable direct render | +160/-6 | Manual action icons now resolve dynamically. |
| `cta-platform-demo` | Vulnerable action fallback | +203/-6 | String-label video detection and nullish play fallback remain exact. |
| `cta-simple-centered` | Vulnerable action fallback | +185/-9 | First-action `!iconAfter` default-arrow predicate remains exact. |
| `cta-split-gradient-image` | Vulnerable direct render | +168/-3 | Manual action icons now resolve dynamically; media remains unchanged. |
| `cta-split-image-logos` | Vulnerable action fallback | +170/-10 | First-action arrow fallback and logo media remain exact. |
| `cta-split-image` | Vulnerable direct render | +133/-4 | Manual action icons now resolve dynamically; image media remains unchanged. |
| `cta-stacked-cards` | Vulnerable direct render | +131/-6 | Manual action icons now resolve dynamically. |
| `cta-workflow-tabs` | Vulnerable mixed render | +304/-19 | Action, tab, and stat icons preserve nullish precedence, wrappers, fallbacks, and styling. |
| `tasks/dynamic-icon-rendering/.refactor-session.md` | Control state | current batch | Records CTA completion and pricing handoff. |
| `tasks/dynamic-icon-rendering/CHANGE_MANIFEST.md` | Batch manifest | current batch | Records classifications, reviews, and verification. |

## Scope Compliance

- [x] The implementation diff is exactly 13 approved production files and their 13 adjacent tests.
- [x] All 26 source/test files are in the exact scope allowlist.
- [x] No new files exist outside spec-defined outputs.
- [x] No dependency or lockfile changed.
- [x] The pre-existing `package.json` version-only diff is unchanged and unstaged.
- [x] No shared abstraction, dependency, or alternate rendering system was introduced.
- [x] Exact empty-string guards preserve `false`, `0`, custom nodes, and original fallback predicates.
- [x] Action children and slots retain full replacement semantics.
- [x] Logos, images, CSS media, form boundaries, sizes, and classes are preserved.
- [x] Refined AST audit reports zero simple raw icon-like JSX children/helper returns.
- [x] `git diff --check` passed.

## Review Resolution

- Independent source reviews approved all three implementation groups.
- Reviewers found that exact `queryByText` assertions could miss raw icon text
  adjacent to labels. Tests now make scoped negative text assertions on the
  actual action, feature, tab, and stat containers.
- Split-image-logos and workflow-tabs explicitly prove custom children suppress
  the first-action default arrow when `iconAfter` is omitted.

## Test Results

- Focused: 13 files passed, 117 tests passed, exit 0.
- `pnpm type-check`: exit 0.
- Exact source/test scope and allowlist audit: exit 0.
- Dependency/package-baseline audit: exit 0.
- Restricted `git diff --check`: exit 0.
- Refined raw-render AST audit: 13 files, zero sites.
- New failures: none.
- Pre-existing failures: existing mocked animation-prop warning only.

# Change Manifest — Pricing Part A

## Modified Files

| Source and adjacent test | Classification / change | Combined lines +/- | Notes |
|---|---|---:|---|
| `pricing-addons-cards` | Vulnerable feature/action fallback | +300/-17 | Feature overrides and action icons now resolve dynamically at size 16. |
| `pricing-addons-featured` | Vulnerable feature/action fallback | +300/-17 | Feature overrides and action icons now resolve dynamically at size 16. |
| `pricing-collapsible-plans` | Vulnerable feature/action fallback | +337/-17 | Feature overrides resolve at size 18; static chevron state remains unchanged and covered. |
| `pricing-columns-toggle` | Vulnerable feature/action fallback | +320/-18 | Feature overrides resolve at size 18; toggle/action behavior remains intact. |
| `pricing-comparison-headers` | Vulnerable availability/action fallback | +272/-8 | Availability overrides preserve true/false styling, defaults, and size 18. |
| `pricing-comparison-table` | Vulnerable mixed fallback | +384/-27 | Feature and availability overrides preserve precedence, size 18, and table classes. |
| `pricing-discount-card` | Vulnerable feature/action fallback | +257/-17 | Feature overrides resolve at size 18 with original class merging. |
| `pricing-enterprise-contact` | Vulnerable feature/action fallback | +247/-14 | Feature overrides preserve the existing truthy wrapper and local-only class contract. |
| `pricing-four-tier-toggle` | Vulnerable included/excluded fallback | +258/-6 | Included/excluded overrides preserve conditional styling and size 16. |
| `pricing-full-comparison` | Vulnerable availability/action fallback | +264/-8 | Availability overrides preserve true/false styling and size 18. |
| `pricing-gradient-cards` | Vulnerable feature/action fallback | +262/-6 | Feature overrides resolve at size 18 with original classes. |
| `pricing-icon-headers` | Vulnerable feature/header/action fallback | +282/-7 | Feature and plan-header overrides preserve sizes 18/24 and header wrapper topology. |
| `pricing-minimal-cards` | Vulnerable feature/action fallback | +251/-6 | Feature overrides resolve at size 16 with original shrink/color classes. |
| `tasks/dynamic-icon-rendering/.refactor-session.md` | Control state | current batch | Records pricing-A completion and pricing-B handoff. |
| `tasks/dynamic-icon-rendering/CHANGE_MANIFEST.md` | Batch manifest | current batch | Records classifications, new tests, reviews, and verification. |

## Scope Compliance

- [x] The implementation diff is exactly 13 approved production files and 13 approved new adjacent tests.
- [x] All 26 source/test paths are in the exact scope allowlist.
- [x] No files exist outside spec-defined outputs.
- [x] No dependency or lockfile changed.
- [x] The pre-existing `package.json` version-only diff is unchanged and unstaged.
- [x] No new public consistency props, abstraction, dependency, or rendering system was introduced.
- [x] Exact raw/name/default fallback operators and truthy wrapper topology are preserved.
- [x] Empty strings, `false`, `0`, custom nodes, named/default branches, and inherited styles are covered.
- [x] Action children and slots retain full replacement semantics.
- [x] Refined AST audit reports zero simple raw icon-like JSX children/helper returns.

## Review Resolution

- A proposed enterprise global icon-class prop was rejected; the component
  retains its existing local-only class API.
- Group-one review hardened scoped feature assertions, both action positions,
  duplicated responsive rows, and static chevron state.
- Group-two review added missing trailing-action, custom-node, falsy
  availability, and action edge coverage.
- Independent group-three review approved the implementation and tests without
  behavioral defects; redundant nested named-fallback DynamicIcon elements are
  behaviorally inert and retained to minimize semantic churn.

## Test Results

- Focused: 13 files passed, 55 tests passed, exit 0.
- `pnpm type-check`: exit 0.
- Exact 26-path scope and allowlist audit: exit 0.
- Dependency/package-baseline audit: exit 0.
- Refined raw-render AST audit: 13 files, zero sites.
- Review-focused group runs: 4/17, 4/17, and 5/21 tests passed.
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

# Change Manifest — Pricing Part B

## Modified Files

| Source and adjacent test | Classification / change | Combined lines +/- | Notes |
|---|---|---:|---|
| `pricing-packages-radio` | Vulnerable feature/action fallback | +297/-17 | Feature overrides resolve at size 16; package radio and top-level action slot remain intact. |
| `pricing-popular-highlight` | Vulnerable feature/action fallback | +312/-18 | Feature overrides resolve at size 18; per-plan action slots remain intact. |
| `pricing-radio-toggle` | Vulnerable feature/action fallback | +293/-18 | Feature overrides resolve at size 18; radio/toggle behavior remains intact. |
| `pricing-services-cards` | Vulnerable feature/header/action fallback | +341/-26 | Feature and plan-header icons preserve sizes 18/24 and the original truthy wrapper. |
| `pricing-simple-card` | Vulnerable feature/action fallback | +252/-18 | Feature overrides resolve at size 18; top-level slot remains intact. |
| `pricing-single-card` | Vulnerable feature/action fallback | +250/-18 | Feature overrides resolve at size 16 with original classes. |
| `pricing-spotlight-card` | Vulnerable wrapped feature/action fallback | +212/-17 | Feature overrides preserve the size-14 truthy wrapper and actions outer branch. |
| `pricing-switch-cards` | Vulnerable feature/action fallback | +272/-18 | Feature overrides resolve at size 18; switch and per-plan slots remain intact. |
| `pricing-tabs-toggle` | Vulnerable feature/header/action fallback | +351/-19 | Feature and plan-header icons preserve sizes 18/20, wrappers, tabs, and billing toggle. |
| `pricing-tier-grid` | Vulnerable conditional feature/action fallback | +316/-5 | Feature icons preserve size 16 and featured/nonfeatured classes. |
| `pricing-toggle-cards` | Vulnerable feature/action fallback | +292/-6 | Feature icons resolve at size 18; feature/action slots and toggle remain intact. |
| `pricing-toggle-period` | Vulnerable feature/action fallback | +318/-5 | Feature icons resolve at size 18; per-plan slots and period toggle remain intact. |
| `pricing-two-column-basic` | Vulnerable feature/action fallback | +319/-5 | Feature icons resolve at size 18; per-plan slots and layout remain intact. |
| `tasks/dynamic-icon-rendering/.refactor-session.md` | Control state | current batch | Records pricing completion and features handoff. |
| `tasks/dynamic-icon-rendering/CHANGE_MANIFEST.md` | Batch manifest | current batch | Records classifications, reviews, and verification. |

## Scope Compliance

- [x] The implementation diff is exactly 13 approved production files and 13 adjacent tests.
- [x] Eleven new and two existing test paths are in the exact scope allowlist.
- [x] No files exist outside spec-defined outputs.
- [x] No dependency or lockfile changed.
- [x] The pre-existing `package.json` version-only diff is unchanged and unstaged.
- [x] No new abstraction, dependency, public convenience prop, or rendering system was introduced.
- [x] Exact raw/global/name precedence and truthy wrapper topology are preserved.
- [x] Empty strings, `false`, `0`, custom nodes, named branches, and inherited styles are covered.
- [x] Actions, children, slots, radios, tabs, switches, and period toggles retain prior behavior.
- [x] Refined AST audit reports zero simple raw icon-like JSX children/helper returns.

## Review Resolution

- Services Cards retained its outer truthy plan-header wrapper and gained the
  canonical exact empty guard inside it; numeric-zero behavior is unchanged.
- Group-two review approved Spotlight/Tabs wrapper topology and Radix billing
  interaction; omitted global edge combinations were source-reviewed.
- Group-three review added global-raw-versus-local-name precedence, trailing
  child suppression, and Toggle Cards feature-slot coverage, plus corrected
  only new indentation.

## Test Results

- Focused: 13 files passed, 75 tests passed, exit 0.
- `pnpm type-check`: exit 0.
- Exact 26-path scope and allowlist audit: exit 0.
- Dependency/package-baseline audit: exit 0.
- Refined raw-render AST audit: 13 files, zero sites.
- Review-focused group runs: 5/26, 4/17, and 4/32 tests passed.
- New failures: none.
- Pre-existing failures: none observed.

# Change Manifest — Features

## Modified Files

| Source and adjacent test | Classification / change | Combined lines +/- | Notes |
|---|---|---:|---|
| `feature-badge-grid-six` | Vulnerable truthy icon/action render | +171/-8 | Feature and action strings resolve dynamically at the original size/class boundaries. |
| `feature-bento-image-grid` | Vulnerable truthy icon render | +147/-6 | Feature icons resolve dynamically; iconBadge, avatars, images, and static arrows remain content/media. |
| `feature-bento-utilities` | Vulnerable truthy label-icon render | +109/-5 | Label icons resolve dynamically at size 20; images, badges, and sparkle remain unchanged. |
| `feature-carousel-progress` | Vulnerable truthy icon render | +99/-3 | Slide icons resolve dynamically at size 16 with original wrapper classes. |
| `feature-checklist-image` | Vulnerable nullish icon/action fallback | +229/-21 | Checklist/default and action icons preserve nullish precedence, size 20, and media boundaries. |
| `feature-icon-grid-accent` | Vulnerable nullish icon render | +120/-12 | Selected icons resolve at size 24 while the original truthy wrapper predicate retains numeric-zero topology. |
| `feature-icon-grid-bordered` | Vulnerable truthy icon render | +98/-5 | Feature icons resolve at size 20 with responsive sizing and wrapper classes. |
| `feature-icon-grid-muted` | Vulnerable truthy icon render | +93/-5 | Feature icons resolve at size 24 with local classes. |
| `feature-icon-tabs-content` | Vulnerable tab/action render | +229/-7 | Tab and action icons resolve dynamically; tabs, children, slots, and image media remain exact. |
| `feature-image-cards-three-column` | Vulnerable badge icon render | +151/-2 | Avatar-first badge precedence remains intact; raw/name icons resolve at size 18. |
| `feature-image-overlay-badge` | Vulnerable action render | +139/-2 | Action icons resolve dynamically; images, avatars, badges, and static arrows remain unchanged. |
| `feature-numbered-cards` | Vulnerable checklist/action fallback | +239/-23 | Checklist raw/name/default and action icons preserve nullish semantics and size 16. |
| `feature-pattern-grid-links` | Vulnerable truthy icon render | +127/-17 | Feature icons resolve dynamically at size 24; links and decorative chevrons remain exact. |
| `feature-split-image-reverse` | Vulnerable action render | +142/-7 | Action icons resolve dynamically; image media and slots remain unchanged. |
| `feature-split-image` | Vulnerable action render | +142/-7 | Action icons resolve dynamically; image media and slots remain unchanged. |
| `feature-stats-highlight` | Vulnerable action render | +158/-6 | Action icons resolve dynamically; badge/stat content remains content. |
| `feature-tabbed-content-image` | Vulnerable checklist/action fallback | +323/-18 | Feature raw/name/default and action icons preserve wrappers, Tabs, slots, and image media. |
| `feature-three-column-values` | Vulnerable truthy icon render | +92/-10 | Value icons resolve dynamically at size 24 with the original conditional wrapper. |
| `feature-utility-cards-grid` | Vulnerable label/action render | +251/-18 | Label and learn-more icons resolve dynamically; accent class and Img media remain exact. |
| `tasks/dynamic-icon-rendering/.refactor-session.md` | Control state | current batch | Records features completion and project-detail handoff. |
| `tasks/dynamic-icon-rendering/CHANGE_MANIFEST.md` | Batch manifest | current batch | Records changed and intentionally safe classifications. |

## Reviewed Without Change

- `feature-capabilities-grid` already accepts `ReactNode | string` and routes
  both supported icon paths through `DynamicIcon`.
- `feature-integration-cards.icon` is an intentional logo/image URL consumed by
  `Img`, and `iconSlot` is arbitrary media content; neither is an icon-name
  input.

## Scope Compliance

- [x] Nineteen approved production files and their nineteen existing adjacent tests changed.
- [x] Two additional reviewed source/test pairs were classified safe and remain unchanged.
- [x] All 38 changed paths are in the exact scope allowlist.
- [x] No new files, dependencies, lockfile changes, props, or abstractions were introduced.
- [x] The pre-existing `package.json` version-only diff is unchanged and unstaged.
- [x] Truthy versus nullish selection, wrapper topology, sizes, classes, actions, children, and slots are preserved.
- [x] Icon-like content/media props, Img/Avatar paths, badges, stats, and decorative icons remain excluded.
- [x] Refined AST audit reports zero direct raw icon-like JSX children/helper returns.

## Review Resolution

- Three independent reviews approved all changed groups without production
  defects.
- Tests use scoped raw-text assertions and cover valid names, custom elements,
  empty strings, `false`, `0`, fallbacks, wrappers, actions, slots, and media
  boundaries.
- `feature-capabilities-grid` and `feature-integration-cards` were explicitly
  verified as unchanged safe classifications.

## Test Results

- Focused: 19 files passed, 186 tests passed, exit 0.
- `pnpm type-check`: exit 0.
- Exact 38-path scope and allowlist audit: exit 0.
- Dependency/package-baseline audit: exit 0.
- Refined direct raw-render AST audit: 19 files, zero sites.
- Review-focused group runs: 6/77, 6/44, and 7/65 tests passed.
- New failures: none.
- Pre-existing failures: none observed.

# Change Manifest — Project Detail

## Modified Files

| Source and adjacent test group | Classification / change | Notes |
|---|---|---|
| `architecture-carousel`, `card-header`, `case-study-prose`, `compact-metadata`, `exhibition-sidebar`, `fashion-editorial`, `fullscreen-hero` | Vulnerable manual `ActionConfig` renderers | Both leading and trailing action icons now resolve through `DynamicIcon` inside the existing `children ??` composition. |
| `grid-gallery`, `hero-metadata`, `hover-gallery`, `large-hero-featured`, `list-related`, `mask-reveal`, `minimal-centered` | Vulnerable manual `ActionConfig` renderers | Exact empty-string guards preserve the prior ReactNode sentinel behavior while string icon names resolve dynamically. |
| `numbered-sections`, `parallax-scroll`, `sculpture-showcase`, `sidebar-navigation`, `split-materials`, `tabbed-case-study` | Vulnerable manual `ActionConfig` renderers | Action ordering, Pressable behavior, slots, media, and the already-safe tabbed tool icon remain unchanged. |

All 20 matching adjacent test files were extended with flexible
`DynamicIcon` mocks and focused string/custom/empty/`false`/`0`/`children`
coverage.

## Scope Compliance

- 20 production files and 20 adjacent tests changed within the approved
  allowlist.
- Production changes are limited to `DynamicIcon` imports and guarded
  `icon`/`iconAfter` rendering.
- Media, gallery, lightbox, animation, Pressable props/classes, and fixed
  decorative icons are unchanged.
- The only reported out-of-allowlist working-tree path remains the pre-existing
  user-owned `package.json` version bump, which was not touched or staged.

## Review Resolution

- Three independent cross-reviews approved production semantics across all
  groups.
- One review found seven incorrectly rooted `Pressable` mocks in group 1; the
  test-only paths were corrected and the affected suites rerun.
- The final AST audit found zero direct raw icon JSX children.

## Test Results

- Focused category run: 22 files passed, 191 tests passed, exit 0.
- Review-focused group runs: 7/55, 7/75, and 6/49 tests passed.
- `pnpm type-check`: exit 0.
- `git diff --check`: exit 0.
- Exact allowlist audit: only the known user-owned `package.json` diff reported.
- New failures: none.
- Pre-existing failures: none observed.

# Change Manifest — Services List

## Modified Files

| Source and adjacent test group | Classification / change | Notes |
|---|---|---|
| `accordion`, `cards-hover`, `centered-icons`, `feature-spotlight`, `featured-highlight` | Vulnerable truthy custom-icon/name helpers | Explicit `ReactNode | string` contracts now route the resolved icon through `DynamicIcon` with the original sizes and wrappers. |
| `icon-grid`, `masonry`, `minimal-grid`, `muted-cards`, `pricing-grid` | Vulnerable truthy custom-icon/name helpers | `icon || iconName` precedence and conditional versus persistent wrapper topology remain exact. |
| `progress-sidebar`, `timeline`, `two-column-grid`, `vertical-tags`, `video-showcase` | Vulnerable truthy custom-icon/name helpers | Existing fallback classes, slots, actions, media/video fields, and fixed decorative icons remain unchanged. |

All 15 matching adjacent tests now use flexible `DynamicIcon` mocks and cover
string names, custom nodes, `iconName` fallback, empty strings, `false`, `0`,
wrapper topology, slots, fixed icons, and media/action boundaries.

## Scope Compliance

- 15 production files and 15 adjacent tests changed within the approved
  allowlist.
- Production diffs contain only explicit icon type widening and resolved-icon
  routing through `DynamicIcon`.
- Fixed checklist, arrow, clock, chevron, image, and video boundaries are
  unchanged.
- The only reported out-of-allowlist working-tree path remains the pre-existing
  user-owned `package.json` version bump, which was not touched or staged.

## Review Resolution

- Three independent cross-reviews approved all production semantics.
- A mid-edit Timeline test topology assertion was corrected before the final
  category run.
- Review found a newly introduced video mock that did not forward the
  component ref; the test-only mock now uses `React.forwardRef` and attaches
  the ref.
- The final AST audit found zero direct raw icon helper returns or JSX children.

## Test Results

- Focused category run: 27 files passed, 75 tests passed, exit 0.
- Review-focused group runs: 5/25, 5/18, and 5/20 tests passed.
- `pnpm type-check`: exit 0.
- `git diff --check`: exit 0.
- One unchanged Feature Spotlight motion mock continues to emit its pre-existing
  forwarded-prop warning; no new warnings remain.
- New failures: none.

# Change Manifest — Navbars

## Reviewed Without Change

| Review group | Files | Classification |
|---|---|---|
| Centered through enterprise | `centered-menu`, `dark-icons`, `dropdown-menu`, `education-platform`, `enterprise-mega` | All configurable nested, link, action, and specialized mega-menu icons already use `DynamicIconName` and `DynamicIcon`. |
| Icon links through sidebar | `icon-links`, `image-preview`, `multi-column-groups`, `search-focused`, `sidebar-mobile` | All rendered desktop/mobile icon paths are dynamic; image previews, logos, and slots remain intentional media/ReactNode boundaries. |
| Split through overlay | `split-cta`, `sticky-compact`, `tabbed-sections`, `transparent-overlay` | Submenu, tab, link, social, and action icons already route through dynamic/shared icon renderers. |

## Scope Compliance

- 14 production files were reviewed; zero production or adjacent test files
  required modification.
- Local navbar icon declarations use `DynamicIconName`; shared
  `ActionConfig.icon` and `iconAfter` use `ReactNode | string`.
- Desktop/mobile rendering, fixed controls, `NavbarLogo`, `Img`, slots, and
  action `children` precedence were inspected separately.
- Unrelated navbar parity gaps were recorded in `OBSERVATIONS.md` and left
  outside this refactor.

## Review Resolution

- Three independent reviewers classified all 14 files as safe.
- The refined AST audit found zero direct raw configurable-icon JSX children or
  helper returns.
- No missing adjacent tests were created because no source contract changed.

## Test Results

- Existing navbar category run: 7 files passed, 90 tests passed, exit 0.
- `pnpm type-check`: exit 0 with the same production source state.
- New failures: none.

# Change Manifest — Banner and Blog

## Modified Files

| Source and adjacent test group | Classification / change | Notes |
|---|---|---|
| `announcement-dismissible`, `delivery-countdown`, `event-promo`, `floating-offer`, `gdpr-rights`, `privacy-notice` | Vulnerable helper/action renders | Main and dismiss helpers preserve truthy fallback precedence; manual actions use exact empty-string guards. |
| `promo-cta`, `social-follow`, `survey-incentive`, `cards-read-time`, `cards-tagline-cta`, `category-overlay` | Vulnerable helper/action renders | Public icon props are explicit where local; action composition, slots, social/form/content boundaries, and fixed icons remain exact. |
| `filtered-results`, `grid-author-cards`, `grid-nine-posts`, `horizontal-cards`, `related-articles`, `tech-insights` | Vulnerable manual `ActionConfig` renders | Both icon positions resolve dynamically inside unchanged `children ??` composition; filtering, pagination, and post media remain untouched. |

All 18 adjacent tests were expanded with flexible mocks and scoped assertions
for string names, custom nodes, empty strings, `false`, `0`, `children`, slots,
dismissal, filtering, pagination, content, and media boundaries.

## Scope Compliance

- 18 production files and 18 adjacent tests changed within the approved
  allowlist.
- Production diffs are limited to `DynamicIcon` imports, explicit local icon
  types, helper routing, and guarded manual-action icon rendering.
- Forms, countdowns, filters, pagination, images, authors, tags, legal links,
  fixed icons, and callbacks are unchanged.
- The pre-existing uncontrolled `BannerFloatingOffer` dismissal issue is
  documented in `OBSERVATIONS.md` and intentionally not changed.
- The only out-of-allowlist working-tree path remains the user-owned
  `package.json` version bump.

## Review Resolution

- Three independent cross-reviews approved all production semantics.
- Review corrected 20 test-only HTMLElement narrowing errors, six incorrectly
  rooted `Pressable` mocks, and unreliable exact-text raw-icon assertions.
- Final AST inspection reports zero direct raw configurable-icon JSX children
  or helper returns.

## Test Results

- Focused category run: 22 files passed, 94 tests passed, exit 0.
- Review-focused group runs: 6/35, 6/21, and 6/27 tests passed.
- `pnpm type-check`: exit 0.
- `git diff --check`: exit 0.
- New failures: none.

# Change Manifest — Stats, Service Detail, Process, About, and Testimonials

## Modified Files

| Review group | Changed / reviewed files | Classification / change |
|---|---|---|
| About and process | Changed `company-profile`, `startup-team`, `story-expertise`, `icon-timeline`, `numbered-services`, `scroll-image`; reviewed `expandable-values` unchanged | Action/social/iconSlot boundaries now resolve dynamically; Story Expertise required an explicit string-capable contract only. |
| Process and service detail | Changed `process-steps-grid` plus all five service-detail review files | Semantic iconSlot/custom overrides route through `DynamicIcon`; documented image-URL icon fields remain on `Img`. |
| Stats and testimonials | Changed all six stats review files plus `testimonials-stats-header` | iconSlot and manual action boundaries resolve dynamically while named icons, avatars, growth arrows, stars, and slots retain existing behavior. |

Nineteen matching adjacent tests were extended with flexible mocks and
string/custom/empty/`false`/`0`/fallback/children/slot/media coverage.

## Reviewed Without Change

- `about-expandable-values` already uses flexible dynamic icon types/rendering
  and delegates actions to the shared safe action renderer.

## Scope Compliance

- 19 production files and 19 adjacent tests changed within the 20-file approved
  review batch.
- Public semantic icon and iconSlot contracts explicitly accept
  `ReactNode | string`.
- Image URLs, avatars, logos, service imagery, fixed stars/arrows/checks,
  counters, timelines, wrappers, and action/section slots are unchanged.
- The only out-of-allowlist working-tree path remains the user-owned
  `package.json` version bump.

## Review Resolution

- Three independent reviews approved production semantics.
- Review corrected required `description`/`growth` test fixtures, hardened
  eight raw-icon assertions, and found 17 public iconSlot contracts plus one
  Story Expertise icon contract requiring explicit string support.
- Comprehensive AST inspection found one expected resolved `iconContent`
  expression and zero direct raw configurable-icon values.

## Test Results

- Focused category run: 70 files passed, 420 tests passed, exit 0.
- Review-focused group runs: 7/66, 6/24, and 7/59 tests passed.
- `pnpm type-check`: exit 0.
- `git diff --check`: exit 0.
- New failures: none.

# Change Manifest — Carousel, Link Page, Resource Detail, Logos, List, and Project List

## Modified Files

| Review group | Changed files | Classification / change |
|---|---|---|
| Carousel and link page | Five carousel blocks and five link-page blocks | Configurable direct, fallback, trailing, social-link, and manual-action icon boundaries now resolve through `DynamicIcon` while retaining their original predicates and composition. |
| List and logos | Three list blocks and three logo blocks | Dedicated icon contracts and manual action renderers now accept and resolve icon API strings without changing fixed status icons, logos, or media. |
| Project list and resource detail | Two project-list blocks and three resource-detail blocks | Project, back, feature, resource-type, download-options, share, and action icons now use flexible contracts and dynamic rendering with existing fallback precedence. |

Twenty-one matching adjacent tests were extended or added. The two project-list
tests are spec-authorized new adjacent suites.

## Scope Compliance

- 21 production files and 21 adjacent tests changed within the approved
  21-file / 42-total-file batch.
- Public dedicated icon contracts explicitly accept strings and custom React
  nodes where they previously accepted only React nodes.
- Empty strings, `false`, `0`, nullish/default fallbacks, action `children`,
  wrappers, sizes, classes, ordering, images, logos, social rendering, fixed
  controls, and media paths preserve their prior behavior.
- The only out-of-allowlist working-tree path remains the user-owned
  `package.json` version bump.

## Review Resolution

- Three independent group reviews approved all production semantics.
- Review found and corrected test-only coverage gaps for resource-detail
  dedicated icons and custom leading/trailing download-action icons.
- Final AST and contract inspection reports zero ReactNode-only dedicated icon
  contracts and zero direct raw configurable-icon render boundaries in the
  batch.

## Test Results

- Focused category run: 42 files passed, 240 tests passed, exit 0.
- Review-focused group runs: 7/40, 7/52, and 7/32 tests passed.
- `pnpm type-check`: exit 0.
- `git diff --check`: exit 0.
- New failures: none.

# Change Manifest — Final Invariant Batch

## Modified Files

| Review group | Changed / reviewed files | Classification / change |
|---|---|---|
| Article and case studies | Changed four article blocks, one case-studies-list block, and two case-study-detail blocks | Manual actions, back/solution icons, metrics, and outcome overrides now resolve dynamically with existing fallback and composition semantics. |
| Gallery, contact, and comparison | Changed two gallery blocks, `contact-floating-banner`, and `comparison-metrics-rows` | Manual leading/trailing actions and the dedicated banner icon now resolve through `DynamicIcon`. |
| UI helpers | Changed `bento-grid` and `social-link-icon`; reviewed `block-actions` and `navbar-mega-menus` unchanged | Public contracts are explicitly flexible; every configurable UI-helper render path crosses `DynamicIcon`. |
| Audit correction | Changed one CTA, two FAQ, two hero, and `feature-integration-cards` | Six inventory omissions and one incorrectly classified custom icon slot now follow the approved contract; image URL icons remain on `Img`. |
| Shared contract | Changed `src/types/blocks.ts` | Navigation, social, detail, and outcome icon fields explicitly accept strings and custom React nodes. |

Twenty component production files changed; two UI helpers were reviewed without
production changes. Twenty-one adjacent tests plus the permanent invariant
guard were added or extended.

## Scope Compliance

- The corrected batch contains 22 production/source files and 22 test files,
  below the 25-production / 50-total-file limits.
- The allowlist now contains 234 production components, 234 canonical adjacent
  tests, the permanent guard, the shared type file, generated artifacts, and
  controls.
- Fixed/decorative icons, image URLs, media, actions, navigation, forms,
  wrappers, ordering, classes, sizes, fallbacks, slots, and state remain
  unchanged outside the minimum icon boundary substitution.
- The only unrelated working-tree path remains the user-owned `package.json`
  version bump.

## Review Resolution

- Independent reviews found no production semantic defects.
- Review corrected one weak `BlockActions` no-raw assertion and expanded the
  guard to compound `...IconName`, `...IconSlot`, and `iconNameOverride`
  identifiers.
- The bounded 146-line AST guard is intentionally larger than the preferred
  50-line target because a smaller text check missed conditional branches and
  helper returns. It uses nine explicit pre-resolved-value exemptions and
  avoids general data-flow analysis.
- The final contract scan reports zero ReactNode-only dedicated icon
  declarations.

## Test Results

- Combined changed-test run: 22 files passed, 108 tests passed, exit 0.
- Review-focused runs: 8/47 and 10/40 tests passed.
- Permanent invariant guard: 1 file / 1 test passed, exit 0.
- `pnpm type-check`: exit 0.
- `git diff --check`: exit 0.
- New failures: none.
