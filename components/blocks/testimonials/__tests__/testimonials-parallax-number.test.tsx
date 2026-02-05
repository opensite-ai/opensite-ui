import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { TestimonialsParallaxNumber } from "../testimonials-parallax-number";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
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

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <div data-testid="mock-motion-div" className={className}>{children}</div>
    ),
    span: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <span data-testid="mock-motion-span" className={className}>{children}</span>
    ),
    blockquote: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <blockquote data-testid="mock-motion-blockquote" className={className}>{children}</blockquote>
    ),
    button: ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
      <button data-testid="mock-motion-button" className={className} onClick={onClick}>{children}</button>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useMotionValue: () => ({ set: vi.fn() }),
  useSpring: () => ({ set: vi.fn() }),
  useTransform: () => 0,
}));

describe("TestimonialsParallaxNumber", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with explicit testimonials", () => {
    const testimonials = [
      { quote: "Test quote", author: "Test Author", role: "Test Role", company: "Test Company" },
    ];
    render(<TestimonialsParallaxNumber testimonials={testimonials} />);
    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByText("Test Author")).toBeInTheDocument();
  });

  it("renders custom testimonials", () => {
    const testimonials = [
      { quote: "Custom quote", author: "John Doe", role: "CEO", company: "TestCo" },
    ];
    render(<TestimonialsParallaxNumber testimonials={testimonials} />);
    expect(screen.getByText("Custom")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders author role", () => {
    const testimonials = [
      { quote: "Test quote", author: "Test Author", role: "Design Director", company: "Test Company" },
    ];
    render(<TestimonialsParallaxNumber testimonials={testimonials} />);
    expect(screen.getByText("Design Director")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const testimonials = [
      { quote: "Test quote", author: "Test Author", role: "Test Role", company: "Test Company" },
    ];
    const { container } = render(<TestimonialsParallaxNumber testimonials={testimonials} className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
