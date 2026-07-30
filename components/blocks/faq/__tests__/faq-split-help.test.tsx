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

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name }: { name?: React.ReactNode | string }) =>
    typeof name === "string" ? (
      <span data-testid="mock-icon" data-name={name} />
    ) : (
      <>{name}</>
    ),
}));

describe("FaqSplitHelp", () => {

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

  it("renders empty items array", () => {
    render(
      <FaqSplitHelp
        heading="Test Heading"
        description="Test Description"
        items={[]}
      />
    );

    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
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

  it("renders post-label icon names and custom nodes without raw text", () => {
    render(
      <FaqSplitHelp
        helpAction={{
          label: "Generated label",
          href: "/help",
          children: <span>Custom help</span>,
          icon: "lucide/life-buoy",
          iconAfter: <span data-testid="custom-trailing-icon" />,
        }}
      />,
    );

    const action = screen.getByRole("link", { name: "Custom help" });

    expect(screen.queryByText("Generated label")).not.toBeInTheDocument();
    expect(screen.getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/life-buoy",
    );
    expect(action).not.toHaveTextContent("lucide/life-buoy");
    expect(action.children[0]).toHaveTextContent("Custom help");
    expect(action.children[1]).toHaveAttribute(
      "data-name",
      "lucide/life-buoy",
    );
    expect(action.children[2]).toHaveAttribute(
      "data-testid",
      "custom-trailing-icon",
    );
  });

  it.each([
    ["empty string", ""],
    ["false", false],
    ["zero", 0],
  ] as const)("preserves %s action icon sentinels", (_, icon) => {
    render(
      <FaqSplitHelp
        helpAction={{
          label: "Sentinel",
          href: "/sentinel",
          icon,
          iconAfter: icon,
        }}
      />,
    );

    const action = screen.getByTestId("mock-pressable");

    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
    expect(action).toHaveTextContent(icon === 0 ? "Sentinel00" : "Sentinel");
  });
});
