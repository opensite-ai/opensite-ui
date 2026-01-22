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
      label: "Products",
      links: [
        {
          label: "Product 1",
          description: "First product",
          url: "/products/1",
          iconName: "lucide/box",
        },
        {
          label: "Product 2",
          description: "Second product",
          url: "/products/2",
          iconName: "lucide/package",
        },
      ],
    },
    {
      label: "About",
      href: "/about",
    },
  ];

  const mockFeaturedGridLink: IMenuLink = {
    label: "Platform",
    layout: "featured-grid",
    links: [
      {
        label: "Platform Overview",
        description: "Discover how our platform transforms your workflow.",
        url: "/platform",
        image: "https://example.com/platform.jpg",
      },
      {
        label: "Cloud Infrastructure",
        description: "Scalable cloud solutions",
        url: "/cloud",
        iconName: "lucide/cloud",
      },
      {
        label: "Security",
        description: "Enterprise-grade security",
        url: "/security",
        iconName: "lucide/lock",
      },
    ],
    dropdownGroups: [
      {
        label: "Solutions",
        links: [],
      },
    ],
  };

  const mockTwoColumnCtaLink: IMenuLink = {
    label: "Use Cases",
    layout: "two-column-cta",
    dropdownGroups: [
      {
        label: "Industries",
        links: [
          { label: "Banking", url: "/banking", iconName: "lucide/building" },
          { label: "Healthcare", url: "/healthcare", iconName: "lucide/heart-pulse" },
        ],
      },
    ],
    links: [
      {
        label: "Enterprise Solutions",
        description: "Tailored for your needs",
        url: "/enterprise",
        background: "For Enterprises",
        image: "https://example.com/enterprise.jpg",
      },
    ],
  };

  const mockListShowcaseLink: IMenuLink = {
    label: "Developers",
    layout: "list-showcase",
    dropdownGroups: [
      {
        label: "Documentation",
        description: "Complete API docs",
        links: [
          { label: "API Reference", url: "/api", iconName: "lucide/arrow-up-right" },
          { label: "SDK Documentation", url: "/sdk", iconName: "lucide/arrow-up-right" },
        ],
      },
    ],
    links: [
      {
        label: "Showcase 1",
        description: "First showcase",
        url: "/showcase1",
        image: "https://example.com/showcase1.jpg",
      },
      {
        label: "Showcase 2",
        description: "Second showcase",
        url: "/showcase2",
        image: "https://example.com/showcase2.jpg",
      },
    ],
  };

  const mockMultiSectionLink: IMenuLink = {
    label: "Resources",
    layout: "multi-section",
    dropdownGroups: [
      {
        label: "Resources",
        links: [
          { label: "Blog", description: "Latest insights", url: "/blog" },
          { label: "News", description: "Product updates", url: "/news" },
        ],
      },
      {
        label: "Customers",
        links: [
          { label: "Case Studies", description: "Success stories", url: "/cases" },
        ],
      },
    ],
    links: [
      {
        label: "Customers",
        description: "See how companies use our platform",
        url: "/customers",
        image: "https://example.com/customers.jpg",
        background: "NEW",
      },
    ],
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
