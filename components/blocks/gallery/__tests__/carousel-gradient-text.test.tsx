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

  it("renders with default props", () => {
    render(<CarouselGradientText />);
    expect(screen.getByText("Code less.")).toBeInTheDocument();
    expect(screen.getByText("Build faster.")).toBeInTheDocument();
    expect(screen.getByText(/Start with our templates/)).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CarouselGradientText heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom subheading", () => {
    render(<CarouselGradientText subheading="Custom Subheading" />);
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
