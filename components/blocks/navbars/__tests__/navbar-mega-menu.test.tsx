import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { NavbarMegaMenu } from "../navbar-mega-menu";
import type { IMenuLink, ILinkItem, IGridItem, IListItem } from "../navbar-mega-menu";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className, onClick, asButton }: any) => {
    if (asButton || onClick) {
      return <button onClick={onClick} className={className} data-testid="mock-pressable">{children}</button>;
    }
    return <a href={href} className={className} data-testid="mock-pressable">{children}</a>;
  },
}));

vi.mock("../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, size }: { name: string; size?: number }) => (
    <span data-testid="mock-icon" data-icon={name} data-size={size}>Icon</span>
  ),
}));

describe("NavbarMegaMenu", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockLogo = {
    url: "/",
    desktopSrc: "/logo.png",
    mobileSrc: "/logo-mobile.png",
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
      { title: "About", url: "/about" },
      { title: "Contact", url: "/contact" },
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
        title: "Products",
        layout: "animated-image-preview",
        links,
      },
    ];

    render(<NavbarMegaMenu logo={mockLogo} menuLinks={menuLinks} />);
    expect(screen.getByText("Products")).toBeInTheDocument();
  });

  it("renders simple-grid layout", () => {
    const gridItems: IGridItem[] = [
      {
        title: "Analytics",
        description: "Data insights",
        href: "/analytics",
        icon: "lucide/bar-chart",
      },
      {
        title: "Reports",
        description: "Generate reports",
        href: "/reports",
        imgUrl: "https://example.com/reports.jpg",
      },
    ];

    const menuLinks: IMenuLink[] = [
      {
        title: "Features",
        layout: "simple-grid",
        gridItems,
      },
    ];

    render(<NavbarMegaMenu logo={mockLogo} menuLinks={menuLinks} />);
    expect(screen.getByText("Features")).toBeInTheDocument();
  });

  it("renders list-with-icons layout", () => {
    const listItems: IListItem[] = [
      {
        title: "Documentation",
        description: "Complete guides",
        href: "/docs",
        icon: "lucide/book",
      },
      {
        title: "API Reference",
        description: "API documentation",
        href: "/api",
        icon: "lucide/code",
      },
    ];

    const menuLinks: IMenuLink[] = [
      {
        title: "Resources",
        layout: "list-with-icons",
        listItems,
      },
    ];

    render(<NavbarMegaMenu logo={mockLogo} menuLinks={menuLinks} />);
    expect(screen.getByText("Resources")).toBeInTheDocument();
  });

  it("renders mixed menu links with different layouts", () => {
    const menuLinks: IMenuLink[] = [
      { title: "About", url: "/about" },
      {
        title: "Products",
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
        title: "Features",
        layout: "simple-grid",
        gridItems: [
          {
            title: "Feature 1",
            description: "First feature",
            href: "/feature-1",
            icon: "lucide/star",
          },
        ],
      },
      { title: "Contact", url: "/contact" },
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
        title: "Products",
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
        title: "Features",
        layout: "simple-grid",
        gridItems: [
          {
            title: "Feature 1",
            description: "First feature",
            href: "/feature-1",
            icon: "lucide/star",
          },
        ],
      },
      {
        title: "Resources",
        layout: "list-with-icons",
        listItems: [
          {
            title: "Documentation",
            description: "Complete guides",
            href: "/docs",
            icon: "lucide/book",
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
        title: "Default",
        gridItems: [
          {
            title: "Item 1",
            description: "First item",
            href: "/item-1",
            icon: "lucide/box",
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
      <NavbarMegaMenu logo={mockLogo} className="custom-navbar" />
    );
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-navbar");
  });

  it("applies custom background and spacing", () => {
    const { container } = render(
      <NavbarMegaMenu logo={mockLogo} background="muted" spacing="md" />
    );
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });
});

