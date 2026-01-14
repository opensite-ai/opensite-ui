import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComparisonGridBadges } from "../comparison-grid-badges";

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

describe("ComparisonGridBadges", () => {

  it("renders with custom heading and description", () => {
    render(
      <ComparisonGridBadges
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
        icon: "lucide/zap",
        title: "Custom Feature",
        description: "Custom feature description",
        optionAValue: "Fast",
        optionBValue: "Slow",
        optionAHighlight: true,
      },
    ];

    render(<ComparisonGridBadges features={customFeatures} />);

    expect(screen.getByText("Custom Feature")).toBeInTheDocument();
    expect(screen.getByText("Custom feature description")).toBeInTheDocument();
  });

  it("renders with empty features array", () => {
    render(<ComparisonGridBadges heading="Test Heading" description="Test description" features={[]} />);

    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders multiple features", () => {
    const customFeatures = [
      {
        icon: "lucide/star",
        title: "Feature A",
        description: "Description A",
        optionAValue: "Value A1",
        optionBValue: "Value A2",
      },
      {
        icon: "lucide/heart",
        title: "Feature B",
        description: "Description B",
        optionAValue: "Value B1",
        optionBValue: "Value B2",
      },
    ];

    render(<ComparisonGridBadges features={customFeatures} />);

    expect(screen.getByText("Feature A")).toBeInTheDocument();
    expect(screen.getByText("Feature B")).toBeInTheDocument();
  });
});

