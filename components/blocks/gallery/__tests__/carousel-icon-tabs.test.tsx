import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CarouselIconTabs } from "../carousel-icon-tabs";

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
  CarouselPrevious: ({ className }: { className?: string }) => <button data-testid="carousel-previous" className={className}>Previous</button>,
  CarouselNext: ({ className }: { className?: string }) => <button data-testid="carousel-next" className={className}>Next</button>,
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("CarouselIconTabs", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<CarouselIconTabs />);
    expect(screen.getByText(/Cut the time it takes to close your books/)).toBeInTheDocument();
    expect(screen.getByText(/Lorem ipsum dolor sit amet/)).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CarouselIconTabs heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom badge", () => {
    render(<CarouselIconTabs badge="Custom Badge" />);
    expect(screen.getByText("Custom Badge")).toBeInTheDocument();
  });

  it("renders sections when provided", () => {
    const sections = [
      {
        img: "https://example.com/design.jpg",
        title: "Design",
        text: "Create beautiful interfaces",
        icon: "lucide/palette",
      },
    ];
    render(<CarouselIconTabs sections={sections} />);
    expect(screen.getAllByText("Design").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Create beautiful interfaces").length).toBeGreaterThan(0);
  });

  it("applies custom className", () => {
    const { container } = render(<CarouselIconTabs className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
