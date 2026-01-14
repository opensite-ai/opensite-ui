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

  it("renders checklist column 1 items when provided", () => {
    const checklistColumn1 = ["Item One", "Item Two"];
    render(<FeatureChecklistThreeColumn checklistColumn1={checklistColumn1} />);
    expect(screen.getByText("Item One")).toBeInTheDocument();
    expect(screen.getByText("Item Two")).toBeInTheDocument();
  });

  it("renders cards when provided", () => {
    const cards = [
      { title: "Card One", description: "Description one" },
      { title: "Card Two", description: "Description two" },
    ];
    render(<FeatureChecklistThreeColumn cards={cards} />);
    expect(screen.getByText("Card One")).toBeInTheDocument();
    expect(screen.getByText("Card Two")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureChecklistThreeColumn className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
