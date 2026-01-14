import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FaqStaticList, type FaqStaticListProps } from "../faq-static-list";

describe("FaqStaticList", () => {

  it("renders with custom heading", () => {
    render(<FaqStaticList heading="Custom Heading" />);

    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom items", () => {
    const customItems: FaqStaticListProps["items"] = [
      { question: "Custom Question 1", answer: "Custom Answer 1" },
      { question: "Custom Question 2", answer: "Custom Answer 2" },
    ];

    render(<FaqStaticList items={customItems} />);

    expect(screen.getByText("Custom Question 1")).toBeInTheDocument();
    expect(screen.getByText("Custom Question 2")).toBeInTheDocument();
    expect(screen.getByText("Custom Answer 1")).toBeInTheDocument();
    expect(screen.getByText("Custom Answer 2")).toBeInTheDocument();
  });

  it("renders empty items array", () => {
    render(<FaqStaticList items={[]} />);

    expect(
      screen.getByText("Frequently asked questions")
    ).toBeInTheDocument();
  });

  it("renders multiple items", () => {
    const customItems: FaqStaticListProps["items"] = [
      { question: "Question A", answer: "Answer A" },
      { question: "Question B", answer: "Answer B" },
      { question: "Question C", answer: "Answer C" },
      { question: "Question D", answer: "Answer D" },
    ];

    render(<FaqStaticList items={customItems} />);

    expect(screen.getByText("Question A")).toBeInTheDocument();
    expect(screen.getByText("Question B")).toBeInTheDocument();
    expect(screen.getByText("Question C")).toBeInTheDocument();
    expect(screen.getByText("Question D")).toBeInTheDocument();
  });
});

