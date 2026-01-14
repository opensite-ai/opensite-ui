import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsGrowthTimeline } from "../stats-growth-timeline";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-icon-name={name} className={className}>
      icon
    </span>
  ),
}));

vi.mock("../../../ui/badge", () => ({
  Badge: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span data-testid="mock-badge" className={className}>
      {children}
    </span>
  ),
}));

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
  ),
}));

describe("StatsGrowthTimeline", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<StatsGrowthTimeline />);
    expect(screen.getByText("Our Journey")).toBeInTheDocument();
    expect(screen.getByText("Growing From Startup to Industry Leader")).toBeInTheDocument();
  });

  it("renders custom badge", () => {
    render(<StatsGrowthTimeline badge="Custom Badge" />);
    expect(screen.getByText("Custom Badge")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<StatsGrowthTimeline heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<StatsGrowthTimeline description="Custom description" />);
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<StatsGrowthTimeline className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
