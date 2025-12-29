import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComparisonTableTooltips } from "../comparison-table-tooltips";

describe("ComparisonTableTooltips", () => {
  it("renders with default props", () => {
    render(<ComparisonTableTooltips />);

    expect(screen.getByText("Compare Us")).toBeInTheDocument();
    expect(
      screen.getByText(
        "A modern framework for building websites that is better than the competition."
      )
    ).toBeInTheDocument();
  });

  it("renders with custom heading and description", () => {
    render(
      <ComparisonTableTooltips
        heading="Custom Heading"
        description="Custom description"
      />
    );

    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders option labels", () => {
    render(
      <ComparisonTableTooltips
        optionALabel="Option A"
        optionBLabel="Option B"
      />
    );

    expect(screen.getByText("Option A")).toBeInTheDocument();
    expect(screen.getByText("Option B")).toBeInTheDocument();
  });

  it("renders custom rows", () => {
    const customRows = [
      { feature: "Custom Feature", optionA: "Value A", optionB: "Value B" },
    ];

    render(<ComparisonTableTooltips rows={customRows} />);

    expect(screen.getByText("Custom Feature")).toBeInTheDocument();
    expect(screen.getByText("Value A")).toBeInTheDocument();
    expect(screen.getByText("Value B")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ComparisonTableTooltips className="custom-class" />
    );

    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders empty rows array", () => {
    render(<ComparisonTableTooltips rows={[]} />);

    expect(screen.getByText("Compare Us")).toBeInTheDocument();
  });

  it("renders table structure", () => {
    render(<ComparisonTableTooltips />);

    const tables = document.querySelectorAll("table");
    expect(tables.length).toBeGreaterThan(0);
  });

  it("renders rows with tooltip objects", () => {
    const customRows = [
      {
        feature: "Feature with Tooltip",
        optionA: "Simple Value",
        optionB: {
          value: "Complex Value",
          tooltip: { title: "Tooltip Title", content: "Tooltip content" },
        },
      },
    ];

    render(<ComparisonTableTooltips rows={customRows} />);

    expect(screen.getByText("Feature with Tooltip")).toBeInTheDocument();
    expect(screen.getByText("Simple Value")).toBeInTheDocument();
    expect(screen.getByText("Complex Value")).toBeInTheDocument();
  });

  it("renders multiple rows", () => {
    const customRows = [
      { feature: "Feature A", optionA: "A1", optionB: "A2" },
      { feature: "Feature B", optionA: "B1", optionB: "B2" },
    ];

    render(<ComparisonTableTooltips rows={customRows} />);

    expect(screen.getByText("Feature A")).toBeInTheDocument();
    expect(screen.getByText("Feature B")).toBeInTheDocument();
  });
});

