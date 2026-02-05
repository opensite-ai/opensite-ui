import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { TestimonialsLargeQuote } from "../testimonials-large-quote";

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

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

vi.mock("../../../../lib/blockBrandedIconsAndPlaceholders", () => ({
  blockBrandedIconsAndPlaceholders: {
    avatar1: "https://placeholder.com/avatar1.jpg",
  },
}));

describe("TestimonialsLargeQuote", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with explicit testimonial", () => {
    const testimonial = { quote: "Test quote", author: "Test Author", role: "Test Role" };
    render(<TestimonialsLargeQuote testimonial={testimonial} />);
    expect(screen.getByText("Test quote")).toBeInTheDocument();
    expect(screen.getByText("Test Author")).toBeInTheDocument();
  });

  it("renders custom testimonial quote", () => {
    render(<TestimonialsLargeQuote testimonial={{ quote: "Custom quote", author: "John Doe", role: "CEO" }} />);
    expect(screen.getByText("Custom quote")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders author role and company", () => {
    const testimonial = { quote: "Test quote", author: "Test Author", role: "CEO", company: "TechVentures Inc." };
    render(<TestimonialsLargeQuote testimonial={testimonial} />);
    expect(screen.getByText(/CEO/)).toBeInTheDocument();
    expect(screen.getByText(/TechVentures Inc./)).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const testimonial = { quote: "Test quote", author: "Test Author", role: "Test Role" };
    const { container } = render(<TestimonialsLargeQuote testimonial={testimonial} className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
