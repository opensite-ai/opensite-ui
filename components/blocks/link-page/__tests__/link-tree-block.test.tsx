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
