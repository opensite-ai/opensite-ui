import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroFullscreenLogoCta } from "../hero-fullscreen-logo-cta";

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
  logoPlaceholders: Array(20).fill("https://placeholder.com/logo.png"),
}));

describe("HeroFullscreenLogoCta", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<HeroFullscreenLogoCta />);
    expect(screen.getByText("Create your own fiber optics facility")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroFullscreenLogoCta heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroFullscreenLogoCta description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders logo when provided", () => {
    const logo = { src: "https://example.com/logo.png", alt: "Test Logo" };
    render(<HeroFullscreenLogoCta logo={logo} />);
    const img = screen.getByTestId("mock-img");
    expect(img).toHaveAttribute("alt", "Test Logo");
  });

  it("renders action when provided", () => {
    const action = { label: "Read More", href: "/more", variant: "default" as const };
    render(<HeroFullscreenLogoCta action={action} />);
    expect(screen.getByText("Read More")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroFullscreenLogoCta className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
