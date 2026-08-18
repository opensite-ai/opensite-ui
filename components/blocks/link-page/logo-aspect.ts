import type { BrandLogoAspect } from "../../ui/brand-logo";
import type { OptixFlowConfig } from "../../../src/types";

/**
 * Placement/shape mode for the link-page brand mark.
 * - "horizontal": wide lockup/wordmark, modest bar height (default; legacy behavior)
 * - "square":     ~1:1 mark rendered LARGE and centered (~40-50% of column width)
 * - "vertical":   stacked/portrait lockup rendered tall and centered
 * - "banner":     image band at the very top of the page — full-bleed 100vw on
 *                 mobile, and at md+ an in-column header matching the block's
 *                 own content/button column width
 *                 (requires logoBannerImage; the centered logo medallion is not rendered)
 */
export type LinkPageLogoAspect = BrandLogoAspect | "banner";

/**
 * Aspect ratio reserved for the banner band. MOBILE ONLY — at md+ the band's
 * height comes from the artwork itself (see LINK_PAGE_LOGO_BANNER_ASPECT_CLASSES).
 */
export type LinkPageLogoBannerAspect = "standard" | "wide" | "ultrawide";

// ——— Literal class tables (safelist-extractable; NEVER interpolate) ———

// Family A: minimal-profile, grid-cards, bento-layout (legacy h-20/sm:h-24 box).
export const LINK_PAGE_LOGO_IMG_CLASSES_A: Record<BrandLogoAspect, string> = {
  horizontal: "h-auto max-h-20 w-auto max-w-full object-contain sm:max-h-24", // byte-identical
  square: "h-auto max-h-40 w-auto max-w-full object-contain sm:max-h-44 lg:max-h-48",
  vertical: "h-auto max-h-48 w-auto max-w-full object-contain sm:max-h-56 lg:max-h-64",
};
export const LINK_PAGE_LOGO_BOX_CLASSES_A: Record<BrandLogoAspect, string> = {
  horizontal: "flex h-20 w-full max-w-56 items-center justify-center sm:h-24 sm:max-w-72", // byte-identical
  square: "flex h-40 w-full items-center justify-center sm:h-44 lg:h-48",
  vertical: "flex h-48 w-full items-center justify-center sm:h-56 lg:h-64",
};

// Family B: newsletter-social, link-tree (legacy flat h-24 box).
export const LINK_PAGE_LOGO_IMG_CLASSES_B: Record<BrandLogoAspect, string> = {
  horizontal: "h-auto max-h-24 w-auto max-w-full object-contain", // byte-identical
  square: "h-auto max-h-40 w-auto max-w-full object-contain sm:max-h-44 lg:max-h-48",
  vertical: "h-auto max-h-48 w-auto max-w-full object-contain sm:max-h-56 lg:max-h-64",
};
export const LINK_PAGE_LOGO_BOX_CLASSES_B: Record<BrandLogoAspect, string> = {
  horizontal: "flex h-24 w-full max-w-72 items-center justify-center", // byte-identical
  square: "flex h-40 w-full items-center justify-center sm:h-44 lg:h-48",
  vertical: "flex h-48 w-full items-center justify-center sm:h-56 lg:h-64",
};

/**
 * Banner BOX reservation, MOBILE ONLY — it does NOT constrain the rendered
 * image, and at md+ it does not apply at all (`md:aspect-auto`).
 *
 * CSS `aspect-ratio` is a *preferred* size: it sets the box's height from its
 * width only while the content does not demand more room. The banner <img> is
 * `h-auto w-full` (see LINK_PAGE_LOGO_BANNER_IMG_CLASSES), so once the artwork
 * loads, its natural ratio stretches the band taller (or leaves it shorter than
 * the reserved shape, in which case the flex centering in
 * LINK_PAGE_BANNER_BREAKOUT_CLASSES keeps it vertically centered).
 *
 * In other words: below md these classes only reserve plausible space BEFORE
 * the image loads (layout-shift damping); they never crop or letterbox it. The
 * per-tier height ceiling lives on the image (max-h-[…vh]), not here — putting
 * a max-h on the box would clip the naturally-sized image instead of capping it.
 *
 * WHY the reservation stops at md (`md:aspect-auto`): when the band is WIDER
 * than the artwork is tall — which is the normal desktop case, and always the
 * case once the image's own `max-h-[…vh]` cap binds — the reserved ratio height
 * exceeds the image height and the flex centering leaves an empty strip of
 * section background above (and below) the artwork. Measured at 1440×900:
 * standard reserved 630px vs a 540px image = 45px of dead space above the
 * artwork, wide 480 vs 450 = 15px. That strip is exactly the "empty band above
 * the banner" Jordan flagged, and it also breaks the flush-top intent of the
 * `pt-0 md:pt-0` override — `pt-0` is honoured at the BOX level while the
 * visible artwork starts 45px lower. With `md:aspect-auto` the band's height is
 * derived from the image on desktop, so there is never a gap above or below the
 * artwork; only the horizontal `object-contain` gutters remain, and those sit
 * beside the artwork, not above it. Layout-shift damping is unaffected below md
 * (mobile is byte-identical) and is not needed at md+, where the banner is now
 * a column-width header rather than a 100vw hero.
 */
export const LINK_PAGE_LOGO_BANNER_ASPECT_CLASSES: Record<
  LinkPageLogoBannerAspect,
  string
> = {
  standard: "aspect-[16/7] md:aspect-auto",
  wide: "aspect-[3/1] md:aspect-auto",
  ultrawide: "aspect-[4/1] md:aspect-auto",
};

/**
 * Banner IMAGE classes — full-width at the artwork's NATURAL aspect ratio.
 *
 * The banner image is NEVER cropped: link-page banners are usually lockups,
 * storefront signage or promo artwork with text/labels baked in, and cropping
 * (the old `size-full object-cover`) silently ate those edges. `h-auto w-full`
 * renders the whole asset; the per-tier `max-h-[…vh]` only caps how much of the
 * viewport the band may claim, and `object-contain` makes that cap letterbox
 * (fit inside, gutters) rather than crop when it actually binds.
 *
 * Deliberately NO md: variants here. These classes are already viewport-scaled
 * (vh) rather than breakpoint-scaled, and the desktop change narrows the band to
 * the block's content column, which makes the caps bind LESS often, never more:
 * a max-w-sm (384px) column renders ~1.98:1 artwork at ~194px tall, far under
 * 60vh. Where the column is the full Section Container (bento / newsletter, up
 * to ~1216px) the cap can still bind, and that is exactly the behaviour we want
 * — with `md:aspect-auto` the box now takes the image's capped height, so the
 * cap letterboxes horizontally without reintroducing any empty band above it.
 */
export const LINK_PAGE_LOGO_BANNER_IMG_CLASSES: Record<
  LinkPageLogoBannerAspect,
  string
> = {
  standard: "h-auto max-h-[60vh] w-full object-contain",
  wide: "h-auto max-h-[50vh] w-full object-contain",
  ultrawide: "h-auto max-h-[40vh] w-full object-contain",
};

// MOBILE (<md): self-contained 100vw viewport breakout — works inside Container
// on all 5 blocks regardless of whether the block forwards containerClassName to
// Section (only 3 of 5 do). The band is full-bleed, edge to edge.
//
// DESKTOP (md+): the breakout is NEUTRALIZED — `md:left-0 md:translate-x-0`
// undo the -50%/+50% shift and `md:w-full md:mx-auto` turn the element back into
// an ordinary centered block inside the Section's Container. It then renders as
// an in-column HEADER rather than a hero: the width cap that makes it line up
// with the block's own button/content column is NOT here, because it differs per
// block — each of the 5 blocks appends its own literal `md:max-w-*` token to this
// string (minimal-profile md:max-w-sm, grid-cards md:max-w-lg, link-tree
// md:max-w-md, bento/newsletter md:max-w-full). The base `max-w-none` still
// applies below md, so mobile stays full-bleed.
//
// The flex centering matters when the reserved aspect band is TALLER than the
// max-h-capped image (short/ultrawide artwork): the image sits centered in the
// band instead of hugging the top-left. It also centers the letterboxed artwork
// horizontally once `md:aspect-auto` removes the desktop reservation.
//
// NO `overflow-hidden` here, deliberately. `overflow-hidden` makes the box a
// scroll container, which zeroes the automatic (content-based) minimum size that
// lets an aspect-ratio box grow past its ratio — so the band would stay at the
// tier height and CLIP any artwork taller than it, i.e. exactly the crop this
// whole change removes. Measured in Chromium at width 600px with an aspect-[16/7]
// band and a 3:2 image: with overflow-hidden the band stayed 263px and the 400px
// image lost 69px off the top and bottom; without it the band grows to 400px and
// nothing is clipped. Horizontal containment of the w-screen breakout does not
// depend on this: the child img is `w-full`, and each block already layers
// "overflow-x-clip" onto the Section in banner mode.
export const LINK_PAGE_BANNER_BREAKOUT_CLASSES =
  "relative left-1/2 flex w-screen max-w-none -translate-x-1/2 items-center justify-center md:left-0 md:mx-auto md:w-full md:translate-x-0";

/**
 * Reads the same window globals @page-speed/img reads for its OptixFlow
 * defaults (Img.tsx `readGlobalOptixFlowConfig`), in the same precedence order.
 * SSR-safe: returns undefined when there is no global object.
 */
const readGlobalOptixFlowConfig = (): OptixFlowConfig | undefined => {
  if (typeof globalThis === "undefined") return undefined;
  const globalAny = globalThis as unknown as Record<
    string,
    { optixFlowConfig?: OptixFlowConfig } | undefined
  >;
  return (
    globalAny.PageSpeedImgDefaults?.optixFlowConfig ??
    globalAny.OpensiteImgDefaults?.optixFlowConfig ??
    globalAny.PAGE_SPEED_IMG_DEFAULTS?.optixFlowConfig
  );
};

/**
 * Forces `objectFit: "contain"` on the banner image's OptixFlow request while
 * preserving whatever config the live site would otherwise have used.
 *
 * WHY this exists (the replace-semantics trap): @page-speed/img resolves its
 * OptixFlow config with
 * `config ?? defaultOptixFlowConfig ?? readGlobalOptixFlowConfig()`
 * (page-speed-img/src/core/Img.tsx:63-66) — a REPLACE, not a merge. So:
 *
 *  - passing nothing (the old code) lets the site-wide global win, and that
 *    global carries an apiKey but no objectFit, so the CDN transform defaults
 *    to `fit=cover` and returns an asset that is ALREADY cropped to the
 *    measured box. CSS `object-contain` then has nothing left to un-crop.
 *  - passing a bare `{ objectFit: "contain" }` would replace the global
 *    outright and drop the live-site apiKey, disabling OptixFlow entirely.
 *
 * Hence: read the globals ourselves, spread them, and layer objectFit on top.
 * These are the live-site source of truth — customer-sites injects
 * `window.PageSpeedImgDefaults.optixFlowConfig = { apiKey, compressionLevel }`
 * (and aliases OpensiteImgDefaults to it) in chai_index.html.erb.
 *
 * The library's OTHER default source, the module-level
 * `setDefaultOptixFlowConfig` (set by `<ImgDefaults config>`), is deliberately
 * not mirrored: it is module-private to @page-speed/img with no getter, so it
 * cannot be read from here. customer-sites and opensite-ui never touch it; only
 * dt-cms does (src/pages/_app.tsx), so inside the CMS preview a banner with no
 * explicit optixFlowConfig prop now renders the raw (uncropped) src instead of a
 * cover-cropped CDN variant — correct-looking but unoptimized, preview only.
 *
 * Always returns an object with objectFit "contain"; the spread base may be
 * empty (no prop, no globals — e.g. the showcase). That is inert, because
 * useOptimizedImage gates the whole OptixFlow path on a truthy apiKey
 * (`useOptixFlow = optixFlowApiKey ? true : false`), so an apiKey-less config
 * behaves exactly like today's `undefined` and the raw src is used.
 */
export function resolveLinkPageBannerOptixFlowConfig(
  config?: OptixFlowConfig,
): OptixFlowConfig {
  const base: Partial<OptixFlowConfig> =
    config ?? readGlobalOptixFlowConfig() ?? {};
  // `objectFit` is part of the @page-speed/img config contract but not of this
  // package's narrower OptixFlowConfig type, and `apiKey` is genuinely optional
  // at runtime here — hence the assertion at the boundary.
  return { ...base, objectFit: "contain" } as unknown as OptixFlowConfig;
}

// NOTE: there are deliberately no spacing constants here. Banner mode does NOT
// swap the caller's `spacing` value; each block layers the literal
// "overflow-x-clip pt-0 md:pt-0" onto Section's `className`, which Tailwind
// emits after the spacing utilities and therefore wins by CSS order for EVERY
// spacing value (preset key or raw class string). See §2.2 of
// docs/ui-refinements/impl/00-DESIGN-link-page-logos.md.
