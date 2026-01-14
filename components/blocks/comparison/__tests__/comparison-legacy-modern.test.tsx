import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComparisonLegacyModern } from "../comparison-legacy-modern";

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

describe("ComparisonLegacyModern", () => {

  it("renders with custom heading and headingHighlight", () => {
    render(
      <ComparisonLegacyModern
        heading="Custom Heading"
        headingHighlight="highlighted text"
      />
    );

    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
    expect(screen.getByText("highlighted text")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<ComparisonLegacyModern description="Custom description" />);

    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });
});

