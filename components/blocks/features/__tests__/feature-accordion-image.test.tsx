import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureAccordionImage } from "../feature-accordion-image";

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

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("FeatureAccordionImage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<FeatureAccordionImage />);
    expect(screen.getByText("How It Works")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureAccordionImage title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<FeatureAccordionImage description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders accordion items when provided", () => {
    const items = [
      { title: "Step One", content: "Content one" },
      { title: "Step Two", content: "Content two" },
    ];
    render(<FeatureAccordionImage items={items} />);
    expect(screen.getByText("Step One")).toBeInTheDocument();
    expect(screen.getByText("Step Two")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureAccordionImage className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
