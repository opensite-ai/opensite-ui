import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaGradientLogosFloating } from "../cta-gradient-logos-floating";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
  logoPlaceholders: Array(20).fill("https://placeholder.com/logo.jpg"),
}));

describe("CtaGradientLogosFloating", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<CtaGradientLogosFloating />);
    expect(screen.getByText("Build faster with")).toBeInTheDocument();
    expect(screen.getByText("modern tools")).toBeInTheDocument();
    expect(screen.getByText("Join thousands of developers building amazing products. Get started today and ship faster than ever.")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaGradientLogosFloating heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom heading gradient", () => {
    render(<CtaGradientLogosFloating headingGradient="amazing features" />);
    expect(screen.getByText("amazing features")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaGradientLogosFloating description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/signup", variant: "default" as const },
      { label: "Learn More", href: "/learn", variant: "outline" as const },
    ];
    render(<CtaGradientLogosFloating actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaGradientLogosFloating className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
