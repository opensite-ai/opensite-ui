import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { TestimonialsQuoteCarousel } from "../testimonials-quote-carousel";

vi.mock("../../../ui/card", () => ({
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="mock-card" className={className}>{children}</div>
  ),
  CardContent: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="mock-card-content" className={className}>{children}</div>
  ),
}));

vi.mock("../../../ui/avatar", () => ({
  Avatar: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="mock-avatar" className={className}>{children}</div>
  ),
  AvatarImage: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="mock-avatar-image" />
  ),
  AvatarFallback: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="mock-avatar-fallback">{children}</span>
  ),
}));

vi.mock("../../../ui/carousel", () => ({
  Carousel: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="mock-carousel" className={className}>{children}</div>
  ),
  CarouselContent: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="mock-carousel-content" className={className}>{children}</div>
  ),
  CarouselItem: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="mock-carousel-item" className={className}>{children}</div>
  ),
  CarouselNext: ({ className }: { className?: string }) => (
    <button data-testid="mock-carousel-next" className={className}>Next</button>
  ),
  CarouselPrevious: ({ className }: { className?: string }) => (
    <button data-testid="mock-carousel-previous" className={className}>Previous</button>
  ),
}));

vi.mock("../../../../lib/blockBrandedIconsAndPlaceholders", () => ({
  blockBrandedIconsAndPlaceholders: {
    avatar1: "https://placeholder.com/avatar1.jpg",
    avatar2: "https://placeholder.com/avatar2.jpg",
    avatar3: "https://placeholder.com/avatar3.jpg",
    avatar4: "https://placeholder.com/avatar4.jpg",
    avatar5: "https://placeholder.com/avatar5.jpg",
  },
}));

describe("TestimonialsQuoteCarousel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<TestimonialsQuoteCarousel />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<TestimonialsQuoteCarousel className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<TestimonialsQuoteCarousel />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    const { container } = render(<TestimonialsQuoteCarousel heading="Custom Heading" />);
    expect(container.textContent).toContain("Custom Heading");
  });
});
