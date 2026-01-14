import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { TestimonialsSliderMinimal } from "../testimonials-slider-minimal";

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

vi.mock("../../../../lib/blockBrandedIconsAndPlaceholders", () => ({
  blockBrandedIconsAndPlaceholders: {
    avatar1: "https://placeholder.com/avatar1.jpg",
    avatar2: "https://placeholder.com/avatar2.jpg",
    avatar3: "https://placeholder.com/avatar3.jpg",
  },
}));

describe("TestimonialsSliderMinimal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<TestimonialsSliderMinimal />);
    expect(screen.getByText(/This platform has completely transformed how our team collaborates/)).toBeInTheDocument();
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
  });

  it("renders custom testimonials", () => {
    const testimonials = [
      { quote: "Custom quote", author: "John Doe", role: "CEO at TestCo" },
    ];
    render(<TestimonialsSliderMinimal testimonials={testimonials} />);
    expect(screen.getByText(/Custom quote/)).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders author role", () => {
    render(<TestimonialsSliderMinimal />);
    expect(screen.getByText("Product Manager at TechCorp")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<TestimonialsSliderMinimal className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
