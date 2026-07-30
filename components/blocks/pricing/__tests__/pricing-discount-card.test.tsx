import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PricingDiscountCard } from "../pricing-discount-card";

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

describe("PricingDiscountCard", () => {
  it("preserves feature raw and named precedence with inherited size and classes", () => {
    const { rerender } = render(
      <PricingDiscountCard
        featureIcon="lucide/global-raw"
        featureIconName="lucide/global-name"
        featureIconClassName="global-icon-class"
        features={[
          {
            text: "Local raw",
            icon: "lucide/local-raw",
            iconName: "lucide/local-name",
            iconClassName: "local-icon-class",
          },
          { text: "Global raw", iconName: "lucide/local-name" },
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
      <PricingDiscountCard
        featureIconName="lucide/global-name"
        featureIconClassName="global-icon-class"
        features={[
          { text: "Local name", iconName: "lucide/local-name" },
          { text: "Global name" },
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
      <PricingDiscountCard
        featureIconName="lucide/global-name"
        features={[
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

  it("routes both action icons and preserves empty, falsy, and children semantics", () => {
    const { container, rerender } = render(
      <PricingDiscountCard
        action={{
          href: "/icons",
          label: "Action",
          icon: "lucide/rocket",
          iconAfter: "lucide/arrow-right",
        }}
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

    rerender(
      <PricingDiscountCard
        action={{
          href: "/custom",
          label: "Custom",
          icon: <span data-testid="custom-leading" />,
          iconAfter: <span data-testid="custom-trailing" />,
        }}
      />,
    );

    const customAction = container.querySelector('a[href="/custom"]')!;
    expect(
      customAction.querySelector('[data-testid="custom-leading"]'),
    ).toBeInTheDocument();
    expect(
      customAction.querySelector('[data-testid="custom-trailing"]'),
    ).toBeInTheDocument();

    rerender(
      <PricingDiscountCard
        action={{
          href: "/falsy",
          label: "Falsy",
          icon: false,
          iconAfter: 0,
        }}
      />,
    );

    const falsyAction = container.querySelector('a[href="/falsy"]')!;
    expect(falsyAction).toHaveTextContent("Falsy0");
    expect(
      falsyAction.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();

    rerender(
      <PricingDiscountCard
        action={{
          href: "/empty",
          label: "Empty",
          icon: "",
          iconAfter: "",
        }}
      />,
    );

    expect(
      container
        .querySelector('a[href="/empty"]')
        ?.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();

    rerender(
      <PricingDiscountCard
        action={{
          href: "/children",
          label: "Hidden label",
          icon: "lucide/hidden-leading",
          iconAfter: "lucide/hidden-trailing",
          children: <span data-testid="action-children">Replacement</span>,
        }}
      />,
    );

    const childAction = container.querySelector('a[href="/children"]')!;
    expect(screen.getByTestId("action-children")).toBeInTheDocument();
    expect(screen.queryByText("Hidden label")).not.toBeInTheDocument();
    expect(
      childAction.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
  });

  it("preserves actionSlot precedence", () => {
    render(
      <PricingDiscountCard
        action={{ label: "Hidden action" }}
        actionSlot={<span data-testid="action-slot">Slot</span>}
      />,
    );

    expect(screen.getByTestId("action-slot")).toBeInTheDocument();
    expect(screen.queryByText("Hidden action")).not.toBeInTheDocument();
  });
});
