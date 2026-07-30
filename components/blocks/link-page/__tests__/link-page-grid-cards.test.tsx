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
