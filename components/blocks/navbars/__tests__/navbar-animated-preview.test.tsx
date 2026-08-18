import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { simulateRouteChange } from "../../../../src/test-utils/simulate-route-change";
import { NavbarAnimatedPreview } from "../navbar-animated-preview";
import type { IMenuLink, ILinkItem, IMenuLinkGroup, IFeaturedImageLink } from "../navbar-animated-preview";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

// Path is relative to THIS file: the block's own "../../../lib/Pressable"
// resolves to a non-existent `components/lib/Pressable` from here, so the old
// mock never applied and every click ran the real router instead.
vi.mock("../../../../lib/Pressable", async () => {
  const React = await import("react");
  return {
    // `NavigationMenuLink asChild` injects an `onClick` (Radix's
    // rootContentDismiss dispatch) into a link Pressable, so the element type
    // must key off `href` the way the real Pressable does — keying off
    // `onClick` drops the href and fails anchor assertions for a fake reason.
    // Injected props (data-slot, aria-*, ref) are forwarded, and the
    // internal-link preventDefault is mirrored so jsdom never navigates.
    Pressable: React.forwardRef<HTMLElement, any>(function Pressable(
      { children, href, className, onClick, asButton, variant, size, ...props },
      ref,
    ) {
      const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        onClick?.(event);
        if (href) event.preventDefault();
      };
      if (href) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            onClick={handleClick}
            className={className}
            data-testid="mock-pressable"
            {...props}
          >
            {children}
          </a>
        );
      }
      if (asButton || onClick) {
        return (
          <button
            ref={ref as React.Ref<HTMLButtonElement>}
            onClick={handleClick}
            className={className}
            data-testid="mock-pressable"
            {...props}
          >
            {children}
          </button>
        );
      }
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          className={className}
          data-testid="mock-pressable"
          {...props}
        >
          {children}
        </span>
      );
    }),
  };
});

// This suite runs the REAL DynamicIcon. A mock used to sit here, but its
// specifier ("../../ui/dynamic-icon") resolved to the nonexistent
// components/blocks/ui/ from this __tests__ directory, so vitest never
// intercepted it — an inert landmine (the live path would be
// "../../../ui/dynamic-icon", as navbar-platform-resources.test.tsx uses).

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

  const mockStandardLinks: ILinkItem[] = [
    {
      label: "ARC",
      description: "Tailored eCommerce solutions",
      url: "/ecommerce",
      iconName: "lucide/shopping-cart",
    },
  ];

  const mockGroupLinks: IMenuLinkGroup[] = [
    {
      label: "Core Services",
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
      label: "Design System",
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
        label: "Products",
        layout: "animated-image-preview",
        links: mockAnimatedImagePreviewLinks,
      },
      {
        label: "About",
        href: "/about",
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
        label: "Products",
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
        label: "Solutions",
        layout: "featured-cards-grid",
        featuredLinks: mockFeaturedLinks,
        links: mockStandardLinks,
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
        label: "Platform",
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
        label: "Products",
        layout: "animated-image-preview",
        links: mockAnimatedImagePreviewLinks,
      },
      {
        label: "Solutions",
        layout: "featured-cards-grid",
        featuredLinks: mockFeaturedLinks,
        links: mockStandardLinks,
      },
      {
        label: "Platform",
        layout: "grouped-links-image",
        groupLinks: mockGroupLinks,
        imageLink: mockImageLink,
      },
      {
        label: "Resources",
        href: "/resources",
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
        label: "Products",
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
        }}
        menuLinks={[]}
      />
    );

    // When logo.src is provided, only the image is rendered (not the title)
    expect(screen.getByAltText("Custom Logo")).toBeInTheDocument();
  });

  it("renders with text logo when no src provided", () => {
    render(
      <NavbarAnimatedPreview
        logo={{
          title: "My Company",
          url: "/home",
        }}
        menuLinks={[]}
      />
    );

    // When no logo.src is provided, the title is rendered as text
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
        menuLinks={[{ label: "Products", href: "/products" }]}
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

describe("NavbarAnimatedPreview desktop dropdown link semantics", () => {
  beforeEach(() => {
    vi.stubGlobal("scrollTo", vi.fn());
  });

  const animatedLinks: ILinkItem[] = [
    {
      label: "Insights",
      description: "Latest company news",
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

  const featuredLinks: ILinkItem[] = [
    {
      label: "Icons",
      description: "Icon library",
      url: "/icons",
      iconName: "lucide/sparkles",
      background: "https://example.com/icons-bg.jpg",
    },
  ];

  const standardLinks: ILinkItem[] = [
    {
      label: "ARC",
      description: "eCommerce solutions",
      url: "/ecommerce",
      iconName: "lucide/shopping-cart",
    },
  ];

  const groupLinks: IMenuLinkGroup[] = [
    {
      label: "Core Services",
      links: [
        {
          label: "Hosting",
          description: "Infrastructure hosting",
          url: "/hosting",
          iconName: "lucide/server",
        },
      ],
    },
  ];

  const imageLink: IFeaturedImageLink = {
    url: "/explore",
    image: "https://example.com/explore.jpg",
    label: "Explore New Components",
  };

  const menuLinks: IMenuLink[] = [
    {
      label: "Products",
      layout: "animated-image-preview",
      links: animatedLinks,
    },
    {
      label: "Solutions",
      layout: "featured-cards-grid",
      featuredLinks,
      links: standardLinks,
    },
    {
      label: "Platform",
      layout: "grouped-links-image",
      groupLinks,
      imageLink,
    },
  ];

  const trigger = (label: string) =>
    screen.getByRole("button", { name: new RegExp(label) });

  it("renders NavLink sub-links as Radix navigation-menu links", () => {
    render(<NavbarAnimatedPreview menuLinks={menuLinks} />);

    fireEvent.click(trigger("Products"));

    const subLink = screen.getByText("Insights").closest("a");
    expect(subLink).toBeTruthy();
    expect(subLink).toHaveAttribute("href", "/insights");
    // A bare Pressable never dispatches Radix's rootContentDismiss.
    expect(subLink).toHaveAttribute("data-slot", "navigation-menu-link");
  });

  it("renders FeaturedLink cards as Radix navigation-menu links", () => {
    render(<NavbarAnimatedPreview menuLinks={menuLinks} />);

    fireEvent.click(trigger("Solutions"));

    const featured = screen.getByText("Icons").closest("a");
    expect(featured).toBeTruthy();
    expect(featured).toHaveAttribute("href", "/icons");
    expect(featured).toHaveAttribute("data-slot", "navigation-menu-link");

    const standard = screen.getByText("ARC").closest("a");
    expect(standard).toHaveAttribute("href", "/ecommerce");
    expect(standard).toHaveAttribute("data-slot", "navigation-menu-link");
  });

  it("renders the FeaturedImageLink as a Radix navigation-menu link", () => {
    render(<NavbarAnimatedPreview menuLinks={menuLinks} />);

    fireEvent.click(trigger("Platform"));

    const grouped = screen.getByText("Hosting").closest("a");
    expect(grouped).toHaveAttribute("href", "/hosting");
    expect(grouped).toHaveAttribute("data-slot", "navigation-menu-link");

    const imagePromo = screen.getByText("Explore New Components").closest("a");
    expect(imagePromo).toBeTruthy();
    expect(imagePromo).toHaveAttribute("href", "/explore");
    expect(imagePromo).toHaveAttribute("data-slot", "navigation-menu-link");
  });

  it("keeps the hover-dimming ref and handlers wired through the Radix wrapper", () => {
    render(<NavbarAnimatedPreview menuLinks={menuLinks} />);

    fireEvent.click(trigger("Products"));
    const first = screen.getByText("Insights").closest("a")!;
    const second = screen.getByText("Engineering").closest("a")!;

    // The dimming reads `linksRef`, which is only populated if the wrapped
    // NavLink still forwards its ref and mouse handlers to the Pressable.
    // classList, not className: the merged class string also carries
    // `disabled:opacity-50` from NavigationMenuLink's defaults.
    fireEvent.mouseOver(first);
    expect(second.classList.contains("opacity-50")).toBe(true);

    fireEvent.mouseOut(first);
    expect(second.classList.contains("opacity-50")).toBe(false);
  });

  it("closes the dropdown when a sub-link is clicked, without any pointer-leave", () => {
    render(<NavbarAnimatedPreview menuLinks={menuLinks} />);

    fireEvent.click(trigger("Products"));
    expect(trigger("Products")).toHaveAttribute("data-state", "open");

    // Pressable is mocked, so no SPA navigation runs here — the close proves
    // the Radix dismiss path, which is what the wrapper restores.
    fireEvent.click(screen.getByText("Insights").closest("a")!);

    expect(trigger("Products")).toHaveAttribute("data-state", "closed");
  });

  it("closes the dropdown on a browser back/forward navigation", () => {
    render(<NavbarAnimatedPreview menuLinks={menuLinks} />);

    fireEvent.click(trigger("Products"));
    expect(trigger("Products")).toHaveAttribute("data-state", "open");

    simulateRouteChange("/insights");

    expect(trigger("Products")).toHaveAttribute("data-state", "closed");
  });
});

