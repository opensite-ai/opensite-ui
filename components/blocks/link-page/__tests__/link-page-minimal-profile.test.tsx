import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LinkPageMinimalProfile } from "../link-page-minimal-profile";

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

describe("LinkPageMinimalProfile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders links when provided", () => {
    const links = [
      { id: "1", label: "Portfolio", href: "https://example.com" },
      { id: "2", label: "Blog", href: "https://example.com/blog" },
    ];
    render(<LinkPageMinimalProfile name="Test" links={links} />);
    expect(screen.getByText("Portfolio")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
  });

  it("renders avatars with responsive containment", () => {
    render(<LinkPageMinimalProfile name="Test" avatarUrl="/logo-wide.png" />);

    expect(screen.getByAltText("Test")).toHaveClass(
      "h-auto",
      "max-h-20",
      "w-auto",
      "max-w-full",
      "object-contain",
      "sm:max-h-24",
    );
  });

  it("resolves string and custom link icons while preserving truthy fallback precedence", () => {
    render(
      <LinkPageMinimalProfile
        name="Test"
        linkIconClassName="link-icon-class"
        links={[
          {
            id: "string",
            label: "String icon",
            icon: "lucide/rocket",
            iconName: "lucide/string-fallback",
          },
          {
            id: "custom",
            label: "Custom icon",
            icon: <span data-testid="custom-link-icon">custom</span>,
            iconName: "lucide/custom-fallback",
          },
          {
            id: "empty",
            label: "Empty icon",
            icon: "",
            iconName: "lucide/empty-fallback",
          },
          {
            id: "false",
            label: "False icon",
            icon: false,
            iconName: "lucide/false-fallback",
          },
          {
            id: "zero",
            label: "Zero icon",
            icon: 0,
            iconName: "lucide/zero-fallback",
          },
        ]}
      />,
    );

    const stringLink = screen
      .getByText("String icon")
      .closest('[data-testid="mock-pressable"]') as HTMLElement;
    const stringIcon = stringLink.querySelector(
      '[data-name="lucide/rocket"]',
    );
    expect(stringIcon).toHaveAttribute("data-size", "18");
    expect(stringIcon).toHaveClass("link-icon-class");
    expect(stringLink).not.toHaveTextContent("lucide/rocket");
    expect(
      stringLink.querySelector('[data-name="lucide/string-fallback"]'),
    ).not.toBeInTheDocument();

    const customLink = screen
      .getByText("Custom icon")
      .closest('[data-testid="mock-pressable"]') as HTMLElement;
    expect(customLink).toContainElement(screen.getByTestId("custom-link-icon"));
    expect(
      customLink.querySelector('[data-name="lucide/custom-fallback"]'),
    ).not.toBeInTheDocument();

    for (const [label, fallback] of [
      ["Empty icon", "lucide/empty-fallback"],
      ["False icon", "lucide/false-fallback"],
      ["Zero icon", "lucide/zero-fallback"],
    ]) {
      const link = screen
        .getByText(label)
        .closest('[data-testid="mock-pressable"]') as HTMLElement;
      expect(link.querySelector(`[data-name="${fallback}"]`)).toBeInTheDocument();
    }
  });

  it("resolves footer action icons without changing scalar or children semantics", () => {
    const { container, rerender } = render(
      <LinkPageMinimalProfile
        name="Test"
        footerAction={{
          label: "Footer action",
          href: "/footer",
          icon: "lucide/footer-before",
          iconAfter: <span data-testid="custom-footer-after">after</span>,
        }}
      />,
    );

    const footer = container.querySelector('a[href="/footer"]') as HTMLElement;
    expect(
      footer.querySelector('[data-name="lucide/footer-before"]'),
    ).toBeInTheDocument();
    expect(footer).toContainElement(screen.getByTestId("custom-footer-after"));
    expect(footer).not.toHaveTextContent("lucide/footer-before");

    rerender(
      <LinkPageMinimalProfile
        name="Test"
        footerAction={{
          label: "Scalar footer",
          href: "/scalar",
          icon: 0,
          iconAfter: false,
        }}
      />,
    );
    const scalarFooter = container.querySelector(
      'a[href="/scalar"]',
    ) as HTMLElement;
    expect(scalarFooter.textContent).toContain("0");
    expect(
      scalarFooter.querySelector('[data-testid="mock-icon"]'),
    ).not.toBeInTheDocument();

    rerender(
      <LinkPageMinimalProfile
        name="Test"
        footerAction={{
          label: "Empty footer",
          href: "/empty",
          icon: "",
          iconAfter: "",
        }}
      />,
    );
    const emptyFooter = container.querySelector(
      'a[href="/empty"]',
    ) as HTMLElement;
    expect(
      emptyFooter.querySelector('[data-testid="mock-icon"]'),
    ).not.toBeInTheDocument();

    rerender(
      <LinkPageMinimalProfile
        name="Test"
        footerAction={{
          label: "Hidden label",
          href: "/children",
          icon: "lucide/hidden-before",
          iconAfter: "lucide/hidden-after",
          children: <span>Footer children</span>,
        }}
      />,
    );
    const childrenFooter = container.querySelector(
      'a[href="/children"]',
    ) as HTMLElement;
    expect(
      childrenFooter.querySelector('[data-name="lucide/hidden-before"]'),
    ).not.toBeInTheDocument();
    expect(
      childrenFooter.querySelector('[data-name="lucide/hidden-after"]'),
    ).not.toBeInTheDocument();
  });
});

/**
 * logoAspect / logoBanner* coverage (DESIGN §2.4). Family A tables.
 * The pinned assertions above are the byte-compatibility contract for
 * `logoAspect` unset and MUST stay untouched.
 */
describe("LinkPageMinimalProfile logo placement (logoAspect)", () => {
  const LOGO_SRC = "https://cdn.example.com/brand-logo.png";
  const BANNER_SRC = "https://cdn.example.com/brand-banner.jpg";

  const medallionBox = (container: HTMLElement) =>
    container.querySelector(".medallion-box");
  const bannerEl = (container: HTMLElement) =>
    container.querySelector('[data-slot="link-page-banner"]');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders a square logo LARGE on the BrandLogo branch (logoAspect="square")', () => {
    const { container } = render(
      <LinkPageMinimalProfile
        name="Test"
        logo={{ src: LOGO_SRC, alt: "Brand" }}
        logoAspect="square"
        avatarClassName="medallion-box"
      />,
    );

    const logoImg = screen.getByAltText("Brand");
    expect(logoImg).toHaveClass(
      "w-auto",
      "object-contain",
      "max-h-40",
      "max-w-full",
      "sm:max-h-44",
      "lg:max-h-48",
    );
    expect(logoImg).not.toHaveClass("max-h-12");
    expect(logoImg).not.toHaveClass("sm:max-h-14");
    expect(logoImg).not.toHaveClass("lg:max-h-16");

    const box = medallionBox(container);
    expect(box).toHaveClass(
      "flex",
      "h-40",
      "w-full",
      "items-center",
      "justify-center",
      "sm:h-44",
      "lg:h-48",
    );
    expect(box).not.toHaveClass("h-20");
    expect(box).not.toHaveClass("max-w-56");
    expect(box).not.toHaveClass("sm:max-w-72");
  });

  it('renders a vertical logo tall on the BrandLogo branch (logoAspect="vertical")', () => {
    const { container } = render(
      <LinkPageMinimalProfile
        name="Test"
        logo={{ src: LOGO_SRC, alt: "Brand" }}
        logoAspect="vertical"
        avatarClassName="medallion-box"
      />,
    );

    const logoImg = screen.getByAltText("Brand");
    expect(logoImg).toHaveClass(
      "w-auto",
      "object-contain",
      "max-h-48",
      "max-w-full",
      "sm:max-h-56",
      "lg:max-h-64",
    );
    expect(logoImg).not.toHaveClass("max-h-12");

    const box = medallionBox(container);
    expect(box).toHaveClass(
      "flex",
      "h-48",
      "w-full",
      "items-center",
      "justify-center",
      "sm:h-56",
      "lg:h-64",
    );
    expect(box).not.toHaveClass("max-w-56");
  });

  it("applies the square IMG table on the avatar fallback branch", () => {
    const { container } = render(
      <LinkPageMinimalProfile
        name="Test"
        avatarUrl="/logo-wide.png"
        logoAspect="square"
        avatarClassName="medallion-box"
      />,
    );

    const avatarImg = screen.getByAltText("Test");
    expect(avatarImg).toHaveClass(
      "h-auto",
      "max-h-40",
      "w-auto",
      "max-w-full",
      "object-contain",
      "sm:max-h-44",
      "lg:max-h-48",
    );
    expect(avatarImg).not.toHaveClass("max-h-20");
    expect(avatarImg).not.toHaveClass("sm:max-h-24");

    expect(medallionBox(container)).toHaveClass(
      "flex",
      "h-40",
      "w-full",
      "items-center",
      "justify-center",
      "sm:h-44",
      "lg:h-48",
    );
  });

  it("applies the vertical IMG table on the avatar fallback branch", () => {
    const { container } = render(
      <LinkPageMinimalProfile
        name="Test"
        avatarUrl="/logo-tall.png"
        logoAspect="vertical"
        avatarClassName="medallion-box"
      />,
    );

    expect(screen.getByAltText("Test")).toHaveClass(
      "h-auto",
      "max-h-48",
      "w-auto",
      "max-w-full",
      "object-contain",
      "sm:max-h-56",
      "lg:max-h-64",
    );
    expect(medallionBox(container)).toHaveClass("h-48", "sm:h-56", "lg:h-64");
  });

  it('renders a full-bleed banner and suppresses the medallion (logoAspect="banner")', () => {
    const { container } = render(
      <LinkPageMinimalProfile
        name="Test"
        logo={{ src: LOGO_SRC, alt: "Brand" }}
        logoAspect="banner"
        logoBannerImage={{ src: BANNER_SRC, alt: "Storefront at dusk" }}
        avatarClassName="medallion-box"
      />,
    );

    const banner = bannerEl(container);
    expect(banner).toBeInTheDocument();
    expect(banner).toHaveClass(
      "relative",
      "left-1/2",
      "w-screen",
      "max-w-none",
      "-translate-x-1/2",
      "overflow-hidden",
      "aspect-[16/7]",
      "max-h-[60vh]",
    );
    // The inner div's py-16 supplies the gap under the banner; no extra margin.
    expect(banner).not.toHaveClass("mb-8");
    expect(banner).not.toHaveClass("sm:mb-10");

    const bannerImg = banner?.querySelector("img");
    expect(bannerImg).toHaveAttribute("src", BANNER_SRC);
    expect(bannerImg).toHaveClass("size-full", "object-cover");
    expect(screen.getByAltText("Storefront at dusk")).toBe(bannerImg);

    // Banner is the FIRST child inside the Section's Container, immediately
    // followed by this block's inner layout div. Pinning the sibling relation
    // (not just "some first child") is what fails if the banner is ever moved
    // inside that layout div, where the breakout would no longer sit flush.
    expect(banner?.parentElement?.firstElementChild).toBe(banner);
    expect(banner?.nextElementSibling).toHaveClass(
      "flex",
      "min-h-screen",
      "w-full",
      "items-start",
      "justify-center",
      "py-16",
    );

    // Medallion ladder is not rendered at all in banner mode.
    expect(medallionBox(container)).toBeNull();
    expect(screen.queryByAltText("Brand")).not.toBeInTheDocument();
    expect(container.querySelectorAll('[data-testid="mock-img"]')).toHaveLength(
      1,
    );

    // Section spacing is passed through UNCHANGED; the flush-top effect comes
    // from the literal pt-0/md:pt-0 override appended after the spacing classes
    // (CSS order wins), and overflow-x-clip contains the w-screen breakout's
    // half-scrollbar overhang so the page cannot scroll horizontally.
    const section = container.querySelector("section");
    expect(section).toHaveClass(
      "py-12",
      "md:py-32",
      "overflow-x-clip",
      "pt-0",
      "md:pt-0",
    );
  });

  it('behaves exactly as horizontal when logoAspect="banner" has no banner src', () => {
    const { container, rerender } = render(
      <LinkPageMinimalProfile
        name="Test"
        avatarUrl="/logo-wide.png"
        logoAspect="banner"
        avatarClassName="medallion-box"
      />,
    );

    const assertLegacy = () => {
      expect(bannerEl(container)).toBeNull();
      expect(screen.getByAltText("Test")).toHaveClass(
        "h-auto",
        "max-h-20",
        "w-auto",
        "max-w-full",
        "object-contain",
        "sm:max-h-24",
      );
      expect(medallionBox(container)).toHaveClass(
        "flex",
        "h-20",
        "w-full",
        "max-w-56",
        "items-center",
        "justify-center",
        "sm:h-24",
        "sm:max-w-72",
      );
      const section = container.querySelector("section");
      expect(section).toHaveClass("py-12", "md:py-32");
      // Nothing is injected outside banner mode — byte-compatible Section class.
      expect(section).not.toHaveClass("pt-0");
      expect(section).not.toHaveClass("md:pt-0");
      expect(section).not.toHaveClass("overflow-x-clip");
    };

    assertLegacy();

    rerender(
      <LinkPageMinimalProfile
        name="Test"
        avatarUrl="/logo-wide.png"
        logoAspect="banner"
        logoBannerImage={{ src: "", alt: "Empty" }}
        avatarClassName="medallion-box"
      />,
    );
    assertLegacy();
  });

  it("passes an explicit raw spacing string through unchanged in banner mode", () => {
    const { container } = render(
      <LinkPageMinimalProfile
        name="Test"
        logoAspect="banner"
        logoBannerImage={{ src: BANNER_SRC, alt: "Storefront at dusk" }}
        spacing="py-4"
      />,
    );

    expect(bannerEl(container)).toBeInTheDocument();
    const section = container.querySelector("section");
    // The consumer's spacing survives verbatim (no sentinel swap); only the
    // flush-top override and the breakout clip are added.
    expect(section).toHaveClass("py-4", "overflow-x-clip", "pt-0", "md:pt-0");
    expect(section).not.toHaveClass("pb-12");
    expect(section).not.toHaveClass("md:pb-32");
  });

  it('preserves a Section spacing PRESET in banner mode (spacing="lg")', () => {
    const { container } = render(
      <LinkPageMinimalProfile
        name="Test"
        logoAspect="banner"
        logoBannerImage={{ src: BANNER_SRC, alt: "Storefront at dusk" }}
        spacing="lg"
      />,
    );

    expect(bannerEl(container)).toBeInTheDocument();
    const section = container.querySelector("section");
    // Section's "lg" preset is py-20 md:py-32 — it must still be emitted, with
    // the flush-top override layered on top of it.
    expect(section).toHaveClass(
      "py-20",
      "md:py-32",
      "overflow-x-clip",
      "pt-0",
      "md:pt-0",
    );
  });

  it("leaves the Section class byte-compatible when logoAspect is unset", () => {
    const { container } = render(
      <LinkPageMinimalProfile name="Test" avatarUrl="/logo-wide.png" />,
    );

    const section = container.querySelector("section");
    expect(section).toHaveClass("py-12", "md:py-32");
    expect(section).not.toHaveClass("overflow-x-clip");
    expect(section).not.toHaveClass("pt-0");
    expect(section).not.toHaveClass("md:pt-0");
  });

  it("maps logoBannerAspect onto the banner aspect table", () => {
    const { container, rerender } = render(
      <LinkPageMinimalProfile
        name="Test"
        logoAspect="banner"
        logoBannerImage={{ src: BANNER_SRC, alt: "Storefront at dusk" }}
        logoBannerAspect="wide"
      />,
    );

    let banner = bannerEl(container);
    expect(banner).toHaveClass("aspect-[3/1]", "max-h-[50vh]");
    expect(banner).not.toHaveClass("aspect-[16/7]");

    rerender(
      <LinkPageMinimalProfile
        name="Test"
        logoAspect="banner"
        logoBannerImage={{ src: BANNER_SRC, alt: "Storefront at dusk" }}
        logoBannerAspect="ultrawide"
      />,
    );

    banner = bannerEl(container);
    expect(banner).toHaveClass("aspect-[4/1]", "max-h-[40vh]");
    expect(banner).not.toHaveClass("aspect-[3/1]");
  });

  it("keeps the legacy xl ceilings for a stored website-1124-shape payload", () => {
    const { container } = render(
      <LinkPageMinimalProfile
        name="Bonfire Ktap"
        logo={{ alt: "Bonfire", src: LOGO_SRC, url: "/" }}
        avatar={{ alt: "Bonfire", src: null as unknown as string }}
        links={[{ id: "1", label: "Menu", href: "https://example.com/menu" }]}
      />,
    );

    const logoImg = screen.getByAltText("Bonfire");
    expect(logoImg).toHaveClass(
      "w-auto",
      "object-contain",
      "max-h-12",
      "sm:max-h-14",
      "lg:max-h-16",
    );
    expect(logoImg).not.toHaveClass("max-w-full");

    for (const img of Array.from(container.querySelectorAll("img"))) {
      expect(img.getAttribute("src")).toBeTruthy();
    }
  });

  it("renders no image when the stored avatar has a null src", () => {
    const { container } = render(
      <LinkPageMinimalProfile
        name="Test"
        avatar={{ alt: "Broken", src: null as unknown as string }}
        avatarClassName="medallion-box"
      />,
    );

    expect(container.querySelectorAll('[data-testid="mock-img"]')).toHaveLength(
      0,
    );
    expect(container.querySelector("img")).toBeNull();
    // The ladder box itself still renders (byte-compatible wrapper).
    expect(medallionBox(container)).toHaveClass("flex", "h-20", "sm:h-24");
  });

  it("falls through to the avatar when the stored logo object has a null src", () => {
    // BrandLogo returns null for a src-less logo, so a ladder head that tests
    // the logo OBJECT emits an empty medallion box and silently swallows a
    // perfectly good avatar. The very common stored shape is {"alt":…,"src":null}.
    const { container } = render(
      <LinkPageMinimalProfile
        name="Test"
        logo={{ alt: "Brand", src: null as unknown as string }}
        avatar={{ alt: "Profile photo", src: "/avatar.png" }}
        avatarClassName="medallion-box"
      />,
    );

    const avatarImg = screen.getByAltText("Profile photo");
    expect(avatarImg).toHaveAttribute("src", "/avatar.png");
    expect(avatarImg).toHaveClass(
      "h-auto",
      "max-h-20",
      "w-auto",
      "max-w-full",
      "object-contain",
      "sm:max-h-24",
    );
    // The medallion box is not an empty box: it contains exactly that avatar.
    expect(medallionBox(container)?.querySelector("img")).toBe(avatarImg);
    expect(container.querySelectorAll('[data-testid="mock-img"]')).toHaveLength(
      1,
    );
    expect(screen.queryByAltText("Brand")).not.toBeInTheDocument();
  });

  it("falls through to logoSlot when the stored logo object has an empty src", () => {
    const { container } = render(
      <LinkPageMinimalProfile
        name="Test"
        logo={{ alt: "Brand", src: "" }}
        logoSlot={<span data-testid="custom-logo-slot">slot</span>}
        avatarUrl="/logo-wide.png"
        avatarClassName="medallion-box"
      />,
    );

    expect(medallionBox(container)).toContainElement(
      screen.getByTestId("custom-logo-slot"),
    );
    expect(container.querySelectorAll('[data-testid="mock-img"]')).toHaveLength(
      0,
    );
  });

  it("falls back to avatarUrl when the stored avatar object has a null src", () => {
    render(
      <LinkPageMinimalProfile
        name="Test"
        avatar={{ alt: "Broken", src: null as unknown as string }}
        avatarUrl="/logo-wide.png"
      />,
    );

    const img = screen.getByAltText("Test");
    expect(img).toHaveAttribute("src", "/logo-wide.png");
    expect(img).toHaveClass("max-h-20", "sm:max-h-24");
  });
});

/**
 * Untyped-payload enum hardening. Stored design payloads are raw JSON, so an
 * out-of-contract logoAspect / logoBannerAspect string can reach the class
 * tables. Garbage must degrade to the documented defaults ("horizontal" /
 * "standard"), never to a size-less medallion box or a zero-height banner.
 */
describe("LinkPageMinimalProfile untyped-payload enum hardening", () => {
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
      <LinkPageMinimalProfile
        name="Test"
        logo={HARD_LOGO}
        logoAspect={"portrait" as unknown as "square"}
        avatarClassName="hardening-box"
      />,
    );

    expect(container.querySelector(".hardening-box")).toHaveClass(
      "flex",
      "h-20",
      "w-full",
      "max-w-56",
      "items-center",
      "justify-center",
      "sm:h-24",
      "sm:max-w-72",
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
      <LinkPageMinimalProfile
        name="Test"
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
      "w-screen",
      "max-w-none",
      "-translate-x-1/2",
      "overflow-hidden",
      "aspect-[16/7]",
      "max-h-[60vh]",
    );
  });
});
