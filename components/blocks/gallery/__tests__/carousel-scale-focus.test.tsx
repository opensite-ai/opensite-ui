import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CarouselScaleFocus } from "../carousel-scale-focus";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../ui/carousel", () => ({
  Carousel: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel">{children}</div>,
  CarouselContent: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-content">{children}</div>,
  CarouselItem: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-item">{children}</div>,
}));

vi.mock("../../../ui/carousel-pagination", () => ({
  CarouselPagination: ({ onPrevious, onNext }: { onPrevious: () => void; onNext: () => void }) => (
    <div data-testid="carousel-pagination">
      <button data-testid="carousel-prev" onClick={onPrevious}>Prev</button>
      <button data-testid="carousel-next" onClick={onNext}>Next</button>
    </div>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("CarouselScaleFocus", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<CarouselScaleFocus />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders images when provided", () => {
    const images = [
      { src: "https://example.com/image1.jpg", alt: "Image 1" },
      { src: "https://example.com/image2.jpg", alt: "Image 2" },
    ];
    render(<CarouselScaleFocus images={images} />);
    expect(screen.getByAltText("Image 1")).toBeInTheDocument();
    expect(screen.getByAltText("Image 2")).toBeInTheDocument();
  });

  it("renders carousel navigation", () => {
    render(<CarouselScaleFocus />);
    // CarouselPagination provides unified navigation for mobile and desktop
    expect(screen.getByTestId("carousel-pagination")).toBeInTheDocument();
    expect(screen.getByTestId("carousel-next")).toBeInTheDocument();
    expect(screen.getByTestId("carousel-prev")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CarouselScaleFocus className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
