import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroBusinessOperationsMosaic } from "../hero-business-operations-mosaic";

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

describe("HeroBusinessOperationsMosaic", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<HeroBusinessOperationsMosaic />);
    expect(screen.getByText("Revolutionize your business operations")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroBusinessOperationsMosaic heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom subheading", () => {
    render(<HeroBusinessOperationsMosaic subheading="Custom subheading text" />);
    expect(screen.getByText("Custom subheading text")).toBeInTheDocument();
  });

  it("renders images when provided", () => {
    const images = [
      { src: "https://example.com/image1.jpg", alt: "Image 1" },
      { src: "https://example.com/image2.jpg", alt: "Image 2" },
    ];
    render(<HeroBusinessOperationsMosaic images={images} />);
    const renderedImages = screen.getAllByTestId("mock-img");
    expect(renderedImages.length).toBeGreaterThan(0);
  });

  it("applies custom className", () => {
    const { container } = render(<HeroBusinessOperationsMosaic className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
