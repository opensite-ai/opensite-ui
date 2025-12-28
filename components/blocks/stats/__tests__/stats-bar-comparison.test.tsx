import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
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
    const { container } = render(<StatsBarComparison />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<StatsBarComparison className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders comparison bars", () => {
    const { container } = render(<StatsBarComparison />);
    const bars = container.querySelectorAll(".bg-primary");
    expect(bars.length).toBeGreaterThan(0);
  });
});
