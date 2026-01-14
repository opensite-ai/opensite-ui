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

  it("renders with default props", () => {
    render(<TestimonialsCompanyLogo />);
    expect(screen.getByText("Implementing this solution was the best decision we made this year. Our team productivity increased by 40% and customer satisfaction scores have never been higher. The support team is exceptional - they're always available and incredibly knowledgeable.")).toBeInTheDocument();
    expect(screen.getByText("Jennifer Martinez")).toBeInTheDocument();
  });

  it("renders custom testimonial quote", () => {
    render(<TestimonialsCompanyLogo testimonial={{ quote: "Custom quote", author: "John Doe", role: "CEO" }} />);
    expect(screen.getByText("Custom quote")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders custom company logo alt text", () => {
    render(<TestimonialsCompanyLogo companyLogoAlt="Custom Company" />);
    expect(screen.getByAltText("Custom Company")).toBeInTheDocument();
  });

  it("renders custom image alt text", () => {
    render(<TestimonialsCompanyLogo imageAlt="Custom Image" />);
    expect(screen.getByAltText("Custom Image")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<TestimonialsCompanyLogo className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
