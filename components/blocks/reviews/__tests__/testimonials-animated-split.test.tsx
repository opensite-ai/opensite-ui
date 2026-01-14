import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { TestimonialsAnimatedSplit } from "../testimonials-animated-split";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <div data-testid="mock-motion-div" className={className}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
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

describe("TestimonialsAnimatedSplit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<TestimonialsAnimatedSplit />);
    expect(screen.getByText("This platform has completely transformed how we approach our daily operations. The intuitive design and powerful features have made our team significantly more productive.")).toBeInTheDocument();
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
  });

  it("renders custom testimonials", () => {
    const testimonials = [
      { quote: "Custom quote", author: "John Doe", role: "CEO", company: "TestCo" },
    ];
    render(<TestimonialsAnimatedSplit testimonials={testimonials} />);
    expect(screen.getByText("Custom quote")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders author role and company", () => {
    render(<TestimonialsAnimatedSplit />);
    expect(screen.getByText(/Product Manager/)).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<TestimonialsAnimatedSplit className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
