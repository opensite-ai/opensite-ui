import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsCircularProgress } from "../stats-circular-progress";

vi.mock("../../../ui/badge", () => ({
  Badge: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span data-testid="mock-badge" className={className}>
      {children}
    </span>
  ),
}));

vi.mock("../../../ui/tabs", () => ({
  Tabs: ({ children, defaultValue, className }: { children: React.ReactNode; defaultValue?: string; className?: string }) => (
    <div data-testid="mock-tabs" data-default-value={defaultValue} className={className}>
      {children}
    </div>
  ),
  TabsList: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="mock-tabs-list" className={className}>
      {children}
    </div>
  ),
  TabsTrigger: ({ children, value, className }: { children: React.ReactNode; value: string; className?: string }) => (
    <button data-testid="mock-tabs-trigger" data-value={value} className={className}>
      {children}
    </button>
  ),
  TabsContent: ({ children, value, className }: { children: React.ReactNode; value: string; className?: string }) => (
    <div data-testid="mock-tabs-content" data-value={value} className={className}>
      {children}
    </div>
  ),
}));

describe("StatsCircularProgress", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<StatsCircularProgress />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<StatsCircularProgress className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders tabs component", () => {
    render(<StatsCircularProgress />);
    expect(screen.getByTestId("mock-tabs")).toBeInTheDocument();
  });
});
