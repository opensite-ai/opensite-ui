import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureNumberedCards } from "../feature-numbered-cards";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("FeatureNumberedCards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<FeatureNumberedCards />);
    expect(screen.getByText("How It Works")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureNumberedCards title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<FeatureNumberedCards description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders steps when provided", () => {
    const steps = [{ title: "Step 1", description: "Description 1" }];
    render(<FeatureNumberedCards steps={steps} />);
    expect(screen.getByText("Step 1")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureNumberedCards className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
