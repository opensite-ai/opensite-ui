import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComparisonLegacyModern } from "../comparison-legacy-modern";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
  }: {
    name: string;
    size: number;
  }) => (
    <span data-testid="mock-icon" data-name={name} data-size={size}>
      icon
    </span>
  ),
}));

describe("ComparisonLegacyModern", () => {
  it("renders with default props", () => {
    render(<ComparisonLegacyModern />);

    expect(screen.getByText("Why Teams are")).toBeInTheDocument();
    expect(screen.getByText("Moving to Modern Tools")).toBeInTheDocument();
  });

  it("renders with custom heading and headingHighlight", () => {
    render(
      <ComparisonLegacyModern
        heading="Custom Heading"
        headingHighlight="highlighted text"
      />
    );

    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
    expect(screen.getByText("highlighted text")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<ComparisonLegacyModern description="Custom description" />);

    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders legacy section", () => {
    render(
      <ComparisonLegacyModern
        legacyTitle="Old Way"
        legacyFeatures={[{ text: "Old Feature 1" }, { text: "Old Feature 2" }]}
      />
    );

    expect(screen.getByText("Old Way")).toBeInTheDocument();
    expect(screen.getByText("Old Feature 1")).toBeInTheDocument();
    expect(screen.getByText("Old Feature 2")).toBeInTheDocument();
  });

  it("renders modern section", () => {
    render(
      <ComparisonLegacyModern
        modernTitle="New Way"
        modernFeatures={[
          { emoji: "🚀", text: "New Feature 1" },
          { emoji: "⚡", text: "New Feature 2" },
        ]}
      />
    );

    expect(screen.getByText("New Way")).toBeInTheDocument();
    expect(screen.getByText("New Feature 1")).toBeInTheDocument();
    expect(screen.getByText("New Feature 2")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ComparisonLegacyModern className="custom-class" />
    );

    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders icons for legacy features", () => {
    render(<ComparisonLegacyModern />);

    const icons = screen.getAllByTestId("mock-icon");
    expect(icons.length).toBeGreaterThan(0);
  });

  it("renders both legacy and modern sections", () => {
    render(
      <ComparisonLegacyModern
        legacyTitle="Legacy Title"
        legacyFeatures={[{ text: "Legacy 1" }]}
        modernTitle="Modern Title"
        modernFeatures={[{ emoji: "✨", text: "Modern 1" }]}
      />
    );

    expect(screen.getByText("Legacy Title")).toBeInTheDocument();
    expect(screen.getByText("Modern Title")).toBeInTheDocument();
    expect(screen.getByText("Legacy 1")).toBeInTheDocument();
    expect(screen.getByText("Modern 1")).toBeInTheDocument();
  });

  it("renders empty features arrays", () => {
    render(
      <ComparisonLegacyModern
        legacyTitle="Empty Legacy"
        legacyFeatures={[]}
        modernTitle="Empty Modern"
        modernFeatures={[]}
      />
    );

    expect(screen.getByText("Empty Legacy")).toBeInTheDocument();
    expect(screen.getByText("Empty Modern")).toBeInTheDocument();
  });
});

