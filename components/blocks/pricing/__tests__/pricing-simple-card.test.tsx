import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PricingSimpleCard } from "../pricing-simple-card";

describe("PricingSimpleCard", () => {
  const mockFeatures = [
    { text: "Feature 1" },
    { text: "Feature 2" },
    { text: "Feature 3" },
    { text: "Feature 4" },
  ];

  it("renders custom title and description", () => {
    render(
      <PricingSimpleCard
        title="Enterprise Plan"
        description="For large organizations"
      />
    );
    expect(screen.getByText("Enterprise Plan")).toBeInTheDocument();
    expect(screen.getByText("For large organizations")).toBeInTheDocument();
  });

  it("renders custom price and interval", () => {
    render(
      <PricingSimpleCard price="$99" priceInterval="/year" />
    );
    expect(screen.getByText("$99")).toBeInTheDocument();
    expect(screen.getByText("/year")).toBeInTheDocument();
  });

  it("renders custom features", () => {
    render(<PricingSimpleCard features={mockFeatures} />);
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
    expect(screen.getByText("Feature 2")).toBeInTheDocument();
    expect(screen.getByText("Feature 3")).toBeInTheDocument();
    expect(screen.getByText("Feature 4")).toBeInTheDocument();
  });

  it("renders feature list with check icons", () => {
    const { container } = render(<PricingSimpleCard features={mockFeatures} />);
    const featureItems = container.querySelectorAll("li");
    expect(featureItems.length).toBe(mockFeatures.length);
  });

  it("applies correct spacing between features", () => {
    const { container } = render(<PricingSimpleCard features={mockFeatures} />);
    const featureList = container.querySelector("ul");
    expect(featureList?.className).toContain("space-y-3");
  });

  it("renders with empty features array", () => {
    const { container } = render(<PricingSimpleCard features={[]} />);
    // When features is empty, the ul element is not rendered
    const featureList = container.querySelector("ul");
    expect(featureList).toBeNull();
  });

  it("renders features with muted text color", () => {
    const { container } = render(<PricingSimpleCard features={mockFeatures} />);
    const feature = screen.getByText("Feature 1");
    expect(feature.className).toContain("text-muted-foreground");
  });
});
