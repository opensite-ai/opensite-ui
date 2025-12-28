import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComparisonFeatureGrid } from "../comparison-feature-grid";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
  }: {
    name: string;
    size: number;
  }) => (
    <span data-testid="mock-icon" data-name={name} data-size={size}>
      icon
    </span>
  ),
}));

describe("ComparisonFeatureGrid", () => {
  it("renders with default props", () => {
    render(<ComparisonFeatureGrid />);

    expect(screen.getByText("Compare Us")).toBeInTheDocument();
    expect(
      screen.getByText(
        "A modern framework for building websites that is better than the competition."
      )
    ).toBeInTheDocument();
  });

  it("renders with custom title and description", () => {
    render(
      <ComparisonFeatureGrid
        title="Custom Title"
        description="Custom description"
      />
    );

    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders option labels", () => {
    render(
      <ComparisonFeatureGrid
        optionALabel="Option A"
        optionBLabel="Option B"
      />
    );

    const optionAElements = screen.getAllByText("Option A");
    const optionBElements = screen.getAllByText("Option B");
    expect(optionAElements.length).toBeGreaterThan(0);
    expect(optionBElements.length).toBeGreaterThan(0);
  });

  it("renders custom features", () => {
    const customFeatures = [
      {
        icon: "lucide/star",
        label: "Custom Feature",
        description: "Custom description",
        optionA: true as const,
        optionB: false as const,
      },
    ];

    render(<ComparisonFeatureGrid features={customFeatures} />);

    const featureElements = screen.getAllByText("Custom Feature");
    expect(featureElements.length).toBeGreaterThan(0);
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ComparisonFeatureGrid className="custom-class" />
    );

    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders empty features array", () => {
    render(<ComparisonFeatureGrid features={[]} />);

    expect(screen.getByText("Compare Us")).toBeInTheDocument();
  });

  it("renders icons for features", () => {
    render(<ComparisonFeatureGrid />);

    const icons = screen.getAllByTestId("mock-icon");
    expect(icons.length).toBeGreaterThan(0);
  });

  it("renders features with partial values", () => {
    const customFeatures = [
      {
        icon: "lucide/check",
        label: "Feature A",
        description: "Description A",
        optionA: true as const,
        optionB: "partial" as const,
      },
      {
        icon: "lucide/star",
        label: "Feature B",
        description: "Description B",
        optionA: false as const,
        optionB: true as const,
      },
    ];

    render(<ComparisonFeatureGrid features={customFeatures} />);

    const featureAElements = screen.getAllByText("Feature A");
    const featureBElements = screen.getAllByText("Feature B");
    expect(featureAElements.length).toBeGreaterThan(0);
    expect(featureBElements.length).toBeGreaterThan(0);
  });
});

