import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PricingTierGrid } from "../pricing-tier-grid";

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

describe("PricingTierGrid", () => {
  it("preserves item, global, and named precedence with tier color styles", () => {
    const { container, rerender } = render(
      <PricingTierGrid
        featureIcon="lucide/global-raw"
        featureIconName="lucide/legacy-global"
        featureIconClassName="global-icon-class"
        tiers={[
          {
            name: "Standard",
            features: [
              {
                text: "Standard raw",
                icon: "lucide/standard-raw",
                iconName: "lucide/ignored-standard",
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
                text: "Standard global",
                iconName: "lucide/ignored-local-name",
              },
            ],
          },
          {
            name: "Featured",
            isFeatured: true,
            features: [
              {
                text: "Featured raw",
                icon: "lucide/featured-raw",
              },
              { text: "Featured global" },
            ],
          },
        ]}
      />,
    );

    const standard = screen.getByTestId("mock-icon-lucide/standard-raw");
    expect(standard).toHaveAttribute("data-size", "16");
    expect(standard).toHaveClass(
      "mt-0.5",
      "shrink-0",
      "text-primary",
      "global-icon-class",
      "local-icon-class",
    );
    expect(screen.getByTestId("mock-icon-lucide/featured-raw")).toHaveClass(
      "text-primary-foreground",
    );
    const globalIcons = screen.getAllByTestId("mock-icon-lucide/global-raw");
    expect(globalIcons).toHaveLength(2);
    expect(globalIcons[0]).toHaveClass("text-primary");
    expect(globalIcons[1]).toHaveClass("text-primary-foreground");
    expect(screen.getByTestId("custom-feature-icon")).toBeInTheDocument();
    expectFeatureRowsNotToContain("Standard raw", "lucide/standard-raw");
    expectFeatureRowsNotToContain("Featured raw", "lucide/featured-raw");
    expectFeatureRowsNotToContain("Standard global", "lucide/global-raw");
    expectFeatureRowsNotToContain("Featured global", "lucide/global-raw");
    expect(screen.getByText("Zero item").closest("li")!).toHaveTextContent(
      "0Zero item",
    );
    expect(
      container.querySelector('[data-name^="lucide/ignored-"]'),
    ).not.toBeInTheDocument();

    rerender(
      <PricingTierGrid
        featureIconName="lucide/global-name"
        tiers={[
          {
            name: "Named",
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
      "16",
    );
    expect(screen.getAllByTestId("mock-icon-lucide/global-name")).toHaveLength(
      2,
    );
    expectFeatureRowsNotToContain("Local name", "lucide/local-name");
    expectFeatureRowsNotToContain("Global name", "lucide/global-name");
    expectFeatureRowsNotToContain("Empty local name", "lucide/global-name");

    rerender(
      <PricingTierGrid
        featureIconName=""
        tiers={[
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
      <PricingTierGrid
        featureIcon=""
        featureIconName="lucide/ignored-global"
        tiers={[{ name: "Tier", features: [{ text: "Global empty" }] }]}
      />,
    );
    expect(
      container.querySelector("[data-testid^='mock-icon-']"),
    ).not.toBeInTheDocument();

    rerender(
      <PricingTierGrid
        featureIcon={false}
        featureIconName="lucide/ignored-global"
        tiers={[{ name: "Tier", features: [{ text: "Global false" }] }]}
      />,
    );
    expect(
      container.querySelector("[data-testid^='mock-icon-']"),
    ).not.toBeInTheDocument();

    rerender(
      <PricingTierGrid
        featureIcon={0}
        featureIconName="lucide/ignored-global"
        tiers={[{ name: "Tier", features: [{ text: "Global zero" }] }]}
      />,
    );
    expect(screen.getByText("Global zero").closest("li")!).toHaveTextContent(
      "0Global zero",
    );

    rerender(
      <PricingTierGrid
        featureIcon={<span data-testid="custom-global-icon" />}
        featureIconName="lucide/ignored-global"
        tiers={[{ name: "Tier", features: [{ text: "Global custom" }] }]}
      />,
    );
    expect(screen.getByTestId("custom-global-icon")).toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/ignored-global"),
    ).not.toBeInTheDocument();
  });

  it("routes action icons and preserves custom, falsy, children, and slots", () => {
    const { container } = render(
      <PricingTierGrid
        tiers={[
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

  it("keeps feature and tier slots as complete overrides", () => {
    const { rerender } = render(
      <PricingTierGrid
        tiers={[
          {
            name: "Feature slot tier",
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
      <PricingTierGrid
        tiers={[{ name: "Hidden tier" }]}
        tiersSlot={<div data-testid="tiers-slot">Custom tiers</div>}
      />,
    );
    expect(screen.getByTestId("tiers-slot")).toHaveTextContent("Custom tiers");
    expect(screen.queryByText("Hidden tier")).not.toBeInTheDocument();
  });
});
