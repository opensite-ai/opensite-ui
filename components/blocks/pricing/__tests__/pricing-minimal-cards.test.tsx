import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PricingMinimalCards } from "../pricing-minimal-cards";

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

describe("PricingMinimalCards", () => {
  it("preserves feature override precedence and inherited string icon styles", () => {
    const { container } = render(
      <PricingMinimalCards
        featureIcon="lucide/global-feature"
        featureIconName="lucide/legacy-global"
        featureIconClassName="global-icon-class"
        plans={[
          {
            name: "Minimal",
            features: [
              {
                text: "Raw feature",
                icon: "lucide/raw-feature",
                iconName: "lucide/ignored-raw",
                iconClassName: "local-icon-class",
              },
              {
                text: "Empty override",
                icon: "",
                iconName: "lucide/ignored-empty",
              },
              {
                text: "False override",
                icon: false,
                iconName: "lucide/ignored-false",
              },
              {
                text: "Zero override",
                icon: 0,
                iconName: "lucide/ignored-zero",
              },
              {
                text: "Custom override",
                icon: <span data-testid="custom-feature-icon" />,
                iconName: "lucide/ignored-custom",
              },
              { text: "Global raw fallback" },
            ],
          },
        ]}
      />,
    );

    const rawIcon = screen.getByTestId("mock-icon-lucide/raw-feature");
    expect(rawIcon).toHaveAttribute("data-size", "16");
    expect(rawIcon).toHaveClass(
      "shrink-0",
      "text-primary",
      "global-icon-class",
      "local-icon-class",
    );
    expect(
      screen.getByTestId("mock-icon-lucide/global-feature"),
    ).toHaveAttribute("data-size", "16");
    expect(screen.getByTestId("custom-feature-icon")).toBeInTheDocument();
    expect(screen.getByText("Raw feature").closest("li")!).not.toHaveTextContent(
      "lucide/raw-feature",
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

  it("preserves local, global, and explicit empty named fallbacks", () => {
    const { container, rerender } = render(
      <PricingMinimalCards
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
      "16",
    );
    expect(screen.getByTestId("mock-icon-lucide/local-name")).toHaveClass(
      "shrink-0",
      "text-primary",
    );
    expect(screen.getAllByTestId("mock-icon-lucide/global-name")).toHaveLength(
      2,
    );

    rerender(
      <PricingMinimalCards
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
      container.querySelector("[data-testid^='mock-icon-']"),
    ).not.toBeInTheDocument();
  });

  it("routes action icons and preserves custom, falsy, children, and slots", () => {
    const { container } = render(
      <PricingMinimalCards
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
            name: "Custom action",
            action: {
              label: "Custom label",
              icon: <span data-testid="custom-leading-icon" />,
              iconAfter: <span data-testid="custom-trailing-icon" />,
            },
          },
          {
            name: "Falsy action",
            action: { label: "Falsy label", icon: "", iconAfter: 0 },
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

  it("keeps feature and plan slots as complete overrides", () => {
    const { rerender } = render(
      <PricingMinimalCards
        plans={[
          {
            name: "Feature slot plan",
            features: [{ text: "Hidden feature" }],
            featuresSlot: <div data-testid="features-slot">Custom features</div>,
          },
        ]}
      />,
    );
    expect(screen.getByTestId("features-slot")).toHaveTextContent(
      "Custom features",
    );
    expect(screen.queryByText("Hidden feature")).not.toBeInTheDocument();

    rerender(
      <PricingMinimalCards
        plans={[{ name: "Hidden plan" }]}
        plansSlot={<div data-testid="plans-slot">Custom plans</div>}
      />,
    );
    expect(screen.getByTestId("plans-slot")).toHaveTextContent("Custom plans");
    expect(screen.queryByText("Hidden plan")).not.toBeInTheDocument();
  });
});
