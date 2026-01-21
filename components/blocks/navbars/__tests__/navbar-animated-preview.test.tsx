import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { NavbarAnimatedPreview } from "../navbar-animated-preview";
import type { IMenuLink, ILinkItem, ILinkGroup, IFeaturedImageLink } from "../navbar-animated-preview";

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

describe("NavbarAnimatedPreview", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockAnimatedImagePreviewLinks: ILinkItem[] = [
    {
      label: "Insights",
      description: "Latest company news and updates",
      url: "/insights",
      iconName: "lucide/book",
      image: "https://example.com/insights.jpg",
    },
    {
      label: "Engineering",
      description: "Deep technical articles",
      url: "/engineering",
      iconName: "lucide/code",
      image: "https://example.com/engineering.jpg",
    },
  ];

  const mockFeaturedLinks: ILinkItem[] = [
    {
      label: "Icons",
      description: "Lucide open-source icon library",
      url: "/icons",
      iconName: "lucide/sparkles",
      background: "https://example.com/icons-bg.jpg",
    },
    {
      label: "Themes",
      description: "Customizable UI themes",
      url: "/themes",
      iconName: "lucide/paintbrush",
      background: "https://example.com/themes-bg.jpg",
    },
  ];

  const mockCompanyLinks: ILinkItem[] = [
    {
      label: "ARC",
      description: "Tailored eCommerce solutions",
      url: "/ecommerce",
      company: {
        name: "ARC",
        logo: "https://example.com/arc-logo.svg",
      },
    },
  ];

  const mockGroupLinks: ILinkGroup[] = [
    {
      title: "Core Services",
      links: [
        {
          label: "Hosting",
          description: "Global infrastructure hosting",
          url: "/hosting",
          iconName: "lucide/server",
        },
        {
          label: "Auth",
          description: "Secure authentication",
          url: "/auth",
          iconName: "lucide/shield",
        },
      ],
    },
    {
      title: "Design System",
      links: [
        {
          label: "Components",
          description: "Reusable components",
          url: "/components",
          iconName: "lucide/layout",
        },
      ],
    },
  ];

  const mockImageLink: IFeaturedImageLink = {
    url: "/explore",
    image: "https://example.com/explore.jpg",
    label: "Explore New Components",
  };

  it("renders basic navbar with logo and menuLinks", () => {
    const menuLinks: IMenuLink[] = [
      {
        title: "Products",
        layout: "animated-image-preview",
        links: mockAnimatedImagePreviewLinks,
      },
      {
        title: "About",
        url: "/about",
      },
    ];

    render(
      <NavbarAnimatedPreview
        logo={{ src: "/logo.png", alt: "Logo", url: "/" }}
        menuLinks={menuLinks}
      />
    );

    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("renders animated-image-preview layout", () => {
    const menuLinks: IMenuLink[] = [
      {
        title: "Products",
        layout: "animated-image-preview",
        links: mockAnimatedImagePreviewLinks,
      },
    ];

    render(<NavbarAnimatedPreview menuLinks={menuLinks} />);

    // Menu trigger should be visible
    expect(screen.getByText("Products")).toBeInTheDocument();
    // Dropdown content is hidden by default (only shown on hover/click)
    // We can verify the component renders without errors
  });

  it("renders featured-cards-grid layout", () => {
    const menuLinks: IMenuLink[] = [
      {
        title: "Solutions",
        layout: "featured-cards-grid",
        featuredLinks: mockFeaturedLinks,
        links: mockCompanyLinks,
      },
    ];

    render(<NavbarAnimatedPreview menuLinks={menuLinks} />);

    // Menu trigger should be visible
    expect(screen.getByText("Solutions")).toBeInTheDocument();
    // Dropdown content is hidden by default
  });

  it("renders grouped-links-image layout", () => {
    const menuLinks: IMenuLink[] = [
      {
        title: "Platform",
        layout: "grouped-links-image",
        groupLinks: mockGroupLinks,
        imageLink: mockImageLink,
      },
    ];

    render(<NavbarAnimatedPreview menuLinks={menuLinks} />);

    // Menu trigger should be visible
    expect(screen.getByText("Platform")).toBeInTheDocument();
    // Dropdown content is hidden by default
  });

  it("renders actions prop correctly", () => {
    render(
      <NavbarAnimatedPreview
        menuLinks={[]}
        actions={[
          { label: "Sign In", href: "/signin", variant: "ghost" },
          { label: "Get Started", href: "/signup", variant: "default" },
        ]}
      />
    );

    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("renders all 3 layout types in one navbar", () => {
    const menuLinks: IMenuLink[] = [
      {
        title: "Products",
        layout: "animated-image-preview",
        links: mockAnimatedImagePreviewLinks,
      },
      {
        title: "Solutions",
        layout: "featured-cards-grid",
        featuredLinks: mockFeaturedLinks,
        links: mockCompanyLinks,
      },
      {
        title: "Platform",
        layout: "grouped-links-image",
        groupLinks: mockGroupLinks,
        imageLink: mockImageLink,
      },
      {
        title: "Resources",
        url: "/resources",
      },
    ];

    render(<NavbarAnimatedPreview menuLinks={menuLinks} />);

    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Solutions")).toBeInTheDocument();
    expect(screen.getByText("Platform")).toBeInTheDocument();
    expect(screen.getByText("Resources")).toBeInTheDocument();
  });

  it("defaults to animated-image-preview layout when no layout specified", () => {
    const menuLinks: IMenuLink[] = [
      {
        title: "Products",
        links: mockAnimatedImagePreviewLinks,
      },
    ];

    render(<NavbarAnimatedPreview menuLinks={menuLinks} />);

    // Menu trigger should be visible
    expect(screen.getByText("Products")).toBeInTheDocument();
    // Dropdown content is hidden by default
  });

  it("renders with custom logo configuration", () => {
    render(
      <NavbarAnimatedPreview
        logo={{
          src: "/custom-logo.png",
          alt: "Custom Logo",
          url: "/home",
          title: "My Company",
        }}
        menuLinks={[]}
      />
    );

    expect(screen.getByAltText("Custom Logo")).toBeInTheDocument();
    expect(screen.getByText("My Company")).toBeInTheDocument();
  });

  it("renders with logoSlot override", () => {
    render(
      <NavbarAnimatedPreview
        logoSlot={<div data-testid="custom-logo">Custom Logo Slot</div>}
        menuLinks={[]}
      />
    );

    expect(screen.getByTestId("custom-logo")).toBeInTheDocument();
    expect(screen.getByText("Custom Logo Slot")).toBeInTheDocument();
  });

  it("renders with navigationSlot override", () => {
    render(
      <NavbarAnimatedPreview
        navigationSlot={<div data-testid="custom-nav">Custom Navigation</div>}
        menuLinks={[{ title: "Products", url: "/products" }]}
      />
    );

    expect(screen.getByTestId("custom-nav")).toBeInTheDocument();
    expect(screen.queryByText("Products")).not.toBeInTheDocument();
  });

  it("renders with actionsSlot override", () => {
    render(
      <NavbarAnimatedPreview
        actionsSlot={<div data-testid="custom-actions">Custom Actions</div>}
        actions={[{ label: "Sign In", href: "/signin" }]}
        menuLinks={[]}
      />
    );

    expect(screen.getByTestId("custom-actions")).toBeInTheDocument();
    expect(screen.queryByText("Sign In")).not.toBeInTheDocument();
  });
});

