import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { StatsNumberTicker } from "../stats-number-ticker";

vi.mock("../../../ui/badge", () => ({
  Badge: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span data-testid="mock-badge" className={className}>
      {children}
    </span>
  ),
}));

describe("StatsNumberTicker", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<StatsNumberTicker />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<StatsNumberTicker className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders stats grid", () => {
    const { container } = render(<StatsNumberTicker />);
    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
  });
});
