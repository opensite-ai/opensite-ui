import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComparisonTableTooltips } from "../comparison-table-tooltips";

describe("ComparisonTableTooltips", () => {

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
});

