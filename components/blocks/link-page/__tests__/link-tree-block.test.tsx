import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LinkTreeBlock } from "../link-tree-block";

vi.mock("@page-speed/img", () => ({
  Img: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
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
  DynamicIcon: ({
    name,
    className,
    size,
  }: {
    name?: React.ReactNode;
    className?: string;
    size?: number;
  }) =>
    typeof name === "string" ? (
      <span
        data-testid="mock-icon"
        data-name={name}
        data-size={size}
        className={className}
      >
        icon
      </span>
    ) : (
      <>{name}</>
    ),
}));

vi.mock("../../../ui/social-link-icon", () => ({
  SocialLinkIcon: ({
    href,
    label,
    className,
  }: {
    href: string;
    label?: string;
    className?: string;
  }) => (
    <a
      href={href}
      aria-label={label}
      className={className}
      data-testid="mock-social-link"
    >
      social
    </a>
  ),
}));

describe("LinkTreeBlock", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders links when provided", () => {
    const links = [
      { id: "1", label: "Link 1", href: "https://example.com" },
      { id: "2", label: "Link 2", href: "https://example2.com" },
    ];
    render(<LinkTreeBlock brandName="Test" links={links} />);
    expect(screen.getByText("Link 1")).toBeInTheDocument();
    expect(screen.getByText("Link 2")).toBeInTheDocument();
  });

  it("renders brand logos with responsive containment", () => {
    render(
      <LinkTreeBlock
        brandName="Test"
        brandLogo={{ src: "/logo-wide.png", alt: "Test logo" }}
      />,
    );

    expect(screen.getByAltText("Test logo")).toHaveClass(
      "h-auto",
      "max-h-24",
      "w-auto",
      "max-w-full",
      "object-contain",
    );
  });

  it("routes verified, link, and footer icon strings through DynamicIcon", () => {
    render(
      <LinkTreeBlock
        brandName="Test"
        brandVerified
        verifiedIcon="lucide/badge-check"
        verifiedIconClassName="verified-icon-class"
        linkIconClassName="link-icon-class"
        links={[
          {
            id: "string",
            label: "String link",
            icon: "lucide/link-icon",
            href: "https://example.com",
          },
        ]}
        footerAction={{
          label: "Footer action",
          icon: "lucide/footer-before",
          iconAfter: "lucide/footer-after",
        }}
      />,
    );

    const verifiedIcon = document.querySelector(
      '[data-name="lucide/badge-check"]',
    );
    expect(verifiedIcon).toHaveAttribute("data-size", "14");
    expect(verifiedIcon).toHaveClass("verified-icon-class");
    expect(verifiedIcon?.parentElement).not.toHaveTextContent(
      "lucide/badge-check",
    );

    const link = screen
      .getByText("String link")
      .closest('[data-testid="mock-pressable"]') as HTMLElement;
    const linkIcon = link.querySelector('[data-name="lucide/link-icon"]');
    expect(linkIcon).toHaveAttribute("data-size", "20");
    expect(linkIcon).toHaveClass("link-icon-class");
    expect(link).not.toHaveTextContent("lucide/link-icon");

    const footer = screen
      .getByText("Footer action")
      .closest('[data-testid="mock-pressable"]') as HTMLElement;
    expect(
      footer.querySelector('[data-name="lucide/footer-before"]'),
    ).toBeInTheDocument();
    expect(
      footer.querySelector('[data-name="lucide/footer-after"]'),
    ).toBeInTheDocument();
    expect(footer).not.toHaveTextContent("lucide/footer-before");
    expect(footer).not.toHaveTextContent("lucide/footer-after");
  });

  it("preserves custom icons and verified nullish and falsy fallback semantics", () => {
    const { rerender } = render(
      <LinkTreeBlock
        brandName="Test"
        brandVerified
        verifiedIcon={<span data-testid="custom-verified-icon">verified</span>}
        links={[
          {
            id: "custom",
            label: "Custom link",
            icon: <span data-testid="custom-link-icon">link</span>,
            iconName: "lucide/custom-fallback",
          },
          {
            id: "empty",
            label: "Empty link",
            icon: "",
            iconName: "lucide/empty-fallback",
          },
        ]}
        footerAction={{
          label: "Custom footer",
          icon: <span data-testid="custom-footer-before">before</span>,
          iconAfter: <span data-testid="custom-footer-after">after</span>,
        }}
      />,
    );

    expect(screen.getByTestId("custom-verified-icon")).toBeInTheDocument();
    const customLink = screen
      .getByText("Custom link")
      .closest('[data-testid="mock-pressable"]') as HTMLElement;
    expect(customLink).toContainElement(screen.getByTestId("custom-link-icon"));
    expect(
      customLink.querySelector('[data-name="lucide/custom-fallback"]'),
    ).not.toBeInTheDocument();

    const emptyLink = screen
      .getByText("Empty link")
      .closest('[data-testid="mock-pressable"]') as HTMLElement;
    expect(
      emptyLink.querySelector('[data-name="lucide/empty-fallback"]'),
    ).toBeInTheDocument();

    const footer = screen
      .getByText("Custom footer")
      .closest('[data-testid="mock-pressable"]') as HTMLElement;
    expect(footer).toContainElement(screen.getByTestId("custom-footer-before"));
    expect(footer).toContainElement(screen.getByTestId("custom-footer-after"));

    rerender(
      <LinkTreeBlock brandName="Test" brandVerified verifiedIcon="" />,
    );
    expect(
      document.querySelector('[data-name="lucide/check"]'),
    ).not.toBeInTheDocument();

    rerender(
      <LinkTreeBlock brandName="Test" brandVerified verifiedIcon={false} />,
    );
    expect(
      document.querySelector('[data-name="lucide/check"]'),
    ).not.toBeInTheDocument();

    rerender(
      <LinkTreeBlock brandName="Test" brandVerified verifiedIcon={0} />,
    );
    expect(screen.getByText("0")).toBeInTheDocument();

    rerender(<LinkTreeBlock brandName="Test" brandVerified />);
    expect(
      document.querySelector('[data-name="lucide/check"]'),
    ).toHaveAttribute("data-size", "14");
  });
});

/**
 * logoAspect / logoBannerImage coverage (design doc §2.4).
 *
 * link-tree-block is a FAMILY B block: its legacy medallion box is the flat
 * `h-24 max-w-72` pair, so the square/vertical ladder comes from
 * LINK_PAGE_LOGO_{IMG,BOX}_CLASSES_B. Every expectation below is written as
 * literal tokens (not imported constants) so the test fails if a table value
 * silently changes.
 */
describe("LinkTreeBlock logo aspect + full-bleed banner", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const getSection = () => document.querySelector("section") as HTMLElement;
  const getBox = () => document.querySelector(".probe-box") as HTMLElement;
  const getBanner = () =>
    document.querySelector('[data-slot="link-page-banner"]');

  const BANNER = {
    src: "https://cdn.ing/assets/i/r/315170/tok/banner-wide.jpg",
    alt: "Storefront banner",
  };

  it("keeps the legacy family-B medallion box and spacing when logoAspect is unset", () => {
    render(
      <LinkTreeBlock
        brandName="Test"
        avatarClassName="probe-box"
        brandLogo={{ src: "/logo-wide.png", alt: "Legacy logo" }}
      />,
    );

    expect(getBox()).toHaveClass(
      "flex",
      "h-24",
      "w-full",
      "max-w-72",
      "items-center",
      "justify-center",
    );
    expect(screen.getByAltText("Legacy logo")).toHaveClass(
      "h-auto",
      "max-h-24",
      "w-auto",
      "max-w-full",
      "object-contain",
    );
    expect(getSection()).toHaveClass("py-12", "md:py-32");
    // Non-banner output is byte-compatible: no flush-top literal is injected.
    expect(getSection()).not.toHaveClass(
      "overflow-x-clip",
      "pt-0",
      "md:pt-0",
    );
    expect(getBanner()).toBeNull();
  });

  it('renders the BrandLogo branch large for logoAspect="square"', () => {
    render(
      <LinkTreeBlock
        brandName="Test"
        avatarClassName="probe-box"
        logoAspect="square"
        logo={{ src: "https://cdn.ing/mark.png", alt: "Square mark" }}
      />,
    );

    expect(screen.getByAltText("Square mark")).toHaveClass(
      "w-auto",
      "object-contain",
      "max-h-40",
      "max-w-full",
      "sm:max-h-44",
      "lg:max-h-48",
    );
    expect(getBox()).toHaveClass(
      "flex",
      "h-40",
      "w-full",
      "items-center",
      "justify-center",
      "sm:h-44",
      "lg:h-48",
    );
    expect(getBox()).not.toHaveClass("h-24", "max-w-72");
  });

  it('renders the BrandLogo branch tall for logoAspect="vertical"', () => {
    render(
      <LinkTreeBlock
        brandName="Test"
        avatarClassName="probe-box"
        logoAspect="vertical"
        logo={{ src: "https://cdn.ing/stacked.png", alt: "Stacked mark" }}
      />,
    );

    expect(screen.getByAltText("Stacked mark")).toHaveClass(
      "w-auto",
      "object-contain",
      "max-h-48",
      "max-w-full",
      "sm:max-h-56",
      "lg:max-h-64",
    );
    expect(getBox()).toHaveClass(
      "flex",
      "h-48",
      "w-full",
      "items-center",
      "justify-center",
      "sm:h-56",
      "lg:h-64",
    );
  });

  it("applies the family-B square/vertical IMG table on the avatar fallback branch", () => {
    const { rerender } = render(
      <LinkTreeBlock
        brandName="Test"
        avatarClassName="probe-box"
        logoAspect="square"
        brandAvatar={{ src: "/mark.png", alt: "Fallback mark" }}
      />,
    );

    expect(screen.getByAltText("Fallback mark")).toHaveClass(
      "h-auto",
      "max-h-40",
      "w-auto",
      "max-w-full",
      "object-contain",
      "sm:max-h-44",
      "lg:max-h-48",
    );
    expect(getBox()).toHaveClass("h-40", "sm:h-44", "lg:h-48");

    rerender(
      <LinkTreeBlock
        brandName="Test"
        avatarClassName="probe-box"
        logoAspect="vertical"
        brandAvatar={{ src: "/mark.png", alt: "Fallback mark" }}
      />,
    );

    expect(screen.getByAltText("Fallback mark")).toHaveClass(
      "h-auto",
      "max-h-48",
      "w-auto",
      "max-w-full",
      "object-contain",
      "sm:max-h-56",
      "lg:max-h-64",
    );
    expect(getBox()).toHaveClass("h-48", "sm:h-56", "lg:h-64");
  });

  it('renders a 100vw breakout banner and suppresses the medallion for logoAspect="banner"', () => {
    render(
      <LinkTreeBlock
        brandName="Test"
        avatarClassName="probe-box"
        logoAspect="banner"
        logoBannerImage={BANNER}
        logo={{ src: "https://cdn.ing/mark.png", alt: "Suppressed mark" }}
        brandAvatar={{ src: "/avatar.png", alt: "Suppressed avatar" }}
      />,
    );

    const banner = getBanner() as HTMLElement;
    expect(banner).toBeInTheDocument();
    expect(banner).toHaveClass(
      "relative",
      "left-1/2",
      "flex",
      "w-screen",
      "max-w-none",
      "-translate-x-1/2",
      "items-center",
      "justify-center",
      "aspect-[16/7]",
    );
    // Neither the tier height cap nor overflow-hidden may sit on the band:
    // both clip artwork taller than the reserved ratio (browser-verified).
    expect(banner).not.toHaveClass("max-h-[60vh]");
    expect(banner).not.toHaveClass("overflow-hidden");
    // The block's inner layout div already supplies py-12, so the banner must
    // NOT add its own bottom margin (design §2.2 "decide per block").
    expect(banner).not.toHaveClass("mb-8", "sm:mb-10");

    const bannerImg = banner.querySelector("img") as HTMLImageElement;
    expect(bannerImg).toHaveAttribute("src", BANNER.src);
    expect(bannerImg).toHaveAttribute("alt", BANNER.alt);
    expect(bannerImg).toHaveClass(
      "h-auto",
      "max-h-[60vh]",
      "w-full",
      "object-contain",
    );
    // The banner artwork is never cropped and never stretched to the band.
    expect(bannerImg).not.toHaveClass("object-cover");
    expect(bannerImg).not.toHaveClass("size-full");

    // Medallion ladder (box + logo + avatar) is replaced by the banner.
    expect(getBox()).toBeNull();
    expect(screen.queryByAltText("Suppressed mark")).not.toBeInTheDocument();
    expect(screen.queryByAltText("Suppressed avatar")).not.toBeInTheDocument();

    // Banner mode keeps the caller's spacing preset verbatim and LAYERS the
    // flush-top override on top of it: pt-0/md:pt-0 zero the preset's top
    // padding by CSS order (twMerge keeps both, py-* is not dropped), and
    // overflow-x-clip contains the w-screen breakout's half-scrollbar overhang.
    expect(getSection()).toHaveClass(
      "py-12",
      "md:py-32",
      "overflow-x-clip",
      "pt-0",
      "md:pt-0",
    );
    // The banner is the first child inside the Section container AND the
    // immediate sibling of the block's inner layout column — moving it inside
    // that column must fail this test.
    expect(banner.parentElement?.firstElementChild).toBe(banner);
    expect(banner.nextElementSibling).toHaveClass(
      "flex",
      "min-h-screen",
      "w-full",
      "items-start",
      "justify-center",
      "py-12",
    );

    // Brand name/tagline content still renders below the banner.
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it('falls back to legacy rendering when logoAspect="banner" has no banner image', () => {
    render(
      <LinkTreeBlock
        brandName="Test"
        avatarClassName="probe-box"
        logoAspect="banner"
        logo={{ src: "https://cdn.ing/mark.png", alt: "Legacy mark" }}
      />,
    );

    expect(getBanner()).toBeNull();
    expect(getBox()).toHaveClass("flex", "h-24", "w-full", "max-w-72");
    expect(screen.getByAltText("Legacy mark")).toHaveClass(
      "max-h-12",
      "sm:max-h-14",
      "lg:max-h-16",
    );
    expect(getSection()).toHaveClass("py-12", "md:py-32");
    expect(getSection()).not.toHaveClass(
      "overflow-x-clip",
      "pt-0",
      "md:pt-0",
    );
  });

  it("keeps an explicit spacing value verbatim in banner mode", () => {
    render(
      <LinkTreeBlock
        brandName="Test"
        spacing="py-4"
        logoAspect="banner"
        logoBannerImage={BANNER}
      />,
    );

    expect(getBanner()).toBeInTheDocument();
    expect(getSection()).toHaveClass(
      "py-4",
      "overflow-x-clip",
      "pt-0",
      "md:pt-0",
    );
    // No spacing substitution happens any more — the banner-spacing preset's
    // bottom half must never appear.
    expect(getSection()).not.toHaveClass("pb-12", "md:pb-32");
  });

  it('layers the flush-top override on the "lg" spacing preset in banner mode', () => {
    render(
      <LinkTreeBlock
        brandName="Test"
        spacing="lg"
        logoAspect="banner"
        logoBannerImage={BANNER}
      />,
    );

    expect(getBanner()).toBeInTheDocument();
    // Section's own "lg" preset classes survive alongside the override.
    expect(getSection()).toHaveClass(
      "py-20",
      "md:py-32",
      "overflow-x-clip",
      "pt-0",
      "md:pt-0",
    );
  });

  it("preserves a consumer className and appends it after the banner override", () => {
    render(
      <LinkTreeBlock
        brandName="Test"
        className="custom-section-class"
        logoAspect="banner"
        logoBannerImage={BANNER}
      />,
    );

    expect(getSection()).toHaveClass(
      "custom-section-class",
      "overflow-x-clip",
      "pt-0",
      "md:pt-0",
    );
  });

  it("maps logoBannerAspect onto the literal aspect-ratio table", () => {
    const { rerender } = render(
      <LinkTreeBlock
        brandName="Test"
        logoAspect="banner"
        logoBannerImage={BANNER}
        logoBannerAspect="wide"
      />,
    );
    // Box reserves the tier SHAPE only; the tier height cap lives on the
    // image, where it letterboxes instead of clipping the artwork.
    expect(getBanner()).toHaveClass("aspect-[3/1]");
    expect(getBanner()).not.toHaveClass("aspect-[16/7]");
    expect(getBanner()).not.toHaveClass("max-h-[50vh]");
    expect(getBanner()?.querySelector("img")).toHaveClass(
      "max-h-[50vh]",
      "object-contain",
    );

    rerender(
      <LinkTreeBlock
        brandName="Test"
        logoAspect="banner"
        logoBannerImage={BANNER}
        logoBannerAspect="ultrawide"
      />,
    );
    expect(getBanner()).toHaveClass("aspect-[4/1]");
    expect(getBanner()).not.toHaveClass("max-h-[40vh]");
    expect(getBanner()?.querySelector("img")).toHaveClass(
      "max-h-[40vh]",
      "object-contain",
    );

    rerender(
      <LinkTreeBlock
        brandName="Test"
        logoAspect="banner"
        logoBannerImage={BANNER}
        logoBannerAspect="standard"
      />,
    );
    expect(getBanner()).toHaveClass("aspect-[16/7]");
    expect(getBanner()).not.toHaveClass("max-h-[60vh]");
    expect(getBanner()?.querySelector("img")).toHaveClass(
      "max-h-[60vh]",
      "object-contain",
    );
  });

  it("renders the website-1124 payload shape with legacy xl classes and no null-src img", () => {
    render(
      <LinkTreeBlock
        brandName="Workflow Rush"
        brandTagline="AI automation for growing teams"
        brandVerified={false}
        background="dark"
        avatarClassName="probe-box"
        logo={{
          alt: "Workflow Rush",
          src: "https://cdn.ing/assets/i/r/314346/tok/logo-light.png",
          url: "/",
        }}
        // Prod shape: octane's brand-mark stripper nulls every *avatar* key.
        brandAvatar={{ alt: "Workflow Rush", src: null as unknown as string }}
        footerAction={{ href: "/", label: "workflowrush.com" }}
      />,
    );

    expect(screen.getByAltText("Workflow Rush")).toHaveClass(
      "w-auto",
      "object-contain",
      "max-h-12",
      "sm:max-h-14",
      "lg:max-h-16",
    );
    expect(getBox()).toHaveClass("flex", "h-24", "w-full", "max-w-72");

    const imgs = Array.from(document.querySelectorAll("img"));
    expect(imgs.length).toBeGreaterThan(0);
    for (const img of imgs) {
      expect(img.getAttribute("src")).toBeTruthy();
    }
  });

  it("guards null-src brandAvatar and still resolves the brandLogo fallback", () => {
    const { rerender } = render(
      <LinkTreeBlock
        brandName="Nulled"
        brandAvatar={{ alt: "Nulled", src: null as unknown as string }}
      />,
    );
    expect(document.querySelectorAll("img")).toHaveLength(0);

    // brandAvatar nulled by the stripper + brandLogo (a logo-slot key) intact:
    // the medallion must still render the surviving brand mark.
    rerender(
      <LinkTreeBlock
        brandName="Nulled"
        brandAvatar={{ alt: "Nulled", src: null as unknown as string }}
        brandLogo={{ alt: "Surviving mark", src: "/logo-wide.png" }}
      />,
    );
    expect(screen.getByAltText("Surviving mark")).toHaveAttribute(
      "src",
      "/logo-wide.png",
    );
  });

  it("falls through a null-src logo to the surviving avatar instead of an empty medallion", () => {
    const { rerender } = render(
      <LinkTreeBlock
        brandName="Nulled Logo"
        avatarClassName="probe-box"
        // Prod shape: the logo object survives octane's stripper but its src was
        // nulled. BrandLogo renders null for a src-less logo, so a truthiness
        // test on the object alone would short-circuit the ladder and leave an
        // empty medallion box.
        logo={{ alt: "Nulled logo", src: null as unknown as string }}
        brandAvatar={{ src: "/avatar.png", alt: "Surviving avatar" }}
      />,
    );

    const avatar = screen.getByAltText("Surviving avatar");
    expect(avatar).toHaveAttribute("src", "/avatar.png");
    expect(avatar).toHaveClass(
      "h-auto",
      "max-h-24",
      "w-auto",
      "max-w-full",
      "object-contain",
    );
    expect(getBox()).toContainElement(avatar);
    expect(screen.queryByAltText("Nulled logo")).not.toBeInTheDocument();

    // An empty-string src is the same class of stored garbage.
    rerender(
      <LinkTreeBlock
        brandName="Nulled Logo"
        avatarClassName="probe-box"
        logo={{ alt: "Empty logo", src: "" }}
        brandAvatar={{ src: "/avatar.png", alt: "Surviving avatar" }}
      />,
    );
    expect(getBox()).toContainElement(screen.getByAltText("Surviving avatar"));

    // A src-less logo must also fall through to logoSlot, which sits between
    // the logo and avatar rungs of the ladder.
    rerender(
      <LinkTreeBlock
        brandName="Nulled Logo"
        avatarClassName="probe-box"
        logo={{ alt: "Nulled logo", src: null as unknown as string }}
        logoSlot={<span data-testid="fallback-logo-slot">slot</span>}
        brandAvatar={{ src: "/avatar.png", alt: "Surviving avatar" }}
      />,
    );
    expect(screen.getByTestId("fallback-logo-slot")).toBeInTheDocument();
    expect(screen.queryByAltText("Surviving avatar")).not.toBeInTheDocument();
  });

  it("accepts a bare-string brandAvatar and sizes it from the aspect table", () => {
    render(
      <LinkTreeBlock
        brandName="Bare String"
        logoAspect="square"
        brandAvatar="/bare-avatar.png"
      />,
    );

    const img = screen.getByAltText("Bare String");
    expect(img).toHaveAttribute("src", "/bare-avatar.png");
    expect(img).toHaveClass(
      "h-auto",
      "max-h-40",
      "w-auto",
      "max-w-full",
      "object-contain",
      "sm:max-h-44",
      "lg:max-h-48",
    );
  });

  it("falls back to horizontal classes for an out-of-contract logoAspect string", () => {
    render(
      <LinkTreeBlock
        brandName="Test"
        avatarClassName="probe-box"
        // Stored payloads are untyped JSON — an unknown enum value must not
        // strip the medallion box/img sizing classes.
        logoAspect={"1:1" as unknown as "square"}
        brandAvatar={{ src: "/mark.png", alt: "Unknown aspect" }}
      />,
    );

    expect(getBox()).toHaveClass("flex", "h-24", "w-full", "max-w-72");
    expect(screen.getByAltText("Unknown aspect")).toHaveClass(
      "h-auto",
      "max-h-24",
      "w-auto",
      "max-w-full",
      "object-contain",
    );
  });
});

/**
 * Untyped-payload enum hardening. Stored design payloads are raw JSON, so an
 * out-of-contract logoAspect / logoBannerAspect string can reach the class
 * tables. Garbage must degrade to the documented defaults ("horizontal" /
 * "standard"), never to a size-less medallion box or a zero-height banner.
 * Family B tables.
 */
describe("LinkTreeBlock untyped-payload enum hardening", () => {
  const HARD_LOGO = {
    src: "https://cdn.example.com/hardening-mark.png",
    alt: "Hardened mark",
  };
  const HARD_BANNER = {
    src: "https://cdn.example.com/hardening-band.jpg",
    alt: "Hardened band",
  };

  it('collapses an out-of-contract logoAspect ("portrait") to horizontal', () => {
    const { container } = render(
      <LinkTreeBlock
        brandName="Test"
        logo={HARD_LOGO}
        logoAspect={"portrait" as unknown as "square"}
        avatarClassName="hardening-box"
      />,
    );

    expect(container.querySelector(".hardening-box")).toHaveClass(
      "flex",
      "h-24",
      "w-full",
      "max-w-72",
      "items-center",
      "justify-center",
    );
    expect(screen.getByAltText("Hardened mark")).toHaveClass(
      "w-auto",
      "object-contain",
      "max-h-12",
      "sm:max-h-14",
      "lg:max-h-16",
    );
  });

  it("falls back to the standard band ratio for an out-of-contract logoBannerAspect", () => {
    const { container } = render(
      <LinkTreeBlock
        brandName="Test"
        logoAspect="banner"
        logoBannerImage={HARD_BANNER}
        logoBannerAspect={"16:9" as unknown as "wide"}
      />,
    );

    expect(
      container.querySelector('[data-slot="link-page-banner"]'),
    ).toHaveClass(
      "relative",
      "left-1/2",
      "flex",
      "w-screen",
      "max-w-none",
      "-translate-x-1/2",
      "items-center",
      "justify-center",
      "aspect-[16/7]",
    );
    // Neither the tier height cap nor overflow-hidden may sit on the band:
    // both clip artwork taller than the reserved ratio (browser-verified).
    expect(
      container.querySelector('[data-slot="link-page-banner"]'),
    ).not.toHaveClass("max-h-[60vh]");
    expect(
      container.querySelector('[data-slot="link-page-banner"]'),
    ).not.toHaveClass("overflow-hidden");
    expect(
      container.querySelector('[data-slot="link-page-banner"] img'),
    ).toHaveClass("h-auto", "max-h-[60vh]", "w-full", "object-contain");
  });
});
