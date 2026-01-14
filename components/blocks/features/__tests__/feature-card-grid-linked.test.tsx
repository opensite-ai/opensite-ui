import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureCardGridLinked } from "../feature-card-grid-linked";

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

describe("FeatureCardGridLinked", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<FeatureCardGridLinked title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureCardGridLinked title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders features when provided", () => {
    const features = [
      { heading: "Feature One", description: "Description one" },
      { heading: "Feature Two", description: "Description two" },
    ];
    render(<FeatureCardGridLinked features={features} />);
    expect(screen.getByText("Feature One")).toBeInTheDocument();
    expect(screen.getByText("Feature Two")).toBeInTheDocument();
  });

  it("renders feature labels when provided", () => {
    const features = [
      { heading: "Feature One", label: "FOR DESIGNERS" },
    ];
    render(<FeatureCardGridLinked features={features} />);
    expect(screen.getByText("FOR DESIGNERS")).toBeInTheDocument();
  });

  it("renders feature description", () => {
    const features = [{ heading: "Feature 1", description: "Custom description text" }];
    render(<FeatureCardGridLinked features={features} />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureCardGridLinked className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
