import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { PricingPopularHighlight } from "../pricing-popular-highlight";

vi.mock("../../../lib/Pressable", () => ({
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

vi.mock("../../../ui/switch", () => ({
  Switch: ({
    checked,
    onCheckedChange,
  }: {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
  }) => (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange?.(!checked)}
    >
      Billing toggle
    </button>
  ),
}));

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

describe("PricingPopularHighlight", () => {
  it("preserves feature precedence, names, size, and classes", () => {
    const { rerender } = render(
      <PricingPopularHighlight
        featureIcon="lucide/global-raw"
        featureIconName="lucide/global-name"
        featureIconClassName="global-icon-class"
        plans={[
          {
            name: "Pro",
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
    expect(
      screen.getByText("Local raw").closest("li"),
    ).not.toHaveTextContent("lucide/local-raw");
    expect(
      screen.queryByTestId("mock-icon-lucide/local-name"),
    ).not.toBeInTheDocument();

    rerender(
      <PricingPopularHighlight
        featureIconName="lucide/global-name"
        plans={[
          {
            name: "Pro",
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
    expect(screen.getByTestId("mock-icon-lucide/global-name")).toBeInTheDocument();
  });

  it("preserves custom, empty, false, and zero feature overrides", () => {
    const { container } = render(
      <PricingPopularHighlight
        featureIconName="lucide/global-name"
        plans={[
          {
            name: "Pro",
            features: [
              {
                text: "Custom",
                icon: <span data-testid="custom-feature-icon" />,
                iconName: "lucide/custom-fallback",
              },
              { text: "Empty", icon: "", iconName: "lucide/empty-fallback" },
              { text: "False", icon: false, iconName: "lucide/false-fallback" },
              { text: "Zero", icon: 0, iconName: "lucide/zero-fallback" },
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

  it("routes plan action icons and preserves edges, children, and actionSlot", () => {
    const { container } = render(
      <PricingPopularHighlight
        plans={[
          {
            name: "Icons",
            action: {
              href: "/icons",
              label: "Action",
              icon: "lucide/rocket",
              iconAfter: "lucide/arrow-right",
            },
          },
          {
            name: "Custom",
            action: {
              href: "/custom",
              label: "Custom",
              icon: <span data-testid="custom-leading" />,
              iconAfter: <span data-testid="custom-trailing" />,
            },
          },
          {
            name: "Falsy",
            action: {
              href: "/falsy",
              label: "Falsy",
              icon: false,
              iconAfter: 0,
            },
          },
          {
            name: "Empty",
            action: {
              href: "/empty",
              label: "Empty",
              icon: "",
              iconAfter: "",
            },
          },
          {
            name: "Children",
            action: {
              href: "/children",
              label: "Hidden label",
              icon: "lucide/hidden-leading",
              iconAfter: "lucide/hidden-trailing",
              children: <span data-testid="action-children">Replacement</span>,
            },
          },
          {
            name: "Slot",
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

    expect(
      container
        .querySelector('a[href="/custom"]')
        ?.querySelector('[data-testid="custom-leading"]'),
    ).toBeInTheDocument();
    expect(
      container
        .querySelector('a[href="/custom"]')
        ?.querySelector('[data-testid="custom-trailing"]'),
    ).toBeInTheDocument();

    const falsyAction = container.querySelector('a[href="/falsy"]')!;
    expect(falsyAction).toHaveTextContent("Falsy0");
    expect(
      falsyAction.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
    expect(
      container
        .querySelector('a[href="/empty"]')
        ?.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();

    expect(screen.getByTestId("action-children")).toBeInTheDocument();
    expect(screen.queryByText("Hidden label")).not.toBeInTheDocument();
    expect(
      container
        .querySelector('a[href="/children"]')
        ?.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("action-slot")).toBeInTheDocument();
    expect(screen.queryByText("Hidden action")).not.toBeInTheDocument();
  });

  it("preserves the billing switch and yearly badge content boundary", () => {
    render(
      <PricingPopularHighlight
        monthlyLabel="Monthly"
        yearlyLabel="Yearly"
        yearlyBadge="Save 20%"
        plans={[
          { name: "Pro", monthlyPrice: "$10", yearlyPrice: "$100" },
        ]}
      />,
    );

    expect(screen.getByText("$10")).toBeInTheDocument();
    expect(screen.getByText("Save 20%")).toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-Save 20%"),
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("switch"));
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.queryByText("$10")).not.toBeInTheDocument();
  });
});
