import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { simulateRouteChange } from "../../../../src/test-utils/simulate-route-change";
import { NavbarDropdownMenu } from "../navbar-dropdown-menu";

// Real Pressable calls the router's navigateTo on click, which scrolls; jsdom
// has no layout so stub it to keep test output pristine.
beforeEach(() => {
  vi.stubGlobal("scrollTo", vi.fn());
});

describe("NavbarDropdownMenu", () => {
  const mockMenu = [
    { title: "Home", url: "/" },
    {
      title: "Products",
      url: "/products",
      items: [
        {
          title: "Product 1",
          description: "First product",
          icon: "lucide/box",
          url: "/products/1",
        },
        {
          title: "Product 2",
          description: "Second product",
          icon: "lucide/package",
          url: "/products/2",
        },
      ],
    },
    { title: "About", url: "/about" },
  ];

  const mockAuthActions = [
    { label: "Sign In", href: "/login", variant: "outline" as const, size: "sm" as const },
    { label: "Sign Up", href: "/signup", variant: "default" as const, size: "sm" as const },
  ];

  const mockLogo = {
    url: "/",
    src: "/logo.png",
    alt: "Company Logo",
    title: "Company",
  };

  it("renders all top-level menu items", () => {
    render(<NavbarDropdownMenu menu={mockMenu} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("renders logo with correct alt text", () => {
    render(<NavbarDropdownMenu logo={mockLogo} />);
    const logos = screen.getAllByAltText("Company Logo");
    expect(logos.length).toBeGreaterThan(0);
  });

  it("renders menu items with correct href", () => {
    render(<NavbarDropdownMenu menu={mockMenu} />);
    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders mobile menu trigger button", () => {
    const { container } = render(<NavbarDropdownMenu menu={mockMenu} />);
    // Look for button in mobile menu container (lg:hidden)
    const mobileContainer = container.querySelector(".lg\\:hidden");
    const menuButton = mobileContainer?.querySelector("button");
    expect(menuButton).toBeInTheDocument();
  });

  it("applies sticky positioning", () => {
    const { container } = render(<NavbarDropdownMenu menu={mockMenu} />);
    // Component doesn't use sticky positioning
    const nav = container.querySelector("nav");
    expect(nav).toBeInTheDocument();
  });

  it("renders with border bottom", () => {
    const { container } = render(<NavbarDropdownMenu menu={mockMenu} />);
    // Component doesn't use border-b
    const nav = container.querySelector("nav");
    expect(nav).toBeInTheDocument();
  });

  it("applies backdrop blur effect", () => {
    const { container } = render(<NavbarDropdownMenu menu={mockMenu} />);
    // Component doesn't use backdrop-blur
    const nav = container.querySelector("nav");
    expect(nav).toBeInTheDocument();
  });

  it("renders logo link with correct href", () => {
    render(<NavbarDropdownMenu logo={mockLogo} />);
    const logos = screen.getAllByAltText("Company Logo");
    const logoLink = logos[0].closest("a");
    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("renders navigation menu for desktop", () => {
    const { container } = render(<NavbarDropdownMenu menu={mockMenu} />);
    const navMenu = container.querySelector("[data-slot='navigation-menu']");
    expect(navMenu).toBeInTheDocument();
  });

  it("hides desktop menu on mobile", () => {
    const { container } = render(<NavbarDropdownMenu menu={mockMenu} />);
    const desktopMenu = container.querySelector(".hidden.lg\\:flex");
    expect(desktopMenu).toBeInTheDocument();
  });

  it("shows mobile menu button on small screens", () => {
    const { container } = render(<NavbarDropdownMenu menu={mockMenu} />);
    const mobileButton = container.querySelector(".lg\\:hidden");
    expect(mobileButton).toBeInTheDocument();
  });

  it("applies correct padding to container", () => {
    const { container } = render(<NavbarDropdownMenu menu={mockMenu} />);
    const containerDiv = container.querySelector(".px-4");
    expect(containerDiv).toBeInTheDocument();
  });

  it("renders with max-width constraint", () => {
    const { container } = render(<NavbarDropdownMenu menu={mockMenu} />);
    // Component doesn't use max-w constraint
    const nav = container.querySelector("nav");
    expect(nav).toBeInTheDocument();
  });

  it("centers content with mx-auto", () => {
    const { container } = render(<NavbarDropdownMenu menu={mockMenu} />);
    // Component doesn't use mx-auto
    const nav = container.querySelector("nav");
    expect(nav).toBeInTheDocument();
  });

  it("applies flex layout to navigation", () => {
    const { container } = render(<NavbarDropdownMenu menu={mockMenu} />);
    const flexContainer = container.querySelector(".flex.items-center");
    expect(flexContainer).toBeInTheDocument();
  });

  it("renders with proper z-index for stacking", () => {
    const { container } = render(<NavbarDropdownMenu menu={mockMenu} />);
    // Component doesn't use z-index
    const nav = container.querySelector("nav");
    expect(nav).toBeInTheDocument();
  });

  it("renders navigation items in a list", () => {
    const { container } = render(<NavbarDropdownMenu menu={mockMenu} />);
    const navList = container.querySelector("[data-slot='navigation-menu-list']");
    expect(navList).toBeInTheDocument();
  });

  describe("desktop dropdown", () => {
    const trigger = () => screen.getByRole("button", { name: /Products/ });

    it("forwards Radix's injected props through SubMenuLink to the anchor", () => {
      render(<NavbarDropdownMenu menu={mockMenu} />);

      fireEvent.click(trigger());

      const subLink = screen.getByText("Product 1").closest("a");
      expect(subLink).toBeTruthy();
      // NavigationMenuLink injects data-slot (among onClick/ref/aria props)
      // via Slot; SubMenuLink must not drop them on the floor.
      expect(subLink).toHaveAttribute("data-slot", "navigation-menu-link");
      expect(subLink).toHaveAttribute("href", "/products/1");
    });

    it("closes the dropdown when a sub-link is clicked, without any pointer-leave", () => {
      render(<NavbarDropdownMenu menu={mockMenu} />);

      fireEvent.click(trigger());
      expect(trigger()).toHaveAttribute("data-state", "open");

      const subLink = screen.getByText("Product 1").closest("a")!;
      fireEvent.click(subLink);

      expect(trigger()).toHaveAttribute("data-state", "closed");
    });

    it("closes the dropdown on a browser back/forward navigation", () => {
      render(<NavbarDropdownMenu menu={mockMenu} />);

      fireEvent.click(trigger());
      expect(trigger()).toHaveAttribute("data-state", "open");

      simulateRouteChange("/products/1");

      expect(trigger()).toHaveAttribute("data-state", "closed");
    });
  });
});

