import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { NavbarPlatformResources } from "../navbar-platform-resources";
import type { IMenuLink } from "../navbar-platform-resources";

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

describe("NavbarPlatformResources", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockSimpleMenuLinks: IMenuLink[] = [
    {
      title: "Products",
      dropdownItems: [
        {
          title: "Product 1",
          description: "First product",
          href: "/products/1",
          icon: "lucide/box",
        },
        {
          title: "Product 2",
          description: "Second product",
          href: "/products/2",
          icon: "lucide/package",
        },
      ],
    },
    {
      title: "About",
      href: "/about",
    },
  ];

  const mockFeaturedGridLink: IMenuLink = {
    title: "Platform",
    layout: "featured-grid",
    featuredItem: {
      title: "Platform Overview",
      description: "Discover how our platform transforms your workflow.",
      href: "/platform",
      imgUrl: "https://example.com/platform.jpg",
      label: "Solutions",
    },
    dropdownItems: [
      {
        title: "Cloud Infrastructure",
        description: "Scalable cloud solutions",
        href: "/cloud",
        icon: "lucide/cloud",
      },
      {
        title: "Security",
        description: "Enterprise-grade security",
        href: "/security",
        icon: "lucide/lock",
      },
    ],
  };

  const mockTwoColumnCtaLink: IMenuLink = {
    title: "Use Cases",
    layout: "two-column-cta",
    sections: [
      {
        label: "Industries",
        items: [
          { title: "Banking", href: "/banking", icon: "lucide/building" },
          { title: "Healthcare", href: "/healthcare", icon: "lucide/heart-pulse" },
        ],
      },
    ],
    ctaCard: {
      title: "Enterprise Solutions",
      description: "Tailored for your needs",
      href: "/enterprise",
      label: "For Enterprises",
      imgUrl: "https://example.com/enterprise.jpg",
    },
  };

  const mockListShowcaseLink: IMenuLink = {
    title: "Developers",
    layout: "list-showcase",
    sections: [
      {
        label: "Documentation",
        items: [
          { title: "API Reference", description: "Complete API docs", href: "/api", icon: "lucide/book" },
        ],
      },
    ],
    dropdownItems: [
      { title: "API Reference", href: "/api", icon: "lucide/arrow-up-right" },
      { title: "SDK Documentation", href: "/sdk", icon: "lucide/arrow-up-right" },
    ],
    showcaseItems: [
      {
        title: "Showcase 1",
        description: "First showcase",
        href: "/showcase1",
        imgUrl: "https://example.com/showcase1.jpg",
      },
      {
        title: "Showcase 2",
        description: "Second showcase",
        href: "/showcase2",
        imgUrl: "https://example.com/showcase2.jpg",
      },
    ],
  };

  const mockMultiSectionLink: IMenuLink = {
    title: "Resources",
    layout: "multi-section",
    sections: [
      {
        label: "Resources",
        items: [
          { title: "Blog", description: "Latest insights", href: "/blog" },
          { title: "News", description: "Product updates", href: "/news" },
        ],
      },
      {
        label: "Customers",
        items: [
          { title: "Case Studies", description: "Success stories", href: "/cases" },
        ],
      },
    ],
    ctaCard: {
      title: "Customers",
      description: "See how companies use our platform",
      href: "/customers",
      imgUrl: "https://example.com/customers.jpg",
      badge: "NEW",
    },
  };

  it("renders with default props", () => {
    const { container } = render(<NavbarPlatformResources />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders simple list dropdown layout", () => {
    render(<NavbarPlatformResources menuLinks={mockSimpleMenuLinks} />);
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("renders featured-grid layout", () => {
    render(<NavbarPlatformResources menuLinks={[mockFeaturedGridLink]} />);
    expect(screen.getByText("Platform")).toBeInTheDocument();
  });

  it("renders two-column-cta layout", () => {
    render(<NavbarPlatformResources menuLinks={[mockTwoColumnCtaLink]} />);
    expect(screen.getByText("Use Cases")).toBeInTheDocument();
  });

  it("renders list-showcase layout", () => {
    render(<NavbarPlatformResources menuLinks={[mockListShowcaseLink]} />);
    expect(screen.getByText("Developers")).toBeInTheDocument();
  });

  it("renders multi-section layout", () => {
    render(<NavbarPlatformResources menuLinks={[mockMultiSectionLink]} />);
    expect(screen.getByText("Resources")).toBeInTheDocument();
  });

  it("renders logo with correct alt text", () => {
    const mockLogo = {
      url: "/",
      src: "/logo.png",
      alt: "Company Logo",
    };
    render(<NavbarPlatformResources logo={mockLogo} />);
    expect(screen.getByAltText("Company Logo")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const mockActions = [
      { label: "Login", href: "/login", variant: "ghost" as const },
      { label: "Sign Up", href: "/signup", variant: "outline" as const },
    ];
    render(<NavbarPlatformResources actions={mockActions} />);
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  it("renders mobile menu trigger", () => {
    const { container } = render(<NavbarPlatformResources menuLinks={mockSimpleMenuLinks} />);
    const mobileButton = container.querySelector(".lg\\:hidden");
    expect(mobileButton).toBeInTheDocument();
  });

  it("renders navigation menu for desktop", () => {
    const { container } = render(<NavbarPlatformResources menuLinks={mockSimpleMenuLinks} />);
    const navMenu = container.querySelector("[data-slot='navigation-menu']");
    expect(navMenu).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<NavbarPlatformResources className="custom-class" />);
    const section = container.querySelector(".custom-class");
    expect(section).toBeInTheDocument();
  });

  it("renders with background and spacing props", () => {
    const { container } = render(
      <NavbarPlatformResources background="muted" spacing="md" />
    );
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("handles empty menuLinks array", () => {
    const { container } = render(<NavbarPlatformResources menuLinks={[]} />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders logoSlot when provided", () => {
    const logoSlot = <div data-testid="custom-logo">Custom Logo</div>;
    render(<NavbarPlatformResources logoSlot={logoSlot} />);
    expect(screen.getByTestId("custom-logo")).toBeInTheDocument();
  });
});
