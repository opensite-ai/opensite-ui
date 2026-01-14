import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FaqMutedCards, type FaqMutedCardsProps } from "../faq-muted-cards";

describe("FaqMutedCards", () => {

  it("renders with provided heading", () => {
    render(
      <FaqMutedCards heading="Custom Heading" />
    );

    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom items", () => {
    const customItems: FaqMutedCardsProps["items"] = [
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

    render(<FaqMutedCards items={customItems} />);

    expect(screen.getByText("Custom Question 1")).toBeInTheDocument();
    expect(screen.getByText("Custom Question 2")).toBeInTheDocument();
  });

  it("renders empty items array", () => {
    render(
      <FaqMutedCards
        heading="Test Heading"
        items={[]}
      />
    );

    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders multiple items", () => {
    const customItems: FaqMutedCardsProps["items"] = [
      { id: "1", question: "Question A", answer: "Answer A" },
      { id: "2", question: "Question B", answer: "Answer B" },
      { id: "3", question: "Question C", answer: "Answer C" },
    ];

    render(<FaqMutedCards items={customItems} />);

    expect(screen.getByText("Question A")).toBeInTheDocument();
    expect(screen.getByText("Question B")).toBeInTheDocument();
    expect(screen.getByText("Question C")).toBeInTheDocument();
  });
});

