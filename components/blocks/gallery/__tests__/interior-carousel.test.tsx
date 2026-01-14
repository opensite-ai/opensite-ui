import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { InteriorCarousel } from "../interior-carousel";

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

describe("InteriorCarousel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<InteriorCarousel />);
    expect(screen.getByText("Beautiful Interiors.")).toBeInTheDocument();
    expect(screen.getByText(/Explore our curated collection/)).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<InteriorCarousel heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<InteriorCarousel description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders images when provided", () => {
    const images = [
      { src: "https://example.com/image1.jpg", alt: "Interior 1" },
      { src: "https://example.com/image2.jpg", alt: "Interior 2" },
    ];
    render(<InteriorCarousel images={images} />);
    expect(screen.getByAltText("Interior 1")).toBeInTheDocument();
    expect(screen.getByAltText("Interior 2")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<InteriorCarousel className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
