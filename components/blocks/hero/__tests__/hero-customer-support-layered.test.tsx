import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroCustomerSupportLayered } from "../hero-customer-support-layered";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("HeroCustomerSupportLayered", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<HeroCustomerSupportLayered />);
    expect(container.querySelector("section")).toBeInTheDocument();
    expect(screen.getByText("Customer Support")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroCustomerSupportLayered heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroCustomerSupportLayered description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders images when provided", () => {
    const images = [
      { src: "https://example.com/image1.jpg", alt: "Image 1" },
      { src: "https://example.com/image2.jpg", alt: "Image 2" },
      { src: "https://example.com/image3.jpg", alt: "Image 3" },
    ];
    render(<HeroCustomerSupportLayered images={images} />);
    const renderedImages = screen.getAllByTestId("mock-img");
    expect(renderedImages.length).toBe(3);
  });

  it("applies custom className", () => {
    const { container } = render(<HeroCustomerSupportLayered className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
