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

  it("renders with default props", () => {
    const { container } = render(<StatsPrimarySecondary />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<StatsPrimarySecondary className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders badge component", () => {
    render(<StatsPrimarySecondary />);
    const badges = screen.getAllByTestId("mock-badge");
    expect(badges.length).toBeGreaterThan(0);
  });
});
