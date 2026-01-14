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

  it("renders with explicit testimonials", () => {
    const testimonials = [
      { quote: "Test quote", author: "Test Author", role: "Test Role", company: "Test Company" },
    ];
    render(<TestimonialsMinimalNumbered testimonials={testimonials} />);
    expect(screen.getByText("Test quote")).toBeInTheDocument();
    expect(screen.getByText("Test Author")).toBeInTheDocument();
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
    const testimonials = [
      { quote: "Test quote", author: "Test Author", role: "Design Director", company: "Linear" },
    ];
    render(<TestimonialsMinimalNumbered testimonials={testimonials} />);
    expect(screen.getByText("Design Director")).toBeInTheDocument();
    expect(screen.getByText("Linear")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const testimonials = [
      { quote: "Test quote", author: "Test Author", role: "Test Role", company: "Test Company" },
    ];
    const { container } = render(<TestimonialsMinimalNumbered testimonials={testimonials} className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
