import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  ComparisonFeatureCards,
  type ComparisonFeatureCardsProps,
} from "../comparison-feature-cards";

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

describe("ComparisonFeatureCards", () => {

  it("renders with custom heading and description", () => {
    render(
      <ComparisonFeatureCards
        heading="Custom Heading"
        description="Custom description"
      />
    );

    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });
});

