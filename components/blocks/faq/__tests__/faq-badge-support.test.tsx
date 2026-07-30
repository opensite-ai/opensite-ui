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

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name }: { name?: React.ReactNode | string }) =>
    typeof name === "string" ? (
      <span data-testid="mock-icon" data-name={name} />
    ) : (
      <>{name}</>
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
    render(
      <FaqBadgeSupport
        badge="Test Badge"
        heading="Test Heading"
        description="Test Description"
        items={[]}
      />
    );

    expect(screen.getByText("Test Badge")).toBeInTheDocument();
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders post-label icon names and custom nodes without raw text", () => {
    render(
      <FaqBadgeSupport
        supportAction={{
          label: "Generated label",
          href: "/support",
          children: <span>Custom support</span>,
          icon: "lucide/messages-square",
          iconAfter: <span data-testid="custom-trailing-icon" />,
        }}
      />,
    );

    const action = screen.getByRole("link", { name: "Custom support" });

    expect(screen.queryByText("Generated label")).not.toBeInTheDocument();
    expect(screen.getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/messages-square",
    );
    expect(action).not.toHaveTextContent("lucide/messages-square");
    expect(action.children[0]).toHaveTextContent("Custom support");
    expect(action.children[1]).toHaveAttribute(
      "data-name",
      "lucide/messages-square",
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
      <FaqBadgeSupport
        supportAction={{
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
