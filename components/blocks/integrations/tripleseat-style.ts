/**
 * Scoped branding CSS for the TripleSeat embedded lead form.
 *
 * The prototype this is ported from (see
 * `docs/component-library/recon/RECON-tripleseat-prod.md` §2) shipped ~450 lines
 * of hand-written `globals.css` with the brand's hex values baked in. That does
 * not work for a multi-tenant platform: the block has to look like the site it
 * lands on, and it must do so WITHOUT fetching `website_style_guides` at render
 * time (the vars are already on the page — RECON-render-primitives §5).
 *
 * Two runtime facts drive the design here:
 *
 * 1. **Colour-var format is per-site.** Older sites are served a Tailwind bundle
 *    whose colour vars are *bare HSL triplets* (`--primary: 36 90% 54%`), so the
 *    only valid reference is `hsl(var(--primary))`. Newer sites store complete
 *    colours (`oklch(...)`, `hsl(...)`, `#hex`), where `var(--primary)` is itself
 *    a colour. We detect the format once at mount and emit the right form.
 * 2. **The stylesheet is safelist-compiled, not JIT.** Arbitrary Tailwind
 *    variants targeting third-party DOM would simply have no rule on a live
 *    site, so all branding is emitted as plain CSS in an injected `<style>`.
 *
 * Alpha variants use `color-mix(in srgb, X <p>%, transparent)` rather than raw
 * RGB triplets, because we never have the channels — only an opaque colour
 * expression.
 */

/** Class applied to the block's embed container; every rule is scoped under it. */
export const TRIPLESEAT_SCOPE_CLASS = "os-tripleseat";

/**
 * Class applied to `<body>` while at least one instance is mounted. jQuery-UI
 * portals the datepicker and the time-select popup to `<body>`, outside our
 * container, so those rules cannot be container-scoped. Gating them behind a
 * body marker keeps them from leaking on pages/routes with no TripleSeat form.
 */
export const TRIPLESEAT_BODY_MARKER_CLASS = "os-tripleseat-active";

/**
 * `36 90% 54%` / `36deg 90% 54%` / `36 90% 54% / 40%` — a bare HSL component
 * list, which is only usable wrapped in `hsl()`. Anything containing `(` or `#`
 * (i.e. `oklch(...)`, `hsl(...)`, `#009b72`) is already a complete colour.
 */
const BARE_HSL_TRIPLET =
  /^-?[\d.]+(?:deg)?\s+[\d.]+%\s+[\d.]+%(?:\s*\/\s*[\d.]+%?)?$/;

/** True when the computed value must be wrapped in `hsl()` to be a colour. */
export function isBareHslTriplet(value: string): boolean {
  return BARE_HSL_TRIPLET.test(value.trim());
}

/** Alpha without channel access: `color-mix` works on any colour expression. */
export function withAlpha(color: string, percent: number): string {
  return `color-mix(in srgb, ${color} ${percent}%, transparent)`;
}

export interface TripleseatThemeTokens {
  fontFamily: string;
  foreground: string;
  mutedForeground: string;
  primary: string;
  primaryForeground: string;
  inputBorder: string;
  inputBackground: string;
  surface: string;
  surfaceForeground: string;
  destructive: string;
  ring: string;
  radius: string;
}

/**
 * Fallbacks are inheritable/neutral or system colours: an unthemed page must
 * still be legible. `primary`/`primaryForeground` are a guaranteed-contrast
 * SYSTEM PAIR (`canvastext` on `canvas`) rather than `currentColor`/`canvas` —
 * the submit CTA paints `background-color: primary` and `color:
 * primaryForeground` on the same element, and `currentColor` there resolves to
 * that element's own colour, i.e. an invisible label on an invisible box.
 *
 * These are never baked in on their own: `pick()` emits them as the IN-CSS
 * fallback of a `var()` reference so a late stylesheet still takes over.
 */
const FALLBACKS: TripleseatThemeTokens = {
  fontFamily: "var(--font-sans, inherit)",
  foreground: "currentColor",
  mutedForeground: "currentColor",
  primary: "canvastext",
  primaryForeground: "canvas",
  inputBorder: "currentColor",
  inputBackground: "transparent",
  surface: "canvas",
  surfaceForeground: "canvastext",
  destructive: "#cd4343",
  ring: "currentColor",
  radius: "var(--radius, 0.375rem)",
};

/**
 * Custom properties whose presence means the site's own stylesheet has landed.
 * On customer-sites the colour vars live ONLY in the async per-site CDN bundle
 * (`#dt-tailwind`), so "absent" at mount usually means "not here YET".
 */
const THEME_READINESS_TOKENS = ["--primary", "--foreground", "--background"];

/**
 * Reader for a single element's custom properties. `getComputedStyle` is called
 * once per derivation, not once per token.
 */
function tokenReader(el: Element | null): (name: string) => string {
  if (!el) return () => "";
  const computed =
    typeof globalThis.getComputedStyle === "function"
      ? globalThis.getComputedStyle(el)
      : null;
  return (name: string): string => {
    const fromComputed = computed?.getPropertyValue(name) ?? "";
    if (fromComputed.trim()) return fromComputed.trim();
    // Engines (and jsdom) that do not cascade custom properties into
    // getComputedStyle still expose inline declarations on the element.
    const inline = (el as HTMLElement).style?.getPropertyValue(name) ?? "";
    return inline.trim();
  };
}

/**
 * True once the host's design tokens are actually resolvable. Callers re-derive
 * the stylesheet until this flips, because the format of a var (bare HSL triplet
 * vs complete colour) can only be detected from a value that exists.
 */
export function hasResolvedThemeTokens(element?: Element | null): boolean {
  const el =
    element ?? (typeof document !== "undefined" ? document.documentElement : null);
  if (!el) return false;
  const raw = tokenReader(el);
  return THEME_READINESS_TOKENS.some((name) => raw(name) !== "");
}

/**
 * Read the page's own design tokens and turn each one into a CSS expression that
 * is valid on this site vintage. Never fetches anything.
 */
export function readTripleseatTheme(
  element?: Element | null,
): TripleseatThemeTokens {
  const el =
    element ?? (typeof document !== "undefined" ? document.documentElement : null);
  if (!el) return { ...FALLBACKS };
  const raw = tokenReader(el);

  /** First var that resolves wins; each is wrapped per its own format. */
  const pick = (names: string[], fallback: string): string => {
    for (const name of names) {
      const value = raw(name);
      if (!value) continue;
      return isBareHslTriplet(value) ? `hsl(var(${name}))` : `var(${name})`;
    }
    // Unresolved AT READ TIME. Emitting the resolved literal would freeze the
    // block unbranded for the whole page view, because the per-site stylesheet
    // is async and lands after React mounts. Emit a var() reference with the
    // neutral literal as its IN-CSS fallback instead: a late stylesheet whose
    // vars are complete colours recovers with no JS at all, and the bare-HSL
    // vintage (which needs hsl() wrapping) is recovered by re-deriving once the
    // tokens resolve — see `hasResolvedThemeTokens`.
    const [first] = names;
    return first ? `var(${first}, ${fallback})` : fallback;
  };

  const foreground = pick(["--foreground"], FALLBACKS.foreground);

  return {
    fontFamily: FALLBACKS.fontFamily,
    foreground,
    mutedForeground: pick(["--muted-foreground"], foreground),
    primary: pick(["--primary"], FALLBACKS.primary),
    primaryForeground: pick(
      ["--primary-foreground"],
      FALLBACKS.primaryForeground,
    ),
    inputBorder: pick(["--input", "--border"], withAlpha(foreground, 22)),
    inputBackground: withAlpha(foreground, 4),
    surface: pick(["--popover", "--card", "--background"], FALLBACKS.surface),
    surfaceForeground: pick(
      ["--popover-foreground", "--card-foreground", "--foreground"],
      FALLBACKS.surfaceForeground,
    ),
    destructive: pick(["--destructive"], FALLBACKS.destructive),
    ring: pick(["--ring", "--primary"], FALLBACKS.ring),
    radius: FALLBACKS.radius,
  };
}

const SCOPE = `.${TRIPLESEAT_SCOPE_CLASS}`;
const BODY = `body.${TRIPLESEAT_BODY_MARKER_CLASS}`;

/**
 * TripleSeat renders either `#tripleseat_embed_form` or
 * `#tripleseat_embed_form_inline`. The id-bearing selectors carry the
 * specificity needed to beat the vendor's own rules; the bare container scope is
 * a forward-compatible fallback if the vendor ever changes those ids.
 */
const FORM_BASES = [
  `${SCOPE} #tripleseat_embed_form`,
  `${SCOPE} #tripleseat_embed_form_inline`,
  SCOPE,
];

const sel = (...suffixes: string[]): string =>
  FORM_BASES.flatMap((base) =>
    suffixes.map((suffix) => (suffix ? `${base} ${suffix}` : base)),
  ).join(",\n");

/**
 * Build the full scoped stylesheet for a set of resolved tokens.
 *
 * Deliberate deviations from the prototype CSS:
 * - `.errorExplanation`, `#tripleseat_link` and the datepicker *input* rules were
 *   unscoped (`body …`) in the prototype and leaked site-wide; here they are
 *   container-scoped. Only the genuinely body-portaled jQuery-UI panels stay
 *   global, behind the body marker class.
 * - The select arrow was a data-URI with `fill='%23c9a876'` baked in — impossible
 *   to theme. Replaced with a two-gradient chevron drawn in `currentColor`.
 * - Every brand literal (9 repeats of a hardcoded font stack, 5 raw rgba
 *   triplets, the gold/cream/charcoal palette) is now a token.
 */
export function buildTripleseatCss(tokens: TripleseatThemeTokens): string {
  const t = tokens;
  return `
${sel("")} {
  font-family: ${t.fontFamily} !important;
  color: ${t.foreground} !important;
  width: 100% !important;
  max-width: 100% !important;
  min-width: 0;
  box-sizing: border-box !important;
  overflow-wrap: anywhere;
}

${sel("h2")} {
  font-family: ${t.fontFamily} !important;
  font-size: 1.25rem !important;
  font-weight: 600 !important;
  color: ${t.primary} !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
  margin-bottom: 1.5rem !important;
  padding-bottom: 0.75rem !important;
  border-bottom: 1px solid ${withAlpha(t.primary, 30)} !important;
}

${sel(".row_details_header h2", ".row_contact_header h2")} {
  padding-top: 1rem !important;
}

${sel("label")} {
  font-family: ${t.fontFamily} !important;
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  color: ${t.foreground} !important;
  margin-bottom: 0.5rem !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
}

${sel("label em")} {
  display: block;
  margin-top: 0.25rem;
  color: ${t.mutedForeground} !important;
  font-size: 0.75rem;
  font-style: normal;
  letter-spacing: normal;
  text-transform: none;
}

${sel("label span.required")} {
  color: ${t.primary} !important;
}

${sel("input", "textarea", "select")} {
  font-family: ${t.fontFamily} !important;
  font-size: 1rem !important;
  color: ${t.foreground} !important;
  background-color: ${t.inputBackground} !important;
  border: 1px solid ${t.inputBorder} !important;
  border-radius: ${t.radius} !important;
  padding: 0.75rem 1rem !important;
  width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
  transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
}

${sel("input:focus", "textarea:focus", "select:focus")} {
  outline: none !important;
  border-color: ${t.primary} !important;
  box-shadow: 0 0 0 3px ${withAlpha(t.ring, 30)} !important;
}

${sel("input::placeholder", "textarea::placeholder")} {
  color: ${withAlpha(t.foreground, 58)} !important;
  font-style: italic !important;
}

/* Select indicator: two half-square gradients form a chevron. Uses
   currentColor, so it follows the theme — a data-URI cannot. */
${sel("select")} {
  appearance: none !important;
  -webkit-appearance: none !important;
  background-image:
    linear-gradient(45deg, transparent 50%, currentColor 50%),
    linear-gradient(135deg, currentColor 50%, transparent 50%) !important;
  background-position: right 1.15rem center, right 0.8rem center !important;
  background-size: 6px 6px, 6px 6px !important;
  background-repeat: no-repeat !important;
  padding-right: 2.5rem !important;
}

${sel("input.error", ".location_list.error")} {
  background-color: ${withAlpha(t.destructive, 12)} !important;
  border-color: ${t.destructive} !important;
}

${sel(".errorExplanation", "#errorExplanation")} {
  background-color: ${withAlpha(t.destructive, 10)} !important;
  border: 1px solid ${t.destructive} !important;
  border-radius: ${t.radius} !important;
  padding: 1rem !important;
  margin-bottom: 1.5rem !important;
}

${sel(".errorExplanation h2", "#errorExplanation h2")} {
  color: ${t.destructive} !important;
  font-size: 1rem !important;
  margin-bottom: 0.5rem !important;
  border: none !important;
  padding: 0 !important;
}

${sel(".errorExplanation li", "#errorExplanation li")} {
  color: ${t.foreground} !important;
}

${sel("table")} {
  width: 100% !important;
  max-width: 100% !important;
  table-layout: fixed !important;
  border-collapse: separate !important;
  border-spacing: 0 0.75rem !important;
}

${sel("table td")} {
  padding: 0.5rem 0 !important;
  vertical-align: top !important;
  min-width: 0 !important;
  overflow-wrap: anywhere;
}

${sel(".tripleseat_field_section")} {
  margin-bottom: 1.5rem !important;
}

${sel(".tripleseat_field")} {
  margin-right: 1rem !important;
  margin-bottom: 1rem !important;
}

/* Submit CTA. --button-* vars are normalized to valid colours on BOTH site
   vintages, so they are preferred over the raw colour tokens. */
${sel(
  ".button",
  'input[type="submit"]',
  "button",
  "#lead_form_submit button",
)} {
  font-family: var(--button-font-family, ${t.fontFamily}) !important;
  font-size: 0.875rem !important;
  font-weight: var(--button-font-weight, 600) !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
  background-color: var(--button-default-bg, ${t.primary}) !important;
  color: var(--button-default-fg, ${t.primaryForeground}) !important;
  border: var(--button-default-border-width, 0px) solid
    var(--button-default-border, transparent) !important;
  border-radius: var(--button-radius, ${t.radius}) !important;
  padding: 0.875rem 2rem !important;
  cursor: pointer !important;
  transition: background-color 0.2s ease, transform 0.1s ease !important;
  min-width: 200px !important;
}

${sel(
  ".button:hover",
  'input[type="submit"]:hover',
  "button:hover",
  "#lead_form_submit button:hover",
)} {
  background-color: var(
    --button-default-hover-bg,
    ${withAlpha(t.primary, 85)}
  ) !important;
  color: var(
    --button-default-hover-fg,
    var(--button-default-fg, ${t.primaryForeground})
  ) !important;
}

${sel(".button:active", 'input[type="submit"]:active', "button:active")} {
  transform: scale(0.98) !important;
}

${sel("#tripleseat_link", ".tripleseat_field.ts_powered_by a")} {
  font-family: ${t.fontFamily} !important;
  font-size: 0.75rem !important;
  color: ${withAlpha(t.foreground, 40)} !important;
  text-decoration: none !important;
  transition: color 0.2s ease !important;
}

${sel("#tripleseat_link:hover", ".tripleseat_field.ts_powered_by a:hover")} {
  color: ${t.primary} !important;
}

${sel(".g-recaptcha")} {
  margin: 1.5rem 0 !important;
  display: block !important;
  overflow: visible !important;
}

${sel(".g-recaptcha > div")} {
  margin: 0 auto !important;
}

${sel(".g-recaptcha iframe")} {
  border-radius: 0.25rem !important;
}

${sel(".location_list")} {
  background-color: ${withAlpha(t.foreground, 5)} !important;
  border: 1px solid ${withAlpha(t.primary, 30)} !important;
  border-radius: ${t.radius} !important;
  padding: 1rem !important;
}

${sel(".location_list label")} {
  color: ${t.foreground} !important;
  text-transform: none !important;
}

${sel(".location_list input")} {
  width: auto !important;
  margin-right: 0.5rem !important;
}

${sel("textarea", ".lead_additional_information")} {
  min-height: 120px !important;
  resize: vertical !important;
}

${sel("#lead_phone_number", "#lead_guest_count")} {
  width: 100% !important;
}

${sel("#submit_spinner")} {
  margin-left: 1rem !important;
}

${sel(".lead_referral_source_other")} {
  margin-top: 0.75rem !important;
}

${sel("input.hasDatepicker", "input.timeselect_input")} {
  background-position: right 0.75rem center !important;
  padding-right: 2.5rem !important;
  padding-left: 1rem !important;
}

/* ---------------------------------------------------------------------------
 * jQuery-UI portals these to <body>, outside the block's container, so they
 * cannot be container-scoped. The body marker class limits the blast radius to
 * pages that actually have a TripleSeat form mounted.
 * ------------------------------------------------------------------------- */
${BODY} #ui-datepicker-div {
  font-family: ${t.fontFamily} !important;
  background-color: ${t.surface} !important;
  color: ${t.surfaceForeground} !important;
  border: 1px solid ${withAlpha(t.primary, 40)} !important;
  border-radius: ${t.radius} !important;
  box-shadow: 0 10px 25px ${withAlpha(t.foreground, 30)} !important;
  z-index: 100000 !important;
}

${BODY} .ui-datepicker {
  font-size: 14px !important;
  padding: 0.5rem !important;
}

${BODY} .ui-datepicker-header {
  background-color: ${t.primary} !important;
  color: ${t.primaryForeground} !important;
  border-radius: ${t.radius} ${t.radius} 0 0 !important;
  padding: 0.5rem !important;
}

${BODY} .ui-datepicker td a {
  color: ${t.surfaceForeground} !important;
  padding: 0.5rem !important;
  text-align: center !important;
}

${BODY} .ui-datepicker td a:hover,
${BODY} .ui-state-active {
  background-color: ${t.primary} !important;
  color: ${t.primaryForeground} !important;
  border-radius: 0.25rem !important;
}

${BODY} div.timeselect {
  font-family: ${t.fontFamily} !important;
  background-color: ${t.surface} !important;
  color: ${t.surfaceForeground} !important;
  border: 1px solid ${withAlpha(t.primary, 40)} !important;
  border-radius: ${t.radius} !important;
  box-shadow: 0 10px 25px ${withAlpha(t.foreground, 30)} !important;
}

${BODY} div.timeselect a {
  color: ${t.surfaceForeground} !important;
  padding: 0.5rem 1rem !important;
}

${BODY} div.timeselect a:hover,
${BODY} div.timeselect a.hover {
  background-color: ${t.primary} !important;
  color: ${t.primaryForeground} !important;
}

@media (max-width: 640px) {
  ${sel("table", "tbody", "tr", "td")} {
    display: block !important;
    width: 100% !important;
    max-width: 100% !important;
  }

  ${sel("table")} {
    border-spacing: 0 !important;
  }

  ${sel("tr")} {
    margin-bottom: 1rem !important;
  }

  ${sel("td")} {
    padding: 0.5rem 0 !important;
  }

  /* 16px is the iOS Safari zoom threshold — anything smaller zooms the page
     when the field is focused and the user never gets it back. */
  ${sel("input", "textarea", "select")} {
    font-size: 16px !important;
  }

  ${sel(".button", 'input[type="submit"]', "button")} {
    width: 100% !important;
    min-width: unset !important;
  }

  ${sel(".tripleseat_field")} {
    width: 100% !important;
    margin-right: 0 !important;
  }

  ${sel(".g-recaptcha")} {
    transform: scale(0.9) !important;
    transform-origin: left center !important;
  }
}
`.trim();
}

/* -------------------------------------------------------------------------- */
/* Body marker refcount                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Refcounted PER DOCUMENT. The dt-cms builder preview portals blocks into an
 * iframe, so the document the block renders into is not necessarily the one this
 * module's globals live in — marking the host `<body>` would leave the class on
 * the CMS chrome while every `body.os-tripleseat-active …` rule inside the
 * iframe stays unmatched.
 */
const bodyMarkerRefCounts = new Map<Document, number>();

function resolveMarkerDocument(doc?: Document | null): Document | null {
  const target = doc ?? (typeof document !== "undefined" ? document : null);
  return target?.body ? target : null;
}

/** Add the body marker; safe to call from every instance (refcounted). */
export function acquireBodyMarker(doc?: Document | null): void {
  const target = resolveMarkerDocument(doc);
  if (!target) return;
  bodyMarkerRefCounts.set(target, (bodyMarkerRefCounts.get(target) ?? 0) + 1);
  target.body.classList.add(TRIPLESEAT_BODY_MARKER_CLASS);
}

/** Remove the body marker only when the LAST instance in that document goes away. */
export function releaseBodyMarker(doc?: Document | null): void {
  const target = resolveMarkerDocument(doc);
  if (!target) return;
  const next = Math.max(0, (bodyMarkerRefCounts.get(target) ?? 0) - 1);
  if (next === 0) {
    bodyMarkerRefCounts.delete(target);
    target.body.classList.remove(TRIPLESEAT_BODY_MARKER_CLASS);
    return;
  }
  bodyMarkerRefCounts.set(target, next);
}

/** Test-only: clears the module-level refcounts. */
export function __resetTripleseatStyleStateForTests(): void {
  for (const target of bodyMarkerRefCounts.keys()) {
    target.body?.classList.remove(TRIPLESEAT_BODY_MARKER_CLASS);
  }
  bodyMarkerRefCounts.clear();
  if (typeof document !== "undefined") {
    document.body.classList.remove(TRIPLESEAT_BODY_MARKER_CLASS);
  }
}
