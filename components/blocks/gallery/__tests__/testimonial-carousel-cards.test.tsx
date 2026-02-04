import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { TestimonialCarouselCards } from "../testimonial-carousel-cards";

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
  avatarPlaceholders: Array(20).fill("https://placeholder.com/avatar.jpg"),
}));

describe("TestimonialCarouselCards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with required props", () => {
    render(<TestimonialCarouselCards heading="Test Heading" description="Test description" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<TestimonialCarouselCards heading="Custom Heading" description="Test description" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<TestimonialCarouselCards heading="Test Heading" description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders items when provided", () => {
    const items = [
      {
        id: "1",
        username: "@testuser",
        quote: "Great service!",
        author: "John Doe",
        image: "https://example.com/image.jpg",
        bgColor: "bg-blue-300",
      },
    ];
    render(<TestimonialCarouselCards items={items} />);
    // Username is used as alt text for the image, not as visible text
    expect(screen.getByAltText("@testuser")).toBeInTheDocument();
    expect(screen.getByText("Great service!")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<TestimonialCarouselCards className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
