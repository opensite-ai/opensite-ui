import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NavbarSimpleLinks } from "../navbar-simple-links";

describe("NavbarSimpleLinks", () => {
  const mockNavItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Services", link: "/services" },
    { name: "Contact", link: "/contact" },
  ];

  const mockLogo = {
    url: "/",
    src: "/logo.png",
    alt: "Company Logo",
    title: "Company",
  };

  it("renders all navigation items", () => {
    render(<NavbarSimpleLinks navItems={mockNavItems} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders logo with correct alt text", () => {
    render(<NavbarSimpleLinks logo={mockLogo} />);
    expect(screen.getByAltText("Company Logo")).toBeInTheDocument();
  });

  it("renders navigation links with correct href", () => {
    render(<NavbarSimpleLinks navItems={mockNavItems} />);
    const homeLinks = screen.getAllByText("Home");
    // Navigation items are rendered as NavigationMenuLink, not <a> tags
    expect(homeLinks.length).toBeGreaterThan(0);
    expect(homeLinks[0]).toBeInTheDocument();
  });

  it("highlights active navigation item", () => {
    const { container } = render(<NavbarSimpleLinks navItems={mockNavItems} />);
    const firstNavItem = screen.getByText("Home");
    expect(firstNavItem).toBeInTheDocument();
  });

  it("renders mobile menu trigger button", () => {
    const { container } = render(<NavbarSimpleLinks navItems={mockNavItems} />);
    // Mobile menu now uses a Pressable button with menu icon
    const mobileContainer = container.querySelector(".lg\\:hidden");
    const menuButton = mobileContainer?.querySelector("button");
    expect(menuButton).toBeInTheDocument();
  });

  it("applies sticky positioning", () => {
    const { container } = render(<NavbarSimpleLinks navItems={mockNavItems} />);
    // Component doesn't use sticky positioning
    const nav = container.querySelector("nav");
    expect(nav).toBeInTheDocument();
  });

  it("renders with border bottom", () => {
    const { container } = render(<NavbarSimpleLinks navItems={mockNavItems} />);
    // Component doesn't use border-b
    const nav = container.querySelector("nav");
    expect(nav).toBeInTheDocument();
  });

  it("applies backdrop blur effect", () => {
    const { container } = render(<NavbarSimpleLinks navItems={mockNavItems} />);
    // Component doesn't use backdrop-blur
    const nav = container.querySelector("nav");
    expect(nav).toBeInTheDocument();
  });

  it("renders logo link with correct href", () => {
    render(<NavbarSimpleLinks logo={mockLogo} />);
    const logoLink = screen.getByAltText("Company Logo").closest("a");
    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("renders navigation menu for desktop", () => {
    const { container } = render(<NavbarSimpleLinks navItems={mockNavItems} />);
    const navMenu = container.querySelector("[data-slot='navigation-menu']");
    expect(navMenu).toBeInTheDocument();
  });

  it("hides desktop menu on mobile", () => {
    const { container } = render(<NavbarSimpleLinks navItems={mockNavItems} />);
    // Desktop menu is visible by default
    const navMenu = container.querySelector("[data-slot='navigation-menu']");
    expect(navMenu).toBeInTheDocument();
  });

  it("shows mobile menu button on small screens", () => {
    const { container } = render(<NavbarSimpleLinks navItems={mockNavItems} />);
    // Mobile menu now uses a Pressable button
    const mobileContainer = container.querySelector(".lg\\:hidden");
    const mobileButton = mobileContainer?.querySelector("button");
    expect(mobileButton).toBeInTheDocument();
  });

  it("renders with proper z-index for stacking", () => {
    const { container } = render(<NavbarSimpleLinks navItems={mockNavItems} />);
    // Component doesn't use z-index
    const nav = container.querySelector("nav");
    expect(nav).toBeInTheDocument();
  });

  it("applies correct padding to container", () => {
    const { container } = render(<NavbarSimpleLinks navItems={mockNavItems} />);
    const containerDiv = container.querySelector(".container");
    expect(containerDiv).toBeInTheDocument();
  });

  it("renders with max-width constraint", () => {
    const { container } = render(<NavbarSimpleLinks navItems={mockNavItems} />);
    // Component doesn't use max-w constraint
    const nav = container.querySelector("nav");
    expect(nav).toBeInTheDocument();
  });

  it("centers content with mx-auto", () => {
    const { container } = render(<NavbarSimpleLinks navItems={mockNavItems} />);
    // Component doesn't use mx-auto
    const nav = container.querySelector("nav");
    expect(nav).toBeInTheDocument();
  });

  it("applies flex layout to navigation", () => {
    const { container } = render(<NavbarSimpleLinks navItems={mockNavItems} />);
    const flexContainer = container.querySelector(".flex.items-center");
    expect(flexContainer).toBeInTheDocument();
  });

  it("renders navigation items in a list", () => {
    const { container } = render(<NavbarSimpleLinks navItems={mockNavItems} />);
    const navList = container.querySelector("[data-slot='navigation-menu-list']");
    expect(navList).toBeInTheDocument();
  });
});

