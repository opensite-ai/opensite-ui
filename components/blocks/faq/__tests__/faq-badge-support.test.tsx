import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  FaqBadgeSupport,
  type FaqBadgeSupportProps,
} from "../faq-badge-support";

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

describe("FaqBadgeSupport", () => {

  it("renders with custom badge, heading, and description", () => {
    render(
      <FaqBadgeSupport
        badge="Help"
        heading="Custom Heading"
        description="Custom description"
      />
    );

    expect(screen.getByText("Help")).toBeInTheDocument();
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders custom items", () => {
    const customItems: FaqBadgeSupportProps["items"] = [
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

    render(<FaqBadgeSupport items={customItems} />);

    expect(screen.getByText("Custom Question 1")).toBeInTheDocument();
    expect(screen.getByText("Custom Question 2")).toBeInTheDocument();
  });

  it("renders empty items array", () => {
    render(<FaqBadgeSupport items={[]} />);

    expect(
      screen.getByText("Frequently asked questions")
    ).toBeInTheDocument();
  });
});

