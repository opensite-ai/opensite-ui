import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { PricingFullComparison } from "../pricing-full-comparison";

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

const plans = [
  { id: "basic", name: "Basic", monthlyPrice: "$10", yearlyPrice: "$100" },
  { id: "pro", name: "Pro", monthlyPrice: "$20", yearlyPrice: "$200" },
];

const availabilityFeatures = [
  {
    name: "Availability",
    category: "Core",
    values: { basic: true, pro: false },
  },
];

describe("PricingFullComparison", () => {
  it("routes both raw availability icon branches with inherited styles", () => {
    render(
      <PricingFullComparison
        plans={plans}
        features={availabilityFeatures}
        availableIcon="lucide/available"
        unavailableIcon="lucide/unavailable"
        availableIconName="lucide/ignored-available"
        unavailableIconName="lucide/ignored-unavailable"
      />,
    );

    const available = screen.getByTestId("mock-icon-lucide/available");
    const unavailable = screen.getByTestId("mock-icon-lucide/unavailable");
    expect(available).toHaveAttribute("data-size", "18");
    expect(available).toHaveClass("text-primary");
    expect(unavailable).toHaveAttribute("data-size", "18");
    expect(unavailable).toHaveClass("text-muted-foreground");
    const row = screen.getByText("Availability").closest("tr")!;
    expect(row).not.toHaveTextContent("lucide/available");
    expect(row).not.toHaveTextContent("lucide/unavailable");
    expect(
      screen.queryByTestId("mock-icon-lucide/ignored-available"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/ignored-unavailable"),
    ).not.toBeInTheDocument();
  });

  it("preserves empty, false, zero, and custom availability overrides", () => {
    const { container, rerender } = render(
      <PricingFullComparison
        plans={plans}
        features={availabilityFeatures}
        availableIcon=""
        unavailableIcon={false}
        availableIconName="lucide/ignored-available"
        unavailableIconName="lucide/ignored-unavailable"
      />,
    );

    expect(
      container.querySelector("[data-testid^='mock-icon-']"),
    ).not.toBeInTheDocument();

    rerender(
      <PricingFullComparison
        plans={plans}
        features={availabilityFeatures}
        availableIcon={0}
        unavailableIcon={<span data-testid="custom-unavailable-icon" />}
        availableIconName="lucide/ignored-available"
        unavailableIconName="lucide/ignored-unavailable"
      />,
    );

    const row = screen.getByText("Availability").closest("tr")!;
    expect(row).toHaveTextContent("0");
    expect(screen.getByTestId("custom-unavailable-icon")).toBeInTheDocument();
    expect(
      container.querySelector('[data-name^="lucide/ignored-"]'),
    ).not.toBeInTheDocument();
  });

  it("preserves named availability fallbacks including explicit empty names", () => {
    const { rerender } = render(
      <PricingFullComparison
        plans={plans}
        features={availabilityFeatures}
        availableIconName="lucide/check"
        unavailableIconName="lucide/x"
      />,
    );

    expect(screen.getByTestId("mock-icon-lucide/check")).toHaveAttribute(
      "data-size",
      "18",
    );
    expect(screen.getByTestId("mock-icon-lucide/check")).toHaveClass(
      "text-primary",
    );
    expect(screen.getByTestId("mock-icon-lucide/x")).toHaveClass(
      "text-muted-foreground",
    );

    rerender(
      <PricingFullComparison
        plans={plans}
        features={availabilityFeatures}
        availableIconName=""
        unavailableIconName=""
      />,
    );

    const emptyNameIcons = screen.getAllByTestId("mock-icon-");
    expect(emptyNameIcons).toHaveLength(2);
    expect(emptyNameIcons[0]).toHaveAttribute("data-size", "18");
    expect(emptyNameIcons[0]).toHaveClass("text-primary");
    expect(emptyNameIcons[1]).toHaveClass("text-muted-foreground");
  });

  it("routes action icons and preserves custom, falsy, children, and slots", () => {
    const { container } = render(
      <PricingFullComparison
        plans={[
          {
            id: "string",
            name: "String action",
            action: {
              label: "Choose",
              icon: "lucide/rocket",
              iconAfter: "lucide/arrow-right",
            },
          },
          {
            id: "custom",
            name: "Custom action",
            action: {
              label: "Custom label",
              icon: <span data-testid="custom-leading-icon" />,
              iconAfter: <span data-testid="custom-trailing-icon" />,
            },
          },
          {
            id: "falsy",
            name: "Falsy action",
            action: { label: "Falsy label", icon: "", iconAfter: 0 },
          },
          {
            id: "children",
            name: "Children action",
            action: {
              label: "Generated label",
              icon: "lucide/hidden-leading",
              iconAfter: "lucide/hidden-trailing",
              children: <span data-testid="action-children">Replacement</span>,
            },
          },
          {
            id: "slot",
            name: "Slot action",
            action: { label: "Hidden slot action" },
            actionSlot: <div data-testid="action-slot">Custom slot</div>,
          },
        ]}
      />,
    );

    const leading = screen.getByTestId("mock-icon-lucide/rocket");
    expect(
      screen.getByTestId("mock-icon-lucide/arrow-right"),
    ).toBeInTheDocument();
    expect(leading.parentElement!).not.toHaveTextContent("lucide/rocket");
    expect(leading.parentElement!).not.toHaveTextContent("lucide/arrow-right");
    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();
    expect(container).toHaveTextContent("Falsy label0");
    expect(screen.getByTestId("action-children")).toHaveTextContent(
      "Replacement",
    );
    expect(screen.queryByText("Generated label")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/hidden-leading"),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("action-slot")).toHaveTextContent("Custom slot");
    expect(screen.queryByText("Hidden slot action")).not.toBeInTheDocument();
  });

  it("keeps the pricing toggle and comparison slot behavior", () => {
    const { rerender } = render(
      <PricingFullComparison
        monthlyInterval="/month"
        yearlyInterval="/year"
        plans={plans}
      />,
    );

    expect(screen.getByText("$10")).toBeInTheDocument();
    expect(screen.getAllByText("/month")).toHaveLength(2);
    fireEvent.click(screen.getByRole("switch"));
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getAllByText("/year")).toHaveLength(2);

    rerender(
      <PricingFullComparison
        plans={plans}
        features={availabilityFeatures}
        comparisonSlot={<div data-testid="comparison-slot">Custom table</div>}
      />,
    );
    expect(screen.getByTestId("comparison-slot")).toHaveTextContent(
      "Custom table",
    );
    expect(screen.queryByText("Availability")).not.toBeInTheDocument();
  });
});
