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

  it("renders custom features", () => {
    const customFeatures = ["Feature 1", "Feature 2", "Feature 3"];
    const customModels = [
      {
        name: "Model A",
        attributes: [
          { value: "Yes", status: "positive" as const },
          { value: "No", status: "negative" as const },
          { value: "Maybe", status: "neutral" as const },
        ],
      },
    ];

    render(<ComparisonTableTabs features={customFeatures} models={customModels} />);

    expect(screen.getByText("Feature 1")).toBeInTheDocument();
    expect(screen.getByText("Feature 2")).toBeInTheDocument();
    expect(screen.getByText("Feature 3")).toBeInTheDocument();
  });

  it("renders empty features array", () => {
    const { container } = render(<ComparisonTableTabs features={[]} />);

    // Component should still render the section even with empty features
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });
});

