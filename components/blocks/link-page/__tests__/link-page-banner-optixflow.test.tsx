/**
 * Banner OptixFlow contract for all 5 link-page blocks.
 *
 * The banner image must never be cropped. CSS `object-contain` alone is not
 * enough: on a live site @page-speed/img fetches a CDN-transformed variant, and
 * its `resolveOptixFlowConfig` is `config ?? default ?? global` — a REPLACE, not
 * a merge (page-speed-img/src/core/Img.tsx:63-66). So the banner must pass a
 * config that (a) preserves the live-site apiKey coming from the window global
 * and (b) pins `objectFit: "contain"` so the fetched asset is not already
 * cropped to `fit=cover` before CSS ever runs.
 *
 * Everything else (medallion / BrandLogo / card images) keeps the plain
 * passthrough — those are intentionally cover-cropped.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { LinkPageMinimalProfile } from "../link-page-minimal-profile";
import { LinkPageGridCards } from "../link-page-grid-cards";
import { LinkPageBentoLayout } from "../link-page-bento-layout";
import { LinkPageNewsletterSocial } from "../link-page-newsletter-social";
import { LinkTreeBlock } from "../link-tree-block";
import { resolveLinkPageBannerOptixFlowConfig } from "../logo-aspect";
import type { OptixFlowConfig } from "../../../../src/types";

type RecordedImgCall = {
  src?: string;
  alt?: string;
  className?: string;
  optixFlowConfig?: Record<string, unknown>;
};

const { imgCalls } = vi.hoisted(() => ({
  imgCalls: [] as RecordedImgCall[],
}));

vi.mock("@page-speed/img", () => ({
  Img: (props: RecordedImgCall) => {
    imgCalls.push(props);
    return (
      <img
        src={props.src}
        alt={props.alt}
        className={props.className}
        data-testid="mock-img"
      />
    );
  },
}));

vi.mock("@page-speed/forms/integration", () => ({
  FormEngine: () => <div data-testid="mock-form-engine" />,
}));

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href?: string;
    className?: string;
  }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name }: { name?: React.ReactNode }) =>
    typeof name === "string" ? (
      <span data-testid="mock-icon" data-name={name}>
        icon
      </span>
    ) : (
      <>{name}</>
    ),
}));

vi.mock("../../../ui/social-link-icon", () => ({
  SocialLinkIcon: ({ href, label }: { href: string; label?: string }) => (
    <a href={href} aria-label={label} data-testid="mock-social-link">
      social
    </a>
  ),
}));

const BANNER = {
  src: "https://cdn.example.com/brand-banner.jpg",
  alt: "Storefront banner",
};
const LOGO = {
  src: "https://cdn.example.com/brand-logo.png",
  alt: "Brand mark",
};

/** The three window globals @page-speed/img reads, in its own precedence order. */
type ImgGlobals = typeof globalThis & {
  PageSpeedImgDefaults?: { optixFlowConfig?: Record<string, unknown> };
  OpensiteImgDefaults?: { optixFlowConfig?: Record<string, unknown> };
  PAGE_SPEED_IMG_DEFAULTS?: { optixFlowConfig?: Record<string, unknown> };
};
const imgGlobals = globalThis as ImgGlobals;

/** Mirrors the live-site global: an apiKey, and NO objectFit (CDN default = cover). */
const LIVE_SITE_GLOBAL = { apiKey: "k", compressionLevel: 60 };

afterEach(() => {
  imgCalls.length = 0;
  delete imgGlobals.PageSpeedImgDefaults;
  delete imgGlobals.OpensiteImgDefaults;
  delete imgGlobals.PAGE_SPEED_IMG_DEFAULTS;
});

const callFor = (src: string): RecordedImgCall | undefined =>
  imgCalls.find((call) => call.src === src);

type BlockCase = {
  name: string;
  renderBanner: (optixFlowConfig?: OptixFlowConfig) => void;
  renderLogo: (optixFlowConfig?: OptixFlowConfig) => void;
};

const CASES: BlockCase[] = [
  {
    name: "LinkPageMinimalProfile",
    renderBanner: (optixFlowConfig) =>
      void render(
        <LinkPageMinimalProfile
          name="Test"
          logoAspect="banner"
          logoBannerImage={BANNER}
          optixFlowConfig={optixFlowConfig}
        />,
      ),
    renderLogo: (optixFlowConfig) =>
      void render(
        <LinkPageMinimalProfile
          name="Test"
          logo={LOGO}
          optixFlowConfig={optixFlowConfig}
        />,
      ),
  },
  {
    name: "LinkPageGridCards",
    renderBanner: (optixFlowConfig) =>
      void render(
        <LinkPageGridCards
          name="Test"
          logoAspect="banner"
          logoBannerImage={BANNER}
          optixFlowConfig={optixFlowConfig}
        />,
      ),
    renderLogo: (optixFlowConfig) =>
      void render(
        <LinkPageGridCards
          name="Test"
          logo={LOGO}
          optixFlowConfig={optixFlowConfig}
        />,
      ),
  },
  {
    name: "LinkPageBentoLayout",
    renderBanner: (optixFlowConfig) =>
      void render(
        <LinkPageBentoLayout
          name="Test"
          logoAspect="banner"
          logoBannerImage={BANNER}
          optixFlowConfig={optixFlowConfig}
        />,
      ),
    renderLogo: (optixFlowConfig) =>
      void render(
        <LinkPageBentoLayout
          name="Test"
          logo={LOGO}
          optixFlowConfig={optixFlowConfig}
        />,
      ),
  },
  {
    name: "LinkPageNewsletterSocial",
    renderBanner: (optixFlowConfig) =>
      void render(
        <LinkPageNewsletterSocial
          name="Test"
          logoAspect="banner"
          logoBannerImage={BANNER}
          optixFlowConfig={optixFlowConfig}
        />,
      ),
    renderLogo: (optixFlowConfig) =>
      void render(
        <LinkPageNewsletterSocial
          name="Test"
          logo={LOGO}
          optixFlowConfig={optixFlowConfig}
        />,
      ),
  },
  {
    name: "LinkTreeBlock",
    renderBanner: (optixFlowConfig) =>
      void render(
        <LinkTreeBlock
          brandName="Test"
          logoAspect="banner"
          logoBannerImage={BANNER}
          optixFlowConfig={optixFlowConfig}
        />,
      ),
    renderLogo: (optixFlowConfig) =>
      void render(
        <LinkTreeBlock
          brandName="Test"
          logo={LOGO}
          optixFlowConfig={optixFlowConfig}
        />,
      ),
  },
];

describe.each(CASES)("$name banner OptixFlow config", (blockCase) => {
  it("pins objectFit=contain on the banner Img", () => {
    blockCase.renderBanner();

    const bannerCall = callFor(BANNER.src);
    expect(bannerCall).toBeDefined();
    expect(bannerCall?.optixFlowConfig?.objectFit).toBe("contain");
  });

  it("merges the window global default rather than replacing it", () => {
    // Live-site shape: a global apiKey and no objectFit. Passing nothing would
    // let this win verbatim and the CDN would return a fit=cover crop.
    imgGlobals.PageSpeedImgDefaults = { optixFlowConfig: LIVE_SITE_GLOBAL };

    blockCase.renderBanner();

    expect(callFor(BANNER.src)?.optixFlowConfig).toEqual({
      apiKey: "k",
      compressionLevel: 60,
      objectFit: "contain",
    });
  });

  it("keeps a block-level optixFlowConfig prop and adds objectFit=contain", () => {
    imgGlobals.PageSpeedImgDefaults = { optixFlowConfig: LIVE_SITE_GLOBAL };

    blockCase.renderBanner({ apiKey: "p" });

    // The explicit prop wins over the global (same precedence the library uses),
    // and objectFit is layered on top of it.
    expect(callFor(BANNER.src)?.optixFlowConfig).toEqual({
      apiKey: "p",
      objectFit: "contain",
    });
  });

  it("leaves the medallion/logo Img on the plain passthrough", () => {
    imgGlobals.PageSpeedImgDefaults = { optixFlowConfig: LIVE_SITE_GLOBAL };

    blockCase.renderLogo({ apiKey: "p" });

    const logoCall = callFor(LOGO.src);
    expect(logoCall).toBeDefined();
    // Byte-identical to the caller's prop: no forced objectFit, no global read.
    expect(logoCall?.optixFlowConfig).toEqual({ apiKey: "p" });
    expect(logoCall?.optixFlowConfig?.objectFit).toBeUndefined();
  });

  it("passes undefined through to the medallion/logo Img when the caller omits the prop", () => {
    imgGlobals.PageSpeedImgDefaults = { optixFlowConfig: LIVE_SITE_GLOBAL };

    blockCase.renderLogo();

    expect(callFor(LOGO.src)?.optixFlowConfig).toBeUndefined();
  });
});

describe("resolveLinkPageBannerOptixFlowConfig", () => {
  it('returns { objectFit: "contain" } with no prop and no globals', () => {
    expect(resolveLinkPageBannerOptixFlowConfig()).toEqual({
      objectFit: "contain",
    });
  });

  it("spreads the PageSpeedImgDefaults global and layers objectFit on top", () => {
    imgGlobals.PageSpeedImgDefaults = { optixFlowConfig: LIVE_SITE_GLOBAL };

    expect(resolveLinkPageBannerOptixFlowConfig()).toEqual({
      apiKey: "k",
      compressionLevel: 60,
      objectFit: "contain",
    });
  });

  it("falls back to OpensiteImgDefaults, then PAGE_SPEED_IMG_DEFAULTS", () => {
    imgGlobals.OpensiteImgDefaults = { optixFlowConfig: { apiKey: "opensite" } };
    expect(resolveLinkPageBannerOptixFlowConfig()).toEqual({
      apiKey: "opensite",
      objectFit: "contain",
    });

    delete imgGlobals.OpensiteImgDefaults;
    imgGlobals.PAGE_SPEED_IMG_DEFAULTS = {
      optixFlowConfig: { apiKey: "legacy" },
    };
    expect(resolveLinkPageBannerOptixFlowConfig()).toEqual({
      apiKey: "legacy",
      objectFit: "contain",
    });
  });

  it("prefers the explicit config over every global", () => {
    imgGlobals.PageSpeedImgDefaults = { optixFlowConfig: LIVE_SITE_GLOBAL };
    imgGlobals.OpensiteImgDefaults = { optixFlowConfig: { apiKey: "opensite" } };

    expect(resolveLinkPageBannerOptixFlowConfig({ apiKey: "p" })).toEqual({
      apiKey: "p",
      objectFit: "contain",
    });
  });

  it("never overrides an inbound objectFit with cover, and does not mutate its input", () => {
    const inbound = { apiKey: "p" } as OptixFlowConfig;

    const resolved = resolveLinkPageBannerOptixFlowConfig(inbound);

    expect(resolved).not.toBe(inbound);
    expect(inbound).toEqual({ apiKey: "p" });
    expect(
      (resolved as unknown as Record<string, unknown>).objectFit,
    ).toBe("contain");
  });

  it("overrides an explicit cover from the caller (the banner is never cropped)", () => {
    const resolved = resolveLinkPageBannerOptixFlowConfig({
      apiKey: "p",
      objectFit: "cover",
    } as unknown as OptixFlowConfig);

    expect(resolved).toEqual({ apiKey: "p", objectFit: "contain" });
  });
});
