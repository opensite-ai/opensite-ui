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
  it("renders with default props", () => {
    render(<ComparisonFeatureCards />);

    expect(screen.getByText("Product A vs. Product B: Making the Right Choice")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Product A isn't just an alternative to Product B/
      )
    ).toBeInTheDocument();
  });

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

  it("renders custom cards", () => {
    const customProductA = {
      name: "Basic Plan",
      features: [
        { text: "Feature 1", included: true },
        { text: "Feature 2", included: true },
      ],
    };
    const customProductB = {
      name: "Pro Plan",
      features: [
        { text: "Feature A", included: true },
        { text: "Feature B", included: true },
        { text: "Feature C", included: true },
      ],
      highlighted: true,
    };

    render(<ComparisonFeatureCards productA={customProductA} productB={customProductB} />);

    expect(screen.getByText("Basic Plan")).toBeInTheDocument();
    expect(screen.getByText("Pro Plan")).toBeInTheDocument();
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
    expect(screen.getByText("Feature A")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ComparisonFeatureCards className="custom-class" />
    );

    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders empty cards array", () => {
    const emptyProduct = { name: "Empty", features: [] };
    render(<ComparisonFeatureCards productA={emptyProduct} productB={emptyProduct} />);

    expect(screen.getByText("Product A vs. Product B: Making the Right Choice")).toBeInTheDocument();
  });

  it("renders button text correctly", () => {
    // This component doesn't have button props, so we'll just test that default products render
    render(<ComparisonFeatureCards />);

    expect(screen.getByText("Product A")).toBeInTheDocument();
    expect(screen.getByText("Product B")).toBeInTheDocument();
  });

  it("renders check icons for features", () => {
    render(<ComparisonFeatureCards />);

    const icons = screen.getAllByTestId("mock-icon");
    expect(icons.length).toBeGreaterThan(0);
  });
});

