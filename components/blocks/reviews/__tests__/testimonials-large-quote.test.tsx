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

  it("renders with default props", () => {
    render(<TestimonialsLargeQuote />);
    expect(screen.getByText("This platform has fundamentally changed how we approach our work. The intuitive design, powerful features, and exceptional support have made it an indispensable part of our daily operations. I cannot recommend it highly enough to anyone looking to transform their workflow.")).toBeInTheDocument();
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
  });

  it("renders custom testimonial quote", () => {
    render(<TestimonialsLargeQuote testimonial={{ quote: "Custom quote", author: "John Doe", role: "CEO" }} />);
    expect(screen.getByText("Custom quote")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders author role and company", () => {
    render(<TestimonialsLargeQuote />);
    expect(screen.getByText(/Chief Executive Officer/)).toBeInTheDocument();
    expect(screen.getByText(/TechVentures Inc./)).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<TestimonialsLargeQuote className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
