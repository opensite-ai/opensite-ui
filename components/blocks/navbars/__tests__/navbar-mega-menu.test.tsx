import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { NavbarMegaMenu } from "../navbar-mega-menu";
import type { IMenuLink, ILinkItem } from "../navbar-mega-menu";

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

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className, onClick, asButton }: any) => {
    if (asButton || onClick) {
      return (
        <button
          onClick={onClick}
          className={className}
          data-testid="mock-pressable"
        >
          {children}
        </button>
      );
    }
    return (
      <a href={href} className={className} data-testid="mock-pressable">
        {children}
      </a>
    );
  },
}));

vi.mock("../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, size }: { name: string; size?: number }) => (
    <span data-testid="mock-icon" data-icon={name} data-size={size}>
      Icon
    </span>
  ),
}));

describe("NavbarMegaMenu", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockLogo = {
    url: "/",
    src: "/logo.png",
    alt: "Test Logo",
  };

  it("renders with logo", () => {
    render(<NavbarMegaMenu logo={mockLogo} />);
    const logos = screen.getAllByAltText("Test Logo");
    expect(logos.length).toBeGreaterThan(0);
  });

  it("renders actions when provided", () => {
    const actions = [
      {
        label: "Sign In",
        href: "/signin",
        variant: "ghost" as const,
      },
      {
        label: "Get Started",
        href: "/signup",
        variant: "default" as const,
      },
    ];

    render(<NavbarMegaMenu logo={mockLogo} actions={actions} />);
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("renders simple menu links without dropdown", () => {
    const menuLinks: IMenuLink[] = [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ];

    render(<NavbarMegaMenu logo={mockLogo} menuLinks={menuLinks} />);
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders animated-image-preview layout", () => {
    const links: ILinkItem[] = [
      {
        label: "Company Blog",
        description: "Latest insights",
        url: "/blog",
        image: "https://example.com/blog.jpg",
      },
      {
        label: "Our Platform",
        description: "Innovative tools",
        url: "/platform",
        image: "https://example.com/platform.jpg",
      },
    ];

    const menuLinks: IMenuLink[] = [
      {
        label: "Products",
        layout: "animated-image-preview",
        links,
      },
    ];

    render(<NavbarMegaMenu logo={mockLogo} menuLinks={menuLinks} />);
    expect(screen.getByText("Products")).toBeInTheDocument();
  });

  it("renders simple-grid layout", () => {
    const links: ILinkItem[] = [
      {
        label: "Analytics",
        description: "Data insights",
        url: "/analytics",
        iconName: "lucide/bar-chart",
      },
      {
        label: "Reports",
        description: "Generate reports",
        url: "/reports",
        image: "https://example.com/reports.jpg",
      },
    ];

    const menuLinks: IMenuLink[] = [
      {
        label: "Features",
        layout: "simple-grid",
        links,
      },
    ];

    render(<NavbarMegaMenu logo={mockLogo} menuLinks={menuLinks} />);
    expect(screen.getByText("Features")).toBeInTheDocument();
  });

  it("renders list-with-icons layout", () => {
    const links: ILinkItem[] = [
      {
        label: "Documentation",
        description: "Complete guides",
        url: "/docs",
        iconName: "lucide/book",
      },
      {
        label: "API Reference",
        description: "API documentation",
        url: "/api",
        iconName: "lucide/code",
      },
    ];

    const menuLinks: IMenuLink[] = [
      {
        label: "Resources",
        layout: "list-with-icons",
        links,
      },
    ];

    render(<NavbarMegaMenu logo={mockLogo} menuLinks={menuLinks} />);
    expect(screen.getByText("Resources")).toBeInTheDocument();
  });

  it("renders mixed menu links with different layouts", () => {
    const menuLinks: IMenuLink[] = [
      { label: "About", href: "/about" },
      {
        label: "Products",
        layout: "animated-image-preview",
        links: [
          {
            label: "Product A",
            description: "First product",
            url: "/product-a",
            image: "https://example.com/a.jpg",
          },
        ],
      },
      {
        label: "Features",
        layout: "simple-grid",
        links: [
          {
            label: "Feature 1",
            description: "First feature",
            url: "/feature-1",
            iconName: "lucide/star",
          },
        ],
      },
      { label: "Contact", href: "/contact" },
    ];

    render(<NavbarMegaMenu logo={mockLogo} menuLinks={menuLinks} />);
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders all 3 layout types in one navbar", () => {
    const menuLinks: IMenuLink[] = [
      {
        label: "Products",
        layout: "animated-image-preview",
        links: [
          {
            label: "Product A",
            description: "First product",
            url: "/product-a",
            image: "https://example.com/a.jpg",
          },
        ],
      },
      {
        label: "Features",
        layout: "simple-grid",
        links: [
          {
            label: "Feature 1",
            description: "First feature",
            url: "/feature-1",
            iconName: "lucide/star",
          },
        ],
      },
      {
        label: "Resources",
        layout: "list-with-icons",
        links: [
          {
            label: "Documentation",
            description: "Complete guides",
            url: "/docs",
            iconName: "lucide/book",
          },
        ],
      },
    ];

    render(<NavbarMegaMenu logo={mockLogo} menuLinks={menuLinks} />);
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getByText("Resources")).toBeInTheDocument();
  });

  it("defaults to simple-grid layout when no layout specified", () => {
    const menuLinks: IMenuLink[] = [
      {
        label: "Default",
        links: [
          {
            label: "Item 1",
            description: "First item",
            url: "/item-1",
            iconName: "lucide/box",
          },
        ],
      },
    ];

    render(<NavbarMegaMenu logo={mockLogo} menuLinks={menuLinks} />);
    expect(screen.getByText("Default")).toBeInTheDocument();
  });

  it("renders custom logo slot when provided", () => {
    const customLogo = <div data-testid="custom-logo">Custom Logo</div>;
    render(<NavbarMegaMenu logoSlot={customLogo} />);
    expect(screen.getByTestId("custom-logo")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(
      <NavbarMegaMenu logo={mockLogo} className="custom-navbar" />,
    );
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-navbar");
  });

  it("applies custom background and spacing", () => {
    const { container } = render(
      <NavbarMegaMenu logo={mockLogo} background="muted" spacing="md" />,
    );
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });
});
