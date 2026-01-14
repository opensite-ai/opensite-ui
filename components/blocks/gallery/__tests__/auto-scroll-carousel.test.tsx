import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AutoScrollCarousel } from "../auto-scroll-carousel";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("embla-carousel-auto-scroll", () => ({
  default: () => ({}),
}));

vi.mock("../../../ui/carousel", () => ({
  Carousel: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel">{children}</div>,
  CarouselContent: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-content">{children}</div>,
  CarouselItem: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-item">{children}</div>,
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("AutoScrollCarousel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<AutoScrollCarousel />);
    expect(screen.getByText(/Bringing your data to life/)).toBeInTheDocument();
    expect(screen.getByText(/We thrive on the power of AI/)).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<AutoScrollCarousel heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<AutoScrollCarousel description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders images when provided", () => {
    const images = [
      { src: "https://example.com/image1.jpg", alt: "Team photo 1" },
      { src: "https://example.com/image2.jpg", alt: "Team photo 2" },
    ];
    render(<AutoScrollCarousel images={images} />);
    expect(screen.getByAltText("Team photo 1")).toBeInTheDocument();
    expect(screen.getByAltText("Team photo 2")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<AutoScrollCarousel className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
