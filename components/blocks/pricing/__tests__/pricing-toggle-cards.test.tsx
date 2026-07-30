import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PricingToggleCards } from "../pricing-toggle-cards";

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

describe("PricingToggleCards", () => {
  const mockPlans = [
    {
      name: "Basic",
      description: "For individuals",
      monthlyPrice: "$10",
      yearlyPrice: "$100",
      features: [{ text: "Feature 1" }, { text: "Feature 2" }],
      action: { label: "Get Started", href: "/basic" },
    },
    {
      name: "Pro",
      description: "For teams",
      monthlyPrice: "$30",
      yearlyPrice: "$300",
      features: [{ text: "Feature 1" }, { text: "Feature 2" }, { text: "Feature 3" }],
      action: { label: "Start Trial", href: "/pro" },
      isPopular: true,
    },
  ];

  it("renders custom heading and description", () => {
    render(
      <PricingToggleCards
        heading="Our Plans"
        description="Select the best option"
      />
    );
    expect(screen.getByText("Our Plans")).toBeInTheDocument();
    expect(screen.getByText("Select the best option")).toBeInTheDocument();
  });

  it("renders all plan names and descriptions", () => {
    render(
      <PricingToggleCards
        heading="Pricing Plans"
        monthlyLabel="Monthly"
        yearlyLabel="Yearly"
        monthlyInterval="/month"
        yearlyInterval="/year"
        plans={mockPlans}
      />
    );
    expect(screen.getByText("Basic")).toBeInTheDocument();
    expect(screen.getByText("For individuals")).toBeInTheDocument();
    expect(screen.getByText("Pro")).toBeInTheDocument();
    expect(screen.getByText("For teams")).toBeInTheDocument();
  });

  it("displays monthly prices by default", () => {
    render(
      <PricingToggleCards
        heading="Pricing Plans"
        monthlyLabel="Monthly"
        yearlyLabel="Yearly"
        monthlyInterval="/month"
        yearlyInterval="/year"
        plans={mockPlans}
      />
    );
    expect(screen.getByText("$10")).toBeInTheDocument();
    expect(screen.getByText("$30")).toBeInTheDocument();
    expect(screen.getAllByText("/month").length).toBeGreaterThan(0);
  });

  it("toggles to yearly prices when switch is clicked", () => {
    render(
      <PricingToggleCards
        heading="Pricing Plans"
        monthlyLabel="Monthly"
        yearlyLabel="Yearly"
        monthlyInterval="/month"
        yearlyInterval="/year"
        plans={mockPlans}
      />
    );
    const toggle = screen.getByRole("switch");
    fireEvent.click(toggle);
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("$300")).toBeInTheDocument();
    expect(screen.getAllByText("/year").length).toBeGreaterThan(0);
  });

  it("highlights popular plan", () => {
    const { container } = render(
      <PricingToggleCards
        heading="Pricing Plans"
        monthlyLabel="Monthly"
        yearlyLabel="Yearly"
        monthlyInterval="/month"
        yearlyInterval="/year"
        popularBadge="Most Popular"
        plans={mockPlans}
      />
    );
    expect(screen.getByText("Most Popular")).toBeInTheDocument();
    const popularCard = container.querySelector(".border-primary");
    expect(popularCard).toBeInTheDocument();
  });

  it("renders all plan features", () => {
    render(
      <PricingToggleCards
        heading="Pricing Plans"
        monthlyLabel="Monthly"
        yearlyLabel="Yearly"
        monthlyInterval="/month"
        yearlyInterval="/year"
        plans={mockPlans}
      />
    );
    expect(screen.getAllByText("Feature 1").length).toBe(2);
    expect(screen.getAllByText("Feature 2").length).toBe(2);
    expect(screen.getByText("Feature 3")).toBeInTheDocument();
  });

  it("renders plan buttons with correct text and href", () => {
    render(
      <PricingToggleCards
        heading="Pricing Plans"
        monthlyLabel="Monthly"
        yearlyLabel="Yearly"
        monthlyInterval="/month"
        yearlyInterval="/year"
        plans={mockPlans}
      />
    );
    const basicButton = screen.getByText("Get Started");
    const proButton = screen.getByText("Start Trial");
    expect(basicButton.closest("a")).toHaveAttribute("href", "/basic");
    expect(proButton.closest("a")).toHaveAttribute("href", "/pro");
  });

  it("applies correct grid layout", () => {
    const { container } = render(
      <PricingToggleCards
        heading="Pricing Plans"
        monthlyLabel="Monthly"
        yearlyLabel="Yearly"
        monthlyInterval="/month"
        yearlyInterval="/year"
        plans={mockPlans}
      />
    );
    const grid = container.querySelector(".grid");
    expect(grid?.className).toContain("md:grid-cols-2");
    expect(grid?.className).toContain("lg:grid-cols-3");
  });

  it("renders feature icons", () => {
    const { container } = render(
      <PricingToggleCards
        heading="Pricing Plans"
        monthlyLabel="Monthly"
        yearlyLabel="Yearly"
        monthlyInterval="/month"
        yearlyInterval="/year"
        plans={mockPlans}
      />
    );
    const featureItems = container.querySelectorAll("li");
    expect(featureItems.length).toBeGreaterThan(0);
  });

  it("renders buttons for all plans", () => {
    render(
      <PricingToggleCards
        heading="Pricing Plans"
        monthlyLabel="Monthly"
        yearlyLabel="Yearly"
        monthlyInterval="/month"
        yearlyInterval="/year"
        plans={mockPlans}
      />
    );
    const basicButton = screen.getByText("Get Started").closest("a");
    const proButton = screen.getByText("Start Trial").closest("a");
    expect(basicButton).toBeInTheDocument();
    expect(proButton).toBeInTheDocument();
  });

  it("renders card content with proper structure", () => {
    const { container } = render(
      <PricingToggleCards
        heading="Pricing Plans"
        monthlyLabel="Monthly"
        yearlyLabel="Yearly"
        monthlyInterval="/month"
        yearlyInterval="/year"
        plans={mockPlans}
      />
    );
    const cards = container.querySelectorAll("[data-slot='card']");
    expect(cards.length).toBe(mockPlans.length);
  });

  it("renders with empty plans array", () => {
    const { container } = render(
      <PricingToggleCards
        heading="Pricing Plans"
        monthlyLabel="Monthly"
        yearlyLabel="Yearly"
        monthlyInterval="/month"
        yearlyInterval="/year"
        plans={[]}
      />
    );
    // When plans is empty, the grid element for plans is not rendered
    // But the header grid may still exist
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies shadow to popular plan card", () => {
    const { container } = render(
      <PricingToggleCards
        heading="Pricing Plans"
        monthlyLabel="Monthly"
        yearlyLabel="Yearly"
        monthlyInterval="/month"
        yearlyInterval="/year"
        popularBadge="Most Popular"
        plans={mockPlans}
      />
    );
    const popularCard = container.querySelector(".shadow-lg");
    expect(popularCard).toBeInTheDocument();
  });

  it("renders price with correct font size", () => {
    const { container } = render(
      <PricingToggleCards
        heading="Pricing Plans"
        monthlyLabel="Monthly"
        yearlyLabel="Yearly"
        monthlyInterval="/month"
        yearlyInterval="/year"
        plans={mockPlans}
      />
    );
    const prices = container.querySelectorAll(".text-4xl");
    expect(prices.length).toBeGreaterThan(0);
  });

  it("positions popular badge correctly", () => {
    const { container } = render(
      <PricingToggleCards
        heading="Pricing Plans"
        monthlyLabel="Monthly"
        yearlyLabel="Yearly"
        monthlyInterval="/month"
        yearlyInterval="/year"
        popularBadge="Most Popular"
        plans={mockPlans}
      />
    );
    const badge = screen.getByText("Most Popular").parentElement;
    expect(badge?.className).toContain("absolute");
    expect(badge?.className).toContain("-top-3");
  });

  it("applies flex layout to cards", () => {
    const { container } = render(
      <PricingToggleCards
        heading="Pricing Plans"
        monthlyLabel="Monthly"
        yearlyLabel="Yearly"
        monthlyInterval="/month"
        yearlyInterval="/year"
        plans={mockPlans}
      />
    );
    const cards = container.querySelectorAll(".flex.flex-col");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("preserves item, global, and named feature icon precedence and styles", () => {
    const { container, rerender } = render(
      <PricingToggleCards
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
      <PricingToggleCards
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
  });

  it("preserves falsy and custom global feature icon overrides", () => {
    const { container, rerender } = render(
      <PricingToggleCards
        featureIcon=""
        featureIconName="lucide/ignored-global"
        plans={[
          {
            name: "Global override",
            features: [{ text: "Global empty" }],
          },
        ]}
      />,
    );

    expect(
      container.querySelector("[data-testid^='mock-icon-']"),
    ).not.toBeInTheDocument();

    rerender(
      <PricingToggleCards
        featureIcon={false}
        featureIconName="lucide/ignored-global"
        plans={[
          {
            name: "Global override",
            features: [{ text: "Global false" }],
          },
        ]}
      />,
    );
    expect(
      container.querySelector("[data-testid^='mock-icon-']"),
    ).not.toBeInTheDocument();

    rerender(
      <PricingToggleCards
        featureIcon={0}
        featureIconName="lucide/ignored-global"
        plans={[
          {
            name: "Global override",
            features: [{ text: "Global zero" }],
          },
        ]}
      />,
    );
    expect(screen.getByText("Global zero").closest("li")!).toHaveTextContent(
      "0Global zero",
    );

    rerender(
      <PricingToggleCards
        featureIcon={<span data-testid="custom-global-icon" />}
        featureIconName="lucide/ignored-global"
        plans={[
          {
            name: "Global override",
            features: [{ text: "Global custom" }],
          },
        ]}
      />,
    );
    expect(screen.getByTestId("custom-global-icon")).toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/ignored-global"),
    ).not.toBeInTheDocument();
  });

  it("routes both action icons and preserves custom, falsy, children, and slots", () => {
    const { container } = render(
      <PricingToggleCards
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

  it("keeps feature slots as complete overrides", () => {
    render(
      <PricingToggleCards
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
