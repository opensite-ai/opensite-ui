import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsSimpleGrid } from "../stats-simple-grid";

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
  ),
}));

describe("StatsSimpleGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<StatsSimpleGrid />);
    expect(screen.getByText("Platform Performance Insights")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<StatsSimpleGrid heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders stats when provided", () => {
    const stats = [
      { value: "90%", label: "Customer Satisfaction" },
      { value: "200+", label: "Enterprise Clients" },
    ];
    render(<StatsSimpleGrid stats={stats} />);
    expect(screen.getByText("90%")).toBeInTheDocument();
    expect(screen.getByText("Customer Satisfaction")).toBeInTheDocument();
    expect(screen.getByText("200+")).toBeInTheDocument();
    expect(screen.getByText("Enterprise Clients")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/signup", variant: "default" as const },
    ];
    render(<StatsSimpleGrid actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<StatsSimpleGrid className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
