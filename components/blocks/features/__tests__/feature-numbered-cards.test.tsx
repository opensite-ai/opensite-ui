import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureNumberedCards } from "../feature-numbered-cards";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("FeatureNumberedCards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing with default props", () => {
    const { container } = render(<FeatureNumberedCards />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders features when provided", () => {
    const features = [
      { title: "Feature One", description: "Description one" },
      { title: "Feature Two", description: "Description two" },
    ];
    render(<FeatureNumberedCards features={features} />);
    expect(screen.getByText("Feature One")).toBeInTheDocument();
    expect(screen.getByText("Feature Two")).toBeInTheDocument();
  });

  it("renders checklist items when provided", () => {
    const features = [
      { title: "Feature One", checklistItems: ["Item One", "Item Two"] },
    ];
    render(<FeatureNumberedCards features={features} />);
    expect(screen.getByText("Item One")).toBeInTheDocument();
    expect(screen.getByText("Item Two")).toBeInTheDocument();
  });

  it("renders numbered badges", () => {
    const features = [
      { title: "Feature One" },
      { title: "Feature Two" },
    ];
    render(<FeatureNumberedCards features={features} />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureNumberedCards className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
