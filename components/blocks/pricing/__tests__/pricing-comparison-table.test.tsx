import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PricingComparisonTable } from "../pricing-comparison-table";

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

describe("PricingComparisonTable", () => {
  it("preserves feature raw and named precedence with inherited size and classes", () => {
    const { rerender } = render(
      <PricingComparisonTable
        featureIcon="lucide/global-raw"
        featureIconName="lucide/global-name"
        featureIconClassName="global-icon-class"
        plans={[
          {
            id: "pro",
            features: [
              {
                text: "Local raw",
                icon: "lucide/local-raw",
                iconName: "lucide/local-name",
                iconClassName: "local-icon-class",
              },
              { text: "Global raw", iconName: "lucide/local-name" },
            ],
          },
        ]}
      />,
    );

    const localRaw = screen.getByTestId("mock-icon-lucide/local-raw");
    expect(localRaw).toHaveAttribute("data-size", "18");
    expect(localRaw).toHaveClass(
      "mt-0.5",
      "shrink-0",
      "text-primary",
      "global-icon-class",
      "local-icon-class",
    );
    expect(
      screen
        .getByText("Global raw")
        .closest("li")
        ?.querySelector('[data-name="lucide/global-raw"]'),
    ).toBeInTheDocument();
    expect(screen.queryByText("lucide/local-raw")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/local-name"),
    ).not.toBeInTheDocument();

    rerender(
      <PricingComparisonTable
        featureIconName="lucide/global-name"
        featureIconClassName="global-icon-class"
        plans={[
          {
            id: "pro",
            features: [
              { text: "Local name", iconName: "lucide/local-name" },
              { text: "Global name" },
            ],
          },
        ]}
      />,
    );

    expect(screen.getByTestId("mock-icon-lucide/local-name")).toHaveAttribute(
      "data-size",
      "18",
    );
    expect(screen.getByTestId("mock-icon-lucide/global-name")).toHaveClass(
      "global-icon-class",
    );
    expect(screen.queryByText("lucide/global-name")).not.toBeInTheDocument();
  });

  it("preserves custom, empty, false, and zero feature overrides", () => {
    const { container } = render(
      <PricingComparisonTable
        featureIconName="lucide/global-name"
        plans={[
          {
            id: "pro",
            features: [
              {
                text: "Custom",
                icon: <span data-testid="custom-feature-icon" />,
                iconName: "lucide/custom-fallback",
              },
              {
                text: "Empty",
                icon: "",
                iconName: "lucide/empty-fallback",
              },
              {
                text: "False",
                icon: false,
                iconName: "lucide/false-fallback",
              },
              {
                text: "Zero",
                icon: 0,
                iconName: "lucide/zero-fallback",
              },
            ],
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-feature-icon")).toBeInTheDocument();
    expect(
      screen
        .getByText("Empty")
        .closest("li")
        ?.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
    expect(
      screen
        .getByText("False")
        .closest("li")
        ?.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Zero").closest("li")).toHaveTextContent("0Zero");
    expect(
      container.querySelector('[data-name*="fallback"]'),
    ).not.toBeInTheDocument();
  });

  it("renders both comparison availability branches and routes raw overrides", () => {
    const comparisonFeatures = [
      { name: "Availability", values: { pro: true, basic: false } },
    ];
    const plans = [{ id: "pro" }, { id: "basic" }];
    const { rerender } = render(
      <PricingComparisonTable
        plans={plans}
        comparisonFeatures={comparisonFeatures}
      />,
    );

    const defaultRow = screen.getByText("Availability").closest("tr")!;
    expect(defaultRow.querySelector('[data-name="Check"]')).toHaveAttribute(
      "data-size",
      "18",
    );
    expect(defaultRow.querySelector('[data-name="Check"]')).toHaveClass(
      "mx-auto",
      "text-primary",
    );
    expect(defaultRow.querySelector('[data-name="X"]')).toHaveClass(
      "mx-auto",
      "text-muted-foreground",
    );

    rerender(
      <PricingComparisonTable
        plans={plans}
        comparisonFeatures={comparisonFeatures}
        availableIcon="lucide/circle-check"
        unavailableIcon="lucide/circle-x"
        availableIconName="lucide/name-check"
        unavailableIconName="lucide/name-x"
      />,
    );

    const rawRow = screen.getByText("Availability").closest("tr")!;
    expect(
      rawRow.querySelector('[data-name="lucide/circle-check"]'),
    ).toHaveClass("mx-auto", "text-primary");
    expect(
      rawRow.querySelector('[data-name="lucide/circle-x"]'),
    ).toHaveAttribute("data-size", "18");
    expect(
      rawRow.querySelector('[data-name="lucide/name-check"]'),
    ).not.toBeInTheDocument();
    expect(
      rawRow.querySelector('[data-name="lucide/name-x"]'),
    ).not.toBeInTheDocument();
    expect(rawRow).not.toHaveTextContent("lucide/circle-check");
  });

  it("preserves custom, empty, false, and zero availability overrides", () => {
    const { rerender } = render(
      <PricingComparisonTable
        plans={[{ id: "pro" }, { id: "basic" }]}
        availableIcon={<span data-testid="custom-available" />}
        unavailableIcon={0}
        comparisonFeatures={[
          { name: "Availability", values: { pro: true, basic: false } },
        ]}
      />,
    );

    const row = screen.getByText("Availability").closest("tr")!;
    expect(screen.getByTestId("custom-available")).toBeInTheDocument();
    expect(row).toHaveTextContent("Availability0");
    expect(
      row.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();

    rerender(
      <PricingComparisonTable
        plans={[{ id: "pro" }, { id: "basic" }]}
        availableIcon=""
        unavailableIcon={false}
        availableIconName="lucide/available-fallback"
        unavailableIconName="lucide/unavailable-fallback"
        comparisonFeatures={[
          { name: "Availability", values: { pro: true, basic: false } },
        ]}
      />,
    );

    const falsyRow = screen.getByText("Availability").closest("tr")!;
    expect(
      falsyRow.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
    expect(
      falsyRow.querySelector('[data-name*="fallback"]'),
    ).not.toBeInTheDocument();
  });

  it("routes action icons while preserving children and action-slot precedence", () => {
    const { container } = render(
      <PricingComparisonTable
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
