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
    const { container } = render(<StatsGrowthTimeline />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<StatsGrowthTimeline className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders icons using DynamicIcon", () => {
    render(<StatsGrowthTimeline />);
    const icons = screen.getAllByTestId("mock-icon");
    expect(icons.length).toBeGreaterThan(0);
  });

  it("renders badges", () => {
    render(<StatsGrowthTimeline />);
    const badges = screen.getAllByTestId("mock-badge");
    expect(badges.length).toBeGreaterThan(0);
  });
});
