import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroBusinessCarouselDots } from "../hero-business-carousel-dots";

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

describe("HeroBusinessCarouselDots", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<HeroBusinessCarouselDots />);
    expect(screen.getByText("Your Ultimate Business Solution.")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroBusinessCarouselDots heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroBusinessCarouselDots description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders carousel when images provided", () => {
    const carouselImages = [{ src: "https://example.com/image.jpg", alt: "Test image" }];
    render(<HeroBusinessCarouselDots carouselImages={carouselImages} />);
    expect(screen.getByTestId("carousel")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroBusinessCarouselDots className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
