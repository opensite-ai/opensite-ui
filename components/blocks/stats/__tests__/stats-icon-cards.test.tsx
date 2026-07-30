import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsIconCards } from "../stats-icon-cards";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    className,
  }: {
    name?: React.ReactNode;
    className?: string;
  }) =>
    typeof name === "string" ? (
      <span data-testid="mock-icon" data-icon-name={name} className={className}>
        icon
      </span>
    ) : (
      <>{name}</>
    ),
}));

describe("StatsIconCards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders heading and description", () => {
    render(
      <StatsIconCards
        heading="Our Growth in Numbers"
        description="Key metrics that showcase our impact in the market"
      />
    );
    expect(screen.getByText("Our Growth in Numbers")).toBeInTheDocument();
    expect(screen.getByText("Key metrics that showcase our impact in the market")).toBeInTheDocument();
  });

  it("renders stats when provided", () => {
    const stats = [
      { label: "Active Users", value: "120K+", growth: "18% growth", icon: "lucide/users" },
      { label: "Revenue", value: "$3.2M", growth: "32% increase", icon: "lucide/dollar-sign" },
    ];
    render(<StatsIconCards stats={stats} />);
    expect(screen.getByText("Active Users")).toBeInTheDocument();
    expect(screen.getByText("120K+")).toBeInTheDocument();
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("$3.2M")).toBeInTheDocument();
  });

  it("routes iconSlot strings while preserving fallbacks and fixed growth icons", () => {
    const { container } = render(
      <StatsIconCards
        stats={[
          {
            label: "String slot",
            value: "1",
            growth: "10%",
            iconSlot: "lucide/sparkles",
            icon: "lucide/ignored-string-fallback",
            className: "string-slot-stat",
          },
          {
            label: "Custom slot",
            value: "2",
            growth: "0%",
            iconSlot: <span data-testid="custom-icon-slot">Custom icon</span>,
            icon: "lucide/ignored-custom-fallback",
            className: "custom-slot-stat",
          },
          {
            label: "Empty slot",
            value: "3",
            growth: "0%",
            iconSlot: "",
            icon: "lucide/empty-fallback",
            className: "empty-slot-stat",
          },
          {
            label: "False slot",
            value: "4",
            growth: "0%",
            iconSlot: false,
            icon: "lucide/false-fallback",
            className: "false-slot-stat",
          },
          {
            label: "Zero slot",
            value: "5",
            growth: "0%",
            iconSlot: 0,
            icon: "lucide/zero-fallback",
            className: "zero-slot-stat",
          },
        ]}
      />
    );

    const stringIcon = container.querySelector(
      '.string-slot-stat [data-icon-name="lucide/sparkles"]'
    );
    const customIcon = screen.getByTestId("custom-icon-slot");
    expect(stringIcon).toBeInTheDocument();
    expect(
      container.querySelector(".string-slot-stat") as HTMLElement
    ).not.toHaveTextContent("lucide/sparkles");
    expect(
      container.querySelector('[data-icon-name="lucide/ignored-string-fallback"]')
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-icon-name="lucide/ignored-custom-fallback"]')
    ).not.toBeInTheDocument();
    expect(stringIcon?.closest(".h-12")).toBeNull();
    expect(customIcon.closest(".h-12")).toBeNull();

    for (const [className, iconName] of [
      ["empty-slot-stat", "lucide/empty-fallback"],
      ["false-slot-stat", "lucide/false-fallback"],
      ["zero-slot-stat", "lucide/zero-fallback"],
    ]) {
      const fallbackIcon = container.querySelector(
        `.${className} [data-icon-name="${iconName}"]`
      );
      expect(fallbackIcon).toBeInTheDocument();
      expect(fallbackIcon?.closest(".h-12")).toBeInTheDocument();
    }

    expect(
      container.querySelector(
        '.string-slot-stat [data-icon-name="lucide/arrow-up-right"]'
      )
    ).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <StatsIconCards
        heading="Test Heading"
        description="Test description"
        className="custom-class"
      />
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
