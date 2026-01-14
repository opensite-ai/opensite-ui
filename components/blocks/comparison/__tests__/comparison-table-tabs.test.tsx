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

    render(<ComparisonTableTabs features={customFeatures} />);

    expect(screen.getByText("Feature 1")).toBeInTheDocument();
    expect(screen.getByText("Feature 2")).toBeInTheDocument();
    expect(screen.getByText("Feature 3")).toBeInTheDocument();
  });

  it("renders empty features array", () => {
    render(<ComparisonTableTabs features={[]} />);

    // Should still render model headers (appear in both tabs and table headers)
    expect(screen.getAllByText("SSD").length).toBeGreaterThan(0);
  });
});

