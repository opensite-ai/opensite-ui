import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PricingIconHeaders } from "../pricing-icon-headers";

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

describe("PricingIconHeaders", () => {
  it("routes plan and feature icon strings while preserving wrapper topology", () => {
    const { container } = render(
      <PricingIconHeaders
        featureIcon="lucide/global-feature"
        featureIconName="lucide/legacy-global"
        featureIconClassName="global-icon-class"
        plans={[
          {
            name: "Raw header",
            icon: "lucide/raw-header",
            iconName: "lucide/ignored-header",
            features: [
              {
                text: "Raw feature",
                icon: "lucide/raw-feature",
                iconName: "lucide/ignored-raw",
                iconClassName: "local-icon-class",
              },
              {
                text: "Empty feature",
                icon: "",
                iconName: "lucide/ignored-empty",
              },
              {
                text: "False feature",
                icon: false,
                iconName: "lucide/ignored-false",
              },
              {
                text: "Zero feature",
                icon: 0,
                iconName: "lucide/ignored-zero",
              },
              {
                text: "Custom feature",
                icon: <span data-testid="custom-feature-icon" />,
                iconName: "lucide/ignored-custom",
              },
              { text: "Global feature" },
            ],
          },
          { name: "Named header", iconName: "lucide/named-header" },
          {
            name: "Empty header",
            icon: "",
            iconName: "lucide/legacy-empty-header",
          },
          {
            name: "False header",
            icon: false,
            iconName: "lucide/legacy-false-header",
          },
          {
            name: "Zero header",
            icon: 0,
            iconName: "lucide/legacy-zero-header",
          },
          {
            name: "Custom header",
            icon: <span data-testid="custom-header-icon" />,
          },
        ]}
      />,
    );

    const rawHeader = screen.getByTestId("mock-icon-lucide/raw-header");
    expect(rawHeader).toHaveAttribute("data-size", "24");
    expect(rawHeader.closest(".h-12.w-12")!).not.toHaveTextContent(
      "lucide/raw-header",
    );
    expect(
      screen.getByTestId("mock-icon-lucide/named-header"),
    ).toHaveAttribute("data-size", "24");
    expect(screen.getByTestId("custom-header-icon")).toBeInTheDocument();
    expect(container.querySelectorAll(".h-12.w-12")).toHaveLength(3);
    expect(container).toHaveTextContent("0Zero header");

    const rawFeature = screen.getByTestId("mock-icon-lucide/raw-feature");
    expect(rawFeature).toHaveAttribute("data-size", "18");
    expect(rawFeature).toHaveClass(
      "mt-0.5",
      "shrink-0",
      "text-primary",
      "global-icon-class",
      "local-icon-class",
    );
    expect(
      screen.getByTestId("mock-icon-lucide/global-feature"),
    ).toHaveAttribute("data-size", "18");
    expect(screen.getByTestId("custom-feature-icon")).toBeInTheDocument();
    expect(screen.getByText("Raw feature").closest("li")!).not.toHaveTextContent(
      "lucide/raw-feature",
    );
    expect(screen.getByText("Zero feature").closest("li")!).toHaveTextContent(
      "0Zero feature",
    );
    expect(
      container.querySelector('[data-name^="lucide/ignored-"]'),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-name^="lucide/legacy-"]'),
    ).not.toBeInTheDocument();
  });

  it("preserves local, global, and explicit empty feature name fallbacks", () => {
    const { container, rerender } = render(
      <PricingIconHeaders
        featureIconName="lucide/global-name"
        plans={[
          {
            name: "Named features",
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
      <PricingIconHeaders
        featureIconName=""
        plans={[
          {
            name: "Empty named",
            iconName: "",
            features: [{ text: "No named icon", iconName: "" }],
          },
        ]}
      />,
    );
    expect(
      container.querySelector("[data-testid^='mock-icon-']"),
    ).not.toBeInTheDocument();
    expect(container.querySelector(".h-12.w-12")).not.toBeInTheDocument();
  });

  it("routes action icons and preserves custom, falsy, children, and slots", () => {
    const { container } = render(
      <PricingIconHeaders
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
      <PricingIconHeaders
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
      <PricingIconHeaders
        plans={[{ name: "Hidden plan" }]}
        plansSlot={<div data-testid="plans-slot">Custom plans</div>}
      />,
    );
    expect(screen.getByTestId("plans-slot")).toHaveTextContent("Custom plans");
    expect(screen.queryByText("Hidden plan")).not.toBeInTheDocument();
  });
});
