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
});
