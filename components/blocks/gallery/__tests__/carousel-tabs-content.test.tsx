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
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders items when provided", () => {
    const items = [
      {
        title: "Core Features",
        description: "Detailed feature description",
        note: "Additional context",
        image: "https://example.com/features.jpg",
        category: "Features",
      },
    ];
    render(<CarouselTabsContent items={items} />);
    expect(screen.getByText("Core Features")).toBeInTheDocument();
    expect(screen.getByText("Detailed feature description")).toBeInTheDocument();
    expect(screen.getByText("Features")).toBeInTheDocument();
  });

  it("renders carousel navigation", () => {
    render(<CarouselTabsContent />);
    expect(screen.getByTestId("carousel-previous")).toBeInTheDocument();
    expect(screen.getByTestId("carousel-next")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CarouselTabsContent className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
