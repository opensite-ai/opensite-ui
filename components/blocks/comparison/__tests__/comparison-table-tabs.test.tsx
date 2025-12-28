import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComparisonTableTabs } from "../comparison-table-tabs";

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

describe("ComparisonTableTabs", () => {
  it("renders with default props", () => {
    render(<ComparisonTableTabs />);

    // Check for default model names (appear in both tabs and table headers)
    expect(screen.getAllByText("SSD").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Cloud Storage").length).toBeGreaterThan(0);
    expect(screen.getAllByText("NAS").length).toBeGreaterThan(0);
  });

  it("renders default features", () => {
    render(<ComparisonTableTabs />);

    expect(screen.getByText("Initial cost")).toBeInTheDocument();
    expect(screen.getByText("Scalability")).toBeInTheDocument();
    expect(screen.getByText("Performance")).toBeInTheDocument();
  });

  it("renders custom models", () => {
    const customModels = [
      {
        name: "Model A",
        attributes: [
          { value: "Fast", status: "positive" as const },
          { value: "Medium", status: "neutral" as const },
        ],
      },
      {
        name: "Model B",
        attributes: [
          { value: "Slow", status: "negative" as const },
          { value: "High", status: "positive" as const },
        ],
      },
    ];

    render(<ComparisonTableTabs models={customModels} />);

    // Model names appear in both tabs and table headers
    expect(screen.getAllByText("Model A").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Model B").length).toBeGreaterThan(0);
  });

  it("renders custom features", () => {
    const customFeatures = ["Feature 1", "Feature 2", "Feature 3"];

    render(<ComparisonTableTabs features={customFeatures} />);

    expect(screen.getByText("Feature 1")).toBeInTheDocument();
    expect(screen.getByText("Feature 2")).toBeInTheDocument();
    expect(screen.getByText("Feature 3")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ComparisonTableTabs className="custom-class" />
    );

    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders empty features array", () => {
    render(<ComparisonTableTabs features={[]} />);

    // Should still render model headers (appear in both tabs and table headers)
    expect(screen.getAllByText("SSD").length).toBeGreaterThan(0);
  });

  it("renders icons for status indicators", () => {
    render(<ComparisonTableTabs />);

    const icons = screen.getAllByTestId("mock-icon");
    expect(icons.length).toBeGreaterThan(0);
  });

  it("renders table structure", () => {
    render(<ComparisonTableTabs />);

    const tables = document.querySelectorAll("table");
    expect(tables.length).toBeGreaterThan(0);
  });

  it("renders Feature header", () => {
    render(<ComparisonTableTabs />);

    expect(screen.getByText("Feature")).toBeInTheDocument();
  });
});

