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
