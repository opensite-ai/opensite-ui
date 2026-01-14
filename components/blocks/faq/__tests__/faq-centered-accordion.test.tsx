import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  FaqCenteredAccordion,
  type FaqCenteredAccordionProps,
} from "../faq-centered-accordion";

describe("FaqCenteredAccordion", () => {

  it("renders with custom heading and description", () => {
    render(
      <FaqCenteredAccordion
        heading="Custom Heading"
        description="Custom description"
      />
    );

    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders custom items", () => {
    const customItems: FaqCenteredAccordionProps["items"] = [
      {
        id: "custom-1",
        question: "Custom Question 1",
        answer: "Custom Answer 1",
      },
      {
        id: "custom-2",
        question: "Custom Question 2",
        answer: "Custom Answer 2",
      },
    ];

    render(<FaqCenteredAccordion items={customItems} />);

    expect(screen.getByText("Custom Question 1")).toBeInTheDocument();
    expect(screen.getByText("Custom Question 2")).toBeInTheDocument();
  });

  it("renders empty items array", () => {
    render(
      <FaqCenteredAccordion
        heading="Test Heading"
        description="Test Description"
        items={[]}
      />
    );

    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders multiple items", () => {
    const customItems: FaqCenteredAccordionProps["items"] = [
      { id: "1", question: "Question A", answer: "Answer A" },
      { id: "2", question: "Question B", answer: "Answer B" },
      { id: "3", question: "Question C", answer: "Answer C" },
      { id: "4", question: "Question D", answer: "Answer D" },
    ];

    render(<FaqCenteredAccordion items={customItems} />);

    expect(screen.getByText("Question A")).toBeInTheDocument();
    expect(screen.getByText("Question B")).toBeInTheDocument();
    expect(screen.getByText("Question C")).toBeInTheDocument();
    expect(screen.getByText("Question D")).toBeInTheDocument();
  });
});

