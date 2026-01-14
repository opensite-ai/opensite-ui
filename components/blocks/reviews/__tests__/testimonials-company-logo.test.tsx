import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { TestimonialsCompanyLogo } from "../testimonials-company-logo";

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
  logoPlaceholders: {
    light: "https://placeholder.com/logo-light.svg",
    dark: "https://placeholder.com/logo-dark.svg",
  },
}));

describe("TestimonialsCompanyLogo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with explicit testimonial", () => {
    const testimonial = { quote: "Test quote", author: "Test Author", role: "Test Role" };
    render(<TestimonialsCompanyLogo testimonial={testimonial} companyLogoAlt="Test Company" imageAlt="Test Image" />);
    expect(screen.getByText("Test quote")).toBeInTheDocument();
    expect(screen.getByText("Test Author")).toBeInTheDocument();
  });

  it("renders custom testimonial quote", () => {
    render(<TestimonialsCompanyLogo testimonial={{ quote: "Custom quote", author: "John Doe", role: "CEO" }} companyLogoAlt="Test Company" imageAlt="Test Image" />);
    expect(screen.getByText("Custom quote")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders custom company logo alt text", () => {
    const testimonial = { quote: "Test quote", author: "Test Author", role: "Test Role" };
    render(<TestimonialsCompanyLogo testimonial={testimonial} companyLogoAlt="Custom Company" imageAlt="Test Image" />);
    expect(screen.getByAltText("Custom Company")).toBeInTheDocument();
  });

  it("renders custom image alt text", () => {
    const testimonial = { quote: "Test quote", author: "Test Author", role: "Test Role" };
    render(<TestimonialsCompanyLogo testimonial={testimonial} companyLogoAlt="Test Company" imageAlt="Custom Image" />);
    expect(screen.getByAltText("Custom Image")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const testimonial = { quote: "Test quote", author: "Test Author", role: "Test Role" };
    const { container } = render(<TestimonialsCompanyLogo testimonial={testimonial} companyLogoAlt="Test Company" imageAlt="Test Image" className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
