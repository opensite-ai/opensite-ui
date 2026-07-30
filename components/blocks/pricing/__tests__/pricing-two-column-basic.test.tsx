import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { PricingTwoColumnBasic } from "../pricing-two-column-basic";

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

function expectFeatureRowsNotToContain(label: string, iconName: string) {
  screen.getAllByText(label).forEach((text) => {
    expect(text.closest("li")!).not.toHaveTextContent(iconName);
  });
}

describe("PricingTwoColumnBasic", () => {
  it("preserves item, global, and named feature icon precedence and styles", () => {
    const { container, rerender } = render(
      <PricingTwoColumnBasic
        featureIcon="lucide/global-raw"
        featureIconName="lucide/legacy-global"
        featureIconClassName="global-icon-class"
        plans={[
          {
            name: "Icon plan",
            features: [
              {
                text: "Local raw",
                icon: "lucide/local-raw",
                iconName: "lucide/ignored-local",
                iconClassName: "local-icon-class",
              },
              {
                text: "Empty item",
                icon: "",
                iconName: "lucide/ignored-empty",
              },
              {
                text: "False item",
                icon: false,
                iconName: "lucide/ignored-false",
              },
              {
                text: "Zero item",
                icon: 0,
                iconName: "lucide/ignored-zero",
              },
              {
                text: "Custom item",
                icon: <span data-testid="custom-feature-icon" />,
                iconName: "lucide/ignored-custom",
              },
              {
                text: "Global raw",
                iconName: "lucide/ignored-local-name",
              },
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
      screen.getByTestId("mock-icon-lucide/global-raw"),
    ).toHaveAttribute("data-size", "18");
    expect(screen.getByTestId("custom-feature-icon")).toBeInTheDocument();
    expectFeatureRowsNotToContain("Local raw", "lucide/local-raw");
    expectFeatureRowsNotToContain("Global raw", "lucide/global-raw");
    expect(screen.getByText("Zero item").closest("li")!).toHaveTextContent(
      "0Zero item",
    );
    expect(
      container.querySelector('[data-name^="lucide/ignored-"]'),
    ).not.toBeInTheDocument();

    rerender(
      <PricingTwoColumnBasic
        featureIconName="lucide/global-name"
        plans={[
          {
            name: "Named plan",
            features: [
              { text: "Local name", iconName: "lucide/local-name" },
              { text: "Global name" },
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
    expectFeatureRowsNotToContain("Local name", "lucide/local-name");
    expectFeatureRowsNotToContain("Global name", "lucide/global-name");
    expectFeatureRowsNotToContain("Empty local name", "lucide/global-name");

    rerender(
      <PricingTwoColumnBasic
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

  it("preserves falsy and custom global feature icon overrides", () => {
    const { container, rerender } = render(
      <PricingTwoColumnBasic
        featureIcon=""
        featureIconName="lucide/ignored-global"
        plans={[
          { name: "Global override", features: [{ text: "Global empty" }] },
        ]}
      />,
    );
    expect(
      container.querySelector("[data-testid^='mock-icon-']"),
    ).not.toBeInTheDocument();

    rerender(
      <PricingTwoColumnBasic
        featureIcon={false}
        featureIconName="lucide/ignored-global"
        plans={[
          { name: "Global override", features: [{ text: "Global false" }] },
        ]}
      />,
    );
    expect(
      container.querySelector("[data-testid^='mock-icon-']"),
    ).not.toBeInTheDocument();

    rerender(
      <PricingTwoColumnBasic
        featureIcon={0}
        featureIconName="lucide/ignored-global"
        plans={[
          { name: "Global override", features: [{ text: "Global zero" }] },
        ]}
      />,
    );
    expect(screen.getByText("Global zero").closest("li")!).toHaveTextContent(
      "0Global zero",
    );

    rerender(
      <PricingTwoColumnBasic
        featureIcon={<span data-testid="custom-global-icon" />}
        featureIconName="lucide/ignored-global"
        plans={[
          { name: "Global override", features: [{ text: "Global custom" }] },
        ]}
      />,
    );
    expect(screen.getByTestId("custom-global-icon")).toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/ignored-global"),
    ).not.toBeInTheDocument();
  });

  it("routes action icons and preserves custom, falsy, children, and slots", () => {
    const { container } = render(
      <PricingTwoColumnBasic
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
    expect(
      screen.queryByTestId("mock-icon-lucide/hidden-trailing"),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("action-slot")).toHaveTextContent("Custom slot");
    expect(screen.queryByText("Hidden slot action")).not.toBeInTheDocument();
  });

  it("keeps monthly/yearly toggle and feature slot behavior", () => {
    const { rerender } = render(
      <PricingTwoColumnBasic
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
    fireEvent.click(screen.getByRole("button", { name: "Yearly" }));
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("/year")).toBeInTheDocument();

    rerender(
      <PricingTwoColumnBasic
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
  });
});
