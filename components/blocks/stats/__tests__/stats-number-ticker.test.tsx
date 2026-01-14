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

  it("renders with default props", () => {
    render(<StatsNumberTicker />);
    expect(screen.getByText("By The Numbers")).toBeInTheDocument();
    expect(screen.getByText("Platform Statistics")).toBeInTheDocument();
  });

  it("renders custom badge", () => {
    render(<StatsNumberTicker badge="Custom Badge" />);
    expect(screen.getByText("Custom Badge")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<StatsNumberTicker heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<StatsNumberTicker description="Custom description" />);
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<StatsNumberTicker className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
