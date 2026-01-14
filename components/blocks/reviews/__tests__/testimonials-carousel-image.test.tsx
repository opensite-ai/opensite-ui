import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { TestimonialsCarouselImage } from "../testimonials-carousel-image";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <button data-testid="mock-pressable" className={className}>{children}</button>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

vi.mock("../../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("TestimonialsCarouselImage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<TestimonialsCarouselImage />);
    expect(screen.getByText(/Working with this team has been an absolute game-changer/)).toBeInTheDocument();
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
  });

  it("renders custom testimonials", () => {
    const testimonials = [
      { quote: "Custom quote", author: "John Doe", role: "CEO", company: "TestCo" },
    ];
    render(<TestimonialsCarouselImage testimonials={testimonials} />);
    expect(screen.getByText(/Custom quote/)).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders author role and company", () => {
    render(<TestimonialsCarouselImage />);
    expect(screen.getByText("CEO, TechVentures")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<TestimonialsCarouselImage className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
