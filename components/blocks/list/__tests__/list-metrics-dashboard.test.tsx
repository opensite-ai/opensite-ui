import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ListMetricsDashboard } from "../list-metrics-dashboard";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    className,
    size,
  }: {
    name?: React.ReactNode;
    className?: string;
    size?: number;
  }) =>
    typeof name === "string" ? (
      <span
        data-testid="mock-icon"
        data-name={name}
        data-size={size}
        className={className}
      >
        icon
      </span>
    ) : (
      <>{name}</>
    ),
}));

describe("ListMetricsDashboard", () => {
  it("renders without crashing", () => {
    const { container } = render(<ListMetricsDashboard metrics={[]} categories={[]} />);
    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ListMetricsDashboard metrics={[]} categories={[]} className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("supports string and custom metric icons with the existing wrapper and size", () => {
    render(
      <ListMetricsDashboard
        metrics={[
          {
            id: "string",
            name: "String metric",
            value: "10",
            icon: "lucide/activity",
          },
          {
            id: "custom",
            name: "Custom metric",
            value: "20",
            icon: <span data-testid="custom-metric-icon">custom</span>,
          },
        ]}
        categories={[]}
      />,
    );

    const stringRow = screen
      .getByText("String metric")
      .closest("div.flex.items-center.justify-between") as HTMLElement;
    const stringIcon = stringRow.querySelector(
      '[data-name="lucide/activity"]',
    );
    expect(stringIcon).toHaveAttribute("data-size", "16");
    expect(stringIcon?.parentElement).toHaveClass("h-8", "w-8", "rounded-full");
    expect(stringRow).not.toHaveTextContent("lucide/activity");

    const customRow = screen
      .getByText("Custom metric")
      .closest("div.flex.items-center.justify-between") as HTMLElement;
    expect(customRow).toContainElement(screen.getByTestId("custom-metric-icon"));
    expect(screen.getByTestId("custom-metric-icon").parentElement).toHaveClass(
      "h-8",
      "w-8",
      "rounded-full",
    );
  });

  it("resolves dashboard action icons without changing scalar or children semantics", () => {
    const { container, rerender } = render(
      <ListMetricsDashboard
        metrics={[]}
        categories={[]}
        dashboardAction={{
          label: "String action",
          href: "/string",
          icon: "lucide/action-before",
          iconAfter: "lucide/action-after",
        }}
      />,
    );

    const stringAction = container.querySelector(
      'a[href="/string"]',
    ) as HTMLElement;
    expect(
      stringAction.querySelector('[data-name="lucide/action-before"]'),
    ).toBeInTheDocument();
    expect(
      stringAction.querySelector('[data-name="lucide/action-after"]'),
    ).toBeInTheDocument();
    expect(stringAction).not.toHaveTextContent("lucide/action-before");
    expect(stringAction).not.toHaveTextContent("lucide/action-after");

    rerender(
      <ListMetricsDashboard
        metrics={[]}
        categories={[]}
        dashboardAction={{
          label: "Custom action",
          href: "/custom",
          icon: <span data-testid="custom-action-before">before</span>,
          iconAfter: <span data-testid="custom-action-after">after</span>,
        }}
      />,
    );
    const customAction = container.querySelector(
      'a[href="/custom"]',
    ) as HTMLElement;
    expect(customAction).toContainElement(
      screen.getByTestId("custom-action-before"),
    );
    expect(customAction).toContainElement(
      screen.getByTestId("custom-action-after"),
    );

    rerender(
      <ListMetricsDashboard
        metrics={[]}
        categories={[]}
        dashboardAction={{
          label: "Scalar action",
          href: "/scalar",
          icon: 0,
          iconAfter: false,
        }}
      />,
    );
    const scalarAction = container.querySelector(
      'a[href="/scalar"]',
    ) as HTMLElement;
    expect(scalarAction.textContent).toContain("0");
    expect(
      scalarAction.querySelector('[data-testid="mock-icon"]'),
    ).not.toBeInTheDocument();

    rerender(
      <ListMetricsDashboard
        metrics={[]}
        categories={[]}
        dashboardAction={{
          label: "Empty action",
          href: "/empty",
          icon: "",
          iconAfter: "",
        }}
      />,
    );
    const emptyAction = container.querySelector(
      'a[href="/empty"]',
    ) as HTMLElement;
    expect(
      emptyAction.querySelector('[data-testid="mock-icon"]'),
    ).not.toBeInTheDocument();

    rerender(
      <ListMetricsDashboard
        metrics={[]}
        categories={[]}
        dashboardAction={{
          label: "Hidden label",
          href: "/children",
          icon: "lucide/hidden-before",
          iconAfter: "lucide/hidden-after",
          children: <span>Custom action children</span>,
        }}
      />,
    );
    const childrenAction = container.querySelector(
      'a[href="/children"]',
    ) as HTMLElement;
    expect(
      childrenAction.querySelector('[data-name="lucide/hidden-before"]'),
    ).not.toBeInTheDocument();
    expect(
      childrenAction.querySelector('[data-name="lucide/hidden-after"]'),
    ).not.toBeInTheDocument();
  });
});
