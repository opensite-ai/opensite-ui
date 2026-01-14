import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  FaqGradientCategories,
  type FaqGradientCategoriesProps,
} from "../faq-gradient-categories";

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

describe("FaqGradientCategories", () => {

  it("renders with custom heading and description", () => {
    render(
      <FaqGradientCategories
        heading="Custom Heading"
        description="Custom description"
      />
    );

    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders custom categories", () => {
    const customCategories: FaqGradientCategoriesProps["categories"] = [
      {
        title: "Category A",
        items: [
          { id: "a1", question: "Question A1", answer: "Answer A1" },
        ],
      },
      {
        title: "Category B",
        items: [
          { id: "b1", question: "Question B1", answer: "Answer B1" },
        ],
      },
    ];

    render(<FaqGradientCategories categories={customCategories} />);

    expect(screen.getByText("Category A")).toBeInTheDocument();
    expect(screen.getByText("Category B")).toBeInTheDocument();
    expect(screen.getByText("Question A1")).toBeInTheDocument();
    expect(screen.getByText("Question B1")).toBeInTheDocument();
  });

  it("renders empty categories array", () => {
    render(<FaqGradientCategories categories={[]} />);

    expect(
      screen.getByText("Frequently asked questions")
    ).toBeInTheDocument();
  });

  it("renders categories with multiple items", () => {
    const customCategories: FaqGradientCategoriesProps["categories"] = [
      {
        title: "General",
        items: [
          { id: "g1", question: "General Q1", answer: "General A1" },
          { id: "g2", question: "General Q2", answer: "General A2" },
        ],
      },
    ];

    render(<FaqGradientCategories categories={customCategories} />);

    expect(screen.getByText("General")).toBeInTheDocument();
    expect(screen.getByText("General Q1")).toBeInTheDocument();
    expect(screen.getByText("General Q2")).toBeInTheDocument();
  });
});

