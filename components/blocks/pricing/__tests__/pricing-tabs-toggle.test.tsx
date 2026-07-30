import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { PricingTabsToggle } from "../pricing-tabs-toggle";

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

describe("PricingTabsToggle", () => {
  it("preserves feature precedence, edge values, size, and inherited classes", () => {
    const { container } = render(
      <PricingTabsToggle
        featureIcon="lucide/global-raw"
        featureIconName="lucide/legacy-global"
        featureIconClassName="global-icon-class"
        plans={[
          {
            name: "Plan",
            features: [
              {
                text: "Local raw",
                icon: "lucide/local-raw",
                iconName: "lucide/ignored-local",
                iconClassName: "local-icon-class",
              },
              { text: "Empty", icon: "", iconName: "lucide/ignored-empty" },
              { text: "False", icon: false, iconName: "lucide/ignored-false" },
              { text: "Zero", icon: 0, iconName: "lucide/ignored-zero" },
              {
                text: "Custom",
                icon: <span data-testid="custom-feature-icon" />,
                iconName: "lucide/ignored-custom",
              },
              { text: "Global raw" },
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
    expect(screen.getByTestId("mock-icon-lucide/global-raw")).toHaveAttribute(
      "data-size",
      "18",
    );
    expect(screen.getByTestId("custom-feature-icon")).toBeInTheDocument();
    expect(screen.getByText("Local raw").closest("li")).not.toHaveTextContent(
      "lucide/local-raw",
    );
    expect(screen.getByText("Zero").closest("li")).toHaveTextContent("0Zero");
    expect(
      container.querySelector('[data-name^="lucide/ignored-"]'),
    ).not.toBeInTheDocument();
    for (const text of ["Empty", "False"]) {
      expect(
        screen
          .getByText(text)
          .closest("li")
          ?.querySelector('[data-testid^="mock-icon-"]'),
      ).not.toBeInTheDocument();
    }
  });

  it("preserves local, global, and explicit empty feature-name fallbacks", () => {
    const { container, rerender } = render(
      <PricingTabsToggle
        featureIconName="lucide/global-name"
        plans={[
          {
            name: "Named",
            features: [
              { text: "Local named", iconName: "lucide/local-name" },
              { text: "Global named" },
              { text: "Empty local name", iconName: "" },
            ],
          },
        ]}
      />,
    );

    expect(screen.getByTestId("mock-icon-lucide/local-name")).toHaveAttribute(
      "data-size",
      "18",
    );
    expect(screen.getAllByTestId("mock-icon-lucide/global-name")).toHaveLength(
      2,
    );

    rerender(
      <PricingTabsToggle
        featureIconName=""
        plans={[
          {
            name: "Empty named",
            features: [{ text: "No named icon", iconName: "" }],
          },
        ]}
      />,
    );
    expect(
      container.querySelector('[data-testid^="mock-icon-"]'),
    ).not.toBeInTheDocument();
  });

  it("routes plan-header icons while preserving wrapper truthiness", () => {
    const { container } = render(
      <PricingTabsToggle
        iconWrapperClassName="global-wrapper-class"
        plans={[
          {
            name: "Raw header",
            icon: "lucide/raw-header",
            iconName: "lucide/ignored-header",
          },
          { name: "Named header", iconName: "lucide/named-header" },
          {
            name: "Empty header",
            icon: "",
            iconName: "lucide/ignored-empty-header",
          },
          {
            name: "False header",
            icon: false,
            iconName: "lucide/ignored-false-header",
          },
          {
            name: "Zero header",
            icon: 0,
            iconName: "lucide/ignored-zero-header",
          },
          {
            name: "Custom header",
            icon: <span data-testid="custom-header-icon" />,
          },
        ]}
      />,
    );

    const rawHeader = screen.getByTestId("mock-icon-lucide/raw-header");
    expect(rawHeader).toHaveAttribute("data-size", "20");
    expect(rawHeader).toHaveClass("text-primary");
    expect(rawHeader.parentElement).toHaveClass(
      "h-10",
      "w-10",
      "bg-primary/10",
      "global-wrapper-class",
    );
    expect(
      screen.getByTestId("mock-icon-lucide/named-header"),
    ).toHaveAttribute("data-size", "20");
    expect(screen.getByTestId("custom-header-icon").parentElement).toHaveClass(
      "h-10",
      "w-10",
    );
    expect(rawHeader.parentElement).not.toHaveTextContent("lucide/raw-header");
    expect(container.querySelectorAll(".h-10.w-10")).toHaveLength(3);
    expect(
      container.querySelector('[data-name^="lucide/ignored-"]'),
    ).not.toBeInTheDocument();

    for (const name of ["Empty header", "False header", "Zero header"]) {
      expect(
        screen
          .getByText(name)
          .closest(".mb-4.flex")
          ?.querySelector(".h-10.w-10"),
      ).not.toBeInTheDocument();
    }
    expect(
      screen.getByText("Zero header").closest(".mb-4.flex"),
    ).toHaveTextContent("0Zero header");
  });

  it("routes action icons while preserving custom, falsy, children, and per-plan slots", () => {
    const { container } = render(
      <PricingTabsToggle
        plans={[
          {
            name: "String action",
            action: {
              href: "/icons",
              label: "Choose",
              icon: "lucide/rocket",
              iconAfter: "lucide/arrow-right",
            },
          },
          {
            name: "Custom action",
            action: {
              href: "/custom",
              label: "Custom",
              icon: <span data-testid="custom-leading-icon" />,
              iconAfter: <span data-testid="custom-trailing-icon" />,
            },
          },
          {
            name: "Falsy action",
            action: {
              href: "/falsy",
              label: "Falsy",
              icon: "",
              iconAfter: 0,
            },
          },
          {
            name: "Children action",
            action: {
              href: "/children",
              label: "Generated label",
              icon: "lucide/hidden-leading",
              iconAfter: "lucide/hidden-trailing",
              children: <span data-testid="action-children">Replacement</span>,
            },
          },
          {
            name: "Slot action",
            action: { label: "Hidden action" },
            actionSlot: <span data-testid="action-slot">Action slot</span>,
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
    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();

    const falsyAction = container.querySelector('a[href="/falsy"]')!;
    expect(falsyAction).toHaveTextContent("Falsy0");
    expect(
      falsyAction.querySelector('[data-testid^="mock-icon-"]'),
    ).not.toBeInTheDocument();

    const childAction = container.querySelector('a[href="/children"]')!;
    expect(screen.getByTestId("action-children")).toBeInTheDocument();
    expect(screen.queryByText("Generated label")).not.toBeInTheDocument();
    expect(
      childAction.querySelector('[data-testid^="mock-icon-"]'),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("action-slot")).toBeInTheDocument();
    expect(screen.queryByText("Hidden action")).not.toBeInTheDocument();
  });

  it("keeps the billing tabs and feature/plan slot behavior", () => {
    const { rerender } = render(
      <PricingTabsToggle
        monthlyLabel="Monthly"
        yearlyLabel="Yearly"
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
    fireEvent.mouseDown(screen.getByRole("tab", { name: "Yearly" }), {
      button: 0,
      ctrlKey: false,
    });
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("/year")).toBeInTheDocument();

    rerender(
      <PricingTabsToggle
        plans={[
          {
            name: "Feature slot plan",
            features: [{ text: "Hidden feature" }],
            featuresSlot: <span data-testid="features-slot">Features slot</span>,
          },
        ]}
      />,
    );
    expect(screen.getByTestId("features-slot")).toBeInTheDocument();
    expect(screen.queryByText("Hidden feature")).not.toBeInTheDocument();

    rerender(
      <PricingTabsToggle
        plans={[{ name: "Hidden plan" }]}
        plansSlot={<span data-testid="plans-slot">Plans slot</span>}
      />,
    );
    expect(screen.getByTestId("plans-slot")).toBeInTheDocument();
    expect(screen.queryByText("Hidden plan")).not.toBeInTheDocument();
  });
});
