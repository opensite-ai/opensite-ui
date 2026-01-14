import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CarouselGradientText } from "../carousel-gradient-text";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../ui/carousel", () => ({
  Carousel: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel">{children}</div>,
  CarouselContent: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-content">{children}</div>,
  CarouselItem: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-item">{children}</div>,
  CarouselNext: () => <button data-testid="carousel-next">Next</button>,
  CarouselPrevious: () => <button data-testid="carousel-prev">Prev</button>,
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("CarouselGradientText", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with required props", () => {
    render(<CarouselGradientText heading="Test Heading" subheading="Test Subheading" tagline="Test description" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Subheading")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CarouselGradientText heading="Custom Heading" subheading="Test Subheading" tagline="Test description" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom subheading", () => {
    render(<CarouselGradientText heading="Test Heading" subheading="Custom Subheading" tagline="Test description" />);
    expect(screen.getByText("Custom Subheading")).toBeInTheDocument();
  });

  it("renders items when provided", () => {
    const items = [
      { image: "https://example.com/image.jpg", title: "Feature 1", description: "Description 1" },
    ];
    render(<CarouselGradientText items={items} />);
    expect(screen.getByText("Feature 1.")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CarouselGradientText className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
