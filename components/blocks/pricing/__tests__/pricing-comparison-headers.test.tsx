import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PricingComparisonHeaders } from "../pricing-comparison-headers";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
    className,
  }: {
    name?: React.ReactNode | string;
    size?: number;
    className?: string;
  }) =>
    typeof name === "string" ? (
      <span
        data-testid={`mock-icon-${name}`}
        data-name={name}
        data-size={size}
        className={className}
      />
    ) : (
      <>{name}</>
    ),
}));

const plans = [{ id: "pro", name: "Pro" }];

describe("PricingComparisonHeaders", () => {
  it("renders both default availability branches with their inherited size and classes", () => {
    render(
      <PricingComparisonHeaders
        plans={plans}
        features={[
          { name: "Included", values: { pro: true } },
          { name: "Excluded", values: { pro: false } },
        ]}
      />,
    );

    const available = screen
      .getByText("Included")
      .closest("tr")
      ?.querySelector('[data-name="Check"]');
    const unavailable = screen
      .getByText("Excluded")
      .closest("tr")
      ?.querySelector('[data-name="X"]');

    expect(available).toHaveAttribute("data-size", "18");
    expect(available).toHaveClass("text-primary");
    expect(unavailable).toHaveAttribute("data-size", "18");
    expect(unavailable).toHaveClass("text-muted-foreground");
  });

  it("routes raw availability strings through DynamicIcon ahead of icon names", () => {
    render(
      <PricingComparisonHeaders
        plans={plans}
        availableIcon="lucide/circle-check"
        unavailableIcon="lucide/circle-x"
        availableIconName="lucide/name-check"
        unavailableIconName="lucide/name-x"
        features={[
          { name: "Included", values: { pro: true } },
          { name: "Excluded", values: { pro: false } },
        ]}
      />,
    );

    const includedRow = screen.getByText("Included").closest("tr")!;
    const excludedRow = screen.getByText("Excluded").closest("tr")!;

    expect(
      includedRow.querySelector('[data-name="lucide/circle-check"]'),
    ).toHaveAttribute("data-size", "18");
    expect(
      excludedRow.querySelector('[data-name="lucide/circle-x"]'),
    ).toHaveClass("text-muted-foreground");
    expect(
      includedRow.querySelector('[data-name="lucide/name-check"]'),
    ).not.toBeInTheDocument();
    expect(
      excludedRow.querySelector('[data-name="lucide/name-x"]'),
    ).not.toBeInTheDocument();
    expect(includedRow).not.toHaveTextContent("lucide/circle-check");
    expect(excludedRow).not.toHaveTextContent("lucide/circle-x");
  });

  it("preserves custom, empty, false, zero, and empty-name availability semantics", () => {
    const { container, rerender } = render(
      <PricingComparisonHeaders
        plans={plans}
        availableIcon={<span data-testid="custom-available" />}
        unavailableIcon={false}
        features={[
          { name: "Custom", values: { pro: true } },
          { name: "False", values: { pro: false } },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-available")).toBeInTheDocument();
    expect(
      screen
        .getByText("False")
        .closest("tr")
        ?.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();

    rerender(
      <PricingComparisonHeaders
        plans={plans}
        availableIcon=""
        unavailableIcon={0}
        features={[
          { name: "Empty", values: { pro: true } },
          { name: "Zero", values: { pro: false } },
        ]}
      />,
    );

    expect(
      screen
        .getByText("Empty")
        .closest("tr")
        ?.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Zero").closest("tr")).toHaveTextContent("Zero0");

    rerender(
      <PricingComparisonHeaders
        plans={plans}
        availableIconName=""
        unavailableIconName=""
        features={[
          { name: "Empty available name", values: { pro: true } },
          { name: "Empty unavailable name", values: { pro: false } },
        ]}
      />,
    );

    expect(container.querySelectorAll('[data-name=""]')).toHaveLength(2);
  });

  it("routes both action icons while preserving children and action-slot precedence", () => {
    const { container } = render(
      <PricingComparisonHeaders
        plans={[
          {
            id: "icons",
            action: {
              href: "/icons",
              label: "Action",
              icon: "lucide/rocket",
              iconAfter: "lucide/arrow-right",
            },
          },
          {
            id: "custom",
            action: {
              href: "/custom",
              label: "Custom",
              icon: <span data-testid="custom-leading" />,
              iconAfter: <span data-testid="custom-trailing" />,
            },
          },
          {
            id: "falsy",
            action: {
              href: "/falsy",
              label: "Falsy",
              icon: false,
              iconAfter: 0,
            },
          },
          {
            id: "empty",
            action: {
              href: "/empty",
              label: "Empty",
              icon: "",
              iconAfter: "",
            },
          },
          {
            id: "children",
            action: {
              href: "/children",
              label: "Hidden label",
              icon: "lucide/hidden-leading",
              iconAfter: "lucide/hidden-trailing",
              children: <span data-testid="action-children">Replacement</span>,
            },
          },
          {
            id: "slot",
            action: { label: "Hidden action" },
            actionSlot: <span data-testid="action-slot">Slot</span>,
          },
        ]}
      />,
    );

    const action = container.querySelector('a[href="/icons"]')!;
    expect(
      action.querySelector('[data-name="lucide/rocket"]'),
    ).toBeInTheDocument();
    expect(
      action.querySelector('[data-name="lucide/arrow-right"]'),
    ).toBeInTheDocument();
    expect(action).not.toHaveTextContent("lucide/rocket");
    expect(action).not.toHaveTextContent("lucide/arrow-right");

    const customAction = container.querySelector('a[href="/custom"]')!;
    expect(
      customAction.querySelector('[data-testid="custom-leading"]'),
    ).toBeInTheDocument();
    expect(
      customAction.querySelector('[data-testid="custom-trailing"]'),
    ).toBeInTheDocument();

    const falsyAction = container.querySelector('a[href="/falsy"]')!;
    expect(falsyAction).toHaveTextContent("Falsy0");
    expect(
      falsyAction.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();

    const emptyAction = container.querySelector('a[href="/empty"]')!;
    expect(
      emptyAction.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();

    const childAction = container.querySelector('a[href="/children"]')!;
    expect(screen.getByTestId("action-children")).toBeInTheDocument();
    expect(screen.queryByText("Hidden label")).not.toBeInTheDocument();
    expect(
      childAction.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();

    expect(screen.getByTestId("action-slot")).toBeInTheDocument();
    expect(screen.queryByText("Hidden action")).not.toBeInTheDocument();
  });
});
