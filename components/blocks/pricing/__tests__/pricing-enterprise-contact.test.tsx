import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PricingEnterpriseContact } from "../pricing-enterprise-contact";

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

describe("PricingEnterpriseContact", () => {
  it("preserves feature raw and named precedence inside the existing wrapper", () => {
    const { rerender } = render(
      <PricingEnterpriseContact
        featureIcon="lucide/global-raw"
        featureIconName="lucide/global-name"
        features={[
          {
            name: "Local raw",
            icon: "lucide/local-raw",
            iconName: "lucide/local-name",
            iconClassName: "local-icon-class",
            iconWrapperClassName: "local-wrapper-class",
          },
          { name: "Global raw", iconName: "lucide/local-name" },
        ]}
      />,
    );

    const localRaw = screen.getByTestId("mock-icon-lucide/local-raw");
    expect(localRaw).toHaveAttribute("data-size", "16");
    expect(localRaw).toHaveClass("text-primary", "local-icon-class");
    expect(localRaw.parentElement).toHaveClass(
      "h-8",
      "w-8",
      "bg-primary/10",
      "local-wrapper-class",
    );
    expect(
      screen
        .getByText("Global raw")
        .closest(".flex.gap-4")
        ?.querySelector('[data-name="lucide/global-raw"]'),
    ).toBeInTheDocument();
    expect(screen.queryByText("lucide/local-raw")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/local-name"),
    ).not.toBeInTheDocument();

    rerender(
      <PricingEnterpriseContact
        featureIconName="lucide/global-name"
        features={[
          {
            name: "Local name",
            iconName: "lucide/local-name",
            iconClassName: "local-icon-class",
          },
          { name: "Global name" },
        ]}
      />,
    );

    expect(screen.getByTestId("mock-icon-lucide/local-name")).toHaveAttribute(
      "data-size",
      "16",
    );
    expect(screen.getByTestId("mock-icon-lucide/local-name")).toHaveClass(
      "text-primary",
      "local-icon-class",
    );
    expect(
      screen.getByTestId("mock-icon-lucide/global-name").parentElement,
    ).toHaveClass("h-8", "w-8");
    expect(screen.queryByText("lucide/global-name")).not.toBeInTheDocument();
  });

  it("preserves custom and falsy overrides plus wrapper truthiness", () => {
    const { container } = render(
      <PricingEnterpriseContact
        featureIconName="lucide/global-name"
        features={[
          {
            name: "Custom",
            icon: <span data-testid="custom-feature-icon" />,
            iconName: "lucide/custom-fallback",
          },
          {
            name: "Empty",
            icon: "",
            iconName: "lucide/empty-fallback",
          },
          {
            name: "False",
            icon: false,
            iconName: "lucide/false-fallback",
          },
          {
            name: "Zero",
            icon: 0,
            iconName: "lucide/zero-fallback",
          },
        ]}
      />,
    );

    const custom = screen.getByTestId("custom-feature-icon");
    expect(custom.parentElement).toHaveClass("h-8", "w-8", "bg-primary/10");

    for (const name of ["Empty", "False", "Zero"]) {
      expect(
        screen.getByText(name).closest(".flex.gap-4")?.querySelector(".h-8.w-8"),
      ).not.toBeInTheDocument();
    }
    expect(
      screen.getByText("Zero").closest(".flex.gap-4"),
    ).toHaveTextContent("0Zero");
    expect(
      container.querySelector('[data-name*="fallback"]'),
    ).not.toBeInTheDocument();
  });

  it("routes action-array icons and preserves empty, falsy, and children semantics", () => {
    const { container } = render(
      <PricingEnterpriseContact
        actions={[
          {
            href: "/icons",
            label: "Action",
            icon: "lucide/rocket",
            iconAfter: "lucide/arrow-right",
          },
          {
            href: "/custom",
            label: "Custom",
            icon: <span data-testid="custom-leading" />,
            iconAfter: <span data-testid="custom-trailing" />,
          },
          {
            href: "/falsy",
            label: "Falsy",
            icon: false,
            iconAfter: 0,
          },
          {
            href: "/empty",
            label: "Empty",
            icon: "",
            iconAfter: "",
          },
          {
            href: "/children",
            label: "Hidden label",
            icon: "lucide/hidden-leading",
            iconAfter: "lucide/hidden-trailing",
            children: <span data-testid="action-children">Replacement</span>,
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
    expect(
      container
        .querySelector('a[href="/empty"]')
        ?.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();

    const childAction = container.querySelector('a[href="/children"]')!;
    expect(screen.getByTestId("action-children")).toBeInTheDocument();
    expect(screen.queryByText("Hidden label")).not.toBeInTheDocument();
    expect(
      childAction.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
  });

  it("preserves actionsSlot precedence and its existing wrapper", () => {
    const { container } = render(
      <PricingEnterpriseContact
        actions={[{ label: "Hidden action" }]}
        actionsSlot={<span data-testid="actions-slot">Slot</span>}
      />,
    );

    const slot = screen.getByTestId("actions-slot");
    expect(slot).toBeInTheDocument();
    expect(screen.queryByText("Hidden action")).not.toBeInTheDocument();
    expect(slot.parentElement).toHaveClass(
      "mt-8",
      "flex",
      "flex-col",
      "sm:flex-row",
    );
    expect(container.querySelector(".md\\:grid-cols-2")).toBeInTheDocument();
  });
});
