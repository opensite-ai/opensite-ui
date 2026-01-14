import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroSharedInboxLayered } from "../hero-shared-inbox-layered";

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

describe("HeroSharedInboxLayered", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    const { container } = render(<HeroSharedInboxLayered heading="Test Heading" />);
    expect(container.querySelector("section")).toBeInTheDocument();
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroSharedInboxLayered heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroSharedInboxLayered description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders layered images when provided", () => {
    const layeredImages = {
      backgroundImage: { src: "https://example.com/bg.jpg", alt: "Background" },
      foregroundImage: { src: "https://example.com/fg.jpg", alt: "Foreground" },
    };
    render(<HeroSharedInboxLayered layeredImages={layeredImages} />);
    const renderedImages = screen.getAllByTestId("mock-img");
    expect(renderedImages.length).toBe(2);
  });

  it("applies custom className", () => {
    const { container } = render(<HeroSharedInboxLayered heading="Test Heading" className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
