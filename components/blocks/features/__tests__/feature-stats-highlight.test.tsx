import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureStatsHighlight } from "../feature-stats-highlight";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("FeatureStatsHighlight", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<FeatureStatsHighlight />);
    expect(screen.getByText("We deliver results that matter")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureStatsHighlight title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<FeatureStatsHighlight description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders stats when provided", () => {
    const stats = [{ value: "100+", label: "Customers" }];
    render(<FeatureStatsHighlight stats={stats} />);
    expect(screen.getByText("100+")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureStatsHighlight className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
