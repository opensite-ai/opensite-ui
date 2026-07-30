# Dynamic Icon Rendering Refactor Observations

No out-of-scope issues or approval-requiring ambiguities have been observed.

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
