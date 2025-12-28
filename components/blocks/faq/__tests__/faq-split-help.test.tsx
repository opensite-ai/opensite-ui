import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { FaqSplitHelp, type FaqSplitHelpProps } from "../faq-split-help";

vi.mock("../../../../lib/Pressable", () => ({
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

describe("FaqSplitHelp", () => {
  it("renders with default props", () => {
    render(<FaqSplitHelp />);

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
      <FaqSplitHelp heading="Custom Heading" description="Custom description" />
    );

    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders custom items", () => {
    const customItems: FaqSplitHelpProps["items"] = [
      { id: "1", question: "Custom Question 1", answer: "Custom Answer 1" },
      { id: "2", question: "Custom Question 2", answer: "Custom Answer 2" },
    ];

    render(<FaqSplitHelp items={customItems} />);

    expect(screen.getByText("Custom Question 1")).toBeInTheDocument();
    expect(screen.getByText("Custom Question 2")).toBeInTheDocument();
  });

  it("renders help section", () => {
    render(
      <FaqSplitHelp
        helpHeading="Need Assistance?"
        helpDescription="Our team is ready to help"
        helpButtonText="Get Help"
        helpButtonUrl="/help"
      />
    );

    expect(screen.getByText("Need Assistance?")).toBeInTheDocument();
    expect(screen.getByText("Our team is ready to help")).toBeInTheDocument();
    expect(screen.getByText("Get Help")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FaqSplitHelp className="custom-class" />);

    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders empty items array", () => {
    render(<FaqSplitHelp items={[]} />);

    expect(
      screen.getByText("Frequently asked questions")
    ).toBeInTheDocument();
  });

  it("renders pressable button", () => {
    render(<FaqSplitHelp />);

    const pressables = screen.getAllByTestId("mock-pressable");
    expect(pressables.length).toBeGreaterThan(0);
  });

  it("renders help section with accent background", () => {
    const { container } = render(<FaqSplitHelp />);

    const accentSection = container.querySelector(".bg-accent");
    expect(accentSection).toBeInTheDocument();
  });

  it("renders multiple items", () => {
    const customItems: FaqSplitHelpProps["items"] = [
      { id: "1", question: "Question A", answer: "Answer A" },
      { id: "2", question: "Question B", answer: "Answer B" },
      { id: "3", question: "Question C", answer: "Answer C" },
    ];

    render(<FaqSplitHelp items={customItems} />);

    expect(screen.getByText("Question A")).toBeInTheDocument();
    expect(screen.getByText("Question B")).toBeInTheDocument();
    expect(screen.getByText("Question C")).toBeInTheDocument();
  });
});

