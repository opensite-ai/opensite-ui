import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { StatsSimpleGrid } from "../stats-simple-grid";

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    className,
  }: {
    name?: React.ReactNode;
    className?: string;
  }) =>
    typeof name === "string" ? (
      <span data-testid="mock-icon" data-icon-name={name} className={className}>
        icon
      </span>
    ) : (
      <>{name}</>
    ),
}));

describe("StatsSimpleGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders heading", () => {
    render(<StatsSimpleGrid heading="Platform Performance Insights" />);
    expect(screen.getByText("Platform Performance Insights")).toBeInTheDocument();
  });

  it("renders stats when provided", () => {
    const stats = [
      { value: "90%", label: "Customer Satisfaction" },
      { value: "200+", label: "Enterprise Clients" },
    ];
    render(<StatsSimpleGrid stats={stats} />);
    expect(screen.getByText("90%")).toBeInTheDocument();
    expect(screen.getByText("Customer Satisfaction")).toBeInTheDocument();
    expect(screen.getByText("200+")).toBeInTheDocument();
    expect(screen.getByText("Enterprise Clients")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/signup", variant: "default" as const },
    ];
    render(<StatsSimpleGrid actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("normalizes action icons without changing children or actionsSlot precedence", () => {
    const actions = [
      {
        label: "String Action",
        href: "/strings",
        icon: "lucide/rocket",
        iconAfter: "lucide/arrow-right",
        className: "string-action",
      },
      {
        label: "Custom Action",
        href: "/custom-icons",
        icon: <span data-testid="custom-action-icon">Before</span>,
        iconAfter: <span data-testid="custom-action-icon-after">After</span>,
      },
      {
        label: "Empty Action",
        href: "/empty-icons",
        icon: "",
        iconAfter: "",
      },
      {
        label: "Boundary",
        href: "/boundary-icons",
        icon: false,
        iconAfter: 0,
      },
      {
        label: "Ignored False Child",
        href: "/false-child",
        icon: "lucide/ignored-false-child",
        children: false,
      },
      {
        label: "Ignored Zero Child",
        href: "/zero-child",
        icon: "lucide/ignored-zero-child",
        children: 0,
      },
    ];
    const { container, rerender } = render(<StatsSimpleGrid actions={actions} />);

    const stringAction = screen.getByText("String Action").closest("a");
    expect(stringAction).toHaveClass(
      "w-full",
      "sm:w-auto",
      "string-action"
    );
    expect(
      within(stringAction!).getAllByTestId("mock-icon")[0]
    ).toHaveAttribute("data-icon-name", "lucide/rocket");
    expect(
      within(stringAction!).getAllByTestId("mock-icon")[1]
    ).toHaveAttribute("data-icon-name", "lucide/arrow-right");
    expect(stringAction).not.toHaveTextContent("lucide/rocket");
    expect(screen.getByTestId("custom-action-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-action-icon-after")).toBeInTheDocument();

    const emptyAction = screen.getByText("Empty Action").closest("a");
    expect(within(emptyAction!).queryByTestId("mock-icon")).not.toBeInTheDocument();

    const boundaryAction = container.querySelector<HTMLAnchorElement>(
      'a[href="/boundary-icons"]'
    );
    expect(boundaryAction).toHaveTextContent("Boundary0");
    expect(
      within(boundaryAction!).queryByTestId("mock-icon")
    ).not.toBeInTheDocument();

    const falseChildAction = container.querySelector<HTMLAnchorElement>(
      'a[href="/false-child"]'
    );
    const zeroChildAction = container.querySelector<HTMLAnchorElement>(
      'a[href="/zero-child"]'
    );
    expect(falseChildAction).toBeEmptyDOMElement();
    expect(zeroChildAction).toHaveTextContent("0");
    expect(
      container.querySelector('[data-icon-name="lucide/ignored-false-child"]')
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-icon-name="lucide/ignored-zero-child"]')
    ).not.toBeInTheDocument();

    rerender(
      <StatsSimpleGrid
        actions={actions}
        actionsSlot={<div data-testid="custom-actions-override">Custom actions</div>}
      />
    );
    expect(screen.getByTestId("custom-actions-override")).toBeInTheDocument();
    expect(screen.queryByText("String Action")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <StatsSimpleGrid heading="Test Heading" className="custom-class" />
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
