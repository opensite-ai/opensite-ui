import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CarouselGradientOverlay } from "../carousel-gradient-overlay";

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

describe("CarouselGradientOverlay", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<CarouselGradientOverlay />);
    expect(screen.getByText("Case Studies")).toBeInTheDocument();
    expect(screen.getByText(/Discover how leading companies/)).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<CarouselGradientOverlay title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CarouselGradientOverlay description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders items when provided", () => {
    const items = [
      {
        id: "1",
        title: "E-commerce Platform",
        description: "A complete redesign",
        href: "/case-studies/ecommerce",
        image: "https://example.com/image.jpg",
      },
    ];
    render(<CarouselGradientOverlay items={items} />);
    expect(screen.getByText("E-commerce Platform")).toBeInTheDocument();
    expect(screen.getByText("A complete redesign")).toBeInTheDocument();
    expect(screen.getByText("Read more")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CarouselGradientOverlay className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
