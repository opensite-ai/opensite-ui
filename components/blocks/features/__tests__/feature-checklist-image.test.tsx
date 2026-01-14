import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureChecklistImage } from "../feature-checklist-image";

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

describe("FeatureChecklistImage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<FeatureChecklistImage />);
    expect(screen.getByText("Built with the latest technology stack")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureChecklistImage title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<FeatureChecklistImage description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders image with correct alt text", () => {
    render(<FeatureChecklistImage imageAlt="Custom alt text" />);
    const img = screen.getByTestId("mock-img");
    expect(img).toHaveAttribute("alt", "Custom alt text");
  });

  it("renders checklist items when provided", () => {
    const checklistItems = [
      { content: "Feature one" },
      { content: "Feature two" },
    ];
    render(<FeatureChecklistImage checklistItems={checklistItems} />);
    expect(screen.getByText("Feature one")).toBeInTheDocument();
    expect(screen.getByText("Feature two")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureChecklistImage className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
