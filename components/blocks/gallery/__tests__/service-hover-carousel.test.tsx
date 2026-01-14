import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServiceHoverCarousel } from "../service-hover-carousel";

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

describe("ServiceHoverCarousel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<ServiceHoverCarousel />);
    expect(screen.getByText("Our Services")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<ServiceHoverCarousel heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders items when provided", () => {
    const items = [
      {
        id: "1",
        title: "Web Development",
        price: "$1,500",
        image: "https://example.com/image.jpg",
        hoverImage: "https://example.com/hover.jpg",
        tag: "Custom Solutions",
      },
    ];
    render(<ServiceHoverCarousel items={items} />);
    expect(screen.getByText("Web Development")).toBeInTheDocument();
    expect(screen.getByText("Custom Solutions")).toBeInTheDocument();
    expect(screen.getByText("$1,500")).toBeInTheDocument();
  });

  it("renders custom price prefix", () => {
    const items = [
      {
        id: "1",
        title: "Service 1",
        price: "$500",
        image: "https://example.com/image.jpg",
        hoverImage: "https://example.com/hover.jpg",
        tag: "Tag",
      },
    ];
    render(<ServiceHoverCarousel items={items} pricePrefix="From" />);
    expect(screen.getByText("From")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ServiceHoverCarousel className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
