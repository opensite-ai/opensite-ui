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

  it("renders with provided props", () => {
    render(<FeatureChecklistImage title="Test Title" description="Test Description" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
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
    render(<FeatureChecklistImage imageSrc="test-image.jpg" imageAlt="Custom alt text" />);
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

  it("renders checklist item title and description payloads", () => {
    const checklistItems = [
      {
        title: "Cost-Effective",
        description: "Lower material and labor costs.",
      },
      {
        title: "Montana-Ready Durability",
        description: "Engineered for snow loads and wind.",
      },
    ];

    render(<FeatureChecklistImage checklistItems={checklistItems} />);

    expect(screen.getByText("Cost-Effective")).toBeInTheDocument();
    expect(screen.getByText("Lower material and labor costs.")).toBeInTheDocument();
    expect(screen.getByText("Montana-Ready Durability")).toBeInTheDocument();
    expect(screen.getByText("Engineered for snow loads and wind.")).toBeInTheDocument();
  });

  it("renders benefits as a checklistItems alias", () => {
    render(
      <FeatureChecklistImage
        benefits={[{ title: "Easy Setup", description: "Get started in minutes." }]}
      />,
    );

    expect(screen.getByText("Easy Setup")).toBeInTheDocument();
    expect(screen.getByText("Get started in minutes.")).toBeInTheDocument();
  });

  it("does not render icon-only rows for empty checklist items", () => {
    render(<FeatureChecklistImage checklistItems={[{}, { content: "Visible item" }]} />);

    expect(screen.getAllByTestId("mock-icon")).toHaveLength(1);
    expect(screen.getByText("Visible item")).toBeInTheDocument();
  });

  it("renders the image inside a stable aspect-ratio frame", () => {
    const { container } = render(
      <FeatureChecklistImage imageSrc="test-image.jpg" imageAlt="Custom alt text" />,
    );

    const img = screen.getByTestId("mock-img");
    expect(img).toHaveClass("h-full", "w-full", "object-cover");
    expect(container.querySelector(".aspect-\\[3\\/2\\]")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureChecklistImage className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
