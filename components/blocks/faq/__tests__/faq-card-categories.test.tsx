import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  FaqCardCategories,
  type FaqCardCategoriesProps,
} from "../faq-card-categories";

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

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href?: string;
    className?: string;
  }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
  ),
}));

describe("FaqCardCategories", () => {

  it("renders with custom heading and description", () => {
    render(
      <FaqCardCategories
        heading="Custom Heading"
        description="Custom description"
      />
    );

    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders custom categories", () => {
    const customCategories: FaqCardCategoriesProps["categories"] = [
      {
        title: "Category A",
        items: [
          {
            id: "a-1",
            question: "Question A1",
            answer: "Answer A1",
          },
        ],
      },
      {
        title: "Category B",
        items: [
          {
            id: "b-1",
            question: "Question B1",
            answer: "Answer B1",
          },
        ],
      },
    ];

    render(<FaqCardCategories categories={customCategories} />);

    expect(screen.getByText("Category A")).toBeInTheDocument();
    expect(screen.getByText("Category B")).toBeInTheDocument();
    expect(screen.getByText("Question A1")).toBeInTheDocument();
    expect(screen.getByText("Question B1")).toBeInTheDocument();
  });

  it("renders empty categories array", () => {
    render(<FaqCardCategories categories={[]} />);

    expect(screen.getByText("Frequently asked questions")).toBeInTheDocument();
  });
});

