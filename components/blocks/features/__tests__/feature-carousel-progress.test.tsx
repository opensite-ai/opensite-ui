import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureCarouselProgress } from "../feature-carousel-progress";

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

describe("FeatureCarouselProgress", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<FeatureCarouselProgress />);
    expect(screen.getByText("Badge")).toBeInTheDocument();
    expect(screen.getByText("This is where your features go")).toBeInTheDocument();
  });

  it("renders custom badge", () => {
    render(<FeatureCarouselProgress badge="Custom Badge" />);
    expect(screen.getByText("Custom Badge")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureCarouselProgress title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders slides when provided", () => {
    const slides = [
      { title: "Slide One", description: "Description one" },
      { title: "Slide Two", description: "Description two" },
    ];
    render(<FeatureCarouselProgress slides={slides} />);
    expect(screen.getByText("Slide One")).toBeInTheDocument();
    expect(screen.getByText("Slide Two")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureCarouselProgress className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
