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
    render(<StatsPrimarySecondary />);
    expect(screen.getByText("92%")).toBeInTheDocument();
    expect(screen.getByText("+7% this month")).toBeInTheDocument();
  });

  it("renders custom primary value", () => {
    render(<StatsPrimarySecondary primaryValue="85%" />);
    expect(screen.getByText("85%")).toBeInTheDocument();
  });

  it("renders custom primary badge", () => {
    render(<StatsPrimarySecondary primaryBadge="Custom Badge" />);
    expect(screen.getByText("Custom Badge")).toBeInTheDocument();
  });

  it("renders custom primary description", () => {
    render(<StatsPrimarySecondary primaryDescription="Custom description" />);
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<StatsPrimarySecondary className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
