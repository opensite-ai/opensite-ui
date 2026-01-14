import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsPrimarySecondary } from "../stats-primary-secondary";

vi.mock("../../../ui/badge", () => ({
  Badge: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span data-testid="mock-badge" className={className}>
      {children}
    </span>
  ),
}));

describe("StatsPrimarySecondary", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders primary value, badge, and description", () => {
    render(
      <StatsPrimarySecondary
        primaryValue="92%"
        primaryBadge="+7% this month"
        primaryDescription="Customer satisfaction rate"
      />
    );
    expect(screen.getByText("92%")).toBeInTheDocument();
    expect(screen.getByText("+7% this month")).toBeInTheDocument();
    expect(screen.getByText("Customer satisfaction rate")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <StatsPrimarySecondary
        primaryValue="90%"
        primaryBadge="Test Badge"
        primaryDescription="Test description"
        className="custom-class"
      />
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
