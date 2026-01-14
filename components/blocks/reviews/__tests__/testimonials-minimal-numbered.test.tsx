import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { TestimonialsMinimalNumbered } from "../testimonials-minimal-numbered";

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

describe("TestimonialsMinimalNumbered", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<TestimonialsMinimalNumbered />);
    expect(screen.getByText("This platform has completely transformed how we approach our daily operations. The intuitive design and powerful features have made our team significantly more productive.")).toBeInTheDocument();
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
  });

  it("renders custom testimonials", () => {
    const testimonials = [
      { quote: "Custom quote", author: "John Doe", role: "CEO", company: "TestCo" },
    ];
    render(<TestimonialsMinimalNumbered testimonials={testimonials} />);
    expect(screen.getByText("Custom quote")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders author role and company", () => {
    render(<TestimonialsMinimalNumbered />);
    expect(screen.getByText("Design Director")).toBeInTheDocument();
    expect(screen.getByText("Linear")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<TestimonialsMinimalNumbered className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
