import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsAnimatedCounter } from "../stats-animated-counter";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-icon-name={name} className={className}>
      icon
    </span>
  ),
}));

describe("StatsAnimatedCounter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<StatsAnimatedCounter />);
    expect(screen.getByText("Our Impact in Numbers")).toBeInTheDocument();
    expect(screen.getByText("Real results that speak for themselves")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<StatsAnimatedCounter heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<StatsAnimatedCounter description="Custom description" />);
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders stats when provided", () => {
    const stats = [
      { value: 500, suffix: "+", label: "Projects Completed", icon: "lucide/folder-check" },
      { value: 98, suffix: "%", label: "Client Satisfaction", icon: "lucide/heart" },
    ];
    render(<StatsAnimatedCounter stats={stats} />);
    expect(screen.getByText("Projects Completed")).toBeInTheDocument();
    expect(screen.getByText("Client Satisfaction")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<StatsAnimatedCounter className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
