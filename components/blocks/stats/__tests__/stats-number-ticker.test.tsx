import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
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

  it("renders badge, heading, and description", () => {
    render(
      <StatsNumberTicker
        badge="By The Numbers"
        heading="Platform Statistics"
        description="Real-time metrics"
      />
    );
    expect(screen.getByText("By The Numbers")).toBeInTheDocument();
    expect(screen.getByText("Platform Statistics")).toBeInTheDocument();
    expect(screen.getByText("Real-time metrics")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <StatsNumberTicker
        badge="Test Badge"
        heading="Test Heading"
        description="Test description"
        className="custom-class"
      />
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
