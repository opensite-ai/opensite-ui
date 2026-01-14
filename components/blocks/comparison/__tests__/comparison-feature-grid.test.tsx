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

  it("renders with custom heading and description", () => {
    render(
      <ComparisonFeatureGrid
        heading="Custom Heading"
        description="Custom description"
      />
    );

    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
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

  it("renders with empty features array", () => {
    render(<ComparisonFeatureGrid heading="Test Heading" description="Test description" features={[]} />);

    expect(screen.getByText("Test Heading")).toBeInTheDocument();
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

