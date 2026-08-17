import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { LinkPageBentoLayout } from "../link-page-bento-layout";

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

describe("LinkPageBentoLayout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders featured links in larger cells", () => {
    const links = [
      {
        id: "1",
        label: "Featured Link",
        href: "https://example.com",
        featured: true,
      },
      { id: "2", label: "Regular Link", href: "https://example.com/regular" },
    ];
    render(<LinkPageBentoLayout name="Test" links={links} />);
    expect(screen.getByText("Featured Link")).toBeInTheDocument();
    expect(screen.getByText("Regular Link")).toBeInTheDocument();
  });

  it("renders link descriptions when provided", () => {
    const links = [
      {
        id: "1",
        label: "Video",
        href: "https://example.com",
        featured: true,
        description: "Watch now",
      },
    ];
    render(<LinkPageBentoLayout name="Test" links={links} />);
    expect(screen.getByText("Watch now")).toBeInTheDocument();
  });

  it("routes link and footer icons through DynamicIcon with existing precedence", () => {
    const { container, rerender } = render(
      <LinkPageBentoLayout
        name="Test"
        featuredLinkIconClassName="featured-icon"
        regularLinkIconClassName="regular-icon"
        links={[
          {
            id: "featured-string",
            label: "Featured string",
            href: "/featured-string",
            featured: true,
            icon: "lucide/featured-override",
            iconName: "lucide/featured-fallback",
          },
          {
            id: "featured-custom",
            label: "Featured custom",
            href: "/featured-custom",
            featured: true,
            icon: <span data-testid="custom-featured-icon" />,
          },
          {
            id: "regular-string",
            label: "Regular string",
            href: "/regular-string",
            icon: "lucide/regular-override",
            iconName: "lucide/regular-fallback",
          },
          {
            id: "regular-custom",
            label: "Regular custom",
            href: "/regular-custom",
            icon: <span data-testid="custom-regular-icon" />,
          },
          {
            id: "children",
            label: "Hidden link label",
            href: "/children",
            icon: "lucide/hidden-link",
            children: <span data-testid="link-children">Custom link</span>,
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

    const featuredString = container.querySelector(
      '[href="/featured-string"]',
    ) as HTMLElement;
    const featuredIcon = within(featuredString).getByTestId("mock-icon");
    expect(featuredIcon).toHaveAttribute(
      "data-name",
      "lucide/featured-override",
    );
    expect(featuredIcon).toHaveAttribute("data-size", "18");
    expect(featuredIcon).toHaveClass("featured-icon");
    expect(featuredString).not.toHaveTextContent("lucide/featured-override");
    expect(
      featuredString.querySelector('[data-name="lucide/featured-fallback"]'),
    ).not.toBeInTheDocument();

    const regularString = container.querySelector(
      '[href="/regular-string"]',
    ) as HTMLElement;
    const regularIcon = within(regularString).getByTestId("mock-icon");
    expect(regularIcon).toHaveAttribute(
      "data-name",
      "lucide/regular-override",
    );
    expect(regularIcon).toHaveAttribute("data-size", "20");
    expect(regularIcon).toHaveClass("regular-icon");
    expect(regularString).not.toHaveTextContent("lucide/regular-override");
    expect(
      regularString.querySelector('[data-name="lucide/regular-fallback"]'),
    ).not.toBeInTheDocument();

    expect(
      within(
        container.querySelector('[href="/featured-custom"]') as HTMLElement,
      ).getByTestId("custom-featured-icon"),
    ).toBeInTheDocument();
    expect(
      within(
        container.querySelector('[href="/regular-custom"]') as HTMLElement,
      ).getByTestId("custom-regular-icon"),
    ).toBeInTheDocument();

    const childrenLink = container.querySelector(
      '[href="/children"]',
    ) as HTMLElement;
    expect(within(childrenLink).getByTestId("link-children")).toBeInTheDocument();
    expect(
      within(childrenLink).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Hidden link label")).not.toBeInTheDocument();

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
      <LinkPageBentoLayout
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
      <LinkPageBentoLayout
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
      <LinkPageBentoLayout
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
    render(<LinkPageBentoLayout name="Test" avatarUrl="/logo-wide.png" />);

    expect(screen.getByAltText("Test")).toHaveClass(
      "h-auto",
      "max-h-20",
      "w-auto",
      "max-w-full",
      "object-contain",
      "sm:max-h-24",
    );
  });

  // ——— logoAspect / logoBannerImage (design 00-DESIGN-link-page-logos.md §2) ———

  describe("logoAspect", () => {
    const LOGO = {
      src: "https://cdn.example.com/brand-logo.png",
      alt: "Brand mark",
    };

    it("keeps the legacy horizontal box and BrandLogo ceiling when logoAspect is unset", () => {
      const { container } = render(
        <LinkPageBentoLayout
          name="Test"
          logo={LOGO}
          avatarClassName="probe-box"
        />,
      );

      expect(container.querySelector(".probe-box")).toHaveClass(
        "flex",
        "h-20",
        "w-full",
        "max-w-56",
        "items-center",
        "justify-center",
        "sm:h-24",
        "sm:max-w-72",
      );
      expect(screen.getByAltText("Brand mark")).toHaveClass(
        "w-auto",
        "object-contain",
        "max-h-12",
        "sm:max-h-14",
        "lg:max-h-16",
      );
    });

    it("renders a square logo large and centered on the BrandLogo branch", () => {
      const { container } = render(
        <LinkPageBentoLayout
          name="Test"
          logo={LOGO}
          logoAspect="square"
          avatarClassName="probe-box"
        />,
      );

      expect(screen.getByAltText("Brand mark")).toHaveClass(
        "max-h-40",
        "max-w-full",
        "sm:max-h-44",
        "lg:max-h-48",
      );
      expect(container.querySelector(".probe-box")).toHaveClass(
        "flex",
        "h-40",
        "w-full",
        "items-center",
        "justify-center",
        "sm:h-44",
        "lg:h-48",
      );
    });

    it("renders a vertical logo tall and centered on the BrandLogo branch", () => {
      const { container } = render(
        <LinkPageBentoLayout
          name="Test"
          logo={LOGO}
          logoAspect="vertical"
          avatarClassName="probe-box"
        />,
      );

      expect(screen.getByAltText("Brand mark")).toHaveClass(
        "max-h-48",
        "max-w-full",
        "sm:max-h-56",
        "lg:max-h-64",
      );
      expect(container.querySelector(".probe-box")).toHaveClass(
        "flex",
        "h-48",
        "w-full",
        "items-center",
        "justify-center",
        "sm:h-56",
        "lg:h-64",
      );
    });

    it("applies the square table to the avatar Img fallback branch", () => {
      const { container } = render(
        <LinkPageBentoLayout
          name="Test"
          avatarUrl="/logo-square.png"
          logoAspect="square"
          avatarClassName="probe-box"
        />,
      );

      expect(screen.getByAltText("Test")).toHaveClass(
        "h-auto",
        "max-h-40",
        "w-auto",
        "max-w-full",
        "object-contain",
        "sm:max-h-44",
        "lg:max-h-48",
      );
      expect(container.querySelector(".probe-box")).toHaveClass(
        "flex",
        "h-40",
        "sm:h-44",
        "lg:h-48",
      );
    });

    it("applies the vertical table to the avatar Img fallback branch", () => {
      render(
        <LinkPageBentoLayout
          name="Test"
          avatarUrl="/logo-portrait.png"
          logoAspect="vertical"
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
    });
  });

  describe("logoAspect banner mode", () => {
    const LOGO = {
      src: "https://cdn.example.com/brand-logo.png",
      alt: "Brand mark",
    };
    const BANNER = {
      src: "https://cdn.example.com/brand-banner.jpg",
      alt: "Storefront at golden hour",
    };

    it("renders a full-bleed banner and suppresses the logo medallion", () => {
      const { container } = render(
        <LinkPageBentoLayout
          name="Test"
          logo={LOGO}
          avatarUrl="/logo-wide.png"
          logoAspect="banner"
          logoBannerImage={BANNER}
          avatarClassName="probe-box"
        />,
      );

      const banner = container.querySelector('[data-slot="link-page-banner"]');
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
        "mb-8",
        "sm:mb-10",
      );

      const bannerImg = within(banner as HTMLElement).getByAltText(
        "Storefront at golden hour",
      );
      expect(bannerImg).toHaveClass("size-full", "object-cover");
      expect(bannerImg).toHaveAttribute("src", BANNER.src);

      // medallion ladder is replaced by the banner
      expect(screen.queryByAltText("Brand mark")).not.toBeInTheDocument();
      expect(screen.queryByAltText("Test")).not.toBeInTheDocument();
      expect(container.querySelector(".probe-box")).not.toBeInTheDocument();

      // Banner mode leaves the spacing preset untouched and layers a flush-top
      // override plus the breakout clip onto the Section className instead.
      const section = container.querySelector("section") as HTMLElement;
      expect(section).toHaveClass(
        "py-12",
        "md:py-32",
        "overflow-x-clip",
        "pt-0",
        "md:pt-0",
      );
      expect(section.querySelector("[data-slot]")).toBe(banner);

      // The banner must be the Section's FIRST content child and an immediate
      // SIBLING of the block's outer layout div — moving it inside that div (or
      // into the profile header) breaks the flush-top/full-bleed geometry.
      const layoutDiv = banner?.nextElementSibling as HTMLElement;
      expect(layoutDiv).toHaveClass("flex", "flex-col", "items-center");
      expect(layoutDiv).not.toHaveClass("space-y-3", "text-center");
      expect(layoutDiv.firstElementChild).toHaveClass("w-full", "space-y-6");
    });

    it("falls back to horizontal when logoAspect is banner without a banner image", () => {
      const { container } = render(
        <LinkPageBentoLayout
          name="Test"
          avatarUrl="/logo-wide.png"
          logoAspect="banner"
          avatarClassName="probe-box"
        />,
      );

      expect(
        container.querySelector('[data-slot="link-page-banner"]'),
      ).not.toBeInTheDocument();
      expect(screen.getByAltText("Test")).toHaveClass(
        "h-auto",
        "max-h-20",
        "w-auto",
        "max-w-full",
        "object-contain",
        "sm:max-h-24",
      );
      expect(container.querySelector(".probe-box")).toHaveClass(
        "flex",
        "h-20",
        "max-w-56",
        "sm:h-24",
        "sm:max-w-72",
      );
      // Non-banner output stays byte-identical: no flush-top override and no
      // breakout clip are injected into the Section className.
      const section = container.querySelector("section") as HTMLElement;
      expect(section).toHaveClass("py-12", "md:py-32");
      expect(section).not.toHaveClass("overflow-x-clip");
      expect(section).not.toHaveClass("pt-0");
      expect(section).not.toHaveClass("md:pt-0");
      expect(section.className).toBe(
        "relative bg-background text-foreground py-12 md:py-32",
      );
    });

    it("keeps a custom spacing override and still flushes the banner to the top", () => {
      const { container } = render(
        <LinkPageBentoLayout
          name="Test"
          logoAspect="banner"
          logoBannerImage={BANNER}
          spacing="py-4"
        />,
      );

      const section = container.querySelector("section") as HTMLElement;
      expect(section).toHaveClass("py-4", "overflow-x-clip", "pt-0", "md:pt-0");
      expect(
        container.querySelector('[data-slot="link-page-banner"]'),
      ).toBeInTheDocument();
    });

    it("keeps a preset spacing override and still flushes the banner to the top", () => {
      const { container } = render(
        <LinkPageBentoLayout
          name="Test"
          logoAspect="banner"
          logoBannerImage={BANNER}
          spacing="lg"
        />,
      );

      // The "lg" preset resolves inside Section; the block must not swap it out.
      const section = container.querySelector("section") as HTMLElement;
      expect(section).toHaveClass(
        "py-20",
        "md:py-32",
        "overflow-x-clip",
        "pt-0",
        "md:pt-0",
      );
    });

    it("maps logoBannerAspect to its literal aspect classes", () => {
      const { container, rerender } = render(
        <LinkPageBentoLayout
          name="Test"
          logoAspect="banner"
          logoBannerImage={BANNER}
          logoBannerAspect="wide"
        />,
      );

      expect(
        container.querySelector('[data-slot="link-page-banner"]'),
      ).toHaveClass("aspect-[3/1]", "max-h-[50vh]");

      rerender(
        <LinkPageBentoLayout
          name="Test"
          logoAspect="banner"
          logoBannerImage={BANNER}
          logoBannerAspect="ultrawide"
        />,
      );

      expect(
        container.querySelector('[data-slot="link-page-banner"]'),
      ).toHaveClass("aspect-[4/1]", "max-h-[40vh]");
    });
  });

  describe("stored payload compatibility", () => {
    it("renders the 1124-shape payload on the BrandLogo branch with the legacy ceiling", () => {
      const { container } = render(
        <LinkPageBentoLayout
          name="Brand Name"
          bio="Tap a link below"
          logo={{
            alt: "Brand Name",
            src: "https://cdn.example.com/1124-logo.png",
            url: "/",
          }}
          avatar={{ alt: "Brand Name", src: null as unknown as string }}
        />,
      );

      const logoImg = container.querySelector(
        'img[src="https://cdn.example.com/1124-logo.png"]',
      ) as HTMLElement;
      expect(logoImg).toBeInTheDocument();
      expect(logoImg).toHaveClass(
        "w-auto",
        "object-contain",
        "max-h-12",
        "sm:max-h-14",
        "lg:max-h-16",
      );

      const images = Array.from(container.querySelectorAll("img"));
      expect(images.length).toBeGreaterThan(0);
      images.forEach((image) => {
        expect(image.getAttribute("src")).toBeTruthy();
      });
    });

    it("falls through to the avatar when the stored logo has a null src", () => {
      const { container } = render(
        <LinkPageBentoLayout
          name="Brand Name"
          logo={{ alt: "Brand Name", src: null as unknown as string }}
          avatar={{
            src: "https://cdn.example.com/avatar.png",
            alt: "Profile photo",
          }}
          avatarClassName="probe-box"
        />,
      );

      // BrandLogo renders null for a src-less logo, so testing object
      // truthiness at the head of the ladder would emit an EMPTY medallion box
      // and silently drop the usable avatar.
      const avatarImg = screen.getByAltText("Profile photo");
      expect(avatarImg).toHaveAttribute(
        "src",
        "https://cdn.example.com/avatar.png",
      );
      expect(avatarImg).toHaveClass(
        "h-auto",
        "max-h-20",
        "w-auto",
        "max-w-full",
        "object-contain",
        "sm:max-h-24",
      );
      expect(container.querySelectorAll("img")).toHaveLength(1);
      expect(container.querySelector(".probe-box")?.children).toHaveLength(1);
    });

    it("renders no image when the stored avatar has a null src", () => {
      const { container } = render(
        <LinkPageBentoLayout
          name="Brand Name"
          avatar={{ alt: "Brand Name", src: null as unknown as string }}
        />,
      );

      expect(container.querySelectorAll("img")).toHaveLength(0);
    });
  });
});

/**
 * Untyped-payload enum hardening. Stored design payloads are raw JSON, so an
 * out-of-contract logoAspect / logoBannerAspect string can reach the class
 * tables. Garbage must degrade to the documented defaults ("horizontal" /
 * "standard"), never to a size-less medallion box or a zero-height banner.
 */
describe("LinkPageBentoLayout untyped-payload enum hardening", () => {
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
      <LinkPageBentoLayout
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
      <LinkPageBentoLayout
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
