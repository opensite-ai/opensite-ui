import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsAnimatedCounter } from "../stats-animated-counter";

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

describe("StatsAnimatedCounter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders heading and description", () => {
    render(
      <StatsAnimatedCounter
        heading="Our Impact in Numbers"
        description="Real results that speak for themselves"
      />
    );
    expect(screen.getByText("Our Impact in Numbers")).toBeInTheDocument();
    expect(screen.getByText("Real results that speak for themselves")).toBeInTheDocument();
  });

  it("renders stats when provided", () => {
    const stats = [
      { value: 500, suffix: "+", label: "Projects Completed", icon: "lucide/folder-check" },
      { value: 98, suffix: "%", label: "Client Satisfaction", icon: "lucide/heart" },
    ];
    render(<StatsAnimatedCounter stats={stats} />);
    expect(screen.getByText("Projects Completed")).toBeInTheDocument();
    expect(screen.getByText("Client Satisfaction")).toBeInTheDocument();
  });

  it("routes iconSlot strings dynamically and preserves truthy fallback semantics", () => {
    const { container } = render(
      <StatsAnimatedCounter
        stats={[
          {
            value: 1,
            label: "String slot",
            icon: "lucide/ignored",
            iconSlot: "lucide/sparkles",
            className: "string-slot-stat",
          },
          {
            value: 2,
            label: "Custom slot",
            icon: "lucide/ignored-custom",
            iconSlot: <span data-testid="custom-icon-slot">custom</span>,
            className: "custom-slot-stat",
          },
          {
            value: 3,
            label: "Empty fallback",
            icon: "lucide/empty-fallback",
            iconSlot: "",
            className: "empty-slot-stat",
          },
          {
            value: 4,
            label: "False fallback",
            icon: "lucide/false-fallback",
            iconSlot: false,
            className: "false-slot-stat",
          },
          {
            value: 5,
            label: "Zero fallback",
            icon: "lucide/zero-fallback",
            iconSlot: 0,
            className: "zero-slot-stat",
          },
        ]}
      />,
    );

    const stringIcon = container.querySelector(
      '.string-slot-stat [data-icon-name="lucide/sparkles"]',
    ) as HTMLElement;
    expect(stringIcon).toBeInTheDocument();
    expect(stringIcon.closest(".h-14")).not.toBeInTheDocument();
    expect(
      container.querySelector(".string-slot-stat") as HTMLElement,
    ).not.toHaveTextContent("lucide/sparkles");
    expect(
      container.querySelector('[data-icon-name="lucide/ignored"]'),
    ).not.toBeInTheDocument();

    const customIcon = screen.getByTestId("custom-icon-slot");
    expect(customIcon).toBeInTheDocument();
    expect(customIcon.closest(".h-14")).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-icon-name="lucide/ignored-custom"]'),
    ).not.toBeInTheDocument();

    for (const [selector, iconName] of [
      [".empty-slot-stat", "lucide/empty-fallback"],
      [".false-slot-stat", "lucide/false-fallback"],
      [".zero-slot-stat", "lucide/zero-fallback"],
    ]) {
      const icon = container.querySelector(
        `${selector} [data-icon-name="${iconName}"]`,
      ) as HTMLElement;
      expect(icon).toBeInTheDocument();
      expect(icon.closest(".h-14")).toBeInTheDocument();
    }
  });

  it("applies custom className", () => {
    const { container } = render(
      <StatsAnimatedCounter
        heading="Test Heading"
        description="Test description"
        className="custom-class"
      />
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
