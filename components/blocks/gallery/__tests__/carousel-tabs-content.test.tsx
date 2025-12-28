import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CarouselTabsContent } from "../carousel-tabs-content";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../ui/carousel", () => ({
  Carousel: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel">{children}</div>,
  CarouselContent: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-content">{children}</div>,
  CarouselItem: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-item">{children}</div>,
  CarouselPrevious: ({ className }: { className?: string }) => <button data-testid="carousel-previous" className={className}>Previous</button>,
  CarouselNext: ({ className }: { className?: string }) => <button data-testid="carousel-next" className={className}>Next</button>,
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("CarouselTabsContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<CarouselTabsContent />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CarouselTabsContent className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders carousel component", () => {
    render(<CarouselTabsContent />);
    expect(screen.getByTestId("carousel")).toBeInTheDocument();
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<CarouselTabsContent />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });
});
