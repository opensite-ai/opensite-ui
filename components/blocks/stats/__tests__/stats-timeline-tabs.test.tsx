import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsTimelineTabs } from "../stats-timeline-tabs";

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

describe("StatsTimelineTabs", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<StatsTimelineTabs />);
    expect(screen.getByText("Performance Timeline")).toBeInTheDocument();
    expect(screen.getByText("Growth Progression")).toBeInTheDocument();
  });

  it("renders custom badge", () => {
    render(<StatsTimelineTabs badge="Custom Badge" />);
    expect(screen.getByText("Custom Badge")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<StatsTimelineTabs heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<StatsTimelineTabs description="Custom description" />);
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<StatsTimelineTabs className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
