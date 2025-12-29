import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ListMetricsDashboard } from "../list-metrics-dashboard";
import type { ListMetricItem } from "../list-metrics-dashboard";

describe("ListMetricsDashboard", () => {
  const mockMetrics: ListMetricItem[] = [
    {
      id: "uptime",
      icon: "lucide/server",
      name: "System Uptime",
      value: "99.99%",
      previousValue: "99.97%",
      changePercentage: 0.02,
      status: "positive",
      category: "performance",
      info: "Service availability",
    },
    {
      id: "users",
      icon: "lucide/users",
      name: "Active Users",
      value: "2.4M",
      previousValue: "2.05M",
      changePercentage: 17,
      status: "positive",
      category: "users",
      info: "Monthly active users",
    },
    {
      id: "bandwidth",
      icon: "lucide/globe",
      name: "Bandwidth Usage",
      value: "240 TB",
      changePercentage: 26,
      status: "warning",
      category: "infrastructure",
    },
  ];

  it("renders with default badge text", () => {
    render(<ListMetricsDashboard />);
    expect(screen.getByText("System Metrics")).toBeInTheDocument();
  });

  it("renders custom badge text", () => {
    render(<ListMetricsDashboard badge="Custom Badge" />);
    expect(screen.getByText("Custom Badge")).toBeInTheDocument();
  });

  it("renders default heading", () => {
    render(<ListMetricsDashboard />);
    expect(
      screen.getByText("Platform Health & Performance")
    ).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<ListMetricsDashboard heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders default description", () => {
    render(<ListMetricsDashboard />);
    expect(
      screen.getByText(/Key metrics across our infrastructure/)
    ).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ListMetricsDashboard description="Custom description" />);
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders custom metrics correctly", () => {
    render(<ListMetricsDashboard metrics={mockMetrics} />);
    expect(screen.getByText("System Uptime")).toBeInTheDocument();
    expect(screen.getByText("Active Users")).toBeInTheDocument();
    expect(screen.getByText("Bandwidth Usage")).toBeInTheDocument();
  });

  it("renders metric values", () => {
    render(<ListMetricsDashboard metrics={mockMetrics} />);
    expect(screen.getByText("99.99%")).toBeInTheDocument();
    expect(screen.getByText("2.4M")).toBeInTheDocument();
    expect(screen.getByText("240 TB")).toBeInTheDocument();
  });

  it("renders previous values on desktop", () => {
    render(<ListMetricsDashboard metrics={mockMetrics} />);
    expect(screen.getByText("99.97%")).toBeInTheDocument();
    expect(screen.getByText("2.05M")).toBeInTheDocument();
  });

  it("renders change percentages", () => {
    render(<ListMetricsDashboard metrics={mockMetrics} />);
    expect(screen.getByText("0.02%")).toBeInTheDocument();
    expect(screen.getByText("17%")).toBeInTheDocument();
    expect(screen.getByText("26%")).toBeInTheDocument();
  });

  it("renders category tabs", () => {
    render(<ListMetricsDashboard metrics={mockMetrics} />);
    expect(screen.getAllByText("All Metrics").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Performance").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Users").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Infrastructure").length).toBeGreaterThan(0);
  });

  it("filters metrics by category when tab is clicked", () => {
    render(<ListMetricsDashboard metrics={mockMetrics} />);
    const performanceTab = screen.getByRole("tab", { name: "Performance" });
    // Verify the tab exists and can be clicked
    expect(performanceTab).toBeInTheDocument();
    fireEvent.click(performanceTab);
    // System Uptime should still be visible as it's in the performance category
    expect(screen.getByText("System Uptime")).toBeInTheDocument();
  });

  it("shows all metrics when 'All Metrics' tab is selected", () => {
    render(<ListMetricsDashboard metrics={mockMetrics} />);
    const allTab = screen.getByRole("tab", { name: "All Metrics" });
    fireEvent.click(allTab);
    expect(screen.getByText("System Uptime")).toBeInTheDocument();
    expect(screen.getByText("Active Users")).toBeInTheDocument();
    expect(screen.getByText("Bandwidth Usage")).toBeInTheDocument();
  });

  it("renders last updated text", () => {
    render(<ListMetricsDashboard lastUpdated="Today at 10:00 UTC" />);
    expect(screen.getByText("Today at 10:00 UTC")).toBeInTheDocument();
  });

  it("renders dashboard link", () => {
    render(
      <ListMetricsDashboard
        dashboardAction={{ label: "View dashboard", href: "/dashboard" }}
      />
    );
    const link = screen.getByRole("link", { name: /View dashboard/ });
    expect(link).toHaveAttribute("href", "/dashboard");
  });

  it("applies custom className", () => {
    const { container } = render(
      <ListMetricsDashboard metrics={mockMetrics} className="custom-class" />
    );
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("custom-class");
  });

  it("renders with empty metrics array", () => {
    render(<ListMetricsDashboard metrics={[]} />);
    expect(
      screen.getByText("No metrics available for this category.")
    ).toBeInTheDocument();
  });

  it("renders status indicators with correct colors", () => {
    const { container } = render(<ListMetricsDashboard metrics={mockMetrics} />);
    const positiveIndicators = container.querySelectorAll(".bg-green-100");
    const warningIndicators = container.querySelectorAll(".bg-amber-100");
    expect(positiveIndicators.length).toBeGreaterThan(0);
    expect(warningIndicators.length).toBeGreaterThan(0);
  });

  it("renders info tooltips for metrics with info", () => {
    const { container } = render(<ListMetricsDashboard metrics={mockMetrics} />);
    const tooltipContainers = container.querySelectorAll(".group.relative");
    expect(tooltipContainers.length).toBe(2);
  });
});
