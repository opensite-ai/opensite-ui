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

  it("renders badge, heading, and description", () => {
    render(
      <StatsGrowthTimeline
        badge="Our Journey"
        heading="Growing From Startup to Industry Leader"
        description="See our milestones"
      />
    );
    expect(screen.getByText("Our Journey")).toBeInTheDocument();
    expect(screen.getByText("Growing From Startup to Industry Leader")).toBeInTheDocument();
    expect(screen.getByText("See our milestones")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <StatsGrowthTimeline
        badge="Test Badge"
        heading="Test Heading"
        description="Test description"
        className="custom-class"
      />
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
