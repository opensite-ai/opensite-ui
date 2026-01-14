import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeaturePatternGridLinks } from "../feature-pattern-grid-links";

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("FeaturePatternGridLinks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<FeaturePatternGridLinks />);
    expect(screen.getByText("A collection of extra blocks for Opensite AI & Tailwind")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeaturePatternGridLinks title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<FeaturePatternGridLinks description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders features when provided", () => {
    const features = [{ title: "Feature 1", description: "Description 1", href: "/feature1" }];
    render(<FeaturePatternGridLinks features={features} />);
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeaturePatternGridLinks className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
