import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { LinkPageGridCards } from "../link-page-grid-cards";

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
    size,
    className,
  }: {
    name?: React.ReactNode | string;
    size?: number;
    className?: string;
  }) =>
    typeof name === "string" ? (
      <span
        data-testid="mock-icon"
        data-name={name}
        data-size={size}
        className={className}
      />
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

describe("LinkPageGridCards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders links as cards", () => {
    const links = [
      {
        id: "1",
        label: "Portfolio",
        href: "https://example.com",
        description: "View work",
      },
      { id: "2", label: "Blog", href: "https://example.com/blog" },
    ];
    render(<LinkPageGridCards name="Test" links={links} />);
    expect(screen.getByText("Portfolio")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("View work")).toBeInTheDocument();
  });

  it("routes card and footer icons through DynamicIcon with existing precedence", () => {
    const { container, rerender } = render(
      <LinkPageGridCards
        name="Test"
        cardIconClassName="card-icon"
        links={[
          {
            id: "string",
            label: "String card",
            href: "/string",
            icon: "lucide/card-override",
            iconName: "lucide/card-fallback",
          },
          {
            id: "custom",
            label: "Custom card",
            href: "/custom",
            icon: <span data-testid="custom-card-icon" />,
          },
          {
            id: "children",
            label: "Hidden card label",
            href: "/children",
            icon: "lucide/hidden-card",
            children: <span data-testid="card-children">Custom card</span>,
          },
        ]}
        footerAction={{
          label: "Footer string",
          href: "/footer-string",
          icon: "lucide/footer-leading",
          iconAfter: "lucide/footer-trailing",
        }}
      />,
    );

    const stringCard = container.querySelector(
      '[href="/string"]',
    ) as HTMLElement;
    const cardIcon = within(stringCard).getByTestId("mock-icon");
    expect(cardIcon).toHaveAttribute("data-name", "lucide/card-override");
    expect(cardIcon).toHaveAttribute("data-size", "24");
    expect(cardIcon).toHaveClass("card-icon");
    expect(stringCard).not.toHaveTextContent("lucide/card-override");
    expect(
      stringCard.querySelector('[data-name="lucide/card-fallback"]'),
    ).not.toBeInTheDocument();

    const customCard = container.querySelector(
      '[href="/custom"]',
    ) as HTMLElement;
    expect(
      within(customCard).getByTestId("custom-card-icon"),
    ).toBeInTheDocument();

    const childrenCard = container.querySelector(
      '[href="/children"]',
    ) as HTMLElement;
    expect(
      within(childrenCard).getByTestId("card-children"),
    ).toBeInTheDocument();
    expect(
      within(childrenCard).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Hidden card label")).not.toBeInTheDocument();

    const stringFooter = container.querySelector(
      '[href="/footer-string"]',
    ) as HTMLElement;
    expect(
      within(stringFooter).getAllByTestId("mock-icon").map((icon) =>
        icon.getAttribute("data-name"),
      ),
    ).toEqual(["lucide/footer-leading", "lucide/footer-trailing"]);
    expect(stringFooter).not.toHaveTextContent("lucide/footer-leading");
    expect(stringFooter).not.toHaveTextContent("lucide/footer-trailing");

    rerender(
      <LinkPageGridCards
        name="Test"
        links={[
          {
            label: "Falsy override",
            href: "/falsy",
            icon: 0,
            iconName: "lucide/falsy-fallback",
          },
        ]}
        footerAction={{
          label: "Sentinel footer",
          href: "/footer-sentinel",
          icon: 0,
          iconAfter: 0,
        }}
      />,
    );
    expect(
      container.querySelector('[href="/falsy"] [data-name="lucide/falsy-fallback"]'),
    ).toBeInTheDocument();
    const sentinelFooter = container.querySelector(
      '[href="/footer-sentinel"]',
    ) as HTMLElement;
    expect(sentinelFooter).toHaveTextContent("0Sentinel footer0");
    expect(
      within(sentinelFooter).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();

    rerender(
      <LinkPageGridCards
        name="Test"
        footerAction={{
          label: "Custom footer",
          href: "/footer-custom",
          icon: <span data-testid="custom-footer-leading" />,
          iconAfter: <span data-testid="custom-footer-trailing" />,
        }}
      />,
    );
    const customFooter = container.querySelector(
      '[href="/footer-custom"]',
    ) as HTMLElement;
    expect(
      within(customFooter).getByTestId("custom-footer-leading"),
    ).toBeInTheDocument();
    expect(
      within(customFooter).getByTestId("custom-footer-trailing"),
    ).toBeInTheDocument();

    rerender(
      <LinkPageGridCards
        name="Test"
        footerAction={{
          label: "Hidden footer label",
          href: "/footer-children",
          icon: "lucide/hidden-footer",
          children: 0,
        }}
      />,
    );
    const childrenFooter = container.querySelector(
      '[href="/footer-children"]',
    ) as HTMLElement;
    expect(childrenFooter).toHaveTextContent("0");
    expect(childrenFooter).not.toHaveTextContent("Hidden footer label");
    expect(
      within(childrenFooter).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();
  });

  it("renders avatars with responsive containment", () => {
    render(<LinkPageGridCards name="Test" avatarUrl="/logo-wide.png" />);

    expect(screen.getByAltText("Test")).toHaveClass(
      "h-auto",
      "max-h-20",
      "w-auto",
      "max-w-full",
      "object-contain",
      "sm:max-h-24",
    );
  });
});

// ---------------------------------------------------------------------------
// logoAspect / logoBannerImage (design 00-DESIGN-link-page-logos.md §2, family A)
// ---------------------------------------------------------------------------

const LOGO = {
  src: "https://cdn.example.com/acme-mark.png",
  alt: "Acme mark",
};
const BANNER = {
  src: "https://cdn.example.com/acme-banner.jpg",
  alt: "Acme storefront banner",
};

/** Section element rendered by the block (Section puts `spacing` on it verbatim). */
const sectionOf = (container: HTMLElement): HTMLElement =>
  container.querySelector("#link-page-grid-cards") as HTMLElement;

const bannerOf = (container: HTMLElement): HTMLElement | null =>
  container.querySelector('[data-slot="link-page-banner"]');

describe("LinkPageGridCards logoAspect", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("keeps the legacy horizontal box and img class strings byte-identical by default", () => {
    const { container } = render(
      <LinkPageGridCards name="Test" avatarUrl="/logo-wide.png" />,
    );

    const img = screen.getByAltText("Test");
    expect(img.className).toBe(
      "h-auto max-h-20 w-auto max-w-full object-contain sm:max-h-24",
    );
    expect((img.parentElement as HTMLElement).className).toBe(
      "flex h-20 w-full max-w-56 items-center justify-center sm:h-24 sm:max-w-72",
    );
    expect(bannerOf(container)).not.toBeInTheDocument();
    // Non-banner output stays byte-identical: the flush-top/clip literals are
    // injected ONLY in banner mode, so the Section className is unchanged.
    expect(sectionOf(container).className).toBe(
      "relative bg-background text-foreground py-12 md:py-32",
    );
    expect(sectionOf(container)).not.toHaveClass(
      "overflow-x-clip",
      "pt-0",
      "md:pt-0",
    );
  });

  it("falls through to the avatar when the logo object has a null src", () => {
    // Stored payloads routinely carry {"alt": "...", "src": null} (the octane
    // brand-mark stripper produces exactly that). BrandLogo returns null for a
    // src-less logo, so truthiness on the object alone left an EMPTY medallion
    // box and swallowed the avatar that could still render.
    render(
      <LinkPageGridCards
        name="Acme"
        logo={{ alt: "Stored logo alt", src: null as unknown as string }}
        avatar={{
          src: "https://cdn.example.com/acme-avatar.png",
          alt: "Acme avatar",
        }}
      />,
    );

    const img = screen.getByAltText("Acme avatar");
    expect(img).toHaveAttribute("src", "https://cdn.example.com/acme-avatar.png");
    expect(img.className).toBe(
      "h-auto max-h-20 w-auto max-w-full object-contain sm:max-h-24",
    );
    // The medallion box is not an empty box: its only child is the avatar img.
    const box = img.parentElement as HTMLElement;
    expect(box.className).toBe(
      "flex h-20 w-full max-w-56 items-center justify-center sm:h-24 sm:max-w-72",
    );
    expect(box.children).toHaveLength(1);
    expect(screen.queryByAltText("Stored logo alt")).not.toBeInTheDocument();
  });

  it('renders a square BrandLogo large and centered when logoAspect="square"', () => {
    const { container } = render(
      <LinkPageGridCards name="Test" logo={LOGO} logoAspect="square" />,
    );

    const img = screen.getByAltText("Acme mark");
    expect(img).toHaveClass(
      "w-auto",
      "object-contain",
      "max-h-40",
      "max-w-full",
      "sm:max-h-44",
      "lg:max-h-48",
    );
    // BrandLogo wraps the img in its own flex wrapper; the box is the grandparent.
    const box = (img.parentElement as HTMLElement).parentElement as HTMLElement;
    expect(box).toHaveClass(
      "flex",
      "h-40",
      "w-full",
      "items-center",
      "justify-center",
      "sm:h-44",
      "lg:h-48",
    );
    expect(box).not.toHaveClass("h-20", "sm:h-24", "max-w-56", "sm:max-w-72");
    expect(bannerOf(container)).not.toBeInTheDocument();
  });

  it('renders a tall BrandLogo when logoAspect="vertical"', () => {
    render(<LinkPageGridCards name="Test" logo={LOGO} logoAspect="vertical" />);

    const img = screen.getByAltText("Acme mark");
    expect(img).toHaveClass(
      "w-auto",
      "object-contain",
      "max-h-48",
      "max-w-full",
      "sm:max-h-56",
      "lg:max-h-64",
    );
    const box = (img.parentElement as HTMLElement).parentElement as HTMLElement;
    expect(box).toHaveClass(
      "flex",
      "h-48",
      "w-full",
      "items-center",
      "justify-center",
      "sm:h-56",
      "lg:h-64",
    );
  });

  it('applies the square IMG table to the avatar fallback branch when logoAspect="square"', () => {
    render(
      <LinkPageGridCards name="Test" avatarUrl="/mark.png" logoAspect="square" />,
    );

    const img = screen.getByAltText("Test");
    expect(img.className).toBe(
      "h-auto max-h-40 w-auto max-w-full object-contain sm:max-h-44 lg:max-h-48",
    );
    expect(img.parentElement as HTMLElement).toHaveClass(
      "flex",
      "h-40",
      "w-full",
      "items-center",
      "justify-center",
      "sm:h-44",
      "lg:h-48",
    );
  });

  it('applies the vertical IMG table to the avatar fallback branch when logoAspect="vertical"', () => {
    render(
      <LinkPageGridCards name="Test" avatarUrl="/mark.png" logoAspect="vertical" />,
    );

    expect(screen.getByAltText("Test").className).toBe(
      "h-auto max-h-48 w-auto max-w-full object-contain sm:max-h-56 lg:max-h-64",
    );
  });
});

describe("LinkPageGridCards logo banner", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders a full-bleed banner as the first Section child and suppresses the medallion", () => {
    const { container } = render(
      <LinkPageGridCards
        name="Test"
        logo={LOGO}
        avatarUrl="/mark.png"
        logoAspect="banner"
        logoBannerImage={BANNER}
      />,
    );

    const banner = bannerOf(container) as HTMLElement;
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
    // First child inside the Section's Container, before the inner layout div.
    const section = sectionOf(container);
    const containerEl = banner.parentElement as HTMLElement;
    expect(section).toContainElement(banner);
    expect(containerEl.firstElementChild).toBe(banner);
    // Pin the SIBLING relation: the banner must precede the block's inner
    // layout div, never live inside it (moving it in would break this).
    expect(banner.nextElementSibling).toHaveClass(
      "flex",
      "min-h-screen",
      "w-full",
      "items-start",
      "justify-center",
      "py-12",
    );

    const bannerImg = within(banner).getByTestId("mock-img");
    expect(bannerImg).toHaveClass(
      "h-auto",
      "max-h-[60vh]",
      "w-full",
      "object-contain",
    );
    // The banner artwork is never cropped and never stretched to the band.
    expect(bannerImg).not.toHaveClass("object-cover");
    expect(bannerImg).not.toHaveClass("size-full");
    expect(bannerImg).toHaveAttribute("src", BANNER.src);
    expect(bannerImg).toHaveAttribute("alt", BANNER.alt);

    // Medallion ladder is not rendered at all in banner mode.
    expect(screen.queryByAltText("Acme mark")).not.toBeInTheDocument();
    expect(screen.queryByAltText("Test")).not.toBeInTheDocument();
    expect(screen.getAllByTestId("mock-img")).toHaveLength(1);
    expect(
      container.querySelector(".justify-center.sm\\:max-w-72"),
    ).not.toBeInTheDocument();

    // Section top padding is zeroed so the banner sits flush at the top, and
    // the w-screen breakout's half-scrollbar overhang is clipped. The spacing
    // preset itself passes through UNCHANGED — pt-0/md:pt-0 win by CSS order.
    expect(section).toHaveClass(
      "overflow-x-clip",
      "pt-0",
      "md:pt-0",
      "py-12",
      "md:py-32",
    );
  });

  it("leaves banner/content spacing to the block layout (no banner margin utility)", () => {
    const { container } = render(
      <LinkPageGridCards
        name="Test"
        logoAspect="banner"
        logoBannerImage={BANNER}
      />,
    );

    // grid-cards' inner layout div carries py-12, so the banner needs no mb-*.
    const banner = bannerOf(container) as HTMLElement;
    expect(banner).not.toHaveClass("mb-8", "sm:mb-10");
    expect(banner.nextElementSibling).toHaveClass("py-12");
  });

  it('behaves exactly like horizontal when logoAspect="banner" has no banner src', () => {
    const { container } = render(
      <LinkPageGridCards name="Test" avatarUrl="/logo-wide.png" logoAspect="banner" />,
    );

    expect(bannerOf(container)).not.toBeInTheDocument();
    const img = screen.getByAltText("Test");
    expect(img.className).toBe(
      "h-auto max-h-20 w-auto max-w-full object-contain sm:max-h-24",
    );
    expect((img.parentElement as HTMLElement).className).toBe(
      "flex h-20 w-full max-w-56 items-center justify-center sm:h-24 sm:max-w-72",
    );
    expect(sectionOf(container)).toHaveClass("py-12", "md:py-32");
    expect(sectionOf(container)).not.toHaveClass(
      "pt-0",
      "md:pt-0",
      "overflow-x-clip",
    );
  });

  it("keeps explicit consumer spacing while flushing the banner to the top", () => {
    const { container } = render(
      <LinkPageGridCards
        name="Test"
        logoAspect="banner"
        logoBannerImage={BANNER}
        spacing="py-4"
      />,
    );

    expect(bannerOf(container)).toBeInTheDocument();
    const section = sectionOf(container);
    // Consumer spacing is passed through untouched (no sentinel swap); the
    // flush-top override rides on className instead.
    expect(section).toHaveClass("py-4", "overflow-x-clip", "pt-0", "md:pt-0");
    expect(section).not.toHaveClass("pb-12", "md:pb-32");
  });

  it('keeps the spacing preset intact in banner mode with spacing="lg"', () => {
    const { container } = render(
      <LinkPageGridCards
        name="Test"
        logoAspect="banner"
        logoBannerImage={BANNER}
        spacing="lg"
      />,
    );

    expect(bannerOf(container)).toBeInTheDocument();
    // The lg preset ("py-20 md:py-32") still resolves through Section; only the
    // top padding is overridden by the appended pt-0/md:pt-0 literals.
    expect(sectionOf(container)).toHaveClass(
      "py-20",
      "md:py-32",
      "overflow-x-clip",
      "pt-0",
      "md:pt-0",
    );
  });

  it("maps logoBannerAspect onto the banner band ratio", () => {
    const { container, rerender } = render(
      <LinkPageGridCards
        name="Test"
        logoAspect="banner"
        logoBannerImage={BANNER}
        logoBannerAspect="wide"
      />,
    );
    // Box reserves the tier SHAPE only; the tier height cap lives on the
    // image, where it letterboxes instead of clipping the artwork.
    expect(bannerOf(container)).toHaveClass("aspect-[3/1]");
    expect(bannerOf(container)).not.toHaveClass("aspect-[16/7]");
    expect(bannerOf(container)).not.toHaveClass("max-h-[50vh]");
    expect(bannerOf(container)?.querySelector("img")).toHaveClass(
      "max-h-[50vh]",
      "object-contain",
    );

    rerender(
      <LinkPageGridCards
        name="Test"
        logoAspect="banner"
        logoBannerImage={BANNER}
        logoBannerAspect="ultrawide"
      />,
    );
    expect(bannerOf(container)).toHaveClass("aspect-[4/1]");
    expect(bannerOf(container)).not.toHaveClass("max-h-[40vh]");
    expect(bannerOf(container)?.querySelector("img")).toHaveClass(
      "max-h-[40vh]",
      "object-contain",
    );

    rerender(
      <LinkPageGridCards
        name="Test"
        logoAspect="banner"
        logoBannerImage={BANNER}
        logoBannerAspect="standard"
      />,
    );
    expect(bannerOf(container)).toHaveClass("aspect-[16/7]");
    expect(bannerOf(container)).not.toHaveClass("max-h-[60vh]");
    expect(bannerOf(container)?.querySelector("img")).toHaveClass(
      "max-h-[60vh]",
      "object-contain",
    );
  });
});

describe("LinkPageGridCards stored-payload byte compatibility", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the 1124-shape payload through BrandLogo with the legacy xl classes", () => {
    const { container } = render(
      <LinkPageGridCards
        name="Acme"
        bio="Everything Acme"
        logo={{
          alt: "Acme",
          src: "https://cdn.example.com/1124-logo.png",
          url: "/",
        }}
        avatar={{ alt: "Acme", src: null as unknown as string }}
        links={[{ id: "1", label: "Menu", href: "/menu" }]}
      />,
    );

    const img = screen.getByAltText("Acme");
    expect(img.className).toBe(
      "w-auto object-contain max-h-12 sm:max-h-14 lg:max-h-16",
    );
    // logo.url routes through Pressable; the box is the anchor's parent.
    const box = (img.parentElement as HTMLElement).parentElement as HTMLElement;
    expect(box.className).toBe(
      "flex h-20 w-full max-w-56 items-center justify-center sm:h-24 sm:max-w-72",
    );

    // No <img> anywhere with a null/empty src (stored {alt, src: null} shapes).
    const imgs = Array.from(container.querySelectorAll("img"));
    expect(imgs).toHaveLength(1);
    imgs.forEach((el) => {
      expect(el.getAttribute("src")).toBeTruthy();
    });
  });

  it("renders no image when the only avatar shape has a null src", () => {
    const { container } = render(
      <LinkPageGridCards
        name="Acme"
        avatar={{ alt: "Acme", src: null as unknown as string }}
      />,
    );

    expect(container.querySelectorAll("img")).toHaveLength(0);
  });

  it("falls back to avatarUrl when the avatar object has a null src", () => {
    render(
      <LinkPageGridCards
        name="Acme"
        avatar={{ alt: "Stored alt", src: null as unknown as string }}
        avatarUrl="/legacy-avatar.png"
      />,
    );

    const img = screen.getByAltText("Acme");
    expect(img).toHaveAttribute("src", "/legacy-avatar.png");
  });
});

/**
 * Untyped-payload enum hardening. Stored design payloads are raw JSON, so an
 * out-of-contract logoAspect / logoBannerAspect string can reach the class
 * tables. Garbage must degrade to the documented defaults ("horizontal" /
 * "standard"), never to a size-less medallion box or a zero-height banner.
 */
describe("LinkPageGridCards untyped-payload enum hardening", () => {
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
      <LinkPageGridCards
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
      <LinkPageGridCards
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
