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
