import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FaqNumberedGrid, type FaqNumberedGridProps } from "../faq-numbered-grid";

describe("FaqNumberedGrid", () => {
  it("renders with default props", () => {
    render(<FaqNumberedGrid />);

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
      <FaqNumberedGrid
        heading="Custom Heading"
        description="Custom description"
      />
    );

    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders custom items", () => {
    const customItems: FaqNumberedGridProps["items"] = [
      { question: "Custom Question 1", answer: "Custom Answer 1" },
      { question: "Custom Question 2", answer: "Custom Answer 2" },
    ];

    render(<FaqNumberedGrid items={customItems} />);

    expect(screen.getByText("Custom Question 1")).toBeInTheDocument();
    expect(screen.getByText("Custom Question 2")).toBeInTheDocument();
  });

  it("renders numbered items", () => {
    const customItems: FaqNumberedGridProps["items"] = [
      { question: "First Question", answer: "First Answer" },
      { question: "Second Question", answer: "Second Answer" },
      { question: "Third Question", answer: "Third Answer" },
    ];

    render(<FaqNumberedGrid items={customItems} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FaqNumberedGrid className="custom-class" />);

    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders empty items array", () => {
    render(<FaqNumberedGrid items={[]} />);

    expect(
      screen.getByText("Frequently asked questions")
    ).toBeInTheDocument();
  });

  it("renders items in grid layout", () => {
    const { container } = render(<FaqNumberedGrid />);

    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
  });
});

