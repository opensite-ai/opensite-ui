import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComparisonMetricsRows } from "../comparison-metrics-rows";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
  }: {
    name: string;
    size: number;
  }) => (
    <span data-testid="mock-icon" data-name={name} data-size={size}>
      icon
    </span>
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
  it("renders with default props", () => {
    render(<ComparisonMetricsRows />);

    expect(
      screen.getByText("Compare Cloud vs On-site Infrastructure")
    ).toBeInTheDocument();
  });

  it("renders with custom heading", () => {
    render(<ComparisonMetricsRows heading="Custom Heading" />);

    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders option labels", () => {
    render(
      <ComparisonMetricsRows
        optionALabel="Option A"
        optionBLabel="Option B"
      />
    );

    expect(screen.getByText("Option A")).toBeInTheDocument();
    expect(screen.getByText("Option B")).toBeInTheDocument();
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

  it("applies custom className", () => {
    const { container } = render(
      <ComparisonMetricsRows className="custom-class" />
    );

    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders empty metrics array", () => {
    render(<ComparisonMetricsRows metrics={[]} />);

    expect(
      screen.getByText("Compare Cloud vs On-site Infrastructure")
    ).toBeInTheDocument();
  });

  it("renders footnotes", () => {
    const customFootnotes = ["Footnote 1", "Footnote 2"];

    render(<ComparisonMetricsRows footnotes={customFootnotes} />);

    expect(screen.getByText("Footnote 1")).toBeInTheDocument();
    expect(screen.getByText("Footnote 2")).toBeInTheDocument();
  });

  it("renders actions", () => {
    render(
      <ComparisonMetricsRows actions={[{ label: "Learn More", href: "/learn" }]} />
    );

    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("renders icons in CTA", () => {
    render(<ComparisonMetricsRows />);

    const icons = screen.getAllByTestId("mock-icon");
    expect(icons.length).toBeGreaterThan(0);
  });
});

