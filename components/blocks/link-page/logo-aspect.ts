import type { BrandLogoAspect } from "../../ui/brand-logo";
import type { OptixFlowConfig } from "../../../src/types";

/**
 * Placement/shape mode for the link-page brand mark.
 * - "horizontal": wide lockup/wordmark, modest bar height (default; legacy behavior)
 * - "square":     ~1:1 mark rendered LARGE and centered (~40-50% of column width)
 * - "vertical":   stacked/portrait lockup rendered tall and centered
 * - "banner":     full-bleed 100vw image band at the very top of the page
 *                 (requires logoBannerImage; the centered logo medallion is not rendered)
 */
export type LinkPageLogoAspect = BrandLogoAspect | "banner";

/** Aspect ratio of the full-bleed banner band. */
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
 * Banner BOX reservation only — it does NOT constrain the rendered image.
 *
 * CSS `aspect-ratio` is a *preferred* size: it sets the box's height from its
 * width only while the content does not demand more room. The banner <img> is
 * `h-auto w-full` (see LINK_PAGE_LOGO_BANNER_IMG_CLASSES), so once the artwork
 * loads, its natural ratio stretches the band taller (or leaves it shorter than
 * the reserved shape, in which case the flex centering in
 * LINK_PAGE_BANNER_BREAKOUT_CLASSES keeps it vertically centered).
 *
 * In other words: these classes only reserve plausible space BEFORE the image
 * loads (layout-shift damping); they never crop or letterbox it. The per-tier
 * height ceiling lives on the image (max-h-[…vh]), not here — putting a max-h
 * on the box would clip the naturally-sized image instead of capping it.
 */
export const LINK_PAGE_LOGO_BANNER_ASPECT_CLASSES: Record<
  LinkPageLogoBannerAspect,
  string
> = {
  standard: "aspect-[16/7]",
  wide: "aspect-[3/1]",
  ultrawide: "aspect-[4/1]",
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
 */
export const LINK_PAGE_LOGO_BANNER_IMG_CLASSES: Record<
  LinkPageLogoBannerAspect,
  string
> = {
  standard: "h-auto max-h-[60vh] w-full object-contain",
  wide: "h-auto max-h-[50vh] w-full object-contain",
  ultrawide: "h-auto max-h-[40vh] w-full object-contain",
};

// Self-contained 100vw breakout — works inside Container on all 5 blocks regardless
// of whether the block forwards containerClassName to Section (only 3 of 5 do).
//
// The flex centering matters when the reserved aspect band is TALLER than the
// max-h-capped image (short/ultrawide artwork): the image sits centered in the
// band instead of hugging the top-left.
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
  "relative left-1/2 flex w-screen max-w-none -translate-x-1/2 items-center justify-center";

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
