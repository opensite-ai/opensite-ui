import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PricingAddonsFeatured } from "../pricing-addons-featured";

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

describe("PricingAddonsFeatured", () => {
  it("preserves feature override precedence, names, size, and classes", () => {
    const { rerender } = render(
      <PricingAddonsFeatured
        featureIcon="lucide/global-raw"
        featureIconName="lucide/global-name"
        featureIconClassName="global-icon-class"
        featuredAddons={[
          {
            name: "Add-on",
            features: [
              {
                text: "Local raw",
                icon: "lucide/local-raw",
                iconName: "lucide/local-name",
                iconClassName: "local-icon-class",
              },
              {
                text: "Global raw",
                iconName: "lucide/local-name",
              },
            ],
          },
        ]}
      />,
    );

    expect(screen.getByTestId("mock-icon-lucide/local-raw")).toHaveAttribute(
      "data-size",
      "16",
    );
    expect(screen.getByTestId("mock-icon-lucide/local-raw")).toHaveClass(
      "mt-0.5",
      "shrink-0",
      "text-primary",
      "global-icon-class",
      "local-icon-class",
    );
    expect(screen.getByTestId("mock-icon-lucide/global-raw")).toHaveAttribute(
      "data-size",
      "16",
    );
    expect(
      screen.queryByTestId("mock-icon-lucide/local-name"),
    ).not.toBeInTheDocument();
    expectFeatureRowsNotToContain("Local raw", "lucide/local-raw");
    expectFeatureRowsNotToContain("Global raw", "lucide/global-raw");

    rerender(
      <PricingAddonsFeatured
        featureIconName="lucide/global-name"
        featureIconClassName="global-icon-class"
        featuredAddons={[
          {
            name: "Add-on",
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
      "16",
    );
    expect(screen.getByTestId("mock-icon-lucide/global-name")).toHaveClass(
      "global-icon-class",
    );
    expectFeatureRowsNotToContain("Local name", "lucide/local-name");
    expectFeatureRowsNotToContain("Global name", "lucide/global-name");
  });

  it("preserves custom, empty, false, and zero feature overrides", () => {
    const { container } = render(
      <PricingAddonsFeatured
        featureIconName="lucide/global-name"
        featuredAddons={[
          {
            name: "Add-on",
            features: [
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
            ],
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-feature-icon")).toBeInTheDocument();
    expect(
      screen.getByText("Empty").closest("li")?.querySelector(
        '[data-testid^="mock-icon"]',
      ),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText("False").closest("li")?.querySelector(
        '[data-testid^="mock-icon"]',
      ),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Zero").closest("li")).toHaveTextContent("0Zero");
    expect(
      container.querySelector('[data-name*="fallback"]'),
    ).not.toBeInTheDocument();
  });

  it("routes both action icons and preserves edge values and children", () => {
    const { container, rerender } = render(
      <PricingAddonsFeatured
        featuredAddons={[
          {
            name: "Add-on",
            action: {
              label: "Action",
              href: "/action",
              icon: "lucide/rocket",
              iconAfter: "lucide/arrow-right",
            },
          },
        ]}
      />,
    );

    const action = container.querySelector('a[href="/action"]')!;
    expect(
      action.querySelector('[data-name="lucide/rocket"]'),
    ).toBeInTheDocument();
    expect(
      action.querySelector('[data-name="lucide/arrow-right"]'),
    ).toBeInTheDocument();
    expect(action).not.toHaveTextContent("lucide/rocket");
    expect(action).not.toHaveTextContent("lucide/arrow-right");

    rerender(
      <PricingAddonsFeatured
        featuredAddons={[
          {
            action: {
              label: "Falsy",
              href: "/falsy",
              icon: false,
              iconAfter: 0,
            },
          },
        ]}
      />,
    );
    const falsyAction = container.querySelector('a[href="/falsy"]')!;
    expect(falsyAction).toHaveTextContent("Falsy0");
    expect(
      falsyAction.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();

    rerender(
      <PricingAddonsFeatured
        featuredAddons={[
          {
            action: {
              label: "Empty",
              href: "/empty",
              icon: "",
              iconAfter: "",
            },
          },
        ]}
      />,
    );
    expect(
      container
        .querySelector('a[href="/empty"]')
        ?.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();

    rerender(
      <PricingAddonsFeatured
        featuredAddons={[
          {
            action: {
              label: "Generated Label",
              href: "/children",
              icon: "lucide/rocket",
              iconAfter: "lucide/arrow-right",
              children: <span data-testid="action-children">Replacement</span>,
            },
          },
        ]}
      />,
    );
    const childAction = container.querySelector('a[href="/children"]')!;
    expect(screen.getByTestId("action-children")).toBeInTheDocument();
    expect(screen.queryByText("Generated Label")).not.toBeInTheDocument();
    expect(
      childAction.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
  });

  it("preserves truthy actionSlot precedence and the featured grid layout", () => {
    const { container } = render(
      <PricingAddonsFeatured
        featuredAddons={[
          {
            name: "Add-on",
            action: { label: "Hidden Action" },
            actionSlot: <div data-testid="action-slot">Action Slot</div>,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("action-slot")).toBeInTheDocument();
    expect(screen.queryByText("Hidden Action")).not.toBeInTheDocument();
    expect(container.querySelector(".grid")).toHaveClass("md:grid-cols-3");
  });
});
