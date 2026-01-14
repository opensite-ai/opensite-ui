import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsBarComparison } from "../stats-bar-comparison";

vi.mock("../../../ui/badge", () => ({
  Badge: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span data-testid="mock-badge" className={className}>
      {children}
    </span>
  ),
}));

describe("StatsBarComparison", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<StatsBarComparison />);
    expect(screen.getByText("Competitive Edge")).toBeInTheDocument();
    expect(screen.getByText("How We Compare")).toBeInTheDocument();
  });

  it("renders custom badge", () => {
    render(<StatsBarComparison badge="Custom Badge" />);
    expect(screen.getByText("Custom Badge")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<StatsBarComparison heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<StatsBarComparison description="Custom description" />);
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<StatsBarComparison className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
