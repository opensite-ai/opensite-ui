import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  FaqCategorizedSections,
  type FaqCategorizedSectionsProps,
} from "../faq-categorized-sections";

describe("FaqCategorizedSections", () => {

  it("renders with custom heading and description", () => {
    render(
      <FaqCategorizedSections
        heading="Custom Heading"
        description="Custom description"
      />
    );

    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders custom categories", () => {
    const customCategories: FaqCategorizedSectionsProps["categories"] = [
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

    render(<FaqCategorizedSections categories={customCategories} />);

    expect(screen.getByText("Category A")).toBeInTheDocument();
    expect(screen.getByText("Category B")).toBeInTheDocument();
    expect(screen.getByText("Question A1")).toBeInTheDocument();
    expect(screen.getByText("Question B1")).toBeInTheDocument();
  });

  it("renders empty categories array", () => {
    render(<FaqCategorizedSections categories={[]} />);

    expect(
      screen.getByText("Frequently asked questions")
    ).toBeInTheDocument();
  });

  it("renders categories with multiple items", () => {
    const customCategories: FaqCategorizedSectionsProps["categories"] = [
      {
        title: "General",
        items: [
          { id: "g1", question: "General Q1", answer: "General A1" },
          { id: "g2", question: "General Q2", answer: "General A2" },
          { id: "g3", question: "General Q3", answer: "General A3" },
        ],
      },
    ];

    render(<FaqCategorizedSections categories={customCategories} />);

    expect(screen.getByText("General")).toBeInTheDocument();
    expect(screen.getByText("General Q1")).toBeInTheDocument();
    expect(screen.getByText("General Q2")).toBeInTheDocument();
    expect(screen.getByText("General Q3")).toBeInTheDocument();
  });

  it("renders category with empty items array", () => {
    const customCategories: FaqCategorizedSectionsProps["categories"] = [
      {
        title: "Empty Category",
        items: [],
      },
    ];

    render(<FaqCategorizedSections categories={customCategories} />);

    expect(screen.getByText("Empty Category")).toBeInTheDocument();
  });
});

