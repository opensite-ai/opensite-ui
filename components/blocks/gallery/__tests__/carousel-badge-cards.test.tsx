import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CarouselBadgeCards } from "../carousel-badge-cards";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../ui/badge", () => ({
  Badge: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span className={className} data-testid="mock-badge">{children}</span>
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

describe("CarouselBadgeCards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<CarouselBadgeCards />);
    expect(screen.getByText("Case Studies")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CarouselBadgeCards heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders items when provided", () => {
    const items = [
      {
        id: "1",
        title: "Case Study 1",
        description: "Description 1",
        label: "Analytics",
        href: "/case-1",
        image: "https://example.com/image.jpg",
      },
    ];
    render(<CarouselBadgeCards items={items} />);
    expect(screen.getByText("Case Study 1")).toBeInTheDocument();
    expect(screen.getByText("Analytics")).toBeInTheDocument();
    expect(screen.getByText("Read more")).toBeInTheDocument();
  });

  it("renders custom read more text", () => {
    const items = [
      {
        id: "1",
        title: "Case Study 1",
        description: "Description 1",
        label: "Analytics",
        href: "/case-1",
        image: "https://example.com/image.jpg",
      },
    ];
    render(<CarouselBadgeCards items={items} readMoreText="Learn more" />);
    expect(screen.getByText("Learn more")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CarouselBadgeCards className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
