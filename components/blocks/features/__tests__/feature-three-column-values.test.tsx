import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureThreeColumnValues } from "../feature-three-column-values";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("FeatureThreeColumnValues", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<FeatureThreeColumnValues label="Test Label" title="Test Title" />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders custom label", () => {
    render(<FeatureThreeColumnValues label="Custom Label" />);
    expect(screen.getByText("Custom Label")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureThreeColumnValues title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders values when provided", () => {
    const values = [
      { title: "Value One", description: "Description one" },
      { title: "Value Two", description: "Description two" },
    ];
    render(<FeatureThreeColumnValues values={values} />);
    expect(screen.getByText("Value One")).toBeInTheDocument();
    expect(screen.getByText("Value Two")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureThreeColumnValues className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
