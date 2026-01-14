import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroSimpleCenteredImage } from "../hero-simple-centered-image";

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
}));

describe("HeroSimpleCenteredImage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<HeroSimpleCenteredImage />);
    expect(screen.getByText("Welcome to Our Website")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroSimpleCenteredImage heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroSimpleCenteredImage description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders image with default placeholder", () => {
    render(<HeroSimpleCenteredImage />);
    const img = screen.getByTestId("mock-img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("alt", "placeholder hero");
  });

  it("renders image with custom src and alt", () => {
    render(<HeroSimpleCenteredImage imageSrc="https://example.com/image.jpg" imageAlt="Custom alt" />);
    const img = screen.getByTestId("mock-img");
    expect(img).toHaveAttribute("src", "https://example.com/image.jpg");
    expect(img).toHaveAttribute("alt", "Custom alt");
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/start", variant: "default" as const },
      { label: "Learn More", href: "/learn", variant: "outline" as const },
    ];
    render(<HeroSimpleCenteredImage actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("renders actionsSlot when provided", () => {
    render(<HeroSimpleCenteredImage actionsSlot={<button>Custom Action</button>} />);
    expect(screen.getByText("Custom Action")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroSimpleCenteredImage className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
