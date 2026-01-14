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
    expect(screen.getByText("Why Choose Us")).toBeInTheDocument();
    expect(screen.getByText("We deliver results that matter")).toBeInTheDocument();
  });

  it("renders custom badge", () => {
    render(<FeatureStatsHighlight badge="Custom Badge" />);
    expect(screen.getByText("Custom Badge")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureStatsHighlight title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders stats when provided", () => {
    const stats = [
      { value: "99%", label: "Uptime" },
      { value: "24/7", label: "Support" },
    ];
    render(<FeatureStatsHighlight stats={stats} />);
    expect(screen.getByText("99%")).toBeInTheDocument();
    expect(screen.getByText("Uptime")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureStatsHighlight className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
