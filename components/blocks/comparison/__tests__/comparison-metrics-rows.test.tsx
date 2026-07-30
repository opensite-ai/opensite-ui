import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ComparisonMetricsRows } from "../comparison-metrics-rows";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
  }: {
    name?: React.ReactNode | string;
    size?: number;
  }) =>
    typeof name === "string" ? (
      <span data-testid="mock-icon" data-name={name} data-size={size} />
    ) : (
      <>{name}</>
    ),
}));

vi.mock("../../../../lib/Pressable", () => ({
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

describe("ComparisonMetricsRows", () => {

  it("renders with custom heading", () => {
    render(<ComparisonMetricsRows heading="Custom Heading" />);

    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom metrics", () => {
    const customMetrics = [
      {
        title: "Custom Metric",
        optionA: { value: "10", unit: "hrs", desc: "Description A" },
        optionB: { value: "20", unit: "hrs", desc: "Description B" },
      },
    ];

    render(<ComparisonMetricsRows metrics={customMetrics} />);

    expect(screen.getByText("Custom Metric")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
  });

  it("renders empty metrics array", () => {
    render(<ComparisonMetricsRows heading="Compare Cloud vs On-site Infrastructure" metrics={[]} />);

    expect(
      screen.getByText("Compare Cloud vs On-site Infrastructure")
    ).toBeInTheDocument();
  });

  it("renders actions", () => {
    render(
      <ComparisonMetricsRows actions={[{ label: "Learn More", href: "/learn" }]} />
    );

    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("routes action icons through DynamicIcon while preserving ReactNode semantics", () => {
    const { container } = render(
      <ComparisonMetricsRows
        actions={[
          {
            label: "String action",
            href: "/string",
            icon: "lucide/leading",
            iconAfter: "lucide/trailing",
          },
          {
            label: "Custom action",
            href: "/custom",
            icon: <span data-testid="custom-leading-icon" />,
            iconAfter: <span data-testid="custom-trailing-icon" />,
          },
          {
            label: "Sentinel action",
            href: "/sentinel",
            icon: 0,
            iconAfter: 0,
          },
          {
            label: "Empty action",
            href: "/empty",
            icon: "",
            iconAfter: false,
          },
        ]}
      />,
    );

    const stringAction = container.querySelector(
      '[href="/string"]',
    ) as HTMLElement;
    expect(
      within(stringAction).getAllByTestId("mock-icon").map((icon) =>
        icon.getAttribute("data-name"),
      ),
    ).toEqual(["lucide/leading", "lucide/trailing"]);
    expect(stringAction).not.toHaveTextContent("lucide/leading");
    expect(stringAction).not.toHaveTextContent("lucide/trailing");

    const customAction = container.querySelector(
      '[href="/custom"]',
    ) as HTMLElement;
    expect(
      within(customAction).getByTestId("custom-leading-icon"),
    ).toBeInTheDocument();
    expect(
      within(customAction).getByTestId("custom-trailing-icon"),
    ).toBeInTheDocument();

    const sentinelAction = container.querySelector(
      '[href="/sentinel"]',
    ) as HTMLElement;
    expect(sentinelAction).toHaveTextContent("0Sentinel action0");
    expect(
      within(sentinelAction).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();

    const emptyAction = container.querySelector(
      '[href="/empty"]',
    ) as HTMLElement;
    expect(emptyAction).toHaveTextContent("Empty action");
    expect(
      within(emptyAction).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();
  });
});
