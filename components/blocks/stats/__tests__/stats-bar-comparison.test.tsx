import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
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

  it("renders badge, heading, and description", () => {
    render(
      <StatsBarComparison
        badge="Competitive Edge"
        heading="How We Compare"
        description="See our performance"
      />
    );
    expect(screen.getByText("Competitive Edge")).toBeInTheDocument();
    expect(screen.getByText("How We Compare")).toBeInTheDocument();
    expect(screen.getByText("See our performance")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <StatsBarComparison
        badge="Test Badge"
        heading="Test Heading"
        description="Test description"
        className="custom-class"
      />
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
