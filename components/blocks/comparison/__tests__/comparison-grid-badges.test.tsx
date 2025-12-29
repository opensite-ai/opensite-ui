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
  it("renders with default props", () => {
    render(<ComparisonGridBadges />);

    expect(screen.getByText("Feature Comparison")).toBeInTheDocument();
    expect(
      screen.getByText(
        "See how our solution compares to traditional approaches across key metrics."
      )
    ).toBeInTheDocument();
  });

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

  it("applies custom className", () => {
    const { container } = render(
      <ComparisonGridBadges className="custom-class" />
    );

    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders empty features array", () => {
    render(<ComparisonGridBadges features={[]} />);

    expect(screen.getByText("Feature Comparison")).toBeInTheDocument();
  });

  it("renders icons for features", () => {
    render(<ComparisonGridBadges />);

    const icons = screen.getAllByTestId("mock-icon");
    expect(icons.length).toBeGreaterThan(0);
  });

  it("renders option labels in badges", () => {
    render(
      <ComparisonGridBadges
        optionALabel="Our Product"
        optionBLabel="Competitor"
      />
    );

    // Check that option labels are rendered as part of badge content
    const ourProductElements = screen.getAllByText(/Our Product/);
    const competitorElements = screen.getAllByText(/Competitor/);
    expect(ourProductElements.length).toBeGreaterThan(0);
    expect(competitorElements.length).toBeGreaterThan(0);
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

