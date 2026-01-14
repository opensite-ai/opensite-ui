import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FooterBrandLinksContact } from "../footer-brand-links-contact";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>
      icon
    </span>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  logoPlaceholders: {
    lightHorizontalLogo: "https://placeholder.com/logo-light.png",
  },
}));

describe("FooterBrandLinksContact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<FooterBrandLinksContact />);
    expect(screen.getByText("Modern coverage guidance powered by OpenSite AI.")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders custom tagline", () => {
    render(<FooterBrandLinksContact tagline="Custom tagline" />);
    expect(screen.getByText("Custom tagline")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<FooterBrandLinksContact description="Custom description" />);
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders link groups when provided", () => {
    const linkGroups = [
      { title: "Products", links: [{ label: "Feature 1", href: "/feature1" }] },
    ];
    render(<FooterBrandLinksContact linkGroups={linkGroups} />);
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FooterBrandLinksContact className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
