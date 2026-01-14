import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureChecklistThreeColumn } from "../feature-checklist-three-column";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("FeatureChecklistThreeColumn", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<FeatureChecklistThreeColumn />);
    expect(screen.getByText("Build any kind of Website with our Blocks")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureChecklistThreeColumn title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<FeatureChecklistThreeColumn description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders features when provided", () => {
    const features = [{ title: "Feature 1", items: ["Item 1", "Item 2"] }];
    render(<FeatureChecklistThreeColumn features={features} />);
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureChecklistThreeColumn className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
