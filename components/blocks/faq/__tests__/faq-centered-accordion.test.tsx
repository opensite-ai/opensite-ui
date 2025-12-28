import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  FaqCenteredAccordion,
  type FaqCenteredAccordionProps,
} from "../faq-centered-accordion";

describe("FaqCenteredAccordion", () => {
  it("renders with default props", () => {
    render(<FaqCenteredAccordion />);

    expect(
      screen.getByText("Frequently asked questions")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team."
      )
    ).toBeInTheDocument();
  });

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

  it("applies custom className", () => {
    const { container } = render(
      <FaqCenteredAccordion className="custom-class" />
    );

    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders empty items array", () => {
    render(<FaqCenteredAccordion items={[]} />);

    expect(
      screen.getByText("Frequently asked questions")
    ).toBeInTheDocument();
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

