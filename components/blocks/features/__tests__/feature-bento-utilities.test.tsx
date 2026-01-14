import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureBentoUtilities } from "../feature-bento-utilities";

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

describe("FeatureBentoUtilities", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<FeatureBentoUtilities />);
    expect(screen.getByText("Utilites for every use case and platform you can think of.")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureBentoUtilities title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<FeatureBentoUtilities description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders features when provided", () => {
    const features = [{ title: "Feature 1", description: "Description 1" }];
    render(<FeatureBentoUtilities features={features} />);
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureBentoUtilities className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
