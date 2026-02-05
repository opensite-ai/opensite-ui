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

  it("renders with explicit testimonial", () => {
    const testimonial = { quote: "Test quote", author: "Test Author", role: "Test Role" };
    render(<TestimonialsSplitImage testimonial={testimonial} imageSrc="https://placeholder.com/image.jpg" imageAlt="Test Image" />);
    expect(screen.getByText("Test quote")).toBeInTheDocument();
    expect(screen.getByText("Test Author")).toBeInTheDocument();
  });

  it("renders custom testimonial quote", () => {
    render(<TestimonialsSplitImage testimonial={{ quote: "Custom quote", author: "John Doe", role: "CEO" }} imageSrc="https://placeholder.com/image.jpg" imageAlt="Test Image" />);
    expect(screen.getByText("Custom quote")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders author role and company", () => {
    const testimonial = { quote: "Test quote", author: "Test Author", role: "CEO", company: "Test Company" };
    render(<TestimonialsSplitImage testimonial={testimonial} imageSrc="https://placeholder.com/image.jpg" imageAlt="Test Image" />);
    expect(screen.getByText(/CEO/)).toBeInTheDocument();
    expect(screen.getByText(/Test Company/)).toBeInTheDocument();
  });

  it("renders custom image alt text", () => {
    const testimonial = { quote: "Test quote", author: "Test Author", role: "Test Role" };
    render(<TestimonialsSplitImage testimonial={testimonial} imageSrc="https://placeholder.com/image.jpg" imageAlt="Custom Image" />);
    expect(screen.getByAltText("Custom Image")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const testimonial = { quote: "Test quote", author: "Test Author", role: "Test Role" };
    const { container } = render(<TestimonialsSplitImage testimonial={testimonial} imageSrc="https://placeholder.com/image.jpg" imageAlt="Test Image" className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
