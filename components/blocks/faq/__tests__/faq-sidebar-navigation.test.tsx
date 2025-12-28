import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  FaqSidebarNavigation,
  type FaqSidebarNavigationProps,
} from "../faq-sidebar-navigation";

// Mock scrollIntoView since it's not available in jsdom
beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

describe("FaqSidebarNavigation", () => {
  it("renders with default props", () => {
    render(<FaqSidebarNavigation />);

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
      <FaqSidebarNavigation
        heading="Custom Heading"
        description="Custom description"
      />
    );

    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders custom categories", () => {
    const customCategories: FaqSidebarNavigationProps["categories"] = [
      {
        id: "cat-a",
        title: "Category A",
        items: [
          { id: "a1", question: "Question A1", answer: "Answer A1" },
        ],
      },
      {
        id: "cat-b",
        title: "Category B",
        items: [
          { id: "b1", question: "Question B1", answer: "Answer B1" },
        ],
      },
    ];

    render(<FaqSidebarNavigation categories={customCategories} />);

    // Use getAllByText since category names appear in both nav and content
    expect(screen.getAllByText("Category A").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Category B").length).toBeGreaterThan(0);
    expect(screen.getByText("Question A1")).toBeInTheDocument();
    expect(screen.getByText("Question B1")).toBeInTheDocument();
  });

  it("renders navigation buttons for categories", () => {
    const customCategories: FaqSidebarNavigationProps["categories"] = [
      {
        id: "general",
        title: "General",
        items: [{ id: "g1", question: "Q1", answer: "A1" }],
      },
      {
        id: "billing",
        title: "Billing",
        items: [{ id: "b1", question: "Q2", answer: "A2" }],
      },
    ];

    render(<FaqSidebarNavigation categories={customCategories} />);

    const generalButtons = screen.getAllByText("General");
    const billingButtons = screen.getAllByText("Billing");
    expect(generalButtons.length).toBeGreaterThan(0);
    expect(billingButtons.length).toBeGreaterThan(0);
  });

  it("applies custom className", () => {
    const { container } = render(
      <FaqSidebarNavigation className="custom-class" />
    );

    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders empty categories array", () => {
    render(<FaqSidebarNavigation categories={[]} />);

    expect(
      screen.getByText("Frequently asked questions")
    ).toBeInTheDocument();
  });

  it("handles category button click", () => {
    const customCategories: FaqSidebarNavigationProps["categories"] = [
      {
        id: "first",
        title: "First",
        items: [{ id: "f1", question: "First Q", answer: "First A" }],
      },
      {
        id: "second",
        title: "Second",
        items: [{ id: "s1", question: "Second Q", answer: "Second A" }],
      },
    ];

    render(<FaqSidebarNavigation categories={customCategories} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);

    fireEvent.click(buttons[1]);
  });

  it("renders categories with multiple items", () => {
    const customCategories: FaqSidebarNavigationProps["categories"] = [
      {
        id: "multi",
        title: "Multiple Items",
        items: [
          { id: "m1", question: "Multi Q1", answer: "Multi A1" },
          { id: "m2", question: "Multi Q2", answer: "Multi A2" },
          { id: "m3", question: "Multi Q3", answer: "Multi A3" },
        ],
      },
    ];

    render(<FaqSidebarNavigation categories={customCategories} />);

    expect(screen.getByText("Multi Q1")).toBeInTheDocument();
    expect(screen.getByText("Multi Q2")).toBeInTheDocument();
    expect(screen.getByText("Multi Q3")).toBeInTheDocument();
  });
});

