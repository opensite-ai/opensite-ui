import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureUtilityCardsGrid } from "../feature-utility-cards-grid";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("FeatureUtilityCardsGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<FeatureUtilityCardsGrid />);
    expect(screen.getByText("What you can do with our utilities?")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureUtilityCardsGrid title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<FeatureUtilityCardsGrid description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders features when provided", () => {
    const features = [{ title: "Feature 1", description: "Description 1" }];
    render(<FeatureUtilityCardsGrid features={features} />);
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureUtilityCardsGrid className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
