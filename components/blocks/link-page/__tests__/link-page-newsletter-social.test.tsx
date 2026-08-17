import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LinkPageNewsletterSocial } from "../link-page-newsletter-social";

vi.mock("@page-speed/forms/integration", () => ({
  FormEngine: vi.fn(
    ({
      formEngineSetup,
      fields,
      formLayoutSettings,
      successMessage,
      defaultFields,
    }) => {
      const effectiveFormLayoutSettings =
        formEngineSetup?.formLayoutSettings ?? formLayoutSettings;
      const effectiveSuccessMessage =
        formEngineSetup?.successMessage ?? successMessage;
      const effectiveFields =
        formEngineSetup?.fields ?? fields ?? defaultFields;

      return (
        <div data-testid="mock-form-engine">
          <div data-testid="form-layout">
            {effectiveFormLayoutSettings?.formLayout || "standard"}
          </div>
          <div data-testid="button-size">
            {effectiveFormLayoutSettings?.buttonGroupSetup?.size || "default"}
          </div>
          <div data-testid="submit-label">
            {effectiveFormLayoutSettings?.buttonGroupSetup?.submitLabel}
          </div>
          {effectiveSuccessMessage && (
            <div data-testid="success-message">{effectiveSuccessMessage}</div>
          )}
          {effectiveFields?.map((field: any) => (
            <input
              key={field.name}
              data-testid={`field-${field.name}`}
              placeholder={field.placeholder}
            />
          ))}
        </div>
      );
    },
  ),
}));

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

describe("LinkPageNewsletterSocial", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders FormEngine with button-group layout and lg size", () => {
    render(
      <LinkPageNewsletterSocial
        name="Test"
        formEngineSetup={{ fields: [] }}
        buttonAction={{ label: "Join Now", variant: "default" }}
      />,
    );
    expect(screen.getByTestId("form-layout")).toHaveTextContent("button-group");
    expect(screen.getByTestId("button-size")).toHaveTextContent("lg");
  });

  it("renders buttonAction label in FormEngine submit label", () => {
    render(
      <LinkPageNewsletterSocial
        name="Test"
        formEngineSetup={{ fields: [] }}
        buttonAction={{ label: "Join Now", variant: "default" }}
      />,
    );
    expect(screen.getByTestId("submit-label")).toHaveTextContent("Join Now");
  });

  it("renders links when provided", () => {
    const links = [{ id: "1", label: "Website", href: "https://example.com" }];
    render(<LinkPageNewsletterSocial name="Test" links={links} />);
    expect(screen.getByText("Website")).toBeInTheDocument();
  });

  it("renders default email field when formEngineSetup is provided without fields", () => {
    render(<LinkPageNewsletterSocial name="Test" formEngineSetup={{}} />);
    expect(screen.getByTestId("field-email")).toBeInTheDocument();
    expect(screen.getByTestId("field-email")).toHaveAttribute(
      "placeholder",
      "Enter your email",
    );
  });

  it("does not render FormEngine when formEngineSetup is not provided", () => {
    render(<LinkPageNewsletterSocial name="Test" />);
    expect(screen.queryByTestId("mock-form-engine")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <LinkPageNewsletterSocial name="Test" className="custom-class" />,
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders avatars with responsive containment", () => {
    render(<LinkPageNewsletterSocial name="Test" avatarUrl="/logo-wide.png" />);

    expect(screen.getByAltText("Test")).toHaveClass(
      "h-auto",
      "max-h-24",
      "w-auto",
      "max-w-full",
      "object-contain",
    );
  });

  it("routes link, chevron, form, and footer icon strings through DynamicIcon", () => {
    render(
      <LinkPageNewsletterSocial
        name="Test"
        formEngineSetup={{ fields: [] }}
        buttonAction={{
          label: "Join Now",
          iconAfter: "lucide/send",
        }}
        links={[
          {
            id: "website",
            label: "Website",
            icon: "lucide/globe",
            href: "https://example.com",
          },
        ]}
        linkChevronIcon="lucide/arrow-up-right"
        linkIconClassName="link-icon-class"
        footerAction={{
          label: "Footer action",
          icon: "lucide/footer-before",
          iconAfter: "lucide/footer-after",
        }}
      />,
    );

    const submitLabel = screen.getByTestId("submit-label");
    expect(
      submitLabel.querySelector('[data-name="lucide/send"]'),
    ).toBeInTheDocument();
    expect(submitLabel).not.toHaveTextContent("lucide/send");

    const link = screen
      .getByText("Website")
      .closest('[data-testid="mock-pressable"]') as HTMLElement;
    const linkIcon = link.querySelector('[data-name="lucide/globe"]');
    expect(linkIcon).toHaveAttribute("data-size", "18");
    expect(linkIcon).toHaveClass("link-icon-class");
    expect(
      link.querySelector('[data-name="lucide/arrow-up-right"]'),
    ).toHaveAttribute("data-size", "16");
    expect(link).not.toHaveTextContent("lucide/globe");
    expect(link).not.toHaveTextContent("lucide/arrow-up-right");

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

  it("preserves custom icons and falsy link and chevron fallback semantics", () => {
    const { rerender } = render(
      <LinkPageNewsletterSocial
        name="Test"
        formEngineSetup={{ fields: [] }}
        buttonAction={{
          label: "Join Now",
          iconAfter: <span data-testid="custom-submit-icon">submit</span>,
        }}
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
        linkChevronIcon={
          <span data-testid="custom-chevron-icon">chevron</span>
        }
        footerAction={{
          label: "Custom footer",
          icon: <span data-testid="custom-footer-before">before</span>,
          iconAfter: <span data-testid="custom-footer-after">after</span>,
        }}
      />,
    );

    expect(screen.getByTestId("custom-submit-icon")).toBeInTheDocument();
    const customLink = screen
      .getByText("Custom link")
      .closest('[data-testid="mock-pressable"]') as HTMLElement;
    expect(customLink).toContainElement(screen.getByTestId("custom-link-icon"));
    expect(customLink).toContainElement(
      screen.getAllByTestId("custom-chevron-icon")[0],
    );
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
      <LinkPageNewsletterSocial
        name="Test"
        links={[{ id: "empty-chevron", label: "No chevron" }]}
        linkChevronIcon=""
      />,
    );
    const emptyChevronLink = screen
      .getByText("No chevron")
      .closest('[data-testid="mock-pressable"]') as HTMLElement;
    expect(
      emptyChevronLink.querySelector('[data-name="lucide/chevron-right"]'),
    ).not.toBeInTheDocument();

    rerender(
      <LinkPageNewsletterSocial
        name="Test"
        links={[{ id: "zero-chevron", label: "Zero chevron" }]}
        linkChevronIcon={0}
      />,
    );
    const zeroChevronLink = screen
      .getByText("Zero chevron")
      .closest('[data-testid="mock-pressable"]') as HTMLElement;
    expect(zeroChevronLink.textContent).toContain("0");
  });

  // ——————————————————————————————————————————————————————————————
  // logoAspect / logoBannerImage (design 00-DESIGN-link-page-logos.md §2.4)
  // Family B tables: LINK_PAGE_LOGO_{IMG,BOX}_CLASSES_B.
  // Assertions use LITERAL tokens on purpose (importing the tables would make
  // the test tautological and would not pin the emitted class strings).
  // ——————————————————————————————————————————————————————————————
  describe("logoAspect and full-bleed banner placement", () => {
    const LOGO = {
      alt: "Brand logo",
      src: "https://cdn.example.com/assets/logo-square.png",
    };
    const BANNER = {
      alt: "Storefront banner",
      src: "https://cdn.example.com/assets/banner.jpg",
    };

    /** The logo/avatar medallion box is the nearest `justify-center` ancestor. */
    const logoBoxOf = (el: HTMLElement): HTMLElement => {
      const box = el.closest("div.justify-center");
      if (!box) throw new Error("logo medallion box not found");
      return box as HTMLElement;
    };

    it("keeps the legacy medallion box classes when logoAspect is unset", () => {
      render(
        <LinkPageNewsletterSocial name="Test" avatarUrl="/logo-wide.png" />,
      );

      const box = logoBoxOf(screen.getByAltText("Test"));
      expect(box).toHaveClass(
        "flex",
        "h-24",
        "w-full",
        "max-w-72",
        "items-center",
        "justify-center",
      );
      expect(box.className).not.toMatch(/h-40|h-48/);
    });

    it('renders logoAspect="square" through BrandLogo with the square height ladder', () => {
      render(
        <LinkPageNewsletterSocial name="Test" logo={LOGO} logoAspect="square" />,
      );

      const img = screen.getByAltText("Brand logo");
      expect(img).toHaveClass(
        "w-auto",
        "object-contain",
        "max-h-40",
        "max-w-full",
        "sm:max-h-44",
        "lg:max-h-48",
      );
      expect(img.className).not.toContain("max-h-12");

      const box = logoBoxOf(img);
      expect(box).toHaveClass(
        "flex",
        "h-40",
        "w-full",
        "items-center",
        "justify-center",
        "sm:h-44",
        "lg:h-48",
      );
      expect(box.className).not.toContain("max-w-72");
    });

    it('renders logoAspect="vertical" through BrandLogo with the vertical height ladder', () => {
      render(
        <LinkPageNewsletterSocial
          name="Test"
          logo={LOGO}
          logoAspect="vertical"
        />,
      );

      const img = screen.getByAltText("Brand logo");
      expect(img).toHaveClass(
        "w-auto",
        "object-contain",
        "max-h-48",
        "max-w-full",
        "sm:max-h-56",
        "lg:max-h-64",
      );

      const box = logoBoxOf(img);
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

    it("falls through to the avatar when the stored logo object has no src", () => {
      const { container } = render(
        <LinkPageNewsletterSocial
          name="Test"
          logo={{ alt: "x", src: null as unknown as string }}
          avatar={{ alt: "Avatar", src: "https://cdn.example.com/a.png" }}
        />,
      );

      // BrandLogo returns null for a src-less logo, so testing object
      // truthiness at the ladder head would render an EMPTY medallion box and
      // swallow the perfectly good avatar.
      const img = screen.getByAltText("Avatar");
      expect(img).toHaveAttribute("src", "https://cdn.example.com/a.png");
      expect(img).toHaveClass(
        "h-auto",
        "max-h-24",
        "w-auto",
        "max-w-full",
        "object-contain",
      );
      expect(logoBoxOf(img)).toContainElement(img);
      container.querySelectorAll("img").forEach((el) => {
        expect(el.getAttribute("src")).toBeTruthy();
      });
    });

    it("still prefers logoSlot over the avatar when logo has no src", () => {
      render(
        <LinkPageNewsletterSocial
          name="Test"
          logo={{ alt: "x", src: "" }}
          logoSlot={<span data-testid="custom-logo-slot">slot</span>}
          avatar={{ alt: "Avatar", src: "https://cdn.example.com/a.png" }}
        />,
      );

      expect(screen.getByTestId("custom-logo-slot")).toBeInTheDocument();
      expect(screen.queryByAltText("Avatar")).not.toBeInTheDocument();
    });

    it("applies the family B square IMG table to the avatar fallback branch", () => {
      render(
        <LinkPageNewsletterSocial
          name="Test"
          avatar={{ alt: "Avatar", src: "https://cdn.example.com/a.png" }}
          logoAspect="square"
        />,
      );

      const img = screen.getByAltText("Avatar");
      expect(img).toHaveClass(
        "h-auto",
        "max-h-40",
        "w-auto",
        "max-w-full",
        "object-contain",
        "sm:max-h-44",
        "lg:max-h-48",
      );
      expect(logoBoxOf(img)).toHaveClass("h-40", "sm:h-44", "lg:h-48");
    });

    it("applies the family B vertical IMG table to the avatar fallback branch", () => {
      render(
        <LinkPageNewsletterSocial
          name="Test"
          avatar={{ alt: "Avatar", src: "https://cdn.example.com/a.png" }}
          logoAspect="vertical"
        />,
      );

      const img = screen.getByAltText("Avatar");
      expect(img).toHaveClass(
        "h-auto",
        "max-h-48",
        "w-auto",
        "max-w-full",
        "object-contain",
        "sm:max-h-56",
        "lg:max-h-64",
      );
      expect(logoBoxOf(img)).toHaveClass("h-48", "sm:h-56", "lg:h-64");
    });

    it("renders a full-bleed banner as the first child and suppresses the medallion", () => {
      const { container } = render(
        <LinkPageNewsletterSocial
          name="Test"
          logo={LOGO}
          logoAspect="banner"
          logoBannerImage={BANNER}
        />,
      );

      const banner = container.querySelector(
        '[data-slot="link-page-banner"]',
      ) as HTMLElement;
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

      // Flush at the very top: first element inside the Section's Container.
      expect(banner.parentElement?.firstElementChild).toBe(banner);
      // Sibling relation is pinned, not just "first child of some parent":
      // moving the banner INSIDE the inner layout div must fail this test.
      expect(banner.nextElementSibling).toHaveClass(
        "flex",
        "min-h-screen",
        "w-full",
        "items-start",
        "justify-center",
        "py-12",
      );
      // No banner margin: the inner layout div's own py-12 supplies the gap.
      expect(banner.className).not.toContain("mb-8");

      const bannerImg = banner.querySelector("img") as HTMLImageElement;
      expect(bannerImg).toHaveAttribute("alt", "Storefront banner");
      expect(bannerImg).toHaveAttribute("src", BANNER.src);
      expect(bannerImg).toHaveClass(
        "h-auto",
        "max-h-[60vh]",
        "w-full",
        "object-contain",
      );
      // The banner artwork is never cropped and never stretched to the band.
      expect(bannerImg).not.toHaveClass("object-cover");
      expect(bannerImg).not.toHaveClass("size-full");

      // Medallion ladder is not rendered at all in banner mode.
      expect(screen.queryByAltText("Brand logo")).not.toBeInTheDocument();
      expect(screen.getAllByTestId("mock-img")).toHaveLength(1);
      expect(container.querySelector(".max-w-72")).toBeNull();

      // Spacing is passed through UNCHANGED; flush-top comes from literal
      // pt-0/md:pt-0 winning on CSS order (Tailwind emits pt-* after py-*),
      // and overflow-x-clip clips the w-screen breakout's scrollbar overhang.
      const section = container.querySelector("section") as HTMLElement;
      expect(section).toHaveClass(
        "py-12",
        "md:py-32",
        "pt-0",
        "md:pt-0",
        "overflow-x-clip",
      );
    });

    it("suppresses the avatar medallion in banner mode too", () => {
      const { container } = render(
        <LinkPageNewsletterSocial
          name="Test"
          avatar={{ alt: "Avatar", src: "https://cdn.example.com/a.png" }}
          logoAspect="banner"
          logoBannerImage={BANNER}
        />,
      );

      expect(screen.queryByAltText("Avatar")).not.toBeInTheDocument();
      expect(
        container.querySelector('[data-slot="link-page-banner"]'),
      ).toBeInTheDocument();
    });

    it('falls back to legacy horizontal rendering when logoAspect="banner" has no logoBannerImage', () => {
      const { container } = render(
        <LinkPageNewsletterSocial name="Test" logo={LOGO} logoAspect="banner" />,
      );

      expect(
        container.querySelector('[data-slot="link-page-banner"]'),
      ).toBeNull();

      const img = screen.getByAltText("Brand logo");
      expect(img).toHaveClass(
        "w-auto",
        "object-contain",
        "max-h-12",
        "sm:max-h-14",
        "lg:max-h-16",
      );
      expect(logoBoxOf(img)).toHaveClass(
        "flex",
        "h-24",
        "w-full",
        "max-w-72",
        "items-center",
        "justify-center",
      );

      // Byte-compat: the non-banner Section className is untouched — no
      // flush-top or clip literals are injected.
      const section = container.querySelector("section") as HTMLElement;
      expect(section).toHaveClass("py-12", "md:py-32");
      expect(section.className).not.toContain("pt-0");
      expect(section.className).not.toContain("md:pt-0");
      expect(section.className).not.toContain("overflow-x-clip");
    });

    it("keeps explicit consumer spacing and still zeroes the top padding in banner mode", () => {
      const { container } = render(
        <LinkPageNewsletterSocial
          name="Test"
          logoAspect="banner"
          logoBannerImage={BANNER}
          spacing="py-4"
        />,
      );

      const section = container.querySelector("section") as HTMLElement;
      expect(section).toHaveClass("py-4", "pt-0", "md:pt-0", "overflow-x-clip");
      expect(section.className).not.toContain("md:py-32");
    });

    it("keeps a preset spacing token intact alongside the banner flush-top literals", () => {
      const { container } = render(
        <LinkPageNewsletterSocial
          name="Test"
          logoAspect="banner"
          logoBannerImage={BANNER}
          spacing="lg"
        />,
      );

      const section = container.querySelector("section") as HTMLElement;
      // Section's own "lg" preset resolves to py-20 md:py-32 and survives.
      expect(section).toHaveClass(
        "py-20",
        "md:py-32",
        "pt-0",
        "md:pt-0",
        "overflow-x-clip",
      );
    });

    it("keeps the consumer className after the banner flush-top literals", () => {
      const { container } = render(
        <LinkPageNewsletterSocial
          name="Test"
          logoAspect="banner"
          logoBannerImage={BANNER}
          className="consumer-section-class"
        />,
      );

      const section = container.querySelector("section") as HTMLElement;
      expect(section).toHaveClass(
        "consumer-section-class",
        "pt-0",
        "md:pt-0",
        "overflow-x-clip",
      );
    });

    it("maps logoBannerAspect to literal aspect-ratio classes", () => {
      const wide = render(
        <LinkPageNewsletterSocial
          name="Test"
          logoAspect="banner"
          logoBannerImage={BANNER}
          logoBannerAspect="wide"
        />,
      );
      // Box reserves the tier SHAPE only; the tier height cap lives on the
      // image, where it letterboxes instead of clipping the artwork.
      expect(
        wide.container.querySelector('[data-slot="link-page-banner"]'),
      ).toHaveClass("aspect-[3/1]");
      expect(
        wide.container.querySelector('[data-slot="link-page-banner"]'),
      ).not.toHaveClass("max-h-[50vh]");
      expect(
        wide.container.querySelector('[data-slot="link-page-banner"] img'),
      ).toHaveClass("max-h-[50vh]", "object-contain");
      wide.unmount();

      const ultrawide = render(
        <LinkPageNewsletterSocial
          name="Test"
          logoAspect="banner"
          logoBannerImage={BANNER}
          logoBannerAspect="ultrawide"
        />,
      );
      expect(
        ultrawide.container.querySelector('[data-slot="link-page-banner"]'),
      ).toHaveClass("aspect-[4/1]");
      expect(
        ultrawide.container.querySelector('[data-slot="link-page-banner"]'),
      ).not.toHaveClass("max-h-[40vh]");
      expect(
        ultrawide.container.querySelector('[data-slot="link-page-banner"] img'),
      ).toHaveClass("max-h-[40vh]", "object-contain");
    });

    it("renders the stored 1124-shape payload with the legacy xl logo classes and no null-src image", () => {
      const { container } = render(
        <LinkPageNewsletterSocial
          name="Workflow Rush"
          bio="AI automation for growing teams"
          logo={{
            alt: "Workflow Rush",
            src: "https://cdn.ing/assets/i/r/314346/nk1ogzmzll8omwq392zjbv5mznvn/logo-light.png",
            url: "/",
          }}
          avatar={{ alt: "Workflow Rush", src: null as unknown as string }}
        />,
      );

      const img = screen.getByAltText("Workflow Rush");
      expect(img).toHaveClass(
        "w-auto",
        "object-contain",
        "max-h-12",
        "sm:max-h-14",
        "lg:max-h-16",
      );
      expect(img.className).not.toContain("max-w-full");

      container.querySelectorAll("img").forEach((el) => {
        expect(el.getAttribute("src")).toBeTruthy();
      });
    });

    it("renders no image for a stored avatar whose src is null", () => {
      const { container } = render(
        <LinkPageNewsletterSocial
          name="Test"
          avatar={{ alt: "Test", src: null as unknown as string }}
        />,
      );

      expect(container.querySelectorAll("img")).toHaveLength(0);
      expect(screen.queryByTestId("mock-img")).not.toBeInTheDocument();
    });
  });
});

/**
 * Untyped-payload enum hardening. Stored design payloads are raw JSON, so an
 * out-of-contract logoAspect / logoBannerAspect string can reach the class
 * tables. Garbage must degrade to the documented defaults ("horizontal" /
 * "standard"), never to a size-less medallion box or a zero-height banner.
 * Family B tables.
 */
describe("LinkPageNewsletterSocial untyped-payload enum hardening", () => {
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
      <LinkPageNewsletterSocial
        name="Test"
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
      <LinkPageNewsletterSocial
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
