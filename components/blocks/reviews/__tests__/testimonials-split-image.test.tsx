import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { TestimonialsSplitImage } from "../testimonials-split-image";

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

describe("TestimonialsSplitImage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<TestimonialsSplitImage />);
    expect(screen.getByText("Working with this team has been transformative for our business. Their expertise and dedication to quality have helped us achieve results we never thought possible. The attention to detail and commitment to excellence is evident in everything they do.")).toBeInTheDocument();
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
  });

  it("renders custom testimonial quote", () => {
    render(<TestimonialsSplitImage testimonial={{ quote: "Custom quote", author: "John Doe", role: "CEO" }} />);
    expect(screen.getByText("Custom quote")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders author role and company", () => {
    render(<TestimonialsSplitImage />);
    expect(screen.getByText(/Chief Executive Officer/)).toBeInTheDocument();
    expect(screen.getByText(/TechVentures Inc./)).toBeInTheDocument();
  });

  it("renders custom image alt text", () => {
    render(<TestimonialsSplitImage imageAlt="Custom Image" />);
    expect(screen.getByAltText("Custom Image")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<TestimonialsSplitImage className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
