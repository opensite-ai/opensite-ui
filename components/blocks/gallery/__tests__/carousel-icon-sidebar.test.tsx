import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CarouselIconSidebar } from "../carousel-icon-sidebar";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
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

describe("CarouselIconSidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<CarouselIconSidebar />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders items when provided", () => {
    const items = [
      {
        src: "https://example.com/image.jpg",
        title: "Elegant Design",
        description: "Beautiful interfaces that users love",
        icon: "lucide/palette",
      },
    ];
    render(<CarouselIconSidebar items={items} />);
    expect(screen.getByText("Elegant Design")).toBeInTheDocument();
    expect(screen.getByText("Beautiful interfaces that users love")).toBeInTheDocument();
  });

  it("renders carousel navigation", () => {
    const items = [
      {
        src: "https://example.com/image.jpg",
        title: "Test",
        description: "Test description",
        icon: "lucide/star",
      },
    ];
    render(<CarouselIconSidebar items={items} />);
    expect(screen.getByTestId("carousel-next")).toBeInTheDocument();
    expect(screen.getByTestId("carousel-prev")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CarouselIconSidebar className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
