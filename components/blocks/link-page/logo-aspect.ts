import type { BrandLogoAspect } from "../../ui/brand-logo";

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

export const LINK_PAGE_LOGO_BANNER_ASPECT_CLASSES: Record<
  LinkPageLogoBannerAspect,
  string
> = {
  standard: "aspect-[16/7] max-h-[60vh]",
  wide: "aspect-[3/1] max-h-[50vh]",
  ultrawide: "aspect-[4/1] max-h-[40vh]",
};

// Self-contained 100vw breakout — works inside Container on all 5 blocks regardless
// of whether the block forwards containerClassName to Section (only 3 of 5 do).
export const LINK_PAGE_BANNER_BREAKOUT_CLASSES =
  "relative left-1/2 w-screen max-w-none -translate-x-1/2 overflow-hidden";

// NOTE: there are deliberately no spacing constants here. Banner mode does NOT
// swap the caller's `spacing` value; each block layers the literal
// "overflow-x-clip pt-0 md:pt-0" onto Section's `className`, which Tailwind
// emits after the spacing utilities and therefore wins by CSS order for EVERY
// spacing value (preset key or raw class string). See §2.2 of
// docs/ui-refinements/impl/00-DESIGN-link-page-logos.md.
