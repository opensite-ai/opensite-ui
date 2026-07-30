import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { FeatureStatsHighlight } from "../feature-stats-highlight";

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

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    className,
    size,
  }: {
    name?: React.ReactNode | string;
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

describe("FeatureStatsHighlight", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<FeatureStatsHighlight badge="Test Badge" title="Test Title" />);
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders custom badge", () => {
    render(<FeatureStatsHighlight badge="Custom Badge" />);
    expect(screen.getByText("Custom Badge")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureStatsHighlight title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders stats when provided", () => {
    const stats = [
      { value: "99%", label: "Uptime" },
      { value: "24/7", label: "Support" },
    ];
    render(<FeatureStatsHighlight stats={stats} />);
    expect(screen.getByText("99%")).toBeInTheDocument();
    expect(screen.getByText("Uptime")).toBeInTheDocument();
  });

  it("routes both action icon positions through DynamicIcon", () => {
    const { container } = render(
      <FeatureStatsHighlight
        actions={[
          {
            label: "Raw action",
            href: "/raw",
            icon: "lucide/trending-up",
            iconAfter: "lucide/arrow-right",
          },
          {
            label: "Custom action",
            href: "/custom",
            icon: <span data-testid="custom-before">before</span>,
            iconAfter: <span data-testid="custom-after">after</span>,
          },
        ]}
      />,
    );

    const rawAction = container.querySelector('a[href="/raw"]') as HTMLElement;
    expect(
      within(rawAction)
        .getAllByTestId("mock-icon")
        .map((icon) => icon.getAttribute("data-name")),
    ).toEqual(["lucide/trending-up", "lucide/arrow-right"]);
    expect(within(rawAction).queryByText("lucide/trending-up")).not.toBeInTheDocument();
    expect(within(rawAction).queryByText("lucide/arrow-right")).not.toBeInTheDocument();
    expect(screen.getByTestId("custom-before")).toBeInTheDocument();
    expect(screen.getByTestId("custom-after")).toBeInTheDocument();
  });

  it("preserves strict empty guards and nullish children precedence", () => {
    const { container } = render(
      <FeatureStatsHighlight
        actions={[
          { label: "Empty", href: "/empty", icon: "", iconAfter: "" },
          { label: "Boundary", href: "/boundary", icon: false, iconAfter: 0 },
          {
            label: "Hidden zero",
            href: "/zero-child",
            icon: "lucide/hidden-zero",
            children: 0,
          },
          {
            label: "Hidden false",
            href: "/false-child",
            icon: "lucide/hidden-false",
            children: false,
          },
          {
            label: "Hidden empty",
            href: "/empty-child",
            icon: "lucide/hidden-empty",
            children: "",
          },
        ]}
      />,
    );

    expect(container.querySelector('a[href="/empty"]')).toHaveTextContent("Empty");
    expect(container.querySelector('a[href="/boundary"]')).toHaveTextContent(
      "Boundary0",
    );
    expect(container.querySelector('a[href="/zero-child"]')).toHaveTextContent("0");
    expect(container.querySelector('a[href="/false-child"]')).toBeEmptyDOMElement();
    expect(container.querySelector('a[href="/empty-child"]')).toBeEmptyDOMElement();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("preserves truthy action and stats slot precedence", () => {
    const actions = [{ label: "Array action", href: "/array" }];
    const stats = [{ value: "42", label: "Array stat" }];
    const { rerender } = render(
      <FeatureStatsHighlight
        actions={actions}
        actionsSlot={false}
        stats={stats}
        statsSlot={false}
      />,
    );
    expect(screen.getByText("Array action")).toBeInTheDocument();
    expect(screen.getByText("Array stat")).toBeInTheDocument();

    rerender(
      <FeatureStatsHighlight
        actions={actions}
        actionsSlot={<div>Custom actions slot</div>}
        stats={stats}
        statsSlot={<div>Custom stats slot</div>}
      />,
    );
    expect(screen.getByText("Custom actions slot")).toBeInTheDocument();
    expect(screen.getByText("Custom stats slot")).toBeInTheDocument();
    expect(screen.queryByText("Array action")).not.toBeInTheDocument();
    expect(screen.queryByText("Array stat")).not.toBeInTheDocument();
  });

  it("keeps badge and statistic strings as content", () => {
    render(
      <FeatureStatsHighlight
        badge="lucide/badge-content"
        stats={[
          {
            value: "lucide/value-content",
            label: "lucide/label-content",
          },
        ]}
      />,
    );

    expect(screen.getByText("lucide/badge-content")).toBeInTheDocument();
    expect(screen.getByText("lucide/value-content")).toBeInTheDocument();
    expect(screen.getByText("lucide/label-content")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureStatsHighlight className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
