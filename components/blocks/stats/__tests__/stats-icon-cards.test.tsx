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
    render(<StatsIconCards />);
    expect(screen.getByText("Our Growth in Numbers")).toBeInTheDocument();
    expect(screen.getByText("Key metrics that showcase our impact in the market")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<StatsIconCards heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<StatsIconCards description="Custom description" />);
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders stats when provided", () => {
    const stats = [
      { label: "Active Users", value: "120K+", growth: "18% growth", icon: "lucide/users" },
      { label: "Revenue", value: "$3.2M", growth: "32% increase", icon: "lucide/dollar-sign" },
    ];
    render(<StatsIconCards stats={stats} />);
    expect(screen.getByText("Active Users")).toBeInTheDocument();
    expect(screen.getByText("120K+")).toBeInTheDocument();
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("$3.2M")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<StatsIconCards className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
