import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FooterComprehensiveLinks } from "../footer-comprehensive-links";

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

vi.mock("../../../lib/patternSvgs", () => ({
  patternSvgs: {
    grid1: "https://placeholder.com/pattern.svg",
  },
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  logoPlaceholders: {
    lightHorizontalLogo: "https://placeholder.com/logo-light.png",
  },
}));

describe("FooterComprehensiveLinks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<FooterComprehensiveLinks />);
    expect(screen.getByText("Modern coverage guidance powered by OpenSite AI.")).toBeInTheDocument();
  });

  it("renders custom tagline", () => {
    render(<FooterComprehensiveLinks tagline="Custom tagline" />);
    expect(screen.getByText("Custom tagline")).toBeInTheDocument();
  });

  it("renders custom summary", () => {
    render(<FooterComprehensiveLinks summary="Custom summary" />);
    expect(screen.getByText("Custom summary")).toBeInTheDocument();
  });

  it("renders link columns when provided", () => {
    const linkColumns = [
      { title: "Products", links: [{ label: "Feature 1", href: "/feature1" }] },
    ];
    render(<FooterComprehensiveLinks linkColumns={linkColumns} />);
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FooterComprehensiveLinks className="custom-class" />);
    expect(container.querySelector("footer")).toHaveClass("custom-class");
  });
});
