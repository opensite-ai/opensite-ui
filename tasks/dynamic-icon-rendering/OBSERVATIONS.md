# Dynamic Icon Rendering Refactor Observations

No unresolved out-of-scope issues or approval-requiring ambiguities remain.

Record unrelated defects, possible abstractions, and other non-spec work here
without modifying them.

## 2026-07-30 Pilot Process Note

A focused-test subprocess briefly wrote its captured output to a repo-root
`tmp.*` file. The scope guard caught it immediately, its creating agent
confirmed provenance, and it was removed before the pilot gate. No source,
dependency, generated, or committed scope drift resulted, and later commands
were run without repo-local temporary files.

## 2026-07-30 Empty-String Parity Audit

CTA part A review established that `DynamicIcon` intentionally forwards every
string, including `""`, to the icon package. A raw React child previously
rendered `""` as no DOM, so an unconditional migration can create an empty
loading/error icon span even when non-empty names work correctly.

The already committed shared and hero batches were therefore re-audited before
continuing to CTA part B. Corrections use an exact `value === ""` guard at each
new boundary, preserving `false`, `0`, custom React nodes, and the original
nullish/truthy fallback precedence. The audit also checks inherited icon
size/class intent and the approved full-composition `ActionConfig.children`
replacement contract.

## 2026-07-30 Navbar Non-Icon Contract Observations

The navbar icon audit classified all 14 review files as already safe for
string-based icon rendering. It also found unrelated desktop/mobile behavior
asymmetries that were intentionally left unchanged:

- `navbar-centered-menu` and `navbar-dropdown-menu` declare icons on top-level
  menu items but only render them for submenu items.
- `navbar-icon-links` mobile auth actions omit the desktop
  `authActionsSlot`, `children`, and trailing-icon composition.
- `navbar-search-focused` uses a truthy navigation-slot fallback on desktop and
  a nullish fallback on mobile, so `false`, `0`, and `""` behave differently.

None of these paths renders an icon name as raw text, so changing them would
expand this refactor beyond its approved contract.

## 2026-07-30 Pre-existing Floating Offer Dismissal

`BannerFloatingOffer` has a pre-existing uncontrolled-state issue unrelated to
icon rendering. After the default banner dismisses itself, its synchronization
effect compares an undefined `defaultOpen` with the new `internalOpen` value
and resets the state to the original open value. The controlled `open` path
works and remains covered.

This behavior exists at the batch baseline and was not changed because fixing
component state would expand the approved icon contract.

## 2026-07-30 Permanent Guard Inventory Correction

The permanent AST guard exposed six direct renderers omitted by the original
research inventory: one CTA, two FAQ, two hero, and one case-study-detail
component. It also corrected `feature-integration-cards`: its `icon` remains an
image URL rendered by `Img`, while its custom `iconSlot` now follows the
approved dynamic icon contract. All seven corrections satisfy the original
in-scope rules and keep the final batch below the 25-production / 50-total-file
limits.

The reliable guard is 146 lines rather than the spec's preferred sub-50-line
target. A smaller text-pattern check missed nullish/truthy branches, compound
`...IconName` and `...IconSlot` identifiers, and helper returns. The final test
is still bounded to the approved source directories, uses nine explicit
file-and-value exemptions for pre-resolved JSX, ignores JSX attributes and
image/media fields, and intentionally avoids general data-flow analysis.
