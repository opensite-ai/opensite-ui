import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  FaqSimpleAccordion,
  type FaqSimpleAccordionProps,
} from "../faq-simple-accordion";

describe("FaqSimpleAccordion", () => {

  it("renders with custom heading", () => {
    render(<FaqSimpleAccordion heading="Custom Heading" />);

    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom items", () => {
    const customItems: FaqSimpleAccordionProps["items"] = [
      { id: "1", question: "Custom Question 1", answer: "Custom Answer 1" },
      { id: "2", question: "Custom Question 2", answer: "Custom Answer 2" },
    ];

    render(<FaqSimpleAccordion items={customItems} />);

    expect(screen.getByText("Custom Question 1")).toBeInTheDocument();
    expect(screen.getByText("Custom Question 2")).toBeInTheDocument();
  });

  it("renders empty items array", () => {
    render(<FaqSimpleAccordion items={[]} />);

    expect(
      screen.getByText("Frequently asked questions")
    ).toBeInTheDocument();
  });

  it("renders multiple items", () => {
    const customItems: FaqSimpleAccordionProps["items"] = [
      { id: "1", question: "Question A", answer: "Answer A" },
      { id: "2", question: "Question B", answer: "Answer B" },
      { id: "3", question: "Question C", answer: "Answer C" },
      { id: "4", question: "Question D", answer: "Answer D" },
    ];

    render(<FaqSimpleAccordion items={customItems} />);

    expect(screen.getByText("Question A")).toBeInTheDocument();
    expect(screen.getByText("Question B")).toBeInTheDocument();
    expect(screen.getByText("Question C")).toBeInTheDocument();
    expect(screen.getByText("Question D")).toBeInTheDocument();
  });

  it("renders items with custom className", () => {
    const customItems: FaqSimpleAccordionProps["items"] = [
      {
        id: "1",
        question: "Styled Question",
        answer: "Styled Answer",
        className: "custom-item-class",
      },
    ];

    render(<FaqSimpleAccordion items={customItems} />);

    expect(screen.getByText("Styled Question")).toBeInTheDocument();
  });
});

