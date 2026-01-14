import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureBadgeGridSix } from "../feature-badge-grid-six";

vi.mock("../../../ui/badge", () => ({
  Badge: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span className={className} data-testid="mock-badge">{children}</span>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("FeatureBadgeGridSix", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<FeatureBadgeGridSix />);
    expect(screen.getByText("Fully featured components for Opensite AI & Tailwind")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureBadgeGridSix title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<FeatureBadgeGridSix description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders badge when provided", () => {
    render(<FeatureBadgeGridSix badge="New Feature" />);
    expect(screen.getByText("New Feature")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureBadgeGridSix className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
