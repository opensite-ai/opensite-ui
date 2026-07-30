import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { PricingCollapsiblePlans } from "../pricing-collapsible-plans";

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

describe("PricingCollapsiblePlans", () => {
  it("preserves feature override precedence, names, size, and classes", () => {
    const { rerender } = render(
      <PricingCollapsiblePlans
        featureIcon="lucide/global-raw"
        featureIconName="lucide/global-name"
        featureIconClassName="global-icon-class"
        plans={[
          {
            name: "Plan",
            price: "$10",
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

    const localRawIcons = screen.getAllByTestId("mock-icon-lucide/local-raw");
    expect(localRawIcons[0]).toHaveAttribute("data-size", "18");
    expect(localRawIcons[0]).toHaveClass(
      "mt-0.5",
      "shrink-0",
      "text-primary",
      "global-icon-class",
      "local-icon-class",
    );
    expect(
      screen.getAllByTestId("mock-icon-lucide/global-raw")[0],
    ).toHaveAttribute("data-size", "18");
    expect(
      screen.queryByTestId("mock-icon-lucide/local-name"),
    ).not.toBeInTheDocument();
    expectFeatureRowsNotToContain("Local raw", "lucide/local-raw");
    expectFeatureRowsNotToContain("Global raw", "lucide/global-raw");

    rerender(
      <PricingCollapsiblePlans
        featureIconName="lucide/global-name"
        featureIconClassName="global-icon-class"
        plans={[
          {
            name: "Plan",
            price: "$10",
            features: [
              { text: "Local name", iconName: "lucide/local-name" },
              { text: "Global name" },
            ],
          },
        ]}
      />,
    );

    expect(
      screen.getAllByTestId("mock-icon-lucide/local-name")[0],
    ).toHaveAttribute("data-size", "18");
    expect(
      screen.getAllByTestId("mock-icon-lucide/global-name")[0],
    ).toHaveClass("global-icon-class");
    expectFeatureRowsNotToContain("Local name", "lucide/local-name");
    expectFeatureRowsNotToContain("Global name", "lucide/global-name");
  });

  it("preserves custom, empty, false, and zero feature overrides", () => {
    const { container } = render(
      <PricingCollapsiblePlans
        featureIconName="lucide/global-name"
        plans={[
          {
            name: "Plan",
            price: "$10",
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

    expect(screen.getAllByTestId("custom-feature-icon")).toHaveLength(2);
    for (const text of screen.getAllByText("Empty")) {
      expect(
        text.closest("li")?.querySelector('[data-testid^="mock-icon"]'),
      ).not.toBeInTheDocument();
    }
    for (const text of screen.getAllByText("False")) {
      expect(
        text.closest("li")?.querySelector('[data-testid^="mock-icon"]'),
      ).not.toBeInTheDocument();
    }
    for (const text of screen.getAllByText("Zero")) {
      expect(text.closest("li")).toHaveTextContent("0Zero");
    }
    expect(
      container.querySelector('[data-name*="fallback"]'),
    ).not.toBeInTheDocument();
  });

  it("routes both action icons and preserves edge values and children", () => {
    const { container, rerender } = render(
      <PricingCollapsiblePlans
        plans={[
          {
            name: "Plan",
            price: "$10",
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

    const actions = container.querySelectorAll('a[href="/action"]');
    expect(actions).toHaveLength(2);
    for (const action of actions) {
      expect(
        action.querySelector('[data-name="lucide/rocket"]'),
      ).toBeInTheDocument();
      expect(
        action.querySelector('[data-name="lucide/arrow-right"]'),
      ).toBeInTheDocument();
      expect(action).not.toHaveTextContent("lucide/rocket");
      expect(action).not.toHaveTextContent("lucide/arrow-right");
    }

    rerender(
      <PricingCollapsiblePlans
        plans={[
          {
            name: "Plan",
            price: "$10",
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
    for (const action of container.querySelectorAll('a[href="/falsy"]')) {
      expect(action).toHaveTextContent("Falsy0");
      expect(
        action.querySelector('[data-testid^="mock-icon"]'),
      ).not.toBeInTheDocument();
    }

    rerender(
      <PricingCollapsiblePlans
        plans={[
          {
            name: "Plan",
            price: "$10",
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
    for (const action of container.querySelectorAll('a[href="/empty"]')) {
      expect(
        action.querySelector('[data-testid^="mock-icon"]'),
      ).not.toBeInTheDocument();
    }

    rerender(
      <PricingCollapsiblePlans
        plans={[
          {
            name: "Plan",
            price: "$10",
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
    expect(screen.getAllByTestId("action-children")).toHaveLength(2);
    expect(screen.queryByText("Generated Label")).not.toBeInTheDocument();
    for (const action of container.querySelectorAll('a[href="/children"]')) {
      expect(
        action.querySelector('[data-testid^="mock-icon"]'),
      ).not.toBeInTheDocument();
    }
  });

  it("preserves truthy actionSlot precedence and the desktop grid layout", () => {
    const { container } = render(
      <PricingCollapsiblePlans
        plans={[
          {
            name: "Plan",
            price: "$10",
            action: { label: "Hidden Action" },
            actionSlot: <div data-testid="action-slot">Action Slot</div>,
          },
        ]}
      />,
    );

    expect(screen.getAllByTestId("action-slot")).toHaveLength(2);
    expect(screen.queryByText("Hidden Action")).not.toBeInTheDocument();
    expect(
      Array.from(container.querySelectorAll("div")).find((element) =>
        element.classList.contains("md:grid-cols-3"),
      ),
    ).toHaveClass("hidden", "gap-6", "md:grid");
  });

  it("preserves the static mobile selector chevron states and styling", () => {
    render(
      <PricingCollapsiblePlans plans={[{ name: "Plan", price: "$10" }]} />,
    );

    const down = screen.getByTestId("mock-icon-lucide/chevron-down");
    expect(down).toHaveAttribute("data-size", "20");
    expect(down).toHaveClass("text-muted-foreground");

    fireEvent.click(down.closest("button")!);

    const up = screen.getByTestId("mock-icon-lucide/chevron-up");
    expect(up).toHaveAttribute("data-size", "20");
    expect(up).toHaveClass("text-muted-foreground");
    expect(
      screen.queryByTestId("mock-icon-lucide/chevron-down"),
    ).not.toBeInTheDocument();
  });
});
