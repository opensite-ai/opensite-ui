import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ListMetricsDashboard } from "../list-metrics-dashboard";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("ListMetricsDashboard", () => {
  it("renders without crashing", () => {
    const { container } = render(<ListMetricsDashboard metrics={[]} categories={[]} />);
    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ListMetricsDashboard metrics={[]} categories={[]} className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
