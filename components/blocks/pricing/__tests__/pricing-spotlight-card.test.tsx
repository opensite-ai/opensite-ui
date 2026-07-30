import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PricingSpotlightCard } from "../pricing-spotlight-card";

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

describe("PricingSpotlightCard", () => {
  it("preserves feature precedence and truthy wrapper behavior", () => {
    const { container } = render(
      <PricingSpotlightCard
        featureIcon="lucide/global-raw"
        featureIconName="lucide/legacy-global"
        featureIconClassName="global-icon-class"
        featureIconWrapperClassName="global-wrapper-class"
        features={[
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
        ]}
      />,
    );

    const localRaw = screen.getByTestId("mock-icon-lucide/local-raw");
    expect(localRaw).toHaveAttribute("data-size", "14");
    expect(localRaw).toHaveClass(
      "text-primary",
      "global-icon-class",
      "local-icon-class",
    );
    expect(localRaw.parentElement).toHaveClass(
      "h-6",
      "w-6",
      "bg-primary/10",
      "global-wrapper-class",
    );
    expect(screen.getByTestId("custom-feature-icon").parentElement).toHaveClass(
      "h-6",
      "w-6",
    );
    expect(screen.getByText("Local raw").closest("li")).not.toHaveTextContent(
      "lucide/local-raw",
    );
    expect(screen.getByText("Zero").closest("li")).toHaveTextContent("0Zero");
    expect(
      container.querySelector('[data-name^="lucide/ignored-"]'),
    ).not.toBeInTheDocument();
    expect(container.querySelectorAll(".h-6.w-6")).toHaveLength(3);
    for (const text of ["Empty", "False", "Zero"]) {
      expect(
        screen.getByText(text).closest("li")?.querySelector(".h-6.w-6"),
      ).not.toBeInTheDocument();
    }
  });

  it("preserves local, global, and explicit empty named fallbacks", () => {
    const { container, rerender } = render(
      <PricingSpotlightCard
        featureIconName="lucide/global-name"
        features={[
          { text: "Local named", iconName: "lucide/local-name" },
          { text: "Global named" },
          { text: "Empty local name", iconName: "" },
        ]}
      />,
    );

    expect(screen.getByTestId("mock-icon-lucide/local-name")).toHaveAttribute(
      "data-size",
      "14",
    );
    expect(screen.getAllByTestId("mock-icon-lucide/global-name")).toHaveLength(
      2,
    );
    expect(container.querySelectorAll(".h-6.w-6")).toHaveLength(3);

    rerender(
      <PricingSpotlightCard
        featureIconName=""
        features={[{ text: "No named icon", iconName: "" }]}
      />,
    );
    expect(
      container.querySelector('[data-testid^="mock-icon-"]'),
    ).not.toBeInTheDocument();
    expect(container.querySelector(".h-6.w-6")).not.toBeInTheDocument();
  });

  it("routes action-array icons and preserves custom, falsy, and children semantics", () => {
    const { container } = render(
      <PricingSpotlightCard
        actions={[
          {
            href: "/icons",
            label: "Choose",
            icon: "lucide/rocket",
            iconAfter: "lucide/arrow-right",
          },
          {
            href: "/custom",
            label: "Custom",
            icon: <span data-testid="custom-leading-icon" />,
            iconAfter: <span data-testid="custom-trailing-icon" />,
          },
          {
            href: "/falsy",
            label: "Falsy",
            icon: "",
            iconAfter: 0,
          },
          {
            href: "/children",
            label: "Generated label",
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
    expect(action.parentElement).toHaveClass("mt-10", "space-y-3");
  });

  it("preserves actionsSlot precedence and the outer actions branch", () => {
    const { container, rerender } = render(
      <PricingSpotlightCard
        actions={[{ label: "Hidden action" }]}
        actionsSlot={<span data-testid="actions-slot">Actions slot</span>}
      />,
    );

    const slot = screen.getByTestId("actions-slot");
    expect(slot).toBeInTheDocument();
    expect(screen.queryByText("Hidden action")).not.toBeInTheDocument();
    expect(slot.parentElement).toHaveClass("mt-10", "space-y-3");

    rerender(<PricingSpotlightCard actions={[]} />);
    expect(container.querySelector(".mt-10.space-y-3")).not.toBeInTheDocument();
  });
});
