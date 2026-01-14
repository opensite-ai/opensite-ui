import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureThreeColumnValues } from "../feature-three-column-values";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("FeatureThreeColumnValues", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<FeatureThreeColumnValues />);
    expect(screen.getByText("Why Choose Us?")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureThreeColumnValues title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<FeatureThreeColumnValues description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders features when provided", () => {
    const features = [{ title: "Feature 1", description: "Description 1" }];
    render(<FeatureThreeColumnValues features={features} />);
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureThreeColumnValues className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
