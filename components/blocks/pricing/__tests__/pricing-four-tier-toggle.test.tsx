import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { PricingFourTierToggle } from "../pricing-four-tier-toggle";

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

describe("PricingFourTierToggle", () => {
  it("preserves feature override precedence and routes selected icon strings", () => {
    const { container } = render(
      <PricingFourTierToggle
        includedIcon="lucide/global-included"
        excludedIcon="lucide/global-excluded"
        includedIconName="lucide/legacy-included"
        excludedIconName="lucide/legacy-excluded"
        featureIconClassName="global-icon-class"
        plans={[
          {
            name: "Team",
            features: [
              {
                name: "Raw included",
                icon: "lucide/raw-included",
                iconName: "lucide/ignored-raw",
                iconClassName: "local-icon-class",
              },
              {
                name: "Empty override",
                icon: "",
                iconName: "lucide/ignored-empty",
              },
              {
                name: "False override",
                included: false,
                icon: false,
                iconName: "lucide/ignored-false",
              },
              {
                name: "Zero override",
                included: false,
                icon: 0,
                iconName: "lucide/ignored-zero",
              },
              {
                name: "Custom override",
                icon: <span data-testid="custom-feature-icon" />,
                iconName: "lucide/ignored-custom",
              },
              { name: "Global included" },
              { name: "Global excluded", included: false },
            ],
          },
        ]}
      />,
    );

    const rawIcon = screen.getByTestId("mock-icon-lucide/raw-included");
    expect(rawIcon).toHaveAttribute("data-size", "16");
    expect(rawIcon).toHaveClass(
      "mt-0.5",
      "shrink-0",
      "text-primary",
      "global-icon-class",
      "local-icon-class",
    );
    expect(
      screen.getByTestId("mock-icon-lucide/global-included"),
    ).toHaveClass("text-primary");
    expect(
      screen.getByTestId("mock-icon-lucide/global-excluded"),
    ).toHaveClass("text-muted-foreground");
    expect(screen.getByTestId("custom-feature-icon")).toBeInTheDocument();

    expect(screen.getByText("Raw included").closest("li")!).not.toHaveTextContent(
      "lucide/raw-included",
    );
    expect(screen.getByText("Zero override").closest("li")!).toHaveTextContent(
      "0Zero override",
    );
    expect(
      container.querySelector('[data-name^="lucide/ignored-"]'),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText("Empty override").closest("li")!
        .querySelector("[data-testid^='mock-icon-']"),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText("False override").closest("li")!
        .querySelector("[data-testid^='mock-icon-']"),
    ).not.toBeInTheDocument();
  });

  it("preserves included and excluded named fallbacks and explicit empty names", () => {
    const { container, rerender } = render(
      <PricingFourTierToggle
        includedIconName="lucide/check"
        excludedIconName="lucide/x"
        plans={[
          {
            name: "Fallbacks",
            features: [
              { name: "Included fallback" },
              { name: "Excluded fallback", included: false },
            ],
          },
        ]}
      />,
    );

    expect(screen.getByTestId("mock-icon-lucide/check")).toHaveAttribute(
      "data-size",
      "16",
    );
    expect(screen.getByTestId("mock-icon-lucide/check")).toHaveClass(
      "mt-0.5",
      "shrink-0",
      "text-primary",
    );
    expect(screen.getByTestId("mock-icon-lucide/x")).toHaveClass(
      "text-muted-foreground",
    );

    rerender(
      <PricingFourTierToggle
        includedIconName=""
        excludedIconName=""
        plans={[
          {
            name: "Empty names",
            features: [
              { name: "No included icon" },
              { name: "No excluded icon", included: false },
            ],
          },
        ]}
      />,
    );

    expect(
      container.querySelector("[data-testid^='mock-icon-']"),
    ).not.toBeInTheDocument();
  });

  it("routes action icons and preserves children and action slots", () => {
    const { container } = render(
      <PricingFourTierToggle
        plans={[
          {
            name: "String action",
            action: {
              label: "Choose",
              icon: "lucide/rocket",
              iconAfter: "lucide/arrow-right",
            },
          },
          {
            name: "Falsy action",
            action: {
              label: "Falsy label",
              icon: "",
              iconAfter: 0,
            },
          },
          {
            name: "Children action",
            action: {
              label: "Generated label",
              icon: "lucide/hidden-leading",
              iconAfter: "lucide/hidden-trailing",
              children: <span data-testid="action-children">Replacement</span>,
            },
          },
          {
            name: "Slot action",
            action: { label: "Hidden slot action" },
            actionSlot: <div data-testid="action-slot">Custom slot</div>,
          },
        ]}
      />,
    );

    const leading = screen.getByTestId("mock-icon-lucide/rocket");
    const action = leading.parentElement!;
    expect(
      screen.getByTestId("mock-icon-lucide/arrow-right"),
    ).toBeInTheDocument();
    expect(action).not.toHaveTextContent("lucide/rocket");
    expect(action).not.toHaveTextContent("lucide/arrow-right");
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

  it("keeps the monthly and yearly toggle behavior", () => {
    render(
      <PricingFourTierToggle
        monthlyInterval="/month"
        yearlyInterval="/year"
        plans={[
          {
            name: "Toggle plan",
            monthlyPrice: "$10",
            yearlyPrice: "$100",
          },
        ]}
      />,
    );

    expect(screen.getByText("$10")).toBeInTheDocument();
    expect(screen.getByText("/month")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("switch"));
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("/year")).toBeInTheDocument();
  });
});
