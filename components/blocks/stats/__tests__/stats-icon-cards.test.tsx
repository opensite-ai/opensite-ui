import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsIconCards } from "../stats-icon-cards";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-icon-name={name} className={className}>
      icon
    </span>
  ),
}));

describe("StatsIconCards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<StatsIconCards />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<StatsIconCards className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders icons using DynamicIcon", () => {
    render(<StatsIconCards />);
    const icons = screen.getAllByTestId("mock-icon");
    expect(icons.length).toBeGreaterThan(0);
  });

  it("renders stats grid", () => {
    const { container } = render(<StatsIconCards />);
    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
  });
});
