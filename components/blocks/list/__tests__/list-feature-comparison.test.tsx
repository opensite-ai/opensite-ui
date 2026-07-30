import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ListFeatureComparison } from "../list-feature-comparison";
import type {
  ListFeatureComparisonFeature,
  ListFeatureComparisonTrustIndicator,
} from "../list-feature-comparison";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    className,
    size,
  }: {
    name?: React.ReactNode;
    className?: string;
    size?: number;
  }) =>
    typeof name === "string" ? (
      <span
        data-testid="mock-icon"
        data-name={name}
        data-size={size}
        className={className}
      >
        icon
      </span>
    ) : (
      <>{name}</>
    ),
}));

describe("ListFeatureComparison", () => {
  const mockFeatures: ListFeatureComparisonFeature[] = [
    { name: "Unlimited Projects", basic: false, pro: true, enterprise: true },
    { name: "API Access", basic: true, pro: true, enterprise: true },
    { name: "Advanced Analytics", basic: false, pro: false, enterprise: true },
  ];

  const mockPlanHeaders = {
    feature: "Feature",
    basic: "Basic",
    pro: "Pro",
    enterprise: "Enterprise",
  };

  const mockTrustIndicators: ListFeatureComparisonTrustIndicator[] = [
    {
      icon: "lucide/users",
      title: "50,000+ Users",
      description: "Join our community",
    },
    {
      icon: "lucide/check",
      title: "99.9% Uptime",
      description: "Reliable service",
    },
  ];

  it("renders custom badge text", () => {
    render(<ListFeatureComparison badge="Custom Badge" />);
    expect(screen.getByText("Custom Badge")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<ListFeatureComparison heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ListFeatureComparison description="Custom description" />);
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders custom features correctly", () => {
    render(<ListFeatureComparison features={mockFeatures} planHeaders={mockPlanHeaders} />);
    expect(screen.getByText("Unlimited Projects")).toBeInTheDocument();
    expect(screen.getByText("API Access")).toBeInTheDocument();
    expect(screen.getByText("Advanced Analytics")).toBeInTheDocument();
  });

  it("renders correct number of table rows", () => {
    const { container } = render(
      <ListFeatureComparison features={mockFeatures} planHeaders={mockPlanHeaders} />
    );
    const rows = container.querySelectorAll("tbody tr");
    expect(rows.length).toBe(3);
  });

  it("renders primary button with correct text and link", () => {
    const { container } = render(
      <ListFeatureComparison
        actions={[{ label: "Sign Up Now", href: "/signup" }]}
      />
    );
    const link = screen.getByRole("link", { name: /Sign Up Now/ });
    expect(link).toHaveAttribute("href", "/signup");
  });

  it("renders secondary button with correct text and link", () => {
    render(
      <ListFeatureComparison
        actions={[{ label: "Learn More", href: "/features", variant: "outline" }]}
      />
    );
    const link = screen.getByRole("link", { name: "Learn More" });
    expect(link).toHaveAttribute("href", "/features");
  });

  it("renders table structure correctly", () => {
    const { container } = render(
      <ListFeatureComparison features={mockFeatures} planHeaders={mockPlanHeaders} />
    );
    expect(container.querySelector("table")).toBeInTheDocument();
    expect(container.querySelector("thead")).toBeInTheDocument();
    expect(container.querySelector("tbody")).toBeInTheDocument();
  });

  it("renders with empty features array", () => {
    const { container } = render(<ListFeatureComparison features={[]} />);
    expect(container.firstChild).toBeInTheDocument();
    const rows = container.querySelectorAll("tbody tr");
    expect(rows.length).toBe(0);
  });

  it("supports string and custom trust indicator icons", () => {
    render(
      <ListFeatureComparison
        trustIndicators={[
          {
            icon: "lucide/users",
            title: "String indicator",
          },
          {
            icon: <span data-testid="custom-indicator-icon">custom</span>,
            title: "Custom indicator",
          },
        ]}
      />,
    );

    const stringIndicator = screen
      .getByText("String indicator")
      .closest(".text-center") as HTMLElement;
    const stringIcon = stringIndicator.querySelector(
      '[data-name="lucide/users"]',
    );
    expect(stringIcon).toHaveAttribute("data-size", "32");
    expect(stringIcon).toHaveClass("text-primary", "mx-auto", "mb-4");
    expect(stringIndicator).not.toHaveTextContent("lucide/users");

    const customIndicator = screen
      .getByText("Custom indicator")
      .closest(".text-center") as HTMLElement;
    expect(customIndicator).toContainElement(
      screen.getByTestId("custom-indicator-icon"),
    );
  });

  it("resolves action icons while preserving empty, scalar, custom, and children semantics", () => {
    const { container } = render(
      <ListFeatureComparison
        actions={[
          {
            label: "String action",
            href: "/string",
            icon: "lucide/action-before",
            iconAfter: "lucide/action-after",
          },
          {
            label: "Empty action",
            href: "/empty",
            icon: "",
            iconAfter: "",
          },
          {
            label: "Scalar action",
            href: "/scalar",
            icon: 0,
            iconAfter: false,
          },
          {
            label: "Custom action",
            href: "/custom",
            icon: <span data-testid="custom-action-before">before</span>,
            iconAfter: <span data-testid="custom-action-after">after</span>,
          },
          {
            label: "Hidden label",
            href: "/children",
            icon: "lucide/hidden-before",
            iconAfter: "lucide/hidden-after",
            children: <span>Custom action children</span>,
          },
        ]}
      />,
    );

    const stringAction = container.querySelector(
      'a[href="/string"]',
    ) as HTMLElement;
    expect(
      stringAction.querySelector('[data-name="lucide/action-before"]'),
    ).toBeInTheDocument();
    expect(
      stringAction.querySelector('[data-name="lucide/action-after"]'),
    ).toBeInTheDocument();
    expect(stringAction).not.toHaveTextContent("lucide/action-before");
    expect(stringAction).not.toHaveTextContent("lucide/action-after");

    const emptyAction = container.querySelector(
      'a[href="/empty"]',
    ) as HTMLElement;
    expect(
      emptyAction.querySelector('[data-testid="mock-icon"]'),
    ).not.toBeInTheDocument();

    const scalarAction = container.querySelector(
      'a[href="/scalar"]',
    ) as HTMLElement;
    expect(scalarAction.textContent).toContain("0");
    expect(
      scalarAction.querySelector('[data-testid="mock-icon"]'),
    ).not.toBeInTheDocument();

    const customAction = container.querySelector(
      'a[href="/custom"]',
    ) as HTMLElement;
    expect(customAction).toContainElement(
      screen.getByTestId("custom-action-before"),
    );
    expect(customAction).toContainElement(
      screen.getByTestId("custom-action-after"),
    );

    const childrenAction = container.querySelector(
      'a[href="/children"]',
    ) as HTMLElement;
    expect(
      childrenAction.querySelector('[data-name="lucide/hidden-before"]'),
    ).not.toBeInTheDocument();
    expect(
      childrenAction.querySelector('[data-name="lucide/hidden-after"]'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Hidden label")).not.toBeInTheDocument();
  });
});
